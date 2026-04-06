# JL Policy Consulting Website Blueprint

## 1) Website Architecture

### Core Purpose
- Consulting firm website for policy and reimbursement strategy.
- Professional authority platform for market access and payer economics.
- Thought leadership hub for policy commentary and analytical research.

### Information Architecture
- `/` Home
- `/about` About
- `/consulting` Consulting
- `/insights` Insights index
- `/insights/[slug]` Insight detail pages (MDX)
- `/research` Research index
- `/research/[slug]` Research detail pages (MDX)
- `/contact` Contact

### Technical Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX content ingestion via frontmatter + `next-mdx-remote`
- SEO routes: `app/sitemap.ts`, `app/robots.ts`, `app/api/og/route.tsx`
- Shared SEO helpers in `lib/seo.ts` and `lib/og.ts`

## 2) Page Wireframes

### Home
- Hero: positioning statement and subheadline.
- Primary positioning panel: policy + market focus list.
- Expertise grid.
- Latest insight feature sourced from the most recent insight.
- Featured research panel sourced from the most recent research article.
- Research framing section.
- Firm metrics strip.
- Contact CTA block.

### About
- Intro summary.
- Professional background timeline cards.
- Policy and market expertise list.
- Approach to reimbursement analysis.
- Policy and data lens.

### Consulting
- Service cards by advisory area.
- Engagement outputs section.

### Insights / Research
- Intro + category context.
- Reverse-chronological article cards.
- Detail templates with metadata and long-form content.

### Contact
- Email and LinkedIn access points.
- Professional inquiries framing.

## 3) Brand System

### Positioning Language
- U.S. Pharmaceutical Reimbursement and Policy Strategy.
- Focus on payer dynamics, commercialization impact, and policy analytics.

### Voice
- Analytical
- Precise
- Commercially aware
- Policy literate
- Restrained and factual

### Visual Direction
- Editorial-professional style with clear hierarchy.
- Typography: IBM Plex Sans + Source Serif 4.
- Color system: slate/cyan core with warm accent gradients.
- Surface treatment: subtle glass panels and restrained depth.

## 4) Homepage Design
- Built around authority framing first, services second, thought leadership third.
- Uses structured visual rhythm to avoid resume-style layout.
- Highlights cross-functional value: policy interpretation + market implications.

## 5) Page Layout Patterns
- Consistent header and footer shell.
- Semantic section headings (`h1` -> `h2` progression).
- Reusable card patterns for services, insight summaries, and research highlights.
- Mobile-first spacing and responsive grids.

## 6) Article Template Model

### Frontmatter Fields
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

### Runtime Features
- Reading metadata surfaced on cards and post pages.
- Reading time computed when omitted from frontmatter.
- Dynamic metadata generation per article.
- File-backed `lastModified` metadata derived from MDX file timestamps.
- JSON-LD article schema included on detail pages.
- Home page feature blocks sourced from the latest content entries instead of hardcoded slugs.

## 7) SEO Structure
- Global metadata in `app/layout.tsx`.
- Page-level metadata for all primary routes.
- Open Graph and Twitter metadata for article detail pages.
- Canonical URL support with per-article overrides.
- Structured data:
  - Organization schema at layout level
  - Person schema on home
  - Article schema on detail pages
- Shared article SEO resolution so metadata and JSON-LD use the same overridden title, description, canonical URL, and OG image values.
- Sitemap generation from static routes + MDX content, with `lastModified` driven by route file mtimes and article file mtimes.
- Robots configuration with sitemap pointer.

## 8) Folder Structure

```text
app/
  about/page.tsx
  api/og/route.tsx
  consulting/page.tsx
  contact/page.tsx
  insights/page.tsx
  insights/[slug]/page.tsx
  research/page.tsx
  research/[slug]/page.tsx
  globals.css
  layout.tsx
  page.tsx
  not-found.tsx
  robots.ts
  sitemap.ts
components/
  container.tsx
  insight-card.tsx
  mdx-components.tsx
  research-card.tsx
  site-footer.tsx
  site-header.tsx
  site-logo.tsx
content/
  insights/*.mdx
  research/*.mdx
lib/
  content.ts
  og.ts
  seo.ts
  site.ts
  utils.ts
docs/
  site-blueprint.md
```

## 9) Deployment Model (Vercel)
- Build command: `npm run build`
- Output: Next.js default
- Environment variables: none required for current implementation
- Domain target: `jlpolicyconsulting.com`

## 10) Repo Notes
- The root production app is the Next.js project at the repository root.
- `docs/archive/prototypes/enhance-branding-implementation-plan-vite/` is a separate Vite prototype kept as reference material and excluded from the root app's lint and typecheck scope.
