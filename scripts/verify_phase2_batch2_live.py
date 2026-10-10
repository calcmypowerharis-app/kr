import urllib.request
import re
from html import unescape
import time

routes_to_verify = [
    {
        "path": "/solar-system-size-calculator",
        "description": "Solar System Size Calculator",
        "expected_links": [
            "/how-many-solar-panels-do-i-need",
            "/how-much-energy-does-a-solar-panel-produce",
        ],
    },
    {
        "path": "/inverter-size-calculator",
        "description": "Inverter Size Calculator",
        "expected_links": [
            "/battery-capacity-calculator",
            "/how-many-amp-hours-do-i-need",
        ],
    },
    {
        "path": "/voltage-drop-calculator",
        "description": "Voltage Drop Calculator",
        "expected_links": [
            "/watts-to-amps-calculator",
            "/solar-panels-series-vs-parallel",
        ],
    },
    {
        "path": "/how-many-amp-hours-do-i-need",
        "description": "Battery Bank Sizing Guide",
        "expected_links": [
            "/how-to-calculate-amp-hours-of-a-battery-bank",
            "/how-long-will-a-100ah-battery-last",
        ],
    },
    {
        "path": "/how-to-size-a-solar-charge-controller",
        "description": "Solar Charge Controller Sizing Guide",
        "expected_links": [
            "/solar-panels-series-vs-parallel",
            "/solar-system-size-calculator",
        ],
    },
    {
        "path": "/continuous-power-generators",
        "description": "Continuous Power Generators Guide",
        "expected_links": [
            "/generator-fuel-consumption-calculator",
            "/how-much-gas-does-a-generator-use",
        ],
    },
    {
        "path": "/what-does-ah-mean-on-a-battery",
        "description": "Battery Amp-Hours Explained Guide",
        "expected_links": [
            "/how-to-calculate-amp-hours-of-a-battery-bank",
        ],
    },
    {
        "path": "/how-long-will-a-100ah-battery-last",
        "description": "100Ah Battery Runtime Guide",
        "expected_links": [
            "/how-many-amp-hours-do-i-need",
            "/how-to-calculate-amp-hours-of-a-battery-bank",
        ],
    },
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Phase2Batch2Verifier/1.0",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
}

print("=" * 80)
print(" CalcMyPower.com - Phase 2 Batch 2 Live Production Verification Suite")
print("=" * 80 + "\n")

all_passed = True
total_links_verified = 0

for route in routes_to_verify:
    url = f"https://calcmypower.com{route['path']}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            status = resp.status
            content = resp.read().decode("utf-8")
            
            missing_links = []
            for link in route["expected_links"]:
                total_links_verified += 1
                pattern = f'href="{link}"'
                if pattern not in content and f"href='{link}'" not in content:
                    missing_links.append(link)
            
            if status == 200 and len(missing_links) == 0:
                print(f"[PASS] {route['path']} ({route['description']})")
                print(f"  HTTP Status: {status} OK")
                for link in route["expected_links"]:
                    print(f"  Verified Link: {link} present in DOM")
            else:
                all_passed = False
                print(f"[FAIL] {route['path']} ({route['description']})")
                print(f"  HTTP Status: {status}")
                if missing_links:
                    print(f"  Missing Links: {missing_links}")
            print("-" * 80)
    except Exception as e:
        all_passed = False
        print(f"[ERROR] {route['path']}: {e}")
        print("-" * 80)

print(f"\nBATCH 2 VERIFICATION RESULT: {'ALL ROUTES & LINKS VERIFIED LIVE ON PRODUCTION (100% PASS)' if all_passed else 'PENDING DEPLOYMENT / CACHE REFRESH'}")
