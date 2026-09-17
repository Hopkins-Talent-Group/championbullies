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
------ snippet (first lines) ------