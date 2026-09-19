"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useReservation } from "@/context/ReservationContext";
import { RESERVE_FORM_ID } from "@/lib/reservationFlow";
import { contactSchema, type ContactDetails } from "@/lib/validation";
import { describedBy, Field, TextInput } from "./Field";

export function Step2() {
  const { state, actions } = useReservation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDetails>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: state.data.firstName,
      lastName: state.data.lastName,
      email: state.data.email,
      phone: state.data.phone,
    },
  });

  return (
    <form
      id={RESERVE_FORM_ID}
      noValidate
      onSubmit={handleSubmit((values) => {
        actions.setFields(values);
        actions.next();
      })}
    >
      <p className="rs-lead">We reply from this address, so use one you check.</p>

      {/* Row 1 — First name + Last name */}
      <div className="rs-field-grid">
        <Field id="rs-first-name" label="First name" error={errors.firstName?.message}>
          <TextInput
            id="rs-first-name"
            autoComplete="given-name"
            placeholder="First name"
            invalid={Boolean(errors.firstName)}
            aria-describedby={describedBy("rs-first-name", {
              error: errors.firstName?.message,
            })}
            {...register("firstName")}
          />
        </Field>

        <Field id="rs-last-name" label="Last name" error={errors.lastName?.message}>
          <TextInput
            id="rs-last-name"
            autoComplete="family-name"
            placeholder="Last name"
            invalid={Boolean(errors.lastName)}
            aria-describedby={describedBy("rs-last-name", {
              error: errors.lastName?.message,
            })}
            {...register("lastName")}
          />
        </Field>
      </div>

      {/* Row 2 — Email (full width) */}
      <Field id="rs-email" label="Email" error={errors.email?.message}>
        <TextInput
          id="rs-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          invalid={Boolean(errors.email)}
          aria-describedby={describedBy("rs-email", {
            error: errors.email?.message,
          })}
          {...register("email")}
        />
      </Field>

      {/* Row 3 — Phone (full width) */}
      <Field
        id="rs-phone"
        label="Phone"
        help="Used to arrange the handover and the deposit, not for marketing."
        error={errors.phone?.message}
      >
        <TextInput
          id="rs-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(321) 555-0123"
          invalid={Boolean(errors.phone)}
          aria-describedby={describedBy("rs-phone", {
            help: "Used to arrange the handover and the deposit, not for marketing.",
            error: errors.phone?.message,
          })}
          {...register("phone")}
        />
      </Field>
    </form>
  );
}