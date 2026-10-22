export type HardwareIconName =
  | "inverter-generator"
  | "standby-generator"
  | "lifepo4-battery"
  | "ups-tower"
  | "kill-a-watt"
  | "panel-monitor"
  | "clamp-meter"
  | "mppt-controller"
  | "solar-panel";

export interface HardwareProduct {
  id: string;
  title: string;
  brand: string;
  badge: string;
  ribbonColor: "amber" | "blue" | "emerald";
  priceTier: string;
  rating: string;
  specs: [string, string, string];
  description: string;
  searchQuery: string;
  iconName: HardwareIconName;
}

export interface HardwareCluster {
  clusterTitle: string;
  subtitle: string;
  items: [HardwareProduct, HardwareProduct, HardwareProduct];
}

export const HARDWARE_CATALOG: Record<string, HardwareCluster> = {
  generators: {
    clusterTitle: "Recommended Power Backup Equipment (Amazon)",
    subtitle: "Field-tested portable inverter generators, dual-fuel home backup, and transfer switch gear",
    items: [
      {
        id: "gen-inverter-quiet",
        title: "2,200W - 2,500W Quiet Dual-Fuel Inverter Generator",
        brand: "Westinghouse / Champion",
        badge: "BEST SELLER / MOST POPULAR",
        ribbonColor: "amber",
        priceTier: "Typical Range: $450 - $650",
        rating: "5.0 (Top-Rated Inverter)",
        specs: [
          "< 3% THD Clean Sine Wave",
          "52 dB Ultra-Quiet Enclosure",
          "Dual-Fuel Gas/Propane Ready",
        ],
        description:
          "Quiet, fuel-efficient portable power engineered for refrigerators, home medical equipment, and sensitive electronics.",
        searchQuery: "2500 watt inverter generator dual fuel",
        iconName: "inverter-generator",
      },
      {
        id: "gen-backup-split-phase",
        title: "7,500W - 9,500W Dual-Fuel Home Backup Generator",
        brand: "Westinghouse / DuroMax",
        badge: "BEST VALUE FOR HOMEOWNERS",
        ribbonColor: "blue",
        priceTier: "Typical Range: $850 - $1,200",
        rating: "4.9 (Home Backup Standard)",
        specs: [
          "120V/240V L14-30R / 14-50R Outlets",
          "Electric Push-Button Start",
          "Runs Sump, Well Pump & AC",
        ],
        description:
          "Heavy-duty dual-fuel generator with 120V/240V split-phase power to energize entire home subpanels during storm blackouts.",
        searchQuery: "dual fuel portable generator 9500 watt",
        iconName: "standby-generator",
      },
      {
        id: "gen-transfer-switch",
        title: "30A / 50A Prewired Generator Transfer Switch & Inlet Kit",
        brand: "Reliance Controls / Generac",
        badge: "PRO NEC UPGRADE",
        ribbonColor: "emerald",
        priceTier: "Typical Range: $280 - $420",
        rating: "5.0 (NEC 702 Compliant)",
        specs: [
          "NEC 702 Break-Before-Make",
          "Prevents Utility Backfeeding",
          "Includes NEMA 3R Outdoor Inlet",
        ],
        description:
          "Code-compliant manual transfer subpanel allowing safe generator connection directly to critical household circuit breakers.",
        searchQuery: "generator transfer switch kit 30 amp",
        iconName: "standby-generator",
      },
    ],
  },

  "ups-battery": {
    clusterTitle: "Recommended Battery Storage & Backup Gear (Amazon)",
    subtitle: "Grade-A LiFePO4 deep-cycle storage, pure sine wave UPS systems, and smart chargers",
    items: [
      {
        id: "battery-lifepo4-100ah",
        title: "12V 100Ah Deep-Cycle LiFePO4 Lithium Battery",
        brand: "LiTime / Renogy",
        badge: "BEST SELLER / MOST POPULAR",
        ribbonColor: "amber",
        priceTier: "Typical Range: $190 - $260",
        rating: "5.0 (Grade-A Prismatic Cells)",
        specs: [
          "Built-in 100A Smart BMS",
          "4,000+ Deep Cycles @ 100% DoD",
          "10-Year Service Lifespan",
        ],
        description:
          "Automotive-grade LiFePO4 cells delivering full rated capacity at one-third the weight of traditional AGM or lead-acid batteries.",
        searchQuery: "12V 100Ah LiFePO4 battery",
        iconName: "lifepo4-battery",
      },
      {
        id: "ups-sinewave-1500va",
        title: "1500VA / 900W Pure Sine Wave UPS Battery Backup",
        brand: "CyberPower / APC",
        badge: "BEST VALUE FOR HOMEOWNERS",
        ribbonColor: "blue",
        priceTier: "Typical Range: $180 - $240",
        rating: "4.9 (PFC Active Compatible)",
        specs: [
          "Pure Sine Wave Output",
          "Automatic Voltage Regulation (AVR)",
          "Instant 4ms-8ms Transfer Time",
        ],
        description:
          "Enterprise-grade battery backup and surge suppression protecting NAS drives, gaming PCs, Wi-Fi routers, and network gear.",
        searchQuery: "1500VA pure sine wave UPS",
        iconName: "ups-tower",
      },
      {
        id: "inverter-charger-2000w",
        title: "12V 2000W Pure Sine Wave Inverter & LiFePO4 Charger",
        brand: "Victron Energy / Renogy",
        badge: "PRO NEC UPGRADE",
        ribbonColor: "emerald",
        priceTier: "Typical Range: $220 - $350",
        rating: "4.9 (High-Surge Inverter)",
        specs: [
          "92% Peak Electrical Efficiency",
          "Surge Capacity Up to 4,000W",
          "Built-In GFCI Receptacles",
        ],
        description:
          "Converts battery DC power to clean 120V AC household electricity with multi-stage smart lithium charging capability.",
        searchQuery: "2000W pure sine wave inverter charger",
        iconName: "inverter-generator",
      },
    ],
  },

  electricity: {
    clusterTitle: "Recommended Energy Monitoring Hardware (Amazon)",
    subtitle: "Precision plug-in wattmeters, whole-home smart panel monitors, and smart plugs",
    items: [
      {
        id: "meter-kill-a-watt",
        title: "P3 P4400 Kill A Watt Digital Electricity Usage Monitor",
        brand: "P3 International",
        badge: "BEST SELLER / MOST POPULAR",
        ribbonColor: "amber",
        priceTier: "Typical Range: $28 - $38",
        rating: "5.0 (0.2% Accuracy Class)",
        specs: [
          "Real-Time Watts & Cumulative kWh",
          "Calculates Dollar Operating Cost",
          "Detects Standby Phantom Draws",
        ],
        description:
          "The gold-standard plug-in power meter used by energy auditors to measure exact appliance wattage and standby power consumption.",
        searchQuery: "kill a watt electricity monitor",
        iconName: "kill-a-watt",
      },
      {
        id: "monitor-smart-panel",
        title: "Emporia Vue 3 Whole-Home Smart Energy Monitor",
        brand: "Emporia Energy",
        badge: "BEST VALUE FOR HOMEOWNERS",
        ribbonColor: "blue",
        priceTier: "Typical Range: $140 - $180",
        rating: "4.9 (1-Second Granularity)",
        specs: [
          "16 Dedicated Circuit CT Clamps",
          "Real-Time iOS/Android App",
          "Solar Net Metering Support",
        ],
        description:
          "Installs directly inside main breaker panel to measure real-time branch circuit power, HVAC consumption, and solar net feed-in.",
        searchQuery: "emporia vue 3 energy monitor",
        iconName: "panel-monitor",
      },
      {
        id: "smart-plug-energy-15a",
        title: "Kasa Smart Wi-Fi Plug with Real-Time Energy Monitor (15A)",
        brand: "TP-Link Kasa / Tapo",
        badge: "PRO NEC UPGRADE",
        ribbonColor: "emerald",
        priceTier: "Typical Range: $18 - $30 (2-Pack)",
        rating: "4.8 (UL-Listed 15A Relay)",
        specs: [
          "Automated Energy Schedules",
          "Tracks Peak vs Off-Peak kWh",
          "No Hub Required",
        ],
        description:
          "UL-listed 15-Amp smart plugs that track real-time power draw and automate phantom-load shutoff during expensive peak utility hours.",
        searchQuery: "kasa smart plug energy monitoring",
        iconName: "kill-a-watt",
      },
    ],
  },

  "electrical-tools": {
    clusterTitle: "Recommended Electrical Testing & Wiring Tools (Amazon)",
    subtitle: "True-RMS clamp meters, heavy-duty pure copper cords, and NEC safety testing equipment",
    items: [
      {
        id: "meter-clamp-true-rms",
        title: "Klein Tools CL390 True-RMS AC/DC Digital Clamp Meter",
        brand: "Klein Tools",
        badge: "BEST SELLER / MOST POPULAR",
        ribbonColor: "amber",
        priceTier: "Typical Range: $75 - $95",
        rating: "5.0 (CAT III 600V Rated)",
        specs: [
          "True-RMS AC & DC Current Clamp",
          "Measures Inrush Motor Surge",
          "Non-Contact Voltage Detector",
        ],
        description:
          "Pro-grade clamp multimeter engineered to measure live operating current and starting motor inrush without breaking circuit conductors.",
        searchQuery: "klein tools digital clamp meter",
        iconName: "clamp-meter",
      },
      {
        id: "cord-10awg-copper",
        title: "Southwire 10 AWG 50-Foot Heavy-Duty Pure Copper Extension Cord",
        brand: "Southwire / Iron Forge",
        badge: "BEST VALUE FOR HOMEOWNERS",
        ribbonColor: "blue",
        priceTier: "Typical Range: $55 - $75",
        rating: "4.9 (UL-Listed 15A/20A)",
        specs: [
          "Pure Annealed Copper Strands",
          "< 3% Voltage Drop Over 50ft",
          "Water & Flame Resistant SJTW",
        ],
        description:
          "Extra-thick 10-gauge pure copper conductors engineered to prevent voltage drop and overheating on continuous high-amperage equipment.",
        searchQuery: "10 AWG generator extension cord",
        iconName: "clamp-meter",
      },
      {
        id: "tester-gfci-receptacle",
        title: "Klein Tools RT210 GFCI Receptacle & Circuit Tester",
        brand: "Klein Tools",
        badge: "PRO NEC UPGRADE",
        ribbonColor: "emerald",
        priceTier: "Typical Range: $15 - $35",
        rating: "5.0 (Standard Inspection Tool)",
        specs: [
          "Detects 6 Common Wiring Faults",
          "One-Touch GFCI Trip Test",
          "Clear LED Diagnostic Status",
        ],
        description:
          "Essential safety tester to verify correct hot, neutral, and ground wiring polarity before connecting expensive electronic equipment.",
        searchQuery: "klein tools outlet tester",
        iconName: "clamp-meter",
      },
    ],
  },

  solar: {
    clusterTitle: "Recommended Solar & Renewable Hardware (Amazon)",
    subtitle: "High-efficiency MPPT charge controllers, monocrystalline PV panels, and heavy-duty cabling",
    items: [
      {
        id: "solar-mppt-controller",
        title: "Victron SmartSolar MPPT 100/30 (or Renogy Rover 40A MPPT)",
        brand: "Victron Energy / Renogy",
        badge: "BEST SELLER / MOST POPULAR",
        ribbonColor: "amber",
        priceTier: "Typical Range: $130 - $220",
        rating: "5.0 (98% Peak Efficiency)",
        specs: [
          "Ultra-Fast MPPT Tracking",
          "Built-In Bluetooth Telemetry",
          "Auto 12V/24V Multi-Stage Charging",
        ],
        description:
          "Premium MPPT charge controller that maximizes solar energy harvest even during partial shade, with comprehensive smartphone telemetry.",
        searchQuery: "mppt solar charge controller 40A",
        iconName: "mppt-controller",
      },
      {
        id: "solar-panels-mono",
        title: "Renogy 200W - 400W Monocrystalline Solar Panel Kits",
        brand: "Renogy / BougeRV",
        badge: "BEST VALUE FOR HOMEOWNERS",
        ribbonColor: "blue",
        priceTier: "Typical Range: $180 - $360",
        rating: "4.9 (Grade-A PERC Cells)",
        specs: [
          "21.5% Cell Conversion Efficiency",
          "Corrosion-Resistant Aluminum Frame",
          "Pre-Drilled for Z-Brackets",
        ],
        description:
          "High-efficiency monocrystalline solar panels built with tempered glass to withstand heavy snow and wind loads for decades.",
        searchQuery: "monocrystalline solar panels 200W",
        iconName: "solar-panel",
      },
      {
        id: "solar-cables-mounts",
        title: "BougeRV 10 AWG Solar Cables & Adjustable Tilt Mount Brackets",
        brand: "BougeRV / Renogy",
        badge: "PRO NEC UPGRADE",
        ribbonColor: "emerald",
        priceTier: "Typical Range: $35 - $60",
        rating: "4.9 (IP67 Waterproof Connectors)",
        specs: [
          "Tinned Copper Low Resistance",
          "Pre-Crimped IP67 MC4 Connectors",
          "Boosts Winter Yield by Up to 25%",
        ],
        description:
          "Optimizes seasonal solar panel tilt angle and connects PV arrays with weather-resistant tinned copper cabling.",
        searchQuery: "solar extension cable 10 AWG MC4",
        iconName: "solar-panel",
      },
    ],
  },
};

export function getHardwareClusterForSlug(slug?: string): HardwareCluster {
  switch (slug) {
    case "generator-size-calculator":
    case "generator-fuel-consumption-calculator":
      return HARDWARE_CATALOG.generators;

    case "battery-capacity-calculator":
    case "solar-battery-calculator":
    case "ups-battery-backup-calculator":
      return HARDWARE_CATALOG["ups-battery"];

    case "electricity-use-calculator":
    case "electricity-cost-calculator":
      return HARDWARE_CATALOG.electricity;

    case "amps-to-watts-calculator":
    case "watts-to-amps-calculator":
    case "voltage-drop-calculator":
    case "three-phase-power-calculator":
    case "inverter-size-calculator":
      return HARDWARE_CATALOG["electrical-tools"];

    case "solar-charge-controller-calculator":
    case "solar-system-size-calculator":
    case "solar-panel-tilt-calculator":
    default:
      return HARDWARE_CATALOG.solar;
  }
}
