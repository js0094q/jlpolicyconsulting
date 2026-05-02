#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKBOOK_PATH="${1:-$SCRIPT_DIR/Adrabetadex_Provider_Net_Cost_Recovery_Calculator.xlsx}"
OUT_DIR="${2:-$SCRIPT_DIR}"

PY_BIN="/Users/josephstewart/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3"

$PY_BIN "$SCRIPT_DIR/build_final_arm_tool.py" \
  --pdf-only \
  --workbook "$WORKBOOK_PATH" \
  --out-dir "$OUT_DIR"
