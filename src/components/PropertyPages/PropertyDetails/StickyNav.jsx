import React from 'react';
import { Home, FileText, Award, List, Building2 } from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'specifications', label: 'Specifications', icon: FileText },
  { id: 'description', label: 'What makes it unique', icon: Award },
  { id: 'features', label: 'Features', icon: List },
  { id: 'amenities', label: 'Amenities', icon: Building2 },
];

const StickyNav = ({ activeSection, setActiveSection }) => {
  const handleClick = (itemId) => {
    setActiveSection(itemId);
  };

  return (
    <>
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes indicator-slide {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .nav-item {
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .icon-container {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-item:hover .icon-container {
          transform: scale(1.1) rotate(5deg);
        }
        .nav-item.active .icon-container {
          transform: scale(1.15);
        }
        
        /* Hide scrollbar but keep functionality */
        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        .horizontal-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Vertical layout on large screens */
        @media (min-width: 1024px) {
          .nav-vertical {
            flex-direction: column !important;
          }
          .nav-vertical .nav-item {
            width: 100%;
          }
        }
      `}</style>

      {/* Container with responsive layout */}
      <div className="overflow-hidden bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-[var(--location-blue-100)] p-1 sm:p-2">
        {/* Header */}
        <div className="px-3 py-2 mb-1 sm:px-4 sm:py-3 sm:mb-2 border-b border-[var(--location-blue-100)]">
          <h3 className="text-xs sm:text-sm font-bold text-[var(--location-blue-800)] uppercase tracking-wider">
            Property Details
          </h3>
        </div>

        {/* Navigation Items - Horizontal on Mobile, Vertical on Large Screens */}
        <nav className="overflow-x-auto horizontal-scroll">
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-1 nav-vertical min-w-max lg:min-w-0 px-1 lg:px-0">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`nav-item ${activeSection === item.id ? 'active' : ''} 
                  relative flex items-center px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold transition-all duration-300 rounded-lg sm:rounded-xl group whitespace-nowrap lg:whitespace-normal lg:w-full flex-shrink-0 border-2 ${
                  activeSection === item.id
                    ? 'border-blue-400 bg-blue-50/30'
                    : 'border-transparent hover:border-blue-200 hover:bg-blue-50/20'
                }`}
                style={{ 
                  animation: `slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s backwards`
                }}
              >
                {/* Active indicator line - Left on large, top on mobile */}
                {activeSection === item.id && (
                  <>
                    <span className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full"></span>
                    <span className="block lg:hidden absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-b-full"></span>
                  </>
                )}

                {/* Icon container */}
                <div className={`icon-container flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl mr-2 flex-shrink-0 border-2 transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-500 border-blue-600 shadow-lg shadow-blue-500/30'
                    : 'bg-white border-blue-100 group-hover:border-blue-300 group-hover:bg-blue-50'
                }`}>
                  <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-blue-600 group-hover:text-blue-700'
                  }`} />
                </div>

                {/* Label */}
                <span className={`flex-1 text-xs sm:text-sm transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-700 font-bold'
                    : 'text-gray-600 group-hover:text-blue-700'
                }`}>
                  {item.label}
                </span>

                {/* Chevron for active state */}
                {activeSection === item.id && (
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 ml-2 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default StickyNav;