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
      name: state.data.name,
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

      <Field id="rs-name" label="Full name" error={errors.name?.message}>
        <TextInput
          id="rs-name"
          autoComplete="name"
          placeholder="First and last name"
          invalid={Boolean(errors.name)}
          aria-describedby={describedBy("rs-name", { error: errors.name?.message })}
          {...register("name")}
        />
      </Field>

      <Field id="rs-email" label="Email" error={errors.email?.message}>
        <TextInput
          id="rs-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          invalid={Boolean(errors.email)}
          aria-describedby={describedBy("rs-email", { error: errors.email?.message })}
          {...register("email")}
        />
      </Field>

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