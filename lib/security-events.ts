type SecurityEventValue = string | number | boolean | null;
type SecurityEventContext = Record<string, SecurityEventValue>;

export function recordSecurityEvent(event: string, context: SecurityEventContext): void {
  const payload = JSON.stringify({
    event,
    timestamp: new Date().toISOString(),
    ...context,
  });

  console.warn(`[security] ${payload}`);
}
