interface Metric {
  value: string;
  label: string;
}

interface MetricsStripProps {
  metrics: Metric[];
}

export function MetricsStrip({ metrics }: MetricsStripProps) {
  return (
    <section className="pb-8" aria-label="Firm metrics">
      <div className="layout-container">
        <div className="surface-card px-6 py-9 sm:px-10 sm:py-10">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none text-[var(--brand)]">
                  {metric.value}
                </p>
                <p className="mt-3 text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
