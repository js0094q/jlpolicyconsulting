from __future__ import annotations

from pathlib import Path
from zipfile import ZipFile

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
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
OUTPUT_PATH = ROOT / "output" / "doc" / "Adrabetadex_Navisync_Final_Combined.pdf"
NAVISYNC_DOCX = (
    ROOT
    / "output"
    / "doc"
    / "Adrabetadex_Provider_Net_Cost_Calculator_Narrative_Brief_Navisync_Letterhead.docx"
)
ASSET_DIR = ROOT / "tmp" / "docs" / "navisync_runtime_assets"
RUN_DATE = "March 30, 2026"

INK = colors.HexColor("#4D575B")
GREEN = colors.HexColor("#5C8D2C")
LIGHT_GREEN = colors.HexColor("#EAF2E0")
GRID = colors.HexColor("#C9D5C1")
MUTED = colors.HexColor("#6D7579")


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


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Date",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=12,
            textColor=INK,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=GREEN,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Audience",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=12,
            textColor=INK,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Lead",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.3,
            leading=14.6,
            textColor=INK,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.5,
            leading=15,
            textColor=GREEN,
            spaceBefore=12,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.7,
            leading=13.4,
            textColor=INK,
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=10.4,
            textColor=GREEN,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=10.4,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Source",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10.2,
            textColor=INK,
            spaceAfter=3,
        )
    )
    return styles


def cite(*numbers: int) -> str:
    return "".join(f"[{number}]" for number in numbers)


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
                ("BACKGROUND", (0, 0), (-1, 0), LIGHT_GREEN),
                ("TEXTCOLOR", (0, 0), (-1, 0), GREEN),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("LINEABOVE", (0, 0), (-1, 0), 1.4, GREEN),
                ("BOX", (0, 0), (-1, -1), 0.5, GRID),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, GRID),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FBF4")]),
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


def build_story(styles):
    story = [
        Paragraph(RUN_DATE, styles["Date"]),
        Paragraph(
            "Adrabetadex MLR Background, Provider Economics, and Coding Strategy",
            styles["DocTitle"],
        ),
        Paragraph(
            "Audience: medical, legal, regulatory, and access stakeholders",
            styles["Audience"],
        ),
        Paragraph(
            "This combined brief integrates the launch background, provider economics, and HCPCS and OPPS execution pathway into one client-ready document. The operating conclusion is direct: clinical differentiation matters, but hospital contracting, PBM and specialty-pharmacy contracting, coding readiness, and provider margin support will determine how much of that differentiation converts into reimbursed use at launch. "
            + cite(3, 6, 7, 13, 14, 15),
            styles["Lead"],
        ),
        Paragraph("Background", styles["Section"]),
        Paragraph(
            "Adrabetadex enters the U.S. market with a defined regulatory and clinical frame anchored by an August 17, 2026 PDUFA date and a target population of infantile-onset Niemann-Pick disease type C. The validated source set places total U.S. NPC incidence at roughly 40 patients per year, with roughly 20 infantile-onset cases, or about 0.059 patients per 1 million covered lives. That incidence supports a highly concentrated treatment model centered on a small number of pediatric specialty hospitals and centers of excellence. "
            + cite(1, 2),
            styles["Body"],
        ),
        Paragraph(
            "The clinical value proposition is built on survival and functional preservation rather than symptom control alone. The evidence package reports a 71% reduction in risk of death versus external controls, with 5-year survival of 84% in treated patients compared with 42% in controls. Subgroup results show an 85% reduction in mortality in early infantile patients and a 66% reduction in late infantile patients. "
            + cite(1, 2),
            styles["Body"],
        ),
        Paragraph(
            "The commercial and reimbursement model already fixes the core economics. WAC is $39,000 per 900 mg vial dosed every two weeks, which produces $1,014,000 of annual gross drug exposure before administration cost or denied claims. The internal launch model also uses a $1.1 million annual list price, net-price sensitivity at 15%, 20%, and 30%, and a payer mix of 50% commercial and 50% Medicaid. "
            + cite(1, 2, 3),
            styles["Body"],
        ),
        Paragraph(
            "Commercial payer behavior is already visible in analogous therapies. UnitedHealthcare's commercial Aqneursa and Miplyffa criteria require genetic confirmation, specialist oversight, continuation based on documented positive response, and controls on overlapping or combination therapy. Aetna's lysosomal storage disorder policy applies precertification, site-of-care management, diagnosis confirmation, administration requirements, and continuation gates in Brineura and other rare-disease therapies. Adrabetadex will enter that managed-access environment, not an open medical-benefit channel. "
            + cite(4, 5, 18),
            styles["Body"],
        ),
        Paragraph(
            "Additional access control already sits in the specialty-pharmacy sourcing channel. UnitedHealthcare states that participating specialty pharmacies can supply the drug to the physician or hospital, defines white bagging as shipment from a specialty pharmacy to the provider or infusion center, and states that when the sourcing protocol is active the specialty pharmacy bills the health plan directly while the outpatient provider may bill only for administration. If the provider does not use the indicated specialty pharmacy, UnitedHealthcare states that payment for the medication is denied. That makes PBM and specialty-pharmacy contracting a launch-critical workstream rather than an afterthought. "
            + cite(6, 7),
            styles["Body"],
        ),
    ]

    key_figures = [
        ["Key figure", "Value", "Why it matters"],
        ["WAC per 900 mg vial", "$39,000" + cite(3), "Defines drug acquisition, financing exposure, and 340B arithmetic."],
        ["Annual gross drug exposure", "$1,014,000" + cite(3), "Sets the per-patient inventory and reimbursement stakes at launch."],
        ["15% / 20% / 30% net-price views", "$33,150 / $31,200 / $27,300" + cite(3), "Shows how commercial discounting compresses provider economics."],
        ["Estimated 340B acquisition at 23.1% URA", "$29,991" + cite(8, 9), "Creates a structural acquisition advantage versus WAC."],
        ["Estimated 340B acquisition at 17.1% URA", "$32,331" + cite(8, 9), "Illustrates the pediatric rebate-category sensitivity."],
        ["Initial-sales Medicare benchmark", "103% of WAC = $40,170" + cite(12), "Frames early physician-office reimbursement before ASP is available."],
    ]
    story.extend(
        [
            make_table(key_figures, styles, [1.95 * inch, 1.55 * inch, 3.05 * inch]),
            Spacer(1, 0.12 * inch),
            Paragraph("Economics", styles["Section"]),
            Paragraph(
                "The provider model quantifies whether a treatment center can sustain adrabetadex under real reimbursement conditions. The model measures expected reimbursement less drug acquisition, administration cost, denial-related loss, labor cost, and the carrying cost created by payment delay. For launch planning, the central question is not whether coverage exists in theory. The central question is whether the provider can carry the product without eroding margin or working capital. "
                + cite(3, 12),
                styles["Body"],
            ),
            Paragraph(
                "At baseline, acquisition remains $39,000 per administration. The working scenario model uses physician-office reimbursement tied to the initial-sales Medicare benchmark and OPPS-linked payment in hospital outpatient departments, alongside administration revenue assumptions of approximately $1,850 in commercial settings and $1,500 in Medicaid. At the 15% net-price view, the modeled commercial margin is approximately negative $145 per administration, or about negative $3,771 per patient-year, before any supplemental support is layered in. At the 20% and 30% net-price views, reimbursement compression worsens the provider result unless 340B economics or manufacturer support offsets the gap. "
                + cite(3, 12),
                styles["Body"],
            ),
            Paragraph(
                "Medicaid non-340B economics remain structurally negative in the working model. Lower reimbursement, heavier billing friction, and slower payment cycles produce modeled losses that exceed roughly $2,600 per administration and approach $70,000 per patient-year. By contrast, 340B participation fundamentally changes the provider result. At a 23.1% statutory discount, acquisition falls to $29,991 per vial, and the integrated scenario model produces margin above $9,000 per administration and above $235,000 annually in 340B centers of excellence. "
                + cite(3, 8, 9, 11, 12),
                styles["Body"],
            ),
        ]
    )

    provider_scenarios = [
        ["Scenario", "Modeled result", "Annual effect", "Launch implication"],
        ["Commercial, 15% net-price view", "-$145 per administration" + cite(3), "-$3,771 per patient-year" + cite(3), "Near break-even but still negative without support."],
        ["Commercial, 20% to 30% net-price view", "More negative than the 15% view" + cite(3), "Annual loss expands as reimbursement compresses" + cite(3), "Buy-and-bill weakens quickly outside 340B."],
        ["Commercial with 5% manufacturer support", "Near-neutral to modestly positive" + cite(3), "Adoption resistance declines" + cite(3), "Represents the lowest realistic support threshold."],
        ["Commercial with 10% manufacturer support", "Consistently positive" + cite(3), "Access broadens beyond 340B concentration" + cite(3), "Can stabilize non-340B delivery."],
        ["Medicaid, non-340B", "Loss exceeds about $2,600 per administration" + cite(3), "Nearly -$70,000 per patient-year" + cite(3), "Community-site adoption remains highly constrained."],
        ["340B center of excellence", "Margin exceeds about $9,000 per administration" + cite(3, 8, 9), "More than $235,000 per patient-year" + cite(3), "Creates a strong hospital-concentration incentive."],
    ]
    story.extend(
        [
            make_table(provider_scenarios, styles, [1.72 * inch, 1.45 * inch, 1.45 * inch, 2.38 * inch]),
            Spacer(1, 0.12 * inch),
            Paragraph(
                "Operational inputs materially change the result even when the reimbursement benchmark is unchanged. The working model treats labor, administration time, denial loss, and payment delay as real costs rather than overhead noise. Those assumptions are why contracting with hospital systems matters: children's hospitals and 340B centers can absorb inventory and staffing more readily, while non-340B community sites may require explicit support payments, tighter clean-claim processes, or both before they can participate economically. "
                + cite(3, 8, 9),
                styles["Body"],
            ),
            Paragraph("Coding", styles["Section"]),
            Paragraph(
                "Launch payment clarity depends on two CMS processes that run in parallel: HCPCS coding and OPPS transitional pass-through. CMS states that drug and biological HCPCS applications are filed through MEARIS on a quarterly cycle, with deadlines on the first business day of January, April, July, and October. Using an August 17, 2026 approval date, the first complete post-approval HCPCS drug-application window is October 1, 2026, which supports an April 1, 2027 effective date for a product-specific code if the file is complete. "
                + cite(13),
                styles["Body"],
            ),
            Paragraph(
                "During the interim period before a product-specific outpatient code is active, hospital outpatient claims may rely on C9399 or other not-otherwise-classified coding under Medicare contractor rules. CMS states that C9399 is the unclassified drug or biological code for approved drugs without assigned billing codes and that contractor-priced payment is 95% of AWP. For physician-office reimbursement during the initial sales period before ASP is available, CMS states that the Part B payment limit is 103% of WAC. "
                + cite(12, 16),
                styles["Body"],
            ),
            Paragraph(
                "OPPS pass-through status is separate from permanent HCPCS coding. CMS states that pass-through applications for drugs and biologicals are submitted through the MEARIS pass-through module, that only MEARIS submissions are accepted, and that pass-through payment is temporary additional payment rather than full cost replacement. CMS also states that the status runs for at least two years but not more than three years. For adrabetadex, a complete pass-through package by the first business day of September 2026 supports the earliest practical January 1, 2027 effective date. "
                + cite(14, 15),
                styles["Body"],
            ),
            Paragraph(
                "The pass-through application package has to be complete enough to survive operational review, not just clinical review. CMS requires the FDA approval letter, final label, product description, descriptor, dosage form, method of administration, billing-unit logic, WAC, AWP, ASP if available, actual hospital cost, market-availability date, and utilization projections. That process is not administrative detail. It is part of the launch payment strategy because hospital outpatient departments carry less risk when coding, billing, and pass-through payment move together. "
                + cite(14, 15),
                styles["Body"],
            ),
            Paragraph("Contracting", styles["Section"]),
            Paragraph(
                "Hospital contracting will be key because launch volume is likely to concentrate in children's hospitals, academic infusion centers, and 340B-eligible centers of excellence. Those sites are best positioned to manage high-dollar inventory, pass-through billing, duplicate-discount controls, and the specialized clinical administration pathway. They also have the strongest structural margin position once 340B acquisition and hospital outpatient payment mechanics are active. "
                + cite(3, 8, 9, 14, 15),
                styles["Body"],
            ),
            Paragraph(
                "PBM and specialty-pharmacy contracting will be equally important because payer-directed sourcing can override traditional buy-and-bill behavior. UnitedHealthcare's public sourcing FAQ states that participating specialty pharmacies can ship drugs to physicians and hospitals, that the specialty pharmacy bills the plan directly when the sourcing requirement applies, and that the provider may bill only for administration. When the protocol is not followed, the drug claim is denied. That means PBM, payer, and specialty-pharmacy contracting will shape whether adrabetadex remains a hospital-purchased drug, becomes a sourced product, or moves between channels by plan design. "
                + cite(6),
                styles["Body"],
            ),
            Paragraph(
                "The combined market-access conclusion is therefore straightforward. Clinical evidence creates the reason to cover adrabetadex, but contracting and operations determine where it can be delivered. Hospital agreements, 340B strategy, PBM and specialty-pharmacy arrangements, HCPCS timing, pass-through execution, and provider-support architecture all need to move in parallel if launch adoption is going to extend beyond a handful of high-capability sites. "
                + cite(3, 4, 5, 6, 7, 13, 14, 15),
                styles["Body"],
            ),
            PageBreak(),
            Paragraph("Sources", styles["Section"]),
        ]
    )

    sources = [
        "[1] Beren Therapeutics / Mandos. Adrabetadex Pre-approval Information Exchange deck provided by client, February 2026.",
        "[2] Beren Therapeutics. Project Castar internal training deck provided by client, January 2026.",
        "[3] Integrated provider economics scenario model prepared from the supplied Adrabetadex source set and current client assumptions for this combined brief, March 30, 2026.",
        "[4] UnitedHealthcare. Miplyffa (arimoclomol) - Prior Authorization / Medical Necessity - Commercial Plans. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/h-p/PA-Med-Nec-Miplyffa.pdf",
        "[5] UnitedHealthcare. Aqneursa (levacetylleucine) - Prior Authorization / Medical Necessity - Commercial Plans. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/a-g/PA-Med-Nec-Aqneursa.pdf",
        "[6] UnitedHealthcare. Medication sourcing protocol - Requirements to use a participating specialty pharmacy for certain medications - UnitedHealthcare commercial plans, published June 24, 2025. https://ams-gateway.uhcprovider.com/content/dam/provider/docs/public/resources/pharmacy/medication-expansion-sourcing-faq.pdf",
        "[7] UnitedHealthcare. Provider Administered Drugs - Site of Care - Commercial Medical Benefit Drug Policy. https://www.uhcprovider.com/content/dam/provider/docs/public/policies/comm-medical-drug/provider-administered-drugs-soc.pdf",
        "[8] HRSA. How is the 340B ceiling price calculated? https://www.hrsa.gov/about/faqs/how-340b-ceiling-price-calculated",
        "[9] HRSA. Pricing Formulas and new-drug price estimation. https://340bpricingsubmissions.hrsa.gov/Help/Manufacturer/Pricing%20Formulas/Pricing%20Formulas.htm",
        "[10] Medicaid.gov. Early and Periodic Screening, Diagnostic, and Treatment. https://www.medicaid.gov/medicaid/benefits/early-and-periodic-screening-diagnostic-and-treatment",
        "[11] Medicaid.gov. Physician Administered Drugs (PAD). https://www.medicaid.gov/medicaid/prescription-drugs/state-prescription-drug-resources/physician-administered-drugs-pad",
        "[12] CMS. Part B Drug Payment Limits Overview. https://www.cms.gov/files/document/part-b-drug-payment-limits-overview.pdf-0",
        "[13] CMS. HCPCS Level II Coding Procedures, last modified March 20, 2026. https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system/level-ii-coding-process",
        "[14] CMS. Pass-Through Payment Status and New Technology Ambulatory Payment Classification (APC), last modified March 19, 2026. https://www.cms.gov/medicare/payment/prospective-payment-systems/hospital-outpatient/pass-through-payment-status-new-technology-ambulatory-payment-classification-apc",
        "[15] CMS. Process and Information Required to Determine Eligibility of Drugs and Biologicals for Transitional Pass-Through Status under OPPS, updated March 16, 2026. https://www.cms.gov/files/document/determine-eligibility-drugs-biologicals-transitional-pass-through-payment-under-hospital-outpatient.pdf",
        "[16] CMS. Medicare to Pay for Unclassified, FDA-Approved Drugs Administered in Outpatient Departments. https://www.cms.gov/newsroom/press-releases/medicare-pay-unclassified-fda-approved-drugs-administered-outpatient-departments",
        "[17] Medicare.gov. Medicaid. https://www.medicare.gov/basics/costs/help/medicaid",
        "[18] Aetna. Clinical Policy Bulletin 0442: Lysosomal Storage Disorder Treatments. https://www.aetna.com/cpb/medical/data/400_499/0442.html",
    ]
    source_items = [ListItem(as_paragraph(source, styles["Source"])) for source in sources]
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
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        topMargin=1.28 * inch,
        bottomMargin=1.02 * inch,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        title="Adrabetadex Navisync Combined Final",
        author="OpenAI Codex for JL Policy Consulting",
    )
    doc.build(build_story(styles), onFirstPage=page_chrome, onLaterPages=page_chrome)
    print(OUTPUT_PATH)


if __name__ == "__main__":
    main()
