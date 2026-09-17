import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

// Run after npm run build: node tests/contact-api.mjs
// Uses synthetic data only; never contacts a delivery provider.
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3197"], {
  cwd: process.cwd(),
  stdio: "ignore",
});
const base = "http://127.0.0.1:3197";
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error("Test server exited before readiness");
    try {
      ready = (await fetch(base)).ok;
      if (ready) break;
    } catch {
      // The server may not be listening yet.
    }
    await delay(500);
  }
  assert.ok(ready, "Test server must start");
  const valid = { name: "Test Visitor", email: "visitor@example.com", phone: "", message: "Synthetic contact API test." };
  const cases = [
    { label: "valid four-field request", body: valid, status: 200 },
    { label: "valid puppy inquiry", body: { ...valid, puppyKey: "daphne" }, status: 200 },
    { label: "invalid email", body: { ...valid, email: "invalid" }, status: 400, field: "email" },
    { label: "missing phone field", body: { name: valid.name, email: valid.email, message: valid.message }, status: 400, field: "phone" },
    { label: "malformed JSON", raw: "{", status: 400, field: "body" },
  ];
  for (const test of cases) {
    const response = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: test.raw ?? JSON.stringify(test.body),
    });
    assert.equal(response.status, test.status, test.label);
    const payload = await response.json();
    if (test.status === 200) assert.deepEqual(payload, { success: true }, test.label);
    else {
      assert.equal(payload.success, false, test.label);
      assert.ok(payload.errors.some((error) => error.field === test.field && typeof error.message === "string"), test.label);
    }
    console.log(`PASS: ${test.label}`);
  }
} finally {
  server.kill();
}
