import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Consulting",
  description:
    "Problem-led advisory on reimbursement strategy, provider economics, Medicare payment, payer controls, and launch-access decisions.",
  path: "/consulting",
  kicker: "Consulting",
  keywords: [
    "reimbursement strategy",
    "market access and payer dynamics",
    "drug pricing policy analysis",
    "biosimilars strategy",
    "Medicare Part D impact analysis",
    "healthcare policy analytics",
  ],
});

const problemAreas = [
  {
    title: "Reimbursement and market access strategy",
    clientDecision:
      "Whether the access pathway, reimbursement timing, and payer design support a credible launch strategy.",
    jlPolicyAnalyzes:
      "Coverage structure, coding pathway, access restrictions, channel implications, formulary pressure, and the operational mechanics that can delay or distort uptake.",
    deliverable:
      "Decision memos, reimbursement readiness assessments, launch access framing, and executive briefings built for commercial and market access teams.",
  },
  {
    title: "Provider economics and site-of-care analysis",
    clientDecision:
      "Whether provider adoption works economically across buy-and-bill, hospital outpatient, inpatient, specialty pharmacy, or alternate site-of-care settings.",
    jlPolicyAnalyzes:
      "Margin pressure, acquisition cost exposure, 340B dynamics, white-bagging risk, pass-through timing, DRG or OPPS fit, and claim-level friction that changes provider behavior.",
    deliverable:
      "Provider net cost models, site-of-care economics analyses, reimbursement execution frameworks, and materials that clarify where margin breaks.",
  },
  {
    title: "Medicare payment and policy analysis",
    clientDecision:
      "How CMS payment rules, coding timing, and public policy shifts change launch timing, access assumptions, or stakeholder exposure.",
    jlPolicyAnalyzes:
      "Part D redesign, NTAP eligibility and timing, DRG structure, pass-through status, HCPCS timing, and rule changes that alter reimbursement or utilization incentives.",
    deliverable:
      "Policy impact assessments, reimbursement scenario analyses, CMS-focused briefing materials, and implications memos for cross-functional planning.",
  },
  {
    title: "PBM, formulary, and utilization-management dynamics",
    clientDecision:
      "How payer behavior is likely to change when cost pressure moves through tiering, restrictions, specialty pathways, and benefit design.",
    jlPolicyAnalyzes:
      "Formulary placement, prior authorization, step therapy, coverage criteria, PBM incentives, plan design changes, and the observable access friction these mechanisms create.",
    deliverable:
      "Payer dynamic assessments, formulary risk analyses, utilization-management reviews, and strategy briefs tied to likely commercial consequences.",
  },
  {
    title: "Biosimilars, generics, and pricing strategy",
    clientDecision:
      "How pricing, reimbursement design, and policy change will affect competitive behavior, tier movement, and market positioning.",
    jlPolicyAnalyzes:
      "List-to-net tension, reimbursement incentives, unit-cost pressure, formulary movement, competitor response, and the policy structure behind adoption barriers.",
    deliverable:
      "Pricing and reimbursement briefs, market structure analyses, Part D and formulary interpretation, and data-backed decision support for competitive planning.",
  },
] as const;

function ProblemBlock({
  title,
  clientDecision,
  jlPolicyAnalyzes,
  deliverable,
}: {
  title: string;
  clientDecision: string;
  jlPolicyAnalyzes: string;
  deliverable: string;
}) {
  return (
    <article className="surface-card border-t-2 border-t-[var(--color-accent)] p-7 sm:p-8">
      <h2 className="text-[clamp(1.55rem,2.5vw,2rem)] leading-tight text-ink">{title}</h2>
      <div className="mt-6 space-y-5">
        <div className="border-t border-[var(--color-border)] pt-4">
          <p className="kicker">Client decision</p>
          <p className="mt-2 text-base leading-8 text-[var(--color-muted)]">{clientDecision}</p>
        </div>
        <div className="border-t border-[var(--color-border)] pt-4">
          <p className="kicker">JL Policy analyzes</p>
          <p className="mt-2 text-base leading-8 text-[var(--color-muted)]">{jlPolicyAnalyzes}</p>
        </div>
        <div className="border-t border-[var(--color-border)] pt-4">
          <p className="kicker">Deliverable</p>
          <p className="mt-2 text-base leading-8 text-[var(--color-muted)]">{deliverable}</p>
        </div>
      </div>
    </article>
  );
}

export default function ConsultingPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-4xl">
          <p className="kicker">Consulting</p>
          <h1 className="page-title">Advisory framed around the reimbursement problems that determine commercial outcomes.</h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            JL Policy Consulting is strongest when the question is not generic strategy, but how policy structure, payer mechanics, and provider economics change what is commercially possible.
          </p>
        </div>

        <div className="mt-12 grid gap-6">
          {problemAreas.map((area) => (
            <ProblemBlock key={area.title} {...area} />
          ))}
        </div>

        <p className="mt-12 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          Recent commentary and structured analysis appear in{" "}
          <Link href="/insights" className="editorial-link">
            Insights
          </Link>{" "}
          and{" "}
          <Link href="/research" className="editorial-link">
            Research
          </Link>
          , where current work focuses on reimbursement modeling, provider economics, payer mechanics, and launch-access strategy.
        </p>
      </Container>
    </section>
  );
}
