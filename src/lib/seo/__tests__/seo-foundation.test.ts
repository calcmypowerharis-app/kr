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

    it("generates a valid robots.txt configuration pointing to https://calcmypower.com/sitemap.xml and permitting verified search crawlers while disallowing model-training scrapers", () => {
      const robotsConfig = robots();
      expect(robotsConfig.sitemap).toBe(`${SITE_URL}/sitemap.xml`);

      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules
        : [robotsConfig.rules];

      const userAgents = rules.map((r) => r.userAgent);
      expect(userAgents).toContain("*");
      expect(userAgents).toContain("Googlebot");
      expect(userAgents).toContain("Bingbot");
      expect(userAgents).toContain("OAI-SearchBot");
      expect(userAgents).toContain("GPTBot");

      const searchRules = rules.filter((r) => r.userAgent !== "GPTBot");
      for (const rule of searchRules) {
        expect(rule.allow).toBe("/");
        expect(rule.disallow).toContain("/api/");
      }

      // Explicit regression test: verify GPTBot is disallowed from crawling root
      const gptBotRule = rules.find((r) => r.userAgent === "GPTBot");
      expect(gptBotRule).toBeDefined();
      expect(gptBotRule?.disallow).toContain("/");
      expect(gptBotRule?.allow).toBeUndefined();

      // Explicit regression test: verify OAI-SearchBot is allowed for ChatGPT Search
      const oaiSearchRule = rules.find((r) => r.userAgent === "OAI-SearchBot");
      expect(oaiSearchRule).toBeDefined();
      expect(oaiSearchRule?.allow).toBe("/");
      expect(oaiSearchRule?.disallow).toContain("/api/");

      /**
       * Semantic Robots.txt Evaluator adhering to RFC 9309 and Google Robots.txt Specification:
       * 1. Group Selection (RFC 9309 Section 2.2.1): Crawler selects the group matching its most specific product token.
       *    If no specific match exists, falls back to the wildcard '*' group. Group order in the file is irrelevant.
       * 2. Directive Evaluation (RFC 9309 Section 2.2.2): The most specific matching path prefix (longest path) wins.
       *    If allow and disallow have identical path lengths, allow takes precedence.
       */
      type RobotsRuleItem = (typeof rules)[number];
      function evaluateRobotsAccess(
        candidateRules: RobotsRuleItem[],
        crawlerBot: string,
        urlPath: string
      ): { allowed: boolean; matchedGroup: string; matchedDirective?: string } {
        const records: Array<{
          userAgent: string;
          allows: string[];
          disallows: string[];
        }> = [];

        for (const r of candidateRules) {
          if (!r) continue;
          const rawAgents = r.userAgent
            ? Array.isArray(r.userAgent)
              ? r.userAgent
              : [r.userAgent]
            : ["*"];
          const allows = r.allow
            ? Array.isArray(r.allow)
              ? r.allow
              : [r.allow]
            : [];
          const disallows = r.disallow
            ? Array.isArray(r.disallow)
              ? r.disallow
              : [r.disallow]
            : [];
          for (const agent of rawAgents) {
            if (agent) {
              records.push({ userAgent: agent, allows, disallows });
            }
          }
        }

        const lowerBot = crawlerBot.toLowerCase();
        let selectedRecord: (typeof records)[0] | null = null;
        let maxMatchLen = -1;

        // Find the group with the most specific matching user-agent token
        for (const rec of records) {
          const lowerAgent = rec.userAgent.toLowerCase();
          if (lowerAgent !== "*" && lowerBot.includes(lowerAgent)) {
            if (lowerAgent.length > maxMatchLen) {
              maxMatchLen = lowerAgent.length;
              selectedRecord = rec;
            }
          }
        }

        // If no specific match, fallback to wildcard '*'
        if (!selectedRecord) {
          selectedRecord = records.find((rec) => rec.userAgent === "*") || null;
        }

        if (!selectedRecord) {
          return { allowed: true, matchedGroup: "none" };
        }

        // Evaluate directives: longest matching path prefix wins
        let winningDirective: { type: "allow" | "disallow"; path: string } | null = null;

        for (const aPath of selectedRecord.allows) {
          if (urlPath.startsWith(aPath)) {
            if (
              !winningDirective ||
              aPath.length > winningDirective.path.length ||
              (aPath.length === winningDirective.path.length && winningDirective.type === "disallow")
            ) {
              winningDirective = { type: "allow", path: aPath };
            }
          }
        }

        for (const dPath of selectedRecord.disallows) {
          if (urlPath.startsWith(dPath)) {
            if (!winningDirective || dPath.length > winningDirective.path.length) {
              winningDirective = { type: "disallow", path: dPath };
            }
          }
        }

        if (!winningDirective) {
          return { allowed: true, matchedGroup: selectedRecord.userAgent };
        }

        return {
          allowed: winningDirective.type === "allow",
          matchedGroup: selectedRecord.userAgent,
          matchedDirective: `${winningDirective.type}: ${winningDirective.path}`,
        };
      }

      // 1. Semantic Test: GPTBot is disallowed from root and all public pages
      const gptRootAccess = evaluateRobotsAccess(rules, "GPTBot", "/");
      expect(gptRootAccess.allowed).toBe(false);
      expect(gptRootAccess.matchedGroup).toBe("GPTBot");
      expect(gptRootAccess.matchedDirective).toBe("disallow: /");

      const gptCalcAccess = evaluateRobotsAccess(rules, "GPTBot", "/generator-size-calculator");
      expect(gptCalcAccess.allowed).toBe(false);
      expect(gptCalcAccess.matchedGroup).toBe("GPTBot");

      // 2. Semantic Test: OAI-SearchBot can crawl public pages, but /api/ remains disallowed
      const oaiRootAccess = evaluateRobotsAccess(rules, "OAI-SearchBot", "/");
      expect(oaiRootAccess.allowed).toBe(true);
      expect(oaiRootAccess.matchedGroup).toBe("OAI-SearchBot");

      const oaiCalcAccess = evaluateRobotsAccess(rules, "OAI-SearchBot", "/solar-battery-calculator");
      expect(oaiCalcAccess.allowed).toBe(true);
      expect(oaiCalcAccess.matchedGroup).toBe("OAI-SearchBot");

      const oaiApiAccess = evaluateRobotsAccess(rules, "OAI-SearchBot", "/api/calculator");
      expect(oaiApiAccess.allowed).toBe(false);
      expect(oaiApiAccess.matchedDirective).toBe("disallow: /api/");

      // 3. Semantic Test: Googlebot and Bingbot can crawl public pages, but /api/ remains disallowed
      const googlebotPublic = evaluateRobotsAccess(rules, "Googlebot", "/");
      expect(googlebotPublic.allowed).toBe(true);
      expect(googlebotPublic.matchedGroup).toBe("Googlebot");
      const googlebotApi = evaluateRobotsAccess(rules, "Googlebot", "/api/private");
      expect(googlebotApi.allowed).toBe(false);

      const bingbotPublic = evaluateRobotsAccess(rules, "Bingbot", "/");
      expect(bingbotPublic.allowed).toBe(true);
      expect(bingbotPublic.matchedGroup).toBe("Bingbot");
      const bingbotApi = evaluateRobotsAccess(rules, "Bingbot", "/api/private");
      expect(bingbotApi.allowed).toBe(false);

      // 4. Semantic Test: The wildcard policy does NOT override the more specific GPTBot policy
      const genericBotPublic = evaluateRobotsAccess(rules, "GenericWebCrawler/1.0", "/");
      expect(genericBotPublic.allowed).toBe(true);
      expect(genericBotPublic.matchedGroup).toBe("*");

      // Even if wildcard rule group is placed first, GPTBot selects its specific group (order independence)
      const reversedRules = [...rules].reverse();
      const gptReversedAccess = evaluateRobotsAccess(reversedRules, "GPTBot", "/");
      expect(gptReversedAccess.allowed).toBe(false);
      expect(gptReversedAccess.matchedGroup).toBe("GPTBot");
      expect(gptReversedAccess.matchedDirective).toBe("disallow: /");
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
        "/privacy",
        "/terms",
        "/about",
        "/contact",
      ]);
    });
  });

  describe("6. Pre-Publication Quality Sentinel & Crawl Discovery Guardrails (Lesson 025)", () => {
    it("guarantees all registered route meta descriptions are strictly <= 165 characters to prevent SERP truncation", () => {
      const allRoutes = [
        ...CORE_ROUTE_REGISTRY,
        ...CALCULATOR_REGISTRY,
        ...GUIDE_REGISTRY,
      ];
      const outOfBoundsRoutes: { path: string; length: number; desc: string }[] = [];
      for (const route of allRoutes) {
        if (route.metaDescription.length > 165 || route.metaDescription.length < 100) {
          outOfBoundsRoutes.push({
            path: route.path,
            length: route.metaDescription.length,
            desc: route.metaDescription,
          });
        }
      }
      expect(
        outOfBoundsRoutes,
        `Routes with out-of-bounds meta descriptions:\n${JSON.stringify(outOfBoundsRoutes, null, 2)}`
      ).toEqual([]);
    });

    it("guarantees every indexable calculator and guide is linked within 1 hop from the homepage or calculators directory", () => {
      const homeContent = fs.readFileSync(path.join(APP_DIR, "page.tsx"), "utf8");
      const calcHubContent = fs.readFileSync(path.join(APP_DIR, "calculators", "page.tsx"), "utf8");
      const contentRoutes = [
        ...CALCULATOR_REGISTRY.map((c) => c.path),
        ...GUIDE_REGISTRY.map((g) => g.path),
      ];

      for (const targetRoute of contentRoutes) {
        const isLinkedFromHome =
          homeContent.includes(`href="${targetRoute}"`) ||
          homeContent.includes(`href="${targetRoute}?`);
        const isLinkedFromCalcHub =
          calcHubContent.includes(`href="${targetRoute}"`) ||
          calcHubContent.includes(`href="${targetRoute}?`);

        expect(
          isLinkedFromHome || isLinkedFromCalcHub,
          `Route "${targetRoute}" is not linked from either Homepage (src/app/page.tsx) or Calculators Hub (src/app/calculators/page.tsx), creating deep crawl distance`
        ).toBe(true);
      }
    });

    it("enforces sitewide zero em-dash characters (\\u2014) across all source files in src/", () => {
      const allSrcFiles = getAllSourceFiles(SRC_DIR);
      for (const file of allSrcFiles) {
        const content = fs.readFileSync(file, "utf8");
        const emDashMatches = content.match(/\u2014/g);
        expect(
          emDashMatches,
          `File ${path.relative(process.cwd(), file)} contains forbidden em-dash (\\u2014) character(s)`
        ).toBeNull();
      }
    });

    it("guarantees all trust policy pages exist and are linked in Footer.tsx", () => {
      const footerPath = path.join(SRC_DIR, "components/layout/Footer.tsx");
      const footerContent = fs.readFileSync(footerPath, "utf8");
      const trustRoutes = ["/privacy", "/terms", "/about", "/contact"];

      for (const route of trustRoutes) {
        expect(
          footerContent.includes(`href="${route}"`),
          `Footer.tsx is missing mandatory link to trust route "${route}"`
        ).toBe(true);
      }
    });
  });
});
