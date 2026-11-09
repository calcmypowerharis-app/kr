import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ArticleDateByline } from "@/components/article/ArticleDateByline";
import {
  generateWebApplicationSchema,
  generateArticleSchema,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/lib/seo/schema";
import {
  DEFAULT_AUTHOR_NAME,
  DEFAULT_AUTHOR_URL,
  SITE_URL,
  SITE_NAME,
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
} from "@/lib/seo/registry";
import fs from "fs";
import path from "path";

describe("Milestone 3 Adversarial Empirical Challenge Suite", () => {
  describe("1. ArticleDateByline Component Adversarial Stress Tests", () => {
    it("renders default institutional author attribution linked to /about", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-10-01",
        })
      );

      expect(html).toContain('href="/about"');
      expect(html).toContain("CalcMyPower Technical Publishing");
      expect(html).toContain("<span>By</span>");
      expect(html).toContain("Published");
      expect(html).toContain("October 1, 2026");
      expect(html).not.toContain("Last updated");
      expect(html).not.toContain("\u2014"); // em-dash
      expect(html).not.toContain("\u2013"); // en-dash
    });

    it("suppresses Last updated when datePublished equals lastModified", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-10-01",
          lastModified: "2026-10-01",
        })
      );

      expect(html).toContain("Published");
      expect(html).toContain("October 1, 2026");
      expect(html).not.toContain("Last updated");
    });

    it("renders Last updated when meaningful revision occurs", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-09-27",
          lastModified: "2026-09-28",
        })
      );

      expect(html).toContain("Published");
      expect(html).toContain("September 27, 2026");
      expect(html).toContain("Last updated");
      expect(html).toContain("September 28, 2026");
      expect(html).toContain("·");
    });

    it("supports author overrides via authorHref and authorName", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-10-01",
          authorName: "Custom Engineering Review",
          authorHref: "/about/team",
        })
      );

      expect(html).toContain('href="/about/team"');
      expect(html).toContain("Custom Engineering Review");
    });

    it("supports authorUrl fallback when authorHref is omitted", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-10-01",
          authorName: "Editorial Staff",
          authorUrl: "/editorial",
        })
      );

      expect(html).toContain('href="/editorial"');
      expect(html).toContain("Editorial Staff");
    });

    it("authorHref takes precedence over authorUrl when both are provided", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-10-01",
          authorHref: "/primary-link",
          authorUrl: "/secondary-link",
        })
      );

      expect(html).toContain('href="/primary-link"');
      expect(html).not.toContain('href="/secondary-link"');
    });

    it("completely suppresses author markup when showAuthor is false", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-10-01",
          showAuthor: false,
        })
      );

      expect(html).not.toContain("<span>By</span>");
      expect(html).not.toContain('href="/about"');
      expect(html).not.toContain("CalcMyPower Technical Publishing");
      expect(html).toContain("Published");
      expect(html).toContain("October 1, 2026");
    });

    it("handles malformed date strings gracefully with raw fallback", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "malformed-date-string",
        })
      );

      expect(html).toContain("Published");
      expect(html).toContain("malformed-date-string");
    });

    it("separators are marked aria-hidden to protect screen readers", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-09-27",
          lastModified: "2026-09-28",
        })
      );

      const matches = html.match(/aria-hidden="true"/g);
      expect(matches).not.toBeNull();
      expect(matches!.length).toBeGreaterThanOrEqual(2);
    });

    it("has mobile-responsive CSS flex classes and nowrap constraints", () => {
      const html = renderToString(
        React.createElement(ArticleDateByline, {
          datePublished: "2026-09-27",
          lastModified: "2026-09-28",
        })
      );

      expect(html).toContain("inline-flex");
      expect(html).toContain("flex-wrap");
      expect(html).toContain("whitespace-nowrap");
    });
  });

  describe("2. Schema.org WebApplication & Article Author Parity", () => {
    it("generateWebApplicationSchema emits valid Organization author linked to /about", () => {
      const schema = generateWebApplicationSchema({
        name: "Test Calculator",
        description: "Test description",
        url: `${SITE_URL}/test-calculator`,
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("WebApplication");
      expect(schema.author).toBeDefined();
      expect(schema.author["@type"]).toBe("Organization");
      expect(schema.author.name).toBe("CalcMyPower Technical Publishing");
      expect(schema.author.url).toBe(`${SITE_URL}/about`);
      expect(schema.author["@id"]).toBe(ORGANIZATION_ID);
      expect(schema.publisher["@id"]).toBe(ORGANIZATION_ID);
      expect(schema.isPartOf["@id"]).toBe(WEBSITE_ID);
    });

    it("generateArticleSchema emits valid Organization author linked to /about", () => {
      const schema = generateArticleSchema({
        headline: "Test Guide",
        description: "Test description",
        url: `${SITE_URL}/test-guide`,
        datePublished: "2026-10-01",
        dateModified: "2026-10-02",
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Article");
      expect(schema.author).toBeDefined();
      expect(schema.author["@type"]).toBe("Organization");
      expect(schema.author.name).toBe("CalcMyPower Technical Publishing");
      expect(schema.author.url).toBe(`${SITE_URL}/about`);
      expect(schema.publisher["@id"]).toBe(ORGANIZATION_ID);
      expect(schema.publisher.name).toBe(SITE_NAME);
      expect(schema.isPartOf["@id"]).toBe(WEBSITE_ID);
      expect(schema.datePublished).toBe("2026-10-01T00:00:00Z");
      expect(schema.dateModified).toBe("2026-10-02T00:00:00Z");
      expect(Array.isArray(schema.image)).toBe(true);
      expect(schema.image.length).toBeGreaterThanOrEqual(1);
      expect(schema.image[0]).toBe(`${SITE_URL}/og-image.jpg`);
    });

    it("normalizes relative image paths to fully qualified absolute URLs in Article schema", () => {
      const schema = generateArticleSchema({
        headline: "Relative Images",
        description: "Test description",
        url: `${SITE_URL}/test-relative`,
        datePublished: "2026-10-01",
        dateModified: "2026-10-01",
        images: ["/images/solar.webp", "images/battery.png"],
      });

      expect(schema.image).toEqual([
        `${SITE_URL}/images/solar.webp`,
        `${SITE_URL}/images/battery.png`,
      ]);
    });
  });

  describe("3. Registry Constants & Layout Metadata Alignment", () => {
    it("exports centralized DEFAULT_AUTHOR_NAME and DEFAULT_AUTHOR_URL in registry.ts", () => {
      expect(DEFAULT_AUTHOR_NAME).toBe("CalcMyPower Technical Publishing");
      expect(DEFAULT_AUTHOR_URL).toBe("https://calcmypower.com/about");
    });

    it("verifies root layout.tsx configures authors metadata matching registry", () => {
      const layoutFile = path.join(process.cwd(), "src", "app", "layout.tsx");
      const content = fs.readFileSync(layoutFile, "utf-8");

      expect(content).toContain('name: "CalcMyPower Technical Publishing"');
      expect(content).toContain('url: "https://calcmypower.com/about"');
    });
  });

  describe("4. Static Route Conformance Audit across all 25 Content Routes", () => {
    it("verifies all 10 sizing guides render ArticleDateByline and invoke generateArticleSchema", () => {
      expect(GUIDE_REGISTRY.length).toBe(10);

      for (const guide of GUIDE_REGISTRY) {
        const pageFile = path.join(
          process.cwd(),
          "src",
          "app",
          guide.path.slice(1),
          "page.tsx"
        );
        expect(fs.existsSync(pageFile)).toBe(true);

        const content = fs.readFileSync(pageFile, "utf-8");
        expect(content).toContain("ArticleDateByline");
        expect(content).toContain("generateArticleSchema");
      }
    });

    it("verifies all 15 calculators invoke generateWebApplicationSchema with author parity", () => {
      expect(CALCULATOR_REGISTRY.length).toBe(15);

      for (const calc of CALCULATOR_REGISTRY) {
        const pageFile = path.join(
          process.cwd(),
          "src",
          "app",
          calc.path.slice(1),
          "page.tsx"
        );
        expect(fs.existsSync(pageFile)).toBe(true);

        const content = fs.readFileSync(pageFile, "utf-8");
        expect(content).toContain("generateWebApplicationSchema");
      }
    });
  });

  describe("5. Anti-Hallucination & Rule Compliance Guardrails", () => {
    it("author is institutional Organization, never a hallucinated human engineer (Rule 2 & Rule 3)", () => {
      expect(DEFAULT_AUTHOR_NAME).not.toMatch(/P\.E\.|Engineer|PhD|Doctor|Master/i);
      expect(DEFAULT_AUTHOR_NAME).toBe("CalcMyPower Technical Publishing");
    });

    it("verifies zero em-dashes or en-dashes in M3 touched files", () => {
      const filesToCheck = [
        "src/components/article/ArticleDateByline.tsx",
        "src/lib/seo/schema.ts",
        "src/lib/seo/registry.ts",
        "src/app/layout.tsx",
      ];

      for (const relPath of filesToCheck) {
        const fullPath = path.join(process.cwd(), relPath);
        const text = fs.readFileSync(fullPath, "utf-8");
        expect(text).not.toContain("\u2014"); // em-dash
        expect(text).not.toContain("\u2013"); // en-dash
      }
    });
  });
});
