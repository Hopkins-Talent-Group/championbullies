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

  const onSubmit = (data: ContactFormValues) => {
    onNext(data);
  };

  return (
    <section className="p-8 sm:p-6">
      <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 bg-white border border-[var(--line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            placeholder="Your full name"
            aria-required="true"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-[var(--accent)]">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="w-full px-4 py-3 bg-white border border-[var(--line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            placeholder="your@email.com"
            aria-required="true"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-[var(--accent)]">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            {...register("phone", { required: "Phone is required" })}
            type="tel"
            className="w-full px-4 py-3 bg-white border border-[var(--line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            placeholder="(555) 555-5555"
            aria-required="true"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-[var(--accent)]">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="reserve-btn"
            onClick={onBack}
            style={{
              background: "transparent",
              color: "var(--ink)",
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
              background: "var(--accent)",
              color: "#ffffff",
              border: "1px solid var(--accent)",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "12px 20px",
              cursor: "pointer",
              transition: "all .35s var(--ease)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#b22c23";
              e.currentTarget.style.borderColor = "#b22c23";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
          >
            Next: Living Situation
          </button>
        </div>
      </form>
    </section>
  );
}