import type { ReactNode } from "react";

interface FigureProps {
  title: string;
  caption?: ReactNode;
  source?: ReactNode;
  children: ReactNode;
}

export function Figure({ title, caption, source, children }: FigureProps) {
  return (
    <figure className="border-l-2 border-[var(--color-border)] pl-5 py-1 sm:pl-6">
      <figcaption className="space-y-3">
        <p className="kicker">{title}</p>
        {caption ? <p className="text-sm leading-7 text-[var(--color-muted)]">{caption}</p> : null}
      </figcaption>
      <div className="mt-5">{children}</div>
      {source ? <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">Source: {source}</p> : null}
    </figure>
  );
}
