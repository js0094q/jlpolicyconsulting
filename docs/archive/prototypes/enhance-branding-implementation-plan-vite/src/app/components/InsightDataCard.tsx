interface InsightDataRow {
  product: string;
  higherTierMovement: string;
  higherTierMovementValue: number;
  sameNdcPriceChange: string;
}

interface InsightDataCardProps {
  title: string;
  description: string;
  rows: InsightDataRow[];
  sourceNote: string;
  href?: string;
}

export function InsightDataCard({ title, description, rows, sourceNote, href }: InsightDataCardProps) {
  const maxMovement = Math.max(...rows.map((row) => row.higherTierMovementValue), 1);

  return (
    <article className="surface-card p-7 sm:p-8" aria-label="Featured analytics insight">
      <h3 className="text-[1.5rem] font-semibold leading-tight text-[var(--text)]">{title}</h3>
      <p className="mt-3 text-[0.95rem] leading-7 text-[var(--muted)]">{description}</p>

      <ul className="mt-6 space-y-5" role="list">
        {rows.map((row) => {
          const barWidth = Math.max((row.higherTierMovementValue / maxMovement) * 100, 12);

          return (
            <li key={row.product} className="rounded-md border border-[var(--border)] px-4 py-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.98rem] font-semibold text-[var(--text)]">{row.product}</p>
                  <p className="mt-1 text-[0.82rem] leading-6 text-[var(--muted)]">
                    Same-NDC unit price change: {row.sameNdcPriceChange}
                  </p>
                </div>
                <p className="text-[0.95rem] font-semibold text-[var(--brand)]">{row.higherTierMovement}</p>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-[#e3eaf5]" aria-hidden>
                <div
                  className="h-full rounded-full bg-[var(--brand)]"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <p className="sr-only">
                {`${row.product}, net higher-tier movement ${row.higherTierMovement}, same-NDC unit price change ${row.sameNdcPriceChange}.`}
              </p>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-[0.75rem] leading-6 text-[var(--muted)]">{sourceNote}</p>

      {href && (
        <a
          href={href}
          className="focus-outline mt-4 inline-flex w-fit rounded-sm text-[0.85rem] font-semibold text-[var(--brand)] transition-colors hover:text-[#2f62c7]"
        >
          View Research
        </a>
      )}
    </article>
  );
}
