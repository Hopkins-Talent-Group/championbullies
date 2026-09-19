import { z } from "zod";

import { PUPPY_CATALOG } from "@/lib/site";

export const RESERVATION_STEPS = ["puppy", "contact", "living", "agreement"] as const;
export type StepName = (typeof RESERVATION_STEPS)[number];

export const HOME_TYPES = ["house", "apartment", "other"] as const;
export type HomeType = (typeof HOME_TYPES)[number];

// Step 1: the puppy being reserved, taken from the shared gallery catalog.
const puppyKeySchema = z.enum(PUPPY_CATALOG.map((p) => p.key) as [string, ...string[]]);
export const puppySchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  breed: z.string().min(1),
  price: z.string().min(1),
  gender: z.string().min(1),
  year: z.number().int(),
  image: z.string().optional(),
});

// Step 2: contact details. Split name into first/last so GHL gets real fields.
export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Enter your first name")
    .max(60, "Keep this under 60 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Enter your last name")
    .max(60, "Keep this under 60 characters"),
  email: z.string().trim().email("Enter an email address we can reply to"),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s+().-]{10,}$/, "Enter a phone number with at least 10 digits"),
});

// A general inquiry or a question about one catalog puppy — the same interest
// list the contact section renders. Contact inquiries keep a single name field
// since they go into a simpler GHL contact form.
export const contactInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter the name we should ask for")
    .max(80, "Keep this under 80 characters"),
  email: contactSchema.shape.email,
  phone: z.string().trim().max(40),
  puppyKey: puppyKeySchema.or(z.literal("general")).default("general"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(2000, "Keep this under 2000 characters"),
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export type ContactFailureReason = "invalid" | "invalid_json" | "rate_limit" | "network";

export type ContactResponse =
  | { success: true }
  | { success: false; errors: Array<{ field: string; message: string }> };

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
  | "delivery_failed"
  | "network";

export type ReservationResponse =
  | { ok: true; reference: string; channel: "webhook" | "email" | "ghl" }
  | { ok: false; reason: ReservationFailureReason };

// GHL (GoHighLevel) integration types.
// ghl.ts's mapReservationToGHL consumes the nested ReservationSubmission shape;
// the flat ReservationWithGHL shape is kept for the origin/dev route variant.
export type GHLIntegration = {
  enabled: boolean;
  apiKey: string;
  locationId: string;
  pipelineId?: string;
  dealPipeline?: "reservation" | "contact" | "lead";
};

export type ReservationWithGHL = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeType: string;
  hasYard?: boolean;
  otherPets?: string;
  childrenAges?: string;
  hoursAlone?: string;
  healthGuaranteeAck?: boolean;
  spayNeuterAck?: boolean;
  depositPaid?: boolean;
  paymentMethodId?: string;
  puppyName?: string;
  breed?: string;
  ghlIntegration?: GHLIntegration;
  ghlContactId?: string;
  ghlDealId?: string;
};