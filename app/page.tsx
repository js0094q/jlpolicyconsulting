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

const proofSignals = [
  {
    value: "Policy + data",
    label: "Policy analysis grounded in structural rules and observable market behavior",
  },
  {
    value: "Commercial relevance",
    label: "Work framed around decisions that affect launch, access, and in-market strategy",
  },
  {
    value: "Cross-functional",
    label: "Perspective built to be useful to policy, access, and commercialization teams",
  },
  {
    value: "Decision-ready output",
    label: "Concise deliverables that translate reimbursement issues into action",
  },
] as const;

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

const consultingAreas = [
  {
    title: "Reimbursement strategy",
    summary:
      "Structure, timing, and payment mechanics that shape whether coverage is operationally viable.",
    details: [
      "For launch and market access teams evaluating provider and payer readiness.",
      "Informs reimbursement planning, account strategy, and launch sequencing.",
    ],
  },
  {
    title: "Medicare and drug pricing policy",
    summary:
      "Policy shifts that affect Part D design, payment rules, and commercial assumptions.",
    details: [
      "For leaders tracking CMS changes, pricing pressure, and policy exposure.",
      "Informs policy response, scenario planning, and cross-functional communication.",
    ],
  },
  {
    title: "Market access and payer dynamics",
    summary:
      "How plan design, formulary movement, and utilization management alter access in practice.",
    details: [
      "For payer-facing strategy, government affairs, and commercialization teams.",
      "Informs access strategy, evidence framing, and launch risk assessment.",
    ],
  },
  {
    title: "Biosimilars and commercialization economics",
    summary:
      "Pricing, channel, and adoption dynamics that shape competitive uptake and positioning.",
    details: [
      "For teams working through competitive response and market structure change.",
      "Informs pricing, channel strategy, and lifecycle planning.",
    ],
  },
] as const;

const perspectivePoints = [
  "Policy is read through actual payer, provider, and channel behavior.",
  "Reimbursement analysis is tied to the commercial decision it informs.",
  "Outputs are concise enough to use in strategy discussions and executive review.",
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
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="kicker">JL Policy Consulting, LLC</p>
              <h1 className="mt-5 max-w-[13ch] font-serif text-[clamp(2.55rem,4vw,3.1rem)] leading-[1.03] tracking-[-0.03em] text-ink">
                Policy, reimbursement, and market access analysis for commercial decisions.
              </h1>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-[var(--color-muted)]">
                The firm helps manufacturers and strategy teams interpret payment mechanics, payer
                behavior, and provider economics so access questions become decision-ready.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                  View Consulting
                </Link>
                <Link href="/insights" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                  Read Insights
                </Link>
              </div>
            </div>

            <div className="paper-panel p-5 sm:p-6">
              <p className="kicker">What the work does</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-serif text-[1.05rem] leading-tight text-ink">
                    Connect policy mechanics to commercial implications.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    The analysis does not stop at interpretation. It shows where reimbursement,
                    coverage, and channel structure change planning assumptions.
                  </p>
                </div>
                <div className="border-t border-[var(--color-border)] pt-4">
                  <p className="font-serif text-[1.05rem] leading-tight text-ink">
                    Focus on the decisions that matter.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    Work is built for launch, access, pricing, policy response, and stakeholder
                    communication.
                  </p>
                </div>
                <div className="border-t border-[var(--color-border)] pt-4">
                  <p className="font-serif text-[1.05rem] leading-tight text-ink">
                    Keep the output usable.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    Deliverables are concise, structured, and ready for executive review or working
                    sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20" aria-label="What I help solve">
        <Container>
          <SectionHeading id="solve-heading">What I help solve</SectionHeading>
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

      <section id="perspective" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="perspective-heading">Why this perspective is different</SectionHeading>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-base leading-8 text-[var(--color-muted)]">
                Generic policy commentary often stops at describing what changed. This work
                connects policy design, coding and payment mechanics, payer controls, and provider
                economics so the commercial implication is visible.
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                The result is analysis that helps teams judge launch risk, access friction, and
                where reimbursement structure will matter most.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">Perspective points</p>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                {perspectivePoints.map((point) => (
                  <li key={point} className="border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="consulting-areas" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="consulting-areas-heading">Selected consulting areas</SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {consultingAreas.map((area) => (
              <article key={area.title} className="surface-card p-6 sm:p-7">
                <h3 className="text-[1.35rem] leading-tight text-ink">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{area.summary}</p>
                <div className="mt-5 space-y-4 border-t border-[var(--color-border)] pt-4">
                  {area.details.map((detail) => (
                    <p key={detail} className="text-sm leading-7 text-[var(--color-muted)]">
                      {detail}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14" aria-label="Credibility strip">
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
          <SectionHeading id="featured-work-heading">Featured insight and research</SectionHeading>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
            Editorial work shows how the consulting perspective is applied in practice. The focus
            is specific, selective, and tied to the same reimbursement and access questions that
            drive client work.
          </p>

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

      <section id="contact" className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="contact-heading" align="center">
              Discuss the reimbursement question underneath the launch plan.
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-8 text-[var(--color-muted)]">
              JL Policy Consulting supports teams evaluating market access risk, provider
              economics, formulary pressure, and policy exposure before those issues become
              commercial surprises.
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
