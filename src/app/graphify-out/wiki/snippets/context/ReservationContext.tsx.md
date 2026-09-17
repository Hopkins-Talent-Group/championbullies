"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

type Step = "puppy" | "contact" | "living" | "agreement";

type PuppyData = {
  key: string;
  name: string;
  breed: string;
  price: string;
  gender: string;
  year: number;
};

type FormStepData = {
  puppy: PuppyData | null;
  // Step 1: Puppy (read-only, pre-filled from card click)
  // Step 2: Contact
  name: string;
  email: string;
  phone: string;
------ snippet (first lines) ------