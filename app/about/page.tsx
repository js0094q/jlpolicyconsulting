import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About JL Policy Consulting | Policy and Reimbursement Analysis",
  description:
    "JL Policy Consulting provides Medicare, reimbursement, market access, and policy analysis grounded in payer behavior, provider economics, and commercial decision-making.",
  path: "/about",
  kicker: "About",
  keywords: [
    "Joseph Stewart",
    "health policy consulting",
    "Medicare reimbursement",
    "reimbursement strategy",
    "market access consulting",
    "provider economics",
    "drug pricing",
    "PBM formulary behavior",
  ],
});

const experienceItems = [
  {
    title: "Manufacturer, policy, and trade association experience",
    body: "Experience across settings where reimbursement, access, and policy questions have to be interpreted for real commercial decisions.",
  },
  {
    title: "Policy read through market behavior",
    body: "Work informed by both statutory and regulatory interpretation and the operational realities that shape payer, provider, and channel behavior.",
  },
  {
    title: "Decision-ready output",
    body: "Analysis designed to be concise, scoped, and commercially usable rather than academic, theoretical, or unnecessarily complex.",
  },
] as const;

const approachSteps = [
  {
    title: "Read the rule",
    body: "Identify the reimbursement, coverage, coding, pricing, or access mechanism at issue.",
  },
  {
    title: "Test the incentives",
    body: "Evaluate how payers, providers, manufacturers, or channel actors are likely to respond.",
  },
  {
    title: "Translate the implication",
    body: "Turn the policy issue into a practical decision framework for launch, access, reimbursement, or commercialization.",
  },
] as const;

const expertiseThemes = [
  "Medicare reimbursement and coverage policy",
  "Drug pricing, gross-to-net dynamics, and access pressure",
  "PBM behavior, formulary strategy, and utilization management",
  "Provider economics and buy-and-bill reimbursement dynamics",
  "Biosimilars, generics, and commercialization strategy",
  "Market access and reimbursement-focused policy analysis",
] as const;

const proofPoints = [
  "Experience across policy and commercial contexts",
  "Focus on Medicare, reimbursement, access, pricing, and provider economics",
  "Outputs designed for working teams and executive decision-making",
  "Analysis grounded in practical market behavior, not abstract commentary",
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

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-5xl">
            <p className="kicker">About</p>
            <h1 className="hero-title page-title max-w-[24ch]">
              Policy and reimbursement analysis grounded in how coverage, pricing, and access
              decisions work in practice.
            </h1>
            <p className="page-lede max-w-3xl">
              JL Policy Consulting is led by Joseph Stewart. The firm translates Medicare,
              reimbursement, and market access complexity into analysis that is commercially
              relevant, operationally grounded, and usable by working teams making strategic
              decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/consulting"
                className="button-primary inline-flex items-center rounded-md px-6 py-3"
              >
                View Consulting
              </Link>
              <Link
                href="/contact"
                className="button-secondary inline-flex items-center rounded-md px-6 py-3"
              >
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 border-t border-[var(--color-border)] pt-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14">
            <SectionHeading id="professional-positioning">
              Professional positioning
            </SectionHeading>
            <div className="max-w-3xl space-y-4 text-base leading-8 text-[var(--color-muted)]">
              <p>
                The work sits at the intersection of Medicare policy, reimbursement mechanics, payer
                behavior, provider economics, and commercialization strategy.
              </p>
              <p>
                The focus is not policy commentary for its own sake. It is translating regulatory
                change, coding dynamics, pricing pressure, and access constraints into practical
                implications for launch planning, reimbursement strategy, and market access
                execution.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <SectionHeading id="experience-and-perspective" align="center">
              Experience and perspective
            </SectionHeading>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {experienceItems.map((item) => (
                <article key={item.title} className="surface-card p-6 sm:p-7">
                  <h3 className="text-[1.05rem] leading-tight text-ink">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="paper-panel p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14">
              <SectionHeading id="how-the-work-is-approached">
                How the work is approached
              </SectionHeading>
              <div className="max-w-3xl space-y-4 text-base leading-8 text-[var(--color-muted)]">
                <p>
                  The process is straightforward: understand the policy, evaluate the incentives it
                  creates, and translate the downstream implications into actionable commercial and
                  access considerations.
                </p>
                <p>
                  That often means connecting reimbursement policy and coverage mechanics to provider
                  adoption, payer management behavior, channel dynamics, pricing pressure, or
                  operational risk, then narrowing the issue to the specific decisions a team needs
                  to make.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
              {approachSteps.map((step) => (
                <article key={step.title} className="bg-[var(--color-page)] px-6 py-6">
                  <h3 className="text-[1rem] leading-tight text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <SectionHeading id="selected-expertise-themes" align="center">
              Selected expertise themes
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-[var(--color-muted)]">
              The firm&apos;s work focuses on the policy and reimbursement questions most likely to
              affect access strategy, provider economics, and commercial execution.
            </p>
            <div className="mt-10 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 lg:grid-cols-3">
              {expertiseThemes.map((theme) => (
                <div key={theme} className="bg-[var(--color-surface)] px-6 py-5">
                  <p className="text-sm leading-7 text-[var(--color-ink)]">{theme}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="paper-panel mx-auto max-w-5xl p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:gap-12">
              <div>
                <SectionHeading id="why-this-perspective-matters">
                  Why this perspective matters
                </SectionHeading>
              </div>
              <div className="space-y-4 text-base leading-8 text-[var(--color-muted)]">
                <p>
                  Many reimbursement and policy questions are not purely legal, clinical, or
                  commercial. They sit between those domains. The practical question is often not
                  only what the rule says, but how it changes incentives, operating behavior, and
                  financial exposure.
                </p>
                <p>
                  JL Policy Consulting is built around that translation layer: converting policy and
                  reimbursement complexity into analysis that helps teams understand what is likely
                  to matter, where friction may emerge, and which decisions require attention.
                </p>
              </div>
            </div>
            <div className="mt-10 grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="bg-[var(--color-page)] px-6 py-5">
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
            <SectionHeading id="about-cta" align="center">
              Move from background to the work itself
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              The Consulting section shows how this perspective is applied to reimbursement, policy,
              market access, and commercialization strategy questions.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/consulting"
                className="button-primary inline-flex items-center rounded-md px-7 py-3"
              >
                View Consulting
              </Link>
              <Link
                href="/contact"
                className="button-secondary inline-flex items-center rounded-md px-7 py-3"
              >
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
