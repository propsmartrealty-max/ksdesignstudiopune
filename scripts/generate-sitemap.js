import fs from 'fs';
import path from 'path';

// Manual definitions for Node script (mirroring seo_registry)
const PUNE_MARKETS = [
  "Baner", "Balewadi", "Mahalunge", "Sus", "Pashan", "Aundh", "Bavdhan", 
  "Hinjewadi Phase 1", "Wakad", "Punawale", "Tathawade", "Ravet", "Pimple Saudagar", "Pimpri", "Chinchwad",
  "Kharadi", "Viman Nagar", "Koregaon Park", "Kalyani Nagar", "Magarpatta", "Hadapsar",
  "NIBM", "Kondhwa", "Undri", "PCMC", "Moshi"
];

const BUILDERS = {
  "Godrej Properties": ["Godrej Hillside", "Godrej Park World"],
  "VTP Realty": ["VTP Blue Waters", "VTP Bellissimo"],
  "Kolte-Patil Developers": ["Life Republic", "24K Stargaze"],
  "Kohinoor Group": ["Kohinoor Central Park", "Kohinoor Westview Reserve"],
  "Mahindra Lifespaces": ["Mahindra Citadel"],
  "Lodha": ["Lodha Belmondo"],
  "Gera Developments": ["Gera World of Joy"]
};

const SERVICES = [
  "Turnkey Interiors", "Modular Kitchen", "Wardrobe Design", 
  "Home Renovation", "Luxury Apartments", "2 BHK", "3 BHK", "Villa"
];

const PROPERTY_TYPES = ["2 BHK", "3 BHK", "Villa"];

const BASE_URL = 'https://ksdesignstudio.in';

function formatSlug(text) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

function generateXML() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  const addUrl = (route, priority = 0.8, changefreq = "monthly") => {
    xml += `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
  };

  // Core Static Routes
  const coreRoutes = ['', '/about', '/services', '/portfolio', '/process', '/contact', '/knowledge', '/design-ideas', '/laboratory', '/tectonic-series', '/vault', '/pricing'];
  for (const route of coreRoutes) {
    addUrl(route, 1.0, "weekly");
  }

  // Generate Location Routes (Tier 1 Priority)
  for (const location of PUNE_MARKETS) {
    const locSlug = formatSlug(location);
    addUrl(`/interiors-in/${locSlug}`, 0.9);
    addUrl(`/cost-guide/${locSlug}`, 0.8);
    
    // Cost per property type
    for (const prop of PROPERTY_TYPES) {
      addUrl(`/cost/${locSlug}/${formatSlug(prop)}`, 0.7);
    }
  }

  // Generate Service & Service+Location Routes
  for (const service of SERVICES) {
    const srvSlug = formatSlug(service);
    addUrl(`/services/${srvSlug}`, 0.9);
    
    // Cross multiply top 10 locations with top services to avoid limit overflow
    for (const location of PUNE_MARKETS.slice(0, 10)) {
      addUrl(`/service/${formatSlug(location)}/${srvSlug}`, 0.8);
    }
  }

  // Generate Builder & Project Routes
  for (const [builder, projects] of Object.entries(BUILDERS)) {
    const builderSlug = formatSlug(builder);
    addUrl(`/builder/${builderSlug}`, 0.9);
    
    for (const project of projects) {
       addUrl(`/builder/${builderSlug}/${formatSlug(project)}`, 0.8);
       // Legacy fallback
       addUrl(`/interiors-at/${formatSlug(project)}`, 0.7);
    }
  }

  xml += `</urlset>`;
  return xml;
}

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, generateXML(), 'utf8');
console.log('✅ Enterprise Sitemap Generated: ' + sitemapPath);
