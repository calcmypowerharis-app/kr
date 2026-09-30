"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  calculateBatteryCapacity,
  sizeBatteryCapacity,
  BatteryChemistry,
  WiringType,
  CapacityUnit,
  LoadType,
  BATTERY_CHEMISTRY_PRESETS,
  COMMON_BATTERY_VOLTAGES,
  BATTERY_CAPACITY_FAQS,
} from "@/lib/calculators/battery-capacity";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/ui/ResultCard";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import { WorkedExampleSection, WorkedStep } from "@/components/calculators/WorkedExampleSection";
import { AssumptionsSection, AssumptionItem } from "@/components/calculators/AssumptionsSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { FaqSection } from "@/components/calculators/FaqSection";
import { RelatedCalculators, RelatedTool } from "@/components/calculators/RelatedCalculators";
import {
  AlertCircle,
  Battery,
  BatteryCharging,
  Zap,
  Sliders,
  Layers,
  ArrowRight,
  ShieldAlert,
  Info,
} from "lucide-react";

type CalculatorMode = "evaluate" | "size";

const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Solar Battery Calculator",
    description:
      "Size off-grid and backup solar battery banks in kWh and Amp-hours based on daily energy consumption and days of autonomy.",
    href: "/solar-battery-calculator",
    category: "Solar PV",
  },
  {
    title: "Solar Panel Tilt Angle Calculator",
    description:
      "Calculate the optimal solar panel tilt angle, compass orientation, and roof pitch differences for your latitude.",
    href: "/solar-panel-tilt-calculator",
    category: "Solar PV",
  },
  {
    title: "UPS Battery Backup Run-Time Hours Calculator",
    description:
      "Estimate runtime hours and continuous DC current draw for your appliances on a battery backup system.",
    href: "/ups-battery-backup-calculator",
    category: "Battery & UPS",
  },
  {
    title: "Watts to Amps Electrical Calculator",
    description:
      "Convert real power (Watts) to circuit current (Amps) across DC, 120V/240V single-phase, and 3-phase circuits.",
    href: "/watts-to-amps-calculator",
    category: "Electrical",
  },
  {
    title: "Amps to Watts Electrical Calculator",
    description:
      "Convert electrical current in Amperes to Watts and Kilowatts across DC, single-phase, and three-phase circuits.",
    href: "/amps-to-watts-calculator",
    category: "Electrical",
  },
  {
    title: "Generator Size Calculator",
    description:
      "Determine what size generator you need for emergency home backup, RV camping, or jobsite tools.",
    href: "/generator-size-calculator",
    category: "Generators",
  },
];

export const BatteryCapacityCalculator: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>("evaluate");

  // Mode 1: Evaluate Existing Battery State
  const [evalVoltage, setEvalVoltage] = useState<number>(12);
  const [evalCapacity, setEvalCapacity] = useState<number>(100);
  const [evalUnit, setEvalUnit] = useState<CapacityUnit>("ah");
  const [evalChemistry, setEvalChemistry] = useState<BatteryChemistry>("lifepo4");
  const [evalCustomDoD, setEvalCustomDoD] = useState<number>(85);
  const [evalCount, setEvalCount] = useState<number>(1);
  const [evalWiring, setEvalWiring] = useState<WiringType>("single");

  // Mode 2: Size Battery for Load State
  const [sizeLoadWatts, setSizeLoadWatts] = useState<number>(300);
  const [sizeRuntimeHours, setSizeRuntimeHours] = useState<number>(8);
  const [sizeVoltage, setSizeVoltage] = useState<number>(12);
  const [sizeLoadType, setSizeLoadType] = useState<LoadType>("ac");
  const [sizeInverterEff, setSizeInverterEff] = useState<number>(85);
  const [sizeChemistry, setSizeChemistry] = useState<BatteryChemistry>("lifepo4");
  const [sizeCustomDoD, setSizeCustomDoD] = useState<number>(85);
  const [sizeUnitAh, setSizeUnitAh] = useState<number>(100);

  // Mode 1 calculation
  const evalResults = useMemo(() => {
    return calculateBatteryCapacity({
      voltage: evalVoltage,
      capacityValue: evalCapacity,
      capacityUnit: evalUnit,
      chemistry: evalChemistry,
      customDoD: evalChemistry === "custom" ? evalCustomDoD : undefined,
      batteryCount: evalCount,
      wiring: evalCount > 1 ? evalWiring : "single",
    });
  }, [evalVoltage, evalCapacity, evalUnit, evalChemistry, evalCustomDoD, evalCount, evalWiring]);

  // Mode 2 calculation
  const sizeResults = useMemo(() => {
    return sizeBatteryCapacity({
      loadWatts: sizeLoadWatts,
      runtimeHours: sizeRuntimeHours,
      systemVoltage: sizeVoltage,
      loadType: sizeLoadType,
      inverterEfficiency: sizeInverterEff,
      chemistry: sizeChemistry,
      customDoD: sizeChemistry === "custom" ? sizeCustomDoD : undefined,
      unitBatteryAh: sizeUnitAh,
    });
  }, [
    sizeLoadWatts,
    sizeRuntimeHours,
    sizeVoltage,
    sizeLoadType,
    sizeInverterEff,
    sizeChemistry,
    sizeCustomDoD,
    sizeUnitAh,
  ]);

  const handleReset = () => {
    if (mode === "evaluate") {
      setEvalVoltage(12);
      setEvalCapacity(100);
      setEvalUnit("ah");
      setEvalChemistry("lifepo4");
      setEvalCustomDoD(85);
      setEvalCount(1);
      setEvalWiring("single");
    } else {
      setSizeLoadWatts(300);
      setSizeRuntimeHours(8);
      setSizeVoltage(12);
      setSizeLoadType("ac");
      setSizeInverterEff(85);
      setSizeChemistry("lifepo4");
      setSizeCustomDoD(85);
      setSizeUnitAh(100);
    }
  };

  const chemistryOptions = [
    { value: "lifepo4", label: "LiFePO4 Lithium (85% Recommended Usable)" },
    { value: "lead_acid", label: "Lead-Acid AGM / Gel / Flooded (50% Max Recommended)" },
    { value: "lithium_ion", label: "Lithium-Ion NMC (80% Typical Usable)" },
    { value: "custom", label: "Custom Depth of Discharge (%)" },
  ];

  const wiringOptions = [
    { value: "parallel", label: "Parallel (Increases Capacity Ah, Same Voltage)" },
    { value: "series", label: "Series (Increases Voltage V, Same Capacity Ah)" },
  ];

  const loadTypeOptions = [
    { value: "ac", label: "AC Load via Inverter (Includes Inverter Efficiency Loss)" },
    { value: "dc", label: "Direct DC Load (100% Direct Efficiency)" },
  ];

  // Variables for FormulaSection
  const formulaVariables = [
    {
      symbol: "E_nom",
      name: "Nominal Energy Capacity",
      unit: "Wh / kWh",
      description: "Total stored theoretical electrical energy in the battery or battery bank.",
    },
    {
      symbol: "V_bank",
      name: "Bank Voltage",
      unit: "Volts (V)",
      description: "Nominal DC operating voltage of the battery or series-connected bank.",
    },
    {
      symbol: "Ah_bank",
      name: "Bank Capacity",
      unit: "Amp-hours (Ah)",
      description: "Nominal charge storage capacity at the rated discharge rate.",
    },
    {
      symbol: "DoD",
      name: "Depth of Discharge",
      unit: "% (decimal)",
      description: "Fraction of battery capacity safely discharged to maintain cycle life (e.g. 0.85 for LiFePO4, 0.50 for Lead-Acid).",
    },
    {
      symbol: "η_inv",
      name: "Inverter Efficiency",
      unit: "% (decimal)",
      description: "DC-to-AC conversion efficiency of the inverter (typically 0.85 to 0.92 for quality pure sine wave inverters).",
    },
    {
      symbol: "P_load",
      name: "Load Power",
      unit: "Watts (W)",
      description: "Continuous power consumed by connected electrical appliances.",
    },
  ];

  const workedStepsMode1: WorkedStep[] = [
    {
      stepNumber: 1,
      title: "Calculate Nominal Stored Energy",
      calculation: "E_nom = 12V × 100Ah = 1,200 Wh (1.20 kWh)",
      explanation:
        "Multiply the nominal 12V rating by the 100Ah capacity. This represents the total electrical energy stored inside the battery cells.",
    },
    {
      stepNumber: 2,
      title: "Apply Chemistry Depth of Discharge (LiFePO4 vs. Lead-Acid)",
      calculation: "LiFePO4: 1,200 Wh × 0.85 = 1,020 Wh | Lead-Acid: 1,200 Wh × 0.50 = 600 Wh",
      explanation:
        "Because deep-cycle lead-acid degrades rapidly when discharged beyond 50%, only 600 Wh is usable. A LiFePO4 battery safely delivers 1,020 Wh, yielding 70% more usable energy from identical 100Ah nominal ratings.",
    },
    {
      stepNumber: 3,
      title: "Evaluate Multi-Battery Bank Wiring (Example: 4 Batteries)",
      calculation: "Series: 4 × 12V = 48V @ 100Ah (4,800 Wh) | Parallel: 12V @ 4 × 100Ah = 400Ah (4,800 Wh)",
      explanation:
        "Series wiring multiplies voltage for higher-power inverters, while parallel wiring multiplies Amp-hours. Both configurations produce 4,800 Wh nominal and 4,080 Wh usable energy.",
    },
  ];

  const workedStepsMode2: WorkedStep[] = [
    {
      stepNumber: 1,
      title: "Calculate Raw Load Energy Demand",
      calculation: "E_load = 400 Watts × 6 Hours = 2,400 Wh (2.4 kWh)",
      explanation:
        "Multiply continuous electrical load power by the desired hours of backup runtime to determine total energy required at the appliances.",
    },
    {
      stepNumber: 2,
      title: "Account for Inverter DC-to-AC Conversion Losses",
      calculation: "E_battery_out = 2,400 Wh ÷ 0.85 = 2,823.5 Wh",
      explanation:
        "DC-to-AC inverters generate heat during conversion. Dividing by 85% efficiency accounts for power consumed by the inverter itself.",
    },
    {
      stepNumber: 3,
      title: "Account for Battery Depth of Discharge (85% DoD)",
      calculation: "E_nominal_req = 2,823.5 Wh ÷ 0.85 = 3,321.8 Wh (3.32 kWh)",
      explanation:
        "To avoid draining the battery beyond safe limits, divide required output energy by the 85% depth of discharge benchmark.",
    },
    {
      stepNumber: 4,
      title: "Determine Required Bank Amp-Hours & Sizing Units",
      calculation: "Capacity = 3,321.8 Wh ÷ 12V = 276.8 Ah → ceil(276.8 ÷ 100) = 3 × 100Ah Batteries",
      explanation:
        "Divide required nominal Watt-hours by system voltage (12V) to obtain 276.8 Ah. Sizing with standard 100Ah 12V units requires 3 batteries wired in parallel.",
    },
  ];

  const assumptionsList: AssumptionItem[] = [
    {
      parameter: "LiFePO4 Usable Depth of Discharge",
      defaultVal: "85%",
      realisticRange: "80% to 90%",
      impact:
        "Premium lithium cells can be discharged to 90% for occasional outages, but an 80% to 85% limit extends cycle life to 4,000+ full cycles.",
    },
    {
      parameter: "Lead-Acid Usable Depth of Discharge",
      defaultVal: "50%",
      realisticRange: "40% to 50%",
      impact:
        "Discharging lead-acid batteries beyond 50% causes irreversible plate sulfation and reduces typical cycle life from 500 cycles down to under 200.",
    },
    {
      parameter: "Inverter DC-to-AC Efficiency",
      defaultVal: "85%",
      realisticRange: "80% to 93%",
      impact:
        "Quality pure sine wave inverters achieve 88% to 92% at optimal load, but light loads and standby idle power lower real-world average efficiency to ~85%.",
    },
    {
      parameter: "Operating Ambient Temperature",
      defaultVal: "77°F (25°C)",
      realisticRange: "32°F to 104°F (0°C to 40°C)",
      impact:
        "Cold ambient temperatures below 32°F temporarily reduce deliverable lead-acid capacity by 20% to 40% and can trigger BMS low-temp charging lockouts on lithium.",
    },
    {
      parameter: "Discharge Rate (Peukert Effect)",
      defaultVal: "C/10 to C/20 Rate",
      realisticRange: "C/2 to C/100",
      impact:
        "Heavier discharge rates (> C/5) significantly diminish delivered lead-acid capacity. LiFePO4 cells maintain over 95% rated capacity even at 0.5C to 1C rates.",
    },
  ];

  return (
    <CalculatorShell
      title="Battery Capacity & Sizing Calculator"
      badge="UPS & Battery Storage"
      category="Battery & Storage"
      lastUpdated="September 2026"
      description="Calculate battery storage capacity in Watt-hours (Wh), Kilowatt-hours (kWh), and Amp-hours (Ah). Evaluate usable battery bank capacity across LiFePO4 and Lead-Acid chemistries, or size battery capacity and unit count for your specific electrical load and runtime."
      onReset={handleReset}
      inputSection={
        <div className="space-y-6">
          {/* Mode Switcher Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Calculator Mode
            </label>
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setMode("evaluate")}
                className={`py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition ${
                  mode === "evaluate"
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                1. Evaluate Battery / Bank
              </button>
              <button
                type="button"
                onClick={() => setMode("size")}
                className={`py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition ${
                  mode === "size"
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                2. Size Battery for Load
              </button>
            </div>
          </div>

          {mode === "evaluate" ? (
            /* MODE 1: EVALUATE EXISTING BATTERY INPUTS */
            <div className="space-y-5">
              {/* Chemistry Preset */}
              <SelectField
                id="evalChemistry"
                label="Battery Chemistry & Type"
                value={evalChemistry}
                options={chemistryOptions}
                onChange={(val) => setEvalChemistry(val as BatteryChemistry)}
                helpText={BATTERY_CHEMISTRY_PRESETS[evalChemistry].description}
              />

              {/* Voltage & Capacity Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                <div className="space-y-2">
                  <InputField
                    id="evalVoltage"
                    label="Nominal Battery Voltage"
                    value={evalVoltage}
                    onChange={setEvalVoltage}
                    unit="Volts (V)"
                    min={1}
                    max={500}
                    step={1}
                    helpText="Single unit nominal voltage (typically 12V, 24V, or 48V)."
                    required
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Select:</span>
                    {COMMON_BATTERY_VOLTAGES.map((v) => (
                      <button
                        key={v.value}
                        type="button"
                        onClick={() => setEvalVoltage(v.value)}
                        className={`text-[11px] px-2.5 py-1 rounded border font-mono transition ${
                          evalVoltage === v.value
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {v.value}V
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <InputField
                    id="evalCapacity"
                    label="Rated Battery Capacity"
                    value={evalCapacity}
                    onChange={setEvalCapacity}
                    unit={evalUnit === "ah" ? "Amp-hours (Ah)" : "Milliamp-hours (mAh)"}
                    min={0.1}
                    max={100000}
                    step={evalUnit === "ah" ? 1 : 100}
                    helpText="Manufacturer nameplate capacity rating."
                    required
                  />
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500">Unit:</span>
                    <button
                      type="button"
                      onClick={() => setEvalUnit("ah")}
                      className={`text-[11px] px-2.5 py-1 rounded border font-semibold transition ${
                        evalUnit === "ah"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Amp-hours (Ah)
                    </button>
                    <button
                      type="button"
                      onClick={() => setEvalUnit("mah")}
                      className={`text-[11px] px-2.5 py-1 rounded border font-semibold transition ${
                        evalUnit === "mah"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      mAh
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Depth of Discharge (shown if custom selected) */}
              {evalChemistry === "custom" && (
                <InputField
                  id="evalCustomDoD"
                  label="Custom Depth of Discharge (DoD)"
                  value={evalCustomDoD}
                  onChange={setEvalCustomDoD}
                  unit="%"
                  min={10}
                  max={100}
                  step={5}
                  helpText="Enter manufacturer recommended maximum safe discharge percentage."
                />
              )}

              {/* Multi-Battery Bank Options */}
              <div className="pt-2 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                  <InputField
                    id="evalCount"
                    label="Battery Count (Units in Bank)"
                    value={evalCount}
                    onChange={setEvalCount}
                    unit="units"
                    min={1}
                    max={64}
                    step={1}
                    helpText="Set to 1 for a standalone battery, or 2+ for a connected bank."
                    required
                  />

                  {evalCount > 1 ? (
                    <SelectField
                      id="evalWiring"
                      label="Bank Wiring Configuration"
                      value={evalWiring}
                      options={wiringOptions}
                      onChange={(val) => setEvalWiring(val as WiringType)}
                      helpText={
                        evalWiring === "series"
                          ? "Multiplies voltage; Amp-hour capacity stays equal to one unit."
                          : "Multiplies Amp-hour capacity; voltage stays equal to one unit."
                      }
                    />
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 mt-6">
                      <Info className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Single battery configuration (Standalone unit).</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Validation Errors */}
              {evalResults.errors.length > 0 && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2"
                >
                  <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>Input Validation Notice</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-red-700">
                    {evalResults.errors.map((err, idx) => (
                      <li key={idx}>{err.message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* MODE 2: SIZE BATTERY FOR LOAD INPUTS */
            <div className="space-y-5">
              {/* Load & Runtime Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                <div className="space-y-2">
                  <InputField
                    id="sizeLoadWatts"
                    label="Continuous Appliance Load"
                    value={sizeLoadWatts}
                    onChange={setSizeLoadWatts}
                    unit="Watts (W)"
                    min={1}
                    max={20000}
                    step={10}
                    helpText="Total running wattage of appliances powered simultaneously."
                    required
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">Presets:</span>
                    {[
                      { label: "150W (Starlink / Laptop)", w: 150 },
                      { label: "300W (CPAP / Refrig)", w: 300 },
                      { label: "500W (Desktop / TV)", w: 500 },
                      { label: "1,200W (Microwave)", w: 1200 },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setSizeLoadWatts(p.w)}
                        className={`text-[11px] px-2 py-1 rounded border transition ${
                          sizeLoadWatts === p.w
                            ? "bg-slate-900 text-white border-slate-900 font-semibold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {p.w}W
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <InputField
                    id="sizeRuntimeHours"
                    label="Desired Backup Duration"
                    value={sizeRuntimeHours}
                    onChange={setSizeRuntimeHours}
                    unit="Hours (h)"
                    min={0.25}
                    max={168}
                    step={0.5}
                    helpText="Target number of hours the system must run without grid/solar input."
                    required
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">Duration:</span>
                    {[
                      { label: "4h", h: 4 },
                      { label: "8h", h: 8 },
                      { label: "12h", h: 12 },
                      { label: "24h (1 Day)", h: 24 },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setSizeRuntimeHours(p.h)}
                        className={`text-[11px] px-2 py-1 rounded border transition ${
                          sizeRuntimeHours === p.h
                            ? "bg-slate-900 text-white border-slate-900 font-semibold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Voltage & Load Type Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                <div className="space-y-2">
                  <InputField
                    id="sizeVoltage"
                    label="System DC Voltage"
                    value={sizeVoltage}
                    onChange={setSizeVoltage}
                    unit="Volts (V)"
                    min={1}
                    max={500}
                    step={1}
                    helpText="DC bus voltage of the battery bank and inverter."
                    required
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Select:</span>
                    {[12, 24, 48].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setSizeVoltage(v)}
                        className={`text-[11px] px-2.5 py-1 rounded border font-mono transition ${
                          sizeVoltage === v
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {v}V
                      </button>
                    ))}
                  </div>
                </div>

                <SelectField
                  id="sizeLoadType"
                  label="Load Power Type"
                  value={sizeLoadType}
                  options={loadTypeOptions}
                  onChange={(val) => setSizeLoadType(val as LoadType)}
                  helpText="Standard 120V household devices use an inverter (AC); 12V RV fans or LED lights run direct DC."
                />
              </div>

              {/* Inverter Efficiency (if AC) & Chemistry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                {sizeLoadType === "ac" ? (
                  <InputField
                    id="sizeInverterEff"
                    label="Inverter Efficiency"
                    value={sizeInverterEff}
                    onChange={setSizeInverterEff}
                    unit="%"
                    min={50}
                    max={98}
                    step={1}
                    helpText="Typically 85% to 90% for pure sine wave inverters factoring standby consumption."
                  />
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">Direct DC Mode: </span>
                    100% direct electrical efficiency (no DC-to-AC conversion loss).
                  </div>
                )}

                <SelectField
                  id="sizeChemistry"
                  label="Battery Chemistry"
                  value={sizeChemistry}
                  options={chemistryOptions}
                  onChange={(val) => setSizeChemistry(val as BatteryChemistry)}
                  helpText={BATTERY_CHEMISTRY_PRESETS[sizeChemistry].description}
                />
              </div>

              {/* Individual Unit Capacity for Bank Sizing */}
              <InputField
                id="sizeUnitAh"
                label="Individual Battery Unit Capacity (Optional)"
                value={sizeUnitAh}
                onChange={setSizeUnitAh}
                unit="Amp-hours (Ah)"
                min={10}
                max={1000}
                step={10}
                helpText="Common deep-cycle units are 100Ah, 200Ah, or 280Ah. Used to calculate how many physical batteries to purchase."
              />

              {/* Validation Errors */}
              {sizeResults.errors.length > 0 && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2"
                >
                  <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>Input Validation Notice</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-red-700">
                    {sizeResults.errors.map((err, idx) => (
                      <li key={idx}>{err.message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      }
      resultSection={
        <div className="space-y-6">
          {mode === "evaluate" ? (
            /* MODE 1 RESULTS */
            <>
              <ResultCard
                icon="zap"
                primaryTitle="Estimated Usable Energy"
                primaryValue={evalResults.isValid ? evalResults.formattedUsableWh : "--"}
                primarySubtext={
                  evalResults.isValid
                    ? `${evalResults.formattedUsableKwh} usable at ${evalResults.dodPercentUsed}% Depth of Discharge (${evalResults.bankVoltage}V Bank)`
                    : "Awaiting valid battery specifications"
                }
                stats={[
                  {
                    label: "Total Nominal Energy",
                    value: evalResults.isValid ? evalResults.formattedNominalWh : "--",
                    subtext: evalResults.isValid ? `(${evalResults.formattedNominalKwh})` : undefined,
                  },
                  {
                    label: "Bank Capacity (Ah)",
                    value: evalResults.isValid ? evalResults.formattedBankAh : "--",
                    subtext: "Nominal Amp-hours",
                  },
                  {
                    label: "Bank Voltage",
                    value: evalResults.isValid ? `${evalResults.bankVoltage} V` : "--",
                    subtext: evalCount > 1 ? `${evalCount} units in ${evalWiring}` : "Single battery",
                  },
                  {
                    label: "Depth of Discharge",
                    value: `${evalResults.dodPercentUsed}%`,
                    subtext: BATTERY_CHEMISTRY_PRESETS[evalChemistry].shortName,
                  },
                ]}
                warnings={evalResults.warnings}
              />

              {/* Wiring Summary Detail Card */}
              {evalResults.isValid && evalCount > 1 && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-blue-400" />
                    <span>Bank Wiring Architecture</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {evalResults.wiringSummary}
                  </p>
                </div>
              )}

              {/* Calculation Methodology Callout */}
              {evalResults.isValid && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 font-mono leading-relaxed">
                  <div className="font-sans font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Active Formula Breakdown
                  </div>
                  <div>{evalResults.formulaExplanation}</div>
                </div>
              )}
            </>
          ) : (
            /* MODE 2 RESULTS */
            <>
              <ResultCard
                icon="zap"
                primaryTitle="Required Nominal Capacity"
                primaryValue={sizeResults.isValid ? sizeResults.formattedNominalWh : "--"}
                primarySubtext={
                  sizeResults.isValid
                    ? `${sizeResults.formattedBankAh} at ${sizeVoltage}V DC (Provides ${sizeResults.formattedRawWh} usable load energy)`
                    : "Awaiting valid electrical sizing inputs"
                }
                stats={[
                  {
                    label: "Required Bank Capacity",
                    value: sizeResults.isValid ? sizeResults.formattedBankAh : "--",
                    subtext: `@ ${sizeVoltage}V System`,
                  },
                  {
                    label: "Recommended Battery Units",
                    value:
                      sizeResults.isValid && sizeResults.recommendedUnits
                        ? `${sizeResults.recommendedUnits} Units`
                        : "N/A",
                    subtext: sizeResults.unitAhUsed ? `(${sizeResults.unitAhUsed}Ah each)` : undefined,
                  },
                  {
                    label: "Continuous DC Draw",
                    value: sizeResults.isValid ? `${sizeResults.dcCurrentAmps} A` : "--",
                    subtext: "Current from battery",
                  },
                  {
                    label: "Raw Appliance Demand",
                    value: sizeResults.isValid ? sizeResults.formattedRawWh : "--",
                    subtext: `${sizeLoadWatts}W × ${sizeRuntimeHours}h`,
                  },
                ]}
                warnings={sizeResults.warnings}
              />

              {/* Sizing Step Breakdown Card */}
              {sizeResults.isValid && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 font-mono leading-relaxed">
                  <div className="font-sans font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Sizing Formula Steps
                  </div>
                  <div>{sizeResults.formulaExplanation}</div>
                </div>
              )}
            </>
          )}

          {/* Quick Cross-Link to UPS Runtime & 100Ah Runtime Guide */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-bold">Need to calculate exact backup runtime for an existing battery?</span>
              <p className="text-blue-800 leading-relaxed">
                If you already own a battery bank and want custom runtime hours across varying household loads, use our dedicated{" "}
                <Link
                  href="/ups-battery-backup-calculator"
                  className="font-semibold underline hover:text-blue-950 inline-flex items-center gap-0.5"
                >
                  UPS &amp; Battery Backup Calculator
                  <ArrowRight className="w-3 h-3" />
                </Link>
                . For realistic appliance benchmarks (refrigerators, CPAP, TVs, and inverters), read our{" "}
                <Link
                  href="/how-long-will-a-100ah-battery-last"
                  className="font-semibold underline hover:text-blue-950 inline-flex items-center gap-0.5"
                >
                  12V 100Ah Battery Runtime Guide
                  <ArrowRight className="w-3 h-3" />
                </Link>
                , or learn how to wire solar panels to charge your battery bank in our{" "}
                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="font-semibold underline hover:text-blue-950 inline-flex items-center gap-0.5"
                >
                  Solar Panels Series vs Parallel Guide
                  <ArrowRight className="w-3 h-3" />
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      }
    >
      {/* Visual Diagram: Nominal vs Usable DoD */}
      <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
        <Image
          src="/images/calculators/battery-capacity-nominal-vs-usable-dod.jpg"
          alt="Educational diagram comparing nominal battery capacity in Watt-hours versus usable energy across LiFePO4 lithium at 85% depth of discharge and lead-acid AGM at 50% depth of discharge."
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800">Nominal vs. Usable Capacity: </span>
          While both batteries may carry an identical 12V 100Ah (1,200 Wh) nameplate rating, chemistry depth-of-discharge (DoD) constraints dictate real usable energy. A LiFePO4 battery safely delivers ~85% (1,020 Wh), whereas lead-acid AGM should not exceed 50% discharge (600 Wh) to protect plate life.
        </div>
      </div>

      {/* In-depth Educational Guide & Reference Content */}
      <div className="space-y-10 mt-10">
        {/* Section 1: Understanding Nominal vs Usable */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Battery className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Understanding Nominal vs. Usable Battery Capacity
            </h2>
          </div>
          <div className="prose prose-slate max-w-none text-sm md:text-base leading-relaxed space-y-4 text-slate-700">
            <p>
              When evaluating deep-cycle batteries for off-grid solar, RV boondocking, or home emergency backup, the single most common sizing mistake is assuming that 100% of a battery&apos;s nameplate capacity can be drawn into appliances. A battery labeled &quot;100 Amp-hours at 12 Volts&quot; stores <strong>1,200 Watt-hours (Wh)</strong> of raw chemical energy, but the amount of electrical energy you can extract safely depends on its internal chemistry. If you are charging batteries with solar modules, calculate your array&apos;s optimal tilt angle and roof pitch using our <Link href="/solar-panel-tilt-calculator" className="text-blue-600 hover:underline font-medium">Solar Panel Tilt Angle Calculator</Link>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div className="font-bold text-emerald-900 text-sm mb-1">LiFePO4 Lithium</div>
                <div className="text-2xl font-black text-emerald-700 mb-2">80% – 90%</div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Safely discharges 80% to 90% of rated capacity daily. Delivers 3,000 to 5,000+ full charge-discharge cycles without rapid degradation.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                <div className="font-bold text-amber-900 text-sm mb-1">Lead-Acid (AGM / Gel)</div>
                <div className="text-2xl font-black text-amber-700 mb-2">50% Max</div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Industry standard guidelines recommend a maximum 50% depth of discharge. Draining lead-acid below 50% accelerates lead sulfate crystallization and destroys plate life.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                <div className="font-bold text-blue-900 text-sm mb-1">Lithium-Ion (NMC)</div>
                <div className="text-2xl font-black text-blue-700 mb-2">80% Typical</div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Used in consumer portable power stations and electronics. High energy density with an optimal operating window of 10% to 90% state of charge.
                </p>
              </div>
            </div>
            <p>
              Because of this chemistry differential, a homeowner replacing a 200Ah lead-acid bank (100Ah usable) only requires approximately 120Ah of LiFePO4 capacity to achieve identical usable energy, while saving roughly 70% in physical battery weight.
            </p>
          </div>
        </section>

        {/* Section 2: Mathematical Formulas & Methodology */}
        <FormulaSection
          title="Mathematical Formulas & Calculation Methodology"
          formulaDisplay="E_nom = V × Ah | E_usable = E_nom × DoD | Ah_req = (P × t) ÷ (V × η_inv × DoD)"
          description="Battery capacity calculations rely on fundamental electrical physics. Below are the deterministic equations used by our engine to calculate energy storage, conversion efficiency, and load sizing."
          variables={formulaVariables}
          notes={[
            "Watt-hours (Wh) is calculated by multiplying circuit Voltage (V) by current capacity over time in Amp-hours (Ah).",
            "To convert milliamp-hours (mAh) to Amp-hours (Ah), divide by 1,000 (e.g. 20,000 mAh = 20 Ah).",
            "Inverter efficiency (η_inv) must be included when sizing DC battery storage for AC 120V household appliances; direct 12V DC loads bypass this conversion step.",
          ]}
        />

        {/* Section 3: Worked Examples */}
        <WorkedExampleSection
          title={mode === "evaluate" ? "Worked Example: Evaluating a 12V 100Ah Battery" : "Worked Example: Sizing a Battery for 400W Over 6 Hours"}
          scenario={
            mode === "evaluate"
              ? "A homeowner is comparing a 12V 100Ah LiFePO4 battery against a 12V 100Ah AGM lead-acid battery, and plans to connect four units into a 48V bank."
              : "An off-grid cabin owner needs to power a 400-Watt combined electrical load (refrigerator, satellite internet, laptop, and LED lighting) continuously for 6 hours using a 12V LiFePO4 battery bank and an 85%-efficient pure sine wave inverter."
          }
          steps={mode === "evaluate" ? workedStepsMode1 : workedStepsMode2}
          conclusion={
            mode === "evaluate"
              ? "From identical nominal 12V 100Ah ratings, LiFePO4 provides 1,020 Wh of usable energy versus 600 Wh for lead-acid. Wiring four batteries in series creates a 48V 100Ah bank delivering 4,080 Wh usable energy."
              : "To power 400 Watts for 6 hours, the system requires 3,322 Wh (277 Ah at 12V) of nominal battery capacity. Sizing with standard 100Ah 12V batteries requires three batteries connected in parallel."
          }
        />

        {/* Section 4: Battery Bank Wiring (Series vs Parallel) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Battery Bank Wiring: Series vs. Parallel Architecture
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            Multiple batteries can be interconnected to create higher voltage or greater Amp-hour capacity. However, how you wire them radically changes electrical circuit parameters:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-50 text-slate-700">
                  <th className="py-3 px-4 font-bold">Wiring Type</th>
                  <th className="py-3 px-4 font-bold">How to Connect</th>
                  <th className="py-3 px-4 font-bold">Bank Voltage</th>
                  <th className="py-3 px-4 font-bold">Bank Capacity (Ah)</th>
                  <th className="py-3 px-4 font-bold">Total Stored Wh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Series</td>
                  <td className="py-3 px-4">Positive (+) to Negative (-)</td>
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">Adds Up (V × N)</td>
                  <td className="py-3 px-4 font-mono">Unchanged (1 × Ah)</td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-600">Multiplies (Wh × N)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Parallel</td>
                  <td className="py-3 px-4">Positive (+) to (+), Neg (-) to (-)</td>
                  <td className="py-3 px-4 font-mono">Unchanged (1 × V)</td>
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">Adds Up (Ah × N)</td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-600">Multiplies (Wh × N)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Series-Parallel</td>
                  <td className="py-3 px-4">Pairs in series, then paralleled</td>
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">Increases (e.g. 24V)</td>
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">Increases (e.g. 200Ah)</td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-600">Multiplies (Wh × N)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs md:text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-700" />
              <span>Critical Multi-Battery Safety Rule</span>
            </div>
            <p className="leading-relaxed">
              Never connect batteries of differing chemistries, differing voltages, unequal capacities, or differing ages in series or parallel. A degraded or lower-capacity battery will cause premature cell reversal, overcharging, severe balance drift, and thermal runaway risks. Always use identical batteries from the same production batch and verify individual voltages match within 0.05V before connecting them into a bank.
            </p>
          </div>
        </section>

        {/* Section 5: Real-World Factors & Limitations */}
        <AssumptionsSection
          title="Real-World Variables & Environmental Deratings"
          description="Theoretical nameplate capacity ratings are measured under laboratory test conditions (typically 77°F / 25°C at a slow C/20 discharge rate). Real-world installations must account for the following environmental and operational factors:"
          assumptions={assumptionsList}
          impactHeader="Practical Engineering Impact"
        />

        {/* Section 6: Electrical Code & Safety Standards */}
        <DisclaimerSection
          title="National Electrical Code (NEC) & Storage Safety Disclaimers"
          points={[
            "National Electrical Code (NEC Article 480 / NFPA 70): Stationary battery storage installations must comply with local building and electrical codes, including proper conductor ampacity sizing, overcurrent protection devices (fuses/breakers), and physical disconnects.",
            "DC Overcurrent Protection: High-capacity battery banks can deliver thousands of short-circuit Amperes. Every battery bank must include a properly rated Class T or ANL fuse mounted as close as practical to the positive terminal.",
            "Flooded Lead-Acid Hydrogen Outgassing: Unsealed flooded lead-acid batteries emit flammable hydrogen gas during charging and require dedicated exterior mechanical or natural ventilation to prevent explosive atmospheres.",
            "Lithium BMS Cutoff: Quality LiFePO4 batteries feature an internal Battery Management System (BMS) that disconnects the battery under low-voltage, over-current, or freezing charging conditions. System design must prevent sudden load dropouts on critical circuits.",
            "Professional Engineering Advice: Calculations provided on CalcMyPower.com are for preliminary planning and educational purposes. Always consult a licensed master electrician or certified solar installer before purchasing or energizing stationary battery banks.",
          ]}
        />

        {/* Section 7: Comprehensive FAQ Section */}
        <FaqSection
          title="Frequently Asked Questions About Battery Capacity & Sizing"
          faqs={BATTERY_CAPACITY_FAQS}
        />

        {/* Section 8: Related Calculators */}
        <RelatedCalculators calculators={RELATED_TOOLS} />
      </div>
    </CalculatorShell>
  );
};
