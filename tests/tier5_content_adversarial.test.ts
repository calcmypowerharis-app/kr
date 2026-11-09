import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";
import path from "path";

// Calculators and pure domain logic
import {
  calculateThreePhasePower,
  validateThreePhaseInputs,
  SQRT_3,
} from "@/lib/calculators/three-phase-power";
import {
  calculateGeneratorFuel,
  GENERATOR_FUEL_PRESETS,
} from "@/lib/calculators/generator-fuel";
import {
  calculateGeneratorAmperage,
  GENERATOR_AMPERAGE_CHART_DATA,
} from "@/lib/calculators/generator-amperage";

// Rendered Components for visible content audit
import { GeneratorFuelCalculator } from "@/components/calculators/GeneratorFuelCalculator";
import { GeneratorFuelGuideSection } from "@/components/content/GeneratorFuelGuideSection";
import { ThreePhasePowerCalculator } from "@/components/calculators/ThreePhasePowerCalculator";
import { ThreePhasePowerGuideSection } from "@/components/content/ThreePhasePowerGuideSection";

// Helpers
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
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

describe("Tier 5 Adversarial Coverage Hardening Suite", () => {
  // =========================================================================
  // 1. ADVERSARIAL INPUT VECTORS & BOUNDARY CONDITIONS
  // =========================================================================
  describe("1. Adversarial Input Vectors & Boundary Fuzzing", () => {
    describe("Three-Phase Power Calculator Boundary Stress", () => {
      it("rejects zero and negative voltages with explicit validation errors", () => {
        const resZero = calculateThreePhasePower({
          mode: "solve_power",
          voltage: 0,
          voltageReference: "line_to_line",
          currentAmps: 20,
          powerFactor: 0.85,
        });
        expect(resZero.isValid).toBe(false);
        expect(resZero.errors.some((e) => e.field === "voltage")).toBe(true);
        expect(resZero.realPowerWatts).toBe(0);

        const resNeg = calculateThreePhasePower({
          mode: "solve_power",
          voltage: -480,
          voltageReference: "line_to_line",
          currentAmps: 20,
          powerFactor: 0.85,
        });
        expect(resNeg.isValid).toBe(false);
        expect(resNeg.errors.some((e) => e.field === "voltage")).toBe(true);
      });

      it("rejects over-voltage exceeding 15,000V calculator range", () => {
        const resOver = calculateThreePhasePower({
          mode: "solve_power",
          voltage: 25000,
          voltageReference: "line_to_line",
          currentAmps: 10,
          powerFactor: 0.9,
        });
        expect(resOver.isValid).toBe(false);
        expect(resOver.errors.some((e) => e.message.includes("15,000V"))).toBe(true);
      });

      it("handles medium industrial voltage (4,160V) with safety warning", () => {
        const resMedium = calculateThreePhasePower({
          mode: "solve_power",
          voltage: 4160,
          voltageReference: "line_to_line",
          currentAmps: 50,
          powerFactor: 0.88,
        });
        expect(resMedium.isValid).toBe(true);
        expect(resMedium.warnings.some((w) => w.includes("medium or high voltage"))).toBe(true);
      });

      it("rejects negative, zero, and out-of-range power factors", () => {
        const pfCases = [-0.85, -0.01, 0, 1.05, 2.0];
        pfCases.forEach((badPf) => {
          const res = calculateThreePhasePower({
            mode: "solve_power",
            voltage: 480,
            voltageReference: "line_to_line",
            currentAmps: 20,
            powerFactor: badPf,
          });
          expect(res.isValid).toBe(false);
          expect(res.errors.some((e) => e.field === "powerFactor")).toBe(true);
        });
      });

      it("triggers low power factor penalty warning when PF < 0.70", () => {
        const resLowPf = calculateThreePhasePower({
          mode: "solve_power",
          voltage: 480,
          voltageReference: "line_to_line",
          currentAmps: 30,
          powerFactor: 0.65,
        });
        expect(resLowPf.isValid).toBe(true);
        expect(resLowPf.warnings.some((w) => w.includes("penalty surcharges"))).toBe(true);
      });

      it("handles zero real power inputs without errors or NaN", () => {
        // solve_current with 0 kW
        const resZeroKw = calculateThreePhasePower({
          mode: "solve_current",
          voltage: 480,
          voltageReference: "line_to_line",
          powerValue: 0,
          powerUnit: "kW",
          powerFactor: 0.85,
        });
        expect(resZeroKw.isValid).toBe(true);
        expect(resZeroKw.lineCurrentAmps).toBe(0);
        expect(resZeroKw.realPowerWatts).toBe(0);
        expect(resZeroKw.apparentPowerVa).toBe(0);

        // solve_power with 0 Amps
        const resZeroAmps = calculateThreePhasePower({
          mode: "solve_power",
          voltage: 480,
          voltageReference: "line_to_line",
          currentAmps: 0,
          powerFactor: 0.85,
        });
        expect(resZeroAmps.isValid).toBe(true);
        expect(resZeroAmps.lineCurrentAmps).toBe(0);
        expect(resZeroAmps.realPowerWatts).toBe(0);
      });

      it("rejects negative current in solve_power and negative power in solve_current", () => {
        const resNegAmps = calculateThreePhasePower({
          mode: "solve_power",
          voltage: 480,
          voltageReference: "line_to_line",
          currentAmps: -15,
          powerFactor: 0.85,
        });
        expect(resNegAmps.isValid).toBe(false);
        expect(resNegAmps.errors.some((e) => e.field === "currentAmps")).toBe(true);

        const resNegPower = calculateThreePhasePower({
          mode: "solve_current",
          voltage: 480,
          voltageReference: "line_to_line",
          powerValue: -50,
          powerUnit: "kW",
          powerFactor: 0.85,
        });
        expect(resNegPower.isValid).toBe(false);
        expect(resNegPower.errors.some((e) => e.field === "powerValue")).toBe(true);
      });

      it("handles extreme large power (100,000 kW) with large service entrance advisory", () => {
        const resHuge = calculateThreePhasePower({
          mode: "solve_current",
          voltage: 480,
          voltageReference: "line_to_line",
          powerValue: 100000, // 100 MW
          powerUnit: "kW",
          powerFactor: 0.9,
        });
        expect(resHuge.isValid).toBe(true);
        expect(resHuge.lineCurrentAmps).toBeGreaterThan(1000);
        expect(resHuge.warnings.some((w) => w.includes("very large commercial"))).toBe(true);
        expect(Number.isFinite(resHuge.lineCurrentAmps)).toBe(true);
      });

      it("correctly calculates line current from apparent power units (kVA and VA)", () => {
        const resKva = calculateThreePhasePower({
          mode: "solve_current",
          voltage: 480,
          voltageReference: "line_to_line",
          powerValue: 50, // 50 kVA
          powerUnit: "kVA",
          powerFactor: 0.8,
        });
        // I = S / (√3 * V) = 50,000 / (1.73205 * 480) = 60.14 A
        expect(resKva.apparentPowerVa).toBe(50000);
        expect(resKva.realPowerWatts).toBe(40000); // 50,000 * 0.8 = 40,000 W
        expect(Math.abs(resKva.lineCurrentAmps - 60.14)).toBeLessThan(0.05);
      });
    });

    describe("Generator Fuel Calculator Boundary Stress", () => {
      it("throws when fuel price is negative", () => {
        expect(() =>
          calculateGeneratorFuel({
            calculationMode: "preset",
            presetId: "honda_eu2200i_gas_25",
            fuelPricePerUnit: -3.5,
          })
        ).toThrow("Fuel price cannot be negative");
      });

      it("throws on missing or non-existent presetId", () => {
        expect(() =>
          calculateGeneratorFuel({
            calculationMode: "preset",
            fuelPricePerUnit: 3.5,
          })
        ).toThrow("Preset mode requires a presetId");

        expect(() =>
          calculateGeneratorFuel({
            calculationMode: "preset",
            presetId: "non_existent_preset_999",
            fuelPricePerUnit: 3.5,
          })
        ).toThrow("Preset not found");
      });

      it("throws on negative custom consumption rate or negative custom tank capacity", () => {
        expect(() =>
          calculateGeneratorFuel({
            calculationMode: "custom",
            customFuelType: "gasoline",
            customFuelUnit: "gallons",
            customConsumptionRate: -0.5,
            fuelPricePerUnit: 3.5,
          })
        ).toThrow("positive customConsumptionRate");

        expect(() =>
          calculateGeneratorFuel({
            calculationMode: "custom",
            customFuelType: "gasoline",
            customFuelUnit: "gallons",
            customConsumptionRate: 0.75,
            customTankSize: -5,
            fuelPricePerUnit: 3.5,
          })
        ).toThrow("Tank capacity cannot be negative");
      });

      it("handles zero consumption rate with tank capacity yielding Infinity runtime", () => {
        const out = calculateGeneratorFuel({
          calculationMode: "custom",
          customFuelType: "gasoline",
          customFuelUnit: "gallons",
          customConsumptionRate: 0,
          customTankSize: 10,
          fuelPricePerUnit: 3.5,
        });
        expect(out.consumptionPerHour).toBe(0);
        expect(out.costPerHour).toBe(0);
        expect(out.costFor24Hours).toBe(0);
        expect(out.tankRuntimeHours).toBe(Infinity);
      });

      it("handles zero tank size yielding null tank runtime without NaN", () => {
        const out = calculateGeneratorFuel({
          calculationMode: "custom",
          customFuelType: "gasoline",
          customFuelUnit: "gallons",
          customConsumptionRate: 0.75,
          customTankSize: 0,
          fuelPricePerUnit: 3.5,
        });
        expect(out.tankSize).toBeNull();
        expect(out.tankRuntimeHours).toBeNull();
      });

      it("accurately computes runtimes and costs across all standard presets", () => {
        GENERATOR_FUEL_PRESETS.forEach((preset) => {
          const res = calculateGeneratorFuel({
            calculationMode: "preset",
            presetId: preset.id,
            fuelPricePerUnit: 4.0,
          });
          expect(res.consumptionPerHour).toBe(preset.consumptionRate);
          expect(res.fuelFor24Hours).toBe(preset.consumptionRate * 24);
          expect(res.costPerHour).toBe(preset.consumptionRate * 4.0);
          if (preset.tankSize) {
            expect(res.tankRuntimeHours).toBeCloseTo(preset.tankSize / preset.consumptionRate, 2);
          }
        });
      });
    });

    describe("Generator Amperage Calculator Boundary Stress", () => {
      it("handles 0 Watts returning 0 Amps and isValid = true", () => {
        const out = calculateGeneratorAmperage({
          powerWatts: 0,
          voltageConfig: "120_240v_split",
        });
        expect(out.isValid).toBe(true);
        expect(out.ratedAmps).toBe(0);
        expect(out.continuousSafeAmps).toBe(0);
        expect(out.errors).toHaveLength(0);
      });

      it("rejects negative generator wattage with validation error", () => {
        const out = calculateGeneratorAmperage({
          powerWatts: -7500,
          voltageConfig: "120_240v_split",
        });
        expect(out.isValid).toBe(false);
        expect(out.errors.some((e) => e.field === "powerWatts")).toBe(true);
      });

      it("rejects power factor outside [0.5, 1.0]", () => {
        [-0.5, 0, 0.4, 1.05, 2.0].forEach((badPf) => {
          const out = calculateGeneratorAmperage({
            powerWatts: 5000,
            voltageConfig: "120v_single",
            powerFactor: badPf,
          });
          expect(out.isValid).toBe(false);
          expect(out.errors.some((e) => e.field === "powerFactor")).toBe(true);
        });
      });

      it("rejects continuous derate percentages outside [1, 100]", () => {
        [-10, 0, 101, 150].forEach((badPercent) => {
          const out = calculateGeneratorAmperage({
            powerWatts: 5000,
            voltageConfig: "120v_single",
            continuousLoadPercent: badPercent,
          });
          expect(out.isValid).toBe(false);
          expect(out.errors.some((e) => e.field === "continuousLoadPercent")).toBe(true);
        });
      });

      it("handles maximum industrial standby generator (100,000W at 480V 3-phase)", () => {
        const out = calculateGeneratorAmperage({
          powerWatts: 100000,
          voltageConfig: "480v_three",
          powerFactor: 0.8,
          continuousLoadPercent: 80,
        });
        // I = 100,000 / (√3 * 480 * 0.8) = 150.3524... A -> 150.35 A
        expect(out.isValid).toBe(true);
        expect(out.ratedAmps).toBe(150.35);
        // Continuous safe: 150.35 * 0.8 = 120.28 A
        expect(out.continuousSafeAmps).toBe(120.28);
        expect(out.warnings.some((w) => w.includes("Low Power Factor"))).toBe(true);
      });
    });
  });

  // =========================================================================
  // 2. PHYSICAL & MATHEMATICAL POWER INVARIANTS
  // =========================================================================
  describe("2. Thermodynamic & Electrical Physical Invariants", () => {
    it("preserves three-phase active power invariant P = √3 * V_LL * I * PF", () => {
      const voltages = [208, 240, 480, 600, 4160];
      const currents = [10, 25.5, 60, 125, 450];
      const pfs = [0.75, 0.80, 0.85, 0.90, 0.95, 1.00];

      voltages.forEach((v) => {
        currents.forEach((i) => {
          pfs.forEach((pf) => {
            const out = calculateThreePhasePower({
              mode: "solve_power",
              voltage: v,
              voltageReference: "line_to_line",
              currentAmps: i,
              powerFactor: pf,
            });

            const expectedP = SQRT_3 * v * i * pf;
            const expectedS = SQRT_3 * v * i;

            expect(Math.abs(out.realPowerWatts - expectedP)).toBeLessThan(0.01);
            expect(Math.abs(out.apparentPowerVa - expectedS)).toBeLessThan(0.01);
          });
        });
      });
    });

    it("preserves apparent and reactive power triangle relation: S^2 = P^2 + Q^2", () => {
      const testCases = [
        { v: 208, i: 30, pf: 0.85 },
        { v: 240, i: 50, pf: 0.72 },
        { v: 480, i: 100, pf: 0.88 },
        { v: 600, i: 200, pf: 0.95 },
      ];

      testCases.forEach(({ v, i, pf }) => {
        const out = calculateThreePhasePower({
          mode: "solve_power",
          voltage: v,
          voltageReference: "line_to_line",
          currentAmps: i,
          powerFactor: pf,
        });

        const s = out.apparentPowerVa;
        const p = out.realPowerWatts;
        const q = out.reactivePowerVar;

        const sSquared = s * s;
        const sumOfSquares = p * p + q * q;

        // Relative error must be within 1e-6
        expect(Math.abs(sSquared - sumOfSquares) / sSquared).toBeLessThan(1e-6);
      });
    });

    it("verifies reciprocal voltage invariant: I_240V = 2 * I_480V across all power ratings", () => {
      const powerLevelsKw = [5, 10, 25, 50, 100, 250, 500];
      const powerFactors = [0.8, 0.85, 0.9, 0.95, 1.0];

      powerLevelsKw.forEach((kw) => {
        powerFactors.forEach((pf) => {
          const out240 = calculateThreePhasePower({
            mode: "solve_current",
            voltage: 240,
            voltageReference: "line_to_line",
            powerValue: kw,
            powerUnit: "kW",
            powerFactor: pf,
          });

          const out480 = calculateThreePhasePower({
            mode: "solve_current",
            voltage: 480,
            voltageReference: "line_to_line",
            powerValue: kw,
            powerUnit: "kW",
            powerFactor: pf,
          });

          const ratio = out240.lineCurrentAmps / out480.lineCurrentAmps;
          expect(Number(ratio.toFixed(6))).toBe(2.0);
        });
      });
    });

    it("preserves line-to-line vs line-to-neutral parity when V_LN = V_LL / √3", () => {
      const vLL = 480;
      const vLN = 480 / SQRT_3; // 277.128V
      const i = 45;
      const pf = 0.86;

      const outLL = calculateThreePhasePower({
        mode: "solve_power",
        voltage: vLL,
        voltageReference: "line_to_line",
        currentAmps: i,
        powerFactor: pf,
      });

      const outLN = calculateThreePhasePower({
        mode: "solve_power",
        voltage: vLN,
        voltageReference: "line_to_neutral",
        currentAmps: i,
        powerFactor: pf,
      });

      // Both must yield identical real and apparent power
      expect(Math.abs(outLL.realPowerWatts - outLN.realPowerWatts)).toBeLessThan(0.001);
      expect(Math.abs(outLL.apparentPowerVa - outLN.apparentPowerVa)).toBeLessThan(0.001);
    });

    it("preserves split-phase generator current invariants: I_240V = I_per_leg and I_total120 = 2 * I_240V", () => {
      const generatorWatts = [3500, 5000, 7500, 10000, 12000, 20000, 24000];

      generatorWatts.forEach((w) => {
        const out = calculateGeneratorAmperage({
          powerWatts: w,
          voltageConfig: "120_240v_split",
          powerFactor: 1.0,
        });

        expect(out.splitPhaseDetails).toBeDefined();
        if (out.splitPhaseDetails) {
          const { ampsAt240V, ampsPer120VLeg, total120VCombinedAmps } = out.splitPhaseDetails;
          // In balanced split phase: Amps per leg equals Amps at 240V
          expect(ampsPer120VLeg).toBe(ampsAt240V);
          // Combined 120V amps equals 2 * Amps at 240V
          expect(Math.abs(total120VCombinedAmps - 2 * ampsAt240V)).toBeLessThan(0.05);
        }
      });
    });
  });

  // =========================================================================
  // 3. NEC CODE & INDUSTRIAL SIZING COMPLIANCE ORACLES
  // =========================================================================
  describe("3. NEC Code & Industrial Sizing Compliance Oracles", () => {
    it("audits 100% compliance with NEC Table 430.250 across all 14 motor rows", () => {
      const necTable430_250: Record<number, { v208: number; v240: number; v480: number }> = {
        5: { v208: 16.7, v240: 15.2, v480: 7.6 },
        7.5: { v208: 24.2, v240: 22.0, v480: 11.0 },
        10: { v208: 30.8, v240: 28.0, v480: 14.0 },
        15: { v208: 46.2, v240: 42.0, v480: 21.0 },
        20: { v208: 59.4, v240: 54.0, v480: 27.0 },
        25: { v208: 74.8, v240: 68.0, v480: 34.0 },
        30: { v208: 88.0, v240: 80.0, v480: 40.0 },
        40: { v208: 114.0, v240: 104.0, v480: 52.0 },
        50: { v208: 143.0, v240: 130.0, v480: 65.0 },
        60: { v208: 169.0, v240: 154.0, v480: 77.0 },
        75: { v208: 211.0, v240: 192.0, v480: 96.0 },
        100: { v208: 273.0, v240: 248.0, v480: 124.0 },
        150: { v208: 396.0, v240: 360.0, v480: 180.0 },
        200: { v208: 528.0, v240: 480.0, v480: 240.0 },
      };

      const fullPath = path.resolve(
        process.cwd(),
        "src/components/content/ThreePhasePowerGuideSection.tsx"
      );
      const content = fs.readFileSync(fullPath, "utf-8");

      const motorRowRegex =
        /hp:\s*(\d+(?:\.\d+)?),[\s\S]*?fla208v:\s*["']([\d.]+) A["'],\s*fla240v:\s*["']([\d.]+) A["'],\s*fla480v:\s*["']([\d.]+) A["']/g;

      let match: RegExpExecArray | null;
      let auditedCount = 0;

      while ((match = motorRowRegex.exec(content)) !== null) {
        auditedCount++;
        const hp = parseFloat(match[1]);
        const actual208 = parseFloat(match[2]);
        const actual240 = parseFloat(match[3]);
        const actual480 = parseFloat(match[4]);

        const expected = necTable430_250[hp];
        expect(expected, `Unknown motor HP ${hp}`).toBeDefined();

        expect(actual208, `HP ${hp} at 208V`).toBe(expected.v208);
        expect(actual240, `HP ${hp} at 240V`).toBe(expected.v240);
        expect(actual480, `HP ${hp} at 480V`).toBe(expected.v480);

        // Verification of reciprocal standard: FLA at 240V must equal 2 * FLA at 480V
        expect(actual240, `Reciprocal check HP ${hp}`).toBe(actual480 * 2);
      }

      expect(auditedCount).toBe(14);
    });

    it("verifies mechanical kW conversion (P_mech = HP * 0.7457) across all motor rows", () => {
      const fullPath = path.resolve(
        process.cwd(),
        "src/components/content/ThreePhasePowerGuideSection.tsx"
      );
      const content = fs.readFileSync(fullPath, "utf-8");

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

    it("verifies NEC 430.22 125% conductor ampacity and NEC 430.52 250% breaker limits", () => {
      const fullPath = path.resolve(
        process.cwd(),
        "src/components/content/ThreePhasePowerGuideSection.tsx"
      );
      const content = fs.readFileSync(fullPath, "utf-8");

      const rowRegex =
        /hp:\s*(\d+(?:\.\d+)?),[\s\S]*?fla480v:\s*["']([\d.]+) A["'],[\s\S]*?minWireAmpacity:\s*["']([\d.]+) A[\s\S]*?maxBreaker480v:\s*["']([\d.]+) A["']/g;

      let match: RegExpExecArray | null;
      let count = 0;

      while ((match = rowRegex.exec(content)) !== null) {
        count++;
        const hp = parseFloat(match[1]);
        const fla480 = parseFloat(match[2]);
        const wireAmp = parseFloat(match[3]);
        const breakerAmp = parseFloat(match[4]);

        // NEC 430.22: Wire ampacity >= 125% of FLA
        expect(wireAmp, `HP ${hp} conductor ampacity`).toBeGreaterThanOrEqual(fla480 * 1.249);

        // NEC 430.52: Breaker ampacity <= 250% of FLA (accounting for next standard size under NEC 240.6)
        expect(breakerAmp, `HP ${hp} breaker sizing`).toBeLessThanOrEqual(fla480 * 2.5 + 20);
      }
      expect(count).toBe(14);
    });

    it("verifies NEC 80% continuous operating current rule across generator amperage data", () => {
      GENERATOR_AMPERAGE_CHART_DATA.forEach((row) => {
        if (row.ratedAmps240V > 0) {
          const expectedContinuous = Math.round(row.ratedAmps240V * 0.8 * 10) / 10;
          expect(
            Math.abs(row.continuousAmps240V - expectedContinuous),
            `Watts ${row.watts} continuous 240V amps`
          ).toBeLessThanOrEqual(0.1001);
        }
      });
    });
  });

  // =========================================================================
  // 4. VISIBLE RENDERED CONTENT DEPTH ORACLES
  // =========================================================================
  describe("4. Visible Rendered Content Depth Oracles", () => {
    it("generator fuel route strictly exceeds 2,500 rendered visible words", () => {
      const calcHtml = renderToString(React.createElement(GeneratorFuelCalculator));
      const guideHtml = renderToString(React.createElement(GeneratorFuelGuideSection));
      const combinedHtml = calcHtml + " " + guideHtml;
      const visibleText = extractVisibleText(combinedHtml);
      const wordCount = countWords(visibleText);

      console.log(`[TIER5-AUDIT] Generator Fuel Route Rendered Word Count: ${wordCount}`);
      expect(wordCount).toBeGreaterThan(2500);
    });

    it("three-phase power route strictly exceeds 3,000 rendered visible words", () => {
      const calcHtml = renderToString(React.createElement(ThreePhasePowerCalculator));
      const guideHtml = renderToString(React.createElement(ThreePhasePowerGuideSection));
      const combinedHtml = calcHtml + " " + guideHtml;
      const visibleText = extractVisibleText(combinedHtml);
      const wordCount = countWords(visibleText);

      console.log(`[TIER5-AUDIT] Three-Phase Power Route Rendered Word Count: ${wordCount}`);
      expect(wordCount).toBeGreaterThan(3000);
    });
  });

  // =========================================================================
  // 5. PARAGRAPH READABILITY WORD COUNT CEILING (<= 55 WORDS)
  // =========================================================================
  describe("5. Sitewide Paragraph Word Count Ceiling (<= 55 Words)", () => {
    it("ensures 100% of body paragraphs across all components strictly contain <= 55 words", () => {
      const pPattern = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
      const violations: Array<{ file: string; words: number; snippet: string }> = [];

      function checkDir(dir: string) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            if (!["node_modules", ".next", ".git", ".agents"].includes(entry.name)) {
              checkDir(fullPath);
            }
          } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
            const content = fs.readFileSync(fullPath, "utf-8");
            let match: RegExpExecArray | null;
            while ((match = pPattern.exec(content)) !== null) {
              const innerText = match[1]
                .replace(/<[^>]+>/g, " ")
                .replace(/\{[^{}]*\}/g, " ")
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
                .replace(/&#x27;/g, "'")
                .replace(/&#39;/g, "'")
                .replace(/&apos;/g, "'")
                .replace(/&nbsp;/g, " ")
                .replace(/\s+/g, " ")
                .trim();
              const words = innerText.split(/\s+/).filter(Boolean);
              if (words.length > 55) {
                violations.push({
                  file: path.relative(process.cwd(), fullPath),
                  words: words.length,
                  snippet: words.slice(0, 10).join(" ") + "...",
                });
              }
            }
          }
        }
      }

      checkDir(path.resolve(process.cwd(), "src/components"));
      checkDir(path.resolve(process.cwd(), "src/app"));

      if (violations.length > 0) {
        console.table(violations);
      }
      expect(
        violations,
        `Found ${violations.length} paragraphs exceeding 55 words`
      ).toEqual([]);
    });
  });

  // =========================================================================
  // 6. DASH INTEGRITY SENTINEL (ZERO EM-DASHES & EN-DASHES)
  // =========================================================================
  describe("6. Sitewide Typography & Dash Integrity Sentinel", () => {
    const emDashChar = String.fromCharCode(0x2014);
    const enDashChar = String.fromCharCode(0x2013);

    function findDashesInDir(dir: string, extensions: string[]): Array<{ file: string; type: string }> {
      const violations: Array<{ file: string; type: string }> = [];
      if (!fs.existsSync(dir)) return violations;

      function recurse(currentDir: string) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          if (entry.isDirectory()) {
            if (!["node_modules", ".next", ".git", "__pycache__"].includes(entry.name)) {
              recurse(fullPath);
            }
          } else if (entry.isFile()) {
            if (entry.name.endsWith(".pyc")) continue;
            const ext = path.extname(entry.name);
            if (extensions.includes(ext)) {
              const content = fs.readFileSync(fullPath, "utf-8");
              if (content.includes(emDashChar)) {
                violations.push({
                  file: path.relative(process.cwd(), fullPath),
                  type: "em-dash (\\u2014)",
                });
              }
              if (content.includes(enDashChar)) {
                violations.push({
                  file: path.relative(process.cwd(), fullPath),
                  type: "en-dash (\\u2013)",
                });
              }
            }
          }
        }
      }

      recurse(dir);
      return violations;
    }

    it("ensures zero raw em-dashes and en-dashes across production code in src/", () => {
      const srcViolations = findDashesInDir(path.resolve(process.cwd(), "src"), [
        ".ts",
        ".tsx",
        ".js",
        ".json",
      ]);
      expect(
        srcViolations,
        `Production code in src/ contains forbidden dashes:\n${JSON.stringify(srcViolations, null, 2)}`
      ).toEqual([]);
    });

    it("ensures zero raw em-dashes and en-dashes across test code in tests/", () => {
      const testViolations = findDashesInDir(path.resolve(process.cwd(), "tests"), [
        ".ts",
        ".tsx",
        ".js",
      ]);
      expect(
        testViolations,
        `Test code in tests/ contains raw forbidden dashes:\n${JSON.stringify(testViolations, null, 2)}`
      ).toEqual([]);
    });

    it("audits scripts/ for dash compliance and isolates legacy script defects", () => {
      const scriptViolations = findDashesInDir(path.resolve(process.cwd(), "scripts"), [
        ".ts",
        ".js",
        ".py",
      ]);

      console.log(`[TIER5-AUDIT] Script dash violations count: ${scriptViolations.length}`);
      if (scriptViolations.length > 0) {
        console.table(scriptViolations);
      }

      // Assert that no scripts contain forbidden dashes
      expect(
        scriptViolations,
        `Tooling scripts in scripts/ must not contain raw forbidden dashes:\n${JSON.stringify(scriptViolations, null, 2)}`
      ).toEqual([]);
    });
  });
});
