import React from 'react';
import { Briefcase, Clock, Key, Home, ChevronRight, ParkingCircle, CheckCircle, Ruler, Video } from 'lucide-react';
// CORRECTED IMPORT: Use './' because the file is a sibling
import { SpecItem, PropertyIcons } from './CommonAtoms.jsx';

// Destructure Icons for clarity in this file
const { BedDouble, Bath, Maximize2, Layers } = PropertyIcons;

// --- CollapsibleSection Component (MODIFIED) ---
const CollapsibleSection = ({ id, title, children, activeSection }) => {
    // Determine if the current section is the active one
    const isActive = activeSection === id;
    
    // CONDITIONALLY RENDER THE ENTIRE SECTION WRAPPER
    if (!isActive) {
        return null; // Don't render anything if this section is not active
    }
    
    // If active, render the section wrapper, title, and content
    return (
        <section id={id} className="mb-10 p-6 rounded-xl bg-white shadow-xl">
            {/* The single heading for the active section */}
            <h2 className="text-2xl font-bold text-[var(--location-blue-800)]">
                {title}
            </h2>
            {/* The content, rendered immediately below the title */}
            <div className="mt-6">
                {children}
            </div>
        </section>
    );
};
// -----------------------------------------------------------------


const PropertyBodySections = ({ property, activeSection }) => {
  // Data for the Detailed Features Table
  const detailedFeatures = [
    { label: 'Property Type', value: property.propertyType, icon: Home },
    { label: 'Category', value: property.propertyCategory, icon: Briefcase },
    { label: 'Transaction Type', value: property.transactionType, icon: Clock },
    { label: 'Possession By', value: property.possessionBy, icon: Clock },
    { label: 'Total Floors', value: property.totalFloors, icon: Layers },
    { label: 'Balconies', value: property.balconies, icon: ChevronRight },
    { label: 'Parking Slots', value: property.parking, icon: ParkingCircle },
    { label: 'Furnishing Status', value: property.furnishing, icon: CheckCircle },
    { label: 'Ownership Type', value: property.ownership, icon: Key },
    { label: 'Carpet Area', value: property.carpetArea, icon: Maximize2 }, // Duplicate icon is fine
    { label: 'Built-up Area', value: property.builtUpArea, icon: Ruler },
    { label: 'Super Built-up Area', value: property.superBuildUpArea, icon: Ruler },
  ];

  return (
    <div className="space-y-4">
      
      {/* 0. OVERVIEW SECTION (Default Open) - Displays Summary Paragraph */}
      <CollapsibleSection 
        id="overview" 
        title="Property Overview" 
        activeSection={activeSection}
      >
        <p className="leading-relaxed text-[var(--location-gray-600)]">{property.uniqueSellingPoints}</p>
      </CollapsibleSection>


      {/* 1. Key Specifications Section */}
      <CollapsibleSection 
        id="specifications" 
        title="Core Specifications" 
        activeSection={activeSection}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
      >
        <div className="overflow-hidden rounded-2xl border border-[var(--gold-light)] bg-white p-0 shadow-none">
            <p className="relative z-10 leading-relaxed text-[var(--location-gray-600)]">This area can be used for detailed description text, floor plans, or neighborhood analysis.</p>
        </div>
      </CollapsibleSection>

      {/* 3. Detailed Features Table */}
      <CollapsibleSection 
        id="features" 
        title="Detailed Features" 
        activeSection={activeSection}
      >
        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[var(--location-blue-100)] bg-white shadow-lg sm:grid-cols-2">
          {detailedFeatures.map((item, index) => (
            <div 
              key={index} 
              className={`group flex items-center justify-between border-b border-[var(--location-blue-100)] bg-white p-4 transition-all duration-300 hover:bg-[var(--location-blue-50)] last:border-b-0`}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-[var(--location-gray-600)] transition-colors group-hover:text-[var(--location-blue-800)]">
                <item.icon className="h-4 w-4 text-[var(--gold-base)] transition-transform group-hover:scale-110" />
                {item.label}
              </span>
              <span className="text-sm font-semibold text-[var(--location-blue-800)]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 4. Media Section */}
      <CollapsibleSection 
        id="media" 
        title="Media" 
        activeSection={activeSection}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="group relative overflow-hidden rounded-xl border-l-4 border-[var(--gold-base)] bg-white p-4 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-base)] shadow-md transition-transform duration-300 hover:scale-110">
                <Video className="h-6 w-6 text-white" />
              </div>
              <span className="text-base font-medium text-[var(--location-blue-800)]">{property.photos.length} Photos Uploaded</span>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl border-l-4 border-[var(--location-blue-600)] bg-white p-4 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--location-blue-400)] to-[var(--location-blue-600)] shadow-md transition-transform duration-300 hover:scale-110">
                <Video className="h-6 w-6 text-white" />
              </div>
              <span className="text-base font-medium text-[var(--location-blue-800)]">
                Video{property.videos.length > 0 ? ' Available' : ' Not Uploaded'}
              </span>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Amenities Section */}
      <CollapsibleSection 
        id="amenities" 
        title="Premium Amenities" 
        activeSection={activeSection}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {property.amenities.map((amenity, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 rounded-xl border border-[var(--location-blue-100)] bg-white/70 p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white"
            >
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium text-[var(--location-blue-800)]">{amenity}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PropertyBodySections;