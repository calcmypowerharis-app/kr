const fs = require('fs');
let file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');
if (!content.includes('/how-much-gas-does-a-generator-use')) {
  content = content.replace(
    /<span>Read Refrigerator Sizing Guide<\/span>\s*<ArrowRight className="w-3\.5 h-3\.5" \/>\s*<\/Link>/,
    `<span>Read Refrigerator Sizing Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link
                    href="/how-much-gas-does-a-generator-use"
                    className="text-xs font-semibold text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>How Much Gas Does a Generator Use?</span>
                  </Link>
                </div>`
  );
  fs.writeFileSync(file, content);
}
