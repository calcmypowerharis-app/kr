const fs = require('fs');
let file = 'src/lib/seo/registry.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("readingTime: 6,", "readingTime: '6 minutes',");
content = content.replace("},,", "},");

fs.writeFileSync(file, content);
