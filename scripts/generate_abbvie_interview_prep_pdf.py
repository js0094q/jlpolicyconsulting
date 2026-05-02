from __future__ import annotations

import argparse
import html
import re
import sys
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs"
REPORTLAB_SITE = ROOT / ".venv" / "lib" / "python3.14" / "site-packages"

if REPORTLAB_SITE.exists():
    sys.path.insert(0, str(REPORTLAB_SITE))

from reportlab.lib import colors  # type: ignore[import-not-found]
from reportlab.lib.enums import TA_CENTER, TA_LEFT  # type: ignore[import-not-found]
from reportlab.lib.pagesizes import letter  # type: ignore[import-not-found]
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet  # type: ignore[import-not-found]
from reportlab.lib.units import inch  # type: ignore[import-not-found]
from reportlab.platypus import (  # type: ignore[import-not-found]
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


RUN_DATE = "March 30, 2026"
RUN_DATE_SHORT = "03/30/26"
DOC_TITLE = "AbbVie Interview Prep"
DOC_SUBTITLE = "Director, Government Affairs (U.S. Reimbursement)"
AUTHOR = "OpenAI Codex for JL Policy Consulting"

NAVY = colors.HexColor("#131A2E")
BLUE = colors.HexColor("#2258C4")
SKY = colors.HexColor("#EAF1FD")
SKY_ALT = colors.HexColor("#F5F8FE")
INK = colors.HexColor("#22314D")
BODY = colors.HexColor("#516179")
MUTED = colors.HexColor("#7C8799")
BORDER = colors.HexColor("#D9E2EF")
WHITE = colors.white
SUCCESS = colors.HexColor("#0C7A69")

MARKDOWN_PATH = ROOT / "content" / "interview-prep" / "abbvie-director-government-affairs-us-reimbursement.md"
JOB_DESCRIPTION_PATH = ROOT / "content" / "interview-prep" / "abbvie-director-government-affairs-us-reimbursement-job-description.txt"
DEFAULT_RESUME = Path("/Users/josephstewart/Documents/Joseph_Stewart_Resume copy 2.pdf")

ROLE_MATCHES: tuple[tuple[str, str, str], ...] = (
    (
        "Medicare Part B, ASP, and provider economics",
        "Current consulting work includes reimbursement models using ASP, provider acquisition cost, and rebate structures. AAM work focused on provider disincentives under ASP-based reimbursement.",
        "Lead with the idea that coverage alone does not drive uptake; provider economics does.",
    ),
    (
        "Manufacturer plus advocacy perspective",
        "Otsuka reimbursement and health policy leadership combines manufacturer strategy with field government affairs execution. Earlier federal lobbying work adds direct policy engagement experience.",
        "Show you can translate external policy into internal action and represent the company credibly before CMS.",
    ),
    (
        "Oncology and neuroscience relevance",
        "AAM work included oncology portfolios and biosimilar commercialization issues. Otsuka experience strengthens the neuroscience and access narrative.",
        "Tie your background to AbbVie's oncology growth and neuroscience complexity without overstating therapeutic ownership.",
    ),
    (
        "Cross-functional strategy execution",
        "Consulting work bridges policy, commercial, and market access teams. Otsuka role included oversight of an eight-person field-based government affairs team.",
        "Emphasize product-specific strategy, stakeholder alignment, and execution under deadlines.",
    ),
)

EXECUTIVE_SIGNAL_CARDS: tuple[tuple[str, str], ...] = (
    ("Federal and state policy", "Advocacy depth across federal and state reimbursement issues."),
    ("Manufacturer strategy", "Direct internal strategy experience from Otsuka."),
    ("Biosimilars and payer dynamics", "AAM and consulting work sharpen the channel and access lens."),
    ("Policy to access", "Core differentiator: policy -> ASP -> provider economics -> access."),
)


@dataclass(frozen=True)
class Block:
    kind: str
    level: int = 0
    text: str = ""
    items: tuple[str, ...] = ()


def normalize_text(text: str) -> str:
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


def markdown_inline(text: str) -> str:
    escaped = html.escape(normalize_text(text), quote=False)
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escaped)
    escaped = re.sub(r"`(.+?)`", r"<font name='Courier'>\1</font>", escaped)
    return escaped


def parse_markdown(path: Path) -> list[Block]:
    raw = normalize_text(path.read_text())
    lines = raw.splitlines()
    blocks: list[Block] = []
    paragraph_buffer: list[str] = []
    list_buffer: list[str] = []
    quote_buffer: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph_buffer
        if paragraph_buffer:
            blocks.append(Block(kind="paragraph", text=" ".join(paragraph_buffer).strip()))
            paragraph_buffer = []

    def flush_list() -> None:
        nonlocal list_buffer
        if list_buffer:
            blocks.append(Block(kind="list", items=tuple(item.strip() for item in list_buffer if item.strip())))
            list_buffer = []

    def flush_quote() -> None:
        nonlocal quote_buffer
        if quote_buffer:
            blocks.append(Block(kind="quote", text=" ".join(quote_buffer).strip()))
            quote_buffer = []

    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            flush_paragraph()
            flush_list()
            flush_quote()
            continue
        if line in {"---", "++"}:
            flush_paragraph()
            flush_list()
            flush_quote()
            continue
        heading_match = re.match(r"^(#{1,3})\s+(.*)$", line)
        if heading_match:
            flush_paragraph()
            flush_list()
            flush_quote()
            level = len(heading_match.group(1))
            blocks.append(Block(kind="heading", level=level, text=heading_match.group(2).strip()))
            continue
        bullet_match = re.match(r"^([-*]|\d+\.)\s+(.*)$", line)
        if bullet_match:
            flush_paragraph()
            flush_quote()
            list_buffer.append(bullet_match.group(2).strip())
            continue
        quote_match = re.match(r"^>\s?(.*)$", line)
        if quote_match:
            flush_paragraph()
            flush_list()
            quote_buffer.append(quote_match.group(1).strip())
            continue
        paragraph_buffer.append(line)

    flush_paragraph()
    flush_list()
    flush_quote()
    return blocks


def parse_job_description(path: Path) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {"Responsibilities": [], "Qualifications": []}
    current = ""
    for raw_line in normalize_text(path.read_text()).splitlines():
        line = raw_line.strip()
        if not line:
            continue
        if line in sections:
            current = line
            continue
        if current and line.startswith("- "):
            sections[current].append(line[2:].strip())
    return sections


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="HeroKicker",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            alignment=TA_CENTER,
            textColor=BLUE,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeroTitle",
            parent=styles["Title"],
            fontName="Times-Bold",
            fontSize=26,
            leading=30,
            alignment=TA_CENTER,
            textColor=NAVY,
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
            textColor=BODY,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeroMeta",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=12,
            alignment=TA_CENTER,
            textColor=MUTED,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionHeading",
            parent=styles["Heading2"],
            fontName="Times-Bold",
            fontSize=17,
            leading=21,
            textColor=NAVY,
            spaceBefore=12,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubHeading",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11.4,
            leading=14,
            textColor=BLUE,
            spaceBefore=8,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.7,
            leading=14.2,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="JLBodyBullet",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=13.2,
            textColor=INK,
            leftIndent=12,
            firstLineIndent=0,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Quote",
            parent=styles["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=10,
            leading=14,
            textColor=NAVY,
            leftIndent=14,
            rightIndent=8,
            spaceBefore=4,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CardTitle",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.1,
            leading=11.5,
            textColor=BLUE,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CardBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11.5,
            textColor=BODY,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHeader",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.6,
            leading=11,
            textColor=NAVY,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11.1,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SourceBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=10.8,
            textColor=BODY,
            spaceAfter=4,
        )
    )
    return styles


def make_paragraph(text: str, style) -> Paragraph:
    return Paragraph(markdown_inline(text), style)


def make_lines_paragraph(lines: list[str], style) -> Paragraph:
    safe = "<br/>".join(html.escape(normalize_text(line), quote=False) for line in lines if line.strip())
    return Paragraph(safe, style)


def draw_wordmark(canvas, x: float, y: float) -> None:
    icon_size = 0.40 * inch
    icon_bottom = y - (icon_size / 2)
    canvas.setFillColor(BLUE)
    canvas.roundRect(x, icon_bottom, icon_size, icon_size, 0.08 * inch, stroke=0, fill=1)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 12.5)
    canvas.drawCentredString(x + (icon_size / 2), icon_bottom + 0.135 * inch, "JL")

    text_x = x + 0.50 * inch
    canvas.setFillColor(BLUE)
    canvas.setFont("Helvetica-Bold", 11.6)
    canvas.drawString(text_x, y + 0.045 * inch, "JL Policy Consulting")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(text_x, y - 0.11 * inch, "LLC")


def draw_page_chrome(canvas, doc):
    canvas.saveState()
    width, height = letter
    header_center_y = height - 0.56 * inch
    draw_wordmark(canvas, doc.leftMargin, header_center_y)
    canvas.setStrokeColor(BLUE)
    canvas.setLineWidth(2)
    canvas.line(doc.leftMargin, height - 0.8 * inch, width - doc.rightMargin, height - 0.8 * inch)
    canvas.line(doc.leftMargin, 0.86 * inch, width - doc.rightMargin, 0.86 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - doc.rightMargin, header_center_y + 0.05 * inch, RUN_DATE_SHORT)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 0.48 * inch, "AbbVie interview prep packet")
    canvas.drawRightString(width - doc.rightMargin, 0.48 * inch, f"Page {doc.page}")
    canvas.restoreState()


def make_cover_card(styles, width: float, resume_path: Path) -> Table:
    title_stack = [
        Paragraph("INTERVIEW PACKET", styles["HeroKicker"]),
        Paragraph(DOC_TITLE, styles["HeroTitle"]),
        Paragraph(DOC_SUBTITLE, styles["HeroSubtitle"]),
        Paragraph("Prepared for Joseph L. Stewart, MPH, CPhT", styles["HeroSubtitle"]),
        Paragraph(
            f"Built from resume evidence, role description, and AbbVie talking-point notes on {RUN_DATE}.",
            styles["HeroMeta"],
        ),
        Paragraph(f"Primary resume source: {resume_path.name}", styles["HeroMeta"]),
    ]
    table = Table([[title_stack]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SKY),
                ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 24),
                ("RIGHTPADDING", (0, 0), (-1, -1), 24),
                ("TOPPADDING", (0, 0), (-1, -1), 26),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 26),
            ]
        )
    )
    return table


def build_signal_cards(styles) -> Table:
    rows = []
    current_row = []
    for title, detail in EXECUTIVE_SIGNAL_CARDS:
        card = Table(
            [[make_paragraph(title, styles["CardTitle"])], [make_paragraph(detail, styles["CardBody"])]],
            colWidths=[2.9 * inch],
        )
        card.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), SKY_ALT),
                    ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 9),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ]
            )
        )
        current_row.append(card)
        if len(current_row) == 2:
            rows.append(current_row)
            current_row = []
    if current_row:
        rows.append(current_row)
    grid = Table(rows, colWidths=[3.05 * inch, 3.05 * inch], hAlign="LEFT")
    grid.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    return grid


def build_role_priority_table(job_sections: dict[str, list[str]], styles) -> Table:
    rows = [
        [
            make_paragraph("Role mandate from the AbbVie posting", styles["TableHeader"]),
            make_paragraph("What you should signal in the interview", styles["TableHeader"]),
        ],
        [
            make_lines_paragraph([f"- {item}" for item in job_sections["Responsibilities"][:6]], styles["TableBody"]),
            make_lines_paragraph(
                [
                    "- Product-specific Medicare strategy",
                    "- CMS engagement depth",
                    "- ASP and physician-administered drug fluency",
                    "- Cross-functional leadership",
                    "- Oncology and neuroscience awareness",
                    "- Ability to turn policy into access execution",
                ],
                styles["TableBody"],
            ),
        ],
        [
            make_paragraph("Core qualifications emphasized", styles["TableHeader"]),
            make_paragraph("Best proof points from your background", styles["TableHeader"]),
        ],
        [
            make_lines_paragraph([f"- {item}" for item in job_sections["Qualifications"][:6]], styles["TableBody"]),
            make_lines_paragraph(
                [
                    "- Consulting work on reimbursement risk, ASP, and pricing strategy",
                    "- Otsuka leadership in reimbursement and health policy",
                    "- AAM work on biosimilars commercialization and provider incentives",
                    "- Federal lobbying and agency-facing policy work",
                    "- Portfolio perspective across manufacturers, PBMs, payers, biosimilars, and generics",
                ],
                styles["TableBody"],
            ),
        ],
    ]
    table = Table(rows, colWidths=[3.0 * inch, 3.2 * inch], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), SKY),
                ("BACKGROUND", (0, 2), (-1, 2), SKY),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, SKY_ALT, WHITE]),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def build_role_match_table(styles) -> Table:
    rows = [[
        make_paragraph("Role need", styles["TableHeader"]),
        make_paragraph("Resume evidence", styles["TableHeader"]),
        make_paragraph("How to frame it in conversation", styles["TableHeader"]),
    ]]
    for role_need, evidence, angle in ROLE_MATCHES:
        rows.append(
            [
                make_paragraph(role_need, styles["TableBody"]),
                make_paragraph(evidence, styles["TableBody"]),
                make_paragraph(angle, styles["TableBody"]),
            ]
        )
    table = Table(rows, colWidths=[1.75 * inch, 2.35 * inch, 2.20 * inch], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), SKY),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, BORDER),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, SKY_ALT]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def markdown_blocks_to_story(blocks: list[Block], styles) -> list:
    story: list = []
    for block in blocks:
        if block.kind == "heading":
            if block.level == 1:
                continue
            if block.level == 2:
                story.append(Paragraph(markdown_inline(block.text), styles["SectionHeading"]))
            else:
                story.append(Paragraph(markdown_inline(block.text), styles["SubHeading"]))
            continue
        if block.kind == "paragraph":
            story.append(Paragraph(markdown_inline(block.text), styles["Body"]))
            continue
        if block.kind == "quote":
            quote_table = Table([[Paragraph(markdown_inline(block.text), styles["Quote"])]], colWidths=[6.1 * inch])
            quote_table.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), SKY_ALT),
                        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                        ("LINEBEFORE", (0, 0), (0, -1), 3, SUCCESS),
                        ("LEFTPADDING", (0, 0), (-1, -1), 8),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                        ("TOPPADDING", (0, 0), (-1, -1), 6),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ]
                )
            )
            story.append(quote_table)
            story.append(Spacer(1, 0.04 * inch))
            continue
        if block.kind == "list":
            items = [ListItem(Paragraph(markdown_inline(item), styles["JLBodyBullet"])) for item in block.items]
            story.append(
                ListFlowable(
                    items,
                    bulletType="bullet",
                    leftPadding=12,
                    bulletFontName="Helvetica",
                    bulletFontSize=8,
                )
            )
            story.append(Spacer(1, 0.05 * inch))
    return story


def build_story(markdown_blocks: list[Block], job_sections: dict[str, list[str]], styles, resume_path: Path) -> list:
    story: list = [
        make_cover_card(styles, 6.15 * inch, resume_path),
        Spacer(1, 0.18 * inch),
        build_signal_cards(styles),
        Spacer(1, 0.06 * inch),
        Paragraph("Role Priorities", styles["SectionHeading"]),
        Paragraph(
            markdown_inline(
                "The AbbVie posting is looking for someone who can own Medicare reimbursement strategy at the product level, represent the company before CMS, and tie policy developments to launch and access decisions."
            ),
            styles["Body"],
        ),
        build_role_priority_table(job_sections, styles),
        Spacer(1, 0.08 * inch),
        Paragraph("Resume-to-Role Match", styles["SectionHeading"]),
        build_role_match_table(styles),
        Spacer(1, 0.08 * inch),
    ]
    story.extend(markdown_blocks_to_story(markdown_blocks, styles))
    return story


def render_pdf(output_path: Path, resume_path: Path) -> Path:
    styles = build_styles()
    markdown_blocks = parse_markdown(MARKDOWN_PATH)
    job_sections = parse_job_description(JOB_DESCRIPTION_PATH)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        topMargin=1.12 * inch,
        bottomMargin=1.02 * inch,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        title=f"{DOC_TITLE} - {DOC_SUBTITLE}",
        author=AUTHOR,
    )

    story = build_story(markdown_blocks, job_sections, styles, resume_path)
    pdf.build(story, onFirstPage=draw_page_chrome, onLaterPages=draw_page_chrome)
    return output_path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate AbbVie interview prep PDF.")
    parser.add_argument("--resume-pdf", type=Path, default=DEFAULT_RESUME)
    parser.add_argument(
        "--output",
        type=Path,
        default=OUTPUT_DIR / "AbbVie_Director_Government_Affairs_US_Reimbursement_Interview_Prep.pdf",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    resume_path = args.resume_pdf.expanduser().resolve()
    output_path = args.output.expanduser().resolve()

    if not resume_path.exists():
        raise FileNotFoundError(f"Resume PDF not found: {resume_path}")

    render_pdf(output_path, resume_path)
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
