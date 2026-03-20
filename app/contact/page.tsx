import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Professional Contact",
  description:
    "For consulting engagements, speaking opportunities, writing and commentary requests, or professional opportunities.",
  path: "/contact",
  kicker: "Professional Contact",
  keywords: [
    "pharmaceutical reimbursement consulting",
    "market access advisory contact",
    "drug pricing policy speaker",
    "health policy commentary",
  ],
});

export default function ContactPage() {
  return (
    <section className="py-14 sm:py-16">
      <Container className="max-w-6xl">
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h1 className="page-title">Professional Contact</h1>

          <div className="mt-8 space-y-4 text-base leading-8 text-[var(--color-muted)]">
            <p>
              <span className="font-semibold text-ink">Email:</span> {" "}
              <a href={`mailto:${siteConfig.email}`} className="editorial-link hover:underline">
                {siteConfig.email}
              </a>
            </p>

            <p>
              <span className="font-semibold text-ink">LinkedIn:</span> {" "}
              <a
                href="https://www.linkedin.com/in/joseph-stewart-mph-cpht-309bb5215"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link hover:underline"
              >
                https://www.linkedin.com/in/joseph-stewart-mph-cpht-309bb5215
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
