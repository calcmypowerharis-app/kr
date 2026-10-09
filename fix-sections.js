const fs = require('fs');
let file = 'src/components/calculators/GeneratorFuelCalculator.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacementAssumptions = `<AssumptionsSection
          description="Real-world fuel consumption differs slightly from preset estimates. Here are the core assumptions used in this calculator:"
          assumptions={[
            {
              parameter: "Pricing Model",
              defaultVal: "Linear",
              realisticRange: "Linear (varies by volume discounts)",
              impact: "Assumes price per unit remains constant regardless of the total amount purchased."
            },
            {
              parameter: "Load Variation",
              defaultVal: "Steady-State",
              realisticRange: "Highly variable",
              impact: "Presets assume exactly 50% or 100% load continuously. Real-world consumption cycles with appliance usage."
            },
            {
              parameter: "Environmental Factors",
              defaultVal: "Standard rating",
              realisticRange: "Standard +/- 10%",
              impact: "Temperature, altitude, and generator maintenance status slightly alter physical fuel efficiency."
            }
          ]}
        />`;

content = content.replace(/<AssumptionsSection[\s\S]*?\/>/, replacementAssumptions);

const replacementRelated = `<RelatedCalculators
          calculators={[
            {
              title: "Generator Size Calculator",
              href: "/generator-size-calculator",
              description: "Calculate exactly what size generator you need to run your appliances.",
              category: "Generators"
            },
            {
              title: "Electricity Cost Calculator",
              href: "/electricity-cost-calculator",
              description: "Compare your generator running costs to standard grid electricity.",
              category: "Cost & Usage"
            }
          ]}
        />`;

content = content.replace(/<RelatedCalculators[\s\S]*?\/>/, replacementRelated);

fs.writeFileSync(file, content);
