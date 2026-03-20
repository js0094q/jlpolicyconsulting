interface HeroStatementProps {
  headline: string;
  tagline: string;
}

export function HeroStatement({ headline, tagline }: HeroStatementProps) {
  return (
    <section className="section-space pb-14 pt-20 sm:pt-24" aria-labelledby="homepage-hero-title">
      <div className="layout-container">
        <div className="mx-auto max-w-5xl text-center">
          <h1
            id="homepage-hero-title"
            className="text-balance text-[clamp(2.2rem,5.2vw,4.3rem)] font-semibold leading-[1.1] text-[var(--text)]"
          >
            {headline}
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-[0.95rem] font-medium tracking-[0.08em] text-[var(--muted)] sm:text-[1rem] sm:tracking-[0.12em] md:whitespace-nowrap">
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
