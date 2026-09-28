import { MetadataRoute } from "next";
import {
  SITE_URL,
  CORE_ROUTE_REGISTRY,
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
} from "@/lib/seo/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreEntries: MetadataRoute.Sitemap = CORE_ROUTE_REGISTRY.map((route) => ({
    url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: new Date(`${route.lastModified}T00:00:00Z`),
  }));

  const calculatorEntries: MetadataRoute.Sitemap = CALCULATOR_REGISTRY.map(
    (calc) => ({
      url: `${SITE_URL}${calc.path}`,
      lastModified: new Date(`${calc.lastModified}T00:00:00Z`),
    })
  );

  const guideEntries: MetadataRoute.Sitemap = GUIDE_REGISTRY.map((guide) => ({
    url: `${SITE_URL}${guide.path}`,
    lastModified: new Date(`${guide.lastModified}T00:00:00Z`),
  }));

  return [...coreEntries, ...calculatorEntries, ...guideEntries];
}
