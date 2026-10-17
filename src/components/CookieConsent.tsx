import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ks_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ks_cookie_consent', 'granted');
    setIsVisible(false);
    
    // Google Consent Mode v2: Update consent state
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('ks_cookie_consent', 'denied');
    setIsVisible(false);

    // Keep Google Consent Mode v2 at denied
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      role="dialog"
      aria-modal="false"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-0 left-0 right-0 z-[999] bg-[#1A1A1A] border-t border-brass/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl transition-all duration-500 animate-fade-in"
    >
          <div className="flex-1 max-w-3xl">
            <h3 className="text-[#D4AF37] text-lg font-serif mb-2">We respect your privacy</h3>
            <p className="text-zinc-200 text-sm leading-relaxed font-sans">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with our <a href="/privacy-policy" className="text-[#D4AF37] hover:underline underline-offset-4 font-semibold">Privacy Policy</a>.
            </p>
          </div>
          <div className="flex flex-row gap-4 shrink-0 w-full md:w-auto">
            <button 
              onClick={handleDecline}
              aria-label="Decline non-essential cookies"
              className="flex-1 md:flex-none px-6 py-3 border border-zinc-400 text-zinc-100 hover:text-white hover:border-white transition-colors text-xs tracking-[0.2em] uppercase font-bold"
            >
              Decline
            </button>
            <button 
              onClick={handleAccept}
              aria-label="Accept all cookies"
              className="flex-1 md:flex-none px-6 py-3 bg-[#D4AF37] text-zinc-950 hover:bg-white hover:text-black transition-colors text-xs tracking-[0.2em] uppercase font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Accept All
            </button>
          </div>
    </div>
  );
};

export default CookieConsent;
