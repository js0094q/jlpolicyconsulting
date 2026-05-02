from __future__ import annotations

from pathlib import Path
from zipfile import ZipFile

from reportlab.graphics.shapes import Drawing, Line, Polygon, Rect, String
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "output" / "doc" / "Adrabetadex_Provider_Net_Cost_Calculator_Concept_Brief_Navisync.pdf"
NAVISYNC_DOCX = (
    ROOT
    / "output"
    / "doc"
    / "Adrabetadex_Provider_Net_Cost_Calculator_Narrative_Brief_Navisync_Letterhead.docx"
)
ASSET_DIR = ROOT / "tmp" / "docs" / "navisync_provider_brief_assets"
RUN_DATE = "March 30, 2026"

INK = colors.HexColor("#4D575B")
GREEN = colors.HexColor("#5C8D2C")
GREEN_DARK = colors.HexColor("#43691F")
GREEN_LIGHT = colors.HexColor("#EEF5E6")
SAGE = colors.HexColor("#DDE8D0")
GRID = colors.HexColor("#C8D3BF")
MUTED = colors.HexColor("#6F767A")
GRAY_BG = colors.HexColor("#F6F7F3")


def ensure_letterhead_assets() -> tuple[Path, Path]:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    background = ASSET_DIR / "image1.jpg"
    footer_mark = ASSET_DIR / "image2.png"
    if background.exists() and footer_mark.exists():
        return background, footer_mark
    with ZipFile(NAVISYNC_DOCX) as archive:
        for name, target in (
            ("word/media/image1.jpg", background),
            ("word/media/image2.png", footer_mark),
        ):
            with archive.open(name) as src, target.open("wb") as dst:
                dst.write(src.read())
    return background, footer_mark


def cite(*numbers: int) -> str:
    return "".join(f"[{number}]" for number in numbers)


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="DocDate",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=12,
            textColor=INK,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=19,
            leading=23,
            textColor=GREEN,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocSubtitle",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=INK,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocLead",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.4,
            leading=14.8,
            textColor=INK,
            spaceAfter=9,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocSection",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.4,
            leading=15.2,
            textColor=GREEN,
            spaceBefore=12,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.6,
            leading=13.5,
            textColor=INK,
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocBullet",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.4,
            leading=13.1,
            textColor=INK,
            leftIndent=10,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=10.2,
            textColor=GREEN_DARK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.35,
            leading=10.1,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocSource",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=10,
            textColor=INK,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocNote",
            parent=styles["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=8.1,
            leading=10,
            textColor=MUTED,
            spaceBefore=2,
            spaceAfter=4,
        )
    )
    return styles


def as_paragraph(text: str, style):
    return Paragraph(text.replace("&", "&amp;"), style)


def make_table(rows, styles, col_widths):
    rendered = []
    for row_index, row in enumerate(rows):
        style = styles["TableHead"] if row_index == 0 else styles["TableBody"]
        rendered.append([as_paragraph(cell, style) for cell in row])
    table = Table(rendered, colWidths=col_widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), GREEN_LIGHT),
                ("LINEABOVE", (0, 0), (-1, 0), 1.2, GREEN),
                ("TEXTCOLOR", (0, 0), (-1, 0), GREEN_DARK),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, GRAY_BG]),
                ("BOX", (0, 0), (-1, -1), 0.45, GRID),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, GRID),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def page_chrome(canvas, doc):
    background, footer_mark = ensure_letterhead_assets()
    canvas.saveState()
    canvas.drawImage(
        str(background),
        0,
        0,
        width=letter[0],
        height=letter[1],
        preserveAspectRatio=False,
        mask="auto",
    )
    canvas.drawImage(
        str(footer_mark),
        0.43 * inch,
        0.41 * inch,
        width=1.05 * inch,
        height=0.096 * inch,
        mask="auto",
    )
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(letter[0] - 0.58 * inch, 0.48 * inch, f"Page {doc.page}")
    canvas.restoreState()


def make_flow_diagram():
    drawing = Drawing(420, 132)

    def node(x, y, w, h, label, fill):
        drawing.add(Rect(x, y, w, h, rx=8, ry=8, fillColor=fill, strokeColor=GRID, strokeWidth=0.8))
        lines = label.split("\n")
        start_y = y + h - 16
        for i, text in enumerate(lines):
            drawing.add(String(x + 10, start_y - i * 12, text, fontName="Helvetica-Bold" if i == 0 else "Helvetica", fontSize=8.3, fillColor=INK))

    def arrow(x1, y1, x2, y2):
        drawing.add(Line(x1, y1, x2, y2, strokeColor=GREEN, strokeWidth=1.6))
        drawing.add(Polygon([x2, y2, x2 - 6, y2 + 3, x2 - 6, y2 - 3], fillColor=GREEN, strokeColor=GREEN))

    node(0, 68, 95, 42, "Payer + PBM", GREEN_LIGHT)
    node(108, 68, 95, 42, "Specialty\npharmacy", colors.white)
    node(216, 68, 95, 42, "Hospital / COE\nor physician office", GREEN_LIGHT)
    node(324, 68, 96, 42, "Provider net\nmargin result", colors.white)
    node(108, 8, 95, 42, "340B / Medicaid\nclaim path", colors.white)
    node(216, 8, 95, 42, "Coding + pass-\nthrough status", GREEN_LIGHT)
    node(324, 8, 96, 42, "Contracting +\nsupport levers", colors.white)

    arrow(95, 89, 108, 89)
    arrow(203, 89, 216, 89)
    arrow(311, 89, 324, 89)
    arrow(203, 29, 216, 29)
    arrow(311, 29, 324, 29)
    arrow(155, 68, 155, 50)
    arrow(263, 68, 263, 50)

    drawing.add(String(3, 118, "How the calculator works", fontName="Helvetica-Bold", fontSize=10, fillColor=GREEN))
    drawing.add(String(3, 0, "The model links reimbursement channel, site of care, coding status, and contracting support to provider margin and working capital.", fontName="Helvetica", fontSize=7.5, fillColor=MUTED))
    return drawing


def build_story(styles):
    story = [
        Paragraph(RUN_DATE, styles["DocDate"]),
        Paragraph("Adrabetadex Provider Net Cost Calculator Concept Brief", styles["DocTitle"]),
        Paragraph("Prepared for the Beren Therapeutics launch team. Audience: internal medical, commercial, market access, and finance stakeholders.", styles["DocSubtitle"]),
        Paragraph(
            "This brief explains what the provider net cost calculator is, why it matters, how it will work, what form it will take, and which public reimbursement rules and launch frictions it needs to capture. The core conclusion is straightforward: adrabetadex's mortality benefit supports a compelling clinical story, but provider uptake will still depend on the economics of buy-and-bill, white-bagging, 340B acquisition, Medicaid claim integrity, HCPCS timing, and hospital and PBM contracting decisions. "
            + cite(1, 2, 4, 5, 6, 7, 8, 9, 10, 11),
            styles["DocLead"],
        ),
        make_flow_diagram(),
        Spacer(1, 0.12 * inch),
        HRFlowable(width="100%", thickness=0.8, color=GRID, spaceBefore=0, spaceAfter=6),
        Paragraph("What the model is", styles["DocSection"]),
        Paragraph(
            "The provider net cost calculator is a scenario-based decision tool that converts payer rules and channel mechanics into center-level economics. It is not a list-price or gross-to-net model. It is a reimbursement execution model built from the provider perspective. For each payer, site of care, and channel, it will estimate expected reimbursement, inventory at risk, time to cash, denial exposure, administration economics, and the break-even level of manufacturer support needed to keep the provider whole. "
            + cite(3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
            styles["DocBody"],
        ),
        Paragraph(
            "Adrabetadex is an especially strong use case for this type of model. The product is high cost, likely hospital-centered, and clinically differentiated in an ultra-rare pediatric disease. The working launch assumption is $39,000 per 900 mg vial every two weeks, or $1,014,000 of annual gross drug exposure before administration cost. In that setting, a provider does not need many unpaid claims or many delayed payments for the treatment pathway to become financially unattractive. "
            + cite(1, 2, 3),
            styles["DocBody"],
        ),
    ]

    input_output_rows = [
        ["Model area", "What the calculator will capture", "Why the output matters"],
        ["Commercial medical benefit", "Prior authorization status, specialist requirement, site-of-care rule, white-bagging risk, and commercial net-price view at 15%, 20%, and 30% discount assumptions" + cite(3, 4, 5, 6, 7), "Shows whether the provider can buy the drug, bill the plan, and keep a positive contribution margin."],
        ["Medicaid", "EPSDT coverage logic, state-set physician-administered drug payment methodology, NDC capture, PAD data requirements, and Medicaid FFS versus managed care channel split" + cite(8, 10, 11), "Shows where coverage may exist but payment still fails because the claim pathway is incomplete."],
        ["340B", "Estimated 340B ceiling-price acquisition, carve-in versus carve-out treatment, and duplicate-discount control points" + cite(8, 9), "Shows which centers of excellence are structurally advantaged and how much gross-to-net pressure that creates."],
        ["Hospital outpatient coding", "Miscellaneous-code bridge, HCPCS application timing, OPPS pass-through timing, and hospital acquisition-cost evidence requirements" + cite(12, 13, 14), "Shows when hospital outpatient billing becomes predictable enough for broader site activation."],
        ["Manufacturer support", "Prompt-pay discount, acquisition rebate, free-drug bridge, and patient-support assumptions" + cite(3), "Shows which support levers fix provider economics and which only help patient affordability."],
    ]
    story.extend(
        [
            make_table(input_output_rows, styles, [1.4 * inch, 3.1 * inch, 2.1 * inch]),
            Spacer(1, 0.12 * inch),
            Paragraph("What it will show", styles["DocSection"]),
            Paragraph(
                "The first value of the calculator is visibility. Beren's current assumption that strong mortality data alone will reduce payer friction is not supported by how comparable therapies are managed. UnitedHealthcare's current commercial criteria for Miplyffa and Aqneursa require genetic confirmation, specialist prescribing, and documented positive clinical response for continuation, and they prohibit overlapping therapy use. Aetna applies similarly concrete administration and continuation controls in Brineura, including physician knowledge in intraventricular administration and no loss or slowed loss of ambulation from baseline. The model will translate those rules into actual operational and financial consequences for providers. "
                + cite(4, 5, 16),
                styles["DocBody"],
            ),
            Paragraph(
                "The second value is prioritization. The model will identify where to launch first, where hospital contracting matters most, and where PBM or specialty-pharmacy contracting can either preserve or remove buy-and-bill economics. UnitedHealthcare's public sourcing FAQ states that a participating specialty pharmacy can ship drug to the physician or hospital and bill the plan directly, with the provider billing only for administration. If the provider does not use the designated specialty pharmacy when required, UnitedHealthcare states that payment for the medication is denied. That means PBM contracting is not a side issue for adrabetadex. It directly shapes whether the provider purchases inventory at all. "
                + cite(6),
                styles["DocBody"],
            ),
            Paragraph(
                "The third value is decision support on support strategy. The model will show the effect of discounts, rebates, and patient assistance in separate buckets rather than treating them as interchangeable. A prompt-pay discount or provider-facing acquisition rebate improves provider margin directly. A patient-assistance or free-drug bridge program can reduce patient abandonment and protect the provider from stocking unreimbursed drug, but it does not substitute for a durable reimbursement pathway once commercial claims begin. "
                + cite(3),
                styles["DocBody"],
            ),
        ]
    )

    scenario_rows = [
        ["Scenario", "Acquisition / payment basis", "Illustrative margin signal", "Implication for launch strategy"],
        ["Commercial buy-and-bill, 15% payer discount view", "$39,000 acquisition; modeled reimbursement compression against WAC" + cite(3), "About -$145 per administration; about -$3,771 per patient-year" + cite(3), "Commercial access exists, but provider economics are near break-even and turn negative after denial drag and working-capital cost."],
        ["Commercial buy-and-bill, 5% manufacturer support", "$39,000 acquisition less support equal to $1,950 per dose" + cite(3), "Near-neutral to modestly positive" + cite(3), "Represents the lowest realistic support threshold for non-340B provider participation."],
        ["Commercial buy-and-bill, 10% manufacturer support", "$39,000 acquisition less support equal to $3,900 per dose" + cite(3), "Consistently positive" + cite(3), "Broadens adoption beyond a few high-margin centers and reduces resistance to stocking inventory."],
        ["Commercial white-bagging", "Payer-designated specialty pharmacy supplies drug; provider bills administration only" + cite(6), "Drug spread removed" + cite(3), "Provider contracting focus shifts from acquisition support to administration economics and clean-claim execution."],
        ["Medicaid non-340B", "Coverage supported by EPSDT, but payment depends on PAD data and state methodology" + cite(10, 11), "Loss exceeds roughly $2,600 per administration; nearly -$70,000 per patient-year" + cite(3), "Community-site participation remains weak without a stronger payment path."],
        ["340B center of excellence", "Estimated acquisition at $29,991 under 23.1% URA assumption" + cite(8, 9), "More than $9,000 per administration; more than $235,000 per year" + cite(3), "Creates a strong economic incentive to concentrate launch in eligible hospital systems."],
    ]
    story.extend(
        [
            make_table(scenario_rows, styles, [1.42 * inch, 2.12 * inch, 1.53 * inch, 2.13 * inch]),
            Spacer(1, 0.08 * inch),
            Paragraph(
                "These scenario rows are intentionally provider-centered. They are not manufacturer net-revenue rows. They show what a center experiences when it decides whether to buy, bill, and administer a high-cost therapy. That is the level at which site activation succeeds or fails. "
                + cite(3),
                styles["DocNote"],
            ),
            Paragraph("How it will work", styles["DocSection"]),
            Paragraph(
                "The calculator will use one consistent operating formula across channels: expected provider net position = drug payment + administration revenue + provider-facing manufacturer support - drug acquisition - labor and handling - denial and rework cost - carrying cost from payment delay. The same framework can then be applied to commercial, Medicaid, 340B, and hospital outpatient scenarios with different assumptions. "
                + cite(3, 12),
                styles["DocBody"],
            ),
            Paragraph(
                "For the federal benchmark layer, the model will anchor physician-office payment to CMS's initial sales period rule. CMS states that when ASP is not yet available, the Medicare Part B payment limit is 103% of WAC. On the current working WAC, that equals $40,170 per dose. For hospital outpatient miscellaneous-code billing, CMS states that C9399 supports contractor-priced payment at 95% of AWP while a drug lacks an assigned billing code. Those public rules define the opening payment frame for Medicare-linked scenarios and set a benchmark for provider expectations in commercial negotiations. "
                + cite(12, 15),
                styles["DocBody"],
            ),
            Paragraph(
                "For the Medicaid layer, the model will treat EPSDT as a coverage tailwind and PAD data capture as a payment gate. Medicaid states that EPSDT requires states to furnish medically necessary services needed to correct or ameliorate conditions in beneficiaries under age 21. Medicaid also states that payment availability and federal matching funds for physician-administered drugs depend on states collecting and submitting utilization data and, for defined categories, NDC coding. In practical terms, a pediatric adrabetadex claim can still fail economically even when medical necessity is strong if coding and data capture are incomplete. "
                + cite(10, 11),
                styles["DocBody"],
            ),
            Paragraph(
                "For the 340B layer, the model will separate acquisition advantage from reimbursement. HRSA states that the 340B ceiling price equals AMP minus the URA. For a new drug before AMP is available, HRSA directs manufacturers to estimate price using WAC minus the applicable rebate percentage. On the current assumptions, the estimated 340B acquisition price is $29,991 at a 23.1% URA and about $32,331 at a 17.1% pediatric-brand URA. That creates a per-dose acquisition advantage of roughly $6,669 to $9,009 versus WAC, but the model also has to capture duplicate-discount and carve-in or carve-out controls. "
                + cite(8, 9),
                styles["DocBody"],
            ),
            Paragraph(
                "For the coding layer, the model will separate temporary and durable payment paths. CMS states that HCPCS Level II drug and biological applications are due the first business day of each quarter through MEARIS, and that a code itself does not determine coverage or payment. CMS's pass-through materials state that applications must now be submitted through MEARIS, that only MEARIS submissions are accepted, and that a complete file by the first business day of September can support a January 1 effective date. CMS also states that transitional pass-through is temporary additional payment for certain new drugs and biologicals for at least two years but not more than three years. For an August 2026 approval, that means January 1, 2027 is the earliest practical pass-through date if the file is complete. "
                + cite(13, 14),
                styles["DocBody"],
            ),
        ]
    )

    methodology_rows = [
        ["Assumption block", "Working method"],
        ["Drug acquisition", "WAC by NDC and package size; estimated 340B acquisition; provider discount or rebate; free-drug bridge treatment as separate from reimbursed commercial inventory."],
        ["Drug payment", "Commercial contracted payment assumption by site of care; 103% of WAC during initial sales period when ASP is unavailable; 95% of AWP for C9399 interim contractor-priced hospital outpatient claims; state-set Medicaid physician-administered drug methodology."],
        ["Administration economics", "Procedure payment, physician oversight, nursing time, pharmacy handling, anesthesia or imaging where relevant, and center-specific overhead assumptions."],
        ["Claim performance", "Prior authorization lead time, clean-claim rate, denial probability, resubmission effort, days to payment, and inventory financing cost."],
        ["Contracting levers", "Hospital system agreement status, PBM or specialty-pharmacy sourcing requirement, white-bagging carve-out or exception status, and provider-facing support level."],
        ["Outputs", "Per-dose spread, total operating margin, annualized contribution, working capital at risk, and break-even support threshold by payer and site."],
    ]
    story.extend(
        [
            make_table(methodology_rows, styles, [1.6 * inch, 5.6 * inch]),
            Spacer(1, 0.12 * inch),
            Paragraph("Recommended format", styles["DocSection"]),
            Paragraph(
                "The best form for this model is an internal calculator with a clean front-end summary and a transparent assumption backend. In practice, that means either a disciplined Excel model with locked formulas and scenario toggles or a lightweight web calculator that replicates the same logic. The front end will show one-page summaries for commercial buy-and-bill, commercial white-bagging, Medicaid non-340B, Medicaid 340B, and hospital outpatient pass-through scenarios. The backend will hold the formula logic, public benchmark references, payer-policy notes, and center-specific assumptions. "
                + cite(3, 12, 13, 14, 15),
                styles["DocBody"],
            ),
            Paragraph(
                "The model will also output two practical action lists. The first is a contracting list: which hospital systems, PBMs, specialty pharmacies, and payers create the most favorable launch pathway. The second is a support list: which provider-facing rebate, discount, bridge, or patient-support action closes the economic gap fastest without obscuring the true reimbursement risk. That output is what makes the model useful to the launch team rather than just analytically interesting. "
                + cite(3, 6, 7),
                styles["DocBody"],
            ),
            Paragraph("Launch realities", styles["DocSection"]),
            Paragraph(
                "Adrabetadex will not launch into a frictionless market. It will launch into a tightly managed medical-benefit environment where commercial payers can require specialist prescribing, positive response for continuation, alternate sites of care, or specialty-pharmacy sourcing. Medicaid can cover a medically necessary pediatric therapy and still leave the provider unpaid if PAD or NDC requirements are not met. 340B can make economics highly favorable in hospital systems while making community-site economics comparatively unattractive. Those realities are exactly why the provider net cost calculator is needed before launch. "
                + cite(4, 5, 6, 7, 8, 9, 10, 11, 16),
                styles["DocBody"],
            ),
            Paragraph(
                "The launch opportunity is still substantial. Strong survival data, a highly concentrated treatment population, and a hospital-centered care pathway mean that Beren can shape uptake if it contracts deliberately. The best path is to use the calculator to prioritize centers of excellence, identify where PBM or specialty-pharmacy rules will force channel decisions, quantify the value of targeted non-340B support, and build pass-through and HCPCS readiness into the hospital-outpatient launch sequence. "
                + cite(1, 2, 3, 6, 13, 14),
                styles["DocBody"],
            ),
            PageBreak(),
            Paragraph("Sources", styles["DocSection"]),
        ]
    )

    sources = [
        "[1] Beren Therapeutics / Mandos. Adrabetadex Pre-approval Information Exchange deck provided by client, February 2026.",
        "[2] Beren Therapeutics. Project Castar internal training deck provided by client, January 2026.",
        "[3] Internal Adrabetadex provider economics working assumptions prepared for concept-brief modeling on March 30, 2026, including WAC of $39,000 per 900 mg vial, 26 administrations per year, commercial discount sensitivities, and provider-support scenarios.",
        "[4] UnitedHealthcare. Miplyffa (arimoclomol) - Prior Authorization / Medical Necessity - Commercial Plans, effective April 1, 2025. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/h-p/PA-Med-Nec-Miplyffa.pdf",
        "[5] UnitedHealthcare. Aqneursa (levacetylleucine) - Prior Authorization / Medical Necessity - Commercial Plans, effective June 1, 2025. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/a-g/PA-Med-Nec-Aqneursa.pdf",
        "[6] UnitedHealthcare. Medication sourcing protocol - Requirements to use a participating specialty pharmacy for certain medications - UnitedHealthcare commercial plans, published June 24, 2025. https://ams-gateway.uhcprovider.com/content/dam/provider/docs/public/resources/pharmacy/medication-expansion-sourcing-faq.pdf",
        "[7] UnitedHealthcare. Provider Administered Drugs - Site of Care - Commercial Medical Benefit Drug Policy, effective January 1, 2026. https://www.uhcprovider.com/content/dam/provider/docs/public/policies/comm-medical-drug/provider-administered-drugs-soc.pdf",
        "[8] HRSA. How is the 340B ceiling price calculated? https://www.hrsa.gov/about/faqs/how-340b-ceiling-price-calculated",
        "[9] HRSA. Pricing Formulas and New Drug Price Estimation. https://340bpricingsubmissions.hrsa.gov/Help/Manufacturer/Pricing%20Formulas/Pricing%20Formulas.htm",
        "[10] Medicaid.gov. Early and Periodic Screening, Diagnostic, and Treatment. https://www.medicaid.gov/medicaid/benefits/early-and-periodic-screening-diagnostic-and-treatment",
        "[11] Medicaid.gov. Physician Administered Drugs (PAD). https://www.medicaid.gov/medicaid/prescription-drugs/state-prescription-drug-resources/physician-administered-drugs-pad",
        "[12] CMS. Part B Drug Payment Limits Overview, published January 2025. https://www.cms.gov/files/document/part-b-drug-payment-limits-overview.pdf-0",
        "[13] CMS. HCPCS Level II Coding Procedures, last modified March 20, 2026. https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system/level-ii-coding-process",
        "[14] CMS. Pass-Through Payment Status and New Technology Ambulatory Payment Classification (APC), last modified March 19, 2026, and CMS pass-through application process materials updated March 16, 2026. https://www.cms.gov/medicare/payment/prospective-payment-systems/hospital-outpatient/pass-through-payment-status-new-technology-ambulatory-payment-classification-apc ; https://www.cms.gov/files/document/determine-eligibility-drugs-biologicals-transitional-pass-through-payment-under-hospital-outpatient.pdf",
        "[15] CMS. Medicare to Pay for Unclassified, FDA-Approved Drugs Administered in Outpatient Departments. https://www.cms.gov/newsroom/press-releases/medicare-pay-unclassified-fda-approved-drugs-administered-outpatient-departments",
        "[16] Aetna. Clinical Policy Bulletin 0442: Lysosomal Storage Disorder Treatments. https://www.aetna.com/cpb/medical/data/400_499/0442.html",
    ]
    source_items = [ListItem(as_paragraph(item, styles["DocSource"])) for item in sources]
    story.append(
        ListFlowable(
            source_items,
            bulletType="bullet",
            leftPadding=10,
            bulletFontName="Helvetica",
            bulletFontSize=1,
        )
    )
    return story


def main():
    ensure_letterhead_assets()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    pdf = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        topMargin=1.23 * inch,
        bottomMargin=1.02 * inch,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        title="Adrabetadex Provider Net Cost Calculator Concept Brief",
        author="OpenAI Codex for Navisync",
    )
    pdf.build(build_story(styles), onFirstPage=page_chrome, onLaterPages=page_chrome)
    print(OUTPUT_PATH)


if __name__ == "__main__":
    main()
