import os
from PIL import Image, ImageDraw, ImageFont

def get_fonts():
    try:
        font_brand = ImageFont.truetype("arial.ttf", 13)
        font_title = ImageFont.truetype("arialbd.ttf", 28)
        font_subtitle = ImageFont.truetype("arial.ttf", 15)
        font_box_header = ImageFont.truetype("arialbd.ttf", 16)
        font_item_title = ImageFont.truetype("arialbd.ttf", 14)
        font_item_sub = ImageFont.truetype("arial.ttf", 12)
        font_formula = ImageFont.truetype("arialbd.ttf", 13)
        font_footer = ImageFont.truetype("arial.ttf", 12)
        font_badge = ImageFont.truetype("arialbd.ttf", 12)
        return {
            "brand": font_brand,
            "title": font_title,
            "subtitle": font_subtitle,
            "box_header": font_box_header,
            "item_title": font_item_title,
            "item_sub": font_item_sub,
            "formula": font_formula,
            "footer": font_footer,
            "badge": font_badge,
        }
    except Exception:
        default = ImageFont.load_default()
        return {k: default for k in ["brand", "title", "subtitle", "box_header", "item_title", "item_sub", "formula", "footer", "badge"]}

def create_calculator_hero():
    width = 1200
    height = 675
    img = Image.new("RGB", (width, height), color=(15, 23, 42))  # Slate 900
    draw = ImageDraw.Draw(img)
    fonts = get_fonts()

    # Background grid
    grid_color = (30, 41, 59)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # Top header banner
    draw.rectangle([(40, 25), (1160, 115)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 36), "CALCMYPOWER.COM  •  UTILITY RATE & BILLING DECONSTRUCTION MATRIX", fill=(56, 189, 248), font=fonts["brand"])
    draw.text((60, 56), "Electricity Cost Calculator: Monthly kWh & Bill Breakdown", fill=(255, 255, 255), font=fonts["title"])
    draw.text((60, 93), "Deconstructing Volumetric Supply, Delivery Riders, Fixed Service Charges & Effective Rate", fill=(148, 163, 184), font=fonts["subtitle"])

    # Badge
    draw.rounded_rectangle([(940, 48), (1140, 85)], radius=6, fill=(15, 43, 40), outline=(16, 185, 129), width=1)
    draw.text((955, 58), "ENGINEERING TOOL", fill=(52, 211, 153), font=fonts["badge"])

    # Three Columns
    col_width = 350
    top_y = 135
    bottom_y = 575

    # Column 1: Bill Cost Components
    c1_x1 = 40
    c1_x2 = c1_x1 + col_width
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(59, 130, 246), width=2)
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, top_y + 44)], radius=12, fill=(29, 78, 216))
    draw.rectangle([(c1_x1, top_y + 32), (c1_x2, top_y + 44)], fill=(29, 78, 216))
    draw.text((c1_x1 + 18, top_y + 12), "1. COST COMPONENTS", fill=(255, 255, 255), font=fonts["box_header"])

    b1 = [(c1_x1 + 14, top_y + 55), (c1_x2 - 14, top_y + 145)]
    draw.rounded_rectangle(b1, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c1_x1 + 24, top_y + 65), "Energy Supply (77.8%):", fill=(56, 189, 248), font=fonts["item_title"])
    draw.text((c1_x1 + 24, top_y + 87), "Commodity generation rate (kWh x Rate)", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c1_x1 + 24, top_y + 110), "Variable volumetric charge driven directly", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c1_x1 + 24, top_y + 126), "by home kilowatt-hour consumption.", fill=(148, 163, 184), font=fonts["item_sub"])

    b2 = [(c1_x1 + 14, top_y + 155), (c1_x2 - 14, top_y + 245)]
    draw.rounded_rectangle(b2, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c1_x1 + 24, top_y + 165), "Fixed Customer Charge (8.1%):", fill=(251, 146, 60), font=fonts["item_title"])
    draw.text((c1_x1 + 24, top_y + 187), "Monthly base meter infrastructure fee", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c1_x1 + 24, top_y + 210), "Incurred even if 0 kWh consumed during", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c1_x1 + 24, top_y + 226), "vacations, outages, or 100% solar net.", fill=(148, 163, 184), font=fonts["item_sub"])

    b3 = [(c1_x1 + 14, top_y + 255), (c1_x2 - 14, top_y + 345)]
    draw.rounded_rectangle(b3, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c1_x1 + 24, top_y + 265), "Delivery Riders & Grid (9.7%):", fill=(168, 85, 247), font=fonts["item_title"])
    draw.text((c1_x1 + 24, top_y + 287), "Transmission lines, substations, mandate", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c1_x1 + 24, top_y + 310), "Local distribution maintenance and state", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c1_x1 + 24, top_y + 326), "environmental compliance riders.", fill=(148, 163, 184), font=fonts["item_sub"])

    b4 = [(c1_x1 + 14, top_y + 355), (c1_x2 - 14, top_y + 425)]
    draw.rounded_rectangle(b4, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c1_x1 + 24, top_y + 365), "Taxes & Local Assessments (4.3%):", fill=(52, 211, 153), font=fonts["item_title"])
    draw.text((c1_x1 + 24, top_y + 387), "Municipal franchise fees and state sales tax", fill=(148, 163, 184), font=fonts["item_sub"])

    # Column 2: Authoritative Benchmark Scenario (900 kWh)
    c2_x1 = c1_x2 + 35
    c2_x2 = c2_x1 + col_width
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(16, 185, 129), width=2)
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, top_y + 44)], radius=12, fill=(6, 78, 59))
    draw.rectangle([(c2_x1, top_y + 32), (c2_x2, top_y + 44)], fill=(6, 78, 59))
    draw.text((c2_x1 + 18, top_y + 12), "2. BENCHMARK ANATOMY (900 kWh)", fill=(255, 255, 255), font=fonts["box_header"])

    # Line item table in column 2
    items = [
        ("Monthly Usage:", "900 kWh", (255, 255, 255)),
        ("Base Energy Rate:", "$0.1600 / kWh", (56, 189, 248)),
        ("Energy Charge:", "$144.00", (255, 255, 255)),
        ("Customer Charge (Fixed):", "$15.00", (251, 146, 60)),
        ("Delivery / Regulatory Riders:", "$18.00", (168, 85, 247)),
        ("Municipal Taxes / Fees:", "$8.00", (52, 211, 153)),
    ]
    cur_y = top_y + 60
    for label, val, val_col in items:
        draw.text((c2_x1 + 20, cur_y), label, fill=(148, 163, 184), font=fonts["item_title"])
        draw.text((c2_x2 - 130, cur_y), val, fill=val_col, font=fonts["formula"])
        draw.line([(c2_x1 + 20, cur_y + 24), (c2_x2 - 20, cur_y + 24)], fill=(51, 65, 85), width=1)
        cur_y += 38

    # Big Total Box
    total_box = [(c2_x1 + 14, cur_y + 15), (c2_x2 - 14, cur_y + 105)]
    draw.rounded_rectangle(total_box, radius=8, fill=(15, 23, 42), outline=(16, 185, 129), width=2)
    draw.text((c2_x1 + 24, cur_y + 25), "TOTAL ESTIMATED BILL", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c2_x1 + 24, cur_y + 48), "$185.00 / month", fill=(52, 211, 153), font=fonts["title"])

    draw.text((c2_x1 + 20, bottom_y - 40), "Daily Average: $6.17 / day", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c2_x1 + 20, bottom_y - 22), "Annual Projection: $2,220.00 / year", fill=(148, 163, 184), font=fonts["item_sub"])

    # Column 3: Effective Rate Formula & Sizing Logic
    c3_x1 = c2_x2 + 35
    c3_x2 = c3_x1 + col_width
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(234, 88, 12), width=2)
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, top_y + 44)], radius=12, fill=(154, 52, 18))
    draw.rectangle([(c3_x1, top_y + 32), (c3_x2, top_y + 44)], fill=(154, 52, 18))
    draw.text((c3_x1 + 18, top_y + 12), "3. EFFECTIVE RATE FORMULA", fill=(255, 255, 255), font=fonts["box_header"])

    f1_box = [(c3_x1 + 14, top_y + 60), (c3_x2 - 14, top_y + 160)]
    draw.rounded_rectangle(f1_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 70), "Effective Cost Formula:", fill=(251, 146, 60), font=fonts["item_title"])
    draw.text((c3_x1 + 24, top_y + 94), "Rate_effective = Total Bill / Total kWh", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 118), "$185.00 / 900 kWh = $0.2056 / kWh", fill=(56, 189, 248), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 138), "True rate is 20.56 cents / kWh", fill=(52, 211, 153), font=fonts["item_sub"])

    f2_box = [(c3_x1 + 14, top_y + 175), (c3_x2 - 14, top_y + 295)]
    draw.rounded_rectangle(f2_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 185), "Nominal vs. Effective Gap:", fill=(56, 189, 248), font=fonts["item_title"])
    draw.text((c3_x1 + 24, top_y + 210), "Nominal Rate: $0.1600 / kWh", fill=(148, 163, 184), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 232), "Effective Rate: $0.2056 / kWh", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 258), "Fixed charges and riders inflate actual", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c3_x1 + 24, top_y + 276), "unit cost by +28.5% above brochure rate.", fill=(251, 146, 60), font=fonts["item_sub"])

    f3_box = [(c3_x1 + 14, top_y + 310), (c3_x2 - 14, top_y + 420)]
    draw.rounded_rectangle(f3_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 320), "Solar & Battery Sizing Rule:", fill=(168, 85, 247), font=fonts["item_title"])
    draw.text((c3_x1 + 24, top_y + 345), "Do not use nominal rate for ROI.", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 370), "Always isolate avoidable volumetric kWh", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c3_x1 + 24, top_y + 388), "vs unavoidable fixed grid connection fees.", fill=(148, 163, 184), font=fonts["item_sub"])

    # Bottom footer banner
    draw.rectangle([(40, 595), (1160, 645)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 612), "REFERENCE STANDARD: EIA Form EIA-861M, NARUC rate design rules. For appliance-level kWh auditing, visit /electricity-use-calculator.", fill=(148, 163, 184), font=fonts["footer"])

    # Save
    out_dir = os.path.join("public", "images", "calculators")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "electricity-cost-calculator.webp")
    img.save(out_path, "WEBP", quality=90)
    print("Saved Asset #11 hero image:", out_path)

def create_article_hero():
    width = 1200
    height = 675
    img = Image.new("RGB", (width, height), color=(15, 23, 42))  # Slate 900
    draw = ImageDraw.Draw(img)
    fonts = get_fonts()

    # Background grid
    grid_color = (30, 41, 59)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # Top header banner
    draw.rectangle([(40, 25), (1160, 115)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 36), "CALCMYPOWER.COM  •  TECHNICAL SIZING & UTILITY BILLING GUIDE", fill=(56, 189, 248), font=fonts["brand"])
    draw.text((60, 56), "How to Calculate Your Electricity Bill: Step-by-Step Guide", fill=(255, 255, 255), font=fonts["title"])
    draw.text((60, 93), "Demystifying Meter Readings, Supply vs Delivery Tariffs, Fixed Surcharges & Effective kWh Cost", fill=(148, 163, 184), font=fonts["subtitle"])

    # Badge
    draw.rounded_rectangle([(950, 48), (1140, 85)], radius=6, fill=(30, 27, 75), outline=(129, 140, 248), width=1)
    draw.text((972, 58), "EDITORIAL GUIDE", fill=(165, 180, 252), font=fonts["badge"])

    # Three Columns
    col_width = 350
    top_y = 135
    bottom_y = 575

    # Column 1: Meter Reading & Usage Cycle
    c1_x1 = 40
    c1_x2 = c1_x1 + col_width
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(14, 165, 233), width=2)
    draw.rounded_rectangle([(c1_x1, top_y), (c1_x2, top_y + 44)], radius=12, fill=(3, 105, 161))
    draw.rectangle([(c1_x1, top_y + 32), (c1_x2, top_y + 44)], fill=(3, 105, 161))
    draw.text((c1_x1 + 18, top_y + 12), "1. METER & USAGE AUDIT", fill=(255, 255, 255), font=fonts["box_header"])

    b1 = [(c1_x1 + 14, top_y + 60), (c1_x2 - 14, top_y + 155)]
    draw.rounded_rectangle(b1, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c1_x1 + 24, top_y + 70), "Meter Reading Intervals:", fill=(56, 189, 248), font=fonts["item_title"])
    draw.text((c1_x1 + 24, top_y + 92), "Previous Reading: 42,150 kWh", fill=(148, 163, 184), font=fonts["formula"])
    draw.text((c1_x1 + 24, top_y + 112), "Current Reading:  43,050 kWh", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c1_x1 + 24, top_y + 132), "Net Billed Energy: 900 kWh (30 Days)", fill=(52, 211, 153), font=fonts["formula"])

    b2 = [(c1_x1 + 14, top_y + 170), (c1_x2 - 14, top_y + 275)]
    draw.rounded_rectangle(b2, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c1_x1 + 24, top_y + 180), "Billing Period Length:", fill=(251, 146, 60), font=fonts["item_title"])
    draw.text((c1_x1 + 24, top_y + 204), "Standard cycle varies from 28 to 33 days.", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c1_x1 + 24, top_y + 228), "Always evaluate Average Daily kWh to detect", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c1_x1 + 24, top_y + 246), "seasonal heating/cooling demand spikes.", fill=(148, 163, 184), font=fonts["item_sub"])

    b3 = [(c1_x1 + 14, top_y + 290), (c1_x2 - 14, top_y + 400)]
    draw.rounded_rectangle(b3, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c1_x1 + 24, top_y + 300), "Smart Meter Interval Data:", fill=(168, 85, 247), font=fonts["item_title"])
    draw.text((c1_x1 + 24, top_y + 324), "Advanced Metering (AMI):", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c1_x1 + 24, top_y + 348), "Records 15-minute load profiles to support", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c1_x1 + 24, top_y + 366), "Time-of-Use (TOU) variable pricing tariffs.", fill=(148, 163, 184), font=fonts["item_sub"])

    # Column 2: Rate Tariff Structures
    c2_x1 = c1_x2 + 35
    c2_x2 = c2_x1 + col_width
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(168, 85, 247), width=2)
    draw.rounded_rectangle([(c2_x1, top_y), (c2_x2, top_y + 44)], radius=12, fill=(107, 33, 168))
    draw.rectangle([(c2_x1, top_y + 32), (c2_x2, top_y + 44)], fill=(107, 33, 168))
    draw.text((c2_x1 + 18, top_y + 12), "2. RATE STRUCTURE TYPES", fill=(255, 255, 255), font=fonts["box_header"])

    t1 = [(c2_x1 + 14, top_y + 60), (c2_x2 - 14, top_y + 160)]
    draw.rounded_rectangle(t1, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c2_x1 + 24, top_y + 70), "Flat Volumetric Tariff:", fill=(56, 189, 248), font=fonts["item_title"])
    draw.text((c2_x1 + 24, top_y + 94), "Same $/kWh rate at all hours of day.", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c2_x1 + 24, top_y + 118), "Simplest billing design; predictable cost", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c2_x1 + 24, top_y + 136), "proportional strictly to monthly volume.", fill=(148, 163, 184), font=fonts["item_sub"])

    t2 = [(c2_x1 + 14, top_y + 175), (c2_x2 - 14, top_y + 285)]
    draw.rounded_rectangle(t2, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c2_x1 + 24, top_y + 185), "Tiered / Inverted Block Tariff:", fill=(251, 146, 60), font=fonts["item_title"])
    draw.text((c2_x1 + 24, top_y + 209), "Tier 1: Baseline kWh at discounted rate", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c2_x1 + 24, top_y + 233), "Tier 2: Excess kWh billed at higher rate.", fill=(251, 146, 60), font=fonts["formula"])
    draw.text((c2_x1 + 24, top_y + 258), "Encourages conservation; heavy users pay more.", fill=(148, 163, 184), font=fonts["item_sub"])

    t3 = [(c2_x1 + 14, top_y + 300), (c2_x2 - 14, top_y + 410)]
    draw.rounded_rectangle(t3, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c2_x1 + 24, top_y + 310), "Time-of-Use (TOU) Tariff:", fill=(52, 211, 153), font=fonts["item_title"])
    draw.text((c2_x1 + 24, top_y + 334), "On-Peak: 4 PM to 9 PM (high $/kWh)", fill=(239, 68, 68), font=fonts["formula"])
    draw.text((c2_x1 + 24, top_y + 356), "Off-Peak: Overnight & midday (low $/kWh)", fill=(52, 211, 153), font=fonts["formula"])
    draw.text((c2_x1 + 24, top_y + 380), "Essential for EV charging & battery timers.", fill=(148, 163, 184), font=fonts["item_sub"])

    # Column 3: The Universal Bill Calculation
    c3_x1 = c2_x2 + 35
    c3_x2 = c3_x1 + col_width
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, bottom_y)], radius=12, fill=(24, 34, 53), outline=(16, 185, 129), width=2)
    draw.rounded_rectangle([(c3_x1, top_y), (c3_x2, top_y + 44)], radius=12, fill=(6, 78, 59))
    draw.rectangle([(c3_x1, top_y + 32), (c3_x2, top_y + 44)], fill=(6, 78, 59))
    draw.text((c3_x1 + 18, top_y + 12), "3. THE COMPLETE BILL EQUATION", fill=(255, 255, 255), font=fonts["box_header"])

    eq_box = [(c3_x1 + 14, top_y + 60), (c3_x2 - 14, top_y + 195)]
    draw.rounded_rectangle(eq_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 70), "The Universal Bill Equation:", fill=(52, 211, 153), font=fonts["item_title"])
    draw.text((c3_x1 + 24, top_y + 94), "Total Bill = Energy + Fixed + Riders + Tax", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 118), "= (900 kWh x $0.16) + $15 + $18 + $8", fill=(56, 189, 248), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 142), "= $144.00 + $15.00 + $18.00 + $8.00", fill=(251, 146, 60), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 166), "= $185.00 Total Due", fill=(52, 211, 153), font=fonts["item_title"])

    eff_box = [(c3_x1 + 14, top_y + 210), (c3_x2 - 14, top_y + 320)]
    draw.rounded_rectangle(eff_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 220), "Effective Unit Cost Check:", fill=(251, 146, 60), font=fonts["item_title"])
    draw.text((c3_x1 + 24, top_y + 244), "Effective Rate = $185.00 / 900 kWh", fill=(255, 255, 255), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 268), "= $0.2056 / kWh (20.56 cents / kWh)", fill=(56, 189, 248), font=fonts["formula"])
    draw.text((c3_x1 + 24, top_y + 292), "Always use effective rate for ROI checks.", fill=(148, 163, 184), font=fonts["item_sub"])

    tip_box = [(c3_x1 + 14, top_y + 335), (c3_x2 - 14, top_y + 420)]
    draw.rounded_rectangle(tip_box, radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((c3_x1 + 24, top_y + 345), "Utility Audit Verification:", fill=(168, 85, 247), font=fonts["item_title"])
    draw.text((c3_x1 + 24, top_y + 370), "Compare line items monthly to catch billing", fill=(148, 163, 184), font=fonts["item_sub"])
    draw.text((c3_x1 + 24, top_y + 388), "multiplier errors or estimated meter reads.", fill=(148, 163, 184), font=fonts["item_sub"])

    # Bottom footer banner
    draw.rectangle([(40, 595), (1160, 645)], fill=(24, 34, 53), outline=(51, 65, 85), width=1)
    draw.text((60, 612), "AUTHORITATIVE GUIDANCE: Grounded in DOE, EIA Form 861M, and NARUC rate standards. Interactive calculator at /electricity-cost-calculator.", fill=(148, 163, 184), font=fonts["footer"])

    # Save
    out_dir = os.path.join("public", "images", "articles")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "how-to-calculate-electricity-bill.webp")
    img.save(out_path, "WEBP", quality=90)
    print("Saved Article #8 hero image:", out_path)

if __name__ == "__main__":
    create_calculator_hero()
    create_article_hero()
