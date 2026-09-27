"use client";

import React from "react";
import { Zap, RotateCcw, Share2 } from "lucide-react";

interface CalculatorShellProps {
  title: string;
  badge?: string;
  description: string;
  category: string;
  lastUpdated?: string;
  onReset?: () => void;
  inputSection: React.ReactNode;
  resultSection: React.ReactNode;
  children?: React.ReactNode;
}

export const CalculatorShell: React.FC<CalculatorShellProps> = ({
  title,
  badge = "Interactive Tool",
  description,
  category,
  lastUpdated = "September 2026",
  onReset,
  inputSection,
  resultSection,
  children,
}) => {
  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Top Header & Breadcrumb Context */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold uppercase tracking-wider">
            {category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">{badge}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-400">Updated {lastUpdated}</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {title}
        </h1>

        <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
          {description}
        </p>
      </header>

      {/* Main Interactive Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs & Controls (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>Input Parameters</span>
            </div>
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
                title="Reset to default values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            )}
          </div>

          {inputSection}
        </div>

        {/* Right Column: Output / Result Card (5 cols on lg) */}
        <div className="lg:col-span-5 sticky top-6 space-y-6">
          {resultSection}
        </div>
      </div>

      {/* Supporting Sections (Methodology, Worked Example, Assumptions, FAQ, Disclaimer, Related Tools) */}
      {children && <div className="space-y-8 pt-4">{children}</div>}
    </div>
  );
};
