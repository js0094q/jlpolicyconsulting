# AGENTS.md

## Scope

Applies to `app/**`: App Router pages, metadata routes, global styles, layout, not-found handling, sitemap, robots, and API routes unless a deeper `AGENTS.md` applies.

## Rules

- Preserve the Next.js App Router structure.
- Use server components by default unless interactivity clearly requires a client component.
- Use `createPageMetadata` from `lib/seo.ts` for page metadata.
- Keep JSON-LD generation routed through `safeJsonLd`.
- Reuse shared layout components from `components/` and site metadata from `lib/site.ts`.
- Keep page copy restrained, policy-literate, and commercially specific.
- Validate route, metadata, sitemap, robots, and proxy changes with targeted tests when relevant.
