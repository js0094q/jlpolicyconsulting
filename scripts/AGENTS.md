# AGENTS.md

## Scope

Applies to `scripts/**`.

## Rules

- `validate-content.mjs` and `validate-codeowners.mjs` are part of the website validation path.
- `generate-linkedin-banner.mjs` is reusable brand asset generation.
- Python `generate_*.py` files are deliverable tooling, not website runtime code.
- Do not add generated output to `scripts/`.
- Keep validation scripts deterministic and runnable from the repository root.
- If a script changes, run its direct command and any relevant downstream validation.
