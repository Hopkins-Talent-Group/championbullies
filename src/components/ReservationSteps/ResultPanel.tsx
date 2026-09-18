"use client";

import { useReservation, type FailureReason } from "@/context/ReservationContext";
import { buildFallbackMailto } from "@/lib/reservationSummary";
import { CONTACT, DEPOSIT_AMOUNT } from "@/lib/site";

const FAILURE_COPY: Record<FailureReason, string> = {
  invalid: "Some answers are still missing, so nothing was sent.",
  unconfigured:
    "Our booking system is not connected yet, so your request was not sent.",
  delivery_failed:
    "We could not save your request right now, so it was not sent.",
  network: "Your request did not reach us. Check your connection and try again.",
};

export function ResultPanel({ onClose }: { onClose: () => void }) {
  const { state, actions } = useReservation();
  const { status, reference, failure, submission, data } = state;

  if (status === "success") {
    return (
      <div className="rs-result rs-result-success">
        <div className="rs-result-mark" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="rs-eyebrow">Request received</p>

        <h3 className="rs-result-title" id="rs-step-heading" tabIndex={-1}>
          Your reservation is with us
        </h3>

        {reference ? (
          <div className="rs-reference">
            <span className="rs-reference-label">Reference</span>
            <span className="rs-reference-value">{reference}</span>
          </div>
        ) : null}

        <p className="rs-lead">
          We have {data.puppy ? `${data.puppy.name}'s details` : "your details"} and
          will review them shortly. We&apos;ll send the reservation fee details to{" "}
          {data.email || "the email you gave us"} within one business day.{" "}
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
    <div className="rs-result rs-result-error">
      <div className="rs-result-mark" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8v5M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="rs-eyebrow">Not sent</p>

      <h3 className="rs-result-title" id="rs-step-heading" tabIndex={-1}>
        Your request did not go through
      </h3>

      <p className="rs-lead" role="alert">
        {failure ? FAILURE_COPY[failure] : FAILURE_COPY.delivery_failed}
        {submission
          ? " Nothing you typed is lost — send these details by email and we'll pick it up from there."
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