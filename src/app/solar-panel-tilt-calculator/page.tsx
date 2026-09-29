import { Metadata } from "next";
import { SolarPanelTiltCalculator } from "@/components/calculators/SolarPanelTiltCalculator";
import { SOLAR_PANEL_TILT_FAQS } from "@/lib/calculators/solar-panel-tilt";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Panel Tilt Angle Calculator (Optimal Angle & Roof Pitch)",
  description:
    "Calculate the optimal solar panel tilt angle and compass orientation for your latitude. Compare roof pitch angles, seasonal adjustments, and mounting options.",
  path: "/solar-panel-tilt-calculator",
  ogDescription:
    "Free online calculator to calculate optimal solar panel tilt angles by latitude, convert roof pitch to degrees, evaluate seasonal tilt adjustments, and determine compass orientation.",
});

export default function SolarPanelTiltPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar Panel Tilt Angle Calculator",
    description:
      "Free online solar energy calculator to determine optimal solar panel tilt angles, convert roof pitch to degrees, evaluate seasonal adjustments, and align compass orientation.",
    url: "https://calcmypower.com/solar-panel-tilt-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Solar Panel Tilt Angle Calculator",
      url: "https://calcmypower.com/solar-panel-tilt-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(SOLAR_PANEL_TILT_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SolarPanelTiltCalculator />
    </>
  );
}
