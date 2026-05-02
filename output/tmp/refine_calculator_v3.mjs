import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(workbookPath);
const wb = await SpreadsheetFile.importXlsx(blob);

const instructions = wb.worksheets.getItem("Instructions");
const core = wb.worksheets.getItem("Core Assumptions");
const selector = wb.worksheets.getItem("Scenario Selector");
const engine = wb.worksheets.getItem("Calculation Engine");
const arm = wb.worksheets.getItem("ARM Output");
const appendix = wb.worksheets.getItem("Appendix Assumptions");

// --- Instructions tab refresh ---
instructions.getRange("A1:H45").clear({ applyTo: "all" });
instructions.getRange("A1:H1").merge();
instructions.getRange("A1").values = [["Adrabetadex Provider Net-Cost Recovery Calculator - Instructions"]];
instructions.getRange("A1").format = { fill: "#0F2E4E", font: { bold: true, color: "#FFFFFF", size: 13 } };

instructions.getRange("A3:H3").merge();
instructions.getRange("A3").values = [["1) What this model does"]];
instructions.getRange("A4:H6").merge();
instructions.getRange("A4").values = [["This workbook estimates provider net-cost recovery for Adrabetadex under selected reimbursement, site-of-care, payer, coding, sourcing, denial, appeal, and payment-timing assumptions."]];

instructions.getRange("A8:H8").merge();
instructions.getRange("A8").values = [["2) What you can edit"]];
instructions.getRange("A9:A14").values = [
  ["Scenario preset selections on Scenario Selector"],
  ["Manual overrides in Scenario Selector (only when needed)"],
  ["Numeric preset selector for Base, Conservative, White-Bagging"],
  ["Core assumptions fields that are highlighted as editable"],
  ["Do not overwrite formula cells in Calculation Engine"],
  ["Do not edit provider-facing output formulas on ARM Output"],
];

instructions.getRange("A16:H16").merge();
instructions.getRange("A16").values = [["3) How scenario logic works"]];
instructions.getRange("A17:A21").values = [
  ["Preset Value: value from selected scenario preset"],
  ["Manual Override: optional field entry by user"],
  ["Active Value: manual override when populated, otherwise preset value"],
  ["Active Source: Preset, Manual Override, or Blank / Review Required"],
  ["ARM Output always reads active values and active numeric preset defaults"],
];

instructions.getRange("A23:H23").merge();
instructions.getRange("A23").values = [["4) How to export the one-page PDF"]];
instructions.getRange("A24:A28").values = [
  ["Confirm selected scenario on Scenario Selector."],
  ["Review ARM Output values and talking points."],
  ["Run export script: ./output/exports/adrabetadex_provider_net_cost_recovery_calculator/export_arm_summary_pdf.sh"],
  ["The script exports ARM Output only, one page, with scenario name and date in filename."],
  ["If export fails, resolve script/environment issue before sharing output."],
];

instructions.getRange("A30:H30").merge();
instructions.getRange("A30").values = [["5) Intended users"]];
instructions.getRange("A31:A35").values = [
  ["Area Reimbursement Managers"],
  ["Provider reimbursement directors"],
  ["Revenue cycle teams"],
  ["Pharmacy leadership"],
  ["Patient access teams"],
];

instructions.getRange("A37:H37").merge();
instructions.getRange("A37").values = [["6) Model caveat"]];
instructions.getRange("A38:H42").merge();
instructions.getRange("A38").values = [["This workbook is for planning and educational purposes only. It does not guarantee coverage, coding, payment, or reimbursement. Providers are responsible for selecting appropriate codes, documenting services, and confirming payer-specific billing and reimbursement rules. Results are estimates based on entered assumptions and may vary by payer, contract, state Medicaid program, site of care, coding status, 340B treatment, and claim outcome."]];

instructions.getRange("A3:A37").format = { fill: "#DCE6F1", font: { bold: true } };
instructions.getRange("A1:H42").format.wrapText = true;
instructions.getRange("A:A").format.columnWidth = 95;
instructions.getRange("B:H").format.columnWidth = 12;
instructions.freezePanes.freezeRows(2);

// --- Scenario Selector: Active Source guardrails ---
selector.getRange("A4:E4").values = [["Scenario Field", "Manual Override", "Preset Value", "Active Value", "Active Source"]];
selector.getRange("A4:E4").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
for (let r = 5; r <= 15; r++) {
  const idx = r - 4;
  selector.getRange(`C${r}`).formulas = [[`=INDEX($B$32:$L$40,MATCH($B$2,$A$32:$A$40,0),${idx})`]];
  selector.getRange(`D${r}`).formulas = [[`=IF(B${r}<>"",B${r},C${r})`]];
  selector.getRange(`E${r}`).formulas = [[`=IF(B${r}<>"","Manual Override",IF(C${r}<>"","Preset","Blank / Review Required"))`]];
}
selector.getRange("B5:B15").format = { fill: "#FFF2CC" };
selector.getRange("C5:E15").format = { fill: "#EDEDED" };

// Numeric preset section with manual override and source
selector.getRange("A50:E50").values = [["Numeric Input", "Preset Value", "Manual Override", "Active Value", "Active Source"]];
selector.getRange("A50:E50").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
for (let r = 51; r <= 69; r++) {
  const idx = r - 50;
  selector.getRange(`B${r}`).formulas = [[`=INDEX($B$43:$T$45,MATCH($B$48,$A$43:$A$45,0),${idx})`]];
  selector.getRange(`D${r}`).formulas = [[`=IF(C${r}<>"",C${r},B${r})`]];
  selector.getRange(`E${r}`).formulas = [[`=IF(C${r}<>"","Manual Override",IF(B${r}<>"","Preset","Blank / Review Required"))`]];
}
selector.getRange("C51:C69").format = { fill: "#FFF2CC" };
selector.getRange("B51:B69").format = { fill: "#EDEDED" };
selector.getRange("D51:E69").format = { fill: "#EDEDED" };
selector.getRange("B51:B53").format.numberFormat = "0.0%";
selector.getRange("C51:C53").format.numberFormat = "0.0%";
selector.getRange("D51:D53").format.numberFormat = "0.0%";
selector.getRange("B54:B54").format.numberFormat = "0";
selector.getRange("C54:C54").format.numberFormat = "0";
selector.getRange("D54:D54").format.numberFormat = "0";
selector.getRange("B55:B60").format.numberFormat = "$#,##0";
selector.getRange("C55:C60").format.numberFormat = "$#,##0";
selector.getRange("D55:D60").format.numberFormat = "$#,##0";
selector.getRange("B61:B61").format.numberFormat = "0.0%";
selector.getRange("C61:C61").format.numberFormat = "0.0%";
selector.getRange("D61:D61").format.numberFormat = "0.0%";
selector.getRange("B62:B67").format.numberFormat = "$#,##0";
selector.getRange("C62:C67").format.numberFormat = "$#,##0";
selector.getRange("D62:D67").format.numberFormat = "$#,##0";
selector.getRange("B68:B68").format.numberFormat = "0.0%";
selector.getRange("C68:C68").format.numberFormat = "0.0%";
selector.getRange("D68:D68").format.numberFormat = "0.0%";
selector.getRange("B69").format.numberFormat = "@";
selector.getRange("C69").format.numberFormat = "@";
selector.getRange("D69").format.numberFormat = "@";
selector.getRange("C69").dataValidation = { rule: { type: "list", values: ["Primary 23.1%", "Pediatric 17.1%", "Manual entry"] } };

// Core assumptions now read numeric Active Value column D
core.getRange("B38").formulas = [["='Scenario Selector'!$D$69"]];
core.getRange("B39").formulas = [["='Scenario Selector'!$D$51"]];
core.getRange("B40").formulas = [["='Scenario Selector'!$D$52"]];
core.getRange("B41").formulas = [["='Scenario Selector'!$D$53"]];
core.getRange("B42").formulas = [["='Scenario Selector'!$D$54"]];
core.getRange("B43").formulas = [["='Scenario Selector'!$D$55"]];
core.getRange("B44").formulas = [["='Scenario Selector'!$D$56"]];
core.getRange("B45").formulas = [["='Scenario Selector'!$D$57"]];
core.getRange("B46").formulas = [["='Scenario Selector'!$D$58"]];
core.getRange("B47").formulas = [["='Scenario Selector'!$D$59"]];
core.getRange("B48").formulas = [["='Scenario Selector'!$D$60"]];
core.getRange("B49").formulas = [["='Scenario Selector'!$D$61"]];
core.getRange("B50").formulas = [["='Scenario Selector'!$D$62"]];
core.getRange("B51").formulas = [["='Scenario Selector'!$D$63"]];
core.getRange("B52").formulas = [["='Scenario Selector'!$D$64"]];
core.getRange("B53").formulas = [["='Scenario Selector'!$D$65"]];
core.getRange("B54").formulas = [["='Scenario Selector'!$D$66"]];
core.getRange("B55").formulas = [["='Scenario Selector'!$D$67"]];
core.getRange("B56").formulas = [["='Scenario Selector'!$D$68"]];

// --- Calculation Engine expanded/relabeled outputs ---
engine.getRange("A35:B70").clear({ applyTo: "all" });
engine.getRange("A35:B35").values = [["Model Outputs", "Value"]];
engine.getRange("A35:B35").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };

const names = [
  "Annual_Doses",
  "Calculated_Annual_Doses",
  "Pre_ASP_Doses",
  "Selected_340B_Acquisition",
  "Selected_Allowed_Drug_Reimbursement",
  "Drug_Acquisition_Per_Dose",
  "Allowed_Drug_Reimbursement_Per_Dose",
  "Expected_Reimbursement_After_Denial_Adjustment",
  "Drug_Spread",
  "Non_Drug_Operating_Cost",
  "Denial_Drag_Per_Dose",
  "Financing_Drag_Per_Dose",
  "Provider_Net_Cost_Recovery_Per_Admin",
  "Annual_Contribution",
  "Administrations_Outstanding",
  "Cash_At_Risk",
  "Break_Even_Support_Per_Dose",
  "Annual_Break_Even_Support",
  "Pre_ASP_WAC_Exposure",
  "Pre_ASP_Reimbursement",
  "Pre_ASP_Gross_Spread",
  "340B_Acquisition_Advantage_Per_Dose",
  "Annual_340B_Acquisition_Advantage",
  "Pre_ASP_340B_Acquisition_Advantage",
  "Annual_Drug_Acquisition",
  "Annual_Allowed_Drug_Reimbursement",
  "Annual_Non_Drug_Operating_Cost",
  "Margin_Risk",
  "Cash_Exposure_Risk",
  "Operational_Risk",
];
engine.getRange("A36:A65").values = names.map((x) => [x]);
engine.getRange("B36:B65").formulas = [
  ["=26"],
  ["=52/'Core Assumptions'!$B$7"],
  ["=13"],
  ["=IF(B13=\"Primary 23.1%\",'Core Assumptions'!$B$23,IF(B13=\"Pediatric 17.1%\",'Core Assumptions'!$B$25,B33))"],
  ["=IF(B12=\"WAC %\",B20*B19,IF(B12=\"AWP %\",B21*B19,IF(B12=\"ASP %\",B22*B19,IF(B12=\"Contracted rate\",B23,IF(B12=\"Manual entry\",B24,0)))))"],
  ["=IF(B10=\"White-bagging\",0,IF(B10=\"Mixed\",(1-B15)*IF(B6=\"Yes\",B39,B20),IF(B6=\"Yes\",B39,B20)))"],
  ["=IF(B10=\"White-bagging\",0,IF(B10=\"Mixed\",(1-B15)*B40,B40))"],
  ["=B42*(1-(B16*(1-B17)))"],
  ["=B42-B41"],
  ["=B25+B26+B27+B28+B29"],
  ["=B16*(1-B17)*(B41+B45)"],
  ["=B41*B30*B18/365"],
  ["=B42+B31+B32-B41-B45-B46-B47"],
  ["=B48*B36"],
  ["=ROUNDUP(B18/14,0)"],
  ["=B41*B50"],
  ["=MAX(0,-B48)"],
  ["=B52*B36"],
  ["=B20*B38"],
  ["=B42*B38"],
  ["=B55-B54"],
  ["=IF(B6=\"Yes\",B20-B39,0)"],
  ["=B57*B36"],
  ["=B57*B38"],
  ["=B41*B36"],
  ["=B42*B36"],
  ["=B45*B36"],
  ["=IF(B48<0,\"High margin risk\",IF(B48<1000,\"Moderate margin risk\",\"Low margin risk\"))"],
  ["=IF(B51>250000,\"High cash exposure\",IF(B51>100000,\"Moderate cash exposure\",\"Manageable cash exposure\"))"],
  ["=IF(OR(B14=\"Not confirmed\",B8=\"Pre-code / NOC\",B10=\"Mixed\"),\"High operational risk\",IF(OR(B16>10%,B18>90),\"Moderate operational risk\",\"Lower operational risk\"))"],
];
engine.getRange("B36:B65").format = { fill: "#EDEDED" };
engine.getRange("B36:B37").format.numberFormat = "0.00";
engine.getRange("B38:B62").format.numberFormat = "$#,##0.00";
engine.getRange("B50:B50").format.numberFormat = "0";
engine.getRange("B63:B65").format.numberFormat = "@";

// --- ARM Output refresh to requested hierarchy ---
arm.getRange("A1:G60").clear({ applyTo: "all" });
arm.getRange("A1:G1").merge();
arm.getRange("A1").values = [["Adrabetadex Provider Net-Cost Recovery Summary"]];
arm.getRange("A1").format = { fill: "#0F2E4E", font: { bold: true, color: "#FFFFFF", size: 13 } };

arm.getRange("A3:B10").values = [
  ["Scenario name", "='Scenario Selector'!$B$2"],
  ["Date generated", "=TODAY()"],
  ["Site of care", "='Scenario Selector'!$D$5"],
  ["Payer/channel", "='Scenario Selector'!$D$6"],
  ["Coding status", "='Scenario Selector'!$D$9"],
  ["Sourcing model", "='Scenario Selector'!$D$11"],
  ["Active numeric preset", "='Scenario Selector'!$B$48"],
  ["340B status", "='Scenario Selector'!$D$7"],
];
arm.getRange("A2:B2").values = [["Scenario Summary", "Value"]];
arm.getRange("A2:B2").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
arm.getRange("B4").format.numberFormat = "m/d/yyyy";

arm.getRange("D2:E2").values = [["Provider Economics Snapshot", "Value"]];
arm.getRange("D2:E2").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
arm.getRange("D3:E9").values = [
  ["Acquisition cost per administration", "='Calculation Engine'!$B$41"],
  ["Allowed amount per administration", "='Calculation Engine'!$B$42"],
  ["Expected reimbursement after denial adjustment", "='Calculation Engine'!$B$43"],
  ["Non-drug operating cost per administration", "='Calculation Engine'!$B$45"],
  ["Provider net-cost recovery per administration", "='Calculation Engine'!$B$48"],
  ["Annualized recovery or exposure", "='Calculation Engine'!$B$49"],
  ["Annual break-even support", "='Calculation Engine'!$B$53"],
];
arm.getRange("E3:E9").format.numberFormat = "$#,##0.00";

arm.getRange("A12:B12").values = [["Cash-Flow and Risk View", "Value"]];
arm.getRange("A12:B12").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
arm.getRange("A13:B18").values = [
  ["Days to payment", "='Core Assumptions'!$B$42"],
  ["Denial rate", "='Core Assumptions'!$B$40"],
  ["Appeal recovery rate", "='Core Assumptions'!$B$41"],
  ["Financing cost per administration", "='Calculation Engine'!$B$47"],
  ["Pre-ASP WAC exposure", "='Calculation Engine'!$B$54"],
  ["Cash at risk", "='Calculation Engine'!$B$51"],
];
arm.getRange("B13").format.numberFormat = "0";
arm.getRange("B14:B15").format.numberFormat = "0.0%";
arm.getRange("B16:B18").format.numberFormat = "$#,##0.00";

arm.getRange("D12:F12").values = [["Risk Flags", "Result", "Interpretation"]];
arm.getRange("D12:F12").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
arm.getRange("D13:F15").values = [
  ["Margin risk", "='Calculation Engine'!$B$63", "=IF(E13=\"High margin risk\",\"Recovery is negative under current assumptions.\",IF(E13=\"Moderate margin risk\",\"Recovery is positive but narrow and sensitive.\",\"Recovery appears resilient under current assumptions.\"))"],
  ["Cash exposure risk", "='Calculation Engine'!$B$64", "=IF(E14=\"High cash exposure\",\"Float burden is high relative to payment timing.\",IF(E14=\"Moderate cash exposure\",\"Monitor receivables and claim-cycle execution.\",\"Cash exposure appears manageable.\"))"],
  ["Operational risk", "='Calculation Engine'!$B$65", "=IF(E15=\"High operational risk\",\"Coding/PA/workflow assumptions require reinforcement.\",IF(E15=\"Moderate operational risk\",\"Strengthen denial prevention and documentation controls.\",\"Operational assumptions are comparatively stable.\"))"],
];
arm.getRange("F13:F15").format.wrapText = true;

arm.getRange("A21:F21").merge();
arm.getRange("A21").values = [["ARM Talking Points"]];
arm.getRange("A21").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
arm.getRange("A22:F22").merge();
arm.getRange("A22").formulas = [["=IF('Scenario Selector'!$D$11=\"White-bagging\",\"1. White-bagging removes provider inventory exposure, and also removes provider drug reimbursement and spread.\",IF('Scenario Selector'!$D$7=\"No\",\"1. Non-340B economics are more sensitive to allowed amount, denial, and timing assumptions.\",\"1. 340B acquisition assumptions improve provider recovery relative to WAC acquisition.\"))"]];
arm.getRange("A23:F23").merge();
arm.getRange("A23").formulas = [["=IF('Scenario Selector'!$D$9=\"Pre-code / NOC\",\"2. Interim coding requires stronger claim documentation, NDC/invoice support, and PA coordination.\",\"2. Payment timing, denial rate, and appeal recovery drive cash-flow and realized recovery.\")"]];
arm.getRange("A24:F24").merge();
arm.getRange("A24").values = [["3. Validate payer policy, contract terms, site-of-care rules, and coding pathway locally before implementation."]];
arm.getRange("A22:F24").format.wrapText = true;

arm.getRange("A27:F30").merge();
arm.getRange("A27").values = [["Planning and educational use only. This model does not guarantee coverage, coding, payment, or reimbursement. Actual reimbursement depends on payer policy, coding pathway, site of care, provider contract terms, benefit design, and claim adjudication. 340B assumptions are scenario assumptions, not universal acquisition-cost rules."]];
arm.getRange("A27:F30").format = { fill: "#F7F7F7", font: { size: 9, color: "#333333" }, wrapText: true, verticalAlignment: "top" };

arm.getRange("A1:F30").format.borders = {
  top: { style: "continuous", color: "#D0D7DE" },
  bottom: { style: "continuous", color: "#D0D7DE" },
  left: { style: "continuous", color: "#D0D7DE" },
  right: { style: "continuous", color: "#D0D7DE" },
  insideHorizontal: { style: "continuous", color: "#D0D7DE" },
  insideVertical: { style: "continuous", color: "#D0D7DE" },
};
arm.getRange("A:A").format.columnWidth = 42;
arm.getRange("B:B").format.columnWidth = 24;
arm.getRange("D:D").format.columnWidth = 44;
arm.getRange("E:E").format.columnWidth = 22;
arm.getRange("F:F").format.columnWidth = 50;
arm.freezePanes.freezeRows(2);

// Appendix clarifier for 340B assumptions
appendix.getRange("D19:D19").values = [["340B values in this model are scenario assumptions for planning and are not universal provider acquisition-cost rules."]];
appendix.getRange("D19").format = { fill: "#F7F7F7", font: { italic: true } };

const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  maxChars: 6000,
});

const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(workbookPath);

console.log("ERROR_SCAN");
console.log(errors.ndjson);
console.log(JSON.stringify({
  workbookPath,
  sampleActiveSource: selector.getRange("E5").values[0][0],
  numericActiveSource: selector.getRange("E51").values[0][0],
  expectedReimbFormula: engine.getRange("B43").formulas[0][0],
  armScenario: arm.getRange("B3").values[0][0],
}, null, 2));
