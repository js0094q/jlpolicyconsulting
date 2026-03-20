import { Logo } from './Logo';

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Consulting', href: '#consulting' },
  { label: 'Insights', href: '#insights' },
  { label: 'Research', href: '#research' }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#f8fbff]">
      <div className="layout-container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
          </div>

          <div>
            <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Sections</h3>
            <ul className="mt-4 space-y-2" role="list">
              {sectionLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="focus-outline rounded-sm text-[0.95rem] text-[var(--text)] transition-colors hover:text-[var(--brand)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Professional Contact
            </h3>
            <ul className="mt-4 space-y-2" role="list">
              <li>
                <a
                  href="mailto:contact@jlpolicyconsulting.com"
                  className="focus-outline rounded-sm text-[0.95rem] text-[var(--text)] transition-colors hover:text-[var(--brand)]"
                >
                  contact@jlpolicyconsulting.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/joseph-stewart-mph-cpht-309bb5215"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-outline rounded-sm text-[0.95rem] text-[var(--text)] transition-colors hover:text-[var(--brand)]"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 text-[0.82rem] text-[var(--muted)]">
          © 2026 JL Policy Consulting LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
