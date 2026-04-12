import { Container } from "@/components/container";
import { ResearchCard } from "@/components/research-card";
import { getResearch } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Deeper analysis on reimbursement, policy design, market structure, and access dynamics.",
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
    <>
      <section className="border-b border-[var(--color-border)] py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <h1 className="hero-title page-title max-w-[13ch]">Research</h1>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14">
        <Container>
          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
                <ResearchCard key={post.slug} article={post} />
              ))}
            </div>
          ) : (
            <div className="surface-card p-6 sm:p-7">
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                More research pieces will appear here as they are published.
              </p>
            </div>
          )}
        </Container>
      </section>

    </>
  );
}
