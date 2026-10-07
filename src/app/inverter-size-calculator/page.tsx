import { Metadata } from "next";
import { InverterSizeCalculator } from "@/components/calculators/InverterSizeCalculator";
import { INVERTER_FAQS } from "@/lib/calculators/inverter-size";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Inverter Size Calculator (Watts, Surge, Cable & Fuse Sizing)",
  description:
    "Calculate the inverter size you need in running and surge watts. Includes DC battery current draw, cable gauge (AWG), and fuse sizing across 12V, 24V, and 48V systems.",
  path: "/inverter-size-calculator",
  ogDescription:
    "Calculate the inverter size you need in running and surge watts. Includes DC battery current draw, cable gauge (AWG), and fuse sizing across 12V, 24V, and 48V systems.",
  keywords: [
    "inverter size calculator",
    "what size inverter do i need",
    "inverter wattage calculator",
    "calculate inverter size for home",
    "inverter battery cable size calculator",
    "12v inverter current draw calculator",
  ],
});

export default function InverterSizeCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Inverter Size Calculator",
    description:
      "Calculate the inverter size you need in running and surge watts. Includes DC battery current draw, cable gauge (AWG), and fuse sizing across 12V, 24V, and 48V systems.",
    url: "https://calcmypower.com/inverter-size-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Inverter Size Calculator",
      url: "https://calcmypower.com/inverter-size-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(INVERTER_FAQS);

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

      <InverterSizeCalculator />
    </>
  );
}
