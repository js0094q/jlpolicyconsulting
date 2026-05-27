import Link from "next/link";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact JL Policy Consulting",
  description:
    "Use JL Policy Consulting for consulting engagements, strategic analysis, collaboration, and advisory inquiries.",
  path: "/contact",
  kicker: "Professional Contact",
  keywords: [
    "health policy consulting contact",
    "reimbursement strategy",
    "market access advisory",
    "Medicare policy",
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
      <h2 id={id} className="section-title mt-6 text-center text-balance">
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
          <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">
            <p className="kicker">Professional Contact</p>
            <h1 className="hero-title page-title mx-auto mt-4 max-w-[12ch]">Contact</h1>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Email is the primary contact path for consulting engagements, strategic analysis,
              collaboration, speaking, and writing inquiries.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="button-primary inline-flex items-center rounded-md px-7 py-3"
              >
                Send email
              </a>
              <Link
                href="/consulting"
                className="button-secondary inline-flex items-center rounded-md px-7 py-3"
              >
                Review consulting scope
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="surface-card p-6 text-center sm:p-8">
              <p className="kicker">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 block text-lg text-ink underline decoration-[rgba(23,63,137,0.24)] decoration-1 underline-offset-4 hover:text-[var(--color-accent)]"
              >
                {siteConfig.email}
              </a>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                Use email for consulting, strategic analysis, collaboration, speaking, writing,
                or commentary inquiries.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <SectionHeading id="appropriate-inquiries">Appropriate inquiries</SectionHeading>
            <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-8 text-[var(--color-muted)]">
              The most useful inquiries are brief and specific. Include the business issue, timing,
              and any policy or market context that affects the work.
            </p>

            <ul className="mx-auto mt-10 max-w-2xl list-none space-y-3 p-0 text-center text-base leading-8 text-[var(--color-muted)]">
              {inquiryTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-[var(--color-muted)]">
              If the work needs a quick fit check, start with the decision you are trying to
              support and the time frame you are working against.
            </p>
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
                Send email
              </a>
              <Link
                href="/consulting"
                className="button-secondary inline-flex items-center rounded-md px-7 py-3"
              >
                Review consulting scope
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
