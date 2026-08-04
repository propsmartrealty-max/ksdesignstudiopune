import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MAGAZINE_ARTICLES, MagazineArticle as ArticleType } from '../registry/magazine_registry';
import { ArrowLeft, Share2, BookmarkPlus, ChevronDown, CheckCircle, MapPin } from 'lucide-react';
import NotFound from './NotFound';
import BreadcrumbSchema from '../components/SEO/BreadcrumbSchema';

const MagazineArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundArticle = MAGAZINE_ARTICLES.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass"></div>
      </div>
    );
  }

  if (!article) {
    // If we finished loading but no article was found, redirect to our new 404 page
    return <NotFound />;
  }

  // Use a cinematic scroll effect for the header
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article className="bg-white min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Magazine', url: '/magazine' },
        { name: article.title, url: `/magazine/${article.slug}` }
      ]} />
      
      {/* Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "image": [article.coverImage],
          "datePublished": article.date,
          "author": [{
            "@type": "Organization",
            "name": article.author,
            "url": "https://ksdesignstudio.in"
          }]
        })}
      </script>

      {/* Cinematic Cover Image */}
      <div className="relative h-screen w-full overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
        </div>

        {/* Floating Nav */}
        <div className="absolute top-0 left-0 w-full z-10 p-6 lg:p-12 flex justify-between items-center pointer-events-auto">
          <Link to="/magazine" className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:bg-white hover:text-charcoal transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex space-x-4">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:bg-white hover:text-charcoal transition-colors">
              <Share2 size={20} />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:bg-white hover:text-charcoal transition-colors">
              <BookmarkPlus size={20} />
            </button>
          </div>
        </div>

        {/* Title Lockup */}
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 xl:px-24 pb-20">
           <div className="max-w-5xl">
             <div className="flex items-center space-x-6 mb-8 text-white/80">
                <span className="text-[10px] uppercase font-black tracking-widest bg-brass text-white px-4 py-1.5 rounded-sm">
                  {article.category}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{article.date}</span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{article.readTime}</span>
             </div>
             <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight leading-[1.1] mb-8">
               {article.title}
             </h1>
             <p className="text-xl md:text-3xl text-white/60 font-light max-w-3xl leading-relaxed">
               {article.subtitle}
             </p>
           </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-32 relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-brass/30" />
         
         <div className="prose prose-lg lg:prose-xl max-w-none prose-headings:font-medium prose-headings:text-charcoal prose-p:text-charcoal/80 prose-p:leading-relaxed prose-p:font-light">
            {/* The Drop Cap for the first paragraph */}
            {article.content.map((paragraph, idx) => {
              if (idx === 0) {
                return (
                  <p key={idx} className="first-letter:text-7xl first-letter:font-black first-letter:text-brass first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
                    {paragraph}
                  </p>
                );
              }

              // Insert the pull quote randomly (or fixed at index 1)
              if (idx === 1 && article.pullQuote) {
                return (
                  <React.Fragment key={idx}>
                    <p>{paragraph}</p>
                    <blockquote className="my-16 pl-8 border-l-4 border-brass">
                      <p className="text-3xl lg:text-4xl text-charcoal font-medium italic leading-snug">
                        "{article.pullQuote}"
                      </p>
                    </blockquote>
                  </React.Fragment>
                );
              }

              return <p key={idx}>{paragraph}</p>;
            })}
         </div>

         {/* SEO: Cost Breakdown (Topical Authority) */}
         {article.costBreakdown && article.costBreakdown.length > 0 && (
           <div className="mt-16 p-10 bg-slate-50 border border-slate-100 rounded-3xl">
             <h3 className="text-2xl text-charcoal mb-6">Investment Matrix</h3>
             <div className="space-y-4">
               {article.costBreakdown.map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center border-b border-charcoal/5 pb-4 last:border-0 last:pb-0">
                   <span className="text-charcoal/80 text-lg">{item.item}</span>
                   <span className="text-brass font-bold">{item.cost}</span>
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* SEO: FAQ Section (Topical Authority) */}
         {article.faqs && article.faqs.length > 0 && (
           <div className="mt-16">
             <h3 className="text-2xl text-charcoal mb-8">Frequently Asked Questions</h3>
             <div className="space-y-4">
               {article.faqs.map((faq, idx) => (
                 <details key={idx} className="group bg-white border border-slate-100 rounded-2xl cursor-pointer">
                   <summary className="flex justify-between items-center p-6 text-lg text-charcoal font-medium list-none">
                     {faq.question}
                     <span className="transition group-open:rotate-180">
                       <ChevronDown size={20} className="text-brass" />
                     </span>
                   </summary>
                   <div className="p-6 pt-0 text-charcoal/60 leading-relaxed">
                     {faq.answer}
                   </div>
                 </details>
               ))}
             </div>
           </div>
         )}

         {/* Tags & Meta */}
         <div className="mt-32 pt-16 border-t border-zinc-200">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center space-x-4">
               <span className="text-[9px] uppercase tracking-widest font-black text-charcoal/40">Tagged in:</span>
               <div className="flex flex-wrap gap-2">
                 {article.tags.map(tag => (
                   <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-charcoal/60 bg-zinc-100 px-4 py-2 rounded-full">
                     {tag}
                   </span>
                 ))}
               </div>
             </div>
             
             <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest font-black text-charcoal/40 block mb-1">Author</span>
                <span className="text-sm font-bold uppercase tracking-widest text-charcoal">{article.author}</span>
             </div>
           </div>
         </div>
         
         {/* Dynamic CTA Engine */}
         {(() => {
           // Helper to determine contextual links based on tags
           const normalizedTags = article.tags.map(t => t.toLowerCase());
           let bookLink = "/contact";
           let costLink = "/pricing";
           let locationName = "Pune";

           const locations = ["pune", "mumbai", "wakad", "baner", "balewadi", "ravet", "punawale", "bandra", "koregaon park", "hinjewadi"];
           const foundLoc = locations.find(loc => normalizedTags.some(tag => tag.includes(loc)));
           
           if (foundLoc) {
             locationName = foundLoc.charAt(0).toUpperCase() + foundLoc.slice(1);
             if (foundLoc !== "pune" && foundLoc !== "mumbai") {
                bookLink = `/interiors-in/${foundLoc.replace(' ', '-')}`;
                costLink = `/cost-guide/${foundLoc.replace(' ', '-')}`;
             }
           }

           if (normalizedTags.includes("villa") || normalizedTags.includes("bungalow")) {
              costLink = foundLoc && foundLoc !== "pune" ? `/cost/${foundLoc.replace(' ', '-')}/villa` : `/pricing`;
           } else if (normalizedTags.includes("3 bhk") || normalizedTags.includes("3bhk")) {
              costLink = foundLoc && foundLoc !== "pune" ? `/cost/${foundLoc.replace(' ', '-')}/3-bhk` : `/pricing`;
           }

           return (
             <div className="mt-20 p-12 bg-charcoal text-white border border-charcoal/5 rounded-3xl text-center relative overflow-hidden">
                <div className="absolute inset-0 architect-grid opacity-10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center space-x-2 text-brass mb-4">
                     <MapPin size={16} />
                     <span className="font-bold uppercase tracking-[0.4em] text-[10px]">Contextual Next Steps</span>
                  </div>
                  <h3 className="text-3xl mb-4">Transform your {locationName} residence.</h3>
                  <p className="text-white/60 mb-8 max-w-lg mx-auto">
                    Apply these architectural principles directly to your space. Our principal designers are available for a private consultation.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                     <Link to={bookLink} className="bg-brass text-white px-8 py-4 text-xs uppercase tracking-widest font-black rounded-full hover:bg-white hover:text-charcoal transition-colors w-full sm:w-auto">
                       Book Consultation in {locationName}
                     </Link>
                     <Link to={costLink} className="bg-transparent border border-white/20 text-white px-8 py-4 text-xs uppercase tracking-widest font-black rounded-full hover:border-brass transition-colors w-full sm:w-auto">
                       View Local Cost Guide
                     </Link>
                  </div>
                </div>
             </div>
           );
         })()}
      </div>
    </article>
  );
};

export default MagazineArticle;
