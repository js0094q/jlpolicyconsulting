import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const path = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(blob);
const s = wb.worksheets.getItem("Scenario Selector");
console.log(JSON.stringify({
 b48: s.getRange("B48").values[0][0],
 b51: s.getRange("B51").values[0][0],
 b52: s.getRange("B52").values[0][0],
 b69: s.getRange("B69").values[0][0],
 c51: s.getRange("C51").values[0][0],
 d51: s.getRange("D51").values[0][0],
 e51: s.getRange("E51").values[0][0]
},null,2));
