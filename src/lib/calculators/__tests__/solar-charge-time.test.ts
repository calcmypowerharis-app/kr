import { describe, expect, it } from "vitest";
import {
  calculateSolarChargeTime,
  COMMON_SOLAR_CHARGE_PRESETS,
  SolarChargeTimeInput,
} from "../solar-charge-time";

describe("Solar Battery Charging Time Engine", () => {
  describe("1. Standard Benchmark Scenarios", () => {
    it("calculates 12V 100Ah LiFePO4 with 200W solar and MPPT accurately", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 100,
        initialSocPercent: 20,
        targetSocPercent: 100,
        chemistry: "lifepo4",
        solarWatts: 200,
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);

      // Nominal: 12V * 100Ah = 1200 Wh
      expect(result.nominalBatteryEnergyWh).toBe(1200);
      // Deficit: 1200 * (100 - 20)% = 960 Wh
      expect(result.deficitEnergyWh).toBe(960);
      // Energy needed: 960 / 0.98 ≈ 980 Wh
      expect(result.energyNeededWh).toBe(980);
      // Effective solar: 200W * 0.82 = 164W
      expect(result.effectiveSolarWatts).toBe(164);
      // Bulk charging voltage: 12V * 1.183 ≈ 14.2V -> 164 / 14.2 ≈ 11.55A
      expect(result.effectiveChargingAmps).toBeCloseTo(11.5, 0);
      // Peak sun hours: 980 / 164 ≈ 5.97 hours
      expect(result.chargeTimePeakSunHours).toBeCloseTo(5.98, 1);
      // Days: 5.98 / 4.5 ≈ 1.33 days
      expect(result.chargeTimeDays).toBeCloseTo(1.33, 1);
      expect(result.cRateWarning).toBeUndefined();
    });

    it("calculates 12V 100Ah AGM Lead-Acid with 100W solar and PWM accurately", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 100,
        initialSocPercent: 50,
        targetSocPercent: 100,
        chemistry: "lead_acid_agm",
        solarWatts: 100,
        controllerType: "pwm",
        peakSunHoursPerDay: 4.0,
      };

      const result = calculateSolarChargeTime(input);

      // Nominal: 1200 Wh, Deficit: 600 Wh
      expect(result.deficitEnergyWh).toBe(600);
      // AGM efficiency 85% -> 600 / 0.85 ≈ 706 Wh
      expect(result.energyNeededWh).toBe(706);
      // PWM efficiency 65% -> 100W * 0.65 = 65W
      expect(result.effectiveSolarWatts).toBe(65);
      // Bulk voltage: 12 * 1.20 = 14.4V -> 65 / 14.4 ≈ 4.5A
      expect(result.effectiveChargingAmps).toBeCloseTo(4.5, 0);
      // Peak sun hours: 706 / 65 ≈ 10.86 hours
      expect(result.chargeTimePeakSunHours).toBeCloseTo(10.86, 1);
      // Days: 10.86 / 4.0 ≈ 2.71 days
      expect(result.chargeTimeDays).toBeCloseTo(2.72, 1);
      expect(result.absorptionNote).toContain("AGM batteries switch from bulk to absorption");
    });

    it("calculates 24V 200Ah cabin bank with 800W solar and MPPT accurately", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 24,
        batteryCapacityAh: 200,
        initialSocPercent: 20,
        targetSocPercent: 100,
        chemistry: "lifepo4",
        solarWatts: 800,
        controllerType: "mppt",
        peakSunHoursPerDay: 5.0,
      };

      const result = calculateSolarChargeTime(input);

      // Nominal: 24V * 200Ah = 4800 Wh
      expect(result.nominalBatteryEnergyWh).toBe(4800);
      // Deficit: 4800 * 0.80 = 3840 Wh
      expect(result.deficitEnergyWh).toBe(3840);
      // Needed: 3840 / 0.98 ≈ 3918 Wh
      expect(result.energyNeededWh).toBe(3918);
      // Effective: 800W * 0.82 = 656W
      expect(result.effectiveSolarWatts).toBe(656);
      // PSH: 3918 / 656 ≈ 5.97 hours
      expect(result.chargeTimePeakSunHours).toBeCloseTo(5.97, 1);
      // Days: 5.97 / 5.0 ≈ 1.19 days
      expect(result.chargeTimeDays).toBeCloseTo(1.19, 1);
    });
  });

  describe("2. Safety Advisories & C-Rate Triggers", () => {
    it("flags excessive charging current for lead-acid batteries when C-rate exceeds 0.25C", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 50,
        initialSocPercent: 50,
        targetSocPercent: 100,
        chemistry: "lead_acid_agm",
        solarWatts: 600, // 600W into a 50Ah lead-acid battery is very high
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);
      // Effective watts = 600 * 0.82 = 492W
      // Charging current = 492 / 14.4 = 34.2A
      // C-rate = 34.2 / 50 = 0.68C > 0.25C limit
      expect(result.cRate).toBeGreaterThan(0.25);
      expect(result.cRateWarning).toBeDefined();
      expect(result.cRateWarning).toContain("exceeds the typical 0.25C recommended limit");
    });

    it("flags excessive charging current for LiFePO4 batteries when C-rate exceeds 0.5C", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 50,
        initialSocPercent: 20,
        targetSocPercent: 100,
        chemistry: "lifepo4",
        solarWatts: 600,
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);
      // 492W / 14.2V ≈ 34.6A -> 34.6 / 50 ≈ 0.69C > 0.5C
      expect(result.cRate).toBeGreaterThan(0.5);
      expect(result.cRateWarning).toBeDefined();
      expect(result.cRateWarning).toContain("exceeds the typical 0.5C recommended limit");
    });
  });

  describe("3. Edge Cases & Boundary Handling", () => {
    it("handles target state of charge equal to or less than initial state gracefully", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 100,
        initialSocPercent: 80,
        targetSocPercent: 80,
        chemistry: "lifepo4",
        solarWatts: 200,
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);
      // Engine clamps targetSoc to at least initialSoc + 1
      expect(result.deficitEnergyWh).toBeGreaterThanOrEqual(12);
      expect(result.chargeTimePeakSunHours).toBeGreaterThan(0);
    });

    it("verifies all common presets evaluate without errors", () => {
      for (const preset of COMMON_SOLAR_CHARGE_PRESETS) {
        const result = calculateSolarChargeTime(preset.input);
        expect(result.nominalBatteryEnergyWh).toBeGreaterThan(0);
        expect(result.effectiveSolarWatts).toBeGreaterThan(0);
        expect(result.chargeTimePeakSunHours).toBeGreaterThan(0);
        expect(result.chargeTimeDays).toBeGreaterThan(0);
        expect(result.assumptions.length).toBeGreaterThanOrEqual(4);
      }
    });
  });
});
