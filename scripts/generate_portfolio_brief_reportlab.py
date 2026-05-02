from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import Paragraph
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT_PDF = ROOT / 'output' / 'pdf' / 'portfolio_brief.pdf'
LOGO = ROOT / 'output' / 'imagegen' / 'jlpc_letterhead_mark_v2.png'
LOGO_CROP = (295, 411, 1148, 548)
LOGO_SIZE = (1536, 1024)
HERO = ROOT / 'output' / 'imagegen' / 'portfolio_cover_hero_v3.png'
VISUALS = ROOT / 'visuals'

W, H = letter
M = 40
PALETTE = {
    'navy': colors.HexColor('#163A73'),
    'blue': colors.HexColor('#3F69D8'),
    'teal': colors.HexColor('#2C7A76'),
    'gold': colors.HexColor('#A47A2A'),
    'ink': colors.HexColor('#16243D'),
    'muted': colors.HexColor('#5A6780'),
    'line': colors.HexColor('#D4DCE8'),
    'soft': colors.HexColor('#F6F8FB'),
    'sky': colors.HexColor('#E3EEFF'),
    'sage': colors.HexColor('#E7F2EA'),
    'sand': colors.HexColor('#EFE6D9'),
    'white': colors.white,
}

@dataclass
class PageSection:
    title: str
    subtitle: str
    intro: str
    bullets: list[str]
    image: Path | None = None
    image_caption: str | None = None

styles = getSampleStyleSheet()
TITLE = ParagraphStyle(
    'TitleBrand',
    parent=styles['Title'],
    fontName='Times-Bold',
    fontSize=24,
    leading=28,
    textColor=PALETTE['navy'],
    spaceAfter=0,
)
SUBTITLE = ParagraphStyle(
    'SubtitleBrand',
    parent=styles['BodyText'],
    fontName='Times-Roman',
    fontSize=11,
    leading=14,
    textColor=PALETTE['muted'],
)
BODY = ParagraphStyle(
    'BodyBrand',
    parent=styles['BodyText'],
    fontName='Times-Roman',
    fontSize=10.3,
    leading=13.5,
    textColor=PALETTE['ink'],
)
BODY_SMALL = ParagraphStyle(
    'BodySmall',
    parent=styles['BodyText'],
    fontName='Times-Roman',
    fontSize=9.4,
    leading=12.2,
    textColor=PALETTE['ink'],
)
BULLET = ParagraphStyle(
    'BulletBrand',
    parent=styles['BodyText'],
    fontName='Times-Roman',
    fontSize=9.8,
    leading=12.8,
    textColor=PALETTE['ink'],
    leftIndent=0,
    firstLineIndent=0,
)
SMALL = ParagraphStyle(
    'SmallBrand',
    parent=styles['BodyText'],
    fontName='Times-Roman',
    fontSize=8.5,
    leading=10.5,
    textColor=PALETTE['muted'],
)
CAPTION = ParagraphStyle(
    'CaptionBrand',
    parent=styles['BodyText'],
    fontName='Times-Bold',
    fontSize=8.2,
    leading=10,
    textColor=PALETTE['navy'],
)

PAGES = [
    PageSection(
        title='Joseph Stewart | Market Access, Reimbursement, and Policy Strategy for Complex Provider-Administered Products',
        subtitle='Portfolio brief for manufacturers, client stakeholders, and interview panels',
        intro='This brief is designed to show the work itself, how the work is structured, what questions it answers, and why the resulting outputs are useful. It is not a resume in brochure form, and it does not rely on product-specific detail. The visuals carry the primary narrative. The copy is there to clarify the business meaning, the analytical logic, and the utility of each output.',
        bullets=[
            'Complex products do not succeed on clinical value alone.',
            'Reimbursement architecture changes adoption behavior.',
            'The output has to be clear enough to guide real decisions, not just describe complexity.',
        ],
        image=HERO,
        image_caption='Abstract layered reimbursement landscape across launch, in-market, and mature stages',
    ),
    PageSection(
        title='The reimbursement architecture Joseph maps',
        subtitle='Different payment systems create different adoption incentives',
        intro='The same therapy behaves differently depending on where and how it is used. Joseph’s work separates the major reimbursement systems so launch teams do not blend inpatient, outpatient, office, formulary, and channel economics into one average story.',
        bullets=[
            'IPPS and NTAP: bundled inpatient economics, transitional support, and residual hospital risk.',
            'HOPPS / OPPS / PFS: outpatient and office economics diverge by site, claims visibility, and payment timing.',
            'MA / MA-PD / Commercial: utilization management, site-of-care rules, and benefit design shape access.',
            'Part D / formulary / 340B: tiering, prior auth, step therapy, and covered-entity concentration change realized net and launch interpretation.',
        ],
        image=VISUALS / 'reimbursement_pathway_map.png',
        image_caption='Lifecycle reimbursement architecture',
    ),
    PageSection(
        title='Launch economics pressure map',
        subtitle='Launch volume can rise while realized net falls',
        intro='Launch economics should be benchmarked against what established analogs and mid-cycle products already absorb. The point is to identify where value leaks and which losses are structural versus recoverable.',
        bullets=[
            'GTN pressure buckets include 340B concentration, contracting concessions, reimbursement support, ASP timing, distribution leakage, and channel-driven discounting.',
            'Launch signal quality should be judged against on-market analogs, not against a national average that ignores site mix.',
            'Operational burden, first-use absorbability, and hospital margin sensitivity matter as much as clinical pull-through.',
            'Early support should be sized to the site and channel economics, not to a single national assumption.',
        ],
        image=VISUALS / 'launch_economics_pressure_map.png',
        image_caption='Launch economics against on-market analogs and mid-cycle comparators',
    ),
    PageSection(
        title='On-market / mid-cycle landscape assessment',
        subtitle='Benchmark established products to understand normal market behavior',
        intro='This view is not a launch view. It is a lifecycle benchmark that shows how mature products behave once reimbursement is established, channel patterns settle, and 340B, formulary, or contract refresh start shaping realized net.',
        bullets=[
            'Mid-cycle assessment has to include both a medical-benefit lens and a Part D / formulary lens where pharmacy benefit matters.',
            'Look for benefit migration, tiering, prior authorization, step therapy, 340B mix, and channel drift rather than headline price changes alone.',
            'Use the benchmark to decide whether a market is normal, deteriorating, or already over-concentrated in advantaged channels.',
            'The right question is not “can it launch?” but “is the mix still defensible?”',
        ],
        image=VISUALS / 'on_market_midcycle_landscape_assessment.png',
        image_caption='On-market / mid-cycle behavior across medical benefit and Part D',
    ),
    PageSection(
        title='Recoverable versus structural losses',
        subtitle='Separate unavoidable economics from controllable leakage',
        intro='The strategy problem is not just to identify losses. It is to distinguish structural economics from the items Joseph can help recover through better channel design, reimbursement mechanics, or evidence strategy.',
        bullets=[
            'Structural: baseline policy exposure, statutory constraints, and durable site-of-care economics.',
            'Recoverable: coding visibility gaps, timing misses, segment mix problems, and channel-design errors.',
            'The output should be a prioritized recovery roadmap, not a generic access narrative.',
        ],
        image=VISUALS / 'recoverable_vs_structural_losses.png',
        image_caption='Structural versus recoverable economics',
    ),
    PageSection(
        title='Joseph’s operating method',
        subtitle='Assess -> Quantify -> Segment -> Stress-test -> Recover -> Operationalize',
        intro='The output is not a memo. It is a decision system that commercial, market access, and field teams can use to act on reimbursement reality.',
        bullets=[
            'Assess & benchmark: map reimbursement pathways, decision dependencies, and analog behavior by site, channel, and lifecycle stage.',
            'Quantify: build provider margin, reimbursement timing, GTN pressure, and recoverable-vs-structural buckets.',
            'Segment, stress-test, recover, and operationalize: turn strategy into field tools, KPIs, governance cadence, and launch or in-market action.',
        ],
        image=VISUALS / 'joseph_approach_framework.png',
        image_caption='How Joseph works the problem end to end',
    ),
    PageSection(
        title='What makes the work useful',
        subtitle='The value is in usable clarity',
        intro='The value of this work is not simply that it explains access complexity. The value is that it organizes that complexity into formats that are usable.',
        bullets=[
            'Where a product is economically viable.',
            'Where it is exposed.',
            'Where practical access differs from formal coverage.',
            'Where site-of-care assumptions are masking risk.',
            'Where formulary or tiering changes are shifting behavior.',
            'Where integrated plan design changes incentives.',
            'Where 340B is distorting mix.',
            'Where the organization is dealing with structural economics versus execution issues.',
        ],
        image=HERO,
        image_caption='Reused landscape motif to close the narrative loop',
    ),
]


def p(text: str, style: ParagraphStyle = BODY):
    return Paragraph(text, style)


def draw_page_chrome(c: canvas.Canvas, page_no: int):
    c.setFillColor(colors.white)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setStrokeColor(PALETTE['line'])
    c.setLineWidth(1)
    c.rect(M, M, W - 2 * M, H - 2 * M, stroke=1, fill=0)
    if LOGO.exists():
        crop_l, crop_t, crop_r, crop_b = LOGO_CROP
        crop_w = crop_r - crop_l
        crop_h = crop_b - crop_t
        draw_w = 168
        draw_h = draw_w * crop_h / crop_w
        scale = draw_w / crop_w
        x = M + 2
        y = H - 54
        c.saveState()
        clip = c.beginPath()
        clip.rect(x, y, draw_w, draw_h)
        c.clipPath(clip, stroke=0, fill=0)
        c.drawImage(
            str(LOGO),
            x - crop_l * scale,
            y - (LOGO_SIZE[1] - crop_b) * scale,
            width=LOGO_SIZE[0] * scale,
            height=LOGO_SIZE[1] * scale,
            mask='auto',
        )
        c.restoreState()
    c.setStrokeColor(PALETTE['blue'])
    c.setLineWidth(2)
    c.line(M, H - 65, W - M, H - 65)
    c.setFont('Helvetica', 8)
    c.setFillColor(PALETTE['muted'])
    c.drawRightString(W - M, H - 42, '04/08/26')
    c.setFont('Helvetica', 8.5)
    c.setFillColor(PALETTE['muted'])
    c.drawString(M, M - 6, 'jlpolicyconsulting.com')
    c.drawRightString(W - M, M - 6, f'Page {page_no}')


def draw_paragraph(c: canvas.Canvas, text: str, x: float, y_top: float, width: float, style: ParagraphStyle, max_height: float = 200):
    para = p(text, style)
    w, h = para.wrap(width, max_height)
    para.drawOn(c, x, y_top - h)
    return h


def draw_bullet_list(c: canvas.Canvas, items: list[str], x: float, y_top: float, width: float, style: ParagraphStyle, gap: float = 4.0):
    y = y_top
    for item in items:
        h = draw_paragraph(c, f'- {item}', x, y, width, style, max_height=60)
        y -= h + gap
    return y


def draw_image_box(c: canvas.Canvas, image_path: Path, x: float, y: float, width: float, height: float, caption: str | None = None, pad: float = 8.0):
    c.setFillColor(PALETTE['soft'])
    c.setStrokeColor(PALETTE['line'])
    c.setLineWidth(1)
    c.roundRect(x, y, width, height, 10, stroke=1, fill=1)
    if image_path.exists():
        img = ImageReader(str(image_path))
        iw, ih = img.getSize()
        scale = min((width - 2 * pad) / iw, (height - 2 * pad) / ih)
        dw = iw * scale
        dh = ih * scale
        dx = x + (width - dw) / 2
        dy = y + (height - dh) / 2
        c.drawImage(img, dx, dy, width=dw, height=dh, mask='auto')
    if caption:
        c.setFillColor(PALETTE['navy'])
        c.setFont('Helvetica-Bold', 8.6)
        c.drawString(x + 10, y + height + 8, caption)


def draw_text_panel(c: canvas.Canvas, x: float, y: float, width: float, height: float, title: str, body: str, bullets: list[str] | None = None, fill=colors.white):
    c.setFillColor(fill)
    c.setStrokeColor(PALETTE['line'])
    c.setLineWidth(1)
    c.roundRect(x, y, width, height, 10, stroke=1, fill=1)
    inner_x = x + 12
    top = y + height - 14
    draw_paragraph(c, title, inner_x, top, width - 24, CAPTION, max_height=18)
    body_top = top - 14
    body_h = draw_paragraph(c, body, inner_x, body_top, width - 24, BODY_SMALL, max_height=80)
    if bullets:
        draw_bullet_list(c, bullets, inner_x, body_top - body_h - 4, width - 24, SMALL, gap=2.5)


def page1(c: canvas.Canvas):
    draw_page_chrome(c, 1)
    box_x, box_y, box_w, box_h = M + 24, H - 240, W - 2 * (M + 24), 156
    c.setFillColor(colors.HexColor('#F4F6FA'))
    c.setStrokeColor(colors.HexColor('#F4F6FA'))
    c.roundRect(box_x, box_y, box_w, box_h, 0, stroke=0, fill=1)
    cover_title = 'Joseph Stewart | Market Access, Reimbursement,<br/>and Policy Strategy<br/>for Complex Provider-Administered Products'
    cover_title_style = ParagraphStyle('CoverTitle', parent=TITLE, alignment=1, fontSize=18.5, leading=22, textColor=PALETTE['ink'])
    draw_paragraph(c, cover_title, box_x + 12, box_y + box_h - 24, box_w - 24, cover_title_style, max_height=72)
    draw_paragraph(c, PAGES[0].subtitle, box_x + 12, box_y + box_h - 92, box_w - 24, ParagraphStyle('CoverSub', parent=SUBTITLE, alignment=1, fontSize=10.2, leading=12.4), max_height=16)
    draw_paragraph(c, 'Audience: manufacturer hiring teams, client stakeholders, and interview panels', box_x + 12, box_y + box_h - 112, box_w - 24, ParagraphStyle('CoverAudience', parent=BODY_SMALL, alignment=1, textColor=PALETTE['blue'], fontSize=8.7, leading=10.2), max_height=14)
    draw_paragraph(c, 'Prepared April 8, 2026. Facts are generalized and intentionally avoid confidential product-specific details.', box_x + 12, box_y + box_h - 129, box_w - 24, ParagraphStyle('CoverDate', parent=SMALL, alignment=1, fontSize=8.2, leading=9.8), max_height=12)
    draw_image_box(c, HERO, M + 4, 348, 528, 138, None)
    draw_paragraph(c, PAGES[0].intro, M + 4, 326, 524, BODY, max_height=42)
    draw_text_panel(
        c, M + 4, 168, 520, 106,
        'Portfolio overview',
        'This is a work sample, not a resume retelling. The goal is to show the utility of the work to manufacturers and the way reimbursement mechanics become commercially usable strategy.',
        [
            'Generalized workstreams and decision tools only; no confidential asset details.',
            'Focus on how reimbursement mechanics become commercially usable strategy.',
            'Built for inpatient, outpatient, office, and 340B-sensitive channels.',
        ],
        fill=PALETTE['soft'],
    )


def page2(c: canvas.Canvas):
    draw_page_chrome(c, 2)
    draw_paragraph(c, PAGES[1].title, M + 4, H - 98, 530, TITLE, max_height=40)
    draw_paragraph(c, PAGES[1].subtitle, M + 4, H - 145, 530, SUBTITLE, max_height=20)
    draw_paragraph(c, PAGES[1].intro, M + 4, H - 180, 530, BODY, max_height=52)
    draw_image_box(c, PAGES[1].image, M + 4, 300, 528, 235, PAGES[1].image_caption)
    draw_text_panel(
        c, M + 4, 86, 528, 192,
        'What this means commercially',
        'The same product can look materially different by site of care and benefit structure. Joseph uses the pathway map to force teams to stop averaging inpatient, outpatient, office, Medicaid, MA, commercial, and 340B into one story.',
        PAGES[1].bullets,
        fill=PALETTE['soft'],
    )


def page3(c: canvas.Canvas):
    draw_page_chrome(c, 3)
    draw_paragraph(c, PAGES[2].title, M + 4, H - 98, 530, TITLE, max_height=40)
    draw_paragraph(c, PAGES[2].subtitle, M + 4, H - 145, 530, SUBTITLE, max_height=20)
    draw_paragraph(c, PAGES[2].intro, M + 4, H - 180, 530, BODY, max_height=52)
    draw_image_box(c, PAGES[2].image, M + 4, 265, 528, 280, PAGES[2].image_caption)
    draw_text_panel(
        c, M + 4, 86, 528, 160,
        'GTN recovery lens',
        'This page tells the manufacturer where value leaks before they try to recover it. The goal is to separate structural loss from recoverable loss and then size the right tools.',
        PAGES[2].bullets,
        fill=PALETTE['soft'],
    )


def page4(c: canvas.Canvas):
    draw_page_chrome(c, 4)
    draw_paragraph(c, PAGES[3].title, M + 4, H - 98, 530, TITLE, max_height=40)
    draw_paragraph(c, PAGES[3].subtitle, M + 4, H - 145, 530, SUBTITLE, max_height=20)
    draw_paragraph(c, PAGES[3].intro, M + 4, H - 180, 530, BODY, max_height=55)
    draw_image_box(c, PAGES[3].image, M + 4, 260, 528, 280, PAGES[3].image_caption)
    draw_text_panel(
        c, M + 4, 86, 528, 160,
        'The mid-cycle question',
        'The question changes from “can it launch?” to “is the mix still defensible?” The answer requires both a medical-benefit lens and a Part D / formulary lens where pharmacy benefit is in play.',
        PAGES[3].bullets,
        fill=PALETTE['soft'],
    )


def page5(c: canvas.Canvas):
    draw_page_chrome(c, 5)
    draw_paragraph(c, PAGES[4].title, M + 4, H - 98, 530, TITLE, max_height=40)
    draw_paragraph(c, PAGES[4].subtitle, M + 4, H - 145, 530, SUBTITLE, max_height=20)
    draw_paragraph(c, PAGES[4].intro, M + 4, H - 180, 530, BODY, max_height=50)
    draw_image_box(c, PAGES[4].image, M + 4, 258, 252, 255, PAGES[4].image_caption)
    draw_image_box(c, PAGES[5].image, M + 280, 258, 252, 255, PAGES[5].image_caption)
    draw_text_panel(
        c, M + 4, 86, 528, 145,
        'How the work turns into action',
        'The portfolio is not a memo alone. It is meant to show the tools a manufacturer can actually use: recovery roadmaps, account sequencing, benchmark models, and field-ready execution logic.',
        [
            'Structural versus recoverable losses.',
            'Assess -> Quantify -> Segment -> Stress-test -> Recover -> Operationalize.',
            'The output is a decision system, not generic access language.',
        ],
        fill=PALETTE['soft'],
    )


def page6(c: canvas.Canvas):
    draw_page_chrome(c, 6)
    draw_image_box(c, PAGES[6].image, M + 4, 650, 528, 88, None)
    draw_paragraph(c, PAGES[6].title, M + 4, 610, 528, TITLE, max_height=34)
    draw_paragraph(c, PAGES[6].subtitle, M + 4, 564, 528, SUBTITLE, max_height=20)
    draw_paragraph(c, PAGES[6].intro, M + 4, 534, 528, BODY, max_height=44)
    draw_text_panel(
        c, M + 4, 286, 528, 220,
        'What the portfolio shows',
        'The portfolio shows a pattern of work rather than a single memo. The pattern includes mapping how products behave differently across reimbursement systems, benchmarking launch and in-market economics against realistic market conditions, identifying where access is constrained by design rather than by product value, separating structural losses from controllable leakage, and converting those findings into clear visual tools and practical decision frameworks.',
        PAGES[6].bullets,
        fill=PALETTE['soft'],
    )
    draw_text_panel(
        c, M + 4, 82, 528, 176,
        'Types of outputs',
        'The work typically resolves into a set of usable outputs rather than a single memo. Those outputs may include reimbursement architecture maps, launch economics frameworks, on-market analog benchmark views, formulary and tiering interpretation tools, site-of-care comparison views, 340B exposure overlays, gross-to-net pressure maps, structural-versus-recoverable loss frameworks, and concise briefing materials that align visuals with decision logic.',
        [
            'Reimbursement architecture maps and launch economics frameworks.',
            'Formulary, tiering, site-of-care, and 340B overlays.',
            'Briefing materials that align visuals with decision logic.',
        ],
        fill=PALETTE['soft'],
    )


def build_pdf():
    OUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT_PDF), pagesize=letter)
    page1(c)
    c.showPage()
    page2(c)
    c.showPage()
    page3(c)
    c.showPage()
    page4(c)
    c.showPage()
    page5(c)
    c.showPage()
    page6(c)
    c.showPage()
    c.save()
    print(f'Wrote {OUT_PDF}')


if __name__ == '__main__':
    build_pdf()
