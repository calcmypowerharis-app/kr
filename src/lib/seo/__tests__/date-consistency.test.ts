import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import {
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
  formatEditorialDate,
  getGuideBySlug,
} from "../registry";
import sitemap from "@/app/sitemap";

const APP_DIR = path.resolve(process.cwd(), "src/app");

describe("Sitewide Editorial & Calculator Date Consistency Quality Gate", () => {
  describe("1. Guide Registry Date Hygiene", () => {
    it("ensures every guide has valid ISO YYYY-MM-DD datePublished and lastModified", () => {
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      for (const guide of GUIDE_REGISTRY) {
        expect(
          isoDateRegex.test(guide.datePublished),
          `Guide ${guide.slug} datePublished "${guide.datePublished}" must be YYYY-MM-DD`
        ).toBe(true);
        expect(
          isoDateRegex.test(guide.lastModified),
          `Guide ${guide.slug} lastModified "${guide.lastModified}" must be YYYY-MM-DD`
        ).toBe(true);

        const pubTime = new Date(`${guide.datePublished}T00:00:00Z`).getTime();
        const modTime = new Date(`${guide.lastModified}T00:00:00Z`).getTime();
        expect(isNaN(pubTime)).toBe(false);
        expect(isNaN(modTime)).toBe(false);
        expect(
          modTime,
          `Guide ${guide.slug} lastModified (${guide.lastModified}) cannot be earlier than datePublished (${guide.datePublished})`
        ).toBeGreaterThanOrEqual(pubTime);
      }
    });

    it("verifies formatEditorialDate formats dates deterministically without timezone shift", () => {
      expect(formatEditorialDate("2026-09-28")).toBe("September 28, 2026");
      expect(formatEditorialDate("2026-10-01")).toBe("October 1, 2026");
      expect(formatEditorialDate("2026-10-09")).toBe("October 9, 2026");
    });

    it("retrieves guides by slug via getGuideBySlug helper", () => {
      const guide = getGuideBySlug("how-much-gas-does-a-generator-use");
      expect(guide).toBeDefined();
      expect(guide?.datePublished).toBe("2026-10-09");
      expect(getGuideBySlug("non-existent-guide")).toBeUndefined();
    });
  });

  describe("2. Article Header, OpenGraph, and JSON-LD Date Synchronization", () => {
    it("ensures all 15 editorial articles synchronize visible byline, openGraph times, and JSON-LD dates with registry", () => {
      for (const guide of GUIDE_REGISTRY) {
        const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
        expect(
          fs.existsSync(pagePath),
          `page.tsx for guide "${guide.slug}" must exist`
        ).toBe(true);

        const pageContent = fs.readFileSync(pagePath, "utf-8");

        // 1. Visible Byline Verification
        const bylineMatch = pageContent.match(
          /<ArticleDateByline\s+datePublished=["']([^"']+)["']\s+lastModified=["']([^"']+)["']/
        );
        expect(
          bylineMatch,
          `Article ${guide.slug} must render <ArticleDateByline> with datePublished and lastModified`
        ).not.toBeNull();

        const [, bylinePub, bylineMod] = bylineMatch!;
        expect(
          bylinePub,
          `Article ${guide.slug} byline datePublished does not match GUIDE_REGISTRY`
        ).toBe(guide.datePublished);
        expect(
          bylineMod,
          `Article ${guide.slug} byline lastModified does not match GUIDE_REGISTRY`
        ).toBe(guide.lastModified);

        // 2. OpenGraph Times Verification
        const ogPubMatch = pageContent.match(/publishedTime:\s*["']([^"']+)["']/);
        const ogModMatch = pageContent.match(/modifiedTime:\s*["']([^"']+)["']/);
        expect(
          ogPubMatch,
          `Article ${guide.slug} metadata.openGraph must contain publishedTime`
        ).not.toBeNull();
        expect(
          ogModMatch,
          `Article ${guide.slug} metadata.openGraph must contain modifiedTime`
        ).not.toBeNull();

        expect(
          ogPubMatch![1].startsWith(guide.datePublished),
          `Article ${guide.slug} og:publishedTime (${ogPubMatch![1]}) must match registry datePublished (${guide.datePublished})`
        ).toBe(true);
        expect(
          ogModMatch![1].startsWith(guide.lastModified),
          `Article ${guide.slug} og:modifiedTime (${ogModMatch![1]}) must match registry lastModified (${guide.lastModified})`
        ).toBe(true);

        // 3. JSON-LD Structured Data Verification
        const schemaPubMatch = pageContent.match(/datePublished:\s*["']([^"']+)["']/);
        const schemaModMatch = pageContent.match(/dateModified:\s*["']([^"']+)["']/);
        expect(
          schemaPubMatch,
          `Article ${guide.slug} articleSchema must contain datePublished`
        ).not.toBeNull();
        expect(
          schemaModMatch,
          `Article ${guide.slug} articleSchema must contain dateModified`
        ).not.toBeNull();

        expect(
          schemaPubMatch![1].startsWith(guide.datePublished),
          `Article ${guide.slug} schema datePublished (${schemaPubMatch![1]}) must match registry datePublished (${guide.datePublished})`
        ).toBe(true);
        expect(
          schemaModMatch![1].startsWith(guide.lastModified),
          `Article ${guide.slug} schema dateModified (${schemaModMatch![1]}) must match registry lastModified (${guide.lastModified})`
        ).toBe(true);
      }
    });

    it("verifies zero hardcoded stale 'Published [Month] 2026' string spans remain in article page files", () => {
      for (const guide of GUIDE_REGISTRY) {
        const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
        const pageContent = fs.readFileSync(pagePath, "utf-8");

        const hardcodedSpanMatch = pageContent.match(
          /Published\s+(September|October)\s+2026/
        );
        expect(
          hardcodedSpanMatch,
          `Article ${guide.slug} contains obsolete hardcoded date span: ${hardcodedSpanMatch?.[0]}`
        ).toBeNull();
      }
    });

    it("ensures all editorial articles use canonical semantic <article id=\"article-content\"> shell", () => {
      for (const guide of GUIDE_REGISTRY) {
        const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
        const pageContent = fs.readFileSync(pagePath, "utf-8");

        expect(
          /<article[^>]*\bid=["']article-content["']/.test(pageContent),
          `Article ${guide.slug} must use canonical semantic <article id="article-content"> tag`
        ).toBe(true);
        expect(
          pageContent.includes("</article>"),
          `Article ${guide.slug} must close with </article>`
        ).toBe(true);
      }
    });

    it("ensures <ArticleDateByline> is placed above main content within article header", () => {
      for (const guide of GUIDE_REGISTRY) {
        const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
        const pageContent = fs.readFileSync(pagePath, "utf-8");

        const bylineIndex = pageContent.indexOf("<ArticleDateByline");

        expect(
          bylineIndex,
          `Article ${guide.slug} must render <ArticleDateByline>`
        ).toBeGreaterThan(-1);

        // Byline should precede main content sections
        const firstSectionIndex = pageContent.indexOf("<section", bylineIndex);
        if (firstSectionIndex !== -1) {
          expect(
            bylineIndex,
            `Article ${guide.slug} <ArticleDateByline> must precede the first <section>`
          ).toBeLessThan(firstSectionIndex);
        }
      }
    });
  });

  describe("3. Calculator Date Consistency", () => {
    it("ensures all calculators have valid lastModified dates in CALCULATOR_REGISTRY", () => {
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      for (const calc of CALCULATOR_REGISTRY) {
        expect(
          isoDateRegex.test(calc.lastModified),
          `Calculator ${calc.slug} lastModified "${calc.lastModified}" must be YYYY-MM-DD`
        ).toBe(true);
      }
    });
  });

  describe("4. XML Sitemap Date Synchronization", () => {
    it("ensures sitemap entries match lastModified dates from registry", () => {
      const sitemapEntries = sitemap();
      const sitemapMap = new Map(
        sitemapEntries.map((e) => [e.url.replace("https://calcmypower.com", "") || "/", e.lastModified as Date])
      );

      for (const guide of GUIDE_REGISTRY) {
        const entryDate = sitemapMap.get(guide.path);
        expect(
          entryDate,
          `Guide ${guide.path} missing from sitemap`
        ).toBeDefined();

        const expectedIso = `${guide.lastModified}T00:00:00.000Z`;
        expect(entryDate!.toISOString()).toBe(expectedIso);
      }

      for (const calc of CALCULATOR_REGISTRY) {
        const entryDate = sitemapMap.get(calc.path);
        expect(
          entryDate,
          `Calculator ${calc.path} missing from sitemap`
        ).toBeDefined();

        const expectedIso = `${calc.lastModified}T00:00:00.000Z`;
        expect(entryDate!.toISOString()).toBe(expectedIso);
      }
    });
  });
});
