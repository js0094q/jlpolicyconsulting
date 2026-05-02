import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

describe("security proxy", () => {
  it("adds nonce-based CSP and baseline security headers", () => {
    const request = new NextRequest("https://jlpolicyconsulting.com/");
    const response = proxy(request);

    const csp = response.headers.get("Content-Security-Policy");
    expect(csp).toContain("script-src 'self' 'nonce-");
    expect(response.headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
  });

  it("returns 404 for invalid content slug probes", () => {
    const request = new NextRequest("https://jlpolicyconsulting.com/insights/bad%20slug");
    const response = proxy(request);

    expect(response.status).toBe(404);
  });

  it("does not apply OG rate-limit headers in proxy", () => {
    const request = new NextRequest("https://jlpolicyconsulting.com/api/og?title=test");
    const response = proxy(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("X-RateLimit-Limit")).toBeNull();
  });
});
