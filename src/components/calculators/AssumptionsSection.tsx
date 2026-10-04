import React from "react";
import { Sliders } from "lucide-react";

export interface AssumptionItem {
  parameter: string;
  defaultVal: string;
  realisticRange: string;
  impact: string;
}

interface AssumptionsSectionProps {
  title?: string;
  description: string;
  assumptions: AssumptionItem[];
  impactHeader?: string;
}

export const AssumptionsSection: React.FC<AssumptionsSectionProps> = ({
  title = "Calculation Assumptions & Real-World Variables",
  description,
  assumptions,
  impactHeader = "Practical Impact",
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
          <Sliders className="w-5 h-5" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
        {description}
      </p>

      {/* Mobile (<640px): Stacked definition-row layout */}
      <div className="sm:hidden divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
        {assumptions.map((row, i) => (
          <div key={i} className="p-4 bg-white space-y-2 text-xs">
            <div className="font-bold text-slate-900 text-sm">{row.parameter}</div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600">
              <div>
                <span className="text-slate-600 font-medium">Default: </span>
                <span className="font-mono font-semibold text-blue-600">{row.defaultVal}</span>
              </div>
              <div>
                <span className="text-slate-600 font-medium">Typical Range: </span>
                <span className="text-slate-700">{row.realisticRange}</span>
              </div>
            </div>
            <div className="pt-1 text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-700">{impactHeader}: </span>
              {row.impact}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet & Desktop (>=640px): 4-column table layout */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-xs md:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
              <th className="py-3 px-3.5 font-semibold">Parameter</th>
              <th className="py-3 px-3.5 font-semibold">Model Default</th>
              <th className="py-3 px-3.5 font-semibold">Typical Field Range</th>
              <th className="py-3 px-3.5 font-semibold">{impactHeader}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {assumptions.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="py-3 px-3.5 font-medium text-slate-900">{row.parameter}</td>
                <td className="py-3 px-3.5 font-mono text-blue-600">{row.defaultVal}</td>
                <td className="py-3 px-3.5">{row.realisticRange}</td>
                <td className="py-3 px-3.5">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
