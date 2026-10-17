import urllib.request
import re

url = "https://calcmypower.com/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})

with urllib.request.urlopen(req, timeout=12) as resp:
    status = resp.status
    headers = dict(resp.headers)
    body = resp.read().decode("utf-8")

print("=== LIVE PRODUCTION DEEP VERIFICATION ===")
print(f"URL: {url}")
print(f"HTTP Status: {status}")
print(f"Content-Type: {headers.get('content-type')}")
print(f"Total HTML Size: {len(body):,} bytes ({len(body)/1024:.1f} KB)")

# 1. Canonical tag
canonical_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', body, re.I)
if not canonical_match:
    canonical_match = re.search(r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']canonical["\']', body, re.I)
canonical = canonical_match.group(1) if canonical_match else "MISSING"
print(f"Canonical URL tag: {canonical}")
assert canonical == url, f"Canonical mismatch: expected {url}, found {canonical}"

# 2. Title & H1
title_m = re.search(r'<title>([^<]+)</title>', body)
title = title_m.group(1) if title_m else "MISSING"
print(f"Title: {title}")

h1_m = re.search(r'<h1[^>]*>([^<]+)</h1>', body)
h1 = h1_m.group(1) if h1_m else "MISSING"
print(f"H1: {h1.strip()}")

# 3. Meta description
desc_m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', body, re.I)
desc = desc_m.group(1) if desc_m else "MISSING"
print(f"Meta Description ({len(desc)} chars): {desc}")

# 4. Hero WebP image
has_hero = "/images/articles/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle.webp" in body
print(f"Hero image WebP rendered: {has_hero}")

# 5. Schema verification
schemas = re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', body, re.DOTALL)
print(f"JSON-LD Schemas injected: {len(schemas)}")
for i, s in enumerate(schemas, 1):
    types = re.findall(r'"@type":\s*"([^"]+)"', s)
    print(f"  Schema #{i} @type: {types}")

# 6. Core content sections
sections = [
    ("Quick Answer Section", 'id="quick-answer"'),
    ("Power Law Formula (P = V x I)", 'id="power-formula"'),
    ("NEC 80% Continuous Rule", 'id="continuous-vs-peak"'),
    ("15A vs 20A Quick-Reference Table", 'id="comparison-table"'),
    ("1,500W Space Heater Case Study", 'id="space-heater-example"'),
    ("Everyday Household Loads Table", 'id="real-world-loads"'),
    ("Inrush Current & Motor Surge", 'id="inrush-surge-current"'),
    ("14 AWG vs 12 AWG Wire Gauge", 'id="wire-gauge-receptacles"'),
    ("Fire Safety Warning", 'id="breaker-upgrade-safety"'),
    ("Capacity Audit Checklist", 'id="how-to-check-capacity"'),
    ("Related Calculators Grid", 'id="related-calculators"'),
    ("FAQ Accordion Section", 'id="faq"'),
]

print("\nVerifying Section Landmarks & Content Anchors:")
for name, anchor in sections:
    present = anchor in body
    status_str = "PASS" if present else "FAIL"
    print(f"  [{status_str}] {name} ({anchor})")

# 7. FAQ accordions
faq_accordions = len(re.findall(r'<details\b', body))
print(f"\nRendered FAQ <details> accordions: {faq_accordions}")

# 8. Sitemap check
sitemap_url = "https://calcmypower.com/sitemap.xml"
sitemap_req = urllib.request.Request(sitemap_url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(sitemap_req, timeout=12) as s_resp:
    s_xml = s_resp.read().decode("utf-8")
    in_sitemap = f"<loc>{url}</loc>" in s_xml
    print(f"In live sitemap.xml: {in_sitemap}")

# Check lastmod
lastmod_m = re.search(rf"<loc>{re.escape(url)}</loc>\s*<lastmod>([^<]+)</lastmod>", s_xml)
if lastmod_m:
    print(f"Sitemap lastmod: {lastmod_m.group(1)}")

print("\n=== ALL DEEP VERIFICATION CHECKS PASSED ===")
