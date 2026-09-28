import { Metadata } from "next";
import { GeneratorSizeCalculator } from "@/components/calculators/GeneratorSizeCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Size Calculator (Home Backup, RV & Portable)",
  description:
    "Calculate what size generator you need for home emergency backup, RV camping, or jobsite tools based on running watts, motor startup surges, and planning headroom.",
  path: "/generator-size-calculator",
  ogDescription:
    "Calculate generator wattage requirements for home outages, RV air conditioning, or jobsite tools with motor surge handling and 25% planning headroom.",
});

export default function GeneratorSizePage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Generator Size Calculator",
    description:
      "Free online electrical calculator to compute generator capacity based on continuous appliance running watts, single largest motor starting surge, and planning headroom.",
    url: "https://calcmypower.com/generator-size-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Generator Size Calculator",
      url: "https://calcmypower.com/generator-size-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema([
    {
      question: "What size generator do I need to run a refrigerator and a freezer?",
      answer:
        "A modern Energy Star refrigerator runs on approximately 180 Watts but requires 1,200 Watts during compressor startup. A separate freezer requires about 180 to 400 Watts running and 1,200 to 1,600 Watts starting. Total continuous running load is about 360 to 580 Watts, with the largest single startup surge contributing roughly 1,200 Watts above running draw, yielding a peak demand of about 1,560 Watts. Under the CalcMyPower planning model with a 25% headroom factor, a 2,000 to 2,500 Watt inverter generator provides reliable operation.",
    },
    {
      question: "Can a 5,000-Watt generator run a whole house?",
      answer:
        "A 5,000W generator can easily power essential household circuits (refrigerator, sump pump, gas furnace blower, lights, Wi-Fi, television, and microwave) with planning capacity to spare. However, it cannot run large 240V central air conditioning compressors (3 to 5 tons) or electric water heaters simultaneously, which require large standby generators (14kW to 22kW).",
    },
    {
      question: "What is the difference between starting watts and running watts?",
      answer:
        "Running watts (rated watts) is the continuous power an appliance consumes while operating normally. Starting watts (surge watts) is the temporary extra power (up to 3 times running watts) needed for 1 to 3 seconds by motor-driven equipment (refrigerators, pumps, air conditioners) to overcome mechanical inertia during startup.",
    },
    {
      question: "How do I connect a generator to my house safely without backfeeding?",
      answer:
        "Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation. Never attempt to 'backfeed' a generator through an ordinary wall outlet or dryer plug, which creates deadly electrocution hazards for utility lineworkers and can cause an electrical fire when utility power returns.",
    },
    {
      question: "What size generator is needed for a 30-amp RV?",
      answer:
        "A 30-amp RV service operates at 120 Volts, representing a maximum electrical capacity of 3,600 Watts (30A × 120V). Sizing a generator with 3,500W to 4,500W starting surge and at least 3,000W continuous capacity allows you to start and run a 13,500 or 15,000 BTU rooftop air conditioner while running the internal RV converter charger and residential electronics.",
    },
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

      <GeneratorSizeCalculator />
    </>
  );
}
