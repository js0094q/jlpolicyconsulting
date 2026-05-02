import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const path = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(blob);
const core = wb.worksheets.getItem("Core Assumptions");

core.getRange("B22").format.numberFormat = "0.0%";
core.getRange("B24").format.numberFormat = "0.0%";
core.getRange("B23").format.numberFormat = "$#,##0.00";
core.getRange("B25").format.numberFormat = "$#,##0.00";

const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(path);

console.log(JSON.stringify({
  b22: core.getRange("B22").format.numberFormat,
  b23: core.getRange("B23").format.numberFormat,
  b24: core.getRange("B24").format.numberFormat,
  b25: core.getRange("B25").format.numberFormat,
}, null, 2));
