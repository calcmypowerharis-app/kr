import React from "react";
import { ShoppingBag, ExternalLink } from "lucide-react";
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";

export interface SidebarHardwareItem {
  title: string;
  subtitle: string;
  brands?: string;
  searchQuery: string;
}

interface SidebarHardwareReferenceProps {
  title?: string;
  subtitle?: string;
  items: SidebarHardwareItem[];
  className?: string;
}

export const SidebarHardwareReference: React.FC<SidebarHardwareReferenceProps> = ({
  title = "Hardware Reference",
  subtitle = "Standard equipment and accessories verified for this calculation:",
  items,
  className = "",
}) => {
  return (
    <div className={`bg-slate-50/80 rounded-2xl border border-slate-200/90 p-4 sm:p-5 space-y-3.5 text-xs shadow-xs ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
          <span>{title}</span>
        </div>
        <span className="text-[10px] font-medium text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded">
          Amazon Associate
        </span>
      </div>

      {subtitle && <p className="text-slate-600 leading-normal">{subtitle}</p>}

      <div className="space-y-2.5">
        {items.map((item, idx) => {
          const searchUrl = getAmazonSearchUrl(item.searchQuery);
          return (
            <a
              key={idx}
              href={searchUrl}
              target="_blank"
              rel={AMAZON_LINK_REL}
              className="group block p-3 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-sm transition text-xs font-medium text-slate-800"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-amber-600 transition leading-snug">
                    {item.title}
                  </div>
                  {item.brands && (
                    <div className="text-[11px] text-amber-600/90 font-medium mt-0.5">
                      {item.brands}
                    </div>
                  )}
                  <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {item.subtitle}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-amber-600 shrink-0 ml-1 mt-0.5 transition" />
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 font-medium">Verified Compatibility</span>
                <span className="font-bold text-amber-950 bg-amber-400 group-hover:bg-amber-300 px-2 py-0.5 rounded-md transition inline-flex items-center gap-1">
                  <span>Shop Amazon</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-600 pt-1 border-t border-slate-200/70 text-center">
        As an Amazon Associate, CalcMyPower earns from qualifying purchases.
      </p>
    </div>
  );
};
