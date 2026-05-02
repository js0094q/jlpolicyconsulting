# Content Presentation System
## JL Policy Consulting Website

## Purpose

This document defines how analytical content should be presented across the JL Policy Consulting website.

It governs:
- article composition,
- visual support,
- prose density,
- MDX component usage,
- citation and source handling,
- the distinction between Insights and Research,
- editorial consistency across all published content.

This is a site-wide editorial presentation system, not a one-off article template.

---

## Core Principle

Content should be prose-led, visually supported, and source-aware.

Visuals are used to improve comprehension, reduce reader effort, and reinforce trust. They are not decorative.

Every major content element should do at least one of the following:
- orient the reader,
- frame a comparison,
- present evidence,
- clarify implications,
- reduce cognitive load.

If it does not do one of those jobs, it should not be included.

---

## Editorial Goal

The site should publish analysis that is:
- clear,
- specific,
- commercially relevant,
- policy-literate,
- visually disciplined,
- easy to scan without becoming shallow.

The site should not feel like:
- a general blog,
- a think tank microsite,
- a chart-heavy dashboard,
- a design publication,
- a wall-of-text archive.

---

## Content Types

The site supports two primary editorial content types:

- Insights
- Research

### Insights
Insights are shorter, faster, and more interpretive.

Best for:
- policy interpretation,
- reimbursement commentary,
- market access implications,
- coding/payment explainers,
- shorter strategic observations.

Insights should feel:
- sharp,
- readable,
- high-signal,
- controlled.

### Research
Research is deeper, more structured, and more evidence-led.

Best for:
- quantitative analysis,
- structured policy analysis,
- data-backed interpretation,
- framework pieces,
- analytical work with a stronger evidence layer.

Research should feel:
- rigorous,
- calm,
- substantive,
- clearly more developed than Insights.

---

## Reader Experience Model

All content should support a layered reading experience:

1. Fast orientation
2. Core analysis
3. Evidence and structured support
4. Optional method or appendix detail

Readers should be able to understand the thesis quickly, then choose whether to go deeper.

---

## Standard Article Layers

### Layer 1: Fast orientation
This is the opening reading layer.

Typical elements:
- title
- dek / short summary
- metadata
- executive summary
- key takeaways
- optional lead visual

This layer should allow a busy professional reader to understand the topic and main conclusion quickly.

### Layer 2: Core analysis
This is the interpretive body.

Typical elements:
- section headings
- concise prose
- optional comparison table
- optional figure
- implication framing
- limited callouts

This layer should explain the argument clearly, logically, and without unnecessary repetition.

### Layer 3: Evidence and support
This layer deepens credibility and precision.

Typical elements:
- structured table
- source note
- supporting figure
- stakeholder breakdown
- framework table
- examples or edge-case clarifications

### Layer 4: Method / appendix
Use only where it adds trust.

Typical elements:
- methodology note
- assumptions
- caveats
- source framework summary
- technical notes

This layer should support rigor without interrupting the main reading flow.

---

## Visual Selection Framework

Choose the visual format based on the kind of problem the article is solving.

### Use prose when the goal is:
- interpretation,
- explanation,
- synthesis,
- strategic framing.

### Use a table when the goal is:
- comparison,
- pathway explanation,
- stakeholder differentiation,
- practical translation,
- policy mechanics.

### Use a chart when the goal is:
- showing magnitude,
- showing direction over time,
- showing ranking or spread,
- showing a relationship that is clearer visually than in text.

### Use a timeline when the goal is:
- showing sequence,
- showing timing,
- explaining a regulatory or reimbursement progression.

### Use a callout when the goal is:
- emphasizing a caution,
- clarifying a common misconception,
- surfacing an important implication without building a full section.

---

## When to Use Prose Only

Use prose only when:
- the topic is primarily interpretive,
- the point is conceptual rather than comparative,
- a visual would not reduce complexity,
- the piece is short and best read as a focused analytical note.

Good examples:
- policy interpretation,
- short guidance commentary,
- brief strategic implication pieces.

Even in prose-first pieces, use:
- strong headings,
- short paragraphs,
- summary framing,
- visible citation discipline.

---

## When to Use Tables

Tables are strongly preferred when the article requires:
- structured comparison,
- framework explanation,
- stakeholder differentiation,
- coding/payment distinctions,
- policy-change mapping,
- launch or access pathway clarification,
- practical implications by category.

For this website, tables are often more useful than charts.

### Best table use cases
- policy change / implication / strategic consequence
- Part B vs Part D comparison
- inpatient vs outpatient pathway comparison
- stakeholder / incentive / expected behavior
- code type / role / operational relevance
- launch phase / reimbursement status / access risk
- product / payment / operational issue comparison

### Table rules
- keep columns disciplined,
- use concise headers,
- avoid spreadsheet-like density,
- include source notes when factual,
- ensure the surrounding prose explains what the reader should notice.

---

## When to Use Charts

Use charts only when they explain quantitative evidence more clearly than prose or tables.

### Good chart use cases
- directional change over time
- ranked movement
- quarter-over-quarter differences
- price vs access divergence
- magnitude comparison
- concentration or spread patterns

### Avoid charts when
- a table is clearer,
- the dataset is thin,
- the point is obvious in one sentence,
- the chart would be decorative rather than interpretive.

### Chart rules
- one chart should support one main point,
- titles should be explicit,
- captions should be concise,
- source lines should be visible,
- do not turn articles into mini-dashboards,
- do not stack multiple weak charts on one page.

---

## Preferred MDX Components

The following components form the default editorial toolkit.

### `KeyTakeaways`
Use near the top of most articles.

Purpose:
- orientation,
- scanability,
- thesis reinforcement.

### `WhyItMatters`
Use when practical implications need explicit framing.

Purpose:
- connect analysis to stakeholder relevance,
- translate interpretation into consequences.

### `ComparisonTable`
Use when structured comparison is central to understanding.

Purpose:
- reduce cognitive load,
- replace long explanatory prose where appropriate.

### `DataTable`
Use for evidence-heavy articles with more structured data.

Purpose:
- present ranked, comparative, or technical information cleanly.

### `Figure`
Use for charts or other non-table visuals.

Purpose:
- provide a consistent wrapper for title, caption, and source.

### `Timeline`
Use when process or sequence matters.

Purpose:
- clarify policy timing,
- explain reimbursement or regulatory progression.

### `MethodologyNote`
Use when readers need to understand how the analysis was produced.

Purpose:
- preserve rigor,
- separate technical framing from the main narrative.

### `Callout`
Use sparingly.

Purpose:
- caution,
- clarification,
- common mistake,
- interpretation warning,
- highly important note.

---

## Component Usage Rules

### General rules
- do not overload an article with components,
- prefer one or two strong components over many weak ones,
- every component must support the argument,
- components should not compete visually with the prose,
- keep styling and spacing consistent.

### Typical maximum
For most Insight pieces:
- 1 `KeyTakeaways`
- 1 lead visual or table
- 1 `WhyItMatters`
- optional `Callout`
- optional `MethodologyNote`

For most Research pieces:
- 1 `KeyTakeaways` or `KeyFindings`
- 1 lead visual or comparison table
- 1 supporting table or figure
- 1 `MethodologyNote`
- optional `WhyItMatters`

---

## Default Insight Article Pattern

A standard Insight article should usually follow this pattern:

1. Title
2. Dek
3. Metadata
4. Executive summary
5. `KeyTakeaways`
6. Optional `ComparisonTable`, `Timeline`, `Figure`, or `Callout`
7. Main analysis
8. `WhyItMatters`
9. Conclusion
10. Sources
11. Optional `MethodologyNote`

Insights should feel concise, sharp, and easy to read.

### Insight article rule
The reader should understand the point quickly, without needing to process too much structure or evidence upfront.

---

## Default Research Article Pattern

A standard Research article should usually follow this pattern:

1. Title
2. Dek
3. Metadata
4. Executive summary
5. Research question or thesis
6. Lead `Figure` or `ComparisonTable`
7. Key findings
8. Main analysis
9. Supporting `DataTable` or figure, if needed
10. Practical implications
11. `MethodologyNote`
12. Conclusion
13. Sources

Research should feel deeper, more structured, and more evidence-led than Insights.

### Research article rule
The evidence should be visible, but always interpreted. Raw data presentation is not enough.

---

## Caption and Source Rules

Every evidence-based visual should include:
- a clear title or label,
- a concise caption,
- a source line where appropriate.

### Captions should do
- explain what the reader is looking at,
- highlight the key takeaway where helpful.

### Captions should not
- repeat the full prose argument,
- become long mini-essays,
- substitute for surrounding explanation.

### Source format
Use one consistent style, such as:
- `Source: CMS Part D SPUF plan-level data`
- `Source: CMS guidance, [document name], [date]`
- `Source: JL Policy Consulting analysis of CMS public data`

---

## Citation Rules

All factual claims that depend on external material should be cited.

The site may use:
- inline citations,
- linked source notes,
- endnotes,
- a source list at the bottom.

Use one site-wide pattern consistently.

The writing should distinguish between:
- sourced fact,
- interpretation,
- inference.

Where inference is being made from data, policy material, or comparative analysis, that should be clear in the prose.

---

## Copy and Visual Balance

The site should remain an analytical professional platform, not a design-heavy publication.

### Preferred balance
- enough prose to explain,
- enough structure to reduce effort,
- enough evidence to support trust,
- enough visual support to improve comprehension.

### Avoid
- wall-of-text articles,
- visual overload,
- decorative blocks,
- repeated presentation gimmicks,
- unnecessary complexity,
- tables or charts that exist only because a page “needs a visual.”

---

## Mobile and Readability Rules

All content must remain readable on smaller screens.

### Rules
- keep tables compact where possible,
- use wide tables selectively,
- charts must remain legible at smaller sizes,
- components must stack cleanly,
- long paragraphs should be avoided,
- captions and source lines should remain readable.

Do not introduce presentation patterns that only work on desktop.

---

## Editorial Quality Gate

Before publishing or approving a content page, confirm:

- Is the thesis clear quickly?
- Is the article easy to scan?
- Is the structure appropriate to the topic?
- Is the chosen visual format the right one?
- Are the sources visible?
- Is the evidence interpreted, not just displayed?
- Does the page feel restrained and professional?
- Does the presentation help trust rather than distract from it?

If not, revise.

---

## Standard of Quality

A content page is successful if:
- the argument is understandable quickly,
- the article remains useful at both skim and full-read depth,
- visuals improve comprehension,
- sources are visible,
- the tone is authoritative and controlled,
- the presentation supports trust, readability, and application.

---

## Final Rule

For this website, the best editorial presentation is not the most visual.

It is the clearest, most disciplined, and most useful.

Use prose, tables, charts, timelines, and callouts only when they make the analysis easier to understand, easier to trust, and easier to apply.