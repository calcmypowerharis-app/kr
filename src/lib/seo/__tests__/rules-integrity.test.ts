import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { execSync } from "child_process";

describe("Zero-Truncation Rulebook Sentinel", () => {
  const repoRoot = path.resolve(__dirname, "../../../../");
  const rulesDir = path.join(repoRoot, ".agents", "rules");
  const geminiPath = path.join(repoRoot, "GEMINI.md");
  const agentsPath = path.join(repoRoot, "AGENTS.md");

  const ANTIGRAVITY_MAX_BYTES = 24000;
  const MODULAR_MAX_BYTES = 22000;
  const ROOT_MAX_BYTES = 20000;
  const EXPECTED_RULES_COUNT = 29;

  const EXPECTED_FILES = [
    "00_core_identity_and_guardrails.md",
    "01_calculator_engineering.md",
    "02_editorial_content_standard.md",
    "03_editorial_ux_quality.md",
    "04_seo_keyword_strategy.md",
    "05_design_system_and_images.md",
    "06_architecture_devops_git.md",
    "07_autonomous_execution_quality_gates.md",
  ];

  it("guarantees GEMINI.md and AGENTS.md exist and are strictly under 20KB", () => {
    expect(fs.existsSync(geminiPath)).toBe(true);
    expect(fs.existsSync(agentsPath)).toBe(true);

    const geminiBytes = fs.statSync(geminiPath).size;
    const agentsBytes = fs.statSync(agentsPath).size;

    expect(geminiBytes).toBeLessThanOrEqual(ROOT_MAX_BYTES);
    expect(agentsBytes).toBeLessThanOrEqual(ROOT_MAX_BYTES);
  });

  it("guarantees GEMINI.md and AGENTS.md are 100% MD5 synchronized", () => {
    const geminiMd5 = crypto.createHash("md5").update(fs.readFileSync(geminiPath)).digest("hex");
    const agentsMd5 = crypto.createHash("md5").update(fs.readFileSync(agentsPath)).digest("hex");

    expect(geminiMd5).toBe(agentsMd5);
  });

  it("guarantees all 8 category files exist in .agents/rules/ and are strictly <= 22KB", () => {
    expect(fs.existsSync(rulesDir)).toBe(true);

    const files = fs.readdirSync(rulesDir).filter((f) => f.endsWith(".md"));
    expect(files.sort()).toEqual(EXPECTED_FILES.sort());

    for (const file of files) {
      const filePath = path.join(rulesDir, file);
      const size = fs.statSync(filePath).size;
      expect(size).toBeLessThanOrEqual(MODULAR_MAX_BYTES);
      expect(size).toBeLessThanOrEqual(ANTIGRAVITY_MAX_BYTES);
    }
  });

  it("guarantees 100% full-text coverage of all 29 rules with zero dropped rules", () => {
    const ruleHeaderRegex = /^##\s+(\d+)\.\s+(.*)$/gm;
    const detectedRules = new Map<number, { title: string; file: string }>();

    for (const file of EXPECTED_FILES) {
      const content = fs.readFileSync(path.join(rulesDir, file), "utf-8");
      let match: RegExpExecArray | null;
      while ((match = ruleHeaderRegex.exec(content)) !== null) {
        const ruleNum = parseInt(match[1], 10);
        const title = match[2].trim();
        expect(detectedRules.has(ruleNum)).toBe(false);
        detectedRules.set(ruleNum, { title, file });
      }
    }

    expect(detectedRules.size).toBe(EXPECTED_RULES_COUNT);
    for (let r = 1; r <= EXPECTED_RULES_COUNT; r++) {
      expect(detectedRules.has(r)).toBe(true);
    }
  });

  it("executes scripts/verify_rules_integrity.py with zero errors", () => {
    const scriptPath = path.join(repoRoot, "scripts", "verify_rules_integrity.py");
    expect(fs.existsSync(scriptPath)).toBe(true);

    const result = execSync(`python "${scriptPath}"`, { encoding: "utf-8" });
    expect(result).toContain("ALL CHECKS PASSED (100% ZERO-TRUNCATION GUARANTEE)");
  });
});
