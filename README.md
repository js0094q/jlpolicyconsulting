# JL Policy Consulting Website

Production-ready professional website for **JL Policy Consulting, LLC**.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MDX content model for insights and research

## Site Sections
- Home: positioning + expertise + latest insights
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
- `readingTime`
- `seoTitle`
- `seoDescription`
- `canonicalUrl` (optional)
- `ogImage` (optional)

## Local Development
```bash
npm install
npm run dev
```

## Validation
```bash
npm run lint
npm run typecheck
npm run build
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
