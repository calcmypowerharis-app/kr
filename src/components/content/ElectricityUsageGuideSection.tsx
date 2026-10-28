import React from "react";
import Link from "next/link";
import { Zap, Calculator, Activity, HelpCircle, Layers, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export const ElectricityUsageGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>Appliance Energy Audit &amp; Wh/kWh Methodology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Appliance Watt-Hour (Wh) &amp; Monthly kWh Calculation Methodology
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calculating electricity usage allows homeowners, RV travelers, and solar designers to estimate monthly utility bills, size battery banks, and detect phantom energy drains.
        </p>
      </div>

      {/* Core Formula Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span>The Universal Electricity Usage Formula</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Electric utilities bill residential consumption in kilowatt-hours (kWh). One kilowatt-hour represents 1,000 Watts of electrical power delivered continuously for one hour.
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-center text-sm sm:text-base text-slate-900 font-bold space-y-2">
          <div>Energy (kWh) = [Power (Watts) × Time (Hours)] ÷ 1,000</div>
          <div className="text-xs font-normal text-slate-600 font-sans">
            Cost ($) = Energy (kWh) × Utility Electricity Rate ($/kWh)
          </div>
        </div>
      </div>

      {/* Three Terminology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Power Rate</div>
          <h4 className="text-base font-bold text-slate-900">Watts (W) &amp; Kilowatts (kW)</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Watts measure the instantaneous flow of electrical energy. One kilowatt equals 1,000 Watts. This represents the capacity demanded at any exact second.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Cumulative Work</div>
          <h4 className="text-base font-bold text-slate-900">Watt-Hours (Wh)</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Watt-hours measure total energy consumed over elapsed time. A 100-Watt incandescent bulb running for 5 hours consumes 500 Watt-hours of energy.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Billed Unit</div>
          <h4 className="text-base font-bold text-slate-900">Kilowatt-Hours (kWh)</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kilowatt-hours divide Watt-hours by 1,000. Utility meters record consumption in kWh, which forms the billing basis on electric statements.
          </p>
        </div>
      </div>

      {/* Step by Step Calculation */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          How to Calculate Electricity Usage for Any Appliance
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Follow these three steps to audit any household device using its physical nameplate or a plug-in energy monitor:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-900">Locate Nameplate Wattage</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check the electrical stamp on the back or bottom of the appliance. If only Volts and Amps are printed, multiply Volts by Amps to obtain Watts.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-900">Estimate Operating Hours</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Record active daily hours. For cycling loads like refrigerators, multiply operating hours by the compressor duty cycle (typically 33% to 50%).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-900">Multiply and Divide by 1,000</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multiply Watts by daily hours and divide by 1,000 to find daily kWh. Multiply daily kWh by 30 to estimate monthly electricity consumption.
            </p>
          </div>
        </div>
      </div>

      {/* Appliance Audit Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Household Appliance Electricity Usage Reference Table
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Typical running wattage, daily operating hours, monthly kilowatt-hour consumption, and estimated monthly cost based on the US average residential electricity rate of $0.16 per kWh:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">Appliance</th>
                <th className="py-3 px-4">Rated Watts</th>
                <th className="py-3 px-4">Daily Run Time</th>
                <th className="py-3 px-4">Daily kWh</th>
                <th className="py-3 px-4">Monthly kWh</th>
                <th className="py-3 px-4">Est. Cost ($0.16/kWh)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Central Air Conditioner (3-Ton)</td>
                <td className="py-2.5 px-4">3,500W</td>
                <td className="py-2.5 px-4">6 hours</td>
                <td className="py-2.5 px-4 font-mono">21.0 kWh</td>
                <td className="py-2.5 px-4 font-mono">630 kWh</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">$100.80</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Water Heater (Electric Tank)</td>
                <td className="py-2.5 px-4">4,500W</td>
                <td className="py-2.5 px-4">3 hours</td>
                <td className="py-2.5 px-4 font-mono">13.5 kWh</td>
                <td className="py-2.5 px-4 font-mono">405 kWh</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">$64.80</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Refrigerator (Energy Star)</td>
                <td className="py-2.5 px-4">150W (avg run)</td>
                <td className="py-2.5 px-4">8 hours (cycling)</td>
                <td className="py-2.5 px-4 font-mono">1.2 kWh</td>
                <td className="py-2.5 px-4 font-mono">36 kWh</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">$5.76</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Portable Space Heater</td>
                <td className="py-2.5 px-4">1,500W</td>
                <td className="py-2.5 px-4">5 hours</td>
                <td className="py-2.5 px-4 font-mono">7.5 kWh</td>
                <td className="py-2.5 px-4 font-mono">225 kWh</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">$36.00</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Clothes Dryer (Electric)</td>
                <td className="py-2.5 px-4">3,000W</td>
                <td className="py-2.5 px-4">1 hour</td>
                <td className="py-2.5 px-4 font-mono">3.0 kWh</td>
                <td className="py-2.5 px-4 font-mono">90 kWh</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">$14.40</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">LED Television (55-Inch)</td>
                <td className="py-2.5 px-4">80W</td>
                <td className="py-2.5 px-4">5 hours</td>
                <td className="py-2.5 px-4 font-mono">0.40 kWh</td>
                <td className="py-2.5 px-4 font-mono">12 kWh</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">$1.92</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Wi-Fi Router &amp; Modem</td>
                <td className="py-2.5 px-4">15W</td>
                <td className="py-2.5 px-4">24 hours</td>
                <td className="py-2.5 px-4 font-mono">0.36 kWh</td>
                <td className="py-2.5 px-4 font-mono">10.8 kWh</td>
                <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">$1.73</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Duty Cycle and Phantom Loads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-600" />
            <span>Duty Cycles and Cycling Compressors</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Apprentices and homeowners often overestimate refrigerator electricity usage by assuming the compressor runs 24 hours per day.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In reality, modern refrigerators cycle on and off based on ambient temperature and door openings. A typical duty cycle ranges between 33% and 50%, meaning the motor runs roughly 8 to 12 hours total across a 24-hour day.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Standby Power and Phantom Loads</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Many modern electronic devices consume continuous power even when switched off. This standby draw powers clocks, remote receivers, and internet connections.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            According to the US Department of Energy, phantom loads account for 5% to 10% of total residential electricity consumption in average households.
          </p>
        </div>
      </div>

      {/* Measuring Tools Callout */}
      <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3">
        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Measuring Tools: Nameplate Labels vs. Plug-In Monitors</span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          For plug-in appliances, a plug-in electricity monitor (such as a Kill A Watt meter) provides exact cumulative kWh readings over 24 to 48 hours. For hardwired appliances like electric stoves, heat pumps, and well pumps, check the manufacturer specification sheet or calculate power using voltage and measured circuit current.
        </p>
      </div>
    </section>
  );
};
