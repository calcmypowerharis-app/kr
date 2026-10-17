import urllib.request
import ssl
import re

# Strict SSL verification using system trusted root certificates
ctx = ssl.create_default_context()

PAGE_URLS = [
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

TECHNICAL_ENDPOINTS = [
  "https://calcmypower.com/robots.txt",
  "https://calcmypower.com/sitemap.xml"
]

ALL_ENDPOINTS = PAGE_URLS + TECHNICAL_ENDPOINTS

print(f"Auditing all {len(ALL_ENDPOINTS)} production endpoints ({len(PAGE_URLS)} HTML pages + {len(TECHNICAL_ENDPOINTS)} crawl files) with strict SSL verification...\n", flush=True)

issues = []

# 1. Audit HTML Pages
for u in PAGE_URLS:
    req = urllib.request.Request(
        u,
        headers={"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            status = resp.status
            headers = dict(resp.headers)
            html = resp.read().decode("utf-8")
            
            x_robots = headers.get("x-robots-tag", "")
            
            canonical_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', html, re.I)
            if not canonical_match:
                canonical_match = re.search(r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']canonical["\']', html, re.I)
            canonical = canonical_match.group(1) if canonical_match else "MISSING"
            
            meta_robots = re.findall(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)["\']', html, re.I)
            
            title_m = re.search(r'<title>([^<]+)</title>', html)
            title = title_m.group(1) if title_m else "MISSING"
            
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
                print(f"FAIL: {u} -> {problem_reasons}", flush=True)
            else:
                print(f"PASS: {u} | {html_size_kb:.1f} KB | Canonical OK | Title: {title[:40]}...", flush=True)
                
    except Exception as e:
        issues.append((u, [str(e)]))
        print(f"ERROR: {u} -> {e}", flush=True)

# 2. Audit Technical Endpoints
print("\nAuditing technical crawl endpoints...", flush=True)
for u in TECHNICAL_ENDPOINTS:
    req = urllib.request.Request(
        u,
        headers={"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            status = resp.status
            content = resp.read().decode("utf-8")
            size_kb = len(content) / 1024
            
            is_ok = True
            problem_reasons = []
            if status != 200:
                is_ok = False
                problem_reasons.append(f"HTTP {status}")
                
            if "sitemap.xml" in u:
                if "<urlset" not in content:
                    is_ok = False
                    problem_reasons.append("Invalid sitemap XML schema (missing <urlset)")
                loc_count = len(re.findall(r'<loc>', content))
                if loc_count < 40:
                    is_ok = False
                    problem_reasons.append(f"Sitemap has only {loc_count} URLs (< 40)")
            elif "robots.txt" in u:
                if "Sitemap:" not in content or "User-Agent:" not in content:
                    is_ok = False
                    problem_reasons.append("robots.txt missing Sitemap directive or User-Agent")
                    
            if not is_ok:
                issues.append((u, problem_reasons))
                print(f"FAIL: {u} -> {problem_reasons}", flush=True)
            else:
                print(f"PASS: {u} | {size_kb:.1f} KB | Status {status} OK", flush=True)
    except Exception as e:
        issues.append((u, [str(e)]))
        print(f"ERROR: {u} -> {e}", flush=True)

print("\n--- AUDIT SUMMARY ---", flush=True)
print(f"Total checked: {len(ALL_ENDPOINTS)} ({len(PAGE_URLS)} HTML pages + {len(TECHNICAL_ENDPOINTS)} crawl files)", flush=True)
print(f"Total with technical blockers: {len(issues)}", flush=True)
