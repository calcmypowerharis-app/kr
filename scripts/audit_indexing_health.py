import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

URLS = [
  "https://calcmypower.com",
  "https://calcmypower.com/about",
  "https://calcmypower.com/amps-to-watts-calculator",
  "https://calcmypower.com/battery-capacity-calculator",
  "https://calcmypower.com/calculators",
  "https://calcmypower.com/contact",
  "https://calcmypower.com/continuous-power-generators",
  "https://calcmypower.com/electricity-cost-calculator",
  "https://calcmypower.com/electricity-use-calculator",
  "https://calcmypower.com/generator-amperage-chart-calculator",
  "https://calcmypower.com/generator-fuel-consumption-calculator",
  "https://calcmypower.com/generator-size-calculator",
  "https://calcmypower.com/generator-wattage-chart",
  "https://calcmypower.com/how-long-does-it-take-to-charge-a-battery-with-solar-panels",
  "https://calcmypower.com/how-long-will-a-100ah-battery-last",
  "https://calcmypower.com/how-many-amp-hours-do-i-need",
  "https://calcmypower.com/how-many-solar-panels-do-i-need",
  "https://calcmypower.com/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle",
  "https://calcmypower.com/how-much-energy-does-a-solar-panel-produce",
  "https://calcmypower.com/how-much-gas-does-a-generator-use",
  "https://calcmypower.com/how-to-calculate-amp-hours-of-a-battery-bank",
  "https://calcmypower.com/how-to-calculate-electricity-bill",
  "https://calcmypower.com/how-to-calculate-electricity-usage",
  "https://calcmypower.com/how-to-calculate-watts-for-a-generator",
  "https://calcmypower.com/how-to-size-a-solar-charge-controller",
  "https://calcmypower.com/inverter-size-calculator",
  "https://calcmypower.com/privacy",
  "https://calcmypower.com/solar-battery-calculator",
  "https://calcmypower.com/solar-charge-controller-calculator",
  "https://calcmypower.com/solar-panel-tilt-calculator",
  "https://calcmypower.com/solar-panels-series-vs-parallel",
  "https://calcmypower.com/solar-system-size-calculator",
  "https://calcmypower.com/terms",
  "https://calcmypower.com/three-phase-power-calculator",
  "https://calcmypower.com/ups-battery-backup-calculator",
  "https://calcmypower.com/voltage-drop-calculator",
  "https://calcmypower.com/watts-to-amps-calculator",
  "https://calcmypower.com/what-does-ah-mean-on-a-battery",
  "https://calcmypower.com/what-is-a-watt-hour",
  "https://calcmypower.com/what-size-generator-do-i-need-for-my-house",
  "https://calcmypower.com/what-size-generator-to-run-a-refrigerator"
]

print(f"Auditing all {len(URLS)} live URLs...")
issues = []

for u in URLS:
    req = urllib.request.Request(
        u,
        headers={"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            status = resp.status
            headers = dict(resp.headers)
            html = resp.read().decode("utf-8")
            
            # Check X-Robots-Tag
            x_robots = headers.get("x-robots-tag", "")
            
            # Canonical check
            canonical_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', html, re.I)
            if not canonical_match:
                canonical_match = re.search(r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']canonical["\']', html, re.I)
            canonical = canonical_match.group(1) if canonical_match else "MISSING"
            
            # Meta robots check
            meta_robots = re.findall(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)["\']', html, re.I)
            
            # Title
            title_m = re.search(r'<title>([^<]+)</title>', html)
            title = title_m.group(1) if title_m else "MISSING"
            
            # Content size
            html_size_kb = len(html) / 1024
            
            is_ok = True
            problem_reasons = []
            if status != 200:
                is_ok = False
                problem_reasons.append(f"HTTP {status}")
            if "noindex" in x_robots.lower():
                is_ok = False
                problem_reasons.append("x-robots-tag: noindex")
            if any("noindex" in mr.lower() for mr in meta_robots):
                is_ok = False
                problem_reasons.append("meta robots noindex")
            if canonical == "MISSING":
                is_ok = False
                problem_reasons.append("canonical missing")
            elif canonical != u and not (u == "https://calcmypower.com" and canonical == "https://calcmypower.com/"):
                is_ok = False
                problem_reasons.append(f"canonical mismatch ({canonical} != {u})")
            if html_size_kb < 10:
                is_ok = False
                problem_reasons.append(f"thin SSR html ({html_size_kb:.1f} KB)")
                
            if not is_ok:
                issues.append((u, problem_reasons))
                print(f"FAIL: {u} -> {problem_reasons}")
            else:
                print(f"PASS: {u} | {html_size_kb:.1f} KB | Canonical OK | Title: {title[:40]}...")
                
    except Exception as e:
        issues.append((u, [str(e)]))
        print(f"ERROR: {u} -> {e}")

print("\n--- AUDIT SUMMARY ---")
print(f"Total checked: {len(URLS)}")
print(f"Total with technical blockers: {len(issues)}")
