import type { ReactNode } from "react";

interface KeyTakeawaysProps {
  title?: string;
  items: ReactNode[];
}

export function KeyTakeaways({ title = "Key takeaways", items }: KeyTakeawaysProps) {
  return (
    <section aria-label={title} className="border-l-2 border-[var(--color-accent)] pl-5 py-1 sm:pl-6">
      <p className="kicker">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={index} className="text-sm leading-7 text-[var(--color-muted)]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
