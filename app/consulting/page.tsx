import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Consulting",
  description:
    "Firm-led consulting on pharmaceutical reimbursement strategy, market access, drug pricing policy, and payer dynamics informed by multi-source analysis.",
  path: "/consulting",
});

const coreAreas = [
  "Reimbursement Strategy",
  "Market Access and Payer Dynamics",
  "Drug Pricing and GTN Interpretation",
  "Policy Impact Assessment",
  "Formulary and PBM Strategy",
  "Biosimilars and Generics Strategy",
  "Launch and Lifecycle Decision Support",
];

const supportedQuestions = [
  "How should teams interpret reimbursement policy shifts in terms of launch, access, and pricing strategy?",
  "What does observed formulary behavior imply about PBM and payer incentives in a therapeutic class?",
  "Which Medicare Part D and benefit-design changes are most likely to affect product-level patient cost exposure?",
  "Where are biosimilar and generic adoption barriers driven by reimbursement structure versus channel and plan behavior?",
  "How should gross-to-net assumptions be adjusted when payer controls and utilization management intensity change?",
  "What cross-dataset signals indicate emerging access friction before it is visible in aggregate performance?",
  "How should manufacturers adapt pricing and access planning before and after loss of exclusivity?",
];

export default function ConsultingPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="kicker">Consulting</p>
        <h1 className="page-title">Pharmaceutical Reimbursement and Market Access Advisory Services</h1>

        <section className="mt-12">
          <h2 className="section-title">What This Work Involves</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            JL Policy Consulting supports reimbursement, pricing, and access decisions that depend
            on policy interpretation and payer behavior analysis. Engagements are designed for teams
            that need concrete strategic implications, not generic policy summaries.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Core Advisory Areas</h2>
          <ul className="mt-6 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {coreAreas.map((area) => (
              <li key={area} className="border-b border-[var(--color-border)] pb-3">
                {area}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Types of Questions Supported</h2>
          <ul className="mt-6 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {supportedQuestions.map((question) => (
              <li key={question} className="border-b border-[var(--color-border)] pb-3">
                {question}
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </section>
  );
}
