import { MetadataRoute } from "next";
import {
  SITE_URL,
  CORE_ROUTE_REGISTRY,
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
} from "@/lib/seo/registry";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapSignal {
  changeFrequency: ChangeFrequency;
  priority: number;
}

const CORE_ROUTE_SIGNALS: Record<
  "/" | "/calculators" | "/about" | "/contact" | "/privacy" | "/terms",
  SitemapSignal
> = {
  "/": { changeFrequency: "weekly", priority: 1.0 },
  "/calculators": { changeFrequency: "weekly", priority: 0.9 },
  "/about": { changeFrequency: "monthly", priority: 0.5 },
  "/contact": { changeFrequency: "monthly", priority: 0.5 },
  "/privacy": { changeFrequency: "monthly", priority: 0.3 },
  "/terms": { changeFrequency: "monthly", priority: 0.3 },
};

const CALCULATOR_SIGNAL: SitemapSignal = {
  changeFrequency: "monthly",
  priority: 0.9,
};

const GUIDE_SIGNAL: SitemapSignal = {
  changeFrequency: "monthly",
  priority: 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const coreEntries: MetadataRoute.Sitemap = CORE_ROUTE_REGISTRY.map((route) => {
    const signals = CORE_ROUTE_SIGNALS[route.path] ?? {
      changeFrequency: "monthly",
      priority: 0.3,
    };

    return {
      url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
      lastModified: new Date(`${route.lastModified}T00:00:00Z`),
      changeFrequency: signals.changeFrequency,
      priority: signals.priority,
    };
  });

  const calculatorEntries: MetadataRoute.Sitemap = CALCULATOR_REGISTRY.map(
    (calc) => ({
      url: `${SITE_URL}${calc.path}`,
      lastModified: new Date(`${calc.lastModified}T00:00:00Z`),
      changeFrequency: CALCULATOR_SIGNAL.changeFrequency,
      priority: CALCULATOR_SIGNAL.priority,
    })
  );

  const guideEntries: MetadataRoute.Sitemap = GUIDE_REGISTRY.map((guide) => ({
    url: `${SITE_URL}${guide.path}`,
    lastModified: new Date(`${guide.lastModified}T00:00:00Z`),
    changeFrequency: GUIDE_SIGNAL.changeFrequency,
    priority: GUIDE_SIGNAL.priority,
  }));

  return [...coreEntries, ...calculatorEntries, ...guideEntries];
}
