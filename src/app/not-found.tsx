import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Plug,
  BatteryCharging,
  Cpu,
  BookOpen,
  ArrowRight,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found (404)",
  description:
    "The requested page could not be found. Explore CalcMyPower's interactive electrical, battery backup, and generator sizing calculators.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-10">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>404 Page Not Found</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            We couldn&apos;t find that calculator or guide.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            The URL may have been mistyped or the tool may still be in development. Select one of our live interactive calculators or engineering sizing guides below:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Link
            href="/generator-size-calculator"
            className="group p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/60 hover:bg-white transition space-y-2"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <Plug className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
              Generator Size Calculator
            </h2>
            <p className="text-xs text-slate-600">
              Running watts, motor startup surge, and 1.25x planning capacity.
            </p>
          </Link>

          <Link
            href="/ups-battery-backup-calculator"
            className="group p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/60 hover:bg-white transition space-y-2"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
              UPS Runtime Calculator
            </h2>
            <p className="text-xs text-slate-600">
              12V/24V/48V battery backup hours for LiFePO4 and AGM banks.
            </p>
          </Link>

          <Link
            href="/watts-to-amps-calculator"
            className="group p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/60 hover:bg-white transition space-y-2"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
              Watts to Amps Calculator
            </h2>
            <p className="text-xs text-slate-600">
              Convert Watts to Amps across DC, 120V/240V AC, and 3-phase systems.
            </p>
          </Link>
        </div>

        <div className="border-t border-slate-200 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Popular Sizing Guides:</span>
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
              <Link
                href="/what-size-generator-do-i-need-for-my-house"
                className="text-blue-600 hover:underline font-medium"
              >
                House Generator Sizing Guide
              </Link>
              <Link
                href="/what-size-generator-to-run-a-refrigerator"
                className="text-blue-600 hover:underline font-medium"
              >
                Refrigerator Generator Sizing Guide
              </Link>
            </div>
          </div>

          <Link
            href="/calculators"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shrink-0"
          >
            <Compass className="w-4 h-4" />
            <span>Browse All Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
