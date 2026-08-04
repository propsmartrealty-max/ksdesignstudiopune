import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO_LOCATIONS, SEO_PROPERTY_TYPES, PUNE_NEIGHBORHOOD_USPS, GEO_COORDINATES } from '../registry/seo_registry';
import { MapPin, CheckCircle, ArrowRight, Star, Map as MapIcon } from 'lucide-react';
import { generateDynamicCopy } from '../utils/copyEngine';
import SEOClusterLinks from '../components/SEO/SEOClusterLinks';
import KnowledgeGraph from '../components/SEO/KnowledgeGraph';
import BreadcrumbSchema from '../components/SEO/BreadcrumbSchema';

const LocationLanding: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  
  // Format location name for display
  const formattedLocation = location?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Pune';
  
  const neighborhoodUSP = PUNE_NEIGHBORHOOD_USPS[formattedLocation];
  const uniqueCopy = generateDynamicCopy(location || 'pune', `Interior Design in ${formattedLocation}`, formattedLocation);
  
  const geo = GEO_COORDINATES[formattedLocation] || GEO_COORDINATES["Default"];

  // Removed hardcoded breadcrumb in favor of component
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "KS Design Studio",
    "image": "https://ksdesignstudio.in/logo.png",
    "description": uniqueCopy,
    "areaServed": {
      "@type": "City",
      "name": formattedLocation
    },
    "telephone": "+91-9876543210",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": formattedLocation,
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  };

  const navigate = useNavigate();

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const href = target.getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    }
  };

  return (
    <div className="pt-32 pb-20 bg-white relative overflow-hidden" itemScope itemType="https://schema.org/LocalBusiness">
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Locations', url: '/portfolio' },
        { name: `Interior Designers in ${formattedLocation}`, url: window.location.pathname }
      ]} />
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <KnowledgeGraph location={formattedLocation} />
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-brass mb-6">
              <MapPin size={16} />
              <span className="text-[10px] uppercase font-black tracking-[0.4em]">Curated Design Laboratory</span>
            </div>
            <h1 className="text-5xl md:text-7xl  text-charcoal leading-tight mb-8" itemProp="name">
              Best Interior Designer <br /> 
              <span className="italic">in {formattedLocation}</span>
            </h1>
            <div 
              className="text-charcoal/50 text-xl font-light leading-relaxed mb-10"
              dangerouslySetInnerHTML={{ __html: uniqueCopy }}
              onClick={handleContentClick}
            />
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-[#1A1A1A] text-white px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full hover:bg-brass transition-all shadow-lg">
                Book Consultation
              </Link>
              <Link to="/portfolio" className="glass-premium px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full border-zinc-200/40 hover:border-brass transition-all">
                View Gallery
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block w-[400px] h-[500px] rounded-[3rem] overflow-hidden relative glass-premium shadow-2xl skew-y-1">
             <img 
               src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200" 
               alt={`${formattedLocation} Interiors`} 
               className="w-full h-full object-cover opacity-80"
               loading="lazy"
               decoding="async"
               width="1200"
               height="800"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
             <div className="absolute bottom-10 left-10">
                <p className="text-white text-xs uppercase font-black tracking-[0.5em]">{formattedLocation} Profile</p>
             </div>
          </div>
        </div>

        {/* Hyper-Local SEO Content Cluster */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-xl">
            <h3 className="text-xl  mb-6">Service Excellence</h3>
            <ul className="space-y-4">
              {['2 BHK Design Packages', 'Luxury 3BHK Transformations', 'Turnkey Villa Interiors', 'Vastu Compliant Layouts'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-xs font-bold text-charcoal/40 uppercase tracking-widest">
                  <CheckCircle size={14} className="text-brass" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-xl">
            <h3 className="text-xl  mb-6">Technical Rigor</h3>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-8">
               {neighborhoodUSP 
                 ? `${neighborhoodUSP} Our ${formattedLocation} studio leverages professional design intelligence to calibrate these unique spatial conditions.`
                 : `Our ${formattedLocation} studio leverages professional design intelligence to optimize every square foot of your property, ensuring material longevity and aesthetic authority.`}
            </p>
            <div className="flex items-center space-x-2 text-sage">
               <Star size={14} fill="currentColor" />
               <span className="text-[10px] font-black uppercase tracking-widest">#01 in {formattedLocation}</span>
            </div>
          </div>

          <div className="bg-charcoal p-10 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <MapIcon size={80} />
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-xl  mb-6 text-brass italic">Local Intelligence</h3>
              <p className="text-white/40 text-xs mb-8 italic flex-grow">Designing sanctuaries in {formattedLocation}’s fastest growing residential hubs with biophilic flow and high-fidelity textures.</p>
              
              <div className="w-full h-32 rounded-xl overflow-hidden mb-6 opacity-80 hover:opacity-100 transition-opacity">
                <iframe 
                  src={`https://www.google.com/maps?q=${geo.lat},${geo.lng}&hl=en&z=14&output=embed`}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`KS Design Studio Serving ${formattedLocation}`}
                />
              </div>

              <Link to="/contact" className="flex items-center space-x-3 group mt-auto">
                 <span className="text-[10px] uppercase font-black tracking-[0.5em] group-hover:text-brass transition-colors">Book Consult</span>
                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ & People Also Ask Section for SEO Dominance */}
        <div className="mb-32">
          <h2 className="text-3xl text-charcoal mb-10">Frequently Asked Questions about Interiors in {formattedLocation}</h2>
          <div className="space-y-6">
            {[
              {
                q: `How much does interior design cost in ${formattedLocation}?`,
                a: `The cost of interior design in ${formattedLocation} typically ranges from ₹800 to ₹2500 per sq.ft depending on the scope of work, material finishes, and luxury elements chosen. A standard 3BHK premium transformation starts around ₹15 Lakhs.`
              },
              {
                q: `Do you provide turnkey interior solutions in ${formattedLocation}?`,
                a: `Yes, we are end-to-end turnkey interior contractors. From civil modifications, plumbing, and false ceiling to custom modular furniture and styling, our ${formattedLocation} team manages the entire project lifecycle.`
              },
              {
                q: `How long does an interior project take in ${formattedLocation}?`,
                a: `For a standard apartment in ${formattedLocation}, our timeline is strictly 45 to 90 days from the design sign-off, facilitated by our automated in-house manufacturing units.`
              }
            ].map((faq, i) => (
              <div key={i} className="glass-premium p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-charcoal mb-3">{faq.q}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          {/* Dynamic FAQ Schema Injection */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `How much does interior design cost in ${formattedLocation}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `The cost of interior design in ${formattedLocation} typically ranges from ₹800 to ₹2500 per sq.ft depending on the scope of work, material finishes, and luxury elements chosen.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `Do you provide turnkey interior solutions in ${formattedLocation}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, we are end-to-end turnkey interior contractors. From civil modifications, plumbing, and false ceiling to custom modular furniture and styling, our ${formattedLocation} team manages the entire project lifecycle.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `How long does an interior project take in ${formattedLocation}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `For a standard apartment in ${formattedLocation}, our timeline is strictly 45 to 90 days from the design sign-off, facilitated by our automated in-house manufacturing units.`
                  }
                }
              ]
            })}
          </script>
        </div>

        {/* Long-Tail Dominance Section */}
        <div className="pt-20 border-t border-charcoal/5">
          <span className="text-annotation block mb-12">Programmatic SEO Clusters // {formattedLocation}</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
             {SEO_PROPERTY_TYPES.slice(0, 8).map((type, i) => {
               const searchStr = type.replace('Pune', formattedLocation);
               const linkPath = `/services/${searchStr.toLowerCase().replace(/\s+/g, '-')}`;
               return (
                 <Link key={i} to={linkPath} className="group cursor-pointer">
                   <p className="text-[11px] font-bold text-charcoal/40 uppercase tracking-widest group-hover:text-brass transition-colors truncate">
                     {searchStr}
                   </p>
                   <div className="h-[1px] w-0 bg-brass transition-all duration-500 group-hover:w-full mt-2" />
                 </Link>
               );
             })}
          </div>
        </div>
      </div>
      <SEOClusterLinks currentLocation={formattedLocation} />
    </div>
  );
};

export default LocationLanding;
