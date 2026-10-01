import os
from PIL import Image, ImageDraw, ImageFont

def create_hero_image():
    width = 1200
    height = 675
    img = Image.new("RGB", (width, height), color=(15, 23, 42)) # Slate 900
    draw = ImageDraw.Draw(img)

    # 1. Subtle background grid
    grid_color = (30, 41, 59) # Slate 800
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # Fonts
    # Using default or common system fonts if available
    try:
        font_brand = ImageFont.truetype("arial.ttf", 14)
        font_title = ImageFont.truetype("arialbd.ttf", 32)
        font_subtitle = ImageFont.truetype("arial.ttf", 16)
        font_box_header = ImageFont.truetype("arialbd.ttf", 18)
        font_box_sub = ImageFont.truetype("arial.ttf", 13)
        font_metric_label = ImageFont.truetype("arial.ttf", 12)
        font_metric_val = ImageFont.truetype("arialbd.ttf", 16)
        font_formula = ImageFont.truetype("arialbd.ttf", 14)
        font_footer = ImageFont.truetype("arial.ttf", 13)
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

    # 2. Top Header Banner
    # Dark card banner
    draw.rectangle([(40, 25), (1160, 115)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    
    # Brand tag
    draw.text((60, 36), "CALCMYPOWER.COM  •  TECHNICAL SIZING & VOLTAGE SCHEMATIC", fill=(56, 189, 248), font=font_brand) # Sky 400
    
    # Title & Subtitle
    draw.text((60, 56), "Solar Charge Controller Sizing & Cold Voc Limits", fill=(255, 255, 255), font=font_title)
    draw.text((60, 93), "Determining Ampere Rating (I = P ÷ V) & Verifying High-Voltage Headroom (NEC 690.7)", fill=(148, 163, 184), font=font_subtitle)

    # Status Pill on Top Right
    draw.rounded_rectangle([(950, 48), (1140, 85)], radius=6, fill=(15, 43, 40), outline=(16, 185, 129), width=1)
    draw.text((970, 58), "ENGINEERING ARCHITECTURE", fill=(52, 211, 153), font=font_brand)

    # 3. Main Diagram Architecture (3 Columns: Solar Array -> Charge Controller -> Battery & Loads)

    # Card 1: Solar PV Array (Left)
    c1_x1, c1_y1, c1_x2, c1_y2 = 40, 140, 360, 530
    draw.rounded_rectangle([(c1_x1, c1_y1), (c1_x2, c1_y2)], radius=12, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    # Header bar
    draw.rounded_rectangle([(c1_x1, c1_y1), (c1_x2, c1_y1 + 44)], radius=12, fill=(30, 41, 59))
    draw.rectangle([(c1_x1, c1_y1 + 32), (c1_x2, c1_y1 + 44)], fill=(30, 41, 59))
    draw.text((c1_x1 + 20, c1_y1 + 12), "1. SOLAR PV ARRAY", fill=(245, 158, 11), font=font_box_header) # Amber 500

    # Solar Array Visual Graphic (Grid of 4 solar cells)
    panel_box = [(c1_x1 + 20, c1_y1 + 60), (c1_x2 - 20, c1_y1 + 180)]
    draw.rectangle(panel_box, fill=(15, 23, 42), outline=(56, 189, 248), width=2)
    # Solar cells grid
    mid_px = (panel_box[0][0] + panel_box[1][0]) // 2
    mid_py = (panel_box[0][1] + panel_box[1][1]) // 2
    draw.line([(mid_px, panel_box[0][1]), (mid_px, panel_box[1][1])], fill=(56, 189, 248), width=1)
    draw.line([(panel_box[0][0], mid_py), (panel_box[1][0], mid_py)], fill=(56, 189, 248), width=1)
    # Internal cell lines
    for off in [30, 60, 90]:
        draw.line([(panel_box[0][0], panel_box[0][1] + off), (panel_box[1][0], panel_box[0][1] + off)], fill=(30, 58, 88), width=1)

    draw.text((c1_x1 + 20, c1_y1 + 195), "Array Output Characteristics:", fill=(203, 213, 225), font=font_box_sub)
    draw.text((c1_x1 + 20, c1_y1 + 220), "• Total Array Power:", fill=(148, 163, 184), font=font_metric_label)
    draw.text((c1_x1 + 160, c1_y1 + 218), "P_array (Watts)", fill=(245, 158, 11), font=font_metric_val)

    draw.text((c1_x1 + 20, c1_y1 + 250), "• Array Open-Circuit:", fill=(148, 163, 184), font=font_metric_label)
    draw.text((c1_x1 + 160, c1_y1 + 248), "Voc @ STC (25°C)", fill=(56, 189, 248), font=font_metric_val)

    draw.text((c1_x1 + 20, c1_y1 + 280), "• Short-Circuit Current:", fill=(148, 163, 184), font=font_metric_label)
    draw.text((c1_x1 + 160, c1_y1 + 278), "Isc (Amps)", fill=(255, 255, 255), font=font_metric_val)

    # Cold Voc Warning box inside array
    draw.rounded_rectangle([(c1_x1 + 16, c1_y1 + 315), (c1_x2 - 16, c1_y2 - 15)], radius=8, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
    draw.text((c1_x1 + 26, c1_y1 + 323), "COLD TEMPERATURE BEHAVIOR", fill=(147, 197, 253), font=font_brand)
    draw.text((c1_x1 + 26, c1_y1 + 342), "Voltage increases as temperature drops:", fill=(203, 213, 225), font=font_box_sub)
    draw.text((c1_x1 + 26, c1_y1 + 360), "Voc_cold = Voc × [1 + α × (T_min - 25°C)]", fill=(245, 158, 11), font=font_formula)

    # Card 2: Charge Controller (Center, highlighted)
    c2_x1, c2_y1, c2_x2, c2_y2 = 440, 140, 800, 530
    draw.rounded_rectangle([(c2_x1, c2_y1), (c2_x2, c2_y2)], radius=12, fill=(24, 34, 53), outline=(14, 165, 233), width=2) # Sky outline
    # Header bar
    draw.rounded_rectangle([(c2_x1, c2_y1), (c2_x2, c2_y1 + 44)], radius=12, fill=(14, 165, 233))
    draw.rectangle([(c2_x1, c2_y1 + 32), (c2_x2, c2_y1 + 44)], fill=(14, 165, 233))
    draw.text((c2_x1 + 20, c2_y1 + 12), "2. SOLAR CHARGE CONTROLLER", fill=(15, 23, 42), font=font_box_header)

    # Controller Tech Subsections (MPPT vs PWM)
    draw.rounded_rectangle([(c2_x1 + 16, c2_y1 + 56), (c2_x2 - 16, c2_y1 + 195)], radius=8, fill=(15, 23, 42), outline=(56, 189, 248), width=1)
    draw.text((c2_x1 + 26, c2_y1 + 65), "MPPT CONVERSION (STEP-DOWN BUCK)", fill=(56, 189, 248), font=font_brand)
    draw.text((c2_x1 + 26, c2_y1 + 86), "Converts high array voltage down to battery voltage:", fill=(203, 213, 225), font=font_box_sub)
    draw.text((c2_x1 + 26, c2_y1 + 106), "I_nominal = P_array ÷ V_battery", fill=(255, 255, 255), font=font_title)
    draw.text((c2_x1 + 26, c2_y1 + 145), "Illustrative Planning Buffer (+20%):", fill=(148, 163, 184), font=font_box_sub)
    draw.text((c2_x1 + 26, c2_y1 + 165), "I_planning = I_nominal × 1.20", fill=(245, 158, 11), font=font_formula)

    # Voltage Compatibility Section
    draw.rounded_rectangle([(c2_x1 + 16, c2_y1 + 210), (c2_x2 - 16, c2_y1 + 310)], radius=8, fill=(15, 23, 42), outline=(16, 185, 129), width=1)
    draw.text((c2_x1 + 26, c2_y1 + 218), "MAXIMUM PV INPUT VOLTAGE CHECK", fill=(52, 211, 153), font=font_brand)
    draw.text((c2_x1 + 26, c2_y1 + 238), "Mandatory engineering headroom condition:", fill=(203, 213, 225), font=font_box_sub)
    draw.text((c2_x1 + 26, c2_y1 + 258), "Voc_cold  <  V_controller_max", fill=(16, 185, 129), font=font_title)
    draw.text((c2_x1 + 26, c2_y1 + 288), "Ratings: 75V, 100V, 150V, 200V, 250V limits", fill=(148, 163, 184), font=font_metric_label)

    # Standard Rating Sizing Class box
    draw.rounded_rectangle([(c2_x1 + 16, c2_y1 + 325), (c2_x2 - 16, c2_y2 - 15)], radius=8, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
    draw.text((c2_x1 + 26, c2_y1 + 333), "STANDARD CONTROLLER CURRENT CLASSES", fill=(245, 158, 11), font=font_brand)
    draw.text((c2_x1 + 26, c2_y1 + 353), "10A • 15A • 20A • 30A • 40A • 50A • 60A • 80A • 100A", fill=(255, 255, 255), font=font_formula)

    # Card 3: Battery Bank & Loads (Right)
    c3_x1, c3_y1, c3_x2, c3_y2 = 880, 140, 1160, 530
    draw.rounded_rectangle([(c3_x1, c3_y1), (c3_x2, c3_y2)], radius=12, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    # Header bar
    draw.rounded_rectangle([(c3_x1, c3_y1), (c3_x2, c3_y1 + 44)], radius=12, fill=(30, 41, 59))
    draw.rectangle([(c3_x1, c3_y1 + 32), (c3_x2, c3_y1 + 44)], fill=(30, 41, 59))
    draw.text((c3_x1 + 20, c3_y1 + 12), "3. BATTERY & DC BUS", fill=(16, 185, 129), font=font_box_header) # Emerald 500

    # Battery Visual Graphic
    bat_box = [(c3_x1 + 20, c3_y1 + 60), (c3_x2 - 20, c3_y1 + 180)]
    draw.rectangle(bat_box, fill=(15, 23, 42), outline=(16, 185, 129), width=2)
    # Battery terminals
    draw.rectangle([(c3_x1 + 50, c3_y1 + 50), (c3_x1 + 75, c3_y1 + 60)], fill=(239, 68, 68)) # Positive Red
    draw.rectangle([(c3_x2 - 75, c3_y1 + 50), (c3_x2 - 50, c3_y1 + 60)], fill=(71, 85, 105)) # Negative Black
    # Internal charge level
    draw.rectangle([(c3_x1 + 26, c3_y1 + 70), (c3_x2 - 26, c3_y1 + 170)], fill=(6, 78, 59), outline=(16, 185, 129), width=1)
    draw.text((c3_x1 + 50, c3_y1 + 110), "DC STORAGE BANK", fill=(52, 211, 153), font=font_brand)

    draw.text((c3_x1 + 20, c3_y1 + 195), "Nominal Bus Voltage Options:", fill=(203, 213, 225), font=font_box_sub)
    draw.text((c3_x1 + 20, c3_y1 + 220), "• 12V DC System:", fill=(148, 163, 184), font=font_metric_label)
    draw.text((c3_x1 + 150, c3_y1 + 218), "High Amps", fill=(239, 68, 68), font=font_metric_val)

    draw.text((c3_x1 + 20, c3_y1 + 250), "• 24V DC System:", fill=(148, 163, 184), font=font_metric_label)
    draw.text((c3_x1 + 150, c3_y1 + 248), "Moderate Amps", fill=(245, 158, 11), font=font_metric_val)

    draw.text((c3_x1 + 20, c3_y1 + 280), "• 48V DC System:", fill=(148, 163, 184), font=font_metric_label)
    draw.text((c3_x1 + 150, c3_y1 + 278), "Lowest Amps", fill=(16, 185, 129), font=font_metric_val)

    # Downstream note
    draw.rounded_rectangle([(c3_x1 + 16, c3_y1 + 315), (c3_x2 - 16, c3_y2 - 15)], radius=8, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
    draw.text((c3_x1 + 26, c3_y1 + 323), "SYSTEM ADVANTAGE", fill=(52, 211, 153), font=font_brand)
    draw.text((c3_x1 + 26, c3_y1 + 342), "Doubling battery voltage cuts charge", fill=(203, 213, 225), font=font_box_sub)
    draw.text((c3_x1 + 26, c3_y1 + 360), "controller amperage requirement in half.", fill=(203, 213, 225), font=font_box_sub)

    # 4. Connecting Buses / Arrows between cards
    # Arrow 1: Solar Array -> Charge Controller
    arr1_y = 310
    draw.line([(360, arr1_y), (440, arr1_y)], fill=(56, 189, 248), width=3)
    draw.polygon([(435, arr1_y - 6), (445, arr1_y), (435, arr1_y + 6)], fill=(56, 189, 248))
    # Label over Arrow 1
    draw.text((375, arr1_y - 20), "PV Input", fill=(56, 189, 248), font=font_brand)
    draw.text((372, arr1_y + 8), "(Voc, Isc)", fill=(148, 163, 184), font=font_metric_label)

    # Arrow 2: Charge Controller -> Battery Bank
    arr2_y = 310
    draw.line([(800, arr2_y), (880, arr2_y)], fill=(16, 185, 129), width=3)
    draw.polygon([(875, arr2_y - 6), (885, arr2_y), (875, arr2_y + 6)], fill=(16, 185, 129))
    # Label over Arrow 2
    draw.text((812, arr2_y - 20), "DC Charge", fill=(16, 185, 129), font=font_brand)
    draw.text((818, arr2_y + 8), "Output (A)", fill=(148, 163, 184), font=font_metric_label)

    # 5. Footer Information Bar
    draw.rectangle([(40, 555), (1160, 645)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 568), "CRITICAL SIZING SPECIFICATIONS & SAFETY CHECKLIST:", fill=(245, 158, 11), font=font_brand)
    draw.text(
        (60, 590),
        "1. Nominal Current: Calculate baseline DC output (Array Watts ÷ Battery Voltage).  2. Planning Buffer: Add illustrative 20% margin for peak irradiance.",
        fill=(203, 213, 225),
        font=font_footer,
    )
    draw.text(
        (60, 612),
        "3. Cold Temperature Voc: Calculate record low temperature expansion to verify total array Voc never exceeds the controller's absolute maximum DC input voltage.",
        fill=(148, 163, 184),
        font=font_footer,
    )

    # Save to WebP
    out_dir = os.path.join("public", "images", "calculators")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "solar-charge-controller-system.webp")
    img.save(out_path, "WEBP", quality=88, method=6)
    
    file_size = os.path.getsize(out_path)
    print(f"Generated {out_path} - Size: {file_size} bytes ({file_size / 1024:.2f} KB)")

if __name__ == "__main__":
    create_hero_image()
