import { describe, expect, it } from "vitest";
import {
  calculateThreePhasePower,
  validateThreePhaseInputs,
  THREE_PHASE_VOLTAGE_PRESETS,
  THREE_PHASE_SCENARIOS,
  formatDecimal,
} from "../three-phase-power";

describe("Three-Phase Power Calculator Engine", () => {
  describe("1. Mode A: Forward Calculation (Solve Power from Voltage, Current & PF)", () => {
    it("Benchmark 1: 208V, 20A, PF 1.00 (Purely Resistive)", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 208,
        voltageReference: "line_to_line",
        currentAmps: 20,
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);

      // P = √3 × 208 × 20 × 1.0 ≈ 7,205.33 W
      expect(result.realPowerWatts).toBeCloseTo(7205.33, 1);
      expect(result.realPowerKw).toBeCloseTo(7.205, 3);
      expect(result.formattedRealPowerKw).toBe("7.205");

      // Apparent power S = √3 × 208 × 20 ≈ 7,205.33 VA
      expect(result.apparentPowerVa).toBeCloseTo(7205.33, 1);
      expect(result.apparentPowerKva).toBeCloseTo(7.205, 3);
      expect(result.formattedApparentPowerKva).toBe("7.205");

      // Reactive power at unity PF should be 0
      expect(result.reactivePowerVar).toBeCloseTo(0, 1);
      expect(result.reactivePowerKvar).toBeCloseTo(0, 3);

      expect(result.lineCurrentAmps).toBe(20);
      expect(result.vLineToLine).toBe(208);
      expect(result.vLineToNeutral).toBeCloseTo(120.09, 1);
    });

    it("Benchmark 2: 208V, 20A, PF 0.90 (Commercial HVAC Motor)", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 208,
        voltageReference: "line_to_line",
        currentAmps: 20,
        powerFactor: 0.9,
      });

      expect(result.isValid).toBe(true);
      // P = √3 × 208 × 20 × 0.90 ≈ 6,484.80 W
      expect(result.realPowerWatts).toBeCloseTo(6484.80, 1);
      expect(result.realPowerKw).toBeCloseTo(6.485, 3);
      expect(result.formattedRealPowerKw).toBe("6.485");

      // S = √3 × 208 × 20 ≈ 7,205.33 VA
      expect(result.apparentPowerVa).toBeCloseTo(7205.33, 1);
      expect(result.apparentPowerKva).toBeCloseTo(7.205, 3);

      // Q = √(S² - P²) ≈ 3,140.76 VAR
      expect(result.reactivePowerVar).toBeCloseTo(3140.76, 1);
      expect(result.reactivePowerKvar).toBeCloseTo(3.141, 2);
    });

    it("Benchmark 3: 240V, 30A, PF 1.00 (Delta Circuit)", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 240,
        voltageReference: "line_to_line",
        currentAmps: 30,
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      // P = √3 × 240 × 30 × 1.0 ≈ 12,470.77 W
      expect(result.realPowerWatts).toBeCloseTo(12470.77, 1);
      expect(result.realPowerKw).toBeCloseTo(12.471, 3);
      expect(result.formattedRealPowerKw).toBe("12.471");
      expect(result.apparentPowerKva).toBeCloseTo(12.471, 3);
    });

    it("Benchmark 4: 480V, 15A, PF 0.85 (Industrial Motor)", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 480,
        voltageReference: "line_to_line",
        currentAmps: 15,
        powerFactor: 0.85,
      });

      expect(result.isValid).toBe(true);
      // S = √3 × 480 × 15 ≈ 12,470.77 VA
      expect(result.apparentPowerVa).toBeCloseTo(12470.77, 1);
      expect(result.apparentPowerKva).toBeCloseTo(12.471, 3);

      // P = √3 × 480 × 15 × 0.85 ≈ 10,600.15 W
      expect(result.realPowerWatts).toBeCloseTo(10600.15, 1);
      expect(result.realPowerKw).toBeCloseTo(10.600, 3);
      expect(result.formattedRealPowerKw).toBe("10.600");

      // Q = √(12470.77² - 10600.15²) ≈ 6,569.34 VAR
      expect(result.reactivePowerVar).toBeCloseTo(6569.34, 1);
      expect(result.reactivePowerKvar).toBeCloseTo(6.569, 2);
    });

    it("Line-to-Neutral Mode: 120V V_LN, 20A, PF 0.90", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 120,
        voltageReference: "line_to_neutral",
        currentAmps: 20,
        powerFactor: 0.9,
      });

      expect(result.isValid).toBe(true);
      // P = 3 × 120 × 20 × 0.90 = 6,480 W = 6.48 kW
      expect(result.realPowerWatts).toBe(6480);
      expect(result.realPowerKw).toBe(6.48);
      // S = 3 × 120 × 20 = 7,200 VA = 7.2 kVA
      expect(result.apparentPowerVa).toBe(7200);
      expect(result.apparentPowerKva).toBe(7.2);
      // Equivalent V_LL = √3 × 120 ≈ 207.85 V
      expect(result.vLineToLine).toBeCloseTo(207.85, 1);
      expect(result.vLineToNeutral).toBe(120);
    });
  });

  describe("2. Mode B: Reverse Calculation (Solve Current from Power & Voltage)", () => {
    it("Benchmark 5: Solve Line Current from 10 kW at 208V, PF 0.90", () => {
      const result = calculateThreePhasePower({
        mode: "solve_current",
        voltage: 208,
        voltageReference: "line_to_line",
        powerValue: 10,
        powerUnit: "kW",
        powerFactor: 0.9,
      });

      expect(result.isValid).toBe(true);
      // I = 10,000 / (√3 × 208 × 0.90) ≈ 30.842 A
      expect(result.lineCurrentAmps).toBeCloseTo(30.84, 1);
      expect(result.formattedLineCurrentAmps).toBe("30.84");
      expect(result.realPowerWatts).toBe(10000);
      expect(result.realPowerKw).toBe(10);
      // S = 10,000 / 0.90 ≈ 11,111.11 VA
      expect(result.apparentPowerKva).toBeCloseTo(11.111, 2);
    });

    it("Solve Line Current from 15,000 Watts at 480V, PF 0.85", () => {
      const result = calculateThreePhasePower({
        mode: "solve_current",
        voltage: 480,
        voltageReference: "line_to_line",
        powerValue: 15000,
        powerUnit: "W",
        powerFactor: 0.85,
      });

      expect(result.isValid).toBe(true);
      // I = 15,000 / (√3 × 480 × 0.85) ≈ 21.226 A
      expect(result.lineCurrentAmps).toBeCloseTo(21.23, 1);
      expect(result.formattedLineCurrentAmps).toBe("21.23");
      expect(result.realPowerKw).toBe(15);
    });

    it("Benchmark 6: Solve Line Current from Apparent Power 50 kVA at 480V", () => {
      const result = calculateThreePhasePower({
        mode: "solve_current",
        voltage: 480,
        voltageReference: "line_to_line",
        powerValue: 50,
        powerUnit: "kVA",
        powerFactor: 0.85,
      });

      expect(result.isValid).toBe(true);
      // I = 50,000 / (√3 × 480) ≈ 60.141 A (independent of PF!)
      expect(result.lineCurrentAmps).toBeCloseTo(60.14, 1);
      expect(result.formattedLineCurrentAmps).toBe("60.14");
      expect(result.apparentPowerKva).toBe(50);
      // Real power at PF 0.85 is 50 × 0.85 = 42.5 kW
      expect(result.realPowerKw).toBeCloseTo(42.5, 1);
    });

    it("Solve Line Current from Line-to-Neutral Power: 277V V_LN, 15 kW, PF 0.85", () => {
      const result = calculateThreePhasePower({
        mode: "solve_current",
        voltage: 277,
        voltageReference: "line_to_neutral",
        powerValue: 15,
        powerUnit: "kW",
        powerFactor: 0.85,
      });

      expect(result.isValid).toBe(true);
      // I = 15,000 / (3 × 277 × 0.85) ≈ 21.236 A
      expect(result.lineCurrentAmps).toBeCloseTo(21.24, 1);
      expect(result.formattedLineCurrentAmps).toBe("21.24");
    });
  });

  describe("3. Presets & Scenarios Consistency", () => {
    it("Verifies standard voltage presets structure", () => {
      expect(THREE_PHASE_VOLTAGE_PRESETS.length).toBeGreaterThanOrEqual(4);
      const v208 = THREE_PHASE_VOLTAGE_PRESETS.find((p) => p.value === 208);
      const v480 = THREE_PHASE_VOLTAGE_PRESETS.find((p) => p.value === 480);
      expect(v208).toBeDefined();
      expect(v480).toBeDefined();
    });

    it("Evaluates all defined preset scenarios without throwing errors", () => {
      for (const scenario of THREE_PHASE_SCENARIOS) {
        const result = calculateThreePhasePower({
          mode: "solve_power",
          voltage: scenario.voltage,
          voltageReference: scenario.voltageReference,
          currentAmps: scenario.currentAmps,
          powerFactor: scenario.powerFactor,
        });

        expect(result.isValid).toBe(true);
        expect(result.realPowerWatts).toBeGreaterThan(0);
        expect(result.apparentPowerVa).toBeGreaterThan(0);
        expect(result.formulaSteps.length).toBeGreaterThan(0);
      }
    });
  });

  describe("4. Input Validation & Error Handling", () => {
    it("Rejects zero or negative voltage", () => {
      const errorsZero = validateThreePhaseInputs({
        mode: "solve_power",
        voltage: 0,
        voltageReference: "line_to_line",
        currentAmps: 10,
        powerFactor: 0.85,
      });
      expect(errorsZero.some((e) => e.field === "voltage")).toBe(true);

      const errorsNeg = validateThreePhaseInputs({
        mode: "solve_power",
        voltage: -208,
        voltageReference: "line_to_line",
        currentAmps: 10,
        powerFactor: 0.85,
      });
      expect(errorsNeg.some((e) => e.field === "voltage")).toBe(true);
    });

    it("Rejects invalid power factor (<= 0 or > 1.0)", () => {
      const errorsZeroPF = validateThreePhaseInputs({
        mode: "solve_power",
        voltage: 480,
        voltageReference: "line_to_line",
        currentAmps: 10,
        powerFactor: 0,
      });
      expect(errorsZeroPF.some((e) => e.field === "powerFactor")).toBe(true);

      const errorsHighPF = validateThreePhaseInputs({
        mode: "solve_power",
        voltage: 480,
        voltageReference: "line_to_line",
        currentAmps: 10,
        powerFactor: 1.25,
      });
      expect(errorsHighPF.some((e) => e.field === "powerFactor")).toBe(true);
    });

    it("Rejects negative current in solve_power mode", () => {
      const errors = validateThreePhaseInputs({
        mode: "solve_power",
        voltage: 208,
        voltageReference: "line_to_line",
        currentAmps: -15,
        powerFactor: 0.9,
      });
      expect(errors.some((e) => e.field === "currentAmps")).toBe(true);
    });

    it("Rejects negative power value in solve_current mode", () => {
      const errors = validateThreePhaseInputs({
        mode: "solve_current",
        voltage: 480,
        voltageReference: "line_to_line",
        powerValue: -5,
        powerUnit: "kW",
        powerFactor: 0.85,
      });
      expect(errors.some((e) => e.field === "powerValue")).toBe(true);
    });

    it("Gracefully handles invalid inputs in calculateThreePhasePower without throwing", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 0,
        voltageReference: "line_to_line",
        currentAmps: 10,
        powerFactor: 0.85,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.realPowerWatts).toBe(0);
    });
  });

  describe("5. Engineering Advisories & Edge Cases", () => {
    it("Issues advisory for low power factor (< 0.70)", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 480,
        voltageReference: "line_to_line",
        currentAmps: 50,
        powerFactor: 0.65,
      });
      expect(result.isValid).toBe(true);
      expect(result.warnings.some((w) => w.includes("power factor") || w.includes("penalty"))).toBe(true);
    });

    it("Issues advisory for medium/high voltage (> 600V)", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 4160,
        voltageReference: "line_to_line",
        currentAmps: 20,
        powerFactor: 0.9,
      });
      expect(result.isValid).toBe(true);
      expect(result.warnings.some((w) => w.includes("medium or high voltage"))).toBe(true);
    });

    it("Issues advisory for very large currents (> 1000A)", () => {
      const result = calculateThreePhasePower({
        mode: "solve_power",
        voltage: 480,
        voltageReference: "line_to_line",
        currentAmps: 1200,
        powerFactor: 0.9,
      });
      expect(result.isValid).toBe(true);
      expect(result.warnings.some((w) => w.includes("service entrance") || w.includes("1,200"))).toBe(true);
    });

    it("Format helper formats decimals correctly with US formatting", () => {
      expect(formatDecimal(12470.766, 2)).toBe("12,470.77");
      expect(formatDecimal(7.2051, 3)).toBe("7.205");
      expect(formatDecimal(NaN)).toBe("0");
    });
  });
});
