import { Metadata } from "next";
import { SolarBatteryCalculator } from "@/components/calculators/SolarBatteryCalculator";
import { SOLAR_BATTERY_FAQS } from "@/lib/calculators/solar-battery";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Battery Calculator (Size Battery Bank for Solar PV)",
  description:
    "Calculate the battery bank capacity needed for your off-grid or backup solar system. Size storage in kWh and Amp-hours based on daily usage and autonomy.",
  path: "/solar-battery-calculator",
  ogDescription:
    "Calculate the battery bank capacity needed for your off-grid or backup solar system. Size storage in kWh and Amp-hours based on daily usage and autonomy.",
});

export default function SolarBatteryPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar Battery Calculator",
    description:
      "Calculate the battery bank capacity needed for your off-grid or backup solar system. Size storage in kWh and Amp-hours based on daily usage and autonomy.",
    url: "https://calcmypower.com/solar-battery-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Solar Battery Calculator",
      url: "https://calcmypower.com/solar-battery-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(SOLAR_BATTERY_FAQS);

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

      <SolarBatteryCalculator />
    </>
  );
}
