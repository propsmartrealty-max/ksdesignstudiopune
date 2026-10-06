import React from 'react';
import { PROJECTS, SERVICES } from '../../constants';

const Schema: React.FC = () => {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InteriorDesign"],
    "name": "KS Design Studio",
    "description": "KS Design Studio is Pune's premier interior designing company, specializing in luxury turnkey residential and commercial architecture. We deliver bespoke 2 BHK, 3 BHK, and Villa interior solutions across Baner, Wakad, Kharadi, and Koregaon Park, combining modern aesthetics, Vastu-compliance, and unparalleled spatial planning.",
    "slogan": "Designing the Soul of Your Premium Homes in Pune",
    "knowsAbout": [
      "Interior Designing in Pune",
      "Luxury Turnkey Interiors",
      "Modular Kitchen Designers",
      "2 BHK and 3 BHK Interior Design Packages",
      "Villa Renovation and Architecture",
      "Commercial Interior Decorators",
      "Vastu-Compliant Interior Planning",
      "Bespoke Furniture and Material Sourcing",
      "Smart Home Automation Integration"
    ],
    "url": "https://ksdesignstudio.in",
    "logo": "https://ksdesignstudio.in/icon-512.png",
    "image": [
      "https://ksdesignstudio.in/assets/webp/hero_foyer-Dmv-Yoj7.webp",
      "https://ksdesignstudio.in/assets/webp/ks_tectonic_kitchen-YGXuzWPL.webp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-70203-77693",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Marathi"]
    },
    "priceRange": "₹₹₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    },
    "founder": {
      "@type": "Person",
      "name": "Komal Sharma",
      "jobTitle": "Principal Architect",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Sir J.J. College of Architecture"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": "KS Design Studio Global"
    },
    "telephone": "+91 70203 77693",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "623, Vision One Mall, Bhumkar Chowk",
      "addressLocality": "Wakad, Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "City", "name": "Pune" },
      { "@type": "City", "name": "Mumbai" },
      { "@type": "City", "name": "Pimpri-Chinchwad" },
      // Micro-locations - West
      "Baner", "Balewadi", "Aundh", "Wakad", "Hinjewadi", "Pashan", "Bavdhan", "Kothrud", "Warje", "Sus",
      // Central
      "Shivajinagar", "Deccan", "Model Colony", "Sadashiv Peth", "Erandwane",
      // East
      "Kharadi", "Viman Nagar", "Wagholi", "Magarpatta", "Hadapsar", "Mundhwa", "Keshav Nagar",
      // South
      "Kondhwa", "NIBM Road", "Undri", "Pisoli", "Bibwewadi",
      // North
      "Pimpri", "Chinchwad", "Akurdi", "Nigdi", "Ravet", "Tathawade"
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.598,
      "longitude": 73.763
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/ksdesignstudiopune/",
      "https://www.facebook.com/ksdesignstudiopune/",
      "https://www.google.com/maps?sca_esv=f2a7ccf26385c224&hl=en&biw=1440&bih=778&output=search&q=ks+design+studio&source=lnms&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8cQAAwka5J92rwZWDkn1wAD32kXDVSBwjf6cTOeLVB2-qkztBwHLa5-dxplkZyiGjBBZR3WsDzeKSmW1ZOavIYwnr36x9SORw1EP5ROMtPycGXb5gs4R6ea18NoB6OHpK3CIKm67zX0ez8DGyCUY8LM2TOSq1a9Feck7GqHw7OvGRiIvM6fBJaKNmqayC3Vc937C7VuA&entry=mc&ved=1t:200715&ictx=111"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "184",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Priyanka Desai" },
        "datePublished": "2024-03-12",
        "reviewBody": "KS Design Studio provided the most luxurious modular kitchen and turnkey interior design for our 3 BHK in Wakad. Highly recommended!",
        "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Rahul Sharma" },
        "datePublished": "2024-01-22",
        "reviewBody": "Best interior designers in Pune! They customized our master bedroom and living room with premium furniture and false ceiling exactly as we wanted.",
        "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1" }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Design Services",
      "itemListElement": SERVICES.map((service, index) => ({
        "@type": "OfferCatalog",
        "name": service.title,
        "itemListElement": service.details.map(detail => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": detail
          }
        }))
      }))
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Luxury Modular Kitchen",
          "description": "Customized premium modular kitchen with Hettich/Blum hardware, acrylic finish, and built-in appliances.",
          "category": "Furniture > Kitchen Furniture",
          "brand": { "@type": "Brand", "name": "KS Design Studio" }
        },
        "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "INR", "minPrice": "200000" }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Bespoke L-Shape Sofa Set",
          "description": "Custom upholstered luxury L-Shape sofa set crafted for modern living rooms.",
          "category": "Furniture > Sofas",
          "brand": { "@type": "Brand", "name": "KS Design Studio" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Sliding Glass Wardrobe",
          "description": "Premium floor-to-ceiling sliding wardrobe with tinted glass and sensor LED lighting.",
          "category": "Furniture > Bedroom Furniture > Wardrobes",
          "brand": { "@type": "Brand", "name": "KS Design Studio" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Marble Dining Table Set",
          "description": "Luxurious 6-seater Italian marble dining table with upholstered seating.",
          "category": "Furniture > Dining Room Furniture",
          "brand": { "@type": "Brand", "name": "KS Design Studio" }
        }
      }
    ],
    "hasPart": PROJECTS.map(project => ({
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "image": project.imageUrl,
      "locationCreated": project.location
    })),
    "video": {
      "@type": "VideoObject",
      "name": "KS Design Studio: Architectural Story",
      "description": "Experience tectonic elegance and modern luxury interior design in Pune.",
      "thumbnailUrl": [
        "https://ksdesignstudio.in/assets/webp/hero_foyer-Dmv-Yoj7.webp"
      ],
      "uploadDate": "2026-01-01T08:00:00+08:00",
      "contentUrl": "https://ksdesignstudio.in/promo.mp4",
      "embedUrl": "https://ksdesignstudio.in/promo.mp4"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KS Design Studio",
    "alternateName": ["KS Design Studio Pune", "KS Design Studio Global"],
    "url": "https://ksdesignstudio.in"
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(ldJson)}
      </script>
    </>
  );
};

export default Schema;
