import type { ReactNode } from "react";

interface DataTableProps {
  title?: string;
  columns: string[];
  rows: Array<ReactNode[]>;
  source?: ReactNode;
  note?: ReactNode;
}

export function DataTable({ title = "Data table", columns, rows, source, note }: DataTableProps) {
  return (
    <section aria-label={title} className="surface-card p-6 sm:p-7">
      <p className="kicker">{title}</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="border border-[var(--color-border)] bg-[#eef2f5] px-3 py-2 text-left font-semibold text-ink"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-[var(--color-border)] px-3 py-2 align-top text-[var(--color-muted)]"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(note || source) && (
        <div className="mt-4 space-y-2 text-sm leading-7 text-[var(--color-muted)]">
          {note ? <p>{note}</p> : null}
          {source ? <p>Source: {source}</p> : null}
        </div>
      )}
    </section>
  );
}

