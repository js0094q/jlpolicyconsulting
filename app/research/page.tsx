import Link from "next/link";
import { Container } from "@/components/container";
import { ResearchCard } from "@/components/research-card";
import { formatDisplayDate, getResearch } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Longer-form analytical work on reimbursement modeling, payer mechanics, market structure, and healthcare data.",
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
      <h3 className="mt-4 text-[clamp(1.65rem,2.55vw,2.15rem)] leading-tight text-ink">{title}</h3>
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

  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="kicker">Research</p>
              <h1 className="page-title max-w-[13ch]">Deeper analytical work on reimbursement and market structure.</h1>
              <p className="page-lede">
                Research is the more methodical layer of the site. It connects policy shifts to
                plan behavior, pricing pressure, access friction, and commercial risk.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/insights" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                  Explore Insights
                </Link>
                <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                  View Consulting
                </Link>
              </div>
            </div>

            <div className="paper-panel p-5 sm:p-6">
              <p className="kicker">Method note</p>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                <li className="border-t border-[var(--color-border)] pt-4">Quantitative policy analysis</li>
                <li className="border-t border-[var(--color-border)] pt-4">Market dynamics and reimbursement interpretation</li>
                <li className="border-t border-[var(--color-border)] pt-4">Structured reading of healthcare datasets and policy shifts</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.76fr)] lg:items-start">
            <div>
              <SectionHeading id="research-note">Research framing</SectionHeading>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                Research pieces are longer-form, more methodical, and designed to show how policy
                design appears in observable market behavior. They sit apart from Insights so the
                site can keep commentary and deeper analysis distinct.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">What this section emphasizes</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                <p>Evidence quality over volume.</p>
                <p>Clear connection between method and implication.</p>
                <p>Clean presentation of the analytical point.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {featuredResearch ? (
        <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
          <Container>
            <SectionHeading id="featured-research">Featured research</SectionHeading>
            <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
              <FeaturedResearchCard {...featuredResearch} />
              <article className="surface-card p-6 sm:p-7">
                <p className="kicker">Why this item is highlighted</p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  Featured research is chosen when it gives the clearest read on the site&apos;s
                  analytical approach and its connection to reimbursement or access questions.
                </p>
                <div className="mt-5 space-y-3 border-t border-[var(--color-border)] pt-4 text-sm leading-7 text-[var(--color-muted)]">
                  <p>Useful as a reference point for the deeper analytical layer of the site.</p>
                  <p>Helps differentiate research from shorter-form commentary.</p>
                </div>
              </article>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="research-list">Research grid</SectionHeading>
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
              Need the practical version of the analysis?
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Research provides the deeper evidence base. Consulting turns that perspective into
              advisory support. Contact is the direct path if there is a specific issue to work
              through.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="button-primary inline-flex items-center rounded-md px-7 py-3">
                Contact Us
              </Link>
              <Link href="/consulting" className="button-secondary inline-flex items-center rounded-md px-7 py-3">
                View Consulting
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
