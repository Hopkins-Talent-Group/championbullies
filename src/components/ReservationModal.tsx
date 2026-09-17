"use client";

import { useRef, useEffect } from "react";
import { useReservation } from "@/context/ReservationContext";
import type { PuppyData } from "@/context/ReservationContext";
import { Step1 } from "./ReservationSteps/Step1-Puppy";
import { Step2 } from "./ReservationSteps/Step2-Contact";
import { Step3 } from "./ReservationSteps/Step3-Living";
import { Step4 } from "./ReservationSteps/Step4-Agreement";

type Step = "puppy" | "contact" | "living" | "agreement";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  puppy?: PuppyData;
};

export function ReservationModal({
  isOpen,
  onClose,
  puppy,
}: ReservationModalProps) {
  const { state, actions } = useReservation();
  const open = state.isOpen || isOpen;

  // Keep latest actions in a ref so effects don't re-run every render
  // (the actions object identity changes on each render).
  const actionsRef = useRef(actions);
  actionsRef.current = actions;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Sync context state when open/close props change
  useEffect(() => {
    if (isOpen && !state.isOpen) {
      if (puppy) {
        actionsRef.current.open(puppy);
      } else {
        actionsRef.current.open();
      }
    }
    if (!isOpen && state.isOpen) {
      actionsRef.current.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, puppy, state.isOpen]);

  // Close on escape key (only while open)
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        actionsRef.current.close();
        onCloseRef.current();
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  // Determine current step index (1-based for progress)
  const currentStepIndex =
    state.step === "puppy"
      ? 0
      : state.step === "contact"
        ? 1
        : state.step === "living"
          ? 2
          : 3;

  // Calculate progress percentage
  const progressPercent = ((currentStepIndex + 1) / 4) * 100;

  // Render null when closed
  if (!open) {
    return null;
  }

  const closeModal = () => {
    actions.close();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* backdrop (behind the panel, click to close) */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
        onClick={closeModal}
      />
      <div
        className="relative w-full max-w-2xl mx-auto bg-[var(--paper)] text-[var(--ink)] rounded-2xl overflow-hidden shadow-xl sm:max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div
          className="flex flex-col min-h-[500px] bg-[var(--paper)]"
        >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[var(--line-soft)]">
              <h2
                id="modal-title"
                className="text-xl font-semibold text-[var(--ink)]"
              >
                Reserve a Puppy
              </h2>
              <button
                className="absolute right-2 text-[11px] hover:text-[var(--accent)] transition-colors"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Stepper Progress */}
            <div
              className="px-6 py-3 bg-[var(--line-soft)] border-b border-[var(--line-soft)]"
            >
              <div className="flex justify-between text-xs font-medium text-[var(--muted)]">
                <span>Puppy</span>
                <span>Contact</span>
                <span>Living</span>
                <span>Agree</span>
              </div>
              <div className="flex flex-1 bg-[var(--line)] h-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 flex-1">
              {state.step === "puppy" && <Step1 puppy={state.data.puppy} onNext={() => actions.next()} onBack={closeModal} />}
              {state.step === "contact" && <Step2 onNext={(data) => { actions.setField("name", data.name); actions.setField("email", data.email); actions.setField("phone", data.phone); actions.next(); }} onBack={() => actions.back()} />}
              {state.step === "living" && <Step3 onNext={(data) => { actions.setField("homeType", data.homeType); actions.setField("hasYard", data.hasYard); actions.setField("otherPets", data.otherPets ?? ""); actions.setField("childrenAges", data.childrenAges ?? ""); actions.setField("hoursAlone", data.hoursAlone); actions.next(); }} onBack={() => actions.back()} />}
              {state.step === "agreement" && <Step4 onSubmit={(data) => { actions.setField("healthGuaranteeAck", data.healthGuaranteeAck); actions.setField("spayNeuterAck", data.spayNeuterAck); actions.setField("depositPaid", data.depositPaid); closeModal(); }} onBack={() => actions.back()} />}
            </div>
          </div>
      </div>
    </div>
  );
}