import os
from PIL import Image, ImageDraw, ImageFont

def create_hero_image():
    width = 1200
    height = 675
    img = Image.new("RGB", (width, height), color=(15, 23, 42))  # Slate 900
    draw = ImageDraw.Draw(img)

    # 1. Subtle background grid
    grid_color = (30, 41, 59)  # Slate 800
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # Fonts
    try:
        font_brand = ImageFont.truetype("arial.ttf", 13)
        font_title = ImageFont.truetype("arialbd.ttf", 28)
        font_subtitle = ImageFont.truetype("arial.ttf", 15)
        font_box_header = ImageFont.truetype("arialbd.ttf", 17)
        font_box_sub = ImageFont.truetype("arial.ttf", 13)
        font_metric_label = ImageFont.truetype("arial.ttf", 12)
        font_metric_val = ImageFont.truetype("arialbd.ttf", 15)
        font_formula = ImageFont.truetype("arialbd.ttf", 13)
        font_footer = ImageFont.truetype("arial.ttf", 12)
    except Exception:
        font_brand = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_box_header = ImageFont.load_default()
        font_box_sub = ImageFont.load_default()
        font_metric_label = ImageFont.load_default()
        font_metric_val = ImageFont.load_default()
        font_formula = ImageFont.load_default()
        font_footer = ImageFont.load_default()

    # 2. Header Banner
    draw.rectangle([(40, 25), (1160, 115)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 36), "CALCMYPOWER.COM  *  TECHNICAL SOLAR RECHARGE SCHEMATIC", fill=(251, 191, 36), font=font_brand)  # Amber 400
    draw.text((60, 56), "Solar Battery Charging Time & Daily Energy Yield", fill=(255, 255, 255), font=font_title)
    draw.text((60, 91), "Balancing Battery Capacity (Wh = V * Ah) Against Array Derating & Peak Sun Hours", fill=(148, 163, 184), font=font_subtitle)

    # Top right pill
    draw.rounded_rectangle([(930, 48), (1140, 85)], radius=6, fill=(30, 41, 59), outline=(245, 158, 11), width=1)
    draw.text((950, 58), "SOLAR SIZING MODEL", fill=(251, 191, 36), font=font_brand)

    # 3. Three Main Architecture Columns (Array -> Controller & Sunlight -> Battery Bank)
    col_width = 350
    gap = 25
    c1_x1 = 40
    c1_x2 = c1_x1 + col_width

    c2_x1 = c1_x2 + gap
    c2_x2 = c2_x1 + col_width

    c3_x1 = c2_x2 + gap
    c3_x2 = c3_x1 + col_width

    top_y = 135
    bot_y = 515

    # Card 1: Solar Array Generation (Left)
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, bot_y)], radius=12, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, top_y + 45)], radius=12, fill=(30, 41, 59))
    draw.text((c1_x1 + 18, top_y + 14), "1. Solar Array Rating & Derating", fill=(251, 191, 36), font=font_box_header)

    card1_items = [
        ("STC Nameplate Output", "Rated at 1,000 W/m2 @ 25 deg C"),
        ("Thermal Cell Derate", "-0.38%/deg C cell temp rise (8-14%)"),
        ("Dust, Soiling & Cabling", "-4% to -6% field resistance"),
        ("MPPT Net Yield Factor", "~82% of STC nameplate watts"),
        ("PWM Net Yield Factor", "~65% (clamps panel Vmp to Vbat)"),
        ("200W Array Effective Yield", "MPPT: 164W  |  PWM: 130W"),
    ]
    cur_y = top_y + 60
    for label, val in card1_items:
        draw.text((c1_x1 + 18, cur_y), label, fill=(148, 163, 184), font=font_metric_label)
        draw.text((c1_x1 + 18, cur_y + 16), val, fill=(241, 245, 249), font=font_metric_val)
        cur_y += 54

    # Card 2: Sunlight Irradiance & Conversion (Middle)
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, bot_y)], radius=12, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, top_y + 45)], radius=12, fill=(30, 41, 59))
    draw.text((c2_x1 + 18, top_y + 14), "2. Solar Irradiance Window", fill=(56, 189, 248), font=font_box_header)

    card2_items = [
        ("Peak Sun Hours (PSH)", "Equivalent 1,000 W/m2 full sun"),
        ("Winter US Average", "2.5 to 3.5 PSH / day"),
        ("Summer US Average", "5.0 to 6.5 PSH / day"),
        ("Daily Solar Energy (Wh)", "Array Effective W * Daily PSH"),
        ("200W Array Daily Yield", "164W * 4.5 PSH = 738 Wh/day"),
        ("400W Array Daily Yield", "328W * 4.5 PSH = 1,476 Wh/day"),
    ]
    cur_y = top_y + 60
    for label, val in card2_items:
        draw.text((c2_x1 + 18, cur_y), label, fill=(148, 163, 184), font=font_metric_label)
        draw.text((c2_x1 + 18, cur_y + 16), val, fill=(241, 245, 249), font=font_metric_val)
        cur_y += 54

    # Card 3: Battery Bank & Chemistry (Right)
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, bot_y)], radius=12, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, top_y + 45)], radius=12, fill=(30, 41, 59))
    draw.text((c3_x1 + 18, top_y + 14), "3. Battery Bank Capacity", fill=(52, 211, 153), font=font_box_header)

    card3_items = [
        ("12V 100Ah Nominal Energy", "1,200 Wh (12V * 100Ah)"),
        ("80% Discharge Deficit", "960 Wh energy needed to refill"),
        ("LiFePO4 Efficiency (98%)", "Requires 980 Wh net input"),
        ("AGM Lead-Acid Eff (85%)", "Requires 1,129 Wh + absorption soak"),
        ("Recharge Hours (200W)", "980 Wh / 164W = 5.98 Peak Sun Hrs"),
        ("Recharge Days (4.5 PSH)", "5.98 / 4.5 = 1.33 Days (~1.5 days)"),
    ]
    cur_y = top_y + 60
    for label, val in card3_items:
        draw.text((c3_x1 + 18, cur_y), label, fill=(148, 163, 184), font=font_metric_label)
        draw.text((c3_x1 + 18, cur_y + 16), val, fill=(241, 245, 249), font=font_metric_val)
        cur_y += 54

    # 4. Bottom Formula & Benchmark Footer Strip
    foot_y1 = 530
    foot_y2 = 645
    draw.rounded_rectangle([(40, foot_y1), (1160, foot_y2)], radius=12, fill=(24, 34, 53), outline=(51, 65, 85), width=1)

    draw.text((60, foot_y1 + 16), "CORE SIZING EQUATION:", fill=(251, 191, 36), font=font_box_header)
    formula_text = "Charging Time (Peak Sun Hours) = [Battery Wh Deficit / Chemistry Efficiency] / [Solar Watts * Net System Derate]"
    draw.text((60, foot_y1 + 42), formula_text, fill=(241, 245, 249), font=font_formula)

    footer_sub = "Days to Recharge = Peak Sun Hours Needed / Local Daily Peak Sun Hours (PSH/day). Zero load assumed during recharge."
    draw.text((60, foot_y1 + 72), footer_sub, fill=(148, 163, 184), font=font_footer)

    # Save as WebP
    out_dir = os.path.join("public", "images", "articles")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "how-long-does-it-take-to-charge-a-battery-with-solar-panels.webp")
    img.save(out_path, format="WEBP", quality=90)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Generated {out_path} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    create_hero_image()
