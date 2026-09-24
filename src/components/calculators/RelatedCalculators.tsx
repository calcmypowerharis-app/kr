import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

export interface RelatedTool {
  title: string;
  description: string;
  href: string;
  category: string;
}

interface RelatedCalculatorsProps {
  calculators: RelatedTool[];
}

export const RelatedCalculators: React.FC<RelatedCalculatorsProps> = ({
  calculators,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Calculator className="w-5 h-5" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
          Related Electrical & Solar Calculators
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {calculators.map((calc, i) => (
          <Link
            key={i}
            href={calc.href}
            className="group block p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition bg-slate-50/50 hover:bg-white"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                {calc.category}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
              {calc.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              {calc.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
