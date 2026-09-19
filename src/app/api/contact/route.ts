// src/app/api/contact/route.ts

import { NextResponse } from "next/server";
import { contactInquirySchema } from "@/lib/validation";
import { createGHLClientFromEnv, getBrandTag, normalizePhone } from "@/lib/ghl";

export const runtime = "nodejs";

// ---------- Rate Limit (in-memory; swap for Upstash Redis in production) ----------
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return { allowed: true };
  }

  if (entry.count >= 5) return { allowed: false };

  entry.count += 1;
  return { allowed: true };
}

// ---------- Email fallback via Resend (env-gated) ----------
async function sendFallbackEmail(payload: {
  name: string;
  email: string;
  phone: string;
  puppyKey: string;
  message: string;
}): Promise<{ delivered: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!key || !to || !from) {
    return { delivered: false, error: "email_not_configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `ChampionBullies <${from}>`,
        to: [to],
        reply_to: payload.email,
        subject: `New inquiry — ${payload.name}`,
        text: [
          `Name:     ${payload.name}`,
          `Email:    ${payload.email}`,
          `Phone:    ${payload.phone || "—"}`,
          `Interest: ${payload.puppyKey || "General Inquiry"}`,
          "",
          "Message:",
          payload.message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { delivered: false, error: `resend_${res.status}: ${body.slice(0, 200)}` };
    }

    return { delivered: true };
  } catch (err) {
    return {
      delivered: false,
      error: err instanceof Error ? err.message : "resend_unexpected",
    };
  }
}

// ---------- POST ----------
export async function POST(request: Request) {
  // 1. Client IP
  const ip =
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // 2. Rate limit
  if (!checkRateLimit(ip).allowed) {
    return NextResponse.json(
      {
        success: false,
        errors: [
          {
            field: "rate_limit",
            message: "Too many requests. Try again in a few minutes.",
          },
        ],
      },
      { status: 429 }
    );
  }

  // 3. Parse JSON
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errors: [{ field: "body", message: "Invalid JSON" }] },
      { status: 400 }
    );
  }

  // 4. Validate
  const parsed = contactInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        errors: parsed.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      },
      { status: 400 }
    );
  }

  const { name, email, phone, puppyKey, message } = parsed.data;

  const [firstName, ...lastNameParts] = name.trim().split(" ");
  const lastName = lastNameParts.join(" ") || "";
  const cleanPhone = normalizePhone(phone);
  const brandTag = getBrandTag();

  // 5a. Try GHL first
  let ghlDelivered = false;
  try {
    const client = createGHLClientFromEnv();
    const contact = await client.upsertContact({
      firstName,
      lastName,
      email,
      phone: cleanPhone,
      source: "ChampionBullies — Contact",
      tags: [
        "dog-adoption",
        brandTag,
        puppyKey && puppyKey !== "general"
          ? `interest:${puppyKey}`
          : "interest:general",
      ],
    });

    if (contact.error) {
      console.error("[GHL] upsertContact failed:", contact.error);
    } else {
      ghlDelivered = true;

      // Create opportunity if pipeline config exists
      const pipelineId = process.env.GHL_PIPELINE_ID;
      const stageId = process.env.GHL_PIPELINE_STAGE_ID;

      if (pipelineId && stageId) {
        const opp = await client.createOpportunity({
          pipelineId,
          stageId,
          name: `${name} — ${
            puppyKey && puppyKey !== "general" ? puppyKey : "General Inquiry"
          }`,
          amount: 0,
          contactId: contact.contactId,
          status: "open",
        });

        if (opp.error) {
          console.error("[GHL] createOpportunity failed:", opp.error);
        }
      }
    }
  } catch (err) {
    console.error("[GHL] Unexpected error:", err);
  }

  // 5b. Email fallback if GHL failed
  let emailDelivered = false;
  if (!ghlDelivered) {
    const fallback = await sendFallbackEmail({
      name,
      email,
      phone: cleanPhone,
      puppyKey: puppyKey || "general",
      message,
    });

    if (fallback.delivered) {
      emailDelivered = true;
    } else {
      console.error("[Contact] Email fallback failed:", fallback.error);
    }
  }

  // 6. Return success if either channel delivered
  if (ghlDelivered || emailDelivered) {
    return NextResponse.json({
      success: true,
      channel: ghlDelivered ? "ghl" : "email",
    });
  }

  // 7. Both failed — surface a real error
  return NextResponse.json(
    {
      success: false,
      errors: [
        {
          field: "server",
          message:
            "We couldn't save your request. Please try again or call us directly.",
        },
      ],
    },
    { status: 502 }
  );
}