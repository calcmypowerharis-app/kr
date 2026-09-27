/**
 * Structured Data (Schema.org / JSON-LD) Generators
 * CalcMyPower.com
 */

export function generateWebApplicationSchema({
  name,
  description,
  url,
  applicationCategory = "UtilitiesApplication",
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
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

export function generateWebSiteSchema({
  name = "CalcMyPower",
  url = "https://calcmypower.com",
  description = "Practical electrical, battery backup, solar, and power calculators with transparent formulas and clear engineering baselines.",
}: {
  name?: string;
  url?: string;
  description?: string;
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
  };
}

export function generateArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "CalcMyPower Technical Publishing",
  publisherName = "CalcMyPower",
  publisherUrl = "https://calcmypower.com",
  images = [],
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  publisherName?: string;
  publisherUrl?: string;
  images?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: authorName,
      url: publisherUrl,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: publisherUrl,
      logo: {
        "@type": "ImageObject",
        url: `${publisherUrl}/icon.svg`,
      },
    },
    image: images,
  };
}


