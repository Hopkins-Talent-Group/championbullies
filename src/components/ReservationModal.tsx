"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReservation } from "@/context/ReservationContext";
import {
  RESERVE_FORM_ID,
  STEP_ACTION_LABELS,
  STEP_HEADINGS,
  STEP_TITLES,
} from "@/lib/reservationFlow";
import { RESERVATION_STEPS } from "@/lib/validation";
import { ResultPanel } from "./ReservationSteps/ResultPanel";
import { Step1 } from "./ReservationSteps/Step1-Puppy";
import { Step2 } from "./ReservationSteps/Step2-Contact";
import { Step3 } from "./ReservationSteps/Step3-Living";
import { Step4 } from "./ReservationSteps/Step4-Agreement";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Matches the exit animation in globals.css: the panel stays mounted for one
// final frame pass, then unmounts.
const EXIT_MS = 140;

export function ReservationModal() {
  const { state, actions } = useReservation();
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const open = state.isOpen;
  const isResult = state.status === "success" || state.status === "error";
  const stepIndex = RESERVATION_STEPS.indexOf(state.step);
  const submitting = state.status === "submitting";
  const title = state.data.puppy
    ? `Reserve ${state.data.puppy.name}`
    : "Reserve a puppy";

  // Closing plays the exit animation first, then lets the context unmount the
  // panel: no effect has to mirror context state back into local state.
  const requestClose = useCallback(() => {
    if (closeTimerRef.current !== null) return;
    if (submitting) return;

    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setClosing(false);
      actions.close();

      // Restore focus only if the original element is still in the DOM.
      const el = restoreFocusRef.current;
      if (el && document.contains(el)) el.focus();
      restoreFocusRef.current = null;
    }, EXIT_MS);
  }, [actions, submitting]);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    []
  );

  // Remember what the visitor was on, then move focus into the dialog.
  useEffect(() => {
    if (!open) return;
    const active = document.activeElement;
    restoreFocusRef.current = active instanceof HTMLElement ? active : null;
    panelRef.current?.focus();
  }, [open]);

  // Each step change moves focus to its heading, which is how a screen reader
  // hears where the flow landed. rAF ensures the new step's DOM has mounted
  // before focusing. Result state is handled by ResultPanel itself.
  useEffect(() => {
    if (!open || isResult) return;
    const id = requestAnimationFrame(() => headingRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, state.step, isResult]);

  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        // Block closing while a submission is in flight, otherwise the
        // result panel would never be shown.
        if (submitting) return;
        requestClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((node) => node.getClientRects().length > 0);

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (active instanceof Node && !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [open, requestClose, submitting]);

  if (!open || typeof document === "undefined") return null;

  const stateAttr = closing ? "closing" : undefined;

  return createPortal(
    <div className="rs-shell">
      {/* Dims and blurs the page behind the dialog; clicking it closes. */}
      <div
        className="rs-scrim"
        data-state={stateAttr}
        aria-hidden="true"
        onClick={submitting ? undefined : requestClose}
      />
      <div
        className="rs-panel"
        data-state={stateAttr}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rs-dialog-title"
        aria-describedby={!isResult ? "rs-step-heading" : undefined}
        aria-busy={submitting || undefined}
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="rs-head">
          <div>
            <p className="rs-eyebrow">
              {isResult
                ? "Reservation"
                : `Step ${stepIndex + 1} of ${RESERVATION_STEPS.length}`}
            </p>
            <h2 className="rs-title" id="rs-dialog-title">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="rs-close"
            onClick={requestClose}
            disabled={submitting}
            aria-label="Close the reservation dialog"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {isResult ? (
          <div className="rs-body">
            <ResultPanel onClose={requestClose} />
          </div>
        ) : (
          <>
            <nav className="rs-stepper" aria-label="Reservation progress">
              <ol className="rs-steps">
                {RESERVATION_STEPS.map((step, index) => {
                  const isCurrent = step === state.step;
                  const isDone = index < stepIndex;
                  return (
                    <li key={step}>
                      <button
                        type="button"
                        className="rs-step"
                        data-state={isCurrent ? "current" : isDone ? "done" : "todo"}
                        aria-current={isCurrent ? "step" : undefined}
                        aria-label={`Step ${index + 1} of ${RESERVATION_STEPS.length}, ${STEP_TITLES[step]}${isCurrent ? ", current step" : ""}`}
                        disabled={index > stepIndex}
                        onClick={() => {
                          if (index < stepIndex) actions.goto(step);
                        }}
                      >
                        <span className="rs-step-index" aria-hidden="true">
                          {`0${index + 1}`}
                        </span>
                        <span className="rs-step-title" aria-hidden="true">
                          {STEP_TITLES[step]}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <div className="rs-progress" aria-hidden="true">
                <div
                  className="rs-progress-fill"
                  style={{ transform: `scaleX(${(stepIndex + 1) / RESERVATION_STEPS.length})` }}
                />
              </div>
            </nav>

            <div
              className="rs-body"
              onFocus={(event) => {
                const target = event.target;
                if (
                  target instanceof HTMLElement &&
                  (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
                ) {
                  // Keeps the field clear of the sticky action bar and the
                  // on-screen keyboard on small screens.
                  target.scrollIntoView({ block: "center", inline: "nearest" });
                }
              }}
            >
              <h3
                ref={headingRef}
                className="rs-step-heading"
                id="rs-step-heading"
                tabIndex={-1}
              >
                {STEP_HEADINGS[state.step]}
              </h3>
              {state.step === "puppy" && <Step1 />}
              {state.step === "contact" && <Step2 />}
              {state.step === "living" && <Step3 />}
              {state.step === "agreement" && <Step4 />}
            </div>

            <footer className="rs-foot">
              {stepIndex === 0 ? (
                <button
                  type="button"
                  className="rs-btn rs-btn-secondary"
                  onClick={requestClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  className="rs-btn rs-btn-secondary"
                  onClick={actions.back}
                  disabled={submitting}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                form={RESERVE_FORM_ID}
                className="rs-btn rs-btn-primary"
                disabled={submitting}
              >
                {submitting
                  ? "Sending your request"
                  : STEP_ACTION_LABELS[state.step]}
              </button>
            </footer>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}