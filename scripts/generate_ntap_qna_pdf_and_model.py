#!/usr/bin/env python3
from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple
from xml.sax.saxutils import escape

from openpyxl import Workbook
from openpyxl.comments import Comment
from openpyxl.styles import Alignment, Font, PatternFill
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import KeepTogether, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path("/Users/josephstewart/Documents/JLPolicyConsulting")
OUT_XLSX = ROOT / "output" / "spreadsheet" / "ntap_cost_scenarios_grounded.xlsx"
OUT_PDF = ROOT / "output" / "pdf" / "ntap_qna_cost_model_report.pdf"
OUT_PDF_TABLES = ROOT / "output" / "pdf" / "ntap_qna_tables_appendix.pdf"
TMP_DRG_CSV = Path("/tmp/ntap_table5/drg_weight_trend_2020_2026.csv")

FALLBACK_DRG_ROWS: List[Dict[str, str]] = [
    {"FY": "2020", "DRG": "023", "Weight": "5.6171", "Geometric_LOS": "7.1", "Arithmetic_LOS": "9.9", "Title": "CRANIOTOMY W MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PDX W MCC OR CHEMOTHERAPY IMPLANT OR EPILEPSY W NEUROSTIMULATOR", "SourceFile": "CMS-1716-F Table 5.txt"},
    {"FY": "2021", "DRG": "023", "Weight": "5.6623", "Geometric_LOS": "7.1", "Arithmetic_LOS": "9.8", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITH MCC OR CHEMOTHERAPY IMPLANT OR EPILEPSY WITH NEUROSTIMULATOR", "SourceFile": "CMS-1735-FR Table 5.txt"},
    {"FY": "2022", "DRG": "023", "Weight": "5.6719", "Geometric_LOS": "7.1", "Arithmetic_LOS": "9.8", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITH MCC OR CHEMOTHERAPY IMPLANT OR EPILEPSY WITH NEUROSTIMULATOR", "SourceFile": "CMS-1752-F Table 5.txt"},
    {"FY": "2023", "DRG": "023", "Weight": "5.7314", "Geometric_LOS": "7.3", "Arithmetic_LOS": "10.2", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITH MCC OR CHEMOTHERAPY IMPLANT OR EPILEPSY WITH NEUROSTIMULATOR", "SourceFile": "CMS-1771-F Table 5.txt"},
    {"FY": "2024", "DRG": "023", "Weight": "5.6688", "Geometric_LOS": "7.5", "Arithmetic_LOS": "10.5", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITH MCC OR CHEMOTHERAPY IMPLANT OR EPILEPSY WITH NEUROSTIMULATOR", "SourceFile": "CMS-1785-F Table 5.txt"},
    {"FY": "2025", "DRG": "023", "Weight": "5.7047", "Geometric_LOS": "7.3", "Arithmetic_LOS": "10.3", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITH MCC OR CHEMOTHERAPY IMPLANT OR EPILEPSY WITH NEUROSTIMULATOR", "SourceFile": "FY2025 IPPS Final Rule Table 5.txt"},
    {"FY": "2026", "DRG": "023", "Weight": "5.7303", "Geometric_LOS": "7.1", "Arithmetic_LOS": "10.0", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITH MCC OR ANTINEOPLASTIC IMPLANT OR EPILEPSY WITH NEUROSTIMULATOR", "SourceFile": "CMS-1833-F Table 5.txt"},
    {"FY": "2020", "DRG": "024", "Weight": "4.0165", "Geometric_LOS": "4.2", "Arithmetic_LOS": "5.3", "Title": "CRANIO W MAJOR DEV IMPL/ACUTE COMPLEX CNS PDX W/O MCC", "SourceFile": "CMS-1716-F Table 5.txt"},
    {"FY": "2021", "DRG": "024", "Weight": "3.9325", "Geometric_LOS": "4.1", "Arithmetic_LOS": "5.2", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITHOUT MCC", "SourceFile": "CMS-1735-FR Table 5.txt"},
    {"FY": "2022", "DRG": "024", "Weight": "3.9390", "Geometric_LOS": "4.1", "Arithmetic_LOS": "5.2", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITHOUT MCC", "SourceFile": "CMS-1752-F Table 5.txt"},
    {"FY": "2023", "DRG": "024", "Weight": "3.9488", "Geometric_LOS": "4.1", "Arithmetic_LOS": "5.2", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITHOUT MCC", "SourceFile": "CMS-1771-F Table 5.txt"},
    {"FY": "2024", "DRG": "024", "Weight": "3.7888", "Geometric_LOS": "4.0", "Arithmetic_LOS": "5.2", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITHOUT MCC", "SourceFile": "CMS-1785-F Table 5.txt"},
    {"FY": "2025", "DRG": "024", "Weight": "3.8014", "Geometric_LOS": "3.9", "Arithmetic_LOS": "5.1", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITHOUT MCC", "SourceFile": "FY2025 IPPS Final Rule Table 5.txt"},
    {"FY": "2026", "DRG": "024", "Weight": "3.9119", "Geometric_LOS": "3.7", "Arithmetic_LOS": "4.9", "Title": "CRANIOTOMY WITH MAJOR DEVICE IMPLANT OR ACUTE COMPLEX CNS PRINCIPAL DIAGNOSIS WITHOUT MCC", "SourceFile": "CMS-1833-F Table 5.txt"},
    {"FY": "2020", "DRG": "061", "Weight": "2.7935", "Geometric_LOS": "4.8", "Arithmetic_LOS": "6.2", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA W THROMBOLYTIC AGENT W MCC", "SourceFile": "CMS-1716-F Table 5.txt"},
    {"FY": "2021", "DRG": "061", "Weight": "2.8882", "Geometric_LOS": "4.7", "Arithmetic_LOS": "6.2", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH MCC", "SourceFile": "CMS-1735-FR Table 5.txt"},
    {"FY": "2022", "DRG": "061", "Weight": "2.8912", "Geometric_LOS": "4.7", "Arithmetic_LOS": "6.2", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH MCC", "SourceFile": "CMS-1752-F Table 5.txt"},
    {"FY": "2023", "DRG": "061", "Weight": "2.9326", "Geometric_LOS": "4.9", "Arithmetic_LOS": "6.6", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH MCC", "SourceFile": "CMS-1771-F Table 5.txt"},
    {"FY": "2024", "DRG": "061", "Weight": "2.8028", "Geometric_LOS": "5.0", "Arithmetic_LOS": "6.7", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH MCC", "SourceFile": "CMS-1785-F Table 5.txt"},
    {"FY": "2025", "DRG": "061", "Weight": "2.7032", "Geometric_LOS": "4.8", "Arithmetic_LOS": "6.4", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH MCC", "SourceFile": "FY2025 IPPS Final Rule Table 5.txt"},
    {"FY": "2026", "DRG": "061", "Weight": "2.7571", "Geometric_LOS": "4.7", "Arithmetic_LOS": "6.2", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH MCC", "SourceFile": "CMS-1833-F Table 5.txt"},
    {"FY": "2020", "DRG": "062", "Weight": "2.0112", "Geometric_LOS": "3.3", "Arithmetic_LOS": "3.8", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA W THROMBOLYTIC AGENT W CC", "SourceFile": "CMS-1716-F Table 5.txt"},
    {"FY": "2021", "DRG": "062", "Weight": "1.9872", "Geometric_LOS": "3.2", "Arithmetic_LOS": "3.7", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH CC", "SourceFile": "CMS-1735-FR Table 5.txt"},
    {"FY": "2022", "DRG": "062", "Weight": "1.9883", "Geometric_LOS": "3.2", "Arithmetic_LOS": "3.7", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH CC", "SourceFile": "CMS-1752-F Table 5.txt"},
    {"FY": "2023", "DRG": "062", "Weight": "1.9172", "Geometric_LOS": "3.2", "Arithmetic_LOS": "3.7", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH CC", "SourceFile": "CMS-1771-F Table 5.txt"},
    {"FY": "2024", "DRG": "062", "Weight": "1.8717", "Geometric_LOS": "3.2", "Arithmetic_LOS": "3.8", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH CC", "SourceFile": "CMS-1785-F Table 5.txt"},
    {"FY": "2025", "DRG": "062", "Weight": "1.7808", "Geometric_LOS": "3.1", "Arithmetic_LOS": "3.7", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH CC", "SourceFile": "FY2025 IPPS Final Rule Table 5.txt"},
    {"FY": "2026", "DRG": "062", "Weight": "1.7572", "Geometric_LOS": "3.0", "Arithmetic_LOS": "3.6", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITH CC", "SourceFile": "CMS-1833-F Table 5.txt"},
    {"FY": "2020", "DRG": "063", "Weight": "1.6808", "Geometric_LOS": "2.4", "Arithmetic_LOS": "2.7", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA W THROMBOLYTIC AGENT W/O CC/MCC", "SourceFile": "CMS-1716-F Table 5.txt"},
    {"FY": "2021", "DRG": "063", "Weight": "1.7099", "Geometric_LOS": "2.3", "Arithmetic_LOS": "2.6", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITHOUT CC/MCC", "SourceFile": "CMS-1735-FR Table 5.txt"},
    {"FY": "2022", "DRG": "063", "Weight": "1.7097", "Geometric_LOS": "2.3", "Arithmetic_LOS": "2.6", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITHOUT CC/MCC", "SourceFile": "CMS-1752-F Table 5.txt"},
    {"FY": "2023", "DRG": "063", "Weight": "1.5810", "Geometric_LOS": "2.3", "Arithmetic_LOS": "2.5", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITHOUT CC/MCC", "SourceFile": "CMS-1771-F Table 5.txt"},
    {"FY": "2024", "DRG": "063", "Weight": "1.4868", "Geometric_LOS": "2.2", "Arithmetic_LOS": "2.5", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITHOUT CC/MCC", "SourceFile": "CMS-1785-F Table 5.txt"},
    {"FY": "2025", "DRG": "063", "Weight": "1.4047", "Geometric_LOS": "2.2", "Arithmetic_LOS": "2.5", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITHOUT CC/MCC", "SourceFile": "FY2025 IPPS Final Rule Table 5.txt"},
    {"FY": "2026", "DRG": "063", "Weight": "1.4038", "Geometric_LOS": "2.2", "Arithmetic_LOS": "2.5", "Title": "ISCHEMIC STROKE, PRECEREBRAL OCCLUSION OR TRANSIENT ISCHEMIA WITH THROMBOLYTIC AGENT WITHOUT CC/MCC", "SourceFile": "CMS-1833-F Table 5.txt"},
]


SOURCES: List[Tuple[str, str, str]] = [
    ("[1]", "CMS New Medical Services and New Technologies (NTAP) page", "https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps/new-medical-services-and-new-technologies"),
    ("[2]", "FY 2027 NTAP application resources zip", "https://www.cms.gov/files/zip/fy2027ntapapplication-resources-reference-onlyzip.zip"),
    ("[3]", "MEARIS public resources", "https://mearis.cms.gov/public/resources"),
    ("[4]", "MEARIS public publications", "https://mearis.cms.gov/public/publications"),
    ("[5]", "Process for requesting new/revised ICD-10-PCS procedure codes", "https://www.cms.gov/medicare/coding-billing/icd-10-codes/process-for-requesting-new-revised-icd-10-pcs-procedure-codes"),
    ("[6]", "Acute Inpatient PPS landing page", "https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps"),
    ("[7]", "CMS guide for medical technology companies and other interested parties - IPPS", "https://www.cms.gov/cms-guide-medical-technology-companies-and-other-interested-parties/payment/ipps"),
    ("[8]", "CMS outlier payments page", "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/AcuteInpatientPPS/outlier.html"),
    ("[9]", "Physician Fee Schedule", "https://www.cms.gov/cms-guide-medical-technology-companies-and-other-interested-parties/payment/physician-fee-schedule"),
    ("[10]", "Prospective Payment Systems - General Information", "https://www.cms.gov/medicare/payment/prospective-payment-systems"),
    ("[11]", "FY 2026 ICD-10-PCS code tables and index zip", "https://www.cms.gov/files/zip/2026-icd-10-pcs-code-tables-and-index.zip"),
    ("[12]", "FY 2026 ICD-10-PCS codes file zip", "https://www.cms.gov/files/zip/2026-icd-10-pcs-codes-file.zip"),
    ("[13]", "FY 2020 IPPS Table 5 zip", "https://www.cms.gov/medicare/medicare-fee-for-service-payment/acuteinpatientpps/downloads/fy2020-fr-table-5.zip"),
    ("[14]", "FY 2021 IPPS Table 5 zip", "https://www.cms.gov/files/zip/fy-2021-ipps-fr-table-5.zip"),
    ("[15]", "FY 2022 IPPS Table 5 zip", "https://www.cms.gov/files/zip/fy2022-ipps-fr-table-5-fy-2022-ms-drgs-relative-weighting-factors-and-geometric-and-arithmetic-mean.zip"),
    ("[16]", "FY 2023 IPPS Table 5 zip", "https://www.cms.gov/files/zip/fy2023-ipps-fr-table-5.zip"),
    ("[17]", "FY 2024 IPPS Table 5 zip", "https://www.cms.gov/files/zip/fy2024-ipps-fr-table-5.zip"),
    ("[18]", "FY 2025 IPPS Table 5 zip", "https://www.cms.gov/files/zip/fy-2025-ipps-final-rule-table-5.zip"),
    ("[19]", "FY 2026 IPPS Table 5 zip", "https://www.cms.gov/files/zip/fy2026-ipps-fr-table-5.zip"),
    ("[20]", "JNIS 2023 thrombectomy trend analysis", "https://jnis.bmj.com/content/15/e3/e349"),
    ("[21]", "CMS SNF payment basics (post-acute separate PPS)", "https://www.cms.gov/Outreach-and-Education/Medicare-Learning-Network-MLN/MLNProducts/EnrollmentResources/provider-resources/snf/"),
    ("[22]", "CMS 3-day payment window (outpatient services rolled into inpatient Part A bill)", "https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps/three-day-payment-window"),
    ("[23]", "Open-access acute ischemic stroke cost reference", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11064842/"),
    ("[24]", "2026 Official ICD-10-PCS Coding Guidelines", "https://www.cms.gov/files/document/2026-official-icd-10-pcs-coding-guidelines.pdf"),
]


@dataclass
class ScenarioResult:
    name: str
    drg_payment: float
    technology_cost: float
    other_costs: float
    total_cost: float
    margin_no_ntap: float
    ntap_policy: float
    margin_with_ntap_policy: float
    ntap_simplified: float
    margin_with_ntap_simplified: float


def money(value: float) -> str:
    sign = "-" if value < 0 else ""
    return f"{sign}${abs(value):,.0f}"


def pct(value: float) -> str:
    return f"{value * 100:.1f}%"


def load_drg_rows() -> List[Dict[str, str]]:
    if not TMP_DRG_CSV.exists():
        return FALLBACK_DRG_ROWS
    with TMP_DRG_CSV.open(newline="") as f:
        return list(csv.DictReader(f))


def scenario_calc(name: str, drg_payment: float, technology_cost: float, other_costs: float, ntap_pct: float) -> ScenarioResult:
    total_cost = technology_cost + other_costs
    margin_no_ntap = drg_payment - total_cost
    excess = max(total_cost - drg_payment, 0.0)
    ntap_policy = min(technology_cost * ntap_pct, excess * ntap_pct)
    margin_with_policy = drg_payment + ntap_policy - total_cost
    ntap_simplified = min(technology_cost * ntap_pct, excess)
    margin_with_simplified = drg_payment + ntap_simplified - total_cost
    return ScenarioResult(
        name=name,
        drg_payment=drg_payment,
        technology_cost=technology_cost,
        other_costs=other_costs,
        total_cost=total_cost,
        margin_no_ntap=margin_no_ntap,
        ntap_policy=ntap_policy,
        margin_with_ntap_policy=margin_with_policy,
        ntap_simplified=ntap_simplified,
        margin_with_ntap_simplified=margin_with_simplified,
    )


def build_workbook(drg_rows: List[Dict[str, str]]) -> None:
    OUT_XLSX.parent.mkdir(parents=True, exist_ok=True)
    wb = Workbook()
    ws = wb.active
    ws.title = "Inputs"

    header_fill = PatternFill("solid", fgColor="1F4E78")
    header_font = Font(color="FFFFFF", bold=True)
    input_font = Font(color="0000FF")

    ws["A1"] = "NTAP Cost Model Inputs (Product X)"
    ws["A1"].font = Font(size=14, bold=True)
    ws.merge_cells("A1:D1")

    rows = [
        ("Technology price - low", 25000, "User assumption (question prompt)"),
        ("Technology price - mid", 35000, "User assumption (question prompt)"),
        ("Technology price - high", 50000, "User assumption (question prompt)"),
        ("DRG payment anchor - low", 30000, "Midpoint anchor from user-provided DRG ranges"),
        ("DRG payment anchor - high", 50000, "Upper anchor from user-provided DRG ranges"),
        ("MS-DRG 023 range low", 35000, "User assumption (question prompt)"),
        ("MS-DRG 023 range high", 50000, "User assumption (question prompt)"),
        ("MS-DRG 024 range low", 25000, "User assumption (question prompt)"),
        ("MS-DRG 024 range high", 35000, "User assumption (question prompt)"),
        ("Other facility costs (bundled DRG)", "=Episode_Cost_Breakdown!E11", "Linked bundled-facility subtotal from episode sheet"),
        ("Baseline LOS (days)", 7, "User assumption: baseline 6 to 8 days"),
        ("Baseline ICU days", 3, "User assumption: baseline 2 to 4 days"),
        ("NTAP percentage", 0.65, "CMS NTAP policy reference [1]"),
        ("Post-DRG payment scenario", 50000, "Illustrative post-reweighting payment anchor"),
    ]

    ws["A3"], ws["B3"], ws["C3"] = "Input", "Value", "Notes"
    for cell in ("A3", "B3", "C3"):
        ws[cell].fill = header_fill
        ws[cell].font = header_font

    r = 4
    for label, value, note in rows:
        ws[f"A{r}"] = label
        ws[f"B{r}"] = value
        ws[f"C{r}"] = note
        ws[f"B{r}"].font = input_font
        if label == "Other facility costs (bundled DRG)":
            ws[f"B{r}"].comment = Comment(
                "This pulls only bundled facility costs used in DRG margin calculations (ICU, routine floor, ancillary).",
                "Codex",
            )
        r += 1

    ws["B16"].number_format = "0.0%"
    for c in ("A", "B", "C"):
        ws.column_dimensions[c].width = 42 if c == "A" else (16 if c == "B" else 60)
    ws["B16"].comment = Comment("CMS states NTAP is generally limited to the lesser of 65% of technology cost or 65% of case excess over DRG [1].", "Codex")
    ws["B4"].comment = Comment("Assumption from user prompt.", "Codex")
    ws["B5"].comment = Comment("Assumption from user prompt.", "Codex")
    ws["B6"].comment = Comment("Assumption from user prompt.", "Codex")

    ws_ep = wb.create_sheet("Episode_Cost_Breakdown")
    ws_ep["A1"] = "Episode Cost Components - Classified"
    ws_ep["A1"].font = Font(size=13, bold=True)
    ws_ep.merge_cells("A1:E1")
    for cell, value in [("A3", "Category"), ("B3", "What it comes from"), ("C3", "How it is paid"), ("D3", "Illustrative math"), ("E3", "Amount")]:
        ws_ep[cell] = value
        ws_ep[cell].fill = header_fill
        ws_ep[cell].font = header_font
    ep_rows = [
        (
            "ICU / neuro-ICU monitoring, nursing, telemetry",
            "Intensive days cost center; 2-4 ICU days in the Product X materials, with ICU costs of roughly $3K-$5K per day.",
            "Bundled into the inpatient MS-DRG under IPPS; may be offset by an outlier payment if the case exceeds the fixed-loss threshold.",
            "3 days x $4,000/day",
            12000,
        ),
        (
            "Routine floor days, room and board, standard nursing",
            "Routine days cost center; the remainder of the 6-8 day hospital stay after ICU time.",
            "Bundled into the inpatient MS-DRG under IPPS; not a separate hospital line item.",
            "4 days x $1,250/day",
            5000,
        ),
        (
            "Ancillary hospital services, pharmacy, supplies, case management",
            "Imaging, labs, bag changes, supply handling, and discharge coordination described in the Product X materials.",
            "Bundled into the inpatient MS-DRG under IPPS.",
            "Illustrative residual allocation",
            3000,
        ),
        (
            "Physician professional services",
            "Hospitalist, neurologist, interventional and consult services.",
            "Paid separately under the Physician Fee Schedule / Part B.",
            "Episode-level component; outside hospital DRG margin",
            3500,
        ),
        (
            "Post-acute care after discharge",
            "SNF, IRF, HHA, LTCH services after the index stay.",
            "Paid under separate PPSs outside the index DRG.",
            "Episode-level component; outside hospital DRG margin",
            14000,
        ),
        (
            "Readmissions / ED revisit in 90-day window",
            "Unplanned post-discharge acute utilization attributable to recurrent events or complications.",
            "Paid as separate claims across facility/professional settings.",
            "Episode-level component; outside index DRG margin",
            6000,
        ),
        (
            "Long-term support and disability-related care (blended expected value)",
            "Expected-value allocation for custodial/supportive services in poor functional recovery states.",
            "Paid across post-acute and community support channels (payer-dependent).",
            "Episode-level component; outside index DRG margin",
            12000,
        ),
    ]
    ep_r = 4
    for a, b, c, d, e in ep_rows:
        ws_ep[f"A{ep_r}"] = a
        ws_ep[f"B{ep_r}"] = b
        ws_ep[f"C{ep_r}"] = c
        ws_ep[f"D{ep_r}"] = d
        ws_ep[f"E{ep_r}"] = e
        ws_ep[f"E{ep_r}"].number_format = "$#,##0"
        ep_r += 1
    ws_ep[f"D{ep_r}"] = "Bundled facility subtotal (used in DRG-margin scenarios)"
    ws_ep[f"E{ep_r}"] = "=SUM(E4:E6)"
    ws_ep[f"E{ep_r}"].number_format = "$#,##0"
    ep_r += 1
    ws_ep[f"D{ep_r}"] = "Non-facility subtotal (payer episode lens)"
    ws_ep[f"E{ep_r}"] = "=SUM(E7:E10)"
    ws_ep[f"E{ep_r}"].number_format = "$#,##0"
    ep_r += 1
    ws_ep[f"D{ep_r}"] = "Total non-drug episode costs"
    ws_ep[f"E{ep_r}"] = "=SUM(E4:E10)"
    ws_ep[f"E{ep_r}"].number_format = "$#,##0"
    ep_r += 1
    ws_ep[f"A{ep_r}"] = "Note"
    ws_ep[f"B{ep_r}"] = "DRG margin scenarios use only the bundled facility subtotal. Episode-total scenarios include professional, post-acute, readmission, and long-term support components to capture payer-visible spend."
    ws_ep[f"A{ep_r}"].font = Font(bold=True)
    ws_ep[f"B{ep_r}"].alignment = Alignment(wrap_text=True)
    for col, width in {"A": 38, "B": 60, "C": 48, "D": 24, "E": 14}.items():
        ws_ep.column_dimensions[col].width = width

    ws_no = wb.create_sheet("Scenario_No_NTAP")
    ws_no["A1"] = "Scenario 1 - No NTAP"
    ws_no["A1"].font = Font(size=13, bold=True)
    ws_no["A3"], ws_no["B3"] = "Metric", "Value"
    ws_no["A3"].fill = ws_no["B3"].fill = header_fill
    ws_no["A3"].font = ws_no["B3"].font = header_font
    no_rows = [
        ("DRG payment", "=Inputs!B7"),
        ("Product X cost", "=Inputs!B4"),
        ("Other costs", "=Inputs!B13"),
        ("Total cost", "=B5+B6"),
        ("Margin (no NTAP)", "=B4-B7"),
    ]
    rr = 4
    for label, formula in no_rows:
        ws_no[f"A{rr}"] = label
        ws_no[f"B{rr}"] = formula
        ws_no[f"B{rr}"].number_format = "$#,##0;[Red]($#,##0)"
        rr += 1
    ws_no["A9"] = "Interpretation"
    ws_no["B9"] = "Negative margin indicates full absorption by hospital under bundled DRG payment."
    ws_no["A9"].font = Font(bold=True)
    ws_no.column_dimensions["A"].width = 35
    ws_no.column_dimensions["B"].width = 70

    ws_ntap = wb.create_sheet("Scenario_NTAP")
    ws_ntap["A1"] = "Scenario 2 - NTAP Bridge"
    ws_ntap["A1"].font = Font(size=13, bold=True)
    ws_ntap["A3"], ws_ntap["B3"], ws_ntap["C3"] = "Metric", "Policy-Consistent", "Simplified Planning"
    for cell in ("A3", "B3", "C3"):
        ws_ntap[cell].fill = header_fill
        ws_ntap[cell].font = header_font
    ntap_rows = [
        ("DRG payment", "=Inputs!B7", "=Inputs!B7"),
        ("Product X cost", "=Inputs!B4", "=Inputs!B4"),
        ("Other costs", "=Inputs!B13", "=Inputs!B13"),
        ("Total cost", "=B5+B6", "=C5+C6"),
        ("NTAP amount", "=MIN(B5*Inputs!B16,MAX(B7-B4,0)*Inputs!B16)", "=MIN(C5*Inputs!B16,MAX(C7-C4,0))"),
        ("Margin after NTAP", "=B4+B8-B7", "=C4+C8-C7"),
    ]
    rr = 4
    for label, f1, f2 in ntap_rows:
        ws_ntap[f"A{rr}"] = label
        ws_ntap[f"B{rr}"] = f1
        ws_ntap[f"C{rr}"] = f2
        ws_ntap[f"B{rr}"].number_format = "$#,##0;[Red]($#,##0)"
        ws_ntap[f"C{rr}"].number_format = "$#,##0;[Red]($#,##0)"
        rr += 1
    ws_ntap["A11"] = "Note"
    ws_ntap["B11"] = "Policy-consistent formula follows CMS language in [1]."
    ws_ntap["C11"] = "Simplified planning formula mirrors common market shorthand."
    ws_ntap["A11"].font = Font(bold=True)
    ws_ntap.column_dimensions["A"].width = 30
    ws_ntap.column_dimensions["B"].width = 38
    ws_ntap.column_dimensions["C"].width = 38

    ws_post = wb.create_sheet("Scenario_Post_DRG")
    ws_post["A1"] = "Scenario 3 - Post-NTAP / DRG Reweighting"
    ws_post["A1"].font = Font(size=13, bold=True)
    ws_post["A3"], ws_post["B3"] = "Metric", "Value"
    ws_post["A3"].fill = ws_post["B3"].fill = header_fill
    ws_post["A3"].font = ws_post["B3"].font = header_font
    post_rows = [
        ("DRG payment", "=Inputs!B17"),
        ("Product X cost", "=Inputs!B4"),
        ("Other costs", "=Inputs!B13"),
        ("Total cost", "=B5+B6"),
        ("Margin", "=B4-B7"),
    ]
    rr = 4
    for label, formula in post_rows:
        ws_post[f"A{rr}"] = label
        ws_post[f"B{rr}"] = formula
        ws_post[f"B{rr}"].number_format = "$#,##0;[Red]($#,##0)"
        rr += 1
    ws_post.column_dimensions["A"].width = 35
    ws_post.column_dimensions["B"].width = 32

    ws_episode = wb.create_sheet("Episode_Total_Care")
    ws_episode["A1"] = "Whole-Episode Spend Model (Payer Lens)"
    ws_episode["A1"].font = Font(size=13, bold=True)
    ws_episode.merge_cells("A1:D1")

    ws_episode["A3"], ws_episode["B3"] = "Assumption", "Value"
    ws_episode["A3"].fill = ws_episode["B3"].fill = header_fill
    ws_episode["A3"].font = ws_episode["B3"].font = header_font
    ep_assumptions = [
        ("Base scenario: physician spend reduction", 0.20),
        ("Base scenario: post-acute spend reduction", 0.40),
        ("Base scenario: readmission/ED spend reduction", 0.30),
        ("Base scenario: long-term support reduction", 0.50),
    ]
    rr = 4
    for label, value in ep_assumptions:
        ws_episode[f"A{rr}"] = label
        ws_episode[f"B{rr}"] = value
        ws_episode[f"B{rr}"].number_format = "0.0%"
        ws_episode[f"B{rr}"].font = input_font
        rr += 1

    ws_episode["A9"], ws_episode["B9"], ws_episode["C9"], ws_episode["D9"] = "Component", "Baseline (No Product X)", "With Product X + NTAP Bridge", "Delta"
    for cell in ("A9", "B9", "C9", "D9"):
        ws_episode[cell].fill = header_fill
        ws_episode[cell].font = header_font

    ep_component_rows = [
        ("Index inpatient payment", "=Inputs!B7", "=Inputs!B7+MIN(Inputs!B4*Inputs!B16,MAX((Inputs!B4+Inputs!B13)-Inputs!B7,0)*Inputs!B16)"),
        ("Physician professional services", "=Episode_Cost_Breakdown!E7", "=ROUND(B11*(1-$B$4),0)"),
        ("Post-acute care", "=Episode_Cost_Breakdown!E8", "=ROUND(B12*(1-$B$5),0)"),
        ("Readmission and ED revisit", "=Episode_Cost_Breakdown!E9", "=ROUND(B13*(1-$B$6),0)"),
        ("Long-term support / disability-related care", "=Episode_Cost_Breakdown!E10", "=ROUND(B14*(1-$B$7),0)"),
    ]
    rr = 10
    for label, baseline_formula, with_formula in ep_component_rows:
        ws_episode[f"A{rr}"] = label
        ws_episode[f"B{rr}"] = baseline_formula
        ws_episode[f"C{rr}"] = with_formula
        ws_episode[f"D{rr}"] = f"=C{rr}-B{rr}"
        for col in ("B", "C", "D"):
            ws_episode[f"{col}{rr}"].number_format = "$#,##0;[Red]($#,##0)"
        rr += 1
    ws_episode[f"A{rr}"] = "Total payer-visible episode spend"
    ws_episode[f"B{rr}"] = "=SUM(B10:B14)"
    ws_episode[f"C{rr}"] = "=SUM(C10:C14)"
    ws_episode[f"D{rr}"] = f"=C{rr}-B{rr}"
    ws_episode[f"A{rr}"].font = Font(bold=True)
    for col in ("B", "C", "D"):
        ws_episode[f"{col}{rr}"].number_format = "$#,##0;[Red]($#,##0)"
        ws_episode[f"{col}{rr}"].font = Font(bold=True)
    ws_episode["A17"] = "Interpretation"
    ws_episode["B17"] = "Base scenario only. Use Episode_Scenarios sheet for conservative/base/optimistic sensitivity."
    ws_episode["A17"].font = Font(bold=True)
    ws_episode.column_dimensions["A"].width = 46
    ws_episode.column_dimensions["B"].width = 24
    ws_episode.column_dimensions["C"].width = 30
    ws_episode.column_dimensions["D"].width = 14

    ws_sens = wb.create_sheet("Sensitivity")
    ws_sens["A1"] = "Sensitivity Grid - Margin Without NTAP"
    ws_sens["A1"].font = Font(size=13, bold=True)
    drg_values = [30000, 40000, 50000]
    prices = [25000, 35000, 50000]
    ws_sens["A3"] = "Price \\ DRG"
    ws_sens["A3"].fill = header_fill
    ws_sens["A3"].font = header_font
    for i, d in enumerate(drg_values, start=2):
        ws_sens.cell(row=3, column=i, value=d)
        ws_sens.cell(row=3, column=i).fill = header_fill
        ws_sens.cell(row=3, column=i).font = header_font
        ws_sens.cell(row=3, column=i).number_format = "$#,##0"
    for r_i, p in enumerate(prices, start=4):
        ws_sens.cell(row=r_i, column=1, value=p)
        ws_sens.cell(row=r_i, column=1).fill = PatternFill("solid", fgColor="D9E1F2")
        ws_sens.cell(row=r_i, column=1).font = Font(bold=True)
        ws_sens.cell(row=r_i, column=1).number_format = "$#,##0"
        for c_i, _ in enumerate(drg_values, start=2):
            drg_cell = ws_sens.cell(row=3, column=c_i).coordinate
            price_cell = ws_sens.cell(row=r_i, column=1).coordinate
            ws_sens.cell(row=r_i, column=c_i, value=f"={drg_cell}-({price_cell}+Inputs!B13)")
            ws_sens.cell(row=r_i, column=c_i).number_format = "$#,##0;[Red]($#,##0)"

    ws_sens["A8"] = "Sensitivity Grid - Margin With Policy-Consistent NTAP"
    ws_sens["A8"].font = Font(size=13, bold=True)
    ws_sens["A10"] = "Price \\ DRG"
    ws_sens["A10"].fill = header_fill
    ws_sens["A10"].font = header_font
    for i, d in enumerate(drg_values, start=2):
        ws_sens.cell(row=10, column=i, value=d)
        ws_sens.cell(row=10, column=i).fill = header_fill
        ws_sens.cell(row=10, column=i).font = header_font
        ws_sens.cell(row=10, column=i).number_format = "$#,##0"
    for r_i, p in enumerate(prices, start=11):
        ws_sens.cell(row=r_i, column=1, value=p)
        ws_sens.cell(row=r_i, column=1).fill = PatternFill("solid", fgColor="D9E1F2")
        ws_sens.cell(row=r_i, column=1).font = Font(bold=True)
        ws_sens.cell(row=r_i, column=1).number_format = "$#,##0"
        for c_i, _ in enumerate(drg_values, start=2):
            drg_cell = ws_sens.cell(row=10, column=c_i).coordinate
            price_cell = ws_sens.cell(row=r_i, column=1).coordinate
            total_expr = f"({price_cell}+Inputs!B13)"
            ntap_expr = f"MIN({price_cell}*Inputs!B16,MAX({total_expr}-{drg_cell},0)*Inputs!B16)"
            ws_sens.cell(row=r_i, column=c_i, value=f"={drg_cell}+{ntap_expr}-{total_expr}")
            ws_sens.cell(row=r_i, column=c_i).number_format = "$#,##0;[Red]($#,##0)"
    ws_sens.column_dimensions["A"].width = 26
    ws_sens.column_dimensions["B"].width = 16
    ws_sens.column_dimensions["C"].width = 16
    ws_sens.column_dimensions["D"].width = 16

    by_year: Dict[int, Dict[str, float]] = {}
    for row in drg_rows:
        by_year.setdefault(int(row["FY"]), {})[row["DRG"]] = float(row["Weight"])

    ws_trend = wb.create_sheet("DRG_Weights_Trend")
    ws_trend["A1"] = "Stroke/EVT-Related MS-DRG Relative Weights (FY2020 to FY2026)"
    ws_trend["A1"].font = Font(size=13, bold=True)
    ws_trend.merge_cells("A1:G1")
    trend_headers = ["FY", "023", "024", "061", "062", "063", "Source"]
    for c, h in enumerate(trend_headers, start=1):
        ws_trend.cell(row=3, column=c, value=h)
        ws_trend.cell(row=3, column=c).fill = header_fill
        ws_trend.cell(row=3, column=c).font = header_font

    source_ref = {2020: "[13]", 2021: "[14]", 2022: "[15]", 2023: "[16]", 2024: "[17]", 2025: "[18]", 2026: "[19]"}
    for r, fy in enumerate([2020, 2021, 2022, 2023, 2024, 2025, 2026], start=4):
        ws_trend.cell(row=r, column=1, value=fy)
        for c, drg in enumerate(["023", "024", "061", "062", "063"], start=2):
            ws_trend.cell(row=r, column=c, value=by_year[fy][drg])
            ws_trend.cell(row=r, column=c).number_format = "0.0000"
        ws_trend.cell(row=r, column=7, value=source_ref[fy])
    for col, width in [("A", 10), ("B", 11), ("C", 11), ("D", 11), ("E", 11), ("F", 11), ("G", 10)]:
        ws_trend.column_dimensions[col].width = width

    ws_yoy = wb.create_sheet("DRG_YoY_Change")
    ws_yoy["A1"] = "Annual YoY Change by DRG (FY2021 to FY2026)"
    ws_yoy["A1"].font = Font(size=13, bold=True)
    ws_yoy.merge_cells("A1:G1")
    yoy_headers = ["FY", "023", "024", "061", "062", "063", "Source"]
    for c, h in enumerate(yoy_headers, start=1):
        ws_yoy.cell(row=3, column=c, value=h)
        ws_yoy.cell(row=3, column=c).fill = header_fill
        ws_yoy.cell(row=3, column=c).font = header_font
    for r, fy in enumerate([2021, 2022, 2023, 2024, 2025, 2026], start=4):
        ws_yoy.cell(row=r, column=1, value=fy)
        for c, drg in enumerate(["023", "024", "061", "062", "063"], start=2):
            ws_yoy.cell(row=r, column=c, value=(by_year[fy][drg] / by_year[fy - 1][drg]) - 1.0)
            ws_yoy.cell(row=r, column=c).number_format = "0.0%"
        ws_yoy.cell(row=r, column=7, value=source_ref[fy])
    for col, width in [("A", 10), ("B", 11), ("C", 11), ("D", 11), ("E", 11), ("F", 11), ("G", 10)]:
        ws_yoy.column_dimensions[col].width = width

    ws_def = wb.create_sheet("DRG_Definitions")
    ws_def["A1"] = "DRG Definitions Used in Stroke/EVT Modeling (FY 2026 titles)"
    ws_def["A1"].font = Font(size=13, bold=True)
    ws_def.merge_cells("A1:C1")
    ws_def["A3"], ws_def["B3"], ws_def["C3"] = "DRG", "FY 2026 title", "Source"
    for cell in ("A3", "B3", "C3"):
        ws_def[cell].fill = header_fill
        ws_def[cell].font = header_font
    title_lookup: Dict[str, str] = {}
    for row in drg_rows:
        if int(row["FY"]) == 2026:
            title_lookup[row["DRG"]] = row["Title"]
    rr = 4
    for drg in ["023", "024", "061", "062", "063"]:
        ws_def[f"A{rr}"] = drg
        ws_def[f"B{rr}"] = title_lookup.get(drg, "")
        ws_def[f"C{rr}"] = "[19]"
        rr += 1
    ws_def["A10"] = "Note"
    ws_def["B10"] = "DRGs listed here are directional comparators for payment-adequacy analysis, not a final Product X grouping determination."
    ws_def["A10"].font = Font(bold=True)
    ws_def["B10"].alignment = Alignment(wrap_text=True)
    ws_def.column_dimensions["A"].width = 10
    ws_def.column_dimensions["B"].width = 90
    ws_def.column_dimensions["C"].width = 10
    for row in ws_def.iter_rows(min_row=4, max_row=rr - 1, min_col=1, max_col=3):
        for cell in row:
            cell.alignment = Alignment(vertical="top", wrap_text=True)

    ws_prices = wb.create_sheet("Price_Ladder")
    ws_prices["A1"] = "Price Ladder: DRG Margin and Whole-Episode Spend"
    ws_prices["A1"].font = Font(size=13, bold=True)
    ws_prices.merge_cells("A1:H1")
    ws_prices["A3"], ws_prices["B3"], ws_prices["C3"], ws_prices["D3"], ws_prices["E3"], ws_prices["F3"], ws_prices["G3"], ws_prices["H3"] = (
        "Product X Price",
        "DRG Margin (No NTAP)",
        "NTAP Amount",
        "DRG Margin (With NTAP)",
        "Baseline Episode Spend",
        "Episode Spend (With Product + NTAP)",
        "Episode Delta",
        "Interpretation",
    )
    for cell in ("A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3"):
        ws_prices[cell].fill = header_fill
        ws_prices[cell].font = header_font
    prices = [25000, 35000, 50000]
    rr = 4
    for price in prices:
        ws_prices[f"A{rr}"] = price
        ws_prices[f"B{rr}"] = f"=Inputs!B7-({price}+Inputs!B13)"
        ws_prices[f"C{rr}"] = f"=MIN({price}*Inputs!B16,MAX(({price}+Inputs!B13)-Inputs!B7,0)*Inputs!B16)"
        ws_prices[f"D{rr}"] = f"=Inputs!B7+C{rr}-({price}+Inputs!B13)"
        ws_prices[f"E{rr}"] = "=Inputs!B7+Episode_Cost_Breakdown!E7+Episode_Cost_Breakdown!E8+Episode_Cost_Breakdown!E9+Episode_Cost_Breakdown!E10"
        ws_prices[f"F{rr}"] = (
            f"=Inputs!B7+C{rr}+ROUND(Episode_Cost_Breakdown!E7*(1-Episode_Total_Care!B4),0)"
            f"+ROUND(Episode_Cost_Breakdown!E8*(1-Episode_Total_Care!B5),0)"
            f"+ROUND(Episode_Cost_Breakdown!E9*(1-Episode_Total_Care!B6),0)"
            f"+ROUND(Episode_Cost_Breakdown!E10*(1-Episode_Total_Care!B7),0)"
        )
        ws_prices[f"G{rr}"] = f"=F{rr}-E{rr}"
        ws_prices[f"H{rr}"] = "Negative episode delta = total episode savings"
        for col in ("A", "B", "C", "D", "E", "F", "G"):
            ws_prices[f"{col}{rr}"].number_format = "$#,##0;[Red]($#,##0)"
        rr += 1
    ws_prices["A8"] = "Assumption note"
    ws_prices["B8"] = "Price ladder uses the Base scenario from Episode_Scenarios. Optimistic long-term support avoidance is modeled sensitivity, not guaranteed outcome."
    ws_prices["A8"].font = Font(bold=True)
    ws_prices["B8"].alignment = Alignment(wrap_text=True)
    ws_prices.column_dimensions["A"].width = 18
    ws_prices.column_dimensions["B"].width = 18
    ws_prices.column_dimensions["C"].width = 14
    ws_prices.column_dimensions["D"].width = 19
    ws_prices.column_dimensions["E"].width = 20
    ws_prices.column_dimensions["F"].width = 30
    ws_prices.column_dimensions["G"].width = 14
    ws_prices.column_dimensions["H"].width = 34

    ws_scenarios = wb.create_sheet("Episode_Scenarios")
    ws_scenarios["A1"] = "Episode Savings Scenarios (Conservative / Base / Optimistic)"
    ws_scenarios["A1"].font = Font(size=13, bold=True)
    ws_scenarios.merge_cells("A1:I1")
    headers = ["Scenario", "Physician Reduction", "Post-Acute Reduction", "Readmission Reduction", "Long-Term Support Reduction", "Episode Delta @ $25K", "Episode Delta @ $35K", "Episode Delta @ $50K", "Notes"]
    for c, h in enumerate(headers, start=1):
        ws_scenarios.cell(row=3, column=c, value=h)
        ws_scenarios.cell(row=3, column=c).fill = header_fill
        ws_scenarios.cell(row=3, column=c).font = header_font
    scenario_rows = [
        ("Conservative", 0.10, 0.20, 0.15, 0.25, "Modest utilization shift"),
        ("Base", 0.20, 0.40, 0.30, 0.50, "Moderate utilization and discharge shift"),
        ("Optimistic", 0.30, 0.70, 0.60, 1.00, "Long-term support modeled as full avoidance"),
    ]
    rr = 4
    for name, phys, post, readm, lts, note in scenario_rows:
        ws_scenarios[f"A{rr}"] = name
        ws_scenarios[f"B{rr}"] = phys
        ws_scenarios[f"C{rr}"] = post
        ws_scenarios[f"D{rr}"] = readm
        ws_scenarios[f"E{rr}"] = lts
        baseline_expr = "(Inputs!B7+Episode_Cost_Breakdown!E7+Episode_Cost_Breakdown!E8+Episode_Cost_Breakdown!E9+Episode_Cost_Breakdown!E10)"
        downstream_expr = (
            f"(ROUND(Episode_Cost_Breakdown!E7*(1-B{rr}),0)"
            f"+ROUND(Episode_Cost_Breakdown!E8*(1-C{rr}),0)"
            f"+ROUND(Episode_Cost_Breakdown!E9*(1-D{rr}),0)"
            f"+ROUND(Episode_Cost_Breakdown!E10*(1-E{rr}),0))"
        )
        for col, price in [("F", 25000), ("G", 35000), ("H", 50000)]:
            ntap_expr = f"MIN({price}*Inputs!B16,MAX(({price}+Inputs!B13)-Inputs!B7,0)*Inputs!B16)"
            with_expr = f"(Inputs!B7+{ntap_expr}+{downstream_expr})"
            ws_scenarios[f"{col}{rr}"] = f"={with_expr}-{baseline_expr}"
        ws_scenarios[f"I{rr}"] = note
        for col in ("B", "C", "D", "E"):
            ws_scenarios[f"{col}{rr}"].number_format = "0.0%"
            ws_scenarios[f"{col}{rr}"].font = input_font
        for col in ("F", "G", "H"):
            ws_scenarios[f"{col}{rr}"].number_format = "$#,##0;[Red]($#,##0)"
        rr += 1
    ws_scenarios.column_dimensions["A"].width = 16
    ws_scenarios.column_dimensions["B"].width = 16
    ws_scenarios.column_dimensions["C"].width = 17
    ws_scenarios.column_dimensions["D"].width = 18
    ws_scenarios.column_dimensions["E"].width = 24
    ws_scenarios.column_dimensions["F"].width = 18
    ws_scenarios.column_dimensions["G"].width = 18
    ws_scenarios.column_dimensions["H"].width = 18
    ws_scenarios.column_dimensions["I"].width = 40

    ws_src = wb.create_sheet("Sources")
    ws_src["A1"] = "Public Sources Used"
    ws_src["A1"].font = Font(size=13, bold=True)
    ws_src["A3"], ws_src["B3"], ws_src["C3"] = "Ref", "Topic", "URL"
    for c in ("A3", "B3", "C3"):
        ws_src[c].fill = header_fill
        ws_src[c].font = header_font
    rr = 4
    for ref, topic, url in SOURCES:
        ws_src[f"A{rr}"] = ref
        ws_src[f"B{rr}"] = topic
        ws_src[f"C{rr}"] = url
        ws_src[f"C{rr}"].font = Font(color="0563C1", underline="single")
        rr += 1
    ws_src.column_dimensions["A"].width = 8
    ws_src.column_dimensions["B"].width = 48
    ws_src.column_dimensions["C"].width = 120
    for row in ws_src.iter_rows(min_row=4, max_row=rr - 1, min_col=1, max_col=3):
        for cell in row:
            cell.alignment = Alignment(vertical="top", wrap_text=True)

    wb.save(OUT_XLSX)


def build_pdf(drg_rows: List[Dict[str, str]]) -> None:
    OUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    styles = getSampleStyleSheet()
    body = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10,
        leading=13,
        spaceAfter=6,
    )
    heading = ParagraphStyle("Heading", parent=styles["Heading2"], fontName="Helvetica-Bold", spaceAfter=6, spaceBefore=10)
    subheading = ParagraphStyle("SubHeading", parent=styles["Heading3"], fontName="Helvetica-Bold", spaceAfter=4, spaceBefore=8)
    cell_text = ParagraphStyle("CellText", parent=body, fontName="Helvetica", fontSize=7, leading=8, spaceAfter=0)

    def c(text: str) -> Paragraph:
        return Paragraph(escape(text), cell_text)

    story: List = []
    story.append(Paragraph("NTAP, Coding, and DRG Analysis with Cost Scenarios", styles["Title"]))
    story.append(Paragraph("Prepared for direct client use. Facts are source-backed; inferences are clearly labeled.", body))
    story.append(Spacer(1, 6))

    story.append(Paragraph("1) NTAP Submission Form / Template", heading))
    story.append(Paragraph(
        "CMS does not accept NTAP applications by email or offline form. Applications are submitted through MEARIS only. "
        "For offline preparation, CMS publishes FY-specific reference materials (application overviews, cost workbook templates, and tracking forms) in the FY 2027 NTAP resources package. [1][2][3]",
        body,
    ))
    story.append(Paragraph(
        "Practical answer: use the FY 2027 resource package as the closest sample template, but treat MEARIS as the operative submission system. [2][3]",
        body,
    ))

    story.append(Paragraph("2) ICD-10-PCS Section X (New Technology) Coding Mechanics", heading))
    story.append(Paragraph(
        "Fact: In this context, 'X code' refers to ICD-10-PCS Section X new technology coding, not HCPCS/CPT Part B X modifiers. [24]",
        body,
    ))
    story.append(Paragraph(
        "Fact: CMS coding guidance treats Section X as the framework for describing qualifying new technology procedures in the inpatient coding environment. [24]",
        body,
    ))
    story.append(Paragraph(
        "Inference: The relevant question for Product X is whether it can be distinctly identified on the inpatient claim through an ICD-10-PCS strategy, "
        "not whether a specific existing Section X code already applies today. [1][7][24]",
        body,
    ))

    story.append(Paragraph("3) NTAP Pathway and Interim Market Behavior (Stroke/EVT Context)", heading))
    timeline_data = [
        ["Milestone", "Typical FY 2027 Timing", "Source"],
        ["Application submission (MEARIS)", "October 2025 cycle dates", "[1]"],
        ["Town Hall (SCI discussion)", "December 2025", "[1]"],
        ["Supplemental info deadline", "December 15, 2025", "[1]"],
        ["Proposed rule discussion", "April 2026 window", "[1]"],
        ["FDA authorization deadline", "May 1, 2026", "[1]"],
        ["Final rule", "August 1, 2026", "[1]"],
        ["NTAP effective date", "October 1, 2026", "[1]"],
    ]
    t = Table(timeline_data, colWidths=[170, 210, 60])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(t)
    story.append(Paragraph(
        "Inference: Between launch and NTAP activation, hospitals usually face a budget-exposure period because incremental technology cost is carried inside fixed DRG reimbursement. "
        "This often leads to selective use in early adoption windows until payment alignment improves.",
        body,
    ))
    story.append(Paragraph(
        "Inference: A DRG update is a plausible pathway contingent on distinct inpatient claim identification, sufficient claim experience, and a durable cost signal.",
        body,
    ))

    story.append(Paragraph("4) EVT Trends and DRG Impact (2020 onward)", heading))
    story.append(Paragraph(
        "Fact: The relevant DRG landing zone for Product X remains case-definition dependent and must be validated against actual ICD-10-CM/PCS coding logic and grouper results. "
        "The DRGs discussed here are directional comparators for payment adequacy analysis, not a final grouping determination.",
        body,
    ))
    story.append(Paragraph(
        "Fact: CMS Table 5 files show annual DRG relative-weight updates for stroke-related DRGs. The table below anchors FY2020 to FY2026 changes. [13]-[19]",
        body,
    ))

    # Prepare weight summary
    by_drg: Dict[str, Dict[int, float]] = {}
    for row in drg_rows:
        drg = row["DRG"]
        by_drg.setdefault(drg, {})[int(row["FY"])] = float(row["Weight"])
    years = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
    trend_table = [["DRG"] + [f"FY{year}" for year in years]]
    for drg in ["023", "024", "061", "062", "063"]:
        trend_table.append([drg] + [f"{by_drg[drg][year]:.4f}" for year in years])
    t2 = Table(trend_table, colWidths=[40] + [66] * len(years))
    t2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(t2)
    story.append(Spacer(1, 0.08 * inch))
    drg_def_map: Dict[str, str] = {}
    for row in drg_rows:
        if int(row["FY"]) == 2026 and row["DRG"] in {"023", "024", "061", "062", "063"}:
            drg_def_map[row["DRG"]] = row["Title"]
    def_table = [["DRG", "Definition (FY 2026 title)", "Comparator role in this model"]]
    for drg in ["023", "024", "061", "062", "063"]:
        role = "High-acuity neuro inpatient comparator" if drg in {"023", "024"} else "Thrombolytic stroke comparator"
        def_table.append([drg, drg_def_map.get(drg, ""), role])
    t2_defs = Table(def_table, colWidths=[42, 352, 136], repeatRows=1)
    t2_defs.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#3A6073")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(Paragraph("DRG definitions and comparator roles used in this analysis", subheading))
    story.append(t2_defs)
    story.append(Spacer(1, 0.06 * inch))

    yoy_table = [["DRG"] + [f"{years[i-1]}->{years[i]}" for i in range(1, len(years))]]
    for drg in ["023", "024", "061", "062", "063"]:
        yoy_row = [drg]
        for i in range(1, len(years)):
            yoy = (by_drg[drg][years[i]] / by_drg[drg][years[i - 1]] - 1.0) * 100.0
            yoy_row.append(f"{yoy:+.1f}%")
        yoy_table.append(yoy_row)
    t2b = Table(yoy_table, colWidths=[40] + [72] * (len(years) - 1))
    t2b.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#284B63")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(Paragraph("Year-over-year change", heading))
    story.append(t2b)
    story.append(Spacer(1, 0.06 * inch))
    story.append(Paragraph(
        "Inference: The pattern is not a single directional step-change. These are annual relative weights, not payment rates, and they should be interpreted as directional context rather than definitive Product X grouping evidence.",
        body,
    ))
    story.append(Paragraph(
        "Fact: A public JNIS analysis through 2021 reported a flattening growth curve in U.S. mechanical thrombectomy procedure counts versus earlier rapid expansion. [20]",
        body,
    ))

    story.append(Paragraph("Other Episode Costs and Payment Classification", heading))
    story.append(Paragraph(
        "Fact: The model separates bundled inpatient facility costs from the full-episode spending components payers track across the care continuum. "
        "The first three lines are the bundled DRG-margin bucket ($20,000 subtotal); the remaining lines are non-facility episode costs outside the index DRG. [6][7][9][21]",
        body,
    ))
    other_costs_table = [
        ["Bucket", "Where it comes from", "How it is paid", "Baseline amount"],
        [
            c("ICU / neuro-ICU monitoring, nursing, telemetry"),
            c("2-4 ICU days and high-intensity nursing/monitoring in the attached Product X materials."),
            c("Bundled in MS-DRG facility payment under IPPS (with possible outlier support for very high-cost cases)."),
            c("$12,000"),
        ],
        [
            c("Routine floor days, room and board, standard nursing"),
            c("Remaining non-ICU days in a 6-8 day typical stay."),
            c("Bundled into the inpatient MS-DRG under IPPS; not a separate hospital line item."),
            c("$5,000"),
        ],
        [
            c("Ancillary hospital services, pharmacy, supplies, case management"),
            c("Imaging, labs, pharmacy workflow, consumables, and discharge planning."),
            c("Bundled into the inpatient MS-DRG under IPPS."),
            c("$3,000"),
        ],
        [
            c("Physician professional services"),
            c("Neurology/interventional/professional claims during stay."),
            c("Paid separately under the Physician Fee Schedule / Part B."),
            c("$3,500"),
        ],
        [
            c("Post-acute care after discharge"),
            c("SNF/IRF/home health/LTCH after discharge."),
            c("Paid under separate PPSs outside the index DRG."),
            c("$14,000"),
        ],
        [
            c("Readmission and ED revisit (90-day window)"),
            c("Unplanned post-discharge acute utilization and revisit burden."),
            c("Paid as separate claims outside the index DRG."),
            c("$6,000"),
        ],
        [
            c("Long-term support/disability-related care (expected value)"),
            c("Blended expected-value allocation for long-term support in poor recovery states."),
            c("Paid across post-acute and community support channels (payer-dependent)."),
            c("$12,000"),
        ],
    ]
    t2c = Table(other_costs_table, colWidths=[108, 142, 186, 90])
    t2c.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EFF5FD")]),
        ("ALIGN", (3, 1), (3, -1), "RIGHT"),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.8),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(t2c)
    story.append(Paragraph(
        "Inference: Inpatient DRG-margin modeling should use only the bundled facility subtotal. "
        "Commercial and total-cost-of-care decisions should use the full episode view, including professional, post-acute, readmission, and long-term support spend.",
        body,
    ))
    story.append(Paragraph(
        "Fact: CMS's 3-day payment-window policy also requires certain outpatient diagnostic and admission-related services furnished immediately prior to admission to be included on the inpatient Part A bill, reinforcing that these costs flow into the inpatient facility payment context. [22]",
        body,
    ))
    story.append(Paragraph(
        "Fact: Sponsor materials on file tie the operating burden to a 48-hour infusion, ICU-level monitoring, repeated bag changes, and pharmacy coordination, and they provide the inpatient-day and ICU-day planning anchors used here. [23]",
        body,
    ))
    obs = ListFlowable(
        [
            ListItem(Paragraph("023 is essentially flat across the window, with the only dip occurring in FY2024 and partial recovery thereafter.", body)),
            ListItem(Paragraph("024 declines in FY2024 and then posts the strongest FY2026 rebound among the five DRGs.", body)),
            ListItem(Paragraph("061 peaks in FY2023 and then softens through FY2025 before a modest FY2026 recovery.", body)),
            ListItem(Paragraph("062 and 063 show the clearest multi-year erosion, which is the strongest signal that the stroke mix is not static.", body)),
            ListItem(Paragraph("The effect is drift, not collapse: DRG weights move within a narrow band, which matters for reimbursement timing even when the clinical case mix is changing.", body)),
        ],
        bulletType="bullet",
        leftPadding=11,
        bulletFontName="Helvetica",
        bulletFontSize=7,
    )
    story.append(obs)

    story.append(Paragraph("5) Economic Frameworks", heading))
    story.append(Paragraph("Hospital Adoption Economics (MS-DRG / NTAP)", subheading))
    prices = [25000, 35000, 50000]
    drg_no_ntap = [scenario_calc(f"Price {money(p)} no NTAP", 30000, p, 20000, 0.0) for p in prices]
    drg_with_ntap = [scenario_calc(f"Price {money(p)} with NTAP", 30000, p, 20000, 0.65) for p in prices]
    drg_post = [scenario_calc(f"Price {money(p)} post-DRG", 50000, p, 20000, 0.0) for p in prices]

    sc_data = [["Product X price", "DRG payment", "Bundled facility cost", "No NTAP margin", "NTAP amount", "DRG margin with NTAP", "Post-DRG margin ($50K DRG)"]]
    for idx, price in enumerate(prices):
        sc_data.append([money(price), money(30000), money(20000), money(drg_no_ntap[idx].margin_no_ntap), money(drg_with_ntap[idx].ntap_policy), money(drg_with_ntap[idx].margin_with_ntap_policy), money(drg_post[idx].margin_no_ntap)])
    t3 = Table(sc_data, colWidths=[82, 62, 88, 75, 65, 86, 80])
    t3.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.7),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(t3)
    story.append(Paragraph("Modeled NTAP = lesser of: (a) 65% x Product X cost, or (b) 65% x (total case cost - MS-DRG payment).", body))
    story.append(Paragraph("Worked example (Product X = $25,000): total case cost = $45,000, DRG payment = $30,000, excess cost = $15,000. 65% x product cost = $16,250; 65% x excess cost = $9,750; therefore NTAP = $9,750.", body))
    story.append(Paragraph("Inference: Clinical value does not by itself remove adoption friction. The hospital adoption constraint remains DRG-margin pressure during the early period.", body))

    story.append(Paragraph("Payer Full-Episode Economics (Total Cost of Care)", subheading))
    episode_baseline_components = {
        "Index inpatient payment": 30000.0,
        "Physician professional services": 3500.0,
        "Post-acute care": 14000.0,
        "Readmission and ED revisit": 6000.0,
        "Long-term support / disability-related care": 12000.0,
    }
    component_rows = [["Component", "Baseline amount"]]
    for key in ["Index inpatient payment", "Physician professional services", "Post-acute care", "Readmission and ED revisit", "Long-term support / disability-related care"]:
        component_rows.append([key, money(episode_baseline_components[key])])
    t4a = Table(component_rows, colWidths=[310, 90])
    t4a.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#284B63")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EFF5FD")]),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
    ]))
    story.append(t4a)
    story.append(Spacer(1, 0.06 * inch))

    scenario_defs = [
        ("Conservative", 0.10, 0.20, 0.15, 0.25, "Modest LOS and downstream effect"),
        ("Base", 0.20, 0.40, 0.30, 0.50, "Moderate LOS/discharge and post-acute effect"),
        ("Optimistic", 0.30, 0.70, 0.60, 1.00, "Modeled full long-term support avoidance"),
    ]
    scen_table = [["Scenario", "Physician red.", "Post-acute red.", "Readmission red.", "Long-term support red.", "Interpretation"]]
    for name, p_r, pa_r, r_r, lt_r, note in scenario_defs:
        scen_table.append([name, pct(p_r), pct(pa_r), pct(r_r), pct(lt_r), note])
    t4b = Table(scen_table, colWidths=[70, 65, 72, 76, 90, 155], repeatRows=1)
    t4b.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#284B63")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EFF5FD")]),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.5),
        ("ALIGN", (1, 1), (4, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    baseline_total = sum(episode_baseline_components.values())
    episode_delta_rows = [["Scenario", "Episode delta @ $25K", "Episode delta @ $35K", "Episode delta @ $50K"]]
    for name, p_r, pa_r, r_r, lt_r, _ in scenario_defs:
        downstream_with = (
            episode_baseline_components["Physician professional services"] * (1.0 - p_r)
            + episode_baseline_components["Post-acute care"] * (1.0 - pa_r)
            + episode_baseline_components["Readmission and ED revisit"] * (1.0 - r_r)
            + episode_baseline_components["Long-term support / disability-related care"] * (1.0 - lt_r)
        )
        deltas: List[str] = []
        for idx, _price in enumerate(prices):
            with_total = episode_baseline_components["Index inpatient payment"] + drg_with_ntap[idx].ntap_policy + downstream_with
            deltas.append(money(with_total - baseline_total))
        episode_delta_rows.append([name] + deltas)
    t4c = Table(episode_delta_rows, colWidths=[100, 130, 130, 130], repeatRows=1)
    t4c.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#284B63")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EFF5FD")]),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
    ]))
    story.append(KeepTogether([t4b, Spacer(1, 0.06 * inch), t4c]))
    story.append(Paragraph("Inference: Hospital adoption economics and payer full-episode economics should be assessed separately. A favorable total-cost-of-care signal does not by itself remove hospital DRG-margin constraints.", body))

    story.append(Paragraph("References", heading))
    for ref, topic, url in SOURCES:
        story.append(Paragraph(f"{ref} {topic}: {url}", body))

    doc = SimpleDocTemplate(str(OUT_PDF), pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    doc.build(story)


def build_tables_pdf(drg_rows: List[Dict[str, str]]) -> None:
    OUT_PDF_TABLES.parent.mkdir(parents=True, exist_ok=True)
    styles = getSampleStyleSheet()
    heading = ParagraphStyle("Heading", parent=styles["Heading2"], fontName="Helvetica-Bold", spaceAfter=6, spaceBefore=10)
    body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=9, leading=12, spaceAfter=5)
    cell_text = ParagraphStyle("CellTextTbl", parent=body, fontName="Helvetica", fontSize=6.8, leading=7.6, spaceAfter=0)

    def c(text: str) -> Paragraph:
        return Paragraph(text, cell_text)

    story: List = []

    story.append(Paragraph("NTAP, Coding, and DRG Analysis - Tables Appendix", styles["Title"]))
    story.append(Paragraph("Primary narrative source: deep-research-report-ProductX.md. This appendix is table-focused.", body))

    story.append(Paragraph("A) FY 2027 NTAP Timeline Anchors", heading))
    timeline_data = [
        ["Milestone", "Timing", "Source"],
        ["Application submission (MEARIS)", "October 2025 cycle dates", "[1]"],
        ["Town Hall", "December 2025", "[1]"],
        ["Supplemental information deadline", "December 15, 2025", "[1]"],
        ["Proposed rule discussion", "April 2026 window", "[1]"],
        ["FDA authorization deadline", "May 1, 2026", "[1]"],
        ["Final rule", "August 1, 2026", "[1]"],
        ["NTAP effective date", "October 1, 2026", "[1]"],
    ]
    t0 = Table(timeline_data, colWidths=[200, 240, 60], repeatRows=1)
    t0.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
    ]))
    story.append(t0)

    by_drg: Dict[str, Dict[int, float]] = {}
    for row in drg_rows:
        by_drg.setdefault(row["DRG"], {})[int(row["FY"])] = float(row["Weight"])
    years = [2020, 2021, 2022, 2023, 2024, 2025, 2026]

    story.append(Paragraph("B) DRG Relative Weights (Comparator DRGs, FY2020 to FY2026)", heading))
    trend_table = [["DRG"] + [f"FY{y}" for y in years]]
    for drg in ["023", "024", "061", "062", "063"]:
        trend_table.append([drg] + [f"{by_drg[drg][y]:.4f}" for y in years])
    t1 = Table(trend_table, colWidths=[40] + [66] * 7, repeatRows=1)
    t1.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.8),
    ]))
    story.append(t1)

    story.append(Paragraph("C) DRG Year-over-Year Change", heading))
    yoy_table = [["DRG"] + [f"{years[i-1]}->{years[i]}" for i in range(1, len(years))]]
    for drg in ["023", "024", "061", "062", "063"]:
        row_vals = [drg]
        for i in range(1, len(years)):
            row_vals.append(f"{((by_drg[drg][years[i]] / by_drg[drg][years[i - 1]]) - 1.0) * 100.0:+.1f}%")
        yoy_table.append(row_vals)
    t2 = Table(yoy_table, colWidths=[40] + [72] * 6, repeatRows=1)
    t2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#284B63")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.8),
    ]))
    story.append(t2)

    story.append(Paragraph("D) DRG Definition and Comparator Role (FY 2026 Titles)", heading))
    concise_defs: Dict[str, str] = {
        "023": "Craniotomy with major device implant/acute complex CNS principal diagnosis with MCC.",
        "024": "Craniotomy with major device implant/acute complex CNS principal diagnosis without MCC.",
        "061": "Ischemic stroke/precerebral occlusion/transient ischemia with thrombolytic agent with MCC.",
        "062": "Ischemic stroke/precerebral occlusion/transient ischemia with thrombolytic agent with CC.",
        "063": "Ischemic stroke/precerebral occlusion/transient ischemia with thrombolytic agent without CC/MCC.",
    }
    def_table = [[c("DRG"), c("Definition (FY 2026 title)"), c("Comparator role")]]
    for drg in ["023", "024", "061", "062", "063"]:
        role = "High-acuity neuro inpatient comparator" if drg in {"023", "024"} else "Thrombolytic stroke comparator"
        def_table.append([c(drg), c(concise_defs[drg]), c(role)])
    t3 = Table(def_table, colWidths=[42, 300, 190], repeatRows=1)
    t3.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#3A6073")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("FONTSIZE", (0, 0), (-1, -1), 6.8),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(t3)
    story.append(Paragraph("Note: DRGs are directional comparators for payment-adequacy analysis, not a final grouping determination.", body))

    story.append(Paragraph("E) Episode Cost Buckets and Payment Channels", heading))
    episode_table = [
        ["Cost bucket", "Where it comes from", "How paid", "Amount"],
        ["ICU / neuro-ICU monitoring", "High-acuity index-stay care", "Bundled in MS-DRG", "$12,000"],
        ["Routine floor days", "Non-ICU index-stay days", "Bundled in MS-DRG", "$5,000"],
        ["Ancillary hospital services", "Imaging/labs/pharmacy/supplies", "Bundled in MS-DRG", "$3,000"],
        ["Physician professional services", "Neurology/interventional/professional claims", "Part B / PFS", "$3,500"],
        ["Post-acute care", "SNF/IRF/home health/LTCH", "Separate PPSs", "$14,000"],
        ["Readmission and ED revisit", "90-day unplanned utilization", "Separate claims", "$6,000"],
        ["Long-term support/disability care", "Expected-value long-tail support", "Mixed payer channels", "$12,000"],
    ]
    t4 = Table(episode_table, colWidths=[128, 160, 140, 72], repeatRows=1)
    t4.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.grey),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EFF5FD")]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (3, 1), (3, -1), "RIGHT"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.8),
    ]))
    story.append(t4)

    story.append(Paragraph("F) Hospital Adoption Economics (MS-DRG / NTAP)", heading))
    prices = [25000, 35000, 50000]
    drg_no_ntap = [scenario_calc("no", 30000, p, 20000, 0.0) for p in prices]
    drg_with_ntap = [scenario_calc("ntap", 30000, p, 20000, 0.65) for p in prices]
    drg_post = [scenario_calc("post", 50000, p, 20000, 0.0) for p in prices]
    hosp_table = [["Product X price", "MS-DRG payment", "Bundled costs", "Margin pre-NTAP", "Modeled NTAP", "Margin post-NTAP", "Post-DRG margin"]]
    for i, p in enumerate(prices):
        hosp_table.append([
            money(p), money(30000), money(20000),
            money(drg_no_ntap[i].margin_no_ntap),
            money(drg_with_ntap[i].ntap_policy),
            money(drg_with_ntap[i].margin_with_ntap_policy),
            money(drg_post[i].margin_no_ntap),
        ])
    t5 = Table(hosp_table, colWidths=[82, 72, 72, 82, 72, 82, 78], repeatRows=1)
    t5.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.7),
    ]))
    story.append(t5)

    ntap_math_table = [
        ["NTAP formula component", "Expression"],
        ["Modeled NTAP", "lesser of (a) 65% x Product X cost, or (b) 65% x (total case cost - MS-DRG payment)"],
        ["Worked example inputs", "Product cost $25,000; total case cost $45,000; MS-DRG payment $30,000; excess cost $15,000"],
        ["Worked example result", "NTAP = lesser of ($16,250, $9,750) = $9,750"],
    ]
    t6 = Table(ntap_math_table, colWidths=[170, 330], repeatRows=1)
    t6.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#284B63")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
    ]))
    story.append(t6)

    story.append(Paragraph("G) Payer Full-Episode Scenarios", heading))
    scenario_defs = [
        ("Conservative", 0.10, 0.20, 0.15, 0.25, "Modest LOS and downstream effect"),
        ("Base", 0.20, 0.40, 0.30, 0.50, "Moderate LOS/discharge and post-acute effect"),
        ("Optimistic", 0.30, 0.70, 0.60, 1.00, "Modeled full long-term support avoidance"),
    ]
    scen_table = [["Scenario", "Physician red.", "Post-acute red.", "Readmission red.", "Long-term support red.", "Interpretation"]]
    for name, p_r, pa_r, r_r, lt_r, note in scenario_defs:
        scen_table.append([name, pct(p_r), pct(pa_r), pct(r_r), pct(lt_r), note])
    t7 = Table(scen_table, colWidths=[70, 65, 72, 76, 90, 155], repeatRows=1)
    t7.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#284B63")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
        ("ALIGN", (1, 1), (4, -1), "RIGHT"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.5),
    ]))
    story.append(t7)

    baseline_total = 30000.0 + 3500.0 + 14000.0 + 6000.0 + 12000.0
    episode_delta_rows = [["Scenario", "Episode delta @ $25K", "Episode delta @ $35K", "Episode delta @ $50K"]]
    for name, p_r, pa_r, r_r, lt_r, _ in scenario_defs:
        downstream_with = (3500.0 * (1.0 - p_r)) + (14000.0 * (1.0 - pa_r)) + (6000.0 * (1.0 - r_r)) + (12000.0 * (1.0 - lt_r))
        deltas = []
        for i in range(3):
            with_total = 30000.0 + drg_with_ntap[i].ntap_policy + downstream_with
            deltas.append(money(with_total - baseline_total))
        episode_delta_rows.append([name] + deltas)
    t8 = Table(episode_delta_rows, colWidths=[100, 130, 130, 130], repeatRows=1)
    t8.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#284B63")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
    ]))
    story.append(t8)

    story.append(Paragraph("H) Public Sources", heading))
    src_rows = [[c("Ref"), c("Topic"), c("URL")]]
    for ref, topic, url in SOURCES:
        src_rows.append([c(ref), c(topic), c(url)])
    t9 = Table(src_rows, colWidths=[30, 150, 320], repeatRows=1)
    t9.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.35, colors.grey),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("FONTSIZE", (0, 0), (-1, -1), 6.6),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(t9)

    doc = SimpleDocTemplate(str(OUT_PDF_TABLES), pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    doc.build(story)


def main() -> None:
    drg_rows = load_drg_rows()
    build_workbook(drg_rows)
    build_pdf(drg_rows)
    build_tables_pdf(drg_rows)
    print(f"Wrote spreadsheet: {OUT_XLSX}")
    print(f"Wrote PDF: {OUT_PDF}")
    print(f"Wrote tables PDF: {OUT_PDF_TABLES}")


if __name__ == "__main__":
    main()
