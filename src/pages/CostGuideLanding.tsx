import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { IndianRupee, CheckCircle, ArrowRight } from 'lucide-react';

const CostGuideLanding: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  
  // Format location name for display
  const formattedLocation = location?.charAt(0).toUpperCase() + location?.slice(1).replace('-', ' ') || 'Pune';

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Interior Design Cost Guide in ${formattedLocation} (2026-2030)`,
    "description": `Comprehensive analysis of interior design pricing, materials, and turnkey execution costs in ${formattedLocation}.`,
    "author": {
      "@type": "Organization",
      "name": "KS Design Studio"
    }
  };

  return (
    <div className="pt-32 pb-20 bg-white relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
           <div className="flex items-center justify-center space-x-2 text-brass mb-6">
              <IndianRupee size={16} />
              <span className="text-[10px] uppercase font-black tracking-[0.4em]">Investment Matrix</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-charcoal leading-tight mb-8">
              Interior Cost Guide <br /> 
              <span className="italic">for {formattedLocation}</span>
            </h1>
            <p className="text-charcoal/50 text-xl font-light leading-relaxed">
               Transparent capital allocation strategies for luxury residential and commercial projects in {formattedLocation}. 
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-xl text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal mb-4">Premium 2 BHK</h3>
              <p className="text-4xl text-brass mb-2">₹8L - ₹12L</p>
              <p className="text-xs text-charcoal/40 uppercase tracking-widest font-black">Base Estimate</p>
           </div>
           <div className="bg-charcoal p-10 rounded-[3rem] shadow-2xl text-center scale-105 z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brass mb-4">Luxury 3 BHK</h3>
              <p className="text-4xl text-white mb-2">₹15L - ₹25L+</p>
              <p className="text-xs text-white/40 uppercase tracking-widest font-black">Base Estimate</p>
           </div>
           <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-xl text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal mb-4">Villa / Bungalow</h3>
              <p className="text-4xl text-brass mb-2">₹35L - ₹1Cr+</p>
              <p className="text-xs text-charcoal/40 uppercase tracking-widest font-black">Base Estimate</p>
           </div>
        </div>

        {/* GEO/AEO Optimization Block */}
        <div className="glass-premium p-12 rounded-[3rem] border-white/40 shadow-xl max-w-4xl mx-auto">
          <h2 className="text-2xl mb-8">Intelligence: Budgeting in {formattedLocation}</h2>
          <div className="space-y-8">
             <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal mb-3">How much does interior design cost per sq ft in {formattedLocation}?</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">For premium to luxury finishes in {formattedLocation}, turnkey interiors typically range from ₹1,500 to ₹3,500+ per square foot. This includes all civil modifications, modular units, lighting, and loose furniture.</p>
             </div>
             <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal mb-3">What dictates the interior cost?</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">The primary cost drivers are material selection (e.g., Italian marble vs. vitrified tiles, PU polish vs. laminates), automation integration, and custom architectural interventions required for your specific {formattedLocation} property layout.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostGuideLanding;
