import { z } from "zod";

// Step 1: Puppy - read-only, displayed but not editable
export const puppySchema = z.object({
  key: z.string(),
  name: z.string(),
  breed: z.string(),
  price: z.string(),
  gender: z.string(),
  year: z.number(), // Changed from string to number to match Gallery data
});

// Step 2: Contact Info
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^[\d\s\+\(\)\-]{10,}$/, "Valid phone number required"),
});

// Step 3: Living Situation
export const livingSchema = z.object({
  homeType: z.enum(["house", "apartment", "other"]),
  hasYard: z.boolean(),
  otherPets: z.string().max(100).optional(),
  childrenAges: z.string().max(50).optional(),
  hoursAlone: z
    .string()
    .min(1, "How many hours is the puppy alone required")
    .regex(/^\d+$/, "Please enter a number of hours"),
});

// Step 4: Agreement & Deposit
export const agreementSchema = z.object({
  healthGuaranteeAck: z.boolean().refine((val) => val === true, {
    message: "Please acknowledge the health guarantee",
  }),
  spayNeuterAck: z.boolean().refine((val) => val === true, {
    message: "Please acknowledge the spay/neuter agreement",
  }),
  depositPaid: z.boolean().refine((val) => val === true, {
    message: "Please confirm deposit payment",
  }),
  paymentMethodId: z.string().optional(),
});

// Export combined schema for form validation
export const reservationStepSchemas = {
  puppy: puppySchema,
  contact: contactSchema,
  living: livingSchema,
  agreement: agreementSchema,
};

// Export type helpers
export type ReservationStepSchema =
  | typeof puppySchema
  | typeof contactSchema
  | typeof livingSchema
  | typeof agreementSchema;

export type StepName = keyof typeof reservationStepSchemas;

// GHL Integration
export type GHLIntegration = {
  enabled: boolean;
  apiKey: string;
  locationId: string;
  pipelineId?: string;
  dealPipeline?: "reservation" | "contact" | "lead";
};

export type ReservationWithGHL = ReservationData & {
  ghlIntegration: GHLIntegration;
  ghlContactId?: string;
  ghlDealId?: string;
};