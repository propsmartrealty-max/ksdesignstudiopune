import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowRight, Building2, ShieldCheck, Grid } from 'lucide-react';
import { BUILDERS } from '../registry/seo_registry';
import SEOClusterLinks from '../components/SEO/SEOClusterLinks';

const BuilderLanding: React.FC = () => {
  const { builderName } = useParams<{ builderName: string }>();
  
  // Format builder name for display
  const formattedBuilder = builderName?.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Premium Developer';

  // Find associated projects
  const matchedBuilderKey = Object.keys(BUILDERS).find(k => k.toLowerCase().includes(formattedBuilder.toLowerCase())) || Object.keys(BUILDERS)[0];
  const associatedProjects = BUILDERS[matchedBuilderKey] || [];

  return (
    <div className="pt-32 pb-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-16">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-brass mb-6">
              <Building2 size={16} />
              <span className="text-[10px] uppercase font-black tracking-[0.4em]">Developer Interior Protocol</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-[#1A1A1A] leading-none tracking-tighter mb-8 font-black">
              Interiors for <br /> 
              <span className="italic font-light text-zinc-400">{formattedBuilder}.</span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed mb-10 max-w-xl">
               Calibrating high-fidelity interior monographs for the distinctive architectural silhouettes of {formattedBuilder} developments. We bring specialized design protocols tailored to their structural nuances.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-[#1A1A1A] text-white px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full hover:bg-brass transition-all shadow-2xl">
                Book Consultation
              </Link>
              <Link to="/pricing" className="glass-premium px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full border-zinc-200/40 hover:border-brass transition-all">
                Cost Estimator
              </Link>
            </div>
          </div>
          
          <div className="flex-grow aspect-video lg:aspect-square max-w-xl bg-zinc-100 rounded-[4rem] relative overflow-hidden shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200" 
               alt={`${formattedBuilder} Interiors`} 
               className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
             <div className="absolute bottom-10 left-10">
                <span className="text-brass text-[10px] uppercase font-black tracking-[0.5em] block mb-2">Developer Expertise</span>
                <p className="text-white text-3xl font-black tracking-tighter">{formattedBuilder}</p>
             </div>
          </div>
        </div>

        {/* Builder Projects Sub-Silo */}
        <div className="mb-32">
          <div className="flex items-center space-x-2 text-brass mb-8">
            <Grid size={16} />
            <h2 className="text-[12px] uppercase font-black tracking-[0.3em] text-[#1A1A1A]">Notable {formattedBuilder} Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {associatedProjects.map((project, idx) => (
              <Link 
                key={idx} 
                to={`/interiors-at/${project.toLowerCase().replace(/\s+/g, '-')}`}
                className="glass-premium p-8 rounded-3xl border border-zinc-100 hover:border-brass/30 transition-all group flex items-center justify-between"
              >
                <span className="font-bold text-[#1A1A1A] group-hover:text-brass transition-colors">{project}</span>
                <ArrowRight size={16} className="text-zinc-400 group-hover:text-brass group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Builder Specific USPs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="glass-premium p-12 rounded-[3.5rem] border-white/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <ShieldCheck size={120} />
            </div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-6 tracking-tighter">Zero-Violation Execution</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-8 max-w-md">
               We strictly adhere to the civil protocols and society guidelines set by {formattedBuilder}. Our turnkey management ensures no structural violations, safeguarding your property warranties.
            </p>
            <ul className="space-y-4">
              {['Seamless Handover Integration', 'Civil Guideline Compliance', 'Approved Material Specs'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest">
                  <CheckCircle size={14} className="text-brass" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1A1A1A] p-12 rounded-[3.5rem] text-white flex flex-col justify-between group cursor-pointer hover:bg-brass transition-all duration-700">
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tighter">New Possession?</h3>
              <p className="text-white/40 text-sm mb-12 italic leading-relaxed">
                If you have recently acquired or are awaiting handover of your {formattedBuilder} property, secure our design-build pipeline early.
              </p>
            </div>
            <Link to="/contact" className="flex items-center space-x-4">
               <span className="text-[11px] uppercase font-black tracking-[0.5em]">Initiate Brief</span>
               <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <SEOClusterLinks currentBuilder={formattedBuilder} />
    </div>
  );
};

export default BuilderLanding;
