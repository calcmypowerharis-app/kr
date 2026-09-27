"use client";

import React from "react";
import { useReadingProgress } from "./useReadingProgress";

export const ReadingProgressBar: React.FC = () => {
  const progress = useReadingProgress("article-content");

  return (
    <div
      className="fixed top-16 left-0 right-0 z-40 h-1 bg-slate-200/50 pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Article reading progress"
    >
      <div
        className="h-full bg-blue-600 transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
