const fs = require('fs');

function addLink(file) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('/how-much-gas-does-a-generator-use')) {
    content = content.replace(
      '</article>',
      '<p className="mt-8 text-slate-600">For more information about ongoing fuel costs and calculations, check out our guide on <Link href="/how-much-gas-does-a-generator-use" className="text-indigo-600 hover:underline">How Much Gas Does a Generator Use Per Hour?</Link></p>\n</article>'
    );
    fs.writeFileSync(file, content);
  }
}

addLink('src/app/what-size-generator-do-i-need-for-my-house/page.tsx');
addLink('src/app/what-size-generator-to-run-a-refrigerator/page.tsx');
addLink('src/app/how-to-calculate-watts-for-a-generator/page.tsx');
