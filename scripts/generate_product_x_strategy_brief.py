from __future__ import annotations

import argparse
import textwrap
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX_SITE = ROOT / ".venv-doc" / "lib" / "python3.14" / "site-packages"
REPORTLAB_SITE = ROOT / ".venv" / "lib" / "python3.14" / "site-packages"

for site_path in (DOCX_SITE, REPORTLAB_SITE):
    if site_path.exists():
        sys.path.insert(0, str(site_path))

from docx import Document  # type: ignore[import-not-found]
from docx.enum.section import WD_SECTION_START  # type: ignore[import-not-found]
from docx.enum.text import WD_ALIGN_PARAGRAPH  # type: ignore[import-not-found]
from docx.oxml import OxmlElement  # type: ignore[import-not-found]
from docx.oxml.ns import qn  # type: ignore[import-not-found]
from docx.shared import Inches, Pt, RGBColor  # type: ignore[import-not-found]
from reportlab.lib import colors  # type: ignore[import-not-found]
from reportlab.lib.enums import TA_LEFT, TA_CENTER  # type: ignore[import-not-found]
from reportlab.lib.pagesizes import letter  # type: ignore[import-not-found]
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet  # type: ignore[import-not-found]
from reportlab.lib.units import inch  # type: ignore[import-not-found]
from reportlab.platypus import (  # type: ignore[import-not-found]
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


RUN_DATE = "April 9, 2026"
SHORT_DATE = "04/09/26"
DOC_TITLE = "Product X Reimbursement, Pricing, and Payment Pathway Strategy Brief"
DOC_SUBTITLE = "NDA-safe prose brief aligned to the Excel model"
AUTHOR = "JL Policy Consulting"
WEBSITE = "jlpolicyconsulting.com"

OUT_DOCX = ROOT / "output" / "doc" / "Product_X_Reimbursement_Pathway_Strategy_Brief.docx"
OUT_PDF = ROOT / "output" / "pdf" / "Product_X_Client_Review_Discussion_QA.pdf"
OUT_MD = ROOT / "output" / "doc" / "Product_X_Reimbursement_Pathway_Strategy_Brief.md"

NAVY = colors.HexColor("#143A66")
BLUE = colors.HexColor("#1F5AA6")
ACCENT = colors.HexColor("#2D6CDF")
INK = colors.HexColor("#102030")
MUTED = colors.HexColor("#5B687A")
BORDER = colors.HexColor("#D5DFED")
PALE = colors.HexColor("#F7F9FC")
PALE_ALT = colors.HexColor("#D9E7F5")
CARD = colors.HexColor("#EFF5FD")
WHITE = colors.white

TEXT = {
    "intro": (
        "Source material: Product X discussion document and supporting analysis. "
        "This rewrite removes the interview question format and replaces it with a straight "
        "strategy brief that can be read alongside the Excel model."
    ),
    "1a": (
        "Product X sits squarely within the inpatient reimbursement system and should be framed "
        "accordingly from the outset. Because the therapy is administered as a 48-hour infusion "
        "in the ICU following endovascular thrombectomy, it is reimbursed under the Medicare "
        "Inpatient Prospective Payment System, not under Part B drug payment mechanics."
    ),
    "1b": (
        "This distinction is foundational. Under Part B, drugs are reimbursed on a per-unit "
        "basis, typically tied to ASP, with relatively transparent pass-through economics. None of "
        "those dynamics apply here. Instead, Product X is incorporated into a bundled MS-DRG "
        "payment, where the hospital receives a fixed amount for the entire episode of care "
        "regardless of the therapies used."
    ),
    "1c": (
        "The practical implication is that Product X is not reimbursed as a drug. It is treated "
        "as a cost within the hospital's DRG payment. The payer does not increase reimbursement "
        "when the therapy is used, and the hospital absorbs the full cost at launch. Physician "
        "services associated with the admission remain separately reimbursed under Part B, but "
        "those payments do not offset or interact with the drug's economics in any meaningful way."
    ),
    "1d": (
        "From a strategy perspective, this removes any reliance on traditional buy-and-bill logic "
        "and shifts the entire access problem into hospital margin management."
    ),
    "2a": (
        "Under current reimbursement, EVT cases fall into established MS-DRGs with payments "
        "generally in the range of approximately $25,000 to $50,000, depending on severity. "
        "These DRGs were calibrated based on existing standards of care, which do not include a "
        "high-cost, continuous infusion therapy such as Product X."
    ),
    "2b": (
        "As a result, Product X enters the system as an unrecognized cost within a fixed payment "
        "structure. Hospitals must evaluate whether they can absorb the cost through operational "
        "offsets such as shorter length of stay or reduced ICU utilization. The available data "
        "suggests that Product X can reduce total hospital stay by approximately 3 to 5 days, "
        "which is clinically meaningful but economically insufficient to fully offset the therapy "
        "at most viable price points."
    ),
    "2c": (
        "This creates a structural misalignment. Clinical value accrues across the episode of "
        "care, including reduced downstream utilization and improved discharge patterns, but the "
        "hospital's financial exposure is immediate and concentrated within the index admission. "
        "The payer benefits from reduced total cost of care, while the hospital bears the upfront "
        "cost."
    ),
    "2d": (
        "This misalignment is the central barrier to adoption at launch and explains why pricing "
        "cannot be evaluated independently of reimbursement pathway."
    ),
    "3a": (
        "Pricing for Product X is not set by willingness to pay for clinical benefit in isolation, "
        "but by what the hospital can absorb within or alongside the DRG structure."
    ),
    "3b": (
        "At launch, in the absence of supplemental reimbursement, hospitals anchor pricing to the "
        "recoverable value of reduced utilization. Using reasonable benchmarks for inpatient "
        "variable cost, the value of a 3 to 5 day reduction in length of stay translates into "
        "approximately $10,000 to $15,000. This defines the practical upper bound of an offset-"
        "driven price."
    ),
    "3c": (
        "As pricing moves beyond that range, the therapy transitions from being economically "
        "absorbable to creating negative margin pressure. At approximately $20,000 to $25,000, "
        "hospitals begin to experience meaningful financial strain, and adoption becomes more "
        "selective. Beyond approximately $30,000 to $35,000, the therapy is no longer evaluated "
        "based on offsets and instead becomes explicitly dependent on additional reimbursement."
    ),
    "3d": (
        "This creates a clear inflection point in pricing strategy. Below roughly $20,000, "
        "adoption can be supported through partial offsets and hospital tolerance. Between "
        "$25,000 and $35,000, adoption requires structured reimbursement support. Above that "
        "range, adoption becomes constrained regardless of clinical value unless the payment "
        "system evolves."
    ),
    "4a": (
        "The New Technology Add-On Payment is the single most important mechanism enabling Product "
        "X to bridge the gap between clinical value and hospital economics."
    ),
    "4b": (
        "NTAP provides incremental reimbursement on top of the DRG, typically covering up to "
        "approximately 65 percent of the cost of the new technology. While this does not fully "
        "eliminate the hospital's financial exposure, it materially reduces it. A therapy priced "
        "at $30,000, for example, would expose the hospital to the full cost at launch but only "
        "approximately $10,000 after NTAP support. This shifts the evaluation from a clearly "
        "negative margin to a manageable one."
    ),
    "4c": (
        "Equally important, NTAP functions as a signal of validation from CMS. Approval indicates "
        "that the therapy demonstrates substantial clinical improvement and that its costs are not "
        "already captured in existing DRGs. This reduces payer skepticism and facilitates internal "
        "hospital decision-making, particularly within value analysis committees."
    ),
    "4d": (
        "However, NTAP is temporary. It typically applies for two to three years, after which "
        "reimbursement reverts to the DRG unless adjustments are made. This creates a defined "
        "window in which Product X must demonstrate real-world utilization and cost impact "
        "sufficient to support permanent DRG recalibration."
    ),
    "4e": (
        "From a strategy standpoint, NTAP is not the endpoint. It is a bridge that enables "
        "adoption while generating the data required for long-term reimbursement alignment."
    ),
    "5a": (
        "A critical but often underappreciated component of the reimbursement pathway is "
        "ICD-10-PCS coding. In the inpatient setting, drugs are not tracked or reimbursed through "
        "NDC-based mechanisms. Instead, technologies must be identifiable within the procedural "
        "coding system to create visibility for utilization and cost."
    ),
    "5b": (
        "For Product X, this likely involves securing a New Technology ICD-10-PCS 'X code.' "
        "These codes are used to identify new therapies that are not yet reflected in DRG "
        "definitions. They allow hospitals and CMS to track when the therapy is used, how "
        "frequently it is used, and what incremental costs are associated with it."
    ),
    "5c": (
        "This coding step is essential for two reasons. First, it supports NTAP eligibility by "
        "demonstrating that the therapy is distinct from existing care and not already captured in "
        "DRG payments. Second, it enables CMS to collect the data required to recalibrate DRG "
        "weights or create new groupings in the future."
    ),
    "5d": (
        "The 48-hour infusion profile of Product X strengthens this pathway. Because it is a "
        "prolonged, protocol-driven intervention rather than a single administration, it creates a "
        "clear procedural and resource-use signal. This makes it easier to define, code, and "
        "differentiate from standard supportive care."
    ),
    "5e": (
        "Without appropriate ICD-10-PCS coding, Product X risks being invisible within claims "
        "data, which would undermine both NTAP qualification and long-term reimbursement evolution."
    ),
    "6a": (
        "The long-term reimbursement pathway for Product X follows a standard CMS progression but "
        "requires successful execution at each stage."
    ),
    "6b": (
        "At launch, the therapy is incorporated into existing DRGs and functions as a cost center. "
        "With NTAP approval, hospitals receive partial reimbursement, enabling broader adoption. "
        "During this period, CMS collects real-world data on utilization, cost, and outcomes."
    ),
    "6c": (
        "If Product X demonstrates sustained use and materially changes the cost structure of the "
        "episode, CMS may respond in one of two ways. The more common outcome is a reweighting of "
        "existing DRGs to reflect higher average costs. In some cases, if the therapy defines a "
        "clinically distinct subgroup, CMS may create a DRG split."
    ),
    "6d": (
        "This transition is critical. NTAP is temporary, but DRG adjustment is permanent. Without "
        "it, the therapy reverts to being under-reimbursed once NTAP expires."
    ),
    "6e": (
        "From a strategic perspective, the objective is to ensure that Product X becomes embedded "
        "in standard care pathways quickly enough, and with sufficient economic signal, to justify "
        "DRG recalibration before NTAP sunsets."
    ),
    "7a": (
        "Product X operates within a reimbursement environment where clinical value, payer "
        "benefit, and provider economics are not naturally aligned. The therapy improves outcomes "
        "and reduces downstream costs, but the hospital absorbs the upfront financial burden."
    ),
    "7b": (
        "As a result, the success of Product X depends on sequencing and execution across four "
        "interconnected levers:"
    ),
    "7c": (
        "The key insight is that Product X does not fail or succeed based on clinical performance "
        "alone. It succeeds if it can transition from a bundled cost to a recognized component of "
        "the inpatient payment system within the NTAP window."
    ),
    "7d": (
        "Failure to achieve that transition results in a structurally constrained product, "
        "regardless of clinical differentiation."
    ),
}

REIMBURSEMENT_TABLE = [
    ("Layer", "Payment logic", "Commercial meaning", "Excel tabs"),
    ("Part B", "Per-unit drug reimbursement tied to ASP-style mechanics", "Not the governing launch path for this case", "Reference only"),
    ("IPPS / MS-DRG", "Bundled hospital payment for the admission", "Hospital absorbs launch cost inside a fixed payment", "Inputs, Scenario_No_NTAP"),
    ("NTAP", "Temporary add-on reimbursement on top of the DRG", "Bridge from clinical value to hospital tolerance", "Scenario_NTAP"),
    ("ICD-10-PCS", "Claim visibility within inpatient procedural coding", "Enables utilization tracking and NTAP support", "Sources, coding appendix"),
    ("DRG recalibration", "Long-run weight adjustment or DRG split", "Durable reimbursement alignment", "Scenario_Post_DRG, Price_Ladder"),
]

PRICE_TABLE = [
    ("Approximate price band", "How hospitals tend to read it", "Adoption implication"),
    ("Below $20,000", "Offsets can still carry part of the economic burden", "Adoption is more feasible without dedicated bridge payment"),
    ("$20,000 to $25,000", "Meaningful margin strain begins to appear", "Selective adoption and higher committee scrutiny"),
    ("$30,000 to $35,000", "Reimbursement support becomes explicit", "NTAP or equivalent support is usually required"),
    ("Above $35,000", "The product is no longer offset-driven", "Adoption is constrained until payment changes"),
]

WORKBOOK_TABLE = [
    ("Workbook tab", "What it answers", "Why it matters for the brief"),
    ("Inputs", "Launch price, DRG anchors, LOS assumptions, and NTAP rate", "Defines the base scenario set"),
    ("Episode_Cost_Breakdown", "Bundled and non-bundled episode components", "Separates hospital margin from payer-visible spend"),
    ("Scenario_No_NTAP", "Hospital absorption with no bridge reimbursement", "Shows the launch-period risk"),
    ("Scenario_NTAP", "Bridge economics under policy-consistent NTAP", "Shows the transitional effect"),
    ("Scenario_Post_DRG", "End-state after DRG reweighting", "Shows the durable reimbursement state"),
    ("Episode_Total_Care", "Whole-episode spend from the payer lens", "Shows downstream savings beyond the hospital bill"),
    ("Sensitivity", "How price, delay, and revenue change the outcome", "Shows where the model is resilient or fragile"),
    ("DRG_Weights_Trend", "Historical DRG movement", "Gives directional context for reimbursement evolution"),
    ("DRG_YoY_Change", "Year-over-year change by DRG", "Shows trend behavior rather than a single point"),
    ("DRG_Definitions", "Comparator group titles", "Anchors the analysis in specific DRG language"),
    ("Price_Ladder", "Scenario sweep across price points", "Illustrates the practical inflection range"),
    ("Episode_Scenarios", "Conservative, base, and optimistic assumptions", "Shows the range of utilization effects"),
    ("Sources", "Public source list", "Keeps the brief traceable without exposing internal material"),
]

PUBLIC_SOURCES = [
    ("CMS NTAP page", "https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps/new-medical-services-and-new-technologies"),
    ("CMS Acute Inpatient PPS overview", "https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps"),
    ("CMS IPPS guide for medical technology companies", "https://www.cms.gov/cms-guide-medical-technology-companies-and-other-interested-parties/payment/ipps"),
    ("CMS ICD-10-PCS code request process", "https://www.cms.gov/medicare/coding-billing/icd-10-codes/process-for-requesting-new-revised-icd-10-pcs-procedure-codes"),
    ("CMS outlier payment overview", "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/AcuteInpatientPPS/outlier.html"),
    ("CMS Physician Fee Schedule overview", "https://www.cms.gov/cms-guide-medical-technology-companies-and-other-interested-parties/payment/physician-fee-schedule"),
]


def ensure_ascii(text: str) -> str:
    substitutions = {
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u00a0": " ",
    }
    for old, new in substitutions.items():
        text = text.replace(old, new)
    return text


def wrap_paragraphs(text: str) -> list[str]:
    return [ensure_ascii(line.strip()) for line in textwrap.fill(text, 92).splitlines()]


def table_to_markdown(rows: list[tuple[str, ...]]) -> str:
    header = rows[0]
    body = rows[1:]
    widths = [max(len(row[i]) for row in rows) for i in range(len(header))]
    out = []
    out.append("| " + " | ".join(header) + " |")
    out.append("| " + " | ".join("-" * max(3, widths[i]) for i in range(len(header))) + " |")
    for row in body:
        out.append("| " + " | ".join(row) + " |")
    return "\n".join(out)


def write_markdown(path: Path) -> None:
    lines: list[str] = []
    lines.append(f"# {DOC_TITLE}")
    lines.append("")
    lines.append(f"Prepared by JL Policy Consulting | {RUN_DATE}")
    lines.append("")
    lines.append("NDA-safe prose brief aligned to the Excel model.")
    lines.append("")
    lines.append("Source material: Product X discussion document and supporting analysis.")
    lines.append("")
    lines.extend(["## 1. Reimbursement Foundation: IPPS, Not Part B", ""])
    lines.extend(wrap_paragraphs(TEXT["1a"]))
    lines.append("")
    lines.extend(wrap_paragraphs(TEXT["1b"]))
    lines.append("")
    lines.extend(wrap_paragraphs(TEXT["1c"]))
    lines.append("")
    lines.extend(wrap_paragraphs(TEXT["1d"]))
    lines.append("")
    lines.append(table_to_markdown(REIMBURSEMENT_TABLE))
    lines.append("")
    lines.extend(["## 2. DRG Constraint and Economic Misalignment", ""])
    for key in ("2a", "2b", "2c", "2d"):
        lines.extend(wrap_paragraphs(TEXT[key]))
        lines.append("")
    lines.extend(["## 3. Pricing Strategy Anchored to Reimbursement", ""])
    for key in ("3a", "3b", "3c", "3d"):
        lines.extend(wrap_paragraphs(TEXT[key]))
        lines.append("")
    lines.append(table_to_markdown(PRICE_TABLE))
    lines.append("")
    lines.extend(["## 4. NTAP as the Critical Bridge Mechanism", ""])
    for key in ("4a", "4b", "4c", "4d", "4e"):
        lines.extend(wrap_paragraphs(TEXT[key]))
        lines.append("")
    lines.extend(["## 5. ICD-10-PCS Coding as a Prerequisite for Payment Visibility", ""])
    for key in ("5a", "5b", "5c", "5d", "5e"):
        lines.extend(wrap_paragraphs(TEXT[key]))
        lines.append("")
    lines.extend(["## 6. DRG Evolution and Long-Term Reimbursement", ""])
    for key in ("6a", "6b", "6c", "6d", "6e"):
        lines.extend(wrap_paragraphs(TEXT[key]))
        lines.append("")
    lines.extend(["## 7. Strategic Synthesis", ""])
    for key in ("7a", "7b"):
        lines.extend(wrap_paragraphs(TEXT[key]))
        lines.append("")
    lines.append("- Pricing discipline, aligned to what can be supported within DRG constraints")
    lines.append("- ICD-10-PCS coding, to establish visibility and differentiation")
    lines.append("- NTAP approval, to enable early adoption and reduce financial risk")
    lines.append("- DRG recalibration, to create durable reimbursement alignment")
    lines.append("")
    lines.extend(wrap_paragraphs(TEXT["7c"]))
    lines.append("")
    lines.extend(wrap_paragraphs(TEXT["7d"]))
    lines.append("")
    lines.extend(["## Appendix A. Workbook Map", ""])
    lines.append(table_to_markdown(WORKBOOK_TABLE))
    lines.append("")
    lines.extend(["## Appendix B. Public Sources", ""])
    lines.append("| Source | URL |")
    lines.append("| --- | --- |")
    for label, url in PUBLIC_SOURCES:
        lines.append(f"| {label} | {url} |")

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def set_cell_shading(cell, fill: str) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), fill)
    tc_pr.append(shd)


def style_docx(document: Document) -> None:
    section = document.sections[0]
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.75)
    section.left_margin = Inches(0.85)
    section.right_margin = Inches(0.85)

    for style_name, font_name, size in [
        ("Normal", "Avenir Next", 10.2),
        ("Title", "Times New Roman", 24),
        ("Heading 1", "Times New Roman", 16),
        ("Heading 2", "Avenir Next", 11.5),
        ("Heading 3", "Avenir Next", 10.5),
    ]:
        style = document.styles[style_name]
        style.font.name = font_name
        style.font.size = Pt(size)

    document.styles["Normal"].font.color.rgb = RGBColor(16, 32, 48)


def add_docx_table(document: Document, rows: list[tuple[str, ...]]) -> None:
    table = document.add_table(rows=1, cols=len(rows[0]))
    table.style = "Table Grid"
    hdr = table.rows[0].cells
    for idx, value in enumerate(rows[0]):
        hdr[idx].text = value
        for p in hdr[idx].paragraphs:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_cell_shading(hdr[idx], "D9E7F5")
    for row in rows[1:]:
        cells = table.add_row().cells
        for idx, value in enumerate(row):
            cells[idx].text = value
    document.add_paragraph("")


def write_docx(path: Path) -> None:
    doc = Document()
    style_docx(doc)

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title.add_run(DOC_TITLE)
    run.bold = True
    run.font.name = "Times New Roman"
    run.font.size = Pt(22)
    run.font.color.rgb = RGBColor(16, 32, 48)

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = subtitle.add_run(f"Prepared by JL Policy Consulting | {RUN_DATE}")
    run.italic = True
    run.font.name = "Avenir Next"
    run.font.size = Pt(10.5)
    run.font.color.rgb = RGBColor(91, 104, 122)

    note = doc.add_paragraph()
    note.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = note.add_run(DOC_SUBTITLE)
    run.font.name = "Avenir Next"
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(31, 90, 166)

    doc.add_paragraph("")
    intro = doc.add_paragraph()
    intro.alignment = WD_ALIGN_PARAGRAPH.CENTER
    intro.add_run(TEXT["intro"])

    doc.add_paragraph("")
    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("1. Reimbursement Foundation: IPPS, Not Part B")
    for key in ("1a", "1b", "1c", "1d"):
        doc.add_paragraph(TEXT[key])
    add_docx_table(doc, REIMBURSEMENT_TABLE)

    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("2. DRG Constraint and Economic Misalignment")
    for key in ("2a", "2b", "2c", "2d"):
        doc.add_paragraph(TEXT[key])

    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("3. Pricing Strategy Anchored to Reimbursement")
    for key in ("3a", "3b", "3c", "3d"):
        doc.add_paragraph(TEXT[key])
    add_docx_table(doc, PRICE_TABLE)

    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("4. NTAP as the Critical Bridge Mechanism")
    for key in ("4a", "4b", "4c", "4d", "4e"):
        doc.add_paragraph(TEXT[key])

    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("5. ICD-10-PCS Coding as a Prerequisite for Payment Visibility")
    for key in ("5a", "5b", "5c", "5d", "5e"):
        doc.add_paragraph(TEXT[key])

    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("6. DRG Evolution and Long-Term Reimbursement")
    for key in ("6a", "6b", "6c", "6d", "6e"):
        doc.add_paragraph(TEXT[key])

    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("7. Strategic Synthesis")
    for key in ("7a", "7b"):
        doc.add_paragraph(TEXT[key])
    for bullet in [
        "Pricing discipline, aligned to what can be supported within DRG constraints",
        "ICD-10-PCS coding, to establish visibility and differentiation",
        "NTAP approval, to enable early adoption and reduce financial risk",
        "DRG recalibration, to create durable reimbursement alignment",
    ]:
        doc.add_paragraph(bullet, style="List Bullet")
    doc.add_paragraph(TEXT["7c"])
    doc.add_paragraph(TEXT["7d"])

    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("Appendix A. Workbook Map")
    add_docx_table(doc, WORKBOOK_TABLE)

    h = doc.add_paragraph()
    h.style = "Heading 1"
    h.add_run("Appendix B. Public Sources")
    add_docx_table(doc, [("Source", "URL")] + PUBLIC_SOURCES)

    path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(path)


def style_pdf(styles):
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            parent=styles["Title"],
            fontName="Times-Bold",
            fontSize=23,
            leading=27,
            alignment=TA_CENTER,
            textColor=INK,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverSub",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.7,
            leading=13.5,
            alignment=TA_CENTER,
            textColor=MUTED,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverMeta",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=11,
            alignment=TA_CENTER,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverAudience",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.6,
            leading=10.5,
            alignment=TA_CENTER,
            textColor=BLUE,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionHeading",
            parent=styles["Heading2"],
            fontName="Times-Bold",
            fontSize=17,
            leading=20,
            textColor=INK,
            spaceBefore=10,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubsectionHeading",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11.4,
            leading=14,
            textColor=ACCENT,
            spaceBefore=7,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.7,
            leading=13.7,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="JLBullet",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=INK,
            leftIndent=12,
            firstLineIndent=0,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableCell",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=11.2,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHeader",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=10.5,
            textColor=ACCENT,
        )
    )


def p(text: str, style) -> Paragraph:
    safe = ensure_ascii(text).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return Paragraph(safe, style)


def make_table(rows: list[tuple[str, ...]], styles, widths: list[float]) -> Table:
    rendered = [[p(cell, styles["TableCell"]) for cell in row] for row in rows]
    table = Table(rendered, colWidths=widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALE_ALT),
                ("TEXTCOLOR", (0, 0), (-1, 0), ACCENT),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, CARD]),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def header(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(WHITE)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(BLUE)
    canvas.roundRect(doc.leftMargin, height - 0.62 * inch, 0.3 * inch, 0.3 * inch, 4, stroke=0, fill=1)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 8.2)
    canvas.drawCentredString(doc.leftMargin + 0.15 * inch, height - 0.49 * inch, "JL")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 9)
    canvas.drawString(doc.leftMargin + 0.38 * inch, height - 0.41 * inch, "JL Policy Consulting")
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(2)
    canvas.line(doc.leftMargin, height - 0.8 * inch, width - doc.rightMargin, height - 0.8 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - doc.rightMargin, height - 0.41 * inch, SHORT_DATE)
    canvas.line(doc.leftMargin, 0.82 * inch, width - doc.rightMargin, 0.82 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 0.48 * inch, WEBSITE)
    canvas.drawRightString(width - doc.rightMargin, 0.48 * inch, f"Page {doc.page}")
    canvas.restoreState()


def cover_header(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(WHITE)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(BLUE)
    canvas.roundRect(doc.leftMargin, height - 0.62 * inch, 0.3 * inch, 0.3 * inch, 4, stroke=0, fill=1)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 8.2)
    canvas.drawCentredString(doc.leftMargin + 0.15 * inch, height - 0.49 * inch, "JL")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 9)
    canvas.drawString(doc.leftMargin + 0.38 * inch, height - 0.41 * inch, "JL Policy Consulting")
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(2)
    canvas.line(doc.leftMargin, height - 0.8 * inch, width - doc.rightMargin, height - 0.8 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - doc.rightMargin, height - 0.41 * inch, SHORT_DATE)
    canvas.line(doc.leftMargin, 0.82 * inch, width - doc.rightMargin, 0.82 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 0.48 * inch, WEBSITE)
    canvas.restoreState()


def build_pdf_story(styles):
    story: list = []
    story.extend(
        [
            Spacer(1, 1.1 * inch),
            Table(
                [
                    [p(DOC_TITLE, styles["CoverTitle"])],
                    [p("Prepared by JL Policy Consulting | April 2026", styles["CoverSub"])],
                    [p(DOC_SUBTITLE, styles["CoverSub"])],
                    [p("Audience: reimbursement, market access, and hospital economics stakeholders", styles["CoverAudience"])],
                    [p("Facts reflect the source brief and public CMS materials reviewed for the Excel model.", styles["CoverMeta"])],
                ],
                colWidths=[6.55 * inch],
                hAlign="CENTER",
            ),
        ]
    )
    story[-1].setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.0, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 18),
                ("RIGHTPADDING", (0, 0), (-1, -1), 18),
                ("TOPPADDING", (0, 0), (-1, -1), 16),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(Spacer(1, 0.25 * inch))
    story.append(p("Why the pathway matters", styles["SectionHeading"]))
    story.append(
        p(
            "Product X belongs in the inpatient reimbursement frame, not a Part B drug frame. "
            "That makes the Excel model a hospital economics tool: it measures how a bundled "
            "payment, a temporary add-on, and a durable DRG adjustment interact across launch and "
            "post-launch periods.",
            styles["Body"],
        )
    )
    story.append(
        p(
            "The table below captures the minimum set of decisions the brief answers. It keeps the "
            "narrative NDA-safe while showing how the workbook translates reimbursement mechanics "
            "into pricing and adoption implications.",
            styles["Body"],
        )
    )
    story.append(
        make_table(
            [
                ("Core readout", "What it means", "Excel linkage"),
                ("IPPS is the governing reimbursement path", "The product is a hospital cost, not a Part B drug.", "Inputs, Scenario_No_NTAP"),
                ("NTAP is the bridge", "Temporary add-on reimbursement narrows the launch gap.", "Scenario_NTAP"),
                ("DRG recalibration is the durable end state", "Long-run adoption depends on bundled payment alignment.", "Scenario_Post_DRG, Price_Ladder"),
            ],
            styles,
            [2.2 * inch, 3.0 * inch, 1.35 * inch],
        )
    )
    story.append(PageBreak())
    story.append(p("1. Reimbursement Foundation: IPPS, Not Part B", styles["SectionHeading"]))
    for key in ("1a", "1b", "1c", "1d"):
        story.append(p(TEXT[key], styles["Body"]))
    story.append(Spacer(1, 0.03 * inch))
    story.append(make_table(REIMBURSEMENT_TABLE, styles, [1.35 * inch, 2.05 * inch, 1.95 * inch, 1.35 * inch]))
    story.append(Spacer(1, 0.05 * inch))
    story.append(p("The point of the table is simple: Product X is a hospital economics problem first and a drug payment problem only in a limited sense.", styles["Body"]))

    story.append(p("2. DRG Constraint and Economic Misalignment", styles["SectionHeading"]))
    for key in ("2a", "2b", "2c", "2d"):
        story.append(p(TEXT[key], styles["Body"]))

    story.append(p("3. Pricing Strategy Anchored to Reimbursement", styles["SectionHeading"]))
    for key in ("3a", "3b", "3c", "3d"):
        story.append(p(TEXT[key], styles["Body"]))
    story.append(Spacer(1, 0.03 * inch))
    story.append(make_table(PRICE_TABLE, styles, [1.65 * inch, 2.6 * inch, 2.45 * inch]))
    story.append(Spacer(1, 0.05 * inch))
    story.append(p("The Excel model uses the same logic by separating launch price, reimbursement pressure, and the NTAP bridge into different scenario tabs.", styles["Body"]))

    story.append(p("4. NTAP as the Critical Bridge Mechanism", styles["SectionHeading"]))
    for key in ("4a", "4b", "4c", "4d", "4e"):
        story.append(p(TEXT[key], styles["Body"]))

    story.append(p("5. ICD-10-PCS Coding as a Prerequisite for Payment Visibility", styles["SectionHeading"]))
    for key in ("5a", "5b", "5c", "5d", "5e"):
        story.append(p(TEXT[key], styles["Body"]))

    story.append(p("6. DRG Evolution and Long-Term Reimbursement", styles["SectionHeading"]))
    for key in ("6a", "6b", "6c", "6d", "6e"):
        story.append(p(TEXT[key], styles["Body"]))

    story.append(p("7. Strategic Synthesis", styles["SectionHeading"]))
    for key in ("7a", "7b"):
        story.append(p(TEXT[key], styles["Body"]))
    bullets = [
        "Pricing discipline, aligned to what can be supported within DRG constraints",
        "ICD-10-PCS coding, to establish visibility and differentiation",
        "NTAP approval, to enable early adoption and reduce financial risk",
        "DRG recalibration, to create durable reimbursement alignment",
    ]
    story.append(ListFlowable([ListItem(p(item, styles["JLBullet"])) for item in bullets], bulletType="bullet", leftPadding=12))
    story.append(p(TEXT["7c"], styles["Body"]))
    story.append(p(TEXT["7d"], styles["Body"]))

    story.append(p("Appendix A. Workbook Map", styles["SectionHeading"]))
    story.append(make_table(WORKBOOK_TABLE, styles, [1.35 * inch, 3.0 * inch, 2.2 * inch]))
    story.append(Spacer(1, 0.04 * inch))
    story.append(p("This appendix is the companion guide to the Excel file and is written to stay NDA-safe: it describes the workbook structure without revealing internal source paths or client-only terminology.", styles["Body"]))

    story.append(p("Appendix B. Public Sources", styles["SectionHeading"]))
    source_rows = [("Source", "URL")] + PUBLIC_SOURCES
    story.append(make_table(source_rows, styles, [2.3 * inch, 4.25 * inch]))
    story.append(Spacer(1, 0.05 * inch))
    story.append(p("Public sources are included for traceability only. The narrative itself is written to avoid quoting internal or confidential material.", styles["Body"]))

    return story


def write_pdf(path: Path) -> None:
    styles = getSampleStyleSheet()
    style_pdf(styles)
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.78 * inch,
        rightMargin=0.78 * inch,
        topMargin=0.86 * inch,
        bottomMargin=0.82 * inch,
        title=DOC_TITLE,
        author=AUTHOR,
    )
    story = build_pdf_story(styles)
    doc.build(story, onFirstPage=cover_header, onLaterPages=header)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate the Product X reimbursement strategy brief.")
    return parser.parse_args()


def main() -> int:
    parse_args()
    write_markdown(OUT_MD)
    write_docx(OUT_DOCX)
    write_pdf(OUT_PDF)
    print(OUT_DOCX)
    print(OUT_PDF)
    print(OUT_MD)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
