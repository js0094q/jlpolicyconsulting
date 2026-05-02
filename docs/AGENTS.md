# AGENTS.md

## Scope

Applies to `docs/**`.

## Directory Roles

- `docs/brand/`: site-wide visual and editorial systems.
- `docs/specs/`: page/article implementation specs.
- `docs/security/`: threat models and security notes.
- `docs/agent-guidance/`: reusable agent prompts and operating notes.
- `docs/projects/`: non-runtime client/project collateral and reference material.
- `docs/ops/`: operational material such as invoices.
- `docs/archive/`: reference-only archived material.

## Rules

- Do not treat `docs/archive/**` as production source unless the user explicitly asks.
- Do not move runtime logic into `docs/`.
- Keep project collateral under `docs/projects/<project>/`.
- Keep client-delivery outputs under `output/exports/` unless the task is explicitly archival/reference organization.
- If moving documentation paths referenced from `README.md`, `AGENTS.md`, or `repo.config.ts`, update those references.
