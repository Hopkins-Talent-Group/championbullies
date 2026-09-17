import { NextResponse } from "next/server";
import { reservationStepSchemas, type StepName } from "@/lib/validation";
import { createGHLClient, mapReservationToGHL, type GHLIntegration } from "@/lib/ghl";
import type { ReservationData } from "@/lib/validation";

// In-memory storage for demo purposes - replace with database in production
const submissions = new Map<string, ReservationData>();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { step, data, ghlIntegration } = body;

    // Validate the step data
    const schema = reservationStepSchemas[step as StepName];
    if (!schema) {
      return NextResponse.json(
        { error: "Invalid step" },
        { status: 400 }
      );
    }
------ snippet (first lines) ------