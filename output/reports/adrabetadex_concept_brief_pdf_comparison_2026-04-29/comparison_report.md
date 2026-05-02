# Adrabetadex Concept Brief PDF Comparison

Generated: 2026-04-29

## Inputs

- Exported repo PDF: `output/exports/adrabetadex_provider_net_cost_recovery_model_concept_brief_2026-04-28/Adrabetadex_Provider_Net_Cost_Recovery_Model_Concept_Brief.pdf`
- Downloaded PDF: `/Users/josephstewart/Downloads/45497add-044f-4b74-91de-672e44b8103c.pdf`

## Bottom Line

The downloaded PDF appears to be a later clean-copy or re-rendered version of the exported repo PDF. It changes the brief label from April 2026 to May 2026, replaces the footer code, expands a few acronyms, adds abbreviation notes under tables, removes many terminal periods from table cells and source notes, and adjusts wrapping/layout. The core reimbursement model logic and main numeric assumptions appear unchanged in the extracted text.

## Document-Level Differences

| Area | Exported repo PDF | Downloaded PDF | Difference |
| --- | --- | --- | --- |
| Creation metadata | Created by Microsoft Word, Apr. 28, 2026, 1:38 AM EDT | Created by LibreOffice Writer, Apr. 28, 2026, 10:30 PM EDT | Downloaded file is later by metadata and appears re-rendered outside Word. |
| PDF tagging | Tagged PDF | Not tagged | Downloaded file appears to lose PDF accessibility tagging. |
| File size | 308 KB | 2.3 MB | Downloaded file is much larger. |
| Page count | 5 | 5 | No page-count change. |
| Header date | `Executive Brief | April 2026` | `Executive Brief | May 2026` | Month changed. |
| Footer/version code | `PRO-1249-US-EN-v1`, visually placed at lower right | `CEP-1267-US-EN-v1, May 2026`, visually placed at lower left | Footer identifier and placement changed on each page. |

## Meaningful Content Changes

| Section | Difference |
| --- | --- |
| Executive Summary | First sentence changes from "enter launch" to "enter the launch phase." The rest of the opening paragraph is mainly rewrapped, with the same August 2026 PDUFA assumption, 71% mortality-risk reduction, $39,000 vial assumption, every-two-weeks dosing, and approximately $1.014 million annual gross exposure. |
| Core point | `ARMs` is expanded to `Access Reimbursement Managers (ARMs)`. The operational question is otherwise unchanged. |
| Provider Model Value table | Terminal periods are removed from many table cells. `Medicaid / 340B complexity` becomes `Medicaid/340B complexity`. The downloaded PDF adds an acronym note defining ASP, AWP, EPSDT, HCPCS, MCO, NDC, NOC, and WAC. |
| How Buy-and-Bill Is Different From EAP | Table wording is substantially the same, but punctuation is removed. `White-bagging / specialty-pharmacy` is normalized to `White-bagging/specialty-pharmacy`. The downloaded PDF adds `COE, centers of excellence.` |
| What the Model Should Include | Table content is unchanged in substance, but punctuation is removed. The downloaded PDF adds an acronym note defining ASP, AWP, EPSDT, FFS, HCPCS, MCO, NDC, NOC, PAD, and WAC. |
| Core Formula | The equation is unchanged. `Denial / rework cost` becomes `Denial/rework cost`, and terminal periods are removed from component definitions. |
| Coding and Pass-Through Timing | The same planning points remain. Some table cells lose periods. The OPPS pass-through citations are split across lines as `[5]` and `[6]`, but the source references remain present. |
| Why 340B Matters | Scenario rows are unchanged in substance. Terminal periods are removed. |
| Strategic Value for Beren | Table content is unchanged in substance. `Target support instead of over-subsidizing` is moved onto one line. Terminal periods are removed. |
| Recommended Build | Tab names shift from title case to sentence case, for example `Core Assumptions` to `Core assumptions`, `Scenario Selector` to `Scenario selector`, and `Source Appendix` to `Source appendix`. Purposes are unchanged except for terminal-period removal. |
| Source Notes | Source-note meanings are unchanged in substance. Formatting changes include slash spacing, terminal-period removal, and cleaner URL line breaks for HRSA and UnitedHealthcare references. |

## Main QA Flags

- If the downloaded PDF is meant to be the client-ready version, confirm that `May 2026` and `CEP-1267-US-EN-v1` are the intended date/code changes.
- If accessibility matters, the downloaded PDF should be regenerated as a tagged PDF or checked with the client delivery standard, because metadata reports it as untagged.
- Most red visual marks in the page overlays are layout/rendering changes, not necessarily substantive text changes. Use the HTML text diff for wording review and the PNG overlays for layout review.

## Generated Comparison Artifacts

- Human summary: `comparison_report.md`
- Full unified text diff: `text_diff_unified.diff`
- Browser-readable highlighted text diff: `highlighted_text_diff.html`
- Rendered exported pages: `render_exported/page-1.png` through `render_exported/page-5.png`
- Rendered downloaded pages: `render_downloaded/page-1.png` through `render_downloaded/page-5.png`
- Red-overlay visual diffs: `visual_diffs/page_01_red_overlay.png` through `visual_diffs/page_05_red_overlay.png`
- Red-overlay contact sheet: `visual_diffs/contact_sheet.png`
- Visual diff stats: `visual_diff_stats.csv`

## Validation Performed

- Confirmed both PDFs exist and are valid with `pdfinfo`.
- Confirmed both PDFs are 5 pages on letter-size pages.
- Extracted native text from both PDFs with `pdftotext -layout`.
- Generated a unified text diff and highlighted HTML diff.
- Rendered both PDFs to PNG pages with Poppler.
- Generated red-overlay page-level visual diffs from rendered pages.
- Visually inspected page 1 of both PDFs and the visual-diff contact sheet covering all 5 pages.
