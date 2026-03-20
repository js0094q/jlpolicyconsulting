import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Consulting', href: '#consulting' },
  { label: 'Insights', href: '#insights' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' }
] as const;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(244,247,251,0.94)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(244,247,251,0.9)]">
      <div className="layout-container">
        <div className="flex min-h-20 items-center justify-between gap-6">
          <a href="#top" className="focus-outline rounded-md" aria-label="JL Policy Consulting" onClick={handleNavClick}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="focus-outline rounded-sm text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="focus-outline rounded-md p-2 text-[var(--text)] md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-primary-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav id="mobile-primary-nav" className="pb-5 md:hidden" aria-label="Mobile navigation">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={handleNavClick}
                    className="focus-outline block rounded-md px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--brand)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="h-px w-full bg-[var(--brand-2)]" />
    </header>
  );
}
