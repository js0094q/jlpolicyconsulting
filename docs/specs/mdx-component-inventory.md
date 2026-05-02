# MDX Component Inventory
## JL Policy Consulting Website

## Purpose

This document defines the reusable MDX editorial components available for analytical content across the JL Policy Consulting website.

It exists to ensure that:
- components are used consistently,
- components solve clear editorial problems,
- articles do not become overbuilt,
- Codex and future contributors know when to use each component,
- the site maintains a disciplined and readable presentation style.

This file is the implementation-facing companion to:
- `AGENTS.md`
- `docs/brand/site-style-system.md`
- `docs/brand/content-presentation-system.md`
- `docs/specs/insight-article-spec.md`
- `docs/specs/research-article-spec.md`

---

## Global Rules

### Core rule
Components should support comprehension, not decoration.

Every component should do at least one of the following:
- orient the reader,
- reduce cognitive load,
- clarify a comparison,
- present evidence,
- explain implications,
- preserve rigor without disrupting flow.

If a component does not improve the article, do not use it.

### Consistency rule
All components should:
- follow the same spacing system,
- use restrained styling,
- feel editorial rather than promotional,
- preserve the site’s premium and policy-literate tone.

### Density rule
Do not overload an article with components.

Preferred pattern:
- one or two strong components used well,
- rather than many components with weak editorial value.

---

## Component List

The default editorial component set includes:

- `KeyTakeaways`
- `WhyItMatters`
- `ComparisonTable`
- `DataTable`
- `Figure`
- `Timeline`
- `MethodologyNote`
- `Callout`

Optional future components may be added only if they solve a recurring editorial need.

---

# 1. `KeyTakeaways`

## Purpose

Use `KeyTakeaways` near the top of an article to summarize the most important points quickly.

This component is primarily for:
- scanability,
- fast orientation,
- thesis reinforcement.

## Best used for
- most Insight articles,
- Research articles with multiple findings,
- articles where a busy reader should be able to understand the argument in under a minute.

## Do not use when
- the article is extremely short and already functions like a takeaways note,
- the takeaways would merely repeat the dek and first paragraph,
- the takeaways are too vague to be useful.

## Rules
- use 3 to 5 items,
- each item should be short and specific,
- each item should express a distinct point,
- avoid generic statements.

## Good pattern
- what changed,
- what matters,
- what the reader should retain.

## Bad pattern
- repeated restatements of the same thesis,
- generic business-language bullets,
- long paragraph-style bullets.

## Example MDX usage

```mdx
<KeyTakeaways
  items={[
    "Benefit redesign changes where financial pressure appears, not whether it exists.",
    "Plans may express pressure through formulary and utilization management design.",
    "Manufacturers should evaluate access friction alongside price policy."
  ]}
/>


⸻

2. WhyItMatters

Purpose

Use WhyItMatters to translate analysis into stakeholder relevance.

This component is for:
	•	practical implications,
	•	applied interpretation,
	•	reader-oriented consequence framing.

Best used for
	•	policy interpretation,
	•	reimbursement commentary,
	•	market access strategy analysis,
	•	articles where the implications are as important as the mechanics.

Do not use when
	•	the article is already framed entirely around implications,
	•	the component would repeat an existing section without adding structure,
	•	the stakeholder categories are forced or artificial.

Rules
	•	keep entries concise,
	•	use 2 to 4 stakeholder rows or blocks,
	•	focus on consequence, not abstract commentary,
	•	use plain, commercially relevant language.

Good stakeholder groups
	•	manufacturers
	•	plans/payers
	•	providers
	•	hospitals
	•	policy teams
	•	commercialization teams

Example MDX usage

<WhyItMatters
  title="Why this matters"
  items={[
    {
      label: "Manufacturers",
      text: "Access management may become a more important commercial pressure point than list-price debate alone."
    },
    {
      label: "Plans",
      text: "Redesigned benefit liability increases the incentive to manage exposure through placement and restrictions."
    },
    {
      label: "Policy teams",
      text: "Observed behavior should be evaluated through access effects, not just statutory design."
    }
  ]}
/>


⸻

3. ComparisonTable

Purpose

Use ComparisonTable when structured comparison is the clearest way to explain an issue.

This is one of the highest-value components for the site.

Best used for
	•	Part B vs Part D
	•	inpatient vs outpatient
	•	before vs after policy change
	•	stakeholder difference
	•	coding or payment pathway comparison
	•	launch phase vs mature market comparison

Do not use when
	•	the comparison is trivial,
	•	the table has too many columns,
	•	a simple paragraph would be clearer,
	•	the content starts to resemble a spreadsheet dump.

Rules
	•	keep columns disciplined,
	•	use concise headers,
	•	keep row count focused,
	•	each row should add a meaningful distinction,
	•	surrounding prose should explain what matters in the table.

Required editorial behavior

Do not drop in a table without interpretation.

The article should:
	•	introduce the table,
	•	show the table,
	•	interpret the table.

Example MDX usage

<ComparisonTable
  columns={["Issue", "Before", "After", "Implication"]}
  rows={[
    ["Beneficiary liability", "Higher", "Lower", "Improved patient protection"],
    ["Plan exposure", "More limited", "Higher", "More incentive to manage access"],
    ["Commercial consequence", "Cost sharing visible", "Restrictions may matter more", "Access strategy becomes more important"]
  ]}
/>


⸻

4. DataTable

Purpose

Use DataTable when the article needs a more evidence-heavy or ranked table.

This component is for:
	•	technical comparison,
	•	evidence display,
	•	structured summaries of analytical output.

Best used for
	•	SPUF findings
	•	ranked products
	•	plan-level patterns
	•	dataset excerpts
	•	structured evidence summaries

Do not use when
	•	the table is too large for article flow,
	•	raw export data is being pasted without editorial processing,
	•	a chart would communicate the pattern more clearly.

Rules
	•	only include columns the reader actually needs,
	•	use concise titles,
	•	include units where necessary,
	•	include source or note if factual,
	•	prefer summary tables over raw dumps.

Example MDX usage

<DataTable
  columns={["Product", "Unit price change", "Tier migration", "Interpretation"]}
  rows={[
    ["Nortriptyline HCl", "+0.7%", "+23.6 pp", "Tier movement exceeded same-NDC price movement"],
    ["Amoxapine", "+1.6%", "+16.2 pp", "Pattern suggests more than price-only explanation"],
    ["Morphine Sulfate", "+3.5%", "+7.0 pp", "Moderate movement relative to price change"]
  ]}
/>


⸻

5. Figure

Purpose

Use Figure as the standard wrapper for charts and non-table visuals.

It ensures consistent:
	•	title handling,
	•	caption handling,
	•	source handling,
	•	visual spacing.

Best used for
	•	bar charts
	•	line charts
	•	dot plots
	•	ranked visuals
	•	simple framework diagrams
	•	evidence visuals that need a caption and source

Do not use when
	•	there is no real visual to show,
	•	the chart is decorative,
	•	the figure does not support a clear point.

Rules
	•	one figure should support one main point,
	•	title should be explicit,
	•	caption should be concise,
	•	source should be present where evidence is involved,
	•	surrounding prose should interpret the figure.

Example MDX usage

<Figure
  title="Selected mature generics with higher-tier movement"
  caption="Illustrative examples of products showing measurable tier migration against limited same-NDC unit price change."
  source="CMS Part D SPUF plan-level data"
>
  {/* chart or visual component */}
</Figure>


⸻

6. Timeline

Purpose

Use Timeline when the reader needs to understand sequence, timing, or process progression.

Best used for
	•	CMS guidance timing
	•	negotiation cycles
	•	coding transitions
	•	NTAP/IPPS timing
	•	approval-to-payment pathway explanation
	•	label expansion and reimbursement sequence

Do not use when
	•	timing is not central to the argument,
	•	the sequence is too simple to justify a component,
	•	a short paragraph would explain it better.

Rules
	•	keep steps concise,
	•	focus on what changes at each stage,
	•	emphasize why the sequence matters,
	•	avoid over-detailing procedural minutiae unless essential.

Example MDX usage

<Timeline
  items={[
    {
      label: "Approval",
      text: "Product receives FDA approval, but coding and payment pathways may still be evolving."
    },
    {
      label: "Early reimbursement period",
      text: "Providers and payers operate with transitional coding and payment assumptions."
    },
    {
      label: "Established payment pathway",
      text: "More durable coding and reimbursement conventions begin to shape uptake behavior."
    }
  ]}
/>


⸻

7. MethodologyNote

Purpose

Use MethodologyNote to preserve rigor without interrupting the main article flow.

This is the standard place for:
	•	data source framing,
	•	assumptions,
	•	interpretive caveats,
	•	scope notes,
	•	methodological limitations.

Best used for
	•	Research articles
	•	data-backed Insights
	•	structured comparison pieces
	•	any article where a reader may reasonably ask, “How was this analyzed?”

Do not use when
	•	there is no meaningful method detail to provide,
	•	the article is purely conceptual,
	•	the note would only restate obvious facts.

Rules
	•	keep it concise,
	•	focus on what supports trust,
	•	avoid jargon for its own sake,
	•	do not let it become a mini-appendix unless necessary.

Example MDX usage

<MethodologyNote>
Analysis based on quarterly CMS Part D SPUF plan-level data using same-NDC comparison across tier level and unit cost fields. Findings are interpretive and intended to show directional patterns rather than causal proof.
</MethodologyNote>


⸻

8. Callout

Purpose

Use Callout sparingly for emphasis, caution, or clarification.

This is not a general decoration box.

Best used for
	•	common mistakes
	•	high-risk misunderstandings
	•	cautionary interpretation notes
	•	short “do not confuse X with Y” explanations
	•	narrow but important clarifications

Do not use when
	•	the content belongs in standard prose,
	•	the article already has too many emphasis blocks,
	•	the callout is just repeating the argument dramatically.

Rules
	•	use sparingly,
	•	keep text short,
	•	make the purpose obvious,
	•	do not let callouts dominate the reading experience.

Example MDX usage

<Callout title="Important distinction">
NTAP, pass-through status, and J-code timing solve different reimbursement problems. They should not be treated as interchangeable access milestones.
</Callout>


⸻

Recommended Usage by Article Type

Insights

Typical component mix:
	•	KeyTakeaways
	•	optional ComparisonTable, Timeline, or Figure
	•	WhyItMatters
	•	optional Callout
	•	optional MethodologyNote

Research

Typical component mix:
	•	KeyTakeaways or KeyFindings
	•	lead Figure or ComparisonTable
	•	supporting DataTable or figure
	•	WhyItMatters, where practical
	•	MethodologyNote

⸻

Component Selection Rules

Before using a component, ask:
	1.	What problem is this component solving?
	2.	Would prose alone be clearer?
	3.	Would a table be clearer than a chart?
	4.	Is this component reducing reader effort?
	5.	Is the component adding trust or just adding structure?

If the answer is unclear, do not use the component.

⸻

Styling and Behavior Rules

All editorial components should:
	•	preserve restrained visual styling,
	•	avoid heavy borders or promotional aesthetics,
	•	align with site typography and spacing rules,
	•	feel native to the same editorial system,
	•	maintain mobile readability.

Components should not:
	•	feel like app widgets,
	•	resemble a dashboard,
	•	overpower the article body,
	•	create visual clutter.

⸻

Implementation Notes

These components should live in a dedicated content component directory such as:

components/content/

Recommended files:

components/content/KeyTakeaways.tsx
components/content/WhyItMatters.tsx
components/content/ComparisonTable.tsx
components/content/DataTable.tsx
components/content/Figure.tsx
components/content/Timeline.tsx
components/content/MethodologyNote.tsx
components/content/Callout.tsx

Each component should have:
	•	a simple prop interface,
	•	a stable visual pattern,
	•	clear usage rules,
	•	no unnecessary variants unless editorially justified.

⸻

Future Additions

New MDX components should only be added if:
	•	they solve a recurring editorial need,
	•	they are likely to be reused,
	•	they improve clarity or trust,
	•	they do not duplicate an existing component.

Do not expand the component inventory casually.

⸻

Quality Gate

Before publishing an article that uses components, confirm:
	•	Is each component doing real work?
	•	Is the article still readable without visual overload?
	•	Are captions and sources handled consistently?
	•	Does the page remain editorial rather than app-like?
	•	Does the presentation help comprehension?

If not, simplify.

⸻

Final Rule

The component system exists to make analysis easier to understand and easier to trust.

It does not exist to make articles look more designed.

