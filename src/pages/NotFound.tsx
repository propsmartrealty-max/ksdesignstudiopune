import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "404 - Space Not Found | KS Design Studio";
    // Send a 404 signal to search engines by explicitly setting a noindex on error pages
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      <div className="text-center relative z-10">
        <Compass size={64} className="mx-auto text-brass mb-8 animate-spin-slow" />
        <h1 className="text-5xl md:text-8xl text-charcoal font-black tracking-tighter mb-6">
          Space <span className="italic font-light text-stone-400">Undefined.</span>
        </h1>
        <p className="text-xl text-zinc-500 font-medium mb-10 max-w-lg mx-auto">
          The architectural coordinates you are searching for do not exist in our current portfolio. 
        </p>
        <Link 
          to="/" 
          className="bg-[#1A1A1A] text-white px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full hover:bg-brass transition-all inline-block shadow-2xl"
        >
          Return to Sanctuary
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
