import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition">
              CalcMyPower
            </span>
            <span className="hidden sm:inline-block ml-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Power Calculators
            </span>
          </div>
        </Link>

        {/* Navigation Categories */}
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          <Link
            href="/ups-battery-backup-calculator"
            className="hover:text-blue-600 transition hidden md:block"
          >
            UPS Runtime
          </Link>
          <Link
            href="/watts-to-amps-calculator"
            className="hover:text-blue-600 transition hidden md:block"
          >
            Watts to Amps
          </Link>
          <Link
            href="/generator-size-calculator"
            className="hover:text-blue-600 transition hidden md:block"
          >
            Generator Size
          </Link>
          <Link
            href="/calculators"
            className="text-slate-900 hover:text-blue-600 font-semibold transition"
          >
            All Calculators
          </Link>
        </nav>
      </div>
    </header>
  );
};
