import React, { useState } from 'react';
import { PROJECTS } from '../constants';

const categories = ['All', 'Kitchen', 'Living', 'Bedroom', 'Office', 'Exterior'];

const MasonryGallery: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block mb-4">Design Ideas</span>
            <h2 className="text-4xl md:text-6xl text-charcoal tracking-tighter leading-none mb-6">
              Inspiration for every <span className="italic font-light text-brass/70">volume.</span>
            </h2>
            <p className="text-charcoal/70 font-light text-lg">
              Explore our curation of high-fidelity spatial narratives across major metros.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-label={`Filter design gallery by ${cat}`}
                className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-500 border ${
                  filter === cat 
                    ? 'bg-charcoal text-white border-charcoal' 
                    : 'bg-transparent text-zinc-700 border-zinc-200 hover:border-brass/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6 shadow-sm group-hover:shadow-2xl transition-shadow duration-700">
                <img 
                  src={project.imageUrl} 
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="500"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                   <span className="text-white text-[10px] uppercase tracking-[0.5em] font-black border border-white/40 px-8 py-3 rounded-full backdrop-blur-md">View Project</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-charcoal group-hover:text-brass transition-colors mb-2 font-bold">{project.title}</h3>
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-black">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasonryGallery;
