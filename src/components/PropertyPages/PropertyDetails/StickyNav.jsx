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
    <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-[var(--location-blue-100)] p-2">
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
        .nav-item::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--gold-base), var(--location-blue-600));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-item.active::after {
          animation: indicator-slide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
      `}</style>

      {/* Header */}
      <div className="px-4 py-3 mb-2 border-b border-[var(--location-blue-100)]">
        <h3 className="text-sm font-bold text-[var(--location-blue-800)] uppercase tracking-wider">
       Property Details
        </h3>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-1">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`nav-item ${activeSection === item.id ? 'active' : ''} 
              relative flex items-center w-full px-4 py-3 text-left font-semibold transition-all duration-300 rounded-xl group`}
            style={{ 
              animation: `slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s backwards`,
              backgroundColor: activeSection === item.id 
                ? 'var(--location-blue-800)' 
                : 'transparent'
            }}
          >
            {/* Active indicator line */}
            {activeSection === item.id && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--gold-base)] to-[var(--gold-dark)] rounded-r-full"></span>
            )}

            {/* Icon container */}
            <div className={`icon-container flex items-center justify-center w-10 h-10 rounded-xl mr-3 ${
              activeSection === item.id
                ? 'bg-[var(--gold-base)] shadow-lg'
                : 'bg-[var(--location-blue-50)] group-hover:bg-[var(--location-blue-100)]'
            }`}>
              <item.icon className={`w-5 h-5 ${
                activeSection === item.id
                  ? 'text-white'
                  : 'text-[var(--location-blue-600)] group-hover:text-[var(--location-blue-800)]'
              }`} />
            </div>

            {/* Label */}
            <span className={`flex-1 text-sm ${
              activeSection === item.id
                ? 'text-white'
                : 'text-[var(--location-gray-600)] group-hover:text-[var(--location-blue-800)]'
            }`}>
              {item.label}
            </span>

            {/* Active glow effect */}
            {activeSection === item.id && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--gold-base)]/10 to-transparent pointer-events-none"></div>
            )}

            {/* Chevron for active state */}
            {activeSection === item.id && (
              <svg 
                className="w-5 h-5 text-[var(--gold-base)] ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </nav>

    </div>
  );
};

export default StickyNav;