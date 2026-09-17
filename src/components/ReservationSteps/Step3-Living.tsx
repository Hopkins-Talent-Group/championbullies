"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useReservation } from "@/context/ReservationContext";
import { RESERVE_FORM_ID } from "@/lib/reservationFlow";
import { livingFormSchema, type LivingFormValues } from "@/lib/validation";
import { describedBy, Field, FieldGroup, RadioOption, TextInput } from "./Field";

const HOME_OPTIONS = [
  { value: "house", label: "House", description: "Owned or rented, with or without a yard" },
  { value: "apartment", label: "Apartment", description: "Includes condos and townhouses" },
  { value: "other", label: "Something else", description: "Mobile home, shared home, farm" },
] as const;

export function Step3() {
  const { state, actions } = useReservation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LivingFormValues>({
    resolver: zodResolver(livingFormSchema),
    defaultValues: {
      homeType: state.data.homeType || undefined,
      yardAnswer:
        state.data.hasYard === null ? undefined : state.data.hasYard ? "yes" : "no",
      otherPets: state.data.otherPets,
      childrenAges: state.data.childrenAges,
      hoursAlone: state.data.hoursAlone,
    },
  });

  return (
    <form
      id={RESERVE_FORM_ID}
      noValidate
      onSubmit={handleSubmit((values) => {
        actions.setFields({
          homeType: values.homeType,
          hasYard: values.yardAnswer === "yes",
          otherPets: values.otherPets ?? "",
          childrenAges: values.childrenAges ?? "",
          hoursAlone: values.hoursAlone,
        });
        actions.next();
      })}
    >
      <p className="rs-lead">
        Bulldog puppies spend a lot of their first year indoors with you, so these answers decide
        which puppy fits your home.
      </p>

      <FieldGroup legend="Where will the puppy live?" error={errors.homeType?.message}>
        {HOME_OPTIONS.map((option) => (
          <RadioOption
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            input={register("homeType", {
              required: "Choose where the puppy will live",
            })}
          />
        ))}
      </FieldGroup>

      <FieldGroup
        legend="Does the home have a yard?"
        columns
        error={errors.yardAnswer?.message}
      >
        <RadioOption
          value="yes"
          label="Yes"
          input={register("yardAnswer", { required: "Answer yes or no about the yard" })}
        />
        <RadioOption
          value="no"
          label="No"
          input={register("yardAnswer", { required: "Answer yes or no about the yard" })}
        />
      </FieldGroup>

      <Field
        id="rs-pets"
        label="Other pets in the home"
        help="Leave empty if this will be the only pet."
        error={errors.otherPets?.message}
      >
        <TextInput
          id="rs-pets"
          placeholder="Cat, older dog"
          invalid={Boolean(errors.otherPets)}
          aria-describedby={describedBy("rs-pets", {
            help: "Leave empty if this will be the only pet.",
            error: errors.otherPets?.message,
          })}
          {...register("otherPets")}
        />
      </Field>

      <Field
        id="rs-children"
        label="Children in the home"
        help="Ages are enough. Leave empty if there are none."
        error={errors.childrenAges?.message}
      >
        <TextInput
          id="rs-children"
          placeholder="7, 10"
          invalid={Boolean(errors.childrenAges)}
          aria-describedby={describedBy("rs-children", {
            help: "Ages are enough. Leave empty if there are none.",
            error: errors.childrenAges?.message,
          })}
          {...register("childrenAges")}
        />
      </Field>

      <Field
        id="rs-hours"
        label="Hours the puppy would be alone on a normal day"
        help="A puppy needs someone home for most of the first months."
        error={errors.hoursAlone?.message}
      >
        <TextInput
          id="rs-hours"
          inputMode="numeric"
          placeholder="6"
          invalid={Boolean(errors.hoursAlone)}
          aria-describedby={describedBy("rs-hours", {
            help: "A puppy needs someone home for most of the first months.",
            error: errors.hoursAlone?.message,
          })}
          {...register("hoursAlone", { required: "Enter how many hours the puppy is alone" })}
        />
      </Field>
    </form>
  );
}