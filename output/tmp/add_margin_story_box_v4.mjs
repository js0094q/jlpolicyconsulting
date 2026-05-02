import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(workbookPath);
const wb = await SpreadsheetFile.importXlsx(blob);
const arm = wb.worksheets.getItem("ARM Output");

// Clear upper narrative area and rebuild with margin summary + story
arm.getRange("A1:F30").clear({ applyTo: "all" });

arm.getRange("A1:F1").merge();
arm.getRange("A1").values = [["Adrabetadex Provider Economics Summary"]];
arm.getRange("A1").format = { fill: "#0F2E4E", font: { bold: true, color: "#FFFFFF", size: 13 } };

arm.getRange("A2:B9").values = [
  ["Scenario", "='Scenario Selector'!$B$2"],
  ["Date", "=TODAY()"],
  ["Site of care", "='Scenario Selector'!$D$5"],
  ["Payer/channel", "='Scenario Selector'!$D$6"],
  ["Coding status", "='Scenario Selector'!$D$9"],
  ["Sourcing model", "='Scenario Selector'!$D$11"],
  ["340B status", "='Scenario Selector'!$D$7"],
  ["Active numeric preset", "='Scenario Selector'!$B$48"],
];
arm.getRange("A2:B2").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
arm.getRange("B3").format.numberFormat = "m/d/yyyy";

// Margin summary box
arm.getRange("D2:F2").merge();
arm.getRange("D2").values = [["Margin Summary"]];
arm.getRange("D2").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };

arm.getRange("D3:E7").values = [
  ["Provider net-cost recovery per administration", "='Calculation Engine'!$B$48"],
  ["Annualized recovery or exposure", "='Calculation Engine'!$B$49"],
  ["Break-even support per administration", "='Calculation Engine'!$B$52"],
  ["Annual break-even support", "='Calculation Engine'!$B$53"],
  ["Margin risk", "='Calculation Engine'!$B$63"],
];
arm.getRange("E3:E6").format.numberFormat = "$#,##0.00";
arm.getRange("D3:E7").format = { fill: "#F7FAFF" };

arm.getRange("F3:F7").values = [
  ["=IF(E3<0,\"Negative per administration margin under current assumptions\",IF(E3<1000,\"Positive but thin per administration margin\",\"Positive per administration margin with visible buffer\"))"],
  ["=IF(E4<0,\"Annual exposure under current assumptions\",\"Annual contribution remains positive under current assumptions\")"],
  ["=IF(E5>0,\"Additional support needed to reach break-even per administration\",\"No incremental support needed for break-even under current assumptions\")"],
  ["=IF(E6>0,\"Total annual support required to neutralize margin shortfall\",\"No annual support required for break-even under current assumptions\")"],
  ["=IF(E7=\"High margin risk\",\"Discuss support, coding, and payment controls before broad site adoption\",IF(E7=\"Moderate margin risk\",\"Proceed with tighter denial and payment-cycle management\",\"Economics support launch discussion with routine monitoring\"))"],
];
arm.getRange("F3:F7").format.wrapText = true;
arm.getRange("F3:F7").format = { fill: "#F7FAFF" };

// Story section
arm.getRange("A11:F11").merge();
arm.getRange("A11").values = [["What This Scenario Says"]];
arm.getRange("A11").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };

arm.getRange("A12:F12").merge();
arm.getRange("A12").formulas = [["=IF('Scenario Selector'!$D$11=\"White-bagging\",\"White-bagging removes provider drug inventory exposure and drug spread, so economics depend on administration revenue and operating efficiency.\",IF('Scenario Selector'!$D$7=\"No\",\"Non-340B economics are more exposed to acquisition cost and payment lag, making denial control and payment timing central to margin protection.\",\"340B acquisition assumptions create visible margin support, but realized recovery still depends on coding quality, clean claims, and payment timing.\"))"]];

arm.getRange("A13:F13").merge();
arm.getRange("A13").formulas = [["=IF('Scenario Selector'!$D$9=\"Pre-code / NOC\",\"Interim coding status increases execution risk, and the site must align NDC, invoice support, and PA documentation to avoid avoidable denials.\",\"Coding pathway appears more stable, but denial and appeal assumptions should still be validated against local payer behavior.\")"]];

arm.getRange("A14:F14").merge();
arm.getRange("A14").formulas = [["=IF('Calculation Engine'!$B$49<0,\"Current assumptions indicate annual exposure, so discuss targeted support strategy, narrower pull-through, and stricter revenue-cycle controls before expansion.\",\"Current assumptions indicate positive annual contribution, with ongoing need to monitor days-to-payment, denials, and appeals through launch.\")"]];

arm.getRange("A12:F14").format.wrapText = true;
arm.getRange("A12:F14").format = { fill: "#F7F7F7" };

// Economics snapshot retained below story
arm.getRange("A16:B16").values = [["Provider Economics Snapshot", "Value"]];
arm.getRange("A16:B16").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
arm.getRange("A17:B23").values = [
  ["Acquisition cost per administration", "='Calculation Engine'!$B$41"],
  ["Allowed amount per administration", "='Calculation Engine'!$B$42"],
  ["Expected reimbursement after denial adjustment", "='Calculation Engine'!$B$43"],
  ["Non-drug operating cost per administration", "='Calculation Engine'!$B$45"],
  ["Financing cost per administration", "='Calculation Engine'!$B$47"],
  ["Provider net-cost recovery per administration", "='Calculation Engine'!$B$48"],
  ["Annualized recovery or exposure", "='Calculation Engine'!$B$49"],
];
arm.getRange("B17:B23").format.numberFormat = "$#,##0.00";

arm.getRange("D16:E16").values = [["Cash-Flow and Risk", "Value"]];
arm.getRange("D16:E16").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
arm.getRange("D17:E23").values = [
  ["Days to payment", "='Core Assumptions'!$B$42"],
  ["Denial rate", "='Core Assumptions'!$B$40"],
  ["Appeal recovery rate", "='Core Assumptions'!$B$41"],
  ["Pre-ASP WAC exposure", "='Calculation Engine'!$B$54"],
  ["Cash at risk", "='Calculation Engine'!$B$51"],
  ["Cash exposure risk", "='Calculation Engine'!$B$64"],
  ["Operational risk", "='Calculation Engine'!$B$65"],
];
arm.getRange("E17").format.numberFormat = "0";
arm.getRange("E18:E19").format.numberFormat = "0.0%";
arm.getRange("E20:E21").format.numberFormat = "$#,##0.00";

arm.getRange("A25:F27").merge();
arm.getRange("A25").values = [["Planning and educational use only. This model does not guarantee coverage, coding, payment, or reimbursement. Actual reimbursement depends on payer policy, coding pathway, site of care, provider contract terms, benefit design, and claim adjudication. 340B assumptions are scenario assumptions, not universal acquisition-cost rules."]];
arm.getRange("A25:F27").format = { fill: "#EFEFEF", font: { size: 9, color: "#333333" }, wrapText: true };

arm.getRange("A1:F27").format.borders = {
  top: { style: "continuous", color: "#D0D7DE" },
  bottom: { style: "continuous", color: "#D0D7DE" },
  left: { style: "continuous", color: "#D0D7DE" },
  right: { style: "continuous", color: "#D0D7DE" },
  insideHorizontal: { style: "continuous", color: "#D0D7DE" },
  insideVertical: { style: "continuous", color: "#D0D7DE" },
};

arm.getRange("A:A").format.columnWidth = 44;
arm.getRange("B:B").format.columnWidth = 24;
arm.getRange("D:D").format.columnWidth = 42;
arm.getRange("E:E").format.columnWidth = 24;
arm.getRange("F:F").format.columnWidth = 54;
arm.freezePanes.freezeRows(2);

const err = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  maxChars: 6000,
});

const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(workbookPath);

console.log(JSON.stringify({
  workbookPath,
  marginCell: arm.getRange("E3").values[0][0],
  annualMarginCell: arm.getRange("E4").values[0][0],
  storyLine1: arm.getRange("A12").values[0][0],
  errorScan: err.ndjson,
}, null, 2));
