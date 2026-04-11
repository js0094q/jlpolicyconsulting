"use strict";

const pptxgen = require("pptxgenjs");
const {
  calcTextBox,
  imageSizingContain,
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./pptxgenjs_helpers");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "JL Policy Consulting";
pptx.subject = "Adrabetadex Provider Net Cost Calculator";
pptx.title = "Adrabetadex Provider Net Cost Calculator";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  lang: "en-US",
};

const C = {
  bg: "FAFAF7",
  white: "FFFFFF",
  title: "6E9F3A",
  titleDark: "4E7A24",
  panel: "E9F0DF",
  panelAlt: "F3F6EC",
  border: "B8C5AA",
  text: "4B4F4A",
  subtext: "6B706A",
  dark: "2F5A1E",
  accent: "A8CF45",
  mutedLine: "D8DED0",
};

const PAGE_W = 13.333;
const PAGE_H = 7.5;
const M = 0.55;
const CONTENT_W = PAGE_W - M * 2;

function addBase(slide, n) {
  slide.background = { color: C.bg };

  slide.addText("Adrabetadex Provider Net Cost Calculator", {
    x: M,
    y: 0.22,
    w: 4.4,
    h: 0.16,
    fontFace: "Arial",
    fontSize: 7.5,
    color: C.subtext,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.line, {
    x: M,
    y: 0.42,
    w: CONTENT_W,
    h: 0,
    line: { color: C.mutedLine, pt: 1 },
  });

  slide.addText(String(n), {
    x: PAGE_W - 0.65,
    y: 7.06,
    w: 0.22,
    h: 0.16,
    fontFace: "Arial",
    fontSize: 7.5,
    align: "right",
    color: C.subtext,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0,
    y: 7.18,
    w: 2.45,
    h: 0.32,
    rectRadius: 0.12,
    line: { color: C.accent, transparency: 100 },
    fill: { color: C.accent },
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.65,
    y: 7.18,
    w: 4.3,
    h: 0.32,
    rectRadius: 0.12,
    line: { color: C.dark, transparency: 100 },
    fill: { color: C.dark },
  });
}

function addTitle(slide, title, kicker = "") {
  slide.addText(title, {
    x: M,
    y: 0.62,
    w: 8.5,
    h: 0.45,
    fontFace: "Arial",
    fontSize: 22,
    bold: true,
    color: C.title,
    margin: 0,
  });
  if (kicker) {
    slide.addText(kicker, {
      x: M,
      y: 1.1,
      w: 5.8,
      h: 0.22,
      fontFace: "Arial",
      fontSize: 9.5,
      color: C.subtext,
      margin: 0,
    });
  }
}

function addBullets(slide, items, x, y, w, fontSize = 15, color = C.text) {
  const runs = [];
  items.forEach((item) => {
    runs.push({
      text: item,
      options: {
        bullet: { indent: 12 },
        breakLine: true,
      },
    });
  });
  const h = calcTextBox(fontSize, {
    text: runs,
    w,
    fontFace: "Arial",
    margin: 0,
    padding: 0,
    paraSpaceAfter: 6,
  }).h;
  slide.addText(runs, {
    x,
    y,
    w,
    h,
    fontFace: "Arial",
    fontSize,
    color,
    margin: 0,
    breakLine: false,
    paraSpaceAfterPt: 6,
    valign: "top",
  });
  return h;
}

function addMessageBox(slide, text, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: opts.radius || 0.08,
    line: { color: opts.border || C.border, pt: opts.linePt || 1 },
    fill: { color: opts.fill || C.panel },
  });
  slide.addText(text, {
    x: x + 0.18,
    y: y + 0.12,
    w: w - 0.36,
    h: h - 0.24,
    fontFace: "Arial",
    fontSize: opts.fontSize || 12.5,
    bold: opts.bold || false,
    color: opts.color || C.text,
    align: opts.align || "left",
    valign: opts.valign || "mid",
    margin: 0,
  });
}

function addPill(slide, text, x, y, w) {
  addMessageBox(slide, text, x, y, w, 0.4, {
    fill: C.panelAlt,
    border: C.border,
    fontSize: 10,
    color: C.titleDark,
    bold: true,
    align: "center",
  });
}

function addChevron(slide, x, y, w, h, fill, text, textColor = C.text) {
  slide.addShape(pptx.ShapeType.chevron, {
    x,
    y,
    w,
    h,
    line: { color: C.border, pt: 1 },
    fill: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.22,
    y: y + 0.16,
    w: w - 0.5,
    h: h - 0.32,
    fontFace: "Arial",
    fontSize: 12.2,
    bold: true,
    color: textColor,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addLabelValue(slide, label, value, x, y, w, accent = false) {
  slide.addText(label, {
    x,
    y,
    w,
    h: 0.16,
    fontFace: "Arial",
    fontSize: 9.5,
    bold: true,
    color: C.subtext,
    margin: 0,
  });
  slide.addText(value, {
    x,
    y: y + 0.18,
    w,
    h: 0.38,
    fontFace: "Arial",
    fontSize: accent ? 18 : 15,
    bold: accent,
    color: accent ? C.titleDark : C.text,
    margin: 0,
  });
}

function addScenarioCard(slide, x, y, w, h, title, basis, signal, implication, tone) {
  const fills = {
    negative: "F6E7E3",
    neutral: "F3F1E8",
    positive: "E9F0DF",
    strong: "DDEACE",
  };
  const strokes = {
    negative: "C97F68",
    neutral: "B6A56D",
    positive: "7AA453",
    strong: "4E7A24",
  };
  const toneFill = fills[tone] || C.panelAlt;
  const toneStroke = strokes[tone] || C.border;

  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    line: { color: C.border, pt: 1 },
    fill: { color: C.white },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.1,
    h,
    line: { color: toneStroke, transparency: 100 },
    fill: { color: toneStroke },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h: 0.42,
    line: { color: C.border, pt: 0.8 },
    fill: { color: toneFill },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + w - 1.1,
    y: y + 0.09,
    w: 0.88,
    h: 0.22,
    rectRadius: 0.08,
    line: { color: toneStroke, pt: 0.8 },
    fill: { color: C.white },
  });
  slide.addText(
    tone === "negative"
      ? "strained"
      : tone === "neutral"
      ? "threshold"
      : tone === "positive"
      ? "viable"
      : "advantaged",
    {
      x: x + w - 1.02,
      y: y + 0.13,
      w: 0.72,
      h: 0.08,
      fontFace: "Arial",
      fontSize: 7.4,
      bold: true,
      color: toneStroke,
      align: "center",
      margin: 0,
    }
  );
  slide.addText(title, {
    x: x + 0.12,
    y: y + 0.08,
    w: w - 1.3,
    h: 0.3,
    fontFace: "Arial",
    fontSize: 10.4,
    bold: true,
    color: C.titleDark,
    margin: 0,
  });
  slide.addText(basis, {
    x: x + 0.12,
    y: y + 0.53,
    w: w - 0.24,
    h: 0.48,
    fontFace: "Arial",
    fontSize: 9.5,
    color: C.text,
    margin: 0,
    valign: "top",
  });
  slide.addText(signal, {
    x: x + 0.12,
    y: y + 1.05,
    w: w - 0.24,
    h: 0.34,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: C.titleDark,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: x + 0.12,
    y: y + 1.44,
    w: w - 0.24,
    h: 0,
    line: { color: C.mutedLine, pt: 0.8 },
  });
  slide.addText(implication, {
    x: x + 0.12,
    y: y + 1.54,
    w: w - 0.24,
    h: h - 1.66,
    fontFace: "Arial",
    fontSize: 9.3,
    color: C.subtext,
    margin: 0,
    valign: "top",
  });
}

function finalizeSlide(slide) {
  warnIfSlideHasOverlaps(slide, pptx, {
    muteContainment: true,
    ignoreLines: true,
    ignoreDecorativeShapes: true,
  });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

function buildTitleSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };

  slide.addImage({
    path: "/Users/josephstewart/Documents/JLPolicyConsulting/tmp/adrabetadex_deck/assets/navisync_logo_crop.png",
    x: 0.6,
    y: 0.28,
    w: 3.75,
    h: 1.04,
  });

  slide.addText("April 2026", {
    x: 1.58,
    y: 1.28,
    w: 1.25,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 9.8,
    color: C.subtext,
    margin: 0,
  });

  slide.addText("Adrabetadex Provider Net Cost Calculator", {
    x: 1.58,
    y: 1.62,
    w: 9.4,
    h: 0.72,
    fontFace: "Arial",
    fontSize: 24.5,
    bold: true,
    color: C.title,
    margin: 0,
  });
  slide.addText("Why launch uptake depends on provider economics, not clinical value alone", {
    x: 1.58,
    y: 2.38,
    w: 8.2,
    h: 0.42,
    fontFace: "Arial",
    fontSize: 15.6,
    color: C.text,
    margin: 0,
  });

  slide.addText("Prepared for the Beren Therapeutics launch team", {
    x: 1.58,
    y: 3.0,
    w: 4.2,
    h: 0.22,
    fontFace: "Arial",
    fontSize: 10.8,
    color: C.text,
    margin: 0,
  });

  slide.addText("Strategic internal discussion deck based on the concept brief", {
    x: 1.58,
    y: 3.28,
    w: 4.8,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 9.8,
    color: C.subtext,
    margin: 0,
  });

  const boxY = 4.26;
  const boxW = 2.2;
  const gap = 0.22;
  const startX = 1.58;
  [
    ["Payer + PBM", C.panel],
    ["Specialty pharmacy", C.white],
    ["Hospital / COE / office", C.panel],
    ["Provider net margin", C.white],
  ].forEach((item, i) => {
    addMessageBox(slide, item[0], startX + i * (boxW + gap), boxY, boxW, 0.78, {
      fill: item[1],
      border: C.border,
      fontSize: 12.5,
    });
  });

  slide.addShape(pptx.ShapeType.line, {
    x: startX + boxW,
    y: boxY + 0.39,
    w: gap,
    h: 0,
    line: { color: C.title, pt: 2.2, endArrowType: "triangle" },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: startX + (boxW + gap) + boxW,
    y: boxY + 0.39,
    w: gap,
    h: 0,
    line: { color: C.title, pt: 2.2, endArrowType: "triangle" },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: startX + 2 * (boxW + gap) + boxW,
    y: boxY + 0.39,
    w: gap,
    h: 0,
    line: { color: C.title, pt: 2.2, endArrowType: "triangle" },
  });

  [
    { x: 3.7, text: "340B / Medicaid\nclaim path" },
    { x: 6.05, text: "Coding + pass-\nthrough status" },
    { x: 8.4, text: "Support +\ncontracting levers" },
  ].forEach((item) => {
    addMessageBox(slide, item.text, item.x, 5.15, 2.08, 0.72, {
      fill: C.panelAlt,
      border: C.border,
      fontSize: 11.4,
      align: "center",
    });
  });

  slide.addText("Provider economics sit between clinical interest and operational adoption.", {
    x: 1.58,
    y: 6.16,
    w: 6.8,
    h: 0.3,
    fontFace: "Arial",
    fontSize: 11.2,
    color: C.subtext,
    italic: true,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0,
    y: 7.18,
    w: 2.8,
    h: 0.32,
    rectRadius: 0.12,
    line: { color: C.accent, transparency: 100 },
    fill: { color: C.accent },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 3.0,
    y: 7.18,
    w: 4.6,
    h: 0.32,
    rectRadius: 0.12,
    line: { color: C.dark, transparency: 100 },
    fill: { color: C.dark },
  });

  finalizeSlide(slide);
}

function buildStrategicIssue() {
  const slide = pptx.addSlide();
  addBase(slide, 2);
  addTitle(slide, "The strategic issue", "Clinical differentiation is necessary; provider economics still decide uptake.");

  const bullets = [
    "Buy-and-bill adoption depends on whether providers can recover acquisition, administration, and delay costs.",
    "White-bagging can eliminate drug spread and shift the provider equation to administration-only revenue.",
    "340B creates a structural advantage for eligible centers of excellence over community sites.",
    "Medicaid coverage can still fail economically if PAD and NDC claim integrity break down.",
    "Coding and pass-through timing determine when hospital outpatient billing becomes predictable.",
  ];
  addBullets(slide, bullets, M, 1.52, 6.2, 14.2);

  addMessageBox(
    slide,
    "The calculator is a reimbursement execution model, not a list-price model.",
    7.28,
    1.7,
    5.1,
    1.2,
    {
      fill: C.panel,
      border: C.title,
      linePt: 1.4,
      fontSize: 18,
      color: C.titleDark,
      bold: true,
      align: "center",
    }
  );

  addMessageBox(slide, "Launch question", 7.28, 3.24, 1.55, 0.42, {
    fill: C.panelAlt,
    border: C.border,
    fontSize: 10,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  slide.addText("Can a provider afford to buy, bill, and administer adrabetadex under real-world reimbursement conditions?", {
    x: 7.28,
    y: 3.82,
    w: 5.1,
    h: 1.2,
    fontFace: "Arial",
    fontSize: 18.5,
    bold: true,
    color: C.text,
    margin: 0,
    valign: "mid",
  });

  slide.addShape(pptx.ShapeType.line, {
    x: M,
    y: 6.22,
    w: CONTENT_W,
    h: 0,
    line: { color: C.mutedLine, pt: 1 },
  });
  slide.addText("Provider-economics framing from the brief: uptake risk emerges when clinical interest reaches the point of stocking inventory.", {
    x: M,
    y: 6.38,
    w: 8.8,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 10.2,
    color: C.subtext,
    margin: 0,
  });

  finalizeSlide(slide);
}

function buildModelDesignedToShow() {
  const slide = pptx.addSlide();
  addBase(slide, 3);
  addTitle(slide, "What the model is designed to show", "One workflow links reimbursement conditions to provider margin and working-capital exposure.");

  const x0 = M;
  const y = 2.0;
  addChevron(slide, x0, y, 2.0, 0.7, C.panel, "Payer / PBM");
  addChevron(slide, x0 + 2.1, y, 2.0, 0.7, C.white, "Channel rules");
  addChevron(slide, x0 + 4.2, y, 2.25, 0.7, C.panel, "Site + coding");
  addChevron(slide, x0 + 6.55, y, 2.2, 0.7, C.white, "Support levers");
  addChevron(slide, x0 + 8.85, y, 2.25, 0.7, C.panel, "Provider result");

  [
    ["White-bagging risk", 2.15],
    ["340B / Medicaid path", 4.55],
    ["Pass-through timing", 6.92],
  ].forEach((item) => addPill(slide, item[0], item[1], 3.04, 1.72));

  addMessageBox(slide, "Model outputs", 6.95, 4.2, 2.1, 0.46, {
    fill: C.panelAlt,
    border: C.border,
    fontSize: 10,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  const outputBullets = [
    "Expected reimbursement",
    "Acquisition cost exposure",
    "Denial and delay risk",
    "Administration economics",
    "Break-even support threshold",
  ];
  addBullets(slide, outputBullets, 6.9, 4.8, 2.75, 11.1);

  addMessageBox(slide, "The model converts payer rules and channel mechanics into center-level economics.", M, 4.22, 5.55, 0.8, {
    fill: C.panel,
    border: C.border,
    fontSize: 16,
    color: C.text,
    bold: true,
    align: "center",
  });

  slide.addText("Not modeled as manufacturer gross-to-net. Modeled from the provider perspective: inventory at risk, time to cash, contribution margin, and the support needed to keep the site whole.", {
    x: M,
    y: 5.28,
    w: 5.55,
    h: 1.05,
    fontFace: "Arial",
    fontSize: 12.5,
    color: C.text,
    margin: 0,
  });

  addMessageBox(slide, "Decision use", 9.78, 4.2, 1.72, 0.46, {
    fill: C.panelAlt,
    border: C.border,
    fontSize: 10,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  slide.addText("Which channels are viable, which centers should activate first, and where manufacturer support changes behavior.", {
    x: 9.72,
    y: 4.82,
    w: 2.6,
    h: 1.45,
    fontFace: "Arial",
    fontSize: 12.2,
    bold: true,
    color: C.text,
    margin: 0,
  });

  finalizeSlide(slide);
}

function buildWhyItMatters() {
  const slide = pptx.addSlide();
  addBase(slide, 4);
  addTitle(slide, "Why this matters for adrabetadex", "The clinical profile may be attractive; the economic pathway is still fragile for providers.");

  addMessageBox(slide, "Working launch assumption", M, 1.62, 2.45, 0.42, {
    fill: C.panelAlt,
    border: C.border,
    fontSize: 10,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  addMessageBox(slide, "$39,000 per 900 mg vial\n~$1.014M annual gross drug exposure before administration cost", M, 2.12, 4.7, 1.46, {
    fill: C.panel,
    border: C.title,
    linePt: 1.4,
    fontSize: 18.2,
    color: C.titleDark,
    bold: true,
    align: "center",
  });

  addBullets(slide, [
    "High-cost therapy",
    "Likely hospital-centered pathway",
    "Ultra-rare pediatric setting",
    "Clinically differentiated profile",
    "Small claim failures can materially change site behavior",
  ], 5.65, 1.84, 3.4, 13.8);

  addMessageBox(slide, "Financial fragility for the site of care", 9.4, 1.62, 2.4, 0.42, {
    fill: C.panelAlt,
    border: C.border,
    fontSize: 10,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  slide.addText("A few unpaid or delayed claims can make stocking and administering adrabetadex unattractive even when demand is clinically justified.", {
    x: 9.4,
    y: 2.15,
    w: 2.9,
    h: 1.35,
    fontFace: "Arial",
    fontSize: 14.5,
    color: C.text,
    margin: 0,
    valign: "mid",
  });

  slide.addShape(pptx.ShapeType.line, {
    x: M,
    y: 4.55,
    w: CONTENT_W,
    h: 0,
    line: { color: C.mutedLine, pt: 1 },
  });

  addLabelValue(slide, "What makes the launch sensitive", "Acquisition outlay arrives before clean reimbursement is proven.", M, 4.82, 3.35);
  addLabelValue(slide, "Why the model matters", "It shows where support, coding, and channel design change provider behavior.", 4.65, 4.82, 3.65);
  addLabelValue(slide, "Leadership implication", "Economic feasibility must be designed in before broad site activation.", 8.78, 4.82, 3.75, true);

  finalizeSlide(slide);
}

function buildFiveVariables() {
  const slide = pptx.addSlide();
  addBase(slide, 5);
  addTitle(slide, "The five launch variables that determine uptake", "Each variable affects whether the provider can maintain a positive operating position.");

  const cards = [
    {
      title: "1. Commercial medical benefit",
      capture: "PA status, specialist rules, site-of-care controls, white-bagging risk, discount sensitivity.",
      why: "Shows whether buy-and-bill remains viable or is pushed toward near break-even.",
    },
    {
      title: "2. Medicaid claim pathway",
      capture: "EPSDT tailwind, PAD methodology, NDC capture, FFS versus managed care split.",
      why: "Distinguishes medical necessity from actual payment reliability.",
    },
    {
      title: "3. 340B acquisition economics",
      capture: "Estimated ceiling-price advantage, carve-in or carve-out treatment, duplicate-discount controls.",
      why: "Highlights which COEs are structurally advantaged at launch.",
    },
    {
      title: "4. Outpatient coding and pass-through",
      capture: "Miscellaneous-code bridge, HCPCS timing, OPPS pass-through readiness.",
      why: "Determines when hospital outpatient billing becomes predictable enough to scale.",
    },
    {
      title: "5. Manufacturer support structure",
      capture: "Prompt-pay discount, acquisition rebate, free-drug bridge, patient-support assumptions.",
      why: "Separates support that fixes provider economics from support that only reduces abandonment.",
    },
  ];

  const cardX = M;
  const cardW = 12.2;
  const cardH = 0.88;
  const yPositions = [1.55, 2.45, 3.35, 4.25, 5.15];

  cards.forEach((card, idx) => {
    const x = cardX;
    const y = yPositions[idx];
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: cardW,
      h: cardH,
      rectRadius: 0.07,
      line: { color: C.border, pt: 1 },
      fill: { color: idx % 2 === 0 ? C.panelAlt : C.white },
    });
    slide.addText(card.title, {
      x: x + 0.16,
      y: y + 0.1,
      w: 2.7,
      h: 0.46,
      fontFace: "Arial",
      fontSize: 10.4,
      bold: true,
      color: C.titleDark,
      margin: 0,
      valign: "mid",
    });
    slide.addText(card.capture, {
      x: x + 2.9,
      y: y + 0.1,
      w: 4.05,
      h: 0.62,
      fontFace: "Arial",
      fontSize: 8.8,
      color: C.text,
      margin: 0,
      valign: "mid",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: x + 7.22,
      y,
      w: 0,
      h: cardH,
      line: { color: C.mutedLine, pt: 0.8 },
    });
    slide.addText(card.why, {
      x: x + 7.42,
      y: y + 0.1,
      w: 4.45,
      h: 0.62,
      fontFace: "Arial",
      fontSize: 8.8,
      color: C.subtext,
      margin: 0,
      valign: "mid",
    });
  });

  finalizeSlide(slide);
}

function buildScenarioReadout() {
  const slide = pptx.addSlide();
  addBase(slide, 6);
  addTitle(slide, "Provider economics vary sharply by channel", "The scenario logic is provider-centered: buy, bill, administer, and collect.");

  const cards = [
    [
      "Commercial buy-and-bill\nNo meaningful support",
      "$39,000 acquisition with reimbursement compression against WAC.",
      "Negative / near break-even",
      "Commercial access may exist, but denial drag and carrying cost can deter stocking.",
      "negative",
    ],
    [
      "Commercial buy-and-bill\n5% support",
      "Acquisition reduced by provider-facing support of about $1,950 per dose.",
      "Near-neutral to modestly positive",
      "Represents the minimum realistic support threshold for non-340B participation.",
      "neutral",
    ],
    [
      "Commercial buy-and-bill\n10% support",
      "Acquisition reduced by provider-facing support of about $3,900 per dose.",
      "Consistently positive",
      "Broadens adoption beyond a few high-margin centers and reduces stocking resistance.",
      "positive",
    ],
    [
      "Commercial white-bagging",
      "Specialty pharmacy supplies drug; provider bills administration only.",
      "Drug spread removed",
      "Focus shifts to administration economics, clean claims, and operational simplicity.",
      "neutral",
    ],
    [
      "Medicaid non-340B",
      "Coverage may exist, but payment depends on PAD data capture and state methodology.",
      "Weak participation likely",
      "Community-site economics stay unattractive without a cleaner payment path.",
      "negative",
    ],
    [
      "340B center of excellence",
      "Estimated acquisition advantage versus WAC creates structural margin support.",
      "Structurally advantaged",
      "Early uptake is most favorable in eligible hospital systems and COEs.",
      "strong",
    ],
  ];

  const cols = [M, 4.47, 8.39];
  const rows = [1.55, 4.15];
  let idx = 0;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const card = cards[idx++];
      addScenarioCard(
        slide,
        cols[c],
        rows[r],
        3.8,
        2.18,
        card[0],
        card[1],
        card[2],
        card[3],
        card[4]
      );
    }
  }

  finalizeSlide(slide);
}

function buildLaunchImplications() {
  const slide = pptx.addSlide();
  addBase(slide, 7);
  addTitle(slide, "What the model suggests for launch strategy", "The economic readout becomes a sequencing tool for launch operations.");

  const recs = [
    "Prioritize 340B-advantaged centers of excellence early.",
    "Identify PBM and specialty-pharmacy rules that can force white-bagging.",
    "Quantify the minimum provider support needed for non-340B uptake.",
    "Build HCPCS and pass-through readiness into outpatient sequencing.",
  ];

  recs.forEach((text, idx) => {
    const y = 1.72 + idx * 1.11;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: M,
      y,
      w: 0.62,
      h: 0.62,
      rectRadius: 0.08,
      line: { color: C.title, pt: 1.1 },
      fill: { color: C.panel },
    });
    slide.addText(String(idx + 1), {
      x: M,
      y: y + 0.11,
      w: 0.62,
      h: 0.22,
      fontFace: "Arial",
      fontSize: 17,
      bold: true,
      color: C.titleDark,
      align: "center",
      margin: 0,
    });
    slide.addText(text, {
      x: 1.34,
      y: y + 0.06,
      w: 6.2,
      h: 0.34,
      fontFace: "Arial",
      fontSize: 13.4,
      bold: true,
      color: C.text,
      margin: 0,
    });
    slide.addText(
      [
        "Use structural margin advantage to anchor early adoption where the pathway is already favorable.",
        "Treat sourcing rules as launch design inputs, not downstream contracting details.",
        "Separate provider-facing support from patient affordability support when setting launch budgets.",
        "Plan hospital-outpatient readiness around code timing and the earliest practical pass-through window.",
      ][idx],
      {
        x: 1.34,
        y: y + 0.38,
        w: 6.2,
        h: 0.24,
        fontFace: "Arial",
        fontSize: 9.5,
        color: C.subtext,
        margin: 0,
      }
    );
  });

  addMessageBox(slide, "Final takeaway", 8.6, 1.65, 2.25, 0.44, {
    fill: C.panelAlt,
    border: C.border,
    fontSize: 10,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  addMessageBox(
    slide,
    "Clinical differentiation may open doors, but reimbursement mechanics determine scalable site activation.",
    8.25,
    2.38,
    4.0,
    2.05,
    {
      fill: C.panel,
      border: C.title,
      linePt: 1.4,
      fontSize: 16.4,
      color: C.titleDark,
      bold: true,
      align: "center",
    }
  );

  finalizeSlide(slide);
}

function buildRecommendedFormat() {
  const slide = pptx.addSlide();
  addBase(slide, 8);
  addTitle(slide, "Recommended calculator format", "Build a decision-facing front end with a transparent assumptions engine behind it.");

  slide.addShape(pptx.ShapeType.roundRect, {
    x: M,
    y: 1.6,
    w: 5.85,
    h: 4.45,
    rectRadius: 0.08,
    line: { color: C.border, pt: 1.1 },
    fill: { color: C.white },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: M,
    y: 1.6,
    w: 5.85,
    h: 0.48,
    line: { color: C.border, pt: 1 },
    fill: { color: C.panel },
  });
  slide.addText("Front end: decision summary", {
    x: M + 0.18,
    y: 1.73,
    w: 2.8,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 13,
    bold: true,
    color: C.titleDark,
    margin: 0,
  });
  [
    "Commercial buy-and-bill summary",
    "Commercial white-bagging summary",
    "Medicaid non-340B summary",
    "340B and COE summary",
    "Hospital outpatient pass-through summary",
  ].forEach((item, i) => {
    addMessageBox(slide, item, M + 0.25, 2.25 + i * 0.66, 5.35, 0.46, {
      fill: i % 2 === 0 ? C.panelAlt : C.white,
      border: C.border,
      fontSize: 11.2,
      color: C.text,
    });
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.92,
    y: 1.6,
    w: 5.86,
    h: 4.45,
    rectRadius: 0.08,
    line: { color: C.border, pt: 1.1 },
    fill: { color: C.white },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.92,
    y: 1.6,
    w: 5.86,
    h: 0.48,
    line: { color: C.border, pt: 1 },
    fill: { color: C.panel },
  });
  slide.addText("Back end: assumptions engine", {
    x: 7.1,
    y: 1.73,
    w: 3.0,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 13,
    bold: true,
    color: C.titleDark,
    margin: 0,
  });
  [
    "Formula logic by channel and site of care",
    "Public benchmark references and payer-policy notes",
    "Provider support toggles and break-even logic",
    "Center-specific assumptions and local overrides",
    "Claim performance inputs and working-capital assumptions",
  ].forEach((item, i) => {
    addMessageBox(slide, item, 7.17, 2.25 + i * 0.66, 5.36, 0.46, {
      fill: i % 2 === 0 ? C.panelAlt : C.white,
      border: C.border,
      fontSize: 11.2,
      color: C.text,
    });
  });

  addMessageBox(slide, "Practical outputs", 5.0, 6.1, 3.1, 0.32, {
    fill: C.white,
    border: C.border,
    fontSize: 10,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  addMessageBox(slide, "Contracting priority list", 3.78, 6.55, 2.35, 0.5, {
    fill: C.panel,
    border: C.border,
    fontSize: 11.8,
    bold: true,
    color: C.text,
    align: "center",
  });
  addMessageBox(slide, "Support action list", 7.1, 6.55, 2.35, 0.5, {
    fill: C.panel,
    border: C.border,
    fontSize: 11.8,
    bold: true,
    color: C.text,
    align: "center",
  });

  finalizeSlide(slide);
}

function buildBottomLine() {
  const slide = pptx.addSlide();
  addBase(slide, 9);
  addTitle(slide, "Bottom line", "The launch opportunity is real, but site-level economics will decide whether it scales.");

  addMessageBox(slide, "1", M, 1.75, 0.58, 0.58, {
    fill: C.panel,
    border: C.title,
    fontSize: 18,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  slide.addText("Adrabetadex may have a compelling clinical story.", {
    x: 1.35,
    y: 1.84,
    w: 4.7,
    h: 0.42,
    fontFace: "Arial",
    fontSize: 16,
    bold: true,
    color: C.text,
    margin: 0,
  });

  addMessageBox(slide, "2", M, 2.85, 0.58, 0.58, {
    fill: C.panel,
    border: C.title,
    fontSize: 18,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  slide.addText("Provider uptake will still be determined by reimbursement execution and channel design.", {
    x: 1.35,
    y: 2.95,
    w: 6.35,
    h: 0.42,
    fontFace: "Arial",
    fontSize: 16,
    bold: true,
    color: C.text,
    margin: 0,
  });

  addMessageBox(slide, "3", M, 3.95, 0.58, 0.58, {
    fill: C.panel,
    border: C.title,
    fontSize: 18,
    bold: true,
    color: C.titleDark,
    align: "center",
  });
  slide.addText("Use the provider net cost calculator before launch to prioritize channels, centers, and support design.", {
    x: 1.35,
    y: 4.05,
    w: 5.85,
    h: 0.48,
    fontFace: "Arial",
    fontSize: 16,
    bold: true,
    color: C.text,
    margin: 0,
  });

  addMessageBox(
    slide,
    "The right reimbursement design can turn clinical interest into operational adoption.",
    8.55,
    2.0,
    3.0,
    1.82,
    {
      fill: C.panel,
      border: C.title,
      linePt: 1.4,
      fontSize: 15.8,
      color: C.titleDark,
      bold: true,
      align: "center",
    }
  );

  slide.addText("Deck built from the concept brief only; no external facts added.", {
    x: M,
    y: 6.28,
    w: 4.8,
    h: 0.16,
    fontFace: "Arial",
    fontSize: 10,
    color: C.subtext,
    italic: true,
    margin: 0,
  });

  finalizeSlide(slide);
}

buildTitleSlide();
buildStrategicIssue();
buildModelDesignedToShow();
buildWhyItMatters();
buildFiveVariables();
buildScenarioReadout();
buildLaunchImplications();
buildRecommendedFormat();
buildBottomLine();

pptx.writeFile({ fileName: "/Users/josephstewart/Documents/JLPolicyConsulting/tmp/adrabetadex_deck/adrabetadex_provider_net_cost_calculator.pptx" });
