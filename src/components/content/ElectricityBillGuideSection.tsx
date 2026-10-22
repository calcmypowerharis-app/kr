import React from "react";
import Link from "next/link";
import { Receipt, DollarSign, Calculator, HelpCircle, Activity, Gauge, TrendingDown, Layers, ShieldCheck } from "lucide-react";

export const ElectricityBillGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Receipt className="w-3.5 h-3.5" />
          <span>Electric Bill Architecture &amp; Tariff Reference</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How to Calculate Your Electric Bill: Supply, Delivery &amp; Tariff Breakdown
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          An electric utility statement includes generation supply rates, distribution delivery charges, fixed monthly customer connection fees, and municipal tax riders.
        </p>
      </div>

      {/* Bill Formula Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span>The Universal Electric Bill Formula</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Utility bills are rarely a simple calculation of total kWh multiplied by a single quoted rate. Residential statements combine variable volumetric rates with fixed customer charges.
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-center text-sm sm:text-base text-slate-900 font-bold space-y-2">
          <div>Total Bill = (kWh × Supply Rate) + (kWh × Delivery Rate) + Fixed Meter Charge + Taxes</div>
          <div className="text-xs font-normal text-slate-600 font-sans">
            Effective Electricity Rate ($/kWh) = Total Statement Cost ($) ÷ Total Monthly Energy (kWh)
          </div>
        </div>
      </div>

      {/* Charge Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Generation</div>
          <h4 className="text-base font-bold text-slate-900">Supply / Generation Charge</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Covers fuel costs (natural gas, nuclear, solar, hydro) to produce raw electrical energy at power generation stations. Typically accounts for 45% to 55% of the total bill.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Infrastructure</div>
          <h4 className="text-base font-bold text-slate-900">Transmission &amp; Delivery</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Funds substation transformers, utility power poles, transmission wires, and maintenance crews that deliver current to your service panel.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Base Access</div>
          <h4 className="text-base font-bold text-slate-900">Fixed Customer Charge</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            A flat monthly fee ($10 to $25) charged for maintaining the grid connection, meter hardware, and billing infrastructure, regardless of actual energy consumed.
          </p>
        </div>
      </div>

      {/* Worked Example Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Worked Example: Calculating a 900 kWh Average US Monthly Statement
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          According to the US Energy Information Administration (EIA), the average US home consumes approximately 900 kWh per month. Here is how a standard utility bill computes:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">Billing Line Item</th>
                <th className="py-3 px-4">Rate Basis</th>
                <th className="py-3 px-4">Unit Rate</th>
                <th className="py-3 px-4">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Electric Generation Supply</td>
                <td className="py-2.5 px-4">900 kWh</td>
                <td className="py-2.5 px-4 font-mono">$0.085 / kWh</td>
                <td className="py-2.5 px-4 font-mono font-semibold">$76.50</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Distribution &amp; Delivery</td>
                <td className="py-2.5 px-4">900 kWh</td>
                <td className="py-2.5 px-4 font-mono">$0.055 / kWh</td>
                <td className="py-2.5 px-4 font-mono font-semibold">$49.50</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Monthly Customer Access Fee</td>
                <td className="py-2.5 px-4">Fixed Monthly</td>
                <td className="py-2.5 px-4 font-mono">Flat fee</td>
                <td className="py-2.5 px-4 font-mono font-semibold">$15.00</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Regulatory Surcharges &amp; Taxes</td>
                <td className="py-2.5 px-4">5% on utility charges</td>
                <td className="py-2.5 px-4 font-mono">5.0%</td>
                <td className="py-2.5 px-4 font-mono font-semibold">$7.05</td>
              </tr>
              <tr className="bg-blue-50/60 font-bold text-slate-900">
                <td className="py-3 px-4 text-blue-900">Total Monthly Electric Bill</td>
                <td className="py-3 px-4 text-blue-900">900 kWh Total</td>
                <td className="py-3 px-4 font-mono text-blue-900">$0.1645 / kWh Effective</td>
                <td className="py-3 px-4 font-mono text-blue-900 text-base">$148.05</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tariff Structures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-indigo-600" />
            <span>Tiered Inverted-Block Rates</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Under tiered rate structures, baseline consumption (e.g., initial 500 kWh) is charged at a lower rate ($0.12/kWh). Once consumption exceeds the threshold, higher tier rates ($0.22/kWh) apply to discourage excessive grid usage.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-600" />
            <span>Time-of-Use (TOU) Rates</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            TOU tariffs vary the price per kWh by time of day. On-peak afternoon hours (4 PM to 9 PM) carry high rates, while overnight off-peak hours offer significant discounts, making battery storage and smart scheduling highly profitable.
          </p>
        </div>
      </div>
    </section>
  );
};
