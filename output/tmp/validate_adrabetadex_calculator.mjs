import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const filePath = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const input = await FileBlob.load(filePath);
const wb = await SpreadsheetFile.importXlsx(input);

const selector = wb.worksheets.getItem("Scenario Selector");
const engine = wb.worksheets.getItem("Calculation Engine");
const arm = wb.worksheets.getItem("ARM Output");

function get(cell) {
  return engine.getRange(cell).values?.[0]?.[0];
}

const checks = {};
checks.defaultScenario = selector.getRange("B2").values[0][0];
checks.defaultDrugAcq = get("B41");
checks.defaultAllowed = get("B42");
checks.defaultCashAtRisk = get("B50");
checks.defaultAdminOutstanding = get("B49");
checks.defaultArmSite = arm.getRange("B13").values[0][0];
checks.defaultArmPayer = arm.getRange("B14").values[0][0];

selector.getRange("B2").values = [["Commercial White-Bagging"]];
checks.whiteBagDrugAcq = get("B41");
checks.whiteBagAllowed = get("B42");
checks.whiteBagSpread = get("B43");
checks.whiteBagArmScenario = arm.getRange("B5").values[0][0];

selector.getRange("B2").values = [["Non-340B Sensitivity"]];
checks.non340bDrugAcq = get("B41");
checks.non340bStatus = engine.getRange("B6").values[0][0];
checks.non340bWAC = get("B20");

selector.getRange("B2").values = [["Default 340B COE HOPD, Pass-Through Active"]];
checks.roundTripScenario = selector.getRange("B2").values[0][0];

console.log(JSON.stringify(checks, null, 2));
