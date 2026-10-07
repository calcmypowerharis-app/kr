import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import {
  SITE_URL,
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
  CORE_ROUTE_REGISTRY,
  getAllIndexablePaths,
} from "../registry";
import { buildPageMetadata } from "../metadata";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateCollectionPageSchema,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateArticleSchema,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "../schema";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

const SRC_DIR = path.resolve(process.cwd(), "src");
const APP_DIR = path.resolve(process.cwd(), "src/app");

function getAllSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__tests__") continue;
      files.push(...getAllSourceFiles(fullPath));
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("CalcMyPower SEO Foundation Guardrails", () => {
  const indexablePaths = getAllIndexablePaths();

  describe("1. Route Registry & XML Sitemap Completeness", () => {
    it("discovers every indexable page.tsx route in src/app and ensures it is registered in registry.ts", () => {
      const discoveredRoutes: string[] = ["/"];
      const entries = fs.readdirSync(APP_DIR, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const pagePath = path.join(APP_DIR, entry.name, "page.tsx");
        if (fs.existsSync(pagePath)) {
          discoveredRoutes.push(`/${entry.name}`);
        }
      }

      for (const route of discoveredRoutes) {
        expect(
          indexablePaths,
          `Route "${route}" exists in src/app but is missing from src/lib/seo/registry.ts`
        ).toContain(route);
      }
    });

    it("generates a valid XML sitemap covering all registered indexable routes with verifiable lastModified dates", () => {
      const sitemapEntries = sitemap();
      const sitemapUrls = sitemapEntries.map((e) => e.url);

      expect(sitemapEntries.length).toBe(indexablePaths.length);

      for (const routePath of indexablePaths) {
        const expectedUrl =
          routePath === "/" ? SITE_URL : `${SITE_URL}${routePath}`;
        expect(sitemapUrls).toContain(expectedUrl);
      }

      // Verify all lastModified dates are valid Date instances and not NaN
      for (const entry of sitemapEntries) {
        expect(entry.lastModified).toBeInstanceOf(Date);
        expect(
          isNaN((entry.lastModified as Date).getTime()),
          `Invalid lastModified date for ${entry.url}`
        ).toBe(false);
      }
    });

    it("generates a valid robots.txt configuration pointing to https://calcmypower.com/sitemap.xml", () => {
      const robotsConfig = robots();
      expect(robotsConfig.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    });
  });

  describe("2. Metadata, Title Suffix & Canonical URL Integrity", () => {
    it("prevents duplicate '| CalcMyPower' suffix in child page metadata titles", () => {
      const entries = fs.readdirSync(APP_DIR, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const pagePath = path.join(APP_DIR, entry.name, "page.tsx");
        if (!fs.existsSync(pagePath)) continue;

        const content = fs.readFileSync(pagePath, "utf8");
        // Extract first title: "..." inside metadata
        const titleMatch = content.match(
          /export\s+const\s+metadata[\s\S]*?title:\s*"([^"]+)"/
        );
        expect(
          titleMatch,
          `Route /${entry.name} is missing a string title in metadata`
        ).not.toBeNull();

        const rawTitle = titleMatch![1];
        expect(
          rawTitle.includes("| CalcMyPower"),
          `Route /${entry.name} includes "| CalcMyPower" in metadata.title ("${rawTitle}"), which duplicates the root layout template "%s | CalcMyPower"`
        ).toBe(false);
      }
    });

    it("buildPageMetadata strips accidental brand suffixes and produces complete OpenGraph/Twitter/Canonical metadata", () => {
      const meta = buildPageMetadata({
        title: "Sample Calculator | CalcMyPower",
        description: "Calculate sample electrical values.",
        path: "/sample-calculator",
      });

      expect(meta.title).toBe("Sample Calculator");
      expect(meta.alternates?.canonical).toBe(
        "https://calcmypower.com/sample-calculator"
      );
      expect(meta.openGraph?.url).toBe(
        "https://calcmypower.com/sample-calculator"
      );
      expect(meta.openGraph?.siteName).toBe("CalcMyPower");
      expect(meta.openGraph?.images).toBeDefined();
      expect((meta.openGraph?.images as any[])[0].url).toBe(
        "https://calcmypower.com/og-image.jpg"
      );
      expect(meta.twitter?.images).toBeDefined();
    });
  });

  describe("3. SSR & AEO/GEO Crawlability Guardrails", () => {
    it("ensures FaqSection uses native HTML5 <details> and <summary> so FAQ answers exist in SSR HTML DOM", () => {
      const faqFilePath = path.join(
        SRC_DIR,
        "components/calculators/FaqSection.tsx"
      );
      const content = fs.readFileSync(faqFilePath, "utf8");

      expect(content).toContain("<details");
      expect(content).toContain("<summary");
      expect(content).not.toContain("{isOpen &&");
    });

    it("ensures GeneratorSizeCalculator does not wrap CalculatorShell in a top-level Suspense boundary", () => {
      const genCalcPath = path.join(
        SRC_DIR,
        "components/calculators/GeneratorSizeCalculator.tsx"
      );
      const content = fs.readFileSync(genCalcPath, "utf8");

      expect(content).toContain("<ScenarioUrlSync");
      expect(content).not.toContain("<GeneratorSizeCalculatorInner />");
    });

    it("ensures CalculatorShell renders a visible semantic <nav aria-label=\"Breadcrumb\">", () => {
      const shellPath = path.join(
        SRC_DIR,
        "components/calculators/CalculatorShell.tsx"
      );
      const content = fs.readFileSync(shellPath, "utf8");

      expect(content).toContain('aria-label="Breadcrumb"');
      expect(content).toContain('href="/calculators"');
    });

    it("ensures no child page in src/app renders a nested <main> landmark inside layout.tsx's <main>", () => {
      const entries = fs.readdirSync(APP_DIR, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const pagePath = path.join(APP_DIR, entry.name, "page.tsx");
        if (!fs.existsSync(pagePath)) continue;

        const content = fs.readFileSync(pagePath, "utf8");
        expect(
          content.includes("<main"),
          `Route /${entry.name}/page.tsx contains a nested <main> tag inside RootLayout's <main>`
        ).toBe(false);
      }
    });
  });

  describe("4. Internal Linking & Orphan Prevention", () => {
    const allFiles = getAllSourceFiles(SRC_DIR);

    it("verifies all internal href=\"/...\" links resolve to valid registered routes", () => {
      const validPaths = new Set(indexablePaths);

      for (const file of allFiles) {
        const content = fs.readFileSync(file, "utf8");
        const hrefMatches = Array.from(
          content.matchAll(/href="(\/[a-zA-Z0-9_#?-]*)"/g)
        );

        for (const match of hrefMatches) {
          const rawHref = match[1];
          const basePath = rawHref.split(/[?#]/)[0] || "/";
          expect(
            validPaths.has(basePath),
            `Broken internal link href="${rawHref}" found in ${path.relative(
              process.cwd(),
              file
            )}`
          ).toBe(true);
        }
      }
    });

    it("ensures every calculator and editorial guide is linked from at least 3 distinct source files (zero orphan pages)", () => {
      const contentRoutes = [
        ...CALCULATOR_REGISTRY.map((c) => c.path),
        ...GUIDE_REGISTRY.map((g) => g.path),
      ];

      for (const targetRoute of contentRoutes) {
        let linkingFileCount = 0;
        for (const file of allFiles) {
          // Do not count a page linking to itself or registry/sitemap files
          if (
            file.includes(targetRoute.slice(1)) ||
            file.endsWith("registry.ts") ||
            file.endsWith("sitemap.ts")
          ) {
            continue;
          }
          const content = fs.readFileSync(file, "utf8");
          if (
            content.includes(`href="${targetRoute}"`) ||
            content.includes(`href="${targetRoute}?`)
          ) {
            linkingFileCount++;
          }
        }

        expect(
          linkingFileCount,
          `Route "${targetRoute}" is only linked from ${linkingFileCount} external component/page files (minimum required: 3 to prevent orphan risk)`
        ).toBeGreaterThanOrEqual(3);
      }
    });
  });

  describe("5. Structured Data (Schema.org JSON-LD) Generators", () => {
    it("links Organization, WebSite, CollectionPage, WebApplication, and Article via @id", () => {
      const org = generateOrganizationSchema();
      const site = generateWebSiteSchema();
      const collection = generateCollectionPageSchema({
        name: "Calculators",
        description: "All calculators",
        url: `${SITE_URL}/calculators`,
        items: [{ name: "Generator Size", url: `${SITE_URL}/generator-size-calculator` }],
      });
      const app = generateWebApplicationSchema({
        name: "Generator Size Calculator",
        description: "Desc",
        url: `${SITE_URL}/generator-size-calculator`,
      });
      const article = generateArticleSchema({
        headline: "Guide",
        description: "Desc",
        url: `${SITE_URL}/what-size-generator-do-i-need-for-my-house`,
        datePublished: "2026-09-27",
        dateModified: "2026-09-28",
      });
      const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
      ]);
      const faq = generateFaqSchema([{ question: "Q?", answer: "A." }]);

      expect(org["@id"]).toBe(ORGANIZATION_ID);
      expect(site["@id"]).toBe(WEBSITE_ID);
      expect(site.publisher["@id"]).toBe(ORGANIZATION_ID);
      expect(collection.isPartOf["@id"]).toBe(WEBSITE_ID);
      expect(app.publisher["@id"]).toBe(ORGANIZATION_ID);
      expect(article.publisher["@id"]).toBe(ORGANIZATION_ID);
      expect(breadcrumbs.itemListElement[0].position).toBe(1);
      expect(faq.mainEntity[0].acceptedAnswer.text).toBe("A.");
    });

    it("keeps CORE_ROUTE_REGISTRY in sync with root and directory paths", () => {
      expect(CORE_ROUTE_REGISTRY.map((r) => r.path)).toEqual([
        "/",
        "/calculators",
      ]);
    });
  });
});
