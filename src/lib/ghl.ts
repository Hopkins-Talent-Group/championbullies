import type { ReservationWithGHL, GHLIntegration } from "./validation";

const GHL_BASE_URL = "https://api.gohighlevel.com/v1";

export class GHLClient {
  private apiKey: string;
  private locationId: string;

  constructor(apiKey: string, locationId: string) {
    this.apiKey = apiKey;
    this.locationId = locationId;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    return fetch(`${GHL_BASE_URL}${endpoint}`, {
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
  }

  async createContact(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tags?: string[];
  }): Promise<{ contactId: string; error?: string }> {
    const body = {
      contact: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        tags: data.tags || [],
      },
    };

    const res = await this.request("/contacts", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      return { contactId: "", error: json.message || "Failed to create contact" };
    }

    return { contactId: json.id, error: undefined };
  }

  async createDeal(data: {
    pipelineId: string;
    name: string;
    amount: number;
    contactId: string;
    stageId?: string;
    customFields?: Record<string, unknown>;
  }): Promise<{ dealId: string; error?: string }> {
    const body = {
      deal: {
        name: data.name,
        pipelineId: data.pipelineId,
        amount: data.amount,
        contactId: data.contactId,
        stageId: data.stageId,
        customFields: data.customFields || {},
      },
    };

    const res = await this.request("/deals", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      return { dealId: "", error: json.message || "Failed to create deal" };
    }

    return { dealId: json.id, error: undefined };
  }

  async updateDealStage(dealId: string, stageId: string): Promise<{ success: boolean; error?: string }> {
    const res = await this.request(`/deals/${dealId}`, {
      method: "PUT",
      body: JSON.stringify({ deal: { stageId } }),
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, error: json.message || "Failed to update deal stage" };
    }

    return { success: true, error: undefined };
  }
}

export function createGHLClient(integration: GHLIntegration): GHLClient {
  return new GHLClient(integration.apiKey, integration.locationId);
}

export function mapReservationToGHL(reservation: ReservationWithGHL) {
  const {
    name,
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
  } = reservation;

  return {
    firstName: name.split(" ")[0] || "",
    lastName: name.split(" ").slice(1).join(" ") || "",
    email,
    phone,
    tags: ["dog-adoption", "reservation", homeType, ...(otherPets ? ["other-pets"] : [])],
    customFields: {
      homeType,
      hasYard: hasYard ? "yes" : "no",
      otherPets: otherPets || "none",
      childrenAges: childrenAges || "none",
      hoursAlone: hoursAlone || "0",
      healthGuaranteeAck: healthGuaranteeAck ? "yes" : "no",
      spayNeuterAck: spayNeuterAck ? "yes" : "no",
      depositPaid: depositPaid ? "yes" : "no",
      paymentMethodId: paymentMethodId || "pending",
      puppyName: reservation.puppyName || "",
      breed: reservation.breed || "",
    },
  };
}