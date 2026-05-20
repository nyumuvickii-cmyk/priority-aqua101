const fs = require('fs');

let content = fs.readFileSync('app/admin/page.tsx', 'utf8');

// Find any line that imports from lucide-react
const lines = content.split('\n');
let modified = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match any import from lucide-react that doesn't already include Check
    if (line.includes('from "lucide-react"') || line.includes("from 'lucide-react'")) {
        if (!line.includes('Check')) {
            // Add Check before the closing }
            lines[i] = line.replace('}', ', Check}');
            modified = true;
            console.log('[✓] Added Check to import on line ' + (i + 1));
            console.log('    New import: ' + lines[i]);
        } else {
            console.log('[✓] Check already imported');
        }
        break;
    }
}

if (modified) {
    fs.writeFileSync('app/admin/page.tsx', lines.join('\n'));
    console.log('[✓] File updated successfully');
} else if (!modified) {
    console.log('[!] Could not find lucide-react import');
}
