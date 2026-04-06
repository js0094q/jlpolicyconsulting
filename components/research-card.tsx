import Link from "next/link";
import { type ArticleMeta, formatDisplayDate } from "@/lib/content";

interface ResearchCardProps {
  article: ArticleMeta;
}

export function ResearchCard({ article }: ResearchCardProps) {
  return (
    <article className="editorial-block border-t-2 border-t-[var(--color-accent)]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="tag">Research analysis</span>
        <span className="tag">{article.category}</span>
      </div>
      <h3 className="mt-4 text-[clamp(1.75rem,2.5vw,2.35rem)] leading-tight text-ink">
        <Link href={article.url} className="hover:text-[var(--color-accent)]">
          {article.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{article.summary}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
        <time dateTime={article.publishDate}>{formatDisplayDate(article.publishDate)}</time>
        <span>•</span>
        <span>{article.readingTime}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <Link href={article.url} className="editorial-link mt-5 inline-flex">
        Open research
      </Link>
    </article>
  );
}
