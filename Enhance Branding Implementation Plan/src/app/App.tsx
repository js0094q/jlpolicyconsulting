import { CapabilitiesGrid } from './components/CapabilitiesGrid';
import { HeroStatement } from './components/HeroStatement';
import { InsightDataCard } from './components/InsightDataCard';
import { InsightEditorialCard } from './components/InsightEditorialCard';
import { IntroNarrative } from './components/IntroNarrative';
import { MetricsStrip } from './components/MetricsStrip';
import { PrimaryCTA } from './components/PrimaryCTA';
import { ResearchSummary } from './components/ResearchSummary';
import { SectionHeading } from './components/SectionHeading';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

const capabilitiesLeftColumn = [
  'Reimbursement Policy',
  'Drug Pricing and Market Access',
  'PBM and Formulary Strategy',
  'Biosimilars and Generics Policy',
  'Medicare Part D Policy',
  'Healthcare Data Analytics'
];

const capabilitiesRightColumn = [
  'Reimbursement Strategy Advisory',
  'Market Access and Payer Dynamics',
  'Drug Pricing and Policy Analysis',
  'Medicare Policy Impact Analysis',
  'Biosimilars Commercialization Strategy',
  'Healthcare Policy Analytics'
];

const analyticsRows = [
  {
    product: 'Nortriptyline HCl',
    higherTierMovement: '+23.6 pp',
    higherTierMovementValue: 23.6,
    sameNdcPriceChange: '+0.7%'
  },
  {
    product: 'Alprazolam',
    higherTierMovement: '+15.2 pp',
    higherTierMovementValue: 15.2,
    sameNdcPriceChange: '+1.6%'
  },
  {
    product: 'Morphine Sulfate',
    higherTierMovement: '+7.0 pp',
    higherTierMovementValue: 7,
    sameNdcPriceChange: '+3.5%'
  },
  {
    product: 'Dexmethylphenidate HCl',
    higherTierMovement: '+6.8 pp',
    higherTierMovementValue: 6.8,
    sameNdcPriceChange: '-0.1%'
  }
];

const metrics = [
  { value: '10+', label: 'YEARS EXPERIENCE' },
  { value: '100+', label: 'POLICY ANALYSES' },
  { value: '50+', label: 'CLIENT PROJECTS' }
];

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-[var(--bg)]">
      <a
        href="#main-content"
        className="focus-outline sr-only left-3 top-3 rounded-md bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)] focus:not-sr-only focus:absolute"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content">
        <HeroStatement
          headline="Healthcare Policy and Market Access Intelligence, Grounded in Real-World Data and Use Cases"
          tagline="Reimbursement Strategy, Drug Pricing Policy, Market Access Insight"
        />

        <IntroNarrative
          copy="JL Policy Consulting provides analysis and advisory at the intersection of pharmaceutical policy, payer dynamics, and commercialization strategy. With more than a decade of experience across drug pricing, reimbursement, and market access, the firm supports manufacturers, payers, and stakeholders in navigating complex access and policy environments. Our work spans manufacturer strategy, biosimilars policy, Medicare reimbursement, and healthcare data analytics, with a focus on delivering flexible, data-driven insights tailored to real-world use cases."
        />

        <section id="consulting" className="section-space pt-8">
          <div className="layout-container">
            <div className="mx-auto max-w-6xl border-t border-[var(--border)] pt-12">
              <SectionHeading id="capabilities-heading" title="Capabilities" />
              <div className="mt-10">
                <CapabilitiesGrid
                  leftColumn={capabilitiesLeftColumn}
                  rightColumn={capabilitiesRightColumn}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="insights" className="section-space pt-8">
          <div className="layout-container">
            <div className="mx-auto max-w-6xl border-t border-[var(--border)] pt-12">
              <SectionHeading id="insights-heading" title="Latest Insights" />
              <div className="mt-10 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <InsightEditorialCard
                  metaLine="MARCH 18, 2026 • MEDICARE POLICY"
                  title="Why Part D Redesign Changes Where Pressure Shows Up"
                  summary="Part D redesign improves beneficiary protection but shifts how plans manage risk, often through formulary and utilization design."
                  href="/insights/part-d-redesign-liability"
                />
                <InsightDataCard
                  title="Tier Migration vs Unit Price Change"
                  description="SPUF-derived quarterly view of mature generic products with measurable higher-tier movement against same-NDC unit cost change."
                  rows={analyticsRows}
                  sourceNote="Source framework: CMS Part D SPUF plan-level data (tier level, UNIT_COST, and LM flags including RXCUI_1)"
                  href="/research/tier-migration-commoditized-generics"
                />
              </div>
            </div>
          </div>
        </section>

        <ResearchSummary
          copy="Our research combines quantitative analysis of healthcare policy data with strategic insights into market dynamics. We translate complex regulatory change into actionable intelligence for pharmaceutical manufacturers and payers."
        />

        <MetricsStrip metrics={metrics} />

        <PrimaryCTA
          heading="Get in Touch"
          supportingText="Interested in discussing how we can support your market access strategy?"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
