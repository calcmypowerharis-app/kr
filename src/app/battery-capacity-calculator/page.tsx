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
  title: "Battery Bank Calculator (Capacity, Voltage & Ah)",
  description:
    "Calculate battery bank capacity, voltage, Amp-hours (Ah), and Watt-hours (Wh) in series, parallel, or series-parallel configurations. Free engineering sizing tool.",
  path: "/battery-capacity-calculator",
  ogDescription:
    "Free battery bank calculator: compute total bank voltage, Amp-hours, nominal energy (Wh/kWh), and usable capacity across series, parallel, and series-parallel banks.",
});

export default function BatteryCapacityPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Battery Bank & Capacity Calculator",
    description:
      "Free online electrical calculator to evaluate battery bank capacity in Amp-hours (Ah) and Watt-hours (Wh), calculate series-parallel configurations, and size battery systems for loads.",
    url: "https://calcmypower.com/battery-capacity-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Battery Bank Calculator",
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
