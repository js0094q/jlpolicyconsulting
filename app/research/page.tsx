import Link from "next/link";
import { Container } from "@/components/container";
import { ResearchCard } from "@/components/research-card";
import { formatDisplayDate, getResearch } from "@/lib/content";
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

function FeaturedResearchCard({
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
      <p className="kicker">Featured research</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="tag">Research analysis</span>
        <span className="tag">{category}</span>
      </div>
      <h3 className="mt-4 text-[clamp(1.6rem,2.35vw,2.05rem)] leading-tight text-ink">{title}</h3>
      <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
        <time dateTime={publishDate}>{formatDisplayDate(publishDate)}</time>
        <span>•</span>
        <span>{readingTime}</span>
      </div>
      <Link href={url} className="editorial-link mt-7 inline-flex">
        Read research
      </Link>
    </article>
  );
}

export default async function ResearchPage() {
  const posts = await getResearch();
  const [featuredResearch, ...restResearch] = posts;
  const focusAreas = [
    "Medicare policy",
    "Pricing and gross-to-net",
    "Provider economics",
    "Formulary and access design",
    "Healthcare data analysis",
  ];

  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="page-title max-w-[13ch]">Research</h1>
            <p className="page-lede">
              Deeper analysis on reimbursement, policy design, market structure, and access
              dynamics.
            </p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
              These pieces use data, policy mechanics, and structured evidence to answer practical
              questions about coverage, pricing, provider economics, and commercial risk.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/insights" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
              Explore Insights
            </Link>
            <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-6 py-3">
              View Consulting
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Research focus areas">
            {focusAreas.map((area) => (
              <span key={area} className="tag">
                {area}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="featured-research">Featured research</SectionHeading>
          {featuredResearch ? (
            <div className="mt-10 max-w-4xl">
              <FeaturedResearchCard {...featuredResearch} />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="research-list">Research list</SectionHeading>
          {restResearch.length > 0 ? (
            <div className="mt-10 space-y-8">
              {restResearch.map((post) => (
                <ResearchCard key={post.slug} article={post} />
              ))}
            </div>
          ) : (
            <div className="surface-card mt-10 p-6 sm:p-7">
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                More research pieces will appear here as they are published.
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="research-cta" align="center">
              Looking for a quicker summary view?
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Insights covers the faster interpretive view. Research contains the longer-form
              analytical work.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/insights" className="button-primary inline-flex items-center rounded-md px-7 py-3">
                Explore Insights
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
      <h2 id={id} className={`section-title mt-6 text-balance ${align === "center" ? "text-center" : ""}`}>
        {children}
      </h2>
    </div>
  );
}
