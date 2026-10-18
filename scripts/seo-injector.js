import fs from 'fs';
import path from 'path';
import { generateDynamicCopy, generateDynamicMeta, generateProjectCopy } from '../src/utils/copyEngine.ts';
import { GEO_COORDINATES, PUNE_MARKETS } from '../src/registry/seo_registry.ts';

const publicDir = path.join(process.cwd(), 'dist');
const routesPath = path.join(publicDir, 'routes.json');
const indexPath = path.join(publicDir, 'index.html');

if (!fs.existsSync(routesPath) || !fs.existsSync(indexPath)) {
  console.log('Missing routes.json or index.html. Run build first.');
  process.exit(1);
}

const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
const baseHtml = fs.readFileSync(indexPath, 'utf8');

// Helper to normalize strings for display
function capitalize(str) {
  if (!str) return '';
  return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Popular locations for cross-linking
const POPULAR_LOCATIONS = [
  'Baner', 'Wakad', 'Hinjewadi', 'Kharadi', 'Koregaon Park',
  'Aundh', 'Balewadi', 'Kothrud', 'Viman Nagar', 'Magarpatta',
  'Bavdhan', 'Ravet', 'Pimple Saudagar', 'Tathawade'
];

// Popular services for cross-linking
const POPULAR_SERVICES = [
  { name: 'Modular Kitchen Designers', slug: 'modular-kitchen-designers' },
  { name: 'Turnkey Interiors', slug: 'turnkey-interiors' },
  { name: '2 BHK Interior Designers', slug: '2-bhk-interior-designers' },
  { name: '3 BHK Interior Designers', slug: '3-bhk-interior-designers' },
  { name: 'Luxury Interior Designers', slug: 'luxury-interior-designers' },
  { name: 'Villa Interior Designers', slug: 'villa-interior-designers' }
];

function formatRouteDetails(route) {
  const parts = route.split('/').filter(Boolean);
  if (parts.length === 0) {
    return {
      title: 'Top Luxury Interior Designers in Pune | KS Design Studio',
      h1: 'Top Luxury Interior Designers in Pune',
      subject: 'Interior Design',
      loc: 'Pune',
      type: 'home'
    };
  }

  // 1. Location landing (/interiors-in/:location)
  if (parts[0] === 'interiors-in' && parts[1]) {
    const loc = capitalize(parts[1]);
    return {
      title: `Top #1 Luxury Interior Designers in ${loc}, Pune | KS Design Studio`,
      h1: `Top Luxury Interior Designers in ${loc}, Pune`,
      subject: 'Interior Design',
      loc,
      type: 'location'
    };
  }

  // 2. Cost Guide (/cost-guide/:location)
  if (parts[0] === 'cost-guide' && parts[1]) {
    const loc = capitalize(parts[1]);
    return {
      title: `2026 Interior Design Cost in ${loc}, Pune | 2 & 3 BHK Pricing Guide`,
      h1: `2026 Interior Design Cost Guide in ${loc}, Pune`,
      subject: 'Interior Design Cost',
      loc,
      type: 'cost'
    };
  }

  // 3. Service (/services/:serviceName)
  if (parts[0] === 'services' && parts[1]) {
    const srv = capitalize(parts[1]);
    return {
      title: `Best ${srv} in Pune | #1 Ranked Architecture Firm | KS Design Studio`,
      h1: `Best ${srv} in Pune`,
      subject: srv,
      loc: 'Pune',
      type: 'service'
    };
  }

  // 4. Location + Service (/service/:locationSlug/:serviceSlug)
  if (parts[0] === 'service' && parts[1] && parts[2]) {
    const loc = capitalize(parts[1]);
    const srv = capitalize(parts[2]);
    return {
      title: `${srv} in ${loc}, Pune | Top Rated Turnkey Experts | KS Design Studio`,
      h1: `${srv} in ${loc}, Pune`,
      subject: srv,
      loc,
      type: 'service-location'
    };
  }

  // 5. Builder (/builder/:builderName)
  if (parts[0] === 'builder' && parts[1] && !parts[2]) {
    const builder = capitalize(parts[1]);
    return {
      title: `Interior Designers for ${builder} Projects in Pune | KS Design Studio`,
      h1: `Interior Designers for ${builder} Projects in Pune`,
      subject: `${builder} Interiors`,
      loc: 'Pune',
      type: 'builder'
    };
  }

  // 6. Builder + Project (/builder/:builderName/:projectName) or (/interiors-at/:projectName)
  if ((parts[0] === 'builder' && parts[1] && parts[2]) || (parts[0] === 'interiors-at' && parts[1])) {
    const proj = capitalize(parts[2] || parts[1]);
    const builder = parts[0] === 'builder' ? capitalize(parts[1]) : 'Premier Pune Developers';
    return {
      title: `Bespoke Interior Design for ${proj} Pune | KS Design Studio`,
      h1: `Bespoke Interior Design for ${proj} Pune`,
      subject: `${proj} Interiors`,
      loc: 'Pune',
      type: 'project'
    };
  }

  // 7. Magazine (/magazine/:slug)
  if (parts[0] === 'magazine' && parts[1]) {
    const article = capitalize(parts[1]);
    return {
      title: `${article} | KS Design Studio Architectural Magazine`,
      h1: article,
      subject: 'Architectural Design',
      loc: 'Pune',
      type: 'magazine'
    };
  }

  const generic = capitalize(parts.join(' '));
  return {
    title: `${generic} | KS Design Studio Pune`,
    h1: `${generic} in Pune`,
    subject: 'Interior Design',
    loc: 'Pune',
    type: 'generic'
  };
}

function buildPreRenderedHTML(details, fullUrl, dynamicCopy) {
  const { h1, subject, loc, type } = details;

  // Generate localized FAQs
  const faqs = [
    {
      q: `Who are the best interior designers in ${loc}?`,
      a: `KS Design Studio is ranked among the top interior designers in ${loc}, Pune. Led by Principal Architect Komal Sharma, our studio delivers luxury turnkey residential and commercial architecture with in-house CNC factory manufacturing, 45-day guaranteed handover, and a 10-year comprehensive warranty.`
    },
    {
      q: `What is the estimated cost of interior design in ${loc} for a 2 BHK and 3 BHK?`,
      a: `In ${loc}, turnkey interior design for a 2 BHK flat ranges from ₹4.50 Lakhs to ₹8.50 Lakhs. For a 3 BHK apartment, packages range from ₹8.50 Lakhs to ₹17.50 Lakhs. Ultra-luxury villas and penthouses range from ₹18 Lakhs to ₹45 Lakhs+. All packages include modular kitchen, false ceiling, wardrobes, electricals, and civil alterations.`
    },
    {
      q: `What is included in KS Design Studio's turnkey interior service?`,
      a: `Turnkey interior service is a single-window solution covering 3D VR conceptualization, structural planning, civil alterations, electrical rewiring, plumbing, false ceiling, factory-fabricated modular woodwork with Blum/Hettich hardware, premium painting, and final deep cleaning.`
    },
    {
      q: `Do you offer Vastu-compliant interior design in ${loc}?`,
      a: `Yes. All spatial layouts, modular kitchen orientations, master bedroom placements, and pooja/temple zones are designed according to Vastu Shastra principles while maintaining a contemporary luxury aesthetic.`
    }
  ];

  // Build FAQs HTML
  const faqsHtml = faqs.map((faq, idx) => `
    <details style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 0.75rem; background: #fff;" ${idx === 0 ? 'open' : ''}>
      <summary style="font-weight: 700; color: #1a1a1a; cursor: pointer; font-size: 1rem; list-style: none; display: flex; justify-content: space-between; align-items: center;">
        <span>${faq.q}</span>
        <span style="color: #D4AF37; font-size: 1.25rem;">+</span>
      </summary>
      <p style="margin-top: 0.75rem; color: #4a4a4a; font-size: 0.9375rem; line-height: 1.7;">${faq.a}</p>
    </details>
  `).join('');

  // Cross links HTML
  const otherLocations = POPULAR_LOCATIONS.filter(l => l.toLowerCase() !== loc.toLowerCase()).slice(0, 8);
  const crossLinksHtml = [
    ...otherLocations.map(l => `<a href="/interiors-in/${l.toLowerCase().replace(/\s+/g, '-')}" style="color: #4a4a4a; text-decoration: none; padding: 0.35rem 0.75rem; background: #f5f5f5; border-radius: 4px; display: inline-block;">Interiors in ${l}</a>`),
    ...POPULAR_SERVICES.slice(0, 4).map(s => `<a href="/services/${s.slug}" style="color: #4a4a4a; text-decoration: none; padding: 0.35rem 0.75rem; background: #f5f5f5; border-radius: 4px; display: inline-block;">${s.name}</a>`)
  ].join(' ');

  return `
    <div style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem; line-height: 1.6;">
      <header style="border-bottom: 1px solid #e5e5e5; padding-bottom: 1rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <a href="/" style="font-size: 1.5rem; font-weight: 900; text-decoration: none; color: #1a1a1a; letter-spacing: 0.05em;">KS DESIGN STUDIO</a>
        <nav style="display: flex; gap: 1.5rem; font-size: 0.875rem; font-weight: 600;">
          <a href="/services" style="color: #4a4a4a; text-decoration: none;">Services</a>
          <a href="/portfolio" style="color: #4a4a4a; text-decoration: none;">Portfolio</a>
          <a href="/pricing" style="color: #4a4a4a; text-decoration: none;">Cost Estimator</a>
          <a href="/knowledge" style="color: #4a4a4a; text-decoration: none;">Design Insights</a>
          <a href="/contact" style="color: #D4AF37; text-decoration: none; font-weight: 700;">Book Consultation</a>
        </nav>
      </header>

      <main>
        <nav aria-label="breadcrumb" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #D4AF37; margin-bottom: 1rem;">
          <a href="/" style="color: #D4AF37; text-decoration: none;">Home</a> &gt; 
          <a href="/interiors-in/${loc.toLowerCase().replace(/\s+/g, '-')}" style="color: #D4AF37; text-decoration: none;">${loc}</a> &gt; 
          <span style="color: #1a1a1a;">${subject}</span>
        </nav>

        <section style="margin-bottom: 3rem;">
          <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #D4AF37; margin-bottom: 0.5rem; display: block;">Ranked #1 Architecture &amp; Interior Design Studio</span>
          <h1 style="font-size: 2.25rem; font-weight: 900; color: #1a1a1a; line-height: 1.2; margin-bottom: 1rem;">${h1}</h1>
          <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 1.5rem; max-width: 900px;">
            Delivering bespoke luxury turnkey residential and commercial architecture across ${loc}, Pune. Experience uncompromised craftsmanship, Vastu-compliant planning, and 45-day handover.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
            <a href="/contact" style="background: #D4AF37; color: #ffffff; padding: 0.875rem 1.75rem; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 0.875rem; display: inline-block;">Get Free 3D Design &amp; Quote</a>
            <a href="tel:+917020377693" style="border: 1px solid #1a1a1a; color: #1a1a1a; padding: 0.875rem 1.75rem; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 0.875rem; display: inline-block;">Direct Call: +91 70203 77693</a>
          </div>
          <div style="display: flex; gap: 2rem; flex-wrap: wrap; padding: 1rem 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; font-size: 0.875rem; color: #666;">
            <div><strong style="color: #1a1a1a;">4.9 ★★★★★</strong> (184 Verified Reviews)</div>
            <div><strong style="color: #1a1a1a;">45-Day</strong> Delivery Guarantee</div>
            <div><strong style="color: #1a1a1a;">10-Year</strong> Comprehensive Warranty</div>
            <div><strong style="color: #1a1a1a;">In-House</strong> Factory Pre-fabrication</div>
          </div>
        </section>

        <section style="margin-bottom: 3rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #1a1a1a; margin-bottom: 1rem;">Architectural Intelligence &amp; Spatial Philosophy in ${loc}</h2>
          <div style="font-size: 1rem; color: #333; line-height: 1.8;">
            ${dynamicCopy}
          </div>
        </section>

        <section style="margin-bottom: 3rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #1a1a1a; margin-bottom: 1rem;">2026 Turnkey Interior Design Pricing in ${loc}, Pune</h2>
          <p style="color: #666; margin-bottom: 1rem;">Fixed-price packages with zero surprise escalations, European hardware, and certified plywood:</p>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
              <thead>
                <tr style="background: #f7f7f7; border-bottom: 2px solid #ddd;">
                  <th style="padding: 0.75rem 1rem;">Typology</th>
                  <th style="padding: 0.75rem 1rem;">Scope of Execution</th>
                  <th style="padding: 0.75rem 1rem;">Material Grade</th>
                  <th style="padding: 0.75rem 1rem;">Estimated Package</th>
                  <th style="padding: 0.75rem 1rem;">Handover</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem 1rem; font-weight: 700;">2 BHK Interior</td>
                  <td style="padding: 0.75rem 1rem;">Living, Modular Kitchen, Master Bedroom, Guest Bedroom, False Ceiling</td>
                  <td style="padding: 0.75rem 1rem;">BWP Marine Ply + High Gloss Laminates + Hettich</td>
                  <td style="padding: 0.75rem 1rem; font-weight: 700; color: #D4AF37;">₹4.50 L – ₹8.50 L</td>
                  <td style="padding: 0.75rem 1rem;">35–45 Days</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem 1rem; font-weight: 700;">3 BHK Interior</td>
                  <td style="padding: 0.75rem 1rem;">Complete Turnkey, Acrylic Kitchen, 3 Bedrooms, TV Unit, Profile Lighting</td>
                  <td style="padding: 0.75rem 1rem;">HDHMR + Acrylic / PU Finish + Blum Soft-Close</td>
                  <td style="padding: 0.75rem 1rem; font-weight: 700; color: #D4AF37;">₹8.50 L – ₹17.50 L</td>
                  <td style="padding: 0.75rem 1rem;">45–55 Days</td>
                </tr>
                <tr>
                  <td style="padding: 0.75rem 1rem; font-weight: 700;">4 BHK / Villa Penthouse</td>
                  <td style="padding: 0.75rem 1rem;">Luxury Monograph, Italian Marble, Smart Automation, Walk-in Closets</td>
                  <td style="padding: 0.75rem 1rem;">Italian Statuario Marble + Natural Veneer + Automation</td>
                  <td style="padding: 0.75rem 1rem; font-weight: 700; color: #D4AF37;">₹18.00 L – ₹45.00 L+</td>
                  <td style="padding: 0.75rem 1rem;">60–75 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style="margin-bottom: 3rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #1a1a1a; margin-bottom: 1rem;">Frequently Asked Questions (FAQs)</h2>
          <div>${faqsHtml}</div>
        </section>

        <section style="background: #fafafa; padding: 2rem; border-radius: 8px; margin-bottom: 3rem;">
          <h2 style="font-size: 1.25rem; font-weight: 800; color: #1a1a1a; margin-bottom: 0.5rem;">Visit KS Design Studio Experience Center</h2>
          <p style="font-size: 0.875rem; color: #444; line-height: 1.8;">
            <strong>Studio Address:</strong> Office 623, Vision One Mall, Bhumkar Chowk, Wakad, Pune, Maharashtra 411057<br />
            <strong>Direct Phone:</strong> <a href="tel:+917020377693" style="color: #D4AF37; text-decoration: none; font-weight: 700;">+91 70203 77693</a> | 
            <strong>Email:</strong> <a href="mailto:contact@ksdesignstudio.in" style="color: #D4AF37; text-decoration: none;">contact@ksdesignstudio.in</a><br />
            <strong>Serving:</strong> ${loc}, Baner, Wakad, Hinjewadi, Kharadi, Koregaon Park, Aundh, Balewadi, and all prime Pune markets.
          </p>
        </section>

        <section style="border-top: 1px solid #e5e5e5; padding-top: 2rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: #1a1a1a; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">Explore Other Design Corridors &amp; Services</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem 0.75rem; font-size: 0.875rem;">
            ${crossLinksHtml}
          </div>
        </section>
      </main>

      <footer style="border-top: 1px solid #e5e5e5; padding-top: 1.5rem; text-align: center; font-size: 0.75rem; color: #888;">
        <p>&copy; 2026 KS Design Studio. All Rights Reserved. Principal Architect Komal Sharma | Wakad, Pune.</p>
      </footer>
    </div>
  `;
}

console.log(`Starting SEO Injection and Semantic Pre-rendering for ${routes.length} physical routes...`);
let count = 0;

routes.forEach(route => {
  if (route === '' || route === '/') return;

  const targetDir = path.join(publicDir, route);
  fs.mkdirSync(targetDir, { recursive: true });

  const details = formatRouteDetails(route);
  const { title, h1, subject, loc } = details;
  const desc = generateDynamicMeta(route, subject, loc);
  const fullUrl = `https://ksdesignstudio.in${route}`;
  const dynamicCopy = generateDynamicCopy(route, subject, loc);

  // Geo Coordinates
  const geo = GEO_COORDINATES[loc] || GEO_COORDINATES['Wakad'] || { lat: 18.598, lng: 73.763 };

  // 1. Core Meta Replacement
  let newHtml = baseHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );

  newHtml = newHtml.replace(
    /<meta name="description" content=".*?"\s*\/>/,
    `<meta name="description" content="${desc}" />`
  );

  // 2. OpenGraph Meta Replacement
  newHtml = newHtml.replace(
    /<meta property="og:title" content=".*?"\s*\/>/,
    `<meta property="og:title" content="${title}" />`
  );
  newHtml = newHtml.replace(
    /<meta property="og:description" content=".*?"\s*\/>/,
    `<meta property="og:description" content="${desc}" />`
  );
  newHtml = newHtml.replace(
    /<meta property="og:url" content=".*?"\s*\/>/,
    `<meta property="og:url" content="${fullUrl}" />`
  );

  // 3. Structured Data Injections
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ksdesignstudio.in" },
      { "@type": "ListItem", "position": 2, "name": loc, "item": `https://ksdesignstudio.in/interiors-in/${loc.toLowerCase().replace(/\s+/g, '-')}` },
      { "@type": "ListItem", "position": 3, "name": subject, "item": fullUrl }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InteriorDesign"],
    "name": `KS Design Studio - ${loc}`,
    "description": desc,
    "telephone": "+91 70203 77693",
    "url": fullUrl,
    "priceRange": "₹₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "623, Vision One Mall, Bhumkar Chowk",
      "addressLocality": "Wakad, Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.lat,
      "longitude": geo.lng
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "184",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Who are the best interior designers in ${loc}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `KS Design Studio is ranked among the premier interior designers in ${loc}, Pune, known for turnkey execution, German-engineered modular fittings, and 45-day handover.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the cost of 2 BHK and 3 BHK interior design in ${loc}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `In ${loc}, turnkey interior design for a 2 BHK apartment ranges from ₹4.50 Lakhs to ₹8.50 Lakhs. For a 3 BHK, packages range from ₹8.50 Lakhs to ₹17.50 Lakhs.`
        }
      },
      {
        "@type": "Question",
        "name": `What is included in KS Design Studio's turnkey interior service?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Turnkey interior service includes 3D VR design, civil alterations, electrical rewiring, plumbing, false ceiling, factory-fabricated modular woodwork with Blum/Hettich hardware, painting, and deep cleaning.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you provide Vastu-compliant interior design in ${loc}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, all our interior architecture and space planning projects are designed according to Vastu Shastra principles while maintaining a contemporary luxury aesthetic.`
        }
      }
    ]
  };

  const schemaScripts = `
  <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema)}
</script>
  <script type="application/ld+json">
${JSON.stringify(localBusinessSchema)}
</script>
  <script type="application/ld+json">
${JSON.stringify(faqSchema)}
</script>
</head>`;

  newHtml = newHtml.replace('</head>', schemaScripts);

  // 4. Canonical Tag Replacement
  const canonicalTag = `<link rel="canonical" href="${fullUrl}" />`;
  if (newHtml.includes('<link rel="canonical"')) {
    newHtml = newHtml.replace(/<link rel="canonical" href=".*?" \/>/, canonicalTag);
  } else {
    newHtml = newHtml.replace('</title>', `</title>\n  ${canonicalTag}`);
  }

  // 5. Pre-Rendered Semantic Body Injection into noscript (div#root remains clean for React 19 createRoot mount)
  const preRenderedBody = buildPreRenderedHTML(details, fullUrl, dynamicCopy);
  newHtml = newHtml.replace(
    /<div id="root">[\s\S]*?<\/div>(\s*<noscript>[\s\S]*?<\/noscript>)?/,
    `<div id="root"></div>\n  <noscript>${preRenderedBody}</noscript>`
  );

  fs.writeFileSync(path.join(targetDir, 'index.html'), newHtml, 'utf8');
  count++;
});

console.log(`✅ Injected SEO Metadata, OpenGraph, FAQ/Local Schema, and Full Semantic Pre-rendered Content into ${count} physical routes.`);
