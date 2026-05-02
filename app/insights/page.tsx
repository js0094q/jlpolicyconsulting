import Link from "next/link";
import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { formatDisplayDate, getInsights } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Policy, Reimbursement, and Market Access Insights",
  description:
    "Short-form commentary on Medicare policy, drug pricing, PBM behavior, reimbursement, and market access decisions.",
  path: "/insights",
  kicker: "Insights",
  keywords: [
    "policy reimbursement insights",
    "Medicare policy commentary",
    "PBM and formulary dynamics",
    "drug pricing analysis",
    "market access commentary",
  ],
});

export default async function InsightsPage() {
  const insights = await getInsights();
  const featuredInsight = insights[0];
  const remainingInsights = insights.slice(1);

  return (
    <>
      <section className="py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="max-w-3xl">
              <p className="kicker">Insights</p>
              <h1 className="hero-title page-title mt-5 max-w-[18ch]">
                Policy and reimbursement commentary for commercial teams
              </h1>
              <p className="mt-5 max-w-2xl text-[1.04rem] leading-8 text-[var(--color-muted)]">
                Short-form analysis on Medicare policy, drug pricing, PBM behavior, coverage,
                coding, and provider economics. The emphasis is on what changes in practice, not
                just what changes in statute or guidance.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {featuredInsight ? (
        <section className="pb-8">
          <Container>
            <div className="mx-auto max-w-5xl lg:max-w-6xl">
              <article className="surface-card border-t-2 border-t-[var(--color-accent)] p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  <span>Featured insight</span>
                  <time dateTime={featuredInsight.publishDate}>
                    {formatDisplayDate(featuredInsight.publishDate)}
                  </time>
                  <span>•</span>
                  <span>{featuredInsight.readingTime}</span>
                </div>
                <h2 className="mt-4 text-[clamp(1.6rem,2.5vw,2.1rem)] leading-tight text-ink">
                  <Link href={featuredInsight.url} className="hover:text-[var(--color-accent)]">
                    {featuredInsight.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--color-muted)]">
                  {featuredInsight.summary}
                </p>
                {featuredInsight.tags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredInsight.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <Link href={featuredInsight.url} className="editorial-link mt-6 inline-flex">
                  Read Insight
                </Link>
              </article>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-12 sm:py-14">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="max-w-3xl">
              <p className="kicker">Selected commentary</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Short-form policy, reimbursement, and market access commentary, selected for the
                access, pricing, and operational questions it helps answer.
              </p>
            </div>

            {remainingInsights.length > 0 ? (
              <div className="line-list mt-8">
                {remainingInsights.map((article) => (
                  <InsightCard key={article.slug} article={article} />
                ))}
              </div>
            ) : featuredInsight ? (
              <div className="mt-8 surface-card p-6 sm:p-7">
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  More insight pieces will appear here as they are published.
                </p>
              </div>
            ) : (
              <div className="surface-card p-6 sm:p-7">
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  More insight pieces will appear here as they are published.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-14">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="surface-card border-t-2 border-t-[var(--color-accent)] p-6 sm:p-8">
              <div className="max-w-3xl">
                <p className="kicker">Need applied analysis?</p>
                <h2 className="section-title mt-4">Turn policy questions into a next step.</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  JL Policy Consulting supports reimbursement strategy, market access analysis, and
                  policy interpretation for manufacturers and other healthcare stakeholders.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                    View Consulting
                  </Link>
                  <Link href="/contact" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
