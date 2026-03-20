interface InsightCardProps {
  date: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

export function InsightCard({ date, category, title, description, link }: InsightCardProps) {
  return (
    <article className="group bg-white border border-[#e2e8f0] rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[#3b82f6]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-[#64748b] uppercase tracking-wider">{date}</span>
        <span className="text-xs text-[#64748b]">•</span>
        <span className="text-xs text-[#3b82f6] uppercase tracking-wider font-semibold">{category}</span>
      </div>
      
      <h3 className="text-xl font-serif font-semibold text-[#030213] mb-3 group-hover:text-[#1e3a8a] transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-[#64748b] leading-relaxed mb-4">
        {description}
      </p>
      
      <a 
        href={link}
        className="inline-flex items-center text-sm font-semibold text-[#1e3a8a] hover:text-[#3b82f6] transition-colors"
      >
        Read Insight
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  );
}
