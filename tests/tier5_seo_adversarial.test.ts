import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_AUTHOR_NAME,
  DEFAULT_AUTHOR_URL,
  CORE_ROUTE_REGISTRY,
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
  TOPICAL_CLUSTERS,
  getAllIndexablePaths,
} from "@/lib/seo/registry";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import {
  generateArticleSchema,
  generateWebApplicationSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/lib/seo/schema";

const SRC_DIR = path.resolve(process.cwd(), "src");
const APP_DIR = path.resolve(process.cwd(), "src/app");
const COMPONENTS_DIR = path.resolve(process.cwd(), "src/components");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

/**
 * Returns absolute path to page.tsx for a given route path.
 */
function getPageFilePath(routePath: string): string {
  if (routePath === "/") {
    return path.join(APP_DIR, "page.tsx");
  }
  return path.join(APP_DIR, routePath.replace(/^\//, ""), "page.tsx");
}

/**
 * Parses exported metadata from a page.tsx file.
 */
function extractMetadataFromPage(filePath: string): {
  title: string;
  description: string;
} {
  if (!fs.existsSync(filePath)) {
    return { title: "", description: "" };
  }
  const content = fs.readFileSync(filePath, "utf-8");

  let title = "";
  const absoluteTitleMatch = content.match(
    /title:\s*\{\s*absolute:\s*["']([^"']+)["']/
  );
  if (absoluteTitleMatch) {
    title = absoluteTitleMatch[1];
  } else {
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) {
      title = titleMatch[1];
    }
  }

  let description = "";
  const descMatch = content.match(
    /description:\s*["'`]([\s\S]*?)["'`]\s*[,}]/
  );
  if (descMatch) {
    description = descMatch[1].replace(/\s+/g, " ").trim();
  }

  return { title, description };
}

/**
 * Computes the final rendered <title> tag reflecting Next.js layout template:
 * "%s | CalcMyPower" (suffix length = 14 chars).
 */
function computeRenderedTitle(rawTitle: string, routePath: string): string {
  if (routePath === "/") return rawTitle;
  const cleanTitle = rawTitle.replace(/\s*\|\s*CalcMyPower$/i, "").trim();
  return `${cleanTitle} | ${SITE_NAME}`;
}

/**
 * Recursively retrieves all TypeScript and TSX files in a directory.
 */
function getAllSourceFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__tests__" || entry.name === "node_modules") continue;
      files.push(...getAllSourceFiles(fullPath));
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Extracts all internal href destinations from file content.
 */
function extractInternalHrefs(content: string): string[] {
  const matches = Array.from(content.matchAll(/href=["'](\/[^"']*)["']/g));
  return matches.map((m) => m[1]);
}

describe("Tier 5 Adversarial SEO Hardening Suite", () => {
  const indexablePaths = getAllIndexablePaths();
  const allSourceFiles = getAllSourceFiles(SRC_DIR);

  // =========================================================================
  // 1. APEX CRAWL DISCOVERY (1-HOP FROM / AND /CALCULATORS)
  // =========================================================================
  describe("Adversarial Area 1: 1-Hop Apex Crawl Discovery from / and /calculators", () => {
    const headerPath = path.join(COMPONENTS_DIR, "layout", "Header.tsx");
    const footerPath = path.join(COMPONENTS_DIR, "layout", "Footer.tsx");
    const rootPagePath = path.join(APP_DIR, "page.tsx");
    const calcPagePath = path.join(APP_DIR, "calculators", "page.tsx");

    const headerContent = fs.readFileSync(headerPath, "utf-8");
    const footerContent = fs.readFileSync(footerPath, "utf-8");
    const rootPageContent = fs.readFileSync(rootPagePath, "utf-8");
    const calcPageContent = fs.readFileSync(calcPagePath, "utf-8");

    it("verifies all 31 registered static routes are discoverable within 1 hop from apex (/)", () => {
      const combinedRootHtml = rootPageContent + " " + headerContent + " " + footerContent;
      const hrefs = extractInternalHrefs(combinedRootHtml);
      const cleanPaths = new Set(hrefs.map((h) => h.split("#")[0].split("?")[0]));

      const missingRoutes: string[] = [];
      for (const route of indexablePaths) {
        if (!cleanPaths.has(route)) {
          missingRoutes.push(route);
        }
      }

      expect(
        missingRoutes,
        `Routes missing from 1-hop apex crawl discovery on homepage (/):\n${missingRoutes.join("\n")}`
      ).toEqual([]);
    });

    it("verifies all 31 registered static routes are discoverable within 1 hop from /calculators directory", () => {
      const combinedCalcHtml = calcPageContent + " " + headerContent + " " + footerContent;
      const hrefs = extractInternalHrefs(combinedCalcHtml);
      const cleanPaths = new Set(hrefs.map((h) => h.split("#")[0].split("?")[0]));

      const missingRoutes: string[] = [];
      for (const route of indexablePaths) {
        if (!cleanPaths.has(route)) {
          missingRoutes.push(route);
        }
      }

      expect(
        missingRoutes,
        `Routes missing from 1-hop crawl discovery on /calculators:\n${missingRoutes.join("\n")}`
      ).toEqual([]);
    });

    it("verifies /calculators page body directly links to all 15 calculators and all 10 guides in its content sections", () => {
      const bodyHrefs = extractInternalHrefs(calcPageContent);
      const bodyPaths = new Set(bodyHrefs.map((h) => h.split("#")[0].split("?")[0]));

      const missingCalculators: string[] = [];
      for (const calc of CALCULATOR_REGISTRY) {
        if (!bodyPaths.has(calc.path)) {
          missingCalculators.push(calc.path);
        }
      }

      const missingGuides: string[] = [];
      for (const guide of GUIDE_REGISTRY) {
        if (!bodyPaths.has(guide.path)) {
          missingGuides.push(guide.path);
        }
      }

      expect(
        missingCalculators,
        `Calculators missing direct in-page links in /calculators body:\n${missingCalculators.join("\n")}`
      ).toEqual([]);

      expect(
        missingGuides,
        `Sizing guides missing direct in-page links in /calculators body:\n${missingGuides.join("\n")}`
      ).toEqual([]);
    });

    it("verifies zero internal links on / or /calculators or layout header/footer have rel='nofollow'", () => {
      const checkFiles = [rootPagePath, calcPagePath, headerPath, footerPath];
      const violations: { file: string; line: string }[] = [];

      for (const filePath of checkFiles) {
        const lines = fs.readFileSync(filePath, "utf-8").split("\n");
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes("rel=") && (line.includes("nofollow") || line.includes("sponsored") || line.includes("ugc"))) {
            // Check if it is an internal link
            if (line.includes('href="/"') || line.includes('href="/')) {
              violations.push({
                file: path.basename(filePath),
                line: line.trim(),
              });
            }
          }
        }
      }

      expect(
        violations,
        `Found forbidden nofollow/sponsored attributes on internal crawl discovery links:\n${JSON.stringify(violations, null, 2)}`
      ).toEqual([]);
    });

    it("verifies active topical cluster hubAnchor targets exist as valid DOM IDs in /calculators page", () => {
      const activeClusters = Object.values(TOPICAL_CLUSTERS).filter(
        (c) => c.status === "active"
      );

      for (const cluster of activeClusters) {
        const anchorMatch = cluster.hubAnchor.match(/#([a-zA-Z0-9-_]+)$/);
        expect(
          anchorMatch,
          `Cluster ${cluster.id} hubAnchor "${cluster.hubAnchor}" missing hash fragment`
        ).not.toBeNull();

        const anchorId = anchorMatch![1];
        const idPattern = new RegExp(`id=["']${anchorId}["']`);
        expect(
          idPattern.test(calcPageContent),
          `Cluster ${cluster.id} hubAnchor target id="${anchorId}" not found in src/app/calculators/page.tsx`
        ).toBe(true);
      }
    });
  });

  // =========================================================================
  // 2. TITLE TAG 60-CHARACTER CEILING ACROSS ALL 31 ROUTES
  // =========================================================================
  describe("Adversarial Area 2: Title Tag 60-Character Ceiling Across All 31 Routes", () => {
    it.each(indexablePaths)(
      "verifies route %s title tag strictly satisfies 60-character ceiling and quality standards",
      (routePath) => {
        const pagePath = getPageFilePath(routePath);
        const pageMeta = extractMetadataFromPage(pagePath);
        expect(
          pageMeta.title,
          `Route ${routePath} page.tsx missing exported metadata title`
        ).not.toBe("");

        const renderedTitle = computeRenderedTitle(pageMeta.title, routePath);

        // Ceiling enforcement
        expect(
          renderedTitle.length,
          `Route ${routePath} rendered title "${renderedTitle}" (${renderedTitle.length} chars) exceeds 60-char ceiling`
        ).toBeLessThanOrEqual(60);

        // Minimum length check
        expect(
          renderedTitle.length,
          `Route ${routePath} rendered title "${renderedTitle}" is too short (${renderedTitle.length} chars)`
        ).toBeGreaterThanOrEqual(15);

        // Base title ceiling (except root which handles its own branding)
        if (routePath !== "/") {
          const cleanBaseTitle = pageMeta.title.replace(/\s*\|\s*CalcMyPower$/i, "").trim();
          expect(
            cleanBaseTitle.length,
            `Route ${routePath} base title "${cleanBaseTitle}" (${cleanBaseTitle.length} chars) exceeds 46 chars (leaving no room for 14-char template " | CalcMyPower")`
          ).toBeLessThanOrEqual(46);
        }

        // Whitespace and hygiene checks
        expect(renderedTitle).toBe(renderedTitle.trim());
        expect(renderedTitle).not.toMatch(/\s{2,}/);
        expect(renderedTitle).not.toContain("\t");
        expect(renderedTitle).not.toContain("\n");

        // Unicode hygiene checks
        expect(renderedTitle).not.toContain("\u2014"); // em-dash
        expect(renderedTitle).not.toContain("\u2013"); // en-dash
        expect(renderedTitle).not.toContain("\u200B"); // zero-width space
        expect(renderedTitle).not.toContain("\uFEFF"); // zero-width no-break space
      }
    );
  });

  // =========================================================================
  // 3. META DESCRIPTION 160-CHARACTER CEILING ACROSS ALL 31 ROUTES
  // =========================================================================
  describe("Adversarial Area 3: Meta Description 160-Character Ceiling Across All 31 Routes", () => {
    it.each(indexablePaths)(
      "verifies route %s meta description strictly satisfies 160-character ceiling and quality standards",
      (routePath) => {
        const pagePath = getPageFilePath(routePath);
        const pageMeta = extractMetadataFromPage(pagePath);
        expect(
          pageMeta.description,
          `Route ${routePath} page.tsx missing exported metadata description`
        ).not.toBe("");

        const desc = pageMeta.description;

        // SERP display ceiling
        expect(
          desc.length,
          `Route ${routePath} description "${desc}" (${desc.length} chars) exceeds 160-character SERP limit`
        ).toBeLessThanOrEqual(160);

        // Depth floor
        expect(
          desc.length,
          `Route ${routePath} description "${desc}" (${desc.length} chars) is too short (< 50 chars)`
        ).toBeGreaterThanOrEqual(50);

        // Punctuation check
        expect(
          /[.!?]$/.test(desc),
          `Route ${routePath} description must end with proper terminal sentence punctuation (. ! ?)`
        ).toBe(true);

        // Hygiene checks
        expect(desc).not.toContain("<");
        expect(desc).not.toContain(">");
        expect(desc).not.toContain("\u2014"); // em-dash
        expect(desc).not.toContain("\u2013"); // en-dash
        expect(desc).not.toContain("--"); // double dash
      }
    );
  });

  // =========================================================================
  // 4. URL HYGIENE ACROSS ALL INTERNAL LINKS
  // =========================================================================
  describe("Adversarial Area 4: Strict URL Hygiene (Zero Query Params, Zero Trailing Slashes, Zero Uppercase)", () => {
    it("scans all JSX/TSX files in src/ for internal hrefs and enforces zero query parameters, zero trailing slashes, and zero uppercase characters", () => {
      const violations: {
        file: string;
        link: string;
        issue: string;
      }[] = [];

      const registeredPathSet = new Set(indexablePaths);

      for (const file of allSourceFiles) {
        if (
          file.includes("__tests__") ||
          file.endsWith("registry.ts") ||
          file.endsWith("sitemap.ts") ||
          file.endsWith("robots.ts") ||
          file.endsWith("generator-size.ts")
        ) {
          continue;
        }

        const content = fs.readFileSync(file, "utf-8");
        const hrefMatches = Array.from(content.matchAll(/href=["'](\/[^"']*)["']/g));

        for (const match of hrefMatches) {
          const rawHref = match[1];

          // Skip asset paths, downloads, and protocols
          if (
            rawHref.startsWith("/images/") ||
            rawHref.startsWith("/downloads/") ||
            rawHref.startsWith("/icon") ||
            rawHref.startsWith("/favicon") ||
            rawHref.startsWith("/manifest") ||
            rawHref.startsWith("/api/")
          ) {
            continue;
          }

          // 1. Check for query parameters
          if (rawHref.includes("?")) {
            violations.push({
              file: path.relative(process.cwd(), file),
              link: rawHref,
              issue: "Contains query parameters (?)",
            });
          }

          // 2. Check for trailing slash (except root "/")
          const pathname = rawHref.split("#")[0].split("?")[0];
          if (pathname !== "/" && pathname.endsWith("/")) {
            violations.push({
              file: path.relative(process.cwd(), file),
              link: rawHref,
              issue: "Contains forbidden trailing slash",
            });
          }

          // 3. Check for uppercase characters in pathname
          if (/[A-Z]/.test(pathname)) {
            violations.push({
              file: path.relative(process.cwd(), file),
              link: rawHref,
              issue: "Contains uppercase characters in pathname",
            });
          }

          // 4. Check for double slashes
          if (pathname.includes("//")) {
            violations.push({
              file: path.relative(process.cwd(), file),
              link: rawHref,
              issue: "Contains consecutive double slashes (//)",
            });
          }

          // 5. Check route existence in registry
          if (!registeredPathSet.has(pathname)) {
            violations.push({
              file: path.relative(process.cwd(), file),
              link: rawHref,
              issue: `Target path "${pathname}" is not registered in registry.ts`,
            });
          }
        }
      }

      expect(
        violations,
        `Found internal URL hygiene violations:\n${JSON.stringify(violations, null, 2)}`
      ).toEqual([]);
    });
  });

  // =========================================================================
  // 5. SCHEMA JSON-LD STRUCTURED DATA INTEGRITY
  // =========================================================================
  describe("Adversarial Area 5: Schema JSON-LD Structured Data Integrity", () => {
    describe("Article Schema for all 10 Sizing Guides", () => {
      it.each(GUIDE_REGISTRY)(
        "verifies Article schema for guide %s has non-empty image array, valid ISO timestamps, and author pointing to /about",
        (guide) => {
          const schema = generateArticleSchema({
            headline: guide.title,
            description: guide.metaDescription,
            url: `${SITE_URL}${guide.path}`,
            datePublished: guide.datePublished,
            dateModified: guide.lastModified,
            images: [guide.heroImage],
          });

          // Core identity
          expect(schema["@context"]).toBe("https://schema.org");
          expect(schema["@type"]).toBe("Article");
          expect(schema.url).toBe(`${SITE_URL}${guide.path}`);
          expect(schema.mainEntityOfPage["@id"]).toBe(`${SITE_URL}${guide.path}`);
          expect(schema.isPartOf["@id"]).toBe(WEBSITE_ID);

          // Non-empty image array
          expect(Array.isArray(schema.image)).toBe(true);
          expect(schema.image.length).toBeGreaterThanOrEqual(1);

          for (const imgUrl of schema.image) {
            expect(imgUrl.startsWith(SITE_URL)).toBe(true);
            const relativePath = imgUrl.replace(SITE_URL, "");
            const localFilePath = path.join(PUBLIC_DIR, relativePath.replace(/^\//, ""));
            expect(
              fs.existsSync(localFilePath),
              `Article image file not found on disk: ${localFilePath}`
            ).toBe(true);
          }

          // Date format and chronological order
          const isoRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/;
          expect(isoRegex.test(schema.datePublished)).toBe(true);
          expect(isoRegex.test(schema.dateModified)).toBe(true);

          const pubTime = Date.parse(schema.datePublished);
          const modTime = Date.parse(schema.dateModified);
          expect(isNaN(pubTime)).toBe(false);
          expect(isNaN(modTime)).toBe(false);
          expect(modTime).toBeGreaterThanOrEqual(pubTime);

          // Author attribution
          expect(schema.author["@type"]).toBe("Organization");
          expect(schema.author.name).toBe(DEFAULT_AUTHOR_NAME);
          expect(schema.author.url).toBe(DEFAULT_AUTHOR_URL);

          // Publisher parity
          expect(schema.publisher["@id"]).toBe(ORGANIZATION_ID);
          expect(schema.publisher.name).toBe(SITE_NAME);
          expect(schema.publisher.url).toBe(SITE_URL);
          expect(schema.publisher.logo.url).toBe(`${SITE_URL}/icon.svg`);
        }
      );
    });

    describe("WebApplication Schema for all 15 Calculators", () => {
      it.each(CALCULATOR_REGISTRY)(
        "verifies WebApplication schema for calculator %s has valid category, offers, and author pointing to /about",
        (calc) => {
          const schema = generateWebApplicationSchema({
            name: calc.title,
            description: calc.metaDescription,
            url: `${SITE_URL}${calc.path}`,
          });

          expect(schema["@context"]).toBe("https://schema.org");
          expect(schema["@type"]).toBe("WebApplication");
          expect(schema.url).toBe(`${SITE_URL}${calc.path}`);
          expect(schema.applicationCategory).toBe("UtilitiesApplication");
          expect(schema.operatingSystem).toBe("All");
          expect(schema.inLanguage).toBe("en-US");
          expect(schema.isPartOf["@id"]).toBe(WEBSITE_ID);

          // Author attribution
          expect(schema.author["@type"]).toBe("Organization");
          expect(schema.author.url).toBe(DEFAULT_AUTHOR_URL);
          expect(schema.publisher["@id"]).toBe(ORGANIZATION_ID);

          // Free utility offer
          expect(schema.offers["@type"]).toBe("Offer");
          expect(schema.offers.price).toBe("0");
          expect(schema.offers.priceCurrency).toBe("USD");
        }
      );
    });

    it("verifies global Organization and WebSite schema graph identities", () => {
      const orgSchema = generateOrganizationSchema();
      expect(orgSchema["@id"]).toBe(ORGANIZATION_ID);
      expect(orgSchema.name).toBe(SITE_NAME);
      expect(orgSchema.url).toBe(SITE_URL);
      expect(orgSchema.logo.url).toBe(`${SITE_URL}/icon.svg`);

      const webSiteSchema = generateWebSiteSchema();
      expect(webSiteSchema["@id"]).toBe(WEBSITE_ID);
      expect(webSiteSchema.publisher["@id"]).toBe(ORGANIZATION_ID);
      expect(webSiteSchema.inLanguage).toBe("en-US");
    });

    it("verifies breadcrumb schemas across all 10 guides never label /calculators as 'Guides'", () => {
      for (const guide of GUIDE_REGISTRY) {
        const pagePath = getPageFilePath(guide.path);
        const pageContent = fs.readFileSync(pagePath, "utf-8");

        const match = pageContent.match(
          /generateBreadcrumbSchema\s*\(\s*\[([\s\S]*?)\]\s*\)/
        );
        expect(
          match,
          `Guide ${guide.slug} missing generateBreadcrumbSchema call`
        ).not.toBeNull();

        const itemsRaw = match![1];
        const itemMatches = Array.from(
          itemsRaw.matchAll(
            /\{\s*name:\s*["']([^"']+)["']\s*,\s*url:\s*["']([^"']+)["']\s*\}/g
          )
        );

        for (const item of itemMatches) {
          const name = item[1];
          const url = item[2];
          if (url.endsWith("/calculators") || url.includes("/calculators#")) {
            expect(
              name,
              `Guide ${guide.slug} mislabels breadcrumb URL "${url}" as "${name}". Must be "Calculators"`
            ).toBe("Calculators");
          }
        }
      }
    });
  });

  // =========================================================================
  // 6. SITEMAP SIGNALS (CHANGEFREQUENCY, PRIORITY, AND LASTMOD)
  // =========================================================================
  describe("Adversarial Area 6: Sitemap Signals on all 31 Routes", () => {
    const sitemapEntries = sitemap();
    const sitemapMap = new Map(
      sitemapEntries.map((e) => [
        e.url.replace("https://calcmypower.com", "") || "/",
        e,
      ])
    );

    it("verifies sitemap returns exactly 31 unique canonical URLs", () => {
      expect(sitemapEntries.length).toBe(31);
      const urlSet = new Set(sitemapEntries.map((e) => e.url));
      expect(urlSet.size).toBe(31);
    });

    it.each(indexablePaths)(
      "verifies sitemap entry for %s defines valid changeFrequency, priority, and lastModified date",
      (routePath) => {
        const entry = sitemapMap.get(routePath);
        expect(entry, `Route ${routePath} missing from sitemap`).toBeDefined();

        const validFrequencies = [
          "always",
          "hourly",
          "daily",
          "weekly",
          "monthly",
          "yearly",
          "never",
        ];
        expect(validFrequencies).toContain(entry?.changeFrequency);

        expect(typeof entry?.priority).toBe("number");
        expect(entry!.priority).toBeGreaterThanOrEqual(0.1);
        expect(entry!.priority).toBeLessThanOrEqual(1.0);

        expect(entry?.lastModified).toBeInstanceOf(Date);
        const lastMod = entry?.lastModified as Date;
        expect(isNaN(lastMod.getTime())).toBe(false);
        expect(lastMod.getFullYear()).toBeGreaterThanOrEqual(2026);
      }
    );

    it("verifies sitemap priority hierarchy conforms to crawl importance tiers", () => {
      // Root: 1.0, weekly
      const rootEntry = sitemapMap.get("/");
      expect(rootEntry?.priority).toBe(1.0);
      expect(rootEntry?.changeFrequency).toBe("weekly");

      // Calculators directory: 0.9, weekly
      const calcDirEntry = sitemapMap.get("/calculators");
      expect(calcDirEntry?.priority).toBe(0.9);
      expect(calcDirEntry?.changeFrequency).toBe("weekly");

      // Calculators: 0.9, monthly
      for (const calc of CALCULATOR_REGISTRY) {
        const entry = sitemapMap.get(calc.path);
        expect(entry?.priority).toBe(0.9);
        expect(entry?.changeFrequency).toBe("monthly");
      }

      // Sizing guides: 0.8, monthly
      for (const guide of GUIDE_REGISTRY) {
        const entry = sitemapMap.get(guide.path);
        expect(entry?.priority).toBe(0.8);
        expect(entry?.changeFrequency).toBe("monthly");
      }

      // Legal & Trust routes: priority <= 0.5
      for (const legalPath of ["/about", "/contact", "/privacy", "/terms"]) {
        const entry = sitemapMap.get(legalPath);
        expect(entry?.priority).toBeLessThanOrEqual(0.5);
      }
    });
  });

  // =========================================================================
  // 7. 301 PERMANENT REDIRECT INTEGRITY IN next.config.ts
  // =========================================================================
  describe("Adversarial Area 7: 301 Permanent Redirect Integrity in next.config.ts", () => {
    it("verifies nextConfig exports async redirects returning at least 13 rules", async () => {
      expect(typeof nextConfig.redirects).toBe("function");
      const redirects = await nextConfig.redirects!();
      expect(redirects.length).toBeGreaterThanOrEqual(13);
    });

    it("verifies every redirect rule specifies permanent statusCode 301", async () => {
      const redirects = await nextConfig.redirects!();
      for (const rule of redirects) {
        expect(
          rule.statusCode,
          `Redirect rule for "${rule.source}" does not specify 301 permanent redirect`
        ).toBe(301);
      }
    });

    it("verifies zero self-redirects (source !== destination)", async () => {
      const redirects = await nextConfig.redirects!();
      for (const rule of redirects) {
        expect(
          rule.source,
          `Self-redirect detected: source and destination are both "${rule.source}"`
        ).not.toBe(rule.destination);
      }
    });

    it("verifies zero redirect chaining or double-hops (maximum hop count strictly 1)", async () => {
      const redirects = await nextConfig.redirects!();
      const pathRedirects = redirects.filter((r) => !r.has && !r.destination.startsWith("http"));
      const sources = new Set(pathRedirects.map((r) => r.source));

      for (const rule of pathRedirects) {
        expect(
          sources.has(rule.destination),
          `Double-hop redirect chaining detected: "${rule.source}" redirects to "${rule.destination}", which is itself redirected to another target.`
        ).toBe(false);
      }
    });

    it("verifies zero circular redirect loops across the redirect graph", async () => {
      const redirects = await nextConfig.redirects!();
      const pathRedirects = redirects.filter((r) => !r.has && !r.destination.startsWith("http"));
      const redirectMap = new Map(pathRedirects.map((r) => [r.source, r.destination]));

      for (const startSource of redirectMap.keys()) {
        const visited = new Set<string>();
        let current: string | undefined = startSource;

        while (current && redirectMap.has(current)) {
          expect(
            visited.has(current),
            `Circular redirect loop detected starting at "${startSource}": encountered "${current}" twice.`
          ).toBe(false);

          visited.add(current);
          current = redirectMap.get(current);
        }
      }
    });

    it("verifies all 12 legacy redirects point directly to active registered routes in registry.ts", async () => {
      const redirects = await nextConfig.redirects!();
      const pathRedirects = redirects.filter((r) => !r.has && !r.destination.startsWith("http"));
      expect(pathRedirects.length).toBe(12);

      const registeredSet = new Set(indexablePaths);

      for (const rule of pathRedirects) {
        expect(
          registeredSet.has(rule.destination),
          `Legacy redirect "${rule.source}" points to unregistered or invalid route "${rule.destination}"`
        ).toBe(true);
      }
    });

    it("verifies host redirect rule canonicalizes www.calcmypower.com with 301 to apex domain", async () => {
      const redirects = await nextConfig.redirects!();
      const hostRule = redirects.find(
        (r) =>
          r.has &&
          r.has.some((h) => h.type === "host" && h.value === "www.calcmypower.com")
      );

      expect(hostRule, "Missing www to apex canonical host redirect rule").toBeDefined();
      expect(hostRule?.destination).toBe("https://calcmypower.com/:path*");
      expect(hostRule?.statusCode).toBe(301);
    });
  });
});
