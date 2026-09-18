"use client";

import Image from "next/image";
import { useReservation } from "@/context/ReservationContext";
import { RESERVE_FORM_ID } from "@/lib/reservationFlow";

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
          <div className="rs-puppy-photo">
            <Image
              src={puppy.image}
              alt={`${puppy.name}, ${puppy.breed}`}
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div>
          <h4 className="rs-puppy-name">{puppy.name}</h4>
          <dl className="rs-facts">
            <div>
              <dt>Breed</dt>
              <dd>{puppy.breed}</dd>
            </div>
            <div>
              <dt>Sex</dt>
              <dd>{puppy.gender}</dd>
            </div>
            <div>
              <dt>Born</dt>
              <dd>{puppy.year}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd className="rs-facts-price">...</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="rs-lead">
        Three more steps: your contact details, then the home and routine questions, then the health
        guarantee, spay and neuter, and deposit terms. Nothing is sent until you press send at the
        end.
      </p>
    </form>
  );
}