"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateWattsToAmps,
  ElectricalSystemType,
  ThreePhaseVoltageType,
  COMMON_CIRCUIT_VOLTAGES,
  WATTS_TO_AMPS_PRESETS,
  PresetAppliance,
} from "@/lib/calculators/watts-to-amps";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/ui/ResultCard";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import { WorkedExampleSection } from "@/components/calculators/WorkedExampleSection";
import { AssumptionsSection } from "@/components/calculators/AssumptionsSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { FaqSection } from "@/components/calculators/FaqSection";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import {
  AlertCircle,
  ExternalLink,
  Sliders,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export const WattsToAmpsCalculator: React.FC = () => {
  // Input states with sensible defaults
  const [powerWatts, setPowerWatts] = useState<number>(1200);
  const [voltage, setVoltage] = useState<number>(120);
  const [currentType, setCurrentType] = useState<ElectricalSystemType>("ac_single");
  const [voltageType, setVoltageType] = useState<ThreePhaseVoltageType>("line_to_line");
  const [powerFactor, setPowerFactor] = useState<number>(1.0);

  // Pure calculation
  const results = useMemo(() => {
    return calculateWattsToAmps({
      powerWatts,
      voltage,
      currentType,
      voltageType,
      powerFactor,
    });
  }, [powerWatts, voltage, currentType, voltageType, powerFactor]);

  const handleReset = () => {
    setPowerWatts(1200);
    setVoltage(120);
    setCurrentType("ac_single");
    setVoltageType("line_to_line");
    setPowerFactor(1.0);
  };

  const handlePreset = (preset: PresetAppliance) => {
    setPowerWatts(preset.watts);
    setVoltage(preset.voltage);
    setCurrentType(preset.system);
    setPowerFactor(preset.pf);
  };

  const systemOptions = [
    { value: "ac_single", label: "AC Single-Phase (Residential)" },
    { value: "dc", label: "Direct Current (DC — Solar / Battery)" },
    { value: "ac_three", label: "AC Three-Phase (Commercial)" },
  ];

  const threePhaseOptions = [
    { value: "line_to_line", label: "Line-to-Line (V_LL — 208V, 480V)" },
    { value: "line_to_neutral", label: "Line-to-Neutral (V_LN — 120V, 277V)" },
  ];

  return (
    <CalculatorShell
      title="Watts to Amps Electrical Calculator"
      badge="Electrical & Current Sizing"
      category="Electrical"
      lastUpdated="September 2026"
      description="Convert real electrical power in Watts to current in Amperes (Amps) for Direct Current (DC), Single-Phase AC, and balanced Three-Phase systems with power factor adjustment."
      onReset={handleReset}
      inputSection={
        <div className="space-y-5">
          {/* Presets */}
          <div>
            <p className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Common Load Presets
            </p>
            <div className="flex flex-wrap gap-2">
              {WATTS_TO_AMPS_PRESETS.map((p) => {
                const isActive =
                  powerWatts === p.watts &&
                  voltage === p.voltage &&
                  currentType === p.system;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePreset(p)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Selection */}
          <SelectField
            id="currentType"
            label="Electrical System"
            value={currentType}
            options={systemOptions}
            onChange={(val) => setCurrentType(val as ElectricalSystemType)}
            helpText={
              currentType === "dc"
                ? "DC circuits have no phase shift; power factor is inherently 1.0."
                : currentType === "ac_three"
                ? "Assumes a symmetrical, balanced three-phase commercial or industrial system."
                : "Standard single-phase alternating current found in US residential and light commercial outlets."
            }
          />

          {/* Power Input & Voltage Input (Responsive 2-column grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            <InputField
              id="powerWatts"
              label="Real Power"
              value={powerWatts}
              onChange={setPowerWatts}
              unit="Watts (W)"
              min={0}
              max={500000}
              step={50}
              helpText="Enter the total electrical power consumed by the equipment."
              required
            />

            {/* Voltage Input + Quick Select Buttons */}
            <div className="space-y-2">
              <InputField
                id="voltage"
                label="Operating Voltage"
                value={voltage}
                onChange={setVoltage}
                unit="Volts (V)"
                min={1}
                max={1000}
                step={1}
                helpText="RMS voltage for AC or continuous voltage for DC."
                required
              />

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Select:</span>
                {[12, 24, 48, 120, 208, 240, 277, 480].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVoltage(v)}
                    className={`text-[11px] px-2.5 py-1 rounded border font-mono transition ${
                      voltage === v
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {v}V
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AC Parameters: Three-Phase Reference & Power Factor */}
          {currentType === "ac_three" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
              <SelectField
                id="voltageType"
                label="Three-Phase Voltage Reference"
                value={voltageType}
                options={threePhaseOptions}
                onChange={(val) => setVoltageType(val as ThreePhaseVoltageType)}
                helpText="Line-to-line is measured across two phase legs; line-to-neutral is measured from one phase leg to neutral."
              />
              <InputField
                id="powerFactor"
                label="Power Factor (PF)"
                value={powerFactor}
                onChange={setPowerFactor}
                unit="0.1 – 1.0"
                min={0.1}
                max={1.0}
                step={0.05}
                helpText="Default is 1.0 (pure resistive loads). Enter motor/equipment nameplate PF when available."
              />
            </div>
          ) : currentType !== "dc" ? (
            <InputField
              id="powerFactor"
              label="Power Factor (PF)"
              value={powerFactor}
              onChange={setPowerFactor}
              unit="0.1 – 1.0"
              min={0.1}
              max={1.0}
              step={0.05}
              helpText="Default is 1.0 (pure resistive loads like heaters and incandescent bulbs). When manufacturer equipment documentation specifies a power factor, enter that value."
            />
          ) : null}

          {/* Non-Silent Validation Errors */}
          {results.errors.length > 0 && (
            <div role="alert" aria-live="polite" className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
              <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>Input Validation Notice</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-red-700">
                {results.errors.map((err, idx) => (
                  <li key={idx}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      }
      resultSection={
        <div className="space-y-6">
          <ResultCard
            icon="zap"
            primaryTitle="Calculated Electrical Current"
            primaryValue={results.isValid ? results.formattedCurrent : "--"}
            primarySubtext={
              results.isValid
                ? `Under ${voltage}V ${results.systemLabel}${
                    currentType !== "dc" ? ` (PF: ${powerFactor})` : ""
                  }`
                : "Awaiting valid electrical inputs"
            }
            stats={[
              {
                label: "125% Continuous Reference",
                value: results.isValid ? `${results.continuousLoadRefAmps} A` : "--",
                subtext: "Planning factor for loads running 3+ hrs",
              },
              ...(results.apparentPowerVa !== undefined
                ? [
                    {
                      label: "Apparent Power",
                      value: results.apparentPowerVa,
                      unit: "VA",
                      subtext: "Total circulating power",
                    },
                  ]
                : []),
              {
                label: "Operating Voltage",
                value: `${voltage} V`,
                subtext: results.systemLabel,
              },
              {
                label: "Real Load Power",
                value: `${powerWatts} W`,
                subtext: `${(powerWatts / 1000).toFixed(2)} kW`,
              },
            ]}
            warnings={results.warnings}
          />

          {/* Dedicated Conductor Sizing Callout (Architecture Separation) */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200/90 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Conductor &amp; Wire Sizing Notice</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proper wire gauge cannot be determined by amperage alone. Safe conductor sizing depends on one-way run distance, conductor temperature rating (60°C/75°C/90°C), conduit bundling, and acceptable voltage drop (typically 3%).
            </p>
            <div className="pt-1">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
              >
                <span>More Electrical Calculators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Contextual Amazon Hardware Reference Card (Secondary) */}
          <div className="bg-slate-50/60 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                <span>Diagnostic Gear Reference</span>
              </div>
              <span className="text-[10px] text-slate-400">Amazon Associate</span>
            </div>

            <p className="text-xs text-slate-500 leading-normal">
              Tools for measuring live circuit current and verifying branch-circuit loads:
            </p>

            <div className="space-y-2.5">
              <a
                href="https://www.amazon.com/s?k=digital+clamp+meter+auto+ranging&tag=calcmypower-20"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    Digital AC/DC Clamp Meters
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Non-invasive live amperage measurement without breaking circuits
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
              </a>

              <a
                href="https://www.amazon.com/s?k=circuit+breaker+finder+tool&tag=calcmypower-20"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    Digital Circuit Breaker Finders
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Trace branch circuits directly to panel overcurrent devices
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
      {/* Formula & Methodology Section */}
      <FormulaSection
        formulaDisplay={
          currentType === "dc"
            ? "I = P / V"
            : currentType === "ac_single"
            ? "I = P / ( V × PF )"
            : voltageType === "line_to_line"
            ? "I = P / ( √3 × V_LL × PF )  [Balanced System]"
            : "I = P / ( 3 × V_LN × PF )  [Balanced System]"
        }
        description="The mathematical relationship between electrical power (Watts), potential difference (Volts), and current flow (Amps) is governed by Ohm's law and Joule's law. In alternating current circuits, current also depends on the phase angle between voltage and current waveforms, characterized by the power factor."
        variables={[
          {
            symbol: "I",
            name: "Current",
            unit: "Amperes (A)",
            description: "The volume of electrical charge flowing through the conductor per second.",
          },
          {
            symbol: "P",
            name: "Real Power",
            unit: "Watts (W)",
            description: "The rate at which electrical energy is transformed into actual physical work, heat, or light.",
          },
          {
            symbol: "V",
            name: "Voltage",
            unit: "Volts (V)",
            description: "Potential difference driving current through the circuit (DC voltage or AC RMS voltage).",
          },
          {
            symbol: "PF",
            name: "Power Factor",
            unit: "Decimal (0.1 – 1.0)",
            description: "Ratio of real power (W) to apparent power (VA). Pure resistive devices have a PF of 1.0.",
          },
        ]}
        notes={[
          "Balanced Three-Phase Assumption: Three-phase calculations assume equal current distribution across all three phase conductors.",
          "Power Factor Default: Assumed 1.0 unless equipment nameplate data specifies a reactive power factor.",
          "DC Independence: Direct current has no alternating frequency or inductive reactance, so power factor does not apply.",
        ]}
      />

      {/* Worked Examples Section */}
      <WorkedExampleSection
        title="Verified Worked Calculations"
        scenario="Converting a 1,500W residential portable space heater operating on a standard 120V household branch circuit."
        steps={[
          {
            stepNumber: 1,
            title: "Identify Circuit Parameters",
            calculation: "P = 1,500 Watts, V = 120 Volts AC, PF = 1.0",
            explanation: "Electric space heaters use resistive heating elements with unity power factor (PF = 1.0).",
          },
          {
            stepNumber: 2,
            title: "Apply Single-Phase AC Formula",
            calculation: "I = 1,500 W / (120 V × 1.0) = 12.50 Amperes",
            explanation: "Divide real power by the product of voltage and power factor to find operating line current.",
          },
          {
            stepNumber: 3,
            title: "Continuous-Load Planning Check",
            calculation: "125% Reference = 12.50 A × 1.25 = 15.63 A",
            explanation: "Continuous loads running for 3+ hours require evaluation against the 80% continuous rating of branch breakers. On a 15A breaker, maximum continuous load is 12.0A; 12.5A exceeds this threshold, indicating a 20A branch circuit is required for continuous operation.",
          },
        ]}
        conclusion="The 1,500W space heater draws 12.50 Amperes of operating current. For continuous duty operation, it requires a 20-Amp dedicated branch circuit."
      />

      {/* Assumptions Section */}
      <AssumptionsSection
        title="Physical & Technical Assumptions"
        impactHeader="Effect on Current"
        description="Current conversions depend on phase configuration, power factor, and load duration:"
        assumptions={[
          {
            parameter: "Three-Phase Balance",
            defaultVal: "Balanced (Symmetrical)",
            realisticRange: "98% – 100% balance",
            impact: "Unbalanced commercial three-phase loads produce unequal line currents and carry neutral current.",
          },
          {
            parameter: "Single-Phase Power Factor",
            defaultVal: "1.0 (Unity)",
            realisticRange: "0.75 – 1.0",
            impact: "Lower power factor increases the current (Amps) required to deliver the same real Wattage.",
          },
          {
            parameter: "Continuous Load Factor",
            defaultVal: "125% (1.25)",
            realisticRange: "100% or 125%",
            impact: "Applies to continuous duty loads operating for 3 hours or more per NEC Article 100/210.",
          },
          {
            parameter: "Conductor Resistance",
            defaultVal: "Neglected at Terminals",
            realisticRange: "0 – 5% drop",
            impact: "Voltage drop over long distances reduces terminal voltage and increases current for constant-power loads.",
          },
        ]}
      />

      {/* Safety Disclaimer */}
      <DisclaimerSection
        title="Electrical Code & Safety Disclaimer"
        points={[
          "This calculator provides mathematical current conversions based on user-entered values and does not verify installation safety, breaker compatibility, or conductor ampacity.",
          "Overcurrent protection, circuit breaker sizing, and conductor selection must account for ambient temperature, raceway conductor bundling, termination temperature limits (60°C/75°C/90°C), and local building codes.",
          "Do not determine branch-circuit compliance solely from calculator outputs. Always consult the National Electrical Code (NEC / NFPA 70) and verify critical electrical modifications with a licensed electrician.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        faqs={[
          {
            question: "How do I convert 1,500 Watts to Amps at 120 Volts?",
            answer:
              "In a standard 120V household circuit with a resistive load (power factor = 1.0), divide 1,500 Watts by 120 Volts: Current = 1,500 / 120 = 12.50 Amps. For continuous operation (3 hours or longer), electrical codes limit a 15A circuit to 12.0A (80%). Because 12.5A exceeds 12.0A, a 20A branch circuit is recommended for continuous space heating.",
          },
          {
            question: "Why does 100 Watts produce different Amps on 12V DC compared to 120V AC?",
            answer:
              "Current is inversely proportional to voltage (I = P / V). At 120V AC, 100 Watts requires approximately 0.83 Amps. At 12V DC (automotive or solar battery bank), that same 100 Watts draws 8.33 Amps—ten times more current. Higher current creates more resistance and heat, requiring substantially thicker wire.",
          },
          {
            question: "What is power factor, and when should I change it?",
            answer:
              "Power factor (PF) is the ratio of real power (Watts) to apparent power (Volt-Amperes) in AC circuits. Pure resistive loads (heaters, incandescent lamps) have a PF of 1.0. Inductive devices with electric motors or compressors (refrigerators, air conditioners, power tools) typically have a PF between 0.75 and 0.90. When equipment nameplate data is available, enter that specific value.",
          },
          {
            question: "What does the 125% continuous-load reference mean?",
            answer:
              "The National Electrical Code defines a continuous load as any load where maximum current is expected to continue for 3 hours or more. Standard overcurrent devices are designed to carry continuous loads up to 80% of their rating. To account for this, engineers size protective equipment for at least 125% of the continuous current (I × 1.25).",
          },
          {
            question: "How do you calculate three-phase Watts to Amps?",
            answer:
              "For a balanced three-phase system using line-to-line voltage (V_LL), divide Watts by the product of the square root of 3 (1.732), the line-to-line voltage, and the power factor: I = P / (√3 × V_LL × PF). For example, a 10,000W load at 480V with PF 0.85 draws approximately 14.15 Amps per line.",
          },
        ]}
      />

      {/* Related Calculators */}
      <RelatedCalculators
        calculators={[
          {
            title: "UPS & Battery Backup Run-Time Calculator",
            description: "Determine how long battery backups and UPS systems will power your equipment.",
            href: "/ups-battery-backup-calculator",
            category: "UPS & Battery",
          },
          {
            title: "Generator Size Calculator",
            description: "Calculate required running and starting wattage for portable and standby generators.",
            href: "/generator-size-calculator",
            category: "Generator Sizing",
          },
          {
            title: "More Electrical & Power Calculators",
            description: "Browse all live power, battery backup, and generator sizing tools.",
            href: "/calculators",
            category: "Directory",
          },
        ]}
      />
    </CalculatorShell>
  );
};
