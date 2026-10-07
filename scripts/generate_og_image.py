import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    width, height = 1200, 630
    img = Image.new("RGBA", (width, height), (8, 14, 26, 255))
    draw = ImageDraw.Draw(img)

    # Gradient background
    for y in range(height):
        ratio = y / height
        r = int(8 + (15 - 8) * ratio)
        g = int(14 + (23 - 14) * ratio)
        b = int(26 + (42 - 26) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Glow layer
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Blue ambient glow top-right
    cx, cy = 960, 200
    for r_glow in range(450, 0, -5):
        alpha = int(45 * (1 - r_glow / 450))
        glow_draw.ellipse(
            [cx - r_glow, cy - r_glow, cx + r_glow, cy + r_glow],
            fill=(37, 99, 235, alpha)
        )

    # Cyan ambient glow bottom-left
    cx2, cy2 = 180, 500
    for r_glow in range(350, 0, -5):
        alpha = int(30 * (1 - r_glow / 350))
        glow_draw.ellipse(
            [cx2 - r_glow, cy2 - r_glow, cx2 + r_glow, cy2 + r_glow],
            fill=(14, 165, 233, alpha)
        )

    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # Fonts
    font_dir = r"C:\Windows\Fonts"
    f_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 62)
    f_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    f_subtitle = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 28)
    f_desc = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 20)
    f_pill = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    f_url = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 22)
    
    f_card_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    f_stat_label = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 13)
    f_stat_val = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 24)
    f_stat_sub = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 11)
    f_formula = ImageFont.truetype(os.path.join(font_dir, "courbd.ttf"), 13)

    # Top badge
    draw.rounded_rectangle([70, 60, 390, 96], radius=18, fill=(30, 58, 138, 120), outline=(59, 130, 246, 200), width=1)
    # Badge dot
    draw.ellipse([88, 74, 98, 84], fill=(56, 189, 248, 255))
    draw.text((108, 68), "US ELECTRICAL SIZING SUITE", font=f_badge, fill=(186, 230, 253, 255))

    # Logo Box
    logo_x, logo_y = 70, 125
    draw.rounded_rectangle([logo_x, logo_y, logo_x + 68, logo_y + 68], radius=18, fill=(37, 99, 235, 255))
    
    # Draw lightning bolt inside logo box
    bolt_points = [
        (logo_x + 36, logo_y + 12),
        (logo_x + 18, logo_y + 36),
        (logo_x + 34, logo_y + 36),
        (logo_x + 30, logo_y + 56),
        (logo_x + 50, logo_y + 30),
        (logo_x + 34, logo_y + 30),
        (logo_x + 40, logo_y + 12),
    ]
    draw.polygon(bolt_points, fill=(255, 255, 255, 255))

    # Brand Title
    draw.text((logo_x + 86, logo_y + 2), "CalcMyPower", font=f_title, fill=(255, 255, 255, 255))

    # Subtitle
    draw.text((70, 220), "Power, Energy & Electrical Calculators", font=f_subtitle, fill=(147, 197, 253, 255))

    # Description lines
    desc_line1 = "Interactive engineering calculators for solar PV arrays,"
    desc_line2 = "battery backup storage, generators, and circuit wiring."
    desc_line3 = "Transparent formulas and verified US engineering baselines."
    draw.text((70, 266), desc_line1, font=f_desc, fill=(148, 163, 184, 255))
    draw.text((70, 294), desc_line2, font=f_desc, fill=(148, 163, 184, 255))
    draw.text((70, 322), desc_line3, font=ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16), fill=(125, 211, 252, 255))

    # Feature Pills
    pills = [
        ("Solar PV & Inverters", (30, 58, 138, 180), (96, 165, 250, 255)),
        ("Battery Storage (Ah / Wh)", (20, 83, 45, 180), (74, 222, 128, 255)),
        ("Generator Sizing & Surge", (120, 53, 15, 180), (251, 191, 36, 255)),
        ("Wire Gauge & Voltage Drop", (76, 29, 149, 180), (192, 132, 252, 255)),
    ]
    
    px, py = 70, 365
    for text, bg_col, text_col in pills[:2]:
        text_bbox = draw.textbbox((0, 0), text, font=f_pill)
        w_pill = text_bbox[2] - text_bbox[0] + 32
        draw.rounded_rectangle([px, py, px + w_pill, py + 40], radius=12, fill=bg_col, outline=text_col, width=1)
        draw.text((px + 16, py + 9), text, font=f_pill, fill=text_col)
        px += w_pill + 16

    px, py = 70, 420
    for text, bg_col, text_col in pills[2:]:
        text_bbox = draw.textbbox((0, 0), text, font=f_pill)
        w_pill = text_bbox[2] - text_bbox[0] + 32
        draw.rounded_rectangle([px, py, px + w_pill, py + 40], radius=12, fill=bg_col, outline=text_col, width=1)
        draw.text((px + 16, py + 9), text, font=f_pill, fill=text_col)
        px += w_pill + 16

    # Bottom domain bar
    draw.line([(70, 520), (1130, 520)], fill=(30, 41, 59, 255), width=1)
    
    # Online dot
    draw.ellipse([70, 545, 82, 557], fill=(34, 197, 94, 255))
    draw.text((92, 539), "calcmypower.com", font=f_url, fill=(248, 250, 252, 255))
    
    f_tag = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 16)
    draw.text((680, 542), "Transparent Engineering Baselines & Verified Formulas", font=f_tag, fill=(100, 116, 139, 255))

    # Right side: Mockup UI Card
    card_x, card_y = 690, 70
    card_w, card_h = 440, 420
    
    # Card outer shadow
    for i in range(12, 0, -2):
        draw.rounded_rectangle(
            [card_x - i, card_y - i, card_x + card_w + i, card_y + card_h + i],
            radius=24,
            fill=(15, 23, 42, int(20 * (1 - i / 12)))
        )
    
    # Card main body
    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=20,
        fill=(15, 23, 42, 250),
        outline=(51, 65, 85, 255),
        width=2
    )

    # Card header bar
    draw.rounded_rectangle(
        [card_x + 1, card_y + 1, card_x + card_w - 1, card_y + 54],
        radius=20,
        fill=(30, 41, 59, 255)
    )
    draw.rectangle(
        [card_x + 1, card_y + 34, card_x + card_w - 1, card_y + 54],
        fill=(30, 41, 59, 255)
    )
    
    # Card header text
    draw.text((card_x + 20, card_y + 16), "ENGINEERING RESULT CARD", font=f_card_title, fill=(226, 232, 240, 255))
    # Green live pill
    draw.rounded_rectangle([card_x + card_w - 95, card_y + 14, card_x + card_w - 20, card_y + 38], radius=10, fill=(22, 101, 52, 200))
    draw.text((card_x + card_w - 82, card_y + 17), "VERIFIED", font=ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 11), fill=(74, 222, 128, 255))

    # 4 Stat boxes in 2x2 grid
    box_w = 188
    box_h = 92
    
    boxes = [
        (card_x + 22, card_y + 74, "Continuous Rating", "2,000 W", "1.25x Headroom Buffer", (59, 130, 246, 255)),
        (card_x + 228, card_y + 74, "Motor Starting Surge", "4,000 W", "Compressor Inrush Reserve", (245, 158, 11, 255)),
        (card_x + 22, card_y + 182, "Battery DC Current", "66.2 A", "24V Bank @ 90% Efficiency", (16, 185, 129, 255)),
        (card_x + 228, card_y + 182, "Conductor & Fuse", "2 AWG / 125A", "Short Run Pure Copper", (168, 85, 247, 255)),
    ]

    for bx, by, lbl, val, sub, accent in boxes:
        draw.rounded_rectangle([bx, by, bx + box_w, by + box_h], radius=12, fill=(24, 33, 50, 255), outline=(45, 59, 82, 255), width=1)
        draw.text((bx + 14, by + 12), lbl, font=f_stat_label, fill=(148, 163, 184, 255))
        draw.text((bx + 14, by + 32), val, font=f_stat_val, fill=accent)
        draw.text((bx + 14, by + 68), sub, font=f_stat_sub, fill=(100, 116, 139, 255))

    # Formula Box in Card Footer
    f_box_y = card_y + 295
    draw.rounded_rectangle([card_x + 22, f_box_y, card_x + card_w - 22, f_box_y + 95], radius=12, fill=(8, 14, 26, 255), outline=(30, 41, 59, 255), width=1)
    draw.text((card_x + 36, f_box_y + 14), "EQUATION APPLIED:", font=ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 11), fill=(56, 189, 248, 255))
    draw.text((card_x + 36, f_box_y + 36), "P_cont = P_running * 1.25", font=f_formula, fill=(255, 255, 255, 255))
    draw.text((card_x + 36, f_box_y + 58), "I_DC   = P_cont / (V_system * Inverter_Eff)", font=f_formula, fill=(148, 163, 184, 255))

    # Save final RGB image
    final_img = img.convert("RGB")
    out_path = os.path.join("public", "og-image.jpg")
    final_img.save(out_path, "JPEG", quality=92, optimize=True)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Generated {out_path} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    generate_og_image()
