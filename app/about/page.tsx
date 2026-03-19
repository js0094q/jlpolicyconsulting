import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Background and analytical perspective across manufacturer, trade association, legislative, and consulting roles in pharmaceutical reimbursement and market access.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="kicker">About</p>
        <h1 className="page-title">Reimbursement and Market Access Perspective Built Across Four Operating Contexts</h1>

        <section className="mt-12">
          <h2 className="section-title">1. Overview</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            Joseph Stewart works at the intersection of pharmaceutical reimbursement, drug pricing,
            Medicare policy, payer economics, and commercialization strategy. The focus is practical:
            interpret policy movement through a market lens and translate it into decision-ready
            implications for access, pricing, and product strategy.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">2. Experience Across</h2>
          <div className="line-list mt-6">
            <article className="line-item">
              <h3 className="text-2xl text-ink">Manufacturer (Otsuka)</h3>
              <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
                At Otsuka, reimbursement and state policy work included evaluating how policy change
                affected products such as Rexulti and Abilify, including access risk, utilization
                impact, and lifecycle strategy around loss of exclusivity.
              </p>
            </article>
            <article className="line-item">
              <h3 className="text-2xl text-ink">Trade Association (AAM)</h3>
              <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
                At the Association for Accessible Medicines, biosimilars and generics policy work
                focused on commercialization barriers, reimbursement incentives, and formulary
                dynamics that shaped adoption in practice.
              </p>
            </article>
            <article className="line-item">
              <h3 className="text-2xl text-ink">Policy / Legislative (Health and Medicine Counsel)</h3>
              <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
                Legislative and regulatory work provided direct exposure to how federal and state
                policy design affects market behavior, stakeholder incentives, and implementation
                constraints.
              </p>
            </article>
            <article className="line-item">
              <h3 className="text-2xl text-ink">Consulting (JL Policy Consulting)</h3>
              <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
                Current consulting work centers on reimbursement strategy, market access planning,
                payer behavior interpretation, and data-backed policy analysis for pharmaceutical
                organizations and related stakeholders.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="section-title">3. What This Combination Enables</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            This combination supports analysis that is both policy-literate and commercially usable.
            Manufacturer realities, payer behavior, policy mechanics, and utilization data are
            interpreted together rather than in isolation.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">4. Analytical Approach</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            The analytical approach starts with incentives: plan economics, formulary design,
            reimbursement rules, and channel behavior. From there, policy scenarios are translated
            into implications for pricing, access, and commercialization decision pathways.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">5. Policy + Market Lens</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            The core lens asks a consistent question: what does this policy signal mean for market
            behavior? That framing is applied across Medicare Part D redesign, PBM and formulary
            strategies, biosimilar and generic competition, and payer-driven access friction.
          </p>
        </section>
      </Container>
    </section>
  );
}
