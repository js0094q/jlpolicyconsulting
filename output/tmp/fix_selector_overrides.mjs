import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const path = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(blob);
const sel = wb.worksheets.getItem("Scenario Selector");

sel.getRange("B5:B15").clear({ applyTo: "contents" });
sel.getRange("B2").values = [["Default 340B COE HOPD, Pass-Through Active"]];
sel.getRange("B48").values = [["Base Case: 340B COE HOPD, Buy-and-Bill"]];

const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(path);

console.log(JSON.stringify({
  b5: sel.getRange("B5").values[0][0],
  d5: sel.getRange("D5").values[0][0],
  d6: sel.getRange("D6").values[0][0],
  d11: sel.getRange("D11").values[0][0],
  d14: sel.getRange("D14").values[0][0],
}, null, 2));
