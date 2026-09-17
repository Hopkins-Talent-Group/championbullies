"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useReservation } from "@/context/ReservationContext";
import { RESERVE_FORM_ID } from "@/lib/reservationFlow";
import { DEPOSIT_AMOUNT } from "@/lib/site";
import { agreementSchema, type AgreementDetails, type HomeType } from "@/lib/validation";
import { CheckRow } from "./Field";

const HOME_LABELS: Record<HomeType | "", string> = {
  house: "House",
  apartment: "Apartment",
  other: "Something else",
  "": "not answered",
};

export function Step4() {
  const { state, actions } = useReservation();
  const { data } = state;
  const puppyName = data.puppy?.name ?? "the puppy";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgreementDetails>({
    resolver: zodResolver(agreementSchema),
    defaultValues: {
      healthGuaranteeAck: data.healthGuaranteeAck,
      spayNeuterAck: data.spayNeuterAck,
      depositAck: data.depositAck,
    },
  });

  const rows: Array<[string, string]> = [
    ["Puppy", data.puppy ? `${data.puppy.name}, ${data.puppy.breed}` : "not chosen"],
    ["Price", data.puppy?.price ?? "not chosen"],
    ["Name", data.name || "not given"],
    ["Email", data.email || "not given"],
    ["Phone", data.phone || "not given"],
    ["Home", HOME_LABELS[data.homeType]],
    ["Yard", data.hasYard === null ? "not answered" : data.hasYard ? "yes" : "no"],
    ["Hours alone per day", data.hoursAlone || "not given"],
  ];

  return (
    <form
      id={RESERVE_FORM_ID}
      noValidate
      onSubmit={handleSubmit((values) => {
        void actions.submit(values);
      })}
    >
      <dl className="rs-review">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="rs-agreements">
        <CheckRow
          id="rs-health"
          title="Health guarantee"
          input={register("healthGuaranteeAck")}
        >
          A one year guarantee against genetic conditions diagnosed by a licensed vet. Accidents,
          illness, and normal breed wear are not covered.
        </CheckRow>
        {errors.healthGuaranteeAck ? (
          <p className="rs-error" role="alert">
            {errors.healthGuaranteeAck.message}
          </p>
        ) : null}

        <CheckRow id="rs-spay" title="Spay and neuter" input={register("spayNeuterAck")}>
          {puppyName} is sold on limited AKC registration with a spay or neuter contract by 6 to 9
          months of age.
        </CheckRow>
        {errors.spayNeuterAck ? (
          <p className="rs-error" role="alert">
            {errors.spayNeuterAck.message}
          </p>
        ) : null}

        <CheckRow id="rs-deposit" title={`${DEPOSIT_AMOUNT} deposit`} input={register("depositAck")}>
          {DEPOSIT_AMOUNT} holds {puppyName} and comes off the price. We send payment instructions
          once we confirm {puppyName} is still available. This site never takes card details.
        </CheckRow>
        {errors.depositAck ? (
          <p className="rs-error" role="alert">
            {errors.depositAck.message}
          </p>
        ) : null}
      </div>

      <p className="rs-help">
        Sending this reserves nothing yet: it starts the conversation and holds your place for a
        reply.
      </p>
    </form>
  );
}