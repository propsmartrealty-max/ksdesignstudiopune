import fs from 'fs';
import path from 'path';

// Mirroring the logic from copyEngine and seo_registry to generate headers
function generateSeed(str) {
  let h = 0xdeadbeef;
  for(let i = 0; i < str.length; i++)
      h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
  return (h ^ h >>> 16) >>> 0;
}
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function generateDynamicMeta(seedString, subject, location = "Pune") {
   const seed = generateSeed(seedString + "_meta");
   const random = mulberry32(seed);
   const desc = [
     `Ranked #1 for A-grade ${subject} in ${location}. View our premium portfolio and request a consultation with Pune's top interior designers today.`,
     `Looking for the best ${subject} in ${location}? KS Design Studio delivers uncompromising luxury and A-grade turnkey execution.`,
     `Top-rated ${subject} tailored for elite patrons in ${location}. Discover our A-grade design philosophy.`,
     `Bespoke ${subject} solutions featuring premium materials and flawless A-grade delivery across ${location}, Pune.`
   ];
   return desc[Math.floor(random() * desc.length)];
}

const publicDir = path.join(process.cwd(), 'dist');
const routesPath = path.join(publicDir, 'routes.json');
const indexPath = path.join(publicDir, 'index.html');

if (!fs.existsSync(routesPath) || !fs.existsSync(indexPath)) {
  console.log('Missing routes.json or index.html. Run build first.');
  process.exit(1);
}

const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
const baseHtml = fs.readFileSync(indexPath, 'utf8');

function formatTitle(route) {
  const parts = route.split('/').filter(Boolean);
  if (parts.length === 0) return 'KS Design Studio | #1 A-Grade Luxury Interior Designer in Pune';
  
  if ((parts[0] === 'interiors-in' || parts[0] === 'cost-guide') && parts[1]) {
    const loc = parts[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `Interior Designers in ${loc} | KS Design Studio`;
  }
  if (parts[0] === 'services' && parts[1]) {
    const srv = parts[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `${srv} | KS Design Studio Pune`;
  }
  if (parts[0] === 'service' && parts[1] && parts[2]) {
    const loc = parts[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const srv = parts[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `${srv} in ${loc} | KS Design Studio`;
  }
  return parts.join(' ').replace(/-/g, ' ') + ' | KS Design Studio';
}

routes.forEach(route => {
  if (route === '' || route === '/') return;

  const targetDir = path.join(publicDir, route);
  fs.mkdirSync(targetDir, { recursive: true });

  const title = formatTitle(route);
  const desc = generateDynamicMeta(route, "Interior Design", "Pune");
  
  let newHtml = baseHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );
  
  newHtml = newHtml.replace(
    /<meta name="description" content=".*?"\s*\/>/,
    `<meta name="description" content="${desc}" />`
  );

  // Inject Canonical Tag
  const canonicalTag = `<link rel="canonical" href="https://ksdesignstudio.in${route}" />`;
  newHtml = newHtml.replace('</title>', `</title>\n  ${canonicalTag}`);

  fs.writeFileSync(path.join(targetDir, 'index.html'), newHtml, 'utf8');
});

console.log(`✅ Injected SEO Metadata into ${routes.length} physical routes for Cloudflare.`);
