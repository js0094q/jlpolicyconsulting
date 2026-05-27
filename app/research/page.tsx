import Link from "next/link";
import { Container } from "@/components/container";
import { ResearchCard } from "@/components/research-card";
import { formatDisplayDate, getResearch } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Policy, Reimbursement, and Market Access Research",
  description:
    "Methodology-aware analysis of reimbursement, policy design, market structure, and access dynamics for teams making strategic decisions.",
  path: "/research",
  kicker: "Research",
  keywords: [
    "health policy research",
    "reimbursement analysis",
    "market access research",
    "Medicare policy analysis",
    "healthcare data analysis",
  ],
});

export default async function ResearchPage() {
  const posts = await getResearch();
  const featuredResearch = posts[0];
  const remainingResearch = posts.slice(1);

  return (
    <>
      <section className="border-b border-[var(--color-border)] py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="max-w-3xl">
              <p className="kicker">Research</p>
              <h1 className="hero-title page-title mt-5 max-w-[16ch]">
                Deeper analysis for evidence-based policy and market-access decisions
              </h1>
              <p className="mt-5 max-w-2xl text-[1.04rem] leading-8 text-[var(--color-muted)]">
                Research traces how policy design, reimbursement mechanics, payer behavior, and
                provider economics turn into commercial reality.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-8 sm:py-10">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="surface-card border-l-2 border-[var(--color-accent)] p-6 sm:p-7">
              <p className="kicker">Method note</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
                These pieces use structured source notes, defined assumptions, and explicit interpretation
                so readers can see how the evidence supports the conclusion.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {featuredResearch ? (
        <section className="pb-8">
          <Container>
            <div className="mx-auto max-w-5xl lg:max-w-6xl">
              <article className="surface-card border-t-2 border-t-[var(--color-accent)] p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  <span>Featured research</span>
                  <time dateTime={featuredResearch.publishDate}>
                    {formatDisplayDate(featuredResearch.publishDate)}
                  </time>
                  <span>•</span>
                  <span>{featuredResearch.readingTime}</span>
                </div>
                <h2 className="mt-4 text-[clamp(1.6rem,2.5vw,2.2rem)] leading-tight text-ink">
                  <Link href={featuredResearch.url} className="hover:text-[var(--color-accent)]">
                    {featuredResearch.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--color-muted)]">
                  {featuredResearch.summary}
                </p>
                {featuredResearch.tags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredResearch.tags.slice(0, 1).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <Link href={featuredResearch.url} className="editorial-link mt-6 inline-flex">
                  Read Research
                </Link>
              </article>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="max-w-3xl">
              <p className="kicker">Selected research</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Longer-form analysis, source-aware interpretation, and market structure work that
                supports policy, access, and commercialization decisions.
              </p>
            </div>

            {remainingResearch.length > 0 ? (
              <div className="mt-8 space-y-8">
                {remainingResearch.map((post) => (
                  <ResearchCard key={post.slug} article={post} />
                ))}
              </div>
            ) : featuredResearch ? (
              <div className="mt-8 surface-card p-6 sm:p-7">
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  More research pieces will appear here as they are published.
                </p>
              </div>
            ) : (
              <div className="surface-card p-6 sm:p-7">
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  More research pieces will appear here as they are published.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="surface-card border-t-2 border-t-[var(--color-accent)] p-6 sm:p-8">
              <div className="max-w-3xl">
                <p className="kicker">Need an applied read?</p>
                <h2 className="section-title mt-4">Turn evidence into an action plan.</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  JL Policy Consulting helps teams convert research into reimbursement strategy,
                  market access planning, and decision support for policy-sensitive programs.
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
