"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { livingSchema } from "@/lib/validation";

type LivingFormValues = z.infer<typeof livingSchema>;

interface Step3Props {
  onNext: (data: LivingFormValues) => void;
  onBack: () => void;
}

export function Step3({ onNext, onBack }: Step3Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LivingFormValues>({
    resolver: zodResolver(livingSchema),
------ snippet (first lines) ------