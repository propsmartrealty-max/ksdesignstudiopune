import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ALL_MUMBAI_LOCATIONS } from '../../registry/seo_registry';

const SEOMeta: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Determine the base path and convert it into a readable title
    const path = location.pathname;
    let title = "KS Design Studio | Top Luxury Interior Designers in Pune & Mumbai";
    let description = "KS Design Studio: #1 ranked luxury turnkey interior designers in Pune & Mumbai (Wakad Studio). Bespoke 2 BHK, 3 BHK, and Villa architecture with 45-day handover.";
    let image = "https://ksdesignstudio.in/assets/webp/hero_foyer-Dmv-Yoj7.webp";

    const isMumbaiLocation = (locStr: string) => {
      return ALL_MUMBAI_LOCATIONS.some(m => m.toLowerCase() === locStr.toLowerCase());
    };

    if (path.startsWith('/magazine/')) {
      title = "Architectural Journal & Design Insights | KS Design Studio";
      description = "Authoritative interior design monographs, cost benchmarks, material breakdowns, and case studies for Pune and Mumbai luxury homes.";
    } else if (path.startsWith('/services/')) {
      const serviceStr = path.split('/')[2]?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      title = `Best ${serviceStr} in Pune & Mumbai | KS Design Studio`;
      description = `Premier ${serviceStr} services across Pune and Mumbai. German CNC manufacturing, turnkey execution, 10-year warranty, and 45-day handover.`;
    } else if (path.startsWith('/interiors-in/')) {
      const locStr = path.split('/')[2]?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const city = isMumbaiLocation(locStr) ? 'Mumbai' : 'Pune';
      title = `Top #1 Interior Designers in ${locStr}, ${city} | KS Design Studio`;
      description = `Award-winning turnkey interior design in ${locStr}, ${city}. Specializing in luxury 2 BHK, 3 BHK, and Villa interiors with 45-day guaranteed handover.`;
    } else if (path.startsWith('/cost-guide/')) {
      const locStr = path.split('/')[2]?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const city = isMumbaiLocation(locStr) ? 'Mumbai' : 'Pune';
      title = `2026 Interior Design Cost in ${locStr}, ${city} | Pricing Calculator`;
      description = `Complete 2026 interior design cost guide for 2 BHK, 3 BHK, and luxury villas in ${locStr}, ${city}. Transparent pricing from ₹4.50 Lakhs.`;
    } else if (path.startsWith('/builder/')) {
      const builderStr = path.split('/')[2]?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      title = `Interior Designers for ${builderStr} Projects in Pune & Mumbai | KS Design Studio`;
      description = `Turnkey luxury interior design packages tailored for ${builderStr} residential developments across Pune and Mumbai.`;
    }

    // Update standard tags
    document.title = title;
    
    // Update or create Meta Tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('description', description);
    setMetaTag('keywords', 'interior design nearby me, interior designers in pune, interior designers in mumbai, best interior designer wakad pune, interior designers in bandra, interior designers in worli, interior designers in baner, interior designers in kharadi, interior designers in juhu, interior designers in thane, luxury home interior designers pune mumbai, 2 BHK interior design pune, 3 BHK interior design mumbai, turnkey interior designers');
    
    // Google Site Name & App Identification
    setMetaTag('og:site_name', 'KS Design Studio', true);
    setMetaTag('application-name', 'KS Design Studio');
    setMetaTag('apple-mobile-web-app-title', 'KS Design Studio');

    // Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:url', `https://ksdesignstudio.in${path}`, true);
    setMetaTag('og:type', 'website', true);

    // Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);
    
    // Aggressive Indexing Directives (Hardening)
    // Prevent indexing of vault or admin routes, encourage everything else
    if (path.startsWith('/admin') || path.startsWith('/vault')) {
      setMetaTag('robots', 'noindex, nofollow');
      setMetaTag('googlebot', 'noindex, nofollow');
    } else {
      setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMetaTag('googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMetaTag('bingbot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

  }, [location.pathname]);

  return null;
};

export default SEOMeta;
