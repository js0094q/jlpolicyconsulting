import Link from "next/link";
import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { formatDisplayDate, getCategoryCounts, getInsights } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Insights",
  description:
    "Short-form policy and reimbursement commentary on Medicare, drug pricing, payer behavior, and market access.",
  path: "/insights",
  kicker: "Insights",
  keywords: [
    "pharmaceutical reimbursement insights",
    "Medicare Part D commentary",
    "PBM formulary dynamics analysis",
    "drug pricing interpretation",
    "market access strategy insights",
  ],
});

function FeaturedInsightCard({
  title,
  summary,
  publishDate,
  category,
  readingTime,
  url,
}: {
  title: string;
  summary: string;
  publishDate: string;
  category: string;
  readingTime: string;
  url: string;
}) {
  return (
    <article className="surface-card flex h-full flex-col border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8">
      <p className="kicker">Featured insight</p>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {formatDisplayDate(publishDate).toUpperCase()} • {category.toUpperCase()}
      </p>
      <h3 className="mt-4 text-[clamp(1.55rem,2.4vw,2.05rem)] leading-tight text-ink">{title}</h3>
      <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
        <span>{readingTime}</span>
      </div>
      <Link href={url} className="editorial-link mt-7 inline-flex">
        Read insight
      </Link>
    </article>
  );
}

export default async function InsightsPage() {
  const insights = await getInsights();
  const [featuredInsight, ...restInsights] = insights;
  const categoryCounts = getCategoryCounts(insights).filter((entry) => entry.count > 0);

  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="kicker">Insights</p>
              <h1 className="page-title max-w-[13ch]">Short-form commentary on policy and reimbursement.</h1>
              <p className="page-lede">
                Insights is the editorial layer of the site. Each piece is meant to surface a
                practical implication quickly, without turning the page into a content feed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/research" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                  Explore Research
                </Link>
                <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                  View Consulting
                </Link>
              </div>
            </div>

            <div className="paper-panel p-5 sm:p-6">
              <p className="kicker">What to expect</p>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                <li className="border-t border-[var(--color-border)] pt-4">Policy changes translated into commercial implications</li>
                <li className="border-t border-[var(--color-border)] pt-4">Payer and provider behavior read as signals, not noise</li>
                <li className="border-t border-[var(--color-border)] pt-4">Short, structured commentary with a specific point of view</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.76fr)] lg:items-start">
            <div>
              <SectionHeading id="insights-note">Editorial frame</SectionHeading>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                These pieces focus on reimbursement structure, Medicare policy, payer behavior,
                drug pricing, and market access implications. The goal is to give each topic a
                clear practical reading without cluttering the page.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">Topic map</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categoryCounts.map((entry) => (
                  <span key={entry.category} className="tag">
                    {entry.category} ({entry.count})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {featuredInsight ? (
        <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
          <Container>
            <SectionHeading id="featured-insight">Featured insight</SectionHeading>
            <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
              <FeaturedInsightCard {...featuredInsight} />
              <article className="surface-card p-6 sm:p-7">
                <p className="kicker">Why this item is highlighted</p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  Featured items are selected for clarity, relevance, and the way they connect
                  policy structure to an actual commercial or access question.
                </p>
                <div className="mt-5 space-y-3 border-t border-[var(--color-border)] pt-4 text-sm leading-7 text-[var(--color-muted)]">
                  <p>Useful for readers scanning the newest commentary first.</p>
                  <p>Supports the distinction between shorter interpretation and longer research.</p>
                </div>
              </article>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="insight-list">Insights grid</SectionHeading>
          {restInsights.length > 0 ? (
            <div className="line-list mt-10">
              {restInsights.map((article) => (
                <InsightCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="surface-card mt-10 p-6 sm:p-7">
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                More insight pieces will appear here as they are published.
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="insights-cta" align="center">
              Want the longer analytical version?
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Research contains the deeper-form work. Consulting explains how the perspective
              translates into advisory support. Contact is the direct path if there is a specific
              question.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/research" className="button-primary inline-flex items-center rounded-md px-7 py-3">
                Explore Research
              </Link>
              <Link href="/contact" className="button-secondary inline-flex items-center rounded-md px-7 py-3">
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({
  id,
  children,
  align = "left",
}: {
  id: string;
  children: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={
          align === "center"
            ? "mx-auto h-px w-16 bg-[var(--color-accent)]"
            : "h-px w-16 bg-[var(--color-accent)]"
        }
      />
      <h2 id={id} className="section-title mt-6 text-balance">
        {children}
      </h2>
    </div>
  );
}
