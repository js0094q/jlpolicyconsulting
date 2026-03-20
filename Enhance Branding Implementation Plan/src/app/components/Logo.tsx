interface LogoProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        aria-hidden
        className="grid h-11 w-11 place-items-center rounded-md bg-[var(--brand)] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
      >
        <span className="font-serif text-xl font-semibold tracking-tight">JL</span>
      </div>
      {variant === 'default' && (
        <div className="leading-tight">
          <p className="font-serif text-[1.1rem] font-semibold text-[var(--text)]">JL Policy Consulting</p>
          <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">LLC</p>
        </div>
      )}
    </div>
  );
}
