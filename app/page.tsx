import Link from "next/link";
import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { ResearchCard } from "@/components/research-card";
import { getLatestInsights, getResearch } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Reimbursement, Drug Pricing, and Market Access Strategy",
  description:
    "Policy and analytics focused on pharmaceutical reimbursement, pricing, access, and payer formulary dynamics.",
  path: "/",
});

const focusAreas = [
  "Medicare Part D and Benefit Design",
  "PBM and Formulary Strategy",
  "Drug Pricing and Gross-to-Net Dynamics",
  "Biosimilars and Generics Market Behavior",
  "Reimbursement Policy and Access",
  "Healthcare Data Analysis (CMS, SPUF, plan-level data)",
];

const strategicQuestions = [
  "How does Part D redesign change patient cost exposure and plan incentives?",
  "Why are generics moving into higher formulary tiers despite falling prices?",
  "What do formulary decisions reveal about PBM economics?",
  "How should manufacturers interpret reimbursement policy changes commercially?",
  "Where do pricing trends diverge from patient cost trends?",
  "How should payer behavior shape market access planning before and after loss of exclusivity?",
];

export default async function HomePage() {
  const [latestInsights, research] = await Promise.all([getLatestInsights(5), getResearch()]);
  const featuredInsights = latestInsights.slice(0, 5);
  const featuredResearch = research.slice(0, 3);

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
      <section className="py-16 sm:py-20">
        <Container>
          <p className="kicker">Authority Platform</p>
          <h1 className="page-title">Reimbursement, Drug Pricing, and Market Access Strategy</h1>
          <p className="mt-4 max-w-5xl text-lg leading-8 text-[var(--color-muted)]">
            Policy and analytics for pharmaceutical pricing, access, and payer or formulary dynamics
            in the U.S. market.
          </p>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            Joseph Stewart focuses on how reimbursement policy, plan design, and PBM behavior
            translate into commercial outcomes. The work centers on Medicare Part D, drug pricing,
            market access, and the commercialization implications of policy change.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/insights"
              className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-ink hover:border-[var(--color-accent)]"
            >
              View Insights
            </Link>
            <Link
              href="/consulting"
              className="border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#24384d]"
            >
              Consulting
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <p className="kicker">What This Work Focuses On</p>
          <h2 className="section-title">Primary Areas of Analysis</h2>
          <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {focusAreas.map((item) => (
              <li key={item} className="border-b border-[var(--color-border)] pb-3">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <p className="kicker">Strategic Questions Addressed</p>
          <h2 className="section-title">Questions Driving Reimbursement and Access Decisions</h2>
          <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {strategicQuestions.map((question) => (
              <li key={question} className="border-b border-[var(--color-border)] pb-3">
                {question}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="kicker">Featured Insights</p>
              <h2 className="section-title">Short-Form Interpretation</h2>
            </div>
            <Link href="/insights" className="editorial-link">
              All insights
            </Link>
          </div>
          <div className="line-list mt-6">
            {featuredInsights.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="kicker">Featured Research</p>
              <h2 className="section-title">Data-Backed Analysis</h2>
            </div>
            <Link href="/research" className="editorial-link">
              All research
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredResearch.map((article) => (
              <ResearchCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <p className="kicker">About</p>
          <h2 className="section-title">Experience Across Manufacturer, Trade, Policy, and Consulting Contexts</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            The perspective combines reimbursement and health policy work across Otsuka, the
            Association for Accessible Medicines, federal and state policy environments, and direct
            consulting engagements focused on access and pricing strategy.
          </p>
          <Link href="/about" className="editorial-link mt-5 inline-flex">
            Read full background
          </Link>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <p className="kicker">Contact</p>
            <h2 className="section-title">Consulting, Speaking, Writing, and Professional Inquiries</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
              For consulting inquiries, speaking requests, writing and commentary opportunities, or
              professional opportunities, reach out by email or LinkedIn.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-[var(--color-accent)]"
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-[var(--color-accent)]"
              >
                LinkedIn
              </a>
            </div>
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
