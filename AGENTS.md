Developer: # AGENTS.md

## Developer: Role and Objective

You are working on the JL Policy Consulting website repository.

This is a production-grade professional website for JL Policy Consulting, LLC, built in Next.js with TypeScript, Tailwind CSS, and an MDX content model for insights and research.

Your objective is to make high-quality, minimal, production-safe improvements without scanning or reinterpreting the entire repository unless absolutely necessary.

The site exists to:
- present Joseph Stewart / JL Policy Consulting as an authoritative health policy, reimbursement, and market access consultancy,
- communicate expertise with clarity and restraint,
- publish high-signal insights and research,
- support credibility, discoverability, and inbound business development,
- maintain a premium, professional, policy-literate presentation.

Work quickly, but do not be sloppy.
Prefer precision over breadth.
Prefer reuse over unnecessary invention.
Prefer structured reasoning over exploratory churn.

---

## Repository Truth and Priority Order

When there is ambiguity, use this order of precedence:

1. This `AGENTS.md`
2. `repo.config.ts`
3. `README.md`
4. page- or feature-specific docs under `docs/`
5. existing implementation in `app/`, `components/`, `lib/`
6. archived material under `docs/archive/`

Do not treat archived prototypes as production source of truth.

---

## Repository Layout

This repository explicitly separates website source, generated output, archived material, and deployment-relevant paths.

### Website source of truth
- `app/`
- `content/`
- `public/`
- `docs/`
- `tests/`

### Generated output only
- `output/og/`
- `output/exports/`
- `output/reports/`
- `output/tmp/`

### Archived / non-runtime
- `docs/archive/`
- `docs/archive/prototypes/`

### Deployment-relevant paths
- root Next.js application
- `app/`
- `public/`
- `content/`
- config files at root
- deployment and CI files

Do not place runtime logic in `output/`.
Do not treat `docs/archive/**` as active implementation unless explicitly instructed.

---

## Non-Negotiable Working Rules

1. Do not scan the full repository by default.
2. Read only the files required for the task.
3. State the minimum file set mentally before editing, and keep edits constrained to that scope.
4. Prefer improving existing files over adding new abstractions.
5. Do not create duplicate components, duplicate utilities, or alternate content pipelines unless necessary.
6. Preserve the production Next.js root app architecture.
7. Keep archived prototypes isolated.
8. Do not move files between source, output, and archive directories without a clear reason.
9. Do not weaken content quality in exchange for speed.
10. Do not introduce generic consulting copy.

---

## Project Identity

JL Policy Consulting is not a generic agency site.

The website should communicate:
- deep fluency in Medicare policy, reimbursement, drug pricing, PBM and formulary access & dynamics, biosimilars and generics, market access strategy, gross-to-net modeling, reimbursement and healthcare data analysis,
- analytical rigor,
- commercial relevance,
- restrained credibility,
- strong information hierarchy,
- premium but understated design.

The site should feel:
- authoritative,
- clear,
- high-trust,
- policy-literate,
- commercially aware,
- not trendy,
- not startup-generic,
- not overdesigned,
- not marketing-fluffy.

---

## Brand and Writing Standards

### Voice
Use prose that is:
- concise,
- precise,
- evidence-oriented,
- professional,
- commercially literate,
- policy-aware.

### Avoid
Do not use:
- inflated claims,
- generic consulting filler,
- buzzwords,
- vague “value-add” language,
- empty superlatives,
- “thought leader” style copy,
- melodramatic or salesy tone.

### Preferred characteristics
Copy should:
- make specific claims,
- connect policy to business implications,
- show operational understanding,
- sound credible to manufacturer, payer, provider, and policy audiences,
- remain readable for non-specialist but professional visitors.

### Homepage standard
The first screen must make clear:
- who the site serves,
- what problem it helps solve,
- why the expertise is differentiated.

---

## Content Model Rules

The active content collections are:
- `content/insights`
- `content/research`

Allowed categories:
- `Medicare Policy`
- `Drug Pricing`
- `PBM and Formulary Dynamics`
- `Biosimilars and Generics`
- `Healthcare Data Analysis`
- `Market Access Strategy`
- `Gross-to-Net Modeling`,
- `Reimbursement`


When working on content:
- preserve frontmatter integrity,
- do not invent unsupported claims,
- maintain category discipline,
- keep SEO fields coherent with page/article content,
- ensure slugs, metadata, and canonical logic stay clean.

---

## Design and UI Standards

Use a restrained, premium, professional presentation.

### Priorities
- visual clarity,
- strong hierarchy,
- disciplined spacing,
- excellent readability,
- consistency,
- low clutter,
- mobile correctness,
- clear conversion flow.

### Avoid
- flashy motion,
- decorative noise,
- excessive gradients,
- dense walls of text without structure,
- oversized marketing sections that add no informational value,
- trendy UI patterns that undermine credibility.

### Preference
- simple layouts,
- clean typography,
- strong headings,
- clear section logic,
- reusable components,
- subtle polish.

---

## Engineering Standards

### Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX-backed content
- file-backed SEO metadata
- generated Open Graph assets

### Expectations
- production-safe code only,
- typed code,
- predictable file organization,
- minimal surface-area changes,
- no dead code,
- no speculative abstractions,
- no hidden magic.

### Before adding new code
First check whether:
- an existing component can be reused,
- an existing utility can be extended,
- an existing pattern already solves the problem.

### Avoid
- broad refactors unless required,
- unnecessary dependency additions,
- content-processing complexity without clear gain,
- introducing parallel config systems,
- mixing generated artifacts into runtime source.

---

## Task Routing

For each task, inspect only the smallest relevant set of files.

### If the task is homepage or page-level UX/copy
Read only what is necessary from:
- `README.md`
- `repo.config.ts`
- relevant page file in `app/`
- any directly related components
- any directly related docs in `docs/`

### If the task is content or article pipeline
Read only:
- `repo.config.ts`
- relevant files under `content/`
- relevant content utilities
- any validation code tied to content

### If the task is metadata / SEO / OG
Read only:
- `repo.config.ts`
- relevant metadata utilities
- `app/api/og/route.tsx` if applicable
- the page or content files involved

### If the task is deployment / CI / repo hygiene
Read only:
- `README.md`
- `repo.config.ts`
- package scripts
- CI files
- deployment config files

### If the task touches archived material
Do not integrate archived material into runtime unless explicitly instructed.

---

## Expected Work Pattern

For implementation tasks, use this sequence:

1. Understand the exact request.
2. Identify the minimum necessary files.
3. Inspect existing patterns before changing anything.
4. Make the smallest high-quality change that solves the problem.
5. Preserve consistency with the rest of the codebase.
6. Validate logically against repository rules and project goals.

Do not begin by exploring broadly.
Do not re-derive the project from scratch.
Do not generate multiple competing implementations unless asked.

---

## Output Quality Bar

A task is not complete unless the result is:

### Strategically clear
- aligned with the consultancy’s positioning,
- useful for credibility or conversion,
- not generic.

### Content-correct
- factually coherent,
- category-aligned,
- structurally clean,
- free of invented expertise claims.

### Design-correct
- visually restrained,
- readable,
- coherent with a premium professional site.

### Engineering-correct
- minimal,
- typed,
- maintainable,
- consistent with current repo structure,
- safe for build and deployment.

---

## File Creation Rules

Create new files only when one of these is true:
- the functionality clearly deserves separation,
- a document is needed as persistent repo instruction,
- a reusable component materially reduces duplication,
- a new content item is explicitly requested,
- a test is needed for meaningful validation.

Do not create files for temporary reasoning.
Do not create alternate drafts in the repo.
Do not leave “_new”, “_v2”, “final-final”, or backup files.

---

## Editing Rules

When editing:
- preserve naming consistency,
- preserve import style consistency,
- preserve component conventions,
- preserve content organization,
- preserve source/output/archive separation.

If changing config:
- ensure it aligns with `repo.config.ts`,
- do not introduce path ambiguity,
- do not break deployment assumptions.

If changing content architecture:
- respect active collections and allowed categories,
- do not create hidden category drift.

---

## Validation Standards

Before considering a task complete, verify mentally that it would pass the project’s expected checks:

- lint
- typecheck
- content validation
- tests where relevant
- build safety

If a requested change risks breaking these, choose the safer implementation.

---

## What to Optimize For

Optimize for:
1. clarity,
2. quality,
3. consistency,
4. speed,
5. maintainability.

Not for:
- novelty,
- excessive abstraction,
- visual cleverness,
- unnecessary breadth.

---

## Common Task Types

### Type A: Page refinement
Goal:
Improve clarity, hierarchy, copy quality, and conversion signal.

Default behavior:
- inspect only page + directly related components,
- simplify before expanding,
- tighten copy,
- improve hierarchy,
- preserve premium restraint.

### Type B: New content entry
Goal:
Add a high-quality insight or research item.

Default behavior:
- follow existing frontmatter conventions,
- use approved categories only,
- maintain editorial consistency,
- ensure metadata quality.

### Type C: UI system refinement
Goal:
Improve reusable presentation without destabilizing the site.

Default behavior:
- reuse patterns,
- reduce inconsistency,
- avoid design drift,
- keep implementation simple.

### Type D: Repo / build / deployment hygiene
Goal:
Improve operational clarity without changing site behavior unnecessarily.

Default behavior:
- respect source/output/archive/deployment separation,
- keep config explicit,
- avoid hidden coupling.

---

## Prohibited Behaviors

Do not:
- scan the whole repository unless required,
- rewrite large sections without cause,
- invent brand positioning,
- introduce fluff into copy,
- treat archived prototypes as active implementation,
- add dependencies casually,
- mix generated assets into source-of-truth directories,
- create unnecessary new architecture,
- ignore existing repo conventions.

---

## Default Assumption

Unless instructed otherwise, assume the right answer is:
- read less,
- change less,
- improve more,
- keep the repo cleaner than you found it.
