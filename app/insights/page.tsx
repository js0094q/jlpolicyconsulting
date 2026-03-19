import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { getCategoryCounts, getInsights } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Insights",
  description:
    "Short-form interpretation of Medicare Part D, drug pricing strategy, PBM formulary behavior, and market access implications.",
  path: "/insights",
});

export default async function InsightsPage() {
  const insights = await getInsights();
  const categoryCounts = getCategoryCounts(insights);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="kicker">Insights</p>
        <h1 className="page-title">Interpretive Commentary for Reimbursement and Access Decisions</h1>
        <p className="page-lede">
          Insights are short-form pieces (typically 600–1200 words) focused on interpretation,
          not data appendices. Each piece is written to support rapid executive reading and
          LinkedIn-level discussion without losing policy and market specificity.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categoryCounts.map((entry) => (
            <span key={entry.category} className="tag">
              {entry.category} ({entry.count})
            </span>
          ))}
        </div>

        <div className="line-list mt-8">
          {insights.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
