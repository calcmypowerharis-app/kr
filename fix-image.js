const fs = require('fs');
let file = 'src/app/how-much-gas-does-a-generator-use/page.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  'image: "https://calcmypower.com/images/articles/generator-fuel-consumption.jpg",',
  'images: ["https://calcmypower.com/images/articles/generator-fuel-consumption.jpg"],'
);
fs.writeFileSync(file, content);
