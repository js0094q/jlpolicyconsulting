import { describe, expect, it } from "vitest";
import nextConfig from "@/next.config";

describe("next security headers", () => {
  it("defines security headers for all routes", async () => {
    expect(nextConfig.headers).toBeTypeOf("function");

    const rules = await nextConfig.headers?.();
    expect(rules).toBeDefined();
    expect(Array.isArray(rules)).toBe(true);

    const allRouteRule = rules?.find((rule) => rule.source === "/(.*)");
    expect(allRouteRule).toBeDefined();

    const keys = new Set(allRouteRule?.headers.map((header) => header.key));
    expect(keys.has("Content-Security-Policy")).toBe(false);
    expect(keys.has("Referrer-Policy")).toBe(true);
    expect(keys.has("X-Frame-Options")).toBe(true);
    expect(keys.has("X-Content-Type-Options")).toBe(true);
    expect(keys.has("Permissions-Policy")).toBe(true);
  });
});
