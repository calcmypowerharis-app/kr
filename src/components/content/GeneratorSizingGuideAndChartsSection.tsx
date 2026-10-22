import React from "react";
import Link from "next/link";
import { Zap, Plug, Calculator, Activity, HelpCircle, Layers, CheckCircle2, AlertTriangle, ShieldCheck, Cpu } from "lucide-react";
import { APPLIANCE_WATTAGE_DATA } from "@/lib/calculators/generator-wattage-chart";
import { GENERATOR_AMPERAGE_CHART_DATA } from "@/lib/calculators/generator-amperage";

export const GeneratorSizingGuideAndChartsSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Plug className="w-3.5 h-3.5" />
          <span>Complete Sizing Guide &amp; Master Reference Charts</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How to Calculate Generator Sizing: Running Watts, Surge Watts &amp; Amperage
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Properly sizing an emergency home backup or jobsite generator requires calculating total running continuous wattage, accommodating motor starting surge inrush, and balancing split-phase electrical lines.
        </p>
      </div>

      {/* Sizing Formula Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span>The Single-Largest-Surge Generator Sizing Formula</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Never add the starting surge watts of every appliance together. In practical outage operation, motorized appliances start one at a time. Sizing accounts for the sum of all continuous running loads plus the single largest startup surge, derated by a 25% safety margin.
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-center text-sm sm:text-base text-slate-900 font-bold space-y-2">
          <div>Minimum Starting Capacity (Watts) = [Total Running Watts + Single Largest Starting Surge] × 1.25</div>
          <div className="text-xs font-normal text-slate-600 font-sans">
            Continuous Planning Headroom: Running continuous load should not exceed 80% of rated capacity.
          </div>
        </div>
      </div>

      {/* 3 Core Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Continuous Duty</div>
          <h4 className="text-base font-bold text-slate-900">Running Watts</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            The power continuously consumed while an appliance operates normally. Heating elements, light bulbs, and televisions draw constant running wattage with zero starting surge.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600">Inrush Current</div>
          <h4 className="text-base font-bold text-slate-900">Starting Surge Watts</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Electric motors (refrigerators, well pumps, AC compressors) require 2 to 4 times their running wattage for 1 to 3 seconds to overcome mechanical inertia from a standstill.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Electrical Balance</div>
          <h4 className="text-base font-bold text-slate-900">Split-Phase Balancing (120V/240V)</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard 240V generator output consists of two 120V legs (L1 and L2). Connecting too many 120V loads to a single leg trips the main circuit breaker even when total wattage seems sufficient.
          </p>
        </div>
      </div>

      {/* Appliance Wattage Reference Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Master Appliance Running &amp; Starting Wattage Reference Chart
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Comprehensive reference values across 35+ residential appliances, workshop power tools, and essential circuits:
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white max-h-[520px] overflow-y-auto">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="py-3 px-4">Appliance / Equipment</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Running Watts</th>
                <th className="py-3 px-4">Starting Watts</th>
                <th className="py-3 px-4">Surge Delta</th>
                <th className="py-3 px-4">Voltage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {APPLIANCE_WATTAGE_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{item.name}</td>
                  <td className="py-2.5 px-4 text-slate-500">{item.category}</td>
                  <td className="py-2.5 px-4 font-mono font-medium">{item.runningWatts}W</td>
                  <td className="py-2.5 px-4 font-mono text-amber-700 font-semibold">{item.startingWatts}W</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">+{item.surgeDelta}W</td>
                  <td className="py-2.5 px-4 text-xs font-semibold text-slate-600">{item.typicalVoltage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generator Amperage Output Chart */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Generator Amperage Output Chart (120V &amp; 240V by Generator Size)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Check the available continuous and surge current for common portable and home standby generator sizes:
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">Generator Size (Watts)</th>
                <th className="py-3 px-4">120V Total Current</th>
                <th className="py-3 px-4">240V Transfer Current</th>
                <th className="py-3 px-4">80% Continuous Limit (240V)</th>
                <th className="py-3 px-4">Receptacle / Hookup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {GENERATOR_AMPERAGE_CHART_DATA.map((row) => (
                <tr key={row.watts} className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-4 font-bold text-slate-900 font-mono">
                    {row.watts.toLocaleString()}W ({row.kw} kW)
                  </td>
                  <td className="py-2.5 px-4 font-mono">{row.ratedAmps120V}A</td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-blue-700">
                    {row.ratedAmps240V > 0 ? `${row.ratedAmps240V}A` : "N/A (120V)"}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">
                    {row.continuousAmps240V > 0 ? `${row.continuousAmps240V}A` : "N/A"}
                  </td>
                  <td className="py-2.5 px-4 text-xs text-slate-600 font-medium">{row.commonApplications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety & Transfer Switch Callout */}
      <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-3">
        <h4 className="text-base font-bold text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Carbon Monoxide Safety &amp; Transfer Switch Requirements</span>
        </h4>
        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
          Never operate a combustion generator indoors, inside a garage, or near open windows. Always place the unit outdoors at least 20 feet away from living spaces with the exhaust pointed away. When powering home circuits, a manual transfer switch or mechanical interlock is mandatory under the National Electrical Code (NEC Article 702) to prevent deadly backfeeding into utility power lines.
        </p>
      </div>
    </section>
  );
};
