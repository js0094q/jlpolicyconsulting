import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Consulting",
  description:
    "Consulting work focused on pharmaceutical reimbursement strategy, market access, drug pricing policy, and payer dynamics.",
  path: "/consulting",
});

const coreAreas = [
  "Reimbursement Strategy",
  "Market Access and Payer Dynamics",
  "Drug Pricing and Policy",
  "Biosimilars and Generics Strategy",
  "Policy Analytics",
];

const supportedQuestions = [
  "How should commercial teams interpret a reimbursement policy shift in terms of launch, access, and pricing?",
  "What does observed formulary behavior imply about PBM incentives in a given therapeutic class?",
  "Which Medicare Part D design changes are most likely to affect patient cost exposure for a product portfolio?",
  "Where are biosimilar and generic adoption barriers driven by reimbursement structure versus channel behavior?",
  "How should gross-to-net assumptions be adjusted when payer control mechanisms change?",
  "What plan-level data signals indicate emerging access friction before it appears in aggregate results?",
  "How should manufacturers plan for pricing and access before and after loss of exclusivity?",
];

export default function ConsultingPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="kicker">Consulting</p>
        <h1 className="page-title">Pharmaceutical Reimbursement and Market Access Consulting Work</h1>

        <section className="mt-12">
          <h2 className="section-title">1. What This Work Involves</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            The work focuses on reimbursement, pricing, and access decisions that depend on policy
            interpretation and payer behavior analysis. Engagements are designed for teams that need
            concrete implications for commercialization strategy, not generic policy summaries.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">2. Core Advisory Areas</h2>
          <ul className="mt-6 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {coreAreas.map((area) => (
              <li key={area} className="border-b border-[var(--color-border)] pb-3">
                {area}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="section-title">3. Types of Questions Supported</h2>
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
