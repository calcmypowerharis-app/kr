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
    "Calculate generator amperage output at 120V and 240V. Includes a complete generator amp chart from 1kW to 26kW, wire gauge recommendations, and 80% continuous load limits.",
  path: "/generator-amperage-chart-calculator",
  ogDescription:
    "Calculate generator output amperage, circuit breaker sizing, and wire gauge across 120V, 240V split-phase, and 3-phase systems.",
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
        "At 240 Volts (the standard transfer switch voltage), a 7,500-Watt generator produces 31.25 rated Amps (7,500 / 240 = 31.25A). Following the National Electrical Code 80% continuous duty recommendation, its safe continuous capacity is 25.0 Amps. At 120 Volts across both legs combined, it can provide up to 62.5 Amps total.",
    },
    {
      question: "What is the difference between generator amps at 120V vs 240V?",
      answer:
        "Current and voltage are inversely proportional for a given wattage. Doubling the voltage cuts the current in half. A 6,000-Watt generator produces 50 Amps at 120 Volts, but only 25 Amps at 240 Volts. Powering a home transfer switch at 240V requires smaller wire gauge and generates far less heat than attempting to route the same power through 120V circuits.",
    },
    {
      question: "What size breaker and wire gauge do I need for a 30-amp generator?",
      answer:
        "A 30-Amp generator hookup requires a two-pole 30-Amp circuit breaker, a NEMA L14-30 inlet box, and minimum 10 AWG copper conductors (such as 10/3 with ground Romex NM-B for indoor wiring or 10 AWG SOOW for flexible outdoor generator extension cords). For cord lengths exceeding 75 to 100 feet, consider 8 AWG copper to prevent voltage drop exceeding 3%.",
    },
    {
      question: "Can I get 50 amps from a 10,000-watt generator?",
      answer:
        "A 10,000-Watt generator produces 41.7 Amps at 240 Volts (10,000 / 240 = 41.67A). While many 10,000W portable generators include a 50-Amp NEMA 14-50R outlet for convenience, the generator cannot supply a full continuous 50 Amps at 240V (which would require 12,000 Watts). Its 80% continuous capacity is approximately 33.3 Amps at 240V.",
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
