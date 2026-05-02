import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = path.resolve("output/exports/adrabetadex_provider_net_cost_recovery_calculator");
const workbookPath = path.join(outDir, "Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx");

const blob = await FileBlob.load(workbookPath);
const wb = await SpreadsheetFile.importXlsx(blob);

const core = wb.worksheets.getItem("Core Assumptions");
const selector = wb.worksheets.getItem("Scenario Selector");
const engine = wb.worksheets.getItem("Calculation Engine");

// 1) Relabel sensitivity -> pediatric
core.getRange("A24").values = [["340B discount assumption, pediatric"]];
core.getRange("A25").values = [["340B acquisition, pediatric"]];

// Ensure B23/B25 formulas and number format are currency (fix issue in B23)
core.getRange("B23").formulas = [["=B21*(1-B22)"]];
core.getRange("B25").formulas = [["=B21*(1-B24)"]];
core.getRange("B23:B25").format.numberFormat = "$#,##0.00";
core.getRange("B22:B24").format.numberFormat = "0.0%";

// 2) Update dropdown list text for acquisition assumption labels
// D4 was list label blocks; primary/pediatric/manual values are in E35:E37
core.getRange("E36").values = [["Pediatric 17.1%"]];

// 3) Apply recommended default placeholders in core editable assumptions
const defaults = {
  B39: 0.0,      // White-bagging %
  B40: 0.075,    // Denial rate
  B41: 0.60,     // Appeal recovery rate
  B42: 75,       // Days to payment
  B43: 750,      // Labor
  B44: 400,      // Pharmacy
  B45: 300,      // Billing/admin
  B46: 250,      // Other non-drug
  B47: 500,      // Procedure revenue
  B48: 0,        // Wastage
  B49: 0.08,     // Financing
  B50: 0,        // Manufacturer support
  B51: 40170,    // Manual allowed amount
  B52: 39000,    // Contracted rate
  B53: 46800,    // AWP
  B54: 37050,    // ASP
  B55: 29991,    // Manual 340B acquisition
  B56: 1.03,     // Reimbursement percentage
};
for (const [cell, val] of Object.entries(defaults)) {
  core.getRange(cell).values = [[val]];
}
core.getRange("B38").values = [["Primary 23.1%"]];

// Number formats for defaults
core.getRange("B39:B41").format.numberFormat = "0.0%";
core.getRange("B42:B42").format.numberFormat = "0";
core.getRange("B43:B48").format.numberFormat = "$#,##0";
core.getRange("B49:B49").format.numberFormat = "0.0%";
core.getRange("B50:B55").format.numberFormat = "$#,##0";
core.getRange("B56:B56").format.numberFormat = "0.0%";

// 4) Fix Preset Value formulas with robust INDEX/MATCH and update label text
// Update scenario field label and values
selector.getRange("A14").values = [["340B acquisition assumption"]];

// Update existing scenario table labels from Sensitivity -> Pediatric
const presetScan = await wb.inspect({
  kind: "match",
  searchTerm: "Sensitivity 17.1%",
  options: { useRegex: false, maxResults: 100 },
  maxChars: 6000,
});
const lines = presetScan.ndjson.split("\n").filter(Boolean);
for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.address && obj.sheet === "Scenario Selector") {
      selector.getRange(obj.address).values = [["Pediatric 17.1%"]];
    }
    if (obj.address && obj.sheet === "Core Assumptions") {
      core.getRange(obj.address).values = [["Pediatric 17.1%"]];
    }
  } catch {}
}

// Replace C5:C15 formulas with INDEX/MATCH against preset table
for (let r = 5; r <= 15; r++) {
  const presetColOffset = r - 4; // 1..11
  selector.getRange(`C${r}`).formulas = [[`=INDEX($B$32:$L$40,MATCH($B$2,$A$32:$A$40,0),${presetColOffset})`]];
  selector.getRange(`D${r}`).formulas = [[`=IF(B${r}<>"",B${r},C${r})`]];
}

// Ensure scenario preset default remains expected
selector.getRange("B2").values = [["Default 340B COE HOPD, Pass-Through Active"]];

// 5) Add three numeric scenario preset blocks and active selector for numeric assumptions
selector.getRange("A42:T42").values = [[
  "Numeric Preset Name",
  "White-bag %",
  "Denial %",
  "Appeal recovery %",
  "Days to payment",
  "Labor",
  "Pharmacy",
  "Billing/Admin",
  "Other non-drug",
  "Procedure revenue",
  "Wastage",
  "Financing %",
  "Mfr support",
  "Manual allowed",
  "Contracted rate",
  "AWP",
  "ASP",
  "Manual 340B acq",
  "Reimbursement %",
  "Acquisition Assumption"
]];

selector.getRange("A43:T45").values = [
  ["Base Case: 340B COE HOPD, Buy-and-Bill",0,0.075,0.60,75,750,400,300,250,500,0,0.08,0,40170,39000,46800,37050,29991,1.03,"Primary 23.1%"],
  ["Conservative Case: Launch Friction / Manual Review",0,0.15,0.50,120,1000,600,500,500,400,0,0.10,0,40170,37050,46800,35100,32331,0.95,"Pediatric 17.1%"],
  ["White-Bagging Case",1,0.05,0.70,45,750,250,250,250,500,0,0.08,0,0,0,46800,37050,0,0,"Manual entry"],
];

selector.getRange("A47:C47").values = [["Numeric Preset Selector", "Manual Override?", "Active"]];
selector.getRange("A48").values = [["Selected Numeric Preset"]];
selector.getRange("B48").values = [["Base Case: 340B COE HOPD, Buy-and-Bill"]];
selector.getRange("B48").dataValidation = {
  rule: {
    type: "list",
    values: [
      "Base Case: 340B COE HOPD, Buy-and-Bill",
      "Conservative Case: Launch Friction / Manual Review",
      "White-Bagging Case",
    ],
  },
};
selector.getRange("C48").formulas = [["=B48"]];

selector.getRange("A50:C50").values = [["Numeric Input", "Preset Value", "Active to Core"]];
const numericLabels = [
  "White-bagging percentage",
  "Denial rate",
  "Appeal recovery rate",
  "Days to payment",
  "Labor cost per administration",
  "Pharmacy handling cost per administration",
  "Billing/admin cost per administration",
  "Other non-drug operating cost",
  "Procedure revenue per administration",
  "Wastage cost per administration",
  "Financing rate",
  "Manufacturer support per administration",
  "Manual allowed amount",
  "Contracted rate",
  "AWP",
  "ASP",
  "Manual 340B acquisition",
  "Reimbursement percentage",
  "340B acquisition assumption",
];
selector.getRange("A51:A69").values = numericLabels.map((x) => [x]);
for (let r = 51; r <= 69; r++) {
  const idx = r - 50;
  selector.getRange(`B${r}`).formulas = [[`=INDEX($B$43:$T$45,MATCH($B$48,$A$43:$A$45,0),${idx})`]];
  selector.getRange(`C${r}`).formulas = [[`=B${r}`]];
}

// Push numeric active preset values into core assumptions so model uses preset sets
core.getRange("B38").formulas = [["='Scenario Selector'!$C$69"]];
core.getRange("B39").formulas = [["='Scenario Selector'!$C$51"]];
core.getRange("B40").formulas = [["='Scenario Selector'!$C$52"]];
core.getRange("B41").formulas = [["='Scenario Selector'!$C$53"]];
core.getRange("B42").formulas = [["='Scenario Selector'!$C$54"]];
core.getRange("B43").formulas = [["='Scenario Selector'!$C$55"]];
core.getRange("B44").formulas = [["='Scenario Selector'!$C$56"]];
core.getRange("B45").formulas = [["='Scenario Selector'!$C$57"]];
core.getRange("B46").formulas = [["='Scenario Selector'!$C$58"]];
core.getRange("B47").formulas = [["='Scenario Selector'!$C$59"]];
core.getRange("B48").formulas = [["='Scenario Selector'!$C$60"]];
core.getRange("B49").formulas = [["='Scenario Selector'!$C$61"]];
core.getRange("B50").formulas = [["='Scenario Selector'!$C$62"]];
core.getRange("B51").formulas = [["='Scenario Selector'!$C$63"]];
core.getRange("B52").formulas = [["='Scenario Selector'!$C$64"]];
core.getRange("B53").formulas = [["='Scenario Selector'!$C$65"]];
core.getRange("B54").formulas = [["='Scenario Selector'!$C$66"]];
core.getRange("B55").formulas = [["='Scenario Selector'!$C$67"]];
core.getRange("B56").formulas = [["='Scenario Selector'!$C$68"]];

// Engine formula update for renamed pediatric option
engine.getRange("B39").formulas = [["=IF(B13=\"Primary 23.1%\",'Core Assumptions'!$B$23,IF(B13=\"Pediatric 17.1%\",'Core Assumptions'!$B$25,B33))"]];

// Keep dropdown aligned with renamed value
selector.getRange("B14").dataValidation = {
  rule: { type: "list", values: ["Primary 23.1%", "Pediatric 17.1%", "Manual entry"] },
};
core.getRange("B38").dataValidation = {
  rule: { type: "list", values: ["Primary 23.1%", "Pediatric 17.1%", "Manual entry"] },
};

// Format added ranges
selector.getRange("A42:T42").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
selector.getRange("A50:C50").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
selector.getRange("A47:C47").format = { fill: "#DCE6F1", font: { bold: true } };
selector.getRange("A42:T69").format.wrapText = true;
selector.getRange("A:A").format.columnWidth = 36;
selector.getRange("B:D").format.columnWidth = 28;
selector.getRange("A42:T45").format.numberFormat = "General";
selector.getRange("B43:B45").format.numberFormat = "0.0%";
selector.getRange("C43:C45").format.numberFormat = "0.0%";
selector.getRange("L43:L45").format.numberFormat = "0.0%";
selector.getRange("S43:S45").format.numberFormat = "0.0%";
selector.getRange("F45:Q45").format.numberFormat = "$#,##0";
selector.getRange("B51:B53").format.numberFormat = "0.0%";
selector.getRange("B54:B54").format.numberFormat = "0";
selector.getRange("B55:B60").format.numberFormat = "$#,##0";
selector.getRange("B61:B61").format.numberFormat = "0.0%";
selector.getRange("B62:B67").format.numberFormat = "$#,##0";
selector.getRange("B68:B68").format.numberFormat = "0.0%";

// Validation checks snapshot
const checks = {
  b23Formula: core.getRange("B23").formulas?.[0]?.[0],
  b23Format: core.getRange("B23").format.numberFormat,
  presetC5: selector.getRange("C5").formulas?.[0]?.[0],
  acqLabel: core.getRange("A24").values?.[0]?.[0],
  defaultWhiteBag: core.getRange("B39").values?.[0]?.[0],
  defaultDenial: core.getRange("B40").values?.[0]?.[0],
  defaultAppeal: core.getRange("B41").values?.[0]?.[0],
};

const formulaErr = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  maxChars: 6000,
});

const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(workbookPath);

console.log(JSON.stringify(checks, null, 2));
console.log("FORMULA_ERR_SCAN");
console.log(formulaErr.ndjson);
