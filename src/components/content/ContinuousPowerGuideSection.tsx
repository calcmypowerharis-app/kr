import React from "react";
import Link from "next/link";
import { Plug, ShieldCheck, Activity, HelpCircle, Layers, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export const ContinuousPowerGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ISO 8528 Engineering Classifications &amp; Continuous Duty</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Continuous Power vs. Standby Power: ISO 8528 Ratings &amp; 24/7 Operation
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Understanding the mechanical and electrical difference between emergency standby ratings and continuous operating power ensures homeowners do not destroy residential backup generators during multi-day grid failures.
        </p>
      </div>

      {/* ISO 8528 Ratings Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          ISO 8528 Generator Rating Classifications
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The International Organization for Standardization (ISO 8528-1) establishes four distinct duty cycle tiers for internal combustion engine-driven generators:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">Rating Tier</th>
                <th className="py-3 px-4">Max Annual Hours</th>
                <th className="py-3 px-4">Average Load Factor</th>
                <th className="py-3 px-4">Typical Application</th>
                <th className="py-3 px-4">Overload Capability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-900">Emergency Standby (ESP)</td>
                <td className="py-2.5 px-4 font-mono">200 hours / year</td>
                <td className="py-2.5 px-4 font-mono font-semibold">70% Max</td>
                <td className="py-2.5 px-4 text-slate-600">Residential home backup during utility grid outages</td>
                <td className="py-2.5 px-4 text-rose-700 font-semibold">None (0%)</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Prime Power (PRP)</td>
                <td className="py-2.5 px-4 font-mono">Unlimited</td>
                <td className="py-2.5 px-4 font-mono font-semibold">70% Max</td>
                <td className="py-2.5 px-4 text-slate-600">Off-grid primary power with variable electrical loads</td>
                <td className="py-2.5 px-4 text-emerald-700 font-semibold">+10% for 1 hour in 12</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-900">Continuous Power (COP)</td>
                <td className="py-2.5 px-4 font-mono">Unlimited (8,760 hrs)</td>
                <td className="py-2.5 px-4 font-mono font-semibold">100% Constant</td>
                <td className="py-2.5 px-4 text-slate-600">Baseload power plants, mining, island utilities</td>
                <td className="py-2.5 px-4 text-slate-500 font-semibold">None (Continuous 100%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Engine Speed & Maintenance Reality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Engine Speed: 1,800 RPM vs. 3,600 RPM</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Standard residential standby generators run at 3,600 RPM (2-pole alternator) to generate 60 Hz current. True commercial continuous power generators run at 1,800 RPM (4-pole alternator).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Running at half the engine speed dramatically reduces piston friction, cuts mechanical wear, lowers operating temperatures, and extends engine lifespan tenfold.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Multi-Day Outage Maintenance Reality</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            During prolonged multi-day grid blackouts, standard residential generators must be shut down every 50 to 100 hours of continuous operation for oil changes and valve inspections.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Always stock replacement motor oil, oil filters, and spark plugs when preparing for severe weather storms requiring several consecutive days of generator power.
          </p>
        </div>
      </div>
    </section>
  );
};
