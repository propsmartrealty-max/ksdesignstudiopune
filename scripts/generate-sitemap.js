import fs from 'fs';
import path from 'path';

// Manual definitions for Node script
const PUNE_MARKETS = [
  "Baner", "Baner Annexe", "Balewadi", "Mahalunge", "Sus", "Pashan", "Aundh", "Bavdhan", "Kothrud", "Warje", "Karve Nagar", "Erandwane", "Prabhat Road", "Shivajinagar", "Model Colony", "SB Road", "University Road", "Law College Road", "Deccan", "FC Road", "JM Road",
  "Hinjawadi Phase 1", "Hinjawadi Phase 2", "Hinjawadi Phase 3", "Wakad", "Punawale", "Tathawade", "Ravet", "Kiwale", "Pimple Saudagar", "Pimple Nilakh", "Kalewadi", "Thergaon", "Nigdi", "Pimpri", "Chinchwad",
  "Kharadi", "New Kharadi", "Viman Nagar", "Koregaon Park", "Kalyani Nagar", "Magarpatta", "Mundhwa", "Hadapsar", "Manjari", "Wagholi", "Lohegaon", "Dhanori", "Yerawada", "Keshav Nagar",
  "NIBM", "Mohammed Wadi", "Undri", "Kondhwa", "Pisoli", "Bibwewadi", "Katraj", "Narhe", "Sinhagad Road", "Ambegaon", "Dhankawadi", "PCMC", "Moshi", "Chikhali", "Charholi", "Akurdi", "Bhosari", "Talawade", "Pradhikaran", "Chakan", "Spine Road"
];

const TARGET_MICRO_MARKETS = ["Baner", "Baner Annexe", "Balewadi", "Mahalunge", "Aundh", "Sus", "Pashan", "Bavdhan", "Kothrud"];

const SERVICES = [
  "Luxury Apartments", "Premium Apartments", "Budget Apartments", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Penthouse", "Duplex", "Villa", "Bungalow", "Farmhouse", "Row House", "Independent House", "Smart Homes", "Minimal Homes", "Modern Homes", "Luxury Homes",
  "Office Interior", "IT Office", "Corporate Office", "Startup Office", "Restaurant", "Cafe", "Retail", "Showroom", "Hospital", "Clinic", "Salon", "Gym", "Hotel", "Coworking Space", "Educational Institute", "Industrial Office", "Warehouse Office",
  "Complete Home Interiors", "Interior Execution", "Project Management", "Furniture Manufacturing", "Civil Work", "Electrical", "Plumbing", "Painting", "Automation", "False Ceiling", "Flooring", "Lighting", "Curtains", "Soft Furnishing",
  "Modular Kitchen", "L Shape Kitchen", "U Shape Kitchen", "Island Kitchen", "Parallel Kitchen", "Straight Kitchen", "Wardrobes", "Sliding Wardrobes", "Walk-in Wardrobes", "TV Units", "Vanity", "Crockery Unit", "Bookshelf", "Study Unit", "Custom Furniture"
];

const CONFIGURATIONS = ["2 BHK", "3 BHK", "4 BHK", "5 BHK", "Penthouse", "Duplex", "Villa", "Bungalow"];
const INTENT_PREFIXES = ["Luxury", "Premium", "Affordable", "Budget", "Best", "Top"];

const BASE_URL = 'https://ksdesignstudio.in/#';

function formatSlug(text) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

function generateXML() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Core Static Routes
  const coreRoutes = ['', '/about', '/services', '/portfolio', '/process', '/contact', '/knowledge', '/design-ideas', '/laboratory', '/tectonic-series', '/vault', '/pricing'];
  for (const route of coreRoutes) {
    xml += `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>\n`;
  }

  // Generate Location Routes
  for (const location of PUNE_MARKETS) {
    xml += `  <url>
    <loc>${BASE_URL}/interiors-in/${formatSlug(location)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    xml += `  <url>
    <loc>${BASE_URL}/cost-guide/${formatSlug(location)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  }

  // Generate Service Routes
  for (const service of SERVICES) {
    xml += `  <url>
    <loc>${BASE_URL}/services/${formatSlug(service)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  }

  // Hyperlocal Cross-Multiplication (Volume 2)
  for (const micro of TARGET_MICRO_MARKETS) {
     for (const config of CONFIGURATIONS) {
        xml += `  <url>
    <loc>${BASE_URL}/services/${formatSlug(config)}-interior-designers-in-${formatSlug(micro)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
     }
     for (const prefix of INTENT_PREFIXES) {
        xml += `  <url>
    <loc>${BASE_URL}/services/${formatSlug(prefix)}-interior-designers-in-${formatSlug(micro)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
     }
  }

  xml += `</urlset>`;
  return xml;
}

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, generateXML(), 'utf8');
console.log('✅ Enterprise Sitemap Generated: ' + sitemapPath);
