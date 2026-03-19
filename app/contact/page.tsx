import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact JL Policy Consulting for consulting inquiries, speaking, writing/commentary opportunities, and professional opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <p className="kicker">Contact</p>
        <h1 className="page-title">Consulting and Professional Inquiries</h1>
        <p className="page-lede">
          Contact is welcome for consulting inquiries, speaking opportunities, writing and
          commentary opportunities, and professional opportunities.
        </p>

        <div className="line-list mt-8">
          <article className="line-item">
            <h2 className="text-2xl text-ink">Consulting inquiries</h2>
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
            <h2 className="text-2xl text-ink">Writing and commentary</h2>
            <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
              Contributions related to Medicare Part D, PBM dynamics, pricing strategy, and
              commercialization implications of policy change.
            </p>
          </article>

          <article className="line-item">
            <h2 className="text-2xl text-ink">Professional opportunities</h2>
            <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
              Roles and projects in reimbursement, market access, pricing policy, and policy
              analytics.
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
