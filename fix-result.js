const fs = require('fs');
let file = 'src/components/calculators/GeneratorFuelCalculator.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `          <div className="flex flex-col gap-4">
            <ResultCard
              primaryTitle="Hourly Consumption"
              primaryValue={\`\${results.data.consumptionPerHour.toFixed(2)} \${unitLabel}/hr\`}
              icon="zap"
              stats={[
                { label: "Hourly Cost", value: \`$\${results.data.costPerHour.toFixed(2)}\`, unit: "/hr" }
              ]}
            />
          </div>`;

content = content.replace(/<div className="grid grid-cols-1 md:grid-cols-2 gap-4">[\s\S]*?<\/div>/, replacement);
fs.writeFileSync(file, content);
