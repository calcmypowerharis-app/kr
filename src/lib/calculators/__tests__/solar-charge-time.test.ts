import { describe, expect, it } from "vitest";
import {
  calculateSolarChargeTime,
  CHEMISTRY_PROFILES,
  COMMON_SOLAR_CHARGE_PRESETS,
  CONTROLLER_PROFILES,
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
      // AGM one-way charge energy efficiency 85% -> 600 / 0.85 ≈ 706 Wh
      expect(result.energyNeededWh).toBe(706);
      // PWM efficiency 65% -> 100W * 0.65 = 65W
      expect(result.effectiveSolarWatts).toBe(65);
      // Bulk voltage: 12 * 1.20 = 14.4V -> 65 / 14.4 ≈ 4.5A
      expect(result.effectiveChargingAmps).toBeCloseTo(4.5, 0);
      // Peak sun hours: 706 / 65 ≈ 10.86 hours
      expect(result.chargeTimePeakSunHours).toBeCloseTo(10.86, 1);
      // Days: 10.86 / 4.0 ≈ 2.71 days
      expect(result.chargeTimeDays).toBeCloseTo(2.72, 1);
      expect(result.absorptionNote).toContain("AGM batteries switch from bulk to constant-voltage absorption");
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

    it("calculates 48V 100Ah server rack bank with 1,200W solar and MPPT accurately", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 48,
        batteryCapacityAh: 100,
        initialSocPercent: 20,
        targetSocPercent: 100,
        chemistry: "lifepo4",
        solarWatts: 1200,
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);

      // Nominal: 48V * 100Ah = 4,800 Wh
      expect(result.nominalBatteryEnergyWh).toBe(4800);
      // Deficit: 4800 * 0.80 = 3,840 Wh
      expect(result.deficitEnergyWh).toBe(3840);
      // Net needed: 3840 / 0.98 ≈ 3,918 Wh
      expect(result.energyNeededWh).toBe(3918);
      // Effective watts: 1200 * 0.82 = 984W
      expect(result.effectiveSolarWatts).toBe(984);
      // Bulk voltage: 48 * 1.183 = 56.78V -> 984 / 56.78 ≈ 17.33A
      expect(result.effectiveChargingAmps).toBeCloseTo(17.3, 1);
      // C-rate: 17.33 / 100 = 0.173C
      expect(result.cRate).toBeCloseTo(0.173, 2);
      // PSH: 3918.4 / 984 ≈ 3.98 hrs
      expect(result.chargeTimePeakSunHours).toBeCloseTo(3.98, 1);
      // Days: 3.98 / 4.5 ≈ 0.88 days
      expect(result.chargeTimeDays).toBeCloseTo(0.88, 1);
      expect(result.cRateWarning).toBeUndefined();
    });

    it("calculates Flooded Lead-Acid battery bank with 80% one-way efficiency", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 200,
        initialSocPercent: 50,
        targetSocPercent: 100,
        chemistry: "lead_acid_flooded",
        solarWatts: 300,
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);

      // Nominal: 12 * 200 = 2,400 Wh
      expect(result.nominalBatteryEnergyWh).toBe(2400);
      // Deficit: 2,400 * 0.50 = 1,200 Wh
      expect(result.deficitEnergyWh).toBe(1200);
      // Energy needed: 1,200 / 0.80 = 1,500 Wh
      expect(result.energyNeededWh).toBe(1500);
      // Effective watts: 300 * 0.82 = 246W
      expect(result.effectiveSolarWatts).toBe(246);
      // PSH: 1500 / 246 ≈ 6.10 hrs
      expect(result.chargeTimePeakSunHours).toBeCloseTo(6.1, 1);
      expect(result.absorptionNote).toContain("Flooded batteries require an extended absorption soak");
    });
  });

  describe("2. Safety Advisories & C-Rate Triggers", () => {
    it("flags excessive charging current for lead-acid AGM batteries when C-rate exceeds 0.25C", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 50,
        initialSocPercent: 50,
        targetSocPercent: 100,
        chemistry: "lead_acid_agm",
        solarWatts: 600, // 600W into 50Ah AGM is very aggressive
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);
      // Effective watts = 600 * 0.82 = 492W
      // Charging current = 492 / 14.4 = 34.2A
      // C-rate = 34.2 / 50 = 0.684C > 0.25C limit
      expect(result.cRate).toBeGreaterThan(0.25);
      expect(result.cRateWarning).toBeDefined();
      expect(result.cRateWarning).toContain("exceeds the typical 0.25C industry guideline");
      expect(result.cRateWarning).toContain("verify your battery datasheet");
    });

    it("flags excessive charging current for Flooded lead-acid batteries when C-rate exceeds 0.20C", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 100,
        initialSocPercent: 50,
        targetSocPercent: 100,
        chemistry: "lead_acid_flooded",
        solarWatts: 500, // 500W * 0.82 = 410W -> 410 / 14.6V = 28.1A -> 0.28C > 0.20C
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);
      expect(result.cRate).toBeGreaterThan(0.2);
      expect(result.cRateWarning).toBeDefined();
      expect(result.cRateWarning).toContain("exceeds the typical 0.2C industry guideline");
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
      expect(result.cRateWarning).toContain("exceeds the typical 0.5C industry guideline");
    });
  });

  describe("3. Edge Cases & Boundary Handling", () => {
    it("returns zero deficit and zero charge time when initial SoC equals target SoC", () => {
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
      expect(result.deficitEnergyWh).toBe(0);
      expect(result.energyNeededWh).toBe(0);
      expect(result.chargeTimePeakSunHours).toBe(0);
      expect(result.chargeTimeDays).toBe(0);
      expect(result.cRateWarning).toBeUndefined();
    });

    it("returns zero deficit and zero charge time when initial SoC exceeds target SoC", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 100,
        initialSocPercent: 90,
        targetSocPercent: 50,
        chemistry: "lifepo4",
        solarWatts: 200,
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);
      expect(result.deficitEnergyWh).toBe(0);
      expect(result.energyNeededWh).toBe(0);
      expect(result.chargeTimePeakSunHours).toBe(0);
      expect(result.chargeTimeDays).toBe(0);
    });

    it("handles zero solar wattage safely without crashing or returning NaN", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 100,
        initialSocPercent: 20,
        targetSocPercent: 100,
        chemistry: "lifepo4",
        solarWatts: 0,
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);
      expect(result.effectiveSolarWatts).toBe(0);
      expect(result.effectiveChargingAmps).toBe(0);
      expect(result.cRate).toBe(0);
      expect(result.chargeTimePeakSunHours).toBe(0);
      expect(result.chargeTimeDays).toBe(0);
      expect(Number.isNaN(result.chargeTimePeakSunHours)).toBe(false);
    });

    it("handles zero battery capacity safely without crashing or returning NaN", () => {
      const input: SolarChargeTimeInput = {
        batteryVoltage: 12,
        batteryCapacityAh: 0,
        initialSocPercent: 20,
        targetSocPercent: 100,
        chemistry: "lifepo4",
        solarWatts: 200,
        controllerType: "mppt",
        peakSunHoursPerDay: 4.5,
      };

      const result = calculateSolarChargeTime(input);
      expect(result.nominalBatteryEnergyWh).toBe(0);
      expect(result.deficitEnergyWh).toBe(0);
      expect(result.energyNeededWh).toBe(0);
      expect(result.chargeTimePeakSunHours).toBe(0);
      expect(result.chargeTimeDays).toBe(0);
      expect(Number.isNaN(result.chargeTimePeakSunHours)).toBe(false);
    });

    it("verifies all common presets evaluate with valid numbers", () => {
      for (const preset of COMMON_SOLAR_CHARGE_PRESETS) {
        const result = calculateSolarChargeTime(preset.input);
        expect(result.nominalBatteryEnergyWh).toBeGreaterThan(0);
        expect(result.effectiveSolarWatts).toBeGreaterThan(0);
        expect(result.chargeTimePeakSunHours).toBeGreaterThan(0);
        expect(result.chargeTimeDays).toBeGreaterThan(0);
        expect(result.assumptions.length).toBeGreaterThanOrEqual(4);
      }
    });

    it("verifies controller and chemistry profile definitions", () => {
      expect(CONTROLLER_PROFILES.mppt.systemEfficiency).toBe(0.82);
      expect(CONTROLLER_PROFILES.pwm.systemEfficiency).toBe(0.65);
      expect(CHEMISTRY_PROFILES.lifepo4.efficiency).toBe(0.98);
      expect(CHEMISTRY_PROFILES.lead_acid_agm.efficiency).toBe(0.85);
      expect(CHEMISTRY_PROFILES.lead_acid_flooded.efficiency).toBe(0.80);
    });
  });
});
