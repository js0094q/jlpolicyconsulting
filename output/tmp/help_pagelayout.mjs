import { Workbook } from "@oai/artifact-tool";
const wb = Workbook.create();
console.log(wb.help("pageLayout", { include: "index", maxChars: 4000 }).ndjson);
