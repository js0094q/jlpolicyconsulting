# AGENTS.md

## Scope

Applies to `content/**`.

## Rules

- Active website content lives only in `content/insights` and `content/research`.
- Do not create or use `content/interview-prep` for runtime website content; interview prep and similar project material belongs under `docs/projects/`.
- Preserve required frontmatter: `title`, `summary`, `publishDate`, `category`, and `tags`.
- Keep categories aligned with `repo.config.ts`, `lib/content.ts`, and `scripts/validate-content.mjs`.
- Use lowercase hyphenated slugs.
- Do not add MDX imports, exports, script tags, inline event handlers, or unsafe links.
- Use sources for factual policy, reimbursement, and market claims. Do not invent citations.
- Ensure length and styling are sufficient.
- Run `npm run validate:content` after content changes.
