const SAFE_CONTENT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RATE_LIMIT_SWEEP_THRESHOLD = 2_000;

interface SlidingWindowEntry {
  count: number;
  resetAt: number;
}

interface SecurityState {
  windows: Map<string, SlidingWindowEntry>;
}

type GlobalWithSecurityState = typeof globalThis & {
  __jlSecurityState?: SecurityState;
};

export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  used: number;
}

export interface ContentSlugPath {
  section: "insights" | "research";
  slug: string;
}

function getSecurityState(): SecurityState {
  const typedGlobal = globalThis as GlobalWithSecurityState;

  if (!typedGlobal.__jlSecurityState) {
    typedGlobal.__jlSecurityState = {
      windows: new Map(),
    };
  }

  return typedGlobal.__jlSecurityState;
}

function pruneExpiredEntries(windows: Map<string, SlidingWindowEntry>, now: number): void {
  if (windows.size < RATE_LIMIT_SWEEP_THRESHOLD) {
    return;
  }

  for (const [key, entry] of windows) {
    if (entry.resetAt <= now) {
      windows.delete(key);
    }
  }
}

function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const fallbackIpHeaders = ["x-real-ip", "cf-connecting-ip", "x-vercel-ip"];
  for (const header of fallbackIpHeaders) {
    const value = headers.get(header)?.trim();
    if (value) {
      return value;
    }
  }

  return "unknown";
}

function encodeBase64(bytes: Uint8Array): string {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  if (typeof btoa === "function") {
    return btoa(binary);
  }

  return Buffer.from(bytes).toString("base64");
}

export function getRequestIdentity(headers: Headers): string {
  const ip = getClientIp(headers);
  const userAgent = (headers.get("user-agent") ?? "unknown").slice(0, 80);
  return `${ip}|${userAgent}`;
}

export function isSafeContentSlug(slug: string): boolean {
  return SAFE_CONTENT_SLUG_PATTERN.test(slug);
}

export function getContentSlugFromPath(pathname: string): ContentSlugPath | null {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length !== 2) {
    return null;
  }

  const [section, rawSlug] = segments;

  if (section !== "insights" && section !== "research") {
    return null;
  }

  try {
    return {
      section,
      slug: decodeURIComponent(rawSlug),
    };
  } catch {
    return {
      section,
      slug: rawSlug,
    };
  }
}

export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): RateLimitDecision {
  if (limit < 1) {
    throw new Error("Rate limit must be at least 1");
  }

  if (windowMs < 1) {
    throw new Error("Rate limit window must be at least 1ms");
  }

  const state = getSecurityState();
  const { windows } = state;
  pruneExpiredEntries(windows, now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    windows.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt,
      used: 1,
    };
  }

  existing.count += 1;
  windows.set(key, existing);

  const allowed = existing.count <= limit;
  const remaining = Math.max(limit - existing.count, 0);

  return {
    allowed,
    remaining,
    resetAt: existing.resetAt,
    used: existing.count,
  };
}

export function createCspNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return encodeBase64(bytes);
}

export function buildContentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data: https:",
    "connect-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}
