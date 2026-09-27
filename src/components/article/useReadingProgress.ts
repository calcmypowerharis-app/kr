"use client";

import { useState, useEffect } from "react";

export function useReadingProgress(targetId = "article-content"): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const totalScrollable = elementHeight - viewportHeight;
      if (totalScrollable <= 0) {
        setProgress(100);
        return;
      }

      const current = scrollTop - elementTop;
      const calculated = Math.round((current / totalScrollable) * 100);
      setProgress(Math.min(100, Math.max(0, calculated)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetId]);

  return progress;
}
