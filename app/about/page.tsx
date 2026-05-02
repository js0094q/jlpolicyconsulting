import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "JL Policy Consulting is led by Joseph Stewart and focused on reimbursement, policy, and market access analysis that informs commercial decisions.",
  path: "/about",
  kicker: "About",
  keywords: [
    "Joseph Stewart",
    "health policy consulting",
    "reimbursement strategy",
    "Medicare Part D",
    "PBM formulary behavior",
    "drug pricing",
    "market access analytics",
  ],
});

const expertiseThemes = [
  "Medicare policy and reimbursement mechanics",
  "Drug pricing, gross-to-net, and formulary pressure",
  "PBM behavior, benefit design, and access friction",
  "Biosimilars, generics, and commercialization strategy",
] as const;

const credibilityPoints = [
  "Experience across manufacturer, policy, and trade association settings",
  "Work grounded in both structural policy reading and observable market behavior",
  "Deliverables designed to be concise, decision-ready, and commercially relevant",
] as const;

function SectionHeading({
  id,
  children,
  center = false,
}: {
  id: string;
  children: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "w-full text-center" : "w-full"}>
      <h2
        id={id}
        className={`section-title mt-6 text-balance ${center ? "text-center" : ""}`}
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
          <div className="mx-auto max-w-5xl text-center lg:max-w-6xl">
            <p className="kicker">About</p>
            <h1 className="hero-title page-title mx-auto max-w-[25ch]">
              Trustworthy policy and reimbursement analysis from someone who works at the point where
              rules meet market behavior.
            </h1>
            <p className="page-lede mx-auto max-w-4xl">
              JL Policy Consulting is led by Joseph Stewart. The firm translates Medicare,
              reimbursement, and market access questions into analysis that is clear enough for
              working teams and specific enough to shape commercial decisions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
          <div className="mx-auto w-full text-center">
            <SectionHeading id="professional-positioning" center>
              Professional positioning
            </SectionHeading>
            <div className="mx-auto mt-6 w-full space-y-4 text-base leading-8 text-[var(--color-muted)]">
              <p>
                The work sits at the intersection of reimbursement mechanics, Medicare policy, payer
                behavior, provider economics, and commercialization strategy.
              </p>
              <p>
                The value is not policy commentary for its own sake. It is analysis built to clarify
                what a rule, pricing change, coding issue, or access constraint means for launch
                planning, market access, and commercial decision-making.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14" aria-label="Credibility strip">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading id="experience-and-perspective" center>
              Experience and perspective
            </SectionHeading>
            <div className="mt-8 grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
              {credibilityPoints.map((point) => (
                <div key={point} className="bg-[var(--color-surface)] px-6 py-6">
                  <p className="text-sm leading-7 text-[var(--color-ink)]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <SectionHeading id="how-the-work-is-approached" center>
              How the work is approached
            </SectionHeading>
            <div className="mx-auto mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="surface-card p-7 text-left sm:p-8">
                <p className="text-base leading-8 text-[var(--color-muted)]">
                  The approach is straightforward, read the policy, test the incentives, and then
                  translate the result into what it means for access, reimbursement, and commercial
                  execution.
                </p>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  That usually means connecting statutory or regulatory change to payer behavior,
                  provider economics, channel design, or pricing pressure, then narrowing the issue to
                  the decisions a team actually has to make.
                </p>
              </article>

              <article className="surface-card p-7 text-left sm:p-8">
                <h3 className="text-[1.1rem] leading-tight text-ink">Selected expertise themes</h3>
                <ul className="mt-5 grid gap-4">
                  {expertiseThemes.map((theme) => (
                    <li
                      key={theme}
                      className="border-t border-[var(--color-border)] pt-4 text-sm leading-7 text-[var(--color-muted)]"
                    >
                      {theme}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading id="proof-and-credibility" center>
              Proof and credibility
            </SectionHeading>
            <div className="mt-8 grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
              {[
                "Experience working across policy and commercial contexts that require the same issue to be read from multiple angles.",
                "Analysis built to support real decision-making, not to create more noise around the decision.",
                "A focus on clarity, disciplined scope, and policy-literate output that can be used by working teams.",
              ].map((point) => (
                <div key={point} className="bg-[var(--color-surface)] px-6 py-6">
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
            <SectionHeading id="about-cta" center>
              Move from background to the work itself
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Consulting shows how this perspective is applied to reimbursement, policy, access,
              and commercialization questions.
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
