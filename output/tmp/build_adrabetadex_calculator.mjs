import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = path.resolve("output/exports/adrabetadex_provider_net_cost_recovery_calculator");
const workbookPath = path.join(outDir, "Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx");
const armPngPath = path.join(outDir, "ARM_Output_preview.png");

await fs.mkdir(outDir, { recursive: true });

const wb = Workbook.create();
const instructions = wb.worksheets.add("Instructions");
const core = wb.worksheets.add("Core Assumptions");
const selector = wb.worksheets.add("Scenario Selector");
const engine = wb.worksheets.add("Calculation Engine");
const arm = wb.worksheets.add("ARM Output");
const appendix = wb.worksheets.add("Appendix Assumptions");

const colors = {
  title: "#0F2E4E",
  header: "#1F4E78",
  headerText: "#FFFFFF",
  section: "#DCE6F1",
  input: "#FFF2CC",
  formula: "#EDEDED",
  note: "#F7F7F7",
  border: "#D0D7DE",
  accent: "#2C6E49",
};

function styleTitle(sheet, range) {
  const r = sheet.getRange(range);
  r.format = {
    fill: colors.title,
    font: { bold: true, color: colors.headerText, size: 13 },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
}

function styleHeader(sheet, range) {
  const r = sheet.getRange(range);
  r.format = {
    fill: colors.header,
    font: { bold: true, color: colors.headerText },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
}

function styleSection(sheet, range) {
  sheet.getRange(range).format = {
    fill: colors.section,
    font: { bold: true, color: "#1B1B1B" },
  };
}

function styleInput(sheet, range) {
  sheet.getRange(range).format = {
    fill: colors.input,
    font: { color: "#111111" },
  };
}

function styleFormula(sheet, range) {
  sheet.getRange(range).format = {
    fill: colors.formula,
    font: { color: "#111111" },
  };
}

function applyBasicBorders(sheet, range) {
  sheet.getRange(range).format.borders = {
    top: { style: "continuous", color: colors.border },
    bottom: { style: "continuous", color: colors.border },
    left: { style: "continuous", color: colors.border },
    right: { style: "continuous", color: colors.border },
    insideHorizontal: { style: "continuous", color: colors.border },
    insideVertical: { style: "continuous", color: colors.border },
  };
}

instructions.getRange("A1:H1").merge();
instructions.getRange("A1").values = [["Adrabetadex Provider Net-Cost Recovery Calculator - Instructions"]];
styleTitle(instructions, "A1:H1");
instructions.getRange("A3").values = [["Purpose"]];
styleSection(instructions, "A3:H3");
instructions.getRange("A4:H4").merge();
instructions.getRange("A4").values = [["This workbook estimates provider net-cost recovery for Adrabetadex under selected reimbursement, site-of-care, payer, sourcing, and timing scenarios."]];
instructions.getRange("A6").values = [["Intended Users"]];
styleSection(instructions, "A6:H6");
instructions.getRange("A7:A11").values = [
  ["Area Reimbursement Managers"],
  ["Provider reimbursement directors"],
  ["Revenue cycle teams"],
  ["Pharmacy leadership"],
  ["Patient access teams"],
];
instructions.getRange("A13").values = [["What the Model Calculates"]];
styleSection(instructions, "A13:H13");
instructions.getRange("A14:A23").values = [
  ["drug acquisition cost per administration"],
  ["allowed drug reimbursement per administration"],
  ["drug spread"],
  ["non-drug operating costs"],
  ["denial-related drag"],
  ["financing drag from payment delay"],
  ["net operating margin per administration"],
  ["annualized contribution"],
  ["cash exposure"],
  ["break-even manufacturer support"],
];
instructions.getRange("A25").values = [["Fixed vs Editable Fields"]];
styleSection(instructions, "A25:H25");
instructions.getRange("A26:A28").values = [
  ["Fixed assumptions are core launch assumptions."],
  ["Editable fields are site-, payer-, and scenario-specific."],
  ["Formula cells are not for field-user editing."],
];
instructions.getRange("A30").values = [["Disclaimer"]];
styleSection(instructions, "A30:H30");
instructions.getRange("A31:H34").merge();
instructions.getRange("A31").values = [["This workbook is for planning and educational purposes only. It does not guarantee coverage, coding, payment, or reimbursement. Providers are responsible for selecting appropriate codes, documenting services, and confirming payer-specific billing and reimbursement rules. Results are estimates based on entered assumptions and may vary by payer, contract, state Medicaid program, site of care, coding status, 340B treatment, and claim outcome."]];
instructions.getRange("A4:A34").format.wrapText = true;
instructions.getRange("A1:H34").format.verticalAlignment = "top";
instructions.getRange("A1:H34").format.columnWidth = 24;
instructions.getRange("A1:A34").format.columnWidth = 90;
instructions.freezePanes.freezeRows(2);

core.getRange("A1:H1").merge();
core.getRange("A1").values = [["Core Assumptions"]];
styleTitle(core, "A1:H1");
core.getRange("A3:B3").values = [["Fixed Assumptions", "Value"]];
styleHeader(core, "A3:B3");
const fixedRows = [
  ["Vial size", "900 mg"],
  ["Launch WAC per vial", 39000],
  ["Dosing cadence", "Every 2 weeks"],
  ["Dosing interval weeks", 2],
  ["Administrations per year", 26],
  ["Pre-ASP period administrations", 13],
  ["Annual gross WAC exposure", null],
  ["Pre-ASP WAC exposure", null],
  ["Medicare pre-ASP benchmark percentage", 1.03],
  ["Medicare pre-ASP payment per administration", null],
  ["OPPS pass-through effective date", new Date("2027-01-01T00:00:00")],
  ["Permanent HCPCS effective date", new Date("2027-04-01T00:00:00")],
  ["Default customer type", "340B center of excellence"],
  ["Default site of care", "HOPD"],
  ["Default 340B status", "Yes"],
];
core.getRange("A4:B18").values = fixedRows;
core.getRange("B10").formulas = [["=B5*B9"]];
core.getRange("B11").formulas = [["=B5*B8"]];
core.getRange("B13").formulas = [["=B5*B12"]];

core.getRange("A20:B20").values = [["340B Assumptions", "Value"]];
styleHeader(core, "A20:B20");
core.getRange("A21:B25").values = [
  ["WAC", null],
  ["340B discount assumption, primary", 0.231],
  ["340B acquisition, primary", null],
  ["340B discount assumption, sensitivity", 0.171],
  ["340B acquisition, sensitivity", null],
];
core.getRange("B21").formulas = [["=B5"]];
core.getRange("B23").formulas = [["=B21*(1-B22)"]];
core.getRange("B25").formulas = [["=B21*(1-B24)"]];

core.getRange("A27:B27").values = [["Editable Assumptions", "Default / Input"]];
styleHeader(core, "A27:B27");
const editableRows = [
  ["Commercial payer mix", 0.5],
  ["Medicaid payer mix", 0.5],
  ["Dual / other payer mix", 0],
  ["Site of care", "HOPD"],
  ["340B status", "Yes"],
  ["340B carve-in / carve-out", "Carve-out"],
  ["Payer type", "Mixed"],
  ["Coding status", "Pass-through active"],
  ["Sourcing model", "Buy-and-bill"],
  ["Reimbursement basis", "WAC %"],
  ["340B acquisition assumption", "Primary 23.1%"],
  ["White-bagging percentage", 0],
  ["Denial rate", 0.05],
  ["Appeal recovery rate", 0],
  ["Days to payment", 60],
  ["Labor cost per administration", 500],
  ["Pharmacy handling cost per administration", 250],
  ["Billing/admin cost per administration", 150],
  ["Other non-drug operating cost", 0],
  ["Procedure revenue per administration", 300],
  ["Wastage cost per administration", 0],
  ["Financing rate", 0.08],
  ["Manufacturer support per administration", 0],
  ["Manual allowed amount", 0],
  ["Contracted rate", 0],
  ["AWP", 0],
  ["ASP", 0],
  ["Manual 340B acquisition", 0],
  ["Reimbursement percentage", 1.03],
];
core.getRange("A28:B56").values = editableRows;
styleInput(core, "B28:B56");

core.getRange("D3:E3").values = [["Dropdown Lists", "Values"]];
styleHeader(core, "D3:E3");
core.getRange("D4:E40").clear({ applyTo: "all" });
const lists = {
  siteOfCare: ["HOPD", "Physician Office", "Other"],
  yesNo: ["Yes", "No"],
  carve: ["Carve-in", "Carve-out", "Not applicable"],
  payer: ["Commercial", "Medicaid FFS", "Medicaid Managed Care", "Dual", "Medicare", "Mixed"],
  coding: ["Pre-code / NOC", "Pass-through active", "Product-specific HCPCS active"],
  sourcing: ["Buy-and-bill", "White-bagging", "Mixed"],
  reimb: ["WAC %", "AWP %", "ASP %", "Contracted rate", "Manual entry"],
  acq: ["Primary 23.1%", "Sensitivity 17.1%", "Manual entry"],
  pass: ["Active", "Not active", "Not applicable"],
  aspStatus: ["Pre-ASP", "ASP available"],
  pa: ["Confirmed", "Not confirmed"],
};
let listRow = 4;
for (const [key, values] of Object.entries(lists)) {
  core.getCell(listRow - 1, 3).values = [[key]];
  values.forEach((v, i) => {
    core.getCell(listRow + i - 1, 4).values = [[v]];
  });
  listRow += values.length + 1;
}

core.getRange("B5:B56").format.numberFormat = "#,##0.00";
core.getRange("B5:B5").format.numberFormat = "$#,##0";
core.getRange("B10:B11").format.numberFormat = "$#,##0";
core.getRange("B13:B13").format.numberFormat = "$#,##0";
core.getRange("B21:B25").format.numberFormat = "$#,##0";
core.getRange("B22:B24").format.numberFormat = "0.0%";
core.getRange("B12:B12").format.numberFormat = "0.0%";
core.getRange("B14:B15").format.numberFormat = "m/d/yyyy";
core.getRange("B28:B30").format.numberFormat = "0.0%";
core.getRange("B39:B41").format.numberFormat = "0.0%";
core.getRange("B49:B49").format.numberFormat = "0.0%";
core.getRange("B56:B56").format.numberFormat = "0.0%";
core.getRange("B43:B48").format.numberFormat = "$#,##0";
core.getRange("B50:B55").format.numberFormat = "$#,##0";

const coreValidation = [
  [31, lists.siteOfCare],
  [32, lists.yesNo],
  [33, ["Carve-in", "Carve-out"]],
  [34, lists.payer],
  [35, lists.coding],
  [36, lists.sourcing],
  [37, lists.reimb],
  [38, lists.acq],
];
for (const [row, values] of coreValidation) {
  core.getCell(row - 1, 1).dataValidation = { rule: { type: "list", values } };
}

styleFormula(core, "B10:B13");
styleFormula(core, "B21:B25");
applyBasicBorders(core, "A3:B56");
core.getRange("A1:B56").format.wrapText = true;
core.getRange("A:A").format.columnWidth = 42;
core.getRange("B:B").format.columnWidth = 24;
core.getRange("D:E").format.columnWidth = 24;
core.freezePanes.freezeRows(3);

selector.getRange("A1:H1").merge();
selector.getRange("A1").values = [["Scenario Selector"]];
styleTitle(selector, "A1:H1");
selector.getRange("A2").values = [["Select Scenario Preset"]];
selector.getRange("B2").values = [["Default 340B COE HOPD, Pass-Through Active"]];
styleInput(selector, "B2");

selector.getRange("A4:D4").values = [["Scenario Field", "Manual Override", "Preset Value", "Active Value"]];
styleHeader(selector, "A4:D4");
const scenarioFields = [
  "Site of care",
  "Payer type",
  "340B status",
  "340B treatment",
  "Coding status",
  "OPPS pass-through status",
  "Sourcing model",
  "ASP status",
  "Reimbursement basis",
  "340B acquisition assumption",
  "Prior authorization status",
];
selector.getRange("A5:A15").values = scenarioFields.map((f) => [f]);
styleInput(selector, "B5:B15");
styleFormula(selector, "C5:D15");

selector.getRange("A31:L31").values = [[
  "Scenario Name",
  "Site of care",
  "Payer type",
  "340B status",
  "340B treatment",
  "Coding status",
  "OPPS pass-through status",
  "Sourcing model",
  "ASP status",
  "Reimbursement basis",
  "340B acquisition assumption",
  "Prior authorization status",
]];
styleHeader(selector, "A31:L31");

const presets = [
  ["Default 340B COE HOPD, Pass-Through Active", "HOPD", "Medicare", "Yes", "Carve-out", "Pass-through active", "Active", "Buy-and-bill", "Pre-ASP", "WAC %", "Primary 23.1%", "Confirmed"],
  ["340B COE HOPD, Pre-Pass-Through", "HOPD", "Medicare", "Yes", "Carve-out", "Pre-code / NOC", "Not active", "Buy-and-bill", "Pre-ASP", "WAC %", "Primary 23.1%", "Not confirmed"],
  ["340B COE HOPD, Product-Specific HCPCS Active", "HOPD", "Medicare", "Yes", "Carve-out", "Product-specific HCPCS active", "Not applicable", "Buy-and-bill", "ASP available", "ASP %", "Primary 23.1%", "Confirmed"],
  ["Commercial Buy-and-Bill, 340B HOPD", "HOPD", "Commercial", "Yes", "Carve-out", "Pass-through active", "Not applicable", "Buy-and-bill", "Pre-ASP", "Contracted rate", "Primary 23.1%", "Confirmed"],
  ["Commercial White-Bagging", "HOPD", "Commercial", "No", "Not applicable", "Pass-through active", "Not applicable", "White-bagging", "Pre-ASP", "Manual entry", "Manual entry", "Confirmed"],
  ["Medicaid Managed Care, 340B COE", "HOPD", "Medicaid Managed Care", "Yes", "Carve-in", "Pass-through active", "Not applicable", "Buy-and-bill", "Pre-ASP", "WAC %", "Primary 23.1%", "Confirmed"],
  ["Medicaid FFS, 340B COE", "HOPD", "Medicaid FFS", "Yes", "Carve-in", "Pass-through active", "Not applicable", "Buy-and-bill", "Pre-ASP", "WAC %", "Primary 23.1%", "Confirmed"],
  ["Non-340B Sensitivity", "HOPD", "Medicare", "No", "Not applicable", "Pass-through active", "Active", "Buy-and-bill", "Pre-ASP", "WAC %", "Manual entry", "Confirmed"],
  ["Physician Office Sensitivity", "Physician Office", "Commercial", "No", "Not applicable", "Pre-code / NOC", "Not applicable", "Mixed", "Pre-ASP", "WAC %", "Manual entry", "Not confirmed"],
];
selector.getRange(`A32:L${31 + presets.length}`).values = presets;

selector.getRange("B2").dataValidation = { rule: { type: "list", values: presets.map((p) => p[0]) } };

const scenarioDropdowns = [
  lists.siteOfCare,
  lists.payer,
  lists.yesNo,
  lists.carve,
  lists.coding,
  lists.pass,
  lists.sourcing,
  lists.aspStatus,
  lists.reimb,
  lists.acq,
  lists.pa,
];
for (let i = 0; i < scenarioDropdowns.length; i++) {
  selector.getCell(4 + i, 1).dataValidation = { rule: { type: "list", values: scenarioDropdowns[i] } };
}

for (let i = 5; i <= 15; i++) {
  const colIndex = i - 3;
  selector.getCell(i - 1, 2).formulas = [[`=XLOOKUP($B$2,$A$32:$A$40,${String.fromCharCode(64 + colIndex)}$32:${String.fromCharCode(64 + colIndex)}$40)`]];
  selector.getCell(i - 1, 3).formulas = [[`=IF(B${i}<>"",B${i},C${i})`]];
}

selector.getRange("D5:D15").format.font = { bold: true };
selector.getRange("A18:D19").values = [["Scenario Logic", "Selected preset fills Preset Value. Active Value uses Manual Override when provided, otherwise Preset Value.", null, null], ["Default scenario", "340B COE HOPD, Pass-Through Active", null, null]];
selector.getRange("A18:D19").format.wrapText = true;
styleSection(selector, "A18:D18");
applyBasicBorders(selector, "A4:D15");
applyBasicBorders(selector, "A31:L40");
selector.getRange("A:A").format.columnWidth = 36;
selector.getRange("B:D").format.columnWidth = 28;
selector.getRange("A31:L40").format.wrapText = true;
selector.freezePanes.freezeRows(4);

engine.getRange("A1:H1").merge();
engine.getRange("A1").values = [["Calculation Engine (Formula Driven)"]];
styleTitle(engine, "A1:H1");
engine.getRange("A3:B3").values = [["Input References", "Value"]];
styleHeader(engine, "A3:B3");
engine.getRange("A4:A33").values = [
  ["Site_of_Care"],
  ["Payer_Type"],
  ["340B_Status"],
  ["340B_Treatment"],
  ["Coding_Status"],
  ["OPPS_Pass_Through_Status"],
  ["Sourcing_Model"],
  ["ASP_Status"],
  ["Reimbursement_Basis"],
  ["340B_Acquisition_Assumption"],
  ["Prior_Authorization_Status"],
  ["White_Bagging_Percentage"],
  ["Denial_Rate"],
  ["Appeal_Recovery_Rate"],
  ["Days_To_Payment"],
  ["Reimbursement_Percentage"],
  ["WAC"],
  ["AWP"],
  ["ASP"],
  ["Contracted_Rate"],
  ["Manual_Allowed_Amount"],
  ["Labor_Cost_Per_Admin"],
  ["Pharmacy_Handling_Cost_Per_Admin"],
  ["Billing_Admin_Cost_Per_Admin"],
  ["Other_Non_Drug_Cost"],
  ["Wastage_Cost_Per_Admin"],
  ["Financing_Rate"],
  ["Procedure_Revenue_Per_Dose"],
  ["Manufacturer_Support_Per_Dose"],
  ["Manual_340B_Acquisition"],
];
engine.getRange("B4:B14").formulas = [
  ["='Scenario Selector'!$D$5"],
  ["='Scenario Selector'!$D$6"],
  ["='Scenario Selector'!$D$7"],
  ["='Scenario Selector'!$D$8"],
  ["='Scenario Selector'!$D$9"],
  ["='Scenario Selector'!$D$10"],
  ["='Scenario Selector'!$D$11"],
  ["='Scenario Selector'!$D$12"],
  ["='Scenario Selector'!$D$13"],
  ["='Scenario Selector'!$D$14"],
  ["='Scenario Selector'!$D$15"],
];
engine.getRange("B15:B33").formulas = [
  ["='Core Assumptions'!$B$39"],
  ["='Core Assumptions'!$B$40"],
  ["='Core Assumptions'!$B$41"],
  ["='Core Assumptions'!$B$42"],
  ["='Core Assumptions'!$B$56"],
  ["='Core Assumptions'!$B$5"],
  ["='Core Assumptions'!$B$53"],
  ["='Core Assumptions'!$B$54"],
  ["='Core Assumptions'!$B$52"],
  ["='Core Assumptions'!$B$51"],
  ["='Core Assumptions'!$B$43"],
  ["='Core Assumptions'!$B$44"],
  ["='Core Assumptions'!$B$45"],
  ["='Core Assumptions'!$B$46"],
  ["='Core Assumptions'!$B$48"],
  ["='Core Assumptions'!$B$49"],
  ["='Core Assumptions'!$B$47"],
  ["='Core Assumptions'!$B$50"],
  ["='Core Assumptions'!$B$55"],
];

engine.getRange("A35:B35").values = [["Model Outputs", "Value"]];
styleHeader(engine, "A35:B35");
const outputNames = [
  "Annual_Doses",
  "Calculated_Annual_Doses",
  "Pre_ASP_Doses",
  "Selected_340B_Acquisition",
  "Selected_Allowed_Drug_Reimbursement",
  "Drug_Acquisition_Per_Dose",
  "Allowed_Drug_Reimbursement_Per_Dose",
  "Drug_Spread",
  "Non_Drug_Operating_Cost",
  "Denial_Drag_Per_Dose",
  "Financing_Drag_Per_Dose",
  "Net_Operating_Margin_Per_Dose",
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
engine.getRange("A36:A64").values = outputNames.map((n) => [n]);
engine.getRange("B36:B64").formulas = [
  ["=26"],
  ["=52/'Core Assumptions'!$B$7"],
  ["=13"],
  ["=IF(B13=\"Primary 23.1%\",'Core Assumptions'!$B$23,IF(B13=\"Sensitivity 17.1%\",'Core Assumptions'!$B$25,B33))"],
  ["=IF(B12=\"WAC %\",B20*B19,IF(B12=\"AWP %\",B21*B19,IF(B12=\"ASP %\",B22*B19,IF(B12=\"Contracted rate\",B23,IF(B12=\"Manual entry\",B24,0)))))"],
  ["=IF(B10=\"White-bagging\",0,IF(B10=\"Mixed\",(1-B15)*IF(B6=\"Yes\",B39,B20),IF(B6=\"Yes\",B39,B20)))"],
  ["=IF(B10=\"White-bagging\",0,IF(B10=\"Mixed\",(1-B15)*B40,B40))"],
  ["=B42-B41"],
  ["=B25+B26+B27+B28+B29"],
  ["=B16*(1-B17)*(B41+B44)"],
  ["=B41*B30*B18/365"],
  ["=B42+B31+B32-B41-B44-B45-B46"],
  ["=B47*B36"],
  ["=ROUNDUP(B18/14,0)"],
  ["=B41*B49"],
  ["=MAX(0,-B47)"],
  ["=B51*B36"],
  ["=B20*B38"],
  ["=B42*B38"],
  ["=B54-B53"],
  ["=IF(B6=\"Yes\",B20-B39,0)"],
  ["=B56*B36"],
  ["=B56*B38"],
  ["=B41*B36"],
  ["=B42*B36"],
  ["=B44*B36"],
  ["=IF(B47<0,\"High margin risk\",IF(B47<1000,\"Moderate margin risk\",\"Low margin risk\"))"],
  ["=IF(B50>250000,\"High cash exposure\",IF(B50>100000,\"Moderate cash exposure\",\"Manageable cash exposure\"))"],
  ["=IF(OR(B14=\"Not confirmed\",B8=\"Pre-code / NOC\",B10=\"Mixed\"),\"High operational risk\",IF(OR(B16>10%,B18>90),\"Moderate operational risk\",\"Lower operational risk\"))"],
];

styleFormula(engine, "B4:B64");
engine.getRange("B4:B5").format.numberFormat = "@";
engine.getRange("B6:B14").format.numberFormat = "@";
engine.getRange("B15:B17").format.numberFormat = "0.0%";
engine.getRange("B18:B18").format.numberFormat = "0";
engine.getRange("B19:B19").format.numberFormat = "0.0%";
engine.getRange("B20:B33").format.numberFormat = "$#,##0.00";
engine.getRange("B36:B37").format.numberFormat = "0.00";
engine.getRange("B38:B61").format.numberFormat = "$#,##0.00";
engine.getRange("B44:B46").format.numberFormat = "$#,##0.00";
engine.getRange("B49:B49").format.numberFormat = "0";
engine.getRange("B62:B64").format.numberFormat = "@";
engine.getRange("B45:B45").format.numberFormat = "$#,##0.00";

applyBasicBorders(engine, "A3:B64");
engine.getRange("A:A").format.columnWidth = 42;
engine.getRange("B:B").format.columnWidth = 28;
engine.freezePanes.freezeRows(3);

arm.getRange("A1:H1").merge();
arm.getRange("A1").values = [["Adrabetadex Provider Net-Cost Recovery Summary"]];
styleTitle(arm, "A1:H1");
arm.getRange("A2:H2").merge();
arm.getRange("A2").values = [["Provider-facing output summary for selected scenario."]];
arm.getRange("A2").format = { fill: colors.note, font: { italic: true, color: "#333333" } };

arm.getRange("A4:B10").values = [
  ["Product", "Adrabetadex"],
  ["Scenario name", "='Scenario Selector'!$B$2"],
  ["Date generated", "=TODAY()"],
  ["Site type", "='Scenario Selector'!$D$5"],
  ["Payer type", "='Scenario Selector'!$D$6"],
  ["340B status", "='Scenario Selector'!$D$7"],
  ["Coding status", "='Scenario Selector'!$D$9"],
];
arm.getRange("E4:F10").values = [
  ["Sourcing model", "='Scenario Selector'!$D$11"],
  ["Pass-through status", "='Scenario Selector'!$D$10"],
  ["Reimbursement basis", "='Scenario Selector'!$D$13"],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
];
arm.getRange("A4:F10").format.numberFormat = "@";
arm.getRange("B6").format.numberFormat = "m/d/yyyy";
styleHeader(arm, "A3:F3");
arm.getRange("A3:F3").values = [["Header", "Value", "", "", "Header", "Value"]];
applyBasicBorders(arm, "A3:F10");

arm.getRange("A12:B12").values = [["Selected Scenario Summary", "Value"]];
styleHeader(arm, "A12:B12");
arm.getRange("A13:B19").values = [
  ["Site of care", "='Scenario Selector'!$D$5"],
  ["Payer type", "='Scenario Selector'!$D$6"],
  ["340B status", "='Scenario Selector'!$D$7"],
  ["Coding status", "='Scenario Selector'!$D$9"],
  ["Pass-through status", "='Scenario Selector'!$D$10"],
  ["Sourcing model", "='Scenario Selector'!$D$11"],
  ["Reimbursement basis", "='Scenario Selector'!$D$13"],
];
applyBasicBorders(arm, "A12:B19");

arm.getRange("D12:E12").values = [["Per-Dose Economics", "Value"]];
styleHeader(arm, "D12:E12");
arm.getRange("D13:E21").values = [
  ["Drug acquisition per dose", "='Calculation Engine'!$B$41"],
  ["Allowed drug reimbursement per dose", "='Calculation Engine'!$B$42"],
  ["Drug spread per dose", "='Calculation Engine'!$B$43"],
  ["Procedure revenue per dose", "='Calculation Engine'!$B$31"],
  ["Non-drug operating cost per dose", "='Calculation Engine'!$B$44"],
  ["Denial drag per dose", "='Calculation Engine'!$B$45"],
  ["Financing drag per dose", "='Calculation Engine'!$B$46"],
  ["Net operating margin per dose", "='Calculation Engine'!$B$47"],
  ["Break-even support per dose", "='Calculation Engine'!$B$51"],
];
arm.getRange("E13:E21").format.numberFormat = "$#,##0.00";
applyBasicBorders(arm, "D12:E21");

arm.getRange("A22:B22").values = [["Annual Economics", "Value"]];
styleHeader(arm, "A22:B22");
arm.getRange("A23:B30").values = [
  ["Annual administrations", "='Calculation Engine'!$B$36"],
  ["Annual drug acquisition", "='Calculation Engine'!$B$59"],
  ["Annual allowed drug reimbursement", "='Calculation Engine'!$B$60"],
  ["Annual non-drug operating cost", "='Calculation Engine'!$B$61"],
  ["Annual net contribution", "='Calculation Engine'!$B$48"],
  ["Annual break-even support", "='Calculation Engine'!$B$52"],
  ["Cash at risk", "='Calculation Engine'!$B$50"],
  ["Annual 340B acquisition advantage", "='Calculation Engine'!$B$57"],
];
arm.getRange("B23:B23").format.numberFormat = "0";
arm.getRange("B24:B30").format.numberFormat = "$#,##0.00";
applyBasicBorders(arm, "A22:B30");

arm.getRange("D22:F22").values = [["Risk Flags", "Result", "Explanation"]];
styleHeader(arm, "D22:F22");
arm.getRange("D23:F25").values = [
  ["Margin risk", "='Calculation Engine'!$B$62", "=IF(E23=\"High margin risk\",\"Per-dose margin is negative.\",IF(E23=\"Moderate margin risk\",\"Per-dose margin is positive but narrow.\",\"Per-dose margin has stronger cushion.\"))"],
  ["Cash exposure risk", "='Calculation Engine'!$B$63", "=IF(E24=\"High cash exposure\",\"Days-to-payment and acquisition burden create elevated float exposure.\",IF(E24=\"Moderate cash exposure\",\"Monitor outstanding administrations and remittance timing.\",\"Cash exposure appears manageable at current assumptions.\"))"],
  ["Operational risk", "='Calculation Engine'!$B$64", "=IF(E25=\"High operational risk\",\"Coding and PA readiness may disrupt clean claim payment.\",IF(E25=\"Moderate operational risk\",\"Strengthen denial management and payment cycle controls.\",\"Operational assumptions are relatively stable.\"))"],
];
arm.getRange("F23:F25").format.wrapText = true;
applyBasicBorders(arm, "D22:F25");

arm.getRange("A32:A32").values = [["Customer Conversation Takeaways"]];
styleHeader(arm, "A32:F32");
arm.getRange("A33:F35").merge(true);
arm.getRange("A33").formulas = [["=IF('Scenario Selector'!$D$11=\"White-bagging\",\"1. White-bagging reduces provider acquisition exposure.\",IF('Scenario Selector'!$D$7=\"No\",\"1. Non-340B acquisition creates higher cash exposure.\",IF('Scenario Selector'!$D$9=\"Pre-code / NOC\",\"1. Interim coding increases operational risk.\",\"1. 340B acquisition materially improves provider economics.\")))"]];
arm.getRange("A34:F36").merge(true);
arm.getRange("A34").formulas = [["=IF('Scenario Selector'!$D$11=\"White-bagging\",\"2. White-bagging removes provider drug reimbursement and drug spread.\",IF('Scenario Selector'!$D$7=\"No\",\"2. Margin depends heavily on allowed reimbursement, denial rate, and payment timing.\",IF('Scenario Selector'!$D$9=\"Pre-code / NOC\",\"2. NDC, invoice support, and medical-necessity documentation are required for clean claim processing.\",\"2. Pass-through and permanent HCPCS timing reduce payment uncertainty across the launch bridge.\")))"]];
arm.getRange("A35:F37").merge(true);
arm.getRange("A35").formulas = [["=IF('Scenario Selector'!$D$11=\"White-bagging\",\"3. Administration revenue and operational workflow remain important to evaluate.\",IF('Scenario Selector'!$D$7=\"No\",\"3. Break-even support may be required if net operating margin is negative.\",IF('Scenario Selector'!$D$9=\"Pre-code / NOC\",\"3. Permanent HCPCS timing should be reflected in site readiness planning.\",\"3. Clean PA, NDC, billing, wastage, and 340B documentation are required to convert coverage into payment.\")))"]];
arm.getRange("A33:F37").format.wrapText = true;
arm.getRange("A33:F37").format.verticalAlignment = "top";
applyBasicBorders(arm, "A32:F37");

arm.getRange("A39:F41").merge();
arm.getRange("A39").values = [["Estimates are for planning purposes only and do not guarantee coverage, coding, payment, or reimbursement. Providers should verify coding, billing, payer rules, contract terms, and documentation requirements before claim submission."]];
arm.getRange("A39:F41").format = { fill: colors.note, font: { size: 9, color: "#333333" }, wrapText: true, verticalAlignment: "top" };

arm.getRange("A1:F41").format.columnWidth = 24;
arm.getRange("A:A").format.columnWidth = 36;
arm.getRange("B:B").format.columnWidth = 20;
arm.getRange("D:D").format.columnWidth = 34;
arm.getRange("E:E").format.columnWidth = 18;
arm.getRange("F:F").format.columnWidth = 44;
arm.freezePanes.freezeRows(3);

appendix.getRange("A1:H1").merge();
appendix.getRange("A1").values = [["Appendix Assumptions"]];
styleTitle(appendix, "A1:H1");

appendix.getRange("A3:B3").values = [["Coding Assumptions", "Assumption"]];
styleHeader(appendix, "A3:B3");
appendix.getRange("A4:B10").values = [
  ["Launch coding", "Interim/NOC coding is required before product-specific HCPCS"],
  ["HOPD interim code", "C9399 is used for HOPD OPPS interim unclassified billing when applicable"],
  ["Professional interim codes", "J3490 or J3590 are used when payer/product classification supports NOC professional billing"],
  ["Permanent HCPCS", "Product-specific HCPCS is effective April 1, 2027"],
  ["NDC reporting", "NDC reporting is required for Medicaid PAD and required/important for commercial, manual pricing, and OPPS workflows"],
  ["JW/JZ", "JW/JZ reporting is required where applicable for single-dose vial billing"],
  ["340B modifier", "TB or payer-required 340B modifier is used where applicable"],
];

appendix.getRange("A12:B12").values = [["Reimbursement Assumptions", "Assumption"]];
styleHeader(appendix, "A12:B12");
appendix.getRange("A13:B22").values = [
  ["Pre-ASP benchmark", "103% of WAC"],
  ["WAC", "$39,000"],
  ["Pre-ASP period", "First two quarters"],
  ["OPPS pass-through", "Effective January 1, 2027"],
  ["Annual doses", "26"],
  ["Default customer", "340B center of excellence"],
  ["Default acquisition model", "340B acquisition where applicable"],
  ["White-bagging", "Drug acquisition and drug reimbursement to provider are $0 for the white-bagged portion"],
  ["Buy-and-bill", "Provider carries acquisition cost and bills drug reimbursement"],
  ["Mixed sourcing", "White-bagging percentage reduces both provider acquisition and provider drug reimbursement proportionally"],
];

appendix.getRange("D3:D3").values = [["Policy Caveats"]];
styleHeader(appendix, "D3:H3");
appendix.getRange("D4:D10").values = [
  ["Coverage does not guarantee payment."],
  ["Prior authorization is expected."],
  ["Site-of-care review is expected."],
  ["Commercial payers may require specialty pharmacy or white-bagging."],
  ["Medicaid payment is state-specific."],
  ["EPSDT may support pediatric medical necessity but does not establish provider payment."],
  ["ASP-based reimbursement must be updated when ASP becomes available."],
];

appendix.getRange("D12:D12").values = [["340B Compliance Caveats"]];
styleHeader(appendix, "D12:H12");
appendix.getRange("D13:D18").values = [
  ["340B status must be confirmed by the provider."],
  ["Covered entity and child-site eligibility must be validated."],
  ["Medicaid carve-in/carve-out status must be confirmed."],
  ["Duplicate-discount controls remain the provider’s responsibility."],
  ["340B modifier requirements may vary by payer and program context."],
  ["Calculator output is not a 340B compliance determination."],
];

appendix.getRange("A24:B24").values = [["Hybrid PDF Approach", "Purpose"]];
styleHeader(appendix, "A24:B24");
appendix.getRange("A25:B26").values = [
  ["Excel workbook", "Live formula engine and scenario calculator"],
  ["PDF summary", "Static one-page leave-behind generated from ARM Output tab"],
];

appendix.getRange("A3:H30").format.wrapText = true;
appendix.getRange("A:A").format.columnWidth = 34;
appendix.getRange("B:B").format.columnWidth = 70;
appendix.getRange("D:D").format.columnWidth = 90;
applyBasicBorders(appendix, "A3:B26");
applyBasicBorders(appendix, "D3:D18");
appendix.freezePanes.freezeRows(3);

for (const sh of [instructions, core, selector, engine, arm, appendix]) {
  sh.showGridLines = false;
}

const formulaScan = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula errors",
});

const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(workbookPath);

const armBlob = await wb.render({
  sheetName: "ARM Output",
  range: "A1:F41",
  scale: 2,
  format: "png",
});
const armBytes = new Uint8Array(await armBlob.arrayBuffer());
await fs.writeFile(armPngPath, armBytes);

const inspectArm = await wb.inspect({
  kind: "table",
  range: "ARM Output!A1:F41",
  include: "values,formulas",
  tableMaxRows: 60,
  tableMaxCols: 8,
  maxChars: 12000,
});

console.log(JSON.stringify({ workbookPath, armPngPath }));
console.log("FORMULA_SCAN_START");
console.log(formulaScan.ndjson);
console.log("FORMULA_SCAN_END");
console.log("ARM_INSPECT_START");
console.log(inspectArm.ndjson.slice(0, 8000));
console.log("ARM_INSPECT_END");
