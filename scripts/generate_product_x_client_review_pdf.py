from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterator


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs"
DOCX_SITE = ROOT / ".venv-doc" / "lib" / "python3.14" / "site-packages"
REPORTLAB_SITE = ROOT / ".venv" / "lib" / "python3.14" / "site-packages"

for site_path in (DOCX_SITE, REPORTLAB_SITE):
    if site_path.exists():
        sys.path.insert(0, str(site_path))

from docx import Document  # type: ignore[import-not-found]
from docx.document import Document as DocxDocument  # type: ignore[import-not-found]
from docx.oxml.table import CT_Tbl  # type: ignore[import-not-found]
from docx.oxml.text.paragraph import CT_P  # type: ignore[import-not-found]
from docx.table import Table as DocxTable, _Cell  # type: ignore[import-not-found]
from docx.text.paragraph import Paragraph as DocxParagraph  # type: ignore[import-not-found]
from reportlab.lib import colors  # type: ignore[import-not-found]
from reportlab.lib.enums import TA_CENTER, TA_LEFT  # type: ignore[import-not-found]
from reportlab.lib.pagesizes import letter  # type: ignore[import-not-found]
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet  # type: ignore[import-not-found]
from reportlab.lib.units import inch  # type: ignore[import-not-found]
from reportlab.platypus import (  # type: ignore[import-not-found]
    HRFlowable,
    Image,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


RUN_DATE = "March 30, 2026"
RUN_DATE_SHORT = "03/30/26"
DOC_TITLE = "Product X Discussion Questions and Answers"
DOC_SUBTITLE = "Client review PDF"
AUTHOR = "OpenAI Codex for JL Policy Consulting"

PAGE_BG = colors.HexColor("#F4F7FB")
SURFACE = colors.white
INK = colors.HexColor("#0F1A30")
MUTED = colors.HexColor("#4F5D78")
ACCENT = colors.HexColor("#1C3F92")
ACCENT_BRIGHT = colors.HexColor("#2F62C7")
BORDER = colors.HexColor("#D5DFED")
PALE = colors.HexColor("#F7F9FC")
PALE_ALT = colors.HexColor("#D9E7F5")
CARD_BLUE = colors.HexColor("#EFF5FD")
SUCCESS = colors.HexColor("#0E7490")


@dataclass(frozen=True)
class Block:
    kind: str
    text: str = ""
    rows: tuple[tuple[str, ...], ...] = ()


def normalize_text(text: str) -> str:
    substitutions = {
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u00a0": " ",
        "\t": " ",
    }
    for old, new in substitutions.items():
        text = text.replace(old, new)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\s+([.,;:?!])", r"\1", text)
    return text.strip()


def iter_block_items(parent: DocxDocument | _Cell) -> Iterator[DocxParagraph | DocxTable]:
    if isinstance(parent, DocxDocument):
        parent_element = parent.element.body
    else:
        parent_element = parent._tc
    for child in parent_element.iterchildren():
        if isinstance(child, CT_P):
            yield DocxParagraph(child, parent)
        elif isinstance(child, CT_Tbl):
            yield DocxTable(child, parent)


def load_blocks(docx_path: Path) -> list[Block]:
    document = Document(str(docx_path))
    blocks: list[Block] = []

    for item in iter_block_items(document):
        if isinstance(item, DocxParagraph):
            text = normalize_text(item.text)
            if not text:
                continue
            style_name = item.style.name if item.style else ""
            blocks.append(classify_paragraph(style_name, text))
            continue

        rows: list[tuple[str, ...]] = []
        for row in item.rows:
            cell_values = tuple(normalize_text(cell.text) for cell in row.cells)
            if any(cell_values):
                rows.append(cell_values)
        if rows:
            blocks.append(Block(kind="table", rows=tuple(rows)))

    return blocks


def classify_paragraph(style_name: str, text: str) -> Block:
    if style_name == "Heading 1":
        return Block(kind="title", text=text)
    if style_name == "Heading 2":
        return Block(kind="section", text=text)
    if style_name == "Heading 3":
        return Block(kind="subsection", text=text)
    if text.endswith("?"):
        return Block(kind="question", text=text)
    if style_name == "List Bullet" and not text.endswith("?"):
        return Block(kind="bullet", text=text.lstrip("- ").strip())
    if text.startswith("•"):
        return Block(kind="bullet", text=text.lstrip("•").strip())
    if re.match(r"^\d+\.\s", text) and len(text) <= 80:
        return Block(kind="subsection", text=text)
    if text.startswith("Please "):
        return Block(kind="prompt", text=text)
    return Block(kind="paragraph", text=text)


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Kicker",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=12,
            alignment=TA_CENTER,
            textColor=ACCENT_BRIGHT,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            parent=styles["Title"],
            fontName="Times-Bold",
            fontSize=27,
            leading=30,
            alignment=TA_CENTER,
            textColor=INK,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverSub",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=11,
            leading=15,
            alignment=TA_CENTER,
            textColor=MUTED,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverMeta",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.25,
            leading=12,
            alignment=TA_CENTER,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionHeading",
            parent=styles["Heading2"],
            fontName="Times-Bold",
            fontSize=18,
            leading=21,
            textColor=INK,
            spaceBefore=8,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubsectionHeading",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=ACCENT,
            spaceBefore=8,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="QuestionHeading",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11.5,
            leading=14.5,
            textColor=INK,
            backColor=PALE,
            borderPadding=(7, 9, 7),
            borderColor=BORDER,
            borderWidth=0.5,
            spaceBefore=8,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Prompt",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12.5,
            textColor=ACCENT,
            spaceBefore=6,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.8,
            leading=14.2,
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
            leading=13.2,
            textColor=INK,
            leftIndent=12,
            firstLineIndent=0,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SummaryLabel",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=10,
            alignment=TA_LEFT,
            textColor=ACCENT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SummaryValue",
            parent=styles["BodyText"],
            fontName="Times-Bold",
            fontSize=21,
            leading=24,
            alignment=TA_LEFT,
            textColor=INK,
            spaceBefore=3,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SummaryText",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=11.5,
            alignment=TA_LEFT,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableCell",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11.2,
            textColor=INK,
        )
    )
    return styles


def paragraph(text: str, style) -> Paragraph:
    safe_text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return Paragraph(safe_text, style)


def draw_wordmark(canvas, x: float, y: float, compact: bool = False) -> None:
    icon_size = 0.40 * inch
    icon_bottom = y - (icon_size / 2)
    canvas.setFillColor(ACCENT)
    canvas.roundRect(x, icon_bottom, icon_size, icon_size, 0.08 * inch, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 12.5)
    canvas.drawCentredString(x + (icon_size / 2), icon_bottom + 0.135 * inch, "JL")

    text_x = x + 0.50 * inch
    canvas.setFillColor(ACCENT_BRIGHT)
    canvas.setFont("Helvetica-Bold", 11.6)
    canvas.drawString(text_x, y + 0.045 * inch, "JL Policy Consulting")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(text_x, y - 0.11 * inch, "LLC")


def draw_cover_chrome(canvas, doc):
    canvas.saveState()
    width, height = letter

    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)

    header_center_y = height - 0.56 * inch
    draw_wordmark(canvas, doc.leftMargin, header_center_y)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - doc.rightMargin, header_center_y + 0.05 * inch, RUN_DATE_SHORT)

    canvas.setStrokeColor(ACCENT_BRIGHT)
    canvas.setLineWidth(2)
    canvas.line(doc.leftMargin, height - 0.8 * inch, width - doc.rightMargin, height - 0.8 * inch)

    canvas.setFillColor(PALE)
    canvas.rect(doc.leftMargin, height - 3.12 * inch, width - doc.leftMargin - doc.rightMargin, 1.95 * inch, stroke=0, fill=1)

    footer_rule_y = 0.86 * inch
    canvas.line(doc.leftMargin, footer_rule_y, width - doc.rightMargin, footer_rule_y)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 0.48 * inch, "JL Policy Consulting")
    canvas.drawRightString(width - doc.rightMargin, 0.48 * inch, f"Page {doc.page}")

    canvas.restoreState()


def draw_page_chrome(canvas, doc):
    canvas.saveState()
    width, height = letter

    header_center_y = height - 0.56 * inch
    draw_wordmark(canvas, doc.leftMargin, header_center_y)
    canvas.setStrokeColor(ACCENT_BRIGHT)
    canvas.setLineWidth(2)
    canvas.line(doc.leftMargin, height - 0.8 * inch, width - doc.rightMargin, height - 0.8 * inch)
    canvas.line(doc.leftMargin, 0.86 * inch, width - doc.rightMargin, 0.86 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - doc.rightMargin, header_center_y + 0.05 * inch, RUN_DATE_SHORT)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 0.48 * inch, "JL Policy Consulting")
    canvas.drawRightString(width - doc.rightMargin, 0.48 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build_rating_cards(styles) -> Table:
    cards = [
        ("Efficacy", "4.5 / 5", "Directionally strong clinical improvement across the measured endpoints."),
        ("Safety", "4 / 5", "Favorable profile, with transient headache as the only notable issue."),
        ("Outcomes", "5 / 5", "Clear value signal through shorter stays and more discharge to home."),
        ("Administration", "2.5 / 5", "Operationally heavier due to the 48-hour infusion and bag changes."),
    ]
    rows = []
    for left, right in ((cards[0], cards[1]), (cards[2], cards[3])):
        row_cells = []
        for label, value, detail in (left, right):
            card_table = Table(
                [
                    [paragraph(label.upper(), styles["SummaryLabel"])],
                    [paragraph(value, styles["SummaryValue"])],
                    [paragraph(detail, styles["SummaryText"])],
                ],
                colWidths=[2.85 * inch],
            )
            card_table.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), CARD_BLUE),
                        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                        ("LEFTPADDING", (0, 0), (-1, -1), 12),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                        ("TOPPADDING", (0, 0), (-1, -1), 10),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                    ]
                )
            )
            row_cells.append(card_table)
        rows.append(row_cells)
    grid = Table(rows, colWidths=[3.0 * inch, 3.0 * inch], hAlign="LEFT")
    grid.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
    return grid


def build_snapshot_table(styles) -> Table:
    left_title = paragraph("Economic signal", styles["SubsectionHeading"])
    left_points = ListFlowable(
        [
            ListItem(paragraph("Launch pricing is absorbable around $10K-$20K when evaluated against DRG pressure.", styles["JLBullet"])),
            ListItem(paragraph("Post-NTAP, the viable range expands to approximately $25K-$35K.", styles["JLBullet"])),
            ListItem(paragraph("At $35K and above, hospitals become reimbursement-dependent rather than offset-driven.", styles["JLBullet"])),
        ],
        bulletType="bullet",
        leftPadding=10,
        bulletFontName="Helvetica",
        bulletFontSize=7,
    )
    right_title = paragraph("Adoption ramp", styles["SubsectionHeading"])
    right_points = ListFlowable(
        [
            ListItem(paragraph("No NTAP: 10%-20% of eligible patients.", styles["JLBullet"])),
            ListItem(paragraph("NTAP covering ~65% of cost: 50%-70%.", styles["JLBullet"])),
            ListItem(paragraph("Permanent DRG increase: 70%-90%.", styles["JLBullet"])),
        ],
        bulletType="bullet",
        leftPadding=10,
        bulletFontName="Helvetica",
        bulletFontSize=7,
    )
    table = Table(
        [[[left_title, left_points], [right_title, right_points]]],
        colWidths=[3.0 * inch, 3.0 * inch],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def make_doc_table(rows: tuple[tuple[str, ...], ...], styles) -> Table:
    col_count = max(len(row) for row in rows)
    usable_width = letter[0] - (1.95 * inch)
    col_widths = [usable_width / col_count] * col_count
    converted_rows = []
    for row in rows:
        converted_rows.append([paragraph(cell or " ", styles["TableCell"]) for cell in row])
    table = Table(converted_rows, colWidths=col_widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALE_ALT),
                ("TEXTCOLOR", (0, 0), (-1, 0), ACCENT),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SURFACE, CARD_BLUE]),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def build_story(blocks: list[Block], styles):
    story = [
        Spacer(1, 1.45 * inch),
        paragraph("CLIENT REVIEW DRAFT", styles["Kicker"]),
        paragraph(DOC_TITLE, styles["CoverTitle"]),
        paragraph(DOC_SUBTITLE, styles["CoverSub"]),
        Spacer(1, 0.08 * inch),
        paragraph(
            "Prepared from the supplied Product X discussion document and formatted to the approved JL Policy Consulting brand system.",
            styles["CoverSub"],
        ),
        Spacer(1, 0.2 * inch),
        Table(
            [
                [paragraph(f"Prepared {RUN_DATE}", styles["CoverMeta"])],
                [paragraph("Visual system: serif-led hierarchy, pale panels, cobalt rules, and restrained white-page layout.", styles["CoverMeta"])],
            ],
            colWidths=[4.45 * inch],
            hAlign="CENTER",
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                    ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            ),
        ),
        Spacer(1, 2.45 * inch),
        paragraph("JL Policy Consulting LLC", styles["CoverMeta"]),
        PageBreak(),
        paragraph("Executive Snapshot", styles["SectionHeading"]),
        paragraph(
            "The attached source positions Product X as a clinically differentiated post-EVT adjunct with strong outcomes value, a meaningful operational burden during infusion, and a reimbursement case that depends on NTAP and eventual DRG recalibration.",
            styles["Body"],
        ),
        Spacer(1, 0.05 * inch),
        build_rating_cards(styles),
        Spacer(1, 0.08 * inch),
        build_snapshot_table(styles),
        Spacer(1, 0.12 * inch),
        HRFlowable(width="100%", thickness=0.7, color=BORDER),
        Spacer(1, 0.1 * inch),
        paragraph("Source Content", styles["SubsectionHeading"]),
    ]

    for block in blocks:
        if block.kind == "title":
            continue
        if block.kind == "section":
            story.extend([Spacer(1, 0.08 * inch), paragraph(block.text, styles["SectionHeading"])])
            continue
        if block.kind == "subsection":
            story.append(paragraph(block.text, styles["SubsectionHeading"]))
            continue
        if block.kind == "question":
            story.append(paragraph(block.text, styles["QuestionHeading"]))
            continue
        if block.kind == "prompt":
            story.append(paragraph(block.text, styles["Prompt"]))
            continue
        if block.kind == "bullet":
            bullet_flow = ListFlowable(
                [ListItem(paragraph(block.text, styles["JLBullet"]))],
                bulletType="bullet",
                leftPadding=11,
                bulletFontName="Helvetica",
                bulletFontSize=7,
            )
            story.append(bullet_flow)
            continue
        if block.kind == "table":
            story.extend([make_doc_table(block.rows, styles), Spacer(1, 0.12 * inch)])
            continue
        story.append(paragraph(block.text, styles["Body"]))

    return story


def render_pdf(docx_path: Path, output_path: Path) -> Path:
    blocks = load_blocks(docx_path)
    styles = build_styles()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        leftMargin=0.78 * inch,
        rightMargin=0.78 * inch,
        title=DOC_TITLE,
        author=AUTHOR,
    )
    story = build_story(blocks, styles)
    pdf.build(story, onFirstPage=draw_cover_chrome, onLaterPages=draw_page_chrome)
    return output_path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate the Product X client-review PDF.")
    parser.add_argument(
        "--input",
        default=str(ROOT / "Project_X_Discussion_Questions_Answers.docx"),
        help="Path to the source DOCX.",
    )
    parser.add_argument(
        "--output",
        default=str(OUTPUT_DIR / "Product_X_Client_Review_Discussion_QA.pdf"),
        help="Path to the output PDF.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    docx_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()

    if not docx_path.exists():
        raise FileNotFoundError(f"Source DOCX not found: {docx_path}")

    rendered = render_pdf(docx_path, output_path)
    print(rendered)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
