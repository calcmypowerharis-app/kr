import React from "react";
import Link from "next/link";
import { Sun, Calculator, Zap, HelpCircle, Activity, ShieldCheck, AlertTriangle, Layers, CheckCircle2 } from "lucide-react";

export const SolarChargeControllerGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider">
          <Sun className="w-3.5 h-3.5" />
          <span>NEC 690.7 Voltage Margins &amp; Controller Ampacity</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Solar Charge Controller Sizing: MPPT vs. PWM Formulas &amp; Cold-Weather Voc
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Sizing a solar battery charge controller prevents thermal overload, safeguards battery chemistry, and avoids damaging sensitive electronics from winter open-circuit voltage spikes.
        </p>
      </div>

      {/* Sizing Formulas Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-600" />
          <span>Core Mathematical Sizing Formulas</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          National Electrical Code (NEC Article 690) mandates applying a 125% continuous duty multiplier to solar array current output when sizing controllers and circuit protection:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs sm:text-sm text-slate-900 font-bold space-y-1">
            <div className="text-indigo-600 font-sans text-xs uppercase tracking-wider font-bold">MPPT Sizing Formula</div>
            <div>Output Current (A) = [Array Watts ÷ Battery Voltage] × 1.25</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs sm:text-sm text-slate-900 font-bold space-y-1">
            <div className="text-amber-600 font-sans text-xs uppercase tracking-wider font-bold">PWM Sizing Formula</div>
            <div>Controller Amps (A) ≥ Array Short-Circuit Current (Isc) × 1.25</div>
          </div>
        </div>
      </div>

      {/* MPPT vs PWM Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-indigo-200 bg-indigo-50/40 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">High Efficiency (95% - 99%)</div>
          <h4 className="text-lg font-bold text-slate-900">MPPT (Maximum Power Point Tracking)</h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Acts as a smart DC-to-DC step-down transformer. It allows high-voltage solar strings (e.g., 80V to 150V Voc) to step down to battery charging voltage (12V, 24V, or 48V) while multiplying charging current proportionally.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
            <li>• Delivers 20% to 30% more power during cold weather.</li>
            <li>• Enables smaller gauge wire from roof to controller.</li>
            <li>• Recommended for all solar arrays above 200 Watts.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Basic Switching (70% - 75%)</div>
          <h4 className="text-lg font-bold text-slate-900">PWM (Pulse Width Modulation)</h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Acts as a direct switch connecting the solar panels directly to the battery bank. The panel operating voltage is pulled down to match battery voltage, discarding extra voltage as lost power.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
            <li>• Inexpensive for small DIY setups under 200 Watts.</li>
            <li>• Requires solar array nominal voltage to match battery voltage.</li>
            <li>• Inefficient when panel Voc significantly exceeds battery voltage.</li>
          </ul>
        </div>
      </div>

      {/* NEC 690.7 Cold Temperature Voc Correction Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Sub-Freezing Voc Limits (NEC Table 690.7 Temperature Factors)
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Solar photovoltaic cells produce higher voltage as temperatures drop. Failing to account for sub-freezing winter temperatures will destroy charge controllers by exceeding maximum input voltage ratings:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">Lowest Ambient Temp (°F)</th>
                <th className="py-3 px-4">Lowest Ambient Temp (°C)</th>
                <th className="py-3 px-4">NEC 690.7 Multiplier</th>
                <th className="py-3 px-4">Example: 40V Voc Panel</th>
                <th className="py-3 px-4">Minimum Controller Rating (2 in Series)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">68°F to 77°F</td>
                <td className="py-2.5 px-4">20°C to 25°C</td>
                <td className="py-2.5 px-4 font-mono font-bold">1.00</td>
                <td className="py-2.5 px-4 font-mono">40.0V</td>
                <td className="py-2.5 px-4 font-mono">80.0V Input</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">32°F to 40°F</td>
                <td className="py-2.5 px-4">0°C to 4°C</td>
                <td className="py-2.5 px-4 font-mono font-bold">1.10</td>
                <td className="py-2.5 px-4 font-mono">44.0V</td>
                <td className="py-2.5 px-4 font-mono">88.0V Input</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">5°F to 13°F</td>
                <td className="py-2.5 px-4">-15°C to -11°C</td>
                <td className="py-2.5 px-4 font-mono font-bold">1.16</td>
                <td className="py-2.5 px-4 font-mono">46.4V</td>
                <td className="py-2.5 px-4 font-mono">92.8V Input</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">-13°F to -5°F</td>
                <td className="py-2.5 px-4">-25°C to -21°C</td>
                <td className="py-2.5 px-4 font-mono font-bold text-rose-700">1.20</td>
                <td className="py-2.5 px-4 font-mono text-rose-700 font-semibold">48.0V</td>
                <td className="py-2.5 px-4 font-mono text-rose-700 font-semibold">96.0V Input (Use 150V MPPT)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
