import { describe, it, expect } from "vitest";
import {
  calculateGeneratorSize,
  getEssentialOutagePreset,
  SelectedAppliance,
} from "../generator-size";

describe("Generator Size Calculator Engine", () => {
  // Case A: High running requirement, zero startup surge
  it("Case A: calculates running-dominated scenario where startup surge is 0W", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "space_heater_1",
        name: "Portable Electric Space Heater",
        category: "hvac",
        quantity: 3,
        runningWatts: 1500,
        startingWatts: 1500,
      },
    ];

    const result = calculateGeneratorSize({ appliances });

    expect(result.totalRunningWatts).toBe(4500);
    expect(result.largestAdditionalStartingWatts).toBe(0);
    expect(result.peakStartingDemand).toBe(4500);
    expect(result.planningCapacityWatts).toBe(5625);
    expect(result.planningKw).toBe(5.625);
    expect(result.planningKva).toBeCloseTo(7.03125, 4);
    expect(result.isValid).toBe(true);
  });

  // Case B: Startup dominates relative to running
  it("Case B: calculates startup-dominated scenario with large single motor surge", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "well_pump_1hp",
        name: "Submersible Well Pump (1 HP)",
        category: "water_pumps",
        quantity: 1,
        runningWatts: 2000,
        startingWatts: 4500,
      },
    ];

    const result = calculateGeneratorSize({ appliances });

    expect(result.totalRunningWatts).toBe(2000);
    expect(result.largestAdditionalStartingWatts).toBe(2500);
    expect(result.surgeDriverName).toBe("Submersible Well Pump (1 HP)");
    expect(result.peakStartingDemand).toBe(4500);
    expect(result.planningCapacityWatts).toBe(5625);
    expect(result.planningKw).toBe(5.625);
    expect(result.planningKva).toBeCloseTo(7.03125, 4);
  });

  // Case C: High continuous running with modest motor surge
  it("Case C: verifies decimal precision and headroom with high continuous running and small surge", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "microwave",
        name: "Microwave Oven",
        category: "kitchen",
        quantity: 1,
        runningWatts: 1200,
        startingWatts: 1500,
      },
      {
        id: "coffee_maker",
        name: "Electric Coffee Maker",
        category: "kitchen",
        quantity: 1,
        runningWatts: 1000,
        startingWatts: 1000,
      },
      {
        id: "toaster",
        name: "Toaster",
        category: "kitchen",
        quantity: 1,
        runningWatts: 850,
        startingWatts: 850,
      },
    ];

    const result = calculateGeneratorSize({ appliances });

    expect(result.totalRunningWatts).toBe(3050);
    expect(result.largestAdditionalStartingWatts).toBe(300);
    expect(result.surgeDriverName).toBe("Microwave Oven");
    expect(result.peakStartingDemand).toBe(3350);
    expect(result.planningCapacityWatts).toBe(4187.5);
    expect(result.planningKw).toBe(4.1875);
    expect(result.planningKva).toBeCloseTo(5.234375, 4);
  });

  // Case D: Multiple motor loads under single-largest-startup assumption
  it("Case D: adds only the largest additional surge delta instead of naive summation", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "fridge",
        name: "Refrigerator",
        category: "kitchen",
        quantity: 1,
        runningWatts: 180,
        startingWatts: 1200, // Delta = 1020W
      },
      {
        id: "furnace_blower",
        name: "Furnace Fan Blower",
        category: "hvac",
        quantity: 1,
        runningWatts: 800,
        startingWatts: 2300, // Delta = 1500W (Largest)
      },
      {
        id: "sump_pump",
        name: "Sump Pump",
        category: "water_pumps",
        quantity: 1,
        runningWatts: 800,
        startingWatts: 1800, // Delta = 1000W
      },
    ];

    const result = calculateGeneratorSize({ appliances });

    // Running: 180 + 800 + 800 = 1780W
    expect(result.totalRunningWatts).toBe(1780);
    // Largest delta: max(1020, 1500, 1000) = 1500W
    expect(result.largestAdditionalStartingWatts).toBe(1500);
    expect(result.surgeDriverName).toBe("Furnace Fan Blower");
    // Peak demand: 1780 + 1500 = 3280W (NOT naive 1200 + 2300 + 1800 = 5300W)
    expect(result.peakStartingDemand).toBe(3280);
    // Planning capacity: 3280 × 1.25 = 4100W
    expect(result.planningCapacityWatts).toBe(4100);
    expect(result.planningKw).toBe(4.1);
    expect(result.planningKva).toBeCloseTo(5.125, 4);
  });

  // Case E: Pure resistive loads, no motor surge
  it("Case E: handles pure resistive loads with zero startup delta", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "led_lights",
        name: "LED Home Lighting",
        category: "electronics",
        quantity: 10,
        runningWatts: 10,
        startingWatts: 10,
      },
      {
        id: "space_heater",
        name: "Portable Electric Space Heater",
        category: "hvac",
        quantity: 1,
        runningWatts: 1500,
        startingWatts: 1500,
      },
      {
        id: "wifi_router",
        name: "Wi-Fi Router",
        category: "electronics",
        quantity: 1,
        runningWatts: 25,
        startingWatts: 25,
      },
    ];

    const result = calculateGeneratorSize({ appliances });

    expect(result.totalRunningWatts).toBe(1625);
    expect(result.largestAdditionalStartingWatts).toBe(0);
    expect(result.surgeDriverName).toBeNull();
    expect(result.peakStartingDemand).toBe(1625);
    expect(result.planningCapacityWatts).toBe(2031.25);
    expect(result.planningKw).toBe(2.03125);
  });

  // Case F: All zero (empty load list or 0 quantities)
  it("Case F: handles empty or zero-quantity load list gracefully without NaN", () => {
    const resultEmpty = calculateGeneratorSize({ appliances: [] });

    expect(resultEmpty.totalRunningWatts).toBe(0);
    expect(resultEmpty.largestAdditionalStartingWatts).toBe(0);
    expect(resultEmpty.peakStartingDemand).toBe(0);
    expect(resultEmpty.planningCapacityWatts).toBe(0);
    expect(resultEmpty.planningKw).toBe(0);
    expect(resultEmpty.planningKva).toBe(0);
    expect(resultEmpty.isValid).toBe(true);

    const resultZeroQty = calculateGeneratorSize({
      appliances: [
        {
          id: "fridge",
          name: "Refrigerator",
          category: "kitchen",
          quantity: 0,
          runningWatts: 180,
          startingWatts: 1200,
        },
      ],
    });

    expect(resultZeroQty.totalRunningWatts).toBe(0);
    expect(resultZeroQty.largestAdditionalStartingWatts).toBe(0);
    expect(resultZeroQty.peakStartingDemand).toBe(0);
    expect(resultZeroQty.planningCapacityWatts).toBe(0);
  });

  // Case G: Custom user appliance
  it("Case G: seamlessly calculates custom user appliance loads", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "custom_air_fryer",
        name: "Portable Air Fryer",
        category: "other",
        quantity: 1,
        runningWatts: 1750,
        startingWatts: 1750,
        isCustom: true,
      },
    ];

    const result = calculateGeneratorSize({ appliances });

    expect(result.totalRunningWatts).toBe(1750);
    expect(result.largestAdditionalStartingWatts).toBe(0);
    expect(result.peakStartingDemand).toBe(1750);
    expect(result.planningCapacityWatts).toBe(2187.5);
  });

  // Case H: Very large whole-house load
  it("Case H: validates large residential whole-house standby capacity and kVA breakdown", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "central_ac",
        name: "Central Air Conditioner (3-Ton)",
        category: "hvac",
        quantity: 1,
        runningWatts: 3500,
        startingWatts: 10000, // Delta = 6500W (Largest)
      },
      {
        id: "well_pump",
        name: "Submersible Well Pump (1 HP)",
        category: "water_pumps",
        quantity: 1,
        runningWatts: 2000,
        startingWatts: 4500, // Delta = 2500W
      },
      {
        id: "water_heater",
        name: "Electric Water Heater",
        category: "water_pumps",
        quantity: 1,
        runningWatts: 4500,
        startingWatts: 4500, // Delta = 0W
      },
      {
        id: "fridge",
        name: "Refrigerator",
        category: "kitchen",
        quantity: 1,
        runningWatts: 200,
        startingWatts: 1200, // Delta = 1000W
      },
    ];

    const result = calculateGeneratorSize({ appliances, powerFactor: 0.8 });

    // Running: 3500 + 2000 + 4500 + 200 = 10,200W (10.2 kW)
    expect(result.totalRunningWatts).toBe(10200);
    // Largest delta: Central AC = 6,500W
    expect(result.largestAdditionalStartingWatts).toBe(6500);
    expect(result.surgeDriverName).toBe("Central Air Conditioner (3-Ton)");
    // Peak: 10,200 + 6,500 = 16,700W (16.7 kW)
    expect(result.peakStartingDemand).toBe(16700);
    // Planning: 16,700 × 1.25 = 20,875W (20.875 kW)
    expect(result.planningCapacityWatts).toBe(20875);
    expect(result.planningKw).toBe(20.875);

    // kVA Verification: kVA = kW / 0.8
    // Running kVA: 10.2 / 0.8 = 12.75 kVA
    expect(result.runningKva).toBeCloseTo(12.75, 4);
    // Peak kVA: 16.7 / 0.8 = 20.875 kVA
    expect(result.peakKva).toBeCloseTo(20.875, 4);
    // Planning kVA: 20.875 / 0.8 = 26.09375 kVA
    expect(result.planningKva).toBeCloseTo(26.09375, 4);
  });

  // Additional Engineering Verification: Quantity Scaling
  it("scales running watts by quantity while retaining single-largest-startup event model", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "sump_pump",
        name: "Sump Pump (1/3 HP)",
        category: "water_pumps",
        quantity: 2, // 2 identical motor loads
        runningWatts: 800,
        startingWatts: 1800,
      },
    ];

    const result = calculateGeneratorSize({ appliances });

    // Running watts scale by quantity: 2 × 800 = 1600W
    expect(result.totalRunningWatts).toBe(1600);
    // Single largest startup event: 1800 - 800 = 1000W
    expect(result.largestAdditionalStartingWatts).toBe(1000);
    // Peak starting demand: 1600 + 1000 = 2600W
    expect(result.peakStartingDemand).toBe(2600);
    // Planning capacity: 2600 × 1.25 = 3250W
    expect(result.planningCapacityWatts).toBe(3250);
  });

  // Input Sanitization & Non-Silent Errors
  it("flags negative or invalid numbers with non-silent errors", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "bad_load",
        name: "Defective Load",
        category: "other",
        quantity: -2,
        runningWatts: -500,
        startingWatts: -1000,
      },
    ];

    const result = calculateGeneratorSize({ appliances });

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
    expect(result.totalRunningWatts).toBe(0);
  });

  // Power Factor Variations
  it("correctly applies unity power factor (PF = 1.0) for portable inverters", () => {
    const appliances: SelectedAppliance[] = [
      {
        id: "heater",
        name: "Space Heater",
        category: "hvac",
        quantity: 1,
        runningWatts: 2000,
        startingWatts: 2000,
      },
    ];

    const result = calculateGeneratorSize({ appliances, powerFactor: 1.0 });

    expect(result.planningKw).toBe(2.5); // 2000 × 1.25 = 2500W = 2.5 kW
    expect(result.planningKva).toBe(2.5); // 2.5 kW / 1.0 = 2.5 kVA
  });

  // Preload Preset Verification
  it("essential outage preset preloads valid default configuration", () => {
    const defaultLoads = getEssentialOutagePreset();
    expect(defaultLoads.length).toBe(5);

    const result = calculateGeneratorSize({ appliances: defaultLoads });
    expect(result.isValid).toBe(true);
    expect(result.totalRunningWatts).toBeGreaterThan(1000);
    expect(result.planningCapacityWatts).toBeGreaterThan(2000);
  });
});
