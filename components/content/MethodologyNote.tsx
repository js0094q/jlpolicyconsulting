import type { ReactNode } from "react";

interface MethodologyNoteProps {
  title?: string;
  children: ReactNode;
}

export function MethodologyNote({ title = "Methodology note", children }: MethodologyNoteProps) {
  return (
    <aside className="border-l-2 border-[var(--color-accent)] pl-5 py-1 sm:pl-6">
      <p className="kicker">{title}</p>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">{children}</div>
    </aside>
  );
}
