import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react'; // ADD MapPin

import { FloatingActions } from './CommonAtoms.jsx';
import PropertyHeader from './PropertyHeaderAndGallery.jsx';
import PropertyBodySections from './PropertyBodySections.jsx';
import StickyNav from './StickyNav.jsx';

// --- MOCK DATA STRUCTURE ---
const allPropertiesData = [
  {
    id: '1',
    transactionType: 'Sell', 
    propertyCategory: 'Residential', 
    propertyType: 'Flat/Apartment', 
    city: 'Mumbai', 
    locality: 'Bandra West', 
    subLocality: 'Pali Hill', 
    apartmentSociety: 'Skyline Towers', 
    houseNo: '1201',
    bedrooms: '3', 
    bathrooms: '3', 
    balconies: '2', 
    parking: '2', 
    furnishing: 'Semi-Furnished', 
    ownership: 'Freehold',
    carpetArea: '1200 sq.ft', 
    builtUpArea: '1500 sq.ft', 
    superBuildUpArea: '2000 sq.ft',
    availabilityStatus: 'Ready to Move', 
    totalFloors: '20', 
    floorNumber: '12', 
    possessionBy: 'Ready',
    price: '₹ 3,50,00,000',
    uniqueSellingPoints: "A stunning and spacious 3BHK apartment offering unparalleled views of the Arabian Sea. Located in the exclusive Pali Hill area, this property boasts premium fittings, imported marble flooring, and access to world-class amenities including a rooftop pool, gym, and private security. Perfect blend of luxury and convenience.",
    // ADDED LOCATION COORDINATES
    latitude: 19.0594, 
    longitude: 72.8277, 
    mainImage: 'https://images.unsplash.com/photo-1570129477490-48e02d84dbd2?w=1200&q=80',
    photos: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
      'https://images.unsplash.com/photo-1582063543265-d6023d6a9926?w=800&q=80',
      'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800&q=80',
      'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    ],
    videos: ['youtube.com/embed/demo'],
    amenities: [
      'Rooftop Swimming Pool', 
      'State-of-the-art Gymnasium', 
      '24/7 Security and CCTV',
      'High-Speed Elevators', 
      'Power Backup', 
      'Covered Car Parking', 
      'Landscaped Gardens',
      'Children\'s Play Area',
    ],
  },
  {
    id: '2', 
    transactionType: 'Rent/Lease', 
    propertyCategory: 'Residential', 
    propertyType: 'Independent House/Villa', 
    city: 'Bangalore', 
    locality: 'Whitefield', 
    subLocality: 'Ring Road', 
    apartmentSociety: 'Prestige Villas', 
    houseNo: 'V-12',
    bedrooms: '4', 
    bathrooms: '4', 
    balconies: '3', 
    parking: '4', 
    furnishing: 'Fully-Furnished', 
    ownership: 'Leasehold',
    carpetArea: '2500 sq.ft', 
    builtUpArea: '3000 sq.ft', 
    superBuildUpArea: '4000 sq.ft',
    availabilityStatus: 'Ready to Move', 
    totalFloors: '3', 
    floorNumber: '2', 
    possessionBy: '2023',
    price: '₹ 85,000 / month',
    uniqueSellingPoints: "An exquisite, fully-furnished 4 BHK villa located in the peaceful Prestige Villas community. Includes a private garden, modular kitchen, and exclusive club access. Ideal for large families looking for a luxurious rental.",
    // ADDED LOCATION COORDINATES
    latitude: 12.9716, 
    longitude: 77.5946,
    mainImage: 'https://images.unsplash.com/photo-1613506161989-13835c2b2a6f?w=1200&q=80',
    photos: ['https://images.unsplash.com/photo-1613506161989-13835c2b2a6f?w=800&q=80'],
    videos: [],
    amenities: ['Private Garden', 'Clubhouse Access', '24/7 Security', 'Modular Kitchen', 'Servant Quarters'],
  }
];

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const property = allPropertiesData.find(p => p.id === propertyId) || allPropertiesData[0];
  
  const [activeSection, setActiveSection] = useState('overview');
  
  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20">
        <h1 className="text-3xl font-bold text-red-600">Property Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/50 pt-10">
      <FloatingActions />
      
      {/* Styles for the new section's animations */}
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
        /* ADDED PAGE LOAD ANIMATION */
        @keyframes page-load-appear {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-page-load {
          animation: page-load-appear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* END ADDED PAGE LOAD ANIMATION */
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
      
      {/* Apply page load animation to the header and breadcrumb section (delay: 0s) */}
      <div 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-page-load" 
        style={{ animationDelay: '0s' }}
      >
        {/* Breadcrumb / Back Link */}
        <Link 
          to="/properties" 
          className="group mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-all duration-300 hover:text-purple-600 hover:translate-x-1 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          <Home className="h-4 w-4" />
          <span>Back to Listings</span>
        </Link>

        {/* Property Header */}
        <PropertyHeader property={property} />
      </div>

      {/* Main Content Layout: Sidebar + Body Sections */}
      {/* Apply page load animation to the body content section with a slight delay (delay: 0.2s) */}
      <div 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 pb-20 animate-page-load"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky Navigation Sidebar */}
          <div className="lg:sticky lg:top-20 lg:w-1/4 lg:self-start">
            <StickyNav activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
          
          {/* Main Body Content */}
          <div className="lg:w-3/4">
            <PropertyBodySections 
              property={property} 
              activeSection={activeSection}
            />
          </div>
        </div>
        
        {/* NEW: 6. LOCATION & MAP SECTION - Full-width, after the main two-column layout */}
        <section 
          id="location-map" 
          className="mt-8 overflow-hidden rounded-2xl bg-white shadow-xl border border-[var(--location-blue-100)] animate-section-appear"
        >
          {/* Header - Styled to match CollapsibleSection */}
          <div className="section-header bg-gradient-to-r from-[var(--location-blue-800)] via-[var(--location-blue-600)] to-[var(--location-blue-800)] px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  Location
                </h2>
                <div className="mt-1 h-1 w-20 bg-gradient-to-r from-[var(--gold-base)] to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
              <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[var(--location-blue-800)] mb-4">
                      {property.apartmentSociety} Locality
                  </h3>
                  
                  <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-2xl border-4 border-[var(--location-blue-100)]">
                      {/* Iframe for a map embed using the coordinates */}
                      <iframe
                          title="Property Location Map"
                          width="100%"
                          height="100%"
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                          className="border-0 rounded-xl"
                      ></iframe>
                      
                      {/* Coordinates Display */}
                      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-[var(--location-blue-100)] text-sm font-medium text-[var(--location-blue-800)]">
                          Latitude: <span className="font-bold text-[var(--gold-base)]">{property.latitude}</span>, 
                          Longitude: <span className="font-bold text-[var(--gold-base)]">{property.longitude}</span>
                      </div>
                  </div>

                  <div className="p-6 bg-[var(--location-blue-50)] rounded-xl border border-[var(--location-blue-100)]">
                    <p className="text-base text-[var(--location-gray-600)] font-medium">
                      The property is located in the **{property.locality}** area of **{property.city}**. This neighborhood is known for its excellent connectivity and premium real estate.
                    </p>
                  </div>
              </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertyDetails;