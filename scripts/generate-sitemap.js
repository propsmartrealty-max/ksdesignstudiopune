import fs from 'fs';
import path from 'path';

// Purged from 100+ low-quality markets down to the Elite High-Value Pune & Mumbai markets
const TARGET_MARKETS = [
  // Pune Complete Micro-Markets
  "Baner", "Koregaon Park", "Kalyani Nagar", "Viman Nagar", "Hinjewadi", "Wakad", "Kharadi", "Aundh", "Magarpatta", "Balewadi",
  "Pashan", "Kothrud", "Bavdhan", "Punawale", "Tathawade", "Ravet", "Pimple Saudagar", "Hadapsar", "NIBM", "Undri",
  "Pimple Gurav", "Pimple Nilakh", "Sangvi", "Bhosari", "Chinchwad", "Nigdi", "Akurdi", "Thergaon", "Kalewadi",
  "Karve Nagar", "Warje", "Sinhagad Road", "Dhankawadi", "Katraj", "Bibwewadi", "Swargate", "Camp", "Wanowrie",
  "Pisoli", "Kondhwa", "Wagholi", "Vishrantwadi", "Dhanori", "Lohegaon", "Dighi", "Yerawada", "Shivaji Nagar",
  "Deccan", "FC Road", "SB Road", "Model Colony", "Erandwane", "Sadashiv Peth", "Narayan Peth", "Shukrawar Peth",
  // Mumbai Elite
  "Bandra", "Juhu", "Worli", "Powai", "Andheri", "South Mumbai", "Malabar Hill", "Navi Mumbai", "Thane"
];

const BUILDERS = {
  "Godrej Properties": ["Godrej Hillside", "Godrej Park World", "Godrej Elements", "Godrej 24", "Godrej Rejuve"],
  "VTP Realty": ["VTP Blue Waters", "VTP Bellissimo", "VTP Leonara", "VTP Belair", "VTP Pegasus", "VTP Altair"],
  "Kolte-Patil Developers": ["Life Republic", "24K Stargaze", "24K Atria", "Ivy Estate", "Centria"],
  "Kohinoor Group": ["Kohinoor Central Park", "Kohinoor Westview Reserve", "Kohinoor Sapphire", "Kohinoor Coral", "Kohinoor Grandeur"],
  "Mahindra Lifespaces": ["Mahindra Citadel", "Mahindra Happinest", "Mahindra Antheia"],
  "Lodha": ["Lodha Belmondo", "Lodha Giardino", "Lodha Panache"],
  "Gera Developments": ["Gera World of Joy", "Gera Planet of Joy", "Gera Island of Joy", "Gera Admeasuring"],
  "Panchshil Realty": ["Panchshil Towers", "Trump Towers Pune", "Yoo Pune", "One North"],
  "Rohan Builders": ["Rohan Abhilasha", "Rohan Leher", "Rohan Nidita", "Rohan Tarang"],
  "Pride Group": ["Pride World City", "Pride Platinum", "Pride Ashiyana"],
  "Paranjape Schemes": ["Blue Ridge", "Forest Trails", "Athashri"],
  "Kalpataru": ["Kalpataru Jade Residences", "Kalpataru Serenity", "Kalpataru Splendour"],
  "Kasturi Housing": ["The Balmoral Riverside", "Apostrophe", "Legacy"],
  "Nyati Group": ["Nyati Elysia", "Nyati Equinox", "Nyati Exuberance"]
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
  

  // 2. Locations
  const locUrls = [];
  for (const location of TARGET_MARKETS) {
    const locSlug = formatSlug(location);
    locUrls.push({ route: `/interiors-in/${locSlug}`, priority: 0.9, changefreq: "monthly" });
    // Cost guides are highly valuable. Keep them.
    locUrls.push({ route: `/cost-guide/${locSlug}`, priority: 0.8, changefreq: "monthly" });
  }
  

  // 3. Services (Elite Cluster only: Hardened Top Services x Top Locations)
  const srvUrls = [];
  
  // Hardened strict list of highest converting interior design search queries
  const CORE_SERVICES = [
    // Core Services
    "Luxury Interior Designers", "Turnkey Interiors", "Modular Kitchen Designers", "2 BHK Interior Designers", 
    "3 BHK Interior Designers", "4 BHK Interior Designers", "Villa Interior Designers", "Bungalow Interior Designers",
    "Office Interior Designers", "Home Renovation", "Best Interior Designers", "Interior Designers Near Me",
    "Interior Decorators Near Me", "Modular Kitchen Designers Near Me", "Top Interior Designers",
    "Budget Interior Designers", "Affordable Interior Designers", "Premium Interior Designers",
    
    // Room-specific
    "Living Room Interior Design", "Master Bedroom Interior Design", "Kids Room Interior Design",
    "Guest Room Interior Design", "Pooja Room Interior Design", "Bathroom Interior Design",
    "Balcony Interior Design", "Dining Room Interior Design", "Foyer Interior Design",
    
    // Furniture & Products (Google Shopping / Snippets Strategy)
    "Custom Sofa Design", "L-Shape Sofa Set", "Luxury Sofa Set", "Modern Sofa Set",
    "Custom Wardrobe Design", "Sliding Wardrobe Design", "Walk-in Wardrobe Design", "Acrylic Wardrobe Design",
    "Custom Dining Table", "Marble Dining Table", "Wooden Dining Table", "Luxury Dining Table",
    "Modular Kitchen Pricing", "L-Shape Modular Kitchen", "Parallel Modular Kitchen", "Island Modular Kitchen",
    "Acrylic Modular Kitchen", "PVC Modular Kitchen", "Wooden Modular Kitchen", "Stainless Steel Modular Kitchen",
    "TV Unit Design", "Modern TV Unit", "Floating TV Unit", "Luxury TV Unit",
    "False Ceiling Design", "POP False Ceiling", "Gypsum False Ceiling", "Wooden False Ceiling",
    "Shoe Rack Design", "Crockery Unit Design", "Study Table Design", "Bookshelf Design",
    "Custom Bed Design", "Hydraulic Bed", "Upholstered Bed", "Luxury Bed",
    
    // Pricing & Intent (High Conversion)
    "Interior Design Cost Calculator", "2 BHK Interior Design Cost", "3 BHK Interior Design Cost",
    "Modular Kitchen Cost", "Turnkey Interior Cost", "Wardrobe Cost Calculator",
    
    // Styles
    "Modern Interior Design", "Minimalist Interior Design", "Contemporary Interior Design",
    "Traditional Interior Design", "Scandinavian Interior Design", "Bohemian Interior Design",
    "Industrial Interior Design", "Japandi Interior Design", "Wabi-Sabi Interior Design",
    
    // Commercial
    "Commercial Interior Designers", "Retail Shop Interior Designers", "Restaurant Interior Designers",
    "Cafe Interior Designers", "Clinic Interior Designers", "Salon Interior Designers",
    "Gym Interior Designers", "Hotel Interior Designers", "Showroom Interior Designers",
    
    // Niche Services
    "Vastu Compliant Interior Design", "Smart Home Automation", "Acoustic Soundproofing",
    "Lighting Design Consultancy", "Custom Furniture Sourcing", "Italian Marble Flooring",
    "Wallpaper Installation", "Wall Paneling Design", "Custom Painting Services"
  ];
  
  for (const service of CORE_SERVICES) {
    const srvSlug = formatSlug(service);
    srvUrls.push({ route: `/services/${srvSlug}`, priority: 0.9, changefreq: "monthly" });
    for (const location of TARGET_MARKETS) {
      srvUrls.push({ route: `/service/${formatSlug(location)}/${srvSlug}`, priority: 0.8, changefreq: "monthly" });
    }
  }
  

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
  

  // Aggregate all URLs for a flat sitemap
  const allSitemapUrls = [...coreUrls, ...locUrls, ...srvUrls, ...projUrls, ...magUrls];
  
  // 6. Generate single flat Global Sitemap
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), createSitemapXML(allSitemapUrls), 'utf8');

  // 7. Generate a static HTML Sitemap (The Internal Linking Mesh) - Paginated to prevent Link Farm Penalty
  const LINKS_PER_PAGE = 1000;
  const totalPages = Math.ceil(allSitemapUrls.length / LINKS_PER_PAGE);

  for (let i = 0; i < totalPages; i++) {
    const chunk = allSitemapUrls.slice(i * LINKS_PER_PAGE, (i + 1) * LINKS_PER_PAGE);
    const isFirstPage = i === 0;
    const fileName = isFirstPage ? 'locations.html' : `locations-${i + 1}.html`;

    let htmlSitemap = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS Design Studio - Areas We Serve (Page ${i + 1})</title>
  <meta name="description" content="Directory of interior design services across Pune (Page ${i + 1}).">
  <meta name="robots" content="index, follow">
</head>
<body style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 1200px; mx-auto;">
  <h1>KS Design Studio - Coverage Areas (Page ${i + 1} of ${totalPages})</h1>
  <div style="margin-bottom: 20px;">
    ${Array.from({ length: totalPages }).map((_, idx) => 
      `<a href="${idx === 0 ? 'locations.html' : `locations-${idx + 1}.html`}" style="margin-right: 10px; font-weight: ${idx === i ? 'bold' : 'normal'};">Page ${idx + 1}</a>`
    ).join('')}
  </div>
  <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px;">`;
    
    chunk.forEach(u => {
      htmlSitemap += `\n    <li><a href="${u.route}">${u.route.replace(/-/g, ' ').replace(/\//g, ' ').trim()}</a></li>`;
    });
    
    htmlSitemap += `\n  </ul>\n</body>\n</html>`;
    fs.writeFileSync(path.join(publicDir, fileName), htmlSitemap, 'utf8');
  }

  // Also output a flat JSON array of routes for the prerender script
  allSitemapUrls.forEach(u => allRoutes.push(u.route));
  
  // Harden: Deduplicate routes to prevent crawler loops or SSG double-rendering
  const uniqueRoutes = [...new Set(allRoutes)];
  fs.writeFileSync(path.join(publicDir, 'routes.json'), JSON.stringify(uniqueRoutes), 'utf8');

  console.log(`✅ Enterprise Sitemap Index & Routes JSON Generated (${uniqueRoutes.length} unique routes)`);
}

generateSitemaps();
