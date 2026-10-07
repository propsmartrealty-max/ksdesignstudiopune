const spintax = require("./spin-tax.js");

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
  if (parts.length === 0) return { title: 'Top Luxury Interior Designers in Pune | KS Design Studio', subject: 'Interior Design', loc: 'Pune' };
  
  if ((parts[0] === 'interiors-in' || parts[0] === 'cost-guide') && parts[1]) {
    const loc = parts[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { title: `Interior Designers in ${loc} | KS Design Studio`, subject: 'Interior Design', loc };
  }
  if (parts[0] === 'services' && parts[1]) {
    const srv = parts[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { title: `${srv} | KS Design Studio Pune`, subject: srv, loc: 'Pune' };
  }
  if (parts[0] === 'service' && parts[1] && parts[2]) {
    const loc = parts[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const srv = parts[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { title: `${srv} in ${loc} | KS Design Studio`, subject: srv, loc };
  }
  return { title: parts.join(' ').replace(/-/g, ' ') + ' | KS Design Studio', subject: 'Interior Design', loc: 'Pune' };
}

routes.forEach(route => {
  if (route === '' || route === '/') return;

  const targetDir = path.join(publicDir, route);
  fs.mkdirSync(targetDir, { recursive: true });

  const { title, subject, loc } = formatTitle(route);
  const desc = generateDynamicMeta(route, subject, loc);
  const fullUrl = `https://ksdesignstudio.in${route}`;
  
  // 1. Core Meta
  let newHtml = baseHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );
  
  newHtml = newHtml.replace(
    /<meta name="description" content=".*?"\s*\/>/,
    `<meta name="description" content="${desc}" />`
  );

  // 2. OpenGraph Meta
  newHtml = newHtml.replace(
    /<meta property="og:title" content=".*?"\s*\/>/,
    `<meta property="og:title" content="${title}" />`
  );
  newHtml = newHtml.replace(
    /<meta property="og:description" content=".*?"\s*\/>/,
    `<meta property="og:description" content="${desc}" />`
  );
  if (!newHtml.includes('<meta property="og:url"')) {
    newHtml = newHtml.replace('</head>', `  <meta property="og:url" content="${fullUrl}" />\n</head>`);
  }

  // 3. Breadcrumb Schema Injection
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ksdesignstudio.in" },
      { "@type": "ListItem", "position": 2, "name": loc, "item": `https://ksdesignstudio.in/interiors-in/${loc.toLowerCase().replace(/ /g, '-')}` },
      { "@type": "ListItem", "position": 3, "name": subject, "item": fullUrl }
    ]
  };
  newHtml = newHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(breadcrumbSchema)}\n</script>\n</head>`);

  // 4. Canonical Tag
  const canonicalTag = `<link rel="canonical" href="${fullUrl}" />`;
  newHtml = newHtml.replace('</title>', `</title>\n  ${canonicalTag}`);
  
  // 5. Structural H1 Cloaking for Googlebot (Visible to screen readers/crawlers, visually hidden)
  const structuralH1 = `<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">${title}</h1>`;
  newHtml = newHtml.replace('<body>', `<body>\n  ${structuralH1}`);

  fs.writeFileSync(path.join(targetDir, 'index.html'), newHtml, 'utf8');
});

console.log(`✅ Injected SEO Metadata, OpenGraph, Breadcrumbs, and Structural H1s into ${routes.length} physical routes.`);
