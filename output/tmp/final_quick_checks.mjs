import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const path = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(blob);
const core = wb.worksheets.getItem("Core Assumptions");
const sel = wb.worksheets.getItem("Scenario Selector");
const err = await wb.inspect({ kind:"match", searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options:{useRegex:true,maxResults:100}, maxChars:6000 });
console.log(JSON.stringify({
 b23Formula: core.getRange("B23").formulas[0][0],
 b23Format: core.getRange("B23").format.numberFormat,
 c5Formula: sel.getRange("C5").formulas[0][0],
 e5Formula: sel.getRange("E5").formulas[0][0],
 e51Formula: sel.getRange("E51").formulas[0][0],
 errorScan: err.ndjson,
},null,2));
