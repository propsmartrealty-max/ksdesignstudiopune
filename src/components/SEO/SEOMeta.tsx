import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOMeta: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Determine the base path and convert it into a readable title
    const path = location.pathname;
    let title = "KS Design Studio | Premium Interior Architects in Pune";
    let description = "Pune's premier interior architects specializing in premium residential and commercial spaces.";
    let image = "https://ksdesignstudio.in/assets/webp/hero_foyer-Dmv-Yoj7.webp";

    if (path.startsWith('/magazine/')) {
      // Magazine articles will set their own titles in their component if needed, 
      // but we can set a fallback here
      title = "Editorial Magazine | KS Design Studio";
      description = "Explore deep-dives into material honesty, design monographs, and patron journals.";
    } else if (path.startsWith('/services/')) {
      const serviceStr = path.split('/')[2]?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      title = `${serviceStr} | KS Design Studio Pune`;
      description = `Discover our ultra-premium ${serviceStr} services tailored for luxury residential and commercial projects.`;
    } else if (path.startsWith('/interiors-in/')) {
      const locStr = path.split('/')[2]?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      title = `Best Interior Designers in ${locStr} | KS Design Studio`;
      description = `Award-winning interior design services in ${locStr}, Pune. Specializing in luxury 3BHKs, villas, and turnkey projects.`;
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

  }, [location.pathname]);

  return null;
};

export default SEOMeta;
