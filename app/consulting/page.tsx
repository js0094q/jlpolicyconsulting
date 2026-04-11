import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Consulting",
  description:
    "Structured advisory on reimbursement strategy, Medicare policy, payer dynamics, provider economics, and market access decisions.",
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

const consultingAreas = [
  {
    title: "Reimbursement strategy",
    summary:
      "Structure, timing, and payment mechanics that determine whether access is operationally viable.",
    forWhom: "For launch, market access, and reimbursement teams evaluating provider and payer readiness.",
    informs: "Reimbursement planning, account strategy, launch sequencing, and executive decision-making.",
  },
  {
    title: "Medicare and drug pricing policy",
    summary:
      "Policy shifts that affect Part D design, payment rules, and commercial assumptions.",
    forWhom: "For leaders tracking CMS changes, pricing pressure, and exposure to policy timing.",
    informs: "Policy response, scenario planning, and cross-functional communication.",
  },
  {
    title: "Market access and payer dynamics",
    summary:
      "How plan design, formulary movement, and utilization management alter access in practice.",
    forWhom: "For payer-facing strategy, government affairs, and commercialization teams.",
    informs: "Access strategy, evidence framing, and launch risk assessment.",
  },
  {
    title: "Biosimilars and commercialization economics",
    summary:
      "Pricing, channel, and adoption dynamics that shape competitive uptake and positioning.",
    forWhom: "For teams working through competitive response and market structure change.",
    informs: "Pricing, channel strategy, and lifecycle planning.",
  },
] as const;

const valuePoints = [
  {
    title: "Translate policy into implications",
    body: "The analysis shows how reimbursement and policy changes affect launch assumptions, account economics, and access timing.",
  },
  {
    title: "Clarify risk and opportunity",
    body: "Analysis surfaces where coverage friction, payer behavior, or payment mechanics change the commercial path.",
  },
  {
    title: "Support execution",
    body: "Deliverables are written for working sessions, leadership review, and the teams that need to act on the issue.",
  },
] as const;

const deliverables = [
  "Strategic analysis",
  "Policy interpretation",
  "Issue briefs",
  "Quantitative analysis",
  "Decision support tools",
  "Executive briefings",
] as const;

const credibilityPoints = [
  "Domain depth across reimbursement, policy, and access.",
  "Analytical work tied to observable plan and provider behavior.",
  "Cross-functional relevance for commercial, policy, and market access teams.",
  "Output designed to be concise, auditable, and decision-ready.",
] as const;

function ServiceCard({
  title,
  summary,
  forWhom,
  informs,
}: {
  title: string;
  summary: string;
  forWhom: string;
  informs: string;
}) {
  return (
    <article className="surface-card p-6 sm:p-7">
      <h3 className="text-[1.35rem] leading-tight text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{summary}</p>
      <div className="mt-5 space-y-4 border-t border-[var(--color-border)] pt-4">
        <p className="text-sm leading-7 text-[var(--color-muted)]">
          <span className="font-semibold text-ink">Who it is for:</span> {forWhom}
        </p>
        <p className="text-sm leading-7 text-[var(--color-muted)]">
          <span className="font-semibold text-ink">What it informs:</span> {informs}
        </p>
      </div>
    </article>
  );
}

export default function ConsultingPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="kicker">Consulting</p>
              <h1 className="page-title max-w-[13ch]">
                Strategic advisory on reimbursement, market access, and policy decisions.
              </h1>
              <p className="page-lede">
                JL Policy Consulting is strongest when the question is not generic strategy, but
                how policy structure, payer mechanics, and provider economics change what is
                commercially possible.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                  Contact Us
                </Link>
                <Link href="/insights" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                  Read Insights
                </Link>
              </div>
            </div>

            <div className="paper-panel p-5 sm:p-6">
              <p className="kicker">Core consulting frame</p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                Advisory work combines policy interpretation, reimbursement analysis, payer and
                provider dynamics, and data-driven support for commercialization decisions.
              </p>
              <ul className="mt-5 space-y-3 border-t border-[var(--color-border)] pt-4 text-sm leading-7 text-[var(--color-muted)]">
                <li>Reimbursement strategy</li>
                <li>Medicare and drug pricing policy</li>
                <li>Market access and payer dynamics</li>
                <li>Provider economics and site-of-care behavior</li>
                <li>Biosimilars, generics, and competitive positioning</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] lg:items-start">
            <div>
              <SectionHeading id="consulting-overview">Core consulting overview</SectionHeading>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                The firm provides targeted advisory on reimbursement strategy, policy
                interpretation, market access analysis, payer and provider dynamics, and
                data-driven strategic support. The framing is practical: what changed, why it
                matters, and what decision it should inform.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">Typical outputs</p>
              <div className="mt-4 grid gap-2 text-sm leading-7 text-[var(--color-muted)] sm:grid-cols-2">
                {deliverables.map((item) => (
                  <div key={item} className="border-t border-[var(--color-border)] pt-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20" aria-label="Consulting areas">
        <Container>
          <SectionHeading id="consulting-areas">Consulting areas</SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {consultingAreas.map((area) => (
              <ServiceCard key={area.title} {...area} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="value">How We Create Value</SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {valuePoints.map((point) => (
              <article key={point.title} className="surface-card p-6 sm:p-7">
                <h3 className="text-[1.15rem] leading-tight text-ink">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{point.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="engagement">Engagement and Output Framing</SectionHeading>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.85fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-base leading-8 text-[var(--color-muted)]">
                Engagements are kept concise and practical. Support may include strategic analysis,
                policy interpretation, issue briefs, quantitative analysis, decision support tools,
                and executive briefings depending on the question at hand.
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                The emphasis is on clarity and utility rather than volume. If the question can be
                answered more directly, the advisory stays focused there.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">What we avoid</p>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                <li className="border-t border-[var(--color-border)] pt-4">Generic advisory language</li>
                <li className="border-t border-[var(--color-border)] pt-4">Capability lists without decisions</li>
                <li className="border-t border-[var(--color-border)] pt-4">Unstructured policy summaries</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14" aria-label="Credibility strip">
        <Container>
          <div className="grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 xl:grid-cols-4">
            {credibilityPoints.map((point) => (
              <article key={point} className="bg-[var(--color-surface)] px-6 py-6">
                <p className="text-sm leading-7 text-[var(--color-ink)]">{point}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="consulting-contact" align="center">
              Contact for a specific advisory question.
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              If the issue involves reimbursement, access, payer behavior, provider economics, or
              policy timing, start a conversation and the response will stay focused on the
              decision that needs support.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="button-primary inline-flex items-center rounded-md px-7 py-3">
                Contact Us
              </Link>
              <Link href="/research" className="button-secondary inline-flex items-center rounded-md px-7 py-3">
                Explore Research
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({
  id,
  children,
  align = "left",
}: {
  id: string;
  children: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={
          align === "center"
            ? "mx-auto h-px w-16 bg-[var(--color-accent)]"
            : "h-px w-16 bg-[var(--color-accent)]"
        }
      />
      <h2 id={id} className="section-title mt-6 text-balance">
        {children}
      </h2>
    </div>
  );
}
