const fs = require('fs');
let content = fs.readFileSync('src/components/deck/slides.tsx', 'utf-8');
const regex = /fontSize:\s*"?(\d+)px"?/g;
let count = 0;
content = content.replace(regex, (match, p1) => {
  count++;
  const size = parseInt(p1, 10);
  const newSize = Math.round(size * 1.45);
  return `fontSize: "${newSize}px"`;
});

// Also handle SVG text nodes that might have fontSize as a raw number string
const svgTextRegex = /fontSize="(\d+)"/g;
let countSvg = 0;
content = content.replace(svgTextRegex, (match, p1) => {
  countSvg++;
  const size = parseInt(p1, 10);
  const newSize = Math.round(size * 1.45);
  return `fontSize="${newSize}"`;
});

fs.writeFileSync('src/components/deck/slides.tsx', content);
console.log(`Replaced ${count} inline font sizes and ${countSvg} SVG font sizes.`);
