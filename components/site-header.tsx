import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-page)]">
      <div className="editorial-rule" aria-hidden />
      <Container className="py-4 sm:py-5">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="inline-flex" aria-label={`${siteConfig.name} home`}>
            <SiteLogo size="md" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm border-b border-transparent pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-border)] hover:text-[var(--color-accent)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav aria-label="Main mobile" className="mt-4 border-t border-[var(--color-border)] pt-3 md:hidden">
          <ul className="flex gap-5 overflow-x-auto pb-1 pr-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {siteConfig.navItems.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className="rounded-sm border-b border-transparent pb-1 transition-colors hover:border-[var(--color-border)] hover:text-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="h-px w-full bg-[var(--color-rule)]" />
    </header>
  );
}
