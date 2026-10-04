import os
from PIL import Image, ImageDraw, ImageFont

def create_hero_image():
    width = 1200
    height = 675
    img = Image.new("RGB", (width, height), color=(15, 23, 42))  # Slate 900
    draw = ImageDraw.Draw(img)

    # 1. Background grid
    grid_color = (30, 41, 59)  # Slate 800
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # Fonts
    try:
        font_brand = ImageFont.truetype("arial.ttf", 13)
        font_title = ImageFont.truetype("arialbd.ttf", 30)
        font_subtitle = ImageFont.truetype("arial.ttf", 15)
        font_box_header = ImageFont.truetype("arialbd.ttf", 17)
        font_item_title = ImageFont.truetype("arialbd.ttf", 14)
        font_item_sub = ImageFont.truetype("arial.ttf", 12)
        font_formula = ImageFont.truetype("arialbd.ttf", 13)
        font_footer = ImageFont.truetype("arial.ttf", 12)
    except Exception:
        font_brand = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_box_header = ImageFont.load_default()
        font_item_title = ImageFont.load_default()
        font_item_sub = ImageFont.load_default()
        font_formula = ImageFont.load_default()
        font_footer = ImageFont.load_default()

    # 2. Header Banner
    draw.rectangle([(40, 25), (1160, 115)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 36), "CALCMYPOWER.COM  •  APPLIANCE ELECTRICAL WATTAGE MATRIX", fill=(56, 189, 248), font=font_brand)
    draw.text((60, 56), "Generator Wattage Chart: Running & Starting Surge Profile", fill=(255, 255, 255), font=font_title)
    draw.text((60, 93), "Comparing Steady-State Running Watts vs. Locked-Rotor Startup Surge Across Household Loads", fill=(148, 163, 184), font=font_subtitle)

    # Badge on top right
    draw.rounded_rectangle([(930, 48), (1140, 85)], radius=6, fill=(15, 43, 40), outline=(16, 185, 129), width=1)
    draw.text((950, 58), "TECHNICAL REFERENCE", fill=(52, 211, 153), font=font_brand)

    # 3. Three Comparison Columns
    col_width = 350
    spacing = 35
    top_y = 135
    bottom_y = 575

    # Column 1: Inductive Motor Loads (High Surge)
    c1_x1 = 40
    c1_x2 = c1_x1 + col_width
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(234, 88, 12), width=2)
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, top_y + 44)], radius=12, fill=(45, 25, 20))
    draw.rectangle([(c1_x1, top_y + 32), (c1_x2, top_y + 44)], fill=(45, 25, 20))
    draw.text((c1_x1 + 18, top_y + 12), "1. INDUCTIVE MOTOR LOADS", fill=(251, 146, 60), font=font_box_header)

    loads_c1 = [
        ("Submersible Well Pump (1/2 HP)", "Running: 1,000 W", "Starting Surge: 2,500 W (2.5x)"),
        ("Furnace Blower Motor", "Running: 800 W", "Starting Surge: 1,900 W (2.4x)"),
        ("Refrigerator / Freezer", "Running: 700 W", "Starting Surge: 1,500 W (2.1x)"),
        ("Sump Pump (1/3 HP)", "Running: 600 W", "Starting Surge: 1,400 W (2.3x)"),
    ]
    cur_y = top_y + 60
    for name, run_w, start_w in loads_c1:
        draw.rounded_rectangle([(c1_x1 + 14, cur_y), (c1_x2 - 14, cur_y + 68)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((c1_x1 + 24, cur_y + 10), name, fill=(241, 245, 249), font=font_item_title)
        draw.text((c1_x1 + 24, cur_y + 32), run_w, fill=(56, 189, 248), font=font_item_sub)
        draw.text((c1_x1 + 24, cur_y + 48), start_w, fill=(249, 115, 22), font=font_item_sub)
        cur_y += 78

    draw.text((c1_x1 + 18, bottom_y - 45), "Motor Inrush: 2x to 3x surge for 2-3 sec to", fill=(148, 163, 184), font=font_footer)
    draw.text((c1_x1 + 18, bottom_y - 28), "overcome mechanical rotor inertia.", fill=(148, 163, 184), font=font_footer)

    # Column 2: Resistive Heating Loads (Zero Surge)
    c2_x1 = c1_x2 + spacing
    c2_x2 = c2_x1 + col_width
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(59, 130, 246), width=2)
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, top_y + 44)], radius=12, fill=(20, 35, 60))
    draw.rectangle([(c2_x1, top_y + 32), (c2_x2, top_y + 44)], fill=(20, 35, 60))
    draw.text((c2_x1 + 18, top_y + 12), "2. RESISTIVE HEATING LOADS", fill=(96, 165, 250), font=font_box_header)

    loads_c2 = [
        ("Electric Space Heater", "Running: 1,500 W", "Starting Surge: 1,500 W (No surge)"),
        ("Electric Water Heater", "Running: 4,500 W", "Starting Surge: 4,500 W (No surge)"),
        ("Coffee Maker / Toaster", "Running: 1,200 W", "Starting Surge: 1,200 W (No surge)"),
        ("Microwave Oven (1,000W Output)", "Running: 1,500 W (Input)", "Starting Surge: 1,500 W (1.0x)"),
    ]
    cur_y = top_y + 60
    for name, run_w, start_w in loads_c2:
        draw.rounded_rectangle([(c2_x1 + 14, cur_y), (c2_x2 - 14, cur_y + 68)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((c2_x1 + 24, cur_y + 10), name, fill=(241, 245, 249), font=font_item_title)
        draw.text((c2_x1 + 24, cur_y + 32), run_w, fill=(56, 189, 248), font=font_item_sub)
        draw.text((c2_x1 + 24, cur_y + 48), start_w, fill=(52, 211, 153), font=font_item_sub)
        cur_y += 78

    draw.text((c2_x1 + 18, bottom_y - 45), "Pure Resistance: Current matches voltage.", fill=(148, 163, 184), font=font_footer)
    draw.text((c2_x1 + 18, bottom_y - 28), "Zero starting delta or extra surge required.", fill=(148, 163, 184), font=font_footer)

    # Column 3: Sizing Math & Methodology
    c3_x1 = c2_x2 + spacing
    c3_x2 = c3_x1 + col_width
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(16, 185, 129), width=2)
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, top_y + 44)], radius=12, fill=(15, 45, 35))
    draw.rectangle([(c3_x1, top_y + 32), (c3_x2, top_y + 44)], fill=(15, 45, 35))
    draw.text((c3_x1 + 18, top_y + 12), "3. SYSTEM SIZING RULES", fill=(52, 211, 153), font=font_box_header)

    math_box = [(c3_x1 + 14, top_y + 60), (c3_x2 - 14, top_y + 165)]
    draw.rounded_rectangle(math_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 70), "Single-Largest-Surge Rule:", fill=(245, 158, 11), font=font_item_title)
    draw.text((c3_x1 + 24, top_y + 92), "P_peak = Total Running + Max Surge Delta", fill=(255, 255, 255), font=font_formula)
    draw.text((c3_x1 + 24, top_y + 115), "Never sum all motor surges together;", fill=(148, 163, 184), font=font_item_sub)
    draw.text((c3_x1 + 24, top_y + 133), "motors cycle independently in practice.", fill=(148, 163, 184), font=font_item_sub)

    rule2_box = [(c3_x1 + 14, top_y + 180), (c3_x2 - 14, top_y + 285)]
    draw.rounded_rectangle(rule2_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 190), "Continuous Headroom (25%):", fill=(56, 189, 248), font=font_item_title)
    draw.text((c3_x1 + 24, top_y + 212), "P_generator = P_peak x 1.25", fill=(255, 255, 255), font=font_formula)
    draw.text((c3_x1 + 24, top_y + 235), "Prevents generator running at 100% capacity", fill=(148, 163, 184), font=font_item_sub)
    draw.text((c3_x1 + 24, top_y + 253), "for extended multi-hour utility outages.", fill=(148, 163, 184), font=font_item_sub)

    rule3_box = [(c3_x1 + 14, top_y + 300), (c3_x2 - 14, top_y + 405)]
    draw.rounded_rectangle(rule3_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 310), "Nameplate Reading Rule:", fill=(168, 85, 247), font=font_item_title)
    draw.text((c3_x1 + 24, top_y + 332), "Watts = Volts x Amperes", fill=(255, 255, 255), font=font_formula)
    draw.text((c3_x1 + 24, top_y + 355), "When watts are unlisted on equipment,", fill=(148, 163, 184), font=font_item_sub)
    draw.text((c3_x1 + 24, top_y + 373), "multiply Volts by Amps directly.", fill=(148, 163, 184), font=font_item_sub)

    draw.text((c3_x1 + 18, bottom_y - 45), "Chart values provide reference ranges.", fill=(148, 163, 184), font=font_footer)
    draw.text((c3_x1 + 18, bottom_y - 28), "Always check the appliance data sticker.", fill=(148, 163, 184), font=font_footer)

    # 4. Bottom Footer Bar
    draw.rectangle([(40, 595), (1160, 645)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 612), "REFERENCE STANDARD: Grounded in DOE, NREL, UL 2201, and appliance electrical nameplates. For interactive sizing, use /generator-size-calculator.", fill=(148, 163, 184), font=font_footer)

    # Save
    out_dir = os.path.join("public", "images", "calculators")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "generator-wattage-chart.webp")
    img.save(out_path, "WEBP", quality=90)
    print("Saved Asset #10 hero image:", out_path)

if __name__ == "__main__":
    create_hero_image()
