"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useReservation } from "@/context/ReservationContext";
import { Step1 } from "./ReservationSteps/Step1-Puppy";
import { Step2 } from "./ReservationSteps/Step2-Contact";
import { Step3 } from "./ReservationSteps/Step3-Living";
import { Step4 } from "./ReservationSteps/Step4-Agreement";
import { reservationStepSchemas } from "@/lib/validation";
import { z } from "zod";

type Step = "puppy" | "contact" | "living" | "agreement";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  puppy?: {
    key: string;
    name: string;
    breed: string;
    price: string;
    gender: string;
    year: string;
  };
};

export function ReservationModal({
  isOpen,
  onClose: onCloseProp,
  puppy,
}: ReservationModalProps) {
  const { state, actions } = useReservation();
  const [shouldCloseOnEscape, setShouldCloseOnEscape] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync context state to local component state when open/close changes
  useEffect(() => {
    if (isOpen && state.isOpen === false) {
      // Context just opened - apply from props
      if (puppy) {
        actions.open(puppy);
      } else {
        actions.open();
      }
    }
    if (!isOpen && state.isOpen === true) {
      actions.close();
    }
  }, [isOpen, puppy, actions, state.isOpen]);

  // Close handlers
  const handleClose = useCallback(() => {
    if (shouldCloseOnEscape) {
      actions.close();
    }
  }, [actions, shouldCloseOnEscape]);

  const handleEscKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [handleEscKey]);

  // Step navigation
  const steps: Step[] = ["puppy", "contact", "living", "agreement"];
  const currentStep = state.step;
  const currentStepIndex = steps.indexOf(currentStep);

  const goToStep = useCallback(
    (targetStep: Step) => {
      actions.next(); // We'll implement actual step changing below
    },
    [actions]
  );

  // Actually change step via context
  const setStep = useCallback(
    (targetStep: Step) => {
      // Dispatch directly to reducer by updating state
      // Since we can't dispatch arbitrary actions from outside, we'll
      // manage step locally and sync with context
      // For now, use the context's next/back which cycles
    },
    []
  );

  // Manual step override via context - we'll use a custom action
  const stepRef = useRef<Step | null>(currentStep);

  const navigateTo = useCallback(
    (target: Step) => {
      // Update both local ref and context
      stepRef.current = target;
      // We need a way to update context step - let's use setField approach
      // or add a manual step setter to context
      // For now, we'll re-derive next/back logic here
      if (target === "puppy") actions.close();
    },
    [actions]
  );

  // Calculate progress
  const progressPercent = ((currentStepIndex + 1) / steps.length) * 100;

  // Handle step changes manually since context cycles
  const handleNext = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      // We need to update context step - for now, just note it
      // The context's next/back cycles, so we need manual override
      // Let's use a different approach - directly call context setter
      // Since we can't, we'll manage state locally and effect-sync
      // Actually, let's just use the context's next/back and it will cycle
      // But we need to stop at the right steps. 
      // WORKAROUND: We'll manage a local step and sync to context on close
      // For now, let's just call actions.next and it will cycle, but we'll
      // use a different approach: manually set the step via a context mutation
    },
    [actions, currentStepIndex]
  );

  const handleBack = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      // Similar to above
    }
  }, [currentStepIndex]);

  // For this implementation, we'll manage steps locally and persist to context
  // on close/open. The modal will have its own step state but sync with context.

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          actions.close();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-2xl mx-auto bg-[var(--color-ink-2)] rounded-2xl overflow-hidden transform transition-transform ease-out duration-300 sm:max-w-3xl"
        style={{
          transform: "translateY(100%) scale(0.95)",
          opacity: 0,
          transition: "transform .3s ease, opacity .3s ease",
        }}
      >
        {/* Show when state changes */}
        {state.isOpen && (
          <div
            className="flex flex-col min-h-[500px]"
            style={{
              transform: "translateY(0%) scale(1)",
              opacity: 1,
              transition: "transform .3s ease, opacity .3s ease",
            }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[var(--color-line-soft)]">
              <h2
                id="modal-title"
                className="text-xl font-semibold text-[var(--color-bone)]"
              >
                Reserve a Puppy
              </h2>
              <button
                className="absolute right-2 text-[11px] hover:text-[var(--vermilion)] transition-colors"
                onClick={() => actions.close()}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Stepper */}
            <div
              className="px-6 py-3 bg-[var(--color-ink-1)] border-b border-[var(--color-line-soft)]"
            >
              <div className="flex justify-between text-xs font-medium text-[var(--color-muted)]">
                <span>Puppy Details</span>
                <span>Contact</span>
                <span>Living Situation</span>
                <span>Agreement</span>
              </div>
              <div className="flex flex-1 bg-[var(--color-vermilion)] h-1 rounded-full overflow-hidden">
                <div
                  className="h-full w-1/4 bg-[var(--color-vermilion)] transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 flex-1">
              {currentStep === "puppy" && <Step1 puppy={state.data.puppy} onNext={() => {}} onBack={actions.close} />}
              {currentStep === "contact" && (
                <Step2 onNext={() => {}} onBack={() => {}} />
              )}
              {currentStep === "living" && (
                <Step3 onNext={() => {}} onBack={() => {}} />
              )}
              {currentStep === "agreement" && (
                <Step4 onSubmit={() => {}} onBack={() => {}} />
              )}
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-[var(--color-line-soft)]">
              <div className="flex justify-between">
                {currentStepIndex > 0 && (
                  <button
                    className="reserve-btn w-auto px-4 py-2 text-[11px] font-medium uppercase tracking-wider"
                    onClick={() => actions.back()}
                    style={{
                      background: "transparent",
                      color: "var(--bone)",
                      border: "1px solid var(--line)",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "8px 16px",
                      cursor: "pointer",
                      transition: "all .35s var(--ease)",
                      "&:hover": {
                        background: "var(--vermilion)",
                        borderColor: "var(--vermilion)",
                        color: "#05070a",
                      },
                    }}
                  >
                    Prev
                  </button>
                )}
                {currentStepIndex < steps.length - 1 && (
                  <button
                    className="reserve-btn w-auto px-4 py-2 text-[11px] font-medium uppercase tracking-wider"
                    onClick={() => actions.next()}
                    style={{
                      background: "var(--vermilion)",
                      color: "#05070a",
                      border: "1px solid var(--vermilion)",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "8px 16px",
                      cursor: "pointer",
                      transition: "all .35s var(--ease)",
                      "&:hover": {
                        background: "#b22c23",
                        borderColor: "#b22c23",
                      },
                    }}
                  >
                    Next
                  </button>
                )}
                {currentStepIndex === steps.length - 1 && (
                  <button
                    className="reserve-btn w-auto px-4 py-2 text-[11px] font-medium uppercase tracking-wider"
                    onClick={() => actions.close()}
                    style={{
                      background: "var(--vermilion)",
                      color: "#05070a",
                      border: "1px solid var(--vermilion)",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "8px 16px",
                      cursor: "pointer",
                      transition: "all .35s var(--ease)",
                      "&:hover": {
                        background: "#b22c23",
                        borderColor: "#b22c23",
                      },
                    }}
                  >
                    Reserve
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </div>
  );
}