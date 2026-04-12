import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { getInsights } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Insights",
  description:
    "Policy and reimbursement analysis with direct commercial relevance, focused on coverage, coding, payment, provider behavior, and plan design.",
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

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <>
      <section className="py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <h1 className="hero-title page-title max-w-[13ch]">Latest Insights</h1>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          {insights.length > 0 ? (
            <div className="line-list">
              {insights.map((article) => (
                <InsightCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="surface-card p-6 sm:p-7">
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                More insight pieces will appear here as they are published.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
