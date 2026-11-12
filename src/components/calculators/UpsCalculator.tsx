"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import {
  calculateUpsRuntime,
  CHEMISTRY_DEFAULTS,
  COMMON_BATTERY_VOLTAGES,
  BatteryChemistry,
} from "@/lib/calculators/ups-runtime";
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
import { ResultHardwareMatchBar } from "@/components/monetization/ResultHardwareMatchBar";

interface PresetAppliance {
  label: string;
  watts: number;
  description: string;
}

const PRESETS: PresetAppliance[] = [
  { label: "Home Office (Laptop + Wi-Fi + Monitor)", watts: 120, description: "Typical laptop and router" },
  { label: "Gaming PC + Monitor", watts: 450, description: "Mid-to-high end rig under load" },
  { label: "Wi-Fi Router & Modem", watts: 30, description: "Network keeping internet alive" },
  { label: "Medical CPAP Machine", watts: 60, description: "Without heated humidifier" },
  { label: "Home Server / NAS Rack", watts: 250, description: "Small 2U server + switches" },
  { label: "Refrigerator (Cycle Average)", watts: 180, description: "Standard modern kitchen fridge" },
];

interface UpsRuntimeRow {
  ratingVa: string;
  ratingWatts: string;
  internalBattery: string;
  router20w: string;
  cpap45w: string;
  workstation100w: string;
  gamingPc350w: string;
}

const UPS_RUNTIME_DATA: UpsRuntimeRow[] = [
  { ratingVa: "450 VA", ratingWatts: "255 W", internalBattery: "1x 12V 5Ah (60 Wh)", router20w: "1 hr 45 min", cpap45w: "40 min", workstation100w: "14 min", gamingPc350w: "Overload" },
  { ratingVa: "600 VA", ratingWatts: "360 W", internalBattery: "1x 12V 7Ah (84 Wh)", router20w: "2 hrs 20 min", cpap45w: "1 hr 0 min", workstation100w: "20 min", gamingPc350w: "4 min" },
  { ratingVa: "850 VA", ratingWatts: "510 W", internalBattery: "1x 12V 9Ah (108 Wh)", router20w: "3 hrs 15 min", cpap45w: "1 hr 20 min", workstation100w: "32 min", gamingPc350w: "7 min" },
  { ratingVa: "1000 VA", ratingWatts: "600 W", internalBattery: "2x 12V 7Ah (168 Wh)", router20w: "5 hrs 0 min", cpap45w: "2 hrs 10 min", workstation100w: "50 min", gamingPc350w: "13 min" },
  { ratingVa: "1350 VA", ratingWatts: "810 W", internalBattery: "2x 12V 7.2Ah (172 Wh)", router20w: "5 hrs 30 min", cpap45w: "2 hrs 25 min", workstation100w: "58 min", gamingPc350w: "16 min" },
  { ratingVa: "1500 VA", ratingWatts: "900 W", internalBattery: "2x 12V 9Ah (216 Wh)", router20w: "7 hrs 0 min", cpap45w: "3 hrs 0 min", workstation100w: "1 hr 18 min", gamingPc350w: "20 min" },
  { ratingVa: "2000 VA", ratingWatts: "1,400 W", internalBattery: "4x 12V 7Ah (336 Wh)", router20w: "11 hrs 0 min", cpap45w: "5 hrs 0 min", workstation100w: "2 hrs 15 min", gamingPc350w: "36 min" },
];


export const UpsCalculator: React.FC = () => {
  // Calculator Input State with realistic defaults
  const [loadWatts, setLoadWatts] = useState<number>(150);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12);
  const [batteryCapacityAh, setBatteryCapacityAh] = useState<number>(100);
  const [batteryChemistry, setBatteryChemistry] = useState<BatteryChemistry>("lifepo4");
  const [inverterEfficiency, setInverterEfficiency] = useState<number>(85);
  const [powerFactor, setPowerFactor] = useState<number>(0.8);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Calculation memoized using pure calculation logic
  const results = useMemo(() => {
    return calculateUpsRuntime({
      loadWatts,
      batteryVoltage,
      batteryCapacityAh,
      batteryChemistry,
      inverterEfficiency: inverterEfficiency / 100,
      powerFactor,
    });
  }, [
    loadWatts,
    batteryVoltage,
    batteryCapacityAh,
    batteryChemistry,
    inverterEfficiency,
    powerFactor,
  ]);

  const handleReset = () => {
    setLoadWatts(150);
    setBatteryVoltage(12);
    setBatteryCapacityAh(100);
    setBatteryChemistry("lifepo4");
    setInverterEfficiency(85);
    setPowerFactor(0.8);
  };

  const chemistryOptions = Object.entries(CHEMISTRY_DEFAULTS).map(([key, item]) => ({
    value: key,
    label: item.name,
    sublabel: `${Math.round(item.defaultDoD * 100)}% DoD`,
  }));

  const voltageOptions = COMMON_BATTERY_VOLTAGES.map((v) => ({
    value: v.toString(),
    label: `${v} Volts (DC)`,
  }));

  const batterySearchLabel =
    batteryChemistry === "lead_acid"
      ? `${batteryVoltage}V ${batteryCapacityAh}Ah Deep-Cycle AGM Batteries`
      : `${batteryVoltage}V ${batteryCapacityAh}Ah Deep-Cycle LiFePO4 Batteries`;

  const batterySearchRaw =
    batteryChemistry === "lead_acid"
      ? `${batteryVoltage}V ${batteryCapacityAh}Ah AGM deep cycle battery`
      : `${batteryVoltage}V ${batteryCapacityAh}Ah LiFePO4 battery`;

  const inverterSearchRaw = `${batteryVoltage}V pure sine wave inverter ${results.recommendedInverterWatts}W`;

  return (
    <CalculatorShell
      title="UPS & Battery Backup Run-Time Calculator"
      badge="Uninterruptible Power Supply Hours"
      category="UPS & Battery"
      calculatorSlug="ups-battery-backup-calculator"
      description="Estimate backup run-time hours for an uninterruptible power supply (UPS), inverter battery bank, or portable power station from appliance wattage, battery voltage, and Amp-hour capacity."
      onReset={handleReset}
      inputSection={
        <div className="space-y-5">
          {/* Quick Preset Selector */}
          <div>
            <p className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Quick Appliance Presets
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setLoadWatts(preset.watts)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                    loadWatts === preset.watts
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {preset.label} ({preset.watts}W)
                </button>
              ))}
            </div>
          </div>

          {/* Primary Inputs */}
          <InputField
            id="loadWatts"
            label="Total Appliance Power / Load"
            value={loadWatts}
            onChange={setLoadWatts}
            unit="Watts (W)"
            min={0}
            max={20000}
            step={10}
            helpText="Enter the total running wattage of all connected devices."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              id="batteryVoltage"
              label="Battery Bank Voltage"
              value={batteryVoltage.toString()}
              options={voltageOptions}
              onChange={(val) => setBatteryVoltage(Number(val))}
              helpText="Most standalone UPS units use 12V or 24V banks."
            />

            <InputField
              id="batteryCapacityAh"
              label="Battery Capacity"
              value={batteryCapacityAh}
              onChange={setBatteryCapacityAh}
              unit="Amp-Hours (Ah)"
              min={1}
              max={2000}
              step={5}
              helpText="Amp-hour (Ah) rating printed on your battery label."
              required
            />
          </div>

          <SelectField
            id="batteryChemistry"
            label="Battery Chemistry & Type"
            value={batteryChemistry}
            options={chemistryOptions}
            onChange={(val) => setBatteryChemistry(val as BatteryChemistry)}
            helpText={CHEMISTRY_DEFAULTS[batteryChemistry]?.description}
          />

          {/* Advanced Accordion Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>{showAdvanced ? "− Hide Advanced Settings" : "+ Show Inverter & Efficiency Settings"}</span>
            </button>
          </div>

          {showAdvanced && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <InputField
                  id="inverterEfficiency"
                  label="Inverter Conversion Efficiency"
                  value={inverterEfficiency}
                  onChange={setInverterEfficiency}
                  unit="%"
                  min={50}
                  max={99}
                  step={1}
                  helpText="Standard modern pure sine wave inverters operate between 85% and 92% efficiency."
                />

                <InputField
                  id="powerFactor"
                  label="Load Power Factor (PF)"
                  value={powerFactor}
                  onChange={setPowerFactor}
                  min={0.5}
                  max={1.0}
                  step={0.05}
                  helpText="Typically 0.8 for computer power supplies and electronic equipment; 1.0 for resistive heating."
                />
              </div>
            </div>
          )}
        </div>
      }
      resultSection={
        <div className="space-y-6">
          <ResultCard
            icon="clock"
            primaryTitle="Estimated Backup Run-Time"
            primaryValue={results.formattedRuntime}
            primarySubtext={`Under continuous ${loadWatts}W load at ${results.usedDoDPercent}% Depth of Discharge`}
            stats={[
              {
                label: "Usable AC Energy",
                value: results.usableWh,
                unit: "Wh",
                subtext: `${results.usableKwh} kWh delivered`,
              },
              {
                label: "Total Stored Capacity",
                value: results.totalStoredWh,
                unit: "Wh",
                subtext: `At ${batteryVoltage}V nominal`,
              },
              {
                label: "DC Current Draw",
                value: results.dcCurrentAmps,
                unit: "Amps (A)",
                subtext: "From battery terminals",
              },
              {
                label: "Min. Recommended Inverter",
                value: results.recommendedInverterWatts,
                unit: "Watts",
                subtext: `${results.recommendedInverterVa} VA (1.25× planning margin)`,
              },
            ]}
            warnings={results.warnings}
            batteryNote={`Calculated using ${results.usedEfficiencyPercent}% inverter efficiency.`}
            hardwareMatchBar={
              <ResultHardwareMatchBar
                calculatorSlug="ups-battery-backup-calculator"
                calculatedValue={loadWatts}
              />
            }
          />
        </div>
      }
    >
      {/* Supporting Content Sections */}
      <FormulaSection
        formulaDisplay="T (Hours) = [ V (Volts) × Ah (Amp-Hours) × DoD (%) × η (%) ] / P (Watts)"
        description="The run-time of an uninterruptible power supply or battery backup depends directly on the total chemical energy stored in the battery bank, the safe discharge limit of the battery chemistry, the DC-to-AC electrical conversion efficiency of the inverter, and the total continuous power draw of the connected devices."
        variables={[
          {
            symbol: "T",
            name: "Run-Time Duration",
            unit: "Hours",
            description: "The estimated period the battery system can sustain continuous AC output before reaching low-voltage cutoff.",
          },
          {
            symbol: "V",
            name: "Nominal Battery Voltage",
            unit: "Volts (V)",
            description: "Operating DC voltage of the battery pack (typically 12V, 24V, or 48V).",
          },
          {
            symbol: "Ah",
            name: "Battery Capacity",
            unit: "Amp-Hours (Ah)",
            description: "The volume of electric charge the battery can deliver over its nominal discharge rating.",
          },
          {
            symbol: "DoD",
            name: "Depth of Discharge",
            unit: "Decimal (0.50-0.90)",
            description: "Safe discharge limit. 50% for standard Lead-Acid/AGM, up to 90% for Lithium Iron Phosphate (LiFePO4).",
          },
          {
            symbol: "η",
            name: "Inverter Efficiency",
            unit: "Decimal (0.80-0.95)",
            description: "Conversion losses when transforming DC battery current into 120V/240V AC power. 85% is typical.",
          },
          {
            symbol: "P",
            name: "Connected Load",
            unit: "Watts (W)",
            description: "Sum of continuous real electrical power drawn by all connected equipment.",
          },
        ]}
        notes={[
          "Peukert's Law: For lead-acid batteries subjected to heavy loads (>0.2C), effective capacity decreases non-linearly.",
          "Quiescent Inverter Draw: Even with no load connected, inverters typically consume 5W to 25W just remaining active.",
        ]}
      />

      <WorkedExampleSection
        scenario="A home office user needs to keep a laptop (65W), dual monitors (50W), and a fiber Wi-Fi router (15W) running during a blackout using a 12V 100Ah LiFePO4 battery bank and an 85% efficient pure sine wave inverter."
        steps={[
          {
            stepNumber: 1,
            title: "Calculate Total Load in Watts",
            calculation: "P = 65W + 50W + 15W = 130 Watts",
            explanation: "Add up the measured or labeled continuous wattage of every device connected to the backup system.",
          },
          {
            stepNumber: 2,
            title: "Calculate Total Stored Energy",
            calculation: "E_total = 12V × 100Ah = 1,200 Watt-hours (Wh)",
            explanation: "Multiply the nominal DC voltage by the battery capacity to find total raw energy.",
          },
          {
            stepNumber: 3,
            title: "Calculate Usable AC Energy Delivered",
            calculation: "E_usable = 1,200 Wh × 0.90 (DoD) × 0.85 (Efficiency) = 918 Wh",
            explanation: "Apply the 90% safe discharge limit for LiFePO4 chemistry and the 85% inverter conversion factor.",
          },
          {
            stepNumber: 4,
            title: "Determine Run-Time Hours",
            calculation: "Runtime = 918 Wh / 130 Watts = 7.06 Hours",
            explanation: "Divide usable Watt-hours by continuous Watts. 7.06 hours equates to approximately 7 hours and 4 minutes.",
          },
        ]}
        conclusion="The 12V 100Ah LiFePO4 system will power the 130W home office workstation continuously for approximately 7 hours and 4 minutes."
      />

      <AssumptionsSection
        impactHeader="Impact on Runtime"
        description="Battery runtime depends on discharge rate, chemistry limits, conversion losses, and ambient temperature:"
        assumptions={[
          {
            parameter: "Lead-Acid Safe DoD",
            defaultVal: "50%",
            realisticRange: "40% - 50%",
            impact: "Discharging lead-acid past 50% causes plate sulfation and permanently shortens lifespan.",
          },
          {
            parameter: "LiFePO4 Safe DoD",
            defaultVal: "90%",
            realisticRange: "80% - 95%",
            impact: "Modern lithium chemistry sustains deep discharges without rapid cycle degradation.",
          },
          {
            parameter: "Inverter Conversion Efficiency",
            defaultVal: "85%",
            realisticRange: "80% - 92%",
            impact: "Lower efficiency inverters lose energy as heat, reducing available operational minutes.",
          },
          {
            parameter: "Ambient Temperature",
            defaultVal: "77°F (25°C)",
            realisticRange: "32°F - 104°F",
            impact: "Freezing temperatures reduce effective chemical capacity of lead-acid by 20-40%.",
          },
        ]}
      />

      <DisclaimerSection />

      {/* Contextual Inverter Sizing Cross-Link */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="font-bold">Need to size your power inverter for battery backup?</span>{" "}
          <span>Verify continuous wattage and motor startup surge headroom with our dedicated tool:</span>
        </div>
        <Link
          href="/inverter-size-calculator"
          className="font-bold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1 shrink-0"
        >
          <span>Inverter Size Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      {/* Master UPS Runtime Lookup Table */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            UPS Runtime Table by Unit Size &amp; Connected Load
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mt-1">
            Estimated backup duration across standard line-interactive consumer and professional UPS units under real-world household and office loads:
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">UPS Capacity</th>
                <th className="py-3 px-4">Max Watts</th>
                <th className="py-3 px-4">Internal Battery</th>
                <th className="py-3 px-4">WiFi Router (20W)</th>
                <th className="py-3 px-4">CPAP (45W)</th>
                <th className="py-3 px-4">Office PC (100W)</th>
                <th className="py-3 px-4">Gaming PC (350W)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {UPS_RUNTIME_DATA.map((row) => (
                <tr key={row.ratingVa} className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-4 font-bold text-slate-900 font-mono">{row.ratingVa}</td>
                  <td className="py-2.5 px-4 font-mono font-medium text-slate-700">{row.ratingWatts}</td>
                  <td className="py-2.5 px-4 text-xs text-slate-500 font-mono">{row.internalBattery}</td>
                  <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">{row.router20w}</td>
                  <td className="py-2.5 px-4 font-mono text-blue-700 font-semibold">{row.cpap45w}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-800 font-medium">{row.workstation100w}</td>
                  <td className="py-2.5 px-4 font-mono text-amber-700 font-semibold">{row.gamingPc350w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Volt-Amps vs Watts Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-3">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <span>Volt-Amps (VA) vs. Real Power (Watts) in UPS Sizing</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          UPS units display capacity in both volt-amps (apparent power) and watts (real power). Computer equipment with active power factor correction operates near unity power factor (0.95 to 0.99).
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Budget UPS units often carry a lower power factor rating between 0.60 and 0.70. A 1,000 VA budget UPS with a 0.60 power factor safely delivers only 600 watts of real power.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Always verify that total connected load wattage never exceeds either the watt rating or the volt-amp rating of the unit.
        </p>
      </section>


      <FaqSection
        faqs={[
          {
            question: "How many hours will a 100Ah battery run an uninterruptible power supply (UPS)?",
            answer:
              "A 12V 100Ah LiFePO4 battery providing 918 usable Watt-hours will run a 100W load for approximately 9.1 hours. A standard lead-acid 100Ah battery with a 50% depth of discharge will run that same 100W load for approximately 5.1 hours.",
          },
          {
            question: "What size inverter do I need for my UPS backup?",
            answer:
              "As a practical planning margin, size your standalone inverter or UPS continuous wattage rating at least 25% above your total continuous load (Continuous Load × 1.25). For example, a 400W continuous load calls for at least a 500W continuous-rated inverter. While NEC branch-circuit rules apply a 125% factor to continuous circuit loads running 3 hours or more, actual UPS and inverter sizing also depends on manufacturer continuous ratings, power factor (VA), and appliance startup surges.",
          },
          {
            question: "Why does my lead-acid UPS battery die faster than the calculator says?",
            answer:
              "Lead-acid batteries suffer from Peukert's effect: the faster you discharge them (high wattage loads), the lower their effective capacity becomes. If you pull a heavy load in under 2 hours, effective capacity can drop by up to 30%.",
          },
          {
            question: "Can I replace standard UPS lead-acid batteries with LiFePO4 batteries?",
            answer:
              "In many consumer UPS units, drop-in replacement 12V LiFePO4 batteries work well if the built-in charging voltage profile is compatible (typically 13.8V float). Verify that the battery's Battery Management System (BMS) can support the maximum discharge current.",
          },
        ]}
      />

      <RelatedCalculators
        calculators={[
          {
            title: "Inverter Size Calculator",
            description: "Calculate continuous wattage and motor startup surge capacity for pure sine wave inverters.",
            href: "/inverter-size-calculator",
            category: "Inverter Sizing",
          },
          {
            title: "Battery Capacity & Sizing Calculator",
            description: "Calculate battery capacity in Wh and Ah, evaluate usable energy across chemistries, and size battery banks for loads.",
            href: "/battery-capacity-calculator",
            category: "Battery Storage",
          },
          {
            title: "How Many Amp Hours Do I Need for a Battery Bank?",
            description: "Calculate required battery bank capacity from daily load watt-hours, system voltage, autonomy, and chemistry depth of discharge.",
            href: "/how-many-amp-hours-do-i-need",
            category: "Sizing Guide",
          },
          {
            title: "How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide",
            description: "Practical runtime estimates for refrigerators, CPAP machines, TVs, and inverters across LiFePO4 and lead-acid batteries.",
            href: "/how-long-will-a-100ah-battery-last",
            category: "Runtime Guide",
          },
          {
            title: "What Is a Watt-Hour (Wh)? Watts vs. Watt-Hours Explained",
            description: "Understand power vs. energy, convert Watts and Amps to Watt-hours, and calculate battery backup duration.",
            href: "/what-is-a-watt-hour",
            category: "Energy Guide",
          },
          {
            title: "What Does Ah Mean on a Battery? Amp-Hours Explained",
            description: "Understand battery charge capacity, convert Ah to Watt-hours, and learn why chemistry and Peukert discharge rates impact usable runtime.",
            href: "/what-does-ah-mean-on-a-battery",
            category: "Battery Guide",
          },
          {
            title: "Watts to Amps Electrical Calculator",
            description: "Convert electrical power to current for DC, single-phase AC, and 3-phase circuits.",
            href: "/watts-to-amps-calculator",
            category: "Electrical",
          },
          {
            title: "Generator Size Calculator",
            description: "Size portable or standby generators for home backup, RV camping, and motor startup surges.",
            href: "/generator-size-calculator",
            category: "Generator Sizing",
          },
          {
            title: "What Size Generator Do I Need for My House?",
            description: "Compare residential outage backup tiers from 3,500W essential circuits to whole-house standby systems.",
            href: "/what-size-generator-do-i-need-for-my-house",
            category: "Sizing Guide",
          },
          {
            title: "More Electrical & Power Calculators",
            description: "Browse all live power, battery backup, and electrical sizing calculators.",
            href: "/calculators",
            category: "Directory",
          },
        ]}
      />
    </CalculatorShell>
  );
};
