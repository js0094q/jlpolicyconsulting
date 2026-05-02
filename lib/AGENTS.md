# AGENTS.md

## Scope

Applies to `lib/**`.

## Rules

- Shared helpers here are production runtime code.
- Preserve strict TypeScript and small, explicit APIs.
- Keep site identity centralized in `lib/site.ts`.
- Keep SEO helpers in `lib/seo.ts` and OG helpers in `lib/og.ts`.
- Treat `lib/content.ts`, `lib/security-controls.ts`, `lib/security-events.ts`, and `lib/url-safety.ts` as security-sensitive.
- Add or update focused tests for content loading, URL handling, JSON-LD, security controls, SEO, or OG behavior changes.
