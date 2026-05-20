const fs = require('fs');

// ========== FIX 1: app/addresses/page.tsx ==========
let content = fs.readFileSync('app/addresses/page.tsx', 'utf8');

const oldPattern1 = `      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData as Address,`;

const newPattern1 = `      const newAddress: Address = {
        ...formData as Address,
        id: Date.now().toString(),`;

content = content.replace(oldPattern1, newPattern1);
fs.writeFileSync('app/addresses/page.tsx', content);
console.log('[1] Fixed app/addresses/page.tsx');

// ========== FIX 2: app/referrals/page.tsx ==========
let content2 = fs.readFileSync('app/referrals/page.tsx', 'utf8');

// Remove WhatsApp from import
content2 = content2.replace(', WhatsApp', '');

// Replace WhatsApp icon with MessageCircle
content2 = content2.replace('<WhatsApp', '<MessageCircle');

fs.writeFileSync('app/referrals/page.tsx', content2);
console.log('[2] Fixed app/referrals/page.tsx');

// ========== FIX 3: next.config.js ==========
let content3 = fs.readFileSync('next.config.js', 'utf8');

const oldConfig = `  experimental: {
    appDir: true,
  },
`;

content3 = content3.replace(oldConfig, '');
fs.writeFileSync('next.config.js', content3);
console.log('[3] Fixed next.config.js');

console.log('\nAll fixes applied! Now run: git add . && git commit -m "fix build errors" && git push');
