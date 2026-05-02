import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = process.argv[2] || "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const outputDir = process.argv[3] || "output/exports/adrabetadex_provider_net_cost_recovery_calculator";
const workbookContext = process.argv[4] || workbookPath;
const renderRange = "A1:E50";

const blob = await FileBlob.load(workbookPath);
const wb = await SpreadsheetFile.importXlsx(blob);

const sheetCandidates = ["PDF Output", "Scenario Summary"];
let outputSheet = null;
for (const name of sheetCandidates) {
  try {
    const test = wb.worksheets.getItem(name);
    if (test) {
      outputSheet = name;
      break;
    }
  } catch (_error) {
    // ignore and continue
  }
}

if (!outputSheet) {
  throw new Error("No usable output sheet found. Expected PDF Output or Scenario Summary.");
}

const selector = wb.worksheets.getItem("Scenario Inputs");
const scenario = selector.getRange("B2").values?.[0]?.[0] ?? "Scenario";
const safeScenario = String(scenario).replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "Scenario";

const dt = new Date();
const yyyy = dt.getFullYear();
const mm = String(dt.getMonth() + 1).padStart(2, "0");
const dd = String(dt.getDate()).padStart(2, "0");
const dateTag = `${yyyy}-${mm}-${dd}`;

await fs.mkdir(outputDir, { recursive: true });
const pngPath = path.join(outputDir, "ARM_Output_preview.png");
const metaPath = path.join(outputDir, "arm_pdf_meta.json");
const pdfFilename = `Adrabetadex_ARM_Output_${safeScenario}_${dateTag}.pdf`;

const imageBlob = await wb.render({
  sheetName: outputSheet,
  range: renderRange,
  scale: 2,
  format: "png",
});
const bytes = new Uint8Array(await imageBlob.arrayBuffer());
await fs.writeFile(pngPath, bytes);

const meta = {
  scenario,
  safeScenario,
  dateTag,
  pngPath,
  pdfFilename,
  workbookPath: workbookContext,
  outputSheet,
  cropBoxPx: {
    left: 80,
    top: 40,
    right: 0,
    bottom: 0,
  },
};
await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
console.log(JSON.stringify(meta));
