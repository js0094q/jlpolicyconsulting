const riskLayers = [
  "Product acquisition cost",
  "Prior authorization uncertainty",
  "Interim coding or miscellaneous-code friction",
  "Claim documentation burden",
  "Denial and rework exposure",
  "Payment delay and carrying cost",
  "Site-of-care and sourcing rules",
  "Net margin sustainability",
] as const;

export function BuyAndBillRiskStack() {
  return (
    <section
      aria-labelledby="buy-bill-risk-stack-title"
      className="my-10 min-w-0 max-w-full border border-[var(--color-border)] bg-[rgba(251,248,242,0.58)] p-5 sm:p-7"
    >
      <p className="kicker">Buy-and-bill risk stack</p>
      <h2 id="buy-bill-risk-stack-title" className="mt-3 text-3xl leading-tight text-ink">
        Provider Financial Risk Accumulates in Layers
      </h2>
      <ol className="mt-6 space-y-2">
        {riskLayers.map((layer, index) => (
          <li
            key={layer}
            className="grid gap-3 border border-[var(--color-border)] bg-[rgba(255,255,255,0.24)] p-4 sm:grid-cols-[3rem_1fr] sm:items-center"
          >
            <span className="font-serif text-2xl leading-none text-[var(--color-accent)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">{layer}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
