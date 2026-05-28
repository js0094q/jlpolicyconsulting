const phases = [
  {
    phase: "Pre-approval planning",
    focus: "Map coding, payment, distribution, payer-policy, and provider-workflow dependencies before first use.",
    risk: "Providers may see the product as clinically relevant but financially unready.",
    task: "Build payer, site-of-care, coding, and provider-economics workplans before approval.",
  },
  {
    phase: "Approval and commercial readiness",
    focus: "Translate approval into field, hub, billing, trade, and provider-facing operating guidance.",
    risk: "Coverage messages may outrun billing-system and pharmacy readiness.",
    task: "Prepare launch materials that separate coverage, coding, payment, and provider support.",
  },
  {
    phase: "Interim coding period",
    focus: "Support clean claim submission when product-specific coding is not yet active.",
    risk: "Miscellaneous-code claims can increase documentation, denial, and rework burden.",
    task: "Define interim coding instructions, documentation standards, and escalation pathways.",
  },
  {
    phase: "Temporary payment pathway, if applicable",
    focus: "Use transitional payment policy only where eligibility, timing, and site-of-care rules align.",
    risk: "Temporary economics can be mistaken for steady-state economics.",
    task: "Model the bridge period and the post-transition reimbursement state separately.",
  },
  {
    phase: "Product-specific code activation",
    focus: "Move from interim billing to product-specific claim identification and provider education.",
    risk: "Code availability does not automatically update charge capture, payer edits, or billing workflows.",
    task: "Coordinate code effective dates with provider systems, payer policies, and field training.",
  },
  {
    phase: "Post-launch claims monitoring",
    focus: "Track denials, appeal patterns, payment timing, underpayment, sourcing rules, and site-of-care shifts.",
    risk: "Provider economics may deteriorate after early launch assumptions meet real payer behavior.",
    task: "Refresh support, payer engagement, and margin scenarios with claims evidence.",
  },
] as const;

export function ReimbursementLaunchTimeline() {
  return (
    <section
      aria-labelledby="reimbursement-launch-timeline-title"
      className="my-10 min-w-0 max-w-full border border-[var(--color-border)] bg-[rgba(251,248,242,0.58)] p-5 sm:p-7"
    >
      <p className="kicker">Reimbursement launch timeline</p>
      <h2 id="reimbursement-launch-timeline-title" className="mt-3 text-3xl leading-tight text-ink">
        Approval-to-Code Transition Period
      </h2>
      <ol className="mt-7 space-y-5">
        {phases.map((item, index) => (
          <li key={item.phase} className="grid gap-4 md:grid-cols-[9rem_1fr]">
            <div className="border-l-2 border-[var(--color-accent)] pl-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
                Phase {index + 1}
              </p>
              <h3 className="mt-2 font-serif text-xl leading-7 text-ink">{item.phase}</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="border border-[var(--color-border)] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Operational focus
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{item.focus}</p>
              </div>
              <div className="border border-[var(--color-border)] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Provider risk
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{item.risk}</p>
              </div>
              <div className="border border-[var(--color-border)] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Readiness task
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{item.task}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
