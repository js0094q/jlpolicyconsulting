import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";
import { siteConfig } from "@/lib/site";

const footerNav = [
  { label: "About", href: "/about" },
  { label: "Consulting", href: "/consulting" },
  { label: "Insights", href: "/insights" },
  { label: "Research", href: "/research" },
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="editorial-rule" aria-hidden />
      <Container className="grid gap-10 py-12 md:grid-cols-[1.8fr_1fr_1fr] lg:py-14">
        <div className="max-w-sm">
          <SiteLogo size="sm" />
          <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
            Reimbursement, pricing, and payer analysis for launch strategy, provider economics, and
            market access decision-making.
          </p>
        </div>

        <div>
          <h3 className="kicker">Sections</h3>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-ink)]">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-sm border-b border-transparent pb-0.5 transition-colors hover:border-[var(--color-border)] hover:text-[var(--color-accent)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="kicker">Professional Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-ink)]">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-sm border-b border-transparent pb-0.5 transition-colors hover:border-[var(--color-border)] hover:text-[var(--color-accent)]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border-b border-transparent pb-0.5 transition-colors hover:border-[var(--color-border)] hover:text-[var(--color-accent)]"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="border-t border-[var(--color-border)] py-5 text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
        © {currentYear} JL Policy Consulting LLC. All rights reserved.
      </Container>
    </footer>
  );
}
