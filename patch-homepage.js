const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const newTool = `    cta: "Open Electricity Use Calculator",
  },
  {
    id: "generator-fuel-tool",
    title: "Generator Fuel Consumption Calculator",
    href: "/generator-fuel-consumption-calculator",
    icon: Flame,
    formula: "Gallons/hr = Max Fuel / Hours",
    summary:
      "Estimate how much gasoline, propane, or diesel your generator will consume based on its running wattage and fuel tank size.",
    outputs: [
      "Hourly fuel consumption rate",
      "Cost per 24 hours of operation",
      "Total fuel tank runtime",
      "Gasoline, Propane, and Diesel presets",
    ],
    cta: "Open Fuel Consumption Calculator",
  },
];`;

code = code.replace(
  '    cta: "Open Electricity Use Calculator",\n  },\n];',
  newTool
);

code = code.replace(
  'import { Plug, BatteryCharging, Zap, PanelTop, Battery, SunMedium, Monitor, Banknote, ShieldAlert, ArrowRight, BookOpen, LineChart, FileText, Smartphone } from "lucide-react";',
  'import { Plug, BatteryCharging, Zap, PanelTop, Battery, SunMedium, Monitor, Banknote, ShieldAlert, ArrowRight, BookOpen, LineChart, FileText, Smartphone, Flame } from "lucide-react";'
);

fs.writeFileSync('src/app/page.tsx', code);
