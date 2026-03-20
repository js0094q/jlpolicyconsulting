import Link from "next/link";
import { Container } from "@/components/container";
import { getInsights } from "@/lib/content";
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

const expertise = [
  "Reimbursement Policy",
  "Drug Pricing and Market Access",
  "PBM and Formulary Strategy",
  "Biosimilars and Generics Policy",
  "Healthcare Data Analytics",
  "Medicare Part D Policy",
];

const consultingFocus = [
  "Reimbursement Strategy Advisory",
  "Market Access and Payer Dynamics",
  "Drug Pricing and Policy Analysis",
  "Medicare Policy Impact Analysis",
  "Biosimilars Commercialization Strategy",
  "Healthcare Policy Analytics",
];

export default async function HomePage() {
  const insights = await getInsights();
  const latestInsights = insights.slice(0, 4);

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
          <h1 className="page-title max-w-5xl">Reimbursement Strategy, Drug Pricing Policy, and Market Access Insight</h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            Analysis and advisory at the intersection of pharmaceutical policy, payer economics,
            and commercialization strategy.
          </p>
          <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            JL Policy Consulting, LLC is a boutique advisory firm focused on U.S. pharmaceutical
            reimbursement, market access, drug pricing policy, and payer behavior.
          </p>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            The firm combines policy fluency with direct analysis of CMS Part D data, formulary
            design, utilization management, and channel dynamics to identify where statutory change
            translates into real-world access outcomes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/insights" className="button-primary">
              View Insights
            </Link>
            <Link href="/consulting" className="button-secondary">
              Consulting
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <h2 className="section-title">Expertise</h2>
          <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {expertise.map((item) => (
              <li key={item} className="border-b border-[var(--color-border)] pb-3">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <h2 className="section-title">Consulting Focus</h2>
          <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {consultingFocus.map((item) => (
              <li key={item} className="border-b border-[var(--color-border)] pb-3">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <h2 className="section-title">Latest Insights</h2>
          <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {latestInsights.map((post) => (
              <li key={post.slug} className="border-b border-[var(--color-border)] pb-3">
                <Link href={post.url} className="editorial-link text-base font-semibold">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">
            Explore additional analysis in{" "}
            <Link href="/research" className="editorial-link">
              Research
            </Link>{" "}
            and advisory scope in{" "}
            <Link href="/consulting" className="editorial-link">
              Consulting
            </Link>
            .
          </p>
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
