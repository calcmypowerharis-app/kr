import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface WorkedStep {
  stepNumber: number;
  title: string;
  calculation: string;
  explanation: string;
}

interface WorkedExampleSectionProps {
  title?: string;
  scenario: string;
  steps: WorkedStep[];
  conclusion: string;
}

export const WorkedExampleSection: React.FC<WorkedExampleSectionProps> = ({
  title = "Step-by-Step Worked Example",
  scenario,
  steps,
  conclusion,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
      </div>

      {/* Scenario Overview */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm text-slate-700 leading-relaxed">
        <span className="font-bold text-slate-900">Example Scenario: </span>
        {scenario}
      </div>

      {/* Step by step list */}
      <div className="space-y-4 mb-6">
        {steps.map((s) => (
          <div
            key={s.stepNumber}
            className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 bg-white"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              {s.stepNumber}
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="font-semibold text-slate-900 text-sm">{s.title}</div>
              <div className="font-mono text-xs md:text-sm bg-slate-900 text-emerald-400 py-1.5 px-3 rounded-lg inline-block font-medium">
                {s.calculation}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{s.explanation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion box */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs md:text-sm text-emerald-950 font-medium leading-relaxed">
        <span className="font-bold">Result: </span>
        {conclusion}
      </div>
    </section>
  );
};
