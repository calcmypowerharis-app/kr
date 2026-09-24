import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span>CalcMyPower.com</span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-md">
              Engineering-backed power, battery, solar, and electrical calculators. Built for homeowners, RV travelers, off-grid DIYers, and electrical professionals.
            </p>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Calculators
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/ups-battery-backup-calculator"
                  className="hover:text-white transition"
                >
                  UPS Backup Run-Time
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-white transition">
                  Watts to Amps Converter
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-white transition">
                  Solar Panel Sizing
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-white transition">
                  Wire Size Computation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Standards */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Standards & Code
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
              <span>Privacy & Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
