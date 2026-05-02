import type { ReactNode } from "react";

interface CalloutProps {
  title: string;
  children: ReactNode;
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="border-l-2 border-[var(--color-border)] pl-5 py-1 sm:pl-6">
      <p className="kicker">{title}</p>
      <div className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{children}</div>
    </aside>
  );
}
