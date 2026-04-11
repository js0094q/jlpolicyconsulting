# Insight Article Spec
## JL Policy Consulting Website

## Purpose

Insight articles are concise, high-signal editorial pieces that interpret policy, reimbursement, market access, or payer dynamics in a way that is immediately useful to professional readers.

An Insight article should:
- present a clear thesis,
- explain why the issue matters,
- translate technical developments into practical implications,
- remain concise and highly readable,
- use visuals only when they materially improve understanding.

Insight articles are not long-form research papers and should not read like white papers.

---

## Primary Audience

Primary audiences include:
- manufacturer market access teams,
- reimbursement and policy stakeholders,
- government affairs professionals,
- commercialization teams,
- readers seeking sharp analysis of current policy or access developments.

Secondary audiences include:
- recruiters,
- partners,
- general professional readers looking to assess analytical quality.

---

## Primary Reader Questions to Answer

1. What happened, changed, or matters here?
2. Why is it important?
3. What are the practical implications?
4. What should a sophisticated reader understand after reading this?

---

## Editorial Standard

Insight articles must feel:
- analytical,
- concise,
- credible,
- commercially relevant,
- policy-literate,
- easy to scan.

They must not feel:
- bloated,
- academic for its own sake,
- generic,
- overly visual,
- under-sourced,
- like unstructured blog posts.

---

## Recommended Length

Typical target:
- approximately 700 to 1,500 words

Longer is acceptable only if the topic truly requires it.

The goal is disciplined depth, not length for its own sake.

---

## Required Structure

Use this default structure unless a strong editorial reason justifies a variation:

1. Title
2. Dek / Summary
3. Metadata row
4. Executive Summary
5. Key Takeaways
6. Optional Lead Visual
7. Main Analysis
8. Why It Matters / Implications
9. Conclusion
10. Sources / Citations
11. Optional Methodology Note

---

## Section Requirements

### 1. Title
The title should be:
- specific,
- analytically framed,
- clear,
- not clickbait.

Good titles should signal the actual subject and interpretive lens.

Avoid:
- vague thought-leadership titles,
- inflated rhetorical questions,
- generic policy commentary phrasing.

### 2. Dek / Summary
A short 1 to 2 sentence summary should explain:
- what the article is about,
- what the core point is.

This should support scanning and preview cards.

### 3. Metadata Row
Should include:
- publish date,
- category,
- optional tags,
- optional reading time if implemented.

Keep metadata visually restrained.

### 4. Executive Summary
Use a short opening summary, usually:
- 1 short paragraph, or
- 2 short paragraphs at most.

This should give the reader the thesis immediately.

### 5. Key Takeaways
This is strongly recommended for almost all Insight articles.

Use 3 to 5 short items summarizing:
- what changed,
- what matters,
- what the reader should retain.

This is one of the best scanability tools on the site.

### 6. Optional Lead Visual
A lead visual is optional, not mandatory.

Use one only if it materially improves comprehension.

Preferred lead visuals:
- comparison table,
- stakeholder impact table,
- policy timeline,
- simple chart,
- compact framework graphic.

Do not add a visual just to decorate the article.

### 7. Main Analysis
This is the core article body.

Use:
- clear section headings,
- short paragraphs,
- concise logic,
- direct interpretation,
- structured argument.

The body should move from:
- issue,
- to mechanism,
- to implication.

Avoid:
- long undifferentiated prose blocks,
- repeated restatement,
- dense unsupported assertions.

### 8. Why It Matters / Implications
This section is strongly recommended.

It should explain practical consequences for relevant audiences, such as:
- manufacturers,
- plans/payers,
- providers,
- policy teams,
- commercialization teams.

This can be presented as:
- prose,
- a callout box,
- a stakeholder table.

### 9. Conclusion
The conclusion should:
- reinforce the core thesis,
- keep the close concise,
- avoid repeating the article in full.

### 10. Sources / Citations
Insight articles should be sourced.

Source presentation may be:
- inline citations,
- endnotes,
- source list,
- linked reference list.

Use a consistent site-wide pattern.

### 11. Optional Methodology Note
Include only where relevant.

Useful when:
- interpreting data,
- summarizing a structured framework,
- drawing on specific datasets,
- using a defined analytical method.

Keep it concise.

---

## Visual Usage Rules

Visuals in Insight articles should support one of three purposes:

1. orientation,
2. comparison,
3. evidence.

If a visual does not do one of those jobs, do not include it.

### Best visual types for Insight articles
- Key Takeaways box
- Why It Matters panel
- stakeholder impact table
- before/after comparison table
- policy timeline
- one simple chart, if the topic is evidence-driven

### Avoid
- dashboard-like layouts,
- multiple charts competing on one page,
- decorative graphics,
- oversized figures that slow reading.

---

## Table Guidance

Tables are strongly encouraged when they improve clarity.

Good uses include:
- policy change vs practical implication,
- stakeholder differences,
- Part B vs Part D framing,
- coding/payment distinction,
- launch period vs mature market contrast.

Tables should:
- be concise,
- be readable on mobile where possible,
- have clear headers,
- include source notes if factual or data-driven.

---

## Citation Rules

Insight articles must be source-aware.

### Rules
- cite claims that rely on guidance, policy documents, data, or external facts,
- distinguish between sourced facts and interpretive judgment,
- keep source display clean and professional.

If the article is more interpretive than data-driven, citations may be lighter, but unsupported factual claims should still be avoided.

---

## Tone Rules

Insight articles should:
- lead with the point,
- avoid throat-clearing,
- sound informed and commercially aware,
- remain readable to sophisticated non-specialists.

Avoid:
- excessive jargon,
- academic detours,
- generic “leadership” phrasing,
- overstatement.

---

## Recommended MDX Components

Insight articles may use:
- `KeyTakeaways`
- `WhyItMatters`
- `ComparisonTable`
- `Figure`
- `Timeline`
- `MethodologyNote`
- `Callout`

Do not use too many components on one page.
Prefer one strong visual layer over several mediocre ones.

---

## Example MDX Pattern

```mdx
---
title: "Why Part D Redesign Changes Where Pressure Shows Up"
summary: "Benefit redesign improves beneficiary protection but changes where plans may express financial pressure."
publishDate: "2026-03-18"
category: "Medicare Policy"
tags:
  - Part D
  - IRA
  - Formulary
---

<KeyTakeaways
  items={[
    "Lower beneficiary exposure does not eliminate pressure, it changes where plans absorb it.",
    "Plans may respond through formulary and utilization management design.",
    "Manufacturers should expect access friction to matter more."
  ]}
/>

## The pressure does not disappear

Main analysis here.

<ComparisonTable
  columns={["Issue", "Before", "After", "Implication"]}
  rows={[
    ["Beneficiary liability", "Higher", "Lower", "Improved protection"],
    ["Plan exposure", "Lower in some cases", "Higher in redesigned benefit", "More incentive to manage access"],
    ["Commercial consequence", "Cost sharing visible", "Restrictions may matter more", "Access strategy becomes more important"]
  ]}
/>

<WhyItMatters
  items={[
    { label: "Manufacturers", text: "Expect pressure to emerge through access management." },
    { label: "Plans", text: "Risk management incentives become more operational." },
    { label: "Policy teams", text: "Observed effects should be assessed through access behavior, not statutory design alone." }
  ]}
/>

# Success Criteria

An Insight article is successful if:
	•	the main point is obvious quickly,
	•	the article is easy to scan,
	•	the practical implications are clear,
	•	any visual included genuinely improves understanding,
	•	the piece feels serious, specific, and well controlled,
	•	the article reinforces the site’s authority.