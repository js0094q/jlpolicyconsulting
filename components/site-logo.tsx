import { cn } from "@/lib/utils";

interface SiteLogoProps {
  variant?: "full" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const logoSizes = {
  sm: {
    icon: "h-8 w-8",
    title: "text-lg",
    subtitle: "text-[10px]",
  },
  md: {
    icon: "h-10 w-10",
    title: "text-xl",
    subtitle: "text-[11px]",
  },
  lg: {
    icon: "h-14 w-14",
    title: "text-3xl",
    subtitle: "text-xs",
  },
} as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <rect x="10" y="20" width="8" height="60" rx="2" fill="var(--color-accent)" />
      <rect x="10" y="72" width="25" height="8" rx="2" fill="var(--color-accent)" />
      <rect x="45" y="20" width="8" height="60" rx="2" fill="var(--color-accent-soft)" />
      <rect x="45" y="72" width="35" height="8" rx="2" fill="var(--color-accent-soft)" />
      <circle cx="85" cy="25" r="5" fill="var(--color-accent)" />
    </svg>
  );
}

export function SiteLogo({ variant = "full", size = "md", className }: SiteLogoProps) {
  const styles = logoSizes[size];

  if (variant === "icon") {
    return <LogoMark className={cn(styles.icon, className)} />;
  }

  if (variant === "text") {
    return (
      <span className={cn("font-serif leading-tight tracking-tight text-[var(--color-accent)]", styles.title, className)}>
        JL Policy Consulting
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark className={styles.icon} />
      <div className="leading-none">
        <p className={cn("font-serif tracking-tight text-[var(--color-accent)]", styles.title)}>
          JL Policy Consulting
        </p>
        <p className={cn("mt-1 font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-soft)]", styles.subtitle)}>
          LLC
        </p>
      </div>
    </div>
  );
}
