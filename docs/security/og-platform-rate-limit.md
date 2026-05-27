# /api/og platform enforcement runbook

## Goal
Enforce abuse protection for `GET /api/og` at platform edge (outside app instance memory), with shared telemetry and alerting.

## Recommended Vercel control plane setup
1. In Vercel, open the project and go to **Security**.
2. Enable **WAF** and add a rule set for:
   - Path match: `/api/og`
   - Request limit: tuned to expected social preview volume (start with `150` requests / `60s` / origin IP + UA fingerprint)
   - Action: `Challenge` or `Block`.
3. Keep application-side limiter for close control (`OG_ROUTE_RATE_LIMIT_*`) in place.

## API gateway / CDN alternative
- Route `/api/og` through a gateway/WAF that supports token-bucket or sliding-window limits.
- Use distributed identity key of `IP + user-agent` for parity with application logic.
- Forward the user identity into app logs (`x-user-agent`, `x-forwarded-for`) so endpoint-level events can still be correlated.

## App-level hardening already in place
- `OG_RATE_LIMIT_BACKEND=edge-cache` (default in edge runtime) stores rate-limit state in shared edge cache.
- Fallback to in-memory limiter when edge cache is unavailable.

## Telemetry and alerts
1. Emit security events for blocked traffic in route-level logs.
2. Alert on sustained spikes by combining:
   - 429 rate for `/api/og`
   - `invalid_slug_probe`/`og_route_rate_limit_exceeded`
   - cache-miss or latency anomalies around `/api/og`.
3. Escalate when event volume or 429 ratio exceeds an agreed threshold over 5-minute windows.

## Deployment gates
- Keep `npm run audit:prod` and `npm run verify` part of release checks.
- Confirm this runbook link is in the deployment checklists.
