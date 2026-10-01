import { Metadata } from "next";
import { SolarChargeControllerCalculator } from "@/components/calculators/SolarChargeControllerCalculator";
import { SOLAR_CHARGE_CONTROLLER_FAQS } from "@/lib/calculators/solar-charge-controller";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Charge Controller Calculator (MPPT & PWM Sizing)",
  description:
    "Calculate the charge controller size needed for your solar panels. Sizing calculator for MPPT and PWM controllers based on array wattage, battery voltage, and Voc.",
  path: "/solar-charge-controller-calculator",
  ogDescription:
    "Calculate the charge controller size needed for your solar panels. Sizing calculator for MPPT and PWM controllers based on array wattage, battery voltage, and Voc.",
});

export default function SolarChargeControllerPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar Charge Controller Calculator",
    description:
      "Calculate the charge controller size needed for your solar panels. Sizing calculator for MPPT and PWM controllers based on array wattage, battery voltage, and Voc.",
    url: "https://calcmypower.com/solar-charge-controller-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Solar Charge Controller Calculator",
      url: "https://calcmypower.com/solar-charge-controller-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(SOLAR_CHARGE_CONTROLLER_FAQS);

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

      <SolarChargeControllerCalculator />
    </>
  );
}
