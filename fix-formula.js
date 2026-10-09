const fs = require('fs');
let file = 'src/components/calculators/GeneratorFuelCalculator.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `<FormulaSection
          title="How Fuel Consumption is Calculated"
          description="Generator fuel consumption is almost entirely dictated by the engine size and the electrical load placed on the generator. An inverter generator running at 25% load will consume significantly less fuel per hour than the same generator running at 100% capacity."
          formulaDisplay="Hourly Cost = Consumption Rate * Price per Unit"
          variables={[
            {
              name: "Consumption Rate",
              symbol: "R",
              unit: "gal/hr",
              description: "The volume of fuel the generator consumes in one hour at the specific load.",
            },
            {
              name: "Price per Unit",
              symbol: "P",
              unit: "$",
              description: "The local cost of the fuel per gallon or pound.",
            }
          ]}
          notes={[
            "Runtime (Hours) = Tank Capacity / Consumption Rate"
          ]}
        />`;

content = content.replace(/<FormulaSection[\s\S]*?<\/FormulaSection>/, replacement);
fs.writeFileSync(file, content);
