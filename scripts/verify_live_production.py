import urllib.request
import re
from html import unescape

# Exact expected values matching src/app/ pages and layout title template (%s | CalcMyPower)
routes = [
    {
        "path": "/",
        "expected_title": "CalcMyPower | Power, Energy & Electrical Calculators",
        "expected_desc_fragment": "Size backup battery banks, convert watts to amps, and calculate generator wattage using transparent engineering formulas",
        "expected_canonical": "https://calcmypower.com",
    },
    {
        "path": "/calculators",
        "expected_title": "Electrical & Power Calculators Directory | CalcMyPower",
        "expected_desc_fragment": "Browse interactive electrical calculators and engineering sizing tools for backup generators",
        "expected_canonical": "https://calcmypower.com/calculators",
    },
    {
        "path": "/generator-fuel-consumption-calculator",
        "expected_title": "Generator Fuel Consumption Calculator | CalcMyPower",
        "expected_desc_fragment": "Estimate generator fuel use per hour, tank runtimes, and operating costs for gas, propane, and diesel models",
        "expected_canonical": "https://calcmypower.com/generator-fuel-consumption-calculator",
        "companion_link": "/how-much-gas-does-a-generator-use",
    },
    {
        "path": "/battery-capacity-calculator",
        "expected_title": "Battery Capacity & Bank Sizing Calculator | CalcMyPower",
        "expected_desc_fragment": "Calculate battery capacity in Amp-hours (Ah) and Watt-hours (Wh), configure series and parallel banks",
        "expected_canonical": "https://calcmypower.com/battery-capacity-calculator",
    },
    {
        "path": "/amps-to-watts-calculator",
        "expected_title": "Amps to Watts Calculator (DC, Single & 3-Phase AC) | CalcMyPower",
        "expected_desc_fragment": "Convert amps to watts across DC, single-phase 120V/240V, and three-phase AC circuits",
        "expected_canonical": "https://calcmypower.com/amps-to-watts-calculator",
    },
    {
        "path": "/voltage-drop-calculator",
        "expected_title": "Voltage Drop Calculator (AC, DC & Wire Sizing) | CalcMyPower",
        "expected_desc_fragment": "Calculate voltage drop, percentage loss, and receiving voltage for AC and DC circuits",
        "expected_canonical": "https://calcmypower.com/voltage-drop-calculator",
    },
    {
        "path": "/generator-amperage-chart-calculator",
        "expected_title": "Generator Amperage Chart & Output Calculator | CalcMyPower",
        "expected_desc_fragment": "Calculate generator amperage at 120V and 240V from 1kW to 26kW. Includes single and split-phase amp charts",
        "expected_canonical": "https://calcmypower.com/generator-amperage-chart-calculator",
    },
    {
        "path": "/how-much-gas-does-a-generator-use",
        "expected_title": "How Much Gas Does a Generator Use Per Hour? | CalcMyPower",
        "expected_desc_fragment": "Find out how much gas or propane a portable generator uses per hour at 25%, 50%, and 100% load",
        "expected_canonical": "https://calcmypower.com/how-much-gas-does-a-generator-use",
    },
    {
        "path": "/how-to-calculate-electricity-usage",
        "expected_title": "How to Calculate Electricity Usage (kWh & Watts) | CalcMyPower",
        "expected_desc_fragment": "Learn how to calculate appliance electricity usage in kilowatt-hours (kWh) from wattage and run hours",
        "expected_canonical": "https://calcmypower.com/how-to-calculate-electricity-usage",
    },
    {
        "path": "/how-to-calculate-electricity-bill",
        "expected_title": "How to Calculate Your Electric Bill (kWh & Rates) | CalcMyPower",
        "expected_desc_fragment": "Learn how to calculate your electric bill from monthly kWh usage and utility rates",
        "expected_canonical": "https://calcmypower.com/how-to-calculate-electricity-bill",
    },
    {
        "path": "/how-to-calculate-amp-hours-of-a-battery-bank",
        "expected_title": "How to Calculate Amp-Hours of a Battery Bank | CalcMyPower",
        "expected_desc_fragment": "Calculate battery bank amp-hours (Ah), voltage, and Watt-hours across series, parallel, and 2S2P configurations",
        "expected_canonical": "https://calcmypower.com/how-to-calculate-amp-hours-of-a-battery-bank",
    },
    {
        "path": "/solar-charge-controller-calculator",
        "expected_title": "Solar Charge Controller Calculator (MPPT & PWM Sizing) | CalcMyPower",
        "expected_desc_fragment": "Calculate the charge controller size needed for your solar panels",
        "expected_canonical": "https://calcmypower.com/solar-charge-controller-calculator",
        "companion_link": "/how-to-size-a-solar-charge-controller",
    },
]

print("================================================================================")
print(" CalcMyPower.com - Phase 2 Batch 1 Live Production Verification Suite")
print("================================================================================\n")
all_passed = True

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ProductionVerifier/1.0",
}

for route in routes:
    url = f"https://calcmypower.com{route['path']}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
            content = resp.read().decode('utf-8')
            
            # Extract title
            title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
            title = unescape(title_match.group(1).strip()) if title_match else "MISSING"
            
            # Extract description
            desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE)
            desc = unescape(desc_match.group(1).strip()) if desc_match else "MISSING"
            
            # Extract canonical
            canon_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content, re.IGNORECASE)
            canonical = unescape(canon_match.group(1).strip()) if canon_match else "MISSING"
            
            # Check title
            title_ok = title == route['expected_title']
            # Check double branding
            double_branding = title.count("CalcMyPower") > 1
            
            # Check desc fragment
            desc_ok = route['expected_desc_fragment'].lower() in desc.lower()
            
            # Check canonical
            canon_ok = canonical == route['expected_canonical']
            
            # Check companion link if needed
            comp_link = route.get('companion_link')
            comp_ok = True
            if comp_link:
                comp_ok = f'href="{comp_link}"' in content or f'href=\'{comp_link}\'' in content
                
            status_ok = (status == 200) and title_ok and (not double_branding) and desc_ok and canon_ok and comp_ok
            
            if not status_ok:
                all_passed = False
                print(f"[FAIL] {route['path']}")
                print(f"  HTTP Status: {status}")
                print(f"  Title: {title} (Expected: {route['expected_title']}, Double brand: {double_branding})")
                print(f"  Desc: {desc[:80]}... (Found fragment: {desc_ok})")
                print(f"  Canonical: {canonical} (Expected: {route['expected_canonical']})")
                if comp_link:
                    print(f"  Companion Link {comp_link}: Found = {comp_ok}")
            else:
                print(f"[PASS] {route['path']}")
                print(f"  Status: {status} OK")
                print(f"  Title: {title}")
                print(f"  Description: {desc[:80]}...")
                print(f"  Canonical: {canonical}")
                if comp_link:
                    print(f"  Companion Link to '{comp_link}': Verified present in DOM")
            print("-" * 80)
    except Exception as e:
        all_passed = False
        print(f"[ERROR] {route['path']}: {e}")
        print("-" * 80)

print(f"\nFINAL VERIFICATION RESULT: {'ALL 12 ROUTES PASSED (100% PRODUCTION VERIFIED)' if all_passed else 'SOME FAILED'}")
