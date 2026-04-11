import type { ReactNode } from "react";

interface MethodologyNoteProps {
  title?: string;
  children: ReactNode;
}

export function MethodologyNote({ title = "Methodology note", children }: MethodologyNoteProps) {
  return (
    <aside className="surface-card border-l-2 border-[var(--color-accent)] p-6 sm:p-7">
      <p className="kicker">{title}</p>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">{children}</div>
    </aside>
  );
}

