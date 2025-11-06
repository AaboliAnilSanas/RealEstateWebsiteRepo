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
      className="mb-8 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-blue-100 animate-section-appear"
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
      <div className="section-header bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 px-8 py-7">
        <div className="flex items-center gap-4" style={{ animation: 'title-slide 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {Icon && (
            <div className="section-icon flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm shadow-2xl border-2 border-white/30">
              <Icon className="w-7 h-7 text-white" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">
              {title}
            </h2>
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-gold-base via-gold-light to-transparent rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Content with Enhanced Padding */}
      <div className="p-8 bg-gradient-to-br from-white to-blue-50/20">
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
    <div className="space-y-6">
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-gold-50/40 p-8 border-2 border-gold-base/30 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-gold-base/10 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-blue-400/10 to-gold-base/10 rounded-full blur-3xl"></div>
          
          <p className="relative z-10 text-lg leading-relaxed text-gray-700 font-medium mb-6">
            {property.uniqueSellingPoints}
          </p>
          
          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border-2 border-green-200 hover:scale-105 transition-transform">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-bold text-gray-800">Verified Property</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border-2 border-gold-base/30 hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 text-gold-base" />
              <span className="text-sm font-bold text-gray-800">Premium Location</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border-2 border-blue-200 hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-gray-800">Luxury Living</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-gold-base/40 bg-gradient-to-br from-white via-gold-50/20 to-blue-50/30 p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold-base/15 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-2xl"></div>
            <p className="relative z-10 text-base leading-relaxed text-gray-700 font-medium">
              This exceptional property represents the pinnacle of modern living, combining sophisticated design with premium amenities. Every detail has been carefully curated to provide an unparalleled lifestyle experience in one of the city's most sought-after locations.
            </p>
          </div>
          
          {/* Key Highlights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Home className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-blue-900 mb-2 text-lg">Prime Location</h4>
              <p className="text-sm text-gray-600 font-medium">Strategically located in the heart of the city with excellent connectivity</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-green-900 mb-2 text-lg">Ready to Move</h4>
              <p className="text-sm text-gray-600 font-medium">Immediate possession available for hassle-free relocation</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-purple-900 mb-2 text-lg">Luxury Living</h4>
              <p className="text-sm text-gray-600 font-medium">Premium finishes and world-class amenities throughout</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {detailedFeatures.map((item, index) => (
            <div 
              key={index}
              className="feature-item group relative overflow-hidden flex items-center justify-between border-2 border-blue-100 bg-white p-6 rounded-xl transition-all duration-300 hover:border-gold-base hover:shadow-2xl hover:scale-[1.03]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-base/5 via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10 flex items-center gap-3 text-sm font-bold text-gray-600 transition-colors group-hover:text-blue-900">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-gradient-to-br group-hover:from-gold-base/20 group-hover:to-blue-100 transition-all duration-300 shadow-md">
                  <item.icon className="h-6 w-6 text-blue-600 group-hover:text-gold-base transition-all duration-300 group-hover:scale-110" />
                </div>
                {item.label}
              </span>
              <span className="relative z-10 text-base font-bold text-blue-900 group-hover:text-gold-base transition-colors duration-300">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {property.amenities.map((amenity, index) => (
            <div
              key={index}
              className="feature-item group relative overflow-hidden flex items-center gap-4 rounded-xl border-2 border-blue-100 bg-white p-5 shadow-md transition-all duration-300 hover:border-gold-base hover:shadow-2xl hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-base/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <span className="relative z-10 text-sm font-bold text-gray-800 group-hover:text-gold-base transition-colors duration-300">
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