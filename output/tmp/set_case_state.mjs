import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const [scenario, numericPreset, overrideCell, overrideValueRaw] = process.argv.slice(2);
const workbookPath = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";

const blob = await FileBlob.load(workbookPath);
const wb = await SpreadsheetFile.importXlsx(blob);
const sel = wb.worksheets.getItem("Scenario Selector");
const core = wb.worksheets.getItem("Core Assumptions");
const eng = wb.worksheets.getItem("Calculation Engine");
const arm = wb.worksheets.getItem("ARM Output");

sel.getRange("B5:B15").clear({ applyTo: "contents" });
sel.getRange("C51:C69").clear({ applyTo: "contents" });
if (scenario) sel.getRange("B2").values = [[scenario]];
if (numericPreset) sel.getRange("B48").values = [[numericPreset]];
if (overrideCell && overrideValueRaw !== undefined) {
  const num = Number(overrideValueRaw);
  sel.getRange(overrideCell).values = [[Number.isFinite(num) ? num : overrideValueRaw]];
}

const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(workbookPath);

console.log(JSON.stringify({
  scenario: sel.getRange("B2").values[0][0],
  numericPreset: sel.getRange("B48").values[0][0],
  activeSourceCat: sel.getRange("E5").values[0][0],
  activeSourceNum: sel.getRange("E52").values[0][0],
  denialRate: core.getRange("B40").values[0][0],
  sourcing: sel.getRange("D11").values[0][0],
  drugAcq: eng.getRange("B41").values[0][0],
  allowed: eng.getRange("B42").values[0][0],
  armScenario: arm.getRange("B3").values[0][0],
}, null, 2));
