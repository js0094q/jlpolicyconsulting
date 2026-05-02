#!/usr/bin/env python3
import json
import os
import sys

from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from PIL import Image


if len(sys.argv) < 2:
    raise SystemExit("Usage: generate_arm_pdf_from_png.py <meta_json_path> [output_dir]")

meta_path = sys.argv[1]
output_dir = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(meta_path)

with open(meta_path, "r", encoding="utf-8") as f:
    meta = json.load(f)

pdf_filename = meta["pdfFilename"]
png_path = meta.get("pngPath")
if not png_path:
    raise SystemExit("Metadata missing pngPath for PNG-based PDF render.")
if not os.path.exists(png_path):
    raise SystemExit(f"PNG render source not found: {png_path}")

pdf_path = os.path.join(output_dir, pdf_filename)

page_w, page_h = landscape(letter)
c = canvas.Canvas(pdf_path, pagesize=(page_w, page_h))

source_image = Image.open(png_path)
crop_box = meta.get("cropBoxPx", {})
crop_left = int(crop_box.get("left", 0) or 0)
crop_top = int(crop_box.get("top", 0) or 0)
crop_right = int(crop_box.get("right", 0) or 0)
crop_bottom = int(crop_box.get("bottom", 0) or 0)

if any((crop_left, crop_top, crop_right, crop_bottom)):
    width, height = source_image.size
    source_image = source_image.crop(
        (
            crop_left,
            crop_top,
            max(crop_left + 1, width - crop_right),
            max(crop_top + 1, height - crop_bottom),
        )
    )

image = ImageReader(source_image)
image_w, image_h = image.getSize()

margin = 24
content_w = page_w - (2 * margin)
content_h = page_h - (2 * margin)
scale = min(content_w / image_w, content_h / image_h)

draw_w = image_w * scale
draw_h = image_h * scale
x = margin + (content_w - draw_w) / 2
y = margin + (content_h - draw_h) / 2

c.drawImage(
    image,
    x,
    y,
    width=draw_w,
    height=draw_h,
    preserveAspectRatio=True,
    mask="auto",
)

c.showPage()
c.save()

print(pdf_path)
