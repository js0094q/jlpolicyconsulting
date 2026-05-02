import Link from "next/link";
import { type ArticleMeta, formatDisplayDate } from "@/lib/content";

interface ResearchCardProps {
  article: ArticleMeta;
}

export function ResearchCard({ article }: ResearchCardProps) {
  return (
    <article className="line-item">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
        <span>{article.category}</span>
        <span>•</span>
        <time dateTime={article.publishDate}>{formatDisplayDate(article.publishDate)}</time>
        <span>•</span>
        <span>{article.readingTime}</span>
      </div>
      <h3 className="mt-3 text-[clamp(1.45rem,2.1vw,2rem)] leading-tight text-ink">
        <Link href={article.url} className="hover:text-[var(--color-accent)]">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{article.summary}</p>
      <div className="mt-3">
        {article.tags.length > 0 ? (
          <span className="tag">{article.tags[0]}</span>
        ) : null}
      </div>
      <Link href={article.url} className="editorial-link mt-5 inline-flex">
        Read Research
      </Link>
    </article>
  );
}
