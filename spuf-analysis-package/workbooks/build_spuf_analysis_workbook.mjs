import fs from 'node:fs/promises';
import path from 'node:path';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const root = '/Users/josephstewart/Documents/JLPolicyConsulting/output/exports/spuf-analysis-package';
const dataDir = path.join(root, 'data');
const outDir = path.join(root, 'workbooks');
const outXlsx = path.join(outDir, 'spuf-analysis-dashboard.xlsx');

async function readCsv(file) {
  const txt = await fs.readFile(file, 'utf8');
  const lines = txt.split(/\r?\n/).filter(Boolean);
  const header = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const vals = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQ = !inQ;
        }
      } else if (ch === ',' && !inQ) {
        vals.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    vals.push(cur);
    const obj = {};
    header.forEach((h, idx) => {
      obj[h] = vals[idx] ?? '';
    });
    return obj;
  });
}

function toNum(v) {
  if (v === '' || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function styleHeader(range) {
  range.format = {
    fill: '#0B3A4A',
    font: { color: '#FFFFFF', bold: true },
    horizontalAlignment: 'center',
    verticalAlignment: 'center',
    wrapText: true,
  };
}

const wb = Workbook.create();
const wsExec = wb.worksheets.add('Executive_Summary');
const wsRC = wb.worksheets.add('Repricing_Churn');
const wsGT = wb.worksheets.add('Generic_Tier');
const wsSS = wb.worksheets.add('Sponsor_Segments');
const wsPBM = wb.worksheets.add('PBM_Profile');
const wsBT = wb.worksheets.add('Beneficiary_Linkage');
const wsStories = wb.worksheets.add('Story_Pipeline');

const rc = await readCsv(path.join(dataDir, 'repricing_churn_decomposition.csv'));
const gt = await readCsv(path.join(dataDir, 'generic_tier_worsening_top25.csv'));
const ss = await readCsv(path.join(dataDir, 'sponsor_segmentation_summary.csv'));
const pbm = await readCsv(path.join(dataDir, 'pbm_channel_profile_2026Q1.csv'));
const bt = await readCsv(path.join(dataDir, 'beneficiary_tier_linkage_delta_q4_to_q1.csv'));

// Executive
wsExec.getRange('A1:H1').merge();
wsExec.getRange('A1').values = [['SPUF Part D Analysis Dashboard']];
wsExec.getRange('A1').format = { font: { bold: true, size: 18, color: '#0B3A4A' }, horizontalAlignment: 'left' };
wsExec.getRange('A2:H2').merge();
wsExec.getRange('A2').values = [['Scope: Repricing vs churn, generic tier controls, sponsor segmentation, PBM channel profile, beneficiary tier linkage']];
wsExec.getRange('A2').format = { font: { color: '#334155' } };

const kpiHeader = ['KPI', 'Value', 'Interpretation'];
const kpiRows = [
  ['Matched share (2025Q3 to 2025Q4)', toNum(rc[0].matched_share), 'Higher continuity baseline'],
  ['Matched share (2025Q4 to 2026Q1)', toNum(rc[1].matched_share), 'Lower continuity, more churn'],
  ['Add/drop share (2025Q4 to 2026Q1)', toNum(rc[1].add_drop_share), 'High composition shift pressure'],
  ['Repricing share of matched (2025Q4 to 2026Q1)', toNum(rc[1].repriced_share_of_matched), 'Most matched rows repriced'],
  ['Sponsors classified as repricing-dominant', toNum(ss.find(r => r.segment === 'repricing_dominant')?.sponsor_count || 0), 'Largest sponsor segment'],
  ['PBM profile rows (plan type split)', pbm.length, 'Cross-sectional channel coverage'],
];
wsExec.getRange('A4:C4').values = [kpiHeader];
styleHeader(wsExec.getRange('A4:C4'));
wsExec.getRange(`A5:C${4 + kpiRows.length}`).values = kpiRows.map(r => [r[0], r[1], r[2]]);
wsExec.getRange(`B5:B${4 + kpiRows.length}`).format.numberFormat = '0.000';
wsExec.getRange(`A4:C${4 + kpiRows.length}`).format.columnWidthPx = 280;
wsExec.getRange('C4:C20').format.columnWidthPx = 360;

// Executive chart helper
wsExec.getRange('E4:G6').values = [
  ['Pair', 'Matched Share', 'Add/Drop Share'],
  [rc[0].pair, toNum(rc[0].matched_share), toNum(rc[0].add_drop_share)],
  [rc[1].pair, toNum(rc[1].matched_share), toNum(rc[1].add_drop_share)],
];
const execChart = wsExec.charts.add('bar', wsExec.getRange('E4:G6'));
execChart.title = 'Panel Continuity vs Churn Share';
execChart.setPosition('E8', 'L23');
execChart.hasLegend = true;
execChart.xAxis = { axisType: 'textAxis' };
execChart.yAxis = { numberFormatCode: '0.0%' };

// Repricing/Churn sheet
const rcHdr = Object.keys(rc[0]);
wsRC.getRange(`A1:${String.fromCharCode(64 + rcHdr.length)}1`).values = [rcHdr];
styleHeader(wsRC.getRange(`A1:${String.fromCharCode(64 + rcHdr.length)}1`));
wsRC.getRange(`A2:${String.fromCharCode(64 + rcHdr.length)}${1 + rc.length}`).values = rc.map(r => rcHdr.map(k => {
  const n = toNum(r[k]);
  return n == null ? r[k] : n;
}));
wsRC.freezePanes.freezeRows(1);
wsRC.getRange('A1:K20').format.columnWidthPx = 170;
wsRC.getRange('H2:K10').format.numberFormat = '0.000';

// Generic tier
const gtHdr = Object.keys(gt[0]);
wsGT.getRange(`A1:${String.fromCharCode(64 + gtHdr.length)}1`).values = [gtHdr];
styleHeader(wsGT.getRange(`A1:${String.fromCharCode(64 + gtHdr.length)}1`));
wsGT.getRange(`A2:${String.fromCharCode(64 + gtHdr.length)}${1 + gt.length}`).values = gt.map(r => gtHdr.map(k => {
  const n = toNum(r[k]);
  return n == null ? r[k] : n;
}));
wsGT.freezePanes.freezeRows(1);
wsGT.getRange('A1:F40').format.columnWidthPx = 210;
wsGT.getRange('C2:D40').format.numberFormat = '0.000';

const gtChart = wsGT.charts.add('scatter', wsGT.getRange(`C1:D${1 + Math.min(gt.length, 25)}`));
gtChart.title = 'Tier Worsening vs Same-NDC QoQ Change';
gtChart.setPosition('H3', 'P20');
gtChart.hasLegend = false;

// Sponsor segments
const ssHdr = Object.keys(ss[0]);
wsSS.getRange(`A1:${String.fromCharCode(64 + ssHdr.length)}1`).values = [ssHdr];
styleHeader(wsSS.getRange(`A1:${String.fromCharCode(64 + ssHdr.length)}1`));
wsSS.getRange(`A2:${String.fromCharCode(64 + ssHdr.length)}${1 + ss.length}`).values = ss.map(r => [r.segment, toNum(r.sponsor_count)]);
wsSS.getRange('A1:B20').format.columnWidthPx = 260;
const ssChart = wsSS.charts.add('pie', wsSS.getRange(`A1:B${1 + ss.length}`));
ssChart.title = 'Sponsor Segment Mix (2025Q4 to 2026Q1)';
ssChart.setPosition('D3', 'K20');

// PBM profile
const pbmHdr = Object.keys(pbm[0]);
wsPBM.getRange('A1:G1').values = [pbmHdr];
styleHeader(wsPBM.getRange('A1:G1'));
wsPBM.getRange(`A2:G${1 + pbm.length}`).values = pbm.map(r => pbmHdr.map(k => {
  const n = toNum(r[k]);
  return n == null ? r[k] : n;
}));
wsPBM.freezePanes.freezeRows(1);
wsPBM.getRange('A1:G200').format.columnWidthPx = 190;
wsPBM.getRange('D2:G200').format.numberFormat = '0.000';

// Beneficiary linkage
const btHdr = Object.keys(bt[0]);
wsBT.getRange(`A1:${String.fromCharCode(64 + btHdr.length)}1`).values = [btHdr];
styleHeader(wsBT.getRange(`A1:${String.fromCharCode(64 + btHdr.length)}1`));
wsBT.getRange(`A2:${String.fromCharCode(64 + btHdr.length)}${1 + bt.length}`).values = bt.map(r => btHdr.map(k => {
  const n = toNum(r[k]);
  return n == null ? r[k] : n;
}));
wsBT.freezePanes.freezeRows(1);
wsBT.getRange('A1:M30').format.columnWidthPx = 180;
wsBT.getRange('J2:J30').format.numberFormat = '0.0000';
wsBT.getRange('K2:M30').format.numberFormat = '0.000000';

const btChart = wsBT.charts.add('line', wsBT.getRange('A1:D8'));
btChart.title = 'Plan Count by Tier (Q4 2025 vs Q1 2026)';
btChart.setPosition('N3', 'V20');

// Story pipeline
wsStories.getRange('A1:H1').values = [[
  'Theme', 'Best Format', 'Category', 'Evidence Strength', 'Commercial Relevance', 'Overclaim Risk', 'Primary Visual', 'Recommendation'
]];
styleHeader(wsStories.getRange('A1:H1'));
const storyRows = [
  ['Repricing vs churn in Part D', 'Research', 'Healthcare Data Analysis', 'High', 'High', 'Medium', 'Waterfall decomposition', 'Publish first as flagship research'],
  ['Generic access friction despite stable same-NDC pricing', 'Research', 'Biosimilars and Generics', 'High', 'High', 'Medium', 'Scatter + product table', 'Publish second with strong caveat panel'],
  ['Sponsor behavioral clustering', 'Insight', 'PBM and Formulary Dynamics', 'High', 'High', 'Medium', '2x2 cluster plot', 'Publish as high-signal insight'],
  ['Generic coverage contraction signals', 'Insight', 'Market Access Strategy', 'Medium-High', 'High', 'Medium', 'Added vs dropped bars', 'Publish with artifact controls'],
  ['PBM network/channel fingerprints', 'Insight', 'PBM and Formulary Dynamics', 'Medium', 'High', 'Low-Medium', 'Heatmap by PBM and plan type', 'Publish as cross-sectional profile'],
];
wsStories.getRange('A2:H6').values = storyRows;
wsStories.getRange('A1:H20').format.columnWidthPx = 230;
wsStories.getRange('A1:H6').format.wrapText = true;
wsStories.freezePanes.freezeRows(1);

// Global light formatting
for (const ws of [wsExec, wsRC, wsGT, wsSS, wsPBM, wsBT, wsStories]) {
  ws.showGridLines = false;
}

await fs.mkdir(outDir, { recursive: true });

// compact verification
const check = await wb.inspect({ kind: 'table', range: 'Executive_Summary!A1:H20', include: 'values,formulas', tableMaxRows: 20, tableMaxCols: 8 });
await fs.writeFile(path.join(outDir, 'workbook_check.ndjson'), check.ndjson, 'utf8');
const errors = await wb.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A', options: { useRegex: true, maxResults: 300 }, summary: 'final formula error scan' });
await fs.writeFile(path.join(outDir, 'workbook_formula_errors.ndjson'), errors.ndjson, 'utf8');

for (const s of ['Executive_Summary','Repricing_Churn','Generic_Tier','Sponsor_Segments','PBM_Profile','Beneficiary_Linkage','Story_Pipeline']) {
  const blob = await wb.render({ sheetName: s, range: 'A1:N30', scale: 1.2, format: 'png' });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await fs.writeFile(path.join(outDir, `${s}.png`), bytes);
}

const outFile = await SpreadsheetFile.exportXlsx(wb);
await outFile.save(outXlsx);
console.log(outXlsx);
