/**
 * Generator Wattage Chart & Appliance Power Reference Data
 * Pure TypeScript: Decoupled from React and DOM
 * CalcMyPower.com
 *
 * Grounded in DOE, NREL, UL 2201, and standard electrical nameplate data.
 */

export type ApplianceCategory =
  | "Kitchen & Refrigeration"
  | "Heating & Cooling"
  | "Pumps & Water"
  | "Tools & Workshop"
  | "Lighting & Essentials"
  | "Electronics & Medical";

export type SurgeType =
  | "Locked-Rotor Motor"
  | "Inverter / Soft-Start"
  | "Purely Resistive"
  | "Electronic Switch-Mode";

export interface WattageChartItem {
  id: string;
  name: string;
  category: ApplianceCategory;
  runningWatts: number;
  runningWattsRange: string;
  startingWatts: number;
  startingWattsRange: string;
  surgeDelta: number;
  surgeType: SurgeType;
  typicalVoltage: "120V" | "240V" | "120V / 240V";
  notes: string;
}

export const APPLIANCE_WATTAGE_DATA: WattageChartItem[] = [
  // 1. Kitchen & Refrigeration
  {
    id: "refrigerator-standard",
    name: "Standard Refrigerator / Freezer (18-22 cu ft)",
    category: "Kitchen & Refrigeration",
    runningWatts: 700,
    runningWattsRange: "400 to 800 W",
    startingWatts: 1500,
    startingWattsRange: "1,200 to 1,800 W",
    surgeDelta: 800,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Reciprocating compressor cycles every 20-30 min. Energy Star inverter models have much lower surge (900W).",
  },
  {
    id: "chest-freezer",
    name: "Chest Freezer (15 cu ft)",
    category: "Kitchen & Refrigeration",
    runningWatts: 500,
    runningWattsRange: "300 to 600 W",
    startingWatts: 1200,
    startingWattsRange: "1,000 to 1,500 W",
    surgeDelta: 700,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Heavy thermal insulation reduces run cycles. Compressor startup draws 2x to 2.5x running demand.",
  },
  {
    id: "microwave-oven",
    name: "Microwave Oven (1,000W Cooking Output)",
    category: "Kitchen & Refrigeration",
    runningWatts: 1500,
    runningWattsRange: "1,200 to 1,600 W",
    startingWatts: 1500,
    startingWattsRange: "1,200 to 1,600 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Electrical input is 1.4x to 1.6x the rated cooking wattage due to magnetron transformer losses. Zero motor surge.",
  },
  {
    id: "coffee-maker",
    name: "Drip Coffee Maker",
    category: "Kitchen & Refrigeration",
    runningWatts: 1200,
    runningWattsRange: "800 to 1,400 W",
    startingWatts: 1200,
    startingWattsRange: "800 to 1,400 W",
    surgeDelta: 0,
    surgeType: "Purely Resistive",
    typicalVoltage: "120V",
    notes: "Heating element draws steady resistive current while brewing, then drops to 60W for warming plate.",
  },
  {
    id: "electric-toaster",
    name: "Toaster (2-Slice to 4-Slice)",
    category: "Kitchen & Refrigeration",
    runningWatts: 1100,
    runningWattsRange: "850 to 1,500 W",
    startingWatts: 1100,
    startingWattsRange: "850 to 1,500 W",
    surgeDelta: 0,
    surgeType: "Purely Resistive",
    typicalVoltage: "120V",
    notes: "Pure nichrome heating wire. High current draw, but instantaneous startup with zero motor surge.",
  },
  {
    id: "dishwasher",
    name: "Dishwasher (Washing & Heated Dry)",
    category: "Kitchen & Refrigeration",
    runningWatts: 1500,
    runningWattsRange: "1,200 to 1,800 W",
    startingWatts: 2000,
    startingWattsRange: "1,800 to 2,400 W",
    surgeDelta: 500,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Internal booster heating element draws 1,200W; wash pump motor causes moderate initial starting surge.",
  },
  {
    id: "garbage-disposal",
    name: "Garbage Disposal (1/2 HP)",
    category: "Kitchen & Refrigeration",
    runningWatts: 600,
    runningWattsRange: "500 to 750 W",
    startingWatts: 1400,
    startingWattsRange: "1,200 to 1,800 W",
    surgeDelta: 800,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "High momentary startup torque to shred food waste. Operates for brief 15 to 30 second bursts.",
  },
  {
    id: "electric-range-burner",
    name: "Electric Range Stove Burner (Single 6-Inch)",
    category: "Kitchen & Refrigeration",
    runningWatts: 1500,
    runningWattsRange: "1,200 to 1,800 W",
    startingWatts: 1500,
    startingWattsRange: "1,200 to 1,800 W",
    surgeDelta: 0,
    surgeType: "Purely Resistive",
    typicalVoltage: "240V",
    notes: "A large 8-inch burner draws 2,400W. Entire range with oven can exceed 8,000W; best avoided on portable generators.",
  },

  // 2. Heating & Cooling
  {
    id: "central-ac-3ton",
    name: "Central Air Conditioner (3-Ton, 14 SEER)",
    category: "Heating & Cooling",
    runningWatts: 3500,
    runningWattsRange: "3,000 to 4,000 W",
    startingWatts: 9500,
    startingWattsRange: "8,000 to 11,000 W",
    surgeDelta: 6000,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "240V",
    notes: "Compressor motor draws massive locked rotor amps (LRA) at startup. Requires a 10kW+ generator or aftermarket soft starter.",
  },
  {
    id: "central-ac-3ton-softstart",
    name: "Central AC (3-Ton with Electronic Soft Starter)",
    category: "Heating & Cooling",
    runningWatts: 3500,
    runningWattsRange: "3,000 to 4,000 W",
    startingWatts: 5500,
    startingWattsRange: "4,800 to 6,200 W",
    surgeDelta: 2000,
    surgeType: "Inverter / Soft-Start",
    typicalVoltage: "240V",
    notes: "Microcontroller soft starter reduces inrush current by 60% to 70%, allowing a 7,500W generator to start the AC.",
  },
  {
    id: "window-ac-5k",
    name: "Window Air Conditioner (5,000 BTU)",
    category: "Heating & Cooling",
    runningWatts: 500,
    runningWattsRange: "400 to 650 W",
    startingWatts: 1200,
    startingWattsRange: "1,000 to 1,500 W",
    surgeDelta: 700,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Compact bedroom unit. Can run easily on small 2,000W portable inverter generators.",
  },
  {
    id: "window-ac-12k",
    name: "Window Air Conditioner (12,000 BTU)",
    category: "Heating & Cooling",
    runningWatts: 1200,
    runningWattsRange: "1,000 to 1,400 W",
    startingWatts: 2800,
    startingWattsRange: "2,400 to 3,500 W",
    surgeDelta: 1600,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Cools 500 sq ft. Startup surge requires at least a 3,500W to 4,000W generator.",
  },
  {
    id: "gas-furnace-blower",
    name: "Gas / Propane Furnace Blower Motor (1/2 HP)",
    category: "Heating & Cooling",
    runningWatts: 800,
    runningWattsRange: "600 to 1,000 W",
    startingWatts: 1900,
    startingWattsRange: "1,600 to 2,400 W",
    surgeDelta: 1100,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Gas burner draws under 50W; electrical demand comes from the blower fan pushing air through ductwork.",
  },
  {
    id: "oil-furnace-burner",
    name: "Oil Furnace (Burner & Blower Combined)",
    category: "Heating & Cooling",
    runningWatts: 1200,
    runningWattsRange: "900 to 1,500 W",
    startingWatts: 2400,
    startingWattsRange: "2,000 to 3,000 W",
    surgeDelta: 1200,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Oil pump, high-voltage ignition transformer, and forced draft blower create combined startup surge.",
  },
  {
    id: "space-heater-1500w",
    name: "Portable Electric Space Heater (High Setting)",
    category: "Heating & Cooling",
    runningWatts: 1500,
    runningWattsRange: "1,400 to 1,500 W",
    startingWatts: 1500,
    startingWattsRange: "1,400 to 1,500 W",
    surgeDelta: 0,
    surgeType: "Purely Resistive",
    typicalVoltage: "120V",
    notes: "Consumes max allowable 12.5A continuous draw on a 15A household circuit. Zero motor surge.",
  },
  {
    id: "water-heater-electric",
    name: "Electric Storage Water Heater (40-50 Gallon)",
    category: "Heating & Cooling",
    runningWatts: 4500,
    runningWattsRange: "4,000 to 5,500 W",
    startingWatts: 4500,
    startingWattsRange: "4,000 to 5,500 W",
    surgeDelta: 0,
    surgeType: "Purely Resistive",
    typicalVoltage: "240V",
    notes: "Upper and lower immersion heating elements draw 4,500W. Heavy resistive load that dominates generator capacity.",
  },
  {
    id: "portable-fan",
    name: "Box Fan / Oscillating Stand Fan",
    category: "Heating & Cooling",
    runningWatts: 75,
    runningWattsRange: "50 to 120 W",
    startingWatts: 150,
    startingWattsRange: "100 to 250 W",
    surgeDelta: 75,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Fractional-horsepower fan motor. Modest surge easily handled by any generator size.",
  },

  // 3. Pumps & Water
  {
    id: "well-pump-half-hp",
    name: "Deep Well Submersible Pump (1/2 HP)",
    category: "Pumps & Water",
    runningWatts: 1000,
    runningWattsRange: "850 to 1,200 W",
    startingWatts: 2500,
    startingWattsRange: "2,100 to 3,000 W",
    surgeDelta: 1500,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "240V",
    notes: "Overcomes water head pressure in deep cased wells. Requires 240V generator connection and 3x inrush headroom.",
  },
  {
    id: "well-pump-one-hp",
    name: "Deep Well Submersible Pump (1 HP)",
    category: "Pumps & Water",
    runningWatts: 1800,
    runningWattsRange: "1,500 to 2,200 W",
    startingWatts: 4500,
    startingWattsRange: "4,000 to 5,500 W",
    surgeDelta: 2700,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "240V",
    notes: "Installed in wells deeper than 250 feet. Starting surge requires minimum 6,500W to 7,500W generator.",
  },
  {
    id: "sump-pump-third-hp",
    name: "Basement Sump Pump (1/3 HP)",
    category: "Pumps & Water",
    runningWatts: 600,
    runningWattsRange: "500 to 800 W",
    startingWatts: 1400,
    startingWattsRange: "1,200 to 1,800 W",
    surgeDelta: 800,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Critical flood prevention load. Starting switch engages high capacitor inrush to spin impeller quickly.",
  },
  {
    id: "sump-pump-half-hp",
    name: "Basement Sump Pump (1/2 HP Heavy Duty)",
    category: "Pumps & Water",
    runningWatts: 900,
    runningWattsRange: "750 to 1,100 W",
    startingWatts: 2100,
    startingWattsRange: "1,800 to 2,500 W",
    surgeDelta: 1200,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Handles high vertical head lift. Recommend reserving 2,500W surge capacity on generator when running.",
  },
  {
    id: "sewage-ejector-pump",
    name: "Sewage Ejector Pump (1/2 HP Grinder)",
    category: "Pumps & Water",
    runningWatts: 1100,
    runningWattsRange: "900 to 1,300 W",
    startingWatts: 2600,
    startingWattsRange: "2,200 to 3,200 W",
    surgeDelta: 1500,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V / 240V",
    notes: "High starting torque required to pulverize solids before discharge into municipal or septic main.",
  },

  // 4. Tools & Workshop
  {
    id: "air-compressor-1.5hp",
    name: "Pancake / Hot-Dog Air Compressor (1.5 HP)",
    category: "Tools & Workshop",
    runningWatts: 1600,
    runningWattsRange: "1,400 to 1,800 W",
    startingWatts: 3500,
    startingWattsRange: "3,000 to 4,500 W",
    surgeDelta: 1900,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Extremely difficult motor start against head tank pressure. Many 3,500W generators struggle without unloader valve.",
  },
  {
    id: "circular-saw",
    name: "Circular Saw (7-1/4 Inch, 15 Amp)",
    category: "Tools & Workshop",
    runningWatts: 1400,
    runningWattsRange: "1,200 to 1,800 W",
    startingWatts: 2500,
    startingWattsRange: "2,000 to 3,000 W",
    surgeDelta: 1100,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Universal brush motor. Initial trigger pull causes momentary inrush as blade accelerates to 5,800 RPM.",
  },
  {
    id: "table-saw",
    name: "Jobsite Table Saw (10-Inch, 15 Amp)",
    category: "Tools & Workshop",
    runningWatts: 1800,
    runningWattsRange: "1,500 to 2,000 W",
    startingWatts: 3800,
    startingWattsRange: "3,200 to 4,500 W",
    surgeDelta: 2000,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Induction or heavy universal motor. Cutting thick hardwood pushes running draw to 2,000W peak.",
  },
  {
    id: "shop-vacuum",
    name: "Wet/Dry Shop Vacuum (12-Gallon, 5.0 Peak HP)",
    category: "Tools & Workshop",
    runningWatts: 1200,
    runningWattsRange: "900 to 1,400 W",
    startingWatts: 2000,
    startingWattsRange: "1,600 to 2,400 W",
    surgeDelta: 800,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "High suction velocity. Moderate startup surge for 1 to 2 seconds as turbine spins up.",
  },
  {
    id: "battery-charger-12v",
    name: "Automotive / Marine 12V Battery Charger (15A)",
    category: "Tools & Workshop",
    runningWatts: 250,
    runningWattsRange: "150 to 350 W",
    startingWatts: 250,
    startingWattsRange: "150 to 350 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Constant-current transformer or digital switch-mode charger. Zero motor starting surge.",
  },

  // 5. Lighting & Essentials
  {
    id: "led-lighting-10bulbs",
    name: "LED Household Lighting (10 Bulbs, 60W Equivalent)",
    category: "Lighting & Essentials",
    runningWatts: 90,
    runningWattsRange: "60 to 120 W",
    startingWatts: 90,
    startingWattsRange: "60 to 120 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Each LED bulb draws only 8 to 10 Watts. Massive energy savings over old incandescent circuits.",
  },
  {
    id: "incandescent-lighting-10bulbs",
    name: "Incandescent Lighting Circuit (10 Bulbs, 60W each)",
    category: "Lighting & Essentials",
    runningWatts: 600,
    runningWattsRange: "400 to 750 W",
    startingWatts: 600,
    startingWattsRange: "400 to 750 W",
    surgeDelta: 0,
    surgeType: "Purely Resistive",
    typicalVoltage: "120V",
    notes: "Tungsten filament draws full rated wattage continuously. Consider swapping to LED bulbs during outages.",
  },
  {
    id: "garage-door-opener",
    name: "Garage Door Opener (1/2 HP)",
    category: "Lighting & Essentials",
    runningWatts: 500,
    runningWattsRange: "400 to 650 W",
    startingWatts: 1400,
    startingWattsRange: "1,100 to 1,600 W",
    surgeDelta: 900,
    surgeType: "Locked-Rotor Motor",
    typicalVoltage: "120V",
    notes: "Capacitor-start motor lifts heavy steel overhead door. Operates for 12 to 15 seconds per cycle.",
  },
  {
    id: "security-system-cctv",
    name: "Home Security System & 8-Camera DVR",
    category: "Lighting & Essentials",
    runningWatts: 100,
    runningWattsRange: "60 to 150 W",
    startingWatts: 100,
    startingWattsRange: "60 to 150 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Low steady electrical draw. Best supported with a dedicated small UPS to bridge generator refueling stops.",
  },

  // 6. Electronics & Medical
  {
    id: "wifi-router-modem",
    name: "Wi-Fi Router & Cable / Fiber Modem",
    category: "Electronics & Medical",
    runningWatts: 25,
    runningWattsRange: "15 to 40 W",
    startingWatts: 25,
    startingWattsRange: "15 to 40 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Essential communication load during storms. Low harmonic distortion inverter generator recommended.",
  },
  {
    id: "smart-tv-65",
    name: "Smart LED Television (55 to 65-Inch)",
    category: "Electronics & Medical",
    runningWatts: 120,
    runningWattsRange: "80 to 180 W",
    startingWatts: 120,
    startingWattsRange: "80 to 180 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Modern LED backlights draw modest power. OLED screens can peak higher on vivid HDR modes.",
  },
  {
    id: "desktop-pc-workstation",
    name: "Desktop PC Workstation with Dual Monitors",
    category: "Electronics & Medical",
    runningWatts: 300,
    runningWattsRange: "200 to 500 W",
    startingWatts: 300,
    startingWattsRange: "200 to 500 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Switch-mode power supply with active power factor correction (PFC). Zero motor inrush surge.",
  },
  {
    id: "laptop-charger",
    name: "Laptop Computer USB-C Charger (65W to 100W)",
    category: "Electronics & Medical",
    runningWatts: 65,
    runningWattsRange: "45 to 100 W",
    startingWatts: 65,
    startingWattsRange: "45 to 100 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Negligible power draw. Operates seamlessly on even the smallest 1,000W suitcase inverter.",
  },
  {
    id: "cpap-machine-humidifier",
    name: "CPAP Machine (with Heated Humidifier)",
    category: "Electronics & Medical",
    runningWatts: 70,
    runningWattsRange: "40 to 110 W",
    startingWatts: 70,
    startingWattsRange: "40 to 110 W",
    surgeDelta: 0,
    surgeType: "Electronic Switch-Mode",
    typicalVoltage: "120V",
    notes: "Blower air pump consumes 30W; heated humidifier plate adds 40W. Requires clean Total Harmonic Distortion (<3% THD).",
  },
];

export const CATEGORY_OPTIONS: { id: string; label: string }[] = [
  { id: "all", label: "All Appliances (35+)" },
  { id: "Kitchen & Refrigeration", label: "Kitchen & Refrigeration" },
  { id: "Heating & Cooling", label: "Heating & Cooling" },
  { id: "Pumps & Water", label: "Pumps & Water" },
  { id: "Tools & Workshop", label: "Tools & Workshop" },
  { id: "Lighting & Essentials", label: "Lighting & Essentials" },
  { id: "Electronics & Medical", label: "Electronics & Medical" },
];

export interface FilterOptions {
  category?: string;
  query?: string;
  sortBy?: "name" | "runningWatts" | "startingWatts" | "surgeDelta";
  sortOrder?: "asc" | "desc";
}

/**
 * Filters and sorts appliance wattage data.
 */
export function filterWattageChartData(
  items: WattageChartItem[] = APPLIANCE_WATTAGE_DATA,
  options: FilterOptions = {}
): WattageChartItem[] {
  const { category = "all", query = "", sortBy = "runningWatts", sortOrder = "desc" } = options;

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesQuery =
      normalizedQuery === "" ||
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.notes.toLowerCase().includes(normalizedQuery) ||
      item.runningWatts.toString().includes(normalizedQuery) ||
      item.startingWatts.toString().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return filtered.sort((a, b) => {
    let comp = 0;
    if (sortBy === "name") {
      comp = a.name.localeCompare(b.name);
    } else {
      comp = a[sortBy] - b[sortBy];
    }
    return sortOrder === "asc" ? comp : -comp;
  });
}

export interface SelectedWattageSummary {
  selectedCount: number;
  totalRunningWatts: number;
  largestSurgeDelta: number;
  largestSurgeAppliance: string;
  peakDemandWatts: number;
  recommendedGeneratorWatts: number;
}

/**
 * Calculates simultaneous demand summary for user-selected appliances
 * using the standard Single-Largest-Surge Delta rule.
 */
export function calculateSelectedWattageSummary(
  selectedItems: WattageChartItem[]
): SelectedWattageSummary {
  if (selectedItems.length === 0) {
    return {
      selectedCount: 0,
      totalRunningWatts: 0,
      largestSurgeDelta: 0,
      largestSurgeAppliance: "None",
      peakDemandWatts: 0,
      recommendedGeneratorWatts: 0,
    };
  }

  const totalRunningWatts = selectedItems.reduce((acc, item) => acc + item.runningWatts, 0);

  let largestSurgeDelta = 0;
  let largestSurgeAppliance = "None";

  for (const item of selectedItems) {
    if (item.surgeDelta > largestSurgeDelta) {
      largestSurgeDelta = item.surgeDelta;
      largestSurgeAppliance = item.name;
    }
  }

  const peakDemandWatts = totalRunningWatts + largestSurgeDelta;
  // Apply 25% continuous planning headroom and round up to next 100W
  const recommendedGeneratorWatts = Math.ceil((peakDemandWatts * 1.25) / 100) * 100;

  return {
    selectedCount: selectedItems.length,
    totalRunningWatts,
    largestSurgeDelta,
    largestSurgeAppliance,
    peakDemandWatts,
    recommendedGeneratorWatts,
  };
}
