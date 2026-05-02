import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const repoRoot = "/Users/josephstewart/Documents/JLPolicyConsulting";
const dataPath = path.join(repoRoot, "output/tmp/invoice_builder/navisync_adra_invoice_data.json");
const outputDir = path.join(repoRoot, "output/exports/invoices");
const renderDir = path.join(repoRoot, "output/tmp/invoice_render/navisync_adra_beren");
const outputPath = path.join(outputDir, "JLPC-2026-0501_Navisync_Adrabetadex_Beren_Hourly_Register.xlsx");

const data = JSON.parse(await fs.readFile(dataPath, "utf8"));
const items = data.items;
const rate = data.rate;
const totalHours = items.reduce((sum, item) => sum + Number(item.hours), 0);
const totalAmount = totalHours * rate;

function money(value) {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function styleTitle(range) {
  range.format = {
    fill: "#12355B",
    font: { color: "#FFFFFF", bold: true, size: 14 },
    borders: { preset: "outside", style: "thin", color: "#12355B" },
    verticalAlignment: "center",
    wrapText: true,
  };
}

function styleHeader(range) {
  range.format = {
    fill: "#DCE8F2",
    font: { bold: true, color: "#102A43" },
    borders: { preset: "all", style: "thin", color: "#AAB7C4" },
    verticalAlignment: "center",
    wrapText: true,
  };
}

function styleBody(range) {
  range.format = {
    fill: "#FFFFFF",
    font: { color: "#111827", size: 10 },
    borders: { preset: "all", style: "thin", color: "#D7DEE8" },
    verticalAlignment: "top",
    wrapText: true,
  };
}

const workbook = Workbook.create();

const summary = workbook.worksheets.add("Invoice Summary");
summary.getRange("A1:H1").values = [[`${data.seller.name} | Hourly Invoice`,"","","","","","",""]];
summary.getRange("A1:H1").merge();
styleTitle(summary.getRange("A1:H1"));
summary.getRange("A3:B10").values = [
  ["Invoice Number", data.invoiceNumber],
  ["Invoice Date", data.invoiceDate],
  ["Service Period", data.servicePeriod],
  ["Payment Terms", data.paymentTerms],
  ["Currency", data.currency],
  ["Billing Rate", rate],
  ["Total Hours", totalHours],
  ["Total Due", totalAmount],
];
styleBody(summary.getRange("A3:B10"));
summary.getRange("A3:A10").format = {
  fill: "#EEF4F8",
  font: { bold: true, color: "#102A43" },
  borders: { preset: "all", style: "thin", color: "#D7DEE8" },
};
summary.getRange("B8:B8").format.numberFormat = "$#,##0.00";
summary.getRange("B9:B9").format.numberFormat = "0.0";
summary.getRange("B10:B10").format = {
  fill: "#F6E9C8",
  font: { bold: true, color: "#102A43" },
  numberFormat: "$#,##0.00",
  borders: { preset: "all", style: "thin", color: "#C4A353" },
};
summary.getRange("D3:H10").values = [
  ["Bill To", data.billTo[0], "", "", ""],
  ["", data.billTo[1], "", "", ""],
  ["", data.billTo[2], "", "", ""],
  ["", data.billTo[3], "", "", ""],
  ["Seller", data.seller.contact, "", "", ""],
  ["", data.seller.title, "", "", ""],
  ["", data.seller.email, "", "", ""],
  ["", "", "", "", ""],
];
for (let row = 3; row <= 10; row++) {
  summary.getRange(`E${row}:H${row}`).merge();
}
styleBody(summary.getRange("D3:H10"));
summary.getRange("D3:D10").format = {
  fill: "#EEF4F8",
  font: { bold: true, color: "#102A43" },
  borders: { preset: "all", style: "thin", color: "#D7DEE8" },
};
summary.getRange("A12:H12").values = [["Notes", "", "", "", "", "", "", ""]];
summary.getRange("A12:H12").merge();
styleHeader(summary.getRange("A12:H12"));
summary.getRange(`A13:H${12 + data.notes.length}`).values = data.notes.map((note) => [note, "", "", "", "", "", "", ""]);
for (let row = 13; row <= 12 + data.notes.length; row++) {
  summary.getRange(`A${row}:H${row}`).merge();
}
styleBody(summary.getRange(`A13:H${12 + data.notes.length}`));

const lineItems = workbook.worksheets.add("Line Items");
lineItems.getRange("A1:G1").values = [["Item", "Date / time evidence", "Project / deliverable", "Hours", "Rate", "Amount", "Evidence"]];
styleHeader(lineItems.getRange("A1:G1"));
const rows = items.map((item, index) => [
  index + 1,
  item.dateEvidence,
  item.deliverable,
  Number(item.hours),
  rate,
  null,
  item.evidence,
]);
lineItems.getRange(`A2:G${items.length + 1}`).values = rows;
lineItems.getRange(`F2:F${items.length + 1}`).formulas = items.map((_, index) => [`=D${index + 2}*E${index + 2}`]);
styleBody(lineItems.getRange(`A2:G${items.length + 1}`));
lineItems.getRange(`D2:D${items.length + 1}`).format.numberFormat = "0.0";
lineItems.getRange(`E2:F${items.length + 1}`).format.numberFormat = "$#,##0.00";
lineItems.getRange(`A${items.length + 3}:F${items.length + 3}`).values = [["", "", "Subtotal", totalHours, "", null]];
lineItems.getRange(`F${items.length + 3}:F${items.length + 3}`).formulas = [[`=SUM(F2:F${items.length + 1})`]];
lineItems.getRange(`C${items.length + 3}:F${items.length + 3}`).format = {
  fill: "#F6E9C8",
  font: { bold: true, color: "#102A43" },
  borders: { preset: "all", style: "thin", color: "#C4A353" },
};
lineItems.getRange(`D${items.length + 3}:D${items.length + 3}`).format.numberFormat = "0.0";
lineItems.getRange(`F${items.length + 3}:F${items.length + 3}`).format.numberFormat = "$#,##0.00";
lineItems.freezePanes.freezeRows(1);

const evidence = workbook.worksheets.add("Source Evidence");
evidence.getRange("A1:D1").values = [["Date / time evidence", "Deliverable group", "Hours", "Source paths / records"]];
styleHeader(evidence.getRange("A1:D1"));
evidence.getRange(`A2:D${items.length + 1}`).values = items.map((item) => [
  item.dateEvidence,
  item.deliverable,
  Number(item.hours),
  item.evidence,
]);
styleBody(evidence.getRange(`A2:D${items.length + 1}`));
evidence.getRange(`C2:C${items.length + 1}`).format.numberFormat = "0.0";
evidence.freezePanes.freezeRows(1);

summary.getRange("A:A").format.columnWidthPx = 165;
summary.getRange("B:B").format.columnWidthPx = 255;
summary.getRange("C:C").format.columnWidthPx = 24;
summary.getRange("D:D").format.columnWidthPx = 120;
summary.getRange("E:H").format.columnWidthPx = 175;

lineItems.getRange("A:A").format.columnWidthPx = 44;
lineItems.getRange("B:B").format.columnWidthPx = 190;
lineItems.getRange("C:C").format.columnWidthPx = 540;
lineItems.getRange("D:D").format.columnWidthPx = 70;
lineItems.getRange("E:E").format.columnWidthPx = 85;
lineItems.getRange("F:F").format.columnWidthPx = 95;
lineItems.getRange("G:G").format.columnWidthPx = 520;

evidence.getRange("A:A").format.columnWidthPx = 190;
evidence.getRange("B:B").format.columnWidthPx = 560;
evidence.getRange("C:C").format.columnWidthPx = 75;
evidence.getRange("D:D").format.columnWidthPx = 620;

for (const sheet of [summary, lineItems, evidence]) {
  sheet.getRange("1:80").format.autofitRows();
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(renderDir, { recursive: true });

const summaryRender = await workbook.render({ sheetName: "Invoice Summary", range: "A1:H18", scale: 2 });
await fs.writeFile(path.join(renderDir, "Invoice_Summary.png"), Buffer.from(await summaryRender.arrayBuffer()));
const lineRender = await workbook.render({ sheetName: "Line Items", range: `A1:G${items.length + 3}`, scale: 2 });
await fs.writeFile(path.join(renderDir, "Line_Items.png"), Buffer.from(await lineRender.arrayBuffer()));
const evidenceRender = await workbook.render({ sheetName: "Source Evidence", range: `A1:D${Math.min(items.length + 1, 14)}`, scale: 2 });
await fs.writeFile(path.join(renderDir, "Source_Evidence.png"), Buffer.from(await evidenceRender.arrayBuffer()));

const summaryCheck = await workbook.inspect({
  kind: "table",
  range: "Invoice Summary!A3:B10",
  include: "values,formulas",
  tableMaxRows: 12,
  tableMaxCols: 4,
});
console.log(summaryCheck.ndjson);

const lineCheck = await workbook.inspect({
  kind: "table",
  range: `Line Items!A1:F${items.length + 3}`,
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 8,
});
console.log(lineCheck.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "invoice formula error scan",
});
console.log(errors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, totalHours, totalAmount, totalDue: money(totalAmount) }));
