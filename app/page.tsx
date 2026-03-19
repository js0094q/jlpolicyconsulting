import Link from "next/link";
import { Container } from "@/components/container";
import { getInsights, getResearch } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Reimbursement, Drug Pricing & Market Access Strategy",
  description:
    "Commentary and analysis on pharmaceutical reimbursement, drug pricing strategy, market access, Medicare Part D design, and PBM/formulary dynamics linking policy and payer economics to commercial outcomes.",
  path: "/",
});

interface LinkedFeature {
  slug: string;
  title: string;
  description: string;
  href?: string;
  accentColor?: string;
}

const focusAreas = [
  {
    title: "Medicare Part D and Benefit Design",
    description:
      "Analysis of deductible structure, benefit redesign, catastrophic liability shifts, and plan incentives.",
  },
  {
    title: "PBM and Formulary Dynamics",
    description:
      "Examination of tier placement, utilization management, network design, and the economic logic behind formulary behavior.",
  },
  {
    title: "Drug Pricing and Gross-to-Net Strategy",
    description:
      "Commentary on price signals, rebate pressure, unit-cost trends, and where net strategy diverges from patient experience.",
  },
  {
    title: "Biosimilars and Generics Market Behavior",
    description:
      "Research on reimbursement barriers, formulary disincentives, and the commercial realities affecting lower-cost competition.",
  },
  {
    title: "Healthcare Data Analysis",
    description:
      "CMS SPUF and related payer-data analysis to identify plan-level trends, access shifts, and product-specific anomalies.",
  },
] as const;

const strategicQuestions = [
  "How does Medicare Part D redesign change patient liability and plan incentives?",
  "Why do some generics move into higher formulary tiers even when unit pricing is flat or falling?",
  "What do formulary decisions reveal about PBM economics and access strategy?",
  "Where do pricing trends and patient cost exposure diverge?",
  "How should manufacturers interpret payer behavior before and after loss of exclusivity?",
  "What signals in public CMS data suggest future access friction or reimbursement pressure?",
] as const;

const featuredInsightCards: LinkedFeature[] = [
  {
    slug: "why-part-d-redesign-shifts-liability",
    title: "Why Part D Redesign Shifts Liability",
    description:
      "How 2025 and 2026 benefit changes alter visible beneficiary exposure and reshape plan behavior.",
    accentColor: "var(--color-brand-secondary)",
  },
  {
    slug: "generics-moving-to-higher-tiers-despite-price-decline",
    title: "Generics Moving to Higher Tiers Despite Price Decline",
    description:
      "Why formulary worsening can persist even when same-drug unit prices are stable or lower.",
    accentColor: "var(--color-brand-accent)",
  },
  {
    slug: "pbm-economics-and-formulary-design",
    title: "PBM Economics and Formulary Design",
    description:
      "A strategic view of how incentives translate into coverage decisions and access friction.",
    accentColor: "var(--color-brand-primary-soft)",
  },
  {
    slug: "unit-price-vs-patient-cost-misalignment",
    title: "Unit Price vs Patient Cost Misalignment",
    description:
      "Why falling or stable unit cost does not necessarily translate into better patient affordability.",
    accentColor: "var(--color-brand-support)",
  },
  {
    slug: "mail-order-incentives-in-part-d",
    title: "Mail Order Incentives in Part D",
    description:
      "How network and cost-sharing design can influence dispensing channel behavior and patient steering.",
    accentColor: "var(--color-brand-primary)",
  },
];

const featuredResearchCards: LinkedFeature[] = [
  {
    slug: "tier-migration-commoditized-generics-part-d",
    title: "Tier Migration of Commoditized Generics in Part D",
    description: "A plan-level look at upward tier movement among lower-cost multisource products.",
    accentColor: "var(--color-brand-secondary)",
  },
  {
    slug: "same-ndc-unit-price-analysis",
    title: "Same-NDC Unit Price Analysis",
    description:
      "A method-focused analysis distinguishing true same-NDC repricing from manufacturer-mix effects.",
    accentColor: "var(--color-brand-accent)",
  },
  {
    slug: "mapd-vs-pdp-tier-worsening-analysis",
    title: "MA-PD vs PDP Tier Worsening Analysis",
    description:
      "A comparison of whether tier worsening is more concentrated in Medicare Advantage prescription drug plans or stand-alone PDPs.",
    accentColor: "var(--color-brand-support)",
  },
];

function HeroSection({ featuredResearchHref, featuredInsightHref }: { featuredResearchHref: string; featuredInsightHref: string }) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f3f8fe_100%)] py-16 sm:py-20">
      <Container>
        <p className="kicker">Data-backed reimbursement and formulary analysis</p>
        <h1 className="page-title max-w-5xl">Medicare Part D, Formularies, and Drug Pricing Analytics</h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
          Structured analysis of plan design, PBM and formulary behavior, and payer economics to
          explain how reimbursement decisions shape access, patient cost exposure, and commercial
          outcomes.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/research" className="button-primary">
            Read the Research
          </Link>
          <Link href="/insights" className="button-secondary">
            Explore Insights
          </Link>
        </div>
        <ul className="mt-8 max-w-4xl space-y-3 border-t border-[var(--color-border)] pt-6 text-sm leading-7 text-[var(--color-muted)]">
          <li>
            <span className="font-semibold text-ink">Featured Research:</span>{" "}
            <Link href={featuredResearchHref} className="editorial-link">
              Tier Migration of Commoditized Generics in Part D
            </Link>
          </li>
          <li>
            <span className="font-semibold text-ink">Featured Insight:</span>{" "}
            <Link href={featuredInsightHref} className="editorial-link">
              PBM Economics and Formulary Design
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
      <Container>
        <h2 className="section-title">Homepage Introduction</h2>
        <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          Joseph Stewart is a reimbursement and health policy strategist focused on how benefit
          design, formulary behavior, and payer incentives shape real-world pharmaceutical access.
          Drawing on experience across manufacturer, trade association, consulting, and pharmacy
          settings, he translates Medicare Part D policy, PBM dynamics, and pricing signals into
          clear implications for market access strategy, commercialization planning, and stakeholder
          decision-making. The work is built for readers who need more than headline policy
          summaries, especially when access friction, tier placement, and patient cost burden are
          changing faster than visible list-price narratives.
        </p>
      </Container>
    </section>
  );
}

function FocusAreasSection() {
  return (
    <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
      <Container>
        <h2 className="section-title">Areas of Focus</h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
          This platform examines the reimbursement and payer mechanics that materially affect
          pharmaceutical access, pricing strategy, and commercial performance.
        </p>
        <div className="surface-card mt-8 divide-y divide-[var(--color-border)]">
          {focusAreas.map((item) => (
            <article key={item.title} className="px-5 py-6 sm:px-7">
              <h3 className="text-2xl leading-tight text-ink">{item.title}</h3>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--color-muted)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StrategicQuestionsSection() {
  return (
    <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
      <Container>
        <h2 className="section-title">Questions Driving the Analysis</h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
          The work is organized around practical commercial and policy questions rather than
          abstract policy commentary.
        </p>
        <ol className="mt-8 space-y-3 text-base leading-8 text-[var(--color-muted)]">
          {strategicQuestions.map((question) => (
            <li key={question} className="border-b border-[var(--color-border)] pb-3">
              {question}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function FeaturedInsightsSection({ items }: { items: LinkedFeature[] }) {
  return (
    <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Featured Insights</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
              Short-form interpretation of the reimbursement, access, and payer dynamics most
              relevant to current market behavior.
            </p>
          </div>
          <Link href="/insights" className="editorial-link">
            All insights
          </Link>
        </div>
        <div className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {items.map((item) => (
            <article
              key={item.slug}
              className="border-l-4 py-6 pl-5 sm:py-7 sm:pl-6"
              style={{ borderLeftColor: item.accentColor ?? "var(--color-border)" }}
            >
              <h3 className="text-2xl leading-tight text-ink">
                <Link href={item.href ?? `/insights/${item.slug}`} className="hover:text-[var(--color-accent)]">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--color-muted)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeaturedResearchSection({ items }: { items: LinkedFeature[] }) {
  return (
    <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Featured Research</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
              Longer-form analytical work built from CMS and reimbursement datasets to isolate plan
              behavior, pricing patterns, and access implications.
            </p>
          </div>
          <Link href="/research" className="editorial-link">
            All research
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.slug}
              className="surface-card border-t-4 p-6 sm:p-7"
              style={{ borderTopColor: item.accentColor ?? "var(--color-border)" }}
            >
              <h3 className="text-2xl leading-tight text-ink">
                <Link href={item.href ?? `/research/${item.slug}`} className="hover:text-[var(--color-accent)]">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
      <Container>
        <h2 className="section-title">Method</h2>
        <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          The analysis relies heavily on public Medicare Part D formulary, pharmacy network,
          beneficiary cost, and pricing files, with an emphasis on separating visible product-level
          pricing changes from true same-NDC pricing behavior across comparable plan records.
        </p>
        <ul className="mt-7 list-disc space-y-2 pl-5 text-base leading-8 text-[var(--color-muted)] marker:text-[var(--color-accent-soft)]">
          <li>
            Public CMS SPUF plan, formulary, beneficiary cost, pharmacy network, and pricing files
          </li>
          <li>
            True same-NDC comparison logic to separate repricing from NDC/manufacturer mix shift
          </li>
          <li>
            Plan-type comparison across local MA, regional MA, and stand-alone PDP structures
          </li>
          <li>Focus on how reimbursement design changes affect access, not just nominal price</li>
        </ul>
      </Container>
    </section>
  );
}

function WhyItMattersSection() {
  return (
    <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
      <Container>
        <h2 className="section-title">Why It Matters</h2>
        <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          Reimbursement strategy is often evaluated through high-level policy headlines or average
          pricing narratives. That misses the operational reality. Patient access is shaped by
          benefit design, formulary placement, deductible application, network design, and
          utilization management. A product can look stable on price while becoming more difficult
          to access, more expensive at the point of sale, or less strategically advantaged across
          plan types. This work focuses on those gaps, where policy mechanics and payer behavior
          create the real commercial story.
        </p>
      </Container>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
      <Container>
        <h2 className="section-title">About Joseph Stewart</h2>
        <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          Joseph Stewart is a health policy and reimbursement professional with experience spanning
          pharmaceutical manufacturer strategy, biosimilars policy, consulting, and frontline
          pharmacy operations. His work has included reimbursement and health policy leadership at
          Otsuka, biosimilars policy leadership at the Association for Accessible Medicines, and
          consulting across manufacturers, PBMs, and payers. This background supports a practical
          analytical approach grounded in how policy, reimbursement, and operations interact in the
          market.
        </p>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="surface-card p-7 sm:p-9">
          <h2 className="section-title">Read the Analysis</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            Explore research and commentary on Medicare Part D, PBM and formulary behavior, drug
            pricing strategy, and the payer dynamics shaping access in the U.S. pharmaceutical
            market.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/research" className="button-primary">
              View Research
            </Link>
            <Link href="/insights" className="button-secondary bg-white">
              View Insights
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default async function HomePage() {
  const [insights, research] = await Promise.all([getInsights(), getResearch()]);
  const insightHrefBySlug = new Map(insights.map((article) => [article.slug, article.url]));
  const researchHrefBySlug = new Map(research.map((article) => [article.slug, article.url]));

  const resolvedFeaturedInsights = featuredInsightCards.map((item) => ({
    ...item,
    href: insightHrefBySlug.get(item.slug) ?? `/insights/${item.slug}`,
  }));
  const resolvedFeaturedResearch = featuredResearchCards.map((item) => ({
    ...item,
    href: researchHrefBySlug.get(item.slug) ?? `/research/${item.slug}`,
  }));

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
      "Pharmaceutical reimbursement",
      "Drug pricing strategy",
      "Market access",
      "Medicare Part D",
      "PBM formulary behavior",
      "Payer economics",
    ],
  };

  return (
    <>
      <HeroSection
        featuredResearchHref={
          researchHrefBySlug.get("tier-migration-commoditized-generics-part-d") ??
          "/research/tier-migration-commoditized-generics-part-d"
        }
        featuredInsightHref={
          insightHrefBySlug.get("pbm-economics-and-formulary-design") ??
          "/insights/pbm-economics-and-formulary-design"
        }
      />
      <IntroSection />
      <FocusAreasSection />
      <StrategicQuestionsSection />
      <FeaturedInsightsSection items={resolvedFeaturedInsights} />
      <FeaturedResearchSection items={resolvedFeaturedResearch} />
      <MethodSection />
      <WhyItMattersSection />
      <AboutSection />
      <FinalCtaSection />

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
