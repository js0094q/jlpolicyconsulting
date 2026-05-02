# AGENTS.md

## Scope

Applies to `app/api/**`.

## Rules

- Public API routes are security-sensitive.
- Preserve input allowlists, length limits, rate limits, cache headers, and telemetry.
- Do not add unauthenticated mutation endpoints.
- Do not expose environment values, filesystem paths, secrets, stack traces, or local artifacts.
- For `/api/og`, keep arbitrary query text constrained to the existing validated fields unless the user explicitly asks for a broader public API.
- Run focused API/security tests after behavior changes, especially `npx vitest run tests/og-route.test.ts`.
