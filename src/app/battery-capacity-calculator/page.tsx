import { Metadata } from "next";
import { BatteryCapacityCalculator } from "@/components/calculators/BatteryCapacityCalculator";
import { BATTERY_CAPACITY_FAQS } from "@/lib/calculators/battery-capacity";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Capacity Calculator (Ah to Wh & Sizing)",
  description:
    "Calculate battery capacity in Watt-hours (Wh) and Amp-hours (Ah). Estimate usable energy and size battery capacity for a load and runtime.",
  path: "/battery-capacity-calculator",
  ogDescription:
    "Free online calculator to evaluate battery capacity in Watt-hours (Wh) and Amp-hours (Ah), calculate usable energy by chemistry, and size battery banks for loads.",
});

export default function BatteryCapacityPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Battery Capacity & Sizing Calculator",
    description:
      "Free online electrical calculator to evaluate battery capacity in Watt-hours (Wh) and Amp-hours (Ah), calculate usable energy across chemistries, and size battery banks for specific electrical loads and runtime hours.",
    url: "https://calcmypower.com/battery-capacity-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Battery Capacity Calculator",
      url: "https://calcmypower.com/battery-capacity-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(BATTERY_CAPACITY_FAQS);

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

      <BatteryCapacityCalculator />
    </>
  );
}
