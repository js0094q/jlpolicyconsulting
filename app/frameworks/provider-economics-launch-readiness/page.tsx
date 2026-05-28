import { headers } from "next/headers";
import Link from "next/link";
import { Container } from "@/components/container";
import { CoverageVsEconomicsChart } from "@/components/reimbursement/CoverageVsEconomicsChart";
import { ProviderEconomicsMathBlock } from "@/components/reimbursement/ProviderEconomicsMathBlock";
import { ProviderNetPositionFormula } from "@/components/reimbursement/ProviderNetPositionFormula";
import { safeJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pillars = [
  {
    pillar: "Acquisition",
    question: "Can the provider obtain the therapy without carrying unacceptable working-capital risk?",
    risk: "High acquisition cost, stocking exposure, payer-directed sourcing, or unclear channel access can delay routine use.",
    implication: "Providers may restrict starts, avoid inventory, or route patients away from the preferred care setting.",
    action: "Model acquisition pathways by site of care, payer type, inventory model, and 340B status before launch.",
  },
  {
    pillar: "Authorization",
    question: "Can the patient clear coverage criteria before the provider assumes drug-cost exposure?",
    risk: "Prior authorization, continuation criteria, site-of-care rules, and documentation burden can create avoidable rework.",
    implication: "A covered therapy can still be operationally unattractive when each start requires exception handling.",
    action: "Prepare field reimbursement team training, payer-policy tracking, and provider-facing documentation workflows.",
  },
  {
    pillar: "Coding and Billing",
    question: "Can the provider identify, code, document, and submit the claim cleanly?",
    risk: "Interim codes, miscellaneous-code use, delayed product-specific coding, or unclear payment status can increase denials.",
    implication: "Revenue-cycle teams may slow adoption until billing instructions and payment expectations are stable.",
    action: "Map the approval-to-code transition period, interim billing guidance, and product-specific code activation plan.",
  },
  {
    pillar: "Net Cost Recovery",
    question: "Does expected reimbursement exceed acquisition cost, operating cost, denial drag, and financing drag?",
    risk: "Nominal payment adequacy can be offset by delayed payment, rework, handling cost, or negative site-specific margins.",
    implication: "Provider adoption depends on realized economics, not only payer coverage or clinical interest.",
    action: "Use a product-agnostic net-position model with payer mix, 340B status, sourcing rules, and payment timing.",
  },
] as const;

export const metadata = createPageMetadata({
  title: "Provider Economics Launch Readiness Framework",
  description:
    "A provider economics launch readiness framework for high-cost provider-administered therapies across acquisition, authorization, coding and billing, and net cost recovery.",
  path: "/frameworks/provider-economics-launch-readiness",
  kicker: "Framework",
  keywords: [
    "provider economics",
    "launch readiness",
    "buy-and-bill strategy",
    "Part B reimbursement",
    "340B economics",
  ],
});

export default async function ProviderEconomicsLaunchReadinessPage() {
  const requestHeaders = await headers();
  const cspNonce = requestHeaders.get("x-csp-nonce") ?? undefined;
  const pageUrl = absoluteUrl("/frameworks/provider-economics-launch-readiness");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Frameworks",
        item: absoluteUrl("/frameworks/provider-economics-launch-readiness"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Provider Economics Launch Readiness Framework",
        item: pageUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Provider Economics Launch Readiness Framework",
    description:
      "A four-pillar framework for evaluating provider economics before launch of a high-cost provider-administered therapy.",
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
  };

  return (
    <>
      <section className="border-b border-[var(--color-border)] py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="max-w-3xl">
              <p className="kicker">Framework</p>
              <h1 className="hero-title page-title mt-5 max-w-[18ch]">
                Provider Economics Launch Readiness Framework
              </h1>
              <p className="mt-5 max-w-3xl text-[1.04rem] leading-8 text-[var(--color-muted)]">
                A commercial launch readiness framework for evaluating whether coverage can translate
                into operationally workable provider adoption for a high-cost provider-administered
                therapy.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/research/coverage-vs-provider-economics" className="button-primary inline-flex items-center px-6 py-3">
                  Read the Research
                </Link>
                <Link href="/consulting" className="button-secondary inline-flex items-center px-6 py-3">
                  View Consulting
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="min-w-0 max-w-full overflow-x-auto border border-[var(--color-border)] bg-[rgba(251,248,242,0.58)]">
              <table className="w-full min-w-[960px] border-collapse text-sm">
                <thead>
                  <tr>
                    {["Pillar", "Strategic Question", "Operational Risk", "Provider Implication", "Manufacturer Action"].map(
                      (heading) => (
                        <th
                          key={heading}
                          className="border-b border-[var(--color-border)] px-4 py-3 text-left font-semibold text-ink"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pillars.map((row) => (
                    <tr key={row.pillar}>
                      <td className="border-b border-[var(--color-border)] px-4 py-4 align-top font-serif text-lg text-ink">
                        {row.pillar}
                      </td>
                      <td className="border-b border-[var(--color-border)] px-4 py-4 align-top text-[var(--color-muted)]">
                        {row.question}
                      </td>
                      <td className="border-b border-[var(--color-border)] px-4 py-4 align-top text-[var(--color-muted)]">
                        {row.risk}
                      </td>
                      <td className="border-b border-[var(--color-border)] px-4 py-4 align-top text-[var(--color-muted)]">
                        {row.implication}
                      </td>
                      <td className="border-b border-[var(--color-border)] px-4 py-4 align-top text-[var(--color-muted)]">
                        {row.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 grid min-w-0 gap-8">
              <CoverageVsEconomicsChart />
              <ProviderNetPositionFormula />
              <ProviderEconomicsMathBlock />
            </div>

            <section className="mt-10 border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
              <h2 className="section-title">How to use the framework</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                The framework is designed for launch readiness, payer strategy, reimbursement operations,
                field reimbursement team training, and provider-facing support planning. It should be
                applied with site-of-care segmentation, payer-mix assumptions, coding timing, sourcing
                rules, and 340B status made explicit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="button-primary inline-flex items-center px-6 py-3">
                  Contact
                </Link>
                <Link href="/research" className="button-secondary inline-flex items-center px-6 py-3">
                  Research Index
                </Link>
              </div>
            </section>
          </div>
        </Container>
      </section>

      <script
        nonce={cspNonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(pageSchema) }}
      />
      <script
        nonce={cspNonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
    </>
  );
}
