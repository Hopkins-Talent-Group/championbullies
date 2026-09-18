// src/lib/ghl.ts

import type { ReservationWithGHL, GHLIntegration } from "./validation";

const GHL_BASE_URL =
  process.env.GHL_BASE_URL ?? "https://services.leadconnectorhq.com";
const GHL_API_VERSION = process.env.GHL_API_VERSION ?? "2021-07-28";

/**
 * Normalize a phone number to E.164 format.
 *
 * Returns "" when the number can't be confidently parsed — callers must
 * then OMIT the phone field entirely. Sending "+0..." to GHL throws
 * "Invalid country calling code" and rejects the whole payload.
 *
 * Handles:
 *   +1 321 555 0123   → +13215550123
 *   321-555-0123      → +13215550123   (10 digits = US)
 *   13215550123       → +13215550123   (11 digits starting with 1)
 *   09171234567       → +639171234567  (PH local, 11 digits starting 0)
 *   +63 917 123 4567  → +639171234567  (already international)
 *   +0... / 0...      → ""             (unparseable)
 */
export function normalizePhone(raw: string | undefined | null): string {
  const value = (raw ?? "").trim();
  if (!value) return "";

  // Already international — trust the caller, strip formatting noise.
  if (value.startsWith("+")) {
    const digits = value.slice(1).replace(/\D/g, "");
    // Must have a plausible country code + number, and can't start with 0.
    if (digits.length >= 9 && digits.length <= 15 && !digits.startsWith("0")) {
      return `+${digits}`;
    }
    return "";
  }

  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  // Leading 0 = local format. We can only guess when it's a PH mobile
  // (11 digits starting "09"). Everything else is ambiguous — reject.
  if (digits.startsWith("0")) {
    if (digits.length === 11 && digits.startsWith("09")) {
      return `+63${digits.slice(1)}`;
    }
    return "";
  }

  // US formats
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;

  // International with country code already in the digits
  if (digits.length >= 11 && digits.length <= 15) return `+${digits}`;

  // Too short or too long to be valid
  return "";
}

/**
 * True when the value looks like a valid E.164 number.
 * Used to decide whether to include the phone field in GHL payloads.
 */
function isSendablePhone(value: string): boolean {
  return value.length >= 8 && value.length <= 16 && value.startsWith("+");
}

export function getBrandTag(): string {
  return process.env.GHL_BRAND_TAG ?? "champ-res";
}

export class GHLClient {
  private apiKey: string;
  private locationId: string;

  constructor(apiKey: string, locationId: string) {
    if (!apiKey) throw new Error("GHL_API_KEY is missing");
    if (!locationId) throw new Error("GHL_LOCATION_ID is missing");
    this.apiKey = apiKey;
    this.locationId = locationId;
  }

  private async request(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    return fetch(`${GHL_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });
  }

  /**
   * Build the shared contact body. Only includes `phone` when the value
   * is a valid E.164 string; otherwise omits it entirely so GHL doesn't
   * reject the payload with "Invalid country calling code".
   */
  private buildContactBody(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tags?: string[];
    source?: string;
    customFields?: Record<string, unknown>;
  }): Record<string, unknown> {
    const body: Record<string, unknown> = {
      locationId: this.locationId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      tags: data.tags ?? [],
      source: data.source ?? "Website",
    };

    if (isSendablePhone(data.phone)) {
      body.phone = data.phone;
    }

    if (data.customFields) {
      body.customFields = Object.entries(data.customFields).map(
        ([key, value]) => ({ key, field_value: String(value) })
      );
    }

    return body;
  }

  async createContact(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tags?: string[];
    source?: string;
    customFields?: Record<string, unknown>;
  }): Promise<{ contactId: string; error?: string }> {
    const res = await this.request("/contacts/", {
      method: "POST",
      body: JSON.stringify(this.buildContactBody(data)),
    });

    const json = (await res.json().catch(() => ({}))) as any;

    if (!res.ok) {
      return {
        contactId: "",
        error: json.message || `GHL ${res.status}: ${res.statusText}`,
      };
    }

    return { contactId: json.contact?.id ?? "", error: undefined };
  }

  async upsertContact(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tags?: string[];
    source?: string;
    customFields?: Record<string, unknown>;
  }): Promise<{ contactId: string; created: boolean; error?: string }> {
    const res = await this.request("/contacts/upsert", {
      method: "POST",
      body: JSON.stringify(this.buildContactBody(data)),
    });

    const json = (await res.json().catch(() => ({}))) as any;

    if (!res.ok) {
      return {
        contactId: "",
        created: false,
        error: json.message || `GHL ${res.status}: ${res.statusText}`,
      };
    }

    return {
      contactId: json.contact?.id ?? "",
      created: Boolean(json.new),
      error: undefined,
    };
  }

  /**
   * Look up an existing opportunity for a contact in a given pipeline.
   * GHL enforces one-opportunity-per-contact-per-pipeline; callers must
   * check before creating to avoid "Can not create duplicate opportunity".
   */
  async findOpportunityForContact(
    contactId: string,
    pipelineId: string
  ): Promise<{ opportunityId: string | null; error?: string }> {
    const params = new URLSearchParams({
      location_id: this.locationId,
      contact_id: contactId,
      pipeline_id: pipelineId,
    });

    const res = await this.request(`/opportunities/search?${params}`, {
      method: "GET",
    });

    const json = (await res.json().catch(() => ({}))) as any;

    if (!res.ok) {
      return {
        opportunityId: null,
        error: json.message || `GHL ${res.status}: ${res.statusText}`,
      };
    }

    const first = json.opportunities?.[0];
    return { opportunityId: first?.id ?? null, error: undefined };
  }

  async createOpportunity(data: {
    pipelineId: string;
    stageId: string;
    name: string;
    amount: number;
    contactId: string;
    status?: "open" | "won" | "lost" | "abandoned";
  }): Promise<{ opportunityId: string; error?: string }> {
    const body = {
      locationId: this.locationId,
      pipelineId: data.pipelineId,
      pipelineStageId: data.stageId,
      name: data.name,
      monetaryValue: data.amount,
      contactId: data.contactId,
      status: data.status ?? "open",
    };

    const res = await this.request("/opportunities/", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = (await res.json().catch(() => ({}))) as any;

    if (!res.ok) {
      return {
        opportunityId: "",
        error: json.message || `GHL ${res.status}: ${res.statusText}`,
      };
    }

    return { opportunityId: json.opportunity?.id ?? "", error: undefined };
  }
}

export function createGHLClientFromEnv(): GHLClient {
  return new GHLClient(
    process.env.GHL_API_KEY ?? "",
    process.env.GHL_LOCATION_ID ?? ""
  );
}

export function createGHLClient(integration: GHLIntegration): GHLClient {
  return new GHLClient(integration.apiKey, integration.locationId);
}

/**
 * Map a FLAT reservation object to a GHL contact payload.
 *
 * IMPORTANT: accepts flat fields (firstName, lastName, email...). The route
 * flattens the nested { puppy, contact, living, agreement } shape before
 * calling this. Do not destructure a `contact` sub-object here.
 */
export function mapReservationToGHL(
  reservation: ReservationWithGHL & { reference?: string }
) {
  const {
    firstName,
    lastName,
    email,
    phone,
    homeType,
    hasYard,
    otherPets,
    childrenAges,
    hoursAlone,
    healthGuaranteeAck,
    spayNeuterAck,
    depositPaid,
    paymentMethodId,
    puppyName,
    breed,
    reference,
  } = reservation;

  const brandTag = getBrandTag();

  return {
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    phone: normalizePhone(phone),
    tags: [
      "dog-adoption",
      "reservation",
      brandTag,
      homeType,
      hasYard ? "has-yard" : "no-yard",
      otherPets ? "has-other-pets" : "no-other-pets",
      depositPaid ? "deposit-paid" : "deposit-pending",
    ],
    customFields: {
      home_type: homeType,
      has_yard: hasYard ? "yes" : "no",
      other_pets: otherPets || "none",
      children_ages: childrenAges || "none",
      hours_alone: hoursAlone || "0",
      health_guarantee_ack: healthGuaranteeAck ? "yes" : "no",
      spay_neuter_ack: spayNeuterAck ? "yes" : "no",
      deposit_paid: depositPaid ? "yes" : "no",
      payment_method_id: paymentMethodId || "pending",
      puppy_name: puppyName || "",
      breed: breed || "",
      reservation_reference: reference || "",
    },
  };
}