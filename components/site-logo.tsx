import { cn } from "@/lib/utils";

interface SiteLogoProps {
  variant?: "full" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const logoSizes = {
  sm: {
    icon: "h-8 w-8 text-[0.95rem]",
    title: "text-[1.1rem]",
    subtitle: "text-[10px]",
  },
  md: {
    icon: "h-10 w-10 text-[1.05rem]",
    title: "text-[1.3rem]",
    subtitle: "text-[11px]",
  },
  lg: {
    icon: "h-14 w-14 text-[1.3rem]",
    title: "text-[2rem]",
    subtitle: "text-xs",
  },
} as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "grid place-items-center rounded-sm border border-[color:color-mix(in_srgb,var(--color-rule)_55%,white_45%)] bg-[var(--color-surface-strong)] font-serif font-semibold tracking-[0.02em] text-[var(--color-accent)]",
        className,
      )}
    >
      JL
    </div>
  );
}

export function SiteLogo({ variant = "full", size = "md", className }: SiteLogoProps) {
  const styles = logoSizes[size];

  if (variant === "icon") {
    return <LogoMark className={cn(styles.icon, className)} />;
  }

  if (variant === "text") {
    return (
      <span className={cn("font-serif leading-tight tracking-tight text-[var(--color-ink)]", styles.title, className)}>
        JL Policy Consulting
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark className={styles.icon} />
      <div className="leading-none">
        <p className={cn("font-serif tracking-[-0.02em] text-[var(--color-ink)]", styles.title)}>
          JL Policy Consulting
        </p>
        <p
          className={cn(
            "mt-1 font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-soft)]",
            styles.subtitle,
          )}
        >
          LLC
        </p>
      </div>
    </div>
  );
}
