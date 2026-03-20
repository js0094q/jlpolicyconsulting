import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="grid gap-8 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <SiteLogo size="sm" />
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
            Firm-led commentary and analysis on pharmaceutical reimbursement, drug pricing strategy,
            market access, Medicare Part D design, and PBM formulary behavior.
          </p>
        </div>

        <div>
          <h3 className="kicker">Navigation</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-accent)]">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-ink" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="kicker">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-accent)]">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="border-t border-[var(--color-border)] py-5 text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()} {siteConfig.legalName}
      </Container>
    </footer>
  );
}
