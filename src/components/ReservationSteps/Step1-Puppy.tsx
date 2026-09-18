"use client";

import Image from "next/image";
import { useReservation } from "@/context/ReservationContext";
import { RESERVE_FORM_ID } from "@/lib/reservationFlow";

function formatPrice(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "—";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "—";
}

function formatGender(value: string | undefined): string {
  if (!value) return "—";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function Step1() {
  const { state, actions } = useReservation();
  const puppy = state.data.puppy;

  if (!puppy) {
    return (
      <p className="rs-lead">
        No puppy is selected. Close this dialog and choose one from the gallery.
      </p>
    );
  }

  return (
    <form
      id={RESERVE_FORM_ID}
      onSubmit={(event) => {
        event.preventDefault();
        actions.next();
      }}
    >
      <div className="rs-puppy">
        {puppy.image ? (
          <div className="rs-puppy-photo" aria-hidden="true">
            <Image
              src={puppy.image}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="rs-puppy-info">
          <h4 className="rs-puppy-name">{puppy.name}</h4>
          {puppy.breed ? (
            <p className="rs-puppy-breed">{puppy.breed}</p>
          ) : null}

          <dl className="rs-facts">
            <div>
              <dt>Sex</dt>
              <dd>{formatGender(puppy.gender)}</dd>
            </div>
            <div>
              <dt>Born</dt>
              <dd>{puppy.year || "—"}</dd>
            </div>
          </dl>

          <div className="rs-puppy-price-row">
            <span className="rs-puppy-price-label">Price</span>
            <span className="rs-puppy-price-value">
              {formatPrice(puppy.price)}
            </span>
          </div>
        </div>
      </div>

      <p className="rs-lead">
        Three more steps: your contact details, then the home and routine
        questions, then the health guarantee, spay and neuter, and deposit
        terms. Nothing is sent until you press send at the end.
      </p>
    </form>
  );
}