import { Metadata } from "next";
import { GeneratorFuelCalculator } from "@/components/calculators/GeneratorFuelCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Fuel Consumption Calculator",
  description:
    "Estimate your portable or standby generator's fuel usage per hour. Calculate total fuel needed for 24-hour runtimes and operating cost for gas, propane, and diesel.",
  path: "/generator-fuel-consumption-calculator",
  ogDescription:
    "Calculate portable and standby generator fuel consumption per hour, total runtime, and operating cost based on common manufacturer specs.",
});

export default function GeneratorFuelCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Generator Fuel Consumption Calculator",
    description:
      "Free online calculator to estimate generator fuel usage, tank runtime, and daily operating cost for gasoline, propane, and natural gas generators.",
    url: "https://calcmypower.com/generator-fuel-consumption-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Generator Fuel Consumption",
      url: "https://calcmypower.com/generator-fuel-consumption-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema([
    {
      question: "How much gas does a 5000 watt generator use?",
      answer:
        "A typical 5000W generator running at 50% load consumes about 0.5 to 0.75 gallons of gasoline per hour. Over a 24-hour period, it will use roughly 12 to 18 gallons, depending on the exact load and generator model efficiency.",
    },
    {
      question: "Does a generator use more fuel if I plug more things into it?",
      answer:
        "Yes. Generator fuel consumption is directly tied to the electrical load. An inverter generator will automatically idle down and use significantly less fuel when running a light load (like a TV and lights) compared to running a heavy load (like an air conditioner or space heater).",
    },
    {
      question: "Is propane or gasoline cheaper to run in a dual-fuel generator?",
      answer:
        "Propane is generally less energy-dense than gasoline, so a generator will consume more gallons (or pounds) of propane per hour to produce the same wattage. However, propane rarely goes bad and won't gum up the carburetor during storage. To determine which is cheaper to run, you must compare local propane prices per pound against local gasoline prices per gallon.",
    }
  ]);

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

      <GeneratorFuelCalculator />
    </>
  );
}
