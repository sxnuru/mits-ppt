const fs = require('fs');
let content = fs.readFileSync('src/components/deck/slides.tsx', 'utf-8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  // Skip the lines we already manually reverted (Slide 1b and Slide 2)
  if (i >= 70 && i < 310) continue;

  lines[i] = lines[i].replace(/fontSize:\s*"?(\d+)px"?/g, (m, p1) => {
    let size = parseInt(p1, 10);
    // Reverse the 1.45 multiplier
    let orig = Math.round(size / 1.45);
    return `fontSize: "${orig}px"`;
  });
  lines[i] = lines[i].replace(/fontSize="(\d+)"/g, (m, p1) => {
    let size = parseInt(p1, 10);
    let orig = Math.round(size / 1.45);
    return `fontSize="${orig}"`;
  });
}
fs.writeFileSync('src/components/deck/slides.tsx', lines.join('\n'));
console.log('Reverted all other slides back to original font sizes.');
