import os
from PIL import Image, ImageDraw, ImageFont

def create_hero_image():
    width = 1200
    height = 675
    # Dark Slate Blueprint background
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
        font_title = ImageFont.truetype("arialbd.ttf", 26)
        font_subtitle = ImageFont.truetype("arial.ttf", 14)
        font_box_header = ImageFont.truetype("arialbd.ttf", 16)
        font_metric_label = ImageFont.truetype("arial.ttf", 12)
        font_metric_val = ImageFont.truetype("arialbd.ttf", 15)
        font_badge = ImageFont.truetype("arialbd.ttf", 12)
        font_footer = ImageFont.truetype("arial.ttf", 12)
    except Exception:
        font_brand = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_box_header = ImageFont.load_default()
        font_metric_label = ImageFont.load_default()
        font_metric_val = ImageFont.load_default()
        font_badge = ImageFont.load_default()
        font_footer = ImageFont.load_default()

    # 2. Header Banner
    draw.rectangle([(40, 22), (1160, 110)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 32), "CALCMYPOWER.COM  *  ELECTRICAL BRANCH CIRCUIT SIZING SPECIFICATION", fill=(56, 189, 248), font=font_brand)  # Sky 400
    draw.text((60, 52), "How Many Watts Can a 15-Amp or 20-Amp Circuit Handle?", fill=(255, 255, 255), font=font_title)
    draw.text((60, 85), "Nominal Wattage vs. NEC 80% Continuous-Load Rules & 1,500W Space Heater Load Analysis", fill=(148, 163, 184), font=font_subtitle)

    # Top right pill badge
    draw.rounded_rectangle([(940, 42), (1140, 80)], radius=6, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
    draw.text((958, 53), "NEC 120V STANDARD", fill=(56, 189, 248), font=font_badge)

    # 3. Three Comparison Architecture Columns
    col_width = 350
    gap = 25
    c1_x1 = 40
    c1_x2 = c1_x1 + col_width

    c2_x1 = c1_x2 + gap
    c2_x2 = c2_x1 + col_width

    c3_x1 = c2_x2 + gap
    c3_x2 = c3_x1 + col_width

    top_y = 125
    bot_y = 515

    # ================= CARD 1: 15-Amp Circuit (Left) =================
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, bot_y)], radius=12, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    # Header strip (Blue)
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, top_y + 44)], radius=12, fill=(30, 58, 138))  # Blue 900
    draw.text((c1_x1 + 18, top_y + 13), "15-Amp Branch Circuit (120V)", fill=(147, 197, 253), font=font_box_header)

    card1_items = [
        ("Nominal Maximum Power", "1,800 Watts (15A x 120V)"),
        ("NEC 80% Continuous Limit", "1,440 Watts (12A x 120V)"),
        ("Minimum Copper Wire Gauge", "14 AWG Copper (NM-B / Romex)"),
        ("Receptacle Type", "NEMA 5-15R (Standard Duplex)"),
        ("Typical Household Locations", "Bedrooms, Living Rooms, Lighting"),
        ("Safety Headroom Note", "Loads running 3+ hrs limited to 80%"),
    ]

    curr_y = top_y + 55
    for label, val in card1_items:
        draw.text((c1_x1 + 16, curr_y), label.upper(), fill=(148, 163, 184), font=font_metric_label)
        draw.text((c1_x1 + 16, curr_y + 16), val, fill=(255, 255, 255), font=font_metric_val)
        draw.line([(c1_x1 + 16, curr_y + 42), (c1_x2 - 16, curr_y + 42)], fill=(40, 53, 76), width=1)
        curr_y += 50

    # Highlight box in Card 1
    draw.rounded_rectangle([(c1_x1 + 14, bot_y - 60), (c1_x2 - 14, bot_y - 12)], radius=8, fill=(15, 23, 42), outline=(59, 130, 246), width=1)
    draw.text((c1_x1 + 24, bot_y - 50), "Safe Continuous Ceiling: 1,440W", fill=(96, 165, 250), font=font_box_header)
    draw.text((c1_x1 + 24, bot_y - 30), "Exceeding 12A continuous trips breaker", fill=(148, 163, 184), font=font_metric_label)

    # ================= CARD 2: 1,500W Space Heater Load Stress (Center) =================
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, bot_y)], radius=12, fill=(24, 34, 53), outline=(245, 158, 11), width=2)
    # Header strip (Amber)
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, top_y + 44)], radius=12, fill=(120, 53, 15))  # Amber 900
    draw.text((c2_x1 + 18, top_y + 13), "1,500W Space Heater Reality", fill=(253, 230, 138), font=font_box_header)

    card2_items = [
        ("Heater Operating Current", "12.5 Amps (1,500W / 120V)"),
        ("Percent of 15A Nominal Load", "83.3% of total 1,800W rating"),
        ("15A Continuous Limit Check", "EXCEEDS 1,440W limit by 60W!"),
        ("Remaining Circuit Headroom", "Only 2.5 Amps (300 Watts) left"),
        ("Why Breakers Nuisance Trip", "Laptop (100W) + TV (150W) trips it"),
        ("Recommended Solution", "Plug into dedicated 20A circuit"),
    ]

    curr_y = top_y + 55
    for label, val in card2_items:
        draw.text((c2_x1 + 16, curr_y), label.upper(), fill=(148, 163, 184), font=font_metric_label)
        draw.text((c2_x1 + 16, curr_y + 16), val, fill=(255, 255, 255) if "EXCEEDS" not in val else (252, 165, 165), font=font_metric_val)
        draw.line([(c2_x1 + 16, curr_y + 42), (c2_x2 - 16, curr_y + 42)], fill=(40, 53, 76), width=1)
        curr_y += 50

    # Highlight box in Card 2
    draw.rounded_rectangle([(c2_x1 + 14, bot_y - 60), (c2_x2 - 14, bot_y - 12)], radius=8, fill=(15, 23, 42), outline=(245, 158, 11), width=1)
    draw.text((c2_x1 + 24, bot_y - 50), "Warning: Heavy Continuous Draw", fill=(251, 191, 36), font=font_box_header)
    draw.text((c2_x1 + 24, bot_y - 30), "Do not combine with other high-draw loads", fill=(148, 163, 184), font=font_metric_label)

    # ================= CARD 3: 20-Amp Circuit (Right) =================
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, bot_y)], radius=12, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    # Header strip (Emerald)
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, top_y + 44)], radius=12, fill=(6, 78, 59))  # Emerald 900
    draw.text((c3_x1 + 18, top_y + 13), "20-Amp Branch Circuit (120V)", fill=(167, 243, 208), font=font_box_header)

    card3_items = [
        ("Nominal Maximum Power", "2,400 Watts (20A x 120V)"),
        ("NEC 80% Continuous Limit", "1,920 Watts (16A x 120V)"),
        ("Minimum Copper Wire Gauge", "12 AWG Copper (Required by Code)"),
        ("Receptacle Type", "NEMA 5-20R (T-Slot Horizontal Pin)"),
        ("Typical Household Locations", "Kitchen Small Appliances, Bathroom"),
        ("Space Heater Headroom", "Leaves 420W continuous / 900W peak"),
    ]

    curr_y = top_y + 55
    for label, val in card3_items:
        draw.text((c3_x1 + 16, curr_y), label.upper(), fill=(148, 163, 184), font=font_metric_label)
        draw.text((c3_x1 + 16, curr_y + 16), val, fill=(255, 255, 255), font=font_metric_val)
        draw.line([(c3_x1 + 16, curr_y + 42), (c3_x2 - 16, curr_y + 42)], fill=(40, 53, 76), width=1)
        curr_y += 50

    # Highlight box in Card 3
    draw.rounded_rectangle([(c3_x1 + 14, bot_y - 60), (c3_x2 - 14, bot_y - 12)], radius=8, fill=(15, 23, 42), outline=(16, 185, 129), width=1)
    draw.text((c3_x1 + 24, bot_y - 50), "Safe Continuous Ceiling: 1,920W", fill=(52, 211, 153), font=font_box_header)
    draw.text((c3_x1 + 24, bot_y - 30), "Handles 1,500W heater with 420W cushion", fill=(148, 163, 184), font=font_metric_label)

    # 4. Bottom Rule & Warning Callout
    draw.rounded_rectangle([(40, 530), (1160, 645)], radius=10, fill=(24, 34, 53), outline=(71, 85, 105), width=1)
    draw.text((60, 542), "CRITICAL ELECTRICAL SAFETY & CODE COMPLIANCE RULES (NFPA 70 / NEC):", fill=(248, 113, 113), font=font_box_header)
    draw.text((60, 568), "1. NEC Article 210.19(A)(1) & 210.20(A): Branch circuit overcurrent devices must be sized for at least 125% of continuous loads (3+ continuous hours).", fill=(226, 232, 240), font=font_footer)
    draw.text((60, 588), "2. NEVER upsize a 15A circuit breaker to a 20A breaker without verifying every foot of concealed branch wiring is 12 AWG copper. Oversizing breakers on 14 AWG wire creates an extreme electrical fire hazard.", fill=(226, 232, 240), font=font_footer)
    draw.text((60, 608), "3. Receptacle appearance alone is not proof of wiring size. Consult a licensed electrical contractor for physical load testing and panel modifications.", fill=(148, 163, 184), font=font_footer)

    # Save as high-quality WebP
    out_dir = "public/images/articles"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "how-many-watts-can-a-15-amp-or-20-amp-circuit-handle.webp")
    img.save(out_path, "WEBP", quality=92)
    print(f"Generated schematic successfully at: {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    create_hero_image()
