import fs from 'fs';
import path from 'path';

const capsBodyPath = path.join(process.cwd(), 'app/caps-body.html');
const capsContent = fs.readFileSync(capsBodyPath, 'utf8');
const lines = capsContent.split('\n');

// Header: lines 1 to 2608 (1-indexed, so 0 to 2608 in slice)
const headerHtml = lines.slice(0, 2608).join('\n');
// Home Body: lines 2609 to 4388 (1-indexed, so 2608 to 4388 in slice)
const homeBodyHtml = lines.slice(2608, 4388).join('\n');
// Footer: lines 4389 to the end (1-indexed, so 4388 to end in slice)
const footerHtml = lines.slice(4388).join('\n');

fs.writeFileSync(path.join(process.cwd(), 'app/header.html'), headerHtml);
fs.writeFileSync(path.join(process.cwd(), 'app/home-body.html'), homeBodyHtml);
fs.writeFileSync(path.join(process.cwd(), 'app/footer.html'), footerHtml);

// Extract Leadership body content
const leadBodyPath = path.join(process.cwd(), 'app/leadership-body.html');
const leadContent = fs.readFileSync(leadBodyPath, 'utf8');
const leadLines = leadContent.split('\n');

// Leadership Body Content: lines 2534 to 4373 (1-indexed, so 2533 to 4373 in slice)
const leadBodyHtml = leadLines.slice(2533, 4373).join('\n');

// Ensure directory exists
fs.mkdirSync(path.join(process.cwd(), 'app/about/leadership-governance'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'app/about/leadership-governance/body.html'), leadBodyHtml);

console.log('Layout components successfully extracted!');
console.log(`header.html: ${headerHtml.split('\n').length} lines`);
console.log(`home-body.html: ${homeBodyHtml.split('\n').length} lines`);
console.log(`footer.html: ${footerHtml.split('\n').length} lines`);
console.log(`leadership body.html: ${leadBodyHtml.split('\n').length} lines`);
