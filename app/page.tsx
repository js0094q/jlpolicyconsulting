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
    "JL Policy Consulting helps teams interpret reimbursement mechanics, payer behavior, provider economics, and market access risk.",
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

const problemAreas = [
  {
    title: "Medicare reimbursement and policy change",
    summary:
      "CMS decisions, coding timing, and payment design can change launch assumptions before a product reaches normal adoption.",
  },
  {
    title: "Drug pricing and gross-to-net pressure",
    summary:
      "List-to-net tension, rebate design, and net pricing mechanics affect both commercial planning and market access positioning.",
  },
  {
    title: "PBM, formulary, and payer behavior",
    summary:
      "Tiering, prior authorization, step therapy, and benefit design often drive access friction even when the clinical case is strong.",
  },
  {
    title: "Biosimilars, generics, and commercialization economics",
    summary:
      "Competitive access, pricing, and channel design shape whether lower-cost alternatives actually gain traction in the market.",
  },
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
        <Container className="max-w-[88rem]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kicker">JL Policy Consulting, LLC</p>
            <h1 className="mx-auto mt-5 max-w-[20ch] font-serif text-[clamp(2.7rem,4.2vw,3.65rem)] leading-[1.02] tracking-[-0.03em] text-ink">
              Policy, reimbursement, and market access analysis for complex health care
              decisions.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[1.04rem] leading-8 text-[var(--color-muted)]">
              We help manufacturers, payers, professional societies, patient advocacy groups, and
              other healthcare stakeholders translate federal and commercial payment mechanics,
              payer behavior, and provider economics into clear reimbursement and access strategy.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/insights" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                View Our Work
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="featured-work" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="featured-work-heading">Featured insight and research</SectionHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="surface-card flex h-full flex-col border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8">
              <p className="kicker">Featured insight</p>
              {featuredInsight ? (
                <>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {formatDisplayDate(featuredInsight.publishDate).toUpperCase()} • {featuredInsight.category.toUpperCase()}
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
                    Read insight
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

            <article className="surface-card flex h-full flex-col border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8" aria-label="Featured research preview">
              <p className="kicker">Featured research</p>
              {featuredResearch ? (
                <>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="tag">Research analysis</span>
                    <span className="tag">{featuredResearch.category}</span>
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
                    Read research
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

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20" aria-label="What We Help Solve">
        <Container>
          <SectionHeading id="solve-heading">What We Help Solve</SectionHeading>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {problemAreas.map((area) => (
              <article key={area.title} className="surface-card p-6 sm:p-7">
                <h3 className="text-[1.35rem] leading-tight text-ink">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{area.summary}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-serif text-[clamp(2.05rem,3vw,2.7rem)] leading-[1.08] tracking-[-0.03em] text-ink">
              Let us help you examine and understand access and reimbursement realities.
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
              JL Policy Consulting helps organizations evaluate access and reimbursement through a
              policy lens, including access risk, provider economics, formulary pressure, and
              policy landscape assessment, to best equip you to tackle access challenges.
            </p>
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
