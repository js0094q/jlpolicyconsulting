# Adrabetadex Billing-Readiness Checklist

Version: Final ARM v1.0
Generated: 2026-05-02

This model assumes payer authorization has been approved for the patient, dose, frequency, site of care, and sourcing pathway reflected in the selected scenario. If authorization is pending, denied, under appeal, expired, or inconsistent with the modeled site/sourcing pathway, the economic output should not be used.

## Candidate claim-readiness prompts
- Has payer authorization been approved for patient, dose, frequency, site of care, and sourcing pathway?
- Does the claim form pathway align to site of care: UB-04/837I or CMS-1500/837P?
- Has the provider verified coding, billing units, NDC, unit of measure, quantity administered, and documentation requirements?
- For Medicaid, has the provider confirmed FFS versus MCO policy and plan/state-specific PAD requirements?
- For 340B + Medicaid, has carve-in/carve-out and duplicate-discount handling been resolved?
- Has wastage handling been verified by the provider's billing/revenue-cycle team?

## Not a coding directive
- This checklist prompts validation. It does not prescribe codes or replace provider billing policy.
- Provider billing, payer, finance, compliance, and institutional teams remain responsible for claim submission decisions.

## Standard caveat
This scenario is for reimbursement planning only. It does not guarantee coverage, coding, payment, reimbursement, acquisition cost, provider margin, payer behavior, 340B pricing, pass-through status, HCPCS assignment, or claim outcome. Providers are responsible for verifying coding, billing, payer rules, contract terms, documentation, and institutional policy before claim submission.
