import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">U.S. Pharmaceutical Reimbursement, Pricing, and Payer Analysis</p>
            <Link href="/" className="mt-1 block font-serif text-2xl text-ink">
              {siteConfig.legalName}
            </Link>
          </div>

          <nav aria-label="Main" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[var(--color-accent)]">
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
