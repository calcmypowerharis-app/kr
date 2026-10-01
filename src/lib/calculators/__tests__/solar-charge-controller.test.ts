import { describe, expect, it } from "vitest";
import {
  calculateSolarChargeController,
  validateSolarChargeControllerInputs,
  SOLAR_CHARGE_CONTROLLER_DEFAULTS,
  SOLAR_ARRAY_PRESETS,
  STANDARD_CONTROLLER_SIZES,
  formatAmps,
  formatVolts,
  formatWatts,
} from "../solar-charge-controller";

describe("Solar Charge Controller Calculator Engine", () => {
  describe("Approved Benchmark Sizing Scenarios", () => {
    it("Scenario 1: 100W portable array, 12V battery, MPPT, 20% planning buffer", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 100,
        systemVoltage: 12,
        controllerType: "mppt",
        enableBuffer: true,
        bufferPercent: 20,
        enableVoltageCheck: false,
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalCurrentAmps).toBeCloseTo(8.3333, 2);
      expect(result.formattedNominalCurrent).toBe("8.3 A");
      expect(result.planningCurrentAmps).toBeCloseTo(10.0, 2);
      expect(result.formattedPlanningCurrent).toBe("10.0 A");
      expect(result.recommendedControllerRatingAmps).toBe(10);
      expect(result.voltageStatus).toBe("not_calculated");
    });

    it("Scenario 2: 400W RV array, 12V battery, MPPT, 20% planning buffer", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 400,
        systemVoltage: 12,
        controllerType: "mppt",
        enableBuffer: true,
        bufferPercent: 20,
        enableVoltageCheck: false,
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalCurrentAmps).toBeCloseTo(33.3333, 2);
      expect(result.formattedNominalCurrent).toBe("33.3 A");
      expect(result.planningCurrentAmps).toBeCloseTo(40.0, 2);
      expect(result.formattedPlanningCurrent).toBe("40.0 A");
      expect(result.recommendedControllerRatingAmps).toBe(40);
    });

    it("Scenario 3: 800W cabin array, 24V battery, MPPT, 20% planning buffer", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 800,
        systemVoltage: 24,
        controllerType: "mppt",
        enableBuffer: true,
        bufferPercent: 20,
        enableVoltageCheck: false,
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalCurrentAmps).toBeCloseTo(33.3333, 2);
      expect(result.formattedNominalCurrent).toBe("33.3 A");
      expect(result.planningCurrentAmps).toBeCloseTo(40.0, 2);
      expect(result.formattedPlanningCurrent).toBe("40.0 A");
      expect(result.recommendedControllerRatingAmps).toBe(40);
    });

    it("Scenario 4: 2400W residential array, 48V battery, MPPT, 20% planning buffer", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 2400,
        systemVoltage: 48,
        controllerType: "mppt",
        enableBuffer: true,
        bufferPercent: 20,
        enableVoltageCheck: false,
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalCurrentAmps).toBeCloseTo(50.0, 2);
      expect(result.formattedNominalCurrent).toBe("50.0 A");
      expect(result.planningCurrentAmps).toBeCloseTo(60.0, 2);
      expect(result.formattedPlanningCurrent).toBe("60.0 A");
      expect(result.recommendedControllerRatingAmps).toBe(60);
    });

    it("Scenario 5: Cold Voc calculation at -20°C with negative temp coeff (-0.28%/°C)", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 800,
        systemVoltage: 24,
        controllerType: "mppt",
        enableBuffer: true,
        bufferPercent: 20,
        enableVoltageCheck: true,
        vocStc: 111.6,
        minTemp: -20,
        tempUnit: "c",
        tempCoeffPercent: -0.28,
        controllerMaxVoc: 150,
      });

      expect(result.isValid).toBe(true);
      expect(result.isVoltageCheckEnabled).toBe(true);
      // Delta T = -20 - 25 = -45 C
      // Factor = 1 + (-0.28 / 100 * -45) = 1 + 0.126 = 1.126
      // Cold Voc = 111.6 * 1.126 = 125.6616 V
      expect(result.coldVocVolts).toBeCloseTo(125.6616, 2);
      expect(result.formattedColdVoc).toBe("125.7 V");
      // Headroom = 150 - 125.6616 = 24.3384 V
      expect(result.voltageHeadroomVolts).toBeCloseTo(24.3384, 2);
      expect(result.formattedVoltageHeadroom).toBe("24.3 V");
      expect(result.voltageStatus).toBe("within_limit");
    });
  });

  describe("Voltage Compatibility Check Variations", () => {
    it("handles temperature in Fahrenheit correctly (-4°F is -20°C)", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 800,
        systemVoltage: 24,
        controllerType: "mppt",
        enableBuffer: true,
        bufferPercent: 20,
        enableVoltageCheck: true,
        vocStc: 111.6,
        minTemp: -4, // -4°F = (-4 - 32) * 5/9 = -20°C
        tempUnit: "f",
        tempCoeffPercent: -0.28,
        controllerMaxVoc: 150,
      });

      expect(result.isValid).toBe(true);
      expect(result.minTempUsedC).toBeCloseTo(-20, 2);
      expect(result.coldVocVolts).toBeCloseTo(125.6616, 2);
      expect(result.voltageStatus).toBe("within_limit");
    });

    it("flags exceeded voltage when cold Voc is higher than controller limit", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 800,
        systemVoltage: 24,
        controllerType: "mppt",
        enableBuffer: true,
        bufferPercent: 20,
        enableVoltageCheck: true,
        vocStc: 140.0,
        minTemp: -20,
        tempUnit: "c",
        tempCoeffPercent: -0.30,
        controllerMaxVoc: 150,
      });

      // Factor = 1 + (-0.003 * -45) = 1.135
      // Cold Voc = 140 * 1.135 = 158.9 V > 150 V
      expect(result.isValid).toBe(true);
      expect(result.coldVocVolts).toBeCloseTo(158.9, 1);
      expect(result.voltageStatus).toBe("exceeded");
      expect(result.voltageHeadroomVolts).toBeLessThan(0);
      expect(result.voltageMessage).toContain("exceeds the entered controller limit");
    });

    it("warns if user enters a positive temperature coefficient", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 400,
        systemVoltage: 12,
        controllerType: "mppt",
        enableBuffer: false,
        bufferPercent: 0,
        enableVoltageCheck: true,
        vocStc: 48,
        minTemp: 0,
        tempUnit: "c",
        tempCoeffPercent: 0.30, // positive coefficient
        controllerMaxVoc: 100,
      });

      expect(result.isValid).toBe(true);
      expect(result.warnings.some((w) => w.includes("Entered temperature coefficient is positive"))).toBe(true);
    });
  });

  describe("PWM Controller Mode", () => {
    it("sizes PWM based on array short-circuit current (Isc), not P/V", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 200,
        systemVoltage: 12,
        controllerType: "pwm",
        enableBuffer: true,
        bufferPercent: 20,
        arrayIsc: 11.5,
        enableVoltageCheck: false,
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalCurrentAmps).toBe(11.5);
      expect(result.planningCurrentAmps).toBeCloseTo(11.5 * 1.2, 2); // 13.8 A
      expect(result.recommendedControllerRatingAmps).toBe(15);
      expect(result.technologySummary).toContain("PWM direct-coupling estimate");
    });

    it("warns when PWM is selected for large arrays (>300W)", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 400,
        systemVoltage: 12,
        controllerType: "pwm",
        enableBuffer: true,
        bufferPercent: 20,
        arrayIsc: 20.0,
        enableVoltageCheck: false,
      });

      expect(result.isValid).toBe(true);
      expect(result.warnings.some((w) => w.includes("Arrays over 300 Watts typically benefit significantly from an MPPT"))).toBe(true);
    });
  });

  describe("Buffer Disabled Behavior", () => {
    it("returns nominal current as planning current when buffer is disabled", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 600,
        systemVoltage: 24,
        controllerType: "mppt",
        enableBuffer: false,
        bufferPercent: 20, // should be ignored when disabled
        enableVoltageCheck: false,
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalCurrentAmps).toBe(25.0);
      expect(result.planningCurrentAmps).toBe(25.0);
      expect(result.recommendedControllerRatingAmps).toBe(30);
    });
  });

  describe("High Current Warnings", () => {
    it("warns when planning current exceeds standard single controller sizes (e.g. >120A)", () => {
      const result = calculateSolarChargeController({
        arrayWatts: 6000,
        systemVoltage: 24,
        controllerType: "mppt",
        enableBuffer: true,
        bufferPercent: 20,
        enableVoltageCheck: false,
      });

      expect(result.isValid).toBe(true);
      // 6000 / 24 = 250A * 1.2 = 300A
      expect(result.planningCurrentAmps).toBe(300);
      expect(result.warnings.some((w) => w.includes("exceeds standard 100A-120A single-controller ratings"))).toBe(true);
    });
  });

  describe("Input Validation & Error Handling", () => {
    it("rejects non-positive array watts", () => {
      const errors = validateSolarChargeControllerInputs({
        ...SOLAR_CHARGE_CONTROLLER_DEFAULTS,
        arrayWatts: 0,
      });
      expect(errors).toContain("Solar array wattage must be a positive number greater than 0 Watts.");
    });

    it("rejects invalid system voltage", () => {
      const errors = validateSolarChargeControllerInputs({
        ...SOLAR_CHARGE_CONTROLLER_DEFAULTS,
        systemVoltage: 36 as any,
      });
      expect(errors).toContain("Battery nominal voltage must be 12V, 24V, or 48V DC.");
    });

    it("rejects PWM without positive array Isc", () => {
      const errors = validateSolarChargeControllerInputs({
        ...SOLAR_CHARGE_CONTROLLER_DEFAULTS,
        controllerType: "pwm",
        arrayIsc: 0,
      });
      expect(errors.some((e) => e.includes("Array short-circuit current (Isc) is required"))).toBe(true);
    });

    it("rejects out-of-range buffer percentage", () => {
      const errors = validateSolarChargeControllerInputs({
        ...SOLAR_CHARGE_CONTROLLER_DEFAULTS,
        enableBuffer: true,
        bufferPercent: 150,
      });
      expect(errors).toContain("Planning buffer percentage must be between 0% and 100%.");
    });

    it("rejects invalid Voc values when voltage check is enabled", () => {
      const errors = validateSolarChargeControllerInputs({
        ...SOLAR_CHARGE_CONTROLLER_DEFAULTS,
        enableVoltageCheck: true,
        vocStc: 0,
        controllerMaxVoc: 0,
      });
      expect(errors).toContain("Array open-circuit voltage (Voc at STC) must be greater than 0 Volts.");
      expect(errors).toContain("Controller maximum PV input voltage must be greater than 0 Volts.");
    });

    it("returns invalid result structure when inputs are invalid", () => {
      const result = calculateSolarChargeController({
        ...SOLAR_CHARGE_CONTROLLER_DEFAULTS,
        arrayWatts: -100,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.nominalCurrentAmps).toBe(0);
    });
  });

  describe("Presets and Formatters", () => {
    it("defines standard controller sizes in ascending order", () => {
      expect(STANDARD_CONTROLLER_SIZES).toEqual([10, 15, 20, 30, 40, 50, 60, 80, 100, 120]);
    });

    it("contains valid solar array presets", () => {
      expect(SOLAR_ARRAY_PRESETS.length).toBeGreaterThanOrEqual(4);
      for (const preset of SOLAR_ARRAY_PRESETS) {
        expect(preset.watts).toBeGreaterThan(0);
        expect([12, 24, 48]).toContain(preset.voltage);
      }
    });

    it("formats units cleanly", () => {
      expect(formatAmps(10.24)).toBe("10.2 A");
      expect(formatAmps(NaN)).toBe("0.0 A");
      expect(formatVolts(125.66)).toBe("125.7 V");
      expect(formatVolts(NaN)).toBe("0.0 V");
      expect(formatWatts(400)).toBe("400 W");
      expect(formatWatts(NaN)).toBe("0 W");
    });
  });
});
