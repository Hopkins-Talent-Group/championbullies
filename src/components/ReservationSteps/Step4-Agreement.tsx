"use client";

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
  } = useForm<AgreementFormValues>();

  const onSubmitHandler = (data: AgreementFormValues) => {
    onSubmit(data);
  };

  return (
    <section className="p-8 sm:p-6">
      <h2 className="text-xl font-semibold mb-6">Agreement & Deposit</h2>

      <p className="text-sm text-muted mb-6">
        By proceeding, you acknowledge and agree to the following terms for reserving
        one of our English or French Bulldog puppies.
      </p>

      <form {...register} onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register("healthGuaranteeAck", { required: "Required" })}
              className="w-4 h-4 rounded border-primary focus:ring-primary mt-1"
              name="healthGuaranteeAck"
            />
            <div>
              <p className="text-sm font-medium">
                I acknowledge the <strong>Health Guarantee</strong>. All puppies undergo
                comprehensive health screening, including genetic testing, veterinary
                examination, and vaccination records. A 1-year genetic health guarantee
                is provided.
              </p>
              <p className="text-xs text-muted ml-4">
                Covers congenital conditions only. Normal wear and tear not covered.
              </p>
            </div>
          </label>
          {errors.healthGuaranteeAck && (
            <p className="mt-2 text-sm text-vermilion">Please acknowledge the health guarantee</p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register("spayNeuterAck", { required: "Required" })}
              className="w-4 h-4 rounded border-primary focus:ring-primary mt-1"
              name="spayNeuterAck"
            />
            <div>
              <p className="text-sm font-medium">
                I acknowledge the <strong>Spay/Neuter Agreement</strong>. All our puppies
                are sold on a limited registration with a spay/neuter contract by age
                6-9 months. This ensures the health of our bloodlines and breed
                improvement.
              </p>
              <p className="text-xs text-muted ml-4">
                Contract must be signed prior to puppy going to new home.
              </p>
            </div>
          </label>
          {errors.spayNeuterAck && (
            <p className="mt-2 text-sm text-vermilion">Please acknowledge the spay/neuter agreement</p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register("depositPaid", { required: "Required" })}
              className="w-4 h-4 rounded border-primary focus:ring-primary mt-1"
              name="depositPaid"
            />
            <div>
              <p className="text-sm font-medium">
                I confirm the <strong>$500 deposit</strong>. This secures the puppy and
                is applied toward the total purchase price. Deposit is non-refundable
                if you decide not to proceed, but is refundable if we are unable to
                match you with a suitable puppy.
              </p>
              <p className="text-xs text-muted ml-4">
                Payment processed via Stripe. No card details stored on this site.
              </p>
            </div>
          </label>
          {errors.depositPaid && (
            <p className="mt-2 text-sm text-vermilion">Please confirm deposit payment</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <p className="text-sm text-muted">
            We accept all major credit cards via Stripe. Your payment information is
            processed securely and not stored on this site.
          </p>
        </div>

        <div className="flex justify-between mt-8">
          {isSubmitting ? (
            <p className="text-sm text-muted">Submitting...</p>
          ) : (
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
              Reserve Puppy — $500 Deposit
            </button>
          )}
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
            Prev: Living Situation
          </button>
        </div>
      </form>
    </section>
  );
}