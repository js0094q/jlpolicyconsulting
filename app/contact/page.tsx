import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact JL Policy Consulting for advisory engagements, speaking requests, strategic commentary, and collaboration opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <p className="kicker">Contact</p>
        <h1 className="page-title">Advisory and Collaboration Inquiries</h1>
        <p className="page-lede">
          JL Policy Consulting welcomes outreach for advisory work, speaking engagements, strategic
          commentary, and collaboration.
        </p>

        <div className="line-list mt-8">
          <article className="line-item">
            <h2 className="text-2xl text-ink">Advisory engagements</h2>
            <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
              Reimbursement strategy, market access, pricing policy interpretation, and payer
              behavior analysis.
            </p>
          </article>

          <article className="line-item">
            <h2 className="text-2xl text-ink">Speaking opportunities</h2>
            <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
              Conferences, internal briefings, and policy or market access discussion panels.
            </p>
          </article>

          <article className="line-item">
            <h2 className="text-2xl text-ink">Strategic commentary</h2>
            <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
              Contributions related to Medicare Part D, PBM dynamics, pricing strategy, and
              commercialization implications of policy change.
            </p>
          </article>

          <article className="line-item">
            <h2 className="text-2xl text-ink">Collaboration opportunities</h2>
            <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
              Cross-functional initiatives and project collaborations in reimbursement, market
              access, pricing, and policy analytics.
            </p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-ink hover:border-[var(--color-accent)]"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-ink hover:border-[var(--color-accent)]"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </section>
  );
}
