/**
 * Structured Data (Schema.org / JSON-LD) Generators
 * CalcMyPower.com
 */

import { SITE_NAME, SITE_URL } from "./registry";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function generateOrganizationSchema({
  name = SITE_NAME,
  url = SITE_URL,
  logoUrl = `${SITE_URL}/icon.svg`,
  description = "US-focused electrical, battery backup, generator, and solar power engineering calculators and sizing guides.",
}: {
  name?: string;
  url?: string;
  logoUrl?: string;
  description?: string;
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name,
    url,
    description,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
  };
}

export function generateWebSiteSchema({
  name = SITE_NAME,
  url = SITE_URL,
  description = "Practical electrical, battery backup, solar, and power calculators with transparent formulas and clear engineering baselines.",
}: {
  name?: string;
  url?: string;
  description?: string;
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    url,
    description,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    inLanguage: "en-US",
  };
}

export function generateCollectionPageSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name,
    description,
    url,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
      })),
    },
  };
}

export function generateWebApplicationSchema({
  name,
  description,
  url,
  applicationCategory = "UtilitiesApplication",
  authorName = "CalcMyPower Technical Publishing",
  authorUrl = `${SITE_URL}/about`,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  authorName?: string;
  authorUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    inLanguage: "en-US",
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    author: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFaqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Normalizes a date string to ISO 8601 UTC format.
 * If input is YYYY-MM-DD, appends T00:00:00Z.
 * If input already has time component, preserves it.
 */
function normalizeIsoDate(dateStr: string): string {
  if (!dateStr) return dateStr;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return `${dateStr}T00:00:00Z`;
  }
  return dateStr;
}

export function generateArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "CalcMyPower Technical Publishing",
  authorUrl,
  publisherName = SITE_NAME,
  publisherUrl = SITE_URL,
  images = [],
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  authorUrl?: string;
  publisherName?: string;
  publisherUrl?: string;
  images?: string[];
}) {
  const resolvedAuthorUrl = authorUrl ?? `${publisherUrl}/about`;
  const normalizedImages = (
    images && images.length > 0 ? images : [`${publisherUrl}/og-image.jpg`]
  ).map((img) =>
    img.startsWith("http://") || img.startsWith("https://")
      ? img
      : `${publisherUrl}${img.startsWith("/") ? "" : "/"}${img}`
  );

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    url,
    datePublished: normalizeIsoDate(datePublished),
    dateModified: normalizeIsoDate(dateModified),
    author: {
      "@type": "Organization",
      name: authorName,
      url: resolvedAuthorUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: publisherName,
      url: publisherUrl,
      logo: {
        "@type": "ImageObject",
        url: `${publisherUrl}/icon.svg`,
      },
    },
    image: normalizedImages,
  };
}

