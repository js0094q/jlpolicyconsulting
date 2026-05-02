interface TimelineItem {
  label: string;
  text: string;
}

interface TimelineProps {
  title?: string;
  items: TimelineItem[];
}

export function Timeline({ title = "Timeline", items }: TimelineProps) {
  return (
    <section aria-label={title} className="border-l-2 border-[var(--color-border)] pl-5 py-1 sm:pl-6">
      <p className="kicker">{title}</p>
      <ol className="mt-5 space-y-5">
        {items.map((item) => (
          <li key={item.label} className="border-l-2 border-[var(--color-accent)] pl-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
