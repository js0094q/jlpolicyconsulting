import { NextRequest, NextResponse } from "next/server";
import {
  buildContentSecurityPolicy,
  consumeRateLimit,
  createCspNonce,
  getContentSlugFromPath,
  getRequestIdentity,
  isSafeContentSlug,
} from "@/lib/security-controls";
import { recordSecurityEvent } from "@/lib/security-events";

const FALLBACK_SLUG_PROBE_THRESHOLD = 12;
const FALLBACK_SLUG_PROBE_WINDOW_MS = 60_000;

const STATIC_SECURITY_HEADERS: Array<{ key: string; value: string }> = [
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

function readPositiveInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

const slugProbeThreshold = readPositiveInt(process.env.SLUG_PROBE_THRESHOLD, FALLBACK_SLUG_PROBE_THRESHOLD);
const slugProbeWindowMs = readPositiveInt(process.env.SLUG_PROBE_WINDOW_MS, FALLBACK_SLUG_PROBE_WINDOW_MS);

function applySecurityHeaders(response: NextResponse, nonce: string): void {
  response.headers.set("Content-Security-Policy", buildContentSecurityPolicy(nonce));

  for (const header of STATIC_SECURITY_HEADERS) {
    response.headers.set(header.key, header.value);
  }
}

export function proxy(request: NextRequest): NextResponse {
  const nonce = createCspNonce();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-csp-nonce", nonce);

  const identity = getRequestIdentity(request.headers);
  const pathname = request.nextUrl.pathname;
  const contentSlugPath = getContentSlugFromPath(pathname);

  if (contentSlugPath && !isSafeContentSlug(contentSlugPath.slug)) {
    const probeDecision = consumeRateLimit(
      `slug-probe:${identity}`,
      slugProbeThreshold,
      slugProbeWindowMs,
    );

    recordSecurityEvent("invalid_slug_probe", {
      path: pathname,
      section: contentSlugPath.section,
      slug: contentSlugPath.slug,
      identity,
      attemptsInWindow: probeDecision.used,
      threshold: slugProbeThreshold,
    });

    if (!probeDecision.allowed) {
      recordSecurityEvent("invalid_slug_probe_threshold_exceeded", {
        identity,
        path: pathname,
        attemptsInWindow: probeDecision.used,
        threshold: slugProbeThreshold,
      });
    }

    const blockedResponse = new NextResponse("Not Found", { status: 404 });
    applySecurityHeaders(blockedResponse, nonce);
    return blockedResponse;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  applySecurityHeaders(response, nonce);
  return response;
}

export const config = {
  matcher: ["/:path*"],
};
