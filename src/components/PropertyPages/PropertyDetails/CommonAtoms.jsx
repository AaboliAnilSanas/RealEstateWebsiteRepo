import React, { useState, useEffect } from 'react';
import { 
  BedDouble, Bath, Maximize2, Layers, Share2,
  Ruler, Key, Sofa, Gauge, Home, ParkingCircle, Clock,
  TrendingUp, Briefcase, CheckCircle, Building2, Gavel, 
  Sparkles, ChevronRight,
} from 'lucide-react';
import FloatingContactButton from '../../UIComponents/FloatingContactButton';

export const SpecItem = ({ icon: Icon, label, value }) => (
  <div className="spec-item group relative overflow-hidden rounded-lg sm:rounded-xl bg-white p-2 sm:p-3 shadow-md transition-all duration-500 hover:shadow-xl hover:scale-[1.02] border border-[var(--location-blue-100)]">
    <div className="relative z-10 flex items-center gap-2 sm:gap-3">
      <div className="spec-icon-float flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--location-blue-600)] to-[var(--location-blue-800)] shadow-md transition-all duration-500 group-hover:shadow-lg group-hover:scale-110 flex-shrink-0">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--location-gray-600)] mb-0.5 transition-colors duration-300 group-hover:text-[var(--location-blue-600)]">
          {label}
        </p>
        <p className="spec-value-pop text-sm sm:text-lg font-bold bg-gradient-to-r from-[var(--location-blue-800)] to-[var(--location-blue-600)] bg-clip-text text-transparent">
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
          right: 16px; 
          bottom: 16px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (min-width: 640px) {
          .floating-actions-container {
            right: 24px;
            bottom: 24px;
            gap: 12px;
          }
        }

        .floating-actions-container.with-scroll {
          transform: translateY(-80px);
        }

        .floating-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          position: relative;
        }

        @media (min-width: 640px) {
          .floating-btn {
            width: 60px;
            height: 60px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
        }

        .floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        .floating-btn.share-btn {
          background: white;
          border: 3px solid var(--location-blue-600);
        }

        .share-icon {
          color: var(--location-blue-600);
          width: 18px;
          height: 18px;
        }

        @media (min-width: 640px) {
          .share-icon {
            width: 26px;
            height: 26px;
          }
        }

        .tooltip {
          display: none;
        }

        @media (min-width: 640px) {
           .tooltip {
              display: block;
              position: absolute;
              right: 60px;
              top: 50%;
              transform: translateY(-50%);
              background: var(--location-blue-700);
              color: white;
              padding: 5px 10px;
              border-radius: 6px;
              font-size: 11px;
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
            .tooltip::after {
              content: '';
              position: absolute;
              top: 50%;
              right: -5px;
              transform: translateY(-50%) rotate(45deg);
              width: 8px;
              height: 8px;
              background: var(--location-blue-700);
            }
        }

        .floating-btn.scroll-top-btn {
          background: linear-gradient(135deg, #d0ae02ff 0%, #d0ae02ff 100%);
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Override FloatingContactButton styles to match other buttons */
        .floating-contact-wrapper,
        .floating-contact-wrapper > div,
        .floating-contact-wrapper button {
          width: 44px !important;
          height: 44px !important;
          min-width: 44px !important;
          min-height: 44px !important;
        }

        @media (min-width: 640px) {
          .floating-contact-wrapper,
          .floating-contact-wrapper > div,
          .floating-contact-wrapper button {
            width: 60px !important;
            height: 60px !important;
            min-width: 60px !important;
            min-height: 60px !important;
          }
        }

        .floating-contact-wrapper button {
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .floating-contact-wrapper svg,
        .floating-contact-wrapper img {
          width: 18px !important;
          height: 18px !important;
        }

        @media (min-width: 640px) {
          .floating-contact-wrapper svg,
          .floating-contact-wrapper img {
            width: 26px !important;
            height: 26px !important;
          }
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
        <div className="floating-contact-wrapper">
          <FloatingContactButton />
        </div>

        <button className="floating-btn share-btn" onClick={handleShare}>
          <Share2 className="share-icon" />
          <span className="tooltip">Share this property</span>
        </button>

        {showScrollTop && (
          <button
            className="floating-btn scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Back to top"
          >
            <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export { FloatingContactButton };

export const PropertyIcons = { 
  BedDouble, Bath, Maximize2, Layers, 
  Ruler, Key, Sofa, Gauge, Home, ParkingCircle, 
  Clock, TrendingUp, Briefcase, CheckCircle, 
  Building2, Gavel, Sparkles, ChevronRight,
};