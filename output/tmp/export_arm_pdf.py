from reportlab.lib.pagesizes import letter, landscape
from reportlab.pdfgen import canvas
from PIL import Image

img_path = 'output/exports/adrabetadex_provider_net_cost_recovery_calculator/ARM_Output_preview.png'
pdf_path = 'output/exports/adrabetadex_provider_net_cost_recovery_calculator/Adrabetadex_ARM_Output_One_Page_Summary.pdf'

page_w, page_h = landscape(letter)
c = canvas.Canvas(pdf_path, pagesize=(page_w, page_h))
img = Image.open(img_path)
iw, ih = img.size

margin = 24
avail_w = page_w - (2 * margin)
avail_h = page_h - (2 * margin)
scale = min(avail_w / iw, avail_h / ih)
new_w = iw * scale
new_h = ih * scale
x = (page_w - new_w) / 2
y = (page_h - new_h) / 2

c.drawImage(img_path, x, y, width=new_w, height=new_h, preserveAspectRatio=True, mask='auto')
c.showPage()
c.save()
print(pdf_path)
