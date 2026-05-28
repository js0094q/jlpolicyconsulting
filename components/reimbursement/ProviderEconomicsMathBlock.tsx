const formulas = [
  {
    label: "Drug Spread",
    formula: "Allowed Drug Reimbursement - Drug Acquisition Cost",
  },
  {
    label: "Net Operating Margin",
    formula:
      "Drug Spread + Administration Revenue + Provider-Facing Support - Non-Drug Operating Cost - Denial Drag - Financing Drag",
  },
  {
    label: "Annualized Net Margin",
    formula: "Net Operating Margin Per Administration x Annual Administrations",
  },
  {
    label: "Financing Drag",
    formula: "Drug Acquisition Cost x Annual Carrying Cost Rate x Days to Payment / 365",
  },
  {
    label: "Break-Even Support",
    formula: "max(0, Total Provider Cost - Total Provider Reimbursement)",
  },
] as const;

const variables = [
  ["Allowed Drug Reimbursement", "Expected payer payment for the drug component of the claim."],
  ["Drug Acquisition Cost", "Provider purchase cost after relevant purchasing terms or channel assumptions."],
  ["Administration Revenue", "Payment associated with administration, observation, or related service-line work."],
  ["Provider-Facing Support", "Permissible support that reduces provider burden without replacing payer payment."],
  ["Non-Drug Operating Cost", "Staff, handling, storage, preparation, scheduling, and revenue-cycle cost."],
  ["Denial Drag", "Expected value of denials, appeals, underpayment, write-offs, and rework."],
  ["Financing Drag", "Cost of carrying acquisition exposure until payment is collected."],
  ["Annual Administrations", "Expected number of administrations over the modeled period."],
] as const;

export function ProviderEconomicsMathBlock() {
  return (
    <section
      aria-labelledby="provider-economics-math-title"
      className="my-10 min-w-0 max-w-full border border-[var(--color-border)] bg-[rgba(251,248,242,0.58)] p-5 sm:p-7"
    >
      <p className="kicker">Product-agnostic modeling</p>
      <h2 id="provider-economics-math-title" className="mt-3 text-3xl leading-tight text-ink">
        Provider Economics Math Block
      </h2>
      <div className="mt-6 grid gap-4">
        {formulas.map((item) => (
          <div key={item.label} className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.24)] p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              {item.label}
            </p>
            <p className="mt-2 font-serif text-[1.08rem] leading-7 text-ink">{item.formula}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 min-w-0 max-w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b border-[var(--color-border)] px-3 py-2 text-left font-semibold text-ink">
                Variable
              </th>
              <th className="border-b border-[var(--color-border)] px-3 py-2 text-left font-semibold text-ink">
                Explanation
              </th>
            </tr>
          </thead>
          <tbody>
            {variables.map(([variable, explanation]) => (
              <tr key={variable}>
                <td className="border-b border-[var(--color-border)] px-3 py-3 align-top font-semibold text-ink">
                  {variable}
                </td>
                <td className="border-b border-[var(--color-border)] px-3 py-3 align-top text-[var(--color-muted)]">
                  {explanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
