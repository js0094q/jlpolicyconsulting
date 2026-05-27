import Link from "next/link";
import { headers } from "next/headers";
import { Container } from "@/components/container";
import { formatDisplayDate, getLatestInsights, getLatestResearch } from "@/lib/content";
import { safeJsonLd } from "@/lib/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Health Policy, Reimbursement, and Market Access Advisory",
  description:
    "JL Policy Consulting translates reimbursement mechanics, payer behavior, provider economics, and market access signals into decision-ready commercial actions.",
  path: "/",
  kicker: "JL Policy Consulting, LLC",
  keywords: [
    "health policy advisory",
    "reimbursement strategy",
    "market access strategy",
    "Medicare Part D policy",
    "PBM and formulary dynamics",
    "provider economics",
  ],
});

const expertiseThemes = [
  "Medicare policy and reimbursement mechanics",
  "Drug pricing, gross-to-net pressure, and benefit design",
  "PBM, formulary, and payer behavior",
  "Provider economics, biosimilars, and commercialization strategy",
] as const;

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

export default async function HomePage() {
  const [[featuredInsight], [featuredResearch]] = await Promise.all([
    getLatestInsights(1),
    getLatestResearch(1),
  ]);
  const requestHeaders = await headers();
  const cspNonce = requestHeaders.get("x-csp-nonce") ?? undefined;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joseph Stewart",
    url: siteConfig.url,
    jobTitle: "Managing Director",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
    sameAs: [siteConfig.linkedin],
    knowsAbout: [
      "pharmaceutical reimbursement",
      "drug pricing policy",
      "market access",
      "Medicare Part D",
      "PBM and formulary behavior",
      "payer economics",
    ],
  };

  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[92rem]">
          <div className="mx-auto max-w-5xl text-center lg:max-w-6xl">
            <p className="kicker">JL Policy Consulting, LLC</p>
            <h1 className="hero-title mx-auto mt-5 max-w-[23ch] font-serif text-[clamp(2.7rem,4.2vw,3.65rem)] leading-[1.02] tracking-[-0.03em] text-ink">
              Commercial strategy should be anchored in reimbursement and coverage reality.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-[1.04rem] leading-8 text-[var(--color-muted)]">
              We help manufacturers, payers, professional societies, and patient advocates turn
              reimbursement mechanics, payer behavior, and provider economics into access
              decisions they can actually use.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                View Consulting
              </Link>
              <Link href="/contact" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                Start a fit check
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20" aria-label="Selected expertise">
        <Container>
          <SectionHeading id="expertise-heading">Core Areas of Work</SectionHeading>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="surface-card p-7 sm:p-8">
                <p className="max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                  Our work is built around the intersections that shape real-world adoption:
                  Medicare policy, reimbursement mechanics, drug pricing, PBM and formulary
                  behavior, provider economics, and commercialization.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                  The outcome is a clear map of where access friction is likely to appear, what it means
                  for launch planning, and which decisions should be made first.
                </p>
              </article>

            <article className="surface-card p-7 sm:p-8 text-center">
              <h3 className="text-[1.1rem] leading-tight text-ink">Primary focus areas</h3>
              <ul className="mt-5 grid gap-4 text-center sm:grid-cols-2">
                {expertiseThemes.map((theme) => (
                  <li
                    key={theme}
                    className="border-t border-[var(--color-border)] pt-4 text-sm leading-7 text-[var(--color-muted)]"
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20" aria-label="Latest insight">
        <Container>
          <SectionHeading id="latest-insight">Latest insight</SectionHeading>

          <div className="mt-10">
            <article className="surface-card flex h-full flex-col p-7 sm:p-8">
              <p className="kicker">Short-form commentary</p>
              {featuredInsight ? (
                <>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {formatDisplayDate(featuredInsight.publishDate).toUpperCase()} •{" "}
                    {featuredInsight.category.toUpperCase()}
                  </p>
                  <h3 className="mt-4 text-[clamp(1.6rem,2.5vw,2.1rem)] leading-tight text-ink">
                    {featuredInsight.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                    {featuredInsight.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
                    <span>{featuredInsight.readingTime}</span>
                  </div>
                  <Link href={featuredInsight.url} className="editorial-link mt-7 inline-flex">
                    Read Insight
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="mt-4 text-[clamp(1.6rem,2.5vw,2.1rem)] leading-tight text-ink">
                    Insight archive
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                    Short-form policy commentary appears here as new insight pieces are published.
                  </p>
                  <Link href="/insights" className="editorial-link mt-7 inline-flex">
                    Browse insights
                  </Link>
                </>
              )}
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20" aria-label="Latest research">
        <Container>
          <SectionHeading id="latest-research">Latest research</SectionHeading>

          <div className="mt-10">
            <article className="surface-card flex h-full flex-col p-7 sm:p-8" aria-label="Featured research preview">
              <p className="kicker">Deeper analysis</p>
              {featuredResearch ? (
                <>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                    <span>Featured research</span>
                    <span>•</span>
                    <span>{featuredResearch.category}</span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.6rem,2.5vw,2.1rem)] leading-tight text-ink">
                    {featuredResearch.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                    {featuredResearch.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
                    <time dateTime={featuredResearch.publishDate}>
                      {formatDisplayDate(featuredResearch.publishDate)}
                    </time>
                    <span>•</span>
                    <span>{featuredResearch.readingTime}</span>
                  </div>
                  <Link href={featuredResearch.url} className="editorial-link mt-7 inline-flex">
                    Read Research
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="mt-4 text-[clamp(1.6rem,2.5vw,2.1rem)] leading-tight text-ink">
                    Research archive
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                    Longer-form analysis appears here as new research is published.
                  </p>
                  <Link href="/research" className="editorial-link mt-7 inline-flex">
                    Browse research
                  </Link>
                </>
              )}
            </article>
          </div>
        </Container>
      </section>

      <section id="contact" className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-serif text-[clamp(2.05rem,3vw,2.7rem)] leading-[1.08] tracking-[-0.03em] text-ink">
              If reimbursement or access is driving the decision, start there.
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
              JL Policy Consulting helps organizations evaluate policy, payment, payer, and
              provider constraints so commercial teams can move with better information.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-7 py-3">
                View Consulting
              </Link>
              <Link href="/contact" className="button-secondary inline-flex items-center rounded-md px-7 py-3">
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <script
        nonce={cspNonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            ...personSchema,
            mainEntityOfPage: absoluteUrl("/"),
          }),
        }}
      />
    </>
  );
}
