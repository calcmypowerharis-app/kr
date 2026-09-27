export interface TocItem {
  id: string;
  label: string;
}

export const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Direct Answer & Sizing Brackets" },
  { id: "how-generator-size-is-determined", label: "How Generator Size Is Determined" },
  { id: "running-vs-starting-watts", label: "Running Watts vs. Starting Watts" },
  { id: "how-to-calculate-generator-size", label: "How to Calculate Generator Size" },
  { id: "worked-example", label: "Worked Example: Essential Loads" },
  { id: "square-footage", label: "Sizing by Square Footage" },
  { id: "common-appliances", label: "Sizing for Common Appliances" },
  { id: "portable-vs-standby", label: "Portable vs. Standby Systems" },
  { id: "sizing-mistakes", label: "Common Sizing Mistakes" },
  { id: "calculator", label: "Interactive Sizing Calculator" },
  { id: "safety", label: "Carbon Monoxide & Safety" },
  { id: "faq", label: "Frequently Asked Questions" },
];
