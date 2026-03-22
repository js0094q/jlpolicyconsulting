const SAFE_EXTERNAL_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export function isSafeExternalHref(href: string): boolean {
  try {
    const parsed = new URL(href);
    return SAFE_EXTERNAL_PROTOCOLS.has(parsed.protocol);
  } catch {
    return false;
  }
}
