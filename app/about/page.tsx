import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Joseph Stewart brings reimbursement, policy, and market access experience to analytical work on Medicare, pricing, payer behavior, and commercialization.",
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
  {
    role: "Managing Director, JL Policy Consulting, LLC",
    note: "Current advisory work focused on reimbursement, policy, and market access questions.",
  },
  {
    role: "Associate Director, Reimbursement & Health Policy, Otsuka America Pharmaceutical",
    note: "Experience inside manufacturer reimbursement and policy strategy work.",
  },
  {
    role: "Director, Biosimilars Policy, Association for Accessible Medicines",
    note: "Perspective on competition, pricing, and policy change in complex product categories.",
  },
  {
    role: "Legislative Associate, Health and Medicine Counsel of Washington",
    note: "Early policy experience grounded in legislative and stakeholder process work.",
  },
] as const;

const expertiseThemes = [
  {
    title: "Medicare reimbursement and policy",
    body: "How CMS payment structure, coding timing, and rule changes alter access assumptions and launch planning.",
  },
  {
    title: "Drug pricing and gross-to-net",
    body: "How list-to-net pressure, rebate design, and pricing mechanics affect strategic and commercial decisions.",
  },
  {
    title: "PBM and formulary dynamics",
    body: "How benefit design, utilization management, and channel behavior create access friction in practice.",
  },
  {
    title: "Biosimilars and generics",
    body: "How competition, reimbursement, and policy shape adoption, positioning, and market structure.",
  },
  {
    title: "Healthcare data analysis",
    body: "How CMS and plan-level data can be used to test policy assumptions against observable behavior.",
  },
] as const;

const approachPoints = [
  {
    title: "Start with the decision",
    body: "The analysis begins with the business or policy question that needs support, not with a generic research frame.",
  },
  {
    title: "Read policy through behavior",
    body: "The work looks for how rules, incentives, and channel mechanics actually show up in payer and provider behavior.",
  },
  {
    title: "Keep the output practical",
    body: "Findings are shaped into concise, usable output for strategy discussions, executive review, or working sessions.",
  },
] as const;

const proofSignals = [
  {
    value: "Policy + data",
    label: "Analysis grounded in both structural policy reading and observable market behavior",
  },
  {
    value: "Cross-functional background",
    label: "Perspective shaped by work across manufacturer, association, and public policy settings",
  },
  {
    value: "Commercial relevance",
    label: "Focus on decisions that affect launch, access, and in-market strategy",
  },
  {
    value: "Decision-ready output",
    label: "Concise work designed for strategy discussions and executive review",
  },
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
      <h2 id={id} className="section-title mt-6 text-balance">
        {children}
      </h2>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="kicker">About</p>
              <h1 className="page-title max-w-[13ch]">
                Analytical perspective built from reimbursement, policy, and market access analysis.
              </h1>
              <p className="page-lede">
                JL Policy Consulting is led by Joseph Stewart and focused on the intersection of
                Medicare policy, reimbursement mechanics, payer behavior, and commercialization
                strategy. The point is not personal branding. The point is useful analysis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                  View Consulting
                </Link>
                <Link href="/contact" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="paper-panel p-5 sm:p-6">
              <p className="kicker">Professional perspective</p>
              <div className="mt-4 space-y-4">
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  The firm’s perspective comes from work inside manufacturer reimbursement and
                  policy strategy, biosimilars policy, and public policy analysis.
                </p>
                <div className="border-t border-[var(--color-border)] pt-4 text-sm leading-7 text-[var(--color-muted)]">
                  It is designed to be commercially relevant, structurally careful, and grounded in
                  how policy actually affects payer and provider decisions.
                </div>
                <div className="border-t border-[var(--color-border)] pt-4 text-sm leading-7 text-[var(--color-muted)]">
                  The result is analysis that reads cleanly for strategists, policy teams, and
                  executives who need the implication, not just the interpretation.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] lg:items-start">
            <div>
              <SectionHeading id="positioning">Professional positioning</SectionHeading>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                The firm focuses on health policy, reimbursement, market access, drug pricing,
                payer/provider dynamics, and healthcare data analysis. Those domains are treated as
                connected systems, not as separate topics.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                That lens matters because the policy question often becomes a commercial question
                once payment, access, and channel behavior are taken seriously.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">Perspective markers</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                <li>Reimbursement mechanics</li>
                <li>Access and coverage behavior</li>
                <li>Provider economics</li>
                <li>Pricing and policy timing</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="experience">Experience and perspective</SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {background.map((item) => (
              <article key={item.role} className="surface-card p-6 sm:p-7">
                <h3 className="text-[1.15rem] leading-tight text-ink">{item.role}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)] lg:items-start">
            <div>
              <SectionHeading id="approach">How We Approach What We Do</SectionHeading>
              <div className="mt-10 grid gap-6">
                {approachPoints.map((point) => (
                  <article key={point.title} className="surface-card p-6 sm:p-7">
                    <h3 className="text-[1.15rem] leading-tight text-ink">{point.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{point.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">How it stays useful</p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                The aim is to connect policy structure to operational behavior and then reduce the
                result into a form that supports a decision.
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                That keeps it grounded, specific, and easier to use inside commercial or
                policy workflows.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="expertise">Selected expertise themes</SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {expertiseThemes.map((theme) => (
              <article key={theme.title} className="surface-card p-6 sm:p-7">
                <h3 className="text-[1.2rem] leading-tight text-ink">{theme.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{theme.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14" aria-label="Credibility strip">
        <Container>
          <div className="grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 xl:grid-cols-4">
            {proofSignals.map((signal) => (
              <article key={signal.label} className="bg-[var(--color-surface)] px-6 py-6">
                <p className="font-serif text-[2rem] leading-none text-[var(--color-accent)]">{signal.value}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]">{signal.label}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="about-cta" align="center">
              Move from context to the analysis itself.
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              If the perspective is relevant, the next step is usually Consulting. If you want to
              discuss a specific question first, use the contact page.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-7 py-3">
                View Consulting
              </Link>
              <Link href="/contact" className="button-secondary inline-flex items-center rounded-md px-7 py-3">
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
