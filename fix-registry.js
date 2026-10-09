const fs = require('fs');
let file = 'src/lib/seo/registry.ts';
let content = fs.readFileSync(file, 'utf8');

const replacement = `
  {
    slug: 'how-much-gas-does-a-generator-use',
    path: '/how-much-gas-does-a-generator-use',
    title: 'How Much Gas Does a Generator Use Per Hour? Fuel Consumption by Wattage',
    shortTitle: 'Generator Fuel Use Guide',
    metaTitle: 'How Much Gas Does a Generator Use Per Hour? | CalcMyPower',
    metaDescription: 'Find out how much gas or propane a portable generator uses per hour. Examples for 2000W, 5000W, and 8000W generators.',
    cluster: 'generators',
    parentCalculatorPath: '/generator-fuel-consumption-calculator',
    schemaType: 'Article',
    image: '/images/guides/how-much-gas-generator-hero.jpg',
    targetKeywords: ['how much gas does a generator use', 'how much gas does a generator use per hour'],
    secondaryKeywords: ['how much propane does a generator use', 'generator fuel consumption'],
    relatedGuidePaths: [
      '/what-size-generator-do-i-need-for-my-house',
      '/what-size-generator-to-run-a-refrigerator',
      '/how-to-calculate-watts-for-a-generator'
    ],
    scenarioLink: '/generator-fuel-consumption-calculator',
    readingTime: 6,
    datePublished: '2026-10-09'
  },`;

content = content.replace(/{\s*slug:\s*'how-much-gas-does-a-generator-use'[\s\S]*?},/, replacement.trim() + ',');
fs.writeFileSync(file, content);
