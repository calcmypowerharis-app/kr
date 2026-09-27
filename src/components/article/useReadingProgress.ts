"use client";

import { useState, useEffect } from "react";
import { TocItem } from "./tocData";

/**
 * Calculates reading progress percentage (0-100%) against a target container
 * using a 60fps (16ms) throttled passive listener to prevent main-thread scroll lag.
 */
export function useReadingProgress(targetId = "article-content"): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let lastRun = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const updateProgress = () => {
      const el = document.getElementById(targetId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const totalScrollable = elementHeight - viewportHeight;
      if (totalScrollable <= 0) {
        setProgress((prev) => (prev !== 100 ? 100 : prev));
        return;
      }

      const current = scrollTop - elementTop;
      const calculated = Math.round((current / totalScrollable) * 100);
      const clamped = Math.min(100, Math.max(0, calculated));
      setProgress((prev) => (prev !== clamped ? clamped : prev));
    };

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastRun >= 16) {
        lastRun = now;
        updateProgress();
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastRun = Date.now();
          timeoutId = null;
          updateProgress();
        }, 16);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateProgress();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetId]);

  return progress;
}

/**
 * Tracks the actively visible section heading using IntersectionObserver
 * combined with a 60fps throttled position check for accurate upward,
 * downward, and anchor-jump tracking.
 */
export function useActiveSection(items: TocItem[]): string {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    let lastRun = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const computeActiveSection = () => {
      const offset = 160;
      let currentId = elements[0].id;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          currentId = el.id;
        } else {
          break;
        }
      }

      setActiveId((prev) => (prev !== currentId ? currentId : prev));
    };

    const scheduleUpdate = () => {
      const now = Date.now();
      if (now - lastRun >= 16) {
        lastRun = now;
        computeActiveSection();
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastRun = Date.now();
          timeoutId = null;
          computeActiveSection();
        }, 16);
      }
    };

    const observer = new IntersectionObserver(
      () => {
        computeActiveSection();
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    computeActiveSection();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
    };
  }, [items]);

  return activeId;
}
