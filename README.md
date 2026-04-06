# JL Policy Consulting Website

Production-ready professional website for **JL Policy Consulting, LLC**.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MDX content model for insights and research
- File-backed SEO metadata and generated Open Graph images

## Site Sections
- Home: positioning + expertise + latest insight + latest research
- About: professional background and analytical approach
- Consulting: advisory scope and engagement outputs
- Insights: policy and reimbursement commentary
- Research: deeper data-driven analysis
- Contact: consulting and professional inquiries

## Content Model
Articles in `content/insights` and `content/research` support:
- `title`
- `summary`
- `publishDate`
- `category`
- `tags`
- `readingTime` (optional, computed if omitted)
- `seoTitle` (optional)
- `seoDescription` (optional)
- `canonicalUrl` (optional)
- `ogImage` (optional)

Allowed `category` values:
- `Medicare Policy`
- `Drug Pricing`
- `PBM and Formulary Dynamics`
- `Biosimilars and Generics`
- `Healthcare Data Analysis`
- `Market Access Strategy`

Derived article metadata in the app also includes:
- `url`
- `type`
- `lastModified`

## Local Development
```bash
npm install
npm run dev
```

## Validation
```bash
npm run lint
npm run typecheck
npm run validate:content
npm run test
npm run build
```

Run all checks in sequence:
```bash
npm run verify
```

Security checks:
```bash
npm run audit:prod
```

Additional policy checks:
```bash
npm run validate:codeowners
```

## Vercel Deployment Instructions
1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build`.
5. Output directory: default (leave blank).
6. Deploy.
7. In Vercel project settings, add custom domain: `jlpolicyconsulting.com`.
8. Configure DNS records at the domain registrar as instructed by Vercel.
9. Once DNS propagates, verify:
   - `https://jlpolicyconsulting.com`
   - `https://jlpolicyconsulting.com/sitemap.xml`
   - `https://jlpolicyconsulting.com/robots.txt`

## Notes
- Site blueprint and architecture details are documented in `docs/site-blueprint.md`.
- `docs/archive/prototypes/enhance-branding-implementation-plan-vite/` is a separate archived Vite prototype and is not part of the root Next.js build, lint, or typecheck flow.
- CI gates run from `.github/workflows/ci.yml` on pull requests and pushes to `main`.
- Threat model output is tracked in `JLPolicyConsulting-threat-model.md`.
- Runtime hardening is enforced in `proxy.ts` (nonce CSP, invalid-slug telemetry) and `app/api/og/route.tsx` (public OG validation and route-level rate limiting via `OG_ROUTE_RATE_LIMIT_*`).
- Configure branch protection to require CODEOWNERS review for protected paths in `.github/CODEOWNERS`.
