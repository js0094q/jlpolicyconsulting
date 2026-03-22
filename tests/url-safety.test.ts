import { describe, expect, it } from "vitest";
import { isSafeExternalHref } from "@/lib/url-safety";

describe("isSafeExternalHref", () => {
  it("accepts safe external protocols", () => {
    expect(isSafeExternalHref("https://example.com")).toBe(true);
    expect(isSafeExternalHref("http://example.com")).toBe(true);
    expect(isSafeExternalHref("mailto:test@example.com")).toBe(true);
    expect(isSafeExternalHref("tel:+12125551212")).toBe(true);
  });

  it("rejects unsafe protocols", () => {
    expect(isSafeExternalHref("javascript:alert(1)")).toBe(false);
    expect(isSafeExternalHref("data:text/html;base64,SGVsbG8=")).toBe(false);
    expect(isSafeExternalHref("not-a-url")).toBe(false);
  });
});
