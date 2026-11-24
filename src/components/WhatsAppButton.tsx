import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "917020377693";
  const [currentUrl, setCurrentUrl] = useState("https://ksdesignstudio.in");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const message = encodeURIComponent(
    `*NEW ENQUIRY (ksdesignstudio.in)*\n\n` +
    `Hello KS Design Studio! I am interested in your interior design services.\n\n` +
    `*Source Domain:* ksdesignstudio.in\n` +
    `*Page:* ${currentUrl}`
  );
  
  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat with KS Design Studio on WhatsApp"
      className="fixed bottom-24 right-8 z-[55] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
      title="Chat with us on WhatsApp (ksdesignstudio.in)"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap text-xs font-bold uppercase tracking-widest">
        WhatsApp Us
      </span>
    </a>
  );
};

export default WhatsAppButton;