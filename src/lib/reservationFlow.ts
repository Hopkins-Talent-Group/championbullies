import type { StepName } from "./validation";

// The dialog's footer button submits the step form through this id, so the
// actions stay in one sticky bar instead of moving with the step content.
export const RESERVE_FORM_ID = "reservation-form";

export const STEP_TITLES: Record<StepName, string> = {
  puppy: "Puppy",
  contact: "Details",
  living: "Home",
  agreement: "Agreement",
};

export const STEP_HEADINGS: Record<StepName, string> = {
  puppy: "The puppy you selected",
  contact: "How we reach you",
  living: "Where the puppy will live",
  agreement: "What you are agreeing to",
};

export const STEP_ACTION_LABELS: Record<StepName, string> = {
  puppy: "Continue to details",
  contact: "Continue to home details",
  living: "Review the agreement",
  agreement: "Send reservation request",
};