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
  });

  const onSubmit = (data: LivingFormValues) => {
    onNext(data);
  };

  return (
    <section className="p-8 sm:p-6">
      <h2 className="text-xl font-semibold mb-6">Living Situation</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Home Type</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="house"
                  {...register("homeType", { required: "Home type required" })}
                  className="w-4 h-4 rounded border-primary focus:ring-primary"
                />
                House
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="apartment"
                  {...register("homeType", { required: "Home type required" })}
                  className="w-4 h-4 rounded border-primary focus:ring-primary"
                />
                Apartment
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="other"
                  {...register("homeType", { required: "Home type required" })}
                  className="w-4 h-4 rounded border-primary focus:ring-primary"
                />
                Other
              </label>
            </div>
          </div>
          {errors.homeType && (
            <p className="mt-2 text-sm text-[var(--accent)]">{errors.homeType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Does the home have a yard?</label>
          <Controller
            name="hasYard"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-4">
                {[true, false].map((option) => (
                  <label key={String(option)} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={field.name}
                      ref={field.ref}
                      value={option ? "true" : "false"}
                      checked={option}
                      onBlur={field.onBlur}
                      onChange={() => field.onChange(option)}
                      className="w-4 h-4 rounded border-primary focus:ring-primary"
                    />
                    {option ? "Yes" : "No"}
                  </label>
                ))}
              </div>
            )}
          />
          {errors.hasYard && (
            <p className="mt-2 text-sm text-[var(--accent)]">{errors.hasYard.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Other Pets</label>
          <input
            {...register("otherPets", { maxLength: 100 })}
            type="text"
            className="w-full px-4 py-3 bg-white border border-[var(--line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            placeholder="e.g., cat, older dog"
            aria-describedby="other-pets-help"
          />
          <p className="mt-2 text-sm text-muted" id="other-pets-help">
            Optional: List other pets in the home
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Children Ages</label>
          <input
            {...register("childrenAges", { maxLength: 50 })}
            type="text"
            className="w-full px-4 py-3 bg-white border border-[var(--line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            placeholder="e.g., 3, 7, 10"
            aria-describedby="children-ages-help"
          />
          <p className="mt-2 text-sm text-muted" id="children-ages-help">
            Optional: Ages of children in the home
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Hours Puppy Alone Per Day</label>
          <input
            {...register("hoursAlone", {
              required: "Required",
              pattern: { value: /^\d+$/, message: "Enter a number of hours" },
            })}
            type="number"
            className="w-full px-4 py-3 bg-white border border-[var(--line)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            min="0"
            max="24"
            placeholder="e.g., 8"
            aria-describedby="hours-alone-help"
          />
          <p className="mt-2 text-sm text-muted" id="hours-alone-help">
            How many hours per day will the puppy be alone?
          </p>
          {errors.hoursAlone && (
            <p className="mt-2 text-sm text-[var(--accent)]">{errors.hoursAlone.message}</p>
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
            Next: Agreement & Deposit
          </button>
        </div>
      </form>
    </section>
  );
}