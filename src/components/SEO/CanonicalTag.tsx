import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CanonicalTag: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://ksdesignstudio.in';
    
    // Strict anti-cannibalization logic:
    // 1. Strip trailing slashes
    // 2. Force lowercase
    // 3. Strip query params (handled by location.pathname naturally)
    
    let cleanPath = location.pathname.toLowerCase();
    
    // Remove trailing slash if present (unless it's the root)
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }

    // Handle legacy route redirects/canonicalization
    // E.g., if someone accesses /modular, we point canonical to /services/modular-kitchen
    if (cleanPath === '/modular') cleanPath = '/services/modular-kitchen';
    if (cleanPath === '/turnkey') cleanPath = '/services/turnkey-interiors';
    if (cleanPath === '/renovations') cleanPath = '/services/home-renovation';

    // Remove leading slash for template literal
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.slice(1);
    }
    
    const canonicalUrl = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;

    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    
    // Ensure we don't unnecessarily trigger DOM updates if it's the same
    if (link.getAttribute('href') !== canonicalUrl) {
      link.setAttribute('href', canonicalUrl);
    }

  }, [location.pathname]);

  return null;
};

export default CanonicalTag;
