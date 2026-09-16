"use client";

import { useRef, useState, useEffect } from "react";
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
  onClose,
  puppy,
}: ReservationModalProps) {
  const { state, actions } = useReservation();
  const modalRef = useRef<HTMLDivElement>(null);
  const steps = ["puppy", "contact", "living", "agreement"] as Step[];

  // Sync context state when open/close props change
  useEffect(() => {
    if (isOpen && state.isOpen === false) {
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

  // Close on escape key
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        actions.close();
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [actions]);

  // Determine current step index
  const currentStepIndex = steps.indexOf(state.step);

  // Calculate progress percentage
  const progressPercent = ((currentStepIndex + 1) / steps.length) * 100;

  // Render null when closed
  if (!isOpen && !state.isOpen) {
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
        className="relative w-full max-w-2xl mx-auto bg-[var(--color-ink-2)] rounded-2xl overflow-hidden shadow-xl transform transition-transform ease-out duration-300 sm:max-w-3xl"
        style={{
          transform: "translateY(100%) scale(0.95)",
          opacity: 0,
          transition: "transform .3s ease, opacity .3s ease",
        }}
      >
        {state.isOpen && (
          <div
            className="flex flex-col min-h-[500px] bg-[var(--color-ink-2)]"
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

            {/* Stepper Progress */}
            <div
              className="px-6 py-3 bg-[var(--color-ink-1)] border-b border-[var(--color-line-soft)]"
            >
              <div className="flex justify-between text-xs font-medium text-[var(--color-muted)]">
                <span>Puppy</span>
                <span>Contact</span>
                <span>Living</span>
                <span>Agree</span>
              </div>
              <div className="flex flex-1 bg-[var(--color-vermilion)] h-1 rounded-full overflow-hidden">
                <div
                  className="h-full w-full bg-[var(--color-vermilion)] transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 flex-1">
              {state.step === "puppy" && <Step1 puppy={state.data.puppy} onNext={() => actions.next()} onBack={() => actions.back()} />}
              {state.step === "contact" && <Step2 onNext={() => actions.next()} onBack={() => actions.back()} />}
              {state.step === "living" && <Step3 onNext={() => actions.next()} onBack={() => actions.back()} />}
              {state.step === "agreement" && <Step4 onSubmit={() => {}} onBack={() => actions.back()} />}
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-[var(--color-line-soft)]">
              <div className="flex justify-between">
                {currentStepIndex > 0 && (
                  <button
                    className="reserve-btn w-auto px-4 py-2 text-[11px] font-medium uppercase tracking-wider rounded-md"
                    onClick={() => actions.back()}
                  >
                    Prev
                  </button>
                )}
                {currentStepIndex < steps.length - 1 && (
                  <button
                    className="reserve-btn w-auto px-4 py-2 text-[11px] font-medium uppercase tracking-wider rounded-md"
                    onClick={() => actions.next()}
                  >
                    Next
                  </button>
                )}
                {currentStepIndex === steps.length - 1 && (
                  <button
                    className="reserve-btn w-auto px-4 py-2 text-[11px] font-medium uppercase tracking-wider rounded-md"
                    onClick={() => actions.close()}
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