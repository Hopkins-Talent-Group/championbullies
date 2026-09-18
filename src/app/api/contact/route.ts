import { NextResponse } from "next/server";
import { contactInquirySchema } from "@/lib/validation";

const rateLimitMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return { allowed: true, remaining: 4 };
  }

  if (now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return { allowed: true, remaining: 4 };
  }

  if (entry.count >= 5) {
    return { allowed: false, remaining: 0 };
  }

  rateLimitMap.set(ip, { count: entry.count + 1, reset: entry.reset });
  return { allowed: true, remaining: 5 - entry.count - 1 };
}

export const runtime = "nodejs";


export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, errors: [{ field: "rate_limit", message: "Too many requests. Max 5 per 10 minutes." }] },
      { status: 429 }
    );
  }

  let body: unknown = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errors: [{ field: "body", message: "Invalid JSON" }] },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { success: false, errors: [{ field: "body", message: "Invalid JSON" }] },
      { status: 400 }
    );
  }

  const parsed = contactInquirySchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  console.log("Contact submission:", parsed.data);

  return NextResponse.json({ success: true });
}