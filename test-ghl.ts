import { config } from "dotenv";
config({ path: ".env.local" });

import { createGHLClientFromEnv, normalizePhone, getBrandTag } from "./src/lib/ghl";

import { randomUUID } from "node:crypto";

function line(label = "") {
  console.log("\n" + "─".repeat(60));
  if (label) console.log(label);
  console.log("─".repeat(60));
}

async function main() {
  // ─────────────────────────────────────────────────────────────
  // 1. Verify environment
  // ─────────────────────────────────────────────────────────────
  line("ENV CHECK");

  const requiredEnv = [
    "GHL_BASE_URL",
    "GHL_API_VERSION",
    "GHL_API_KEY",
    "GHL_LOCATION_ID",
  ];
  const optionalEnv = ["GHL_PIPELINE_ID", "GHL_PIPELINE_STAGE_ID", "GHL_BRAND_TAG"];

  let missing = false;
  for (const key of requiredEnv) {
    const value = process.env[key];
    const ok = Boolean(value);
    console.log(`${ok ? "✅" : "❌"} ${key}${ok ? ` = ${mask(value!)}` : " (MISSING)"}`);
    if (!ok) missing = true;
  }
  for (const key of optionalEnv) {
    const value = process.env[key];
    const ok = Boolean(value);
    console.log(`${ok ? "✅" : "⚪"} ${key}${ok ? ` = ${mask(value!)}` : " (not set)"}`);
  }

  if (missing) {
    console.error("\n❌ Missing required env vars. Check .env.local.");
    process.exit(1);
  }

  // ─────────────────────────────────────────────────────────────
  // 2. Phone normalization tests
  // ─────────────────────────────────────────────────────────────
  line("PHONE NORMALIZATION");

  const phoneTests: Array<[string, string]> = [
    ["(555) 555-5555", "+15555555555"],
    ["555-555-5555", "+15555555555"],
    ["5555555555", "+15555555555"],
    ["15555555555", "+15555555555"],
    ["+1 (555) 555-5555", "+15555555555"],
    ["+63 917 123 4567", "+639171234567"],
    ["", ""],
    ["123", ""],
    ["abc", ""],
  ];

  let phoneFailures = 0;
  for (const [input, expected] of phoneTests) {
    const actual = normalizePhone(input);
    const ok = actual === expected;
    if (!ok) phoneFailures++;
    console.log(
      `${ok ? "✅" : "❌"} "${input}" → "${actual}"${ok ? "" : ` (expected "${expected}")`}`
    );
  }

  if (phoneFailures > 0) {
    console.error(`\n❌ ${phoneFailures} phone normalization test(s) failed.`);
    process.exit(1);
  }

  // ─────────────────────────────────────────────────────────────
  // 3. Brand tag check
  // ─────────────────────────────────────────────────────────────
  const brandTag = getBrandTag();
  console.log(`Tag applied to contacts: "${brandTag}"`);

  // ─────────────────────────────────────────────────────────────
  // 4. Create / upsert contact in GHL (idempotent)
  // ─────────────────────────────────────────────────────────────
  line("CREATE / UPSERT CONTACT");

  const client = createGHLClientFromEnv();

  const uid = randomUUID().replace(/-/g, "").slice(0, 10);
  const uniqueEmail = `test.${uid}@example.com`;
  const uniquePhone = normalizePhone(`+1555${String(Date.now()).slice(-7)}`);

  console.log(`Email: ${uniqueEmail}`);
  console.log(`Phone: ${uniquePhone}`);

  const contact = await client.upsertContact({
    firstName: "Test",
    lastName: `GHL-${uid}`,
    email: uniqueEmail,
    phone: uniquePhone,
    tags: ["api-test", brandTag],
    source: "Local Test Script",
    customFields: {
      test_run_id: uid,
      test_script: "test-ghl.ts",
    },
  });

  if (contact.error) {
    console.error("❌ Contact upsert failed:", contact.error);
    process.exit(1);
  }
  console.log(`✅ Contact ${contact.created ? "created" : "updated"}: ${contact.contactId}`);

  // ─────────────────────────────────────────────────────────────
  // 5. Upsert idempotency — the same submission twice must not fail
  // ─────────────────────────────────────────────────────────────
  line("UPSERT IDEMPOTENCY (same email twice)");

  const repeat = await client.upsertContact({
    firstName: "Test",
    lastName: `GHL-${uid}`,
    email: uniqueEmail,
    phone: uniquePhone,
    tags: ["api-test", brandTag],
    source: "Local Test Script",
  });

  if (repeat.error) {
    console.error("❌ Repeat upsert failed:", repeat.error);
    process.exit(1);
  }

  const sameContact = repeat.contactId === contact.contactId;
  console.log(
    `${sameContact ? "✅" : "❌"} Repeat upsert ${repeat.created ? "created" : "updated"}: ${repeat.contactId}`
  );
  if (!sameContact) {
    console.error("❌ Repeat upsert matched a different contact.");
    process.exit(1);
  }

  // ─────────────────────────────────────────────────────────────
  // 6. Create opportunity (only if pipeline env vars exist)
  // ─────────────────────────────────────────────────────────────
  line("CREATE OPPORTUNITY");

  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_PIPELINE_STAGE_ID;

  if (!pipelineId || !stageId) {
    console.log("⚪ Skipping — GHL_PIPELINE_ID or GHL_PIPELINE_STAGE_ID not set.");
  } else {
    const opp = await client.createOpportunity({
      pipelineId,
      stageId,
      name: `Test — ${uid}`,
      amount: 0,
      contactId: contact.contactId,
      status: "open",
    });

    if (opp.error) {
      console.error("❌ Opportunity creation failed:", opp.error);
      process.exit(1);
    }
    console.log(`✅ Opportunity created: ${opp.opportunityId}`);
  }

  // ─────────────────────────────────────────────────────────────
  // 7. Summary
  // ─────────────────────────────────────────────────────────────
  line("SUMMARY");
  console.log("✅ All checks passed.");
  console.log(`   Contact ID: ${contact.contactId}`);
  console.log(`   Search GHL for: ${uniqueEmail}`);
  console.log(`   Tags: api-test, ${brandTag}`);
}

function mask(value: string): string {
  if (value.length <= 8) return "***";
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}

main().catch((err) => {
  console.error("\n❌ Unexpected error:");
  console.error(err);
  process.exit(1);
});