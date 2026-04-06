import Link from "next/link";
import { headers } from "next/headers";
import { Container } from "@/components/container";
import { formatDisplayDate, getLatestInsights, getLatestResearch } from "@/lib/content";
import { safeJsonLd } from "@/lib/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Reimbursement Strategy, Provider Economics, and Market Access",
  description:
    "Editorial analysis and advisory on reimbursement mechanics, payer behavior, provider economics, and market access strategy.",
  path: "/",
  kicker: "JL Policy Consulting, LLC",
  keywords: [
    "pharmaceutical reimbursement strategy",
    "drug pricing policy",
    "market access strategy",
    "Medicare Part D policy",
    "PBM formulary dynamics",
    "payer economics",
  ],
});

const proofSignals = [
  {
    value: "10+",
    label: "Years in reimbursement, pricing, and market access",
  },
  {
    value: "100+",
    label: "Policy analyses spanning CMS, Part D, formulary, and provider economics",
  },
  {
    value: "50+",
    label: "Client projects across manufacturer strategy and commercialization support",
  },
  {
    value: "Gross-to-Net",
    label: "Gross-to-net calculators and reimbursement readiness models for launch planning",
  },
] as const;

const featuredWork = [
  {
    title: "NTAP, DRG, and inpatient reimbursement strategy",
    summary:
      "Analysis for launch teams assessing how coding timing, DRG fit, NTAP eligibility, and hospital margin pressure shape early inpatient adoption.",
    points: [
      "Launch viability when reimbursement lags clinical uptake",
      "Hospital exposure under existing DRG payment mechanics",
      "Strategic readouts built for commercial, access, and investor audiences",
    ],
    href: "/research/ntap-drg-hospital-adoption-problem",
  },
  {
    title: "Provider economics, site-of-care strategy, and reimbursement execution",
    summary:
      "Work centered on buy-and-bill economics, white-bagging exposure, 340B dynamics, pass-through timing, and claim friction that can suppress use even when demand is clinically justified.",
    points: [
      "Net cost and margin pressure at the site-of-care level",
      "Channel and specialty pharmacy implications for uptake",
      "Execution-oriented deliverables for launch and field reimbursement teams",
    ],
    href: "/insights/reimbursement-readiness",
  },
] as const;

const strategicQuestions = [
  "How will reimbursement mechanics affect launch adoption once the product reaches provider accounts?",
  "Where does provider margin break under buy-and-bill, DRG, OPPS, or specialty channel reimbursement?",
  "How do payer controls shift access even when the clinical case is strong?",
  "What signals in Part D, PBM, or formulary design indicate commercial pressure ahead?",
] as const;

function SectionHeading({
  id,
  children,
  align = "left",
}: {
  id: string;
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={align === "center" ? "mx-auto h-px w-16 bg-[var(--color-accent)]" : "h-px w-16 bg-[var(--color-accent)]"} />
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
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.75fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="kicker">JL Policy Consulting, LLC</p>
              <h1 className="mt-6 font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02] tracking-[-0.025em] text-ink">
                Reimbursement strategy for decisions that depend on payer mechanics, provider economics, and policy timing.
              </h1>
              <p className="mt-6 max-w-3xl text-[1.04rem] leading-8 text-[var(--color-muted)]">
                JL Policy Consulting helps manufacturers and access teams evaluate how reimbursement structure, formulary behavior, coding timing, and site-of-care economics shape adoption risk.
              </p>
            </div>

            <div className="surface-card border-t-2 border-t-[var(--color-accent)] p-6 sm:p-7">
              <p className="kicker">Current signal</p>
              <p className="mt-4 font-serif text-2xl leading-tight text-ink">
                Strongest work sits where policy detail changes commercial outcomes.
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                Recent project work emphasizes inpatient reimbursement strategy, provider margin exposure, launch access execution, and reimbursement-readiness modeling.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14" aria-label="Firm proof">
        <Container>
          <div className="grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 xl:grid-cols-4">
            {proofSignals.map((signal) => (
              <article key={signal.label} className="bg-[var(--color-surface)] px-6 py-6">
                <p className="font-serif text-[2rem] leading-none text-[var(--color-accent)]">{signal.value}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]">{signal.label}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="featured-work" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="featured-work-heading">Featured flagship work</SectionHeading>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
            The firm&apos;s strongest market signal is concrete reimbursement and access work that connects policy mechanics to launch execution, provider behavior, and commercial exposure.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredWork.map((item) => (
              <article key={item.title} className="surface-card border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8">
                <p className="kicker">Featured work area</p>
                <h3 className="mt-4 text-[clamp(1.65rem,2.6vw,2.2rem)] leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{item.summary}</p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-ink)]">
                  {item.points.map((point) => (
                    <li key={point} className="border-t border-[var(--color-border)] pt-3">
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href={item.href} className="editorial-link mt-6 inline-flex">
                  Read the related piece
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="questions" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="questions-heading">Strategic questions addressed</SectionHeading>
          <div className="mt-10 grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-2">
            {strategicQuestions.map((question) => (
              <article key={question} className="bg-[var(--color-surface)] px-6 py-6 sm:px-7">
                <p className="font-serif text-[1.35rem] leading-8 text-ink">{question}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="insights" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="insights-heading">Latest insights and research</SectionHeading>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
            Recent publication work translates reimbursement structure, payer behavior, and market signals into decision-ready interpretation.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-7 xl:grid-cols-[0.95fr_1.05fr]">
            {featuredInsight ? (
              <article className="surface-card flex h-full flex-col border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {formatDisplayDate(featuredInsight.publishDate).toUpperCase()} • {featuredInsight.category.toUpperCase()}
                </p>
                <h3 className="mt-5 text-[clamp(1.65rem,2.8vw,2.25rem)] leading-tight text-ink">
                  {featuredInsight.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  {featuredInsight.summary}
                </p>
                <p className="mt-5 text-xs leading-6 text-[var(--color-muted)]">
                  {featuredInsight.readingTime}
                </p>
                <Link href={featuredInsight.url} className="editorial-link mt-7 inline-flex">
                  Read insight
                </Link>
              </article>
            ) : (
              <article className="surface-card flex h-full flex-col border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  INSIGHT ARCHIVE
                </p>
                <h3 className="mt-5 text-[clamp(1.65rem,2.8vw,2.25rem)] leading-tight text-ink">
                  Commentary appears here as new insights are published
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  Browse the insights archive for policy interpretation, launch access commentary, and reimbursement analysis.
                </p>
                <Link href="/insights" className="editorial-link mt-7 inline-flex">
                  Browse insights
                </Link>
              </article>
            )}

            {featuredResearch ? (
              <article className="surface-card flex h-full flex-col border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8" aria-label="Featured research preview">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag">Research analysis</span>
                  <span className="tag">{featuredResearch.category}</span>
                </div>
                <h3 className="mt-5 text-[clamp(1.4rem,2.4vw,2rem)] leading-tight text-ink">
                  {featuredResearch.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{featuredResearch.summary}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
                  <time dateTime={featuredResearch.publishDate}>
                    {formatDisplayDate(featuredResearch.publishDate)}
                  </time>
                  <span>•</span>
                  <span>{featuredResearch.readingTime}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredResearch.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={featuredResearch.url} className="editorial-link mt-6 inline-flex">
                  View research
                </Link>
              </article>
            ) : (
              <article className="surface-card flex h-full flex-col border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8" aria-label="Research archive preview">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag">Research analysis</span>
                </div>
                <h3 className="mt-5 text-[clamp(1.4rem,2.4vw,2rem)] leading-tight text-ink">
                  Data-backed research appears here as new work is published
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  Browse the research archive for reimbursement modeling, payer mechanics, and structured market access studies.
                </p>
                <Link href="/research" className="editorial-link mt-6 inline-flex">
                  View research
                </Link>
              </article>
            )}
          </div>
        </Container>
      </section>

      <section id="contact" className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="contact-heading" align="center">
              Discuss the reimbursement question underneath the launch plan.
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              JL Policy Consulting supports teams evaluating market access risk, provider economics, formulary pressure, and policy exposure before those issues become commercial surprises.
            </p>
            <Link href="/contact" className="button-primary mt-8 inline-flex items-center rounded-md px-7 py-3">
              Contact
            </Link>
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
