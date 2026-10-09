const fs = require('fs');
let file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/import \{([^}]+)\} from "lucide-react";/, (match, p1) => {
  if (!p1.includes('Flame')) {
    return `import {${p1}, Flame} from "lucide-react";`;
  }
  return match;
});
fs.writeFileSync(file, content);
