import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import WhatsAppButton from './components/WhatsAppButton';
import DesignLiveWorkshop from './components/DesignLiveWorkshop';
import FloatingContactCTA from './components/FloatingContactCTA';
import Schema from './components/SEO/Schema';
import CanonicalTag from './components/SEO/CanonicalTag';
import SEOMeta from './components/SEO/SEOMeta';
import CinematicLab from './components/CinematicLab';

// Lazy load pages for Code Splitting
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Process = React.lazy(() => import('./pages/Process'));
const Contact = React.lazy(() => import('./pages/Contact'));
const KnowledgeHub = React.lazy(() => import('./pages/KnowledgeHub'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const Admin = React.lazy(() => import('./pages/Admin'));
const LocationLanding = React.lazy(() => import('./pages/LocationLanding'));
const ProjectLanding = React.lazy(() => import('./pages/ProjectLanding'));
const TectonicSeries = React.lazy(() => import('./pages/TectonicSeries'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const DesignIdeas = React.lazy(() => import('./pages/DesignIdeas'));
const Laboratory = React.lazy(() => import('./pages/Laboratory'));
const DesignReport = React.lazy(() => import('./pages/DesignReport'));
const ProjectVault = React.lazy(() => import('./pages/ProjectVault'));
const ServiceLanding = React.lazy(() => import('./pages/ServiceLanding'));
const CostGuideLanding = React.lazy(() => import('./pages/CostGuideLanding'));
const MagazineLanding = React.lazy(() => import('./pages/MagazineLanding'));
const MagazineArticle = React.lazy(() => import('./pages/MagazineArticle'));
import { AppProvider } from './context/AppContext';
import { Mic } from 'lucide-react';
import CommandPalette from './components/CommandPalette';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Custom Cursor Logic
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor hidden lg:flex';
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 20}px`;
      cursor.style.top = `${e.clientY - 20}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-brass selection:text-white">
      <Schema />
      <CanonicalTag />
      <SEOMeta />
      <CinematicLab />
      {!isAdminPage && <Navbar scrolled={scrolled} />}
      
      <main className="flex-grow">
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<ProjectDetail />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/knowledge" element={<KnowledgeHub />} />
            <Route path="/knowledge/:id" element={<BlogDetail />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/laboratory/report" element={<DesignReport />} />
            <Route path="/vault" element={<ProjectVault />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/design-ideas" element={<DesignIdeas />} />
            <Route path="/interiors-in/:location" element={<LocationLanding />} />
            <Route path="/luxury-design/:location" element={<LocationLanding />} />
            <Route path="/cities/:cityName" element={<LocationLanding />} />
            <Route path="/interiors-at/:projectName" element={<ProjectLanding />} />
            <Route path="/services/:serviceName" element={<ServiceLanding />} />
            <Route path="/cost-guide/:location" element={<CostGuideLanding />} />
            <Route path="/tectonic-series" element={<TectonicSeries />} />
            <Route path="/modular" element={<Services />} />
            <Route path="/turnkey" element={<Services />} />
            <Route path="/ateliers" element={<Services />} />
            <Route path="/renovations" element={<Services />} />
            <Route path="/partners" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/magazine" element={<MagazineLanding />} />
            <Route path="/magazine/:slug" element={<MagazineArticle />} />
          </Routes>
        </React.Suspense>
      </main>
      
      {!isAdminPage && (
        <>
          <div className="fixed bottom-48 right-8 z-[100] flex flex-col space-y-4">
            <button 
              onClick={() => setIsWorkshopOpen(true)}
              className="bg-brass text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group relative overflow-hidden"
              title="Live Design Workshop"
            >
              <div className="absolute inset-0 bg-white/10 animate-pulse" />
              <Mic size={24} className="relative z-10" />
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest relative z-10">
                Live Workshop
              </span>
            </button>
          </div>

          <AIAssistant />
          <CommandPalette />
          <WhatsAppButton />
          <FloatingContactCTA />
          <DesignLiveWorkshop isOpen={isWorkshopOpen} onClose={() => setIsWorkshopOpen(false)} />
          <Footer />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;