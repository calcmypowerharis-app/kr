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
}

export const AssumptionsSection: React.FC<AssumptionsSectionProps> = ({
  title = "Calculation Assumptions & Real-World Variables",
  description,
  assumptions,
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

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs md:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
              <th className="py-3 px-3.5 font-semibold">Parameter</th>
              <th className="py-3 px-3.5 font-semibold">Model Default</th>
              <th className="py-3 px-3.5 font-semibold">Typical Field Range</th>
              <th className="py-3 px-3.5 font-semibold">Impact on Runtime</th>
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
