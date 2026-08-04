import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_BUILDERS, SEO_LOCATIONS, SEO_SERVICES } from '../../registry/seo_registry';
import { ChevronRight } from 'lucide-react';

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
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const SEOClusterLinks: React.FC<SEOClusterLinksProps> = ({ currentLocation, currentBuilder, currentService }) => {
  // Determine if location belongs to a specific region to keep links tightly clustered
  let regionalLocations = [...SEO_LOCATIONS.west, ...SEO_LOCATIONS.east, ...SEO_LOCATIONS.central];
  if (currentLocation) {
     if (SEO_LOCATIONS.west.includes(currentLocation)) regionalLocations = SEO_LOCATIONS.west;
     else if (SEO_LOCATIONS.east.includes(currentLocation)) regionalLocations = SEO_LOCATIONS.east;
     else if (SEO_LOCATIONS.central.includes(currentLocation)) regionalLocations = SEO_LOCATIONS.central;
  }
  
  const nearbyLocations = shuffle([...regionalLocations]).filter(l => l !== currentLocation).slice(0, 6);
  const relatedBuilders = shuffle([...ALL_BUILDERS]).filter(b => b !== currentBuilder).slice(0, 4);
  const coreServices = shuffle(['Modular Kitchen', 'Turnkey Interiors', 'Wardrobe Design', '2 BHK Interiors', '3 BHK Interiors']).filter(s => s !== currentService).slice(0, 4);

  return (
    <div className="pt-16 pb-8 border-t border-zinc-100 mt-20" role="navigation" aria-label="Related SEO Clusters">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Strict SILO Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12 border-b border-zinc-50 pb-6">
          <ol className="flex items-center space-x-2 text-[10px] uppercase font-black tracking-widest text-zinc-400 flex-wrap gap-y-2">
            <li><Link to="/" className="hover:text-brass transition-colors">KS Design</Link></li>
            
            {currentLocation && (
              <>
                <li><ChevronRight size={12} /></li>
                <li><Link to={`/interiors-in/${currentLocation.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brass transition-colors">{currentLocation}</Link></li>
              </>
            )}
            
            {currentBuilder && (
              <>
                <li><ChevronRight size={12} /></li>
                <li><Link to={`/builder/${currentBuilder.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brass transition-colors">{currentBuilder}</Link></li>
              </>
            )}

            {currentService && (
              <>
                <li><ChevronRight size={12} /></li>
                <li className="text-brass" aria-current="page">{currentService}</li>
              </>
            )}
          </ol>
        </nav>

        <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-400 mb-8">Related Design Corridors</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Location Cluster - Strictly Regional */}
          <div>
            <h5 className="text-xs font-bold text-[#1A1A1A] mb-4 uppercase tracking-widest">
              {currentLocation ? `Nearby in Region` : 'Popular Markets'}
            </h5>
            <ul className="space-y-3">
              {nearbyLocations.map((loc, i) => (
                <li key={i}>
                  <Link to={`/interiors-in/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="text-zinc-500 hover:text-brass text-sm transition-colors block">
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
                  <Link to={`/builder/${builder.toLowerCase().replace(/\s+/g, '-')}`} className="text-zinc-500 hover:text-brass text-sm transition-colors block">
                    {builder} Interiors
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Cluster - Contextual */}
          <div>
            <h5 className="text-xs font-bold text-[#1A1A1A] mb-4 uppercase tracking-widest">
              {currentLocation ? `Services in ${currentLocation}` : 'Core Services'}
            </h5>
            <ul className="space-y-3">
              {coreServices.map((service, i) => {
                const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
                const path = currentLocation 
                  ? `/service/${currentLocation.toLowerCase().replace(/\s+/g, '-')}/${serviceSlug}`
                  : `/services/${serviceSlug}`;
                return (
                  <li key={i}>
                    <Link to={path} className="text-zinc-500 hover:text-brass text-sm transition-colors block">
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
