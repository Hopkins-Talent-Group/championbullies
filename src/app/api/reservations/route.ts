import { NextResponse } from "next/server";
import { createReference, deliverReservation } from "@/lib/reservations";
import { reservationSubmissionSchema, type ReservationResponse } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown = null;

  try {
    body = await request.json();
  } catch {
    body = null;
  }

  if (body === null) {
    return NextResponse.json<ReservationResponse>(
      { ok: false, reason: "invalid_json" },
      { status: 400 }
    );
  }

  // The server validates again: the browser's copy is a convenience, not a gate.
  const parsed = reservationSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ReservationResponse>({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const reference = createReference();
  const delivery = await deliverReservation(parsed.data, reference);

  if (!delivery.delivered) {
    return NextResponse.json<ReservationResponse>(
      { ok: false, reason: delivery.reason },
      { status: 503 }
    );
  }

  return NextResponse.json<ReservationResponse>({
    ok: true,
    reference,
    channel: delivery.channel,
  });
}