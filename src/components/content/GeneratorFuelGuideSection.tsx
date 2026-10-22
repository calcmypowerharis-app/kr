import React from "react";
import Link from "next/link";
import { Fuel, Calculator, Clock, HelpCircle, Activity, DollarSign, AlertTriangle, ShieldCheck, CheckCircle2, Wrench, Flame, Droplet } from "lucide-react";

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
            Burns cleaner with infinite shelf life. Because propane has roughly 20% lower energy density than gasoline, engine wattage output is derated by 10% to 15%.
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

      {/* 72-Hour Storm Fuel Planning Scenario */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          <Clock className="w-3.5 h-3.5" />
          <span>Real-World Outage Planning</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Worked Scenario: Sizing Fuel Storage for a 72-Hour Winter Storm
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Planning an emergency fuel reserve requires calculating daily generator duty cycles instead of assuming 24-hour continuous full-throttle operation.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Consider a typical 7,500-Watt portable generator powering a refrigerator, gas furnace blower, well pump, and lighting. Operating at an average 50% load (3,750 Watts), the engine burns 0.70 gallons per hour.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Continuous 24-Hour Operation</h4>
            <div className="text-xs text-slate-600 space-y-1 font-mono">
              <div>Daily Fuel: 24 hrs × 0.70 GPH = 16.8 Gallons</div>
              <div>72-Hour Total: 50.4 Gallons (~10 standard 5-gal cans)</div>
              <div>Oil Service: Requires oil change every 50 to 100 hours</div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              High fuel consumption and severe mechanical wear. Often impractical due to local residential fuel storage limits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <h4 className="text-sm font-bold text-blue-950">Intermittent Cycling (12 Hours / Day)</h4>
            <div className="text-xs text-blue-900 space-y-1 font-mono">
              <div>Daily Fuel: 12 hrs × 0.70 GPH = 8.4 Gallons</div>
              <div>72-Hour Total: 25.2 Gallons (~5 standard 5-gal cans)</div>
              <div>Cycle Strategy: Run 3 hrs morning, 2 hrs mid-day, 7 hrs evening</div>
            </div>
            <p className="text-xs text-blue-800 pt-1">
              Recommended disaster strategy. Keeps refrigerators cold, pumps water, and cuts fuel consumption in half.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Engine Maintenance and Eco-Throttle Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            <span>Engine Oil Service During Extended Runs</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Most small 4-stroke generator engines hold less than one quart (roughly 0.6 to 1.1 liters) of motor oil and lack pressurized oil filters. Check engine oil every 24 operating hours during multi-day grid failures.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Shut down the engine, allow it to cool for 10 minutes, and top off with 10W-30 or 5W-30 synthetic oil to prevent catastrophic low-oil engine seizure.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Eco-Mode Throttling and Inverter Efficiency</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Traditional open-frame synchronous generators run at a constant 3,600 RPM to maintain 60 Hz utility frequency. This burns significant fuel even with zero load.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Digital inverter generators decouple engine speed from electrical frequency, allowing the microprocessor to idle down engine RPM when loads drop. Activating Eco-Throttle at partial loads can reduce fuel consumption by up to 25% to 40%.
          </p>
        </div>
      </div>
    </section>
  );
};
