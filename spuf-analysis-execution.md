# SPUF Analysis Execution

Generated: 2026-04-22

## Scope completed
The following requested analyses were executed against local SPUF pipeline artifacts and extracted files:
1. Repricing vs churn decomposition by quarter pair.
2. Generic tier worsening with same-NDC controls.
3. Sponsor segmentation into repricing-dominant vs churn-dominant patterns.
4. PBM mail/retail channel profiling.
5. Beneficiary cost-sharing and tier movement linkage.

## 1) Repricing vs churn decomposition by quarter pair

### Observed
- `2025Q3_to_2025Q4`:
  - matched share: `0.944833`
  - add/drop share: `0.055167`
  - repriced share of matched: `0.697269`
- `2025Q4_to_2026Q1`:
  - matched share: `0.598137`
  - add/drop share: `0.401863`
  - repriced share of matched: `0.957862`

### Interpretation
- The first window behaves like a high-continuity panel.
- The second window has materially higher composition churn and should not be interpreted with headline price deltas alone.

### Caveat
- This is descriptive decomposition, not causal attribution.

## 2) Generic tier worsening with same-NDC controls

### Observed
- Top-25 product-concept table built from `top_commoditized_tier_worsening_with_true_unit_price.csv`.
- Net higher-tier share and same-NDC percent change were retained side-by-side.
- Dominance flags were carried through:
  - `same_ndc_repricing_dominant_flag`
  - `manufacturer_mix_shift_dominant_flag`

### Interpretation
- Multiple concepts show upward tier pressure while same-NDC change is modest or mixed.
- This supports an access-friction narrative that is not reducible to simple price trend alone.

### Caveat
- Product-concept mapping and thresholding require explicit disclosure in publication drafts.

## 3) Sponsor segmentation (repricing vs churn)

### Method
- Base source: `repricing_vs_churn_scorecard.csv` (`2025Q4_to_2026Q1`, sponsor rows).
- Filters: sponsors with `matched_rows >= 10,000`.
- Segment rules:
  - `repricing_dominant`: repricing share >= 0.90 and churn share <= 0.25
  - `churn_dominant`: churn share >= 0.45
  - `mixed_high_activity`: repricing share >= 0.85 and churn share > 0.25
  - `mixed_moderate`: otherwise

### Observed segment counts
- `repricing_dominant`: 185
- `churn_dominant`: 111
- `mixed_high_activity`: 110
- `mixed_moderate`: 20

### Interpretation
- Sponsor behavior is heterogeneous and clusterable.

### Caveat
- Segment labels are analytic heuristics, not behavioral intent claims.

## 4) PBM mail/retail channel profiling

### Observed
- Profile extracted from `analysis/pbm_channel_steering/2026Q1/pbm_channel_summary.csv`.
- Retained fields: PBM, plan type, plan count, average mail share, average retail share, mail-dominant rate, steering score.

### Interpretation
- Cross-sectional PBM channel signature data is strong enough for a high-signal Insight article.

### Caveat
- Current output is cross-sectional in one quarter, not a longitudinal trend.

## 5) Beneficiary cost-sharing and tier movement linkage

### Method
- Joined plan to formulary via `plan_information` (`CONTRACT_ID + PLAN_ID + SEGMENT_ID -> FORMULARY_ID`).
- Counted formulary NDC rows by `FORMULARY_ID + TIER_LEVEL_VALUE` from basic formulary files.
- Aggregated beneficiary cost file by `plan + tier` with median preferred cost amount and deductible-applies share.
- Compared tier-level metrics between `2025Q4` and `2026Q1`.

### Observed
- Tier-level linked formulary row counts are available for all major tiers.
- Deductible-applies share increased materially in tiers 3 to 5 between these quarters in the derived aggregation.
- Median preferred cost amount fields were largely zero in this specific extraction path, limiting direct cost-level interpretation.

### Interpretation
- Data supports a structured linkage analysis, but cost-amount signal quality is uneven and needs tighter field validation.

### Caveat
- This stream is analytically feasible but should be framed as a controlled, methods-forward analysis rather than a simple cost trend claim.

## Best website stories (executed selection)
1. Repricing vs churn in Part D.
2. Generic access friction despite stable same-NDC pricing.
3. Sponsor behavioral clustering.
4. Generic coverage contraction signals.
5. PBM network/channel fingerprints.

## Output data files produced
- `output/exports/spuf-analysis-package/data/repricing_churn_decomposition.csv`
- `output/exports/spuf-analysis-package/data/generic_tier_worsening_top25.csv`
- `output/exports/spuf-analysis-package/data/sponsor_segmentation_2025Q4_to_2026Q1.csv`
- `output/exports/spuf-analysis-package/data/sponsor_segmentation_summary.csv`
- `output/exports/spuf-analysis-package/data/pbm_channel_profile_2026Q1.csv`
- `output/exports/spuf-analysis-package/data/beneficiary_tier_linkage_q4_to_q1.csv`
- `output/exports/spuf-analysis-package/data/beneficiary_tier_linkage_delta_q4_to_q1.csv`
