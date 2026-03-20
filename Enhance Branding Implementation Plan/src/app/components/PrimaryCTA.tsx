import { Mail } from 'lucide-react';

interface PrimaryCTAProps {
  heading: string;
  supportingText: string;
}

export function PrimaryCTA({ heading, supportingText }: PrimaryCTAProps) {
  return (
    <section id="contact" className="section-space pb-20 pt-12" aria-labelledby="contact-heading">
      <div className="layout-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="contact-heading" className="text-[clamp(1.9rem,3.1vw,2.45rem)] font-semibold text-[var(--text)]">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-7 text-[var(--muted)]">{supportingText}</p>
          <a
            href="mailto:contact@jlpolicyconsulting.com"
            className="focus-outline mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#2f62c7]"
          >
            <Mail size={16} aria-hidden />
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
