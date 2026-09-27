"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronUp, List, X } from "lucide-react";
import { TOC_ITEMS, TocItem } from "./tocData";
import { useReadingProgress, useActiveSection } from "./useReadingProgress";

interface MobileArticleNavigatorProps {
  items?: TocItem[];
}

export const MobileArticleNavigator: React.FC<MobileArticleNavigatorProps> = ({
  items = TOC_ITEMS,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveSection(items);
  const progress = useReadingProgress("article-content");
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const currentItem = items.find((item) => item.id === activeId) || items[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-40">
      {/* Floating Menu Popover (anchored above the floating button) */}
      {isOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-label="Table of contents navigation menu"
          aria-modal="true"
          className="absolute bottom-full mb-2 right-0 w-[calc(100vw-2rem)] max-w-xs bg-white border border-slate-200/90 rounded-2xl shadow-2xl overflow-hidden p-3.5 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <List className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Article Sections
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
              aria-label="Close section menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section Links */}
          <ul className="max-h-[50vh] overflow-y-auto space-y-1 pr-1 overscroll-contain">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className={`block py-2 px-2.5 text-xs rounded-xl transition min-h-[38px] leading-snug ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Floating Navigator Button Pill */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Reading navigator: ${progress}% read, currently reading ${currentItem?.label}`}
        className="flex items-center gap-2 pl-3 pr-2.5 py-2 bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md rounded-full shadow-lg hover:shadow-xl border border-slate-700/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 select-none max-w-[calc(100vw-2rem)]"
      >
        {/* Progress badge */}
        <span className="text-[11px] font-mono font-bold text-blue-300 bg-blue-950/70 border border-blue-500/30 px-2 py-0.5 rounded-full shrink-0">
          {progress}%
        </span>

        {/* Current Section Label */}
        <span className="text-xs font-medium text-slate-200 truncate max-w-[130px] sm:max-w-[180px]">
          {currentItem?.label}
        </span>

        {/* Icon */}
        <ChevronUp
          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};
