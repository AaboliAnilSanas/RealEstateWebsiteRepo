import React from 'react';
import { 
  Briefcase, Clock, Key, Home, ChevronRight, ParkingCircle, 
  CheckCircle, Ruler, Sparkles, TrendingUp, Sofa, Gauge, Building2, Gavel 
} from 'lucide-react'; 
import { SpecItem, PropertyIcons } from './CommonAtoms.jsx';

const { BedDouble, Bath, Maximize2, Layers } = PropertyIcons;

// ==================== COLLAPSIBLE SECTION COMPONENT ====================
const CollapsibleSection = ({ id, title, children, activeSection, icon: Icon }) => {
  const isActive = activeSection === id;
  
  if (!isActive) {
    return null;
  }
  
  return (
    <section 
      id={id} 
      className="mb-4 sm:mb-6 md:mb-8 overflow-hidden rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl sm:shadow-2xl border-2 border-blue-100 animate-section-appear"
    >
      <style>{`
        @keyframes section-appear {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes title-slide {
          from { transform: translateX(-25px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes shine {
          0% { left: -150%; }
          100% { left: 150%; }
        }
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-section-appear {
          animation: section-appear 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .section-header {
          position: relative;
          overflow: hidden;
        }
        .section-header::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shine 3s ease-in-out infinite;
        }
        .section-icon {
          animation: icon-bounce 2s ease-in-out infinite;
        }
      `}</style>

      {/* Enhanced Header with Premium Gradient */}
      <div className="section-header bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4" style={{ animation: 'title-slide 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {Icon && (
            <div className="section-icon flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-white/20 backdrop-blur-sm shadow-lg border border-white/30 flex-shrink-0">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-xl lg:text-2xl font-bold text-white tracking-tight drop-shadow-lg">
              {title}
            </h2>
            <div className="mt-0.5 sm:mt-1 lg:mt-1.5 h-0.5 w-10 sm:w-16 lg:w-20 bg-gradient-to-r from-gold-base via-gold-light to-transparent rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Content with Enhanced Padding */}
      <div className="p-3 sm:p-5 lg:p-6 bg-gradient-to-br from-white to-blue-50/20">
        {children}
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================
const PropertyBodySections = ({ property, activeSection }) => {
  const detailedFeatures = [
    { label: 'Property Type', value: property.propertyType, icon: Home },
    { label: 'Category', value: property.propertyCategory, icon: Building2 },
    { label: 'Transaction Type', value: property.transactionType, icon: TrendingUp },
    { label: 'Possession By', value: property.possessionBy, icon: Clock },
    { label: 'Total Floors', value: property.totalFloors, icon: Layers },
    { label: 'Balconies', value: property.balconies, icon: ChevronRight },
    { label: 'Parking Slots', value: property.parking, icon: ParkingCircle },
    { label: 'Furnishing Status', value: property.furnishing, icon: Sofa },
    { label: 'Ownership Type', value: property.ownership, icon: Gavel },
    { label: 'Carpet Area', value: property.carpetArea, icon: Maximize2 },
    { label: 'Built-up Area', value: property.builtUpArea, icon: Ruler },
    { label: 'Super Built-up Area', value: property.superBuildUpArea, icon: Gauge },
  ];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <style>{`
        @keyframes feature-pop {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.2); }
          50% { box-shadow: 0 0 30px rgba(37, 99, 235, 0.4); }
        }
        .feature-item {
          animation: feature-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        .feature-item:nth-child(1) { animation-delay: 0.05s; }
        .feature-item:nth-child(2) { animation-delay: 0.1s; }
        .feature-item:nth-child(3) { animation-delay: 0.15s; }
        .feature-item:nth-child(4) { animation-delay: 0.2s; }
        .feature-item:nth-child(5) { animation-delay: 0.25s; }
        .feature-item:nth-child(6) { animation-delay: 0.3s; }
        .feature-item:nth-child(7) { animation-delay: 0.35s; }
        .feature-item:nth-child(8) { animation-delay: 0.4s; }
        .feature-item:nth-child(9) { animation-delay: 0.45s; }
        .feature-item:nth-child(10) { animation-delay: 0.5s; }
        .feature-item:nth-child(11) { animation-delay: 0.55s; }
        .feature-item:nth-child(12) { animation-delay: 0.6s; }
      `}</style>

      {/* 0. OVERVIEW SECTION */}
      <CollapsibleSection 
        id="overview" 
        title="Property Overview" 
        activeSection={activeSection}
        icon={Home}
      >
        <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-50 via-white to-gold-50/40 p-3 sm:p-5 lg:p-6 border-2 border-gold-base/30 shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-56 sm:h-56 bg-gradient-to-br from-gold-base/10 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-tr from-blue-400/10 to-gold-base/10 rounded-full blur-3xl"></div>
          
          <p className="relative z-10 text-[10px] sm:text-sm lg:text-base leading-snug text-gray-700 font-medium mb-2 sm:mb-4 lg:mb-5">
            {property.uniqueSellingPoints}
          </p>
          
          <div className="relative z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-3">
            <div className="flex items-center gap-1 lg:gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full shadow-md border border-green-200">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500" />
              <span className="text-[9px] sm:text-xs lg:text-sm font-bold text-gray-800">Verified</span>
            </div>
            <div className="flex items-center gap-1 lg:gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full shadow-md border border-gold-base/30">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gold-base" />
              <span className="text-[9px] sm:text-xs lg:text-sm font-bold text-gray-800">Premium</span>
            </div>
            <div className="flex items-center gap-1 lg:gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full shadow-md border border-blue-200">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600" />
              <span className="text-[9px] sm:text-xs lg:text-sm font-bold text-gray-800">Luxury</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 1. KEY SPECIFICATIONS SECTION */}
      <CollapsibleSection 
        id="specifications" 
        title="Core Specifications" 
        activeSection={activeSection}
        icon={Briefcase}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <SpecItem icon={BedDouble} label="Bedrooms" value={property.bedrooms} />
          <SpecItem icon={Bath} label="Bathrooms" value={property.bathrooms} />
          <SpecItem icon={Maximize2} label="Carpet Area" value={property.carpetArea} />
          <SpecItem icon={Layers} label="Floor No." value={property.floorNumber} />
        </div>
      </CollapsibleSection>

      {/* 2. DESCRIPTION SECTION */}
      <CollapsibleSection 
        id="description" 
        title="What Makes It Unique" 
        activeSection={activeSection}
        icon={Sparkles}
      >
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gold-base/40 bg-gradient-to-br from-white via-gold-50/20 to-blue-50/30 p-3 sm:p-5 lg:p-6 shadow-lg">
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-gold-base/15 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-2xl"></div>
            <p className="relative z-10 text-[10px] sm:text-xs lg:text-sm leading-snug text-gray-700 font-medium">
              This exceptional property represents the pinnacle of modern living, combining sophisticated design with premium amenities. Every detail has been carefully curated to provide an unparalleled lifestyle experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl lg:rounded-2xl border border-blue-200 shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2 lg:mb-3 shadow-md">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h4 className="font-bold text-blue-900 mb-0.5 sm:mb-1 lg:mb-1.5 text-xs sm:text-sm lg:text-base">Prime Location</h4>
              <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-600 font-medium leading-tight">Strategically located with excellent connectivity</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl lg:rounded-2xl border border-green-200 shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2 lg:mb-3 shadow-md">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h4 className="font-bold text-green-900 mb-0.5 sm:mb-1 lg:mb-1.5 text-xs sm:text-sm lg:text-base">Ready to Move</h4>
              <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-600 font-medium leading-tight">Immediate possession available</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl lg:rounded-2xl border border-purple-200 shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2 lg:mb-3 shadow-md">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h4 className="font-bold text-purple-900 mb-0.5 sm:mb-1 lg:mb-1.5 text-xs sm:text-sm lg:text-base">Luxury Living</h4>
              <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-600 font-medium leading-tight">Premium finishes and world-class amenities</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. DETAILED FEATURES SECTION */}
      <CollapsibleSection 
        id="features" 
        title="Detailed Features" 
        activeSection={activeSection}
        icon={CheckCircle}
      >
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
          {detailedFeatures.map((item, index) => (
            <div 
              key={index}
              className="feature-item group relative overflow-hidden flex items-center justify-between border-2 border-blue-100 bg-white p-1.5 sm:p-2 md:p-3 lg:p-4 rounded-lg lg:rounded-xl transition-all duration-300 hover:border-gold-base hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-base/5 via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10 flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold text-gray-600 transition-colors group-hover:text-blue-900">
                <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-lg bg-blue-50 group-hover:bg-gradient-to-br group-hover:from-gold-base/20 group-hover:to-blue-100 transition-all duration-300 shadow-sm flex-shrink-0">
                  <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 text-blue-600 group-hover:text-gold-base transition-all duration-300" />
                </div>
                <span className="leading-tight">{item.label}</span>
              </span>
              <span className="relative z-10 text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-blue-900 group-hover:text-gold-base transition-colors duration-300 ml-1">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 4. AMENITIES SECTION */}
      <CollapsibleSection 
        id="amenities" 
        title="Premium Amenities" 
        activeSection={activeSection}
        icon={Sparkles}
      >
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
          {property.amenities.map((amenity, index) => (
            <div
              key={index}
              className="feature-item group relative overflow-hidden flex items-center gap-2 lg:gap-3 rounded-lg lg:rounded-xl border-2 border-blue-100 bg-white p-2 sm:p-3 lg:p-4 shadow-sm transition-all duration-300 hover:border-gold-base hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-base/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <CheckCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5 text-white" />
              </div>
              <span className="relative z-10 text-[9px] sm:text-[10px] lg:text-xs font-bold text-gray-800 group-hover:text-gold-base transition-colors duration-300 leading-tight">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PropertyBodySections;