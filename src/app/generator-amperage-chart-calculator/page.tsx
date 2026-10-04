import { Metadata } from "next";
import { GeneratorAmperageCalculator } from "@/components/calculators/GeneratorAmperageCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Amperage Chart & Calculator (120V & 240V Amps)",
  description:
    "Calculate generator amperage output at 120V and 240V. Includes a complete generator amp chart from 1kW to 26kW, single and split-phase conversions, and 80% continuous operating limits.",
  path: "/generator-amperage-chart-calculator",
  ogDescription:
    "Calculate generator output amperage across 120V, 240V split-phase, and 3-phase systems with continuous safe operating thresholds and full amperage chart.",
});

export default function GeneratorAmperagePage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Generator Amperage Chart & Electrical Calculator",
    description:
      "Online generator amperage calculator and reference chart for portable and standby generators across 120V, 240V split-phase, and balanced three-phase electrical systems.",
    url: "https://calcmypower.com/generator-amperage-chart-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Generator Amperage Chart & Calculator",
      url: "https://calcmypower.com/generator-amperage-chart-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema([
    {
      question: "How many amps does a 7,500-watt generator produce?",
      answer:
        "At 240 Volts (the standard transfer switch voltage), a 7,500-Watt generator produces 31.25 rated Amps (7,500 / 240 = 31.25A). Following the recommended 80% continuous duty guideline, its safe continuous operating capacity is 25.0 Amps. At 120 Volts across both legs combined, it can provide up to 62.5 Amps total.",
    },
    {
      question: "What is the difference between generator amps at 120V vs 240V?",
      answer:
        "Current and voltage are inversely proportional for a given wattage. Doubling the voltage cuts the current in half. A 6,000-Watt generator produces 50 Amps at 120 Volts, but only 25 Amps at 240 Volts. Powering a home transfer switch at 240V requires smaller wire gauge and generates far less heat than attempting to route the same power through 120V circuits.",
    },
    {
      question: "How many watts can a 30-amp generator circuit deliver?",
      answer:
        "At 120 Volts, a 30-Amp circuit delivers up to 3,600 Watts maximum (2,880 Watts continuous at the 80% operating limit). At 240 Volts (such as through a standard 4-prong generator connection), a 30-Amp circuit can deliver up to 7,200 Watts maximum (5,760 Watts continuous). Always verify your specific generator nameplate specifications and consult a licensed electrician for circuit wiring and breaker protection.",
    },
    {
      question: "Can I get 50 amps from a 10,000-watt generator?",
      answer:
        "A 10,000-Watt generator produces 41.7 Amps at 240 Volts (10,000 / 240 = 41.67A). While many 10,000W portable generators include a 50-Amp outlet for convenience, the generator cannot supply a full continuous 50 Amps at 240V (which would require 12,000 Watts). Its 80% continuous capacity is approximately 33.3 Amps at 240V.",
    },
    {
      question: "What causes a generator breaker to trip when total watts are low?",
      answer:
        "The most common cause is split-phase leg imbalance. On a 120/240V generator, half the total capacity is assigned to Line 1 and half to Line 2. On an 8,000W generator, each leg can supply approximately 33.3 Amps at 120V (4,000W). If you connect a microwave (1,500W), space heater (1,500W), and toaster (1,200W) all to circuits on Line 1, you draw 4,200W (35A) on that single leg, tripping its breaker even though the generator is only at 52% of its total 8,000W rating.",
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

      <GeneratorAmperageCalculator />
    </>
  );
}
