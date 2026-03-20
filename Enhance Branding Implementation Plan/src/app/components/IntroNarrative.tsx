interface IntroNarrativeProps {
  copy: string;
}

export function IntroNarrative({ copy }: IntroNarrativeProps) {
  return (
    <section id="about" className="pb-12" aria-label="About JL Policy Consulting">
      <div className="layout-container">
        <div className="mx-auto max-w-4xl border-t border-[var(--border)] pt-10">
          <p className="text-pretty text-[1.02rem] leading-8 text-[var(--muted)]">{copy}</p>
        </div>
      </div>
    </section>
  );
}
