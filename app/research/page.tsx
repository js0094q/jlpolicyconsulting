import { Container } from "@/components/container";
import { ResearchCard } from "@/components/research-card";
import { getResearch } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Long-form data-backed research on Medicare Part D, formulary movement, pricing behavior, and patient cost exposure.",
  path: "/research",
});

export default async function ResearchPage() {
  const research = await getResearch();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="kicker">Research</p>
        <h1 className="page-title">Data-Backed Research on Payer and Formulary Behavior</h1>
        <p className="page-lede">
          Research pieces are longer analyses (typically 1200–3000+ words) with structured sections,
          dataset framing, and chart/table placeholders for reusable analytical workflows.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {research.map((article) => (
            <ResearchCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
