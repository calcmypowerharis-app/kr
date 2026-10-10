import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import {
  calculateGeneratorSize,
  getGeneratorScenario,
} from "@/lib/calculators/generator-size";
import { TOC_ITEMS as HOUSE_TOC_ITEMS } from "@/components/article/tocData";
import { GENERATOR_FUEL_FAQS } from "@/lib/calculators/generator-fuel";
import { WATTS_TO_AMPS_FAQS } from "@/lib/calculators/watts-to-amps";
import { AMPS_TO_WATTS_FAQS } from "@/lib/calculators/amps-to-watts";
import { GENERATOR_WATTAGE_CHART_FAQS } from "@/lib/calculators/generator-wattage-chart";
import {
  CORE_ROUTE_REGISTRY,
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
} from "@/lib/seo/registry";

const APP_DIR = path.resolve(process.cwd(), "src/app");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

/**
 * Helper to discover all editorial article page.tsx files in src/app.
 * Editorial articles are identified by using generateArticleSchema.
 */
function getEditorialArticlePages(): { route: string; filePath: string; content: string }[] {
  const entries = fs.readdirSync(APP_DIR, { withFileTypes: true });
  const articles: { route: string; filePath: string; content: string }[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pagePath = path.join(APP_DIR, entry.name, "page.tsx");
    if (!fs.existsSync(pagePath)) continue;

    const content = fs.readFileSync(pagePath, "utf8");
    if (content.includes("generateArticleSchema")) {
      articles.push({
        route: `/${entry.name}`,
        filePath: pagePath,
        content,
      });
    }
  }

  return articles;
}

describe("Editorial & Image Quality Gate (Sections 22, 26, 28)", () => {
  const articles = getEditorialArticlePages();

  it("discovers existing editorial articles in src/app", () => {
    expect(articles.length).toBeGreaterThanOrEqual(2);
    const routes = articles.map((a) => a.route);
    expect(routes).toContain("/what-size-generator-do-i-need-for-my-house");
    expect(routes).toContain("/what-size-generator-to-run-a-refrigerator");
  });

  describe("1. Article Image Uniqueness & Physical Existence (Section 28)", () => {
    it("ensures every referenced article image physically exists in public/ and has descriptive alt text", () => {
      for (const article of articles) {
        const imageRegex = /\/images\/articles\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|svg)/g;
        const matches = Array.from(new Set(article.content.match(imageRegex) || []));

        expect(
          matches.length,
          `Article ${article.route} should reference at least one image in /images/articles/`
        ).toBeGreaterThanOrEqual(1);

        for (const imgRelPath of matches) {
          const fullPublicPath = path.join(PUBLIC_DIR, imgRelPath);
          expect(
            fs.existsSync(fullPublicPath),
            `Image ${imgRelPath} referenced in ${article.route} does not exist at ${fullPublicPath}`
          ).toBe(true);

          const stat = fs.statSync(fullPublicPath);
          expect(
            stat.size,
            `Image ${imgRelPath} in ${article.route} is empty (0 bytes)`
          ).toBeGreaterThan(1000);
        }

        // Verify all <Image ... /> tags have meaningful alt attributes (>= 20 chars)
        const jsxImageBlocks = article.content.match(/<Image[\s\S]*?\/>/g) || [];
        expect(jsxImageBlocks.length).toBeGreaterThanOrEqual(1);

        for (const block of jsxImageBlocks) {
          const altMatch = block.match(/alt="([^"]+)"/);
          expect(
            altMatch,
            `<Image> tag in ${article.route} is missing a static string alt attribute:\n${block}`
          ).not.toBeNull();
          expect(
            altMatch![1].trim().length,
            `Alt text "${altMatch![1]}" in ${article.route} is too short; must be descriptive (>= 20 chars)`
          ).toBeGreaterThanOrEqual(20);
        }
      }
    });

    it("enforces zero image asset reuse across different editorial articles (Section 28 Non-Repetition Rule)", () => {
      const assetOwnerMap = new Map<string, string>();

      for (const article of articles) {
        const imageRegex = /\/images\/articles\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|svg)/g;
        const uniqueAssetsInArticle = Array.from(
          new Set(article.content.match(imageRegex) || [])
        );

        for (const asset of uniqueAssetsInArticle) {
          const existingOwner = assetOwnerMap.get(asset);
          expect(
            existingOwner,
            `Section 28 Violation: Image asset "${asset}" is reused across multiple articles (${existingOwner} and ${article.route}). Every article must use 100% unique visual assets.`
          ).toBeUndefined();

          assetOwnerMap.set(asset, article.route);
        }
      }
    });
  });

  describe("2. Zero Em-Dash Editorial Punctuation Standard (Section 4 & 22)", () => {
    it("ensures no editorial article contains em-dash characters (—)", () => {
      for (const article of articles) {
        const emDashCount = (article.content.match(/\u2014/g) || []).length;
        expect(
          emDashCount,
          `Article ${article.route} contains ${emDashCount} forbidden em-dash (—) character(s)`
        ).toBe(0);
      }
    });
  });

  describe("3. Table of Contents (TOC) Anchor Link Integrity", () => {
    it("verifies every TOC item ID matches a rendered section or heading ID in the article", () => {
      for (const article of articles) {
        let tocIds: string[] = [];

        // Extract inline TocItem[] definitions if present in page.tsx
        const inlineTocMatches = Array.from(
          article.content.matchAll(/\{\s*id:\s*"([^"]+)",\s*label:\s*"([^"]+)"\s*\}/g)
        );

        if (inlineTocMatches.length > 0) {
          tocIds = inlineTocMatches.map((m) => m[1]);
        } else if (article.route === "/what-size-generator-do-i-need-for-my-house") {
          tocIds = HOUSE_TOC_ITEMS.map((item) => item.id);
        }

        expect(
          tocIds.length,
          `Could not find TOC items for article ${article.route}`
        ).toBeGreaterThanOrEqual(5);

        for (const id of tocIds) {
          const hasTargetId = article.content.includes(`id="${id}"`);
          expect(
            hasTargetId,
            `TOC anchor id="${id}" in ${article.route} does not match any element id="${id}" on the page`
          ).toBe(true);
        }
      }
    });
  });

  describe("4. Article Worked Example ↔ Calculator Scenario Single Source of Truth (Section 26-C)", () => {
    it("verifies all deep-linked calculator scenarios exist and match worked example numbers in article text", () => {
      const generatorArticles = articles.filter((a) => a.route.includes("generator"));
      for (const article of generatorArticles) {
        const scenarioLinks = Array.from(
          article.content.matchAll(/\/generator-size-calculator\?scenario=([a-zA-Z0-9_-]+)/g)
        );

        expect(
          scenarioLinks.length,
          `Article ${article.route} should contain a deep link to a calculator scenario`
        ).toBeGreaterThanOrEqual(1);

        for (const match of scenarioLinks) {
          const scenarioKey = match[1];
          const scenario = getGeneratorScenario(scenarioKey);

          expect(
            scenario,
            `Deep-linked scenario "?scenario=${scenarioKey}" in ${article.route} does not exist in GENERATOR_SCENARIO_PRESETS`
          ).not.toBeNull();

          const calc = calculateGeneratorSize({ appliances: scenario!.appliances });
          expect(calc.isValid).toBe(true);

          const formattedRunning = calc.totalRunningWatts.toLocaleString("en-US");
          const formattedSurgeDelta = calc.largestAdditionalStartingWatts.toLocaleString("en-US");
          const formattedPeak = calc.peakStartingDemand.toLocaleString("en-US");
          const formattedPlanning = Math.round(calc.planningCapacityWatts).toLocaleString("en-US");

          expect(
            article.content.includes(formattedRunning),
            `Article ${article.route} worked example is out of sync with scenario "${scenarioKey}": missing totalRunningWatts (${formattedRunning})`
          ).toBe(true);

          expect(
            article.content.includes(formattedSurgeDelta),
            `Article ${article.route} worked example is out of sync with scenario "${scenarioKey}": missing largestAdditionalStartingWatts (${formattedSurgeDelta})`
          ).toBe(true);

          expect(
            article.content.includes(formattedPeak),
            `Article ${article.route} worked example is out of sync with scenario "${scenarioKey}": missing peakStartingDemand (${formattedPeak})`
          ).toBe(true);

          expect(
            article.content.includes(formattedPlanning),
            `Article ${article.route} worked example is out of sync with scenario "${scenarioKey}": missing planningCapacityWatts (${formattedPlanning})`
          ).toBe(true);
        }
      }
    });
  });

  describe("5. Image Asset Format and Size Ceiling Guardrail (Phase 1 SEO Remediation)", () => {
    it("enforces zero legacy JPEG assets in public/images/articles and public/images/calculators", () => {
      const targetDirs = [
        path.join(PUBLIC_DIR, "images", "articles"),
        path.join(PUBLIC_DIR, "images", "calculators"),
      ];

      for (const dir of targetDirs) {
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          expect(
            [".webp", ".svg"],
            `Legacy format detected in ${dir}: ${file}. All assets must be optimized WebP or SVG.`
          ).toContain(ext);
        }
      }
    });

    it("enforces the 150 KB hard size ceiling for all production article and calculator image assets", () => {
      const targetDirs = [
        path.join(PUBLIC_DIR, "images", "articles"),
        path.join(PUBLIC_DIR, "images", "calculators"),
      ];

      const MAX_BYTES = 150 * 1024; // 153,600 bytes

      for (const dir of targetDirs) {
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          expect(
            stat.size,
            `Asset ${file} in ${dir} exceeds 150 KB limit (${(stat.size / 1024).toFixed(1)} KB)`
          ).toBeLessThanOrEqual(MAX_BYTES);
        }
      }
    });

    it("verifies zero editorial articles reference obsolete .jpg or .jpeg images", () => {
      for (const article of articles) {
        const jpgMatches = article.content.match(/\/images\/[a-zA-Z0-9_\-\/]+\.(jpg|jpeg)/gi) || [];
        expect(
          jpgMatches.length,
          `Article ${article.route} references obsolete JPEG asset(s): ${jpgMatches.join(", ")}`
        ).toBe(0);
      }
    });
  });

  describe("6. FAQ Schema and Rendered UI Parity (Single Source of Truth)", () => {
    it("verifies /generator-fuel-consumption-calculator imports and renders GENERATOR_FUEL_FAQS", () => {
      const pageFile = fs.readFileSync(path.join(APP_DIR, "generator-fuel-consumption-calculator", "page.tsx"), "utf8");
      const compFile = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculators/GeneratorFuelCalculator.tsx"), "utf8");

      expect(pageFile).toContain("GENERATOR_FUEL_FAQS");
      expect(pageFile).toContain("generateFaqSchema(GENERATOR_FUEL_FAQS)");
      expect(compFile).toContain("GENERATOR_FUEL_FAQS");
      expect(compFile).toContain("<FaqSection faqs={GENERATOR_FUEL_FAQS}");
      expect(GENERATOR_FUEL_FAQS.length).toBeGreaterThanOrEqual(3);
    });

    it("verifies /watts-to-amps-calculator imports and renders WATTS_TO_AMPS_FAQS", () => {
      const pageFile = fs.readFileSync(path.join(APP_DIR, "watts-to-amps-calculator", "page.tsx"), "utf8");
      const compFile = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculators/WattsToAmpsCalculator.tsx"), "utf8");

      expect(pageFile).toContain("WATTS_TO_AMPS_FAQS");
      expect(pageFile).toContain("generateFaqSchema(WATTS_TO_AMPS_FAQS)");
      expect(compFile).toContain("WATTS_TO_AMPS_FAQS");
      expect(compFile).toContain("<FaqSection faqs={WATTS_TO_AMPS_FAQS}");
      expect(WATTS_TO_AMPS_FAQS.length).toBeGreaterThanOrEqual(6);
    });

    it("verifies /amps-to-watts-calculator imports and renders AMPS_TO_WATTS_FAQS", () => {
      const pageFile = fs.readFileSync(path.join(APP_DIR, "amps-to-watts-calculator", "page.tsx"), "utf8");
      const compFile = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculators/AmpsToWattsCalculator.tsx"), "utf8");

      expect(pageFile).toContain("AMPS_TO_WATTS_FAQS");
      expect(pageFile).toContain("generateFaqSchema(AMPS_TO_WATTS_FAQS)");
      expect(compFile).toContain("AMPS_TO_WATTS_FAQS");
      expect(compFile).toContain("<FaqSection faqs={AMPS_TO_WATTS_FAQS}");
      expect(AMPS_TO_WATTS_FAQS.length).toBeGreaterThanOrEqual(10);
    });

    it("verifies /generator-wattage-chart imports and renders GENERATOR_WATTAGE_CHART_FAQS", () => {
      const pageFile = fs.readFileSync(path.join(APP_DIR, "generator-wattage-chart", "page.tsx"), "utf8");
      const compFile = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculators/GeneratorWattageChart.tsx"), "utf8");

      expect(pageFile).toContain("GENERATOR_WATTAGE_CHART_FAQS");
      expect(pageFile).toContain("generateFaqSchema(GENERATOR_WATTAGE_CHART_FAQS)");
      expect(compFile).toContain("GENERATOR_WATTAGE_CHART_FAQS");
      expect(compFile).toContain("GENERATOR_WATTAGE_CHART_FAQS.map");
      expect(GENERATOR_WATTAGE_CHART_FAQS.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("7. Metadata Synchronization & Registry Completeness", () => {
    it("verifies CORE_ROUTE_REGISTRY entries have non-empty metaTitle and metaDescription", () => {
      expect(CORE_ROUTE_REGISTRY.length).toBeGreaterThanOrEqual(2);
      for (const entry of CORE_ROUTE_REGISTRY) {
        expect(entry.metaTitle.length).toBeGreaterThanOrEqual(10);
        expect(entry.metaDescription.length).toBeGreaterThanOrEqual(50);
        expect(entry.metaDescription.length).toBeLessThanOrEqual(165);
      }
    });

    it("verifies homepage and calculators directory metadata matches CORE_ROUTE_REGISTRY", () => {
      const homePage = fs.readFileSync(path.join(APP_DIR, "page.tsx"), "utf8");
      const calcPage = fs.readFileSync(path.join(APP_DIR, "calculators", "page.tsx"), "utf8");

      const homeEntry = CORE_ROUTE_REGISTRY.find((r) => r.path === "/");
      const calcEntry = CORE_ROUTE_REGISTRY.find((r) => r.path === "/calculators");

      expect(homeEntry).toBeDefined();
      expect(calcEntry).toBeDefined();

      expect(homePage).toContain(homeEntry!.metaDescription);
      expect(calcPage).toContain(calcEntry!.metaDescription);
    });

    const BATCH_1_ROUTES = [
      "/",
      "/calculators",
      "/generator-fuel-consumption-calculator",
      "/battery-capacity-calculator",
      "/amps-to-watts-calculator",
      "/generator-amperage-chart-calculator",
      "/voltage-drop-calculator",
      "/how-much-gas-does-a-generator-use",
      "/how-to-calculate-electricity-usage",
      "/how-to-calculate-electricity-bill",
      "/how-to-calculate-amp-hours-of-a-battery-bank",
    ];

    it("verifies all calculators in CALCULATOR_REGISTRY have synchronized titles and descriptions with page.tsx", () => {
      for (const calc of CALCULATOR_REGISTRY) {
        const pagePath = path.join(APP_DIR, calc.slug, "page.tsx");
        expect(fs.existsSync(pagePath), `Page file does not exist: ${pagePath}`).toBe(true);
        const pageContent = fs.readFileSync(pagePath, "utf8");

        const cleanMetaTitle = calc.metaTitle.replace(/\s*\|\s*CalcMyPower$/i, "").trim();
        expect(
          pageContent,
          `Calculator ${calc.path} page.tsx does not match registry metaTitle: ${cleanMetaTitle}`
        ).toContain(cleanMetaTitle);

        expect(
          pageContent,
          `Calculator ${calc.path} page.tsx does not match registry metaDescription`
        ).toContain(calc.metaDescription);

        if (BATCH_1_ROUTES.includes(calc.path)) {
          expect(cleanMetaTitle.length).toBeLessThanOrEqual(65);
          expect(calc.metaDescription.length).toBeLessThanOrEqual(165);
        }
      }
    });

    it("verifies all editorial guides in GUIDE_REGISTRY have synchronized titles and descriptions with page.tsx", () => {
      for (const guide of GUIDE_REGISTRY) {
        const pagePath = path.join(APP_DIR, guide.slug, "page.tsx");
        expect(fs.existsSync(pagePath), `Page file does not exist: ${pagePath}`).toBe(true);
        const pageContent = fs.readFileSync(pagePath, "utf8");

        const cleanMetaTitle = guide.metaTitle.replace(/\s*\|\s*CalcMyPower$/i, "").trim();
        expect(
          pageContent,
          `Guide ${guide.path} page.tsx does not match registry metaTitle: ${cleanMetaTitle}`
        ).toContain(cleanMetaTitle);

        expect(
          pageContent,
          `Guide ${guide.path} page.tsx does not match registry metaDescription`
        ).toContain(guide.metaDescription);

        if (BATCH_1_ROUTES.includes(guide.path)) {
          expect(cleanMetaTitle.length).toBeLessThanOrEqual(65);
          expect(guide.metaDescription.length).toBeLessThanOrEqual(165);
        }
      }
    });

    it("enforces zero em-dashes across all registry meta titles and meta descriptions", () => {
      const allEntries = [
        ...CORE_ROUTE_REGISTRY,
        ...CALCULATOR_REGISTRY,
        ...GUIDE_REGISTRY,
      ];
      for (const entry of allEntries) {
        expect(
          entry.metaTitle,
          `Entry ${entry.path} metaTitle contains em-dash`
        ).not.toContain("\u2014");
        expect(
          entry.metaDescription,
          `Entry ${entry.path} metaDescription contains em-dash`
        ).not.toContain("\u2014");
      }
    });
  });

  describe("8. Contextual Internal Linking Architecture & Reciprocal Verification", () => {
    it("verifies calculator component contextual companion guide links", () => {
      const solarCalc = fs.readFileSync(
        path.resolve(process.cwd(), "src/components/calculators/SolarSystemSizeCalculator.tsx"),
        "utf8"
      );
      expect(solarCalc).toContain('href="/how-many-solar-panels-do-i-need"');
      expect(solarCalc).toContain('href="/how-much-energy-does-a-solar-panel-produce"');

      const inverterCalc = fs.readFileSync(
        path.resolve(process.cwd(), "src/components/calculators/InverterSizeCalculator.tsx"),
        "utf8"
      );
      expect(inverterCalc).toContain('href="/battery-capacity-calculator"');
      expect(inverterCalc).toContain('href="/how-many-amp-hours-do-i-need"');

      const voltageDropCalc = fs.readFileSync(
        path.resolve(process.cwd(), "src/components/calculators/VoltageDropCalculator.tsx"),
        "utf8"
      );
      expect(voltageDropCalc).toContain('href="/watts-to-amps-calculator"');
      expect(voltageDropCalc).toContain('href="/solar-panels-series-vs-parallel"');
    });

    it("verifies editorial guides have essential contextual and reciprocal internal links", () => {
      const ahNeedGuide = fs.readFileSync(
        path.join(APP_DIR, "how-many-amp-hours-do-i-need", "page.tsx"),
        "utf8"
      );
      expect(ahNeedGuide).toContain('href="/how-to-calculate-amp-hours-of-a-battery-bank"');
      expect(ahNeedGuide).toContain('href="/how-long-will-a-100ah-battery-last"');

      const chargeControllerGuide = fs.readFileSync(
        path.join(APP_DIR, "how-to-size-a-solar-charge-controller", "page.tsx"),
        "utf8"
      );
      expect(chargeControllerGuide).toContain('href="/solar-panels-series-vs-parallel"');
      expect(chargeControllerGuide).toContain('href="/solar-system-size-calculator"');

      const contPowerGuide = fs.readFileSync(
        path.join(APP_DIR, "continuous-power-generators", "page.tsx"),
        "utf8"
      );
      expect(contPowerGuide).toContain('href="/generator-fuel-consumption-calculator"');
      expect(contPowerGuide).toContain('href="/how-much-gas-does-a-generator-use"');

      const whatIsAhGuide = fs.readFileSync(
        path.join(APP_DIR, "what-does-ah-mean-on-a-battery", "page.tsx"),
        "utf8"
      );
      expect(whatIsAhGuide).toContain('href="/how-to-calculate-amp-hours-of-a-battery-bank"');

      const ah100Guide = fs.readFileSync(
        path.join(APP_DIR, "how-long-will-a-100ah-battery-last", "page.tsx"),
        "utf8"
      );
      expect(ah100Guide).toContain('href="/how-many-amp-hours-do-i-need"');
      expect(ah100Guide).toContain('href="/how-to-calculate-amp-hours-of-a-battery-bank"');
    });

    it("verifies all registry related paths correspond to existing routes in src/app", () => {
      const allEntries = [...CALCULATOR_REGISTRY, ...GUIDE_REGISTRY];
      for (const entry of allEntries) {
        for (const calcPath of entry.relatedCalculatorPaths) {
          const slug = calcPath.replace(/^\//, "");
          const pagePath = path.join(APP_DIR, slug, "page.tsx");
          expect(
            fs.existsSync(pagePath),
            `Referenced related calculator path "${calcPath}" in ${entry.path} does not exist at ${pagePath}`
          ).toBe(true);
        }
        for (const guidePath of entry.relatedGuidePaths) {
          const slug = guidePath.replace(/^\//, "");
          const pagePath = path.join(APP_DIR, slug, "page.tsx");
          expect(
            fs.existsSync(pagePath),
            `Referenced related guide path "${guidePath}" in ${entry.path} does not exist at ${pagePath}`
          ).toBe(true);
        }
      }
    });
  });
});

