import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { GUIDE_REGISTRY } from "../registry";

const APP_DIR = path.resolve(process.cwd(), "src/app");
const VALID_CLUSTERS = ["generators", "solar", "ups-battery", "electricity"];

describe("Sitewide Editorial Article Design Consistency Quality Gate", () => {
  it("verifies all editorial articles exist in the app directory", () => {
    expect(GUIDE_REGISTRY).toHaveLength(16);
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      expect(fs.existsSync(pagePath), `Missing page.tsx for ${guide.slug}`).toBe(true);
    }
  });

  it("ensures every article uses canonical max-w-[1320px] container", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      expect(
        content.includes("max-w-[1320px]"),
        `Article ${guide.slug} must include max-w-[1320px] container`
      ).toBe(true);
    }
  });

  it("ensures every article has accessible breadcrumb navigation", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      expect(
        /<nav[^>]*aria-label=["']Breadcrumb[s]?["']/i.test(content),
        `Article ${guide.slug} must render <nav aria-label="Breadcrumb">`
      ).toBe(true);
      expect(
        content.includes('href="/"'),
        `Article ${guide.slug} breadcrumbs must link to Home (/)`
      ).toBe(true);
      expect(
        /href=["'](\/calculators|\/[a-z0-9-]+calculator)["']/.test(content),
        `Article ${guide.slug} breadcrumbs must link to parent guides hub or calculator`
      ).toBe(true);
    }
  });

  it("ensures 12-column responsive layout grid", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      expect(
        content.includes("lg:grid-cols-12"),
        `Article ${guide.slug} must use lg:grid-cols-12 layout grid`
      ).toBe(true);
    }
  });

  it("ensures content-first DOM order: article precedes aside", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      const articleIdx = content.indexOf("<article");
      const asideIdx = content.indexOf("<aside");

      expect(
        articleIdx,
        `Article ${guide.slug} must render an <article> element`
      ).toBeGreaterThan(-1);
      expect(
        asideIdx,
        `Article ${guide.slug} must render an <aside> element`
      ).toBeGreaterThan(-1);
      expect(
        articleIdx,
        `Article ${guide.slug} <article> must precede <aside> in DOM order`
      ).toBeLessThan(asideIdx);
    }
  });

  it("ensures single unique id='article-content' per page", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      const matches = content.match(/id=["']article-content["']/g);
      expect(
        matches?.length,
        `Article ${guide.slug} must have exactly one element with id="article-content"`
      ).toBe(1);
    }
  });

  it("ensures desktop sidebar has hidden lg:block lg:col-span-4 without mobile leaks", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      expect(
        /<aside[^>]*className=["'][^"']*hidden\s+lg:block\s+lg:col-span-4[^"']*["']/.test(content),
        `Article ${guide.slug} <aside> must use className="hidden lg:block lg:col-span-4"`
      ).toBe(true);
    }
  });

  it("ensures aside renders TableOfContents matching the guide's registered cluster", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      const tocMatch = content.match(/<TableOfContents[^>]*cluster=["']([^"']+)["']/);
      expect(
        tocMatch,
        `Article ${guide.slug} TableOfContents must specify explicit cluster prop`
      ).not.toBeNull();

      const cluster = tocMatch![1];
      expect(
        VALID_CLUSTERS.includes(cluster),
        `Article ${guide.slug} cluster "${cluster}" must be one of: ${VALID_CLUSTERS.join(", ")}`
      ).toBe(true);
      expect(
        cluster,
        `Article ${guide.slug} cluster "${cluster}" must match registered cluster "${guide.cluster}"`
      ).toBe(guide.cluster);
    }
  });

  it("ensures zero ad-hoc dark promo boxes or duplicate wrapper cards in aside", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      const asideStart = content.indexOf("<aside");
      const asideEnd = content.indexOf("</aside>", asideStart);
      expect(asideStart).toBeGreaterThan(-1);
      expect(asideEnd).toBeGreaterThan(-1);

      const asideContent = content.substring(asideStart, asideEnd);

      expect(
        asideContent.includes("bg-slate-900"),
        `Article ${guide.slug} <aside> must not contain dark bg-slate-900 promo boxes`
      ).toBe(false);

      expect(
        asideContent.includes("from-blue-600 to-indigo-700"),
        `Article ${guide.slug} <aside> must not contain gradient promo boxes`
      ).toBe(false);

      expect(
        /Article Contents|In This Article/i.test(asideContent),
        `Article ${guide.slug} <aside> must not contain duplicate TOC header cards`
      ).toBe(false);
    }
  });

  it("ensures zero dark gradient hero headers", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      const headerStart = content.indexOf("<header");
      const headerEnd = content.indexOf("</header>", headerStart);
      if (headerStart !== -1 && headerEnd !== -1) {
        const headerContent = content.substring(headerStart, headerEnd);
        expect(
          /bg-gradient-to|from-slate-900|from-blue-900/i.test(headerContent),
          `Article ${guide.slug} <header> must not use dark gradient banners`
        ).toBe(false);
      }
    }
  });

  it("ensures all articles use ZoomableArticleImage component", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      expect(
        content.includes("ZoomableArticleImage"),
        `Article ${guide.slug} must import and use ZoomableArticleImage`
      ).toBe(true);
    }
  });

  it("ensures no duplicate images within any article", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      const zoomableMatches = Array.from(
        content.matchAll(/<ZoomableArticleImage[^>]*src=["']([^"']+)["']/g)
      ).map((m) => m[1]);
      const uniqueZoomables = new Set(zoomableMatches);
      expect(
        zoomableMatches.length,
        `Article ${guide.slug} has duplicate ZoomableArticleImage assets: ${JSON.stringify(zoomableMatches)}`
      ).toBe(uniqueZoomables.size);
    }
  });

  it("ensures all articles render MobileArticleNavigator and ReadingProgressBar", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      expect(
        content.includes("<MobileArticleNavigator"),
        `Article ${guide.slug} must render <MobileArticleNavigator />`
      ).toBe(true);
      expect(
        content.includes("<ReadingProgressBar"),
        `Article ${guide.slug} must render <ReadingProgressBar />`
      ).toBe(true);
    }
  });

  it("ensures all article FAQ sections have id='faq' and use semantic details and summary accordions", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      const faqIdx = content.indexOf('id="faq"');
      expect(
        faqIdx,
        `Article ${guide.slug} must render an FAQ heading with id="faq"`
      ).toBeGreaterThan(-1);

      const faqSection = content.substring(faqIdx, faqIdx + 1500);
      expect(
        faqSection.includes("<details"),
        `Article ${guide.slug} FAQ section must use <details> elements`
      ).toBe(true);
      expect(
        faqSection.includes("<summary"),
        `Article ${guide.slug} FAQ section must use <summary> elements`
      ).toBe(true);
    }
  });

  it("ensures zero em-dashes (\\u2014) in article page files", () => {
    for (const guide of GUIDE_REGISTRY) {
      const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");

      expect(
        content.includes("\u2014"),
        `Article ${guide.slug} must not contain em-dashes (\\u2014)`
      ).toBe(false);
    }
  });
});
