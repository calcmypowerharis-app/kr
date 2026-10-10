"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateWattsToAmps,
  ElectricalSystemType,
  ThreePhaseVoltageType,
  COMMON_CIRCUIT_VOLTAGES,
  WATTS_TO_AMPS_PRESETS,
  WATTS_TO_AMPS_FAQS,
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
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";
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
    { value: "dc", label: "Direct Current (DC - Solar / Battery)" },
    { value: "ac_three", label: "AC Three-Phase (Commercial)" },
  ];

  const threePhaseOptions = [
    { value: "line_to_line", label: "Line-to-Line (V_LL: 208V, 480V)" },
    { value: "line_to_neutral", label: "Line-to-Neutral (V_LN: 120V, 277V)" },
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
                unit="0.1 to 1.0"
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
              unit="0.1 to 1.0"
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

          {/* Sister Tool Callout */}
          <div className="bg-blue-50/70 rounded-2xl border border-blue-200/80 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Dedicated Sister Tool</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Converting known circuit Amperes and voltage back into total Watts or circuit capacity? Use our dedicated reciprocal calculator:
            </p>
            <div>
              <Link
                href="/amps-to-watts-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition"
              >
                <span>Open Amps to Watts Electrical Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

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
              <span className="text-[10px] text-slate-600 font-medium">Amazon Associate</span>
            </div>

            <p className="text-xs text-slate-600 leading-normal">
              Tools for measuring live circuit current and verifying branch-circuit loads:
            </p>

            <div className="space-y-2.5">
              <a
                href={getAmazonSearchUrl("digital clamp meter auto ranging")}
                target="_blank"
                rel={AMAZON_LINK_REL}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    Digital AC/DC Clamp Meters
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Non-invasive live amperage measurement without breaking circuits
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-600 shrink-0 ml-2" />
              </a>

              <a
                href={getAmazonSearchUrl("circuit breaker finder tool")}
                target="_blank"
                rel={AMAZON_LINK_REL}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    Digital Circuit Breaker Finders
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Trace branch circuits directly to panel overcurrent devices
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-600 shrink-0 ml-2" />
              </a>
            </div>

            <p className="text-[10px] text-slate-600 font-medium pt-1 border-t border-slate-200/70">
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
            unit: "Decimal (0.1 to 1.0)",
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
            title: "Evaluate Continuous-Duty Code Sizing (NEC 210.19 / 210.20)",
            calculation: "125% Design Benchmark = 12.50 A × 1.25 = 15.63 A (or 15 A × 0.80 = 12.0 A max continuous)",
            explanation: "Under NEC Section 210.19(A)(1) and 210.20(A), branch circuit conductors and standard non-100%-rated breakers serving continuous loads (running 3 hours or more) are sized for at least 125% of continuous load (limiting continuous duty to 80% of breaker rating). On a standard 15A breaker, continuous load benchmark is 12.0A. Because 12.5A exceeds 12.0A, continuous operation requires a 20A branch circuit, whereas intermittent operation under 3 hours is within the 15A breaker rating.",
          },
        ]}
        conclusion="The 1,500W space heater draws 12.50 Amperes of operating current. Under NEC continuous-duty rules for standard breakers, continuous operation requires a 20-Amp branch circuit."
      />

      {/* Inverter DC Current Draw Section (GSC Query Support) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-7 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Inverter DC Current Draw: Converting AC Watts to DC Battery Amps
            </h3>
            <p className="text-xs text-slate-500">
              How to size 12V, 24V, or 48V battery wiring and fuses for AC loads powered through an inverter.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          When determining how many DC Amps an inverter draws from a battery bank to operate a 120V AC appliance, standard AC formulas (I = P / V) do not account for inversion losses. Power inverters consume energy during conversion (typically operating at 85% to 92% electrical efficiency) and draw ongoing idle tare power.
        </p>

        <div className="bg-slate-900 text-white p-4 rounded-xl font-mono text-xs sm:text-sm space-y-1">
          <div className="text-blue-300 font-bold text-xs">Inverter DC Current Formula:</div>
          <div className="text-emerald-400 font-bold text-sm sm:text-base">
            I_DC ≈ P_AC ÷ ( V_DC × Inverter Efficiency )
          </div>
          <div className="text-slate-300 text-xs pt-1">
            Example: A 1,200W AC microwave powered by a 12V battery bank with a 90% efficient inverter:
          </div>
          <div className="text-white font-semibold text-xs">
            I_DC = 1,200 W ÷ ( 12 V × 0.90 ) = 1,200 ÷ 10.8 = 111.1 Amperes DC
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">12V Battery Bank:</div>
            <div>1,200W AC load draws ~111 Amps DC (requires heavy 2 AWG or 1/0 AWG cabling).</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">24V Battery Bank:</div>
            <div>1,200W AC load draws ~55.6 Amps DC (cuts conductor current and I²R heat in half).</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">48V Battery Bank:</div>
            <div>1,200W AC load draws ~27.8 Amps DC (ideal for whole-home solar battery systems).</div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 leading-normal">
          Note: This is an engineering estimate for battery fuse and cable sizing. Actual draw will vary based on battery state-of-charge (terminal voltage dropping under heavy load) and inverter standby consumption (typically 10W to 30W with zero AC load).
        </p>
      </section>

      {/* Assumptions Section */}
      <AssumptionsSection
        title="Physical & Technical Assumptions"
        impactHeader="Effect on Current"
        description="Current conversions depend on phase configuration, power factor, and load duration:"
        assumptions={[
          {
            parameter: "Three-Phase Balance",
            defaultVal: "Balanced (Symmetrical)",
            realisticRange: "98% to 100% balance",
            impact: "Unbalanced commercial three-phase loads produce unequal line currents and carry neutral current.",
          },
          {
            parameter: "Single-Phase Power Factor",
            defaultVal: "1.0 (Unity)",
            realisticRange: "0.75 to 1.0",
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
            realisticRange: "0 to 5% drop",
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
          "The 125% continuous-load reference represents standard NEC overcurrent design guidance for loads operating 3+ continuous hours on non-100%-rated equipment. It does not replace comprehensive conductor sizing or professional electrical engineering approval.",
          "This calculator provides preliminary educational planning estimates and does not certify code compliance, electrical safety, or regulatory approval. Always consult the National Electrical Code (NEC / NFPA 70) and verify critical electrical modifications with a licensed electrician.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection faqs={WATTS_TO_AMPS_FAQS} />

      {/* Related Calculators */}
      <RelatedCalculators
        calculators={[
          {
            title: "Amps to Watts Electrical Calculator",
            description: "Convert electrical current (Amps) and voltage to real power (Watts) and apparent power (VA).",
            href: "/amps-to-watts-calculator",
            category: "Electrical Circuits",
          },
          {
            title: "Three Phase Power Calculator",
            description: "Dedicated calculator for commercial 3-phase real power (kW), apparent power (kVA), and line current.",
            href: "/three-phase-power-calculator",
            category: "Electrical Circuits",
          },
          {
            title: "Voltage Drop Calculator",
            description: "Calculate circuit voltage drop, percentage loss, and receiving terminal voltage across DC and AC wire runs.",
            href: "/voltage-drop-calculator",
            category: "Electrical Circuits",
          },
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
            title: "What Size Generator to Run a Refrigerator?",
            description: "See how refrigerator nameplate amps and volts translate into running and compressor starting watts.",
            href: "/what-size-generator-to-run-a-refrigerator",
            category: "Sizing Guide",
          },
          {
            title: "How to Calculate Electricity Usage",
            description: "Learn how to calculate appliance consumption, Watt-hours, kWh, and electric bill costs.",
            href: "/how-to-calculate-electricity-usage",
            category: "Energy Guide",
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
