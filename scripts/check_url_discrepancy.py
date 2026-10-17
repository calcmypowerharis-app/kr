import re

with open('src/lib/seo/registry.ts', 'r', encoding='utf-8') as f:
    c = f.read()

# Core routes
core_match = re.search(r'CORE_ROUTE_REGISTRY: CoreRouteRegistryEntry\[\] = \[(.*?)\];', c, re.DOTALL)
core_paths = re.findall(r'path:\s*["\']([^"\']+)["\']', core_match.group(1)) if core_match else []

# Calculators
calc_match = re.search(r'CALCULATOR_REGISTRY: CalculatorRegistryEntry\[\] = \[(.*?)\];', c, re.DOTALL)
calc_paths = re.findall(r'path:\s*["\']([^"\']+)["\']', calc_match.group(1)) if calc_match else []

# Guides
guide_match = re.search(r'GUIDE_REGISTRY: GuideRegistryEntry\[\] = \[(.*?)\];', c, re.DOTALL)
guide_paths = re.findall(r'path:\s*["\']([^"\']+)["\']', guide_match.group(1)) if guide_match else []

all_registry_paths = core_paths + calc_paths + guide_paths
print(f"Registry paths: Total = {len(all_registry_paths)}")
print(f"  Core ({len(core_paths)}): {core_paths}")
print(f"  Calculators ({len(calc_paths)}): {calc_paths}")
print(f"  Guides ({len(guide_paths)}): {guide_paths}")

with open('scripts/audit_indexing_health.py', 'r', encoding='utf-8') as f:
    script_c = f.read()

script_urls_match = re.search(r'URLS = \[(.*?)\]', script_c, re.DOTALL)
script_urls = re.findall(r'"https://calcmypower\.com([^"]*)"', script_urls_match.group(1)) if script_urls_match else []
print(f"\nAudit script paths: Total = {len(script_urls)}")

script_paths = [p if p != "" else "/" for p in script_urls]

diff_in_registry_not_in_script = set(all_registry_paths) - set(script_paths)
print(f"\nIn registry but missing from audit script ({len(diff_in_registry_not_in_script)}):")
for p in sorted(diff_in_registry_not_in_script):
    print(f"  - {p}")

diff_in_script_not_in_registry = set(script_paths) - set(all_registry_paths)
print(f"\nIn audit script but not in registry ({len(diff_in_script_not_in_registry)}):")
for p in sorted(diff_in_script_not_in_registry):
    print(f"  - {p}")
