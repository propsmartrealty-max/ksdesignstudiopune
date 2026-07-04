import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { IndianRupee, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { generateDynamicCopy } from '../utils/copyEngine';

const CostGuideLanding: React.FC = () => {
  const { locationName } = useParams<{ locationName: string }>();
  
  // Format location name for display
  const formattedLocation = locationName?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Pune';

  // Generate deterministic dynamic copy based on URL
  const uniqueCopy = generateDynamicCopy(locationName || 'default', `Interior Cost Guide in ${formattedLocation}`);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the per square foot cost for interior design in ${formattedLocation}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `In ${formattedLocation}, premium interior design typically starts at ₹1,500 to ₹2,500 per sq.ft., while ultra-luxury finishes can range from ₹3,000 to ₹5,000+ per sq.ft.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does a modular kitchen cost in ${formattedLocation}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A high-end modular kitchen in ${formattedLocation} with premium hardware (like Blum or Hettich) and acrylic/PU finishes ranges from ₹2.5 Lakhs to ₹6 Lakhs.`
        }
      }
    ]
  };

  return (
    <div className="pt-32 pb-20 bg-white relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-brass mb-6">
              <TrendingUp size={16} />
              <span className="text-[10px] uppercase font-black tracking-[0.4em]">Investment Guide</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-charcoal leading-tight mb-8">
              Interior Cost Guide <br /> 
              <span className="italic">for {formattedLocation}</span>
            </h1>
            <p className="text-charcoal/50 text-xl font-light leading-relaxed mb-10">
               {uniqueCopy}
            </p>
          </div>
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
