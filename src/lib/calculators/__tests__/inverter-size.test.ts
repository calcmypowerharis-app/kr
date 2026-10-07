import { describe, expect, it } from "vitest";
import {
  calculateInverterSize,
  getRecommendedCableGauge,
  getStandardFuseRating,
  getSuggestedInverterSize,
  INVERTER_PRESET_APPLIANCES,
  type SelectedInverterAppliance,
} from "../inverter-size";

describe("Inverter Size & DC Current Draw Calculator Engine", () => {
  describe("Commercial Inverter Bracket Rounding", () => {
    it("rounds up to standard commercial inverter sizes accurately", () => {
      expect(getSuggestedInverterSize(250)).toBe(300);
      expect(getSuggestedInverterSize(300)).toBe(300);
      expect(getSuggestedInverterSize(450)).toBe(500);
      expect(getSuggestedInverterSize(750)).toBe(800);
      expect(getSuggestedInverterSize(950)).toBe(1000);
      expect(getSuggestedInverterSize(1300)).toBe(1500);
      expect(getSuggestedInverterSize(1800)).toBe(2000);
      expect(getSuggestedInverterSize(2750)).toBe(3000);
      expect(getSuggestedInverterSize(4500)).toBe(5000);
      expect(getSuggestedInverterSize(11500)).toBe(12000);
    });
  });

  describe("Standard Fuse and Cable Gauge Mapping", () => {
    it("maps DC current to standard commercial fuse sizes", () => {
      expect(getStandardFuseRating(35)).toBe(40);
      expect(getStandardFuseRating(45)).toBe(50);
      expect(getStandardFuseRating(85)).toBe(100);
      expect(getStandardFuseRating(110)).toBe(125);
      expect(getStandardFuseRating(180)).toBe(200);
      expect(getStandardFuseRating(260)).toBe(300);
      expect(getStandardFuseRating(550)).toBe(600);
      expect(getStandardFuseRating(650)).toBe(650);
    });

    it("maps DC current to standard copper cable gauge", () => {
      expect(getRecommendedCableGauge(25)).toBe("8 AWG (Copper)");
      expect(getRecommendedCableGauge(55)).toBe("6 AWG (Copper)");
      expect(getRecommendedCableGauge(80)).toBe("4 AWG (Copper)");
      expect(getRecommendedCableGauge(110)).toBe("2 AWG (Copper)");
      expect(getRecommendedCableGauge(140)).toBe("1/0 AWG (Copper)");
      expect(getRecommendedCableGauge(180)).toBe("2/0 AWG (Copper)");
      expect(getRecommendedCableGauge(240)).toBe("4/0 AWG (Copper)");
      expect(getRecommendedCableGauge(320)).toBe("Parallel 2/0 AWG (or 300 kcmil)");
      expect(getRecommendedCableGauge(450)).toBe("Parallel 4/0 AWG (Dual Runs Required)");
    });
  });

  describe("Benchmark Sizing Scenarios", () => {
    it("Scenario 1: Small RV Off-Grid Setup (Laptop, TV, Starlink, CPAP on 12V)", () => {
      const appliances: SelectedInverterAppliance[] = [
        {
          id: "laptop_workstation",
          name: "Laptop & Dual Monitor",
          category: "electronics",
          quantity: 1,
          runningWatts: 120,
          startingWatts: 120,
        },
        {
          id: "smart_tv_soundbar",
          name: "55-inch LED TV",
          category: "electronics",
          quantity: 1,
          runningWatts: 110,
          startingWatts: 110,
        },
        {
          id: "starlink_satellite",
          name: "Starlink Terminal",
          category: "electronics",
          quantity: 1,
          runningWatts: 65,
          startingWatts: 100,
        },
        {
          id: "cpap_humidifier",
          name: "CPAP Machine",
          category: "medical",
          quantity: 1,
          runningWatts: 60,
          startingWatts: 60,
        },
      ];

      const result = calculateInverterSize({
        appliances,
        systemVoltage: 12,
        inverterEfficiency: 0.90,
        continuousHeadroom: 1.25,
        batteryChemistry: "lifepo4",
      });

      expect(result.isValid).toBe(true);
      // Total running: 120 + 110 + 65 + 60 = 355W
      expect(result.totalRunningWatts).toBe(355);
      // Largest surge delta: Starlink (100 - 65 = 35W)
      expect(result.largestSurgeDelta).toBe(35);
      expect(result.peakSurgeWatts).toBe(390);
      expect(result.surgeDriverName).toBe("Starlink Terminal");

      // Continuous headroom: 355 * 1.25 = 443.75 -> 444W
      expect(result.recommendedContinuousWatts).toBe(444);
      // Commercial bracket: 500W
      expect(result.suggestedInverterRatingWatts).toBe(500);
      expect(result.suggestedInverterSurgeRatingWatts).toBe(1000);

      // DC Current: 355 / (12 * 0.90) = 32.87 -> 32.9A
      expect(result.continuousDcCurrentAmps).toBe(32.9);
      // Rated DC Current: 500 / (12 * 0.90) = 46.3A
      expect(result.maxRatedDcCurrentAmps).toBe(46.3);

      // Fuse: 46.3 * 1.25 = 57.875A -> 60A standard fuse
      expect(result.recommendedFuseAmps).toBe(60);
      expect(result.recommendedCableGauge).toBe("6 AWG (Copper)");

      // LiFePO4 0.5C safe discharge: 32.87 / 0.5 = 65.7Ah -> rounded to 70Ah
      expect(result.recommendedMinBatteryCapacityAh).toBe(70);
      expect(result.voltageOptimizationNotice).toBeNull();
    });

    it("Scenario 2: Kitchen Loads with Refrigerator Motor Surge (12V vs 24V)", () => {
      const appliances: SelectedInverterAppliance[] = [
        {
          id: "refrigerator",
          name: "Residential Refrigerator",
          category: "kitchen",
          quantity: 1,
          runningWatts: 150,
          startingWatts: 1200,
        },
        {
          id: "microwave",
          name: "Microwave Oven",
          category: "kitchen",
          quantity: 1,
          runningWatts: 1100,
          startingWatts: 1300,
        },
        {
          id: "blender",
          name: "Blender",
          category: "kitchen",
          quantity: 1,
          runningWatts: 400,
          startingWatts: 850,
        },
      ];

      // Test 12V first
      const result12V = calculateInverterSize({
        appliances,
        systemVoltage: 12,
        inverterEfficiency: 0.90,
        continuousHeadroom: 1.25,
        batteryChemistry: "lifepo4",
      });

      expect(result12V.isValid).toBe(true);
      // Running: 150 + 1100 + 400 = 1650W
      expect(result12V.totalRunningWatts).toBe(1650);

      // Surge deltas:
      // Refrigerator: 1200 - 150 = 1050W
      // Microwave: 1300 - 1100 = 200W
      // Blender: 850 - 400 = 450W
      // Largest delta: Refrigerator 1050W
      expect(result12V.largestSurgeDelta).toBe(1050);
      expect(result12V.surgeDriverName).toBe("Residential Refrigerator");
      // Peak surge: 1650 + 1050 = 2700W
      expect(result12V.peakSurgeWatts).toBe(2700);

      // Recommended continuous: 1650 * 1.25 = 2062.5 -> 2063W
      expect(result12V.recommendedContinuousWatts).toBe(2063);
      // Recommended surge: max(2700, 2063 * 1.5 = 3094.5 -> 3095W) = 3095W
      expect(result12V.recommendedSurgeWatts).toBe(3095);

      // Inverter size: 2500W bracket handles 2063W continuous and up to 5000W surge
      expect(result12V.suggestedInverterRatingWatts).toBe(2500);

      // 12V High Current Alert triggered for >= 2000W
      expect(result12V.voltageOptimizationNotice).toContain("High Current Alert");

      // Continuous DC Amps on 12V: 1650 / (12 * 0.90) = 152.8A
      expect(result12V.continuousDcCurrentAmps).toBe(152.8);
      // Max rated DC Amps on 12V: 2500 / (12 * 0.90) = 231.5A
      expect(result12V.maxRatedDcCurrentAmps).toBe(231.5);
      expect(result12V.recommendedCableGauge).toBe("4/0 AWG (Copper)");
      expect(result12V.recommendedFuseAmps).toBe(300);

      // Now test the exact same load on 24V
      const result24V = calculateInverterSize({
        appliances,
        systemVoltage: 24,
        inverterEfficiency: 0.90,
        continuousHeadroom: 1.25,
        batteryChemistry: "lifepo4",
      });

      expect(result24V.isValid).toBe(true);
      // Continuous DC Amps cut in half: 1650 / (24 * 0.90) = 76.4A
      expect(result24V.continuousDcCurrentAmps).toBe(76.4);
      // Max rated DC Amps on 24V: 2500 / (24 * 0.90) = 115.7A
      expect(result24V.maxRatedDcCurrentAmps).toBe(115.7);
      // Cable drops from massive 4/0 AWG down to standard 2 AWG
      expect(result24V.recommendedCableGauge).toBe("2 AWG (Copper)");
      expect(result24V.recommendedFuseAmps).toBe(150);
      expect(result24V.voltageOptimizationNotice).toBeNull();
    });

    it("Scenario 3: Battery Chemistry C-rate Comparison (LiFePO4 vs Lead-Acid)", () => {
      const appliances: SelectedInverterAppliance[] = [
        {
          id: "sump_pump_half_hp",
          name: "Sump Pump",
          category: "pumps",
          quantity: 1,
          runningWatts: 800,
          startingWatts: 2100,
        },
      ];

      // LiFePO4: 0.5C safe continuous rate
      const resultLiFePO4 = calculateInverterSize({
        appliances,
        systemVoltage: 12,
        inverterEfficiency: 0.90,
        batteryChemistry: "lifepo4",
      });

      // Running DC Amps: 800 / (12 * 0.90) = 74.07 -> 74.1A
      // LiFePO4 min Ah: 74.07 / 0.5 = 148.1Ah -> rounded to 150Ah
      expect(resultLiFePO4.recommendedMinBatteryCapacityAh).toBe(150);

      // Lead-Acid: 0.2C safe continuous rate to prevent Peukert capacity drop
      const resultLeadAcid = calculateInverterSize({
        appliances,
        systemVoltage: 12,
        inverterEfficiency: 0.90,
        batteryChemistry: "lead_acid",
      });

      // Lead-Acid min Ah: 74.07 / 0.2 = 370.37Ah -> rounded to 380Ah
      expect(resultLeadAcid.recommendedMinBatteryCapacityAh).toBe(380);
    });

    it("Scenario 4: Heavy 48V Whole-Home System (Well Pump, AC, Workshop)", () => {
      const appliances: SelectedInverterAppliance[] = [
        {
          id: "well_pump_half_hp",
          name: "Well Pump",
          category: "pumps",
          quantity: 1,
          runningWatts: 1000,
          startingWatts: 3000,
        },
        {
          id: "window_ac_8k",
          name: "Window AC",
          category: "hvac",
          quantity: 1,
          runningWatts: 750,
          startingWatts: 2200,
        },
        {
          id: "circular_saw",
          name: "Circular Saw",
          category: "tools",
          quantity: 1,
          runningWatts: 1400,
          startingWatts: 2500,
        },
      ];

      const result = calculateInverterSize({
        appliances,
        systemVoltage: 48,
        inverterEfficiency: 0.92,
        continuousHeadroom: 1.25,
        batteryChemistry: "lifepo4",
      });

      expect(result.isValid).toBe(true);
      // Running: 1000 + 750 + 1400 = 3150W
      expect(result.totalRunningWatts).toBe(3150);
      // Surge deltas:
      // Well Pump: 3000 - 1000 = 2000W (largest)
      // Window AC: 2200 - 750 = 1450W
      // Saw: 2500 - 1400 = 1100W
      expect(result.largestSurgeDelta).toBe(2000);
      expect(result.surgeDriverName).toBe("Well Pump");
      expect(result.peakSurgeWatts).toBe(5150);

      // Continuous headroom: 3150 * 1.25 = 3937.5 -> 3938W
      expect(result.recommendedContinuousWatts).toBe(3938);
      // Suggested commercial inverter bracket: 4000W
      expect(result.suggestedInverterRatingWatts).toBe(4000);

      // DC Amps at 48V: 3150 / (48 * 0.92) = 71.3A
      expect(result.continuousDcCurrentAmps).toBe(71.3);
      // Max rated DC current: 4000 / (48 * 0.92) = 90.6A
      expect(result.maxRatedDcCurrentAmps).toBe(90.6);
      expect(result.recommendedCableGauge).toBe("2 AWG (Copper)");
      expect(result.recommendedFuseAmps).toBe(125);
    });
  });

  describe("Validation and Edge Cases", () => {
    it("handles zero appliances gracefully", () => {
      const result = calculateInverterSize({
        appliances: [],
        systemVoltage: 12,
      });

      expect(result.isValid).toBe(true);
      expect(result.totalRunningWatts).toBe(0);
      expect(result.peakSurgeWatts).toBe(0);
      expect(result.continuousDcCurrentAmps).toBe(0);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it("rejects invalid system voltage", () => {
      const result = calculateInverterSize({
        appliances: [],
        systemVoltage: 36 as any,
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("System voltage must be 12V, 24V, or 48V DC.");
    });

    it("rejects out-of-range inverter efficiency", () => {
      const resultLow = calculateInverterSize({
        appliances: [],
        systemVoltage: 12,
        inverterEfficiency: 0.40,
      });
      expect(resultLow.isValid).toBe(false);

      const resultHigh = calculateInverterSize({
        appliances: [],
        systemVoltage: 12,
        inverterEfficiency: 1.10,
      });
      expect(resultHigh.isValid).toBe(false);
    });

    it("rejects negative appliance wattage values", () => {
      const result = calculateInverterSize({
        appliances: [
          {
            id: "bad_item",
            name: "Bad Item",
            category: "kitchen",
            quantity: 1,
            runningWatts: -100,
            startingWatts: 200,
          },
        ],
        systemVoltage: 12,
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("ignores appliances with zero or negative quantity", () => {
      const result = calculateInverterSize({
        appliances: [
          {
            id: "inactive_item",
            name: "Inactive Item",
            category: "kitchen",
            quantity: 0,
            runningWatts: 500,
            startingWatts: 1000,
          },
        ],
        systemVoltage: 12,
      });

      expect(result.isValid).toBe(true);
      expect(result.totalRunningWatts).toBe(0);
    });
  });

  describe("Preset Appliance Registry Integrity", () => {
    it("contains at least 10 realistic US preset appliances", () => {
      expect(INVERTER_PRESET_APPLIANCES.length).toBeGreaterThanOrEqual(10);
    });

    it("ensures every preset appliance has positive running wattage and valid surge values", () => {
      for (const preset of INVERTER_PRESET_APPLIANCES) {
        expect(preset.defaultRunningWatts).toBeGreaterThan(0);
        expect(preset.defaultStartingWatts).toBeGreaterThanOrEqual(preset.defaultRunningWatts);
        expect(preset.id).toBeTruthy();
        expect(preset.name).toBeTruthy();
      }
    });
  });
});
