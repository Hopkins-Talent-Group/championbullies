import { CONTACT } from "./site";
import type { ReservationSubmission } from "./validation";

// Plain text so the same lines can be read in the notification email, the
// webhook payload, and the visitor's own mailto fallback.
export function buildSummaryLines(submission: ReservationSubmission): string[] {
  const { puppy, contact, living, agreement } = submission;

  return [
    `Puppy: ${puppy.name} (${puppy.breed}, ${puppy.gender}, ${puppy.year})`,
    `Price: ${puppy.price}`,
    `Puppy key: ${puppy.key}`,
    "",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    "",
    `Home type: ${living.homeType}`,
    `Has a yard: ${living.hasYard ? "yes" : "no"}`,
    `Other pets: ${living.otherPets || "none given"}`,
    `Children: ${living.childrenAges || "none given"}`,
    `Hours alone per day: ${living.hoursAlone}`,
    "",
    `Health guarantee acknowledged: ${agreement.healthGuaranteeAck ? "yes" : "no"}`,
    `Spay and neuter acknowledged: ${agreement.spayNeuterAck ? "yes" : "no"}`,
    `Deposit arrangement confirmed: ${agreement.depositAck ? "yes" : "no"}`,
  ];
}

export function buildSummaryText(submission: ReservationSubmission): string {
  return buildSummaryLines(submission).join("\n");
}

// Prefilled so a visitor never has to type their answers twice when the
// automated delivery path is not available.
export function buildFallbackMailto(submission: ReservationSubmission): string {
  const subject = `Reservation request: ${submission.puppy.name}`;
  const body = [
    buildSummaryText(submission),
    "",
    `Sent from the website reservation dialog. Phone: ${CONTACT.phoneLabel}`,
  ].join("\n");

  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
