import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowRight, Star, Settings } from 'lucide-react';
import { generateDynamicCopy } from '../utils/copyEngine';

const ServiceLanding: React.FC = () => {
  const { serviceName } = useParams<{ serviceName: string }>();
  
  // Format service name for display
  const formattedService = serviceName?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Interior Design';
  
  // Generate deterministic dynamic copy based on URL
  const uniqueCopy = generateDynamicCopy(serviceName || 'default', formattedService);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is included in ${formattedService} services in Pune?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our ${formattedService} service includes comprehensive 3D visualization, material selection, custom fabrication, and turnkey execution managed by senior architects.`
        }
      },
      {
        "@type": "Question",
        "name": `How long does a ${formattedService} project take?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depending on the scale and complexity, execution typically ranges from 45 to 90 days from the design sign-off."
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
              <Settings size={16} />
              <span className="text-[10px] uppercase font-black tracking-[0.4em]">Expert Service Tier</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-charcoal leading-tight mb-8">
              Premium <br /> 
              <span className="italic">{formattedService}</span>
            </h1>
            <p className="text-charcoal/50 text-xl font-light leading-relaxed mb-10">
               {uniqueCopy}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-[#1A1A1A] text-white px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full hover:bg-brass transition-all shadow-lg">
                Request Proposal
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block w-[400px] h-[500px] rounded-[3rem] overflow-hidden relative glass-premium shadow-2xl skew-y-1">
             <img 
               src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" 
               alt={`${formattedService} Pune`} 
               className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
             <div className="absolute bottom-10 left-10">
                <p className="text-white text-xs uppercase font-black tracking-[0.5em]">{formattedService}</p>
             </div>
          </div>
        </div>

        {/* GEO/AEO Optimization Block */}
        <div className="glass-premium p-12 rounded-[3rem] border-white/40 shadow-xl mb-20 max-w-4xl">
          <h2 className="text-2xl mb-8">Intelligence: {formattedService} in Pune</h2>
          <div className="space-y-8">
             <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal mb-3">What is included in {formattedService}?</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">Our {formattedService} protocol encompasses end-to-end delivery. From raw spatial mapping and 3D architectural renders to procurement of Italian marble, bespoke lighting installations, and final handover. Everything is managed through our proprietary execution engine.</p>
             </div>
             <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal mb-3">Which materials are best for Pune's climate?</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">For {formattedService}, we mandate marine-grade plywood (BWR/BWP), anti-scratch acrylics, and PU coatings to resist Pune's monsoon humidity while maintaining a flawless luxury aesthetic year-round.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLanding;
