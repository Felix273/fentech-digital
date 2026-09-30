import assert from "node:assert/strict";
import test from "node:test";
import { validateContactPayload } from "../lib/contact.ts";
import { buildMediaObjectKey, UploadValidationError, validateMediaFile } from "../lib/security/upload.ts";
import { rateLimit } from "../lib/security/rate-limit.ts";

test("contact validation rejects oversized values instead of truncating them", () => {
  const result = validateContactPayload({
    firstName: "A".repeat(81),
    lastName: "Doe",
    email: "person@example.com",
    message: "A valid message with enough context",
  });
  assert.equal(result.success, false);
  if (result.success) throw new Error("Expected oversized first name to be rejected");
  assert.match(result.errors.firstName ?? "", /between 2 and 80/);
});

test("rate limiter blocks requests after the configured limit", () => {
  const key = `test-${Date.now()}`;
  assert.equal(rateLimit(key, { limit: 2, windowMs: 60_000 }).allowed, true);
  assert.equal(rateLimit(key, { limit: 2, windowMs: 60_000 }).allowed, true);
  const blocked = rateLimit(key, { limit: 2, windowMs: 60_000 });
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds > 0);
});

test("media validation checks content signatures and generates server-owned keys", async () => {
  const file = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])], "avatar.png", { type: "image/png" });
  const metadata = await validateMediaFile(file);
  assert.equal(metadata.extension, "png");
  const key = buildMediaObjectKey(metadata.extension, "projects");
  assert.match(key, /^projects\/[0-9a-f-]+\.png$/);
});

test("media validation rejects spoofed MIME types", async () => {
  const file = new File(["not a png"], "avatar.png", { type: "image/png" });
  await assert.rejects(validateMediaFile(file), UploadValidationError);
});
