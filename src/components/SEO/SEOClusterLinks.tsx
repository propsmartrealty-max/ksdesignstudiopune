import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_BUILDERS, SEO_LOCATIONS, SEO_SERVICES } from '../../registry/seo_registry';

interface SEOClusterLinksProps {
  currentLocation?: string;
  currentBuilder?: string;
  currentService?: string;
}

// Pseudo-random shuffler
const shuffle = (array: string[]) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const SEOClusterLinks: React.FC<SEOClusterLinksProps> = ({ currentLocation, currentBuilder, currentService }) => {
  // Grab a random assortment to link to in order to distribute PageRank internally
  const nearbyLocations = shuffle([...SEO_LOCATIONS.west, ...SEO_LOCATIONS.east, ...SEO_LOCATIONS.central]).slice(0, 6);
  const relatedBuilders = shuffle([...ALL_BUILDERS]).slice(0, 4);
  const coreServices = shuffle(['Modular Kitchen', 'Turnkey Interiors', 'Wardrobe Design', '2 BHK Interiors', '3 BHK Interiors']).slice(0, 4);

  return (
    <div className="pt-16 pb-8 border-t border-zinc-100 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-400 mb-8">Related Design Corridors</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Location Cluster */}
          <div>
            <h5 className="text-xs font-bold text-[#1A1A1A] mb-4 uppercase tracking-widest">Nearby Markets</h5>
            <ul className="space-y-3">
              {nearbyLocations.map((loc, i) => (
                <li key={i}>
                  <Link to={`/interiors-in/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="text-zinc-500 hover:text-brass text-sm transition-colors">
                    Interior Designer in {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Builder Cluster */}
          <div>
            <h5 className="text-xs font-bold text-[#1A1A1A] mb-4 uppercase tracking-widest">Developer Expertise</h5>
            <ul className="space-y-3">
              {relatedBuilders.map((builder, i) => (
                <li key={i}>
                  <Link to={`/builder/${builder.toLowerCase().replace(/\s+/g, '-')}`} className="text-zinc-500 hover:text-brass text-sm transition-colors">
                    {builder} Interiors
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Cluster */}
          <div>
            <h5 className="text-xs font-bold text-[#1A1A1A] mb-4 uppercase tracking-widest">Core Services</h5>
            <ul className="space-y-3">
              {coreServices.map((service, i) => {
                const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
                const path = currentLocation 
                  ? `/service/${currentLocation.toLowerCase().replace(/\s+/g, '-')}/${serviceSlug}`
                  : `/services/${serviceSlug}`;
                return (
                  <li key={i}>
                    <Link to={path} className="text-zinc-500 hover:text-brass text-sm transition-colors">
                      {service} {currentLocation ? `in ${currentLocation}` : ''}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOClusterLinks;
