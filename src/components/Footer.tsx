import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram } from 'lucide-react';

import { SEO_LOCATIONS, SEO_SERVICES, BUYER_INTENT_KEYWORDS, BRAND_TRUST_KEYWORDS, SEO_COMPARISONS, AI_VOICE_SEARCH, ALL_PROJECTS } from '../registry/seo_registry';

const Footer: React.FC = () => {
  const regions = [
    {
      name: 'North',
      cities: ['Delhi', 'Gurgaon', 'Noida', 'Indore', 'Lucknow']
    },
    {
      name: 'South',
      cities: ['Bangalore', 'Hyderabad', 'Chennai', 'Kochi', 'Mysore']
    },
    {
      name: 'West',
      cities: ['Pune', 'Mumbai', 'Goa', 'Ahmedabad', 'Surat']
    },
    {
      name: 'East',
      cities: ['Kolkata', 'Bhubaneswar', 'Guwahati', 'Patna', 'Ranchi']
    }
  ];

  return (
    <footer className="bg-white text-charcoal pt-32 pb-16 border-t border-slate-100 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 architect-grid opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 mb-24">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black mb-8 tracking-tighter">
              KS <span className="text-brass italic">STUDIO.</span>
            </h3>
            <p className="text-zinc-600 text-base leading-relaxed mb-10 font-medium max-w-sm">
              As Pune's top-rated luxury interior designers, we deliver highly bespoke, turnkey architectural solutions. Specializing in 2 BHK, 3 BHK, and Villa interior design across <span className="text-charcoal font-bold">Pune, Mumbai, Indore, and Goa</span>, we combine Vastu compliance with state-of-the-art modular execution.
            </p>
            <div className="flex space-x-8 mb-12">
               {['Instagram', 'Facebook', 'LinkedIn'].map(social => (
                 <a key={social} href="#" className="text-[10px] uppercase tracking-[0.3em] font-black text-charcoal/50 hover:text-brass transition-colors">{social}</a>
               ))}
            </div>
            <div className="p-8 border border-charcoal/5 bg-slate-50/50 rounded-2xl">
               <span className="text-brass tracking-[0.5em] uppercase text-[9px] font-black block mb-3">Studio Headquarters & Design Lounge</span>
               <p className="text-charcoal text-sm font-bold leading-snug mb-1">623, Vision One Mall, Bhumkar Chowk, Wakad, Pune- 411057</p>
               <p className="text-zinc-500 text-[11px] font-medium mb-4">Top-Rated Interior Design Studio Nearby Wakad, Baner, Hinjawadi & West Pune</p>
               <a href="mailto:ksdesignstudiopune@gmail.com" className="text-sm font-medium hover:text-brass transition-colors block">ksdesignstudiopune@gmail.com</a>
               <a href="tel:+917020377693" className="mt-2 text-charcoal font-bold text-sm block hover:text-brass transition-colors">+91 70203 77693</a>
            </div>
          </div>
          
          {/* Links Clusters */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass mb-10">Offerings</h4>
              <ul className="space-y-4 text-[11px] text-charcoal/60 uppercase tracking-widest font-bold">
                <li><Link to="/modular" className="hover:text-brass transition-colors">Modular Kitchens</Link></li>
                <li><Link to="/portfolio" className="hover:text-brass transition-colors">Our Projects</Link></li>
                <li><Link to="/luxury" className="hover:text-brass transition-colors">Luxury Interiors</Link></li>
                <li><Link to="/renovations" className="hover:text-brass transition-colors">Home Renovations</Link></li>
                <li><Link to="/commercial" className="hover:text-brass transition-colors">Commercial</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass mb-10">Design Ideas</h4>
              <ul className="space-y-4 text-[11px] text-charcoal/60 uppercase tracking-widest font-bold">
                <li><Link to="/design-ideas/kitchen" className="hover:text-brass transition-colors">Kitchen</Link></li>
                <li><Link to="/design-ideas/living" className="hover:text-brass transition-colors">Living Room</Link></li>
                <li><Link to="/design-ideas/bedroom" className="hover:text-brass transition-colors">Bedroom</Link></li>
                <li><Link to="/design-ideas/wardrobe" className="hover:text-brass transition-colors">Wardrobe</Link></li>
                <li><Link to="/magazine" className="hover:text-brass transition-colors">Magazine</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass mb-10">Partners</h4>
              <ul className="space-y-4 text-[11px] text-charcoal/60 uppercase tracking-widest font-bold">
                <li><Link to="/partners" className="hover:text-brass transition-colors">Own a Franchise</Link></li>
                <li><Link to="/partners" className="hover:text-brass transition-colors">Partner Designer</Link></li>
                <li><Link to="/refer" className="hover:text-brass transition-colors">Refer a Friend</Link></li>
                <li><Link to="/careers" className="hover:text-brass transition-colors">Careers</Link></li>
                <li><Link to="/policies" className="hover:text-brass transition-colors">Policies</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass mb-10">Calculators</h4>
              <ul className="space-y-4 text-[11px] text-charcoal/60 uppercase tracking-widest font-bold">
                <li><Link to="/pricing" className="hover:text-brass transition-colors">Kitchen Estimate</Link></li>
                <li><Link to="/pricing" className="hover:text-brass transition-colors">Full Home Estimate</Link></li>
                <li><Link to="/pricing" className="hover:text-brass transition-colors">Wardrobe Estimate</Link></li>
                <li><Link to="/location" className="hover:text-brass transition-colors">Store Locator</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Design Laboratory Topics */}
        <div className="pt-20 border-t border-charcoal/5 mb-24">
           <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-charcoal/30 mb-12">Laboratory Perspectives</h4>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { title: 'Thematic Research', links: ['Japandi Flow', 'Modern Maratha Heritage', 'Industrial Luxe Logic', 'Biophilic Tectonics'] },
                { title: 'The Interior Code', links: ['Material Honesty', 'Spatial Flow Metrics', 'Lighting Architecture', 'Acoustic Sculpting'] },
                { title: 'Material Intelligence', links: ['Sourced Stones', 'Timber Hub', 'Brass Joinery', 'Neural Fabrics'] },
                { title: 'Studio Records', links: ['Laboratory Insights', 'Design Monographs', 'Process Documentation', 'Patron Journals'] }
              ].map(cluster => (
                <div key={cluster.title}>
                  <span className="text-[9px] uppercase tracking-widest font-black text-brass block mb-6">{cluster.title}</span>
                  <div className="flex flex-col space-y-3">
                    {cluster.links.map(link => (
                      <Link key={link} to="/laboratory" className="text-[10px] text-charcoal/60 hover:text-charcoal transition-colors uppercase tracking-wider">{link}</Link>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Enterprise SEO Internal Link Directory */}
        <div className="pt-20 pb-10 border-t border-charcoal/10 mb-10">
           <h4 className="text-[9px] uppercase tracking-[0.5em] font-black text-stone-600 mb-8">Service Areas & Micro-Market Directory</h4>
           <div className="flex flex-wrap gap-4">
             <Link to="/interiors-in/wakad" className="text-[9px] text-brass hover:text-charcoal uppercase tracking-widest font-black">
               Interior Designers in Wakad Pune
             </Link>
             <Link to="/services/interior-design-near-me" className="text-[9px] text-brass hover:text-charcoal uppercase tracking-widest font-black">
               Interior Design Nearby Me
             </Link>
             <Link to="/services/best-interior-designer-wakad" className="text-[9px] text-brass hover:text-charcoal uppercase tracking-widest font-black">
               Best Interior Designer in Wakad
             </Link>
             <Link to="/cost-guide/wakad" className="text-[9px] text-stone-700 hover:text-brass uppercase tracking-widest font-bold">
               Interior Cost in Wakad
             </Link>
             {SEO_LOCATIONS.west.slice(0, 15).map(loc => (
               <Link key={loc} to={`/cost-guide/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="text-[9px] text-stone-600 hover:text-brass uppercase tracking-widest font-bold">
                 Interior Cost in {loc}
               </Link>
             ))}
             {SEO_SERVICES.slice(0, 20).map(service => (
               <Link key={service} to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} className="text-[9px] text-stone-600 hover:text-brass uppercase tracking-widest font-bold">
                 {service} Designer Pune
               </Link>
             ))}
             {SEO_LOCATIONS.east.slice(0, 10).map(loc => (
               <Link key={loc} to={`/interiors-in/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="text-[9px] text-stone-600 hover:text-brass uppercase tracking-widest font-bold">
                 Best Interior Designer in {loc}
               </Link>
             ))}
             {BUYER_INTENT_KEYWORDS.slice(0, 15).map(intent => (
               <Link key={intent} to={`/services/${intent.toLowerCase().replace(/\s+/g, '-')}`} className="text-[9px] text-stone-600 hover:text-brass uppercase tracking-widest font-bold">
                 {intent}
               </Link>
             ))}
             {BRAND_TRUST_KEYWORDS.slice(0, 10).map(trust => (
               <Link key={trust} to={`/services/${trust.toLowerCase().replace(/\s+/g, '-')}`} className="text-[9px] text-stone-600 hover:text-brass uppercase tracking-widest font-bold">
                 {trust}
               </Link>
             ))}
             {ALL_PROJECTS.slice(0, 5).map((project, i) => (
               <Link key={i} to={`/interiors-at/${project.toLowerCase().replace(/\s+/g, '-')}`} className="text-[9px] text-stone-600 hover:text-brass uppercase tracking-widest font-bold">
                 Interiors for {project}
               </Link>
             ))}
             {SEO_COMPARISONS.slice(0, 5).map(comp => (
               <Link key={comp} to={`/compare/${comp.toLowerCase().replace(/\s+/g, '-')}`} className="text-[9px] text-stone-600 hover:text-brass uppercase tracking-widest font-bold">
                 {comp}
               </Link>
             ))}
             {AI_VOICE_SEARCH.slice(0, 5).map(ai => (
               <Link key={ai} to={`/services/${ai.toLowerCase().replace(/\s+/g, '-')}`} className="text-[9px] text-stone-600 hover:text-brass uppercase tracking-widest font-bold">
                 {ai}
               </Link>
             ))}
           </div>
        </div>

        {/* Global Bottom Bar */}
        <div className="pt-12 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="text-stone-600 text-[10px] uppercase tracking-[0.4em] font-bold">
              © {new Date().getFullYear()} KS DESIGN STUDIO GLOBAL
            </p>
            <div className="flex space-x-10 text-stone-700 text-[9px] uppercase tracking-[0.3em] font-black">
              <Link to="/privacy-policy" className="hover:text-brass transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-brass transition-colors">Terms of Service</Link>
              <a href="/sitemap.xml" className="hover:text-brass transition-colors">Sitemap</a>
            </div>
          </div>
          <p className="text-[9px] uppercase tracking-[0.6em] font-black text-stone-500">DECCAN_TECTONICS_V_5.2</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;