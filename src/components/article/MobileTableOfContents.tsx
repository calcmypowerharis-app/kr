"use client";

import React, { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { TOC_ITEMS, TocItem } from "./tocData";
import { useReadingProgress } from "./useReadingProgress";

interface MobileTableOfContentsProps {
  items?: TocItem[];
}

export const MobileTableOfContents: React.FC<MobileTableOfContentsProps> = ({
  items = TOC_ITEMS,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const progress = useReadingProgress("article-content");

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
    <nav
      aria-label="Mobile table of contents"
      className="lg:hidden border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden mb-6"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-toc-list"
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-sm font-bold">On This Page</span>
          <span className="text-xs text-slate-500 font-normal">
            ({items.length} sections)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
            {progress}% read
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <ul
          id="mobile-toc-list"
          className="border-t border-slate-100 p-3 space-y-1 bg-slate-50/50 max-h-72 overflow-y-auto"
        >
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className="flex items-center py-2 px-3 text-xs text-slate-700 hover:text-blue-600 hover:bg-white rounded-lg transition min-h-[40px]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
