import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="kicker">Professional Contact</p>
              <h1 className="page-title max-w-[12ch]">Direct contact for consulting and professional inquiries.</h1>
              <p className="page-lede">
                Use this page for consulting questions, strategic analysis requests, collaboration,
                or other professional outreach. The path is intentionally simple.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">Primary contact path</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
                    Email
                  </p>
                  <a href={`mailto:${siteConfig.email}`} className="mt-2 inline-flex text-base text-ink underline decoration-[rgba(23,63,137,0.24)] decoration-1 underline-offset-4 hover:text-[var(--color-accent)]">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="border-t border-[var(--color-border)] pt-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)]">
                    LinkedIn
                  </p>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-base text-ink underline decoration-[rgba(23,63,137,0.24)] decoration-1 underline-offset-4 hover:text-[var(--color-accent)]"
                  >
                    View Joseph Stewart on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.76fr)] lg:items-start">
            <div>
              <SectionHeading id="contact-context">What to send</SectionHeading>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                If you are reaching out about an advisory question, include the business issue,
                timing, and any relevant policy or market context. That helps keep the response
                specific and efficient.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <p className="kicker">Appropriate inquiries</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                {inquiryTypes.map((item) => (
                  <li key={item} className="border-t border-[var(--color-border)] pt-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading id="contact-cta">Use email for the fastest response.</SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              The page is intentionally low-friction. If email is easier, use the address above;
              if LinkedIn is more useful, that path is available too.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${siteConfig.email}`} className="button-primary inline-flex items-center rounded-md px-7 py-3">
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
