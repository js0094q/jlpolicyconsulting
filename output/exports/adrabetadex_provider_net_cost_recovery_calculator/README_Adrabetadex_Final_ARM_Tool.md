# Adrabetadex Final ARM Provider Net Cost Recovery Tool

Version: Final ARM v1.0
Generated: 2026-05-02

## Purpose
This package is a reimbursement-readiness and economic-exposure model for ARM-led provider conversations after payer authorization has been approved for the modeled patient, dose, frequency, site of care, and sourcing pathway.

## Package contents
- `Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx`: locked ARM calculator with scenario engine, five linked modules, output summary, source register, and test cases.
- `Adrabetadex_Provider_Worksheet_Approved_Scope_S01_2026-05-02.pdf`: one-page provider-facing worksheet generated from the default approved S01 scenario.
- `Adrabetadex_ARM_Conversation_Guide.md` / `.pdf`: ARM conversation workflow and stop-rules.
- `Adrabetadex_Billing_Readiness_Checklist.md` / `.pdf`: billing-readiness prompts only; no code prescribing.
- `Adrabetadex_Provider_Facing_Worksheet.md` / `.pdf`: provider-facing assumption worksheet.
- `Adrabetadex_Policy_Source_Register.csv`: policy/source register export mirroring the workbook tab.
- `Adrabetadex_Final_ARM_Tool_Validation_Summary.md` and `Adrabetadex_Final_ARM_Tool_Validation_Results.json`: validation results for scenario and gate tests.

## Field-use framing
This model assumes payer authorization has been approved for the patient, dose, frequency, site of care, and sourcing pathway reflected in the selected scenario. If authorization is pending, denied, under appeal, expired, or inconsistent with the modeled site/sourcing pathway, the economic output should not be used.

## Standard caveat
This scenario is for reimbursement planning only. It does not guarantee coverage, coding, payment, reimbursement, acquisition cost, provider margin, payer behavior, 340B pricing, pass-through status, HCPCS assignment, or claim outcome. Providers are responsible for verifying coding, billing, payer rules, contract terms, documentation, and institutional policy before claim submission.

## How to use
1. Select one `Scenario ID` on `Scenario Engine`.
2. Leave manual overrides blank unless the ARM explicitly activates manual override and enters a provider/payer-validated value.
3. Complete `Payer Controls` authorization inputs. Economics remain suppressed unless PA approval and scope match are present.
4. Review `Output Summary`, risk flags, and caveats before sharing any provider-facing PDF.
5. Use `Source Register` to refresh policy-backed and planning assumptions before field release.

## Go/no-go status
The generated package includes the minimum test matrix T01-T14. Run `python3 build_final_arm_tool.py --validate-only` from this folder after workbook edits.

## Boundary note
This folder is generated/export material and is not active website runtime source.
