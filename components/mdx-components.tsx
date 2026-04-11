import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/content/Callout";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { DataTable } from "@/components/content/DataTable";
import { Figure } from "@/components/content/Figure";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { MethodologyNote } from "@/components/content/MethodologyNote";
import { Timeline } from "@/components/content/Timeline";
import { WhyItMatters } from "@/components/content/WhyItMatters";
import { isSafeExternalHref } from "@/lib/url-safety";

export const mdxComponents: MDXComponents = {
  KeyTakeaways,
  WhyItMatters,
  ComparisonTable,
  DataTable,
  Figure,
  Timeline,
  MethodologyNote,
  Callout,
  h2: ({ children }) => <h2 className="mt-12 text-3xl leading-tight text-ink">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-10 text-2xl leading-tight text-ink">{children}</h3>,
  p: ({ children }) => <p className="mt-5 font-serif text-[18px] leading-8 text-[var(--color-muted)]">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 font-serif text-[18px] leading-8 text-[var(--color-muted)]">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 font-serif text-[18px] leading-8 text-[var(--color-muted)]">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-[var(--color-accent)] pl-4 text-[var(--color-muted)]">{children}</blockquote>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse border border-[var(--color-border)] text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-[var(--color-border)] bg-[#eef2f5] px-3 py-2 text-left font-semibold text-ink">{children}</th>
  ),
  td: ({ children }) => <td className="border border-[var(--color-border)] px-3 py-2 text-[var(--color-muted)]">{children}</td>,
  a: ({ href, children }) => {
    if (!href) {
      return <span>{children}</span>;
    }

    if (href.startsWith("/")) {
      return (
        <Link className="underline decoration-[var(--color-accent)] decoration-1 underline-offset-4" href={href}>
          {children}
        </Link>
      );
    }

    if (href.startsWith("#")) {
      return (
        <a className="underline decoration-[var(--color-accent)] decoration-1 underline-offset-4" href={href}>
          {children}
        </a>
      );
    }

    if (!isSafeExternalHref(href)) {
      return <span>{children}</span>;
    }

    return (
      <a
        className="underline decoration-[var(--color-accent)] decoration-1 underline-offset-4"
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {children}
      </a>
    );
  },
};
