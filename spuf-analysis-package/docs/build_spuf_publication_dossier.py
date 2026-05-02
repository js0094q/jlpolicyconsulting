from pathlib import Path
import csv
from docx import Document
from docx.shared import Pt
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas

root = Path('/Users/josephstewart/Documents/JLPolicyConsulting/output/exports/spuf-analysis-package')
data = root / 'data'
out_dir = root / 'docs'
out_dir.mkdir(parents=True, exist_ok=True)
docx_path = out_dir / 'spuf-publication-dossier.docx'
pdf_path = out_dir / 'spuf-publication-dossier.pdf'


def read_csv(name):
    with (data / name).open(newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))

rc = read_csv('repricing_churn_decomposition.csv')
ss = read_csv('sponsor_segmentation_summary.csv')
bt = read_csv('beneficiary_tier_linkage_delta_q4_to_q1.csv')

# DOCX

doc = Document()
style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(11)

doc.add_heading('SPUF Publication Dossier', level=0)
doc.add_paragraph('Date: April 22, 2026')
doc.add_paragraph('Prepared for: JL Policy Consulting publication pipeline')

doc.add_heading('Executive Summary', level=1)
doc.add_paragraph(
    'The strongest publication-ready story in the current SPUF package is that selected low-cost generics appear to move to higher tiers while sponsor behavior remains highly active and heterogeneous. '
    'This pattern is consistent with economics defense through formulary design. The claim is inferential and should be presented with explicit observed-versus-inferred guardrails.'
)

doc.add_heading('Core Thesis and Claim Guardrail', level=1)
doc.add_paragraph('Lead thesis: Part D sponsors appear to be moving selected low-cost generics to higher tiers to protect plan economics under pressure.')
doc.add_paragraph('Guardrail: The analysis does not directly measure realized margin. It identifies behavior patterns consistent with margin-defense dynamics.')

doc.add_heading('Analysis Stream 1: Repricing vs Churn Decomposition', level=1)
t = doc.add_table(rows=1, cols=5)
h = t.rows[0].cells
h[0].text = 'Pair'
h[1].text = 'Matched share'
h[2].text = 'Add/drop share'
h[3].text = 'Repriced share of matched'
h[4].text = 'Interpretive note'
for row in rc:
    r = t.add_row().cells
    r[0].text = row['pair']
    r[1].text = f"{float(row['matched_share'])*100:.2f}%"
    r[2].text = f"{float(row['add_drop_share'])*100:.2f}%"
    r[3].text = f"{float(row['repriced_share_of_matched'])*100:.2f}%"
    r[4].text = 'Stable continuity baseline' if row['pair'] == '2025Q3_to_2025Q4' else 'High churn regime, decomposition required'

doc.add_paragraph(
    'Interpretation: The second window is composition-heavy and can distort headline pricing narratives. Publication copy should always pair headline movement with mechanism split.'
)

doc.add_heading('Analysis Stream 2: Generic Tier Worsening with Same-NDC Controls', level=1)
doc.add_paragraph(
    'The package includes low-cost generic concept outputs where tier pressure remains visible under same-NDC controls. '
    'This reduces false attribution risk and supports access-friction framing beyond direct price movement.'
)

doc.add_heading('Analysis Stream 3: Sponsor Segmentation', level=1)
doc.add_paragraph('Sponsor behavioral segmentation counts in 2025Q4 to 2026Q1:')
for row in ss:
    doc.add_paragraph(f"{row['segment']}: {row['sponsor_count']}", style='List Bullet')

doc.add_paragraph(
    'Interpretation: sponsor behavior is heterogeneous. A watchlist model based on overlap between sponsor activity and low-cost generic tier pressure is more actionable than broad market averages.'
)

doc.add_heading('Analysis Stream 4: PBM Channel Profile', level=1)
doc.add_paragraph(
    'PBM mail versus retail channel outputs are available at a cross-sectional plan-type split. '
    'This supports a compact Insight article with descriptive framing and no intent attribution.'
)

doc.add_heading('Analysis Stream 5: Beneficiary Cost-Sharing and Tier Linkage', level=1)
doc.add_paragraph(
    'Tier-linked beneficiary design outputs are present across 2025Q4 and 2026Q1. '
    'Deductible-applies share shifts are visible in derived tables. Preferred cost amount fields are sparse in this extraction path and should be caveated before publication.'
)

bt_table = doc.add_table(rows=1, cols=4)
bh = bt_table.rows[0].cells
bh[0].text='Tier'
bh[1].text='NDC row delta'
bh[2].text='Deductible share delta'
bh[3].text='Plan count delta'
for row in bt:
    r = bt_table.add_row().cells
    r[0].text = row['tier']
    r[1].text = row['linked_formulary_ndc_rows_delta']
    r[2].text = row['mean_plan_ded_applies_share_delta']
    r[3].text = row['plan_count_delta']

doc.add_heading('Publication Story Set', level=1)
for item in [
    'Research: Are Part D Sponsors Moving Cheap Generics Up-Tier to Protect Economics?',
    'Research: Cheap Generic, Higher Tier, The New Part D Margin-Defense Pattern',
    'Insight: Which Sponsors Are Most Likely Using Tier Migration to Defend Margin?',
    'Insight: Part D Generic Coverage Contraction, Signal or Artifact?',
    'Insight: PBM Network Fingerprints in 2026Q1, Mail-Retail Mix by Plan Type',
]:
    doc.add_paragraph(item, style='List Number')

doc.add_heading('Documentation and Source Traceability', level=1)
for s in [
    '/Users/josephstewart/Documents/JLPolicyConsulting/output/exports/spuf-analysis-package/data/repricing_churn_decomposition.csv',
    '/Users/josephstewart/Documents/JLPolicyConsulting/output/exports/spuf-analysis-package/data/generic_tier_worsening_top25.csv',
    '/Users/josephstewart/Documents/JLPolicyConsulting/output/exports/spuf-analysis-package/data/sponsor_segmentation_2025Q4_to_2026Q1.csv',
    '/Users/josephstewart/Documents/JLPolicyConsulting/output/exports/spuf-analysis-package/data/pbm_channel_profile_2026Q1.csv',
    '/Users/josephstewart/Documents/JLPolicyConsulting/output/exports/spuf-analysis-package/data/beneficiary_tier_linkage_delta_q4_to_q1.csv',
]:
    doc.add_paragraph(s, style='List Bullet')

doc.add_paragraph('Final note: use observed-versus-inferred language in all external publication surfaces.')

doc.save(docx_path)

# PDF (compact executive version)
c = canvas.Canvas(str(pdf_path), pagesize=LETTER)
w, h = LETTER
x = 50
y = h - 50


def emit(text, size=10, gap=14, bold=False):
    global y
    if y < 60:
        c.showPage()
        y = h - 50
    c.setFont('Helvetica-Bold' if bold else 'Helvetica', size)
    c.drawString(x, y, text)
    y -= gap

emit('SPUF Publication Dossier', size=16, gap=22, bold=True)
emit('Date: April 22, 2026')
emit('')
emit('Lead thesis', bold=True)
emit('Part D sponsors appear to be moving selected low-cost generics to higher tiers', size=9, gap=12)
emit('in patterns consistent with economics defense behavior.', size=9, gap=12)
emit('Guardrail: inference, not direct proof of realized margin.', size=9, gap=14)
emit('')
emit('Quarter-pair decomposition', bold=True)
for row in rc:
    emit(f"{row['pair']}: matched {float(row['matched_share'])*100:.2f}%, add/drop {float(row['add_drop_share'])*100:.2f}%", size=9, gap=12)
emit('')
emit('Sponsor segments', bold=True)
for row in ss:
    emit(f"{row['segment']}: {row['sponsor_count']}", size=9, gap=12)
emit('')
emit('Publication set', bold=True)
for s in [
    'Research 1: Are Part D Sponsors Moving Cheap Generics Up-Tier to Protect Economics?',
    'Research 2: Cheap Generic, Higher Tier, The New Part D Margin-Defense Pattern',
    'Insight: Which Sponsors Are Most Likely Using Tier Migration to Defend Margin?'
]:
    emit(s, size=9, gap=12)

c.showPage()
c.save()

print(docx_path)
print(pdf_path)
