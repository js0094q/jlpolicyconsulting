import Link from "next/link";
import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { getCategoryCounts, getInsights } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Insights",
  description:
    "Commentary and analysis on pharmaceutical reimbursement, drug pricing policy, Medicare Part D, and payer behavior.",
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
  const categoryCounts = getCategoryCounts(insights).filter((entry) => entry.count > 0);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="page-title">Insights</h1>
        <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          Insight pieces interpret reimbursement modeling, provider economics, payer mechanics, launch-access strategy, and market structure in a tighter editorial format.
        </p>
        <p className="mt-3 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          The focus is practical interpretation: where reimbursement friction appears, how policy timing changes execution, and what commercial teams should notice early. For longer-form analytical work, see{" "}
          <Link href="/research" className="editorial-link">
            Research
          </Link>
          . Advisory scope is outlined on{" "}
          <Link href="/consulting" className="editorial-link">
            Consulting
          </Link>
          .
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
