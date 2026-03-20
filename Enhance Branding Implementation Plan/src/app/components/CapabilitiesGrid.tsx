interface CapabilitiesGridProps {
  leftColumn: string[];
  rightColumn: string[];
}

export function CapabilitiesGrid({ leftColumn, rightColumn }: CapabilitiesGridProps) {
  const renderColumn = (items: string[]) => (
    <ul className="space-y-4" role="list">
      {items.map((item) => (
        <li
          key={item}
          className="surface-card px-6 py-5 transition-colors duration-200 hover:border-[var(--brand-2)]"
        >
          <p className="text-[1rem] font-medium leading-7 text-[var(--text)]">{item}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
      {renderColumn(leftColumn)}
      {renderColumn(rightColumn)}
    </div>
  );
}
