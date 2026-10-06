import fs from 'fs';
import path from 'path';

const indexPath = path.join(process.cwd(), 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const ga4Code = `
  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
`;

if (!html.includes('gtag(')) {
  html = html.replace('</head>', `${ga4Code}\n</head>`);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('✅ Injected Google Analytics 4 tracking code into index.html');
} else {
  console.log('⚡ GA4 tracking code already present.');
}
