const fs = require('fs');
let file = 'src/lib/seo/registry.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace("schemaType: 'Article',", "");
fs.writeFileSync(file, content);
