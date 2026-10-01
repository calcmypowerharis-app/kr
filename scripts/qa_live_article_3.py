import urllib.request
import json
import re

def run_qa():
    page_url = 'https://calcmypower.com/how-many-solar-panels-do-i-need'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

    req = urllib.request.Request(page_url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        status = resp.status
        html = resp.read().decode('utf-8')

    print(f'=== LIVE QA: {page_url} ===')
    print(f'1. HTTP Status: {status} (Expected: 200)')
    assert status == 200

    # 2. Canonical URL
    canonical_match = re.search(r'<link[^>]+rel=[\"\']canonical[\"\'][^>]+href=[\"\']([^\"\']+)[\"\']', html)
    canonical = canonical_match.group(1) if canonical_match else None
    print(f'2. Canonical URL: {canonical}')
    assert canonical == 'https://calcmypower.com/how-many-solar-panels-do-i-need'

    # 3. Title & H1 & Meta Description
    title_match = re.search(r'<title>([^<]+)</title>', html)
    title = title_match.group(1) if title_match else None
    print(f'3a. Title: {title}')
    assert title and 'How Many Solar Panels Do I Need' in title

    h1_match = re.search(r'<h1[^>]*>([^<]+)</h1>', html)
    h1 = h1_match.group(1) if h1_match else None
    print(f'3b. H1: {h1}')
    assert h1 and 'How Many Solar Panels Do I Need' in h1

    meta_desc = re.search(r'<meta[^>]+name=[\"\']description[\"\'][^>]+content=[\"\']([^\"\']+)[\"\']', html)
    desc = meta_desc.group(1) if meta_desc else None
    print(f'3c. Meta Description: {desc}')
    assert desc and len(desc) > 50

    # 4. Hero WebP Image
    hero_url = 'https://calcmypower.com/images/articles/how-many-solar-panels-do-i-need.webp'
    req_img = urllib.request.Request(hero_url, headers=headers)
    with urllib.request.urlopen(req_img) as resp_img:
        img_status = resp_img.status
        img_data = resp_img.read()
        print(f'4. Hero WebP HTTP Status: {img_status}, bytes: {len(img_data)} (Expected < 150KB: {len(img_data) < 153600})')
        assert img_status == 200
        assert len(img_data) < 153600

    # 5. Prohibited Claims Check
    banned = [
        '\u2014', '&mdash;', "In today's world", "Let's dive in", "It is important to note",
        "In conclusion", "When it comes to", "NEC compliant", "IEEE compliant", "certified",
        "code approved", "guaranteed", "safe sizing", "approved methodology"
    ]
    print('5. Prohibited phrases check:')
    for b in banned:
        c = html.lower().count(b.lower())
        if c > 0:
            print(f'   FAIL: Found {c} instances of "{b}"')
        else:
            print(f'   PASS: "{b}"')
        assert c == 0, f'Found banned phrase: {b}'

    # 6. Planning Performance Factor wording
    ppf_text = 'CalcMyPower uses 78% as an illustrative planning performance factor for this simplified estimate. Actual PV system performance varies with solar resource, tilt, azimuth, shading, soiling, temperature, wiring, inverter behavior, and other site-specific conditions.'
    print(f'6. Planning Performance Factor text present: {ppf_text in html}')
    assert ppf_text in html

    # 7. Illustrative Roof Area Estimate wording
    roof_text = 'This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.'
    print(f'7. Illustrative Roof Area text present: {roof_text in html}')
    assert roof_text in html

    # 8. Structured Data JSON-LD
    scripts = re.findall(r'<script[^>]+type=[\"\']application/ld\+json[\"\'][^>]*>(.*?)</script>', html, re.DOTALL)
    print(f'8. JSON-LD scripts found: {len(scripts)}')
    schemas = [json.loads(s) for s in scripts]
    types = [s.get('@type') for s in schemas]
    print(f'   Schema types: {types}')
    assert 'Article' in types
    assert 'BreadcrumbList' in types
    assert 'FAQPage' in types

    # 9. Internal Links
    required_links = [
        '/solar-system-size-calculator',
        '/solar-battery-calculator',
        '/solar-charge-controller-calculator',
        '/solar-panel-tilt-calculator',
        '/voltage-drop-calculator',
        '/solar-panels-series-vs-parallel'
    ]
    print('9. Internal Links check:')
    for rl in required_links:
        present = f'href="{rl}"' in html
        print(f'   Link to {rl}: {"PASS" if present else "FAIL"}')
        assert present

    # 10. Sitemap & Robots
    print('10. Sitemap & Robots check:')
    sitemap_url = 'https://calcmypower.com/sitemap.xml'
    req_sitemap = urllib.request.Request(sitemap_url, headers=headers)
    with urllib.request.urlopen(req_sitemap) as resp_sitemap:
        sitemap_xml = resp_sitemap.read().decode('utf-8')
        in_sitemap = 'https://calcmypower.com/how-many-solar-panels-do-i-need' in sitemap_xml
        print(f'    Sitemap status: {resp_sitemap.status}, URL included: {in_sitemap}')
        assert in_sitemap

    robots_url = 'https://calcmypower.com/robots.txt'
    req_robots = urllib.request.Request(robots_url, headers=headers)
    with urllib.request.urlopen(req_robots) as resp_robots:
        robots_txt = resp_robots.read().decode('utf-8')
        print(f'    Robots.txt status: {resp_robots.status}, references sitemap: {"sitemap.xml" in robots_txt.lower()}')
        assert resp_robots.status == 200

    # 11. Existing Routes Health Check
    existing_routes = [
        '/',
        '/solar-system-size-calculator',
        '/solar-panels-series-vs-parallel',
        '/calculators',
        '/voltage-drop-calculator',
        '/battery-capacity-calculator'
    ]
    print('11. Existing routes health check:')
    for r in existing_routes:
        req_r = urllib.request.Request(f'https://calcmypower.com{r}', headers=headers)
        with urllib.request.urlopen(req_r) as resp_r:
            print(f'    Route {r}: HTTP {resp_r.status}')
            assert resp_r.status == 200

    print('\n======================================================')
    print(' ALL 11 LIVE PRODUCTION AUDIT GATES PASSED 100% CLEAN!')
    print('======================================================')

if __name__ == '__main__':
    run_qa()
