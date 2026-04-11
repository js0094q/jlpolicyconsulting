import type { ReactNode } from "react";

interface CalloutProps {
  title: string;
  children: ReactNode;
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="surface-card border border-[var(--color-border)] bg-[#f7f8fa] p-6 sm:p-7">
      <p className="kicker">{title}</p>
      <div className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{children}</div>
    </aside>
  );
}

