import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact JL Policy Consulting for consulting engagements, strategic analysis, collaboration, or professional inquiries.",
  path: "/contact",
  kicker: "Professional Contact",
  keywords: [
    "pharmaceutical reimbursement consulting",
    "market access advisory contact",
    "drug pricing policy speaker",
    "health policy commentary",
  ],
});

const inquiryTypes = [
  "Consulting engagements",
  "Strategic analysis requests",
  "Collaboration or professional contact",
  "Speaking, writing, or commentary inquiries",
] as const;

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="h-px w-16 bg-[var(--color-accent)]" />
      <h2 id={id} className="section-title mt-6 text-balance">
        {children}
      </h2>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="page-title max-w-[10ch]">Contact</h1>
            <p className="page-lede mt-6">Direct contact for consulting and professional inquiries.</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Use this page for consulting questions, strategic analysis requests, collaboration,
              speaking, writing, or other professional outreach. The path is intentionally simple.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading id="primary-contact">Primary contact</SectionHeading>
            <dl className="mt-8 border-y border-[var(--color-border)]">
              <div className="grid gap-3 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-base text-ink underline decoration-[rgba(23,63,137,0.24)] decoration-1 underline-offset-4 hover:text-[var(--color-accent)]"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div className="grid gap-3 border-t border-[var(--color-border)] py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
                  LinkedIn
                </dt>
                <dd>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-ink underline decoration-[rgba(23,63,137,0.24)] decoration-1 underline-offset-4 hover:text-[var(--color-accent)]"
                  >
                    View Joseph Stewart on LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading id="what-to-include">What to include</SectionHeading>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              If you are reaching out about an advisory question, include the business issue,
              timing, and any relevant policy or market context. That helps keep the response
              specific and efficient.
            </p>

            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
                Appropriate inquiries
              </h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-[var(--color-muted)]">
                {inquiryTypes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-8 text-[var(--color-muted)]">
                Use email for the fastest response.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="button-primary inline-flex items-center rounded-md px-7 py-3"
              >
                Email Directly
              </a>
              <Link href="/consulting" className="button-secondary inline-flex items-center rounded-md px-7 py-3">
                View Consulting
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
