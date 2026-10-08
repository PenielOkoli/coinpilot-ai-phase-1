import assert from "node:assert/strict";
import { test } from "node:test";
import {
  chatSchema,
  preferencesSchema,
  reviewSchema,
} from "../src/lib/validation";
import { makeDemoReply } from "../src/lib/demo";
import { POST } from "../src/app/api/chat/route";

const request = (body: string, headers: Record<string, string> = {}) =>
  new Request("https://coinpilot.test/api/chat", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json", ...headers },
  });
test("messages reject blank text, excess length, unexpected keys and spoofed roles", () => {
  for (const input of [
    { message: " " },
    { message: "x".repeat(1001) },
    { message: "hi", role: "system" },
    { message: "hi", scenario: "live" },
  ])
    assert.equal(chatSchema.safeParse(input).success, false);
  assert.equal(chatSchema.parse({ message: "  BTC  " }).message, "BTC");
});
test("preferences are an allowlist, never arbitrary cookie values", () => {
  assert.equal(
    preferencesSchema.safeParse({ riskTolerance: "admin" }).success,
    false,
  );
  assert.equal(
    preferencesSchema.safeParse({ riskTolerance: "balanced" }).success,
    true,
  );
});
test("review requires a known proposal, explicit decision and approval acknowledgement", () => {
  assert.equal(
    reviewSchema.safeParse({
      proposalId: "demo-sol-review",
      decision: "approve",
      acknowledged: false,
    }).success,
    false,
  );
  assert.equal(
    reviewSchema.safeParse({
      proposalId: "live-order",
      decision: "approve",
      acknowledged: true,
    }).success,
    false,
  );
  assert.equal(
    reviewSchema.safeParse({
      proposalId: "demo-sol-review",
      decision: "approve",
      acknowledged: true,
      amount: 999,
    }).success,
    false,
  );
  assert.equal(
    reviewSchema.safeParse({
      proposalId: "demo-sol-review",
      decision: "reject",
      acknowledged: false,
    }).success,
    true,
  );
});
test("outage is explicit and never labels fixture evidence as live", () => {
  const reply = makeDemoReply("BTC signal", "outage");
  assert.equal(reply.mode, "degraded");
  assert.equal(reply.confidence, "not-assessed");
  assert.match(reply.content, /couldn't verify/);
  assert.equal(reply.sources[0].freshness, "sample");
});
test("chat endpoint returns a typed demo response without credentials", async () => {
  const response = await POST(
    request(JSON.stringify({ message: "Explain BTC" })),
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const { message } = await response.json();
  assert.equal(message.role, "assistant");
  assert.equal(message.mode, "demo");
  assert.equal(message.sources[0].kind, "fixture");
  assert.ok(message.id);
});
test("chat rejects malformed JSON, invalid schema, and oversized actual bodies", async () => {
  assert.equal((await POST(request("{broken"))).status, 400);
  assert.equal((await POST(request('{"message":""}'))).status, 400);
  assert.equal(
    (await POST(request(JSON.stringify({ message: "x".repeat(9000) })))).status,
    413,
  );
});
test("chat rejects cross-origin browser requests and unexpected content types", async () => {
  assert.equal(
    (await POST(request('{"message":"BTC"}', { origin: "https://other.test" })))
      .status,
    403,
  );
  assert.equal(
    (await POST(request('{"message":"BTC"}', { "Content-Type": "text/plain" })))
      .status,
    415,
  );
  assert.equal(
    (
      await POST(
        request('{"message":"BTC"}', { origin: "https://coinpilot.test" }),
      )
    ).status,
    200,
  );
});
