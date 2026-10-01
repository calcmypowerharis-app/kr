"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  calculateVoltageDrop,
  CircuitType,
  ConductorMaterial,
  WIRE_SPECS_TABLE_8,
  VOLTAGE_PRESETS,
  CIRCUIT_TYPE_OPTIONS,
  VOLTAGE_DROP_DEFAULTS,
  VOLTAGE_DROP_FAQS,
  formatVolts,
  formatPercent,
  formatOhms,
} from "@/lib/calculators/voltage-drop";
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
import { VoltageDropFlowDiagram } from "@/components/calculators/VoltageDropFlowDiagram";
import {
  Zap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight,
} from "lucide-react";

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
      "Calculate real power (W) and apparent power (VA) from circuit amperage and voltage for DC and AC equipment.",
    href: "/amps-to-watts-calculator",
    category: "Electrical Circuits",
  },
  {
    title: "Solar Battery Sizing Calculator",
    description:
      "Size off-grid and backup battery storage capacity in Amp-hours and Watt-hours based on daily energy consumption.",
    href: "/solar-battery-calculator",
    category: "Battery Storage",
  },
  {
    title: "Solar Charge Controller Calculator",
    description:
      "Determine MPPT and PWM controller sizing based on PV array wattage, battery bus voltage, and cold-weather open-circuit voltage.",
    href: "/solar-charge-controller-calculator",
    category: "Solar PV",
  },
  {
    title: "Solar Panels in Series vs Parallel Guide",
    description:
      "Learn how series and parallel solar panel wiring affects circuit voltage, current, wire size, and line losses.",
    href: "/solar-panels-series-vs-parallel",
    category: "Solar Engineering Guide",
  },
  {
    title: "Solar System Size Calculator",
    description:
      "Calculate the solar system size in kW and approximate panel count required to power your home based on monthly kWh electricity consumption.",
    href: "/solar-system-size-calculator",
    category: "Solar PV",
  },
];

export const VoltageDropCalculator: React.FC = () => {
  // Inputs
  const [circuitType, setCircuitType] = useState<CircuitType>(VOLTAGE_DROP_DEFAULTS.circuitType);
  const [sourceVoltage, setSourceVoltage] = useState<number>(VOLTAGE_DROP_DEFAULTS.sourceVoltage);
  const [isCustomVoltage, setIsCustomVoltage] = useState<boolean>(false);
  const [currentAmps, setCurrentAmps] = useState<number>(VOLTAGE_DROP_DEFAULTS.currentAmps);
  const [distanceFeet, setDistanceFeet] = useState<number>(VOLTAGE_DROP_DEFAULTS.distanceFeet);
  const [conductorMaterial, setConductorMaterial] = useState<ConductorMaterial>(VOLTAGE_DROP_DEFAULTS.conductorMaterial);
  const [wireSizeId, setWireSizeId] = useState<string>(VOLTAGE_DROP_DEFAULTS.wireSizeId);
  const [targetThresholdPercent, setTargetThresholdPercent] = useState<number>(3.0);

  // Calculation Result
  const result = useMemo(() => {
    return calculateVoltageDrop({
      circuitType,
      sourceVoltage,
      currentAmps,
      distanceFeet,
      conductorMaterial,
      wireSizeId,
      targetThresholdPercent,
    });
  }, [
    circuitType,
    sourceVoltage,
    currentAmps,
    distanceFeet,
    conductorMaterial,
    wireSizeId,
    targetThresholdPercent,
  ]);

  const handleReset = () => {
    setCircuitType(VOLTAGE_DROP_DEFAULTS.circuitType);
    setSourceVoltage(VOLTAGE_DROP_DEFAULTS.sourceVoltage);
    setIsCustomVoltage(false);
    setCurrentAmps(VOLTAGE_DROP_DEFAULTS.currentAmps);
    setDistanceFeet(VOLTAGE_DROP_DEFAULTS.distanceFeet);
    setConductorMaterial(VOLTAGE_DROP_DEFAULTS.conductorMaterial);
    setWireSizeId(VOLTAGE_DROP_DEFAULTS.wireSizeId);
    setTargetThresholdPercent(3.0);
  };

  const handleVoltagePresetSelect = (voltageVal: number) => {
    setSourceVoltage(voltageVal);
    setIsCustomVoltage(false);
  };

  const wireOptions = useMemo(() => {
    return WIRE_SPECS_TABLE_8.map((spec) => {
      const res = conductorMaterial === "copper" ? spec.copperResistance75C : spec.aluminumResistance75C;
      return {
        value: spec.id,
        label: `${spec.name} (${res} Ω / 1k ft @ 75°C)`,
      };
    });
  }, [conductorMaterial]);

  // Worked Example steps for single-phase 120V 16A 75ft 12 AWG Cu
  const workedSteps: WorkedStep[] = [
    {
      stepNumber: 1,
      title: "Identify Circuit Multiplier and Conductor Resistance",
      calculation: "Multiplier = 2 (Two-wire AC circuit) | R = 1.98 Ω per 1,000 ft (12 AWG Cu at 75°C)",
      explanation:
        "Single-phase circuits require current to flow through both the ungrounded conductor and the return neutral. From NEC Chapter 9 Table 8, 12 AWG stranded copper has an internal direct-current resistance of 1.98 Ohms per 1,000 feet at 75°C.",
    },
    {
      stepNumber: 2,
      title: "Calculate Total Circuit Loop Resistance",
      calculation: "R_loop = 2 × (75 ft ÷ 1,000) × 1.98 Ω = 0.2970 Ohms",
      explanation:
        "Multiplying one-way distance in thousands of feet by the circuit multiplier and conductor resistance gives the combined loop resistance for the complete electrical circuit.",
    },
    {
      stepNumber: 3,
      title: "Calculate Voltage Drop in Volts",
      calculation: "VD = 16 Amps × 0.2970 Ohms = 4.752 Volts",
      explanation:
        "By Ohm's Law, current flowing through circuit loop resistance causes a potential drop of 4.752 Volts between the breaker panel and the load.",
    },
    {
      stepNumber: 4,
      title: "Calculate Percentage Voltage Drop",
      calculation: "VD% = (4.752 V ÷ 120 V) × 100 = 3.96%",
      explanation:
        "Dividing voltage loss by the nominal supply voltage shows a 3.96% drop, which exceeds the commonly referenced 3% branch circuit threshold.",
    },
    {
      stepNumber: 5,
      title: "Calculate Net Receiving Voltage at Connected Equipment",
      calculation: "V_load = 120 V - 4.752 V = 115.248 Volts (approx 115.25 V)",
      explanation:
        "The connected equipment receives 115.25 Volts at its terminals under steady 16-Amp operating current.",
    },
  ];

  const assumptions: AssumptionItem[] = [
    {
      parameter: "Conductor Resistance Baseline",
      defaultVal: "NEC Chapter 9 Table 8 (75°C Stranded)",
      realisticRange: "Standard trade AWG / kcmil sizes",
      impact:
        "Calculations use stranded copper and aluminum resistance values from NEC Chapter 9 Table 8 at a 75°C (167°F) reference temperature. Operating conductors at lower temperatures (such as 25°C or 60°C) exhibits slightly lower resistance, while elevated ambient temperatures increase resistance.",
    },
    {
      parameter: "Circuit Multiplier & Return Path",
      defaultVal: "2 for DC & 1-Phase AC | √3 (1.732) for 3-Phase AC",
      realisticRange: "Two-wire complete loop or balanced 3-phase line-to-line",
      impact:
        "DC and single-phase calculations automatically account for outgoing and return conductors using a factor of 2. Balanced three-phase calculations use the line-to-line multiplier of √3 under the assumption of balanced phase currents.",
    },
    {
      parameter: "Mathematical Model Scope",
      defaultVal: "Resistance-Based Direct-Current & AC Model",
      realisticRange: "Unity power factor / direct-current resistance",
      impact:
        "This version implements a pure resistance-based model. AC inductive reactance (NEC Chapter 9 Table 9) and load power factor can cause additional voltage drop in large conductors (such as 1/0 and larger) and long commercial conduits.",
    },
    {
      parameter: "Comparison Threshold",
      defaultVal: "3% (User Configurable)",
      realisticRange: "1% to 5% typical planning ranges",
      impact:
        "The 3% and 5% values reflect common engineering guidelines and NEC informational notes for reasonable efficiency. They do not constitute universal mandatory code limits.",
    },
  ];

  return (
    <CalculatorShell
      title="Voltage Drop Calculator"
      badge="AC & DC Conductor Sizing"
      description="Calculate voltage drop for DC, single-phase, and balanced three-phase circuits. Determine voltage loss, percentage drop, receiving voltage, and evaluate adjacent wire sizes."
      category="Electrical Circuits"
      lastUpdated="October 2026"
      onReset={handleReset}
      inputSection={
        <div className="space-y-6">
          {/* Input 1: Circuit Type */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Circuit Type</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CIRCUIT_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCircuitType(opt.id)}
                  className={`p-3 rounded-xl border text-left transition text-xs flex flex-col justify-between ${
                    circuitType === opt.id
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span className="font-semibold text-sm mb-1">{opt.label}</span>
                  <span className="text-slate-500 text-[11px] leading-tight">
                    {opt.id === "ac_three_phase" ? "Multiplier √3 (approx 1.732)" : "Multiplier 2 (complete loop)"}
                  </span>
                </button>
              ))}
            </div>
            {circuitType === "ac_three_phase" && (
              <p className="text-xs text-blue-700 bg-blue-50/70 p-2 rounded-lg border border-blue-100 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                Balanced three-phase, resistance-based calculation for line-to-line voltage drop.
              </p>
            )}
          </div>

          {/* Input 2: Source Voltage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">
                Source / System Voltage (Volts)
              </span>
              <button
                type="button"
                onClick={() => setIsCustomVoltage(!isCustomVoltage)}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                {isCustomVoltage ? "Choose Preset" : "Enter Custom Voltage"}
              </button>
            </div>

            {!isCustomVoltage ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {VOLTAGE_PRESETS.map((preset) => {
                  const isSelected = !isCustomVoltage && sourceVoltage === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => handleVoltagePresetSelect(preset.value)}
                      className={`p-2.5 rounded-xl border text-left transition text-xs ${
                        isSelected
                          ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="font-semibold text-sm">{preset.value}V</div>
                      <div className="text-[10px] text-slate-500 truncate">{preset.label.split("(")[1]?.replace(")", "") || ""}</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <InputField
                id="source-voltage-input"
                label="Custom Source Voltage (V)"
                value={sourceVoltage}
                onChange={(val) => setSourceVoltage(val)}
                min={1}
                max={5000}
                step={1}
                unit="Volts"
                helpText="Nominal source or supply voltage measured at the upstream breaker panel or power source."
              />
            )}
          </div>

          {/* Input 3 & 4: Load Current and Distance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="load-current-input"
              label="Load Current (Amps)"
              value={currentAmps}
              onChange={(val) => setCurrentAmps(val)}
              min={0.1}
              max={1000}
              step={0.5}
              unit="Amps"
              helpText="Operating continuous or peak load current carried through the circuit conductors."
            />

            <div>
              <InputField
                id="distance-input"
                label="One-Way Circuit Distance (Feet)"
                value={distanceFeet}
                onChange={(val) => setDistanceFeet(val)}
                min={1}
                max={5000}
                step={5}
                unit="Feet"
                helpText="Enter one-way distance. The calculator accounts for the return path automatically."
              />
            </div>
          </div>

          {/* Notice on Distance */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Distance Notice: </span>
              Enter one-way distance. The calculator accounts for the return path automatically. Do not manually double your measurement.
            </div>
          </div>

          {/* Input 5: Conductor Material */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Conductor Material</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConductorMaterial("copper")}
                className={`p-3 rounded-xl border text-left transition text-xs ${
                  conductorMaterial === "copper"
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="font-semibold text-sm">Copper (Cu)</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Higher conductivity, lower resistance per gauge.</div>
              </button>
              <button
                type="button"
                onClick={() => setConductorMaterial("aluminum")}
                className={`p-3 rounded-xl border text-left transition text-xs ${
                  conductorMaterial === "aluminum"
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="font-semibold text-sm">Aluminum (Al)</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Economical for long feeders, requires larger gauge.</div>
              </button>
            </div>
          </div>

          {/* Input 6: Wire Size */}
          <SelectField
            id="wire-size-select"
            label="Conductor Wire Size (AWG / kcmil)"
            value={wireSizeId}
            onChange={(val) => setWireSizeId(val)}
            options={wireOptions}
            helpText="Standard AWG and kcmil conductor sizes with 75°C stranded direct-current resistance from NEC Chapter 9 Table 8."
          />

          {/* Input 7: Comparison Threshold */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">
                Selected Comparison Threshold
              </span>
              <div className="flex gap-1.5">
                {[2.0, 3.0, 5.0].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTargetThresholdPercent(t)}
                    className={`px-2 py-0.5 text-xs font-semibold rounded ${
                      targetThresholdPercent === t
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>
            <InputField
              id="comparison-threshold-input"
              label="Comparison Threshold Target (%)"
              value={targetThresholdPercent}
              onChange={(val) => setTargetThresholdPercent(val)}
              min={0.5}
              max={25}
              step={0.5}
              unit="%"
              helpText="Selected comparison threshold used for visual evaluation. Commonly 3% for branch circuits and 5% for combined runs. This is an engineering comparison target, not a universal code mandate."
            />
          </div>
        </div>
      }
      resultSection={
        <div className="space-y-5">
          {/* Main Primary Result Card */}
          <ResultCard
            icon="zap"
            primaryTitle="Calculated Voltage Drop"
            primaryValue={`${formatVolts(result.voltageDropVolts)} V`}
            primarySubtext={`${formatPercent(result.voltageDropPercent)}% potential drop of ${sourceVoltage}V source over ${distanceFeet} ft one-way`}
            stats={[
              {
                label: "Voltage at Load",
                value: `${formatVolts(result.receivingVoltageVolts)} V`,
                subtext: "Available terminal voltage",
              },
              {
                label: "Voltage Drop %",
                value: `${formatPercent(result.voltageDropPercent)}%`,
                subtext: `Target: ≤ ${targetThresholdPercent}%`,
              },
              {
                label: "Total Loop Resistance",
                value: `${formatOhms(result.loopResistanceOhms)} Ω`,
                subtext: `${result.circuitMultiplier === 2 ? "2-wire loop" : "3-phase equivalent"} @ 75°C`,
              },
              {
                label: "Conductor Resistance",
                value: `${result.conductorResistance75C} Ω`,
                subtext: "Per 1,000 ft @ 75°C stranded",
              },
            ]}
          />

          {/* Threshold Comparison Status Badge */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              result.isWithinThreshold
                ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                : "bg-amber-50/80 border-amber-200 text-amber-950"
            }`}
          >
            {result.isWithinThreshold ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-sm">
                {result.thresholdStatusText} ({targetThresholdPercent}%)
              </div>
              <p className="text-xs mt-0.5 leading-relaxed text-slate-700">
                {result.isWithinThreshold ? (
                  <>
                    At the selected inputs, {result.wireName} calculates at or below the selected {targetThresholdPercent}% voltage-drop comparison threshold.
                  </>
                ) : (
                  <>
                    Calculated drop of {formatPercent(result.voltageDropPercent)}% exceeds your selected {targetThresholdPercent}% comparison target. Review the adjacent wire sizes below to compare larger conductors.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Calculation Basis Disclosures */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Calculation Baseline & Parameters</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] pt-1 border-t border-slate-200">
              <div>
                <span className="text-slate-500">Resistance Basis:</span>{" "}
                <span className="font-medium text-slate-800">75°C stranded (NEC Ch. 9 Tbl 8)</span>
              </div>
              <div>
                <span className="text-slate-500">Distance Mode:</span>{" "}
                <span className="font-medium text-slate-800">One-way + automatic return path</span>
              </div>
              <div>
                <span className="text-slate-500">Conductor R:</span>{" "}
                <span className="font-mono text-slate-800">{result.conductorResistance75C} Ω / 1k ft</span>
              </div>
              <div>
                <span className="text-slate-500">Multiplier:</span>{" "}
                <span className="font-medium text-slate-800">
                  {result.circuitType === "ac_three_phase" ? "√3 (approx 1.732)" : "2 (complete loop)"}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Adjacent Wire Comparison Table */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Conductor Comparison Table
              </h4>
              <span className="text-[11px] text-slate-500">
                Target: ≤ {targetThresholdPercent}%
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <th className="py-2.5 px-3">Wire Size</th>
                    <th className="py-2.5 px-2">R (Ω/1k ft)</th>
                    <th className="py-2.5 px-2">Voltage Drop</th>
                    <th className="py-2.5 px-2">Drop %</th>
                    <th className="py-2.5 px-2">Load Voltage</th>
                    <th className="py-2.5 px-3 text-right">Comparison</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {result.comparisonRows.map((row) => (
                    <tr
                      key={row.wireSizeId}
                      className={`transition ${
                        row.isSelectedWire
                          ? "bg-blue-50/80 font-bold text-blue-950"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <td className="py-2 px-3 font-sans flex items-center gap-1.5">
                        {row.isSelectedWire && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                        )}
                        <span>{row.wireName}</span>
                        {row.isSelectedWire && (
                          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider ml-1">
                            (Selected)
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-2 text-slate-500">{row.resistancePer1000Ft}</td>
                      <td className="py-2 px-2 font-sans font-semibold">
                        {formatVolts(row.voltageDropVolts)} V
                      </td>
                      <td className="py-2 px-2 font-sans font-semibold">
                        <span
                          className={
                            row.isWithinThreshold
                              ? "text-emerald-700"
                              : "text-amber-700"
                          }
                        >
                          {formatPercent(row.voltageDropPercent)}%
                        </span>
                      </td>
                      <td className="py-2 px-2 text-slate-600 font-sans">
                        {formatVolts(row.receivingVoltageVolts)} V
                      </td>
                      <td className="py-2 px-3 text-right font-sans">
                        {row.isWithinThreshold ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            ≤ {targetThresholdPercent}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            &gt; {targetThresholdPercent}%
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              At the selected inputs, wire sizes marked with green calculate at or below the selected voltage-drop comparison threshold.
            </p>

            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Critical Engineering Boundary:</span>
              <span>
                Voltage-drop analysis does NOT replace conductor ampacity verification, overcurrent protection sizing, insulation temperature ratings (60°C, 75°C, 90°C), ambient temperature derating, conduit fill adjustments, terminal lug compatibility, or local electrical code compliance. Always verify conductor ampacity under NEC Section 310.16 prior to physical installation.
              </span>
            </div>
          </div>
        </div>
      }
    >
      {/* Featured Visual Asset: Electrical Conductor & Distribution System */}
      <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
        <Image
          src="/images/calculators/voltage-drop-circuit-system.webp"
          alt="Commercial electrical panel with heavy AWG copper conductors connected to terminal lugs and circuit breakers with digital multimeter measuring line voltage."
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800">Figure 1: Conductor Routing & Voltage Drop Architecture: </span>
          Heavy-gauge electrical conductors routed through distribution panels. As current flows over extended circuit lengths, conductor internal resistance reduces voltage available at downstream electrical loads.
        </div>
      </div>

      {/* Supporting Technical Flow Diagram */}
      <VoltageDropFlowDiagram
        circuitType={circuitType}
        sourceVoltage={sourceVoltage}
        currentAmps={currentAmps}
        distanceFeet={distanceFeet}
        conductorMaterial={conductorMaterial}
        wireName={result.wireName}
        voltageDropVolts={result.voltageDropVolts}
        voltageDropPercent={result.voltageDropPercent}
        receivingVoltageVolts={result.receivingVoltageVolts}
        loopResistanceOhms={result.loopResistanceOhms}
        isWithinThreshold={result.isWithinThreshold}
        targetThresholdPercent={targetThresholdPercent}
      />

      {/* Deep Editorial Engineering Guide */}
      <section className="my-10 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
            Understanding Voltage Drop in Electrical Circuit Design
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            Voltage drop is the reduction in electrical potential that occurs between a power source and connected electrical equipment as current flows through the internal resistance of circuit conductors. While copper and aluminum are excellent electrical conductors, every physical wire possesses finite internal resistance. In accordance with Ohm&apos;s Law (V = I × R), current traversing this resistance converts electrical energy into heat, reducing the usable terminal voltage available at the receiving end of the circuit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-2">
            <h3 className="text-base font-bold text-slate-900">
              Why Circuit Distance and Load Current Multiply Losses
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Conductor resistance scales directly with physical distance. Running a feeder 150 feet produces exactly three times the resistance of a 50-foot run of identical wire. Simultaneously, voltage drop scales directly with electrical current: running 30 Amps creates three times the voltage drop of running 10 Amps through the exact same conductor. When long distances combine with high currents, voltage loss can degrade motor performance, dim lighting, trigger electronic power supply lockouts, or cause excessive line heating.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-2">
            <h3 className="text-base font-bold text-slate-900">
              One-Way Physical Distance vs Complete Return Path
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              In field installations, electricians measure the one-way linear distance from the panel to the equipment. However, electrical current requires a complete closed circuit to flow. In two-wire direct current and single-phase alternating current circuits, current travels out along the supply wire and returns through the neutral or return conductor. The mathematical formula applies a multiplier of 2 to account for both legs of the circuit automatically.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Three-Phase Balanced Circuits and the √3 Multiplier
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            In balanced three-phase alternating current systems, current in each phase conductor is 120 degrees out of phase with the others. Because the balanced vector sum of phase currents at the neutral point equals zero, neutral conductors in balanced three-phase systems carry zero net return current. The line-to-line voltage drop between any two phase conductors is determined by multiplying phase current by the line-to-line multiplier of √3 (approximately 1.73205), rather than the factor of 2 applied in single-phase circuits.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Conductor Material: Copper vs Aluminum Resistance
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Electrolytic tough pitch copper features an electrical resistivity of approximately 1.68 × 10⁻⁸ Ω·m, whereas aluminum electrical conductors present an electrical resistivity of approximately 2.82 × 10⁻⁸ Ω·m at standard reference temperatures. Under identical American Wire Gauge sizes, aluminum conductor resistance is roughly 1.6 times higher than copper. Consequently, aluminum circuits typically require stepping up one to two trade wire sizes (for example, using 2 AWG aluminum in place of 4 AWG copper) to maintain equivalent voltage drop and ampacity.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            National Electrical Code (NEC) Informational Notes on Voltage Drop
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            The National Electrical Code (NFPA 70) addresses voltage drop primarily through advisory Informational Notes rather than mandatory blanket rules. Specifically, Informational Note No. 2 to Section 210.19(A) for branch circuits and Section 215.2(A)(1) for feeders suggest that sizing conductors to limit voltage drop to 3% on the furthest branch circuit or feeder, and no more than 5% total across combined feeder and branch circuits, provides reasonable electrical efficiency and proper equipment operation.
          </p>
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs md:text-sm text-amber-950 leading-relaxed">
            <span className="font-bold">Important Code Distinction: </span>
            Commonly cited 3% and 5% values reflect NEC informational notes and good engineering design practice, not universal legal mandates. However, mandatory voltage drop limits do exist in specific code sections, such as Article 695 for fire pump installations. Always consult the locally adopted code edition and governing authority for binding legal requirements.
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Why Voltage Drop Alone Does Not Determine Conductor Ampacity
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Conductor sizing requires satisfying two independent electrical engineering criteria: <strong>ampacity thermal limits</strong> and <strong>voltage drop limits</strong>. Conductor ampacity (governed by NEC Section 310.16) defines the maximum continuous current a conductor is rated to carry without causing its insulation jacket to overheat, melt, or cause a fire. Ambient temperature correction factors and conduit fill adjustments directly derate conductor ampacity. A circuit wire might calculate a negligible 0.5% voltage drop on a short 10-foot run, yet still be completely undersized thermally if the current exceeds the conductor&apos;s allowable ampacity. Both calculations must be satisfied independently.
          </p>
        </div>
      </section>

      {/* Formula & Calculation Methodology */}
      <FormulaSection
        title="Voltage Drop Calculation Formulas"
        description="The mathematical formulas used to calculate circuit loop resistance, voltage drop, percentage loss, and receiving terminal voltage across DC, single-phase, and balanced three-phase systems."
        formulaDisplay="DC & 1-Phase: VD = 2 × I × (L ÷ 1,000) × R | 3-Phase: VD = √3 × I × (L ÷ 1,000) × R | VD% = (VD ÷ V_source) × 100"
        variables={[
          {
            symbol: "I",
            name: "Load Current",
            unit: "Amperes (A)",
            description: "Operating electrical current flowing through the circuit under normal load conditions.",
          },
          {
            symbol: "L",
            name: "One-Way Distance",
            unit: "Feet (ft)",
            description: "One-way physical linear distance from the upstream supply panel or power source to the connected electrical load.",
          },
          {
            symbol: "R",
            name: "Conductor Resistance",
            unit: "Ohms per 1,000 ft (Ω/kft)",
            description: "Direct-current conductor resistance at 75°C stranded baseline obtained from NEC Chapter 9 Table 8.",
          },
          {
            symbol: "V_source",
            name: "Nominal Source Voltage",
            unit: "Volts (V)",
            description: "Nominal electrical system supply voltage measured at the power source or distribution panel.",
          },
          {
            symbol: "Multiplier",
            name: "Circuit Multiplier",
            unit: "Unitless",
            description: "Factor of 2 for two-wire DC and single-phase AC circuits; factor of √3 (approximately 1.732) for balanced three-phase AC circuits.",
          },
        ]}
        notes={[
          "Resistance values reflect stranded conductors at 75°C (167°F) based on NEC Chapter 9 Table 8.",
          "Distances are entered as one-way measurements. The formula accounts for the return conductor path automatically.",
          "Three-phase calculations assume balanced loads across all three phases.",
          "This resistance-based model does not account for AC inductive reactance or load power factors.",
        ]}
      />

      {/* Step-by-Step Worked Example */}
      <WorkedExampleSection
        title="Step-by-Step Worked Example: 120V Single-Phase AC Branch Circuit (16A, 75 ft, 12 AWG Copper)"
        scenario="A dedicated 120V single-phase 20-amp branch circuit supplies a continuous 16-amp workshop power tool located 75 feet away from the main service panel using 12 AWG stranded copper conductors."
        steps={workedSteps}
        conclusion="At 16 Amps over a 75-foot one-way distance, 12 AWG copper produces a 4.752V drop (3.96%), which exceeds the selected 3% comparison threshold. Stepping up to 10 AWG copper (R = 1.24 Ω/kft) reduces voltage drop to 2.976V (2.48%), placing the circuit at or below the 3% target."
      />

      {/* Engineering Assumptions & Variables */}
      <AssumptionsSection
        title="Voltage Drop Sizing Assumptions & Variables"
        description="Core technical assumptions, conductor properties, and mathematical baselines used in the voltage drop calculation engine."
        assumptions={assumptions}
      />

      {/* Frequently Asked Questions */}
      <FaqSection
        title="Voltage Drop Frequently Asked Questions"
        faqs={VOLTAGE_DROP_FAQS}
      />

      {/* Regulatory & Electrical Disclaimers */}
      <DisclaimerSection
        title="Preliminary Planning & Electrical Engineering Disclaimer"
        points={[
          "This calculator provides preliminary electrical calculations based on simplified mathematical models and user-supplied parameters. It does not constitute professional engineering advice, electrical inspection approval, or installation sign-off.",
          "Voltage-drop analysis does not replace conductor ampacity verification, overcurrent protection device sizing, insulation temperature ratings (60°C, 75°C, 90°C), ambient temperature derating, conduit fill adjustments, terminal lug temperature limitations, or local electrical code compliance.",
          "Working on electrical wiring, distribution panels, and high-energy circuits involves substantial risk of electrical shock, arc flash, personal injury, and fire. Always consult a qualified licensed electrician or electrical engineer to verify physical conductor sizing, overcurrent protection, and installation compliance.",
        ]}
      />

      {/* Related Tools & Sizing Guides */}
      <RelatedCalculators
        calculators={RELATED_TOOLS}
      />
    </CalculatorShell>
  );
};
