# Vercel Deployment Checklist

## 1. Pre-Deploy Checks

- Confirm local branch contains intended content and metadata updates.
- Run:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- Verify key routes build and prerender:
  - `/`
  - `/insights`
  - `/research`
  - `/insights/[slug]`
  - `/research/[slug]`

## 2. Vercel Project Setup

- Ensure project is linked to the correct Vercel team/project.
- Framework preset should be `Next.js`.
- Root directory should be repository root.
- Build command: `npm run build`.
- Output setting: default Next.js output.

## 3. Environment Variables

- No additional runtime secrets are required for current file-based MDX implementation.
- Set `NODE_ENV=production` in Vercel (default in production/preview).
- If domain-level metadata changes, ensure `siteConfig.url` remains `https://jlpolicyconsulting.com`.

## 4. Preview Deployment Command

From repo root:

```bash
vercel deploy -y
```

Expected output:

- Preview deployment URL (for QA and stakeholder review)
- Inspect URL and build logs URL

## 5. Preview QA Checklist

- Home hero and positioning copy render as updated.
- Insights/research card structure and labels are correct.
- Internal links work:
  - Insights -> Consulting/Research
  - Research -> Insights
  - Home -> Insights/Consulting
- JSON-LD present for:
  - Organization (layout)
  - Person (home)
  - Article (insight/research detail pages)
- Open Graph image previews render for:
  - `/`
  - `/insights`
  - `/research`
  - one insight slug
  - one research slug

## 6. Domain and Production Promotion

- Keep preview deployment for review; do not promote until approved.
- After approval, deploy production explicitly:

```bash
vercel deploy --prod -y
```

- Re-run smoke checks on production URL after promotion.
