import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail, MapPin, Search, FolderHeart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Ideas', href: '/design-ideas' },
    { name: 'Projects', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Lab', href: '/laboratory', hideBelow2xl: true },
    { name: 'Tectonic', href: '/tectonic-series', hideBelow2xl: true }
  ];

  const utilityLinks = [
    { name: 'Cities', href: '/cities' },
    { name: 'Partner with Us', href: '/partners' },
    { name: 'Refer & Earn', href: '/refer' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed w-full z-[150] transition-all duration-500 pointer-events-none" aria-label="Main Navigation">
      {/* Layer 1: Top Utility Bar (Hides on scroll for focus) */}
      <div className={`hidden md:block w-full border-b transition-all duration-500 ${
        scrolled ? 'h-0 opacity-0 overflow-hidden border-transparent' : 'h-10 opacity-100 border-stone-200/80 bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-[1440px] mx-auto h-full flex justify-between items-center px-6 lg:px-12 pointer-events-auto">
          <div className="flex items-center space-x-8">
            {utilityLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                aria-label={`Go to ${link.name}`}
                className="text-[9px] uppercase tracking-[0.25em] font-black text-stone-600 hover:text-brass transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-6">
             <a href="tel:+917020377693" aria-label="Call for enquiry" className="text-[9px] uppercase tracking-[0.25em] font-black text-stone-800 hover:text-brass transition-colors">
               Enquiry: <span className="text-brass font-black">+91 70203 77693</span>
             </a>
             <div className="h-3 w-[1px] bg-stone-300" />
             <div className="flex space-x-4">
               <a href="https://www.instagram.com/ksdesignstudiopune/" aria-label="Visit Instagram Profile" target="_blank" rel="noopener noreferrer">
                 <Instagram size={13} className="text-stone-500 hover:text-brass transition-colors cursor-pointer" />
               </a>
               <a href="mailto:ksdesignstudiopune@gmail.com" aria-label="Send Email">
                 <Mail size={13} className="text-stone-500 hover:text-brass transition-colors cursor-pointer" />
               </a>
             </div>
          </div>
        </div>
      </div>

      {/* Layer 2: Primary Branding & Action Bar */}
      <div className={`w-full transition-all duration-500 ${
        scrolled 
          ? 'py-3.5 bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200/70' 
          : 'py-5 lg:py-6 bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 lg:px-12 pointer-events-auto relative">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center group relative whitespace-nowrap shrink-0 z-20">
            <div className="flex flex-col border-l-[3px] border-brass pl-4 transition-all duration-300 group-hover:pl-5">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter leading-none text-[#18181B]">
                KS <span className="text-brass drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">DESIGN</span>
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-[9px] tracking-[0.85em] uppercase font-extrabold text-stone-500">
                  STUDIO
                </span>
                <span className="w-1.5 h-1.5 bg-brass rounded-full animate-pulse shadow-[0_0_8px_#D4AF37]" />
              </div>
            </div>
          </Link>

          {/* Symmetrically Centered Navigation Pill */}
          <div className="hidden xl:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 pointer-events-auto">
            <div className="relative group p-[1px] rounded-full shadow-lg shadow-stone-900/5 transition-transform duration-300 hover:scale-[1.01]">
              {/* Subtle Luxury Outer Ring */}
              <div className="absolute inset-0 rounded-full border border-stone-200/90 group-hover:border-brass/40 transition-colors duration-500" />
              
              {/* High-Contrast Crisp Core */}
              <div className="relative flex items-center px-5 2xl:px-7 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-stone-200 shadow-sm">
                <div className="flex items-center space-x-5 2xl:space-x-7" role="menubar">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      role="menuitem"
                      aria-label={`Go to ${link.name}`}
                      className={`text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-300 relative group/link py-1 whitespace-nowrap ${
                        link.hideBelow2xl ? 'hidden 2xl:block' : ''
                      } ${
                        isActive(link.href) 
                          ? 'text-brass drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]' 
                          : 'text-stone-700 hover:text-stone-950'
                      }`}
                    >
                      {link.name}
                      <span className={`absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brass rounded-full transition-all duration-300 group-hover/link:w-3 ${isActive(link.href) ? 'w-3' : ''}`} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Hub (Right) */}
          <div className="hidden lg:flex items-center space-x-2.5 shrink-0 z-20">
            <Link 
              to="/contact" 
              aria-label="Book Session"
              className="text-[10px] uppercase tracking-[0.25em] font-black transition-all duration-300 px-5 py-2.5 rounded-full whitespace-nowrap shadow-md bg-[#18181B] text-white hover:bg-brass hover:text-white border border-stone-900"
            >
              Book Session
            </Link>

            {/* Vault Trigger */}
            <Link
              to="/vault"
              aria-label="Access Sovereign Vault"
              className="p-2.5 rounded-full transition-all duration-300 flex items-center group bg-white border border-stone-200 text-stone-700 hover:text-brass hover:border-brass/50 shadow-sm"
            >
              <FolderHeart size={15} className="group-hover:scale-110 transition-transform" />
            </Link>

            {/* Search Trigger */}
            <button 
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              aria-label="Open global search (Cmd+K)"
              className="p-2.5 rounded-full transition-all duration-300 flex items-center space-x-1.5 group bg-white border border-stone-200 text-stone-700 hover:text-stone-950 hover:border-brass/50 shadow-sm"
            >
              <Search size={15} className="group-hover:scale-110 transition-transform text-stone-600 group-hover:text-stone-900" />
              <span className="hidden xl:block text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">⌘K</span>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className="lg:hidden p-3 rounded-2xl transition-all duration-300 bg-[#18181B] text-white hover:bg-brass shadow-md border border-stone-800 z-20"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-charcoal z-[200] flex flex-col justify-center items-center transition-all duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
        <button 
          className="absolute top-8 right-8 text-white/40 p-4 hover:text-brass transition-all duration-500" 
          onClick={() => setIsOpen(false)}
          aria-label="Close mobile navigation menu"
        >
          <X size={32} strokeWidth={1} />
        </button>
        
        <div className="space-y-10 text-center relative z-10 w-full px-8 overflow-y-auto max-h-[80vh]">
          <span className="text-brass tracking-[1em] uppercase text-[9px] font-black block mb-6 opacity-60">Premium Interiors</span>
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-3xl  transition-all duration-700 hover:tracking-[0.1em] ${
                isActive(link.href) ? 'text-brass italic' : 'text-white hover:text-brass'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-8 grid grid-cols-2 gap-4">
             {utilityLinks.map((link) => (
               <Link key={link.name} to={link.href} className="text-[10px] text-white/80 uppercase tracking-widest hover:text-brass">{link.name}</Link>
             ))}
          </div>
          
          <div className="pt-10 flex flex-col items-center space-y-6">
             <Link to="/contact" className="w-full bg-brass text-white py-6 rounded-xl uppercase tracking-[0.3em] font-black text-xs">Book Free Session</Link>
             <div className="flex space-x-10">
               <Instagram size={24} className="text-white/20 hover:text-brass transition-all" />
               <Mail size={24} className="text-white/20 hover:text-brass transition-all" />
             </div>
             <p className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-black">KS DESIGN STUDIO PUNE</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;