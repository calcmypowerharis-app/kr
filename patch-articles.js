const fs = require('fs');

function addLink(file) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('/generator-fuel-consumption-calculator')) {
    content = content.replace(
      'id="faq"',
      'id="generator-fuel-calculator" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24 mb-4">Calculate Your Generator Operating Costs</h2><p className="text-slate-600 mb-8">After determining your size requirements, you can calculate your ongoing operating costs using our <Link href="/generator-fuel-consumption-calculator" className="text-indigo-600 hover:underline">Generator Fuel Consumption Calculator</Link>.</p><h2 id="faq"'
    );
    fs.writeFileSync(file, content);
  }
}

addLink('src/app/what-size-generator-do-i-need-for-my-house/page.tsx');
addLink('src/app/what-size-generator-to-run-a-refrigerator/page.tsx');
addLink('src/app/how-to-calculate-watts-for-a-generator/page.tsx');
