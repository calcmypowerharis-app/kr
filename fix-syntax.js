const fs = require('fs');
let file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(', Flame} from "lucide-react";', 'Flame} from "lucide-react";');
fs.writeFileSync(file, content);
