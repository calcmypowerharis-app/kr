import { describe, expect, test } from "vitest";
import {
  calculateSolarSystemSize,
  validateSolarSystemSizeInputs,
  SOLAR_SYSTEM_SIZE_DEFAULTS,
  CONSUMPTION_PRESETS,
  REGIONAL_SUN_PRESETS,
  COMPARISON_PANEL_WATTS,
  SOLAR_SYSTEM_SIZE_FAQS,
  formatKw,
  formatKwhNumber,
  formatWattsNumber,
} from "../solar-system-size";

describe("Solar System Size Calculator Engine", () => {
  describe("Approved Deterministic Benchmark Scenarios", () => {
    test("Scenario 1: Typical Residential (900 kWh/mo, 100% Offset, 4.5 PSH, 78% PR, 400W Panel)", () => {
      const result = calculateSolarSystemSize({
        monthlyKwh: 900,
        daysInMonth: 30,
        solarOffsetPercent: 100,
        peakSunHours: 4.5,
        performanceRatioPercent: 78,
        panelWattage: 400,
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);

      // Daily energy = 900 / 30 = 30 kWh/day
      expect(result.dailyEnergyKwh).toBe(30.0);
      expect(result.targetDailySolarKwh).toBe(30.0);
      expect(result.targetAnnualSolarKwh).toBe(30.0 * 365); // 10,950 kWh

      // Daily yield = 4.5 * 0.78 = 3.51 kWh/kW/day
      // System size = 30 / 3.51 ≈ 8.5470085 kW
      expect(result.systemSizeKw).toBeCloseTo(8.547, 3);
      expect(result.systemSizeWatts).toBeCloseTo(8547.01, 1);

      // Raw panel count = 8547.0085 / 400 ≈ 21.3675
      expect(result.rawPanelCount).toBeCloseTo(21.368, 2);
      expect(result.roundedPanelCount).toBe(22);

      // Actual array size = 22 * 400 / 1000 = 8.80 kW
      expect(result.actualArraySizeKw).toBe(8.8);

      // Estimated daily production = 8.8 * 3.51 = 30.888 kWh/day
      expect(result.estimatedDailyProductionKwh).toBeCloseTo(30.888, 2);

      // Roof space
      expect(result.estimatedRoofAreaModulesSqFt).toBe(22 * 21); // 462 sq ft
      expect(result.estimatedRoofAreaTotalSqFt).toBe(22 * 25); // 550 sq ft
    });

    test("Scenario 2: Lower-Consumption Household (500 kWh/mo, 100% Offset, 4.2 PSH, 78% PR, 400W Panel)", () => {
      const result = calculateSolarSystemSize({
        monthlyKwh: 500,
        daysInMonth: 30,
        solarOffsetPercent: 100,
        peakSunHours: 4.2,
        performanceRatioPercent: 78,
        panelWattage: 400,
      });

      expect(result.isValid).toBe(true);
      expect(result.dailyEnergyKwh).toBeCloseTo(16.6667, 3);
      expect(result.targetDailySolarKwh).toBeCloseTo(16.6667, 3);

      // Daily yield = 4.2 * 0.78 = 3.276 kWh/kW/day
      // System size = 16.66667 / 3.276 ≈ 5.0875 kW
      expect(result.systemSizeKw).toBeCloseTo(5.088, 3);
      expect(result.systemSizeWatts).toBeCloseTo(5087.51, 1);

      // Raw panel count = 5087.505 / 400 ≈ 12.7188
      expect(result.rawPanelCount).toBeCloseTo(12.719, 2);
      expect(result.roundedPanelCount).toBe(13);

      // Actual array size = 13 * 400 / 1000 = 5.20 kW
      expect(result.actualArraySizeKw).toBe(5.2);
    });

    test("Scenario 3: Higher-Consumption Household (1,500 kWh/mo, 100% Offset, 5.0 PSH, 80% PR, 400W Panel)", () => {
      const result = calculateSolarSystemSize({
        monthlyKwh: 1500,
        daysInMonth: 30,
        solarOffsetPercent: 100,
        peakSunHours: 5.0,
        performanceRatioPercent: 80,
        panelWattage: 400,
      });

      expect(result.isValid).toBe(true);
      expect(result.dailyEnergyKwh).toBe(50.0);
      expect(result.targetDailySolarKwh).toBe(50.0);

      // Daily yield = 5.0 * 0.80 = 4.0 kWh/kW/day
      // System size = 50.0 / 4.0 = 12.50 kW
      expect(result.systemSizeKw).toBe(12.5);
      expect(result.systemSizeWatts).toBe(12500);

      // Raw panel count = 12,500 / 400 = 31.25
      expect(result.rawPanelCount).toBe(31.25);
      expect(result.roundedPanelCount).toBe(32);

      // Actual array size = 32 * 400 / 1000 = 12.80 kW
      expect(result.actualArraySizeKw).toBe(12.8);
    });

    test("Scenario 4: Partial-Offset System (1,200 kWh/mo, 75% Offset, 4.5 PSH, 78% PR, 400W Panel)", () => {
      const result = calculateSolarSystemSize({
        monthlyKwh: 1200,
        daysInMonth: 30,
        solarOffsetPercent: 75,
        peakSunHours: 4.5,
        performanceRatioPercent: 78,
        panelWattage: 400,
      });

      expect(result.isValid).toBe(true);
      // Daily consumption = 1,200 / 30 = 40.0 kWh/day
      expect(result.dailyEnergyKwh).toBe(40.0);
      // Target solar energy = 40.0 * 0.75 = 30.0 kWh/day
      expect(result.targetDailySolarKwh).toBe(30.0);

      // System size = 30.0 / (4.5 * 0.78) ≈ 8.547 kW
      expect(result.systemSizeKw).toBeCloseTo(8.547, 3);
      expect(result.rawPanelCount).toBeCloseTo(21.368, 2);
      expect(result.roundedPanelCount).toBe(22);
      expect(result.actualArraySizeKw).toBe(8.8);
    });

    test("Scenario 5: Alternative Higher-Wattage Panel (900 kWh/mo, 100% Offset, 4.5 PSH, 78% PR, 450W Panel)", () => {
      const result = calculateSolarSystemSize({
        monthlyKwh: 900,
        daysInMonth: 30,
        solarOffsetPercent: 100,
        peakSunHours: 4.5,
        performanceRatioPercent: 78,
        panelWattage: 450,
      });

      expect(result.isValid).toBe(true);
      expect(result.systemSizeKw).toBeCloseTo(8.547, 3);
      expect(result.systemSizeWatts).toBeCloseTo(8547.01, 1);

      // Raw panel count = 8547.0085 / 450 ≈ 18.9933
      expect(result.rawPanelCount).toBeCloseTo(18.993, 2);
      expect(result.roundedPanelCount).toBe(19);

      // Actual array size = 19 * 450 / 1000 = 8.55 kW
      expect(result.actualArraySizeKw).toBe(8.55);
    });
  });

  describe("Validation & Guardrails", () => {
    test("rejects non-positive or missing monthly consumption", () => {
      const errZero = validateSolarSystemSizeInputs({ monthlyKwh: 0 });
      expect(errZero.length).toBeGreaterThan(0);

      const errNegative = validateSolarSystemSizeInputs({ monthlyKwh: -100 });
      expect(errNegative.length).toBeGreaterThan(0);

      const resZero = calculateSolarSystemSize({ monthlyKwh: 0 });
      expect(resZero.isValid).toBe(false);
      expect(resZero.systemSizeKw).toBe(0);
    });

    test("rejects out-of-range peak sun hours", () => {
      const errLow = validateSolarSystemSizeInputs({ monthlyKwh: 900, peakSunHours: 0 });
      expect(errLow.length).toBeGreaterThan(0);

      const errHigh = validateSolarSystemSizeInputs({ monthlyKwh: 900, peakSunHours: 24 });
      expect(errHigh.length).toBeGreaterThan(0);
    });

    test("rejects out-of-range performance ratio", () => {
      const errLow = validateSolarSystemSizeInputs({ monthlyKwh: 900, performanceRatioPercent: 40 });
      expect(errLow.length).toBeGreaterThan(0);

      const errHigh = validateSolarSystemSizeInputs({ monthlyKwh: 900, performanceRatioPercent: 100 });
      expect(errHigh.length).toBeGreaterThan(0);
    });

    test("rejects out-of-range panel wattage", () => {
      const errLow = validateSolarSystemSizeInputs({ monthlyKwh: 900, panelWattage: 100 });
      expect(errLow.length).toBeGreaterThan(0);

      const errHigh = validateSolarSystemSizeInputs({ monthlyKwh: 900, panelWattage: 900 });
      expect(errHigh.length).toBeGreaterThan(0);
    });

    test("applies sensible defaults when optional fields are omitted", () => {
      const result = calculateSolarSystemSize({ monthlyKwh: 900 });
      expect(result.daysInMonth).toBe(SOLAR_SYSTEM_SIZE_DEFAULTS.daysInMonth);
      expect(result.solarOffsetPercent).toBe(SOLAR_SYSTEM_SIZE_DEFAULTS.solarOffsetPercent);
      expect(result.peakSunHours).toBe(SOLAR_SYSTEM_SIZE_DEFAULTS.peakSunHours);
      expect(result.performanceRatio).toBe(SOLAR_SYSTEM_SIZE_DEFAULTS.performanceRatioPercent! / 100);
      expect(result.panelWattage).toBe(SOLAR_SYSTEM_SIZE_DEFAULTS.panelWattage);
    });
  });

  describe("Panel Comparison Table & Spatial Footprint", () => {
    test("generates rows for all standard comparison panel wattages", () => {
      const result = calculateSolarSystemSize({ monthlyKwh: 900 });
      expect(result.comparisonRows).toHaveLength(COMPARISON_PANEL_WATTS.length);

      const row400 = result.comparisonRows.find((r) => r.panelWattage === 400);
      expect(row400).toBeDefined();
      expect(row400?.roundedCount).toBe(22);
      expect(row400?.isCurrentSelection).toBe(true);

      const row350 = result.comparisonRows.find((r) => r.panelWattage === 350);
      expect(row350).toBeDefined();
      // 8547.01 / 350 ≈ 24.42 -> 25 panels
      expect(row350?.roundedCount).toBe(25);
      expect(row350?.isCurrentSelection).toBe(false);
    });

    test("estimates roof area scaled to module count", () => {
      const result = calculateSolarSystemSize({ monthlyKwh: 900 });
      expect(result.estimatedRoofAreaModulesSqFt).toBe(22 * 21);
      expect(result.estimatedRoofAreaTotalSqFt).toBe(22 * 25);
    });
  });

  describe("Formatting & Educational Metadata", () => {
    test("formatting helpers produce clean numeric representations", () => {
      expect(formatKw(8.547)).toBe("8.55");
      expect(formatKwhNumber(30.88)).toBe("30.9");
      expect(formatKwhNumber(10950)).toBe("10,950");
      expect(formatWattsNumber(8547.01)).toBe("8,547");
    });

    test("presets and FAQs are populated and non-empty", () => {
      expect(CONSUMPTION_PRESETS.length).toBeGreaterThanOrEqual(4);
      expect(REGIONAL_SUN_PRESETS.length).toBeGreaterThanOrEqual(5);
      expect(SOLAR_SYSTEM_SIZE_FAQS.length).toBeGreaterThanOrEqual(6);
    });
  });
});
