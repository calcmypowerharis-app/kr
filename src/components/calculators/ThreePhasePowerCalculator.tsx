"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  calculateThreePhasePower,
  ThreePhaseMode,
  VoltageReference,
  PowerInputUnit,
  THREE_PHASE_VOLTAGE_PRESETS,
  THREE_PHASE_SCENARIOS,
  ThreePhaseScenarioPreset,
  THREE_PHASE_FAQS,
  formatDecimal,
} from "@/lib/calculators/three-phase-power";
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
import { FaqSection, FaqItem } from "@/components/calculators/FaqSection";
import {
  RelatedCalculators,
  RelatedTool,
} from "@/components/calculators/RelatedCalculators";
import {
  Zap,
  Gauge,
  Activity,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";

const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Watts to Amps Electrical Calculator",
    description:
      "Convert real power in Watts to circuit current in Amperes across DC, 120V/240V single-phase, and balanced three-phase systems.",
    href: "/watts-to-amps-calculator",
    category: "Electrical Circuits",
  },
  {
    title: "Amps to Watts Electrical Calculator",
    description:
      "Convert Amps to Watts and Volt-Amperes for DC and AC branch circuits with power factor deratings.",
    href: "/amps-to-watts-calculator",
    category: "Electrical Circuits",
  },
  {
    title: "Voltage Drop Calculator",
    description:
      "Calculate line voltage drop and wire size requirements for single-phase and balanced three-phase AC circuits.",
    href: "/voltage-drop-calculator",
    category: "Electrical Circuits",
  },
  {
    title: "Solar System Size Calculator",
    description:
      "Estimate solar panel count, array kW capacity, and roof space based on monthly electricity consumption.",
    href: "/solar-system-size-calculator",
    category: "Solar PV",
  },
  {
    title: "Solar Battery Sizing Calculator",
    description:
      "Size off-grid and backup battery storage capacity in Amp-hours and Watt-hours for continuous power resilience.",
    href: "/solar-battery-calculator",
    category: "Battery Storage",
  },
  {
    title: "Generator Size Calculator",
    description:
      "Size commercial, jobsite, and home standby generators using running watts and motor starting surge deltas.",
    href: "/generator-size-calculator",
    category: "Power Systems",
  },
];

const ASSUMPTIONS: AssumptionItem[] = [
  {
    parameter: "System Balance",
    defaultVal: "Balanced 3-Phase",
    realisticRange: "0% to 5% Phase Imbalance",
    impact:
      "Assumes identical voltage magnitudes, identical line currents, and 120-degree phase separation across phases A, B, and C.",
  },
  {
    parameter: "Voltage Reference",
    defaultVal: "Line-to-Line (V_LL)",
    realisticRange: "Line-to-Line or Line-to-Neutral",
    impact:
      "Line-to-line uses the √3 multiplier (1.732); line-to-neutral uses the 3.0 multiplier. In a wye system, V_LL = √3 × V_LN.",
  },
  {
    parameter: "Power Factor (cos θ)",
    defaultVal: "0.85 (Motor Standard)",
    realisticRange: "0.70 to 1.00",
    impact:
      "Accounts for phase displacement from inductive motor windings. Unity (1.0) represents purely resistive loads; lower values increase kVA and line current.",
  },
  {
    parameter: "Waveform & Harmonics",
    defaultVal: "Pure Sinusoidal",
    realisticRange: "THD < 5% (IEEE 519)",
    impact:
      "Assumes standard 60 Hz sinusoidal voltage without substantial non-linear harmonic distortion from variable frequency drives.",
  },
];

const WORKED_STEPS: WorkedStep[] = [
  {
    stepNumber: 1,
    title: "Identify Known Electrical Parameters",
    calculation: "V_LL = 480 V, I = 30 A, PF = 0.85",
    explanation:
      "Determine the line-to-line RMS voltage across the three-phase feeders, the measured line current per phase, and the operating power factor from the equipment nameplate.",
  },
  {
    stepNumber: 2,
    title: "Calculate Apparent Power (S)",
    calculation: "S = √3 × 480 V × 30 A = 24,941.53 VA = 24.942 kVA",
    explanation:
      "Apparent power represents the total circuit capacity demanded from the feeder transformer and conductors, regardless of phase angle.",
  },
  {
    stepNumber: 3,
    title: "Calculate Active / Real Power (P)",
    calculation: "P = S × PF = 24,941.53 VA × 0.85 = 21,200.30 W = 21.200 kW",
    explanation:
      "Multiplying apparent power by the 0.85 power factor determines the real active power doing work in the motor or equipment.",
  },
  {
    stepNumber: 4,
    title: "Calculate Reactive Power (Q)",
    calculation: "Q = √(S² - P²) = √(24.942² - 21.200²) = 13.14 kVAR",
    explanation:
      "Reactive power sustains the magnetic field inside the motor windings and circulates between the source and load without producing mechanical work.",
  },
];

export const ThreePhasePowerCalculator: React.FC = () => {
  // Mode: solve_power (calculate kW/kVA from V, I, PF) or solve_current (calculate Amps from kW/kVA)
  const [mode, setMode] = useState<ThreePhaseMode>("solve_power");

  // Voltage Inputs
  const [voltage, setVoltage] = useState<number>(480);
  const [voltageReference, setVoltageReference] = useState<VoltageReference>("line_to_line");
  const [isCustomVoltage, setIsCustomVoltage] = useState<boolean>(false);

  // Mode A Inputs (Solve Power)
  const [currentAmps, setCurrentAmps] = useState<number>(30);

  // Mode B Inputs (Solve Current)
  const [powerValue, setPowerValue] = useState<number>(25);
  const [powerUnit, setPowerUnit] = useState<PowerInputUnit>("kW");

  // Power Factor Input
  const [powerFactor, setPowerFactor] = useState<number>(0.85);

  // Motor Helper (optional mechanical shaft power illustration)
  const [showMotorHelper, setShowMotorHelper] = useState<boolean>(false);
  const [motorHp, setMotorHp] = useState<number>(20);
  const [motorEfficiency, setMotorEfficiency] = useState<number>(90);

  // Active Preset ID
  const [activeScenarioId, setActiveScenarioId] = useState<string>("");

  // Calculate results
  const result = useMemo(() => {
    return calculateThreePhasePower({
      mode,
      voltage,
      voltageReference,
      currentAmps: mode === "solve_power" ? currentAmps : undefined,
      powerValue: mode === "solve_current" ? powerValue : undefined,
      powerUnit,
      powerFactor,
    });
  }, [mode, voltage, voltageReference, currentAmps, powerValue, powerUnit, powerFactor]);

  // Handle Preset selection
  const handleSelectScenario = (sc: ThreePhaseScenarioPreset) => {
    setActiveScenarioId(sc.id);
    setMode("solve_power");
    setVoltage(sc.voltage);
    setVoltageReference(sc.voltageReference);
    setCurrentAmps(sc.currentAmps);
    setPowerFactor(sc.powerFactor);
    setIsCustomVoltage(false);
  };

  // Handle Voltage Preset
  const handleSelectVoltagePreset = (val: number, ref: VoltageReference) => {
    setVoltage(val);
    setVoltageReference(ref);
    setIsCustomVoltage(false);
    setActiveScenarioId("");
  };

  // Apply motor helper values to calculator inputs
  const handleApplyMotorInput = () => {
    const mechanicalWatts = motorHp * 745.7;
    const electricalWatts = mechanicalWatts / (motorEfficiency / 100);
    const electricalKw = electricalWatts / 1000;

    if (mode === "solve_current") {
      setPowerValue(parseFloat(electricalKw.toFixed(2)));
      setPowerUnit("kW");
    } else {
      // In solve_power mode, estimate required amps at current voltage & PF
      const mult = voltageReference === "line_to_line" ? Math.sqrt(3) : 3;
      const estimatedAmps = electricalWatts / (mult * voltage * powerFactor);
      setCurrentAmps(parseFloat(estimatedAmps.toFixed(1)));
    }
  };

  const handleReset = () => {
    setMode("solve_power");
    setVoltage(480);
    setVoltageReference("line_to_line");
    setCurrentAmps(30);
    setPowerValue(25);
    setPowerUnit("kW");
    setPowerFactor(0.85);
    setIsCustomVoltage(false);
    setActiveScenarioId("");
    setShowMotorHelper(false);
  };

  return (
    <CalculatorShell
      title="Three Phase Power Calculator"
      badge="Electrical Engineering Tool"
      category="Electrical"
      lastUpdated="October 2026"
      description="Calculate real power (kW), apparent power (kVA), reactive power (kVAR), and line current (Amps) for balanced three-phase electrical circuits. Supports line-to-line and line-to-neutral measurements."
      onReset={handleReset}
      inputSection={
        <div className="space-y-6">
          {/* Mode Switcher */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Calculation Mode
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setMode("solve_power")}
                className={`py-2 px-3 text-xs md:text-sm font-semibold rounded-lg transition text-center ${
                  mode === "solve_power"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Solve for Power (kW &amp; kVA)
              </button>
              <button
                type="button"
                onClick={() => setMode("solve_current")}
                className={`py-2 px-3 text-xs md:text-sm font-semibold rounded-lg transition text-center ${
                  mode === "solve_current"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Solve for Current (Amps)
              </button>
            </div>
          </div>

          {/* Scenario Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Common 3-Phase Equipment Presets
              </p>
              {activeScenarioId && (
                <button
                  type="button"
                  onClick={() => setActiveScenarioId("")}
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Clear preset
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {THREE_PHASE_SCENARIOS.map((sc) => {
                const isActive = activeScenarioId === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleSelectScenario(sc)}
                    className={`p-2.5 text-left rounded-xl border transition flex flex-col justify-between ${
                      isActive
                        ? "bg-blue-50/80 border-blue-500 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{sc.name}</span>
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {sc.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">
                      {sc.voltage}V | {sc.currentAmps}A | PF {sc.powerFactor}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Voltage Selection Section */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                System Voltage &amp; Reference
              </label>
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setVoltageReference("line_to_line")}
                  className={`px-2 py-1 rounded text-xs font-medium transition ${
                    voltageReference === "line_to_line"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Line-to-Line (V_LL)
                </button>
                <button
                  type="button"
                  onClick={() => setVoltageReference("line_to_neutral")}
                  className={`px-2 py-1 rounded text-xs font-medium transition ${
                    voltageReference === "line_to_neutral"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Line-to-Neutral (V_LN)
                </button>
              </div>
            </div>

            {/* Quick Voltage Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {THREE_PHASE_VOLTAGE_PRESETS.filter(
                (p) => p.reference === voltageReference
              ).map((preset) => {
                const isSelected = !isCustomVoltage && voltage === preset.value;
                return (
                  <button
                    key={`${preset.value}-${preset.reference}`}
                    type="button"
                    onClick={() => handleSelectVoltagePreset(preset.value, preset.reference)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {preset.value}V
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setIsCustomVoltage(true)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition ${
                  isCustomVoltage
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Custom Voltage
              </button>
            </div>

            {/* Voltage numeric input */}
            <InputField
              id="voltage"
              label={`Operating Voltage (${voltageReference === "line_to_line" ? "Line-to-Line RMS" : "Line-to-Neutral RMS"})`}
              value={voltage}
              onChange={(val) => {
                setVoltage(val);
                setIsCustomVoltage(true);
                setActiveScenarioId("");
              }}
              unit="Volts (V)"
              min={1}
              max={15000}
              step={1}
              helpText={
                voltageReference === "line_to_line"
                  ? "Standard US commercial voltages: 208V, 240V, 480V, 600V (phase-to-phase)."
                  : "Line-to-neutral voltage on a wye transformer secondary (e.g. 120V on 208V wye, 277V on 480V wye)."
              }
              required
            />
          </div>

          {/* Mode-Specific Inputs */}
          {mode === "solve_power" ? (
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <InputField
                id="currentAmps"
                label="Line Current"
                value={currentAmps}
                onChange={(val) => {
                  setCurrentAmps(val);
                  setActiveScenarioId("");
                }}
                unit="Amperes (A)"
                min={0}
                max={5000}
                step={0.1}
                helpText="Operating current measured on any single phase conductor in a balanced system."
                required
              />
            </div>
          ) : (
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div className="sm:col-span-2">
                  <InputField
                    id="powerValue"
                    label="Target 3-Phase Power"
                    value={powerValue}
                    onChange={(val) => {
                      setPowerValue(val);
                      setActiveScenarioId("");
                    }}
                    unit={powerUnit}
                    min={0.1}
                    max={1000000}
                    step={0.1}
                    helpText="Total three-phase power rating of the load."
                    required
                  />
                </div>
                <div>
                  <SelectField
                    id="powerUnit"
                    label="Power Unit"
                    value={powerUnit}
                    options={[
                      { value: "kW", label: "kW (Active)" },
                      { value: "W", label: "Watts (Active)" },
                      { value: "kVA", label: "kVA (Apparent)" },
                      { value: "VA", label: "VA (Apparent)" },
                    ]}
                    onChange={(val) => setPowerUnit(val as PowerInputUnit)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Power Factor Section */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label htmlFor="powerFactor" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Power Factor (cos θ)
              </label>
              <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {powerFactor.toFixed(2)}
              </span>
            </div>

            <input
              id="powerFactor"
              type="range"
              min="0.10"
              max="1.00"
              step="0.01"
              value={powerFactor}
              onChange={(e) => {
                setPowerFactor(parseFloat(e.target.value));
                setActiveScenarioId("");
              }}
              className="w-full accent-blue-600 cursor-pointer"
            />

            {/* Quick PF helper buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "1.00 (Resistive / Heaters)", val: 1.0 },
                { label: "0.90 (Commercial HVAC)", val: 0.9 },
                { label: "0.85 (Induction Motors)", val: 0.85 },
                { label: "0.80 (Uncorrected Plant)", val: 0.8 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setPowerFactor(item.val);
                    setActiveScenarioId("");
                  }}
                  className={`text-[11px] px-2 py-1 rounded border transition ${
                    powerFactor === item.val
                      ? "bg-blue-50 border-blue-400 text-blue-700 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Ratio of active real power (kW) to apparent power (kVA). Pure resistive loads have PF = 1.0; AC motors typically operate between 0.80 and 0.90.
            </p>
          </div>

          {/* Motor Shaft HP Helper Accordion */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowMotorHelper(!showMotorHelper)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between transition text-xs font-semibold text-slate-800"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>3-Phase Electric Motor Power Sizing Helper</span>
              </div>
              <span className="text-blue-600 text-xs font-medium">
                {showMotorHelper ? "Hide" : "Show"}
              </span>
            </button>

            {showMotorHelper && (
              <div className="p-4 mt-2 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-3 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  Electric motor nameplates specify <strong>mechanical output horsepower (HP)</strong> at the shaft, not electrical input draw. To calculate line current, convert shaft power to electrical input power using motor efficiency:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField
                    id="motorHp"
                    label="Motor Nameplate Output"
                    value={motorHp}
                    onChange={setMotorHp}
                    unit="Horsepower (HP)"
                    min={0.5}
                    max={500}
                    step={0.5}
                    required
                  />
                  <InputField
                    id="motorEfficiency"
                    label="Motor Efficiency (η)"
                    value={motorEfficiency}
                    onChange={setMotorEfficiency}
                    unit="%"
                    min={50}
                    max={98}
                    step={1}
                    helpText="Typical NEMA Premium efficiency is 88% to 95%."
                    required
                  />
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-200 space-y-1">
                  <div className="flex justify-between text-slate-700">
                    <span>Shaft Mechanical Power:</span>
                    <span className="font-mono font-bold">
                      {formatDecimal((motorHp * 0.7457), 2)} kW ({formatDecimal(motorHp * 745.7, 0)} W)
                    </span>
                  </div>
                  <div className="flex justify-between text-blue-900 font-semibold">
                    <span>Electrical Input Draw:</span>
                    <span className="font-mono font-bold">
                      {formatDecimal((motorHp * 0.7457) / (motorEfficiency / 100), 2)} kW
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleApplyMotorInput}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-center"
                >
                  Apply Motor Electrical Input to Calculator
                </button>
              </div>
            )}
          </div>
        </div>
      }
      resultSection={
        <div className="space-y-6">
          {/* Validation Errors */}
          {result.errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-sm">
                <AlertTriangle className="w-4 h-4 text-red-600" /> Input Required
              </div>
              <ul className="list-disc list-inside">
                {result.errors.map((e, idx) => (
                  <li key={idx}>{e.message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Primary Result Banner using ResultCard */}
          {mode === "solve_power" ? (
            <ResultCard
              icon="zap"
              primaryTitle="Calculated Three-Phase Real Power"
              primaryValue={result.isValid ? `${result.formattedRealPowerKw} kW` : "--"}
              primarySubtext={
                result.isValid
                  ? `${result.formattedRealPowerWatts} Watts at ${voltage}V (${voltageReference === "line_to_line" ? "V_LL" : "V_LN"}) with PF ${result.powerFactor.toFixed(2)}`
                  : "Awaiting valid electrical inputs"
              }
              stats={[
                {
                  label: "Apparent Power",
                  value: result.isValid ? `${result.formattedApparentPowerKva} kVA` : "--",
                  subtext: `${result.formattedApparentPowerVa} VA total demand (S)`,
                },
                {
                  label: "Reactive Power",
                  value: result.isValid ? `${result.formattedReactivePowerKvar} kVAR` : "--",
                  subtext: "Magnetizing field (Q)",
                },
                {
                  label: "Operating Line Current",
                  value: result.isValid ? `${result.formattedLineCurrentAmps} A` : "--",
                  subtext: "Per-phase line current",
                },
                {
                  label: "Line-to-Line Voltage",
                  value: result.isValid ? `${formatDecimal(result.vLineToLine, 1)} V` : "--",
                  subtext: "Phase-to-phase potential",
                },
                {
                  label: "Line-to-Neutral Voltage",
                  value: result.isValid ? `${formatDecimal(result.vLineToNeutral, 1)} V` : "--",
                  subtext: "Phase-to-neutral potential",
                },
                {
                  label: "Power Factor",
                  value: result.isValid ? result.powerFactor.toFixed(2) : "--",
                  subtext: "cos(θ) ratio",
                },
              ]}
            />
          ) : (
            <ResultCard
              icon="zap"
              primaryTitle="Calculated Operating Line Current"
              primaryValue={result.isValid ? `${result.formattedLineCurrentAmps} A` : "--"}
              primarySubtext={
                result.isValid
                  ? `Balanced across Phases A, B, and C at ${voltage}V (${voltageReference === "line_to_line" ? "V_LL" : "V_LN"})`
                  : "Awaiting valid electrical inputs"
              }
              stats={[
                {
                  label: "Active Real Power",
                  value: result.isValid ? `${result.formattedRealPowerKw} kW` : "--",
                  subtext: `${result.formattedRealPowerWatts} Watts (P)`,
                },
                {
                  label: "Apparent Demand",
                  value: result.isValid ? `${result.formattedApparentPowerKva} kVA` : "--",
                  subtext: `${result.formattedApparentPowerVa} VA capacity (S)`,
                },
                {
                  label: "Reactive Power",
                  value: result.isValid ? `${result.formattedReactivePowerKvar} kVAR` : "--",
                  subtext: "Magnetizing field (Q)",
                },
                {
                  label: "Line-to-Line Voltage",
                  value: result.isValid ? `${formatDecimal(result.vLineToLine, 1)} V` : "--",
                  subtext: "Phase-to-phase potential",
                },
                {
                  label: "Line-to-Neutral Voltage",
                  value: result.isValid ? `${formatDecimal(result.vLineToNeutral, 1)} V` : "--",
                  subtext: "Phase-to-neutral potential",
                },
                {
                  label: "Applied Power Factor",
                  value: result.isValid ? result.powerFactor.toFixed(2) : "--",
                  subtext: "cos(θ) ratio",
                },
              ]}
            />
          )}

          {/* Supporting Electrical Metrics Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-600" />
              Polyphase System Metrics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Line Current</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {result.formattedLineCurrentAmps} A
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Line Voltage (V_LL)</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {formatDecimal(result.vLineToLine, 1)} V
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Neutral Voltage (V_LN)</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {formatDecimal(result.vLineToNeutral, 1)} V
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Reactive (Q)</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {result.formattedReactivePowerKvar} kVAR
                </span>
              </div>
            </div>
          </div>

          {/* Power Triangle Visual Breakdown */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Power Triangle Relationship
              </span>
              <span className="text-xs font-semibold text-slate-500">
                PF = {result.powerFactor.toFixed(2)}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Active Real Power (kW doing physical work)</span>
                <span className="font-mono font-bold text-blue-600">
                  {result.formattedRealPowerKw} kW ({Math.round(result.powerFactor * 100)}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden flex">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(1, result.powerFactor * 100))}%` }}
                />
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, (1 - result.powerFactor) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                <span>Total Demand: {result.formattedApparentPowerKva} kVA</span>
                <span>Reactive Magnetizing: {result.formattedReactivePowerKvar} kVAR</span>
              </div>
            </div>
          </div>

          {/* Formula Steps Breakdown */}
          <div className="bg-slate-900 text-slate-200 rounded-xl p-4 space-y-2 border border-slate-800">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
              <span>Step-by-Step Mathematical Calculation</span>
              <span className="text-emerald-400 font-mono">Balanced 3Φ</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              {result.formulaSteps.map((step, idx) => (
                <div key={idx} className="p-1.5 bg-slate-800/80 rounded border border-slate-700/60 text-slate-200">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Advisories */}
          {result.warnings.length > 0 && (
            <div className="space-y-2">
              {result.warnings.map((w, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{w}</p>
                </div>
              ))}
            </div>
          )}

          {/* Contextual Amazon Hardware Reference Card (Secondary) */}
          <div className="bg-slate-50/60 rounded-xl border border-slate-200/80 p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                <span>Diagnostic Instrumentation</span>
              </div>
              <span className="text-[10px] text-slate-400">Amazon Associate</span>
            </div>

            <p className="text-slate-500 leading-normal">
              Field test equipment for 3-phase phase balancing, motor rotation, and power quality analysis:
            </p>

            <div className="space-y-2.5">
              <a
                href={getAmazonSearchUrl("three phase power quality analyzer clamp meter")}
                target="_blank"
                rel={AMAZON_LINK_REL}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    3-Phase Power Quality Analyzers &amp; Clamp Meters
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Simultaneous True-RMS voltage, line current, power factor, and harmonic distortion
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
              </a>

              <a
                href={getAmazonSearchUrl("three phase motor rotation indicator tester")}
                target="_blank"
                rel={AMAZON_LINK_REL}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    Motor &amp; Phase Rotation Testers
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Verify clockwise / counterclockwise phase sequence before energizing commercial motors
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
              </a>
            </div>

            <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/70">
              As an Amazon Associate, CalcMyPower earns from qualifying purchases.
            </p>
          </div>
        </div>
      }
    >
      {/* Editorial Content Below Shell */}
      <div className="space-y-10 mt-12">
        {/* Technical Overview Diagram / Photo */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <Image
                src="/images/calculators/three-phase-power-calculator.webp"
                alt="Commercial three phase electrical power distribution panel with digital kW kVA meter and L1 L2 L3 busbars"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
            <p className="text-xs text-slate-500 text-center italic">
              Three-phase distribution panel showing insulated phase conductors (L1, L2, L3) and multi-function digital power metering for commercial active (kW) and apparent (kVA) power measurement.
            </p>
          </div>
        </section>

        {/* Calculation Methodology & Formula */}
        <FormulaSection
          title="Three-Phase Power Calculation Methodology"
          formulaDisplay="P = √3 × V_LL × I × PF   |   S = √3 × V_LL × I   |   I = P ÷ (√3 × V_LL × PF)"
          description="In three-phase alternating current circuits, power is supplied by three alternating voltages separated by 120 electrical degrees. Calculating total power requires accounting for line-to-line vs line-to-neutral voltage references and the load power factor."
          variables={[
            {
              symbol: "P",
              name: "Real / Active Power",
              unit: "Watts (W) or Kilowatts (kW)",
              description: "The portion of electrical power that performs useful physical work, heat, or light.",
            },
            {
              symbol: "S",
              name: "Apparent Power",
              unit: "Volt-Amperes (VA) or kVA",
              description: "The product of RMS voltage and current; represents total capacity required of transformers and cables.",
            },
            {
              symbol: "Q",
              name: "Reactive Power",
              unit: "Volt-Amperes Reactive (VAR)",
              description: "Power that sustains alternating magnetic fields in inductive loads like motors and transformers.",
            },
            {
              symbol: "V_LL",
              name: "Line-to-Line Voltage",
              unit: "Volts (V)",
              description: "RMS potential measured between any two ungrounded phase conductors (e.g., 208V, 240V, 480V, 600V).",
            },
            {
              symbol: "V_LN",
              name: "Line-to-Neutral Voltage",
              unit: "Volts (V)",
              description: "RMS potential measured between any single phase conductor and the neutral point (V_LL ÷ √3).",
            },
            {
              symbol: "I",
              name: "Line Current",
              unit: "Amperes (A)",
              description: "Current flowing through each ungrounded line conductor in a balanced three-phase system.",
            },
            {
              symbol: "PF",
              name: "Power Factor",
              unit: "cos(θ)",
              description: "Ratio of real power to apparent power (kW ÷ kVA), representing the phase angle between voltage and current.",
            },
            {
              symbol: "√3",
              name: "Phase Multiplier Constant",
              unit: "≈ 1.73205",
              description: "Mathematical constant derived from the trigonometric 120-degree vector separation of three-phase sine waves.",
            },
          ]}
          notes={[
            "Line-to-Line vs Line-to-Neutral: P = √3 × V_LL × I × PF is mathematically identical to P = 3 × V_LN × I × PF because V_LL = √3 × V_LN.",
            "Wye (Y) vs Delta (Δ): In a balanced Wye circuit, line current equals phase current (I_line = I_phase). In a balanced Delta circuit, line current is √3 times the phase current (I_line = √3 × I_phase). The line formulas on this page use measured line current directly.",
          ]}
        />

        {/* Worked Example */}
        <WorkedExampleSection
          title="Step-by-Step Worked Example: 480V Industrial Motor"
          scenario="An industrial facility operates a balanced 480V three-phase induction motor drawing 30 Amps per phase with a measured power factor of 0.85. Calculate the real power (kW), apparent power (kVA), reactive power (kVAR), and determine the current draw if power factor increases to 0.95."
          steps={WORKED_STEPS}
          conclusion="Operating at 0.85 PF requires 24.94 kVA of transformer and line capacity to deliver 21.20 kW of work. If power factor correction capacitors raise the power factor to 0.95, the same 21.20 kW load draws only 22.32 kVA and 26.85 Amps, reducing feeder thermal loading and utility reactive demand charges."
        />

        {/* Assumptions & Real-World Variables */}
        <AssumptionsSection
          title="Three-Phase Engineering Assumptions & Limitations"
          description="Standard electrical equations assume ideal laboratory conditions. Real-world commercial and industrial installations encounter system unbalance, harmonic distortion, and thermal resistance."
          assumptions={ASSUMPTIONS}
        />

        {/* FAQs */}
        <FaqSection
          title="Frequently Asked Questions About 3-Phase Power"
          faqs={THREE_PHASE_FAQS}
        />

        {/* Safety & Compliance Disclaimer */}
        <DisclaimerSection
          title="Electrical Engineering & Installation Safety Disclaimer"
          points={[
            "This calculator provides theoretical calculations for preliminary planning, estimation, and educational purposes based on balanced, steady-state sinusoidal AC systems.",
            "Real-world installations are subject to phase unbalance, voltage harmonics from non-linear loads, ambient temperature deratings, and conductor resistance losses under the National Electrical Code (NEC).",
            "Sizing branch circuits, feeder conductors, overcurrent protection devices (circuit breakers or fuses), motor starters, and disconnect switches requires full compliance with NFPA 70 (NEC Articles 210, 215, 250, 430) and local jurisdictional codes.",
            "Always consult a licensed electrician or qualified professional electrical engineer before performing physical wiring, servicing switchgear, or modifying industrial power distribution systems.",
          ]}
        />

        {/* Related Tools */}
        <RelatedCalculators calculators={RELATED_TOOLS} />
      </div>
    </CalculatorShell>
  );
};
