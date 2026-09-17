import { z } from "zod";

export const RESERVATION_STEPS = ["puppy", "contact", "living", "agreement"] as const;
export type StepName = (typeof RESERVATION_STEPS)[number];

export const HOME_TYPES = ["house", "apartment", "other"] as const;
export type HomeType = (typeof HOME_TYPES)[number];

// Step 1: the puppy being reserved, taken from the gallery card.
export const puppySchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  breed: z.string().min(1),
  price: z.string().min(1),
  gender: z.string().min(1),
  year: z.number().int(),
  image: z.string().optional(),
});

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter the name we should ask for")
    .max(80, "Keep this under 80 characters"),
  email: z.string().trim().email("Enter an email address we can reply to"),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s+().-]{10,}$/, "Enter a phone number with at least 10 digits"),
});

export const livingSchema = z.object({
  homeType: z.enum(HOME_TYPES),
  hasYard: z.boolean(),
  otherPets: z.string().trim().max(120, "Keep this under 120 characters").optional(),
  childrenAges: z.string().trim().max(60, "Keep this under 60 characters").optional(),
  hoursAlone: z
    .string()
    .trim()
    .regex(/^([0-9]|1[0-9]|2[0-4])$/, "Enter a number of hours from 0 to 24"),
});

// The screen asks the yard question as two labelled radio options, so the form
// carries "yes" or "no" and converts to the boolean the payload needs.
export const livingFormSchema = livingSchema
  .omit({ hasYard: true })
  .extend({ yardAnswer: z.enum(["yes", "no"]) });
export type LivingFormValues = z.infer<typeof livingFormSchema>;

export const agreementSchema = z.object({
  healthGuaranteeAck: z
    .boolean()
    .refine((value) => value, "Acknowledge the health guarantee to continue"),
  spayNeuterAck: z
    .boolean()
    .refine((value) => value, "Acknowledge the spay and neuter agreement to continue"),
  depositAck: z
    .boolean()
    .refine((value) => value, "Confirm the deposit arrangement to continue"),
});

export const reservationSubmissionSchema = z.object({
  puppy: puppySchema,
  contact: contactSchema,
  living: livingSchema,
  agreement: agreementSchema,
});

export type PuppyDetails = z.infer<typeof puppySchema>;
export type ContactDetails = z.infer<typeof contactSchema>;
export type LivingDetails = z.infer<typeof livingSchema>;
export type AgreementDetails = z.infer<typeof agreementSchema>;
export type ReservationSubmission = z.infer<typeof reservationSubmissionSchema>;

export type ReservationFailureReason =
  | "invalid"
  | "invalid_json"
  | "unconfigured"
  | "delivery_failed";

export type ReservationResponse =
  | { ok: true; reference: string; channel: "webhook" | "email" }
  | { ok: false; reason: ReservationFailureReason };
