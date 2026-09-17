import { buildSummaryText } from "./reservationSummary";
import { CONTACT } from "./site";
import type { ReservationSubmission } from "./validation";

export type DeliveryResult =
  | { delivered: true; channel: "webhook" | "email" }
  | { delivered: false; reason: "unconfigured" | "delivery_failed" };

// Short and quotable on a phone call. Not a database id, just a handle for
// "the request I sent about Daphne".
export function createReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const suffix = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `CB-${stamp}${suffix}`;
}

async function sendToWebhook(
  url: string,
  submission: ReservationSubmission,
  reference: string
): Promise<boolean> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reference,
      submittedAt: new Date().toISOString(),
      summary: buildSummaryText(submission),
      ...submission,
    }),
  });

  return response.ok;
}

async function sendNotificationEmail(
  apiKey: string,
  to: string,
  submission: ReservationSubmission,
  reference: string
): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESERVATION_FROM_EMAIL ?? `ChampionBullies website <onboarding@resend.dev>`,
      to: [to],
      subject: `Reservation request ${reference}: ${submission.puppy.name}`,
      text: [
        `Reference: ${reference}`,
        "",
        buildSummaryText(submission),
        "",
        `Reply to: ${submission.contact.email} / ${submission.contact.phone}`,
      ].join("\n"),
    }),
  });

  return response.ok;
}

// Tries the configured channels in order. The caller turns a failure into an
// honest message for the visitor instead of a fake confirmation.
export async function deliverReservation(
  submission: ReservationSubmission,
  reference: string
): Promise<DeliveryResult> {
  const webhookUrl = process.env.RESERVATION_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  if (webhookUrl) {
    try {
      if (await sendToWebhook(webhookUrl, submission, reference)) {
        return { delivered: true, channel: "webhook" };
      }
    } catch {
      // Fall through: the email channel may still get through.
    }
  }

  if (resendKey) {
    const notifyEmail = process.env.RESERVATION_NOTIFY_EMAIL ?? CONTACT.email;
    try {
      if (await sendNotificationEmail(resendKey, notifyEmail, submission, reference)) {
        return { delivered: true, channel: "email" };
      }
    } catch {
      // Reported as delivery_failed below; no contact details go to the logs.
    }
  }

  if (!webhookUrl && !resendKey) {
    return { delivered: false, reason: "unconfigured" };
  }

  console.error(`Reservation ${reference} could not be delivered.`);
  return { delivered: false, reason: "delivery_failed" };
}