import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Consulting",
  description:
    "Strategic advisory on reimbursement, Medicare policy, payer dynamics, provider economics, and market access decisions.",
  path: "/consulting",
  kicker: "Consulting",
  keywords: [
    "reimbursement strategy",
    "Medicare and drug pricing policy",
    "market access and payer dynamics",
    "provider economics",
    "healthcare policy analytics",
  ],
});

const consultingAreas = [
  {
    title: "Reimbursement Strategy",
    issue: "Clarifies payment structure, coding, timing, and site-of-care economics.",
    forWho: "Launch, market access, pricing, and reimbursement teams.",
    decisions: "Reimbursement planning, account strategy, and adoption risk.",
  },
  {
    title: "Medicare and Drug Pricing Policy",
    issue: "Interprets federal policy changes that affect benefit design, payment mechanics, and gross-to-net pressure.",
    forWho: "Policy, government affairs, pricing, and cross-functional strategy teams.",
    decisions: "Scenario planning, policy response, and exposure assessment.",
  },
  {
    title: "Market Access and Payer Dynamics",
    issue: "Analyzes formulary design, utilization management, channel restrictions, and payer behavior.",
    forWho: "Market access, payer strategy, and commercialization teams.",
    decisions: "Access strategy, evidence framing, and launch risk.",
  },
  {
    title: "Biosimilars and Commercialization Strategy",
    issue: "Assesses competitive access, channel design, pricing pressure, and adoption barriers for lower-cost alternatives.",
    forWho: "Teams working on biosimilars, generics, and access-sensitive launches.",
    decisions: "Positioning, channel strategy, and in-market execution.",
  },
  {
    title: "Data-Driven Policy and Access Analysis",
    issue: "Brings structured evidence to policy, reimbursement, and access questions that need more than narrative interpretation.",
    forWho: "Leadership teams evaluating policy exposure, market behavior, or opportunity size.",
    decisions: "Issue prioritization, executive framing, and cross-functional alignment.",
  },
] as const;

const valuePoints = [
  "Connects policy mechanics to real commercial decisions.",
  "Surfaces access risk before it becomes launch friction.",
  "Turns reimbursement complexity into concise, usable output.",
] as const;

const engagementOutputs = [
  "Strategic analysis and issue briefs",
  "Policy interpretation and scenario framing",
  "Quantitative review and market access assessment",
  "Executive briefing materials and decision support tools",
] as const;

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
      <h2
        id={id}
        className={`section-title mt-6 text-balance ${align === "center" ? "text-center" : ""}`}
      >
        {children}
      </h2>
    </div>
  );
}

function ConsultingAreaCard({
  title,
  issue,
  forWho,
  decisions,
}: {
  title: string;
  issue: string;
  forWho: string;
  decisions: string;
}) {
  return (
    <article className="surface-card flex h-full flex-col p-6 sm:p-7">
      <h3 className="text-[1.35rem] leading-tight text-ink">{title}</h3>
      <dl className="mt-5 grid gap-4 border-t border-[var(--color-border)] pt-4">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-soft)]">
            What it addresses
          </dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{issue}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-soft)]">
            Who it is for
          </dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{forWho}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-soft)]">
            What it informs
          </dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{decisions}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function ConsultingPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-5xl text-center lg:max-w-6xl">
            <p className="kicker">Consulting</p>
            <h1 className="hero-title page-title mx-auto max-w-[21ch]">
              Reimbursement and access advisory for policy-sensitive decisions.
            </h1>
            <p className="page-lede mx-auto max-w-4xl">
              Advisory for teams that need a specific read on reimbursement, payer behavior,
              provider economics, coding, and launch risk before a policy issue becomes an
              operating problem.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="button-primary inline-flex items-center rounded-md px-6 py-3"
              >
                Contact
              </Link>
              <Link
                href="/insights"
                className="button-secondary inline-flex items-center rounded-md px-6 py-3"
              >
                Read Insights
              </Link>
              <Link
                href="/research"
                className="button-secondary inline-flex items-center rounded-md px-6 py-3"
              >
                Explore Research
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="core-overview">Core consulting overview</SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="surface-card p-7 sm:p-8">
              <p className="text-base leading-8 text-[var(--color-muted)]">
                The core role is to turn reimbursement and access complexity into decisions teams can
                use. That can mean explaining why a policy change matters, testing how payer behavior
                may shift, or identifying where provider economics will complicate adoption.
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                The work is designed for stakeholders who need a sharper view of what actually
                affects access, pricing, and execution, not a generic policy summary.
              </p>
            </article>

            <article className="surface-card p-7 sm:p-8">
              <h3 className="text-[1.1rem] leading-tight text-ink">How the work is framed</h3>
              <ul className="mt-5 grid gap-4">
                {valuePoints.map((point) => (
                  <li
                    key={point}
                    className="border-t border-[var(--color-border)] pt-4 text-sm leading-7 text-[var(--color-muted)]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20" aria-label="Consulting areas">
        <Container>
          <SectionHeading id="consulting-areas">Consulting areas</SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {consultingAreas.map((area) => (
              <ConsultingAreaCard key={area.title} {...area} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="value" align="center">
            How the work creates value
          </SectionHeading>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-8 text-[var(--color-muted)]">
            The work makes the policy and reimbursement variables explicit before they become
            operating problems, then narrows the issue to the decision a team needs to make.
          </p>
          <div className="mx-auto mt-6 max-w-4xl border-y border-[var(--color-border)] py-4 text-center">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              It is useful when a team needs to decide whether a change is manageable, where friction
              is likely to show up, and what the commercial implications are if access does not work
              the way a model assumes.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="outputs" align="center">
            Engagement and work product framing
          </SectionHeading>
          <div className="mx-auto mt-8 max-w-4xl border-t border-[var(--color-border)] md:grid md:grid-cols-2 md:gap-x-12">
            {engagementOutputs.map((output) => (
              <div key={output} className="border-b border-[var(--color-border)] py-5 last:border-b-0 md:py-0">
                <p className="text-sm leading-7 text-[var(--color-ink)]">{output}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-[var(--color-muted)]">
            Engagements are scoped around the question at hand. The emphasis is on the decision,
            the evidence behind it, and the output needed to move forward.
          </p>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading id="proof-and-credibility" align="center">
              Proof and credibility
            </SectionHeading>
            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--color-border)]">
              {[
                "Policy and reimbursement work that requires the same issue to be read from several stakeholder angles.",
                "Analytical rigor applied to commercial questions, so the output is decision-ready rather than descriptive.",
                "Cross-functional relevance for policy, access, pricing, and commercialization teams.",
              ].map((point) => (
                <div key={point} className="md:px-6">
                  <p className="text-sm leading-7 text-[var(--color-ink)]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading id="consulting-contact" align="center">
              Contact for a specific advisory question
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              For reimbursement, access, payer behavior, provider economics, pricing, or policy
              timing questions, start with the issue that needs a decision.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="button-primary inline-flex items-center rounded-md px-7 py-3"
              >
                Contact
              </Link>
              <Link
                href="/insights"
                className="button-secondary inline-flex items-center rounded-md px-7 py-3"
              >
                Read Insights
              </Link>
              <Link
                href="/research"
                className="button-secondary inline-flex items-center rounded-md px-7 py-3"
              >
                Explore Research
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
