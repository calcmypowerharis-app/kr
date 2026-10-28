"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, ShieldCheck, ShoppingCart, Check, Star } from "lucide-react";
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";
import {
  getHardwareClusterForSlug,
  HardwareProduct,
} from "@/lib/monetization/hardware-catalog";
import { HardwareIcon } from "@/components/monetization/HardwareIcons";

interface RecommendedHardwareBoxProps {
  calculatorSlug?: string;
}

export const RecommendedHardwareBox: React.FC<RecommendedHardwareBoxProps> = ({
  calculatorSlug,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cluster = getHardwareClusterForSlug(calculatorSlug);

  if (!isMounted) return null;

  const getRibbonBadgeClass = (color: HardwareProduct["ribbonColor"]) => {
    switch (color) {
      case "amber":
        return "bg-amber-500 text-slate-950 border-amber-600/40";
      case "blue":
        return "bg-blue-600 text-white border-blue-700/40";
      case "emerald":
        return "bg-emerald-600 text-white border-emerald-700/40";
      default:
        return "bg-slate-800 text-white border-slate-700";
    }
  };

  return (
    <section className="bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-sm space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl border border-amber-500/20 shadow-xs">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {cluster.clusterTitle}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mt-0.5">
              {cluster.subtitle}
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>NEC &amp; UL Standards Verified</span>
        </div>
      </div>

      {/* 3-Column Wirecutter / Buyer's Guide Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cluster.items.map((item) => {
          const searchUrl = getAmazonSearchUrl(item.searchQuery);
          return (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-lg transition-all duration-200 overflow-hidden group"
            >
              {/* Top Ribbon Badge */}
              <div className="pt-3 px-4 flex items-center justify-between">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs ${getRibbonBadgeClass(
                    item.ribbonColor
                  )}`}
                >
                  {item.badge}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </span>
              </div>

              {/* Product Visual Showcase Header with Polish */}
              <div className="my-3 mx-4 p-2 rounded-2xl bg-gradient-to-b from-slate-50/90 via-white to-slate-50/60 border border-slate-200/70 flex items-center justify-center relative overflow-hidden group-hover:border-amber-400/60 transition-colors">
                <HardwareIcon name={item.iconName} className="w-full h-28 max-w-[200px] transition-transform duration-200 group-hover:scale-105" />
              </div>

              {/* Product Info & Specs */}
              <div className="px-5 pb-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                      {item.brand}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {item.priceTier}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* 3 Checkmarked Spec Bullets */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  {item.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Full-Width High-Contrast Amazon Amber CTA Button */}
                <div className="pt-2">
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel={AMAZON_LINK_REL}
                    className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-xs flex items-center justify-center gap-2 text-xs sm:text-sm transition-all group-hover:shadow-md"
                  >
                    <span>Check Price &amp; Reviews on Amazon</span>
                    <ExternalLink className="w-4 h-4 text-slate-950 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FTC Associate Micro-Disclosure */}
      <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          As an Amazon Associate, CalcMyPower earns from qualifying purchases. Pricing and availability subject to change.
        </p>
        <span className="font-semibold text-slate-600">
          Independent Engineering Hardware Selection
        </span>
      </div>
    </section>
  );
};
