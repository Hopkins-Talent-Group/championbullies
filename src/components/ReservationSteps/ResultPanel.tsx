"use client";

import { useReservation, type FailureReason } from "@/context/ReservationContext";
import { buildFallbackMailto } from "@/lib/reservationSummary";
import { CONTACT, DEPOSIT_AMOUNT } from "@/lib/site";

const FAILURE_COPY: Record<FailureReason, string> = {
  invalid: "Some answers are still missing, so nothing was sent.",
  unconfigured: "Our booking inbox is not connected to this site yet, so your request was not sent.",
  delivery_failed: "We could not hand your request to our inbox, so it was not sent.",
  network: "Your request did not reach us. Check your connection and try again.",
};

export function ResultPanel({ onClose }: { onClose: () => void }) {
  const { state, actions } = useReservation();
  const { status, reference, failure, submission, data } = state;

  if (status === "success") {
    return (
      <div className="rs-result">
        <p className="rs-eyebrow">Request sent</p>
        <h3 className="rs-result-title" id="rs-step-heading" tabIndex={-1}>
          Your request is with us
        </h3>
        {reference ? <p className="rs-reference">Reference {reference}</p> : null}
        <p className="rs-lead">
          We have {data.puppy ? `${data.puppy.name}'s details` : "your details"} and will reply to{" "}
          {data.email || "the email you gave us"} with availability and the deposit steps.{" "}
          {DEPOSIT_AMOUNT} holds the puppy and comes off the price.
        </p>
        <div className="rs-result-actions">
          <button type="button" className="rs-btn rs-btn-primary" onClick={onClose}>
            Done
          </button>
          <a className="rs-btn rs-btn-secondary" href={CONTACT.phoneHref}>
            Call {CONTACT.phoneLabel}
          </a>
        </div>
      </div>
    );
  }

  const canRetry = failure === "delivery_failed" || failure === "network";

  return (
    <div className="rs-result">
      <p className="rs-eyebrow">Not sent</p>
      <h3 className="rs-result-title" id="rs-step-heading" tabIndex={-1}>
        Your request did not go through
      </h3>
      <p className="rs-lead" role="alert">
        {failure ? FAILURE_COPY[failure] : FAILURE_COPY.delivery_failed}
        {submission
          ? " Nothing you typed is lost: your answers are already written into the email below."
          : ""}
      </p>

      <div className="rs-result-actions">
        {submission ? (
          <a className="rs-btn rs-btn-primary" href={buildFallbackMailto(submission)}>
            Send these details by email
          </a>
        ) : null}
        <a className="rs-btn rs-btn-secondary" href={CONTACT.phoneHref}>
          Call {CONTACT.phoneLabel}
        </a>
        {canRetry ? (
          <button
            type="button"
            className="rs-btn rs-btn-secondary"
            onClick={() => {
              void actions.submit();
            }}
          >
            Try again
          </button>
        ) : null}
        <button type="button" className="rs-btn rs-btn-quiet" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}