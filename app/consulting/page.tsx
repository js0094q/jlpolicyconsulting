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
    title: "Reimbursement strategy",
    body: "Advisory on payment structure, coding, timing, and site-of-care economics that determine whether access is operationally viable.",
    supports: "Launch, market access, pricing, and reimbursement teams.",
    informs: "Reimbursement planning, account strategy, and adoption risk.",
  },
  {
    title: "Medicare and drug pricing policy",
    body: "Interpretation of federal policy changes that affect benefit design, payment mechanics, gross-to-net pressure, and commercial assumptions.",
    supports: "Policy, government affairs, pricing, and cross-functional strategy teams.",
    informs: "Scenario planning, policy response, and exposure assessment.",
  },
  {
    title: "Market access and payer dynamics",
    body: "Analysis of formulary design, utilization management, channel restrictions, and payer behavior that shape real access in practice.",
    supports: "Market access, payer strategy, and commercialization teams.",
    informs: "Access strategy, evidence framing, and launch risk.",
  },
  {
    title: "Provider economics and commercialization",
    body: "Work focused on buy-and-bill economics, margin pressure, 340B distortion, site-of-care behavior, and the practical adoption barriers that appear after coverage.",
    supports: "Manufacturer teams working through provider-administered products and access-sensitive launches.",
    informs: "Account economics, channel strategy, and commercialization planning.",
  },
] as const;

function ServiceCard({
  title,
  body,
  supports,
  informs,
}: {
  title: string;
  body: string;
  supports: string;
  informs: string;
}) {
  return (
    <article className="surface-card flex h-full flex-col p-6 sm:p-7">
      <h3 className="text-[1.35rem] leading-tight text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{body}</p>
      <dl className="mt-5 grid gap-4 border-t border-[var(--color-border)] pt-4">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-soft)]">
            Who it supports
          </dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{supports}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-soft)]">
            What it informs
          </dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{informs}</dd>
        </div>
      </dl>
    </article>
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
      <h2
        id={id}
        className={`section-title mt-6 text-balance ${align === "center" ? "text-center" : ""}`}
      >
        {children}
      </h2>
    </div>
  );
}

export default function ConsultingPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <p className="kicker">Consulting</p>
            <h1 className="page-title mx-auto max-w-[18ch]">
              Strategic advisory on reimbursement, market access, and policy decisions.
            </h1>
            <p className="page-lede mx-auto max-w-4xl">
              JL Policy Consulting helps teams work through the questions that sit between policy
              change and commercial execution, including reimbursement structure, payer behavior,
              provider economics, coding, and launch risk.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="button-primary inline-flex items-center rounded-md px-6 py-3">
                Contact Us
              </Link>
              <Link href="/insights" className="button-secondary inline-flex items-center rounded-md px-6 py-3">
                Read Insights
              </Link>
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
          <SectionHeading id="value">Why teams use this work</SectionHeading>
          <ul className="mt-8 max-w-3xl list-disc space-y-4 pl-5">
            <li className="text-base leading-8 text-[var(--color-muted)]">
              Connects policy mechanics to real commercial decisions
            </li>
            <li className="text-base leading-8 text-[var(--color-muted)]">
              Surfaces access risk before it becomes launch friction
            </li>
            <li className="text-base leading-8 text-[var(--color-muted)]">
              Written for working teams, not generic policy audiences
            </li>
          </ul>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <SectionHeading id="outputs">Typical outputs</SectionHeading>
          <div className="mt-8 max-w-3xl space-y-4">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Support is scoped around the question at hand and typically delivered as strategic
              analysis, issue briefs, policy interpretation, quantitative review, decision support
              tools, or executive briefing materials.
            </p>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              The emphasis is on clarity, relevance, and usability, not volume.
            </p>
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
              For reimbursement, access, payer behavior, provider economics, pricing, or policy
              timing questions, start with the issue that needs a decision.
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
