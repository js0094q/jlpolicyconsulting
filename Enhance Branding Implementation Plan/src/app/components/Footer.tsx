import { Logo } from './Logo';

export function Footer() {
  const sections = {
    SECTIONS: ['About', 'Consulting', 'Insights', 'Research'],
    'PROFESSIONAL CONTACT': ['contact@jlpolicyconsulting.com', 'LinkedIn']
  };

  return (
    <footer className="bg-[#f8fafc] border-t border-[#e2e8f0] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Logo />
          </div>
          
          {Object.entries(sections).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-sm text-[#334155] hover:text-[#1e3a8a] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#e2e8f0] text-sm text-[#64748b]">
          © {new Date().getFullYear()} JL Policy Consulting LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
