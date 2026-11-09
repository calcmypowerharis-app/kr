import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import {
  SITE_URL,
  SITE_NAME,
  CORE_ROUTE_REGISTRY,
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
  getAllIndexablePaths,
} from "@/lib/seo/registry";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { generateFaqSchema } from "@/lib/seo/schema";

const SRC_DIR = path.resolve(process.cwd(), "src");
const APP_DIR = path.resolve(process.cwd(), "src/app");
const COMPONENTS_DIR = path.resolve(process.cwd(), "src/components");

/**
 * Returns absolute path to the page.tsx file for a given route path.
 */
function getPageFilePath(routePath: string): string {
  if (routePath === "/") {
    return path.join(APP_DIR, "page.tsx");
  }
  return path.join(APP_DIR, routePath.replace(/^\//, ""), "page.tsx");
}

/**
 * Parses title and description exported from a page.tsx metadata block.
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
 * Finds the corresponding registry entry for a route path.
 */
function getRegistryEntry(routePath: string) {
  const core = CORE_ROUTE_REGISTRY.find((r) => r.path === routePath);
  if (core) return { type: "core" as const, entry: core };
  const calc = CALCULATOR_REGISTRY.find((c) => c.path === routePath);
  if (calc) return { type: "calculator" as const, entry: calc };
  const guide = GUIDE_REGISTRY.find((g) => g.path === routePath);
  if (guide) return { type: "guide" as const, entry: guide };
  return null;
}

/**
 * Computes the final rendered <title> string taking into account Next.js root
 * layout template "%s | CalcMyPower" (suffix length = 14 chars).
 */
function computeRenderedTitle(rawTitle: string, routePath: string): string {
  if (routePath === "/") return rawTitle;
  const cleanTitle = rawTitle.replace(/\s*\|\s*CalcMyPower$/i, "").trim();
  return `${cleanTitle} | ${SITE_NAME}`;
}

/**
 * Recursively scans directory for TypeScript / TSX files.
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

describe("E2E SEO & Indexability Test Suite", () => {
  const indexablePaths = getAllIndexablePaths();
  const allSourceFiles = getAllSourceFiles(SRC_DIR);

  // =========================================================================
  // TIER 1: Canonical URLs, Robots Configuration & Route Registry
  // =========================================================================
  describe("Tier 1: Canonical URLs, Robots Configuration & Route Census", () => {
    it("verifies route census returns exactly 31 indexable static routes (6 core, 15 calculators, 10 guides)", () => {
      expect(indexablePaths.length).toBe(31);
      expect(CORE_ROUTE_REGISTRY.length).toBe(6);
      expect(CALCULATOR_REGISTRY.length).toBe(15);
      expect(GUIDE_REGISTRY.length).toBe(10);
    });

    it("discovers every physical route page.tsx in src/app and ensures 100% registration in registry.ts", () => {
      const discoveredRoutes: string[] = ["/"];
      const entries = fs.readdirSync(APP_DIR, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const pagePath = path.join(APP_DIR, entry.name, "page.tsx");
        if (fs.existsSync(pagePath)) {
          discoveredRoutes.push(`/${entry.name}`);
        }
      }

      expect(discoveredRoutes.length).toBe(31);
      for (const route of discoveredRoutes) {
        expect(
          indexablePaths,
          `Route "${route}" exists in src/app but is missing from registry.ts`
        ).toContain(route);
      }
    });

    describe("Canonical URLs & Sitemap Synchronization per Route", () => {
      const sitemapEntries = sitemap();
      const sitemapUrlSet = new Set(sitemapEntries.map((e) => e.url));

      it.each(indexablePaths)(
        "verifies canonical URL structure and sitemap presence for route: %s",
        (routePath) => {
          const expectedCanonical =
            routePath === "/" ? SITE_URL : `${SITE_URL}${routePath}`;

          expect(
            expectedCanonical.startsWith("https://calcmypower.com"),
            `Canonical URL "${expectedCanonical}" must begin with https://calcmypower.com`
          ).toBe(true);

          if (routePath !== "/") {
            expect(
              expectedCanonical.endsWith("/"),
              `Canonical URL "${expectedCanonical}" must not have trailing slash`
            ).toBe(false);
          }

          expect(
            sitemapUrlSet.has(expectedCanonical),
            `Route "${routePath}" canonical URL "${expectedCanonical}" is missing from sitemap.xml`
          ).toBe(true);

          const pagePath = getPageFilePath(routePath);
          expect(
            fs.existsSync(pagePath),
            `Page component file does not exist: ${pagePath}`
          ).toBe(true);
        }
      );
    });

    it("verifies robots.txt configuration permits verified crawlers and blocks model scrapers", () => {
      const robotsConfig = robots();
      expect(robotsConfig.sitemap).toBe(`${SITE_URL}/sitemap.xml`);

      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules
        : [robotsConfig.rules];

      const agentRules = new Map(rules.map((r) => [r.userAgent, r]));

      expect(agentRules.has("*")).toBe(true);
      expect(agentRules.has("Googlebot")).toBe(true);
      expect(agentRules.has("Bingbot")).toBe(true);
      expect(agentRules.has("OAI-SearchBot")).toBe(true);
      expect(agentRules.has("GPTBot")).toBe(true);

      for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot"]) {
        const rule = agentRules.get(bot);
        expect(rule?.allow).toBe("/");
        expect(rule?.disallow).toContain("/api/");
      }

      const gptBotRule = agentRules.get("GPTBot");
      expect(gptBotRule?.disallow).toContain("/");
      expect(gptBotRule?.allow).toBeUndefined();
    });

    it("verifies RootLayout metadata specifies global robots index: true, follow: true", () => {
      const layoutPath = path.join(APP_DIR, "layout.tsx");
      const content = fs.readFileSync(layoutPath, "utf-8");

      expect(content).toContain("index: true");
      expect(content).toContain("follow: true");
      expect(content).toContain("googleBot");
    });

    it("verifies no page.tsx route in src/app sets noindex or disallows indexing", () => {
      for (const routePath of indexablePaths) {
        const pagePath = getPageFilePath(routePath);
        const content = fs.readFileSync(pagePath, "utf-8");

        expect(
          content.includes("noindex") || content.includes("index: false"),
          `Route "${routePath}" contains noindex directive or index: false in ${pagePath}`
        ).toBe(false);
      }
    });
  });

  // =========================================================================
  // TIER 2: Title Lengths & Meta Descriptions
  // =========================================================================
  describe("Tier 2: Title Lengths & Meta Descriptions (SERP Limits)", () => {
    describe("Title Tag 60-Character Ceiling (Layout Template Parity)", () => {
      it.each(indexablePaths)(
        "verifies rendered title length for route: %s does not exceed 60 characters",
        (routePath) => {
          const reg = getRegistryEntry(routePath);
          expect(reg, `Missing registry entry for ${routePath}`).not.toBeNull();

          const rawRegistryTitle = reg!.entry.metaTitle;
          const renderedRegistryTitle = computeRenderedTitle(
            rawRegistryTitle,
            routePath
          );

          expect(
            renderedRegistryTitle.length,
            `Route "${routePath}" registry metaTitle rendered title "${renderedRegistryTitle}" (${renderedRegistryTitle.length} chars) exceeds Google's 60-character SERP ceiling. Base title "${rawRegistryTitle}" must be <= 46 chars to leave room for the 14-char template " | CalcMyPower".`
          ).toBeLessThanOrEqual(60);

          const pageMeta = extractMetadataFromPage(getPageFilePath(routePath));
          if (pageMeta.title) {
            const renderedPageTitle = computeRenderedTitle(
              pageMeta.title,
              routePath
            );
            expect(
              renderedPageTitle.length,
              `Route "${routePath}" page.tsx metadata rendered title "${renderedPageTitle}" (${renderedPageTitle.length} chars) exceeds 60 characters.`
            ).toBeLessThanOrEqual(60);
          }
        }
      );
    });

    describe("Meta Description Length (Non-Empty and <= 160 Characters)", () => {
      it.each(indexablePaths)(
        "verifies meta description for route: %s is non-empty and <= 160 characters",
        (routePath) => {
          const reg = getRegistryEntry(routePath);
          expect(reg, `Missing registry entry for ${routePath}`).not.toBeNull();

          const regDesc = reg!.entry.metaDescription;
          expect(
            regDesc.length,
            `Route "${routePath}" registry metaDescription cannot be empty`
          ).toBeGreaterThan(0);

          expect(
            regDesc.length,
            `Route "${routePath}" registry metaDescription (${regDesc.length} chars) exceeds 160 characters to avoid SERP truncation:\n"${regDesc}"`
          ).toBeLessThanOrEqual(160);

          const pageMeta = extractMetadataFromPage(getPageFilePath(routePath));
          if (pageMeta.description) {
            expect(
              pageMeta.description.length,
              `Route "${routePath}" page.tsx meta description cannot be empty`
            ).toBeGreaterThan(0);

            expect(
              pageMeta.description.length,
              `Route "${routePath}" page.tsx meta description (${pageMeta.description.length} chars) exceeds 160 characters:\n"${pageMeta.description}"`
            ).toBeLessThanOrEqual(160);
          }
        }
      );
    });
  });

  // =========================================================================
  // TIER 3: Structured Data & Schema Validation
  // =========================================================================
  describe("Tier 3: Structured Data & Schema Validation", () => {
    describe("Article Schema Image Array and ISO Timestamp Hygiene", () => {
      it.each(GUIDE_REGISTRY)(
        "verifies guide %s produces valid Article schema with non-empty image array",
        (guide) => {
          const pagePath = getPageFilePath(guide.path);
          const pageContent = fs.readFileSync(pagePath, "utf-8");

          const schemaCallMatch = pageContent.match(
            /generateArticleSchema\s*\(\s*\{([\s\S]*?)\}\s*\)/
          );
          expect(
            schemaCallMatch,
            `Guide "${guide.slug}" must invoke generateArticleSchema()`
          ).not.toBeNull();

          const callArguments = schemaCallMatch![1];
          const imagesArgMatch = callArguments.match(
            /images\s*:\s*\[([\s\S]*?)\]/
          );

          expect(
            imagesArgMatch,
            `Guide "${guide.slug}" omits "images" argument in generateArticleSchema() call, emitting an empty image array in Article JSON-LD schema.`
          ).not.toBeNull();

          const quotedUrls = Array.from(
            imagesArgMatch![1].matchAll(/["']([^"']+)["']/g)
          ).map((m) => m[1]);

          expect(
            quotedUrls.length,
            `Guide "${guide.slug}" Article schema has an empty image array. Google Search requires at least one image URL for Article rich results.`
          ).toBeGreaterThan(0);

          for (const url of quotedUrls) {
            expect(
              url.startsWith("https://calcmypower.com/images/articles/") ||
                url.startsWith("/images/articles/"),
              `Guide "${guide.slug}" Article schema contains invalid image URL: ${url}`
            ).toBe(true);
          }
        }
      );

      it.each(GUIDE_REGISTRY)(
        "verifies guide %s specifies valid ISO 8601 published and modified timestamps",
        (guide) => {
          const isoDateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;
          expect(
            isoDateOnlyRegex.test(guide.datePublished),
            `Guide ${guide.slug} registry datePublished "${guide.datePublished}" must be YYYY-MM-DD`
          ).toBe(true);

          expect(
            isoDateOnlyRegex.test(guide.lastModified),
            `Guide ${guide.slug} registry lastModified "${guide.lastModified}" must be YYYY-MM-DD`
          ).toBe(true);

          const pagePath = getPageFilePath(guide.path);
          const pageContent = fs.readFileSync(pagePath, "utf-8");

          const datePubMatch = pageContent.match(
            /datePublished\s*:\s*["']([^"']+)["']/
          );
          expect(
            datePubMatch,
            `Guide ${guide.slug} page.tsx missing datePublished in schema`
          ).not.toBeNull();

          const isoTimestampRegex =
            /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/;
          expect(
            isoTimestampRegex.test(datePubMatch![1]),
            `Guide ${guide.slug} page.tsx datePublished "${datePubMatch![1]}" must be valid ISO 8601 format`
          ).toBe(true);
        }
      );

      it.each(CALCULATOR_REGISTRY)(
        "verifies calculator %s specifies valid ISO YYYY-MM-DD lastModified date in registry",
        (calc) => {
          const isoDateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;
          expect(
            isoDateOnlyRegex.test(calc.lastModified),
            `Calculator ${calc.slug} registry lastModified "${calc.lastModified}" must be YYYY-MM-DD`
          ).toBe(true);
        }
      );
    });

    it("verifies FAQPage schema generates complete Question and Answer entities with valid punctuation", () => {
      const sampleFaqs = [
        {
          question: "What is an inverter?",
          answer: "An inverter converts direct current to alternating current.",
        },
      ];
      const faqSchema = generateFaqSchema(sampleFaqs);
      expect(faqSchema["@type"]).toBe("FAQPage");
      expect(faqSchema.mainEntity[0]["@type"]).toBe("Question");
      expect(faqSchema.mainEntity[0].name).toBe("What is an inverter?");
      expect(faqSchema.mainEntity[0].acceptedAnswer.text).toBe(
        "An inverter converts direct current to alternating current."
      );
    });

    describe("Breadcrumb Entity Alignment (Calculators vs Guides)", () => {
      it.each(GUIDE_REGISTRY)(
        "verifies breadcrumb in guide %s labels /calculators as 'Calculators', not 'Guides'",
        (guide) => {
          const pagePath = getPageFilePath(guide.path);
          const pageContent = fs.readFileSync(pagePath, "utf-8");

          const breadcrumbMatch = pageContent.match(
            /generateBreadcrumbSchema\s*\(\s*\[([\s\S]*?)\]\s*\)/
          );
          expect(
            breadcrumbMatch,
            `Guide ${guide.slug} missing generateBreadcrumbSchema call`
          ).not.toBeNull();

          const itemsContent = breadcrumbMatch![1];
          const itemMatches = Array.from(
            itemsContent.matchAll(
              /\{\s*name:\s*["']([^"']+)["']\s*,\s*url:\s*["']([^"']+)["']\s*\}/g
            )
          );

          for (const match of itemMatches) {
            const itemName = match[1];
            const itemUrl = match[2];

            if (
              itemUrl.endsWith("/calculators") ||
              itemUrl.includes("/calculators#")
            ) {
              expect(
                itemName,
                `Guide ${guide.slug} breadcrumbs mislabel "${itemUrl}" as "${itemName}". It must be labeled "Calculators" to match page identity.`
              ).toBe("Calculators");
            }
          }
        }
      );
    });

    describe("Inbound Link Equity (Zero Orphan Risk >= 3 Linking Files)", () => {
      const contentRoutes = [
        ...CALCULATOR_REGISTRY.map((c) => c.path),
        ...GUIDE_REGISTRY.map((g) => g.path),
      ];

      it.each(contentRoutes)(
        "verifies route %s is linked from at least 3 distinct source files",
        (targetRoute) => {
          let linkingCount = 0;
          const linkingFiles: string[] = [];

          for (const file of allSourceFiles) {
            if (
              file.includes(targetRoute.slice(1)) ||
              file.endsWith("registry.ts") ||
              file.endsWith("sitemap.ts")
            ) {
              continue;
            }

            const content = fs.readFileSync(file, "utf-8");
            if (
              content.includes(`href="${targetRoute}"`) ||
              content.includes(`href="${targetRoute}?`)
            ) {
              linkingCount++;
              linkingFiles.push(path.basename(file));
            }
          }

          expect(
            linkingCount,
            `Route "${targetRoute}" is linked from only ${linkingCount} file(s) (${linkingFiles.join(", ")}). Minimum 3 inbound links required to prevent crawl starvation.`
          ).toBeGreaterThanOrEqual(3);
        }
      );
    });
  });

  // =========================================================================
  // TIER 4: Internal Links & Editorial Quality
  // =========================================================================
  describe("Tier 4: Internal Links, Sitemap Signals & Editorial Quality", () => {
    it("verifies zero internal markdown or JSX links contain '?scenario=' query parameters", () => {
      const violations: { file: string; match: string }[] = [];

      for (const file of allSourceFiles) {
        if (
          file.includes("__tests__") ||
          file.endsWith("registry.ts") ||
          file.endsWith("generator-size.ts")
        ) {
          continue;
        }

        const content = fs.readFileSync(file, "utf-8");
        const matches = Array.from(
          content.matchAll(/href=["'](\/[^"']*\?scenario=[^"']*)["']/g)
        );

        for (const match of matches) {
          violations.push({
            file: path.relative(process.cwd(), file),
            match: match[1],
          });
        }
      }

      expect(
        violations,
        `Found non-canonical internal links containing ?scenario= parameter:\n${JSON.stringify(violations, null, 2)}`
      ).toEqual([]);
    });

    describe("XML Sitemap Signals (changefreq and priority)", () => {
      const sitemapEntries = sitemap();
      const sitemapMap = new Map(
        sitemapEntries.map((e) => [
          e.url.replace("https://calcmypower.com", "") || "/",
          e,
        ])
      );

      it.each(indexablePaths)(
        "verifies sitemap entry for %s defines changeFrequency and priority attributes",
        (routePath) => {
          const entry = sitemapMap.get(routePath);
          expect(entry, `Route ${routePath} missing from sitemap`).toBeDefined();

          expect(
            (entry as any)?.changeFrequency,
            `Route ${routePath} sitemap entry is missing changeFrequency attribute`
          ).toBeDefined();

          expect(
            (entry as any)?.priority,
            `Route ${routePath} sitemap entry is missing priority attribute`
          ).toBeDefined();

          expect(
            typeof (entry as any)?.priority,
            `Route ${routePath} priority attribute must be a number`
          ).toBe("number");
        }
      );
    });

    it("verifies zero em-dashes (\\u2014) in registry.ts and page metadata", () => {
      const allEntries = [
        ...CORE_ROUTE_REGISTRY,
        ...CALCULATOR_REGISTRY,
        ...GUIDE_REGISTRY,
      ];

      for (const entry of allEntries) {
        expect(
          entry.metaTitle,
          `Registry entry ${entry.path} metaTitle contains forbidden em-dash (\\u2014)`
        ).not.toContain("\u2014");

        expect(
          entry.metaDescription,
          `Registry entry ${entry.path} metaDescription contains forbidden em-dash (\\u2014)`
        ).not.toContain("\u2014");
      }

      for (const routePath of indexablePaths) {
        const pagePath = getPageFilePath(routePath);
        const content = fs.readFileSync(pagePath, "utf-8");
        const metadataBlock =
          content.match(/export\s+const\s+metadata[\s\S]*?;\n/)?.[0] || "";

        expect(
          metadataBlock,
          `Page ${routePath} metadata contains forbidden em-dash (\\u2014)`
        ).not.toContain("\u2014");
      }
    });

    it("verifies zero en-dashes (\\u2013) in registry.ts and page metadata", () => {
      const allEntries = [
        ...CORE_ROUTE_REGISTRY,
        ...CALCULATOR_REGISTRY,
        ...GUIDE_REGISTRY,
      ];

      for (const entry of allEntries) {
        expect(
          entry.metaTitle,
          `Registry entry ${entry.path} metaTitle contains forbidden en-dash (\\u2013)`
        ).not.toContain("\u2013");

        expect(
          entry.metaDescription,
          `Registry entry ${entry.path} metaDescription contains forbidden en-dash (\\u2013)`
        ).not.toContain("\u2013");
      }

      for (const routePath of indexablePaths) {
        const pagePath = getPageFilePath(routePath);
        const content = fs.readFileSync(pagePath, "utf-8");
        const metadataBlock =
          content.match(/export\s+const\s+metadata[\s\S]*?;\n/)?.[0] || "";

        expect(
          metadataBlock,
          `Page ${routePath} metadata contains forbidden en-dash (\\u2013)`
        ).not.toContain("\u2013");
      }
    });

    it("verifies ArticleDateByline renders visible author attribution linking to /about", () => {
      const bylinePath = path.join(
        COMPONENTS_DIR,
        "article",
        "ArticleDateByline.tsx"
      );
      const bylineContent = fs.readFileSync(bylinePath, "utf-8");

      expect(
        bylineContent.includes('href="/about"') ||
          bylineContent.includes("CalcMyPower Technical Publishing") ||
          bylineContent.includes("CalcMyPower"),
        "ArticleDateByline.tsx must render visible institutional author attribution linked to /about (E-E-A-T Quality Gate)"
      ).toBe(true);
    });

    it("verifies calculator explanatory body paragraphs do not exceed 55 words", () => {
      const targetCalculatorFiles = [
        "VoltageDropCalculator.tsx",
        "BatteryCapacityCalculator.tsx",
        "SolarSystemSizeCalculator.tsx",
      ];

      const violations: { file: string; words: number; snippet: string }[] = [];

      for (const fileName of targetCalculatorFiles) {
        const filePath = path.join(COMPONENTS_DIR, "calculators", fileName);
        if (!fs.existsSync(filePath)) continue;

        const content = fs.readFileSync(filePath, "utf-8");
        const pTags = Array.from(content.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g));

        for (const match of pTags) {
          const rawText = match[1]
            .replace(/<[^>]+>/g, " ")
            .replace(/\{[^}]+\}/g, " ")
            .replace(/\s+/g, " ")
            .trim();

          const wordCount = rawText
            .split(/\s+/)
            .filter((w) => w.length > 0).length;

          if (wordCount > 55) {
            violations.push({
              file: fileName,
              words: wordCount,
              snippet: rawText.slice(0, 80) + "...",
            });
          }
        }
      }

      expect(
        violations,
        `Found dense paragraphs exceeding 55 words in calculators:\n${JSON.stringify(violations, null, 2)}`
      ).toEqual([]);
    });
  });
});
