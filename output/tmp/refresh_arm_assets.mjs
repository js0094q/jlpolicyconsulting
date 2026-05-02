import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx";
const pngPath = "output/exports/adrabetadex_provider_net_cost_recovery_calculator/ARM_Output_preview.png";

const blob = await FileBlob.load(workbookPath);
const wb = await SpreadsheetFile.importXlsx(blob);
const armBlob = await wb.render({ sheetName: "ARM Output", range: "A1:F41", scale: 2, format: "png" });
const bytes = new Uint8Array(await armBlob.arrayBuffer());
await fs.writeFile(pngPath, bytes);
console.log(pngPath);
