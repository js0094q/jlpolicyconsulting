import { Workbook } from "@oai/artifact-tool";
const wb = Workbook.create();
console.log(wb.help("*", { search: "printArea|fitToPagesWide|fitToPagesTall|page setup|pageSetup|page layout|paper", include: "index", maxChars: 6000 }).ndjson);
