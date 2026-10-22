import { Metadata } from "next";
import { BatteryCapacityCalculator } from "@/components/calculators/BatteryCapacityCalculator";
import { BatteryBankWiringGuideSection } from "@/components/content/BatteryBankWiringGuideSection";
import { BATTERY_CAPACITY_FAQS } from "@/lib/calculators/battery-capacity";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Capacity Calculator - Ah & Wh Chart",
  description:
    "Calculate battery capacity in Amp-hours (Ah) and Watt-hours (Wh) for 12V, 24V, and 48V banks. Includes series-parallel wiring diagrams and DoD sizing tables.",
  path: "/battery-capacity-calculator",
  ogDescription:
    "Calculate battery capacity in Amp-hours (Ah) and Watt-hours (Wh) for 12V, 24V, and 48V banks. Includes series-parallel wiring diagrams and DoD sizing tables.",
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <BatteryBankWiringGuideSection />
      </div>
    </>
  );
}
