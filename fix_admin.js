const fs = require('fs');

let content = fs.readFileSync('app/admin/page.tsx', 'utf8');

// Find the lucide-react import line and add Check if missing
const importRegex = /from "lucide-react";/;
const importLine = content.match(/import \{[^}]+\} from "lucide-react";/)?.[0];

if (importLine && !importLine.includes('Check')) {
    // Add Check to the import
    const newImport = importLine.replace('}', ', Check}');
    content = content.replace(importLine, newImport);
    fs.writeFileSync('app/admin/page.tsx', content);
    console.log('[✓] Added Check import to app/admin/page.tsx');
} else if (!importLine) {
    console.log('[!] Could not find lucide-react import line');
} else {
    console.log('[✓] Check already imported');
}
