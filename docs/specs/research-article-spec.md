# Research Article Spec
## JL Policy Consulting Website

## Purpose

Research articles are the deeper analytical layer of the JL Policy Consulting website.

Their job is to:
- present more substantive analysis,
- support a clear thesis with structured evidence,
- demonstrate analytical rigor,
- translate quantitative or detailed policy material into useful strategic understanding.

A Research article should feel more developed and evidence-driven than an Insight article, while still remaining readable and professionally designed.

Research articles are not academic journal papers, but they should reflect disciplined analytical standards.

---

## Primary Audience

Primary audiences include:
- sophisticated policy and reimbursement readers,
- manufacturer strategy teams,
- market access and commercialization stakeholders,
- readers evaluating the depth of analytical capability,
- stakeholders seeking evidence-supported interpretation.

---

## Primary Reader Questions to Answer

1. What is the thesis or analytical question?
2. What evidence supports it?
3. How was the analysis approached?
4. What conclusions should a serious reader draw?
5. What practical relevance does this have?

---

## Editorial Standard

Research articles must feel:
- rigorous,
- structured,
- evidence-supported,
- calm,
- credible,
- strategically relevant.

They must not feel:
- sloppy,
- visually noisy,
- like blog posts with extra words,
- academic without practical value,
- overloaded with unframed data.

---

## Recommended Length

Typical target:
- approximately 1,200 to 3,000+ words

Length should follow the needs of the topic.
Do not add length without analytical value.

---

## Required Structure

Use this default structure unless there is a clear editorial reason to vary it:

1. Title
2. Dek / Summary
3. Metadata row
4. Executive Summary
5. Research Question or Thesis
6. Lead Figure or Lead Table
7. Key Findings
8. Main Analysis
9. Practical Implications
10. Methodology / Source Notes
11. Conclusion
12. Sources / Citations

---

## Section Requirements

### 1. Title
The title should be:
- specific,
- analytically framed,
- serious,
- descriptive of the subject and insight.

Avoid:
- generic “deep dive” phrasing,
- vague commentary titles,
- clickbait framing.

### 2. Dek / Summary
A short summary should explain:
- what was analyzed,
- what the core conclusion is,
- why it matters.

### 3. Metadata Row
Should include:
- publish date,
- category,
- optional tags,
- optional reading time if implemented.

### 4. Executive Summary
This section is required.

Use:
- one short paragraph, or
- a short summary block.

The reader should understand the thesis before reaching the first major section.

### 5. Research Question or Thesis
This section should explicitly define:
- the analytical question,
- the issue being examined,
- the claim or interpretation the article will support.

This is one major difference from a standard insight piece.

### 6. Lead Figure or Lead Table
A lead visual is strongly recommended for Research articles.

Preferred options:
- one clear chart,
- one strong comparison table,
- one analytical framework graphic.

The lead visual should support the central claim, not merely accompany it.

### 7. Key Findings
This section is strongly recommended.

Use 3 to 5 short findings that summarize the important results or observations.

These should be more evidence-oriented than the key takeaways used in shorter Insight pieces.

### 8. Main Analysis
This is the core of the article.

Use clear sub-sections that move logically through:
- context,
- evidence,
- interpretation,
- implications.

The article should not rely on raw data alone.
Every important figure or table should be interpreted in prose.

### 9. Practical Implications
This section is required.

It should explain what the findings mean for relevant stakeholders, such as:
- manufacturers,
- policy teams,
- payers,
- providers,
- launch/commercial strategy functions.

The site’s research should not stop at description.
It should explain why the findings matter.

### 10. Methodology / Source Notes
This section is strongly recommended for Research articles and should be included whenever the piece relies on:
- structured dataset work,
- quantitative analysis,
- defined assumptions,
- interpretation of source frameworks,
- cross-source comparison.

This may be:
- a full methodology section,
- a shorter note,
- a structured appendix block.

It should clarify enough to support trust without derailing readability.

### 11. Conclusion
The conclusion should:
- restate the thesis in light of the evidence,
- summarize the meaning of the findings,
- remain concise and controlled.

### 12. Sources / Citations
Research articles should be clearly sourced.

Use a consistent citation system and include source visibility sufficient to support credibility and verification.

---

## Visual Usage Rules

Research articles should generally include at least one visual or structured evidence element.

### Preferred visual types
- Figure
- ComparisonTable
- DataTable
- Timeline
- MetricStrip
- MethodologyNote
- annotated framework table

### Best uses
- ranking and distribution patterns,
- quarter-over-quarter differences,
- stakeholder comparison,
- policy/design comparison,
- coding/payment framework,
- launch timing or regulatory sequence.

### Avoid
- decorative charts,
- multiple competing visuals with weak narrative integration,
- overly technical figures without explanation,
- dashboard-style clutter.

---

## Table Guidance

Tables are highly appropriate for Research articles.

Good uses include:
- NDC/tier movement summaries,
- policy change / strategic consequence frameworks,
- channel comparisons,
- reimbursement pathway comparisons,
- stakeholder impact matrices,
- assumption and methodology summaries.

Tables should:
- have clear column logic,
- not overwhelm the page,
- include notes or source lines when needed,
- be interpreted in the surrounding prose.

---

## Chart Guidance

Use charts where they clarify evidence better than text or tables.

Good chart types:
- bar charts,
- slope charts,
- line charts,
- dot plots,
- ranked visuals,
- simple comparison visuals.

Charts should:
- support one central point,
- have clear titles,
- use concise captions,
- include source lines,
- avoid excessive complexity.

A chart without interpretation is not sufficient.

---

## Citation Rules

Research articles should have more explicit sourcing than Insights.

### Rules
- cite major factual claims,
- identify key datasets or guidance sources,
- distinguish evidence from interpretation,
- include source notes for charts and tables,
- avoid unsupported numerical claims.

Where inference is being made, the article should make that clear.

---

## Tone Rules

Research articles should:
- remain readable,
- sound analytical rather than academic,
- show discipline,
- avoid hype,
- avoid rhetorical excess,
- connect evidence to strategic meaning.

The writing should feel substantial but controlled.

---

## Recommended MDX Components

Research articles may use:
- `KeyTakeaways` or `KeyFindings`
- `Figure`
- `ComparisonTable`
- `DataTable`
- `Timeline`
- `WhyItMatters`
- `MethodologyNote`
- `CitationList`

These components should be used selectively and deliberately.

---

## Example MDX Pattern

```mdx
---
title: "Tier Migration vs Unit Price Change in Mature Generic Products"
summary: "A quarterly SPUF-derived review suggests some mature generic products moved to higher tiers even when same-NDC unit price changes were limited."
publishDate: "2026-03-18"
category: "Healthcare Data Analysis"
tags:
  - SPUF
  - Part D
  - Generic Drugs
---

<KeyTakeaways
  items={[
    "Tier movement does not always track cleanly with same-NDC unit cost change.",
    "Some mature generics showed higher-tier movement despite limited price change.",
    "Observed access dynamics may reflect broader plan management behavior rather than price alone."
  ]}
/>

<Figure
  title="Selected mature generics with higher-tier movement"
  caption="Illustrative examples of products showing measurable tier migration against limited same-NDC unit price change."
  source="CMS Part D SPUF plan-level data"
>
  {/* chart component here */}
</Figure>

## Research question

What does quarterly plan-level SPUF data suggest about the relationship between same-NDC unit cost change and tier movement for selected mature generic products?

## Key findings

Main findings here.

<DataTable
  columns={["Product", "Unit price change", "Tier migration", "Interpretation"]}
  rows={[
    ["Nortriptyline HCl", "+0.7%", "+23.6 pp", "Tier movement materially exceeded unit price movement"],
    ["Amoxapine", "+1.6%", "+16.2 pp", "Access dynamics likely reflect more than price alone"],
    ["Morphine Sulfate", "+3.5%", "+7.0 pp", "Moderate movement relative to price change"]
  ]}
/>

<MethodologyNote>
Analysis based on quarterly CMS Part D SPUF plan-level data with product-level comparison using tier level and unit cost fields. Findings are interpretive and intended to illustrate directional patterns rather than causal proof.
</MethodologyNote>

# Success Criteria

A Research article is successful if:
	•	the analytical question is clear,
	•	the evidence is visible and structured,
	•	the interpretation is disciplined,
	•	visuals improve understanding,
	•	methodology is transparent enough to support trust,
	•	the piece clearly feels deeper and more rigorous than a standard Insight article.