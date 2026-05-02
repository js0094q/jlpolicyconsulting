import { execSync } from "node:child_process";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";

async function load() {
  const blob = await FileBlob.load(workbookPath);
  return SpreadsheetFile.importXlsx(blob);
}

function pagesFromPdf(path) {
  try {
    const out = execSync(`pdfinfo "${path}" | rg "Pages"`, { encoding: "utf8" }).trim();
    const m = out.match(/Pages:\s*(\d+)/);
    return m ? Number(m[1]) : null;
  } catch {
    return null;
  }
}

function exportPdf() {
  const out = execSync(`./output/exports/adrabetadex_provider_net_cost_recovery_calculator/export_arm_summary_pdf.sh`, { encoding: "utf8" }).trim();
  return out.split("\n").pop().trim();
}

const wb = await load();
const sel = wb.worksheets.getItem("Scenario Selector");
const core = wb.worksheets.getItem("Core Assumptions");
const eng = wb.worksheets.getItem("Calculation Engine");
const arm = wb.worksheets.getItem("ARM Output");

const results = [];

function clearOverrides() {
  sel.getRange("B5:B15").clear({ applyTo: "contents" });
  sel.getRange("C51:C69").clear({ applyTo: "contents" });
}

async function runCase(caseName, cfg) {
  clearOverrides();
  sel.getRange("B2").values = [[cfg.scenario]];
  sel.getRange("B48").values = [[cfg.numericPreset]];
  if (cfg.manualOverrideCell && cfg.manualOverrideValue !== undefined) {
    sel.getRange(cfg.manualOverrideCell).values = [[cfg.manualOverrideValue]];
  }

  // persist before export so script reads active scenario state
  const out1 = await SpreadsheetFile.exportXlsx(wb);
  await out1.save(workbookPath);

  const pdfPath = exportPdf();
  const pdfPages = pagesFromPdf(pdfPath);

  results.push({
    case: caseName,
    scenario: sel.getRange("B2").values[0][0],
    numericPreset: sel.getRange("B48").values[0][0],
    activeSourceCategorical: sel.getRange("E5").values[0][0],
    activeSourceNumeric: sel.getRange("E52").values[0][0],
    denialRate: core.getRange("B40").values[0][0],
    sourcing: sel.getRange("D11").values[0][0],
    drugAcq: eng.getRange("B41").values[0][0],
    allowed: eng.getRange("B42").values[0][0],
    armScenario: arm.getRange("B3").values[0][0],
    pdfPath,
    pdfPages,
  });
}

await runCase("Base Case", {
  scenario: "Default 340B COE HOPD, Pass-Through Active",
  numericPreset: "Base Case: 340B COE HOPD, Buy-and-Bill",
});

await runCase("Conservative Case", {
  scenario: "Default 340B COE HOPD, Pass-Through Active",
  numericPreset: "Conservative Case: Launch Friction / Manual Review",
});

await runCase("White-Bagging Case", {
  scenario: "Commercial White-Bagging",
  numericPreset: "White-Bagging Case",
});

await runCase("Manual Override Scenario", {
  scenario: "Default 340B COE HOPD, Pass-Through Active",
  numericPreset: "Base Case: 340B COE HOPD, Buy-and-Bill",
  manualOverrideCell: "C52", // denial override
  manualOverrideValue: 0.12,
});

await runCase("No Manual Override Scenario", {
  scenario: "Default 340B COE HOPD, Pass-Through Active",
  numericPreset: "Base Case: 340B COE HOPD, Buy-and-Bill",
});

// leave workbook in default state
clearOverrides();
sel.getRange("B2").values = [["Default 340B COE HOPD, Pass-Through Active"]];
sel.getRange("B48").values = [["Base Case: 340B COE HOPD, Buy-and-Bill"]];

const errScan = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  maxChars: 6000,
});

const outFinal = await SpreadsheetFile.exportXlsx(wb);
await outFinal.save(workbookPath);

console.log(JSON.stringify({ results, errorScan: errScan.ndjson }, null, 2));
