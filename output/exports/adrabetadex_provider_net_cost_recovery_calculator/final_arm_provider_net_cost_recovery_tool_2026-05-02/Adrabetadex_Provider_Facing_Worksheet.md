# Adrabetadex Provider-Facing Worksheet

Version: Final ARM v1.0
Generated: 2026-05-02

This model assumes payer authorization has been approved for the patient, dose, frequency, site of care, and sourcing pathway reflected in the selected scenario. If authorization is pending, denied, under appeal, expired, or inconsistent with the modeled site/sourcing pathway, the economic output should not be used.

## Provider-entered assumptions
- Use only after PA approval matches the modeled scenario.
- Review site of care, payer type, 340B status, sourcing pathway, coding status, and payment status.
- Review acquisition cost, allowed drug reimbursement, administration revenue, operating burden, claim denial drag, and financing drag.
- Any manual override must be visibly flagged and validated by the provider or payer source.

## Output interpretation
- Net recovery is a scenario-based estimate under stated assumptions.
- Partial-year authorizations are limited to the authorized treatment window.
- Risk flags identify where the scenario is not cleanly modellable or requires provider/payer validation.

## Standard caveat
This scenario is for reimbursement planning only. It does not guarantee coverage, coding, payment, reimbursement, acquisition cost, provider margin, payer behavior, 340B pricing, pass-through status, HCPCS assignment, or claim outcome. Providers are responsible for verifying coding, billing, payer rules, contract terms, documentation, and institutional policy before claim submission.
