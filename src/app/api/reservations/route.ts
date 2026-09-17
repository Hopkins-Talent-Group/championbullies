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

    const result = schema.safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      );
    }

    // Store submission
    const id = `submission-${Date.now()}`;
    submissions.set(id, { ...data, puppyKey: data.puppyKey || id });

    // GHL Integration
    if (ghlIntegration?.enabled) {
      try {
        const client = createGHLClient(ghlIntegration);

        const mappedData = mapReservationToGHL({
          ...data,
          puppyName: data.puppyName || "Unknown",
          breed: data.breed || "Unknown",
          ghlIntegration,
        });

        // Create contact in GHL
        const contactResult = await client.createContact({
          firstName: mappedData.firstName,
          lastName: mappedData.lastName,
          email: mappedData.email,
          phone: mappedData.phone,
          tags: mappedData.tags,
        });

        if (contactResult.error) {
          console.error("GHL contact creation error:", contactResult.error);
        }

        // Create deal in GHL
        const dealResult = await client.createDeal({
          pipelineId: ghlIntegration.pipelineId || "pipeline-1",
          name: `Reservation: ${mappedData.firstName} ${mappedData.lastName}`,
          amount: 500,
          contactId: contactResult.contactId,
          stageId: "stage-1", // Initial contact stage
          customFields: mappedData.customFields,
        });

        if (dealResult.error) {
          console.error("GHL deal creation error:", dealResult.error);
        }

        // Optionally update deal stage based on reservation progress
        if (dealResult.success && contactResult.contactId) {
          await client.updateDealStage(contactResult.contactId, "stage-2");
        }

      } catch (ghlError) {
        console.error("GHL integration error:", ghlError);
        // Don't fail the submission if GHL fails
      }
    }

    return NextResponse.json({
      success: true,
      submissionId: id,
      ghl: {
        contactCreated: !!ghlIntegration?.enabled,
        dealCreated: !!ghlIntegration?.enabled,
      },
    });
  } catch (error) {
    console.error("Reservation submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to check submission status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Submission ID required" },
      { status: 400 }
    );
  }

  const submission = submissions.get(id);
  if (!submission) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, submission });
}