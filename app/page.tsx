import Link from "next/link";
import { Container } from "@/components/container";
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

const tierPreviewData = [
  { product: "Nortriptyline HCl", tierShift: 23.6, priceShift: 0.7 },
  { product: "Alprazolam", tierShift: 15.2, priceShift: 1.6 },
  { product: "Morphine Sulfate", tierShift: 7.0, priceShift: 3.5 },
  { product: "Dexmethylphenidate HCl", tierShift: 6.8, priceShift: -0.1 },
] as const;

const metrics = [
  { value: "10+", label: "YEARS EXPERIENCE" },
  { value: "100+", label: "POLICY ANALYSES" },
  { value: "50+", label: "CLIENT PROJECTS" },
] as const;

function signed(value: number): string {
  const prefix = value > 0 ? "+" : "";
  return prefix + value.toFixed(1);
}

function barWidth(shift: number, maxShift: number): string {
  const ratio = maxShift <= 0 ? 0 : (shift / maxShift) * 100;
  const clamped = Math.max(12, Math.min(100, ratio));
  return clamped.toFixed(1) + "%";
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="section-title">
      {children}
    </h2>
  );
}

export default function HomePage() {
  const maxShift = Math.max(...tierPreviewData.map((item) => item.tierShift));

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
            <article className="surface-card flex h-full flex-col p-7 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                MARCH 18, 2026 • MEDICARE POLICY
              </p>
              <h3 className="mt-5 text-[clamp(1.65rem,2.8vw,2.3rem)] leading-tight text-ink">
                Why Part D Redesign Changes Where Pressure Shows Up
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                Part D redesign improves beneficiary protection but shifts how plans manage risk,
                often through formulary and utilization design.
              </p>
              <Link href="/insights/part-d-redesign-liability" className="editorial-link mt-7 inline-flex">
                Read Insight
              </Link>
            </article>

            <article className="surface-card p-7 sm:p-8" aria-label="Tier migration analytics highlight">
              <h3 className="text-[clamp(1.35rem,2.3vw,1.9rem)] leading-tight text-ink">
                Tier Migration vs Unit Price Change
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                SPUF-derived quarterly view of mature generic products with measurable higher-tier
                movement against same-NDC unit cost change.
              </p>

              <ul className="mt-6 space-y-4" role="list">
                {tierPreviewData.map((row) => (
                  <li key={row.product} className="rounded-md border border-[var(--color-border)] px-4 py-3">
                    <div className="flex items-start justify-between gap-3 text-sm">
                      <div>
                        <p className="font-semibold text-[var(--color-ink)]">{row.product}</p>
                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                          Same-NDC unit price change: {signed(row.priceShift)}%
                        </p>
                      </div>
                      <p className="font-semibold text-[var(--color-accent)]">{signed(row.tierShift)} pp</p>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-[#e4ecf8]" aria-hidden>
                      <div
                        className="h-2 rounded-full bg-[var(--color-accent)]"
                        style={{ width: barWidth(row.tierShift, maxShift) }}
                      />
                    </div>
                    <p className="sr-only">
                      {row.product} net higher-tier movement {signed(row.tierShift)} percentage
                      points and same-NDC unit price change {signed(row.priceShift)} percent.
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs leading-6 text-[var(--color-muted)]">
                Source framework: CMS Part D SPUF plan-level data (tier level, UNIT_COST, and LM
                flags including RXCUI_1)
              </p>

              <Link href="/research/tier-migration-commoditized-generics" className="editorial-link mt-4 inline-flex">
                View Research
              </Link>
            </article>
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...personSchema,
            mainEntityOfPage: absoluteUrl("/"),
          }),
        }}
      />
    </>
  );
}
