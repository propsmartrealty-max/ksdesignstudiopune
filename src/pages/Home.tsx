import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import MasonryGallery from '../components/MasonryGallery';
import GuaranteeProtocol from '../components/GuaranteeProtocol';
import EliteCustomers from '../components/EliteCustomers';
import VisionLab from '../components/VisionLab';
import NeighborhoodIntel from '../components/NeighborhoodIntel';
import ContactComp from '../components/Contact';
import TrustRegistry from '../components/TrustRegistry';
import MarketDominance from '../components/SEO/MarketDominance';

// Lazy load below-the-fold interactive widgets to reduce unused JavaScript
const InvestmentEstimator = lazy(() => import('../components/InvestmentEstimator'));
const InteractiveQuiz = lazy(() => import('../components/InteractiveQuiz'));
const AIPaletteGenerator = lazy(() => import('../components/AIPaletteGenerator'));
const DesignLaboratory = lazy(() => import('../components/DesignLaboratory'));

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
            <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block mb-6">Complete Interior Setup</span>
            <h2 className="text-5xl md:text-7xl text-charcoal tracking-tighter leading-none mb-10">
              Premium interiors <br /> <span className="italic font-light text-brass/70">for every home.</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed text-lg">
              End-to-end interior design solutions, from precision modular kitchens to complete bungalow makeovers. 
              Delivering high-quality residential aesthetics across all elite micro-markets.
            </p>
          </div>
          <ServicesGrid />
        </div>
      </section>

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
          <Suspense fallback={<div className="h-64 rounded-3xl bg-slate-50/50 animate-pulse border border-slate-100" />}>
            <InteractiveQuiz />
          </Suspense>
        </div>
      </section>

      {/* Interactive Conversion: Investment Estimator */}
      <div id="estimator">
        <Suspense fallback={<div className="h-96 rounded-3xl bg-slate-50/50 animate-pulse border border-slate-100" />}>
          <InvestmentEstimator />
        </Suspense>
      </div>

      {/* Intelligence at Scale: The Studio Differentiation */}
      <section className="py-40 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 architect-grid opacity-5 w-1/2 h-full pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div>
                <span className="text-brass tracking-[0.5em] uppercase text-[10px] font-black block mb-6">Professional Spatial Planning</span>
                <h2 className="text-6xl md:text-8xl text-zinc-900 tracking-tighter leading-[0.9] mb-10 font-black">
                   Intelligence <span className="italic font-light text-zinc-400 font-medium">at Scale.</span>
                </h2>
                <VisionLab />
              </div>
              <div className="space-y-12">
                 <Suspense fallback={<div className="h-64 rounded-3xl bg-white/50 animate-pulse border border-slate-100" />}>
                   <AIPaletteGenerator />
                 </Suspense>
                 <NeighborhoodIntel />
                 <p className="text-zinc-400 font-medium text-lg leading-relaxed border-l-2 border-brass/20 pl-10 italic">
                   "We leverage professional spatial intelligence and curated local artisan networks to deliver premium living experiences in homes across the country."
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Design Intelligence Hub */}
      <section id="laboratory">
        <Suspense fallback={<div className="h-96 rounded-3xl bg-slate-50/50 animate-pulse border border-slate-100" />}>
          <DesignLaboratory />
        </Suspense>
      </section>

      <MarketDominance />

      <ContactComp />
    </div>
  );
}