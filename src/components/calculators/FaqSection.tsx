import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  faqs: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  title = "Frequently Asked Questions",
  faqs,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            open={idx === 0}
            className="group border border-slate-200 rounded-xl overflow-hidden transition-colors"
          >
            <summary className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-semibold text-sm md:text-base text-slate-900">
                {faq.question}
              </h3>
              <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 group-open:rotate-180 group-open:text-blue-600" />
            </summary>
            <div className="px-5 pb-5 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-3">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
