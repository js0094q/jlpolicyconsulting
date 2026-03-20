import Link from "next/link";
import { Container } from "@/components/container";
import { formatDisplayDate, getInsights } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Reimbursement Strategy, Drug Pricing Policy, and Market Access Insight",
  description:
    "Analysis and advisory at the intersection of pharmaceutical policy, payer economics, and commercialization strategy.",
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

function signed(value: number): string {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}`;
}

export default async function HomePage() {
  const insights = await getInsights();
  const featuredInsight = insights[0] ?? null;

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
      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Healthcare Policy and Market Access Intelligence, Grounded in Real-World Data and Use
              Cases
            </h1>
            <p className="mx-auto mt-5 max-w-3xl whitespace-nowrap text-center text-[clamp(0.48rem,2.5vw,1.125rem)] font-medium leading-tight text-[var(--color-muted)]">
              Reimbursement Strategy, Drug Pricing Policy, Market Access Insight
            </p>
            <p className="mx-auto mt-6 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
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

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14">
        <Container>
          <h2 className="section-title">Capabilities</h2>
          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">
            <ul className="space-y-2 text-base leading-7 text-[var(--color-muted)]">
              {capabilitiesLeft.map((item) => (
                <li key={item} className="border-b border-[var(--color-border)] pb-2">
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-base leading-7 text-[var(--color-muted)]">
              {capabilitiesRight.map((item) => (
                <li key={item} className="border-b border-[var(--color-border)] pb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <h2 className="mb-8 text-center text-3xl font-semibold leading-tight text-ink sm:mb-10 sm:text-4xl">
            Latest Insights
          </h2>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <article className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7">
              {featuredInsight ? (
                <>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-accent-soft)]">
                    {formatDisplayDate(featuredInsight.publishDate)} · {featuredInsight.category}
                  </p>
                  <h3 className="mt-3 text-3xl leading-tight text-ink">
                    {featuredInsight.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                    {featuredInsight.summary}
                  </p>
                  <Link href={featuredInsight.url} className="editorial-link mt-6 inline-flex text-sm">
                    Read Insight
                  </Link>
                </>
              ) : (
                <p className="text-base leading-8 text-[var(--color-muted)]">
                  Insights are being prepared. Check back shortly.
                </p>
              )}
            </article>

            <aside className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7">
              <h3 className="text-xl leading-tight text-ink">Tier Migration vs Unit Price Change</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                SPUF-derived quarterly view of mature generic products with measurable higher-tier
                movement against same-NDC unit cost change.
              </p>

              <div className="mt-5 space-y-4">
                {tierPreviewData.map((row) => (
                  <div key={row.product}>
                    <div className="flex items-center justify-between gap-3 text-sm text-[var(--color-muted)]">
                      <span className="truncate">{row.product}</span>
                      <span className="font-semibold text-ink">{signed(row.tierShift)} pp</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-[#e9edf2]">
                      <div
                        className="h-2 bg-[var(--color-accent)]"
                        style={{ width: `${Math.min(100, row.tierShift * 3.4)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-[var(--color-muted)]">
                      Same-NDC unit price change: {signed(row.priceShift)}%
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-6 text-[var(--color-muted)]">
                Source framework: CMS Part D SPUF plan-level data (tier level, UNIT_COST, and UM
                flags including PA/ST/QL).
              </p>
            </aside>
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
