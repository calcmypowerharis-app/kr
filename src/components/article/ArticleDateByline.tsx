import React from "react";
import { formatEditorialDate } from "@/lib/seo/registry";

interface ArticleDateBylineProps {
  datePublished: string;
  lastModified?: string;
  className?: string;
}

export function ArticleDateByline({
  datePublished,
  lastModified,
  className = "text-slate-500",
}: ArticleDateBylineProps) {
  const publishedFormatted = formatEditorialDate(datePublished);
  const modifiedFormatted = lastModified
    ? formatEditorialDate(lastModified)
    : null;

  const hasMeaningfulUpdate =
    modifiedFormatted !== null &&
    lastModified !== datePublished &&
    modifiedFormatted !== publishedFormatted;

  return (
    <span className={className}>
      <span>Published {publishedFormatted}</span>
      {hasMeaningfulUpdate && (
        <>
          <span className="mx-1 text-slate-400" aria-hidden="true">
            ·
          </span>
          <span>Last updated {modifiedFormatted}</span>
        </>
      )}
    </span>
  );
}
