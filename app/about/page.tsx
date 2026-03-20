import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "JL Policy Consulting provides policy, reimbursement, and market access analysis by integrating CMS, payer, claims, pricing, and commercial data for strategic decision support.",
  path: "/about",
});

const dataInputs = [
  "CMS datasets, including SPUF, PUF, and related public files",
  "Payer and formulary data",
  "Utilization and claims data",
  "Pricing and gross-to-net (GTN) analytics",
  "Channel and distribution data",
  "Policy and legislative tracking",
  "Client-specific commercial inputs",
] as const;

const capabilities = [
  {
    title: "Reimbursement Strategy",
    description:
      "Translate coverage and payment shifts into practical actions that protect access and support revenue planning.",
  },
  {
    title: "Market Access Analytics",
    description:
      "Integrate plan, formulary, and utilization signals to surface where access risk is building and why.",
  },
  {
    title: "Policy Impact Assessment",
    description:
      "Connect federal and state policy changes to payer incentives and product-level commercial consequences.",
  },
  {
    title: "Pricing and GTN Interpretation",
    description:
      "Separate list-price movement from net realization and patient cost exposure to improve pricing decisions.",
  },
  {
    title: "Formulary and PBM Strategy",
    description:
      "Interpret formulary positioning and utilization controls as economic signals for contracting and pull-through strategy.",
  },
  {
    title: "Launch and Lifecycle Support",
    description:
      "Support launch, loss-of-exclusivity, and in-line optimization decisions with policy-aware market access analysis.",
  },
] as const;

const differentiationLenses = [
  {
    title: "Unit price vs patient cost divergence",
    description:
      "The firm separates price movement, benefit design, and cost-sharing effects to avoid false affordability conclusions.",
  },
  {
    title: "Formulary behavior as economic signal",
    description:
      "Formulary and utilization-management patterns are treated as forward indicators of payer strategy and expected behavior shifts.",
  },
  {
    title: "Policy to incentive to behavior chain",
    description:
      "Analysis traces each policy change through stakeholder incentives and implementation decisions to identify strategic response options.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f3f8fe_100%)] py-16 sm:py-20">
        <Container>
          <p className="kicker">About</p>
          <h1 className="page-title max-w-5xl">
            Policy, Reimbursement, and Market Access Analytics for Strategic Decision Support
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            JL Policy Consulting supports manufacturers, payers, and healthcare stakeholders
            navigating U.S. drug pricing and reimbursement complexity.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            The firm combines policy analysis, payer behavior interpretation, and multi-source
            analytics to clarify what is changing, why it is changing, and where strategic action
            should follow.
          </p>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <h2 className="section-title">About the Firm</h2>
          <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            JL Policy Consulting is a policy and market access advisory firm focused on the U.S.
            drug pricing and reimbursement environment. Our work sits at the intersection of policy
            design, payer behavior, and commercialization strategy.
          </p>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            The firm supports decision-makers who need structured interpretation of market signals,
            not just descriptive reporting, especially when access, pricing, and formulary dynamics
            are moving at different speeds.
          </p>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <h2 className="section-title">Data and Analytical Approach</h2>
          <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            Our work integrates multiple datasets to isolate signal from noise and distinguish
            durable trends from short-term variance.
          </p>
          <ul className="mt-7 list-disc space-y-2 pl-5 text-base leading-8 text-[var(--color-muted)] marker:text-[var(--color-accent-soft)]">
            {dataInputs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-7 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            This analysis is built for longitudinal tracking, cross-dataset validation, and
            strategic interpretation, connecting observed behavior to payer incentives and
            real-world market decisions.
          </p>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <h2 className="section-title">What We Do</h2>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            The firm applies policy and market analytics to defined strategic decisions across the
            product lifecycle.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {capabilities.map((item) => (
              <article key={item.title} className="surface-card p-6 sm:p-7">
                <h3 className="text-2xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <h2 className="section-title">How We Think</h2>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            JL Policy Consulting separates price, access, and design effects, identifies
            payer-driven behavior shifts, and translates data into strategic options with clear
            implementation implications.
          </p>
          <div className="line-list mt-8">
            {differentiationLenses.map((item) => (
              <article key={item.title} className="line-item">
                <h3 className="text-2xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-14 sm:py-16">
        <Container>
          <h2 className="section-title">Leadership</h2>
          <article className="surface-card mt-6 max-w-4xl p-6 sm:p-7">
            <h3 className="text-2xl leading-tight text-ink">Joseph Stewart</h3>
            <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
              Joseph Stewart leads JL Policy Consulting with experience across pharmaceutical
              manufacturer reimbursement strategy, biosimilars and generics policy, and federal and
              state market access dynamics. His background includes manufacturer, trade association,
              legislative, consulting, and frontline pharmacy perspectives that inform the firm&apos;s
              decision-support work.
            </p>
            <Link href="/contact" className="editorial-link mt-5 inline-block">
              Request full professional background
            </Link>
          </article>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <p className="max-w-5xl text-2xl leading-tight text-ink sm:text-3xl">
            JL Policy Consulting helps stakeholders understand not only what is happening in pricing
            and access, but why it is happening and how to act.
          </p>
        </Container>
      </section>
    </>
  );
}
