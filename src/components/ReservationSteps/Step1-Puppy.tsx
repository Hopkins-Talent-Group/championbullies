"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { puppySchema } from "@/lib/validation";

type Puppy = z.infer<typeof puppySchema>;

interface Step1Props {
  puppy: Puppy | null;
  onNext: () => void;
  onBack: () => void;
}

export function Step1({ puppy, onNext, onBack }: Step1Props) {
  const [error, setError] = useState<string | null>(null);

  const proceed = () => {
    try {
      puppySchema.parse(puppy);
      setError(null);
      onNext();
    } catch (e: any) {
      setError(e.errors[0]?.message || "Invalid puppy data");
    }
  };

  if (!puppy) {
    return null;
  }

  return (
    <section className="p-8 sm:p-6">
      <h2 className="text-xl font-semibold mb-6">Puppy Details</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <p className="text-lg font-bold text-vermilion">{puppy.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Breed</label>
          <p className="text-lg font-bold">{puppy.breed}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <p className="text-lg font-medium">{puppy.gender}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Year</label>
          <p className="text-lg font-medium">{puppy.year}</p>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-line-soft">
        <p className="text-sm text-muted mb-4">Summary for reservation</p>
        <p className="font-medium text-vermilion">${puppy.price}</p>
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
          className="reserve-btn"
          onClick={proceed}
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
          Next: Contact Info
        </button>
      </div>

      {error && (
        <p className="mt-4 text-sm text-vermilion">{error}</p>
      )}
    </section>
  );
}