const proofPoints = [
  {
    title: "Policy + data",
    description: "Policy analysis grounded in structural rules and observable market behavior.",
  },
  {
    title: "Commercial relevance",
    description: "Work framed around decisions that affect launch, access, and in-market strategy.",
  },
  {
    title: "Cross-functional",
    description: "Perspective built to be useful to policy, access, and commercialization teams.",
  },
  {
    title: "Decision-ready output",
    description: "Concise deliverables that translate reimbursement issues into action.",
  },
] as const;

export function HomeProofStrip() {
  return (
    <section className="border-b border-[var(--color-border)] py-8 sm:py-10" aria-label="Proof points">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 xl:grid-cols-4">
          {proofPoints.map((point) => (
            <article
              key={point.title}
              className="flex min-h-[148px] flex-col justify-start bg-[var(--color-surface)] px-5 py-5 sm:px-6 sm:py-6 xl:min-h-[170px]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
                {point.title}
              </p>
              <p className="mt-3 max-w-[28ch] text-[0.96rem] leading-7 text-[var(--color-muted)]">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
