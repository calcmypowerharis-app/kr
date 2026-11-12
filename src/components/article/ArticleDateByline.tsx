import React from "react";
import Link from "next/link";
import { formatEditorialDate } from "@/lib/seo/registry";

interface ArticleDateBylineProps {
  datePublished: string;
  lastModified?: string;
  authorName?: string;
  authorUrl?: string;
  authorHref?: string;
  showAuthor?: boolean;
  codeStandard?: string;
  className?: string;
}

/**
 * Editorial Article Date and Author Byline component.
 * Renders visible institutional author attribution linked to /about (E-E-A-T Quality Gate)
 * and formatted publication and update dates with 1:1 schema parity.
 * Default link target: href="/about"
 */
export function ArticleDateByline({
  datePublished,
  lastModified,
  authorName = "CalcMyPower Technical Publishing",
  authorUrl = "/about",
  authorHref,
  showAuthor = true,
  codeStandard,
  className = "text-slate-500",
}: ArticleDateBylineProps) {
  const targetUrl = authorHref ?? authorUrl;
  const publishedFormatted = formatEditorialDate(datePublished);
  const modifiedFormatted = lastModified
    ? formatEditorialDate(lastModified)
    : null;

  const hasMeaningfulUpdate =
    modifiedFormatted !== null &&
    lastModified !== datePublished &&
    modifiedFormatted !== publishedFormatted;

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 ${className}`}
    >
      {showAuthor && (
        <>
          <span className="inline-flex items-center gap-1">
            <span>By</span>
            <Link
              href={targetUrl}
              className="font-medium text-slate-700 hover:text-blue-600 transition-colors underline decoration-slate-300 hover:decoration-blue-500 underline-offset-2 py-0.5"
            >
              {authorName}
            </Link>
          </span>
          <span className="text-slate-400" aria-hidden="true">
            ·
          </span>
        </>
      )}
      {codeStandard && (
        <>
          <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
            <span>Reviewed against</span>
            <Link
              href="/about#methodology"
              className="font-mono text-slate-800 hover:text-blue-600 transition underline decoration-slate-300 hover:decoration-blue-500 underline-offset-2"
            >
              {codeStandard}
            </Link>
          </span>
          <span className="text-slate-400" aria-hidden="true">
            ·
          </span>
        </>
      )}
      <span className="whitespace-nowrap">Published {publishedFormatted}</span>
      {hasMeaningfulUpdate && (
        <>
          <span className="text-slate-400" aria-hidden="true">
            ·
          </span>
          <span className="whitespace-nowrap">
            Last updated {modifiedFormatted}
          </span>
        </>
      )}
    </span>
  );
}
