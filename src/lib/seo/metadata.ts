import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./registry";

export interface BuildMetadataOptions {
  /**
   * Page title WITHOUT the "| CalcMyPower" brand suffix (unless isRoot is true).
   * Root layout.tsx template automatically appends "%s | CalcMyPower".
   */
  title: string;
  description: string;
  path: `/${string}`;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt: string;
  }>;
  keywords?: string[];
  isRoot?: boolean;
}

/**
 * Generates consistent, complete Next.js Metadata for any page on CalcMyPower.
 * Prevents duplicate "| CalcMyPower" brand suffixes and ensures Open Graph,
 * Twitter Card, and Canonical URLs are always self-consistent.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogType = "website",
  images,
  keywords,
  isRoot = false,
}: BuildMetadataOptions): Metadata {
  const canonicalUrl = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const cleanTitle = title.replace(/\s*\|\s*CalcMyPower$/i, "").trim();
  const socialTitle =
    ogTitle || (isRoot ? title : `${cleanTitle} | ${SITE_NAME}`);
  const socialDescription = ogDescription || description;

  return {
    title: isRoot ? { absolute: title } : cleanTitle,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: ogType,
      ...(images && images.length > 0 ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      ...(images && images.length > 0
        ? { images: images.map((img) => img.url) }
        : {}),
    },
  };
}
