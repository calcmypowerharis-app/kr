import React from "react";
import Link from "next/link";
import { Sun, Calculator, Compass, HelpCircle, Layers, CheckCircle2, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";

export const SolarSystemSizingGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider">
          <Sun className="w-3.5 h-3.5" />
          <span>PV Array Capacity &amp; Roof Area Engineering</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Residential Solar System Sizing: Array kW Demand, Panel Count &amp; Roof Area
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Sizing a residential photovoltaic (PV) array involves translating monthly kilowatt-hour consumption into array DC kilowatt capacity based on regional peak sun hours, system derating losses, and individual module wattage.
        </p>
      </div>

      {/* Sizing Formula Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-600" />
          <span>The Universal Solar Panel Count Formula</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Solar arrays generate power based on peak sun hours (hours per day when sunlight intensity averages 1,000 W/m²). NREL PVWatts standards recommend applying a 0.77 to 0.80 system derate factor for inverter losses, wiring resistance, and thermal heating:
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-center text-sm sm:text-base text-slate-900 font-bold space-y-2">
          <div>Array Size (kW) = [Daily Energy (kWh) ÷ (Peak Sun Hours × 0.78 System Derate)]</div>
          <div className="text-xs font-normal text-slate-600 font-sans">
            Number of Panels = [Array Size in Watts (kW × 1,000)] ÷ Individual Panel Wattage (e.g., 400W)
          </div>
        </div>
      </div>

      {/* Regional Peak Sun Hours & Sizing Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          US Regional Peak Sun Hours &amp; Panel Count for 900 kWh/Month
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Array capacity and panel count required to offset the US average 900 kWh monthly electric bill using modern 400-Watt monocrystalline panels:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">US Region</th>
                <th className="py-3 px-4">Peak Sun Hours (Avg)</th>
                <th className="py-3 px-4">Required Array Size</th>
                <th className="py-3 px-4">400W Panel Count</th>
                <th className="py-3 px-4">Estimated Roof Space</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Northeast (NY, MA, PA)</td>
                <td className="py-2.5 px-4 font-mono">3.8 Hours / day</td>
                <td className="py-2.5 px-4 font-mono font-semibold">10.1 kW</td>
                <td className="py-2.5 px-4 font-mono font-bold text-blue-700">26 Panels</td>
                <td className="py-2.5 px-4 text-slate-600">~455 sq ft</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Midwest (IL, OH, MI)</td>
                <td className="py-2.5 px-4 font-mono">4.2 Hours / day</td>
                <td className="py-2.5 px-4 font-mono font-semibold">9.2 kW</td>
                <td className="py-2.5 px-4 font-mono font-bold text-blue-700">23 Panels</td>
                <td className="py-2.5 px-4 text-slate-600">~402 sq ft</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Southeast (FL, GA, NC)</td>
                <td className="py-2.5 px-4 font-mono">4.8 Hours / day</td>
                <td className="py-2.5 px-4 font-mono font-semibold">8.0 kW</td>
                <td className="py-2.5 px-4 font-mono font-bold text-blue-700">20 Panels</td>
                <td className="py-2.5 px-4 text-slate-600">~350 sq ft</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Southwest (AZ, NV, CA)</td>
                <td className="py-2.5 px-4 font-mono">5.8 Hours / day</td>
                <td className="py-2.5 px-4 font-mono font-semibold">6.6 kW</td>
                <td className="py-2.5 px-4 font-mono font-bold text-blue-700">17 Panels</td>
                <td className="py-2.5 px-4 text-slate-600">~298 sq ft</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Roof Space & Orientation Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Roof Space &amp; Layout Constraints</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A standard 400-Watt residential solar panel measures roughly 68 inches by 40 inches, occupying about 17.5 square feet. A typical 20-panel system requires approximately 350 to 400 square feet of unshaded roof plane.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Compass Orientation &amp; Roof Pitch</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In the Northern Hemisphere, true south-facing roofs deliver maximum annual energy production. East and west-facing orientations generate 15% to 20% less annual power, which can be compensated for by adding 2 to 4 additional panels.
          </p>
        </div>
      </div>
    </section>
  );
};
