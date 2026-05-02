import { Logo } from './Logo';

export function Header() {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Consulting', href: '#consulting' },
    { label: 'Insights', href: '#insights' },
    { label: 'Research', href: '#research' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-[#334155] hover:text-[#1e3a8a] transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
