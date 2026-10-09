const fs = require('fs');
let code = fs.readFileSync('src/components/calculators/GeneratorSizeCalculator.tsx', 'utf8');

const replacement = `<RelatedCalculators
          calculators={[
            {
              title: "Generator Fuel Consumption Calculator",
              description: "Calculate how much gas, propane, or diesel your generator will consume per hour and per day.",
              href: "/generator-fuel-consumption-calculator",
              category: "Fuel & Runtime",
            },
            {
              title: "Generator Wattage Chart & Appliance Reference",`;

code = code.replace(
  '<RelatedCalculators\n          calculators={[\n            {\n              title: "Generator Wattage Chart & Appliance Reference",',
  replacement
);

fs.writeFileSync('src/components/calculators/GeneratorSizeCalculator.tsx', code);
