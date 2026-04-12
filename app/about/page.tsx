import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "JL Policy Consulting is led by Joseph Stewart and focused on reimbursement, policy, and market access analysis.",
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

const credibilityPoints = [
  "Experience across manufacturer, trade association, and public policy settings",
  "Analysis grounded in both structural policy reading and observable market behavior",
  "Output designed to be concise, decision-ready, and commercially relevant",
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
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
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
            <h1 className="hero-title page-title mx-auto max-w-[26ch]">
              Policy, reimbursement, and market access analysis grounded in how rules show up in real payer and provider behavior.
            </h1>
            <p className="page-lede mx-auto max-w-4xl">
              JL Policy Consulting is led by Joseph Stewart. The perspective comes from work across manufacturer reimbursement and policy strategy, biosimilars policy, and public policy, and is designed to turn complex reimbursement and market structure questions into usable strategic analysis.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/consulting" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                View Consulting
              </Link>
              <Link href="/contact" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="professional-perspective" center>
              Professional perspective
            </SectionHeading>
            <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-8 text-[var(--color-muted)]">
              <p>
                The work sits at the intersection of reimbursement mechanics, Medicare policy, payer behavior, provider economics, and commercialization strategy.
              </p>
              <p>
                The value is not policy commentary for its own sake. It is analysis built to clarify what a rule, pricing change, coding issue, or access constraint means for launch planning, market access, and commercial decision-making.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-12 sm:py-14" aria-label="Credibility strip">
        <Container>
          <div className="max-w-5xl">
            <SectionHeading id="why-this-perspective-is-useful" center>
              Why this perspective is useful
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

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl text-center lg:max-w-6xl">
            <SectionHeading id="about-cta" center>
              Move from background to the work itself
            </SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Consulting shows how this perspective is applied to reimbursement, policy, access, and commercialization questions.
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
