"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agreementSchema } from "@/lib/validation";

type AgreementFormValues = z.infer<typeof agreementSchema>;

interface Step4Props {
  onSubmit: (data: AgreementFormValues) => void;
  onBack: () => void;
}

export function Step4({ onSubmit, onBack }: Step4Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AgreementFormValues>({
    resolver: zodResolver(agreementSchema),
  });
------ snippet (first lines) ------