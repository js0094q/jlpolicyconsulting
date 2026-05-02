# Codex Task: Refine Adrabetadex Provider Net-Cost Recovery Calculator and Add PDF Output Capability

## 1. Objective
Refine the existing workbook into a reliable reimbursement-readiness and provider economics planning tool for ARMs.
- Workbook remains the live source-of-truth model.
- PDF remains a static provider-facing leave-behind generated from `Scenario Inputs` and rendered from the dedicated `PDF Output` worksheet.

## 2. Source Files
- `Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx`
- `README_Adrabetadex_Provider_Net_Cost_Recovery_Calculator.md`

## 3. Workbook Architecture (Preserved)
1. `Instructions`
2. `Assumptions`
3. `Scenario Inputs`
4. `Calculator`
5. `Scenario Summary`
6. `PDF Output`
7. `Reference`

## 4. Fixed Assumptions (Preserve)
- WAC: `$39,000` per 900 mg vial
- Dosing cadence: every 2 weeks
- Annual administrations: `26`
- Pre-ASP administrations: `13`
- Pre-ASP benchmark: `103%` of WAC
- OPPS pass-through date: `1/1/2027`
- Permanent HCPCS date: `4/1/2027`

## 5. 340B Labels (Preserve)
- `Primary 23.1%`

Note: this is a scenario assumption, not a universal 340B acquisition-cost rule. Active dropdowns and presets now use the current working assumption of `Primary 23.1%`.

## 6. Scenario Logic Requirements
- Categorical presets drive site, payer, coding, sourcing selections.
- Numeric presets drive operational/economic defaults.
- Manual override applies only when populated.
- Active values are visible and auditable.
- Active source must display:
  - `Preset`
  - `Manual Override`
  - `Blank / Review Required`

Required labels:
- `Preset Value`
- `Manual Override`
- `Active Value`
- `Active Source`

## 7. Numeric Presets (Preserve)
1. `Base Case: 340B COE HOPD, Buy-and-Bill`
2. `Conservative Case: Launch Friction / Manual Review`
3. `White-Bagging Case`

## 8. Default Active Numeric Set
- White-bagging percentage: `0%`
- Denial rate: `7.5%`
- Appeal recovery rate: `60%`
- Days to payment: `75`
- Labor cost per administration: `$750`
- Pharmacy handling cost per administration: `$400`
- Billing/admin cost per administration: `$300`
- Other non-drug operating cost: `$250`
- Procedure revenue per administration: `$500`
- Wastage cost per administration: `$0`
- Financing rate: `8%`
- Manufacturer support per administration: `$0`
- Manual allowed amount: `$40,170`
- Contracted rate: `$39,000`
- AWP: `$46,800`
- ASP: `$37,050`
- Manual 340B acquisition: `$29,991`
- Reimbursement percentage: `103%`

## 9. Calculation Engine Requirements
Maintain formula-driven outputs for:
- acquisition cost per administration;
- allowed amount per administration;
- expected reimbursement after denial/appeal effects;
- net drug margin;
- non-drug operating cost;
- procedure revenue offset;
- financing cost linked to days-to-payment;
- provider net-cost recovery per administration;
- annualized recovery/exposure;
- pre-ASP cash exposure;
- white-bagging buy-and-bill impact;
- risk flags for negative/uncertain recovery.

## 10. PDF Output Requirements
One-page provider-facing summary including:
1. Scenario Summary
2. Provider Economics Snapshot
3. Cash-Flow and Risk View
4. ARM Talking Points
5. Caveat / Disclaimer

The page should be plain-English and non-technical.

## 11. PDF Export Workflow (Implemented)
Use:
`./output/exports/adrabetadex_provider_net_cost_recovery_calculator/export_arm_summary_pdf.sh`

Workflow:
1. Render active `PDF Output` from workbook.
2. Use the in-workbook `Create PDF Output` button to open the export script, or run the script from Terminal.
3. Render `PDF Output` as a cropped raster image for stable client-ready one-page output.
4. Filename pattern:
`Adrabetadex_ARM_Output_<ScenarioName>_<YYYY-MM-DD>.pdf`
5. Fail clearly if export cannot run.

## 12. PDF Quality Standard
- One page
- Legible for print/screen
- Includes active scenario and economics summary
- Includes caveats/disclaimer
- Excludes calculation-engine detail

## 13. Validation Protocol
Run and verify:
1. Base Case
2. Conservative Case
3. White-Bagging Case
4. Manual numeric override populated
5. No manual override populated

For each check, verify:
- active values update correctly;
- formulas remain intact;
- `Scenario Summary`/`PDF Output` update correctly;
- PDF export uses active scenario;
- PDF is one page;
- output formatting is correct.

## 14. Deliverables
1. Updated workbook
2. Updated README
3. Generated sample PDF from default active scenario
4. Brief change log
5. Validation summary (pass/fail/not run)

## 15. Positioning Guardrail
Do not claim reimbursement certainty.
Do not claim payer behavior prediction.
Position this model as reimbursement-readiness and provider economics planning support.
