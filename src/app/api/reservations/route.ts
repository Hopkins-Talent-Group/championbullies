import { NextResponse } from "next/server";
import { createReference } from "@/lib/reservations";
import {
  reservationSubmissionSchema,
  type ReservationResponse,
} from "@/lib/validation";
import {
  createGHLClientFromEnv,
  mapReservationToGHL,
  normalizePhone,
} from "@/lib/ghl";
import { sendOwnerNotification, sendClientConfirmation } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown = null;

  try {
    body = await request.json();
  } catch {
    body = null;
  }

  if (body === null) {
    return NextResponse.json<ReservationResponse>(
      { ok: false, reason: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = reservationSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ReservationResponse>(
      { ok: false, reason: "invalid" },
      { status: 400 }
    );
  }

  const { puppy, contact, living, agreement } = parsed.data;
  const reference = createReference();

  try {
    // ---- 1. GHL ----
    const client = createGHLClientFromEnv();

    const ghlPayload = mapReservationToGHL({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      homeType: living.homeType,
      hasYard: living.hasYard,
      otherPets: living.otherPets,
      childrenAges: living.childrenAges,
      hoursAlone: living.hoursAlone,
      healthGuaranteeAck: agreement.healthGuaranteeAck,
      spayNeuterAck: agreement.spayNeuterAck,
      depositPaid: agreement.depositAck,
      paymentMethodId: "",
      puppyName: puppy.name,
      breed: puppy.breed,
      reference,
    });

    const ghlContact = await client.upsertContact({
      firstName: ghlPayload.firstName,
      lastName: ghlPayload.lastName,
      email: ghlPayload.email,
      phone: normalizePhone(ghlPayload.phone),
      tags: ghlPayload.tags,
      source: "ChampionBullies — Reservation",
      customFields: {
        ...ghlPayload.customFields,
        reservation_reference: reference,
      },
    });

    if (ghlContact.error) {
      console.error("[GHL] upsertContact failed:", ghlContact.error);
      return NextResponse.json<ReservationResponse>(
        { ok: false, reason: "delivery_failed" },
        { status: 503 }
      );
    }

    if (process.env.GHL_PIPELINE_ID && process.env.GHL_PIPELINE_STAGE_ID) {
      const opp = await client.createOpportunity({
        pipelineId: process.env.GHL_PIPELINE_ID,
        stageId: process.env.GHL_PIPELINE_STAGE_ID,
        name: `${ghlPayload.firstName} ${ghlPayload.lastName} — ${reference}`,
        amount: 0,
        contactId: ghlContact.contactId,
        status: "open",
      });

      if (opp.error) {
        console.error("[GHL] createOpportunity failed:", opp.error);
      }
    }

    // ---- 2. Emails (best-effort; failures are logged, not fatal) ----
    try {
      await sendOwnerNotification({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        homeType: living.homeType,
        hasYard: living.hasYard,
        otherPets: living.otherPets,
        childrenAges: living.childrenAges,
        hoursAlone: living.hoursAlone,
        puppyName: puppy.name,
        breed: puppy.breed,
        price: puppy.price,
        reference,
      });
    } catch (err) {
      console.error("[Email] owner notification failed:", err);
    }

    try {
      await sendClientConfirmation({
        firstName: contact.firstName,
        email: contact.email,
        puppyName: puppy.name,
        price: puppy.price,
        reference,
      });
    } catch (err) {
      console.error("[Email] client confirmation failed:", err);
    }

    // ---- 3. Success ----
    return NextResponse.json<ReservationResponse>({
      ok: true,
      reference,
      channel: "ghl",
    });
  } catch (err) {
    console.error("[Reservation] Unexpected error:", err);
    return NextResponse.json<ReservationResponse>(
      { ok: false, reason: "network" },
      { status: 500 }
    );
  }
}