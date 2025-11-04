import React from 'react';
import { Briefcase, Clock, Key, Home, ChevronRight, ParkingCircle, CheckCircle, Ruler, Sparkles, TrendingUp } from 'lucide-react'; // MapPin removed
import { SpecItem, PropertyIcons } from './CommonAtoms.jsx';

const { BedDouble, Bath, Maximize2, Layers } = PropertyIcons;

// --- CollapsibleSection Component (Enhanced) ---
const CollapsibleSection = ({ id, title, children, activeSection, icon: Icon }) => {
// ... (CollapsibleSection component logic is the same)
    const isActive = activeSection === id;
    
    if (!isActive) {
        return null;
    }
    
    return (
        <section 
          id={id} 
          className="mb-8 overflow-hidden rounded-2xl bg-white shadow-xl border border-[var(--location-blue-100)] animate-section-appear"
        >
          <style>{`
            @keyframes section-appear {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes title-slide {
              from { transform: translateX(-20px); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes shine {
              0% { left: -100%; }
              100% { left: 100%; }
            }
            .animate-section-appear {
              animation: section-appear 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .section-header {
              position: relative;
              overflow: hidden;
            }
            .section-header::after {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
              animation: shine 3s ease-in-out infinite;
            }
          `}</style>

          {/* Enhanced Header */}
          <div className="section-header bg-gradient-to-r from-[var(--location-blue-800)] via-[var(--location-blue-600)] to-[var(--location-blue-800)] px-8 py-6">
            <div className="flex items-center gap-4" style={{ animation: 'title-slide 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              {Icon && (
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  {title}
                </h2>
                <div className="mt-1 h-1 w-20 bg-gradient-to-r from-[var(--gold-base)] to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            {children}
          </div>
        </section>
    );
};

const PropertyBodySections = ({ property, activeSection }) => {
  const detailedFeatures = [
    { label: 'Property Type', value: property.propertyType, icon: Home },
    { label: 'Category', value: property.propertyCategory, icon: Briefcase },
    { label: 'Transaction Type', value: property.transactionType, icon: TrendingUp },
    { label: 'Possession By', value: property.possessionBy, icon: Clock },
    { label: 'Total Floors', value: property.totalFloors, icon: Layers },
    { label: 'Balconies', value: property.balconies, icon: ChevronRight },
    { label: 'Parking Slots', value: property.parking, icon: ParkingCircle },
    { label: 'Furnishing Status', value: property.furnishing, icon: CheckCircle },
    { label: 'Ownership Type', value: property.ownership, icon: Key },
    { label: 'Carpet Area', value: property.carpetArea, icon: Maximize2 },
    { label: 'Built-up Area', value: property.builtUpArea, icon: Ruler },
    { label: 'Super Built-up Area', value: property.superBuildUpArea, icon: Ruler },
  ];

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes feature-pop {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .feature-item {
          animation: feature-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--location-blue-50)] to-[var(--gold-50)]/30 p-8 border-2 border-[var(--gold-base)]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-base)]/5 rounded-full blur-3xl"></div>
          <p className="relative z-10 text-lg leading-relaxed text-[var(--location-gray-600)] font-medium">
            {property.uniqueSellingPoints}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-[var(--location-blue-800)]">Verified Property</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <TrendingUp className="w-4 h-4 text-[var(--gold-base)]" />
              <span className="text-sm font-semibold text-[var(--location-blue-800)]">Premium Location</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 1. Key Specifications Section */}
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

      {/* 2. Description Section */}
      <CollapsibleSection 
        id="description" 
        title="What Makes It Unique" 
        activeSection={activeSection}
        icon={Sparkles}
      >
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--gold-base)]/30 bg-gradient-to-br from-white to-[var(--gold-50)]/20 p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold-base)]/10 rounded-full blur-2xl"></div>
            <p className="relative z-10 text-base leading-relaxed text-[var(--location-gray-600)]">
              This exceptional property represents the pinnacle of modern living, combining sophisticated design with premium amenities. Every detail has been carefully curated to provide an unparalleled lifestyle experience in one of the city's most sought-after locations.
            </p>
          </div>
          
          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-[var(--location-blue-600)] rounded-xl flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-[var(--location-blue-800)] mb-2">Prime Location</h4>
              <p className="text-sm text-[var(--location-gray-600)]">Strategically located in the heart of the city</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-green-800 mb-2">Ready to Move</h4>
              <p className="text-sm text-[var(--location-gray-600)]">Immediate possession available</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-purple-800 mb-2">Luxury Living</h4>
              <p className="text-sm text-[var(--location-gray-600)]">Premium finishes and amenities</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Detailed Features Table */}
      <CollapsibleSection 
        id="features" 
        title="Detailed Features" 
        activeSection={activeSection}
        icon={CheckCircle}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {detailedFeatures.map((item, index) => (
            <div 
              key={index}
              className="feature-item group relative overflow-hidden flex items-center justify-between border-2 border-[var(--location-blue-100)] bg-white p-5 rounded-xl transition-all duration-300 hover:border-[var(--gold-base)] hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold-base)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10 flex items-center gap-3 text-sm font-semibold text-[var(--location-gray-600)] transition-colors group-hover:text-[var(--location-blue-800)]">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--location-blue-50)] group-hover:bg-[var(--gold-base)]/20 transition-all duration-300">
                  <item.icon className="h-5 w-5 text-[var(--location-blue-600)] group-hover:text-[var(--gold-base)] transition-all duration-300 group-hover:scale-110" />
                </div>
                {item.label}
              </span>
              <span className="relative z-10 text-base font-bold text-[var(--location-blue-800)] group-hover:text-[var(--gold-base)] transition-colors duration-300">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 5. Amenities Section */}
      <CollapsibleSection 
        id="amenities" 
        title="Premium Amenities" 
        activeSection={activeSection}
        icon={Sparkles}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {property.amenities.map((amenity, index) => (
            <div
              key={index}
              className="feature-item group relative overflow-hidden flex items-center gap-4 rounded-xl border-2 border-[var(--location-blue-100)] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[var(--gold-base)] hover:shadow-xl hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-base)]/10 via-transparent to-[var(--location-blue-600)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <span className="relative z-10 text-sm font-bold text-[var(--location-blue-800)] group-hover:text-[var(--gold-base)] transition-colors duration-300">
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