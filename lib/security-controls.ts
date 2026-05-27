const SAFE_CONTENT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RATE_LIMIT_SWEEP_THRESHOLD = 2_000;

interface SlidingWindowEntry {
  count: number;
  resetAt: number;
}

interface EdgeRateLimitStoreEntry {
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

function parseEdgeRateLimitEntry(payload: string): EdgeRateLimitStoreEntry | null {
  try {
    const parsed = JSON.parse(payload) as EdgeRateLimitStoreEntry;

    if (typeof parsed?.count !== "number" || typeof parsed?.resetAt !== "number") {
      return null;
    }

    const count = Number.parseInt(String(parsed.count), 10);
    const resetAt = Number.parseInt(String(parsed.resetAt), 10);

    if (Number.isNaN(count) || Number.isNaN(resetAt)) {
      return null;
    }

    return { count, resetAt };
  } catch {
    return null;
  }
}

async function consumeEdgeCacheRateLimit(
  cacheNamespace: string,
  key: string,
  limit: number,
  windowMs: number,
  now: number,
): Promise<RateLimitDecision> {
  if (limit < 1 || windowMs < 1) {
    return consumeRateLimit(key, limit, windowMs, now);
  }

  try {
    const cacheStore = typeof caches === "undefined" ? null : await caches.open(cacheNamespace);

    if (!cacheStore) {
      return consumeRateLimit(key, limit, windowMs, now);
    }

    const cacheKey = new Request(`https://rate-limit-cache.local/${encodeURIComponent(key)}`);
    const cached = await cacheStore.match(cacheKey);
    const existing = cached ? parseEdgeRateLimitEntry(await cached.text()) : null;

    const effectiveWindowMs = Math.max(windowMs, 1);
    let count = 1;
    let resetAt = now + effectiveWindowMs;

    if (existing && existing.resetAt > now) {
      count = existing.count + 1;
      resetAt = existing.resetAt;
    }

    const allowed = count <= limit;
    const remaining = Math.max(limit - count, 0);
    const cachePayload = JSON.stringify({ count, resetAt });
    const maxAge = Math.max(1, Math.floor((resetAt - now) / 1000));

    await cacheStore.put(
      cacheKey,
      new Response(cachePayload, {
        headers: {
          "Cache-Control": `public, max-age=${maxAge}`,
          "Content-Type": "application/json",
        },
      }),
    );

    return {
      allowed,
      remaining,
      resetAt,
      used: count,
    };
  } catch {
    return consumeRateLimit(key, limit, windowMs, now);
  }
}

export async function consumeDistributedRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): Promise<RateLimitDecision> {
  const backend = process.env.OG_RATE_LIMIT_BACKEND?.toLowerCase();
  const useEdgeCache = backend ? backend === "edge-cache" : true;

  if (!useEdgeCache) {
    return consumeRateLimit(key, limit, windowMs, now);
  }

  if (typeof caches === "undefined") {
    return consumeRateLimit(key, limit, windowMs, now);
  }

  return consumeEdgeCacheRateLimit("og-route-rate-limit", key, limit, windowMs, now);
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
