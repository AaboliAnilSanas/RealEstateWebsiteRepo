import React, { useState } from 'react';
import { BedDouble, Bath, Maximize2, Layers, Heart, Share2, Sparkles } from 'lucide-react';

// --- ATOM 1: SpecItem - ENHANCED WITH MORE ANIMATIONS ---
export const SpecItem = ({ icon: Icon, label, value }) => (
  <div className="spec-item group relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.05] border border-[var(--location-blue-100)]">
    <style>{`
      .spec-item::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      .spec-item:hover::before {
        opacity: 1;
      }
      .spec-icon-float {
        animation: float-subtle 3s ease-in-out infinite;
      }
      @keyframes float-subtle {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-5px) rotate(5deg); }
      }
      .spec-value-pop {
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .group:hover .spec-value-pop {
        transform: scale(1.1);
      }
    `}</style>
    
    {/* Animated gradient background on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-50)]/40 via-transparent to-[var(--location-blue-50)]/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    
    {/* Sparkle effect on hover */}
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
      <Sparkles className="w-4 h-4 text-[var(--gold-base)] animate-pulse" />
    </div>
    
    <div className="relative z-10 flex items-center gap-4">
      <div className="spec-icon-float flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--location-blue-600)] to-[var(--location-blue-800)] shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-110">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--location-gray-600)] mb-1 transition-colors duration-300 group-hover:text-[var(--location-blue-600)]">
          {label}
        </p>
        <p className="spec-value-pop text-2xl font-bold bg-gradient-to-r from-[var(--location-blue-800)] to-[var(--location-blue-600)] bg-clip-text text-transparent">
          {value}
        </p>
      </div>
    </div>
    
    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[var(--gold-base)] to-[var(--location-blue-600)] transition-all duration-500 group-hover:w-full"></div>
  </div>
);

// --- ATOM 2: FloatingActions - ENHANCED WITH VISIBILITY CONTROL ---
export const FloatingActions = () => {
  const [showTooltip, setShowTooltip] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detect when user reaches bottom of page
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 200; // 200px before bottom
      setShowScrollTop(scrollPosition >= threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
      <style>{`
        .floating-btn {
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tooltip {
          animation: tooltip-slide 0.3s ease;
        }
        @keyframes tooltip-slide {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* SHARE BUTTON ANIMATION */
        .share-btn {
          border: 3px solid var(--location-blue-600);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .share-btn:hover {
          transform: scale(1.15) rotate(15deg);
          box-shadow: 0 0 15px rgba(30, 136, 229, 0.3);
        }
      `}</style>

      {/* Share Button */}
      <div className="relative">
        <button 
          className="share-btn group flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl"
          onMouseEnter={() => setShowTooltip('share')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Share2 className="h-6 w-6 text-[var(--location-blue-600)] transition-transform duration-300 group-hover:rotate-12" />
        </button>
        {showTooltip === 'share' && (
          <div className="tooltip absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--location-blue-800)] text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-xl">
            Share property
          </div>
        )}
      </div>

      {/* Scroll to Top Button (visible only near bottom) */}
      {showScrollTop && (
        <button 
          className="floating-btn group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold-base)] to-[var(--gold-dark)] shadow-2xl transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};



// Exporting required icons for PropertyBodySections
export const PropertyIcons = { BedDouble, Bath, Maximize2, Layers };