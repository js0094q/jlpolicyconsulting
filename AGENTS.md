# AGENTS.md

## Project Overview

This repository is the production website for JL Policy Consulting, LLC. It is a single Next.js App Router application, not a monorepo.

The site presents Joseph Stewart / JL Policy Consulting as a high-trust health policy, reimbursement, drug pricing, PBM/formulary, market access, provider economics, and healthcare data analysis consultancy. It publishes two MDX-backed content collections:

- `content/insights`: shorter policy, reimbursement, and market-access interpretation.
- `content/research`: deeper evidence-led and data-driven analysis.

Runtime expectations:

- Node.js 20 in CI.
- npm with `package-lock.json`.
- Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest.
- File-backed MDX content. No database or CMS is currently part of the runtime.
- Deployed as a Vercel Next.js project from the repository root.

## Repository Structure

Active website source:

- `app/`: App Router pages, root layout, global styles, metadata routes, and API routes.
- `app/api/og/route.tsx`: public Open Graph image endpoint with input validation and rate limiting.
- `components/`: reusable site components, cards, layout primitives, and MDX editorial components.
- `components/content/`: MDX content blocks such as `KeyTakeaways`, `WhyItMatters`, `ComparisonTable`, `DataTable`, `Figure`, `Timeline`, `MethodologyNote`, and `Callout`.
- `content/insights/`: active Insight MDX articles.
- `content/research/`: active Research MDX articles.
- `lib/`: content loading, SEO, OG helpers, JSON-LD, site config, URL safety, and security controls.
- `public/`: committed static assets used by the site.
- `tests/`: Vitest tests for metadata, security controls, URL safety, sitemap, proxy behavior, OG behavior, and config.
- `proxy.ts`: request-time CSP nonce, security headers, and invalid content-slug handling.

Documentation and repo guidance:

- `README.md`: human-facing project overview and common commands.
- `repo.config.ts`: repository boundaries, content collections, allowed categories, and Vercel deployment metadata.
- `docs/brand/`: site visual and editorial presentation systems.
- `docs/specs/`: page and article specs. Use these before changing a matching page or content type.
- `docs/security/`: threat models and security notes.
- `docs/agent-guidance/`: reusable agent prompt/context material.
- `docs/vercel-deployment-checklist.md`: deployment QA checklist and Vercel commands.
- `.github/workflows/ci.yml`: CI quality, dependency review, high-risk change detection, and scheduled audit.
- `.github/CODEOWNERS`: required owner review coverage for high-risk paths.

Generated, archived, or non-runtime material:

- `output/og/`, `output/exports/`, `output/reports/`, `output/tmp/`: generated output only. Do not place runtime source here.
- `docs/archive/` and `docs/archive/prototypes/`: archived/non-runtime material. Do not treat as production source unless the user explicitly asks.
- `docs/projects/` and `docs/ops/`: organized non-runtime project and operational collateral.
- `deliverables/`, `tmp/`, `visuals/`, root `.docx`/`.pdf` files, and ignored project artifacts are workspace outputs, not website runtime source.
- Python document-generation scripts under `scripts/generate_*.py` are deliverable tooling. Do not run or edit them unless the task is document/package work.

## Development Setup

Use npm. Prefer the lockfile-preserving install for local and CI work:

```bash
npm ci
```

The Vercel install command recorded in `repo.config.ts` is:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Environment notes:

- Do not read, print, copy, or commit `.env*` files. `.env.local` is present locally and ignored.
- The current file-backed MDX site does not require runtime secrets.
- Optional public runtime tuning variables used by security controls include `OG_ROUTE_RATE_LIMIT_MAX_REQUESTS`, `OG_ROUTE_RATE_LIMIT_WINDOW_MS`, `SLUG_PROBE_THRESHOLD`, and `SLUG_PROBE_WINDOW_MS`.
- Keep `siteConfig.url` as `https://jlpolicyconsulting.com` unless the domain strategy is explicitly changed.

## Build Commands

Root app build:

```bash
npm run build
```

Start a production build locally after building:

```bash
npm run start
```

Development server:

```bash
npm run dev
```

There are no separate package builds or nested app builds in the active repository.

## Test and Validation Commands

Primary validation command:

```bash
npm run verify
```

`npm run verify` runs:

- `npm run lint`
- `npm run typecheck`
- `npm run validate:content`
- `npm run validate:codeowners`
- `npm run test`
- `npm run build`

Individual commands:

```bash
npm run lint
npm run typecheck
npm run validate:content
npm run validate:codeowners
npm run test
npm run build
npm run audit:prod
```

Targeted Vitest runs are acceptable while iterating:

```bash
npx vitest run tests/og-route.test.ts
npx vitest run tests/security-controls.test.ts
```

CI behavior in `.github/workflows/ci.yml`:

- Pull requests run high-risk change detection and dependency review.
- Pull requests and pushes to `main` run `npm ci`, lint, typecheck, content validation, CODEOWNERS validation, Vitest, and build.
- A scheduled Monday audit runs `npm audit --omit=dev` after logging dependency state.
- Workflow-only or lockfile-only PRs are intentionally blocked unless explicitly reviewed.

Before finishing a change:

- Run the narrowest relevant command set for the touched files.
- Run `npm run verify` for broad site, content-pipeline, config, security, dependency, or deployment changes.
- Fix lint, type, test, validation, and build errors before calling work complete unless the user explicitly asks to stop.
- If a check cannot be run, report the exact command not run and why.

## Coding Conventions

General engineering:

- Keep changes minimal, targeted, and reversible.
- Prefer existing components, utilities, config, and content pipelines before adding new ones.
- Use TypeScript with strict typing. Avoid `any` unless the surrounding code already requires it and the reason is clear.
- Use the `@/` path alias for app imports.
- Use `cn` from `lib/utils.ts` for conditional class composition.
- Keep App Router patterns intact. Do not introduce a parallel routing, CMS, data, or styling architecture unless asked.
- Do not add dependencies casually. If a dependency is necessary, explain why and update the lockfile intentionally.

UI and styling:

- Tailwind CSS v4 is configured through `app/globals.css`.
- Reuse existing tokens and utility classes such as `Container`, `kicker`, `page-title`, `page-lede`, `section-title`, `surface-card`, `line-list`, `button-primary`, and `button-secondary`.
- Follow `docs/brand/site-style-system.md`: restrained, premium, editorial, policy-literate, and commercially credible.
- Avoid flashy motion, generic agency sections, excessive gradients, oversized heroes, decorative noise, and card-heavy filler.
- Preserve mobile correctness, readable line lengths, and clear conversion flow.

Content and MDX:

- Active collections are only `content/insights` and `content/research`.
- MDX frontmatter is loaded in `lib/content.ts` and validated by `scripts/validate-content.mjs`.
- Required frontmatter: `title`, `summary`, `publishDate`, `category`, and `tags`.
- Optional frontmatter: `readingTime`, `seoTitle`, `seoDescription`, `canonicalUrl`, and `ogImage`.
- Slugs must be lowercase, hyphenated, and safe under the existing slug pattern.
- Do not add MDX `import` or `export` statements, script tags, inline event handlers, or `javascript:` links.
- Use existing MDX components only when they improve comprehension. Components should clarify evidence, implications, comparisons, methods, or sequencing, not decorate.
- For article standards, use `docs/specs/insight-article-spec.md`, `docs/specs/research-article-spec.md`, `docs/brand/content-presentation-system.md`, and `docs/specs/mdx-component-inventory.md`.
- Do not add or change category values unless `repo.config.ts`, `lib/content.ts`, `scripts/validate-content.mjs`, and related tests/docs are kept aligned.

Metadata, SEO, and site identity:

- Use `siteConfig` in `lib/site.ts` as the canonical source for site name, legal name, URL, email, LinkedIn URL, nav items, and default keywords.
- The canonical contact email is `Joseph.Stewart@JLPolicyConsulting.com`.
- Use `createPageMetadata` and `resolveArticleSeo` from `lib/seo.ts` instead of hand-rolling page metadata.
- Keep canonical URLs and OG image URLs same-site and HTTPS unless existing safety helpers allow otherwise.
- Preserve JSON-LD safety through `safeJsonLd`.

Security-sensitive code:

- Keep CSP nonce handling, security headers, slug safety, URL safety, OG route validation, and rate limits intact.
- Treat changes to `proxy.ts`, `app/api/og/route.tsx`, `lib/security-controls.ts`, `lib/security-events.ts`, `lib/content.ts`, `components/mdx-components.tsx`, `.github/workflows/**`, and `content/**` as high-risk and validate accordingly.
- Update tests with behavior changes to security controls, URL handling, content loading, SEO, JSON-LD, proxy behavior, or OG generation.

## Brand and Editorial Rules

Write in a voice that is concise, precise, evidence-oriented, professional, commercially literate, and policy-aware.

The site should communicate:

- Medicare policy, reimbursement, drug pricing, PBM/formulary dynamics, biosimilars/generics, market access strategy, gross-to-net modeling, provider economics, and healthcare data analysis expertise.
- Analytical rigor and operational understanding.
- Practical implications for manufacturers, payers/plans, providers, policy teams, and commercialization stakeholders.

Avoid:

- Generic consulting filler.
- Inflated claims or unsupported credentials.
- Buzzwords, vague "value-add" language, and thought-leader phrasing.
- Repetition dressed up as strategy.
- Visual or editorial choices that make the site feel trendy, startup-generic, or overdesigned.

For time-sensitive policy or market claims, verify against current sources before publishing. Do not invent citations or factual support.

## Security and Safety Rules

- Never commit secrets, API keys, tokens, credentials, `.env*` files, `.vercel/`, `node_modules/`, `.next/`, caches, virtual environments, build artifacts, or generated dependency folders.
- Respect `.gitignore`; do not force-add ignored artifacts unless the user explicitly requests it and the risk is clear.
- Do not print secrets or local environment values in logs or final responses.
- Do not weaken authentication, authorization, CSP, rate limiting, URL validation, slug validation, or generated-content sanitization.
- Avoid destructive commands such as `git reset --hard`, `git clean`, force pushes, mass deletes, or broad file moves unless the user explicitly requests them.
- This repo is not a trading system. Do not add financial execution, paper/live trading, broker, or credential-handling workflows to the website runtime.
- Treat dependency, workflow, lockfile, proxy, content-loader, and OG-route changes as requiring extra validation and clear reporting.

## Deployment Notes

Deployment target is Vercel as a Next.js app from the repository root.

Recorded deployment settings:

- Framework: Next.js.
- Install command: `npm install` in `repo.config.ts`.
- Build command: `npm run build` in `repo.config.ts`.
- Output directory: default/null.
- Domain: `jlpolicyconsulting.com`.

Deployment docs:

- Use `docs/vercel-deployment-checklist.md` for pre-deploy and post-deploy QA.
- Preview deploy command documented there: `vercel deploy -y`.
- Production deploy command documented there: `vercel deploy --prod -y`.
- Do not deploy, promote, or change Vercel project settings unless the user explicitly asks.

Pre-deploy validation:

```bash
npm run verify
```

Post-deploy smoke checks should include:

- `/`
- `/about`
- `/consulting`
- `/insights`
- `/research`
- one `/insights/[slug]`
- one `/research/[slug]`
- `/sitemap.xml`
- `/robots.txt`
- `/api/og?title=JL%20Policy%20Consulting`

There is no dedicated health-check endpoint in the current app.

## Pull Request / Commit Guidance

- Do not create commits, branches, pushes, deployments, or pull requests unless the user asks.
- Preferred commit style when asked: concise imperative subject, scoped to the actual change.
- Keep unrelated dirty files untouched.
- For PR-ready work, summarize changed files, validation commands run, and remaining risks or unvalidated areas.
- If editing high-risk paths covered by CODEOWNERS, call that out in the summary.
- Lockfile changes require a clear dependency reason and should not be mixed into unrelated content or UI work.

## Agent Workflow Rules

- Read the nearest `AGENTS.md` before editing. If nested `AGENTS.md` files are added later, the closest file to the edited path takes precedence.
- Explicit user instructions in chat override `AGENTS.md`.
- Start by identifying the smallest file set needed for the task. Do not scan the full repository by default.
- Use `rg` / `rg --files` for targeted search.
- Inspect existing patterns before editing.
- Prefer patch-sized edits over broad rewrites.
- Do not move files across active source, generated output, and archive boundaries without a clear task-specific reason.
- Do not treat `docs/archive/**` or archived prototypes as active implementation unless explicitly instructed.
- Add or update tests for changed behavior.
- After moving files or changing imports, run the relevant lint, typecheck, and test commands.
- For content changes, validate frontmatter, categories, SEO fields, and MDX safety.
- For page/UI changes, check responsive behavior and consistency with the brand/style docs.
- For security, metadata, content-loader, proxy, or OG changes, run focused tests plus the broader relevant validation.
- Final responses should state what changed, what was validated, what remains unvalidated, and a boundary audit: active source touched, generated output touched, archive touched, and any path violations.
