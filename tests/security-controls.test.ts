import { describe, expect, it } from "vitest";
import {
  buildContentSecurityPolicy,
  consumeRateLimit,
  getContentSlugFromPath,
  getRequestIdentity,
  isSafeContentSlug,
} from "@/lib/security-controls";

describe("security controls", () => {
  it("builds nonce-based CSP without unsafe-inline scripts", () => {
    const csp = buildContentSecurityPolicy("abc123");

    expect(csp).toContain("script-src 'self' 'nonce-abc123'");
    expect(csp).not.toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("style-src 'self' 'unsafe-inline'");
  });

  it("extracts identity from forwarded ip and user-agent", () => {
    const headers = new Headers({
      "x-forwarded-for": "198.51.100.10, 203.0.113.9",
      "user-agent": "test-agent",
    });

    expect(getRequestIdentity(headers)).toBe("198.51.100.10|test-agent");
  });

  it("accepts only safe content slugs", () => {
    expect(isSafeContentSlug("safe-slug-123")).toBe(true);
    expect(isSafeContentSlug("../../etc/passwd")).toBe(false);
    expect(isSafeContentSlug("unsafe slug")).toBe(false);
  });

  it("parses content slug paths for monitored routes", () => {
    expect(getContentSlugFromPath("/insights/example-post")).toEqual({
      section: "insights",
      slug: "example-post",
    });
    expect(getContentSlugFromPath("/research/example-post")).toEqual({
      section: "research",
      slug: "example-post",
    });
    expect(getContentSlugFromPath("/about")).toBeNull();
  });

  it("enforces sliding-window limits and resets after the window", () => {
    const key = "test-window";
    const windowMs = 1_000;
    const limit = 2;
    const start = 1_700_000_000_000;

    const first = consumeRateLimit(key, limit, windowMs, start);
    const second = consumeRateLimit(key, limit, windowMs, start + 10);
    const third = consumeRateLimit(key, limit, windowMs, start + 20);
    const afterReset = consumeRateLimit(key, limit, windowMs, start + windowMs + 1);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
    expect(afterReset.allowed).toBe(true);
  });
});
