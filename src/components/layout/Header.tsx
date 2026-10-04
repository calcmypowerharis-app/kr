"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X, ArrowRight, Calculator, BookOpen, ChevronRight } from "lucide-react";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition shrink-0">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition whitespace-nowrap">
              CalcMyPower
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
              Power Calculators
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
          <Link
            href="/generator-size-calculator"
            className="hover:text-blue-600 transition whitespace-nowrap"
          >
            Generator Sizing
          </Link>
          <Link
            href="/watts-to-amps-calculator"
            className="hover:text-blue-600 transition whitespace-nowrap"
          >
            Watts to Amps
          </Link>
          <Link
            href="/ups-battery-backup-calculator"
            className="hover:text-blue-600 transition whitespace-nowrap hidden lg:block"
          >
            UPS Runtime
          </Link>
          <Link
            href="/calculators#sizing-guides"
            className="hover:text-blue-600 transition text-slate-700 font-medium whitespace-nowrap"
          >
            Sizing Guides
          </Link>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 text-white bg-blue-600 hover:bg-blue-700 font-semibold transition px-4 py-2 rounded-xl shadow-xs shadow-blue-500/20 whitespace-nowrap text-xs sm:text-sm"
          >
            <span>All Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Mobile Header Action & Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/calculators"
            className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg whitespace-nowrap hover:bg-blue-100 transition"
          >
            Calculators
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-3 py-1">
              Core Calculators
            </span>
            <Link
              href="/generator-size-calculator"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-xs sm:text-sm font-semibold text-slate-800"
            >
              <span>Generator Size Calculator</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/generator-amperage-chart-calculator"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-xs sm:text-sm font-semibold text-slate-800"
            >
              <span>Generator Amperage Chart</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/watts-to-amps-calculator"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-xs sm:text-sm font-semibold text-slate-800"
            >
              <span>Watts to Amps Calculator</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/electricity-use-calculator"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-xs sm:text-sm font-semibold text-slate-800"
            >
              <span>Electricity Use Calculator</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/ups-battery-backup-calculator"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-xs sm:text-sm font-semibold text-slate-800"
            >
              <span>UPS Battery Backup Runtime</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/voltage-drop-calculator"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-xs sm:text-sm font-semibold text-slate-800"
            >
              <span>Voltage Drop Calculator</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-3 py-1">
              Resources &amp; Directory
            </span>
            <Link
              href="/calculators#sizing-guides"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-xs sm:text-sm font-semibold text-slate-800"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Sizing Guides Directory</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/calculators"
              className="flex items-center justify-center gap-2 p-3 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition"
            >
              <Calculator className="w-4 h-4" />
              <span>Browse All Calculators Directory</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
