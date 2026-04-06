import Link from "next/link";
import { Container } from "@/components/container";
import { ResearchCard } from "@/components/research-card";
import { getResearch } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Research",
  description: "Selected analytical work using CMS Part D data and related datasets.",
  path: "/research",
  kicker: "Research",
  keywords: [
    "CMS Part D SPUF analysis",
    "formulary tier movement research",
    "same NDC unit price analysis",
    "plan-level payer behavior",
    "healthcare policy analytics",
  ],
});

export default async function ResearchPage() {
  const posts = await getResearch();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="page-title">Research</h1>
        <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          Research work focuses on reimbursement modeling, provider economics, payer mechanics, launch-access strategy, and CMS-driven market structure analysis.
        </p>
        <p className="mt-3 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          These pieces are longer-form and methodical, designed to show how policy design appears in observable plan behavior, pricing pressure, access friction, and commercial risk. For shorter interpretation, see{" "}
          <Link href="/insights" className="editorial-link">
            Insights
          </Link>
          .
        </p>

        <div className="mt-10 space-y-8">
          {posts.map((post) => (
            <ResearchCard key={post.slug} article={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
