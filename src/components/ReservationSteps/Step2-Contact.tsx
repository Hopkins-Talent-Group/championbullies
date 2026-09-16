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
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    onNext(data);
  };

  return (
    <section className="p-8 sm:p-6">
      <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

      <form {...register} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 bg-[var(--color-ink-2)] border border-[var(--color-line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-vermilion)] transition-colors"
            placeholder="Your full name"
            aria-required="true"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-vermilion">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="w-full px-4 py-3 bg-[var(--color-ink-2)] border border-[var(--color-line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-vermilion)] transition-colors"
            placeholder="your@email.com"
            aria-required="true"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-vermilion">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            {...register("phone", { required: "Phone is required" })}
            type="tel"
            className="w-full px-4 py-3 bg-[var(--color-ink-2)] border border-[var(--color-line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-vermilion)] transition-colors"
            placeholder="(555) 555-5555"
            aria-required="true"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-vermilion">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            className="reserve-btn"
            onClick={onBack}
            style={{
              background: "transparent",
              color: "var(--bone)",
              border: "1px solid var(--line)",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "12px 20px",
              cursor: "pointer",
              transition: "all .35s var(--ease)",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="reserve-btn"
            style={{
              background: "var(--vermilion)",
              color: "#05070a",
              border: "1px solid var(--vermilion)",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "12px 20px",
              cursor: "pointer",
              transition: "all .35s var(--ease)",
              "&:hover": {
                background: "#b22c23",
                borderColor: "#b22c23",
              },
            }}
          >
            Next: Living Situation
          </button>
        </div>
      </form>
    </section>
  );
}