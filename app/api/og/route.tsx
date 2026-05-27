import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import {
  type RateLimitDecision,
  consumeDistributedRateLimit,
  getRequestIdentity,
} from "@/lib/security-controls";
import { recordSecurityEvent } from "@/lib/security-events";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_KICKER_MAX_LENGTH,
  OG_SUBTITLE_MAX_LENGTH,
  OG_TITLE_MAX_LENGTH,
} from "@/lib/og";

export const runtime = "edge";

const background = "#f6f5f1";
const surface = "#fcfcfa";
const border = "#d6dde5";
const ink = "#1f252d";
const muted = "#3f4a57";
const accent = "#1f3657";
const accentSoft = "#5f7897";

const OG_CACHE_CONTROL = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";
const OG_ERROR_CACHE_CONTROL = "no-store";
const OG_ALLOWED_QUERY_KEYS = new Set(["title", "subtitle", "kicker"]);
const OG_TEXT_PATTERN = /^[\p{L}\p{N}\s.,:;!?'"()%&+/\-]+$/u;
const OG_FORBIDDEN_URI_SCHEME_PATTERN = /\b(?:https?|ftp|file|data|javascript):\/\//iu;
const OG_MAX_QUERY_STRING_LENGTH = 512;
const FALLBACK_OG_RATE_LIMIT_MAX_REQUESTS = 40;
const FALLBACK_OG_RATE_LIMIT_WINDOW_MS = 60_000;

interface OgRateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

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

function getServerTimingValue(startedAt: number): string {
  const durationMs = Math.max(performance.now() - startedAt, 0);
  return `og-total;dur=${durationMs.toFixed(1)}`;
}

function getOgRateLimitConfig(): OgRateLimitConfig {
  const maxRequests = readPositiveInt(process.env.OG_ROUTE_RATE_LIMIT_MAX_REQUESTS, FALLBACK_OG_RATE_LIMIT_MAX_REQUESTS);
  const windowMs = readPositiveInt(process.env.OG_ROUTE_RATE_LIMIT_WINDOW_MS, FALLBACK_OG_RATE_LIMIT_WINDOW_MS);

  return { maxRequests, windowMs };
}

function buildRateLimitHeaders(decision: RateLimitDecision, limit: number): Record<string, string> {
  return {
    "X-RateLimit-Limit": limit.toString(),
    "X-RateLimit-Remaining": decision.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(decision.resetAt / 1000).toString(),
  };
}

function badRequest(message: string, startedAt: number, rateHeaders: Record<string, string>): Response {
  return new Response(message, {
    status: 400,
    headers: {
      "Cache-Control": OG_ERROR_CACHE_CONTROL,
      "Server-Timing": getServerTimingValue(startedAt),
      ...rateHeaders,
    },
  });
}

function tooManyRequests(
  startedAt: number,
  rateHeaders: Record<string, string>,
  retryAfterSeconds: number,
): Response {
  return new Response("Too Many Requests", {
    status: 429,
    headers: {
      "Cache-Control": OG_ERROR_CACHE_CONTROL,
      "Retry-After": retryAfterSeconds.toString(),
      "Server-Timing": getServerTimingValue(startedAt),
      ...rateHeaders,
    },
  });
}

function hasSuspiciousEntropy(value: string): boolean {
  const compact = value.replace(/\s+/g, "");

  if (compact.length < 48) {
    return false;
  }

  const uniqueChars = new Set(compact).size;
  return uniqueChars / compact.length > 0.65;
}

function getParam(value: string | null, fallback: string): string {
  if (!value) {
    return fallback;
  }

  const compacted = value.replace(/\s+/g, " ").trim();
  return compacted || fallback;
}

function parseParam(
  searchParams: URLSearchParams,
  key: string,
  fallback: string,
  maxLength: number,
  startedAt: number,
  rateHeaders: Record<string, string>,
): string | Response {
  const parsed = getParam(searchParams.get(key), fallback);

  if (parsed.length > maxLength) {
    return badRequest(`${key} exceeds maximum length of ${maxLength} characters`, startedAt, rateHeaders);
  }

  if (OG_FORBIDDEN_URI_SCHEME_PATTERN.test(parsed)) {
    return badRequest(`${key} may not include URL schemes`, startedAt, rateHeaders);
  }

  if (!OG_TEXT_PATTERN.test(parsed)) {
    return badRequest(`${key} contains unsupported characters`, startedAt, rateHeaders);
  }

  if (hasSuspiciousEntropy(parsed)) {
    return badRequest(`${key} failed entropy validation`, startedAt, rateHeaders);
  }

  return parsed;
}

export async function GET(request: Request) {
  const startedAt = performance.now();
  const url = new URL(request.url);
  const { searchParams } = url;
  const { maxRequests, windowMs } = getOgRateLimitConfig();
  const identity = getRequestIdentity(request.headers);
  const rateDecision = await consumeDistributedRateLimit(`og-route:${identity}`, maxRequests, windowMs);
  const rateHeaders = buildRateLimitHeaders(rateDecision, maxRequests);

  if (!rateDecision.allowed) {
    recordSecurityEvent("og_route_rate_limit_exceeded", {
      path: url.pathname,
      identity,
      used: rateDecision.used,
      limit: maxRequests,
      windowMs,
    });

    const retryAfterSeconds = Math.max(1, Math.ceil((rateDecision.resetAt - Date.now()) / 1000));
    return tooManyRequests(startedAt, rateHeaders, retryAfterSeconds);
  }

  if (url.search.length > OG_MAX_QUERY_STRING_LENGTH) {
    return badRequest(`Query string exceeds ${OG_MAX_QUERY_STRING_LENGTH} characters`, startedAt, rateHeaders);
  }

  for (const key of searchParams.keys()) {
    if (!OG_ALLOWED_QUERY_KEYS.has(key)) {
      return badRequest(`Unsupported query parameter: ${key}`, startedAt, rateHeaders);
    }
  }

  for (const key of OG_ALLOWED_QUERY_KEYS) {
    if (searchParams.getAll(key).length > 1) {
      return badRequest(`Duplicate query parameter: ${key}`, startedAt, rateHeaders);
    }
  }

  const title = parseParam(
    searchParams,
    "title",
    "Reimbursement Strategy, Drug Pricing Policy, and Market Access Insight",
    OG_TITLE_MAX_LENGTH,
    startedAt,
    rateHeaders,
  );

  if (title instanceof Response) {
    return title;
  }

  const subtitle = parseParam(
    searchParams,
    "subtitle",
    "Analysis and advisory at the intersection of pharmaceutical policy, pricing, access, and payer economics.",
    OG_SUBTITLE_MAX_LENGTH,
    startedAt,
    rateHeaders,
  );

  if (subtitle instanceof Response) {
    return subtitle;
  }

  const kicker = parseParam(
    searchParams,
    "kicker",
    "JL Policy Consulting, LLC",
    OG_KICKER_MAX_LENGTH,
    startedAt,
    rateHeaders,
  );

  if (kicker instanceof Response) {
    return kicker;
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background,
          color: ink,
          fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
          padding: "56px",
          border: `1px solid ${border}`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "18px",
            background: accent,
          }}
        />

        <div
          style={{
            marginLeft: "22px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: surface,
            border: `1px solid ${border}`,
            padding: "34px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              borderBottom: `1px solid ${border}`,
              paddingBottom: "14px",
            }}
          >
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: accentSoft,
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                fontSize: 18,
                color: muted,
              }}
            >
              {siteConfig.domain}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "28px",
              gap: "20px",
            }}
          >
            <div
              style={{
                fontSize: 58,
                lineHeight: 1.12,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                maxWidth: "1020px",
                fontFamily: "'Source Serif 4', 'Times New Roman', serif",
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: muted,
                maxWidth: "980px",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "20px",
              borderTop: `1px solid ${border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: muted,
              fontSize: 20,
            }}
          >
            <div style={{ color: accent }}>Pharmaceutical Reimbursement and Payer Dynamics</div>
            <div>U.S. Policy and Market Access Analysis</div>
          </div>
        </div>
      </div>
    ),
    {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      headers: {
        "Cache-Control": OG_CACHE_CONTROL,
        "Server-Timing": getServerTimingValue(startedAt),
        ...rateHeaders,
      },
    },
  );
}
