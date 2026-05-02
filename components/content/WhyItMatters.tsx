import type { ReactNode } from "react";

interface WhyItMattersItem {
  label: string;
  text: ReactNode;
}

interface WhyItMattersProps {
  title?: string;
  items: WhyItMattersItem[];
}

export function WhyItMatters({ title = "Why it matters", items }: WhyItMattersProps) {
  return (
    <section aria-label={title} className="border-l-2 border-[var(--color-border)] pl-5 py-1 sm:pl-6">
      <p className="kicker">{title}</p>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
