import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MAGAZINE_ARTICLES, MagazineArticle as ArticleType } from '../registry/magazine_registry';
import { ArrowLeft, Share2, BookmarkPlus } from 'lucide-react';
import NotFound from './NotFound';

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
      </div>
    </article>
  );
};

export default MagazineArticle;
