"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateInverterSize,
  INVERTER_PRESET_APPLIANCES,
  INVERTER_FAQS,
  type InverterSystemVoltage,
  type BatteryChemistry,
  type SelectedInverterAppliance,
  type InverterApplianceCategory,
} from "@/lib/calculators/inverter-size";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { ResultCard } from "@/components/ui/ResultCard";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import {
  WorkedExampleSection,
  type WorkedStep,
} from "@/components/calculators/WorkedExampleSection";
import {
  AssumptionsSection,
  type AssumptionItem,
} from "@/components/calculators/AssumptionsSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { FaqSection } from "@/components/calculators/FaqSection";
import {
  RelatedCalculators,
  type RelatedTool,
} from "@/components/calculators/RelatedCalculators";
import {
  Zap,
  BatteryCharging,
  Sliders,
  ShieldAlert,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Info,
} from "lucide-react";

const INITIAL_SELECTED_APPLIANCES: SelectedInverterAppliance[] = [
  {
    id: "refrigerator",
    name: "Residential Refrigerator / Freezer",
    category: "kitchen",
    quantity: 1,
    runningWatts: 150,
    startingWatts: 1200,
  },
  {
    id: "microwave",
    name: "Microwave Oven (1,000W Output)",
    category: "kitchen",
    quantity: 1,
    runningWatts: 1100,
    startingWatts: 1300,
  },
  {
    id: "laptop_workstation",
    name: "Laptop & Dual Monitor Workstation",
    category: "electronics",
    quantity: 1,
    runningWatts: 120,
    startingWatts: 120,
  },
  {
    id: "cpap_humidifier",
    name: "CPAP Machine (with Humidifier)",
    category: "medical",
    quantity: 1,
    runningWatts: 60,
    startingWatts: 60,
  },
];

const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Solar Charge Controller Sizing Calculator",
    description:
      "Size your MPPT or PWM solar charge controller based on array wattage, short-circuit current, and battery bank voltage.",
    href: "/solar-charge-controller-calculator",
    category: "Solar PV",
  },
  {
    title: "Solar Battery Sizing Calculator",
    description:
      "Calculate off-grid and backup battery bank storage in Amp-hours and Watt-hours with chemistry-specific depth of discharge.",
    href: "/solar-battery-calculator",
    category: "Battery Storage",
  },
  {
    title: "Generator Size Calculator",
    description:
      "Estimate required generator wattage for whole-home backup, construction job sites, and heavy motor starting surges.",
    href: "/generator-size-calculator",
    category: "Generators",
  },
  {
    title: "Watts to Amps Electrical Calculator",
    description:
      "Convert real power in Watts to circuit current in Amperes across DC, 120V/240V single-phase, and three-phase circuits.",
    href: "/watts-to-amps-calculator",
    category: "Electrical",
  },
  {
    title: "Battery Capacity & Sizing Calculator",
    description:
      "Convert battery Amp-hours to Watt-hours, calculate usable storage based on Depth of Discharge, and estimate runtimes.",
    href: "/battery-capacity-calculator",
    category: "Battery Storage",
  },
  {
    title: "Voltage Drop Calculator",
    description:
      "Calculate conductor voltage drop and size copper cables between batteries, inverters, and distribution panels.",
    href: "/voltage-drop-calculator",
    category: "Circuit Design",
  },
];

const WORKED_STEPS: WorkedStep[] = [
  {
    stepNumber: 1,
    title: "Calculate Total Continuous Running Wattage",
    calculation: "150W (Fridge) + 1,100W (Microwave) + 120W (Workstation) + 60W (CPAP) = 1,430 Watts",
    explanation:
      "Sum the rated operating power for all appliances intended to operate concurrently.",
  },
  {
    stepNumber: 2,
    title: "Identify Single Largest Motor Startup Surge",
    calculation: "Fridge: 1,200W starting - 150W running = 1,050W surge delta. Peak Surge = 1,430W + 1,050W = 2,480 Watts",
    explanation:
      "Inductive motor loads draw momentary inrush current when starting against head pressure. Modeling non-coincident starting provides a practical surge baseline; if multiple motors cycle concurrently, their combined surge must be evaluated.",
  },
  {
    stepNumber: 3,
    title: "Apply 25% Continuous Headroom Margin",
    calculation: "1,430 Watts * 1.25 Continuous Headroom = 1,788 Watts Continuous Rating",
    explanation:
      "Operating inverters near 100% capacity continuously causes thermal throttling and reduces operating efficiency. A 20% to 25% continuous buffer keeps the inverter operating comfortably in its peak efficiency curve.",
  },
  {
    stepNumber: 4,
    title: "Select Commercial Inverter Size Bracket",
    calculation: "Next standard commercial bracket >= 1,788W Continuous & >= 2,480W Surge -> 2,000 Watt Inverter (4,000W Peak Surge)",
    explanation:
      "Commercial inverters are sold in standard wattage ratings. A 2,000W pure sine wave inverter provides 2,000W continuous output and typically handles up to 4,000W momentary surge.",
  },
  {
    stepNumber: 5,
    title: "Calculate Battery DC Current Draw & Cable Sizing (24V System)",
    calculation: "Continuous: 1,430W / (24V * 0.90) = 66.2A DC | Max Rated: 2,000W / (24V * 0.90) = 92.6A DC",
    explanation:
      "At 24V DC, continuous draw is 66.2A. Sizing for full 2,000W rated capacity (92.6A * 1.25 fuse factor = 115.8A) illustrates a typical 125A DC fuse and minimum 2 AWG pure copper battery cables for short runs under 6ft total loop.",
  },
];

const ASSUMPTIONS: AssumptionItem[] = [
  {
    parameter: "Continuous Headroom Buffer",
    defaultVal: "25% (1.25 multiplier)",
    realisticRange: "15% to 35%",
    impact:
      "Prevents running the inverter near thermal throttling thresholds and accommodates minor load fluctuations as a practical design margin, not a hard electrical law.",
  },
  {
    parameter: "Single-Largest-Surge Rule",
    defaultVal: "Largest active motor inrush",
    realisticRange: "2x to 8x running watts",
    impact:
      "Models typical non-coincident motor startup. If multiple inductive loads can cycle on concurrently (such as a well pump and compressor), their combined surge must be evaluated.",
  },
  {
    parameter: "Inverter Conversion Efficiency",
    defaultVal: "90% (0.90)",
    realisticRange: "85% to 95%",
    impact:
      "Accounts for internal DC-to-AC conversion thermal losses and magnetic transformer resistance.",
  },
  {
    parameter: "DC Cable Sizing Metric",
    defaultVal: "NEC 75C/90C Ampacity (<6ft loop estimate)",
    realisticRange: "8 AWG to Parallel 4/0 AWG",
    impact:
      "Preliminary illustrative estimate for short (<6ft total loop) copper conductors at <=2% voltage drop. Longer runs, conduit fill, or specific insulation ratings require custom voltage drop calculations.",
  },
  {
    parameter: "Battery Safe C-Rate Limits",
    defaultVal: "0.5C (LiFePO4) / 0.2C (Lead-Acid) Benchmark",
    realisticRange: "0.1C to 1.0C",
    impact:
      "Illustrative benchmark limits to mitigate severe voltage sag. Actual continuous discharge limits are determined by manufacturer battery and BMS specifications.",
  },
];

export const InverterSizeCalculator: React.FC = () => {
  const [selectedAppliances, setSelectedAppliances] = useState<SelectedInverterAppliance[]>(
    INITIAL_SELECTED_APPLIANCES
  );
  const [systemVoltage, setSystemVoltage] = useState<InverterSystemVoltage>(12);
  const [inverterEfficiency, setInverterEfficiency] = useState<number>(0.90);
  const [continuousHeadroom, setContinuousHeadroom] = useState<number>(1.25);
  const [batteryChemistry, setBatteryChemistry] = useState<BatteryChemistry>("lifepo4");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);

  // Custom appliance state
  const [customName, setCustomName] = useState<string>("");
  const [customRunning, setCustomRunning] = useState<string>("");
  const [customStarting, setCustomStarting] = useState<string>("");

  const calculationResult = useMemo(() => {
    return calculateInverterSize({
      appliances: selectedAppliances,
      systemVoltage,
      inverterEfficiency,
      continuousHeadroom,
      batteryChemistry,
    });
  }, [
    selectedAppliances,
    systemVoltage,
    inverterEfficiency,
    continuousHeadroom,
    batteryChemistry,
  ]);

  const handleReset = () => {
    setSelectedAppliances(INITIAL_SELECTED_APPLIANCES);
    setSystemVoltage(12);
    setInverterEfficiency(0.90);
    setContinuousHeadroom(1.25);
    setBatteryChemistry("lifepo4");
    setCategoryFilter("all");
    setCustomName("");
    setCustomRunning("");
    setCustomStarting("");
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setSelectedAppliances((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddPreset = (preset: (typeof INVERTER_PRESET_APPLIANCES)[0]) => {
    setSelectedAppliances((prev) => {
      const existing = prev.find((item) => item.id === preset.id);
      if (existing) {
        return prev.map((item) =>
          item.id === preset.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: preset.id,
          name: preset.name,
          category: preset.category,
          quantity: 1,
          runningWatts: preset.defaultRunningWatts,
          startingWatts: preset.defaultStartingWatts,
        },
      ];
    });
  };

  const handleAddCustomAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    const runWatts = Number(customRunning);
    if (!customName.trim() || isNaN(runWatts) || runWatts <= 0) return;

    const startWatts = Number(customStarting);
    const finalStart = !isNaN(startWatts) && startWatts >= runWatts ? startWatts : runWatts;

    const newItem: SelectedInverterAppliance = {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      category: "other",
      quantity: 1,
      runningWatts: runWatts,
      startingWatts: finalStart,
      isCustom: true,
    };

    setSelectedAppliances((prev) => [...prev, newItem]);
    setCustomName("");
    setCustomRunning("");
    setCustomStarting("");
  };

  const filteredPresets = useMemo(() => {
    if (categoryFilter === "all") return INVERTER_PRESET_APPLIANCES;
    return INVERTER_PRESET_APPLIANCES.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <CalculatorShell
      title="Inverter Size Calculator"
      badge="Engineering Sizing Tool"
      category="Power Inverters & DC Sizing"
      description="Calculate continuous and peak surge inverter wattage, DC battery current draw, cable gauge (AWG), and fuse sizing across 12V, 24V, and 48V battery systems."
      lastUpdated="October 2026"
      onReset={handleReset}
      inputSection={
        <div className="space-y-6">
          {/* Step 1: System DC Voltage Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Battery Bank System Voltage (DC)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {([12, 24, 48] as InverterSystemVoltage[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSystemVoltage(v)}
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition flex flex-col items-center justify-center gap-1 ${
                    systemVoltage === v
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                  aria-pressed={systemVoltage === v}
                >
                  <span className="text-base">{v}V DC</span>
                  <span
                    className={`text-[11px] font-medium ${
                      systemVoltage === v ? "text-white" : "text-slate-600"
                    }`}
                  >
                    {v === 12 ? "Mobile / RV" : v === 24 ? "Cabin / Solar" : "Home / High Load"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Active Loads Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Active Electrical Loads ({selectedAppliances.length} Selected)
              </label>
              {selectedAppliances.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedAppliances([])}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition"
                >
                  Clear All
                </button>
              )}
            </div>

            {selectedAppliances.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500">
                No active appliances selected. Add presets below or enter a custom appliance to calculate inverter requirements.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                {selectedAppliances.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 sm:p-4 flex items-center justify-between gap-3 bg-white"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900 text-sm truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                        <span>Running: <strong className="text-slate-700">{item.runningWatts}W</strong></span>
                        {item.startingWatts > item.runningWatts && (
                          <span>Surge: <strong className="text-amber-800">{item.startingWatts}W</strong></span>
                        )}
                        <span>Total: <strong className="text-blue-600">{item.runningWatts * item.quantity}W</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center transition"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center transition"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAppliances((prev) => prev.filter((x) => x.id !== item.id))}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition ml-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 3: Add Appliance Presets */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Add Standard US Appliances
              </label>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: "all", label: "All" },
                { id: "kitchen", label: "Kitchen" },
                { id: "electronics", label: "Electronics" },
                { id: "pumps", label: "Pumps" },
                { id: "tools", label: "Tools" },
                { id: "hvac", label: "HVAC" },
                { id: "medical", label: "Medical" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    categoryFilter === cat.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Preset items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {filteredPresets.map((preset) => {
                const isSelected = selectedAppliances.some((x) => x.id === preset.id);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleAddPreset(preset)}
                    className={`text-left p-2.5 rounded-xl border transition flex items-center justify-between gap-2 ${
                      isSelected
                        ? "bg-blue-50/50 border-blue-200 hover:border-blue-300"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {preset.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {preset.defaultRunningWatts}W
                        {preset.hasMotorSurge && (
                          <span className="text-amber-800 ml-1">
                            ({preset.defaultStartingWatts}W surge)
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 p-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Appliance Form */}
          <form
            onSubmit={handleAddCustomAppliance}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs"
          >
            <div className="font-semibold text-slate-800">Add Custom Appliance</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label
                  htmlFor="custom-appliance-name"
                  className="block text-[11px] font-medium text-slate-600 mb-0.5"
                >
                  Appliance Name
                </label>
                <input
                  id="custom-appliance-name"
                  name="custom-appliance-name"
                  type="text"
                  placeholder="e.g. Sump Pump"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="custom-running-watts"
                  className="block text-[11px] font-medium text-slate-600 mb-0.5"
                >
                  Running Watts
                </label>
                <input
                  id="custom-running-watts"
                  name="custom-running-watts"
                  type="number"
                  placeholder="e.g. 800"
                  value={customRunning}
                  onChange={(e) => setCustomRunning(e.target.value)}
                  min="1"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="custom-starting-watts"
                  className="block text-[11px] font-medium text-slate-600 mb-0.5"
                >
                  Surge Watts
                </label>
                <input
                  id="custom-starting-watts"
                  name="custom-starting-watts"
                  type="number"
                  placeholder="e.g. 2100"
                  value={customStarting}
                  onChange={(e) => setCustomStarting(e.target.value)}
                  min="1"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!customName.trim() || !customRunning}
              className="w-full py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 disabled:opacity-50 transition"
            >
              Add Custom Load
            </button>
          </form>

          {/* Advanced Electrical Parameters Accordion */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-slate-700 transition"
              aria-expanded={isAdvancedOpen}
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-500" />
                <span>Advanced Inverter &amp; Battery Settings</span>
              </div>
              {isAdvancedOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {isAdvancedOpen && (
              <div className="p-4 bg-white space-y-4 border-t border-slate-200 text-xs">
                {/* Continuous Headroom Factor */}
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Continuous Planning Headroom:</span>
                    <span className="font-mono text-blue-600">
                      {Math.round((continuousHeadroom - 1) * 100)}% Safety Margin ({continuousHeadroom}x)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.10"
                    max="1.50"
                    step="0.05"
                    value={continuousHeadroom}
                    onChange={(e) => setContinuousHeadroom(Number(e.target.value))}
                    className="w-full accent-blue-600"
                    aria-label="Continuous headroom factor"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Recommended 25% safety buffer prevents running inverters at 100% capacity continuously.
                  </p>
                </div>

                {/* Inverter Efficiency */}
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Inverter Conversion Efficiency:</span>
                    <span className="font-mono text-blue-600">
                      {Math.round(inverterEfficiency * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.80"
                    max="0.96"
                    step="0.01"
                    value={inverterEfficiency}
                    onChange={(e) => setInverterEfficiency(Number(e.target.value))}
                    className="w-full accent-blue-600"
                    aria-label="Inverter efficiency percentage"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    High-grade pure sine wave inverters typically test between 88% and 94% efficiency under moderate loads.
                  </p>
                </div>

                {/* Battery Chemistry */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Battery Bank Chemistry:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBatteryChemistry("lifepo4")}
                      className={`py-2 px-3 rounded-lg font-semibold border transition text-center ${
                        batteryChemistry === "lifepo4"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      LiFePO4 (0.5C Continuous)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBatteryChemistry("lead_acid")}
                      className={`py-2 px-3 rounded-lg font-semibold border transition text-center ${
                        batteryChemistry === "lead_acid"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      Lead-Acid / AGM (0.2C Safe)
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Lead-acid chemistry suffers severe Peukert capacity loss if discharged faster than 0.2C rate.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      }
      resultSection={
        <div className="space-y-6">
          {/* Main Sizing Result Card */}
          <ResultCard
            primaryTitle="Recommended Inverter Size"
            primaryValue={
              calculationResult.suggestedInverterRatingWatts > 0
                ? `${calculationResult.suggestedInverterRatingWatts.toLocaleString()} W`
                : "0 W"
            }
            primarySubtext={`Next standard commercial bracket (Minimum ${calculationResult.recommendedContinuousWatts}W continuous with ${calculationResult.suggestedInverterSurgeRatingWatts.toLocaleString()}W peak surge headroom)`}
            icon="zap"
            stats={[
              {
                label: "Continuous Running Load",
                value: calculationResult.totalRunningWatts.toLocaleString(),
                unit: "Watts AC",
              },
              {
                label: "Peak Starting Surge",
                value: calculationResult.peakSurgeWatts.toLocaleString(),
                unit: "Watts AC",
                subtext: calculationResult.surgeDriverName
                  ? `Driven by ${calculationResult.surgeDriverName}`
                  : "No inductive motor surge",
              },
              {
                label: `Continuous DC Draw (${systemVoltage}V)`,
                value: calculationResult.continuousDcCurrentAmps,
                unit: "Amps DC",
                subtext: `At ${Math.round(inverterEfficiency * 100)}% inverter efficiency`,
              },
              {
                label: "Max Full-Load Current",
                value: calculationResult.maxRatedDcCurrentAmps,
                unit: "Amps DC",
                subtext: `At full ${calculationResult.suggestedInverterRatingWatts}W rating`,
              },
              {
                label: "Estimated DC Fuse",
                value: `${calculationResult.recommendedFuseAmps} A`,
                subtext: "Illustrative estimate (125% of rated load; verify manual)",
              },
              {
                label: "Estimated Cable Gauge",
                value: calculationResult.recommendedCableGauge,
                subtext: "Short-run estimate (<6ft loop; verify voltage drop)",
              },
              {
                label: "Benchmark Battery Capacity",
                value: `${calculationResult.recommendedMinBatteryCapacityAh} Ah`,
                subtext: `Benchmark discharge estimate (${batteryChemistry === "lifepo4" ? "0.5C" : "0.2C"})`,
              },
              {
                label: "Waveform Type",
                value: "Pure Sine Wave",
                subtext: "Recommended for sensitive electronics & motors",
              },
            ]}
          />

          {/* High Voltage Alert & Guidance */}
          {calculationResult.voltageOptimizationNotice && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Voltage Stepping Recommendation</span>
              </div>
              <p>{calculationResult.voltageOptimizationNotice}</p>
            </div>
          )}

          {/* Pure Sine Wave Recommendation Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Cpu className="w-4 h-4" />
              <span>Inverter Technology Recommendation</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {calculationResult.inverterTypeRecommendation}
            </p>
          </div>

          {/* Sizing Companion Note */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Next Step: Battery Bank & Solar Sizing</span>
              <p className="text-blue-800 leading-relaxed">
                An inverter only converts DC power to AC power. To size your battery bank capacity in Amp-hours and Watt-hours, use our{" "}
                <Link
                  href="/battery-capacity-calculator"
                  className="font-bold underline text-blue-700 hover:text-blue-900"
                >
                  Battery Capacity Calculator
                </Link>{" "}
                or read our guide on{" "}
                <Link
                  href="/how-many-amp-hours-do-i-need"
                  className="font-bold underline text-blue-700 hover:text-blue-900"
                >
                  how many amp hours you need for a battery bank
                </Link>
                . For solar recharging, use our{" "}
                <Link
                  href="/solar-charge-controller-calculator"
                  className="font-bold underline text-blue-700 hover:text-blue-900"
                >
                  Solar Charge Controller Calculator
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      }
    >
      {/* Supporting Sections */}
      <FormulaSection
        title="Inverter Sizing Mathematical Methodology"
        description="Properly sizing an off-grid or backup inverter requires distinguishing between continuous running wattage, momentary inductive motor startup surge, inverter conversion losses, and battery DC ampacity."
        formulaDisplay="P_continuous = P_running * 1.25 | P_surge = P_running + max(P_start - P_run) | I_DC = P_AC / (V_DC * Efficiency)"
        variables={[
          {
            symbol: "P_running",
            name: "Continuous Running Power",
            unit: "Watts AC",
            description: "The total simultaneous wattage drawn by active appliances during continuous steady-state operation.",
          },
          {
            symbol: "P_surge",
            name: "Peak Starting Surge Power",
            unit: "Watts AC",
            description: "Running wattage plus the single largest motor inrush surge delta from compressors or pumps.",
          },
          {
            symbol: "Headroom",
            name: "Continuous Safety Factor",
            unit: "1.25 (25%)",
            description: "Planning margin to prevent thermal degradation and operating the inverter at full capacity.",
          },
          {
            symbol: "I_DC",
            name: "Battery Bank DC Current",
            unit: "Amperes DC",
            description: "Current drawn from the battery bank, inversely proportional to system voltage and inverter efficiency.",
          },
          {
            symbol: "V_DC",
            name: "Nominal System Voltage",
            unit: "12V, 24V, or 48V",
            description: "DC operating voltage of the connected battery bank.",
          },
          {
            symbol: "I_fuse",
            name: "Estimated DC Fuse (Illustrative)",
            unit: "Amperes (Illustrative)",
            description: "Illustrative planning factor (125% of rated DC continuous load); actual overcurrent protection must comply with inverter manufacturer specifications, conductor ampacity, and AIC interrupt ratings.",
          },
        ]}
      />

      <WorkedExampleSection
        title="Real-World Worked Example: Off-Grid Cabin"
        scenario="A user wants to operate a residential refrigerator (150W run, 1,200W start), a 1,000W output microwave (1,100W run, 1,300W start), a remote workstation (120W), and a CPAP machine (60W) simultaneously on a 24V LiFePO4 battery bank."
        steps={WORKED_STEPS}
        conclusion="A 2,000 Watt commercial pure sine wave inverter (with 4,000W momentary surge rating) on a 24V battery bank handles this entire cabin load with 25% continuous headroom, drawing an estimated 66.2 Amps continuous DC and illustrates pairing with a 125A DC fuse and 2 AWG pure copper cables for short runs under 6ft total loop."
      />

      <AssumptionsSection
        title="Engineering Sizing Assumptions & Variables"
        description="All calculations use transparent, industry-standard engineering benchmarks for electrical distribution, continuous duty ratings, and battery discharge rates."
        assumptions={ASSUMPTIONS}
      />

      <FaqSection
        title="Frequently Asked Questions: Inverter Sizing"
        faqs={INVERTER_FAQS}
      />

      <DisclaimerSection
        title="Electrical Code & Inverter Safety Notice"
        points={[
          "This calculator provides preliminary engineering sizing estimates based on continuous resistive and inductive load assumptions.",
          "High continuous DC currents (especially exceeding 100 Amps on 12V systems) generate substantial thermal dissipation. Loose terminal connections, undersized copper conductors, or missing fuses present extreme fire hazards.",
          "Overcurrent protection (such as Class T, ANL, or MRBF fuses) should be installed on the positive DC cable as close to the battery source as practical. Marine and mobile standards (ABYC E-11) specify placement within 7 inches of the terminal, while stationary installations follow applicable National Electrical Code (NEC Article 706 / NFPA 70) guidelines. Always consult manufacturer manuals for required fuse type, interrupt ratings (AIC), and conductor requirements.",
          "Always verify local building regulations, equipment specifications, and consult a licensed electrician or NABCEP certified professional before installing high-voltage off-grid power systems.",
        ]}
      />

      <RelatedCalculators calculators={RELATED_TOOLS} />
    </CalculatorShell>
  );
};
