import fs from 'fs';
import path from 'path';

// Manual definitions for Node script (mirroring seo_registry)
const PUNE_MARKETS = [
  // West Pune
  "Baner", "Balewadi", "Mahalunge", "Sus", "Pashan", "Aundh", "Bavdhan", "Kothrud", "Karve Nagar", "Warje", "Shivajinagar", "Erandwane", "Deccan Gymkhana", "Senapati Bapat Road", "Model Colony", "Bhugaon", "Pirangut", "Lavale", "Dhayari", "Vadgaon", "Narhe", "Ambegaon", "Sinhagad Road", "Anand Nagar",
  // Pimpri-Chinchwad (PCMC) & IT Corridors
  "Hinjewadi", "Hinjewadi Phase 1", "Hinjewadi Phase 2", "Hinjewadi Phase 3", "Wakad", "Punawale", "Tathawade", "Ravet", "Pimple Saudagar", "Pimple Nilakh", "Pimple Gurav", "Sangvi", "Pimpri", "Chinchwad", "Nigdi", "Akurdi", "Pradhikaran", "Moshi", "Bhosari", "Talawade", "Chikhali", "Dehu Road", "Talegaon", "Somatne", "Thergaon", "Kalewadi",
  // East Pune & IT Hubs
  "Kharadi", "Viman Nagar", "Koregaon Park", "Kalyani Nagar", "Magarpatta", "Hadapsar", "Wagholi", "Chandan Nagar", "Mundhwa", "Keshav Nagar", "Manjari", "Phursungi", "Lohegaon", "Dhanori", "Vishrantwadi", "Yerwada", "Khadki", "Bopodi", "Dapodi",
  // South & Central Pune
  "NIBM", "Kondhwa", "Undri", "Pisoli", "Wanowrie", "Fatima Nagar", "Camp", "Swargate", "Katraj", "Dhankawadi", "Bibwewadi", "Sahakar Nagar", "Market Yard", "Padmavati", "Gultekdi", "Salisbury Park", "Handewadi", "Saswad",
  // Core City Peths
  "Kasba Peth", "Shaniwar Peth", "Narayan Peth", "Sadashiv Peth", "Navi Peth", "Somwar Peth", "Mangalwar Peth", "Rasta Peth", "Bhavani Peth", "Nana Peth"
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
  "Interior Designers", "Interior Decorators", "Turnkey Interiors", "Modular Kitchen", "Wardrobe Design", 
  "Home Renovation", "Luxury Apartments", "Living Room Interiors", "Bedroom Interiors", "Kids Room Interiors", 
  "Bathroom Interiors", "Office Interiors", "Commercial Interiors", "Restaurant Interiors", "Retail Shop Interiors", 
  "Clinic Interiors", "Salon Interiors", "Gym Interiors", "Hotel Interiors", "Showroom Interiors", 
  "Bungalow Interiors", "Villa Interiors", "Penthouse Interiors", "Studio Apartment Interiors", 
  "Duplex Interiors", "Row House Interiors", "Farmhouse Interiors", "Budget Interior Designers", 
  "Luxury Interior Designers", "Modern Interior Designers", "Classic Interior Designers", "Contemporary Interior Designers", 
  "Minimalist Interior Designers", "Industrial Interior Designers", "Scandinavian Interior Designers", 
  "Traditional Interior Designers", "Best Interior Designers", "Top Interior Designers", "Affordable Interior Designers",
  "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Villa"
];

const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Villa", "Bungalow", "Penthouse", "Row House", "Duplex"];

const BASE_URL = 'https://ksdesignstudio.in';

function formatSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dash
    .replace(/(^-|-$)/g, '');    // Remove leading/trailing dashes
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function createSitemapXML(urls) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const today = new Date().toISOString().split('T')[0];
  urls.forEach(url => {
    const safeLoc = escapeXml(`${BASE_URL}${url.route}`);
    xml += `  <url>\n    <loc>${safeLoc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>\n`;
  });
  xml += `</urlset>`;
  return xml;
}

function generateSitemaps() {
  const publicDir = path.join(process.cwd(), 'public');
  const allRoutes = [];
  
  // 1. Core Static Routes
  const coreRoutes = ['', '/about', '/services', '/portfolio', '/process', '/contact', '/knowledge', '/design-ideas', '/laboratory', '/tectonic-series', '/vault', '/pricing'];
  const coreUrls = coreRoutes.map(route => ({ route, priority: 1.0, changefreq: "weekly" }));
  fs.writeFileSync(path.join(publicDir, 'sitemap-core.xml'), createSitemapXML(coreUrls), 'utf8');

  // 2. Locations
  const locUrls = [];
  for (const location of PUNE_MARKETS) {
    const locSlug = formatSlug(location);
    locUrls.push({ route: `/interiors-in/${locSlug}`, priority: 0.9, changefreq: "monthly" });
    locUrls.push({ route: `/cost-guide/${locSlug}`, priority: 0.8, changefreq: "monthly" });
    for (const prop of PROPERTY_TYPES) {
      locUrls.push({ route: `/cost/${locSlug}/${formatSlug(prop)}`, priority: 0.7, changefreq: "monthly" });
    }
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap-locations.xml'), createSitemapXML(locUrls), 'utf8');

  // 3. Services (Aggressive: All Services x All Locations)
  const srvUrls = [];
  
  // Combine core services with property types for ultra long-tail (e.g. "3 BHK Modular Kitchen")
  const CORE_SERVICES = ["Interior Designers", "Turnkey Interiors", "Modular Kitchen", "Home Renovation", "Luxury Interiors"];
  const ALL_SERVICES = [...SERVICES];
  
  for (const prop of PROPERTY_TYPES) {
    for (const core of CORE_SERVICES) {
      ALL_SERVICES.push(`${prop} ${core}`);
    }
  }

  for (const service of ALL_SERVICES) {
    const srvSlug = formatSlug(service);
    srvUrls.push({ route: `/services/${srvSlug}`, priority: 0.9, changefreq: "monthly" });
    for (const location of PUNE_MARKETS) {
      srvUrls.push({ route: `/service/${formatSlug(location)}/${srvSlug}`, priority: 0.8, changefreq: "monthly" });
    }
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap-services.xml'), createSitemapXML(srvUrls), 'utf8');

  // 4. Projects & Builders
  const projUrls = [];
  for (const [builder, projects] of Object.entries(BUILDERS)) {
    const builderSlug = formatSlug(builder);
    projUrls.push({ route: `/builder/${builderSlug}`, priority: 0.9, changefreq: "monthly" });
    for (const project of projects) {
       projUrls.push({ route: `/builder/${builderSlug}/${formatSlug(project)}`, priority: 0.8, changefreq: "monthly" });
       projUrls.push({ route: `/interiors-at/${formatSlug(project)}`, priority: 0.7, changefreq: "monthly" });
    }
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap-projects.xml'), createSitemapXML(projUrls), 'utf8');

  // 5. Magazine & Knowledge Hub
  const magSlugs = [
    'rise-of-japandi-in-pune',
    'sourcing-tuscan-marble',
    'architecture-of-light',
    'panchshil-towers-monograph',
    'pune-luxury-hub',
    'mumbai-minimalism',
    'wakad-design-evolution',
    'bandra-bohemian',
    'ravet-punawale-trends',
    'lighting-architecture-2024'
  ];
  const magUrls = magSlugs.map(slug => ({ route: `/magazine/${slug}`, priority: 0.8, changefreq: "monthly" }));
  magUrls.push({ route: '/magazine', priority: 0.9, changefreq: "weekly" });
  fs.writeFileSync(path.join(publicDir, 'sitemap-magazine.xml'), createSitemapXML(magUrls), 'utf8');

  // 6. Sitemap Index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const sitemaps = ['sitemap-core.xml', 'sitemap-locations.xml', 'sitemap-services.xml', 'sitemap-projects.xml', 'sitemap-magazine.xml'];
  
  sitemaps.forEach(sitemap => {
    indexXml += `  <sitemap>\n    <loc>${BASE_URL}/${sitemap}</loc>\n  </sitemap>\n`;
  });
  
  indexXml += `</sitemapindex>`;
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml, 'utf8');

  // Also output a flat JSON array of routes for the prerender script
  coreUrls.forEach(u => allRoutes.push(u.route));
  locUrls.forEach(u => allRoutes.push(u.route));
  srvUrls.forEach(u => allRoutes.push(u.route));
  projUrls.forEach(u => allRoutes.push(u.route));
  magUrls.forEach(u => allRoutes.push(u.route));
  
  // Harden: Deduplicate routes to prevent crawler loops or SSG double-rendering
  const uniqueRoutes = [...new Set(allRoutes)];
  fs.writeFileSync(path.join(publicDir, 'routes.json'), JSON.stringify(uniqueRoutes), 'utf8');

  console.log(`✅ Enterprise Sitemap Index & Routes JSON Generated (${uniqueRoutes.length} unique routes)`);
}

generateSitemaps();
