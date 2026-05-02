# SPUF Analysis Opportunities

Generated: 2026-04-22 (America/New_York)

## Analytical feasibility summary
- [Observed] Dataset support is strongest for two QoQ windows:
  - `2025Q3_to_2025Q4` (stable matched panel, lower churn)
  - `2025Q4_to_2026Q1` (high churn regime, stronger need for decomposition)
- [Observed] Available data supports both short-form Insights and deeper Research formats.
- [Inference] Best narratives are those that separate repricing from churn and tier/UM movement.

## Candidate analyses (Phase 3)

| # | Analytical question | Required files | Sufficiency | Complexity | Recommended format | Commercial relevance |
|---|---|---|---|---|---|---|
| 1 | How much apparent unit-cost movement is true repricing versus composition churn? | `comparison/*/pricing_delta_summary.csv`, `pricing_delta_detail.parquet`, `analysis_full_parquet_metrics.json` | [Observed] sufficient | Medium | Insight | Prevents false pricing narratives in market access decisions |
| 2 | Which sponsors show high repricing intensity with low churn, versus high churn masking stable prices? | `published/analysis/pricing_signals/*/repricing_vs_churn_scorecard.csv`, `sponsor_pricing_brief.csv` | [Observed] sufficient | Medium | Insight | Helps prioritize payer negotiations and account strategy |
| 3 | Did formulary tier worsening increase for commoditized generics even when same-NDC prices were stable? | `analysis/generic_qoq/top_commoditized_tier_worsening_with_true_unit_price.csv`, `true_unit_price_product_concept_rollup.csv`, `tier_reallocation_generic_story.csv` | [Observed] sufficient | Medium | Research | Core evidence for access-friction vs net-price storyline |
| 4 | Where do tier shifts reflect mix shift versus same-NDC repricing? | `true_unit_price_product_concept_rollup.csv` flags: `manufacturer_mix_shift_dominant_flag`, `same_ndc_repricing_dominant_flag`; NDC rollups | [Observed] sufficient | High | Research | Reduces overclaiming, improves contract-response strategy |
| 5 | How much plan-level generic coverage contraction occurred QoQ? | `generic_qoq_summary.csv`, `generic_plan_level_changes.csv`, `generic_ndc_churn_detail.csv` | [Observed] sufficient | Medium | Insight | Signals launch and lifecycle access headwinds |
| 6 | Did UM intensity (PA/ST/QL) move with tier changes in top generic movers? | `basic_drugs_formulary_file_*`, `top_100_generic_movers_*`, `generic_rxcui_change_detail.csv` | [Observed] likely sufficient | High | Research | Connects formulary mechanics to field reimbursement burden |
| 7 | How do beneficiary cost design changes align with tier migration by plan type? | `beneficiary_cost_file_*`, `insulin_beneficiary_cost_file_*`, `plan_information_*`, `basic_drugs_formulary_*` | [Observed] sufficient but needs joins | High | Research | Frames patient affordability risk and adherence pressure |
| 8 | Is PBM channel steering visible in mail/retail network mix by plan type? | `analysis/pbm_channel_steering/2026Q1/*`, `pbm_map.csv`, `pharmacy_networks_file_*`, `plan_information_*` | [Observed] sufficient for cross-sectional view | Medium | Insight | Supports distribution and network strategy decisions |
| 9 | Which product families show broad market significance versus narrow outlier movement? | `confirmed_repricing_market_significance.csv/.md`, `repricing_vs_churn_scorecard.csv` | [Observed] sufficient | Low-Medium | Insight | Prioritizes portfolio surveillance and contracting focus |
| 10 | Do geographically concentrated plans show distinct access or pricing signals? | `plan_information_*`, `geographic_locator_*`, pricing and formulary joins | [Observed] partially sufficient | High | Research | Useful for regional market access planning |
| 11 | How do MA-PD and PDP patterns differ in pricing and network dynamics? | `plan_information_*`, `pbm_channel_summary.csv`, comparison outputs | [Observed] sufficient for directional findings | Medium | Insight | Supports segment-specific strategy and messaging |
| 12 | Are insulin-specific benefit structures diverging from broader beneficiary cost patterns? | `insulin_beneficiary_cost_file_*`, `beneficiary_cost_file_*`, plan metadata | [Observed] sufficient | Medium | Insight | High stakeholder relevance for affordability and policy |

## Strongest realistically supported analyses

### Tier 1 (highest confidence)
1. Repricing vs churn decomposition across the two QoQ windows.
2. Generic tier worsening with same-NDC controls.
3. Sponsor-level repricing/churn segmentation.
4. PBM channel steering cross-sectional readout (mail-retail mix).

### Tier 2 (good but join-heavy)
1. Beneficiary exposure and tier interaction by plan type.
2. UM intensification versus tier migration at product concept level.
3. Geographic variation with plan normalization.

## Practical implementation notes
- [Observed] For trustworthy claims, same-key matching should use `CONTRACT_ID + PLAN_ID + SEGMENT_ID + NDC + DAYS_SUPPLY`.
- [Observed] `2025Q4_to_2026Q1` has high add/drop churn; matched-only and all-rows results should both be shown.
- [Inference] For website-grade clarity, each article should include one explicit distortion-control panel: mix shift, churn, thin sample, or days-supply composition.

## Insight vs Research routing
- `Insight` is best when:
  - one clear claim,
  - one core table/chart,
  - low methodological overhead.
- `Research` is best when:
  - multiple joins,
  - decomposition logic (repricing vs mix/churn),
  - explicit methodology and caveat section required.
