import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand Info & Standards */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span>CalcMyPower.com</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utilitarian electrical, battery backup, solar PV, and generator sizing calculators. Engineered for US homeowners, electricians, and off-grid installers with transparent mathematical formulas and NEC continuous-load margins.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Client-Side Calculations</span>
            </div>
          </div>

          {/* Column 2: Workbench Categories */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Workbench Calculators
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/#load-backup"
                  className="hover:text-white transition flex items-center justify-between"
                >
                  <span>Load &amp; Generator Backup</span>
                  <span className="text-slate-500 font-mono text-[11px]">5 Tools</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#solar-pv"
                  className="hover:text-white transition flex items-center justify-between"
                >
                  <span>Solar PV Systems</span>
                  <span className="text-slate-500 font-mono text-[11px]">4 Tools</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#battery-dc"
                  className="hover:text-white transition flex items-center justify-between"
                >
                  <span>Battery Storage &amp; Inverters</span>
                  <span className="text-slate-500 font-mono text-[11px]">2 Tools</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#wire-circuits"
                  className="hover:text-white transition flex items-center justify-between"
                >
                  <span>Wire, Circuit &amp; AC Power</span>
                  <span className="text-slate-500 font-mono text-[11px]">4 Tools</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link
                  href="/calculators"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1"
                >
                  <span>Browse All 15 Calculators &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Field Guides & Wiring Reference */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Field Sizing Guides
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/what-size-generator-do-i-need-for-my-house"
                  className="hover:text-white transition"
                >
                  Whole-House Generator Sizing
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="hover:text-white transition"
                >
                  Solar Wiring: Series vs. Parallel
                </Link>
              </li>
              <li>
                <Link
                  href="/how-long-will-a-100ah-battery-last"
                  className="hover:text-white transition"
                >
                  100Ah Battery Runtime Benchmarks
                </Link>
              </li>
              <li>
                <Link
                  href="/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle"
                  className="hover:text-white transition"
                >
                  15A vs. 20A Circuit Wattage Limits
                </Link>
              </li>
              <li>
                <Link
                  href="/what-does-ah-mean-on-a-battery"
                  className="hover:text-white transition"
                >
                  Amp-Hours (Ah) vs. Watt-Hours (Wh)
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link
                  href="/#field-guides"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1"
                >
                  <span>View All 10 Field Guides &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Trust & Disclaimers */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Engineering Trust &amp; Standards
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About CalcMyPower
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="hover:text-white transition">
                  Calculation Methodology &amp; NEC Baselines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact &amp; Technical Inquiries
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy (Zero Analytics Cookies)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service &amp; Safety Disclaimers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="border-t border-slate-800 pt-8 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong>Preliminary Engineering Planning Notice:</strong> Calculations provided by CalcMyPower.com are mathematical estimates based on published electrical formulas, equipment manufacturer specifications, and National Electrical Code (NEC / NFPA 70) continuous-load guidelines. Always consult a licensed electrician or electrical engineer before performing physical wiring, service panel modifications, or equipment installations.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} CalcMyPower. All rights reserved. US Power &amp; Electrical Calculators.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <Link href="/privacy" className="hover:text-slate-400 transition">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-400 transition">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-slate-400 transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
