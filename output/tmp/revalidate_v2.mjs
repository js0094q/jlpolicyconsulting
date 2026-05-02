import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const path = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(blob);
const core = wb.worksheets.getItem("Core Assumptions");
const sel = wb.worksheets.getItem("Scenario Selector");
const eng = wb.worksheets.getItem("Calculation Engine");

const out = {};
out.default = {
  scenario: sel.getRange("B2").values[0][0],
  d11: sel.getRange("D11").values[0][0],
  denial: core.getRange("B40").values[0][0],
  appeal: core.getRange("B41").values[0][0],
  days: core.getRange("B42").values[0][0],
  b23fmt: core.getRange("B23").format.numberFormat,
  acqOption: sel.getRange("D14").values[0][0],
  drugAcq: eng.getRange("B41").values[0][0],
  allowed: eng.getRange("B42").values[0][0],
};

sel.getRange("B2").values = [["Commercial White-Bagging"]];
out.whiteBaggingScenario = {
  sourcing: sel.getRange("D11").values[0][0],
  drugAcq: eng.getRange("B41").values[0][0],
  allowed: eng.getRange("B42").values[0][0],
  spread: eng.getRange("B43").values[0][0],
};

sel.getRange("B2").values = [["Non-340B Sensitivity"]];
out.non340b = {
  status: sel.getRange("D7").values[0][0],
  drugAcq: eng.getRange("B41").values[0][0],
  wac: eng.getRange("B20").values[0][0],
};

sel.getRange("B2").values = [["Default 340B COE HOPD, Pass-Through Active"]];

const err = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  maxChars: 6000,
});
out.errorScan = err.ndjson;

const x = await SpreadsheetFile.exportXlsx(wb);
await x.save(path);

console.log(JSON.stringify(out, null, 2));
