import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span>CalcMyPower.com</span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-md">
              Practical power, battery backup, generator, and electrical calculators for US residential, RV, and off-grid systems.
            </p>
          </div>

          {/* Core Calculators */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Calculators
            </h4>
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
                  href="/ups-battery-backup-calculator"
                  className="hover:text-white transition"
                >
                  UPS Backup Run-Time
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
                  href="/watts-to-amps-calculator"
                  className="hover:text-white transition"
                >
                  Watts to Amps Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/amps-to-watts-calculator"
                  className="hover:text-white transition"
                >
                  Amps to Watts Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-panel-tilt-calculator"
                  className="hover:text-white transition"
                >
                  Solar Panel Tilt Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-battery-calculator"
                  className="hover:text-white transition"
                >
                  Solar Battery Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-charge-controller-calculator"
                  className="hover:text-white transition"
                >
                  Solar Charge Controller Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/voltage-drop-calculator"
                  className="hover:text-white transition"
                >
                  Voltage Drop Calculator
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
              <li>
                <Link href="/calculators" className="hover:text-white transition">
                  All Calculators Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Sizing Guides */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Sizing Guides
            </h4>
            <ul className="space-y-2 text-xs">
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
                  href="/what-size-generator-to-run-a-refrigerator"
                  className="hover:text-white transition"
                >
                  Generator Size for a Refrigerator
                </Link>
              </li>
              <li>
                <Link
                  href="/what-does-ah-mean-on-a-battery"
                  className="hover:text-white transition"
                >
                  Battery Amp-Hours (Ah) Explained
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-a-watt-hour"
                  className="hover:text-white transition"
                >
                  Watt-Hours (Wh) Explained
                </Link>
              </li>
              <li>
                <Link
                  href="/how-long-will-a-100ah-battery-last"
                  className="hover:text-white transition"
                >
                  100Ah Battery Runtime Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="hover:text-white transition"
                >
                  Solar Panels Series vs Parallel Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/how-many-solar-panels-do-i-need"
                  className="hover:text-white transition"
                >
                  How Many Solar Panels Do I Need?
                </Link>
              </li>
              <li>
                <Link
                  href="/how-much-energy-does-a-solar-panel-produce"
                  className="hover:text-white transition"
                >
                  How Much Energy Does a Solar Panel Produce?
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Standards */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Standards &amp; Code
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>National Electrical Code (NEC)</li>
              <li>IEEE Battery Standard 485</li>
              <li>UL 1741 Inverter Standard</li>
              <li>NREL PVWatts Guidelines</li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure & Safety Note */}
        <div className="pt-8 border-t border-slate-800 text-xs space-y-3 text-slate-500">
          <p>
            <span className="font-semibold text-slate-400">Amazon Associates Disclosure: </span>
            CalcMyPower.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
          <p>
            <span className="font-semibold text-slate-400">Disclaimer: </span>
            Calculations provided on this website are for preliminary estimation and educational purposes only. Always verify critical power designs with a licensed electrician or professional electrical engineer in accordance with local building codes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-slate-500 text-[11px] border-t border-slate-850">
            <span>© {new Date().getFullYear()} CalcMyPower. All rights reserved.</span>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <span>US-Focused Energy Tools</span>
              <span>•</span>
              <span>Privacy &amp; Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
