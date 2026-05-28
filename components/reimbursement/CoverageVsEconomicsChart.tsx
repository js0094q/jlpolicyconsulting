const comparisons = [
  {
    coverage: "Will the payer authorize therapy?",
    economics: "Can the provider acquire the therapy without unacceptable cash exposure?",
  },
  {
    coverage: "Is the product medically necessary?",
    economics: "Can the claim be coded and documented cleanly?",
  },
  {
    coverage: "Is the therapy covered under the benefit?",
    economics: "Will reimbursement exceed acquisition and operating costs?",
  },
  {
    coverage: "Are continuation criteria satisfied?",
    economics: "Can the provider manage denial, appeal, and payment-delay risk?",
  },
] as const;

export function CoverageVsEconomicsChart() {
  return (
    <section
      aria-labelledby="coverage-economics-title"
      className="my-10 min-w-0 max-w-full border border-[var(--color-border)] bg-[rgba(251,248,242,0.58)] p-5 sm:p-7"
    >
      <p className="kicker">Coverage versus economics</p>
      <h2 id="coverage-economics-title" className="mt-3 text-3xl leading-tight text-ink">
        Coverage Is Necessary, But Not Sufficient
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.28)]">
          <div className="border-b border-[var(--color-border)] p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Coverage question
            </p>
          </div>
          <ul className="divide-y divide-[var(--color-border)]">
            {comparisons.map((row) => (
              <li key={row.coverage} className="p-4 font-serif text-[1.02rem] leading-7 text-ink">
                {row.coverage}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-[var(--color-border)] bg-[rgba(23,63,137,0.035)]">
          <div className="border-b border-[var(--color-border)] p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Provider economics question
            </p>
          </div>
          <ul className="divide-y divide-[var(--color-border)]">
            {comparisons.map((row) => (
              <li key={row.economics} className="p-4 font-serif text-[1.02rem] leading-7 text-ink">
                {row.economics}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
