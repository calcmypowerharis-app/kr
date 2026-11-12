"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { Zap, BatteryCharging, ShieldAlert, ArrowRight } from "lucide-react";

interface ApplianceSurgeData {
  name: string;
  runningWatts: number;
  surgeWatts: number;
  category: string;
  notes: string;
}

const COMMON_APPLIANCES: ApplianceSurgeData[] = [
  {
    name: "Residential Refrigerator",
    runningWatts: 150,
    surgeWatts: 1200,
    category: "Kitchen & Food",
    notes: "Compressor inrush surge lasts 1 to 3 seconds during start.",
  },
  {
    name: "1/2 HP Deep Well Pump (240V)",
    runningWatts: 1050,
    surgeWatts: 3800,
    category: "Water & Plumbing",
    notes: "Requires 240V generator service and high inductive surge headroom.",
  },
  {
    name: "1/3 HP Submersible Sump Pump",
    runningWatts: 800,
    surgeWatts: 2400,
    category: "Water & Plumbing",
    notes: "Frequent cyclic cycling during heavy stormwater surges.",
  },
  {
    name: "13,500 BTU RV Rooftop Air Conditioner",
    runningWatts: 1550,
    surgeWatts: 3300,
    category: "HVAC & Cooling",
    notes: "Locked rotor amps (LRA) can be cut ~65% with a soft-start kit.",
  },
  {
    name: "Gas Furnace Blower Motor (1/2 HP)",
    runningWatts: 600,
    surgeWatts: 1800,
    category: "Heating & Air",
    notes: "Essential for winter outages; requires clean sine wave power.",
  },
  {
    name: "Countertop Microwave (1,000W Output)",
    runningWatts: 1450,
    surgeWatts: 1450,
    category: "Kitchen & Cooking",
    notes: "Input draw is ~1.45x magnetron cooking power. No motor surge delta.",
  },
];

export function QuickPowerChecker() {
  const [activeTab, setActiveTab] = useState<"converter" | "runtime" | "surge">(
    "converter"
  );

  // Tab 1: Watts <-> Amps state
  const [convVolts, setConvVolts] = useState<number>(120);
  const [convWatts, setConvWatts] = useState<number>(1500);
  const [convAmps, setConvAmps] = useState<number>(12.5);

  const handleWattsChange = (val: number) => {
    setConvWatts(val);
    const calculatedAmps = convVolts > 0 ? Number((val / convVolts).toFixed(2)) : 0;
    setConvAmps(calculatedAmps);
  };

  const handleAmpsChange = (val: number) => {
    setConvAmps(val);
    const calculatedWatts = Number((val * convVolts).toFixed(1));
    setConvWatts(calculatedWatts);
  };

  const handleVoltsChange = (newVolts: number) => {
    setConvVolts(newVolts);
    const calculatedAmps = newVolts > 0 ? Number((convWatts / newVolts).toFixed(2)) : 0;
    setConvAmps(calculatedAmps);
  };

  // Tab 2: Battery Runtime state
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12);
  const [batteryAh, setBatteryAh] = useState<number>(100);
  const [loadWatts, setLoadWatts] = useState<number>(150);

  // Runtime calculation: (V * Ah * DoD * InverterEff) / LoadWatts
  // LiFePO4: 90% DoD, Inverter 90% eff
  // AGM / Lead-Acid: 50% DoD, Inverter 88% eff
  const lifepo4Hours =
    loadWatts > 0
      ? ((batteryVoltage * batteryAh * 0.9 * 0.9) / loadWatts).toFixed(1)
      : "0";
  const agmHours =
    loadWatts > 0
      ? ((batteryVoltage * batteryAh * 0.5 * 0.88) / loadWatts).toFixed(1)
      : "0";

  // Tab 3: Appliance Surge state
  const [selectedApplianceIndex, setSelectedApplianceIndex] = useState<number>(0);
  const appliance = COMMON_APPLIANCES[selectedApplianceIndex];
  const surgeDelta = appliance.surgeWatts - appliance.runningWatts;
  const recommendedGenWatts = Math.round(appliance.surgeWatts * 1.25);

  const convVoltsId = useId();
  const convWattsId = useId();
  const convAmpsId = useId();
  const batteryVoltageId = useId();
  const batteryAhId = useId();
  const loadWattsId = useId();
  const applianceSelectId = useId();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-100/60 overflow-hidden">
      {/* Widget Header & Tabs */}
      <div className="bg-slate-900 p-4 sm:p-5 text-white">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="text-sm font-bold tracking-tight">
              Quick Bench Check
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            Instant Utility
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-slate-800/90 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("converter")}
            className={`py-2 px-2.5 rounded-lg text-center transition ${
              activeTab === "converter"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
          >
            Watts ↔ Amps
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("runtime")}
            className={`py-2 px-2.5 rounded-lg text-center transition ${
              activeTab === "runtime"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
          >
            Battery Hours
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("surge")}
            className={`py-2 px-2.5 rounded-lg text-center transition ${
              activeTab === "surge"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
          >
            Motor Surge
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* TAB 1: Watts <-> Amps */}
        {activeTab === "converter" && (
          <div className="space-y-4">
            <div>
              <label htmlFor={convVoltsId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Circuit Voltage
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "12V DC", val: 12 },
                  { label: "120V AC (1Φ)", val: 120 },
                  { label: "240V AC (1Φ)", val: 240 },
                ].map((v) => (
                  <button
                    key={v.val}
                    type="button"
                    onClick={() => handleVoltsChange(v.val)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition text-center ${
                      convVolts === v.val
                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={convWattsId} className="block text-xs font-semibold text-slate-600 mb-1">
                  Power (Watts)
                </label>
                <input
                  id={convWattsId}
                  type="number"
                  min="0"
                  step="50"
                  value={convWatts}
                  onChange={(e) => handleWattsChange(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 tabular-nums"
                />
              </div>

              <div>
                <label htmlFor={convAmpsId} className="block text-xs font-semibold text-slate-600 mb-1">
                  Current (Amps)
                </label>
                <input
                  id={convAmpsId}
                  type="number"
                  min="0"
                  step="0.5"
                  value={convAmps}
                  onChange={(e) => handleAmpsChange(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 tabular-nums"
                />
              </div>
            </div>

            {/* Quick Result Line */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-600 font-medium">80% NEC Continuous Limit:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {(convAmps * 1.25).toFixed(1)}A Breaker Required
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Link
                href="/watts-to-amps-calculator"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition"
              >
                <span>Full Watts to Amps Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/amps-to-watts-calculator"
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition"
              >
                Amps to Watts →
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: Battery Hours */}
        {activeTab === "runtime" && (
          <div className="space-y-4">
            <div>
              <label htmlFor={batteryVoltageId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bank Nominal Voltage
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "12V Bank", val: 12 },
                  { label: "24V Bank", val: 24 },
                  { label: "48V Bank", val: 48 },
                ].map((v) => (
                  <button
                    key={v.val}
                    type="button"
                    onClick={() => setBatteryVoltage(v.val)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition text-center ${
                      batteryVoltage === v.val
                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={batteryAhId} className="block text-xs font-semibold text-slate-600 mb-1">
                  Battery Rating (Ah)
                </label>
                <input
                  id={batteryAhId}
                  type="number"
                  min="10"
                  step="10"
                  value={batteryAh}
                  onChange={(e) => setBatteryAh(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 tabular-nums"
                />
              </div>

              <div>
                <label htmlFor={loadWattsId} className="block text-xs font-semibold text-slate-600 mb-1">
                  Continuous Load (Watts)
                </label>
                <input
                  id={loadWattsId}
                  type="number"
                  min="10"
                  step="25"
                  value={loadWatts}
                  onChange={(e) => setLoadWatts(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 tabular-nums"
                />
              </div>
            </div>

            {/* Chemistry Comparison Output Cards */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  LiFePO4 (90% DoD)
                </div>
                <div className="text-xl font-mono font-black text-emerald-950 mt-1 tabular-nums">
                  ~{lifepo4Hours} hrs
                </div>
                <div className="text-[10px] text-emerald-700 mt-0.5">
                  {(batteryVoltage * batteryAh * 0.9).toFixed(0)} Usable Wh
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  AGM / Lead (50% DoD)
                </div>
                <div className="text-xl font-mono font-black text-slate-900 mt-1 tabular-nums">
                  ~{agmHours} hrs
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {(batteryVoltage * batteryAh * 0.5).toFixed(0)} Usable Wh
                </div>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/ups-battery-backup-calculator"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition"
              >
                <span>Open Full Battery &amp; UPS Runtime Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 3: Appliance Surge */}
        {activeTab === "surge" && (
          <div className="space-y-4">
            <div>
              <label htmlFor={applianceSelectId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Common Motorized Appliance
              </label>
              <select
                id={applianceSelectId}
                value={selectedApplianceIndex}
                onChange={(e) => setSelectedApplianceIndex(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {COMMON_APPLIANCES.map((item, idx) => (
                  <option key={item.name} value={idx}>
                    {item.name} ({item.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Electrical Ratings Grid */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Running Demand
                </div>
                <div className="text-lg font-mono font-black text-slate-900 mt-0.5 tabular-nums">
                  {appliance.runningWatts.toLocaleString()} W
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  Peak Starting Surge
                </div>
                <div className="text-lg font-mono font-black text-amber-950 mt-0.5 tabular-nums">
                  {appliance.surgeWatts.toLocaleString()} W
                </div>
              </div>
            </div>

            {/* Trade Insight Note */}
            <div className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Surge Delta (+{surgeDelta}W): </span>
                <span>{appliance.notes}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs flex items-center justify-between">
              <span className="font-medium text-blue-900">Recommended Generator Sizing:</span>
              <span className="font-mono font-bold text-blue-950 text-sm tabular-nums">
                {recommendedGenWatts.toLocaleString()} Watts (with 125% margin)
              </span>
            </div>

            <div className="pt-1">
              <Link
                href="/generator-size-calculator"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition"
              >
                <span>Add to Generator Load Inventory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
