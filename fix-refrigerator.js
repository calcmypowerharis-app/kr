const fs = require('fs');
let file = 'src/app/what-size-generator-to-run-a-refrigerator/page.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  '<section id="generator-fuel-calculator" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24 mb-4">Calculate Your Generator Operating Costs</h2><p className="text-slate-600 mb-8">After determining your size requirements, you can calculate your ongoing operating costs using our <Link href="/generator-fuel-consumption-calculator" className="text-indigo-600 hover:underline">Generator Fuel Consumption Calculator</Link>.</p><h2 id="faq" className="space-y-4 scroll-mt-24 border-t border-slate-200 pt-8">',
  '<section id="generator-fuel-calculator" className="mb-12 border-t border-slate-200 pt-8"><h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24 mb-4">Calculate Your Generator Operating Costs</h2><p className="text-slate-600 mb-8">After determining your size requirements, you can calculate your ongoing operating costs using our <Link href="/generator-fuel-consumption-calculator" className="text-indigo-600 hover:underline">Generator Fuel Consumption Calculator</Link>.</p></section><section id="faq" className="space-y-4 scroll-mt-24 border-t border-slate-200 pt-8">'
);
fs.writeFileSync(file, content);
