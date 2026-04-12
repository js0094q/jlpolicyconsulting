import Link from "next/link";
import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { getCategoryCounts, getInsights } from "@/lib/content";
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
  const categoryCounts = getCategoryCounts(insights).filter((entry) => entry.count > 0);

  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="page-title max-w-[13ch]">Insights</h1>
            <p className="page-lede">Policy and reimbursement analysis with direct commercial relevance.</p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
              Each piece isolates a practical issue, coverage, coding, payment, provider behavior,
              or plan design, and explains why it matters.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Insight topics">
            {categoryCounts.map((entry) => (
              <span key={entry.category} className="tag">
                {entry.category} ({entry.count})
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="insight-list">Latest insights</SectionHeading>
          {insights.length > 0 ? (
            <div className="line-list mt-10">
              {insights.map((article) => (
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
              For Deeper Analysis
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Visit Research for longer-form work grounded in data, policy design, and market
              structure.
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
