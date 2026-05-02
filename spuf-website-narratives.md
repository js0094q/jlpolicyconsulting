# SPUF Website Narratives

Generated: 2026-04-22 (America/New_York)

## Evidence labeling used here
- **Observed**: directly visible in SPUF files or generated outputs.
- **Inferred**: reasonable interpretation from observed fields/aggregates.
- **Uncertain**: needs deeper validation before publication-strength claim.

## Ranked narrative candidates (Phase 4)

| Rank | Working Title | Type | Recommended Site Section | Category | Tags | Core Thesis | What the Data Appears to Show | Why It Matters | Who It Matters To | Evidence Needed | Suggested Table or Chart | Confidence | Risk of Overclaiming | Recommended Next Step |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Repricing vs Churn in Part D, Why the Headline Number Misleads | Research | Research | Healthcare Data Analysis | Part D, repricing, churn, methodology | Net movement is often churn-driven, not pure repricing | [Observed] `2025Q4_to_2026Q1` has high add/drop share and low matched share versus prior window | Better contract and access decisions depend on separating mechanisms | Manufacturer market access, payer strategy, policy teams | Pair-level matched/unmatched decomposition and sponsor stratification | Waterfall: total change split into repricing, adds, drops | High | Medium | Build matched-key decomposition figure and methodological note |
| 2 | Generic Tier Worsening with Stable Same-NDC Prices | Research | Research | Biosimilars and Generics | generics, tier migration, same-NDC | Access can worsen even when same-NDC unit prices are flat | [Observed] generic outputs show higher-tier migration and same-NDC controls | Supports access-friction narratives beyond simple price trend claims | Portfolio strategy, HEOR, payer account teams | Product-family validation and low-sample filtering | Scatter: net tier worsening vs same-NDC price change | High | Medium | Lock threshold rules and publish top validated product families |
| 3 | Sponsor Behavior Clusters, Repricing-Dominant vs Churn-Dominant | Insight | Insights | PBM and Formulary Dynamics | sponsors, repricing, churn | Sponsors separate into distinct behavioral clusters | [Observed] scorecards include repricing/churn ratios and sponsor-level rows | Allows account prioritization and tailored engagement strategies | Account directors, contracting teams | Outlier handling and sponsor-name normalization | Quadrant plot: repricing share vs churn share | High | Medium | Create top-20 sponsor cluster table |
| 4 | Part D Access Contraction in Generic Coverage Rows | Insight | Insights | Market Access Strategy | access contraction, generics, coverage | Coverage row churn suggests net contraction pressure for many generics | [Observed] generic summary has more dropped than added rows in window | Warns of launch and lifecycle access friction | Launch teams, payer policy teams | Distinguish true exits from remapping artifacts | Before/after bar: added vs dropped rows | Medium-High | Medium | Add same-RXCUI continuity check panel |
| 5 | PBM Mail-Retail Network Profiles in 2026Q1 | Insight | Insights | PBM and Formulary Dynamics | PBM, network, mail-order | Network fingerprints show PBM-specific channel signatures | [Observed] pbm channel outputs include mail/retail shares by plan | Distribution strategy and pharmacy channel planning | PBM strategy leads, channel teams | Validate assignment method and threshold sensitivity | Heatmap of PBM by plan type mail share | Medium | Low-Medium | Add sensitivity scenario around mail-dominant threshold |
| 6 | Benefit Design Shifts, Tier Cost Sharing versus Formulary Movement | Research | Research | Reimbursement | cost sharing, tiers, Part D | Tier movement and beneficiary cost design may move together | [Inferred] cost files and formulary tiers are jointly analyzable at plan/tier grain | Direct relevance for patient burden and adherence risk | Access and reimbursement strategy teams | Full join QA and days-supply normalization | Matrix: tier migration with cost-sharing deltas | Medium | Medium-High | Pilot one therapeutic/product slice first |
| 7 | MA-PD versus PDP, Different Access and Pricing Dynamics | Insight | Insights | Medicare Policy | MA-PD, PDP, Part D | Segment-level dynamics may diverge materially | [Observed] plan type fields and channel outputs support split views | Improves stakeholder-specific strategy by segment | Payer strategy, policy, commercialization | Segment-balanced normalization and suppression checks | Split panel chart by plan type | Medium | Medium | Produce side-by-side scorecard |
| 8 | When Price Is Flat but Access Moves, A Better Signal Framework | Insight | Insights | Healthcare Data Analysis | signal design, monitoring | Access signals should combine tier, UM, and churn, not price alone | [Observed] signal appendices and generic outputs already include these dimensions | Improves early-warning monitoring in competitive categories | Analytics leads, market access operations | Define a transparent composite scoring rule | Radar/table of signal components | Medium-High | Medium | Publish framework with one worked example |
| 9 | Regional Access Variation Using County and Region Linkages | Research | Research | Market Access Strategy | geography, regions, variation | Geography-linked plan structures can explain access variation | [Inferred] geographic locator can be joined to plan-level analysis | Region-aware strategy and field deployment value | Field strategy, policy, provider market teams | Robust geographic aggregation and suppression handling | Choropleth-style table with region deltas | Medium | Medium-High | Build a narrow region pilot |
| 10 | Indication-Based Coverage as an Early Restriction Signal | Insight | Insights | Medicare Policy | indication-based coverage, restrictions | Indication-specific coverage can flag targeted access controls | [Observed] indication-based files exist each quarter | Important for launch sequencing and evidence planning | Medical policy, HEOR, access teams | Validate row counts and interpretability by product class | Trend table of indication-coverage prevalence | Low-Medium | High | Conduct feasibility pass before publication commitment |

---

## Top 5 website-ready narrative concepts (Phase 5)

### 1) Final proposed title
**Are Part D Sponsors Moving Cheap Generics Up-Tier to Protect Economics?**

- Card summary (1-2 sentences): In the latest SPUF window, many low-cost generics show higher-tier placement while sponsor-level behavior remains heterogeneous. The evidence is consistent with economics protection through formulary design, but causal margin claims require caution.
- Executive summary paragraph: The central story is not just unit-cost volatility. In `2025Q4_to_2026Q1`, high panel churn and widespread repricing coincide with tier-worsening signals in selected low-cost generic concepts. Read together, these outputs support a working thesis that sponsors may be using tier placement as an economics lever when direct pricing signals are noisy. Publication language should separate what is observed from what is inferred.
- Key takeaways:
  - Higher-tier migration appears in selected low-cost generic concepts.
  - Same-NDC controls reduce false repricing narratives and keep the signal credible.
  - Sponsor behavior is not uniform, so economics pressure is distributed, not identical.
  - The margin-protection interpretation is plausible, but should be framed as inference.
- Target audience: Manufacturer market access and payer strategy teams.
- Proof needed: Pair-level decomposition table, low-cost generic tier-migration table, sponsor cluster examples, methods note on matching grain.
- Best fit: Deeper research article.
- Recommended visuals: Decomposition waterfall, low-cost-generic tier shift panel, sponsor quadrant chart.
- Suggested SEO title: `Part D Generic Tier Migration and Sponsor Economics Signals`
- Suggested SEO description: `SPUF-based analysis showing tier migration in low-cost generics and sponsor-level behavior consistent with economics protection under Part D pressure.`

### 2) Final proposed title
**Cheap Generic, Higher Tier, The New Part D Margin-Defense Pattern**

- Card summary (1-2 sentences): Selected low-cost generics are moving to less favorable tiers even when same-NDC pricing is stable. That pattern is consistent with sponsors offsetting economics pressure through access design.
- Executive summary paragraph: The generic QoQ artifacts show a repeatable split between same-NDC price behavior and tier-placement behavior. For publication, the thesis should be explicit: sponsors appear to be moving cheap generics up-tier to protect plan economics, with mix-shift and mapping caveats disclosed up front. This framing is commercially relevant because it links formulary mechanics to margin pressure without overstating causality.
- Key takeaways:
  - Low-cost generic tier worsening can occur without strong same-NDC inflation.
  - This pattern is consistent with economics protection via benefit design.
  - Product-family granularity is required to avoid overgeneralized claims.
  - Mix-shift and mapping artifacts must be disclosed explicitly.
- Target audience: Generic portfolio strategy and payer account teams.
- Proof needed: Product-family table with same-NDC controls, thresholded sample filter, caveat panel.
- Best fit: Deeper research article.
- Recommended visuals: Scatter plot (tier worsening vs same-NDC price change), top-family comparison table.
- Suggested SEO title: `Part D Low-Cost Generic Tier Worsening and Sponsor Economics`
- Suggested SEO description: `Evidence from SPUF quarter comparisons that low-cost generics moved to higher tiers even where same-NDC pricing was relatively stable.`

### 3) Final proposed title
**Which Sponsors Are Most Likely Using Tier Migration to Defend Margin?**

- Card summary (1-2 sentences): Sponsor clusters reveal where high churn and high repricing coexist with the strongest low-cost generic tier pressure. This gives a practical watchlist for likely margin-defense behavior.
- Executive summary paragraph: Sponsor scorecards and tier-migration outputs can be combined into a targeting lens. Repricing-dominant, churn-dominant, and mixed-high-activity sponsors do not carry the same risk of access tightening. The article should make one disciplined inference: where low-cost generic tier worsening and sponsor intensity overlap, margin-defense behavior is more plausible. It should also state clearly that this is a behavioral signal, not direct margin measurement.
- Key takeaways:
  - Sponsor-level variation is substantial and operationally actionable.
  - High churn alone is not enough, overlap with tier-worsening signals matters.
  - Cluster-based segmentation supports targeted payer strategy.
  - Outlier handling materially affects sponsor watchlists.
- Target audience: National account teams and market access leadership.
- Proof needed: Sponsor cluster chart, top-sponsor table, outlier sensitivity notes.
- Best fit: Short high-signal commentary (with one rigorous methods sidebar).
- Recommended visuals: 2x2 sponsor quadrant, sponsor-tier-pressure watchlist table.
- Suggested SEO title: `Part D Sponsor Clusters and Tier Migration Signals`
- Suggested SEO description: `Sponsor-level SPUF segmentation highlighting where low-cost generic tier worsening overlaps with repricing and churn intensity.`

### 4) Final proposed title
**PBM Network Fingerprints in 2026Q1, Mail-Retail Mix by Plan Type**

- Card summary (1-2 sentences): PBM-linked channel summaries show measurable differences in mail and retail orientation across plan populations. The pattern is useful for channel planning and operational assumptions.
- Executive summary paragraph: The PBM channel steering outputs provide a cross-sectional view of plan-level network composition with validated share checks. While the current run is quarter-specific rather than QoQ, it supports an evidence-based baseline for discussing distribution channel posture by PBM and plan type. Claims should remain descriptive and avoid inferring intent without longitudinal confirmation.
- Key takeaways:
  - Plan-level channel mix can be summarized consistently by PBM grouping.
  - Validation checks indicate internally coherent share arithmetic.
  - Cross-sectional differences are visible even without trend framing.
  - Threshold choices influence "mail-dominant" classification counts.
- Target audience: Channel strategy, payer contracting, distribution leaders.
- Proof needed: PBM-by-plan-type summary, threshold sensitivity check, unmapped sponsor disclosure.
- Best fit: Short high-signal commentary.
- Recommended visuals: PBM heatmap and ranked table of steering score.
- Suggested SEO title: `PBM Mail-Retail Network Mix in Part D (2026Q1)`
- Suggested SEO description: `Cross-sectional SPUF analysis of PBM-linked network composition and mail-retail share patterns in 2026Q1.`

### 5) Final proposed title
**Part D Generic Coverage Contraction, Signal or Artifact?**

- Card summary (1-2 sentences): Generic plan-NDC row drops exceed adds in the available window, but not all contraction signals mean true market withdrawal. A controlled read can separate material contraction from remapping noise.
- Executive summary paragraph: Generic summary outputs suggest net contraction in coverage rows over the observed window, with expansion counts materially lower than contraction counts. This is a strong candidate Insight if framed with explicit caveats on mapping, churn mechanics, and denominator effects. The piece should focus on what is observable and where interpretation uncertainty begins.
- Key takeaways:
  - Net row churn points to contraction pressure.
  - Contraction magnitude is sensitive to matching and classification rules.
  - A credibility-preserving caveat section is required.
  - Practical value lies in directional surveillance, not causal attribution.
- Target audience: Policy, market access, and commercialization teams.
- Proof needed: Add/drop decomposition with matched controls, artifact screen examples.
- Best fit: Short high-signal commentary.
- Recommended visuals: Added vs dropped bars and methodology callout box.
- Suggested SEO title: `Generic Coverage Contraction Signals in CMS Part D Data`
- Suggested SEO description: `Directional evidence of generic coverage contraction in SPUF quarter comparisons, with controls for churn and mapping artifacts.`

---

## Publishable draft outlines for top 3 narratives (Phase 6)

## A) Research Outline
### Title
Are Part D Sponsors Moving Cheap Generics Up-Tier to Protect Economics?

### Dek / Summary
Low-cost generic tier worsening appears alongside high sponsor activity in the latest SPUF window. We test whether that pattern is consistent with economics protection through formulary design.

### Executive Summary
- The latest quarter pair has a high-churn regime that can mask or exaggerate pricing narratives.
- Low-cost generic tier worsening is visible in selected concepts under same-NDC controls.
- The economics-protection thesis is inferential and requires transparent guardrails.

### Research Question / Thesis
Are sponsors moving low-cost generics to higher tiers in a way that is consistent with offsetting economics pressure, after controlling for same-NDC pricing and panel churn?

### Lead Figure or Table
- Lead figure: decomposition waterfall for each quarter pair plus a low-cost-generic tier-shift panel.
- Companion table: matched share, add/drop share, repriced share, and net higher-tier share for selected low-cost concepts.

### Key Findings
- Pair-level continuity differs materially and changes interpretation.
- Selected low-cost generics show tier worsening even with constrained same-NDC price movement.
- Sponsor-level patterns are heterogeneous and clusterable.
- The margin-defense interpretation is supported as inference, not as proven causal fact.

### Main Analysis
1. Data scope, quarter mapping, and matching grain.
2. Pair 1 results (`2025Q3_to_2025Q4`): stability baseline.
3. Pair 2 results (`2025Q4_to_2026Q1`): high-churn and high-activity regime.
4. Low-cost generic tier-migration evidence under same-NDC controls.
5. Sponsor clustering and overlap with tier-pressure signals.
6. Distortion checks: mix shift, days-supply composition, sparse strata.

### Practical Implications
- Contracting teams should monitor tier mechanics and sponsor activity together, not in separate dashboards.
- Monitoring frameworks should report matched/all-rows decomposition and low-cost-generic tier pressure together.

### Methodology / Source Notes
- Matching key definition and exclusion logic.
- Treatment of add/drop rows.
- Handling of outliers and percentile summaries.

### Conclusion
A decomposition-plus-tier lens supports a credible thesis that some sponsors may be using low-cost generic tier migration to protect economics under pressure.

### Sources / Citations
- `data/comparison/*/pricing_delta_summary.csv`
- `data/comparison/*/pricing_delta_detail.parquet`
- `data/analysis_full_parquet_metrics.json`
- `data/published/analysis/pricing_signals/*`

## B) Research Outline
### Title
Cheap Generic, Higher Tier, Testing a Margin-Defense Access Pattern

### Dek / Summary
Selected low-cost generics show higher-tier placement despite constrained same-NDC price movement. The pattern is consistent with economics protection via access design.

### Executive Summary
- Tier movement and same-NDC price movement diverge in key low-cost concepts.
- Same-NDC controls are required for publish-safe interpretation.
- The margin-defense framing is plausible but must remain inferential.

### Research Question / Thesis
Do observed low-cost generic tier deteriorations reflect a sponsor margin-defense pattern, or are they primarily explained by mix shift and remapping artifacts?

### Lead Figure or Table
- Scatter: net higher-tier share vs same-NDC percent change.
- Table: top product concepts by net tier worsening with dominance flags.

### Key Findings
- Multiple low-cost concepts show higher-tier movement with limited same-NDC inflation.
- Mix-shift dominant and repricing-dominant cases can be separated.
- Coverage contraction and tier migration can co-occur in the same concepts.

### Main Analysis
1. Product concept construction and quarter alignment.
2. Same-NDC control methodology.
3. Tier-distribution movement by concept.
4. Mix-shift dominant versus repricing-dominant segmentation.
5. Sensitivity checks and minimum sample thresholds.

### Practical Implications
- Access strategy should treat low-cost generic tier movement as an economics risk signal, not a formatting artifact.
- Payer engagement packets should combine same-NDC controls with tier-distribution evidence.

### Methodology / Source Notes
- Generic classification logic and fallback rules.
- Matching and threshold rules.
- Caveats around concept-level mapping.

### Conclusion
Low-cost generic access deterioration can be visible even when same-NDC pricing looks stable, so a margin-defense hypothesis is decision-useful when framed with explicit caveats.

### Sources / Citations
- `data/analysis/generic_qoq/2025Q4_to_2026Q1/*`
- `data/extracted/*/(basic_formulary, plan_information, pricing)`
- `ndcxls/product.xls`, `ndcxls/package.xls`

## C) Insight Outline
### Title
Sponsor Margin-Defense Watchlist, Where Tier Pressure and Activity Overlap

### Dek / Summary
Sponsor-level clusters show where repricing intensity, churn intensity, and low-cost generic tier pressure overlap. That overlap is the practical watchlist for likely economics-defense behavior.

### Executive Summary
Sponsors in recent SPUF comparisons do not move as one market. A targeted watchlist emerges when sponsor activity clusters are combined with low-cost generic tier-worsening signals.

### Key Takeaways
- Sponsor behavior is heterogeneous and classifiable.
- Repricing and churn should be interpreted as separate dimensions, then linked to tier-pressure signals.
- Outlier review is required before high-confidence sponsor ranking claims.
- Practical value comes from a watchlist approach, not leaderboard storytelling.

### Main Analysis
1. Define the two dimensions: repricing share and churn share.
2. Overlay low-cost generic tier-pressure indicators on sponsor clusters.
3. Build sponsor watchlist tiers: high, medium, monitor.
4. Highlight strategy implications for each watchlist tier.
5. Add caveat panel for sparse-plan sponsors and naming normalization.

### Why It Matters / Implications
Watchlist-aware strategy improves account prioritization and reduces false escalation from undifferentiated market averages.

### Conclusion
A sponsor-cluster view is a credible, commercially useful way to interpret Part D movement without overclaiming causal intent.

### Sources / Citations
- `data/published/analysis/pricing_signals/*/repricing_vs_churn_scorecard.csv`
- `data/published/analysis/pricing_signals/*/sponsor_pricing_brief.csv`
- `data/comparison/*/pricing_delta_summary.csv`

### Optional Methodology Note
Include the exact matching grain and an outlier-treatment note in a compact sidebar.
