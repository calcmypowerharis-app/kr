import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span>CalcMyPower.com</span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              High-utility electrical, battery backup, solar PV, and generator sizing calculators for US residential, RV, and off-grid power systems.
            </p>
          </div>

          {/* Top Core Calculators */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Top Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/generator-size-calculator"
                  className="hover:text-white transition"
                >
                  Generator Size Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/electricity-use-calculator"
                  className="hover:text-white transition"
                >
                  Electricity Usage Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/electricity-cost-calculator"
                  className="hover:text-white transition"
                >
                  Electricity Cost Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/battery-capacity-calculator"
                  className="hover:text-white transition"
                >
                  Battery Capacity Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/ups-battery-backup-calculator"
                  className="hover:text-white transition"
                >
                  UPS Backup Runtime
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-system-size-calculator"
                  className="hover:text-white transition"
                >
                  Solar System Size Calculator
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/calculators"
                  className="text-blue-400 font-semibold hover:text-blue-300 transition"
                >
                  View All 16 Calculators &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Power Clusters */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Power Clusters
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/calculators#generators"
                  className="hover:text-white transition"
                >
                  Generator Sizing &amp; Outages
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators#solar"
                  className="hover:text-white transition"
                >
                  Solar PV &amp; Array Sizing
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators#ups-battery"
                  className="hover:text-white transition"
                >
                  UPS &amp; Battery Bank Storage
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators#electricity"
                  className="hover:text-white transition"
                >
                  Electrical Circuits &amp; Costs
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                Featured Guides
              </li>
              <li>
                <Link
                  href="/what-size-generator-do-i-need-for-my-house"
                  className="hover:text-white transition"
                >
                  House Generator Sizing Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="hover:text-white transition"
                >
                  Solar Series vs Parallel Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Standards */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Trust &amp; Standards
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About CalcMyPower
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                Engineering Baselines
              </li>
              <li>National Electrical Code (NEC NFPA 70)</li>
              <li>IEEE Battery Standard 485</li>
              <li>UL 1741 Inverter Standard</li>
              <li>NREL PVWatts Sizing Models</li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure & Safety Note */}
        <div className="pt-8 border-t border-slate-800 text-xs space-y-3 text-slate-400">
          <p>
            <span className="font-semibold text-slate-300">Amazon Associates Disclosure: </span>
            CalcMyPower.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
          <p>
            <span className="font-semibold text-slate-300">Disclaimer: </span>
            Calculations provided on this website are for preliminary estimation and educational purposes only. Always verify critical power designs with a licensed electrician or professional electrical engineer in accordance with local building codes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-slate-400 text-[11px] border-t border-slate-800">
            <span>&copy; {new Date().getFullYear()} CalcMyPower. All rights reserved.</span>
            <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
              <span>&bull;</span>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
              <span>&bull;</span>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <span>&bull;</span>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
