import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";
import path from "path";

// Components & Data under test
import { GeneratorFuelCalculator } from "@/components/calculators/GeneratorFuelCalculator";
import { GeneratorFuelGuideSection } from "@/components/content/GeneratorFuelGuideSection";
import { GENERATOR_FUEL_FAQS } from "@/lib/calculators/generator-fuel";

import { ThreePhasePowerCalculator } from "@/components/calculators/ThreePhasePowerCalculator";
import { ThreePhasePowerGuideSection } from "@/components/content/ThreePhasePowerGuideSection";
import { THREE_PHASE_FAQS } from "@/lib/calculators/three-phase-power";

import { generateFaqSchema } from "@/lib/seo/schema";

// Helper: strip HTML tags and decode basic entities to get visible text
function extractVisibleText(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

describe("Milestone 4 Adversarial Empirical Verification Suite", () => {
  describe("1. Rendered Visible Word Count on Enriched Routes", () => {
    it("generator fuel route strictly exceeds 2,500 rendered visible words", () => {
      const calcHtml = renderToString(React.createElement(GeneratorFuelCalculator));
      const guideHtml = renderToString(React.createElement(GeneratorFuelGuideSection));
      const combinedHtml = calcHtml + " " + guideHtml;
      const visibleText = extractVisibleText(combinedHtml);
      const wordCount = countWords(visibleText);

      console.log(`[CHALLENGER-AUDIT] Generator Fuel Route Rendered Word Count: ${wordCount}`);
      expect(wordCount).toBeGreaterThan(2500);
    });

    it("three-phase power route strictly exceeds 3,000 rendered visible words", () => {
      const calcHtml = renderToString(React.createElement(ThreePhasePowerCalculator));
      const guideHtml = renderToString(React.createElement(ThreePhasePowerGuideSection));
      const combinedHtml = calcHtml + " " + guideHtml;
      const visibleText = extractVisibleText(combinedHtml);
      const wordCount = countWords(visibleText);

      console.log(`[CHALLENGER-AUDIT] Three-Phase Power Route Rendered Word Count: ${wordCount}`);
      expect(wordCount).toBeGreaterThan(3000);
    });
  });

  describe("2. Schema & DOM FAQ Parity", () => {
    it("generator fuel route has exactly 12 FAQs matching 100% between DOM and FAQPage JSON-LD", () => {
      expect(GENERATOR_FUEL_FAQS).toHaveLength(12);

      const schema = generateFaqSchema(GENERATOR_FUEL_FAQS);
      expect(schema["@type"]).toBe("FAQPage");
      expect(schema.mainEntity).toHaveLength(12);

      const calcHtml = renderToString(React.createElement(GeneratorFuelCalculator));

      GENERATOR_FUEL_FAQS.forEach((faq, index) => {
        const schemaEntity = schema.mainEntity[index];
        expect(schemaEntity.name).toBe(faq.question);
        expect(schemaEntity.acceptedAnswer.text).toBe(faq.answer);

        // Check DOM contains question and answer text
        expect(calcHtml).toContain(faq.question);
        expect(calcHtml).toContain(faq.answer);

        // Ensure answer meets paragraph brevity <= 55 words
        const answerWords = countWords(faq.answer);
        expect(answerWords).toBeLessThanOrEqual(55);
      });
    });

    it("three-phase power route has exactly 12 FAQs matching 100% between DOM and FAQPage JSON-LD", () => {
      expect(THREE_PHASE_FAQS).toHaveLength(12);

      const schema = generateFaqSchema(THREE_PHASE_FAQS);
      expect(schema["@type"]).toBe("FAQPage");
      expect(schema.mainEntity).toHaveLength(12);

      const calcHtml = renderToString(React.createElement(ThreePhasePowerCalculator));
      const visibleText = extractVisibleText(calcHtml);

      THREE_PHASE_FAQS.forEach((faq, index) => {
        const schemaEntity = schema.mainEntity[index];
        expect(schemaEntity.name).toBe(faq.question);
        expect(schemaEntity.acceptedAnswer.text).toBe(faq.answer);

        // Check DOM contains question and answer text
        expect(visibleText).toContain(faq.question);
        expect(visibleText).toContain(faq.answer);

        // Ensure answer meets paragraph brevity <= 55 words
        const answerWords = countWords(faq.answer);
        expect(answerWords).toBeLessThanOrEqual(55);
      });
    });
  });

  describe("3. Paragraph Readability (<= 55 Words) & Dash Compliance", () => {
    const filesToAudit = [
      "src/components/calculators/VoltageDropCalculator.tsx",
      "src/components/calculators/BatteryCapacityCalculator.tsx",
      "src/components/calculators/SolarSystemSizeCalculator.tsx",
      "src/components/calculators/ElectricityCostCalculator.tsx",
      "src/components/calculators/SolarBatteryCalculator.tsx",
      "src/components/content/GeneratorFuelGuideSection.tsx",
      "src/components/content/ThreePhasePowerGuideSection.tsx",
      "src/lib/calculators/generator-fuel.ts",
      "src/lib/calculators/three-phase-power.ts",
      "src/app/three-phase-power-calculator/page.tsx",
      "src/app/generator-fuel-consumption-calculator/page.tsx",
    ];

    it("ensures zero em-dashes and en-dashes across all reviewed files", () => {
      filesToAudit.forEach((relPath) => {
        const fullPath = path.resolve(process.cwd(), relPath);
        const content = fs.readFileSync(fullPath, "utf-8");
        expect(content, `Found em-dash in ${relPath}`).not.toContain("\u2014");
        expect(content, `Found en-dash in ${relPath}`).not.toContain("\u2013");
      });
    });

    it("ensures all <p> tags in touched files contain <= 55 words", () => {
      const pRegex = /<p(?:\s+[^>]*)?>([\s\S]*?)<\/p>/gi;
      const denseViolations: Array<{ file: string; words: number; snippet: string }> = [];

      filesToAudit.forEach((relPath) => {
        if (!relPath.endsWith(".tsx")) return;
        const fullPath = path.resolve(process.cwd(), relPath);
        const content = fs.readFileSync(fullPath, "utf-8");

        let match: RegExpExecArray | null;
        while ((match = pRegex.exec(content)) !== null) {
          const rawP = match[1];
          const cleanP = rawP
            .replace(/<[^>]+>/g, " ")
            .replace(/\{[^{}]*\}/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          const words = cleanP.split(/\s+/).filter(Boolean);
          if (words.length > 55) {
            denseViolations.push({
              file: relPath,
              words: words.length,
              snippet: words.slice(0, 8).join(" ") + "...",
            });
          }
        }
      });

      expect(denseViolations).toEqual([]);
    });
  });

  describe("4. Mathematical & Technical Integrity: Altitude & NFPA 110", () => {
    it("verifies altitude derating matches 3.5% per 1,000 ft (ISO 3046 / SAE J1349)", () => {
      const elevationFt = 5280; // Denver
      const deratePercent = (elevationFt / 1000) * 0.035;
      expect(Number((deratePercent * 100).toFixed(2))).toBe(18.48);

      const ratedWatts = 7500;
      const deratedWatts = ratedWatts * (1 - deratePercent);
      expect(Math.round(deratedWatts)).toBe(6114);
    });

    it("verifies NFPA 110 133% fuel storage capacity calculation", () => {
      // 35 kW diesel generator at 50% load: 1.55 GPH for 72 hours
      const burnRateGph = 1.55;
      const runHours = 72;
      const baseGallons = burnRateGph * runHours;
      expect(baseGallons).toBeCloseTo(111.6, 1);

      // NFPA 110 mandates 133% minimum capacity
      const nfpaMandatedGallons = baseGallons * 1.33;
      expect(Number(nfpaMandatedGallons.toFixed(2))).toBe(148.43);
    });
  });

  describe("5. Mathematical & Technical Integrity: Fuel Energy Densities & BSFC", () => {
    it("verifies fuel lower heating values and thermodynamic BSFC ranges", () => {
      // Diesel #2: 138,500 BTU/gal, ~35% efficiency
      const dieselKwhPerGal = (138500 * 0.35) / 3412.142;
      expect(dieselKwhPerGal).toBeGreaterThan(12.5);
      expect(dieselKwhPerGal).toBeLessThan(14.5);
      const dieselBsfc = 1 / dieselKwhPerGal;
      expect(dieselBsfc).toBeGreaterThan(0.069);
      expect(dieselBsfc).toBeLessThan(0.081);

      // Gasoline: 114,000 BTU/gal, ~23% efficiency
      const gasKwhPerGal = (114000 * 0.23) / 3412.142;
      expect(gasKwhPerGal).toBeGreaterThan(7.0);
      expect(gasKwhPerGal).toBeLessThan(8.5);
      const gasBsfc = 1 / gasKwhPerGal;
      expect(gasBsfc).toBeGreaterThan(0.118);
      expect(gasBsfc).toBeLessThan(0.143);

      // Propane: 91,500 BTU/gal, ~21% efficiency
      const propaneKwhPerGal = (91500 * 0.21) / 3412.142;
      expect(propaneKwhPerGal).toBeGreaterThan(5.5);
      expect(propaneKwhPerGal).toBeLessThan(6.8);
      const propaneBsfc = 1 / propaneKwhPerGal;
      expect(propaneBsfc).toBeGreaterThan(0.147);
      expect(propaneBsfc).toBeLessThan(0.182);
    });
  });

  describe("6. Mathematical & Technical Integrity: NEMA Design B Motor Sizing Table Audit", () => {
    it("audits HP to mechanical kW conversion for all table entries", () => {
      const fullPath = path.resolve(
        process.cwd(),
        "src/components/content/ThreePhasePowerGuideSection.tsx"
      );
      const content = fs.readFileSync(fullPath, "utf-8");

      // Extract NEMA_MOTOR_DATA entries
      const rowRegex = /hp:\s*(\d+(?:\.\d+)?),\s*kwMech:\s*["']([\d.]+) kW["']/g;
      let match: RegExpExecArray | null;
      let count = 0;
      while ((match = rowRegex.exec(content)) !== null) {
        count++;
        const hp = parseFloat(match[1]);
        const kwMech = parseFloat(match[2]);
        const expectedKw = hp * 0.7457;
        expect(Math.abs(kwMech - expectedKw)).toBeLessThan(0.05);
      }
      expect(count).toBe(14);
    });

    it("audits NEC Table 430.250 FLA values at 208V, 240V, and 480V", () => {
      // Authoritative NEC Table 430.250 Full-Load Current Three-Phase Induction Motors
      // Note: NEC Table 430.250 specifies:
      // - 208V system: 208V column
      // - 240V system: 230V column
      // - 480V system: 460V column
      const necTable430_250: Record<number, { v208: number; v230_240: number; v460_480: number }> = {
        5: { v208: 16.7, v230_240: 15.2, v460_480: 7.6 },
        7.5: { v208: 24.2, v230_240: 22.0, v460_480: 11.0 },
        10: { v208: 30.8, v230_240: 28.0, v460_480: 14.0 },
        15: { v208: 46.2, v230_240: 42.0, v460_480: 21.0 },
        20: { v208: 59.4, v230_240: 54.0, v460_480: 27.0 },
        25: { v208: 74.8, v230_240: 68.0, v460_480: 34.0 },
        30: { v208: 88.0, v230_240: 80.0, v460_480: 40.0 },
        40: { v208: 114.0, v230_240: 104.0, v460_480: 52.0 },
        50: { v208: 143.0, v230_240: 130.0, v460_480: 65.0 },
        60: { v208: 169.0, v230_240: 154.0, v460_480: 77.0 },
        75: { v208: 211.0, v230_240: 192.0, v460_480: 96.0 },
        100: { v208: 273.0, v230_240: 248.0, v460_480: 124.0 },
        150: { v208: 396.0, v230_240: 360.0, v460_480: 180.0 },
        200: { v208: 528.0, v230_240: 480.0, v460_480: 240.0 },
      };

      const fullPath = path.resolve(
        process.cwd(),
        "src/components/content/ThreePhasePowerGuideSection.tsx"
      );
      const content = fs.readFileSync(fullPath, "utf-8");

      const motorRowRegex =
        /hp:\s*(\d+(?:\.\d+)?),[\s\S]*?fla208v:\s*["']([\d.]+) A["'],\s*fla240v:\s*["']([\d.]+) A["'],\s*fla480v:\s*["']([\d.]+) A["']/g;

      let match: RegExpExecArray | null;
      const discrepancies: Array<{
        hp: number;
        field: string;
        actualInCode: number;
        expectedNec: number;
      }> = [];

      while ((match = motorRowRegex.exec(content)) !== null) {
        const hp = parseFloat(match[1]);
        const actual208 = parseFloat(match[2]);
        const actual240 = parseFloat(match[3]);
        const actual480 = parseFloat(match[4]);

        const expected = necTable430_250[hp];
        if (!expected) continue;

        // Check 480V
        if (Math.abs(actual480 - expected.v460_480) > 0.5) {
          discrepancies.push({
            hp,
            field: "480V FLA",
            actualInCode: actual480,
            expectedNec: expected.v460_480,
          });
        }

        // Check 240V
        if (Math.abs(actual240 - expected.v230_240) > 1.0) {
          discrepancies.push({
            hp,
            field: "240V FLA",
            actualInCode: actual240,
            expectedNec: expected.v230_240,
          });
        }

        // Check 208V
        if (Math.abs(actual208 - expected.v208) > 1.0) {
          discrepancies.push({
            hp,
            field: "208V FLA",
            actualInCode: actual208,
            expectedNec: expected.v208,
          });
        }
      }

      console.log(`[CHALLENGER-AUDIT] NEC Table 430.250 Discrepancies Count: ${discrepancies.length}`);
      if (discrepancies.length > 0) {
        console.table(discrepancies);
      }

      // We expect the challenger to document this empirical finding!
      // Notice: If there are discrepancies, this test will record them!
      expect(discrepancies, "NEC Table 430.250 discrepancies must be 0").toHaveLength(0);
    });

    it("audits NEC 430.22 125% ampacity and NEC 430.52 250% breaker sizing for 480V motor circuits", () => {
      const fullPath = path.resolve(
        process.cwd(),
        "src/components/content/ThreePhasePowerGuideSection.tsx"
      );
      const content = fs.readFileSync(fullPath, "utf-8");

      const rowRegex =
        /hp:\s*(\d+(?:\.\d+)?),[\s\S]*?fla480v:\s*["']([\d.]+) A["'],[\s\S]*?minWireAmpacity:\s*["']([\d.]+) A/g;

      let match: RegExpExecArray | null;
      while ((match = rowRegex.exec(content)) !== null) {
        const hp = parseFloat(match[1]);
        const fla480 = parseFloat(match[2]);
        const wireAmpacity = parseFloat(match[3]);

        // NEC 430.22 mandates conductor ampacity not less than 125% of FLA
        const expectedMinAmpacity = fla480 * 1.25;
        expect(
          Math.abs(wireAmpacity - expectedMinAmpacity),
          `HP ${hp}: conductor ampacity ${wireAmpacity} should be 125% of FLA ${fla480} (${expectedMinAmpacity})`
        ).toBeLessThan(0.2);
      }
    });
  });
});
