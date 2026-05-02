from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path('/Users/josephstewart/Documents/JLPolicyConsulting/visuals')
OUT.mkdir(parents=True, exist_ok=True)
LETTERHEAD = Path('/Users/josephstewart/Documents/JLPolicyConsulting/output/imagegen/jlpc_letterhead_mark_v2.png')

W, H = 1800, 1200
BG = 'white'
TITLE = '#163A73'
TXT = '#16243D'
MUTED = '#5A6780'
LINE = '#3D5DAA'
NAVY = '#163A73'
BLUE = '#3F69D8'
TEAL = '#2C7A76'
SAND = '#EFE6D9'
SKY = '#E3EEFF'
SAGE = '#E7F2EA'
MIST = '#EFF3F7'
GOLD = '#A47A2A'


def font(size=28, bold=False):
    candidates = [
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf' if bold else '/System/Library/Fonts/Supplemental/Arial.ttf',
        '/System/Library/Fonts/SFNS.ttf',
    ]
    for p in candidates:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            pass
    return ImageFont.load_default()


def wrap(draw, text, f, max_w):
    words = text.split()
    lines = []
    cur = ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=f) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def box(draw, xy, text, fill, outline, title=False, align='left'):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle(xy, radius=18, fill=fill, outline=outline, width=3)
    f = font(29 if title else 23, bold=title)
    tw = x2 - x1 - 28
    lines = []
    for raw in text.split('\n'):
        lines.extend(wrap(draw, raw, f, tw) or [''])
    line_h = 34 if title else 29
    total_h = len(lines) * line_h
    y = y1 + (y2 - y1 - total_h) / 2
    for ln in lines:
        if align == 'center':
            x = x1 + (x2 - x1 - draw.textlength(ln, font=f)) / 2
        else:
            x = x1 + 14
        draw.text((x, y), ln, font=f, fill=TXT)
        y += line_h


def arrow(draw, p1, p2, color='#334155', w=4):
    x1, y1 = p1
    x2, y2 = p2
    draw.line((x1, y1, x2, y2), fill=color, width=w)
    import math
    ang = math.atan2(y2 - y1, x2 - x1)
    L = 18
    a1 = ang + 2.6
    a2 = ang - 2.6
    p3 = (x2 + L * math.cos(a1), y2 + L * math.sin(a1))
    p4 = (x2 + L * math.cos(a2), y2 + L * math.sin(a2))
    draw.polygon([p2, p3, p4], fill=color)


def trim_near_white(im, threshold=245):
    """Trim white margins from the generated mark so header sizing stays legible."""
    rgb = im.convert('RGB')
    px = rgb.load()
    w, h = rgb.size
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    found = False

    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if not (r >= threshold and g >= threshold and b >= threshold):
                found = True
                if x < min_x:
                    min_x = x
                if y < min_y:
                    min_y = y
                if x > max_x:
                    max_x = x
                if y > max_y:
                    max_y = y

    if not found:
        return rgb
    pad = 8
    left = max(0, min_x - pad)
    top = max(0, min_y - pad)
    right = min(w, max_x + pad + 1)
    bottom = min(h, max_y + pad + 1)
    return rgb.crop((left, top, right, bottom))


def add_letterhead(im):
    if LETTERHEAD.exists():
        lh = Image.open(LETTERHEAD).convert('RGB')
        lh = trim_near_white(lh)
        target_w, target_h = 1700, 190
        ratio = min(target_w / lh.width, target_h / lh.height)
        new_size = (int(lh.width * ratio), int(lh.height * ratio))
        lh = lh.resize(new_size)
        x = 50 + (target_w - new_size[0]) // 2
        y = 10 + (target_h - new_size[1]) // 2
        im.paste(lh, (x, y))


def draw_title(draw, title, subtitle):
    draw.text((60, 230), title, font=font(40, bold=True), fill=TITLE)
    draw.text((60, 282), subtitle, font=font(23), fill=MUTED)


def visual_a():
    im = Image.new('RGB', (W, H), BG)
    add_letterhead(im)
    d = ImageDraw.Draw(im)
    draw_title(d, 'Decision View: Cross-Channel Reimbursement Architecture', 'How provider-administered assets behave across IPPS/NTAP, OPPS, PFS, and 340B')

    box(d, (80, 360, 520, 520), 'Inpatient IPPS\nBundled MS-DRG\nNo default line-item drug payment', SKY, BLUE, title=True, align='center')
    box(d, (640, 340, 1120, 510), 'Transitional Bridge\nNTAP or analogous support\nReduces but does not erase site loss', SAGE, TEAL, title=True, align='center')
    box(d, (1240, 360, 1720, 520), 'Post-Transition\nEconomics reset to baseline\nunless permanent rate alignment occurs', SAND, GOLD, title=True, align='center')

    box(d, (80, 600, 840, 820), 'Outpatient HOPD / OPPS\nEligible products may receive transitional separate payment; after expiration, reimbursement follows standard OPPS separate-payment or packaging rules', MIST, NAVY)
    box(d, (940, 600, 1720, 820), 'Physician Office / PFS\nPart B reimbursement plus professional fee\nAcquisition cost and ASP timing can pressure buy-and-bill margin', SKY, BLUE)

    box(d, (80, 930, 1720, 1140), '340B Overlay\nCovered outpatient channels can increase site-level willingness to use while simultaneously increasing manufacturer gross-to-net exposure if launch volume concentrates in 340B-intensive segments', '#F6F8FB', '#8A95A8')

    arrow(d, (520, 440), (640, 425), color=LINE)
    arrow(d, (1120, 425), (1240, 440), color=TEAL)
    arrow(d, (450, 520), (450, 600), color=LINE)
    arrow(d, (1330, 520), (1330, 600), color=LINE)
    arrow(d, (450, 820), (450, 930), color=LINE)
    arrow(d, (1330, 820), (1330, 930), color=LINE)

    im.save(OUT / 'reimbursement_pathway_map.png')


def visual_b():
    im = Image.new('RGB', (W, H), BG)
    add_letterhead(im)
    d = ImageDraw.Draw(im)
    draw_title(d, 'Decision View: Launch Economics Pressure Map', 'Where adoption friction and gross-to-net erosion compound')

    box(d, (700, 560, 1120, 790), 'Observed Net\nLaunch Economics\n(by account segment)', SKY, NAVY, title=True, align='center')

    items = [
        ((120, 360, 600, 520), 'Reimbursement Lag\nCode timing, cycle timing, ASP lag', SKY, BLUE, (600, 520), (700, 640)),
        ((120, 560, 600, 720), 'Hospital Absorption\nBundled payment shortfall before realignment', SAGE, TEAL, (600, 640), (700, 675)),
        ((120, 760, 600, 920), 'Operational Burden\nWorkflow, staffing, pharmacy load', SAND, GOLD, (600, 840), (700, 710)),
        ((1220, 360, 1700, 520), '340B Concentration\nHigh early use in covered entities', MIST, NAVY, (1220, 520), (1120, 640)),
        ((1220, 560, 1700, 720), 'Contracting Pressure\nSite concessions and pull-through support', '#F5F8FC', BLUE, (1220, 640), (1120, 675)),
        ((1220, 760, 1700, 920), 'Channel Leakage\nDistribution terms and support costs', '#F5F8FC', TEAL, (1220, 840), (1120, 710)),
    ]

    for rect, txt, fill, out, a1, a2 in items:
        box(d, rect, txt, fill, out)
        arrow(d, a1, a2, color='#475569', w=3)

    box(d, (120, 1000, 1700, 1140), 'Interpretation: Utilization can look strong while realized net weakens. Decision quality depends on separating structural pressure from recoverable leakage by segment.', '#F6F8FB', '#8A95A8')
    im.save(OUT / 'launch_economics_pressure_map.png')


def visual_c():
    im = Image.new('RGB', (W, H), BG)
    add_letterhead(im)
    d = ImageDraw.Draw(im)
    draw_title(d, 'Decision View: Recoverable vs Structural Losses', 'Prioritize interventions by controllability and impact')

    d.line((200, 1080, 1650, 1080), fill='#24395E', width=4)
    d.line((200, 380, 200, 1080), fill='#24395E', width=4)
    d.text((760, 1110), 'Ease of Recovery ->', font=font(24, bold=True), fill='#24395E')
    d.text((25, 720), 'Economic Impact ->', font=font(24, bold=True), fill='#24395E')

    d.rectangle((210, 390, 920, 730), fill='#F8FAFC', outline='#D36B5D', width=2)
    d.rectangle((940, 390, 1650, 730), fill='#FFF9EF', outline=GOLD, width=2)
    d.rectangle((210, 750, 920, 1070), fill='#F3F7FC', outline=BLUE, width=2)
    d.rectangle((940, 750, 1650, 1070), fill='#F1F8F5', outline=TEAL, width=2)

    box(d, (230, 410, 900, 710), 'Structural / Hard-to-Shift\n- Baseline policy and statutory exposure\n- Core site-of-care constraints\n- Rulemaking timing realities', '#F8FAFC', '#D36B5D')
    box(d, (960, 410, 1630, 710), 'High Impact / Moderately Recoverable\n- Coding visibility gaps\n- Transitional dossier timing/quality\n- Evidence not linked to utilization economics', '#FFF9EF', GOLD)
    box(d, (230, 770, 900, 1050), 'Lower Impact / Hard-to-Shift\n- Baseline launch admin overhead\n- Temporary committee friction\n- Early protocol variability', '#F3F7FC', BLUE)
    box(d, (960, 770, 1630, 1050), 'Recoverable / Execution-Driven\n- Segment-specific account strategy\n- 340B-aware channel planning\n- Contract and support precision', '#F1F8F5', TEAL)

    im.save(OUT / 'recoverable_vs_structural_losses.png')


def visual_d():
    im = Image.new('RGB', (W, H), BG)
    add_letterhead(im)
    d = ImageDraw.Draw(im)
    draw_title(d, "Decision View: Operating Method", 'Assess -> Quantify -> Segment -> Stress-Test -> Recover -> Operationalize')

    steps = [
        ('1. Assess', 'Map IPPS/NTAP, OPPS, PFS,\n340B exposure and claims visibility', SKY, BLUE),
        ('2. Quantify', 'Model provider margin, timing risk,\nGTN buckets, and cash pressure', SAGE, TEAL),
        ('3. Segment', 'Prioritize accounts by site mix,\nchannel exposure, and readiness', SAND, GOLD),
        ('4. Stress-Test', 'Run scenario ranges across\ntransition and post-transition states', MIST, NAVY),
        ('5. Recover', 'Deploy coding, channel, evidence, and\ncontracting levers tied to leakage', '#F8FAFC', '#8F5D3B'),
        ('6. Operationalize', 'Convert strategy into field tools,\nKPIs, and governance cadence', '#E9EEF4', '#52627B'),
    ]

    x, y = 90, 390
    bw, bh, gap = 500, 220, 40
    for i, (title, body, fill, out) in enumerate(steps):
        row = i // 3
        col = i % 3
        x1 = x + col * (bw + gap)
        y1 = y + row * (bh + 180)
        box(d, (x1, y1, x1 + bw, y1 + bh), f'{title}\n{body}', fill, out)

    centers = []
    for i in range(6):
        row = i // 3
        col = i % 3
        x1 = x + col * (bw + gap)
        y1 = y + row * (bh + 180)
        centers.append((x1 + bw // 2, y1 + bh // 2))

    arrow(d, (centers[0][0] + 220, centers[0][1]), (centers[1][0] - 220, centers[1][1]), color='#475569')
    arrow(d, (centers[1][0] + 220, centers[1][1]), (centers[2][0] - 220, centers[2][1]), color='#475569')
    arrow(d, (centers[2][0], centers[2][1] + 120), (centers[5][0], centers[5][1] - 120), color='#475569')
    arrow(d, (centers[5][0] - 220, centers[5][1]), (centers[4][0] + 220, centers[4][1]), color='#475569')
    arrow(d, (centers[4][0] - 220, centers[4][1]), (centers[3][0] + 220, centers[3][1]), color='#475569')

    box(d, (90, 1090, 1710, 1180), 'Output: a commercialization strategy tied to reimbursement reality, economics segmentation, and operational execution.', '#F8FAFC', '#64748B')
    im.save(OUT / 'joseph_approach_framework.png')


if __name__ == '__main__':
    visual_a()
    visual_b()
    visual_c()
    visual_d()
    print(f'Wrote visuals to {OUT}')
