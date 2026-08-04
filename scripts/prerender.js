import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  const distDir = path.resolve(__dirname, '../dist');
  
  if (!fs.existsSync(distDir)) {
    console.error('dist directory not found. Run build first.');
    process.exit(1);
  }

  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('sitemap.xml not found. Run generate-sitemap.js first.');
    process.exit(1);
  }

  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  // Simple regex to extract URLs
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  const routes = [];
  while ((match = urlRegex.exec(sitemapXml)) !== null) {
    const url = new URL(match[1]);
    routes.push(url.pathname);
  }

  console.log(`Found ${routes.length} routes to prerender.`);

  // Start a local express server to serve the dist folder
  const app = express();
  app.use(express.static(distDir));
  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
  });

  const server = app.listen(0, async () => {
    const port = server.address().port;
    console.log(`Server started on port ${port}`);
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (const route of routes) {
      if (route === '/') continue; // Skip root, handled by default or we can overwrite

      const url = `http://localhost:${port}${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        const html = await page.content();
        
        // Save the HTML
        const routePath = path.join(distDir, route);
        if (!fs.existsSync(routePath)) {
          fs.mkdirSync(routePath, { recursive: true });
        }
        fs.writeFileSync(path.join(routePath, 'index.html'), html);
        console.log(`Prerendered: ${route}`);
      } catch (err) {
        console.error(`Failed to prerender ${route}:`, err.message);
      }
    }

    // Prerender root
    try {
      await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });
      const html = await page.content();
      fs.writeFileSync(path.join(distDir, 'index.html'), html);
      console.log(`Prerendered: /`);
    } catch (err) {}

    await browser.close();
    server.close();
    console.log('Prerendering complete.');
  });
}

prerender();
