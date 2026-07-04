import React from 'react';
import { Link } from 'react-router-dom';
import { MAGAZINE_ARTICLES } from '../registry/magazine_registry';
import { ArrowRight, BookOpen } from 'lucide-react';

const MagazineLanding: React.FC = () => {
  const featuredArticle = MAGAZINE_ARTICLES[0];
  const gridArticles = MAGAZINE_ARTICLES.slice(1);

  return (
    <div className="pt-32 pb-20 bg-[#F9F9F9] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 text-center border-b border-zinc-200 pb-16">
          <span className="text-brass font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">The Laboratory</span>
          <h1 className="text-6xl md:text-8xl text-[#1A1A1A] tracking-tighter uppercase font-black">
            The <span className="italic font-light text-zinc-400">Magazine.</span>
          </h1>
        </div>

        {/* Featured Editorial */}
        <div className="mb-24">
          <Link to={`/magazine/${featuredArticle.slug}`} className="group block relative overflow-hidden rounded-[2rem] aspect-[16/9] md:aspect-[21/9]">
            <img 
              src={featuredArticle.coverImage} 
              alt={featuredArticle.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-10 md:p-16">
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-brass text-white px-3 py-1 text-[8px] uppercase tracking-widest font-black rounded-sm">
                  {featuredArticle.category}
                </span>
                <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold">
                  {featuredArticle.readTime}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mb-4 group-hover:text-brass transition-colors duration-500">
                {featuredArticle.title}
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl hidden md:block">
                {featuredArticle.subtitle}
              </p>
            </div>
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {gridArticles.map((article, index) => {
            // Create an asymmetric masonry effect
            let colSpan = 'md:col-span-6';
            if (index === 0) colSpan = 'md:col-span-7';
            if (index === 1) colSpan = 'md:col-span-5';
            if (index === 2) colSpan = 'md:col-span-4';
            if (index === 3) colSpan = 'md:col-span-8';

            return (
              <Link key={article.id} to={`/magazine/${article.slug}`} className={`group block ${colSpan}`}>
                <div className="relative overflow-hidden rounded-[2rem] aspect-square md:aspect-[4/3] mb-6">
                  <img 
                    src={article.coverImage} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="pr-8">
                  <span className="text-brass text-[9px] uppercase tracking-[0.4em] font-black block mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl text-charcoal leading-tight mb-4 group-hover:text-brass transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-charcoal/50 text-sm leading-relaxed mb-6">
                    {article.subtitle}
                  </p>
                  <div className="flex items-center space-x-2 text-charcoal group-hover:text-brass transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold">Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-32 pt-20 border-t border-zinc-200 text-center">
           <BookOpen size={32} className="text-brass mx-auto mb-6 opacity-50" />
           <p className="text-[9px] uppercase tracking-[0.6em] font-black text-charcoal/30">End of Volume</p>
        </div>
      </div>
    </div>
  );
};

export default MagazineLanding;
