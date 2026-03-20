import { SectionHeading } from './SectionHeading';

interface ResearchSummaryProps {
  copy: string;
}

export function ResearchSummary({ copy }: ResearchSummaryProps) {
  return (
    <section id="research" className="section-space pb-12">
      <div className="layout-container">
        <div className="mx-auto max-w-4xl border-t border-[var(--border)] pt-12">
          <SectionHeading id="research-heading" title="Research & Analysis" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-[1rem] leading-8 text-[var(--muted)]">{copy}</p>
        </div>
      </div>
    </section>
  );
}
