import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const path = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const blob = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(blob);
const s = wb.worksheets.getItem("Scenario Selector");
for (let r = 5; r <= 15; r++) {
  s.getRange(`E${r}`).formulas = [[`=IF(NOT(ISBLANK(B${r})),"Manual Override",IF(NOT(ISBLANK(C${r})),"Preset","Blank / Review Required"))`]];
}
for (let r = 51; r <= 69; r++) {
  s.getRange(`E${r}`).formulas = [[`=IF(NOT(ISBLANK(C${r})),"Manual Override",IF(NOT(ISBLANK(B${r})),"Preset","Blank / Review Required"))`]];
}
const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(path);
console.log(JSON.stringify({e5:s.getRange('E5').values[0][0], e51:s.getRange('E51').values[0][0], e69:s.getRange('E69').values[0][0]},null,2));
