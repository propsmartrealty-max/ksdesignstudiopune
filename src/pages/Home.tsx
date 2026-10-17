import React, { Suspense } from 'react';
import Hero from '../components/Hero';
import EliteCustomers from '../components/EliteCustomers';
import ServicesGrid from '../components/ServicesGrid';

// Lazy-load heavy below-the-fold modules to keep initial bundle ultra-lean
const MasonryGallery = React.lazy(() => import('../components/MasonryGallery'));
const TrustRegistry = React.lazy(() => import('../components/TrustRegistry'));
const GuaranteeProtocol = React.lazy(() => import('../components/GuaranteeProtocol'));
const InteractiveQuiz = React.lazy(() => import('../components/InteractiveQuiz'));
const InvestmentEstimator = React.lazy(() => import('../components/InvestmentEstimator'));
const VisionLab = React.lazy(() => import('../components/VisionLab'));
const AIPaletteGenerator = React.lazy(() => import('../components/AIPaletteGenerator'));
const NeighborhoodIntel = React.lazy(() => import('../components/NeighborhoodIntel'));
const DesignLaboratory = React.lazy(() => import('../components/DesignLaboratory'));
const MarketDominance = React.lazy(() => import('../components/SEO/MarketDominance'));
const ContactComp = React.lazy(() => import('../components/Contact'));

export default function Home() {
  return (
    <div className="bg-white space-y-0 relative">
      <Hero />
      
      {/* Social Proof: Elite Registers */}
      <div id="social-proof" className="relative z-10 -mt-20">
        <EliteCustomers />
      </div>

      {/* Primary Offerings: The 4 Pillars */}
      <section className="py-32 bg-white px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-24">
            <span className="text-[#85660D] tracking-[0.6em] uppercase text-[10px] font-black block mb-6">Complete Interior Setup</span>
            <h2 className="text-5xl md:text-7xl text-charcoal tracking-tighter leading-none mb-10">
              Premium interiors <br /> <span className="italic font-light text-[#85660D]">for every home.</span>
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed text-lg">
              End-to-end interior design solutions, from precision modular kitchens to complete bungalow makeovers. 
              Delivering high-quality residential aesthetics across <span id="edge-visitor-city" className="font-bold text-[#85660D]">Maharashtra</span>.
            </p>
          </div>
          <ServicesGrid />
        </div>
      </section>

      <Suspense fallback={<div className="py-20 flex justify-center"><div className="w-8 h-8 rounded-full border-2 border-[#85660D] border-t-transparent animate-spin" /></div>}>
        {/* Visual Inspiration: Design Ideas */}
        <div id="design-ideas">
          <MasonryGallery />
        </div>

        {/* Trust Registry & Guarantees */}
        <div id="trust-protocol">
          <TrustRegistry />
          <GuaranteeProtocol />
        </div>

        {/* Interactive Conversion: Design DNA Quiz */}
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <InteractiveQuiz />
          </div>
        </section>

        {/* Interactive Conversion: Investment Estimator */}
        <div id="estimator">
          <InvestmentEstimator />
        </div>

        {/* Intelligence at Scale: The Studio Differentiation */}
        <section className="py-40 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 architect-grid opacity-5 w-1/2 h-full pointer-events-none" />
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div>
                  <span className="text-[#85660D] tracking-[0.5em] uppercase text-[10px] font-black block mb-6">Professional Spatial Planning</span>
                  <h2 className="text-6xl md:text-8xl text-zinc-900 tracking-tighter leading-[0.9] mb-10 font-black">
                     Intelligence <span className="italic font-light text-zinc-500 font-medium">at Scale.</span>
                  </h2>
                  <VisionLab />
                </div>
                <div className="space-y-12">
                   <AIPaletteGenerator />
                   <NeighborhoodIntel />
                   <p className="text-zinc-600 font-medium text-lg leading-relaxed border-l-2 border-[#85660D]/30 pl-10 italic">
                     "We leverage professional spatial intelligence and curated local artisan networks to deliver premium living experiences in homes across the country."
                   </p>
                </div>
             </div>
          </div>
        </section>

        {/* Design Intelligence Hub */}
        <section id="laboratory">
          <DesignLaboratory />
        </section>

        <MarketDominance />

        <ContactComp />
      </Suspense>
    </div>
  );
}