"use client";

import { useState } from "react";
import { puppySchema } from "@/lib/validation";
import { z } from "zod";

type Puppy = z.infer<typeof puppySchema>;

interface Step1Props {
  puppy: Puppy | null;
  onNext: () => void;
  onBack: () => void;
}

export function Step1({ puppy, onNext, onBack }: Step1Props) {
  const [error, setError] = useState<string | null>(null);

  const proceed = () => {
    const result = puppySchema.safeParse(puppy);
    if (result.success) {
      setError(null);
      onNext();
------ snippet (first lines) ------