import Link from "next/link";
import { headers } from "next/headers";
import { Container } from "@/components/container";
import { formatDisplayDate, getLatestInsights, getLatestResearch } from "@/lib/content";
import { safeJsonLd } from "@/lib/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Healthcare Policy and Market Access Intelligence",
  description:
    "Reimbursement strategy, drug pricing policy, and market access insight grounded in real-world data and use cases.",
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

const capabilitiesLeft = [
  "Reimbursement Policy",
  "Drug Pricing and Market Access",
  "PBM and Formulary Strategy",
  "Biosimilars and Generics Policy",
  "Medicare Part D Policy",
  "Healthcare Data Analytics",
] as const;

const capabilitiesRight = [
  "Reimbursement Strategy Advisory",
  "Market Access and Payer Dynamics",
  "Drug Pricing and Policy Analysis",
  "Medicare Policy Impact Analysis",
  "Biosimilars Commercialization Strategy",
  "Healthcare Policy Analytics",
] as const;

const metrics = [
  { value: "10+", label: "YEARS EXPERIENCE" },
  { value: "100+", label: "POLICY ANALYSES" },
  { value: "50+", label: "CLIENT PROJECTS" },
] as const;

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="section-title">
      {children}
    </h2>
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
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="font-serif text-[clamp(2.35rem,5.1vw,4.4rem)] leading-[1.08] tracking-[-0.02em] text-ink">
              Healthcare Policy and Market Access Intelligence, Grounded in Real-World Data and Use
              Cases
            </h1>
            <p className="mx-auto mt-7 max-w-4xl text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)] sm:text-[0.95rem] md:whitespace-nowrap">
              Reimbursement Strategy, Drug Pricing Policy, Market Access Insight
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              JL Policy Consulting provides analysis and advisory at the intersection of
              pharmaceutical policy, payer dynamics, and commercialization strategy. With more than
              a decade of experience across drug pricing, reimbursement, and market access, the firm
              supports manufacturers, payers, and stakeholders in navigating complex access and
              policy environments. Our work spans manufacturer strategy, biosimilars policy,
              Medicare reimbursement, and healthcare data analytics, with a focus on delivering
              flexible, data-driven insights tailored to real-world use cases.
            </p>
          </div>
        </Container>
      </section>

      <section id="consulting" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="capabilities-heading">Capabilities</SectionHeading>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <ul className="space-y-4" role="list">
              {capabilitiesLeft.map((item) => (
                <li key={item} className="surface-card px-6 py-5 text-base leading-7 text-[var(--color-ink)]">
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-4" role="list">
              {capabilitiesRight.map((item) => (
                <li key={item} className="surface-card px-6 py-5 text-base leading-7 text-[var(--color-ink)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="insights" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="insights-heading">Latest Insights</SectionHeading>

          <div className="mt-10 grid grid-cols-1 gap-7 xl:grid-cols-[0.95fr_1.05fr]">
            {featuredInsight ? (
              <article className="surface-card flex h-full flex-col p-7 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {formatDisplayDate(featuredInsight.publishDate).toUpperCase()} •{" "}
                  {featuredInsight.category.toUpperCase()}
                </p>
                <h3 className="mt-5 text-[clamp(1.65rem,2.8vw,2.3rem)] leading-tight text-ink">
                  {featuredInsight.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  {featuredInsight.summary}
                </p>
                <p className="mt-5 text-xs leading-6 text-[var(--color-muted)]">
                  {featuredInsight.readingTime}
                </p>
                <Link href={featuredInsight.url} className="editorial-link mt-7 inline-flex">
                  Read Insight
                </Link>
              </article>
            ) : (
              <article className="surface-card flex h-full flex-col p-7 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  INSIGHT ARCHIVE
                </p>
                <h3 className="mt-5 text-[clamp(1.65rem,2.8vw,2.3rem)] leading-tight text-ink">
                  Commentary appears here as new insights are published
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  Browse the insights archive for recent policy commentary and market access
                  analysis.
                </p>
                <Link href="/insights" className="editorial-link mt-7 inline-flex">
                  Browse Insights
                </Link>
              </article>
            )}

            {featuredResearch ? (
              <article className="surface-card flex h-full flex-col p-7 sm:p-8" aria-label="Featured research preview">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag">Research Analysis</span>
                  <span className="tag">{featuredResearch.category}</span>
                </div>
                <h3 className="mt-5 text-[clamp(1.35rem,2.3vw,1.9rem)] leading-tight text-ink">
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
                  View Research
                </Link>
              </article>
            ) : (
              <article className="surface-card flex h-full flex-col p-7 sm:p-8" aria-label="Research archive preview">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag">Research Analysis</span>
                </div>
                <h3 className="mt-5 text-[clamp(1.35rem,2.3vw,1.9rem)] leading-tight text-ink">
                  Data-backed research appears here as new work is published
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  Browse the research archive for quantitative analysis, structured policy briefs,
                  and market access studies.
                </p>
                <Link href="/research" className="editorial-link mt-6 inline-flex">
                  View Research
                </Link>
              </article>
            )}
          </div>
        </Container>
      </section>

      <section id="research" className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading id="research-heading">Research &amp; Analysis</SectionHeading>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
              Our research combines quantitative analysis of healthcare policy data with strategic
              insights into market dynamics. We translate complex regulatory change into actionable
              intelligence for pharmaceutical manufacturers and payers.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16" aria-label="Firm metrics">
        <Container>
          <div className="surface-card px-6 py-9 sm:px-10 sm:py-10">
            <div className="grid gap-9 md:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <p className="font-serif text-[clamp(2rem,4.2vw,3rem)] leading-none text-[var(--color-accent)]">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="contact-heading">Get in Touch</SectionHeading>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Interested in discussing how we can support your market access strategy?
            </p>
            <Link href="/contact" className="button-primary mt-8 inline-flex items-center rounded-md px-7 py-3">
              Contact Us
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
