"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight, BookOpen, Calculator, Cpu, BatteryCharging } from "lucide-react";
import { TOC_ITEMS, TocItem } from "./tocData";
import { useReadingProgress } from "./useReadingProgress";

interface TableOfContentsProps {
  items?: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items = TOC_ITEMS }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const progress = useReadingProgress("article-content");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Collect intersecting entries
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Select the top-most intersecting section
          const sorted = intersecting.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -65% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-5 pr-2 select-none"
    >
      {/* On This Page Navigation Module */}
      <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              On This Page
            </span>
          </div>
          <span className="text-[11px] font-mono font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
            {progress}% read
          </span>
        </div>

        <ul className="space-y-1 text-xs border-l border-slate-200 ml-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className={`block py-1 pl-3 -ml-px border-l-2 transition rounded-r-md ${
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

      {/* Useful Tools Sidebar Module */}
      <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Useful Power Tools
          </h3>
        </div>

        <ul className="space-y-2 text-xs">
          <li>
            <Link
              href="/generator-size-calculator"
              className="font-medium text-slate-700 hover:text-blue-600 flex items-center justify-between group p-1.5 rounded-lg hover:bg-white transition"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                <span>Generator Sizing</span>
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
            </Link>
          </li>
          <li>
            <Link
              href="/watts-to-amps-calculator"
              className="font-medium text-slate-700 hover:text-blue-600 flex items-center justify-between group p-1.5 rounded-lg hover:bg-white transition"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-blue-500" />
                <span>Watts to Amps</span>
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
            </Link>
          </li>
          <li>
            <Link
              href="/ups-battery-backup-calculator"
              className="font-medium text-slate-700 hover:text-blue-600 flex items-center justify-between group p-1.5 rounded-lg hover:bg-white transition"
            >
              <span className="flex items-center gap-2">
                <BatteryCharging className="w-3.5 h-3.5 text-blue-500" />
                <span>UPS Runtime</span>
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
            </Link>
          </li>
        </ul>

        <div className="pt-2 border-t border-slate-200">
          <Link
            href="/generator-size-calculator"
            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>Custom Load Estimate</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
