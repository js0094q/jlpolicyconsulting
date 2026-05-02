import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const path = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(blob);
const core = wb.worksheets.getItem("Core Assumptions");
const sel = wb.worksheets.getItem("Scenario Selector");
const eng = wb.worksheets.getItem("Calculation Engine");
const arm = wb.worksheets.getItem("ARM Output");

const out = {};
out.b23Formula = core.getRange("B23").formulas[0][0];
out.b23Format = core.getRange("B23").format.numberFormat;
out.acqLabels = [core.getRange("A24").values[0][0], core.getRange("A25").values[0][0]];
out.selectorPresetFormula = sel.getRange("C5").formulas[0][0];
out.selectorPresetValues = {
  c5: sel.getRange("C5").values[0][0],
  c6: sel.getRange("C6").values[0][0],
  c14: sel.getRange("C14").values[0][0],
};
out.activeValues = {
  d5: sel.getRange("D5").values[0][0],
  d6: sel.getRange("D6").values[0][0],
  d14: sel.getRange("D14").values[0][0],
};
out.defaultNumeric = {
  whiteBag: core.getRange("B39").values[0][0],
  denial: core.getRange("B40").values[0][0],
  appeal: core.getRange("B41").values[0][0],
  days: core.getRange("B42").values[0][0],
  labor: core.getRange("B43").values[0][0],
  pharmacy: core.getRange("B44").values[0][0],
  billing: core.getRange("B45").values[0][0],
  other: core.getRange("B46").values[0][0],
  procedureRev: core.getRange("B47").values[0][0],
  financing: core.getRange("B49").values[0][0],
  manualAllowed: core.getRange("B51").values[0][0],
  contracted: core.getRange("B52").values[0][0],
  awp: core.getRange("B53").values[0][0],
  asp: core.getRange("B54").values[0][0],
  manual340b: core.getRange("B55").values[0][0],
  reimbPct: core.getRange("B56").values[0][0],
};
out.defaultMargin = eng.getRange("B47").values[0][0];
out.defaultScenario = sel.getRange("B2").values[0][0];
out.defaultArmScenario = arm.getRange("B5").values[0][0];

// white-bagging scenario behavior check
sel.getRange("B2").values = [["Commercial White-Bagging"]];
out.whiteBag = {
  drugAcq: eng.getRange("B41").values[0][0],
  allowed: eng.getRange("B42").values[0][0],
  spread: eng.getRange("B43").values[0][0],
};

// restore default
sel.getRange("B2").values = [["Default 340B COE HOPD, Pass-Through Active"]];

const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  maxChars: 6000,
});
out.errorScan = errors.ndjson;

const x = await SpreadsheetFile.exportXlsx(wb);
await x.save(path);

console.log(JSON.stringify(out, null, 2));
