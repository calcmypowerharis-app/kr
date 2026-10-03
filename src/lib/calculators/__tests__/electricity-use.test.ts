import { describe, it, expect } from "vitest";
import {
  calculateApplianceEnergy,
  calculateTotalElectricityUse,
  calculateElectricityCost,
  PRESET_APPLIANCE_LIBRARY,
  CALCULATOR_PRESETS,
} from "../electricity-use";

describe("Electricity Use Calculation Engine", () => {
  describe("Benchmark Worked Examples (Section 12)", () => {
    it("Example A: 100W appliance running 8 hours/day (qty 1)", () => {
      const result = calculateApplianceEnergy({
        id: "ex_a",
        name: "Standard 100W Device",
        watts: 100,
        hoursPerDay: 8,
        quantity: 1,
        daysPerMonth: 30,
      });

      expect(result.dailyWh).toBe(800);
      expect(result.dailyKwh).toBe(0.8);
      expect(result.monthlyKwh).toBe(24);
    });

    it("Example B: 1,500W space heater running 4 hours/day (qty 1)", () => {
      const result = calculateApplianceEnergy({
        id: "ex_b",
        name: "Space Heater",
        watts: 1500,
        hoursPerDay: 4,
        quantity: 1,
        daysPerMonth: 30,
      });

      expect(result.dailyWh).toBe(6000);
      expect(result.dailyKwh).toBe(6.0);
      expect(result.monthlyKwh).toBe(180);
    });

    it("Example C: 100W television running 5 hours/day (qty 1)", () => {
      const result = calculateApplianceEnergy({
        id: "ex_c",
        name: "Television",
        watts: 100,
        hoursPerDay: 5,
        quantity: 1,
        daysPerMonth: 30,
      });

      expect(result.dailyWh).toBe(500);
      expect(result.dailyKwh).toBe(0.5);
      expect(result.monthlyKwh).toBe(15);
    });

    it("Example D: Two identical 100W devices running 4 hours/day (qty 2)", () => {
      const result = calculateApplianceEnergy({
        id: "ex_d",
        name: "Dual Monitors",
        watts: 100,
        hoursPerDay: 4,
        quantity: 2,
        daysPerMonth: 30,
      });

      // 100W × 4h × 2 units = 800 Wh/day = 0.8 kWh/day
      expect(result.dailyWh).toBe(800);
      expect(result.dailyKwh).toBe(0.8);
      expect(result.monthlyKwh).toBe(24);
    });

    it("Example E: Cost calculation at $0.16/kWh illustrative rate", () => {
      const cost = calculateElectricityCost(15, 0.16);
      expect(cost).toBe(2.4);

      // Verify integrated cost calculation on single appliance
      const result = calculateApplianceEnergy(
        {
          id: "ex_e",
          name: "TV",
          watts: 100,
          hoursPerDay: 5,
          quantity: 1,
          daysPerMonth: 30,
        },
        30,
        0.16
      );
      expect(result.monthlyKwh).toBe(15);
      expect(result.estimatedCostMonthly).toBe(2.4);
    });
  });

  describe("Duty Cycle & Cycling Loads (Section 10)", () => {
    it("calculates cycling refrigerator (150W at 35% duty cycle over 24 hours)", () => {
      const result = calculateApplianceEnergy({
        id: "fridge",
        name: "Refrigerator",
        watts: 150,
        hoursPerDay: 24,
        dutyCycle: 0.35,
        quantity: 1,
        daysPerMonth: 30,
      });

      // Effective power = 150 × 0.35 = 52.5 W
      // Daily Wh = 52.5 × 24 = 1,260 Wh = 1.26 kWh/day
      // Monthly kWh = 1.26 × 30 = 37.8 kWh/month
      expect(result.effectiveWatts).toBe(52.5);
      expect(result.dailyWh).toBe(1260);
      expect(result.dailyKwh).toBe(1.26);
      expect(result.monthlyKwh).toBe(37.8);
    });

    it("clamps duty cycle between 0.01 and 1.0", () => {
      const overClamped = calculateApplianceEnergy({
        id: "test",
        name: "Test",
        watts: 100,
        hoursPerDay: 10,
        dutyCycle: 1.5,
      });
      expect(overClamped.dutyCycle).toBe(1.0);

      const underClamped = calculateApplianceEnergy({
        id: "test",
        name: "Test",
        watts: 100,
        hoursPerDay: 10,
        dutyCycle: -0.2,
      });
      expect(underClamped.dutyCycle).toBe(1.0);
    });
  });

  describe("Multi-Appliance Aggregation & Proportions", () => {
    it("sums multiple appliances correctly and calculates percentages", () => {
      const input = {
        appliances: [
          { id: "1", name: "Refrigerator", watts: 150, hoursPerDay: 24, dutyCycle: 0.35 }, // 37.8 kWh/mo
          { id: "2", name: "TV", watts: 100, hoursPerDay: 5, dutyCycle: 1.0 }, // 15.0 kWh/mo
          { id: "3", name: "LEDs", watts: 60, hoursPerDay: 5, dutyCycle: 1.0 }, // 9.0 kWh/mo
        ],
        planningDays: 30,
        electricityRate: 0.16,
      };

      const result = calculateTotalElectricityUse(input);

      // Total daily: 1.26 + 0.5 + 0.3 = 2.06 kWh/day
      // Total monthly: 37.8 + 15.0 + 9.0 = 61.8 kWh/month
      // Total cost: 61.8 × 0.16 = $9.888 ≈ $9.89
      expect(result.totalDailyKwh).toBe(2.06);
      expect(result.totalMonthlyKwh).toBe(61.8);
      expect(result.totalEstimatedMonthlyCost).toBe(9.89);
      expect(result.applianceCount).toBe(3);
      expect(result.totalUnits).toBe(3);

      // Verify highest consumer
      expect(result.highestConsumer?.name).toBe("Refrigerator");

      // Verify percentage contributions sum to 100%
      const fridgePct = result.breakdown.find((b) => b.name === "Refrigerator")?.percentOfTotal;
      const tvPct = result.breakdown.find((b) => b.name === "TV")?.percentOfTotal;
      const ledPct = result.breakdown.find((b) => b.name === "LEDs")?.percentOfTotal;

      expect(fridgePct).toBe(61.2); // 37.8 / 61.8 = 61.165% -> 61.2%
      expect(tvPct).toBe(24.3); // 15 / 61.8 = 24.27% -> 24.3%
      expect(ledPct).toBe(14.6); // 9 / 61.8 = 14.56% -> 14.6%
      expect(Math.round((fridgePct! + tvPct! + ledPct!) * 10) / 10).toBe(100.1); // Rounding check
    });

    it("handles custom planning period (e.g., 15 days or 31 days)", () => {
      const input = {
        appliances: [
          { id: "1", name: "Space Heater", watts: 1500, hoursPerDay: 4 }, // 6 kWh/day
        ],
        planningDays: 15,
      };

      const result = calculateTotalElectricityUse(input);
      expect(result.totalDailyKwh).toBe(6.0);
      expect(result.totalMonthlyKwh).toBe(90.0); // 6 × 15 = 90 kWh
      expect(result.planningDays).toBe(15);
    });
  });

  describe("Edge Cases & Robust Validation", () => {
    it("handles empty appliance array without error", () => {
      const result = calculateTotalElectricityUse({ appliances: [] });
      expect(result.totalDailyWh).toBe(0);
      expect(result.totalDailyKwh).toBe(0);
      expect(result.totalMonthlyKwh).toBe(0);
      expect(result.applianceCount).toBe(0);
      expect(result.totalUnits).toBe(0);
      expect(result.breakdown).toEqual([]);
      expect(result.hasInvalidInputs).toBe(false);
    });

    it("handles fractional hours and low-wattage devices", () => {
      // 15-minute microwave (0.25 h) at 1,200W
      const result = calculateApplianceEnergy({
        id: "micro",
        name: "Microwave",
        watts: 1200,
        hoursPerDay: 0.25,
        quantity: 1,
      });
      expect(result.dailyWh).toBe(300);
      expect(result.dailyKwh).toBe(0.3);
      expect(result.monthlyKwh).toBe(9.0);
    });

    it("clamps daily hours to 24 maximum", () => {
      const result = calculateApplianceEnergy({
        id: "clamp_test",
        name: "Test",
        watts: 100,
        hoursPerDay: 35, // invalid > 24
      });
      expect(result.hoursPerDay).toBe(24);
      expect(result.dailyWh).toBe(2400);
    });

    it("handles negative watts gracefully by clamping to 0", () => {
      const result = calculateApplianceEnergy({
        id: "neg_test",
        name: "Negative Watts",
        watts: -500,
        hoursPerDay: 5,
      });
      expect(result.watts).toBe(0);
      expect(result.dailyWh).toBe(0);
    });

    it("handles cost calculation edge cases", () => {
      expect(calculateElectricityCost(0, 0.16)).toBe(0);
      expect(calculateElectricityCost(100, 0)).toBe(0);
      expect(calculateElectricityCost(-50, 0.16)).toBe(0);
      expect(calculateElectricityCost(NaN, 0.16)).toBe(0);
      expect(calculateElectricityCost(100, NaN)).toBe(0);
    });
  });

  describe("Presets Library Sanity", () => {
    it("ensures all library appliances have positive watts and hours <= 24", () => {
      for (const item of PRESET_APPLIANCE_LIBRARY) {
        expect(item.defaultWatts).toBeGreaterThan(0);
        expect(item.defaultHoursPerDay).toBeGreaterThan(0);
        expect(item.defaultHoursPerDay).toBeLessThanOrEqual(24);
        expect(item.defaultDutyCycle).toBeGreaterThan(0);
        expect(item.defaultDutyCycle).toBeLessThanOrEqual(1);
      }
    });

    it("ensures all pre-configured scenarios contain at least one appliance", () => {
      for (const preset of CALCULATOR_PRESETS) {
        expect(preset.appliances.length).toBeGreaterThan(0);
        const res = calculateTotalElectricityUse({ appliances: preset.appliances });
        expect(res.totalMonthlyKwh).toBeGreaterThan(0);
      }
    });
  });
});
