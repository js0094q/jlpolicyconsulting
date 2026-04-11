import type { ReactNode } from "react";

interface KeyTakeawaysProps {
  title?: string;
  items: ReactNode[];
}

export function KeyTakeaways({ title = "Key takeaways", items }: KeyTakeawaysProps) {
  return (
    <section
      aria-label={title}
      className="surface-card border-t-2 border-t-[var(--color-accent)] p-6 sm:p-7"
    >
      <p className="kicker">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="border-t border-[var(--color-border)] pt-3 text-sm leading-7 text-[var(--color-muted)] first:border-t-0 first:pt-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

