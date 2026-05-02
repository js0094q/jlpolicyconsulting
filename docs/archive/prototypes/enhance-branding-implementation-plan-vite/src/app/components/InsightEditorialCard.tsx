import { ArrowRight } from 'lucide-react';

interface InsightEditorialCardProps {
  metaLine: string;
  title: string;
  summary: string;
  href: string;
}

export function InsightEditorialCard({ metaLine, title, summary, href }: InsightEditorialCardProps) {
  return (
    <article className="surface-card flex h-full flex-col justify-between p-7 sm:p-8">
      <div>
        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{metaLine}</p>
        <h3 className="mt-5 text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-tight text-[var(--text)]">
          {title}
        </h3>
        <p className="mt-4 text-[1rem] leading-7 text-[var(--muted)]">{summary}</p>
      </div>

      <a
        href={href}
        className="focus-outline mt-8 inline-flex w-fit items-center gap-2 rounded-sm text-[0.92rem] font-semibold text-[var(--brand)] transition-colors hover:text-[#2f62c7]"
      >
        Read Insight
        <ArrowRight size={15} aria-hidden />
      </a>
    </article>
  );
}
