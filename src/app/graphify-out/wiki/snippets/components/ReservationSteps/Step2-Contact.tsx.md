"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { contactSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

type ContactFormValues = z.infer<typeof contactSchema>;

interface Step2Props {
  onNext: (data: ContactFormValues) => void;
  onBack: () => void;
}

export function Step2({ onNext, onBack }: Step2Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });
------ snippet (first lines) ------