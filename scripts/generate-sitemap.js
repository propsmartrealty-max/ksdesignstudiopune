import fs from 'fs';
import path from 'path';

// Target High-Value Pune, PCMC & Mumbai Micro-Markets
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

const MAG_SLUGS = [
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

// Clean High-Fidelity Image Assets for Image Sitemap
const IMAGE_ASSETS = [
  {
    page: '/',
    images: [
      {
        url: 'https://ksdesignstudio.in/assets/images/hero_foyer.webp',
        title: 'Luxury Double-Height Foyer Architecture in Pune | KS Design Studio',
        caption: 'Bespoke residential architectural foyer with fluted acoustic paneling and brass joinery in Pune.',
        geo: 'Wakad, Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_tectonic_kitchen.webp',
        title: 'Ultra-Luxury Modular Kitchen Design with Satin Brass Joinery | KS Design Studio',
        caption: 'German-engineered Blum soft-close modular kitchen with Italian Statuario marble island in Pune.',
        geo: 'Wakad, Pune, Maharashtra, India'
      }
    ]
  },
  {
    page: '/portfolio',
    images: [
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_jade_living.webp',
        title: 'Monolithic Living Room Interior Design at Kalpataru Jade Balewadi',
        caption: 'Luxury high-rise living room with Italian Statuario marble and bespoke acoustic ceiling.',
        geo: 'Balewadi, Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_monograph_bedroom.webp',
        title: 'Moody Master Bedroom Suite with Arched Windows at Lodha Belmondo',
        caption: 'Custom upholstered headboard and fluted walnut woodwork for 4BHK bungalow master suite.',
        geo: 'Gahunje, Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_sensorium_tech.webp',
        title: 'Tech-Luxe Smart Living Room at Joyville Sensorium Hinjewadi',
        caption: 'Automated mood lighting and concealed storage for IT executive apartments in Hinjewadi.',
        geo: 'Hinjewadi, Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_balmoral_balcony.webp',
        title: 'High-Altitude Luxury Balcony Lounge at The Balmoral Riverside Balewadi',
        caption: 'Weatherproof natural teak wood deck with vertical biophilic garden and city views.',
        geo: 'Balewadi, Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_kekarav_bungalow.webp',
        title: 'Grand Luxury Bungalow Living Architecture at Kekarav Bavdhan',
        caption: 'Double-height private residence living room featuring custom chandelier and natural smoked veneer.',
        geo: 'Bavdhan, Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/portfolio_kitchen.webp',
        title: 'Turnkey Acrylic Modular Kitchen with Quartz Countertop in Wakad',
        caption: 'Ergonomic parallel modular kitchen with anti-scratch high-gloss acrylic finish.',
        geo: 'Wakad, Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/portfolio_bedroom.webp',
        title: 'Modern Master Bedroom Symphony with Fluted Wood Paneling',
        caption: 'Contemporary master suite interior with ambient LED profile lighting and integrated dressing unit.',
        geo: 'Pune, Maharashtra, India'
      }
    ]
  },
  {
    page: '/interiors-in/wakad',
    images: [
      {
        url: 'https://ksdesignstudio.in/assets/images/blog_wakad_tech.webp',
        title: 'Best Interior Designers in Wakad Pune | KS Design Studio Head Office',
        caption: 'Turnkey residential interiors designed at Office 623, Vision One Mall, Bhumkar Chowk, Wakad.',
        geo: 'Wakad, Pune, Maharashtra, India'
      }
    ]
  },
  {
    page: '/interiors-in/baner',
    images: [
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_balmoral_balcony.webp',
        title: 'Luxury 3 BHK & 4 BHK Interior Designers in Baner Pune',
        caption: 'Premium apartment interior architecture in Baner and Balewadi by KS Design Studio.',
        geo: 'Baner, Pune, Maharashtra, India'
      }
    ]
  },
  {
    page: '/interiors-in/hinjewadi',
    images: [
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_sensorium_tech.webp',
        title: 'Smart Home & Modular Interior Designers in Hinjewadi Phase 1, 2 & 3',
        caption: 'Ergonomic WFH living spaces and turnkey interiors for Hinjewadi IT executives.',
        geo: 'Hinjewadi, Pune, Maharashtra, India'
      }
    ]
  },
  {
    page: '/services/modular-kitchen-designers',
    images: [
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_tectonic_kitchen.webp',
        title: 'German-Engineered Modular Kitchen Architecture Pune',
        caption: 'Custom modular kitchens with Blum hinges, pull-out larders, and quartz tops.',
        geo: 'Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/portfolio_kitchen.webp',
        title: 'Modern Island & L-Shape Modular Kitchen Designs Pune',
        caption: 'Precision factory-fabricated kitchen trolleys and overhead cabinets with 10-year warranty.',
        geo: 'Pune, Maharashtra, India'
      }
    ]
  },
  {
    page: '/services/commercial-interior-designers',
    images: [
      {
        url: 'https://ksdesignstudio.in/assets/images/ks_corporate_office.webp',
        title: 'Modern Corporate Office Interior Architecture Pune',
        caption: 'High-performance IT office interior with acoustic zoning and ergonomic layout.',
        geo: 'Pune, Maharashtra, India'
      },
      {
        url: 'https://ksdesignstudio.in/assets/images/service_office.webp',
        title: 'Executive Atelier & Commercial Workspace Design',
        caption: 'Turnkey commercial space planning and executive cabin interior design in Pune.',
        geo: 'Pune, Maharashtra, India'
      }
    ]
  }
];

const BASE_URL = 'https://ksdesignstudio.in';

function formatSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, function (c) {
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

function createImageSitemapXML(imageGroups) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
  const today = new Date().toISOString().split('T')[0];

  imageGroups.forEach(group => {
    const safePageLoc = escapeXml(`${BASE_URL}${group.page}`);
    xml += `  <url>\n    <loc>${safePageLoc}</loc>\n    <lastmod>${today}</lastmod>\n`;
    group.images.forEach(img => {
      xml += `    <image:image>\n      <image:loc>${escapeXml(img.url)}</image:loc>\n      <image:title>${escapeXml(img.title)}</image:title>\n      <image:caption>${escapeXml(img.caption)}</image:caption>\n      <image:geo_location>${escapeXml(img.geo)}</image:geo_location>\n    </image:image>\n`;
    });
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

function createSitemapIndexXML(sitemapNames) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const today = new Date().toISOString().split('T')[0];
  sitemapNames.forEach(name => {
    xml += `  <sitemap>\n    <loc>${BASE_URL}/${name}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n`;
  });
  xml += `</sitemapindex>`;
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
  }

  // 3. Cost Guides
  const costGuideUrls = [];
  for (const location of TARGET_MARKETS) {
    const locSlug = formatSlug(location);
    costGuideUrls.push({ route: `/cost-guide/${locSlug}`, priority: 0.8, changefreq: "monthly" });
  }

  // 4. Services
  const srvUrls = [];
  for (const service of CORE_SERVICES) {
    const srvSlug = formatSlug(service);
    srvUrls.push({ route: `/services/${srvSlug}`, priority: 0.9, changefreq: "monthly" });
    for (const location of TARGET_MARKETS) {
      srvUrls.push({ route: `/service/${formatSlug(location)}/${srvSlug}`, priority: 0.8, changefreq: "monthly" });
    }
  }

  // 5. Projects & Builders
  const projUrls = [];
  for (const [builder, projects] of Object.entries(BUILDERS)) {
    const builderSlug = formatSlug(builder);
    projUrls.push({ route: `/builder/${builderSlug}`, priority: 0.9, changefreq: "monthly" });
    for (const project of projects) {
       projUrls.push({ route: `/builder/${builderSlug}/${formatSlug(project)}`, priority: 0.8, changefreq: "monthly" });
       projUrls.push({ route: `/interiors-at/${formatSlug(project)}`, priority: 0.7, changefreq: "monthly" });
    }
  }

  // 6. Magazine & Knowledge Hub
  const magUrls = MAG_SLUGS.map(slug => ({ route: `/magazine/${slug}`, priority: 0.8, changefreq: "monthly" }));
  magUrls.push({ route: '/magazine', priority: 0.9, changefreq: "weekly" });

  // Segmented XML files
  fs.writeFileSync(path.join(publicDir, 'sitemap-core.xml'), createSitemapXML(coreUrls), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-locations.xml'), createSitemapXML(locUrls), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-cost-guides.xml'), createSitemapXML(costGuideUrls), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-services.xml'), createSitemapXML(srvUrls), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-projects.xml'), createSitemapXML(projUrls), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-magazine.xml'), createSitemapXML(magUrls), 'utf8');
  
  // High-Impact Image Sitemap for Google Visual Search
  fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), createImageSitemapXML(IMAGE_ASSETS), 'utf8');

  // Master Sitemap Index
  const childSitemaps = [
    'sitemap-core.xml',
    'sitemap-locations.xml',
    'sitemap-cost-guides.xml',
    'sitemap-services.xml',
    'sitemap-projects.xml',
    'sitemap-magazine.xml',
    'sitemap-images.xml'
  ];
  const sitemapIndexXml = createSitemapIndexXML(childSitemaps);
  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndexXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml, 'utf8');

  // Aggregate all URLs for HTML sitemaps and routes.json
  const allSitemapUrls = [...coreUrls, ...locUrls, ...costGuideUrls, ...srvUrls, ...projUrls, ...magUrls];

  // Paginated HTML Internal Linking Mesh
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
  <meta name="description" content="Directory of interior design services across Pune & Mumbai (Page ${i + 1}).">
  <meta name="robots" content="index, follow">
</head>
<body style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 1200px; margin: 0 auto;">
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

  // Deduplicate and output routes.json
  allSitemapUrls.forEach(u => allRoutes.push(u.route));
  const uniqueRoutes = [...new Set(allRoutes)];
  fs.writeFileSync(path.join(publicDir, 'routes.json'), JSON.stringify(uniqueRoutes), 'utf8');

  console.log(`✅ Enterprise Sitemap Index & 7 Child Sitemaps Generated (${uniqueRoutes.length} unique routes, ${IMAGE_ASSETS.length} image hubs)`);
}

generateSitemaps();
