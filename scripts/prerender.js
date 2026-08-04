import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
const routesPath = path.resolve(__dirname, '../public/routes.json');

const PORT = 3005;

async function prerender() {
  console.log('🚀 Starting SSG Prerendering Engine...');
  
  if (!fs.existsSync(routesPath)) {
    console.error('❌ routes.json not found. Run generate-sitemap.js first.');
    process.exit(1);
  }

  let routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));

  // HYBRID CORE STRATEGY: 
  // We have 10,000+ routes in the sitemap for SPA indexing. 
  // We only physically prerender the top 1000 highest priority routes 
  // to prevent Vercel/Netlify CI/CD build timeouts (45m max).
  const PRERENDER_LIMIT = 1000;
  if (routes.length > PRERENDER_LIMIT) {
    console.log(`⚠️ Massive Silo Detected: Limiting physical SSG from ${routes.length} to top ${PRERENDER_LIMIT} pages.`);
    routes = routes.slice(0, PRERENDER_LIMIT);
  }

  console.log(`📌 Found ${routes.length} routes to prerender.`);

  // Spin up local static server
  const app = express();
  app.use(express.static(distPath));
  // SPA Fallback
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`🌐 Local server running on http://127.0.0.1:${PORT}`);
  });

  console.log('🕷️ Launching Headless Browser (Puppeteer)...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Speed optimizations for Puppeteer
  await page.setCacheEnabled(true);
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (['image', 'font', 'stylesheet', 'media'].includes(resourceType)) {
      req.abort(); // Don't load heavy assets, we only care about HTML rendering
    } else {
      req.continue();
    }
  });

  let successCount = 0;

  for (const route of routes) {
    try {
      const targetUrl = `http://127.0.0.1:${PORT}${route}`;
      // Go to page
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      // Wait for React to render content into the root div (more than just empty HTML)
      await page.waitForFunction('document.getElementById("root") && document.getElementById("root").innerHTML.length > 200', { timeout: 10000 });
      // Wait an extra fraction of a second for any useEffect SEO/schema injections
      await new Promise(r => setTimeout(r, 200));
      
      // Extract the fully rendered HTML
      const html = await page.content();
      
      // Determine file path (e.g. /interiors-in/baner -> dist/interiors-in/baner/index.html)
      // Root route ('') goes to dist/index.html
      let filePath = path.join(distPath, route, 'index.html');
      if (route === '') {
        filePath = path.join(distPath, 'index.html');
      } else {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }

      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`✅ Prerendered: ${route || '/'}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to prerender: ${route}`, error.message);
    }
  }

  await browser.close();
  server.close();
  
  console.log(`🎉 SSG Complete: ${successCount}/${routes.length} routes prerendered into static HTML!`);
  process.exit(0);
}

prerender();
