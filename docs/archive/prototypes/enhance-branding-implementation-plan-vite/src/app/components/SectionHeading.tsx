interface SectionHeadingProps {
  id?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ id, title, description, align = 'center' }: SectionHeadingProps) {
  const alignmentClass = align === 'left' ? 'text-left' : 'text-center';

  return (
    <div className={alignmentClass}>
      <h2
        id={id}
        className="text-[clamp(1.85rem,3.2vw,2.55rem)] font-semibold leading-tight text-[var(--text)]"
      >
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-3xl text-[1rem] leading-7 text-[var(--muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
