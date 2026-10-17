import React from 'react';
import { MICRO_MARKETS } from '../../constants';
import { MapPin, ArrowRight, ShieldCheck, Star } from 'lucide-react';

const MarketDominance: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-[#85660D] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Presence Across Regions
          </span>
          <h2 className="text-5xl md:text-6xl text-charcoal mb-6 font-bold">
            Localized Mastery in <span className="italic text-zinc-500">Pune & Mumbai</span>
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg font-normal">
            Bringing elite interior architecture to the most selective gated communities and standalone bungalows in Western Pune, PCMC, and Mumbai’s premium coastal belts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Market Slot 1: PCMC Heart */}
          <div className="glass p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brass/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-2xl text-charcoal mb-4 flex items-center justify-between font-bold">
                PCMC Elite Hub
                <MapPin className="text-[#85660D]" size={20} />
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                Dominating the industrial and residential corridors of **Wakad, Ravet, and Hinjewadi**. We specialize in high-rise interior transformations for IT professionals and business leaders.
            </p>
            <ul className="space-y-3 mb-10">
                {['Wakad', 'Hinjewadi', 'Punawale', 'Ravet'].map((loc) => (
                    <li key={loc} className="flex items-center text-[11px] uppercase tracking-widest font-bold text-zinc-600 group-hover:text-charcoal transition-colors">
                        <ArrowRight size={12} className="mr-3 text-[#85660D]" />
                        {loc}
                    </li>
                ))}
            </ul>
            <div className="pt-6 border-t border-charcoal/5 flex items-center space-x-2 text-emerald-700">
                <ShieldCheck size={16} />
                <span className="text-[10px] uppercase font-black tracking-widest">Top Rated in PCMC</span>
            </div>
          </div>

          {/* Market Slot 2: Pune Premium West */}
          <div className="bg-white p-10 rounded-3xl relative overflow-hidden group text-charcoal shadow-2xl border border-slate-100">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brass/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-2xl mb-4 flex items-center justify-between font-bold">
                Pune Prime West
                <MapPin className="text-[#85660D]" size={20} />
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                The core of luxury living. Our work in **Baner, Aundh, and Balewadi** sets the benchmark for tectonic architecture in Pune’s most sophisticated neighborhoods.
            </p>
            <ul className="space-y-3 mb-10">
                {['Baner', 'Balewadi', 'Aundh', 'Pashan'].map((loc) => (
                    <li key={loc} className="flex items-center text-[11px] uppercase tracking-widest font-bold text-zinc-600 group-hover:text-charcoal transition-colors">
                        <ArrowRight size={12} className="mr-3 text-[#85660D]" />
                        {loc}
                    </li>
                ))}
            </ul>
            <div className="pt-6 border-t border-charcoal/5 flex items-center space-x-2 text-[#85660D]">
                <Star size={16} />
                <span className="text-[10px] uppercase font-black tracking-widest">#01 Interior Studio Pune</span>
            </div>
          </div>

          {/* Market Slot 3: Mumbai Premium Coastal */}
          <div className="glass p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brass/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-2xl text-charcoal mb-4 flex items-center justify-between font-bold">
                Mumbai Coastal Belt
                <MapPin className="text-[#85660D]" size={20} />
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                Translating architectural luxury for Mumbai’s elite coastal neighborhoods. From sea-facing apartments in **Juhu and Bandra** to the vertical silhouettes of **Worli**.
            </p>
            <ul className="space-y-3 mb-10">
                {['Bandra West', 'Juhu', 'Worli', 'Powai'].map((loc) => (
                    <li key={loc} className="flex items-center text-[11px] uppercase tracking-widest font-bold text-zinc-600 group-hover:text-charcoal transition-colors">
                        <ArrowRight size={12} className="mr-3 text-[#85660D]" />
                        {loc}
                    </li>
                ))}
            </ul>
            <div className="pt-6 border-t border-charcoal/5 flex items-center space-x-2 text-amber-700">
                <ShieldCheck size={16} />
                <span className="text-[10px] uppercase font-black tracking-widest">Premium Coastal Partner</span>
            </div>
          </div>
        </div>
        
        {/* SEO Keyword Cluster Footer */}
        <div className="mt-24 pt-12 border-t border-charcoal/5">
            <span className="text-[9px] uppercase tracking-[0.5em] font-black text-zinc-500 block mb-8 text-center">Localized Precision & Service Network</span>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {MICRO_MARKETS.map(loc => (
                    <span key={loc} className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 hover:text-[#85660D] cursor-pointer transition-colors">
                        {loc} Interior Solutions
                    </span>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default MarketDominance;
