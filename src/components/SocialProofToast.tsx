import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';

const NOTIFICATIONS = [
  { action: "booked a free consultation", location: "Baner", time: "12 minutes ago" },
  { action: "requested a 3BHK quote", location: "Wakad", time: "24 minutes ago" },
  { action: "is currently viewing Turnkey Designs", location: "Hinjewadi", time: "Just now" },
  { action: "downloaded the Investment Guide", location: "Koregaon Park", time: "2 hours ago" },
  { action: "booked a site visit", location: "Kalyani Nagar", time: "45 minutes ago" },
  { action: "is exploring Custom Sofa Sets", location: "Pimple Saudagar", time: "Just now" }
];

export default function SocialProofToast() {
  const [currentNotification, setCurrentNotification] = useState<typeof NOTIFICATIONS[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomNotif = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      setCurrentNotification(randomNotif);
      setIsVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Initial delay before showing first toast
    const initialTimer = setTimeout(() => {
      showNotification();
    }, 12000);

    // Show a toast every 35-60 seconds to prevent spamming
    const interval = setInterval(() => {
      showNotification();
    }, Math.floor(Math.random() * 25000) + 35000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div 
      className={`fixed bottom-24 left-6 z-50 transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 border border-zinc-100 flex items-start gap-4 max-w-sm relative overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-zinc-100/40 to-transparent pointer-events-none" />
        
        <div className="bg-brass/10 p-3 rounded-xl shrink-0">
          <MapPin size={20} className="text-brass" />
        </div>
        
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-medium text-zinc-900 mb-1">
            Someone from <span className="font-bold">{currentNotification.location}</span>
          </p>
          <p className="text-xs text-zinc-600 truncate">
            {currentNotification.action}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
            <Clock size={10} />
            {currentNotification.time}
          </div>
        </div>
      </div>
    </div>
  );
}
