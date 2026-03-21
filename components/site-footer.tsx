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
    <footer className="mt-12 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <SiteLogo size="sm" />
        </div>

        <div>
          <h3 className="kicker">Sections</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink)]">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link className="rounded-sm transition-colors hover:text-[var(--color-accent)]" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="kicker">Professional Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink)]">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-sm transition-colors hover:text-[var(--color-accent)]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm transition-colors hover:text-[var(--color-accent)]"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="border-t border-[var(--color-border)] py-5 text-xs text-[var(--color-muted)]">
        © {currentYear} JL Policy Consulting LLC. All rights reserved.
      </Container>
    </footer>
  );
}
