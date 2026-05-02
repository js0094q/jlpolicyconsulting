# SPUF Directory Inventory

Generated: 2026-04-22 (America/New_York)

## Scope and method
- [Observed] Inspected `/Volumes/SPUF/` with low-memory methods: directory walk, file names, sizes, header/schema sampling, ZIP member checks, and existing inventory files.
- [Observed] Avoided full-load parsing of multi-GB text files.
- [Observed] Used existing pipeline inventory (`data/inventory/pricing_file_inventory.csv`) where available to avoid redundant heavy scans.
- [Uncertain] Some hidden/system directories (`.Spotlight-V100`, `.Trashes`, `.DocumentRevisions-V100`, `.TemporaryItems`) are inaccessible and were not inventoried.

## 1) Directory reality

### Top-level structure in `/Volumes/SPUF/`
- [Observed] Data and code are mixed in one volume.
- [Observed] Key data-bearing areas:
  - `SPUF_2025_20250703` (raw quarter ZIP bundle for `PPUF_2025Q2`)
  - `SPUF_2025_20251009` (raw quarter ZIP bundle for `PPUF_2025Q3`)
  - `Quarterly Prescription Drug Plan Formulary, Pharmacy Network, and Pricing Information/2025-Q4/SPUF_2026_20260107` (raw quarter ZIP bundle for `PPUF_2025Q4`)
  - `cms_partd_pricing_pipeline/data/*` (raw, extracted, normalized, comparison, analysis, exports)
  - `ndcxls/product.xls`, `ndcxls/package.xls` (NDC reference)
- [Observed] Non-target content also present: environment trees, odds project, checkpoints, and code.

### Quarters present
- [Observed] Raw CMS/SPUF bundles present for source quarters:
  - `PPUF_2025Q2`
  - `PPUF_2025Q3`
  - `PPUF_2025Q4`
- [Observed] Pipeline canonical quarter labels in `cms_partd_pricing_pipeline/data`: `2025Q3`, `2025Q4`, `2026Q1`.
- [Observed] Canonical label maps to prior source-file quarter in extracted paths:
  - `2025Q3` uses `PPUF_2025Q2` files
  - `2025Q4` uses `PPUF_2025Q3` files
  - `2026Q1` uses `PPUF_2025Q4` files
- [Inference] This is a publication-label convention in the local pipeline, not missing data.

### Format presence (data-bearing paths)
- [Observed] Primary analytical formats: `.zip`, `.txt` (pipe-delimited), `.csv`, `.parquet`, `.xlsx`, `.json`, plus two `.xls` reference files.
- [Observed] Multi-part pharmacy network files dominate storage (6 parts per quarter, each ~2.4 GB to ~4.2 GB unzipped text).

## 2) Quarter completeness for QoQ work

### Raw bundle completeness by source quarter
- [Observed] `PPUF_2025Q2`, `PPUF_2025Q3`, `PPUF_2025Q4` each include the same 15-file group:
  - pricing file (1)
  - plan information (1)
  - basic formulary (1)
  - excluded formulary (1)
  - indication-based formulary (1)
  - beneficiary cost (1)
  - insulin beneficiary cost (1)
  - geographic locator (1)
  - pharmacy networks parts 1..6 (6)
  - sample files (1)
- [Observed] Typical compressed size profile per quarter:
  - Pharmacy networks parts combined: ~2.13 to ~2.33 GB
  - Pricing ZIP: ~208 MB to ~222 MB
  - All other files: much smaller

### Extracted completeness by canonical quarter (`data/extracted`)
- [Observed] For each of `2025Q3`, `2025Q4`, `2026Q1`:
  - One full pricing TXT
  - One full plan information TXT
  - One full basic formulary TXT
  - One full excluded formulary TXT
  - One full indication-based coverage TXT
  - One full beneficiary cost TXT
  - One full insulin cost TXT
  - One full geographic locator TXT
  - Six full pharmacy network TXT parts
  - One sample-files directory with per-file samples
  - One nested source ZIP directory copy
- [Observed] `pricing_file_inventory.csv` records headers and byte sizes for these files.

### Completeness conclusion
- [Inference] Directory content is complete enough for robust quarter-over-quarter descriptive analysis across:
  - pricing change,
  - plan/NDC churn,
  - formulary tier movement,
  - utilization-management proxy indicators,
  - beneficiary cost design signals,
  - network structure/mail-retail mix.
- [Uncertain] Causal attribution remains limited without additional external controls (enrollment, utilization, claims volume, market events).

## 3) Schema and file-group notes

### Core headers (from local inventory and file samples)
- `pricing_file_*`: `CONTRACT_ID, PLAN_ID, SEGMENT_ID, NDC, DAYS_SUPPLY, UNIT_COST`
- `plan_information_*`: `CONTRACT_ID, PLAN_ID, SEGMENT_ID, CONTRACT_NAME, PLAN_NAME, FORMULARY_ID, PREMIUM, DEDUCTIBLE, ...`
- `basic_drugs_formulary_*`: `FORMULARY_ID, FORMULARY_VERSION, CONTRACT_YEAR, RXCUI, NDC, TIER_LEVEL_VALUE, QUANTITY_LIMIT_YN, PRIOR_AUTHORIZATION_YN, STEP_THERAPY_YN, ...`
- `excluded_drugs_formulary_*`: `CONTRACT_ID, PLAN_ID, RXCUI, TIER, QUANTITY_LIMIT_YN, PRIOR_AUTH_YN, STEP_THERAPY_YN, ...`
- `beneficiary_cost_file_*`: tier-level cost fields by preferred/non-preferred and mail/non-mail channels
- `insulin_beneficiary_cost_*`: insulin-specific copay/coinsurance fields
- `pharmacy_networks_file_*`: pharmacy-level rows with preferred flags, mail/retail flags, floor price, dispensing fee fields
- `geographic_locator_*`: county/state/region crosswalks

## 4) Usable data manifest (Phase 2)

Legend for `Quarter` column:
- `Source quarter` = quarter named in file (example: `PPUF_2025Q3`)
- `Pipeline label` = canonical local label (example: `2025Q4`)

| Quarter | File name | Inferred dataset type | Format | Size | Likely join keys | Likely analytical use | Readiness |
|---|---|---|---|---:|---|---|---|
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `pricing_file_PPUF_2025Q2.txt` | Plan-NDC pricing | TXT (pipe) | 1.93 GB | `CONTRACT_ID, PLAN_ID, SEGMENT_ID, NDC, DAYS_SUPPLY` | Unit-cost changes, repricing vs churn | ready |
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `plan_information_PPUF_2025Q2.txt` | Plan attributes | TXT (pipe) | 13.97 MB | `CONTRACT_ID, PLAN_ID, SEGMENT_ID`, `FORMULARY_ID` | Premium/deductible context, sponsor/plan naming | ready |
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `basic_drugs_formulary_file_PPUF_2025Q2.txt` | Formulary placement and UM | TXT (pipe) | 65.31 MB | `FORMULARY_ID + NDC` and `RXCUI` | Tier migration, PA/ST/QL trend | ready |
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `beneficiary_cost_file_PPUF_2025Q2.txt` | Benefit design cost-sharing | TXT (pipe) | 9.37 MB | `CONTRACT_ID, PLAN_ID, SEGMENT_ID, TIER, DAYS_SUPPLY` | OOP exposure patterns by tier/channel | ready |
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `insulin_beneficiary_cost_file_PPUF_2025Q2.txt` | Insulin-specific cost-sharing | TXT (pipe) | 1.49 MB | `CONTRACT_ID, PLAN_ID, SEGMENT_ID, TIER, DAYS_SUPPLY` | Insulin benefit design shifts | ready |
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `pharmacy_networks_file_PPUF_2025Q2_part_1..6.txt` | Network topology and preferred status | TXT (pipe, 6 parts) | 21.32 GB total | `CONTRACT_ID, PLAN_ID, SEGMENT_ID, PHARMACY_NUMBER` | Mail vs retail orientation, PBM channel signals | usable with cleaning |
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `excluded_drugs_formulary_file_PPUF_2025Q2.txt` | Exclusion and UM flags | TXT (pipe) | 0.46 MB | `CONTRACT_ID, PLAN_ID, RXCUI` | Exclusion intensity patterns | ready |
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `Indication_Based_Coverage_Formulary_File_PPUF_2025Q2.txt` | Indication-based coverage | TXT (pipe) | 0.03 MB | `CONTRACT_ID, PLAN_ID, RXCUI` | Indication-restricted access tracking | usable with cleaning |
| Source: `PPUF_2025Q2` / Pipeline: `2025Q3` | `geographic_locator_file_PPUF_2025Q2.txt` | Geography crosswalk | TXT (pipe) | 0.29 MB | `COUNTY_CODE`, region codes | Regional variation framing | ready |
| Source: `PPUF_2025Q3` / Pipeline: `2025Q4` | Same file groups as above (`...2025Q3...`) | Same as above | TXT (pipe) | Similar scale (pricing 1.94 GB, network 20.92 GB) | Same keys | QoQ continuation | ready |
| Source: `PPUF_2025Q4` / Pipeline: `2026Q1` | Same file groups as above (`...2025Q4...`) | Same as above | TXT (pipe) | Similar scale (pricing 1.85 GB, network 21.45 GB) | Same keys | QoQ continuation | ready |
| Pair: `2025Q3_to_2025Q4` | `comparison/.../pricing_delta_summary.csv` | Aggregated delta metrics | CSV | small | Pair + grouping columns | Fast storyline scaffolding, executive metrics | ready |
| Pair: `2025Q3_to_2025Q4` | `comparison/.../pricing_delta_detail.parquet` | Row-level deltas | Parquet | large | pricing grain keys | Deep repricing/churn analysis | ready |
| Pair: `2025Q4_to_2026Q1` | `comparison/.../pricing_delta_summary.csv` | Aggregated delta metrics | CSV | small | Pair + grouping columns | Detect regime shift between periods | ready |
| Pair: `2025Q4_to_2026Q1` | `comparison/.../pricing_delta_detail.parquet` | Row-level deltas | Parquet | large | pricing grain keys | High-fidelity movement decomposition | ready |
| Multi-quarter | `published/pricing/pricing_normalized.parquet` | Combined normalized pricing | Parquet | large | pricing grain + `quarter` | Cross-quarter trend and segmentation | ready |
| Multi-quarter | `published/pricing/pricing_qa_sample.csv` | QA sample of normalized pricing | CSV | small | includes source path | Validation and auditability narrative | ready |
| Multi-quarter | `analysis_full_parquet_metrics.json` | Precomputed QoQ metrics | JSON | 57 KB | pair labels | Claim support for repricing/churn magnitude | ready |
| Pair: `2025Q3_to_2025Q4`, `2025Q4_to_2026Q1` | `published/analysis/pricing_signals/*` CSVs | Repricing vs churn scorecards and sponsor briefs | CSV | small | sponsor, pair | Payer behavior and sponsor-level narratives | ready |
| Quarter: `2026Q1` | `analysis/pbm_channel_steering/2026Q1/*` | PBM/mail-retail channel outputs | CSV/JSON | small-medium | plan keys + PBM mapping | Channel steering and network behavior | ready |
| Pair: `2025Q4_to_2026Q1` | `analysis/generic_qoq/...` (summary, story, rollups) | Generic access/tier/repricing analytics | CSV/MD/JSON/XLSX | mixed | product concept, RXCUI, NDC, plan | Generic/biosimilar access narratives | ready |
| Reference | `ndcxls/product.xls`, `ndcxls/package.xls` | NDC product/package metadata | XLS | small | NDC, labeler/product codes | Same-NDC matching and mix-shift control | usable with cleaning |
| Pipeline data area | `normalized/pricing/path/to/venv/...` | Non-dataset payload (embedded env files) | mixed | ~0.10 GB | N/A | Not analytically useful | likely not needed for website narratives |

## 5) High-value dataset clusters for website content
- [Observed] Strong for formulary tier placement and UM:
  - `basic_drugs_formulary_file_*`
  - `excluded_drugs_formulary_file_*`
  - generic QoQ outputs under `analysis/generic_qoq/*`
- [Observed] Strong for beneficiary cost sharing:
  - `beneficiary_cost_file_*`
  - `insulin_beneficiary_cost_file_*`
- [Observed] Strong for plan information and geographic variation:
  - `plan_information_*`
  - `geographic_locator_file_*`
- [Observed] Strong for network structure and PBM signals:
  - `pharmacy_networks_file_*`
  - `analysis/pbm_channel_steering/*`
- [Observed] Strong for pricing fields and plan-level shifts:
  - `pricing_file_*`
  - `comparison/*/pricing_delta_*`
  - `published/analysis/pricing_signals/*`

## 6) Open limitations and caveats
- [Observed] Quarter labels in pipeline (`2025Q3`, `2025Q4`, `2026Q1`) are offset relative to source-file quarter names (`PPUF_2025Q2`, `PPUF_2025Q3`, `PPUF_2025Q4`).
- [Inference] Naive quarter-on-quarter comparisons can overstate repricing if churn/mix is not separated.
- [Observed] `2025Q4_to_2026Q1` pair has much lower matched-share and much higher add/drop churn than `2025Q3_to_2025Q4`, so same-NDC / same-plan normalization is essential.
- [Uncertain] Without external enrollment/claims context, business impact should be framed as access/pricing signal, not realized spend impact.
