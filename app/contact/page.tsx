import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "For consulting engagements, speaking opportunities, writing and commentary requests, or professional opportunities.",
  path: "/contact",
  kicker: "Contact",
  keywords: [
    "pharmaceutical reimbursement consulting",
    "market access advisory contact",
    "drug pricing policy speaker",
    "health policy commentary",
  ],
});

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <h1 className="page-title">Contact</h1>
        <p className="mt-6 text-base leading-8 text-[var(--color-muted)]">
          For consulting engagements, speaking opportunities, writing and commentary requests, or
          professional opportunities:
        </p>

        <div className="mt-6 space-y-3 text-base leading-8 text-[var(--color-muted)]">
          <p>
            Email: <a href={`mailto:${siteConfig.email}`} className="editorial-link">{siteConfig.email}</a>
          </p>
          <p>
            LinkedIn: <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="editorial-link">{siteConfig.linkedin}</a>
          </p>
        </div>

        <p className="mt-10 max-w-5xl text-base leading-8 text-[var(--color-muted)]">
          JL Policy Consulting works with pharmaceutical manufacturers, healthcare organizations,
          and policy stakeholders on reimbursement strategy and market access analysis.
        </p>
      </Container>
    </section>
  );
}
