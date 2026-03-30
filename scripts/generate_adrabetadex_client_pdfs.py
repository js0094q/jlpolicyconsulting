from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

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
OUTPUT_DIR = ROOT / "output" / "doc"
RUN_DATE = "March 30, 2026"
RUN_DATE_SHORT = "03/30/26"
BRAND_NAVY = colors.HexColor("#13172B")
BRAND_BLUE = colors.HexColor("#2F56D4")
BRAND_BODY = colors.HexColor("#5A6880")
BRAND_MUTED = colors.HexColor("#8B96AA")
BRAND_SURFACE = colors.HexColor("#F5F7FB")
BRAND_SURFACE_ALT = colors.HexColor("#FAFBFE")
BRAND_BORDER = colors.HexColor("#DFE5F0")


@dataclass(frozen=True)
class Section:
    title: str
    paragraphs: tuple[str, ...] = ()
    bullets: tuple[str, ...] = ()
    table: list[list[str]] | None = None
    note: str | None = None


@dataclass(frozen=True)
class DocumentSpec:
    filename: str
    title: str
    subtitle: str
    audience: str
    sections: tuple[Section, ...]
    sources: tuple[str, ...]


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="HeroTitle",
            parent=styles["Title"],
            fontName="Times-Bold",
            fontSize=23,
            leading=29,
            alignment=TA_CENTER,
            textColor=BRAND_NAVY,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeroSubtitle",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=11,
            leading=15,
            alignment=TA_CENTER,
            textColor=BRAND_BODY,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeroMeta",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.6,
            leading=12,
            alignment=TA_CENTER,
            textColor=BRAND_BLUE,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeroMetaMuted",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=12,
            alignment=TA_CENTER,
            textColor=BRAND_MUTED,
            spaceAfter=0,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionHeading",
            parent=styles["Heading2"],
            fontName="Times-Bold",
            fontSize=15,
            leading=19,
            textColor=BRAND_NAVY,
            spaceBefore=12,
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="DocBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.1,
            leading=14.8,
            textColor=BRAND_BODY,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=13.8,
            textColor=BRAND_BODY,
            leftIndent=14,
            firstLineIndent=0,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHeader",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=11.4,
            textColor=BRAND_NAVY,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=11.4,
            textColor=BRAND_BODY,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SourceBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=BRAND_BODY,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="NoteBody",
            parent=styles["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=8.5,
            leading=11,
            textColor=BRAND_MUTED,
            spaceBefore=4,
            spaceAfter=4,
        )
    )
    return styles


def page_chrome(canvas, doc):
    canvas.saveState()
    header_center_y = letter[1] - 0.56 * inch
    logo_size = 0.40 * inch
    logo_x = doc.leftMargin
    logo_y = header_center_y - (logo_size / 2)

    canvas.setFillColor(BRAND_BLUE)
    canvas.roundRect(logo_x, logo_y, logo_size, logo_size, 0.08 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 12.5)
    canvas.drawCentredString(logo_x + (logo_size / 2), logo_y + 0.135 * inch, "JL")

    wordmark_x = logo_x + 0.50 * inch
    canvas.setFillColor(BRAND_BLUE)
    canvas.setFont("Helvetica-Bold", 11.6)
    canvas.drawString(wordmark_x, header_center_y + 0.045 * inch, "JL Policy Consulting")
    canvas.setFillColor(BRAND_MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(wordmark_x, header_center_y - 0.11 * inch, "LLC")

    canvas.setFillColor(BRAND_MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(letter[0] - doc.rightMargin, header_center_y + 0.05 * inch, RUN_DATE_SHORT)

    rule_y = letter[1] - 0.8 * inch
    canvas.setStrokeColor(BRAND_BLUE)
    canvas.setLineWidth(2)
    canvas.line(doc.leftMargin, rule_y, letter[0] - doc.rightMargin, rule_y)

    footer_rule_y = 0.86 * inch
    canvas.line(doc.leftMargin, footer_rule_y, letter[0] - doc.rightMargin, footer_rule_y)
    canvas.setFillColor(BRAND_MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 0.34 * inch, "jlpolicyconsulting.com")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.34 * inch, f"Page {doc.page}")
    canvas.restoreState()


def as_paragraph(text: str, style):
    return Paragraph(text.replace("&", "&amp;"), style)


def make_table(rows: list[list[str]], styles):
    normalized = []
    for row_index, row in enumerate(rows):
        cell_style = styles["TableHeader"] if row_index == 0 else styles["TableBody"]
        normalized.append([as_paragraph(cell, cell_style) for cell in row])
    table = Table(normalized, repeatRows=1, colWidths=None)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND_SURFACE),
                ("TEXTCOLOR", (0, 0), (-1, 0), BRAND_NAVY),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, BRAND_BORDER),
                ("BOX", (0, 0), (-1, -1), 0.6, BRAND_BORDER),
                ("LINEABOVE", (0, 0), (-1, 0), 2, BRAND_BLUE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BRAND_SURFACE_ALT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def make_title_card(doc: DocumentSpec, styles, width: float):
    title_stack = [
        Paragraph(doc.title, styles["HeroTitle"]),
        Paragraph(doc.subtitle, styles["HeroSubtitle"]),
        Paragraph(f"Audience: {doc.audience}", styles["HeroMeta"]),
        Paragraph(
            f"Prepared {RUN_DATE}. Facts reflect the attached source set and public CMS, HRSA, Medicaid, Medicare, and payer policy sources reviewed on {RUN_DATE}.",
            styles["HeroMetaMuted"],
        ),
    ]
    title_card = Table([[title_stack]], colWidths=[width])
    title_card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), BRAND_SURFACE),
                ("BOX", (0, 0), (-1, -1), 0, colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 26),
                ("RIGHTPADDING", (0, 0), (-1, -1), 26),
                ("TOPPADDING", (0, 0), (-1, -1), 24),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 24),
            ]
        )
    )
    return title_card


def build_document(doc: DocumentSpec, styles):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_path = OUTPUT_DIR / doc.filename
    pdf = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        topMargin=1.12 * inch,
        bottomMargin=1.02 * inch,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        title=doc.title,
        author="OpenAI Codex for JL Policy Consulting",
    )

    story = [
        make_title_card(doc, styles, pdf.width),
        Spacer(1, 0.16 * inch),
    ]

    for section in doc.sections:
        story.append(Paragraph(section.title, styles["SectionHeading"]))
        for paragraph in section.paragraphs:
            story.append(as_paragraph(paragraph, styles["DocBody"]))
        if section.bullets:
            bullet_items = [
                ListItem(as_paragraph(item, styles["BulletBody"])) for item in section.bullets
            ]
            story.append(
                ListFlowable(
                    bullet_items,
                    bulletType="bullet",
                    start="circle",
                    leftPadding=12,
                    bulletFontName="Helvetica",
                    bulletFontSize=8,
                )
            )
            story.append(Spacer(1, 0.08 * inch))
        if section.table:
            story.append(make_table(section.table, styles))
            story.append(Spacer(1, 0.08 * inch))
        if section.note:
            story.append(as_paragraph(section.note, styles["NoteBody"]))

    story.extend(
        [
            PageBreak(),
            Paragraph("Sources", styles["SectionHeading"]),
        ]
    )
    source_items = [ListItem(as_paragraph(source, styles["SourceBody"])) for source in doc.sources]
    story.append(
        ListFlowable(
            source_items,
            bulletType="bullet",
            start="circle",
            leftPadding=12,
            bulletFontName="Helvetica",
            bulletFontSize=8,
        )
    )

    pdf.build(story, onFirstPage=page_chrome, onLaterPages=page_chrome)
    return output_path


def specs() -> tuple[DocumentSpec, ...]:
    doc_one = DocumentSpec(
        filename="Adrabetadex_U.S._Launch_Background_and_Core_Assumptions_MLR.pdf",
        title="Adrabetadex U.S. Launch Background and Core Assumptions",
        subtitle="MLR review draft",
        audience="Medical, legal, regulatory, and internal access reviewers",
        sections=(
            Section(
                title="Launch frame",
                paragraphs=(
                    "Adrabetadex is under FDA priority review with a Prescription Drug User Fee Act action date of August 17, 2026. The launch planning frame in the supplied Beren materials centers on infantile-onset Niemann-Pick disease type C (NPC), defined internally as neurologic symptom onset before 6 years of age.",
                    "The epidemiology used across the source set is consistent. The U.S. PIE deck places total NPC incidence at roughly 40 patients per year in the United States, infantile-onset incidence at roughly 20 patients per year, and infantile-onset incidence at roughly 0.059 patients per year per 1 million covered lives. The same deck states that about 50% of the NPC population has infantile-onset disease.",
                    "The burden narrative is also stable across the attachments. The PIE deck reports an average delay between symptom onset and confirmed diagnosis of 2.5 years for early infantile-onset NPC and 4.3 years for late infantile-onset NPC. In a disease where early infantile mortality can occur before first grade, that delay is economically relevant because it compresses the usable treatment window and concentrates payer review on very sick children.",
                ),
            ),
            Section(
                title="Clinical differentiation in the supplied evidence package",
                paragraphs=(
                    "The current adrabetadex value story is built around survival and preservation of function, not around symptom control alone. The PIE materials state that treatment with adrabetadex was associated with a 71% reduction in risk of death in infantile-onset NPC versus matched external controls, with 5-year survival of 84% in treated patients versus 42% in external controls.",
                    "The same source set reports that the signal persists across major subgroups. The early infantile subgroup is described as having an 85% lower risk of death versus controls and the late infantile subgroup a 66% lower risk of death. The deck also reports benefit with and without concomitant miglustat, which matters because current NPC practice still uses miglustat off label in the United States.",
                    "The safety package in the internal training deck reports 71 patients treated on the proposed commercial dosing regimen for an average of 3.8 years, with 2 of 71 patients discontinuing because of a treatment-emergent adverse event. That same source identifies hearing impairment, transient post-dose fatigue or ataxia, and vomiting as the recurrent management issues.",
                ),
            ),
            Section(
                title="Commercialization assumptions already embedded in the launch model",
                paragraphs=(
                    "The Beren internal training deck makes the commercial assumptions explicit. It states that U.S. payer primary research supports premium pricing up to $1.8 million, estimates annual list prices for Aqneursa at $350,000 to $700,000 and for Miplyffa plus miglustat at $590,000 to $1.7 million, and models adrabetadex with a weighted average gross-to-net discount of about 15% in a 50% commercial and 50% Medicaid mix.",
                    "The same base case assumes a $1.1 million annual price, a 1.0% annual price increase, 175 currently diagnosed infantile patients, 60 expanded access patients converting at launch, 250 undiagnosed patients, 20 misdiagnosed patients, and 25 newly born infantile patients per year. Penetration assumptions are 80% of diagnosed patients, 65% of undiagnosed patients, 45% of misdiagnosed patients, and 75% of newly born patients.",
                    "The provider model brief anchors unit economics with a working WAC of $39,000 per 900 mg vial administered every two weeks. At 26 administrations per year, that equals $1,014,000 of annual gross drug WAC before administration costs, wastage, or pricing round-up. The aligned client set tests 15%, 20%, and 30% commercial reference-price views, or $33,150, $31,200, and $27,300 per dose, and 5% and 10% non-340B manufacturer support, or $1,950 and $3,900 per dose, because those ranges change provider margin outside 340B.",
                ),
            ),
            Section(
                title="How commercial payers already handle analogous rare neurologic therapies",
                bullets=(
                    "UnitedHealthcare's commercial Miplyffa criteria require genetically confirmed NPC, use in combination with miglustat, no concurrent Aqneursa, specialist involvement, and documentation of positive clinical response at reauthorization. Authorizations are issued for 12 months.",
                    "UnitedHealthcare's commercial Aqneursa criteria require genetically confirmed NPC, treatment of neurologic manifestations, use with miglustat or prior failure, contraindication, or intolerance to miglustat, no concurrent Miplyffa, specialist involvement, and positive clinical response at reauthorization. Authorizations are issued for 12 months.",
                    "Louisiana Blue's Miplyffa policy adds harder functional gates. It requires age 2 years or older, weight at least 8 kg, neurologic signs, use with miglustat, no concurrent Aqneursa, no adult-onset NPC, and retained ambulation independent or assisted. Reauthorization requires improvement or stabilization in ambulation, fine motor function, swallowing, or speech.",
                    "Aetna's Spinraza policy shows how a major payer manages intrathecal rare disease therapy under the medical benefit. It requires genetic documentation, baseline motor assessments, evidence of positive response at continuation, and recognizes image-guided intrathecal administration as medically necessary.",
                    "Aetna's Brineura policy requires administration by or under the direction of a physician knowledgeable in intraventricular administration and continuation based on no loss or slowed loss of ambulation from baseline.",
                ),
            ),
            Section(
                title="What these assumptions mean for MLR review",
                paragraphs=(
                    "The launch case does not rest on a blank-check medical benefit environment. It rests on a market in which commercial payers already cover rare neurologic therapies through prior authorization, specialist requirements, continuation rules, and combination-therapy restrictions. The payer question is not whether infantile NPC is serious. The payer question is how tightly the plan will operationalize access.",
                    "The source materials therefore support a clean internal distinction between clinical differentiation and reimbursement execution. The clinical story centers on survival. The reimbursement story centers on documentation, coverage criteria, coding, channel control, the concentration of volume inside a small number of experienced pediatric specialty centers, and the HCPCS and pass-through workstream that can first become operational on January 1, 2027 if the approval and pricing package is complete for CMS's September 2026 MEARIS cycle.",
                    "For MLR purposes, the defensible launch position is that adrabetadex enters a supportive but tightly managed access environment. The source set does not support frictionless access language, and it does support explicit commercial and Medicaid operational planning. The aligned client materials also show that non-340B buy-and-bill economics remain thin, 340B economics are materially better, and white-bagging removes drug spread entirely.",
                ),
            ),
        ),
        sources=(
            "Beren Therapeutics / Mandos. Adrabetadex Pre-approval Information Exchange deck provided by client, February 2026.",
            "Beren Therapeutics. Project Castar internal training deck provided by client, January 2026.",
            "JL Policy Consulting. Provider Net Cost Model Concept Brief and Launch Access Reality Addendum for Adrabetadex, supplied PDF, March 2026.",
            "CMS. HCPCS Level II Coding Procedures, last modified March 20, 2026. https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system/level-ii-coding-process",
            "CMS. Pass-Through Payment Status and New Technology APC Assignment, last modified March 19, 2026. https://www.cms.gov/medicare/payment/prospective-payment-systems/hospital-outpatient/pass-through-payment-status-new-technology-ambulatory-payment-classification-apc",
            "CMS. Process and Information Required to Determine Eligibility of Drugs, Biologicals, and Radiopharmaceuticals for Transitional Pass-Through Status under OPPS. https://www.cms.gov/files/document/determine-eligibility-drugs-biologicals-transitional-pass-through-payment-under-hospital-outpatient.pdf",
            "UnitedHealthcare. Miplyffa (arimoclomol) Prior Authorization / Medical Necessity - Commercial Plans, effective June 1, 2025. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/h-p/PA-Med-Nec-Miplyffa.pdf",
            "UnitedHealthcare. Aqneursa (levacetylleucine) Prior Authorization / Medical Necessity - Commercial Plans, effective June 1, 2025. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/a-g/PA-Med-Nec-Aqneursa.pdf",
            "Louisiana Blue. Medical Policy 00919: arimoclomol (Miplyffa), current effective date March 1, 2025. https://www.bcbsla.com/-/media/Medical%20Policies/2025/02/26/21/41/00919%2020250301%20arimoclomol%20Miplyffa_accessible%20pdf.pdf",
            "Aetna. Clinical Policy Bulletin 0915: Nusinersen (Spinraza). https://www.aetna.com/cpb/medical/data/900_999/0915.html",
            "Aetna. Clinical Policy Bulletin 0442: Lysosomal Storage Disorder Treatments, including Brineura. https://www.aetna.com/cpb/medical/data/400_499/0442.html",
        ),
    )

    doc_two = DocumentSpec(
        filename="Adrabetadex_Document_A_Provider_Net_Cost_Model_Concept_Brief.pdf",
        title="Adrabetadex Document A: Provider Net Cost Model Concept Brief",
        subtitle="Provider economics and access execution brief",
        audience="Provider-facing access stakeholders and internal MLR reviewers",
        sections=(
            Section(
                title="Why the provider model matters",
                paragraphs=(
                    "Expanded access experience is not a commercial reimbursement proxy. Under FDA expanded access, manufacturer willingness to supply the investigational drug is the gatekeeper. In commercial launch, the gatekeeper becomes a payer-mediated system of prior authorization, coding, sourcing rules, site-of-care controls, claim edits, and reimbursement timing.",
                    "A provider net cost model translates that shift into auditable economics. The model measures whether a treating center recovers drug acquisition cost and cash exposure after reimbursement mechanics are applied. It does not rely on a generic allowed amount narrative. It uses the actual launch variables that a center will face: acquisition price, whether the plan permits buy-and-bill, whether a 340B price is available, and whether Medicaid claim rules are met.",
                    "The source brief anchors the launch arithmetic at a WAC of $39,000 per 900 mg vial administered every two weeks. That one figure is enough to make provider exposure concrete. At 26 administrations per year, gross annual drug WAC is $1,014,000 before administration costs or denied claims are counted.",
                ),
            ),
            Section(
                title="Commercial payer perspective and treatment of similar products",
                table=[
                    ["Comparator policy", "Initial gate", "Continuation gate", "Economic signal for adrabetadex"],
                    [
                        "UnitedHealthcare commercial - Miplyffa",
                        "Genetic confirmation, use with miglustat, no Aqneursa, specialist involvement, 12-month authorization",
                        "Positive clinical response documented on NPC-specific scales",
                        "Coverage exists, but combination use and ongoing response are managed tightly.",
                    ],
                    [
                        "UnitedHealthcare commercial - Aqneursa",
                        "Genetic confirmation, neurologic manifestations, with miglustat or documented inability to use miglustat, no Miplyffa, 12-month authorization",
                        "Positive clinical response documented on NPC-specific scales",
                        "The commercial market already treats NPC therapy as a managed category, not an open category.",
                    ],
                    [
                        "Louisiana Blue - Miplyffa",
                        "Age and weight gate, genetic confirmation, ambulatory status, no adult-onset disease, with miglustat, no Aqneursa",
                        "Improvement or stabilization in ambulation, fine motor function, swallowing, or speech",
                        "Some plans will use additional functional restrictions beyond the FDA label.",
                    ],
                    [
                        "Aetna - Spinraza / Brineura",
                        "Baseline assessments plus specialist administration requirements",
                        "Positive response or slowed loss of function from baseline",
                        "Intrathecal and intraventricular analogs already tie payment to measurable continuation rules.",
                    ],
                ],
                note="The commercial payer takeaway is direct: adrabetadex will launch into a market where high-acuity pediatric neurologic drugs are covered, but they are covered with explicit utilization management and measurable continuation standards.",
            ),
            Section(
                title="340B pricing explained in plain language",
                paragraphs=(
                    "340B changes provider acquisition cost, not payer coverage criteria. HRSA's core rule is simple: a manufacturer may not charge a covered entity more than the 340B ceiling price, whether the entity buys through a wholesaler or directly from the manufacturer. The ceiling price equals Average Manufacturer Price minus the Unit Rebate Amount.",
                    "The Unit Rebate Amount uses minimum rebate percentages that differ by product type. The current 340B / Medicaid framework uses 23.1% for most brand-name drugs, 17.1% for qualifying brand-name pediatric drugs and clotting factor products, and 13.0% for generics. For a new drug, before AMP is available, HRSA requires manufacturers to estimate the 340B ceiling price using WAC minus the applicable rebate percentage.",
                    "Using the launch WAC in the source brief, a 23.1% new-drug estimate produces a 340B acquisition price of $29,991 per 900 mg vial. If adrabetadex is ultimately treated as a qualifying pediatric brand drug for this purpose, the same calculation at 17.1% would imply $32,331 per 900 mg vial. That means the modeled 340B discount range is $6,669 to $9,009 below WAC on every administration, depending on final program classification. For centers that qualify for 340B, this is a material provider-economics lever. For the manufacturer, it is a material gross-to-net drag.",
                    "340B also creates compliance work. HRSA prohibits duplicate discounts, meaning the same unit cannot generate both a 340B discount and a Medicaid rebate. Covered entities that carve in Medicaid fee-for-service claims must keep the Medicaid Exclusion File listing accurate and must align carve-in or carve-out status with actual billing practice.",
                ),
            ),
            Section(
                title="How the product behaves in Medicaid and for dual-eligible patients",
                paragraphs=(
                    "Medicaid is the most important access engine in the modeled launch. The internal payer mix is 50% Medicaid. EPSDT stands for Early and Periodic Screening, Diagnostic, and Treatment. Medicaid.gov states that EPSDT requires states to cover medically necessary services needed to correct or ameliorate physical or mental conditions in beneficiaries younger than 21, including Medicaid-coverable services that are not otherwise listed in the state plan. In practice, that makes pediatric medical necessity the strongest coverage tailwind for adrabetadex.",
                    "EPSDT is a coverage rule, not a single national reimbursement formula. Physician-administered drug payment remains state-set. Current official state-plan examples show both WAC-based and ASP-based reimbursement. Colorado reimburses physician-administered drugs in the Medicare ASP Drug Pricing File at ASP minus 3.3% and reimburses drugs outside that file at WAC. Pennsylvania pays brand prescriber-administered drugs at the lower of the provider's usual and customary charge or WAC plus 3.2%.",
                    "EPSDT does not remove claim mechanics. Medicaid's Physician Administered Drugs program ties payment availability and federal matching funds to state collection and submission of utilization data and, for defined categories, NDC coding. A clinician-administered adrabetadex claim that fails NDC capture or other PAD edits will not convert cleanly to cash.",
                    "Dual-eligible volume is de minimis in the initial infantile-onset launch population because the labeled population is pediatric. When a dual-eligible beneficiary does receive a Medicare-covered clinician-administered service, Medicare pays first and Medicaid pays last. Medicaid therefore functions as secondary wraparound coverage, not as the primary drug payer, for Medicare-covered services.",
                    "One operational point is critical in 340B settings: HRSA's Medicaid Exclusion File applies to Medicaid fee-for-service, not to Medicaid managed care organizations. The model therefore separates Medicaid fee-for-service, Medicaid managed care, 340B carve-in, and 340B carve-out scenarios instead of averaging them together.",
                ),
            ),
            Section(
                title="HCPCS and pass-through status: impact, timing, and required data",
                paragraphs=(
                    "HCPCS coding and OPPS pass-through status determine whether hospital outpatient claims are visible, payable, and administratively manageable. CMS states that pass-through status is a temporary additional outpatient payment for qualifying new drugs and biologicals while the agency gathers cost data. CMS also states that pass-through runs for at least 2 years but not more than 3 years. For providers, the impact is practical: pass-through can reduce packaging pressure in hospital outpatient departments during early launch, while the absence of product-specific coding increases use of miscellaneous billing, manual review, and denial risk.",
                    "Pass-through status does not replace payer management. It affects hospital outpatient Medicare payment mechanics. It does not eliminate prior authorization, commercial medical-benefit controls, white-bagging rules, or site-of-care edits. For adrabetadex, the operational value is that a clean HCPCS and pass-through path can make hospital outpatient billing more predictable during the launch period while claims data accumulate.",
                    "CMS now requires OPPS pass-through applications through MEARIS. Drug and biological applications are reviewed quarterly. A complete file received by the first business day of March, June, September, or December can take effect on July 1, October 1, January 1, or April 1, respectively. Using the current August 17, 2026 PDUFA date, the earliest practical pass-through effective date would be January 1, 2027 if the approval letter, final label, pricing file, and utilization package are complete in time for the first business day of September 2026.",
                ),
                bullets=(
                    "The HCPCS and pass-through package will need the FDA approval letter, final label, trade and generic name, proposed descriptor, dosage form, package size, method of administration, and billing unit logic.",
                    "CMS states that the application must also include WAC and AWP, ASP if available, actual hospital cost, market-availability date, projected utilization by site of care, and the requested HCPCS code or descriptor.",
                    "If product-specific outpatient coding is not active at launch, hospital outpatient claims may need the interim miscellaneous-code bridge such as C9399 or NOC billing under MAC rules, which is exactly why the coding file and billing guide must be ready before the first broad claims wave.",
                ),
            ),
            Section(
                title="Small provider demo model using public benchmarks and launch inputs",
                paragraphs=(
                    "The table below isolates drug spread only. It excludes administration revenue, anesthesia, imaging, and staffing cost because those amounts vary by site and payer. The purpose is to show what happens to provider economics before procedure revenue is layered in.",
                ),
                table=[
                    [
                        "Scenario",
                        "Acquisition cost per dose",
                        "15% ref / dose",
                        "20% ref / dose",
                        "30% ref / dose",
                        "Drug payment benchmark per dose",
                        "Gross drug spread per dose",
                        "Annualized spread at 26 doses",
                        "Interpretation",
                    ],
                    [
                        "Commercial buy-and-bill at 100% of WAC",
                        "$39,000",
                        "$33,150",
                        "$31,200",
                        "$27,300",
                        "$39,000",
                        "$0",
                        "$0",
                        "Provider economics depend entirely on procedure revenue, denial performance, and payment speed.",
                    ],
                    [
                        "Medicare Part B initial sales benchmark at 103% of WAC",
                        "$39,000",
                        "$33,150",
                        "$31,200",
                        "$27,300",
                        "$40,170",
                        "$1,170",
                        "$30,420",
                        "Public benchmark spread is thin before administration cost and rework cost are applied.",
                    ],
                    [
                        "340B covered entity using the same 103% benchmark",
                        "$29,991",
                        "$33,150",
                        "$31,200",
                        "$27,300",
                        "$40,170",
                        "$10,179",
                        "$264,654",
                        "340B changes the provider economics immediately and materially.",
                    ],
                    [
                        "Commercial white-bagging",
                        "$0",
                        "$33,150",
                        "$31,200",
                        "$27,300",
                        "$0",
                        "$0",
                        "$0",
                        "The specialty pharmacy bills the plan directly, and the provider loses drug spread while retaining operational work.",
                    ],
                ],
                note="Benchmark math: the 15% reference price is $39,000 x 0.85 = $33,150 per dose, the 20% reference price is $39,000 x 0.80 = $31,200, and the 30% reference price is $39,000 x 0.70 = $27,300. The Medicare initial-sales benchmark uses 103% of WAC, or $40,170. The new-drug 340B estimate uses $39,000 x (1 - 0.231) = $29,991.",
            ),
            Section(
                title="Operating-margin sensitivity: procedure revenue, denial performance, payment speed, and labor time",
                paragraphs=(
                    "Provider economics do not stop at drug spread. A live provider model also needs procedure revenue, clinician time cost, denial performance, and payment speed because those items determine whether cash actually turns into margin. The table below adds those operating drivers to the non-340B commercial buy-and-bill scenario.",
                    "These are demo-model inputs, not fixed national rates. The illustration uses $750 of procedure revenue per administration, 1.25 hours of physician time costed at the BLS May 2023 pediatrician mean hourly wage of $98.97, and 3.0 hours of nurse time costed at the BLS December 2024 registered-nurse wages-and-salaries rate of $50.21. Denial drag is modeled at 0.5% of total billed revenue, and payment-speed cost is modeled as 45 days to payment with an 8% annual carrying-cost proxy on the $39,000 drug acquisition.",
                ),
                table=[
                    [
                        "Scenario",
                        "Procedure rev / dose",
                        "Physician + nurse time / dose",
                        "Denial drag / dose",
                        "Payment-speed cost / dose",
                        "Mfr support / dose",
                        "Net op margin / dose",
                        "Annualized at 26 doses",
                    ],
                    [
                        "Commercial buy-and-bill, no extra support",
                        "$750",
                        "$275",
                        "$199",
                        "$385",
                        "$0",
                        "-$109",
                        "-$2,834",
                    ],
                    [
                        "Commercial buy-and-bill + 5.0% manufacturer discount or equivalent rebate",
                        "$750",
                        "$275",
                        "$199",
                        "$385",
                        "+$1,950",
                        "$1,841",
                        "$47,866",
                    ],
                    [
                        "Commercial buy-and-bill + 10.0% manufacturer discount or equivalent rebate",
                        "$750",
                        "$275",
                        "$199",
                        "$385",
                        "+$3,900",
                        "$3,791",
                        "$98,566",
                    ],
                ],
                note="Illustrative labor math: 1.25 x $98.97 = about $124 of physician time and 3.0 x $50.21 = about $151 of nurse time, for about $275 total. Illustrative manufacturer-support math: 5% of a $39,000 WAC equals $1,950 per dose and 10% equals $3,900 per dose.",
            ),
            Section(
                title="What the provider model will include",
                bullets=(
                    "A commercial buy-and-bill scenario, a commercial white-bagging scenario, a Medicaid fee-for-service scenario, a Medicaid managed care scenario, and separate 340B carve-in and carve-out scenarios.",
                    "Drug acquisition cost, drug payment benchmark, claim-denial sensitivity, days-to-payment, and claim-cleanliness inputs for NDC capture and documentation completeness.",
                    "A distinct output for provider cash exposure because a center that buys product at WAC every two weeks carries more risk than a center that only bills administration.",
                    "A separate assumption set for hospital outpatient departments and physician offices because site-of-care policies already differentiate those settings.",
                ),
            ),
            Section(
                title="Bottom line",
                paragraphs=(
                    "The provider model does not prove broad coverage. It proves where provider economics break, where they remain neutral, and where they become favorable. On the supplied inputs, non-340B buy-and-bill economics are thin, 340B economics are strong, and white-bagging removes drug spread entirely.",
                    "That is the practical reason Document A exists. It converts the launch story from abstract market access language into operating numbers that providers, finance teams, and MLR reviewers can inspect line by line.",
                ),
            ),
        ),
        sources=(
            "JL Policy Consulting. Provider Net Cost Model Concept Brief and Launch Access Reality Addendum for Adrabetadex, supplied PDF, March 2026.",
            "Beren Therapeutics. Project Castar internal training deck provided by client, January 2026.",
            "CMS. Part B Drug Payment Limits Overview, published January 2025. https://www.cms.gov/files/document/part-b-drug-payment-limits-overview.pdf-0",
            "CMS. HCPCS Level II Coding Procedures, last modified March 20, 2026. https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system/level-ii-coding-process",
            "CMS. Pass-Through Payment Status and New Technology APC Assignment, last modified March 19, 2026. https://www.cms.gov/medicare/payment/prospective-payment-systems/hospital-outpatient/pass-through-payment-status-new-technology-ambulatory-payment-classification-apc",
            "CMS. OPPS overview and payment policy guide. https://www.cms.gov/cms-guide-medical-technology-companies-and-other-interested-parties/payment/opps",
            "CMS. Process and Information Required to Determine Eligibility of Drugs, Biologicals, and Radiopharmaceuticals for Transitional Pass-Through Status under OPPS. https://www.cms.gov/files/document/determine-eligibility-drugs-biologicals-transitional-pass-through-payment-under-hospital-outpatient.pdf",
            "HRSA. How is the 340B ceiling price calculated? https://www.hrsa.gov/about/faqs/how-340b-ceiling-price-calculated",
            "HRSA. New Drug Price Estimation. https://340bpricingsubmissions.hrsa.gov/Help/Manufacturer/Pricing%20Formulas/New%20Drug%20Price%20Estimation.htm",
            "HRSA. Duplicate Discount Prohibition / Medicaid Exclusion. https://www.hrsa.gov/opa/program-requirements/medicaid-exclusion",
            "340B Health. 340B Program Overview. https://www.340bhealth.org/members/340b-program/overview/",
            "Medicaid.gov. Physician Administered Drugs (PAD). https://www.medicaid.gov/medicaid/prescription-drugs/state-prescription-drug-resources/physician-administered-drugs-pad",
            "Medicaid.gov. Early and Periodic Screening, Diagnostic, and Treatment. https://www.medicaid.gov/medicaid/benefits/early-and-periodic-screening-diagnostic-and-treatment",
            "Colorado Medicaid State Plan, Attachment 4.19-B. Physician-administered drugs in the Medicare ASP Drug Pricing File are reimbursed at ASP minus 3.3%; drugs outside the ASP file are reimbursed at WAC. https://hcpf.colorado.gov/sites/hcpf/files/4_19_B-Methods%20and%20Standards%20for%20Establishing%20Payment%20Rates-Other%20Types%20of%20Care.pdf",
            "Pennsylvania Medicaid State Plan, Attachment 4.19-B. Brand prescriber-administered drugs are reimbursed at the lower of usual and customary charge or WAC plus 3.2%. https://www.pa.gov/content/dam/copapwp-pagov/en/dhs/documents/docs/publications/documents/2023-medicaid-state-plan/0025-Attachment-4.19B.pdf",
            "BLS. Occupational Employment and Wages, May 2023, Pediatricians, General. Mean hourly wage $98.97. https://www.bls.gov/oes/2023/May/oes291221.htm",
            "BLS. Charting compensation costs during National Nurses Month. December 2024 registered nurse wages and salaries in health care and social assistance averaged $50.21 per hour. https://www.bls.gov/opub/ted/2025/charting-compensation-costs-during-national-nurses-month.htm",
            "Medicare.gov. Medicaid and dual eligibility overview. https://www.medicare.gov/basics/costs/help/medicaid",
            "UnitedHealthcare. Medication sourcing protocol FAQ, June 24, 2025. https://www.uhcprovider.com/content/dam/provider/docs/public/resources/pharmacy/medication-expansion-sourcing-faq.pdf",
            "UnitedHealthcare. Provider Administered Drugs - Site of Care - Commercial Medical Benefit Drug Policy. https://www.uhcprovider.com/content/dam/provider/docs/public/policies/comm-medical-drug/provider-administered-drugs-soc.pdf",
            "UnitedHealthcare. Miplyffa (arimoclomol) Prior Authorization / Medical Necessity - Commercial Plans. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/h-p/PA-Med-Nec-Miplyffa.pdf",
            "UnitedHealthcare. Aqneursa (levacetylleucine) Prior Authorization / Medical Necessity - Commercial Plans. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/a-g/PA-Med-Nec-Aqneursa.pdf",
            "Louisiana Blue. Medical Policy 00919: arimoclomol (Miplyffa). https://www.bcbsla.com/-/media/Medical%20Policies/2025/02/26/21/41/00919%2020250301%20arimoclomol%20Miplyffa_accessible%20pdf.pdf",
            "Aetna. Clinical Policy Bulletin 0915: Nusinersen (Spinraza). https://www.aetna.com/cpb/medical/data/900_999/0915.html",
            "Aetna. Clinical Policy Bulletin 0442: Lysosomal Storage Disorder Treatments. https://www.aetna.com/cpb/medical/data/400_499/0442.html",
        ),
    )

    doc_three = DocumentSpec(
        filename="Adrabetadex_Document_B_Reimbursement_Landscape_HCPCS_and_Pass_Through_Addendum.pdf",
        title="Adrabetadex Document B: U.S. Reimbursement Landscape, HCPCS, and Pass-Through Addendum",
        subtitle="Launch friction, coding, and outpatient payment brief",
        audience="Client-facing access and commercialization stakeholders",
        sections=(
            Section(
                title="Launch reality in one sentence",
                paragraphs=(
                    "Adrabetadex enters a market where the medical benefit supports coverage in principle, but coverage is operationalized through prior authorization, specialist prescribing, combination restrictions, white-bagging rules, site-of-care review, and claim-level documentation. Launch success therefore depends on coding and payment execution as much as on clinical differentiation.",
                    "The internal source set recognizes this indirectly by assuming favorable buy-and-bill site economics and a modest 15% gross-to-net burden. The aligned provider model now carries a working WAC of $39,000 per 900 mg vial, commercial reference-price views at 15%, 20%, and 30% below WAC, and non-340B manufacturer-support sensitivities at 5% and 10% because the provider model shows that commercial margin remains thin without either 340B access or additional support. The public record on payer management shows a controlled environment in which plans already manage analogous NPC and rare neurologic therapies with genetic confirmation, functional continuation criteria, sourcing rules, and site-of-care restrictions.",
                ),
            ),
            Section(
                title="What commercial plans already do",
                bullets=(
                    "UnitedHealthcare requires Miplyffa to be used with miglustat, prohibits concurrent Aqneursa, and requires documented positive clinical response for reauthorization.",
                    "UnitedHealthcare requires Aqneursa to be used with miglustat or after failure, contraindication, or intolerance to miglustat, prohibits concurrent Miplyffa, and requires documented positive clinical response for reauthorization.",
                    "UnitedHealthcare's medication sourcing protocol states that when a listed drug is sourced through an indicated specialty pharmacy, the pharmacy bills the plan directly and the outpatient provider may only bill for administration. If the provider does not obtain the drug through the indicated pharmacy, the plan denies payment for the drug.",
                    "UnitedHealthcare's site-of-care policy states that non-hospital infusion sites, physician offices, ambulatory infusion suites, and home infusion are well accepted places of service, and hospital outpatient administration requires medical-record support when the policy applies.",
                    "Aetna and other large plans use the same playbook in analogous therapies: baseline assessment plus continuation rules tied to measurable clinical benefit.",
                ),
            ),
            Section(
                title="HCPCS background that matters at launch",
                paragraphs=(
                    "HCPCS is the operational bridge between FDA approval and paid claims. CMS maintains the national Level II HCPCS code set for drugs, biologicals, and related items not described elsewhere. For hospital outpatient billing, C codes are the temporary HCPCS Level II codes used for drugs, biologicals, devices, and radiopharmaceuticals that receive OPPS pass-through status.",
                    "CMS now requires OPPS drug and biological pass-through applications and New Technology APC applications to be submitted through MEARIS. The CMS pass-through page states that only applications submitted through MEARIS will be accepted. That matters because adrabetadex will need a deliberate outpatient coding path rather than ad hoc local billing workarounds.",
                    "If a hospital outpatient department is billing an FDA-approved drug that does not yet have a product-specific HCPCS code and does not yet have pass-through status, CMS created code C9399 for that exact gap. CMS's hospital outpatient payment guidance also states that OPPS drugs without an assigned HCPCS code are paid at 95% of AWP while a permanent code gap remains.",
                ),
            ),
            Section(
                title="Pass-through and New Technology APC: what they do and what they do not do",
                paragraphs=(
                    "Transitional pass-through payment is temporary additional outpatient payment for new drugs, biologicals, and devices while CMS gathers cost data. CMS states that pass-through payment runs for at least 2 years but not more than 3 years. For drugs and biologicals, eligibility requires that the product be new to the outpatient payment system and that its cost be not insignificant relative to the related OPPS service payment.",
                    "CMS reviews pass-through applications quarterly. Under current policy, the drug pass-through payment amount is generally ASP plus 6% minus the portion of the APC payment amount that CMS associates with the drug or biological. In other words, pass-through is an incremental outpatient payment mechanism; it is not a blank additional payment layered on top of every other amount.",
                    "CMS's current quarterly MEARIS calendar means timing is concrete. A complete application filed by the first business day of March, June, September, or December can take effect on July 1, October 1, January 1, or April 1, respectively. Using the current August 17, 2026 PDUFA date, the earliest practical pass-through effective date is January 1, 2027 if the approval letter, final label, and pricing package are complete in time for the first business day of September 2026.",
                    "CMS also makes the data package concrete. The application needs the FDA approval letter, final label, trade and generic name, proposed HCPCS descriptor, dosage form, package size, method of administration, billing-unit logic, WAC, AWP, ASP if available, actual hospital cost, market-availability date, projected utilization by site of care, and the requested HCPCS code or descriptor.",
                    "A New Technology APC is different. It applies to a truly new outpatient service that does not fit an existing clinical APC and is not eligible for pass-through. CMS places the service into a cost band and later reassigns it once sufficient claims data are available, generally after two to three years. For adrabetadex, the practical first question is whether the outpatient launch need is better described as a drug pass-through question, a service question, or both.",
                ),
            ),
            Section(
                title="Why Medicaid and 340B still sit inside the outpatient coding story",
                paragraphs=(
                    "For a pediatric launch, Medicaid is not a side topic. It is the core access channel in the internal payer mix. EPSDT means Early and Periodic Screening, Diagnostic, and Treatment. It gives the product a strong medical-necessity footing in beneficiaries under age 21, but it is a coverage rule rather than a single national reimbursement formula. Current official state examples show both ASP-based and WAC-based physician-administered drug payment. Colorado pays drugs in the Medicare ASP file at ASP minus 3.3% and pays drugs outside that file at WAC, while Pennsylvania pays brand physician-administered drugs at the lower of usual and customary charge or WAC plus 3.2%. Medicaid claim payment still depends on physician-administered drug data integrity, and Medicaid's PAD rules tie payment availability and federal matching funds to collection and submission of utilization data and, for defined categories, NDC information.",
                    "340B overlaps with that same claim pathway, and the economics are concrete. HRSA's rule is that a manufacturer may not charge a covered entity more than the 340B ceiling price whether the purchase runs through a wholesaler or directly from the manufacturer. The ceiling price equals AMP minus the Unit Rebate Amount. The minimum rebate percentages used in the current framework are 23.1% for most brand drugs, 17.1% for qualifying pediatric brand drugs and clotting factor products, and 13.0% for generics. On the working adrabetadex WAC of $39,000, the new-drug estimate is $29,991 at 23.1% and $32,331 at 17.1%.",
                    "HRSA's duplicate-discount rule applies to Medicaid fee-for-service claims, requires carve-in or carve-out discipline, and publishes the covered entity's fee-for-service billing status in the Medicaid Exclusion File. That means outpatient coding, 340B inventory designation, and Medicaid billing cannot be managed as separate workstreams.",
                    "For dual-eligible beneficiaries, Medicare pays first for Medicare-covered services and Medicaid pays last. In the initial pediatric launch, dual eligibility will be rare. The operational rule still matters because any dual-eligible outpatient claim must be built as a Medicare-primary workflow with Medicaid wraparound rather than as a Medicaid-primary workflow.",
                ),
            ),
            Section(
                title="Practical launch interpretation",
                paragraphs=(
                    "The immediate implication for the client is straightforward. Commercial coverage criteria will exist, but those criteria will sit on top of a highly managed outpatient claims environment. A clean launch requires a product-specific coding strategy, a defined hospital outpatient interim-billing plan, a pass-through application decision, Medicaid NDC readiness, and 340B duplicate-discount controls that are live before the first broad commercial claims submission.",
                    "The aligned provider model clarifies what those mechanics mean economically. Commercial buy-and-bill at 100% of WAC produces zero drug spread, commercial white-bagging removes drug spread entirely, and the modeled 340B scenario produces a materially better spread because acquisition cost drops while the benchmark stays linked to the outpatient payment file. Under the aligned demo-model inputs, non-340B commercial margin only turns positive when additional manufacturer support reaches 5% or 10% of WAC, which is $1,950 or $3,900 per dose.",
                    "The source set already supplies the pricing and access assumptions. The public CMS, HRSA, Medicaid, and payer record supplies the mechanics. Taken together, they support a definitive launch view: adrabetadex reimbursement will be won or lost on operational execution, not on unmet need alone.",
                ),
            ),
        ),
        sources=(
            "JL Policy Consulting. Provider Net Cost Model Concept Brief and Launch Access Reality Addendum for Adrabetadex, supplied PDF, March 2026.",
            "Beren Therapeutics. Project Castar internal training deck provided by client, January 2026.",
            "CMS. HCPCS Level II Coding Procedures, last modified March 20, 2026. https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system/level-ii-coding-process",
            "CMS. Pass-Through Payment Status and New Technology APC Assignment, last modified March 19, 2026. https://www.cms.gov/medicare/payment/prospective-payment-systems/hospital-outpatient/pass-through-payment-status-new-technology-ambulatory-payment-classification-apc",
            "CMS. OPPS overview and payment policy guide. https://www.cms.gov/cms-guide-medical-technology-companies-and-other-interested-parties/payment/opps",
            "CMS. Medicare to Pay for Unclassified, FDA-Approved Drugs Administered in Outpatient Departments. https://www.cms.gov/newsroom/press-releases/medicare-pay-unclassified-fda-approved-drugs-administered-outpatient-departments",
            "CMS. Part B Drug Payment Limits Overview, published January 2025. https://www.cms.gov/files/document/part-b-drug-payment-limits-overview.pdf-0",
            "CMS. Process and Information Required to Determine Eligibility of Drugs, Biologicals, and Radiopharmaceuticals for Transitional Pass-Through Status under OPPS. https://www.cms.gov/files/document/determine-eligibility-drugs-biologicals-transitional-pass-through-payment-under-hospital-outpatient.pdf",
            "Medicaid.gov. Physician Administered Drugs (PAD). https://www.medicaid.gov/medicaid/prescription-drugs/state-prescription-drug-resources/physician-administered-drugs-pad",
            "Medicaid.gov. Early and Periodic Screening, Diagnostic, and Treatment. https://www.medicaid.gov/medicaid/benefits/early-and-periodic-screening-diagnostic-and-treatment",
            "Colorado Department of Health Care Policy and Financing. Pharmacy Billing Manual, physician-administered drug reimbursement methodology. https://hcpf.colorado.gov/pharmacy-billing-manual",
            "Pennsylvania Department of Human Services. Medical Assistance Program Fee Schedule and physician-administered drug pricing methodology. https://www.dhs.pa.gov/providers/Providers/Pages/Medical-Assistance-Provider-Information.aspx",
            "HRSA. How is the 340B ceiling price calculated? https://www.hrsa.gov/about/faqs/how-340b-ceiling-price-calculated",
            "HRSA. New Drug Price Estimation. https://340bpricingsubmissions.hrsa.gov/Help/Manufacturer/Pricing%20Formulas/New%20Drug%20Price%20Estimation.htm",
            "HRSA. Duplicate Discount Prohibition / Medicaid Exclusion. https://www.hrsa.gov/opa/program-requirements/medicaid-exclusion",
            "340B Health. 340B Program Overview. https://www.340bhealth.org/members/340b-program/overview/",
            "Medicare.gov. Medicaid and dual eligibility overview. https://www.medicare.gov/basics/costs/help/medicaid",
            "UnitedHealthcare. Medication sourcing protocol FAQ, June 24, 2025. https://www.uhcprovider.com/content/dam/provider/docs/public/resources/pharmacy/medication-expansion-sourcing-faq.pdf",
            "UnitedHealthcare. Provider Administered Drugs - Site of Care - Commercial Medical Benefit Drug Policy. https://www.uhcprovider.com/content/dam/provider/docs/public/policies/comm-medical-drug/provider-administered-drugs-soc.pdf",
            "UnitedHealthcare. Miplyffa (arimoclomol) Prior Authorization / Medical Necessity - Commercial Plans. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/h-p/PA-Med-Nec-Miplyffa.pdf",
            "UnitedHealthcare. Aqneursa (levacetylleucine) Prior Authorization / Medical Necessity - Commercial Plans. https://www.uhcprovider.com/content/dam/provider/docs/public/prior-auth/drugs-pharmacy/commercial/a-g/PA-Med-Nec-Aqneursa.pdf",
            "Aetna. Clinical Policy Bulletin 0915: Nusinersen (Spinraza). https://www.aetna.com/cpb/medical/data/900_999/0915.html",
            "Aetna. Clinical Policy Bulletin 0442: Lysosomal Storage Disorder Treatments. https://www.aetna.com/cpb/medical/data/400_499/0442.html",
        ),
    )

    return doc_one, doc_two, doc_three


def main():
    styles = build_styles()
    outputs = [build_document(spec, styles) for spec in specs()]
    for output in outputs:
        print(output)


if __name__ == "__main__":
    main()
