import { describe, expect, it } from "vitest";
import {
  calculateGeneratorAmperage,
  GENERATOR_AMPERAGE_CHART_DATA,
  GENERATOR_VOLTAGE_OPTIONS,
  STANDARD_GENERATOR_PRESETS,
} from "../generator-amperage";

describe("Generator Amperage Calculator Logic", () => {
  describe("1. Single-Phase 120V Calculations", () => {
    it("calculates correct amperage for a 2,000W 120V inverter generator", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 2000,
        voltageConfig: "120v_single",
        powerFactor: 1.0,
      });

      expect(res.isValid).toBe(true);
      expect(res.ratedAmps).toBeCloseTo(16.67, 2);
      expect(res.formattedRatedAmps).toBe("16.67 A");
      expect(res.continuousSafeAmps).toBeCloseTo(13.34, 2);
      expect(res.powerKw).toBe(2);
      expect(res.apparentPowerKva).toBe(2);
      expect(res.nominalVoltage).toBe(120);
    });

    it("calculates correct amperage for a 3,500W 120V RV generator", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 3500,
        voltageConfig: "120v_single",
        powerFactor: 1.0,
      });

      expect(res.isValid).toBe(true);
      expect(res.ratedAmps).toBeCloseTo(29.17, 2);
      expect(res.continuousSafeAmps).toBeCloseTo(23.34, 2);
    });

    it("triggers high-current warning when 120V single-phase exceeds 30A", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 4000,
        voltageConfig: "120v_single",
        powerFactor: 1.0,
      });

      expect(res.ratedAmps).toBeCloseTo(33.33, 2);
      expect(res.warnings.some((w) => w.includes("High Current on 120V"))).toBe(true);
    });
  });

  describe("2. Split-Phase 120/240V Calculations", () => {
    it("calculates 240V line current and balanced 120V leg current for a 7,500W generator", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 7500,
        voltageConfig: "120_240v_split",
        powerFactor: 1.0,
      });

      expect(res.isValid).toBe(true);
      // At 240V: 7500 / 240 = 31.25 A
      expect(res.ratedAmps).toBeCloseTo(31.25, 2);
      expect(res.continuousSafeAmps).toBeCloseTo(25.0, 2);
      expect(res.splitPhaseDetails).toBeDefined();
      expect(res.splitPhaseDetails?.ampsAt240V).toBe(31.25);
      expect(res.splitPhaseDetails?.ampsPer120VLeg).toBe(31.25);
      // Total combined 120V if summed across both legs: 7500 / 120 = 62.5 A
      expect(res.splitPhaseDetails?.total120VCombinedAmps).toBe(62.5);
      expect(res.warnings.some((w) => w.includes("Split-Phase Leg Balancing"))).toBe(true);
    });

    it("calculates correct ratings for a 12,000W dual-fuel generator", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 12000,
        voltageConfig: "120_240v_split",
        powerFactor: 1.0,
      });

      expect(res.isValid).toBe(true);
      expect(res.ratedAmps).toBe(50.0);
      expect(res.continuousSafeAmps).toBe(40.0);
      expect(res.splitPhaseDetails?.ampsAt240V).toBe(50.0);
      expect(res.splitPhaseDetails?.ampsPer120VLeg).toBe(50.0);
      expect(res.splitPhaseDetails?.total120VCombinedAmps).toBe(100.0);
    });

    it("calculates whole-house 20,000W standby generator current", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 20000,
        voltageConfig: "120_240v_split",
        powerFactor: 1.0,
      });

      expect(res.isValid).toBe(true);
      // 20,000 / 240 = 83.33 A
      expect(res.ratedAmps).toBeCloseTo(83.33, 2);
      expect(res.continuousSafeAmps).toBeCloseTo(66.66, 2);
      expect(res.splitPhaseDetails?.ampsAt240V).toBeCloseTo(83.33, 2);
    });
  });

  describe("3. Dedicated 240V Single-Phase Calculations", () => {
    it("calculates correct current for dedicated 240V load", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 5000,
        voltageConfig: "240v_single",
        powerFactor: 1.0,
      });

      expect(res.isValid).toBe(true);
      // 5000 / 240 = 20.83 A
      expect(res.ratedAmps).toBeCloseTo(20.83, 2);
      expect(res.continuousSafeAmps).toBeCloseTo(16.66, 2);
      expect(res.splitPhaseDetails).toBeUndefined();
    });
  });

  describe("4. Three-Phase Line-to-Line Calculations", () => {
    it("calculates balanced 208V three-phase current (I = P / (√3 × 208 × PF))", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 10000,
        voltageConfig: "208v_three",
        powerFactor: 0.8,
      });

      expect(res.isValid).toBe(true);
      // I = 10000 / (1.7320508 * 208 * 0.8) = 10000 / 288.2668 = 34.69 A
      expect(res.ratedAmps).toBeCloseTo(34.69, 1);
      expect(res.apparentPowerKva).toBeCloseTo(12.5, 1);
      expect(res.formulaExplanation).toContain("√3");
    });

    it("calculates balanced 480V three-phase current", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 50000,
        voltageConfig: "480v_three",
        powerFactor: 0.8,
      });

      expect(res.isValid).toBe(true);
      // I = 50000 / (1.7320508 * 480 * 0.8) = 50000 / 665.1075 = 75.18 A
      expect(res.ratedAmps).toBeCloseTo(75.18, 1);
      expect(res.apparentPowerKva).toBeCloseTo(62.5, 1);
    });
  });

  describe("5. Power Factor & Continuous Rating Adjustments", () => {
    it("handles inductive load power factor derating (PF 0.8)", () => {
      const unity = calculateGeneratorAmperage({
        powerWatts: 5000,
        voltageConfig: "240v_single",
        powerFactor: 1.0,
      });
      const inductive = calculateGeneratorAmperage({
        powerWatts: 5000,
        voltageConfig: "240v_single",
        powerFactor: 0.8,
      });

      // 5000 / 240 = 20.83 A vs 5000 / (240 * 0.8) = 26.04 A
      expect(unity.ratedAmps).toBeCloseTo(20.83, 2);
      expect(inductive.ratedAmps).toBeCloseTo(26.04, 2);
      expect(inductive.apparentPowerKva).toBeCloseTo(6.25, 2);
      expect(inductive.warnings.some((w) => w.includes("Low Power Factor"))).toBe(true);
    });

    it("allows 100% maximum continuous load without 80% derating", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 4000,
        voltageConfig: "120v_single",
        continuousLoadPercent: 100,
      });

      expect(res.continuousSafeAmps).toBe(res.ratedAmps);
    });
  });

  describe("6. Validation and Edge Cases", () => {
    it("handles zero power input safely", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 0,
        voltageConfig: "120v_single",
      });

      expect(res.isValid).toBe(true);
      expect(res.ratedAmps).toBe(0);
      expect(res.formattedRatedAmps).toBe("0.00 A");
      expect(res.continuousSafeAmps).toBe(0);
    });

    it("rejects negative wattage", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: -500,
        voltageConfig: "120v_single",
      });

      expect(res.isValid).toBe(false);
      expect(res.errors.length).toBeGreaterThan(0);
      expect(res.errors[0].field).toBe("powerWatts");
    });

    it("rejects invalid power factor", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 5000,
        voltageConfig: "120v_single",
        powerFactor: 1.5,
      });

      expect(res.isValid).toBe(false);
      expect(res.errors.some((e) => e.field === "powerFactor")).toBe(true);
    });

    it("rejects invalid continuous derating percent", () => {
      const res = calculateGeneratorAmperage({
        powerWatts: 5000,
        voltageConfig: "120v_single",
        continuousLoadPercent: 150,
      });

      expect(res.isValid).toBe(false);
      expect(res.errors.some((e) => e.field === "continuousLoadPercent")).toBe(true);
    });
  });

  describe("7. Generator Amperage Chart Matrix Integrity", () => {
    it("contains comprehensive standard generator ratings from 1kW to 26kW", () => {
      expect(GENERATOR_AMPERAGE_CHART_DATA.length).toBeGreaterThanOrEqual(15);
      const wattages = GENERATOR_AMPERAGE_CHART_DATA.map((row) => row.watts);
      expect(wattages).toContain(1000);
      expect(wattages).toContain(2000);
      expect(wattages).toContain(3500);
      expect(wattages).toContain(5000);
      expect(wattages).toContain(7500);
      expect(wattages).toContain(10000);
      expect(wattages).toContain(12000);
      expect(wattages).toContain(20000);
      expect(wattages).toContain(24000);
      expect(wattages).toContain(26000);
    });

    it("verifies mathematical consistency for all chart entries", () => {
      for (const row of GENERATOR_AMPERAGE_CHART_DATA) {
        expect(row.kw).toBe(row.watts / 1000);
        // 120V rated amps should match watts / 120
        const expected120 = Math.round((row.watts / 120) * 10) / 10;
        expect(row.ratedAmps120V).toBeCloseTo(expected120, 1);

        if (row.ratedAmps240V > 0) {
          const expected240 = Math.round((row.watts / 240) * 10) / 10;
          expect(row.ratedAmps240V).toBeCloseTo(expected240, 1);
        }

        // Apparent power at 0.8 PF: watts / 800
        const expectedKva = Math.round((row.watts / 800) * 100) / 100;
        expect(row.apparentPowerKva08Pf).toBeCloseTo(expectedKva, 2);
        expect(row.commonApplications.length).toBeGreaterThan(3);
      }
    });

    it("has valid voltage options and presets", () => {
      expect(GENERATOR_VOLTAGE_OPTIONS.length).toBe(5);
      expect(STANDARD_GENERATOR_PRESETS.length).toBeGreaterThanOrEqual(6);
    });
  });
});
