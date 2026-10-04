import React from "react";
import { BookOpen } from "lucide-react";

interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
  description: string;
}

interface FormulaSectionProps {
  title?: string;
  formulaDisplay: string;
  description: string;
  variables: FormulaVariable[];
  notes?: string[];
}

export const FormulaSection: React.FC<FormulaSectionProps> = ({
  title = "Calculation Methodology & Formula",
  formulaDisplay,
  description,
  variables,
  notes = [],
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <BookOpen className="w-5 h-5" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
        {description}
      </p>

      {/* Formula Code / Display Box */}
      <div className="bg-slate-900 text-emerald-400 font-mono text-sm md:text-base p-4 md:p-5 rounded-xl border border-slate-800 shadow-inner mb-6 overflow-x-auto">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Formula</div>
        <div className="font-semibold text-white tracking-wide">{formulaDisplay}</div>
      </div>

      {/* Variables Definition List */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Variables &amp; Constants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {variables.map((v, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-sm"
            >
              <div className="font-semibold text-slate-900 flex items-center justify-between">
                <span>{v.name}</span>
                <code className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-blue-600 font-bold">
                  {v.symbol} ({v.unit})
                </code>
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-normal">
                {v.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Engineering Notes */}
      {notes.length > 0 && (
        <div className="border-t border-slate-100 pt-4">
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-500">
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
