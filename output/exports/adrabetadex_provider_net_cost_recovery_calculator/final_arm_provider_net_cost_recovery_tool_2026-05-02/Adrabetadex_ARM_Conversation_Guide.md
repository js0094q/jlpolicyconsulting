# Adrabetadex ARM Conversation Guide

Version: Final ARM v1.0
Generated: 2026-05-02

This model assumes payer authorization has been approved for the patient, dose, frequency, site of care, and sourcing pathway reflected in the selected scenario. If authorization is pending, denied, under appeal, expired, or inconsistent with the modeled site/sourcing pathway, the economic output should not be used.

## Conversation workflow
- Confirm the provider-entered patient, dose, frequency, site of care, and sourcing pathway before discussing economics.
- Verify PA approval status and approval scope. If PA is not approved or the scope does not match, stop at readiness next steps.
- Use the selected scenario ID only; do not mix independent site, payer, sourcing, coding, or payment assumptions.
- Separate coding state from payment state when describing claim pathway readiness.
- Review risk flags before discussing net recovery estimates.

## Stop rules
- PA pending, denied, appealed, expired, or not initiated means economics are not actionable.
- Medicaid scenarios require PAD/NDC fields and FFS/MCO distinction before clean output.
- Medicaid + 340B requires duplicate-discount resolution before clean output.
- White-bagging/specialty pharmacy branches set drug reimbursement/spread to zero unless payer-specific terms are documented.

## Language guardrails
- Use 'scenario-based net recovery estimate' and 'estimated surplus/shortfall under stated assumptions.'
- Do not describe the tool as a profitability, coverage, payment, coding, 340B spread, or funding calculator.
- Use 'PA approved for stated scope' instead of coverage-certainty language.

## Standard caveat
This scenario is for reimbursement planning only. It does not guarantee coverage, coding, payment, reimbursement, acquisition cost, provider margin, payer behavior, 340B pricing, pass-through status, HCPCS assignment, or claim outcome. Providers are responsible for verifying coding, billing, payer rules, contract terms, documentation, and institutional policy before claim submission.
