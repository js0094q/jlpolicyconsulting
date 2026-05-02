import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'visuals');

const W = 1800;
const H = 1200;

const C = {
  bg: '#ffffff',
  title: '#163A73',
  navy: '#163A73',
  ink: '#16243D',
  muted: '#5A6780',
  line: '#24395E',
  blue: '#3F69D8',
  teal: '#2C7A76',
  gold: '#A47A2A',
  sky: '#E3EEFF',
  sage: '#E7F2EA',
  sand: '#EFE6D9',
  mist: '#F6F8FB',
  softBlue: '#F3F7FC',
  softGreen: '#F1F8F5',
  softSand: '#FFF9EF',
  softGray: '#E9EEF4',
  border: '#8A95A8',
  redSoft: '#D36B5D'
};

const HEADER = {
  square: '#163A73',
  wordmark: '#163A73',
  rule: '#3F69D8'
};

const LH = {
  x: 120,
  y: 28,
  size: 56
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function lines(text) {
  return Array.isArray(text) ? text : String(text).split('\n');
}

function lineSvg(x1, y1, x2, y2, color = C.line, width = 4, marker = true) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${marker ? 'marker-end="url(#arrow)"' : ''} />`;
}

function roundedRect(x, y, w, h, fill, stroke, sw = 3, rx = 18) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}

function textBlock({ x, y, lines: textLines, size = 28, color = C.ink, weight = 400, family = 'Helvetica, Arial, sans-serif', anchor = 'start', lineGap = 1.25 }) {
  const dy = Math.round(size * lineGap);
  const startY = y;
  return `<text x="${x}" y="${startY}" fill="${color}" font-family="${family}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${
    textLines
      .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : dy}">${esc(line)}</tspan>`)
      .join('')
  }</text>`;
}

function centerTextBlock({ x, y, width, lines: textLines, size = 28, color = C.ink, weight = 400, family = 'Helvetica, Arial, sans-serif', lineGap = 1.2 }) {
  const dy = Math.round(size * lineGap);
  const firstY = y;
  const cx = x + width / 2;
  return `<text x="${cx}" y="${firstY}" fill="${color}" font-family="${family}" font-size="${size}" font-weight="${weight}" text-anchor="middle">${
    textLines
      .map((line, i) => `<tspan x="${cx}" dy="${i === 0 ? 0 : dy}">${esc(line)}</tspan>`)
      .join('')
  }</text>`;
}

function header() {
  return `
    <g transform="translate(${LH.x},${LH.y})">
      <rect x="0" y="0" width="${LH.size}" height="${LH.size}" rx="12" fill="${HEADER.square}" />
      <text x="${LH.size / 2}" y="${LH.size * 0.64}" text-anchor="middle" fill="#ffffff" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="700">JL</text>
      <text x="${LH.size + 22}" y="22" fill="${HEADER.wordmark}" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-weight="400">JL Policy Consulting, LLC</text>
      <line x1="0" y1="${LH.size + 10}" x2="1560" y2="${LH.size + 10}" stroke="${HEADER.rule}" stroke-width="4" />
    </g>`;
}

function titleBand(title, subtitle) {
  return `
    <g transform="translate(0,0)">
      ${textBlock({ x: 60, y: 210, lines: [title], size: 38, color: C.title, weight: 700 })}
      ${textBlock({ x: 60, y: 255, lines: [subtitle], size: 22, color: C.muted, weight: 600 })}
    </g>`;
}

function box({ x, y, w, h, fill, stroke, title, body, titleCenter = true, titleSize = 28, bodySize = 22, bodyWeight = 400, titleWeight = 700, bodyLineGap = 1.18, titleGap = 1.1 }) {
  const linesTitle = lines(title);
  const linesBody = lines(body);
  const titleY = y + 34;
  const bodyY = y + 86;
  return `
    ${roundedRect(x, y, w, h, fill, stroke)}
    ${titleCenter
      ? centerTextBlock({ x, y: titleY, width: w, lines: linesTitle, size: titleSize, color: C.ink, weight: titleWeight, lineGap: titleGap })
      : textBlock({ x: x + 16, y: titleY, width: w - 32, lines: linesTitle, size: titleSize, color: C.ink, weight: titleWeight, lineGap: titleGap })}
    ${textBlock({ x: x + 16, y: bodyY, width: w - 32, lines: linesBody, size: bodySize, color: C.ink, weight: bodyWeight, lineGap: bodyLineGap })}
  `;
}

function baseSvg(inner) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L12,6 L0,12 z" fill="${C.line}" />
      </marker>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" fill="${C.bg}" />
    ${header()}
    ${inner}
  </svg>`;
}

function visualA() {
  const inner = `
    ${titleBand('Decision View: Lifecycle Reimbursement Architecture', 'Launch, on-market, and mature products face different reimbursement questions')}
    ${box({ x: 80, y: 340, w: 520, h: 210, fill: C.sky, stroke: C.blue, title: ['Launch / New-to-Market'], body: ['Primary question: can the site absorb first use?', 'Watch items: coding, transition support, absorbability'], titleCenter: false, titleSize: 27, bodySize: 19, bodyLineGap: 1.14 })}
    ${box({ x: 640, y: 340, w: 520, h: 210, fill: C.sage, stroke: C.teal, title: ['On-Market / Mid-Cycle'], body: ['Primary question: is the mix still durable?', 'Watch items: analog benchmarking, contract refresh, 340B drift'], titleCenter: false, titleSize: 27, bodySize: 19, bodyLineGap: 1.14 })}
    ${box({ x: 1200, y: 340, w: 520, h: 210, fill: C.sand, stroke: C.gold, title: ['Mature / Late-Cycle'], body: ['Primary question: can economics be defended?', 'Watch items: price compression, substitution, channel tightening'], titleCenter: false, titleSize: 27, bodySize: 19, bodyLineGap: 1.14 })}
    ${box({
      x: 80,
      y: 620,
      w: 760,
      h: 210,
      fill: C.mist,
      stroke: C.blue,
      title: ['IPPS / NTAP and Inpatient'],
      body: ['Bundled case payment means launch risk concentrates in the facility until', 'transitional support or rate recalibration catches up.'],
      titleCenter: false,
      titleSize: 26,
      bodySize: 19,
      bodyLineGap: 1.1
    })}
    ${box({
      x: 940,
      y: 620,
      w: 760,
      h: 210,
      fill: C.sky,
      stroke: C.teal,
      title: ['OPPS / PFS / 340B'],
      body: ['Outpatient and office economics diverge by setting;', '340B changes both site behavior and realized net.'],
      titleCenter: false,
      titleSize: 26,
      bodySize: 19,
      bodyLineGap: 1.1
    })}
    ${box({ x: 80, y: 930, w: 1620, h: 130, fill: '#F6F8FB', stroke: '#8A95A8', title: ['Decision use'], body: ['Compare launch, mid-cycle, and mature products against the same reimbursement questions before assuming one market model applies everywhere.'], titleCenter: false, titleSize: 24, bodySize: 18, bodyLineGap: 1.12 })}
  `;
  return baseSvg(inner);
}

function visualB() {
  const inner = `
    ${titleBand('Decision View: Launch Economics Pressure Map', 'Benchmark launch economics against on-market analogs and mid-cycle comparators')}
    ${box({ x: 660, y: 545, w: 480, h: 250, fill: C.sky, stroke: C.navy, title: ['Observed Net', 'Launch Economics'], body: ['vs on-market analogs', 'Use mature products to define what a normal reimbursement pattern looks like.'], titleCenter: true, titleSize: 30, bodySize: 18, bodyLineGap: 1.12 })}
    ${box({ x: 120, y: 360, w: 480, h: 160, fill: C.sky, stroke: C.blue, title: ['Reimbursement Lag'], body: ['Code timing, cycle timing, ASP lag'], titleCenter: false, titleSize: 24, bodySize: 18 })}
    ${box({ x: 120, y: 560, w: 480, h: 160, fill: C.sage, stroke: C.teal, title: ['Hospital Absorption'], body: ['Bundled payment shortfall before realignment'], titleCenter: false, titleSize: 24, bodySize: 18 })}
    ${box({ x: 120, y: 760, w: 480, h: 160, fill: C.sand, stroke: C.gold, title: ['Operational Burden'], body: ['Workflow, staffing, pharmacy load'], titleCenter: false, titleSize: 24, bodySize: 18 })}
    ${box({ x: 1220, y: 360, w: 480, h: 160, fill: C.mist, stroke: C.navy, title: ['340B Concentration'], body: ['High early use in covered entities'], titleCenter: false, titleSize: 24, bodySize: 18 })}
    ${box({ x: 1220, y: 560, w: 480, h: 160, fill: '#F5F8FC', stroke: C.blue, title: ['Contracting Pressure'], body: ['Site concessions and pull-through support'], titleCenter: false, titleSize: 24, bodySize: 18 })}
    ${box({ x: 1220, y: 760, w: 480, h: 160, fill: '#F5F8FC', stroke: C.teal, title: ['Channel Leakage'], body: ['Distribution terms and support costs'], titleCenter: false, titleSize: 24, bodySize: 18 })}
    ${lineSvg(600, 440, 660, 640, C.line, 3)}
    ${lineSvg(600, 640, 660, 675, C.line, 3)}
    ${lineSvg(600, 840, 660, 710, C.line, 3)}
    ${lineSvg(1220, 440, 1140, 640, C.line, 3)}
    ${lineSvg(1220, 640, 1140, 675, C.line, 3)}
    ${lineSvg(1220, 840, 1140, 710, C.line, 3)}
    ${box({ x: 120, y: 1030, w: 1560, h: 90, fill: '#F6F8FB', stroke: '#8A95A8', title: [], body: ['Interpretation: launch uptake should be judged relative to what mature analogs absorb, how mid-cycle comparators are defended, and where realized net erodes once the market normalizes.'], titleCenter: false, titleSize: 1, bodySize: 17, bodyLineGap: 1.08 })}
  `;
  return baseSvg(inner);
}

function visualC() {
  const inner = `
    ${titleBand('Decision View: Recoverable vs Structural Losses', 'Prioritize interventions by controllability and impact')}
    <line x1="200" y1="1080" x2="1650" y2="1080" stroke="${C.line}" stroke-width="4" />
    <line x1="200" y1="380" x2="200" y2="1080" stroke="${C.line}" stroke-width="4" />
    <text x="760" y="1110" fill="${C.line}" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700">Ease of Recovery -></text>
    <text x="25" y="720" fill="${C.line}" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700">Economic Impact -></text>
    <rect x="210" y="390" width="710" height="340" fill="#F8FAFC" stroke="${C.redSoft}" stroke-width="2" />
    <rect x="940" y="390" width="710" height="340" fill="#FFF9EF" stroke="${C.gold}" stroke-width="2" />
    <rect x="210" y="750" width="710" height="320" fill="#F3F7FC" stroke="${C.blue}" stroke-width="2" />
    <rect x="940" y="750" width="710" height="320" fill="#F1F8F5" stroke="${C.teal}" stroke-width="2" />
    ${box({ x: 230, y: 410, w: 670, h: 300, fill: '#F8FAFC', stroke: C.redSoft, title: ['Structural / Hard-to-Shift'], body: ['- Baseline policy and statutory exposure', '- Core site-of-care constraints', '- Rulemaking timing realities'], titleCenter: false, titleSize: 28, bodySize: 18, bodyLineGap: 1.12 })}
    ${box({ x: 960, y: 410, w: 670, h: 300, fill: '#FFF9EF', stroke: C.gold, title: ['High Impact / Moderately Recoverable'], body: ['- Coding visibility gaps', '- Transitional dossier timing/quality', '- Evidence not linked to utilization economics'], titleCenter: false, titleSize: 28, bodySize: 18, bodyLineGap: 1.12 })}
    ${box({ x: 230, y: 770, w: 670, h: 300, fill: '#F3F7FC', stroke: C.blue, title: ['Lower Impact / Hard-to-Shift'], body: ['- Baseline launch admin overhead', '- Temporary committee friction', '- Early protocol variability'], titleCenter: false, titleSize: 28, bodySize: 18, bodyLineGap: 1.12 })}
    ${box({ x: 960, y: 770, w: 670, h: 300, fill: '#F1F8F5', stroke: C.teal, title: ['Recoverable / Execution-Driven'], body: ['- Segment-specific account strategy', '- 340B-aware channel planning', '- Contract and support precision'], titleCenter: false, titleSize: 28, bodySize: 18, bodyLineGap: 1.12 })}
  `;
  return baseSvg(inner);
}

function visualD() {
  const steps = [
    { title: '1. Assess & Benchmark', body: 'Map pathways, on-market analogs,\nand claims visibility', fill: C.sky, stroke: C.blue, x: 90, y: 390 },
    { title: '2. Quantify', body: 'Model provider margin, timing risk,\nGTN buckets, and analog deltas', fill: C.sage, stroke: C.teal, x: 650, y: 390 },
    { title: '3. Segment', body: 'Prioritize accounts by site mix,\nchannel exposure, and readiness', fill: C.sand, stroke: C.gold, x: 1210, y: 390 },
    { title: '4. Stress-Test', body: 'Run scenario ranges across\nlaunch, mid-cycle, and mature states', fill: C.mist, stroke: C.navy, x: 90, y: 790 },
    { title: '5. Recover', body: 'Deploy coding, channel, evidence, and\ncontracting levers tied to leakage', fill: '#F8FAFC', stroke: '#8F5D3B', x: 650, y: 790 },
    { title: '6. Operationalize', body: 'Convert strategy into field tools,\nKPIs, and governance cadence', fill: C.softGray, stroke: '#52627B', x: 1210, y: 790 }
  ];
  const inner = `
    ${titleBand('Decision View: Operating Method', 'Assess -> Quantify -> Segment -> Stress-Test -> Recover -> Operationalize')}
    ${steps
      .map((s) => {
        return box({
          x: s.x,
          y: s.y,
          w: 500,
          h: 220,
          fill: s.fill,
          stroke: s.stroke,
          title: [s.title],
          body: s.body.split('\n'),
          titleCenter: false,
          titleSize: 26,
          bodySize: 18,
          bodyLineGap: 1.15
        });
      })
      .join('\n')}
    <line x1="590" y1="500" x2="650" y2="500" stroke="${C.line}" stroke-width="4" marker-end="url(#arrow)" />
    <line x1="1150" y1="500" x2="1210" y2="500" stroke="${C.line}" stroke-width="4" marker-end="url(#arrow)" />
    <line x1="1460" y1="610" x2="1460" y2="790" stroke="${C.line}" stroke-width="4" marker-end="url(#arrow)" />
    <line x1="1210" y1="900" x2="1150" y2="900" stroke="${C.line}" stroke-width="4" marker-end="url(#arrow)" />
    <line x1="650" y1="900" x2="590" y2="900" stroke="${C.line}" stroke-width="4" marker-end="url(#arrow)" />
    <rect x="90" y="1090" width="1620" height="86" rx="18" ry="18" fill="#F6F8FB" stroke="#8A95A8" stroke-width="2" />
    <text x="110" y="1142" fill="${C.ink}" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="400">Output: a commercialization strategy tied to reimbursement reality, economics segmentation, and operational execution.</text>
  `;
  return baseSvg(inner);
}

function visualE() {
  const colX = [210, 680, 1150];
  const colW = 380;
  const rowY = [350, 455, 560, 665, 770, 875];
  const rowLabels = [
    ['Reimbursement', 'maturity'],
    ['Benefit /', 'formulary lens'],
    ['Site-of-care', 'sensitivity'],
    ['GTN', 'exposure'],
    ['Channel', 'behavior'],
    ['Strategic', 'readout']
  ];
  const cells = [
    [
      ['Launch / new-to-market', 'Transition support still matters.', 'Coding and uptake are not settled.'],
      ['On-market / mid-cycle', 'Coverage is established.', 'Mix and contract refresh drive behavior.'],
      ['Mature / late-cycle', 'Economics are mature.', 'Defense and substitution pressure rise.']
    ],
    [
      ['Medical benefit / buy-and-bill', 'Hospital outpatient and office economics still matter.'],
      ['Part D / formulary', 'Tiering, prior auth, step edits, and exceptions shape access.'],
      ['Mixed-bucket management', 'Coverage refresh and benefit migration drive behavior.']
    ],
    [
      ['Site absorbs first use.', 'Hospital or office carry risk is high.'],
      ['Site mix shifts drive value.', 'Behavior differs by HOPD, office, Part D, and 340B.'],
      ['Site mix is optimized or migrated.', 'Operational burden is mostly normalized.']
    ],
    [
      ['Bridge costs and early discounts.', 'Leakage is still being discovered.'],
      ['340B, formulary, and contract refresh affect net.', 'Erosion becomes more visible.'],
      ['Persistent pricing pressure.', 'Net depends on defense discipline.']
    ],
    [
      ['Field education and pull-through.', 'Access is still being established.'],
      ['Resegmentation and access defense.', 'Channel behavior is a management variable.'],
      ['Defensive contracting and churn management.', 'Channel structure is entrenched.']
    ],
    [
      ['Validate adoption path.', 'Use launch pricing and support wisely.'],
      ['Protect margin and mix.', 'Benchmark against analogs before scaling.'],
      ['Defend share or reprice.', 'Change the business, not just the message.']
    ]
  ];
  const colTitles = ['Launch / New-to-Market', 'On-Market / Mid-Cycle', 'Mature / Late-Cycle'];
  const colMeta = [
    { fill: C.sky, stroke: C.blue, accent: '#F8FBFF' },
    { fill: C.sage, stroke: C.teal, accent: '#F5FBF7' },
    { fill: C.sand, stroke: C.gold, accent: '#FFFCF7' }
  ];
  const inner = `
    ${titleBand('Decision View: On-Market / Mid-Cycle Landscape Assessment', 'Benchmark established products to understand what a normal reimbursement and access pattern looks like')}
    ${colX
      .map((x, idx) => {
        const meta = colMeta[idx];
        return `
          <rect x="${x}" y="290" width="${colW}" height="675" rx="20" ry="20" fill="${meta.accent}" stroke="${meta.stroke}" stroke-width="${idx === 1 ? 4 : 3}" />
          <rect x="${x + 14}" y="314" width="${colW - 28}" height="90" rx="16" ry="16" fill="${meta.fill}" stroke="${meta.stroke}" stroke-width="2" />
          <text x="${x + colW / 2}" y="348" text-anchor="middle" fill="${C.ink}" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700">${esc(colTitles[idx])}</text>
          ${idx === 1 ? `<text x="${x + colW / 2}" y="378" text-anchor="middle" fill="${C.muted}" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600">benchmark column</text>` : ''}
        `;
      })
      .join('')}
    ${cells
      .map((row, rIdx) =>
        row
          .map((cell, cIdx) => {
            const x = colX[cIdx];
            const y = rowY[rIdx];
            const fill = cIdx === 1 ? '#FFFFFF' : '#FBFCFE';
            const stroke = cIdx === 1 ? (rIdx < 2 ? C.teal : C.navy) : '#C9D5E4';
            const title = cell[0];
            const body = cell.slice(1);
            return `
              <rect x="${x}" y="${y}" width="${colW}" height="92" rx="14" ry="14" fill="${fill}" stroke="${stroke}" stroke-width="${cIdx === 1 ? 3 : 2}" />
              <text x="${x + 16}" y="${y + 28}" fill="${C.ink}" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700">${esc(title)}</text>
              <text x="${x + 16}" y="${y + 50}" fill="${C.ink}" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="400">
                ${body
                  .map((line, i) => `<tspan x="${x + 16}" dy="${i === 0 ? 0 : 16}">${esc(line)}</tspan>`)
                  .join('')}
              </text>
            `;
          })
          .join('')
      )
      .join('')}
    ${rowLabels
      .map((label, idx) => `
        <text x="36" y="${rowY[idx] + 26}" fill="${C.title}" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="700">
          ${label.map((line, lineIdx) => `<tspan x="36" dy="${lineIdx === 0 ? 0 : 18}">${esc(line)}</tspan>`).join('')}
        </text>
      `)
      .join('')}
    <rect x="80" y="1040" width="1620" height="70" rx="18" ry="18" fill="#F6F8FB" stroke="#8A95A8" stroke-width="2" />
    <text x="106" y="1083" fill="${C.ink}" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="400">Use this view to benchmark launch assets against what stable analogs already absorb and to see where mid-cycle products begin to erode.</text>
  `;
  return baseSvg(inner);
}

async function render(name, svg) {
  const out = path.join(OUT, name);
  await sharp(Buffer.from(svg)).png().toFile(out);
}

await fs.mkdir(OUT, { recursive: true });
await render('reimbursement_pathway_map.png', visualA());
await render('launch_economics_pressure_map.png', visualB());
await render('on_market_midcycle_landscape_assessment.png', visualE());
await render('recoverable_vs_structural_losses.png', visualC());
await render('joseph_approach_framework.png', visualD());
console.log(`Wrote visuals to ${OUT}`);
