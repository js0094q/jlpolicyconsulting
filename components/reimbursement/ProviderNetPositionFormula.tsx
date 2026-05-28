const positiveTerms = [
  "Drug Payment",
  "Service-Line Revenue",
  "Provider-Facing Support",
] as const;

const negativeTerms = [
  "Drug Acquisition Cost",
  "Administration and Handling Cost",
  "Denial / Rework Cost",
  "Payment Delay Carrying Cost",
] as const;

function FormulaTerm({ label, tone }: { label: string; tone: "positive" | "negative" }) {
  return (
    <li className="border border-[var(--color-border)] bg-[rgba(251,248,242,0.64)] p-4">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
        {tone === "positive" ? "Add" : "Less"}
      </span>
      <span className="mt-2 block font-serif text-[1.08rem] leading-6 text-ink">{label}</span>
    </li>
  );
}

export function ProviderNetPositionFormula() {
  return (
    <section
      aria-labelledby="provider-net-position-title"
      className="my-10 min-w-0 max-w-full border border-[var(--color-border)] bg-[rgba(251,248,242,0.58)] p-5 sm:p-7"
    >
      <div className="border-b border-[var(--color-border)] pb-5">
        <p className="kicker">Provider net position formula</p>
        <h2 id="provider-net-position-title" className="mt-3 text-3xl leading-tight text-ink">
          Expected Provider Net Position
        </h2>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Positive contributors
          </p>
          <ul className="mt-4 grid gap-3">
            {positiveTerms.map((term) => (
              <FormulaTerm key={term} label={term} tone="positive" />
            ))}
          </ul>
        </div>

        <div
          aria-hidden="true"
          className="hidden h-full min-h-52 w-px bg-[var(--color-border)] lg:block"
        />

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Financial exposure
          </p>
          <ul className="mt-4 grid gap-3">
            {negativeTerms.map((term) => (
              <FormulaTerm key={term} label={term} tone="negative" />
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t border-[var(--color-border)] pt-5">
        <p className="break-words font-serif text-[1.35rem] leading-8 text-ink">
          Drug Payment + Service-Line Revenue + Provider-Facing Support - Drug Acquisition Cost -
          Administration and Handling Cost - Denial / Rework Cost - Payment Delay Carrying Cost
        </p>
      </div>
    </section>
  );
}
