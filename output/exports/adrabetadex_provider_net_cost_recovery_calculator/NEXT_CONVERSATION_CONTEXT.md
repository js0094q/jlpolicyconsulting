# Next Conversation Context: Adrabetadex Net-Cost Recovery Calculator

## Repository and Boundaries

- Working directory: `/Users/josephstewart/Documents/JLPolicyConsulting`
- Package folder: `output/exports/adrabetadex_provider_net_cost_recovery_calculator/`
- This folder is generated/export material, not active website runtime source.
- Do not touch `docs/archive/` or active website source unless the new task explicitly asks for it.
- Keep the calculator provider-facing, cautious, and planning-oriented. Do not imply reimbursement certainty.

## Current Artifacts

- Workbook: `output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx`
- Current generated PDF: `output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_ARM_Output_Base_Case_340B_COE_HOPD_Buy_and_Bill_2026-05-02.pdf`
- PDF export script: `output/exports/adrabetadex_provider_net_cost_recovery_calculator/export_arm_summary_pdf.sh`
- PDF render script: `output/exports/adrabetadex_provider_net_cost_recovery_calculator/render_arm_output_for_pdf.mjs`
- PDF assembly script: `output/exports/adrabetadex_provider_net_cost_recovery_calculator/generate_arm_pdf_from_png.py`
- Package README: `output/exports/adrabetadex_provider_net_cost_recovery_calculator/README_Adrabetadex_Provider_Net_Cost_Recovery_Calculator.md`
- Latest PDF metadata: `output/exports/adrabetadex_provider_net_cost_recovery_calculator/arm_pdf_meta.json`

## Workbook State After Latest Fix

- Tabs: `Instructions`, `Assumptions`, `Scenario Inputs`, `Calculator`, `Scenario Summary`, `PDF Output`, `Reference`.
- `Scenario Inputs!B5:B15` manual overrides were cleared.
- `Scenario Inputs!D5:D15` now use preset values when manual overrides are blank.
- `Scenario Inputs!E5:E15` now show `Active Source`, currently `Preset`.
- `Scenario Inputs!B2` dropdown now points to the actual scenario table range: `'Scenario Inputs'!$A$32:$A$40`.
- Active 340B acquisition assumption is `Primary 23.1%`.
- Active workbook/package text no longer contains `Pediatric` or `17.1`.
- `PDF Output!B6` is formatted as a date and cached as `2026-05-02` after recalculation.
- Formula cells remain unlocked/protection-disabled per user instruction: "dont need to be locked yet."
- In-workbook `Create PDF Output` hyperlink-style buttons point to `export_arm_summary_pdf.sh`.

## Current Base-Case Cached Outputs

After LibreOffice recalculation:

- `PDF Output!B20` net operating margin per dose: `7535.26726027397`
- `PDF Output!B28` annual net operating margin: `195916.948767123`
- `Scenario Inputs!D5:D15`: `HOPD`, `Medicare`, `Yes`, `Carve-out`, `Pass-through active`, `Active`, `Buy-and-bill`, `Pre-ASP`, `WAC %`, `Primary 23.1%`, `Confirmed`
- `Scenario Inputs!E5:E15`: all `Preset`

## Validation Already Run

Commands/checks completed in the prior conversation:

```bash
./output/exports/adrabetadex_provider_net_cost_recovery_calculator/export_arm_summary_pdf.sh \
  output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx \
  output/exports/adrabetadex_provider_net_cost_recovery_calculator
```

```bash
pdfinfo output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_ARM_Output_Base_Case_340B_COE_HOPD_Buy_and_Bill_2026-05-02.pdf
```

Verified:

- No `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, or `#N/A` markers.
- No remaining `17.1` / `Pediatric` active package text.
- Cached formula values are present after recalculation.
- PDF is 1 page, letter landscape.
- PDF preview was visually inspected after rerendering.

## Important Implementation Notes

- LibreOffice recalculation was used because the workbook initially saved formulas without cached values.
- Recalculating from a temp folder can rewrite hyperlink targets toward `/tmp`; repair hyperlinks afterward if needed.
- The final workbook links were verified as:
  - `Instructions!D2 -> export_arm_summary_pdf.sh`
  - `Scenario Inputs!F2 -> export_arm_summary_pdf.sh`
  - `PDF Output!J1 -> export_arm_summary_pdf.sh`
- `render_arm_output_for_pdf.mjs` currently renders `PDF Output!A1:E50`.
- `generate_arm_pdf_from_png.py` crops rendered spreadsheet headers using `cropBoxPx` from `arm_pdf_meta.json`.

## If Continuing

Start by inspecting only these files:

```bash
ls -lh output/exports/adrabetadex_provider_net_cost_recovery_calculator
```

Then inspect workbook state with bundled Python/openpyxl or the spreadsheet artifact tooling. Keep edits in place unless the user asks for a new delivery folder.

Recommended next refinements, if requested:

- Improve the visual density of `PDF Output` so it uses more of the letter-landscape page.
- Add a cleaner native Excel shape/button if supported by the chosen tooling.
- Add a small validation/check area for scenario preset integrity.
- Package only the current final workbook, README, scripts, metadata, preview PNG, and latest PDF into a handoff folder if the user asks for delivery.
