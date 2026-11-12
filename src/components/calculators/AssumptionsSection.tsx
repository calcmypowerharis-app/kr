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

      {/* Unified Responsive 4-Column Assumptions Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-left text-xs md:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
              <th className="py-3 px-3.5 font-semibold whitespace-nowrap">Parameter</th>
              <th className="py-3 px-3.5 font-semibold whitespace-nowrap">Model Default</th>
              <th className="py-3 px-3.5 font-semibold whitespace-nowrap">Typical Field Range</th>
              <th className="py-3 px-3.5 font-semibold min-w-[200px]">{impactHeader}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {assumptions.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="py-3 px-3.5 font-medium text-slate-900 whitespace-nowrap sm:whitespace-normal">{row.parameter}</td>
                <td className="py-3 px-3.5 font-mono text-blue-600 whitespace-nowrap">{row.defaultVal}</td>
                <td className="py-3 px-3.5 whitespace-nowrap sm:whitespace-normal">{row.realisticRange}</td>
                <td className="py-3 px-3.5 leading-relaxed">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
