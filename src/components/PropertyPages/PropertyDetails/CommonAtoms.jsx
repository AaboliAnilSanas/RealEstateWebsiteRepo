import React, { useState, useEffect } from 'react';
import { 
  BedDouble, Bath, Maximize2, Layers, Share2, // Existing key specs
  Ruler, Key, Sofa, Gauge, Home, ParkingCircle, Clock, // New icons for features
  TrendingUp, Briefcase, CheckCircle, Building2, Gavel, 
  Sparkles, ChevronRight,
} from 'lucide-react';
import FloatingContactButton from '../../UIComponents/FloatingContactButton';

export const SpecItem = ({ icon: Icon, label, value }) => (
  <div className="spec-item group relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.05] border border-[var(--location-blue-100)]">
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
  </div>
);

export const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Property Details',
        text: 'Check out this amazing property!',
        url: window.location.href,
      }).catch((err) => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <style>{`
        .floating-actions-container {
          position: fixed;
          right: 32px;
          bottom: 32px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .floating-actions-container.with-scroll {
          transform: translateY(-80px);
        }

        .floating-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          position: relative;
        }

        .floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        /* Share button */
        .floating-btn.share-btn {
          background: white;
          border: 3px solid var(--location-blue-600);
        }

        .share-icon {
          color: var(--location-blue-600);
        }

        /* Tooltip */
        .tooltip {
          position: absolute;
          right: 65px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--location-blue-700);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .floating-btn.share-btn:hover .tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(-5px);
        }

        /* Arrow for tooltip */
        .tooltip::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -6px;
          transform: translateY(-50%) rotate(45deg);
          width: 10px;
          height: 10px;
          background: var(--location-blue-700);
        }

        /* Scroll top button */
        .floating-btn.scroll-top-btn {
          background: linear-gradient(135deg, #d0ae02ff 0%, #d0ae02ff 100%);
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className={`floating-actions-container ${showScrollTop ? 'with-scroll' : ''}`}>
        {/* Contact Button */}
        <FloatingContactButton />

        {/* Share Button with Tooltip */}
        <button className="floating-btn share-btn" onClick={handleShare}>
          <Share2 className="w-6 h-6 share-icon" />
          <span className="tooltip">Share this property</span>
        </button>

        {/* Scroll Top Button */}
        {showScrollTop && (
          <button
            className="floating-btn scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Back to top"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export { FloatingContactButton };

// EXPORT ALL RELEVANT ICONS HERE
export const PropertyIcons = { 
  BedDouble, Bath, Maximize2, Layers, 
  Ruler, Key, Sofa, Gauge, Home, ParkingCircle, 
  Clock, TrendingUp, Briefcase, CheckCircle, 
  Building2, Gavel, Sparkles, ChevronRight,
};