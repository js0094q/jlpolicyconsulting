import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const path = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(blob);
const s = wb.worksheets.getItem("Scenario Selector");
s.getRange("C51:C69").clear({ applyTo: "contents" });
const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(path);
console.log(JSON.stringify({
 c51: s.getRange("C51").values[0][0],
 b51: s.getRange("B51").values[0][0],
 d51: s.getRange("D51").values[0][0],
 e51: s.getRange("E51").values[0][0]
},null,2));
