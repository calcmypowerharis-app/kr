import React from "react";
import Link from "next/link";
import { Battery, Calculator, Clock, ShieldCheck, AlertTriangle, Cpu, Zap, Wifi } from "lucide-react";

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

export const UpsRuntimeGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Battery className="w-3.5 h-3.5" />
          <span>Battery Autonomy &amp; Inverter Inrush Headroom</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          UPS Battery Runtime Calculation: Discharge Curves &amp; Inverter Efficiency
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Uninterruptible power supply runtime depends on connected equipment wattage, internal battery chemistry, DC bus voltage, and inverter conversion efficiency during grid outages.
        </p>
      </div>

      {/* Sizing Formula Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span>The Universal UPS Battery Runtime Formula</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Battery backup runtime is calculated by dividing total usable energy in watt-hours by connected electrical power draw, adjusted for internal inverter losses:
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-center text-sm sm:text-base text-slate-900 font-bold space-y-2">
          <div>Runtime (Hours) = [Battery Voltage (V) × Capacity (Ah) × Efficiency × DoD] ÷ Load (Watts)</div>
          <div className="text-xs font-normal text-slate-600 font-sans">
            Typical Inverter Efficiency: 80% to 85% | Sealed Lead-Acid Usable DoD: 50% | LiFePO4 Usable DoD: 85% to 90%
          </div>
        </div>
      </div>

      {/* Master UPS Runtime Lookup Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          UPS Runtime Table by Unit Size &amp; Connected Appliance Load
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Estimated backup duration across standard line-interactive consumer and professional UPS units under real-world household and office loads:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">UPS Capacity</th>
                <th className="py-3 px-4">Max Watts</th>
                <th className="py-3 px-4">Internal Battery</th>
                <th className="py-3 px-4">WiFi Router (20W)</th>
                <th className="py-3 px-4">CPAP Machine (45W)</th>
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
      </div>

      {/* Technical Engineering Sections */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Essential Electrical Factors Influencing UPS Battery Life
        </h3>

        {/* Volt-Amps vs Watts */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>Volt-Amps (VA) vs. Real Power (Watts) in UPS Sizing</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            UPS units display capacity in both volt-amps (apparent power) and watts (real power). Computer equipment with active power factor correction operates near unity power factor (0.95 to 0.99).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Budget UPS units often carry a lower power factor rating between 0.60 and 0.70. A 1,000 VA budget UPS with a 0.60 power factor safely delivers only 600 watts of real power.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Always verify that total connected load wattage never exceeds either the watt rating or the volt-amp rating of the unit.
          </p>
        </div>

        {/* Peukert Effect on Lead-Acid */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Peukert Effect on Sealed Lead-Acid Batteries</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Standard sealed lead-acid (SLA) batteries are rated at a gentle 20-hour discharge rate. Discharging that same battery rapidly in 15 to 30 minutes reduces effective chemical capacity by 20% to 35%.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Modern LiFePO4 lithium iron phosphate replacement batteries maintain virtually flat discharge curves with zero Peukert losses. They deliver full rated capacity even under rapid heavy loads.
          </p>
        </div>

        {/* Outage Optimization Tips */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-emerald-600" />
            <span>Outage Strategy: Extending Internet &amp; Communications Runtime</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            During prolonged severe storm outages, desktop computers and monitors draw unnecessary power that drains small batteries within minutes.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Disconnect large monitors and desktop towers to run solely your fiber ONT terminal and WiFi router (15 to 25 watts total).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A modest 850 VA consumer battery backup can sustain critical home internet and emergency smartphone charging for over 3 to 4 hours.
          </p>
        </div>
      </div>
    </section>
  );
};
