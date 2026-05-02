# AGENTS.md

## Scope

Applies to `tests/**`.

## Rules

- Tests use Vitest in a Node environment.
- Keep tests focused on observable behavior, security controls, metadata, routing outputs, and content safety.
- Use the `@/` path alias consistently.
- Add or update tests with behavior changes in `app/`, `lib/`, content loading, SEO, OG, proxy, URL safety, or security controls.
- Prefer targeted test runs while iterating, then broader validation for shared or high-risk changes.
