import { cn } from "@/lib/utils";

interface SiteLogoProps {
  variant?: "full" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const logoSizes = {
  sm: {
    icon: "h-8 w-8 text-sm",
    title: "text-lg",
    subtitle: "text-[10px]",
  },
  md: {
    icon: "h-10 w-10 text-base",
    title: "text-xl",
    subtitle: "text-[11px]",
  },
  lg: {
    icon: "h-14 w-14 text-xl",
    title: "text-3xl",
    subtitle: "text-xs",
  },
} as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "grid place-items-center rounded-md bg-[var(--color-accent)] font-serif font-semibold tracking-tight text-white",
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
        <p className={cn("font-serif tracking-tight text-[var(--color-ink)]", styles.title)}>
          JL Policy Consulting
        </p>
        <p className={cn("mt-1 font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]", styles.subtitle)}>
          LLC
        </p>
      </div>
    </div>
  );
}
