import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Consulting",
  description:
    "Focused advisory on reimbursement policy, payer economics, drug pricing, and pharmaceutical commercialization.",
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

const reimbursementFocus = [
  "market access",
  "pricing strategy",
  "coverage dynamics",
  "commercialization planning",
] as const;

const marketAccessFocus = [
  "PBM formulary behavior",
  "plan incentives",
  "utilization management trends",
  "access friction drivers",
] as const;

const pricingFocus = [
  "federal and state policy changes",
  "Medicare Part D redesign",
  "pricing pressure dynamics",
  "gross-to-net implications",
] as const;

const biosimilarFocus = [
  "adoption barriers",
  "formulary positioning",
  "reimbursement incentives",
  "competitive dynamics",
] as const;

const analyticsFocus = [
  "tier movement patterns",
  "utilization management trends",
  "pricing-access divergence",
  "plan-level behavior",
] as const;

function FocusList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="mt-12">
      <h2 className="section-title">{title}</h2>
      <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
        {items.map((item) => (
          <li key={item} className="border-b border-[var(--color-border)] pb-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ConsultingPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="page-title">Consulting</h1>
        <p className="mt-5 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          JL Policy Consulting provides focused advisory on the intersection of reimbursement policy,
          payer economics, and pharmaceutical commercialization.
        </p>

        <FocusList title="Reimbursement Strategy" items={reimbursementFocus} />
        <FocusList title="Market Access and Payer Dynamics" items={marketAccessFocus} />
        <FocusList title="Drug Pricing and Policy" items={pricingFocus} />
        <FocusList title="Biosimilars and Generics Strategy" items={biosimilarFocus} />

        <section className="mt-12">
          <h2 className="section-title">Healthcare Policy Analytics</h2>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
            Data-driven analysis using CMS Part D SPUF and related datasets to identify:
          </p>
          <ul className="mt-7 space-y-3 text-base leading-8 text-[var(--color-muted)]">
            {analyticsFocus.map((item) => (
              <li key={item} className="border-b border-[var(--color-border)] pb-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          Recent commentary and data-backed analysis are published in the{" "}
          <Link href="/insights" className="editorial-link">
            Insights
          </Link>{" "}
          and{" "}
          <Link href="/research" className="editorial-link">
            Research
          </Link>{" "}
          sections.
        </p>
      </Container>
    </section>
  );
}
