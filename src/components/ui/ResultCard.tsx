import React from "react";
import { AlertTriangle, Clock, Zap, BatteryCharging, ShieldAlert } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
}

interface ResultCardProps {
  primaryTitle: string;
  primaryValue: string;
  primarySubtext?: string;
  stats: StatItem[];
  warnings?: string[];
  batteryNote?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  primaryTitle,
  primaryValue,
  primarySubtext,
  stats,
  warnings = [],
  batteryNote,
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden border border-slate-800">
      {/* Primary Result Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 text-blue-300 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>{primaryTitle}</span>
        </div>
        <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-2 leading-none">
          {primaryValue}
        </div>
        {primarySubtext && (
          <p className="text-slate-400 text-sm mt-2">{primarySubtext}</p>
        )}
      </div>

      {/* Secondary Metrics Grid */}
      <div className="p-6 grid grid-cols-2 gap-4 bg-slate-900/80">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800"
          >
            <div className="text-xs font-medium text-slate-400 mb-1">
              {stat.label}
            </div>
            <div className="text-lg md:text-xl font-bold text-slate-100 flex items-baseline gap-1">
              <span>{stat.value}</span>
              {stat.unit && (
                <span className="text-xs font-normal text-slate-400">{stat.unit}</span>
              )}
            </div>
            {stat.subtext && (
              <div className="text-[11px] text-slate-500 mt-0.5">{stat.subtext}</div>
            )}
          </div>
        ))}
      </div>

      {/* Engineering Warnings & Advice */}
      {warnings.length > 0 && (
        <div className="p-4 bg-amber-500/10 border-t border-amber-500/20">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              {warnings.map((w, idx) => (
                <p key={idx} className="text-xs text-amber-200/90 leading-relaxed">
                  {w}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {batteryNote && (
        <div className="p-4 bg-blue-500/5 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <BatteryCharging className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{batteryNote}</span>
        </div>
      )}
    </div>
  );
};
