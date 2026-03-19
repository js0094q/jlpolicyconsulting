import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <Container className="py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/" className="inline-flex" aria-label={`${siteConfig.name} home`}>
              <SiteLogo size="md" />
            </Link>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-soft)]">
              U.S. Pharmaceutical Reimbursement, Pricing, and Payer Analysis
            </p>
          </div>

          <nav
            aria-label="Main"
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[var(--color-accent)]"
          >
            {siteConfig.navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
