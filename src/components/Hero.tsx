import heroFoyer from '../assets/images/hero_foyer.webp';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-[100dvh] h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-white pt-24 lg:pt-32">
      {/* LCP Element: High-priority, stable, eager-loaded image for instant Core Web Vitals LCP */}
      <img
        src={heroFoyer}
        alt="KS Design Studio Pune - Premium Luxury Interior Designers"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />
      <div className="absolute inset-0 architect-grid opacity-[0.05] z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/90 z-10" />
      
      <div className="relative z-30 text-center px-6 max-w-7xl">
        <div className="mb-10 inline-flex items-center space-x-4">
          <div className="h-[1px] w-8 bg-[#85660D]/40" />
          <span className="text-[#85660D] tracking-[0.6em] uppercase text-[10px] font-black">KS Design Studio — Premium Interior Designers</span>
          <div className="h-[1px] w-8 bg-[#85660D]/40" />
        </div>
        
        <h1 
          className="text-zinc-900 mb-10 leading-[1.1] tracking-tighter drop-shadow-sm font-black" 
          style={{ 
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' 
          }}
        >
          Designing the <span className="italic font-light text-zinc-600">Soul</span> <br /> 
          <span className="text-zinc-900">of Your </span> 
          <span className="italic font-light text-[#85660D]">Premium Homes.</span>
        </h1>
        
        <p className="text-zinc-700 max-w-4xl mx-auto mb-20 text-lg md:text-2xl font-medium leading-relaxed">
          As <span id="edge-visitor-city">Pune</span>'s top-rated <span className="text-zinc-900 font-bold tracking-wide">luxury interior designers</span>, we execute end-to-end turnkey architecture. Crafting <span id="edge-wealth-intent" className="text-zinc-900 font-bold tracking-wide">bespoke, A-grade home narratives</span> across Maharashtra. <span id="edge-sub-intent">We transform architectural volumes into personal sanctuaries through bespoke material sourcing, modular integration, and Vastu-compliant spatial planning.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <Link to="/portfolio" aria-label="View Our Projects" className="group relative px-20 py-7 overflow-hidden glass-dark shadow-2xl rounded-2xl hover:bg-brass transition-all duration-700">
            <span className="relative z-10 text-white uppercase tracking-[0.4em] text-[10px] font-black group-hover:text-white">View Our Projects</span>
          </Link>
          <Link to="/contact" aria-label="Book Free Consultation" className="px-20 py-7 glass-premium text-zinc-900 rounded-2xl border-white/40 uppercase tracking-[0.4em] text-[10px] font-black hover:bg-white transition-all duration-700 shadow-xl">Book Free Consultation</Link>
        </div>
      </div>
      
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-[8px] uppercase tracking-[0.5em] text-stone-600 font-black rotate-90 mb-8 translate-y-4">Scroll Down</span>
          <div className="w-px h-24 bg-gradient-to-b from-brass/0 via-brass/40 to-brass/0 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 border border-brass/20 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-6 -translate-y-1/2 z-20 hidden xl:flex flex-col space-y-8">
         {['BANER', 'WAKAD', 'AUNDH', 'KHARADI', 'KOTHRUD'].map((loc) => (
           <div key={loc} className="glass-premium px-2 py-6 rounded-full flex items-center justify-center shadow-xl border-white/30 backdrop-blur-xl">
             <span className="text-zinc-900 text-[8px] font-bold tracking-[0.4em] uppercase -rotate-90 origin-center whitespace-nowrap">{loc}</span>
           </div>
         ))}
      </div>
    </div>
  );
}