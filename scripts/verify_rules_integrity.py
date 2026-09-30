#!/usr/bin/env python3
"""
Automated Zero-Truncation Sentinel & Rules Integrity Verifier
CalcMyPower.com

Verifies:
1. Every rule file in .agents/rules/*.md, GEMINI.md, and AGENTS.md is <= 24,000 bytes (Zero-Truncation Guarantee).
2. All 29 rules (Rules 1 to 29) are fully present across category files with zero dropped rules.
3. Root GEMINI.md and AGENTS.md are 100% MD5-synchronized and < 20,000 bytes.
"""

import os
import sys
import glob
import hashlib
import re

# Ensure standard output can handle utf-8 safely on Windows
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

ANTIGRAVITY_MAX_RULE_BYTES = 24000
MODULAR_MAX_RULE_BYTES = 22000
ROOT_MAX_RULE_BYTES = 20000
TOTAL_EXPECTED_RULES = 29

EXPECTED_CATEGORY_FILES = [
    "00_core_identity_and_guardrails.md",
    "01_calculator_engineering.md",
    "02_editorial_content_standard.md",
    "03_editorial_ux_quality.md",
    "04_seo_keyword_strategy.md",
    "05_design_system_and_images.md",
    "06_architecture_devops_git.md",
    "07_autonomous_execution_quality_gates.md",
]


def compute_md5(filepath: str) -> str:
    hasher = hashlib.md5()
    with open(filepath, "rb") as f:
        hasher.update(f.read())
    return hasher.hexdigest()


def main():
    print("=" * 70)
    print(" CalcMyPower - Automated Zero-Truncation Rules Sentinel")
    print("=" * 70)

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    rules_dir = os.path.join(repo_root, ".agents", "rules")
    gemini_md = os.path.join(repo_root, "GEMINI.md")
    agents_md = os.path.join(repo_root, "AGENTS.md")

    errors = []

    # 1. Verify Root Files Existence and Synchronization
    print("\n[CHECK 1] Root Rule Files & Synchronization:")
    if not os.path.isfile(gemini_md):
        errors.append("GEMINI.md is missing from repository root.")
    if not os.path.isfile(agents_md):
        errors.append("AGENTS.md is missing from repository root.")

    if os.path.isfile(gemini_md) and os.path.isfile(agents_md):
        gemini_size = os.path.getsize(gemini_md)
        agents_size = os.path.getsize(agents_md)
        gemini_md5 = compute_md5(gemini_md)
        agents_md5 = compute_md5(agents_md)

        print(f"  - GEMINI.md : {gemini_size:5d} bytes | MD5: {gemini_md5}")
        print(f"  - AGENTS.md : {agents_size:5d} bytes | MD5: {agents_md5}")

        if gemini_size > ROOT_MAX_RULE_BYTES:
            errors.append(f"GEMINI.md exceeds root target ({gemini_size} > {ROOT_MAX_RULE_BYTES} bytes)")
        if agents_size > ROOT_MAX_RULE_BYTES:
            errors.append(f"AGENTS.md exceeds root target ({agents_size} > {ROOT_MAX_RULE_BYTES} bytes)")
        if gemini_md5 != agents_md5:
            errors.append("GEMINI.md and AGENTS.md are out of sync (MD5 mismatch)!")
        else:
            print("  [PASS] GEMINI.md and AGENTS.md are 100% MD5 synchronized.")

    # 2. Verify .agents/rules/ Category Files
    print(f"\n[CHECK 2] Modular Category Files in '{rules_dir}':")
    if not os.path.isdir(rules_dir):
        errors.append(f"Rules directory '{rules_dir}' does not exist.")
        category_files = []
    else:
        category_files = sorted(glob.glob(os.path.join(rules_dir, "*.md")))

    found_basenames = [os.path.basename(p) for p in category_files]
    for expected in EXPECTED_CATEGORY_FILES:
        if expected not in found_basenames:
            errors.append(f"Expected category file missing: '{expected}'")

    for file_path in category_files:
        basename = os.path.basename(file_path)
        file_size = os.path.getsize(file_path)
        status = "[PASS]"
        if file_size > ANTIGRAVITY_MAX_RULE_BYTES:
            status = "[FAIL] (Exceeds Antigravity 24KB limit!)"
            errors.append(f"{basename} exceeds Antigravity 24KB ceiling ({file_size} > {ANTIGRAVITY_MAX_RULE_BYTES})")
        elif file_size > MODULAR_MAX_RULE_BYTES:
            status = "[WARN] (Exceeds 22KB category buffer)"
            errors.append(f"{basename} exceeds 22KB modular buffer ({file_size} > {MODULAR_MAX_RULE_BYTES})")

        print(f"  - {basename:48s} : {file_size:5d} bytes {status}")

    # 3. Rule Completeness Verification (Rules 1 to 29)
    print("\n[CHECK 3] Full Rulebook Coverage (Rules 1 to 29):")
    rule_pattern = re.compile(r"^##\s+(\d+)\.\s+(.*)", re.MULTILINE)
    detected_rules = {}

    for file_path in category_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        matches = rule_pattern.findall(content)
        for num_str, title in matches:
            rule_num = int(num_str)
            if rule_num in detected_rules:
                errors.append(f"Duplicate rule #{rule_num} found in '{os.path.basename(file_path)}' (already in '{detected_rules[rule_num]['file']}')")
            detected_rules[rule_num] = {
                "title": title.strip(),
                "file": os.path.basename(file_path)
            }

    print(f"  Total distinct rules detected: {len(detected_rules)} of {TOTAL_EXPECTED_RULES}")
    missing_rules = []
    for r in range(1, TOTAL_EXPECTED_RULES + 1):
        if r not in detected_rules:
            missing_rules.append(r)
        else:
            print(f"  [PASS] Rule {r:2d}: {detected_rules[r]['title'][:40]:40s} -> {detected_rules[r]['file']}")

    if missing_rules:
        errors.append(f"Missing rules from category files: {missing_rules}")

    # Summary & Decision
    print("\n" + "=" * 70)
    if errors:
        print(" SENTINEL AUDIT RESULT: FAILED")
        print(" Errors detected:")
        for err in errors:
            print(f"  - {err}")
        print("=" * 70)
        sys.exit(1)
    else:
        print(" SENTINEL AUDIT RESULT: ALL CHECKS PASSED (100% ZERO-TRUNCATION GUARANTEE)")
        print(f" - {len(EXPECTED_CATEGORY_FILES)} Category Files verified under 22,000 bytes.")
        print(f" - Root GEMINI.md & AGENTS.md verified identical and under 20,000 bytes.")
        print(f" - All {TOTAL_EXPECTED_RULES} Rules (1 through 29) verified present without drops.")
        print("=" * 70)
        sys.exit(0)


if __name__ == "__main__":
    main()
