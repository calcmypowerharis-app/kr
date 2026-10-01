"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  calculateSolarBattery,
  DailyEnergyUnit,
  BatteryChemistryType,
  SystemVoltage,
  DAILY_USAGE_PRESETS,
  CHEMISTRY_DEFAULTS,
  COMMON_SYSTEM_VOLTAGES,
  PEAK_SUN_HOURS_PRESETS,
  SOLAR_BATTERY_DEFAULTS,
  SOLAR_BATTERY_FAQS,
  formatKwh,
  formatWh,
  formatAh,
  formatWatts,
} from "@/lib/calculators/solar-battery";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/ui/ResultCard";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import {
  WorkedExampleSection,
  WorkedStep,
} from "@/components/calculators/WorkedExampleSection";
import {
  AssumptionsSection,
  AssumptionItem,
} from "@/components/calculators/AssumptionsSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { FaqSection } from "@/components/calculators/FaqSection";
import {
  RelatedCalculators,
  RelatedTool,
} from "@/components/calculators/RelatedCalculators";
import { SolarBatteryFlowDiagram } from "@/components/calculators/SolarBatteryFlowDiagram";
import {
  Battery,
  BatteryCharging,
  Sun,
  Zap,
  HelpCircle,
  Layers,
  ArrowRight,
  Info,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Calendar,
} from "lucide-react";

const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Battery Capacity & Sizing Calculator",
    description:
      "Convert battery Amp-hours to Watt-hours, calculate usable energy, and size storage for specific continuous wattage loads.",
    href: "/battery-capacity-calculator",
    category: "Battery Storage",
  },
  {
    title: "Solar Charge Controller Calculator",
    description:
      "Size MPPT and PWM charge controllers from solar array wattage, battery voltage, and verify cold-temperature Voc headroom.",
    href: "/solar-charge-controller-calculator",
    category: "Solar PV",
  },
  {
    title: "Solar Panel Tilt Angle Calculator",
    description:
      "Calculate the optimal solar panel tilt angle and compass orientation for your latitude to maximize seasonal battery recharging.",
    href: "/solar-panel-tilt-calculator",
    category: "Solar PV",
  },
  {
    title: "Solar Panels in Series vs Parallel Guide",
    description:
      "Understand how series and parallel wiring configurations affect array operating voltage, current, and charge controller compatibility.",
    href: "/solar-panels-series-vs-parallel",
    category: "Solar Engineering Guide",
  },
  {
    title: "Watts to Amps Electrical Calculator",
    description:
      "Convert real power in Watts to circuit current in Amperes across DC, 120V/240V single-phase, and three-phase circuits.",
    href: "/watts-to-amps-calculator",
    category: "Electrical",
  },
  {
    title: "Voltage Drop Calculator",
    description:
      "Calculate circuit voltage loss and verify wire gauge sizing for high-amperage 12V, 24V, and 48V DC battery inverter cables.",
    href: "/voltage-drop-calculator",
    category: "Electrical Circuits",
  },
  {
    title: "What Is a Watt-Hour (Wh)?",
    description:
      "Learn the fundamental difference between instantaneous power (Watts) and total energy consumed or stored over time (Watt-hours).",
    href: "/what-is-a-watt-hour",
    category: "Educational Guide",
  },
];

export const SolarBatteryCalculator: React.FC = () => {
  // Input State
  const [dailyEnergy, setDailyEnergy] = useState<number>(5.0);
  const [dailyEnergyUnit, setDailyEnergyUnit] = useState<DailyEnergyUnit>("kwh");
  const [autonomyType, setAutonomyType] = useState<string>("1.0");
  const [customAutonomy, setCustomAutonomy] = useState<number>(1.0);
  const [systemVoltage, setSystemVoltage] = useState<number>(48);
  const [chemistry, setChemistry] = useState<BatteryChemistryType>("lifepo4");
  const [customDoD, setCustomDoD] = useState<number>(85);
  const [inverterEff, setInverterEff] = useState<number>(85);
  const [peakSunHours, setPeakSunHours] = useState<number>(4.5);
  const [systemEff, setSystemEff] = useState<number>(78);

  const activeAutonomyDays = useMemo(() => {
    if (autonomyType === "custom") {
      return customAutonomy;
    }
    return parseFloat(autonomyType) || 1.0;
  }, [autonomyType, customAutonomy]);

  const activeDoDFraction = useMemo(() => {
    if (chemistry === "custom") {
      return customDoD / 100;
    }
    return CHEMISTRY_DEFAULTS[chemistry].defaultDoD;
  }, [chemistry, customDoD]);

  // Calculation
  const result = useMemo(() => {
    return calculateSolarBattery({
      dailyEnergy,
      dailyEnergyUnit,
      autonomyDays: activeAutonomyDays,
      systemVoltage,
      chemistry,
      customDoD: activeDoDFraction,
      inverterEfficiency: inverterEff / 100,
      peakSunHours,
      systemEfficiency: systemEff / 100,
    });
  }, [
    dailyEnergy,
    dailyEnergyUnit,
    activeAutonomyDays,
    systemVoltage,
    chemistry,
    activeDoDFraction,
    inverterEff,
    peakSunHours,
    systemEff,
  ]);

  const handleReset = () => {
    setDailyEnergy(SOLAR_BATTERY_DEFAULTS.dailyEnergy);
    setDailyEnergyUnit(SOLAR_BATTERY_DEFAULTS.dailyEnergyUnit);
    setAutonomyType("1.0");
    setCustomAutonomy(1.0);
    setSystemVoltage(SOLAR_BATTERY_DEFAULTS.systemVoltage);
    setChemistry(SOLAR_BATTERY_DEFAULTS.chemistry);
    setCustomDoD(85);
    setInverterEff(85);
    setPeakSunHours(4.5);
    setSystemEff(78);
  };

  const handlePresetSelect = (dailyKwh: number) => {
    if (dailyEnergyUnit === "kwh") {
      setDailyEnergy(dailyKwh);
    } else {
      setDailyEnergy(dailyKwh * 1000);
    }
  };

  const handleUnitToggle = (newUnit: DailyEnergyUnit) => {
    if (newUnit === dailyEnergyUnit) return;
    if (newUnit === "wh") {
      setDailyEnergy(dailyEnergy * 1000);
    } else {
      setDailyEnergy(dailyEnergy / 1000);
    }
    setDailyEnergyUnit(newUnit);
  };

  const workedSteps: WorkedStep[] = [
    {
      stepNumber: 1,
      title: "Normalize Daily Energy Consumption to Watt-Hours",
      calculation: "4.0 kWh/day × 1,000 = 4,000 Wh/day",
      explanation:
        "Convert daily kilowatt-hours into base Watt-hours for uniform precision across electrical derating steps.",
    },
    {
      stepNumber: 2,
      title: "Calculate Load-Side Autonomy Energy",
      calculation: "4,000 Wh/day × 2.0 Days = 8,000 Wh",
      explanation:
        "Multiply daily electrical consumption by desired days of autonomy (reserve capacity required to power appliances without solar generation).",
    },
    {
      stepNumber: 3,
      title: "Derate for Inverter Efficiency Losses",
      calculation: "8,000 Wh ÷ 0.90 (90% Inverter Eff) = 8,888.89 Wh (8.89 kWh)",
      explanation:
        "Inverters consume DC energy while generating 120V/240V AC power. The battery bank must deliver 8,888.89 Wh of DC power to yield 8,000 Wh of usable AC appliance electricity.",
    },
    {
      stepNumber: 4,
      title: "Derate for Usable Battery Depth of Discharge (DoD)",
      calculation: "8,888.89 Wh ÷ 0.85 (85% LiFePO4 DoD) = 10,457.52 Wh (10.46 kWh)",
      explanation:
        "To preserve cell longevity, batteries should not be fully discharged to 0%. Derating by the intended usable fraction (85% for LiFePO4) establishes the required total nominal nameplate capacity.",
    },
    {
      stepNumber: 5,
      title: "Convert Nominal Energy to Battery-Bank Amp-Hours",
      calculation: "10,457.52 Wh ÷ 24V DC = 435.73 Amp-hours (Ah)",
      explanation:
        "Dividing nominal energy by the selected 24V DC bus voltage determines the minimum Amp-hour capacity of the combined battery bank.",
    },
    {
      stepNumber: 6,
      title: "Simplified Solar PV Replenishment Estimate",
      calculation: "4,000 Wh ÷ (4.5 Peak Sun Hours × 0.78 System Eff) = 1,139.60 Watts",
      explanation:
        "Preliminary planning estimate for the minimum solar array wattage needed to replenish one day of energy consumption under 4.5 peak sun hours with an illustrative 78% balance-of-system efficiency.",
    },
  ];

  const assumptions: AssumptionItem[] = [
    {
      parameter: "Battery Usable Fraction (DoD)",
      defaultVal: "LiFePO4: 85% | Lead-Acid AGM: 50%",
      realisticRange: "70% to 90% (LiFePO4) | 40% to 50% (Lead-Acid)",
      impact:
        "Depth of discharge values are illustrative editable defaults. Always consult your specific battery manufacturer datasheet. Deeply discharging lead-acid batteries beyond 50% causes accelerated plate sulfation, while operating LiFePO4 within 80%–90% DoD optimizes cycle life.",
    },
    {
      parameter: "Inverter Conversion Efficiency",
      defaultVal: "85% (Typical Real-World Baseline)",
      realisticRange: "80% to 94% across varying load percentages",
      impact:
        "Inverter efficiency varies dynamically depending on connected load percentage and ambient operating temperature. Higher quality pure sine wave inverters operating near their sweet spot can reach 90%–94%, while light loads often drop efficiency to 75%–82%.",
    },
    {
      parameter: "DC System Bus Voltage",
      defaultVal: "48V DC Standard",
      realisticRange: "12V, 24V, or 48V DC options",
      impact:
        "Sizing larger energy storage systems at higher DC bus voltages reduces operating current for a given power level. Lower current reduces conductor sizing and voltage-drop requirements. Select a system voltage compatible with your inverter, charge controller, battery, and other equipment.",
    },
    {
      parameter: "Balance-of-System (BOS) PV Efficiency",
      defaultVal: "78% Simplified Baseline",
      realisticRange: "70% to 85% depending on temperature and wiring",
      impact:
        "Solar replenishment figures are educational planning estimates only. Actual photovoltaic harvest depends on geographical coordinates, seasonal solar angles, module temperature coefficient losses, dust/soiling, and inverter/charge controller conversion losses.",
    },
  ];

  return (
    <CalculatorShell
      title="Solar Battery Calculator"
      badge="Solar PV & Storage Sizing"
      description="Calculate the battery bank capacity needed for your off-grid or backup solar system. Size storage in kWh and Amp-hours based on daily usage and autonomy."
      category="Solar PV"
      lastUpdated="September 2026"
      onReset={handleReset}
      inputSection={
        <div className="space-y-6">
          {/* Input 1: Daily Energy Consumption */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label
                htmlFor="daily-energy-input"
                className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Daily Energy Consumption</span>
              </label>

              {/* Unit Toggle */}
              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleUnitToggle("kwh")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                    dailyEnergyUnit === "kwh"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  kWh / day
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle("wh")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                    dailyEnergyUnit === "wh"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Wh / day
                </button>
              </div>
            </div>

            {/* Quick Reference Presets */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Reference Load Presets (Optional)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DAILY_USAGE_PRESETS.map((preset) => {
                  const targetVal =
                    dailyEnergyUnit === "kwh" ? preset.dailyKwh : preset.dailyKwh * 1000;
                  const isSelected = Math.abs(dailyEnergy - targetVal) < 0.01;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handlePresetSelect(preset.dailyKwh)}
                      className={`p-2.5 rounded-xl border text-left transition text-xs ${
                        isSelected
                          ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="font-semibold truncate">{preset.label}</div>
                      <div className="text-slate-500 font-mono mt-0.5">
                        {preset.dailyKwh} kWh
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 italic">
                These are reference presets, not universal consumption claims. Enter your exact measured appliance load for precise sizing.
              </p>
            </div>

            <InputField
              id="daily-energy-input"
              label={
                dailyEnergyUnit === "kwh"
                  ? "Daily Energy Consumption (Kilowatt-hours)"
                  : "Daily Energy Consumption (Watt-hours)"
              }
              value={dailyEnergy}
              onChange={(val) => setDailyEnergy(val)}
              unit={dailyEnergyUnit === "kwh" ? "kWh" : "Wh"}
              min={0.1}
              step={dailyEnergyUnit === "kwh" ? 0.1 : 100}
              helpText={
                dailyEnergyUnit === "kwh"
                  ? "Typical off-grid homes consume 5 to 20 kWh/day; small camper vans consume 1 to 2.5 kWh/day."
                  : "Enter raw Watt-hours (e.g. 5,000 Wh equals 5.0 kWh)."
              }
            />
          </div>

          {/* Input 2: Days of Autonomy */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Days of Autonomy (Reserve Days)</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { value: "0.5", label: "0.5 Day", sub: "Grid backup" },
                { value: "1.0", label: "1.0 Day", sub: "Standard" },
                { value: "2.0", label: "2.0 Days", sub: "Moderate" },
                { value: "3.0", label: "3.0 Days", sub: "Extended" },
                { value: "custom", label: "Custom", sub: "User defined" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setAutonomyType(opt.value)}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    autonomyType === opt.value
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.sub}</div>
                </button>
              ))}
            </div>

            {autonomyType === "custom" && (
              <div className="pt-2">
                <InputField
                  id="custom-autonomy-input"
                  label="Custom Days of Autonomy"
                  value={customAutonomy}
                  onChange={(val) => setCustomAutonomy(val)}
                  unit="Days"
                  min={0.1}
                  max={14}
                  step={0.1}
                  helpText="Enter desired number of consecutive sunless reserve days (e.g. 1.5 or 2.5 days)."
                />
              </div>
            )}

            <p className="text-xs text-slate-500 pt-1">
              Days of autonomy reflects how long the battery bank can sustain your daily consumption during continuous overcast weather without solar generation.
            </p>
          </div>

          {/* Input 3: DC System Voltage */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>DC System Voltage</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COMMON_SYSTEM_VOLTAGES.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setSystemVoltage(v.value)}
                  className={`p-3 rounded-xl border text-left transition ${
                    systemVoltage === v.value
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900">{v.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {v.value === 48 ? "Home storage" : v.value === 24 ? "Cabin / RV" : "Small mobile"}
                  </div>
                </button>
              ))}
            </div>

            {/* Educational Voltage Text */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Voltage Sizing Engineering Context:</span>
              </div>
              <p>
                Sizing larger energy storage systems at higher DC bus voltages can reduce operating current for a given power level. Lower current can reduce conductor sizing and voltage-drop requirements. Select a system voltage compatible with your inverter, charge controller, battery, and other equipment.
              </p>
            </div>
          </div>

          {/* Input 4: Battery Chemistry / Usable Fraction */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Battery className="w-4 h-4 text-blue-600" />
              <span>Battery Chemistry &amp; Usable Depth of Discharge (DoD)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChemistry("lifepo4")}
                className={`p-3 rounded-xl border text-left transition ${
                  chemistry === "lifepo4"
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="text-xs font-bold text-slate-900">LiFePO4 Lithium</div>
                <div className="text-xs text-blue-700 font-semibold mt-0.5">85% Usable DoD</div>
                <div className="text-[10px] text-slate-500 mt-1">Illustrative default</div>
              </button>

              <button
                type="button"
                onClick={() => setChemistry("lead_acid_agm")}
                className={`p-3 rounded-xl border text-left transition ${
                  chemistry === "lead_acid_agm"
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Lead-Acid AGM / Gel</div>
                <div className="text-xs text-blue-700 font-semibold mt-0.5">50% Usable DoD</div>
                <div className="text-[10px] text-slate-500 mt-1">Plate protection limit</div>
              </button>

              <button
                type="button"
                onClick={() => setChemistry("custom")}
                className={`p-3 rounded-xl border text-left transition ${
                  chemistry === "custom"
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Custom DoD</div>
                <div className="text-xs text-blue-700 font-semibold mt-0.5">User Specified</div>
                <div className="text-[10px] text-slate-500 mt-1">Datasheet specific</div>
              </button>
            </div>

            {chemistry === "custom" && (
              <div className="pt-2">
                <InputField
                  id="custom-dod-input"
                  label="Custom Usable Depth of Discharge"
                  value={customDoD}
                  onChange={(val) => setCustomDoD(val)}
                  unit="%"
                  min={20}
                  max={100}
                  step={1}
                  helpText="Enter the usable discharge fraction specified by your battery manufacturer (20% to 100%)."
                />
              </div>
            )}

            <p className="text-xs text-slate-500 italic">
              Illustrative default: adjust to your battery manufacturer&apos;s specifications.
            </p>
          </div>

          {/* Input 5: Inverter Efficiency */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="inverter-eff-input"
                className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <BatteryCharging className="w-4 h-4 text-blue-600" />
                <span>Inverter Efficiency (DC to AC)</span>
              </label>
              <span className="text-xs font-mono font-bold text-blue-700">
                {inverterEff}%
              </span>
            </div>

            <InputField
              id="inverter-eff-input"
              label="Inverter Efficiency Percentage"
              value={inverterEff}
              onChange={(val) => setInverterEff(val)}
              unit="%"
              min={70}
              max={100}
              step={1}
              helpText="Accounts for DC-to-AC conversion loss. High-efficiency pure sine wave inverters typically range between 85% and 93%."
            />
          </div>

          {/* Input 6: Average Daily Peak Sun Hours */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-blue-600" />
              <span>Average Daily Peak Sun Hours (PSH)</span>
            </label>

            <SelectField
              id="peak-sun-hours-select"
              label="Peak Sun Hours Preset"
              value={peakSunHours.toString()}
              onChange={(val) => setPeakSunHours(parseFloat(val) || 4.5)}
              options={PEAK_SUN_HOURS_PRESETS.map((p) => ({
                value: p.value.toString(),
                label: p.label,
              }))}
            />

            <p className="text-xs text-slate-500">
              Simplified planning input used solely to estimate the minimum solar array wattage needed to replenish daily consumption.
            </p>
          </div>
        </div>
      }
      resultSection={
        <div className="space-y-4">
          {/* Main Primary Result Card */}
          <ResultCard
            icon="zap"
            primaryTitle="Required Nominal Battery Capacity"
            primaryValue={`${formatKwh(result.nominalCapacityKwh)} kWh`}
            primarySubtext={`${formatWh(result.nominalCapacityWh)} Watt-hours nominal nameplate storage`}
            stats={[
              {
                label: "Required Bank Capacity",
                value: `${formatAh(result.batteryBankAh)} Ah`,
                subtext: `@ ${result.systemVoltage}V DC Bus`,
              },
              {
                label: "Load Autonomy Energy",
                value: `${formatKwh(result.autonomyLoadEnergyKwh)} kWh`,
                subtext: `${result.autonomyDays} Day${result.autonomyDays !== 1 ? "s" : ""} Reserve`,
              },
              {
                label: "Battery Delivery Energy",
                value: `${formatKwh(result.batteryDeliveryEnergyKwh)} kWh`,
                subtext: `Inverter Derated (${Math.round(result.inverterEfficiency * 100)}% Eff)`,
              },
              {
                label: "Usable Fraction (DoD)",
                value: `${Math.round(result.usableFraction * 100)}%`,
                subtext: chemistry === "lifepo4" ? "LiFePO4 Baseline" : chemistry === "lead_acid_agm" ? "Lead-Acid Baseline" : "Custom DoD",
              },
            ]}
          />

          {/* PV Replenishment Card (Clearly labeled as simplified planning estimate) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Estimated PV Array Size for Daily Replenishment</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200/60 text-amber-800">
                Planning Estimate
              </span>
            </div>
            <div className="text-2xl font-black text-amber-950 font-mono">
              ~{formatWatts(result.pvReplenishmentWatts)} Watts
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Based on {result.peakSunHours} peak sun hours and an illustrative {Math.round(result.systemEfficiency * 100)}% balance-of-system efficiency. This is a simplified educational planning guideline only, not a guaranteed solar harvest calculation.
            </p>
          </div>

          {/* Energy Tier Deration Summary Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Energy-Tier Deration Summary</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">1. Daily Load:</span>
                <span className="font-semibold text-slate-900">{formatKwh(result.dailyEnergyKwh)} kWh/day</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">2. Load Autonomy ({result.autonomyDays}d):</span>
                <span className="font-semibold text-slate-900">{formatKwh(result.autonomyLoadEnergyKwh)} kWh</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">3. Battery Delivery (÷ {Math.round(result.inverterEfficiency * 100)}% inv):</span>
                <span className="font-semibold text-slate-900">{formatKwh(result.batteryDeliveryEnergyKwh)} kWh</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 bg-blue-50/50 p-1 rounded">
                <span className="font-bold text-blue-900">4. Nominal Capacity (÷ {Math.round(result.usableFraction * 100)}% DoD):</span>
                <span className="font-bold text-blue-900 font-mono">{formatKwh(result.nominalCapacityKwh)} kWh</span>
              </div>
              <div className="flex items-center justify-between pt-0.5 bg-emerald-50/60 p-1 rounded">
                <span className="font-bold text-emerald-900">5. Bank Amp-Hours (÷ {result.systemVoltage}V DC):</span>
                <span className="font-bold text-emerald-900 font-mono">{formatAh(result.batteryBankAh)} Ah</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* Featured Visual Asset: Solar Battery Storage System */}
      <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
        <Image
          src="/images/calculators/solar-battery-storage-system.webp"
          alt="Modern residential solar battery storage system with rack-mounted lithium LiFePO4 batteries and hybrid solar inverter."
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800">Figure 1: Residential Solar Energy Storage System: </span>
          High-capacity 48V lithium iron phosphate (LiFePO4) rack-mounted battery bank connected through heavy-gauge DC conductors to a wall-mounted hybrid inverter with solar PV charge inputs.
        </div>
      </div>

      {/* Technical SVG Flow Diagram */}
      <SolarBatteryFlowDiagram
        dailyKwh={result.dailyEnergyKwh}
        dailyWh={result.dailyEnergyWh}
        autonomyDays={result.autonomyDays}
        autonomyKwh={result.autonomyLoadEnergyKwh}
        deliveryKwh={result.batteryDeliveryEnergyKwh}
        inverterEffPercent={Math.round(result.inverterEfficiency * 100)}
        nominalKwh={result.nominalCapacityKwh}
        nominalWh={result.nominalCapacityWh}
        dodPercent={Math.round(result.usableFraction * 100)}
        systemVoltage={result.systemVoltage}
        bankAh={result.batteryBankAh}
      />

      {/* AEO Direct-Answer Explanations */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <span>How do I calculate solar battery capacity?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To calculate solar battery bank capacity, follow a sequential 4-step derating methodology:
          </p>
          <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-700">
            <li><strong>Daily Consumption (Wh):</strong> Sum the wattage and runtime of all connected loads.</li>
            <li><strong>Autonomy Multiplier:</strong> Multiply by days of autonomy (e.g. 1 to 3 reserve days).</li>
            <li><strong>Inverter Derating:</strong> Divide by inverter efficiency (e.g. 85%) for conversion losses.</li>
            <li><strong>Usable DoD Derating:</strong> Divide by usable depth of discharge (e.g. 85% LiFePO4 or 50% Lead-Acid) to find nominal capacity, then divide by DC bus voltage to establish bank Amp-hours.</li>
          </ol>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <span>How many batteries do I need for a solar system?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Physical battery module count cannot be determined from a single universal equation. The required quantity depends on your total nominal energy requirement (kWh), chosen DC system voltage (12V, 24V, or 48V), individual battery module capacity (e.g. 12V 100Ah vs. 48V 100Ah server racks), series/parallel wiring arrangements, and manufacturer limits on parallel battery expansion and BMS current limits.
          </p>
        </div>
      </section>

      {/* Formula & Calculation Methodology */}
      <FormulaSection
        title="Solar Battery Sizing Formulas"
        description="The mathematical progression required to size an off-grid or emergency backup battery storage bank based on daily load, reserve autonomy, and efficiency deratings."
        formulaDisplay="E_nominal (Wh) = (E_daily × N_autonomy) ÷ (η_inverter × DoD) | Ah = E_nominal ÷ V_dc | P_pv (W) = E_daily ÷ (PSH × η_sys)"
        variables={[
          {
            symbol: "E_daily",
            name: "Daily Energy Consumption",
            unit: "Wh or kWh",
            description: "Total electrical energy consumed by AC and DC appliances in a 24-hour cycle.",
          },
          {
            symbol: "N_autonomy",
            name: "Days of Autonomy",
            unit: "Days",
            description: "Number of consecutive days the battery must sustain loads without solar generation.",
          },
          {
            symbol: "η_inverter",
            name: "Inverter Efficiency",
            unit: "Decimal (0.70 - 1.00)",
            description: "DC-to-AC power conversion efficiency derating factor (typically 0.85).",
          },
          {
            symbol: "DoD",
            name: "Usable Depth of Discharge",
            unit: "Decimal (0.20 - 1.00)",
            description: "Safe usable fraction of battery capacity (illustrative defaults: 0.85 for LiFePO4; 0.50 for Lead-Acid).",
          },
          {
            symbol: "V_dc",
            name: "DC Bus Voltage",
            unit: "Volts (V)",
            description: "System nominal DC voltage (12V, 24V, or 48V) connecting battery to inverter.",
          },
          {
            symbol: "PSH",
            name: "Peak Sun Hours",
            unit: "Hours/day",
            description: "Equivalent hours per day of 1,000 W/m² peak solar irradiance at your installation location.",
          },
          {
            symbol: "η_sys",
            name: "PV System Efficiency",
            unit: "Decimal (0.78 Baseline)",
            description: "Illustrative 78% balance-of-system efficiency derating factor for thermal loss, wiring resistance, and MPPT tracking.",
          },
          {
            symbol: "P_pv",
            name: "Estimated PV Replenishment",
            unit: "Watts (W)",
            description: "Simplified solar array wattage needed to replenish one day of energy consumption under local peak sun hours.",
          },
        ]}
        notes={[
          "Nominal capacity represents the total nameplate chemical energy of the battery cells.",
          "Usable capacity is the energy safely extracted during daily cycling without premature cell degradation.",
          "Higher DC bus voltages (48V) decrease operating current, reducing required wire gauge sizes and resistive thermal losses.",
          "Solar replenishment wattage uses a disclosed 78% balance-of-system planning baseline to account for temperature derating, wiring resistance, and dust/soiling.",
        ]}
      />

      {/* Step-by-Step Worked Example */}
      <WorkedExampleSection
        title="Step-by-Step Worked Example: Off-Grid Cabin (4,000 Wh/day, 2 Days Autonomy)"
        scenario="An off-grid mountain cabin consumes 4,000 Watt-hours (4.0 kWh) per day. The owner requires 2.0 days of autonomy for overcast mountain weather, uses a modern 48V pure sine wave inverter (90% efficiency), and selects 48V LiFePO4 lithium batteries (85% usable DoD)."
        steps={workedSteps}
        conclusion="For this off-grid cabin scenario, the owner requires a nominal battery bank capacity of approximately 10.46 kWh (10,458 Wh). At a 24V DC bus, this equals ~435.73 Amp-hours (or ~217.86 Ah at 48V DC). Replenishing 4.0 kWh of daily consumption under 4.5 peak sun hours requires a preliminary solar array size of approximately 1,140 Watts."
      />

      {/* Engineering Assumptions & Variables */}
      <AssumptionsSection
        title="Solar Battery Bank Sizing Assumptions & Variables"
        description="Key assumptions and parameters used in calculating solar battery storage capacity, inverter efficiency derating, and solar replenishment."
        assumptions={assumptions}
      />

      {/* Frequently Asked Questions */}
      <FaqSection
        title="Solar Battery Sizing Frequently Asked Questions"
        faqs={SOLAR_BATTERY_FAQS}
      />

      {/* Regulatory & Safety Disclaimers */}
      <DisclaimerSection
        title="Preliminary Planning & Engineering Disclaimer"
        points={[
          "This tool provides preliminary educational planning estimates. It does not replace an engineered electrical design, structural review, or local building code requirements.",
          "Actual solar PV production depends on multiple dynamic real-world factors including geographical coordinates, seasonal solar angles, local weather, panel orientation and azimuth, roof pitch tilt, module temperature coefficients, shading obstructions, dust/soiling accumulation, and electrical conductor losses.",
          "Energy storage systems involve high DC currents and potential arc-flash hazards. Always follow manufacturer installation manuals and consult a licensed electrician or qualified solar engineering professional for physical equipment sizing, overcurrent protection, and NEC-compliant installation.",
        ]}
      />

      {/* Related Tools & Sizing Guides */}
      <RelatedCalculators
        calculators={RELATED_TOOLS}
      />
    </CalculatorShell>
  );
};
