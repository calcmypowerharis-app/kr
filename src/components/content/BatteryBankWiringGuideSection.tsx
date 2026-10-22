import React from "react";
import Link from "next/link";
import { BatteryCharging, Calculator, Zap, HelpCircle, Layers, CheckCircle2, ShieldCheck, AlertTriangle } from "lucide-react";

export const BatteryBankWiringGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
          <BatteryCharging className="w-3.5 h-3.5" />
          <span>Battery Bank Wiring &amp; Capacity Engineering Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How to Calculate Battery Bank Amp-Hours: Series, Parallel &amp; 2S2P Wiring
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calculating total battery bank capacity requires understanding how connecting cells in series steps up voltage while parallel configurations multiply Amp-hours, keeping total stored Watt-hours equal.
        </p>
      </div>

      {/* Wiring Formulas Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-600" />
          <span>Core Battery Bank Mathematical Formulas</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Amp-hours (Ah) measure electrical charge quantity, while Watt-hours (Wh) measure true stored energy. When comparing different system voltages, always calculate total energy in Watt-hours:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs sm:text-sm text-slate-900 font-bold space-y-1">
            <div className="text-indigo-600 font-sans text-xs uppercase tracking-wider font-bold">Series Wiring</div>
            <div>Voltage = V1 + V2 + ... + Vn</div>
            <div className="text-xs font-normal text-slate-600 font-sans">Bank Capacity (Ah) = Single Battery Ah</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs sm:text-sm text-slate-900 font-bold space-y-1">
            <div className="text-emerald-600 font-sans text-xs uppercase tracking-wider font-bold">Parallel Wiring</div>
            <div>Capacity = Ah1 + Ah2 + ... + Ahn</div>
            <div className="text-xs font-normal text-slate-600 font-sans">Bank Voltage = Single Battery Volts</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs sm:text-sm text-slate-900 font-bold space-y-1">
            <div className="text-blue-600 font-sans text-xs uppercase tracking-wider font-bold">Series-Parallel (2S2P)</div>
            <div>Voltage = 2 × Battery Volts</div>
            <div className="text-xs font-normal text-slate-600 font-sans">Capacity = 2 × Battery Ah</div>
          </div>
        </div>
      </div>

      {/* Numerical Comparison Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Wiring Comparison: Four 12V 100Ah Batteries (4,800 Watt-Hours Total)
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Notice how wiring four identical 12V 100Ah batteries in different configurations produces completely different voltages and Amp-hour ratings, yet identical stored energy (4,800 Wh):
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">Wiring Method</th>
                <th className="py-3 px-4">Battery Quantity</th>
                <th className="py-3 px-4">Bank Voltage</th>
                <th className="py-3 px-4">Bank Capacity (Ah)</th>
                <th className="py-3 px-4">Total Energy (Wh)</th>
                <th className="py-3 px-4">Typical Inverter / Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Parallel (4P)</td>
                <td className="py-2.5 px-4">4 × 12V 100Ah</td>
                <td className="py-2.5 px-4 font-mono">12 Volts</td>
                <td className="py-2.5 px-4 font-mono font-bold text-blue-700">400 Ah</td>
                <td className="py-2.5 px-4 font-mono font-semibold">4,800 Wh</td>
                <td className="py-2.5 px-4 text-slate-600">RV / Camper van (12V DC loads)</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Series-Parallel (2S2P)</td>
                <td className="py-2.5 px-4">4 × 12V 100Ah</td>
                <td className="py-2.5 px-4 font-mono">24 Volts</td>
                <td className="py-2.5 px-4 font-mono font-bold text-blue-700">200 Ah</td>
                <td className="py-2.5 px-4 font-mono font-semibold">4,800 Wh</td>
                <td className="py-2.5 px-4 text-slate-600">Cabin / Off-grid workshop (24V inverter)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Series (4S)</td>
                <td className="py-2.5 px-4">4 × 12V 100Ah</td>
                <td className="py-2.5 px-4 font-mono">48 Volts</td>
                <td className="py-2.5 px-4 font-mono font-bold text-blue-700">100 Ah</td>
                <td className="py-2.5 px-4 font-mono font-semibold">4,800 Wh</td>
                <td className="py-2.5 px-4 text-slate-600">Whole-home backup / Solar PV (48V inverter)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Usable Capacity vs Chemistry Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Lithium Iron Phosphate (LiFePO4)</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            LiFePO4 batteries deliver 80% to 90% usable depth of discharge (DoD) without damaging cells. A 100Ah LiFePO4 battery safely yields 80 to 90 usable Amp-hours and maintains stable output voltage throughout discharge.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Lead-Acid (AGM, Gel, Flooded)</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Lead-acid chemistries should not be discharged below 50% state of charge to avoid severe sulfation and premature plate degradation. A 100Ah lead-acid battery only provides 50 usable Amp-hours of emergency backup capacity.
          </p>
        </div>
      </div>
    </section>
  );
};
