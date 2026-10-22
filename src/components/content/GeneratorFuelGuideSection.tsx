import React from "react";
import Link from "next/link";
import { Fuel, Calculator, Clock, HelpCircle, Activity, DollarSign, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

export const GeneratorFuelGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Fuel className="w-3.5 h-3.5" />
          <span>Fuel Consumption Guide &amp; Runtime Reference</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How Much Gas Does a Generator Use? Burn Rates, Runtime &amp; Fuel Types
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Fuel consumption depends on generator engine displacement, electrical load percentage, inverter throttling technology, and fuel energy density across gasoline, propane, and diesel.
        </p>
      </div>

      {/* Burn Rate Formula Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span>How to Calculate Generator Runtime from Fuel Capacity</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Runtime is determined by dividing total usable tank volume by the hourly fuel consumption rate at your expected electrical load:
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-center text-sm sm:text-base text-slate-900 font-bold space-y-2">
          <div>Runtime (Hours) = Usable Tank Capacity (Gallons) ÷ Consumption Rate (Gallons per Hour)</div>
          <div className="text-xs font-normal text-slate-600 font-sans">
            Daily Outage Requirement = Hourly Burn Rate × Daily Operating Hours (e.g., 16 hours/day)
          </div>
        </div>
      </div>

      {/* Fuel Consumption Reference Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Gasoline Consumption by Generator Size (Gallons per Hour)
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Standard gasoline consumption benchmarks across typical operating loads for portable inverter, open-frame, and whole-house standby units:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">Generator Size</th>
                <th className="py-3 px-4">Generator Type</th>
                <th className="py-3 px-4">25% Load (GPH)</th>
                <th className="py-3 px-4">50% Load (GPH)</th>
                <th className="py-3 px-4">100% Full Load (GPH)</th>
                <th className="py-3 px-4">24-Hr Fuel at 50% Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">2,000 to 2,200W</td>
                <td className="py-2.5 px-4">Inverter Generator</td>
                <td className="py-2.5 px-4 font-mono">0.10 GPH</td>
                <td className="py-2.5 px-4 font-mono font-semibold text-blue-700">0.15 GPH</td>
                <td className="py-2.5 px-4 font-mono">0.25 GPH</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">3.6 Gal</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">3,500 to 4,500W</td>
                <td className="py-2.5 px-4">Dual-Fuel / Open Frame</td>
                <td className="py-2.5 px-4 font-mono">0.25 GPH</td>
                <td className="py-2.5 px-4 font-mono font-semibold text-blue-700">0.38 GPH</td>
                <td className="py-2.5 px-4 font-mono">0.55 GPH</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">9.1 Gal</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">7,500 to 9,000W</td>
                <td className="py-2.5 px-4">Heavy Portable (Transfer Switch)</td>
                <td className="py-2.5 px-4 font-mono">0.45 GPH</td>
                <td className="py-2.5 px-4 font-mono font-semibold text-blue-700">0.70 GPH</td>
                <td className="py-2.5 px-4 font-mono">1.10 GPH</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">16.8 Gal</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">10,000 to 12,000W</td>
                <td className="py-2.5 px-4">Commercial Portable</td>
                <td className="py-2.5 px-4 font-mono">0.60 GPH</td>
                <td className="py-2.5 px-4 font-mono font-semibold text-blue-700">0.95 GPH</td>
                <td className="py-2.5 px-4 font-mono">1.50 GPH</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">22.8 Gal</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">18,000 to 22,000W</td>
                <td className="py-2.5 px-4">Whole-House Standby (Propane/Gas)</td>
                <td className="py-2.5 px-4 font-mono">1.10 GPH eq.</td>
                <td className="py-2.5 px-4 font-mono font-semibold text-blue-700">1.80 GPH eq.</td>
                <td className="py-2.5 px-4 font-mono">3.00 GPH eq.</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">43.2 Gal eq.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Fuel Type Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600">Gasoline</div>
          <h4 className="text-base font-bold text-slate-900">114,000 BTU / Gal</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            High energy density and universally accessible during non-disaster periods. Requires fuel stabilizer for storage beyond 30 to 60 days to prevent carburetor gumming.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Propane (LPG)</div>
          <h4 className="text-base font-bold text-slate-900">91,500 BTU / Gal</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Burns cleaner with infinite shelf life. Because propane has ~20% lower energy density than gasoline, engine wattage output is derated by roughly 10% to 15%.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Diesel</div>
          <h4 className="text-base font-bold text-slate-900">138,500 BTU / Gal</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Highest thermal efficiency and lowest burn rate. Commercial 1,800 RPM diesel units last tens of thousands of hours and provide superior fuel economy.
          </p>
        </div>
      </div>
    </section>
  );
};
