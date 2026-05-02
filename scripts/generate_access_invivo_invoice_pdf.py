from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


OUTPUT_PATH = Path("output/pdf/JLPC-2026-023_Access-InVivo_Invoice.pdf")

RUN_DATE_SHORT = "04/04/26"
ACCENT = colors.HexColor("#1C3F92")
ACCENT_BRIGHT = colors.HexColor("#2F62C7")
MUTED = colors.HexColor("#4F5D78")
INK = colors.HexColor("#0F1A30")
SURFACE = colors.white
BORDER = colors.HexColor("#D5DFED")
PALE = colors.HexColor("#F7F9FC")


def draw_wordmark(canvas, x: float, y: float) -> None:
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


def draw_page_chrome(canvas, doc) -> None:
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


def build_pdf(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.95 * inch,
        bottomMargin=0.9 * inch,
        title="Invoice JLPC-2026-023",
        author="JL Policy Consulting, LLC",
    )

    styles = getSampleStyleSheet()
    normal = ParagraphStyle(
        "Normal",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.3,
        leading=12,
        textColor=INK,
        spaceBefore=0,
        spaceAfter=0,
    )
    small = ParagraphStyle(
        "Small",
        parent=normal,
        fontSize=8.3,
        leading=11,
        textColor=MUTED,
        spaceBefore=0,
        spaceAfter=0,
    )
    title = ParagraphStyle(
        "Title",
        parent=normal,
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=26,
        textColor=INK,
        spaceBefore=0,
        spaceAfter=0,
    )
    section = ParagraphStyle(
        "Section",
        parent=normal,
        fontName="Helvetica-Bold",
        fontSize=9.5,
        leading=12,
        textColor=ACCENT,
        spaceAfter=2,
        spaceBefore=0,
    )
    table_cell = ParagraphStyle(
        "TableCell",
        parent=normal,
        fontSize=8.7,
        leading=10.6,
        spaceBefore=0,
        spaceAfter=0,
    )

    story = []

    story.append(Spacer(1, 0.03 * inch))
    top = Table(
        [
            [
                Paragraph(
                    "<b>JL Policy Consulting, LLC</b><br/>"
                    "Joseph L. Stewart, MPH, CPhT<br/>"
                    "Managing Director, Health Policy &amp; Reimbursement",
                    normal,
                ),
                Paragraph("<b>INVOICE</b>", title),
            ]
        ],
        colWidths=[4.8 * inch, 2.2 * inch],
    )
    top.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(top)
    story.append(Spacer(1, 0.08 * inch))

    story.append(
        Paragraph(
            "45 Beyers Road<br/>"
            "Montgomery, NY 12549<br/>"
            "United States<br/>"
            "Email: Joseph.Stewart@JLPolicyConsulting.com<br/>"
            "Phone: +1 (845) 779-2447",
            normal,
        )
    )
    story.append(Spacer(1, 0.11 * inch))

    meta = Table(
        [
            ["Invoice Number", "JLPC-2026-023", "Invoice Date", "April 4, 2026"],
            ["Service Period", "March 23, 2026 - April 3, 2026", "Payment Terms", "Net 30"],
            ["Currency", "GBP", "", ""],
        ],
        colWidths=[1.25 * inch, 2.1 * inch, 1.25 * inch, 2.4 * inch],
    )
    meta.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("BACKGROUND", (0, 0), (0, -1), PALE),
                ("BACKGROUND", (2, 0), (2, -1), PALE),
                ("FONT", (0, 0), (0, -1), "Helvetica-Bold", 8.8),
                ("FONT", (2, 0), (2, -1), "Helvetica-Bold", 8.8),
                ("FONT", (1, 0), (-1, -1), "Helvetica", 8.8),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(meta)
    story.append(Spacer(1, 0.09 * inch))

    two_col = Table(
        [
            [
                Paragraph(
                    "<b>Bill To</b><br/>"
                    "Access InVivo Limited<br/>"
                    "Suite 1b1 Argyle House<br/>"
                    "Northside, Joel Street<br/>"
                    "Northwood Hills<br/>"
                    "HA6 1NW<br/>"
                    "United Kingdom<br/>"
                    "Company Number: 16175705<br/>"
                    "Accounts Payable Email: mel@accessinvivo.com",
                    normal,
                ),
                Paragraph(
                    "<b>Engagement Reference</b><br/>"
                    "Project Name: Ischemic Stroke with EVT NTAP Engagement<br/>"
                    "Agreement Date: March 23, 2026<br/>"
                    "Service Type: Expert policy and reimbursement advisory services "
                    "(market access, DRG/NTAP strategy, evidence interpretation)",
                    normal,
                ),
            ]
        ],
        colWidths=[3.5 * inch, 3.5 * inch],
    )
    two_col.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(two_col)
    story.append(Spacer(1, 0.09 * inch))

    story.append(Paragraph("Line Items", section))
    line_items = Table(
        [
            ["Description", "Hours", "Rate (GBP)", "Amount (GBP)"],
            [
                Paragraph(
                    "Expert consultancy services - Ischemic Stroke with EVT NTAP Engagement, "
                    "including reimbursement analysis, NTAP pathway evaluation, and strategic advisory",
                    table_cell,
                ),
                "4.0",
                "GBP 500",
                "GBP 2,000",
            ],
        ],
        colWidths=[4.1 * inch, 0.8 * inch, 1.0 * inch, 1.1 * inch],
    )
    line_items.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("BACKGROUND", (0, 0), (-1, 0), PALE),
                ("FONT", (0, 0), (-1, 0), "Helvetica-Bold", 8.5),
                ("FONT", (0, 1), (-1, -1), "Helvetica", 8.5),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(line_items)
    story.append(Spacer(1, 0.08 * inch))

    totals = Table(
        [
            ["Subtotal", "GBP 2,000"],
            ["VAT", "GBP 0 (Consultant is U.S.-based; reverse charge may apply if applicable)"],
            ["TOTAL DUE", Paragraph("<b>GBP 2,000</b>", table_cell)],
        ],
        colWidths=[1.6 * inch, 5.4 * inch],
    )
    totals.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("BACKGROUND", (0, 0), (0, -1), PALE),
                ("BACKGROUND", (0, 2), (-1, 2), PALE),
                ("FONT", (0, 0), (0, -1), "Helvetica-Bold", 8.8),
                ("FONT", (1, 0), (1, 1), "Helvetica", 8.8),
                ("FONT", (1, 2), (1, 2), "Helvetica-Bold", 10.2),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(totals)
    story.append(Spacer(1, 0.1 * inch))

    story.append(Paragraph("Payment Instructions", section))
    story.append(
        Paragraph(
            "<b>Bank ACH</b><br/>"
            "Account Name: Joseph Stewart<br/>"
            "Bank: Capital One, N.A.<br/>"
            "Account Number: 36091605578<br/>"
            "Routing: 031176110<br/>"
            "SWIFT: HIBKUS44",
            normal,
        )
    )
    story.append(Spacer(1, 0.08 * inch))

    story.append(Paragraph("Notes", section))
    notes = [
        "Services delivered in accordance with executed consultancy agreement dated March 23, 2026.",
        "Hourly rate of GBP 500/hour consistent with agreed terms.",
        "Supporting documentation available upon request.",
    ]
    for note in notes:
        story.append(Paragraph(f"- {note}", small))

    doc.build(story, onFirstPage=draw_page_chrome, onLaterPages=draw_page_chrome)


if __name__ == "__main__":
    build_pdf(OUTPUT_PATH)
    print(f"Wrote {OUTPUT_PATH}")
