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
    <div className="mx-auto max-w-3xl text-center">
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
          <div className="mx-auto max-w-5xl text-center lg:max-w-6xl">
            <h1 className="hero-title page-title mx-auto max-w-[10ch]">Contact</h1>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
              <div className="surface-card p-6 text-center">
                <p className="kicker">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-4 block text-base text-ink underline decoration-[rgba(23,63,137,0.24)] decoration-1 underline-offset-4 hover:text-[var(--color-accent)]"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="surface-card p-6 text-center">
                <p className="kicker">LinkedIn</p>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-base text-ink underline decoration-[rgba(23,63,137,0.24)] decoration-1 underline-offset-4 hover:text-[var(--color-accent)]"
                >
                  View Joseph Stewart on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <SectionHeading id="what-to-include">What to include</SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-8 text-[var(--color-muted)]">
              If you are reaching out about an advisory question, include the business issue,
              timing, and any relevant policy or market context. That helps keep the response
              specific and efficient.
            </p>

            <ul className="mx-auto mt-10 max-w-2xl list-none space-y-3 p-0 text-center text-base leading-8 text-[var(--color-muted)]">
              {inquiryTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3">
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
