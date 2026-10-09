"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  BookOpen,
  Calculator,
  Cpu,
  BatteryCharging,
  Sun,
  Flame,
  Clock,
} from "lucide-react";
import { TOC_ITEMS, TocItem } from "./tocData";
import { useReadingProgress, useActiveSection } from "./useReadingProgress";

export type ArticleCluster = "generators" | "solar" | "ups-battery" | "electricity";

export interface SidebarTool {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SidebarCta {
  text: string;
  href: string;
}

export interface SidebarGuide {
  title: string;
  href: string;
}

export interface TableOfContentsProps {
  items?: TocItem[];
  cluster?: ArticleCluster;
  tools?: SidebarTool[];
  cta?: SidebarCta;
  relatedGuides?: SidebarGuide[];
}

const CLUSTER_CONFIG: Record<
  ArticleCluster,
  { tools: SidebarTool[]; cta: SidebarCta }
> = {
  generators: {
    tools: [
      {
        name: "Generator Size Calculator",
        href: "/generator-size-calculator",
        icon: Zap,
      },
      {
        name: "Watts to Amps Calculator",
        href: "/watts-to-amps-calculator",
        icon: Cpu,
      },
      {
        name: "Fuel Consumption Calculator",
        href: "/generator-fuel-consumption-calculator",
        icon: Flame,
      },
    ],
    cta: {
      text: "Custom Load Estimate",
      href: "/generator-size-calculator",
    },
  },
  solar: {
    tools: [
      {
        name: "Solar Charge Controller Calculator",
        href: "/solar-charge-controller-calculator",
        icon: Sun,
      },
      {
        name: "Solar System Size Calculator",
        href: "/solar-system-size-calculator",
        icon: Zap,
      },
      {
        name: "Solar Battery Calculator",
        href: "/solar-battery-calculator",
        icon: BatteryCharging,
      },
    ],
    cta: {
      text: "Size Solar System",
      href: "/solar-system-size-calculator",
    },
  },
  "ups-battery": {
    tools: [
      {
        name: "Battery Capacity Calculator",
        href: "/battery-capacity-calculator",
        icon: BatteryCharging,
      },
      {
        name: "UPS Runtime Calculator",
        href: "/ups-battery-backup-calculator",
        icon: Clock,
      },
      {
        name: "Inverter Size Calculator",
        href: "/inverter-size-calculator",
        icon: Cpu,
      },
    ],
    cta: {
      text: "Calculate Battery Bank",
      href: "/battery-capacity-calculator",
    },
  },
  electricity: {
    tools: [
      {
        name: "Electricity Cost Calculator",
        href: "/electricity-cost-calculator",
        icon: Calculator,
      },
      {
        name: "Electricity Usage Calculator",
        href: "/electricity-use-calculator",
        icon: Zap,
      },
      {
        name: "Watts to Amps Calculator",
        href: "/watts-to-amps-calculator",
        icon: Cpu,
      },
    ],
    cta: {
      text: "Calculate Electric Bill",
      href: "/electricity-cost-calculator",
    },
  },
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items = TOC_ITEMS,
  cluster = "generators",
  tools,
  cta,
  relatedGuides,
}) => {
  const activeId = useActiveSection(items);
  const progress = useReadingProgress("article-content");

  const currentItem = items.find((item) => item.id === activeId) || items[0];

  const clusterDefaults = CLUSTER_CONFIG[cluster] || CLUSTER_CONFIG.generators;
  const displayTools = tools || clusterDefaults.tools;
  const displayCta = cta || clusterDefaults.cta;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20 space-y-3 select-none"
    >
      {/* 1. Header with Reading Progress & Section Anchors */}
      <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-sm space-y-2.5">
        {/* Progress pill & label */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              On This Page
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
            {progress}% read
          </span>
        </div>

        {/* 2. Currently Reading Indicator */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-2 space-y-0.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
            Currently Reading
          </span>
          <p className="text-xs font-semibold text-slate-900 leading-snug truncate">
            {currentItem?.label}
          </p>
        </div>

        {/* 3. On This Page Section Anchors */}
        <ul className="space-y-0.5 text-xs border-l border-slate-200 ml-1 pt-0.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`block py-1 pl-3 -ml-px border-l-2 transition rounded-r-md leading-snug ${
                    isActive
                      ? "border-blue-600 text-blue-700 font-semibold bg-blue-50/70"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 4. Useful Power Tools Module */}
      <div className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50/80 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <Calculator className="w-3.5 h-3.5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Useful Power Tools
          </h3>
        </div>

        <ul className="space-y-1 text-xs">
          {displayTools.map((tool) => {
            const IconComponent = tool.icon || Zap;
            return (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="font-medium text-slate-700 hover:text-blue-600 flex items-center justify-between group px-1.5 py-1 rounded-lg hover:bg-white transition"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <IconComponent className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{tool.name}</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 shrink-0 transition" />
                </Link>
              </li>
            );
          })}
        </ul>

        {displayCta && (
          <div className="pt-2 border-t border-slate-200">
            <Link
              href={displayCta.href}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>{displayCta.text}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* 5. Optional Related Guides Module */}
      {relatedGuides && relatedGuides.length > 0 && (
        <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-sm space-y-2.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Related Guides
            </h3>
          </div>
          <ul className="space-y-1 text-xs">
            {relatedGuides.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="font-medium text-slate-700 hover:text-blue-600 flex items-center justify-between group px-1.5 py-1 rounded-lg hover:bg-slate-50 transition"
                >
                  <span className="truncate">{guide.title}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 shrink-0 transition" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
