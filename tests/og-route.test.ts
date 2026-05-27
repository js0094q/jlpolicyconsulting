import { afterEach, describe, expect, it } from "vitest";
import { GET } from "@/app/api/og/route";

const originalOgRateLimitMax = process.env.OG_ROUTE_RATE_LIMIT_MAX_REQUESTS;
const originalOgRateLimitWindow = process.env.OG_ROUTE_RATE_LIMIT_WINDOW_MS;

function buildRequest(url: string, ip: string, userAgent = "vitest-og-route"): Request {
  return new Request(url, {
    headers: {
      "x-forwarded-for": ip,
      "user-agent": userAgent,
    },
  });
}

afterEach(() => {
  if (originalOgRateLimitMax === undefined) {
    delete process.env.OG_ROUTE_RATE_LIMIT_MAX_REQUESTS;
  } else {
    process.env.OG_ROUTE_RATE_LIMIT_MAX_REQUESTS = originalOgRateLimitMax;
  }

  if (originalOgRateLimitWindow === undefined) {
    delete process.env.OG_ROUTE_RATE_LIMIT_WINDOW_MS;
  } else {
    process.env.OG_ROUTE_RATE_LIMIT_WINDOW_MS = originalOgRateLimitWindow;
  }
});

describe("og route guards", () => {
  it("rejects unsupported query parameters", async () => {
    const response = await GET(buildRequest("https://jlpolicyconsulting.com/api/og?foo=bar", "198.51.100.1"));
    expect(response.status).toBe(400);
    expect(response.headers.get("Server-Timing")).toContain("og-total;dur=");
    expect(response.headers.get("X-RateLimit-Limit")).toBeTruthy();
  });

  it("rejects unsafe characters", async () => {
    const response = await GET(
      buildRequest("https://jlpolicyconsulting.com/api/og?title=%3Cscript%3E", "198.51.100.2"),
    );
    expect(response.status).toBe(400);
    expect(response.headers.get("Server-Timing")).toContain("og-total;dur=");
  });

  it("allows crawler requests without first-party origin headers", async () => {
    const response = await GET(
      buildRequest(
        "https://crawler.example/api/og?title=Open%20Graph%20Preview",
        "198.51.100.3",
        "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
      ),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=86400");
    expect(response.headers.get("X-RateLimit-Limit")).toBeTruthy();
  });

  it("rejects duplicate query parameters", async () => {
    const response = await GET(buildRequest("https://jlpolicyconsulting.com/api/og?title=a&title=b", "198.51.100.4"));
    expect(response.status).toBe(400);
    expect(await response.text()).toContain("Duplicate query parameter");
  });

  it("rejects URL schemes in text fields", async () => {
    const response = await GET(
      buildRequest("https://jlpolicyconsulting.com/api/og?title=https%3A%2F%2Fexample.com", "198.51.100.5"),
    );
    expect(response.status).toBe(400);
    expect(await response.text()).toContain("may not include URL schemes");
  });

  it("returns 429 after exceeding per-identity limits", async () => {
    process.env.OG_ROUTE_RATE_LIMIT_MAX_REQUESTS = "2";
    process.env.OG_ROUTE_RATE_LIMIT_WINDOW_MS = "60000";

    const first = await GET(buildRequest("https://jlpolicyconsulting.com/api/og?title=First", "198.51.100.6"));
    const second = await GET(buildRequest("https://jlpolicyconsulting.com/api/og?title=Second", "198.51.100.6"));
    const third = await GET(buildRequest("https://jlpolicyconsulting.com/api/og?title=Third", "198.51.100.6"));

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(third.status).toBe(429);
    expect(third.headers.get("Retry-After")).toBeTruthy();
    expect(third.headers.get("X-RateLimit-Remaining")).toBe("0");
  });
});
