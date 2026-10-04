import { Metadata } from "next";
import { GeneratorWattageChart } from "@/components/calculators/GeneratorWattageChart";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Wattage Chart (Running & Starting Watts by Appliance)",
  description:
    "Comprehensive generator wattage chart with typical running and starting surge watts for 35+ appliances, workshop tools, and HVAC equipment. Reference and compare power demands.",
  path: "/generator-wattage-chart",
  ogDescription:
    "Look up typical running and starting surge watts for 35+ home appliances and tools. Compare baseline continuous power and motor inrush requirements.",
});

export default function GeneratorWattageChartPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Generator Wattage Chart & Reference Tool",
    description:
      "Interactive appliance generator wattage chart and power reference tool. Compare running watts, motor startup surges, and typical voltages across 35+ household appliances.",
    url: "https://calcmypower.com/generator-wattage-chart",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Generator Wattage Chart",
      url: "https://calcmypower.com/generator-wattage-chart",
    },
  ]);

  const faqSchema = generateFaqSchema([
    {
      question: "Can I run a refrigerator and a window air conditioner on a 3,500-watt generator?",
      answer:
        "Yes, under proper load management. A standard refrigerator draws 700W running (1,500W surge) and a 5,000 to 8,000 BTU window AC draws 500W to 800W running (1,200W to 1,800W surge). Combined running wattage is roughly 1,200W to 1,500W. Their peak starting surge will be approximately 2,800W, which fits comfortably within a 3,500W running / 4,000W surge generator.",
    },
    {
      question: "Why does my generator trip when a motor starts even though total running watts are below the rating?",
      answer:
        "When an induction motor (like a deep well pump or air compressor) begins spinning from rest, it draws locked-rotor inrush current for 200 to 1,000 milliseconds. If the motor surge demand exceeds the generator peak surge rating, the alternator output voltage drops sharply, causing the generator circuit breaker or inverter protection circuit to trip.",
    },
    {
      question: "What is the difference between surge watts and starting watts on generator spec sheets?",
      answer:
        "In generator specifications, starting watts and surge watts are identical terms. They denote the maximum electrical power the alternator and engine can sustain for a brief period (typically 2 to 6 seconds) to accelerate electric motors before settling back to rated continuous running watts.",
    },
    {
      question: "Why is a 25% safety reserve factor recommended when sizing generators?",
      answer:
        "Running an internal combustion generator at 100% capacity continuously causes extreme engine heat, increased harmonic distortion, rapid oil breakdown, and high fuel consumption. Sizing with a 25% buffer keeps steady operation around 70% to 80% load, which maximizes engine lifespan and prevents stalls during unexpected secondary motor starts.",
    },
    {
      question: "Does an inverter generator provide the same starting surge as an open-frame generator?",
      answer:
        "Conventional open-frame generators have heavy copper rotor windings with mechanical rotational momentum that can absorb momentary inrush overload. Inverter generators convert AC to DC and back to digital AC; their surge capacity is electronically governed. While top inverter models offer excellent transient response, their surge margins are strictly limited to manufacturer specifications to protect solid-state components.",
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

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <GeneratorWattageChart />
      </div>
    </>
  );
}
