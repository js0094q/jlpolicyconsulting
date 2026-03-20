import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Joseph Stewart is a reimbursement and health policy strategist focused on Medicare Part D, formulary behavior, pricing policy, and reimbursement analytics.",
  path: "/about",
  kicker: "About",
  keywords: [
    "Joseph Stewart",
    "pharmaceutical reimbursement",
    "Medicare Part D",
    "PBM formulary behavior",
    "drug pricing",
    "market access analytics",
  ],
});

const background = [
  "Managing Director, JL Policy Consulting, LLC",
  "Associate Director, Reimbursement & Health Policy, Otsuka America Pharmaceutical",
  "Director, Biosimilars Policy, Association for Accessible Medicines",
  "Legislative Associate, Health and Medicine Counsel of Washington",
] as const;

const expertise = [
  "Medicare Part D benefit design and policy implementation",
  "PBM and formulary dynamics",
  "Biosimilars and generics market behavior",
  "Drug pricing and gross-to-net dynamics",
  "Reimbursement strategy and payer access",
  "Healthcare data analysis using CMS SPUF and plan-level data",
] as const;

const cmsObservables = [
  "formulary tier placement",
  "utilization management",
  "cost sharing",
  "pharmacy network design",
  "pricing trends",
] as const;

const policyLens = [
  "policy design",
  "plan incentives",
  "operational behavior",
  "access outcomes",
] as const;

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="page-title">About</h1>
        <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          Joseph Stewart is a reimbursement and health policy strategist focused on the commercial
          consequences of pharmaceutical policy design.
        </p>
        <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          His work spans pharmaceutical manufacturers, trade associations, consulting engagements,
          and policy advocacy, with a focus on Medicare Part D, payer behavior, formulary strategy,
          biosimilars, and reimbursement analytics.
        </p>

        <section className="mt-12">
          <h2 className="section-title">Professional Background</h2>
          <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {background.map((item) => (
              <li key={item} className="border-b border-[var(--color-border)] pb-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Policy and Market Expertise</h2>
          <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {expertise.map((item) => (
              <li key={item} className="border-b border-[var(--color-border)] pb-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Approach to Reimbursement Analysis</h2>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            The firm&apos;s approach is grounded in linking policy structure to observable market
            behavior.
          </p>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            CMS Part D data enables direct evaluation of:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {cmsObservables.map((item) => (
              <li key={item} className="border-b border-[var(--color-border)] pb-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            This allows policy interpretation to move beyond narrative into measurable signals.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Policy and Data Lens</h2>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            Reimbursement analysis is most useful when it connects:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {policyLens.map((item) => (
              <li key={item} className="border-b border-[var(--color-border)] pb-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            The focus is not only on what policy intends, but how it is implemented in practice.
          </p>
        </section>
      </Container>
    </section>
  );
}
