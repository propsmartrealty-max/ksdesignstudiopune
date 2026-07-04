import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CanonicalTag: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Construct the canonical URL based on the current pathname
    const baseUrl = 'https://ksdesignstudio.in';
    
    // In HashRouter, pathname gives the path after the hash. 
    // We want the canonical URL to represent the clean route.
    let cleanPath = location.pathname;
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.slice(1);
    }
    
    const canonicalUrl = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;

    // Find the existing canonical tag or create a new one
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

  }, [location.pathname]);

  return null;
};

export default CanonicalTag;
