import React from 'react';
import { GEO_COORDINATES } from '../../registry/seo_registry';

interface KnowledgeGraphProps {
  location?: string;
  service?: string;
  builder?: string;
  propertyType?: string;
  costEstimate?: string;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ location, service, builder, propertyType, costEstimate }) => {
  const SITE_URL = 'https://ksdesignstudio.in';
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#organization`,
    "name": "KS Design Studio",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "image": `${SITE_URL}/office-exterior.jpg`,
    "description": "Premium Turnkey Interior Design Studio in Pune specializing in luxury residences, villas, and commercial spaces.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "623, Vision One Mall, Bhumkar Chowk",
      "addressLocality": "Wakad, Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5996,
      "longitude": 73.7486
    },
    "telephone": "+91-7020377693",
    "priceRange": "₹₹₹₹",
    "areaServed": location ? {
      "@type": "City",
      "name": location
    } : [
      { "@type": "City", "name": "Pune" },
      { "@type": "City", "name": "Mumbai" }
    ],
    "sameAs": [
      "https://www.instagram.com/ksdesignstudiopune/",
      "https://www.facebook.com/ksdesignstudiopune/"
    ]
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      }
    ]
  };

  let position = 2;
  
  if (location) {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": position++,
      "name": `Interiors in ${location}`,
      "item": `${SITE_URL}/interiors-in/${location.toLowerCase().replace(/\s+/g, '-')}`
    });
  }

  if (builder) {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": position++,
      "name": builder,
      "item": `${SITE_URL}/builder/${builder.toLowerCase().replace(/\s+/g, '-')}`
    });
  }

  if (service) {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": position++,
      "name": service,
      "item": location 
        ? `${SITE_URL}/service/${location.toLowerCase().replace(/\s+/g, '-')}/${service.toLowerCase().replace(/\s+/g, '-')}`
        : `${SITE_URL}/services/${service.toLowerCase().replace(/\s+/g, '-')}`
    });
  }

  const schemas: any[] = [organizationSchema, breadcrumbList];

  // Specific Service or Property Schema for AI Engine Optimization
  if (service || propertyType) {
    const targetName = service || propertyType;
    const geo = location && GEO_COORDINATES[location] ? GEO_COORDINATES[location] : GEO_COORDINATES["Default"];
    
    schemas.push({
      "@context": "https://schema.org",
      "@type": ["Service", "ServiceAreaBusiness"],
      "serviceType": targetName,
      "provider": { "@id": `${SITE_URL}/#organization` },
      "areaServed": location ? { 
        "@type": "City", 
        "name": location,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": geo.lat,
          "longitude": geo.lng
        }
      } : { "@type": "City", "name": "Pune" },
      "offers": costEstimate ? {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "priceType": "https://schema.org/Minimum",
          "priceCurrency": "INR",
          "price": costEstimate
        }
      } : undefined
    });
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
  );
};

export default KnowledgeGraph;
