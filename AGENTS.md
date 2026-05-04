# AGENTS.md

## Website Scope

This repository is the production website for JL Policy Consulting, LLC. It is one private Next.js App Router application, not a monorepo, CMS, database app, or trading system.

The public site should present Joseph Stewart / JL Policy Consulting as a high-trust health policy, reimbursement, drug pricing, PBM/formulary, market access, provider economics, and healthcare data analysis consultancy. Keep the voice concise, analytical, commercially literate, policy-aware, evidence-oriented, restrained, and professional.

The active content model is file-backed MDX:

- `content/insights/`: shorter policy, reimbursement, and market-access interpretation.
- `content/research/`: deeper evidence-led and data-driven analysis.

## Hard Boundaries

Active website source:

- `app/`: App Router pages, layout, global styles, metadata routes, API routes, sitemap, robots, and not-found handling.
- `components/`: reusable UI, layout, cards, and MDX editorial components.
- `content/insights/` and `content/research/`: active published MDX content only.
- `lib/`: content loading, SEO, OG helpers, JSON-LD, site config, URL safety, and security controls.
- `public/`: committed runtime static assets.
- `tests/`: Vitest coverage for metadata, security controls, URL safety, content behavior, sitemap, proxy behavior, OG behavior, and config.
- `proxy.ts`, `repo.config.ts`, package files, and root Next/Vitest/TypeScript config files.

Guidance and reference:

- `README.md`: human-facing overview and common commands.
- `repo.config.ts`: source/output/archive boundaries, allowed categories, content collections, and Vercel deployment metadata.
- `docs/specs/`: page and article specs. Read the matching spec before changing a page or content type.
- `docs/security/`: threat models and security notes.
- `docs/agent-guidance/`: reusable agent prompt/context material.
- `docs/vercel-deployment-checklist.md`: deployment QA and Vercel command reference.
- Nested `AGENTS.md` files exist under major source directories. The closest `AGENTS.md` to the edited path takes precedence.

Generated, archived, or non-runtime material:

- `output/og/`, `output/exports/`, `output/reports/`, and `output/tmp/` are generated output only. Do not place runtime source there.
- `docs/archive/**` and `docs/archive/prototypes/**` are reference-only archived material unless the user explicitly asks to modify them.
- `docs/projects/**` and `docs/ops/**` are non-runtime project or operational collateral.
- `deliverables/`, `tmp/`, `visuals/`, root `.docx`/`.pdf` files, and ignored project artifacts are workspace outputs, not website runtime source.
- Python document-generation scripts under `scripts/generate_*.py` are deliverable tooling. Do not run or edit them unless the task is document/package work.

## Runtime and Commands

Use npm from the repository root. CI uses Node.js 20 and `package-lock.json`.

Install:

```bash
npm ci
```

Run locally:

```bash
npm run dev
```

Build and production start:

```bash
npm run build
npm run start
```

Primary validation:

```bash
npm run verify
```

`npm run verify` runs lint, typecheck, content validation, CODEOWNERS validation, Vitest, and build.

Useful targeted checks:

```bash
npm run lint
npm run typecheck
npm run validate:content
npm run validate:codeowners
npm run test
npm run build
npm run audit:prod
npx vitest run tests/og-route.test.ts
npx vitest run tests/security-controls.test.ts
```

Run the narrowest relevant validation while iterating. Use `npm run verify` for broad site, content-pipeline, config, security, dependency, workflow, or deployment changes.

## Implementation Rules

- Read only the files needed for the task. Do not scan the whole repository by default.
- Inspect the nearest `AGENTS.md` before editing a path with local guidance.
- Keep changes minimal, targeted, and reversible.
- Prefer existing components, helpers, utilities, config, and content pipelines before adding new abstractions.
- Use TypeScript strictly. Avoid `any` unless the surrounding code already requires it and the reason is clear.
- Use the `@/` import alias for app imports.
- Use `cn` from `lib/utils.ts` for conditional class composition.
- Preserve App Router patterns. Do not add a parallel routing, CMS, database, state, or styling architecture unless explicitly asked.
- Do not add dependencies casually. If a dependency is necessary, explain why and update the lockfile intentionally.
- Keep `siteConfig` in `lib/site.ts` as the source of truth for site name, legal name, URL, email, LinkedIn URL, nav items, and default keywords.
- The canonical contact email is `Joseph.Stewart@JLPolicyConsulting.com`.

## UI and Editorial Rules

- Reuse existing layout primitives, components, and global utility classes from `app/globals.css`.
- Keep the visual system restrained, premium, editorial, policy-literate, and commercially credible.
- Avoid generic agency sections, flashy motion, decorative noise, excessive gradients, oversized heroes, and card-heavy filler.
- Preserve mobile correctness, readable line lengths, clear navigation, and direct conversion paths.
- Write copy that is specific to Medicare policy, reimbursement, drug pricing, PBM/formulary dynamics, biosimilars/generics, market access strategy, gross-to-net modeling, provider economics, and healthcare data analysis.
- Avoid unsupported credentials, generic consulting filler, buzzwords, vague value-add language, thought-leader phrasing, and repetition dressed up as strategy.
- Verify time-sensitive policy or market claims against current sources before publishing. Do not invent citations.

## Content Rules

- Active collections are only `content/insights/` and `content/research/`.
- Required MDX frontmatter: `title`, `summary`, `publishDate`, `category`, and `tags`.
- Optional frontmatter: `readingTime`, `seoTitle`, `seoDescription`, `canonicalUrl`, and `ogImage`.
- Slugs must be lowercase, hyphenated, and safe under the existing slug pattern.
- Do not add MDX `import` or `export` statements, script tags, inline event handlers, or `javascript:` links.
- Use existing MDX components only when they clarify evidence, implications, comparisons, methods, or sequencing.
- Keep categories aligned across `repo.config.ts`, `lib/content.ts`, `scripts/validate-content.mjs`, tests, and docs.

## Security and Safety

- Never read, print, copy, or commit `.env*` files. `.env.local` is present locally and ignored.
- The current file-backed MDX site does not require runtime secrets.
- Never commit secrets, API keys, tokens, credentials, `.vercel/`, `node_modules/`, `.next/`, caches, virtual environments, build artifacts, or generated dependency folders.
- Do not weaken CSP, security headers, nonce handling, rate limiting, slug validation, URL validation, JSON-LD safety, OG route validation, or generated-content sanitization.
- Treat `proxy.ts`, `app/api/og/route.tsx`, `lib/security-controls.ts`, `lib/security-events.ts`, `lib/url-safety.ts`, `lib/content.ts`, `components/mdx-components.tsx`, `.github/workflows/**`, `package-lock.json`, and `content/**` as high-risk paths.
- Update focused tests when changing security controls, URL handling, content loading, SEO, JSON-LD, proxy behavior, OG generation, or workflow behavior.
- Avoid destructive commands such as `git reset --hard`, `git clean`, force pushes, mass deletes, or broad file moves unless explicitly requested.
- Respect `.gitignore`; do not force-add ignored artifacts unless the user explicitly requests it and the risk is clear.

## Deployment

Deployment target is Vercel as a Next.js app from the repository root.

Recorded settings in `repo.config.ts`:

- Framework: Next.js.
- Install command: `npm install`.
- Build command: `npm run build`.
- Output directory: default/null.
- Domain: `jlpolicyconsulting.com`.

Do not deploy, promote, or change Vercel project settings unless the user explicitly asks.

Before deployment, run:

```bash
npm run verify
```

Post-deploy smoke checks should cover `/`, `/about`, `/consulting`, `/insights`, `/research`, one Insight slug, one Research slug, `/sitemap.xml`, `/robots.txt`, and `/api/og?title=JL%20Policy%20Consulting`.

## Git and Closeout

- Do not create commits, branches, pushes, deployments, or pull requests unless the user asks.
- Keep unrelated dirty files untouched.
- Lockfile changes require a clear dependency reason and should not be mixed into unrelated content or UI work.
- Before finalizing, report what changed, what was validated, what remains unvalidated, and a boundary audit:
  - active website source touched,
  - generated output touched,
  - archive touched,
  - path violations, if any.
