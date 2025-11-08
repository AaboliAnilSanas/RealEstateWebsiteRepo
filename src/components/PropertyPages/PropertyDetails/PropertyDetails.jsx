import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react';

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

  // REFS for tracking scroll position
  const bodyRef = useRef(null);
  const locationRef = useRef(null);

  // STATE for scroll-triggered animations
  const [isBodyInView, setIsBodyInView] = useState(false);
  const [isLocationInView, setIsLocationInView] = useState(false);

  useEffect(() => {
    // Function to check if elements are in the viewport
    const checkInView = () => {
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.8; // Trigger when 80% of element is in view

      // Check Body/Nav Section
      if (bodyRef.current && !isBodyInView) {
        const bodyTop = bodyRef.current.getBoundingClientRect().top;
        if (bodyTop < triggerPoint) {
          setIsBodyInView(true);
        }
      }

      // Check Location Section
      if (locationRef.current && !isLocationInView) {
        const locationTop = locationRef.current.getBoundingClientRect().top;
        if (locationTop < triggerPoint) {
          setIsLocationInView(true);
        }
      }
    };

    // Trigger on mount (for elements already in view on load)
    checkInView(); 

    window.addEventListener('scroll', checkInView);
    return () => window.removeEventListener('scroll', checkInView);
  }, [isBodyInView, isLocationInView]); // Dependencies to prevent unnecessary checks
  
  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20">
        <h1 className="text-3xl font-bold text-red-600">Property Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/50 pt-10">
      {/* Single FloatingActions component handles all three buttons */}
      <FloatingActions />
      
      {/* Styles for the sections */}
      <style>{`
        /* Animation for section content transition */
        @keyframes section-appear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-section-appear {
          animation: section-appear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Page Load (Header/Breadcrumb) - Slower and smoother */
        @keyframes page-load-appear {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-page-load {
          animation: page-load-appear 1.0s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
        }

        /* NEW SCROLL-TRIGGERED SLIDE-IN ANIMATIONS */
        /* Slide in from Left (for StickyNav) */
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-100px); }
          to { transform: translateX(0); opacity: 1; }
        }
        .slide-in-left-on-scroll {
          opacity: 0; /* Default hidden state */
          transition: opacity 0.1s; /* Short transition to hide initial state */
        }
        .slide-in-left-on-scroll.in-view {
          animation: slide-in-left 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* Slide in from Right (for Body Content & Location) */
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100px); }
          to { transform: translateX(0); opacity: 1; }
        }
        .slide-in-right-on-scroll {
          opacity: 0; /* Default hidden state */
          transition: opacity 0.1s; /* Short transition to hide initial state */
        }
        .slide-in-right-on-scroll.in-view {
          animation: slide-in-right 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* Existing styles */
        @keyframes title-slide {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
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
      
      <div 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Breadcrumb / Back Link - Staggered load: 0s */}
        <Link 
          to="/properties" 
          className="group mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-all duration-300 hover:text-purple-600 hover:translate-x-1 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg animate-page-load"
          style={{ animationDelay: '0s' }}
        >
          <Home className="h-4 w-4" />
          <span>Back to Listings</span>
        </Link>

        {/* Property Header - Staggered load: 0.2s */}
        <div className="animate-page-load" style={{ animationDelay: '0.2s' }}>
            <PropertyHeader property={property} />
        </div>
      </div>

      {/* Main Content Layout */}
      <div 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 pb-20"
      >
        {/* Sticky Nav and Body Sections Container - Scroll Triggered */}
        {/* Default: flex-col (stacked) on mobile/tablet, lg:flex-row (side-by-side) on large screens */}
        <div 
          ref={bodyRef}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Sticky Navigation Sidebar - SLIDE IN FROM LEFT */}
          {/* Default: full width, not sticky. lg:sticky, lg:w-1/4 on large screens */}
          <div className={`w-full mb-6 lg:mb-0 lg:sticky lg:top-20 lg:w-1/4 lg:self-start slide-in-left-on-scroll ${isBodyInView ? 'in-view' : ''}`}>
            <StickyNav activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
          
          {/* Main Body Content - SLIDE IN FROM RIGHT */}
          {/* Default: full width. lg:w-3/4 on large screens */}
          <div className={`w-full lg:w-3/4 slide-in-right-on-scroll ${isBodyInView ? 'in-view' : ''}`}>
            <PropertyBodySections 
              property={property} 
              activeSection={activeSection}
            />
          </div>
        </div>
        
        {/* Location & Map Section - SLIDE IN FROM RIGHT */}
        <section 
          ref={locationRef}
          id="location-map" 
          className={`mt-8 overflow-hidden rounded-2xl bg-white shadow-xl border border-blue-100 slide-in-right-on-scroll ${isLocationInView ? 'in-view' : ''}`}
        >
          {/* Header */}
          <div className="section-header bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  Location
                </h2>
                <div className="mt-1 h-1 w-20 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                {property.apartmentSociety} Locality
              </h3>
              
              <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-2xl shadow-2xl border-4 border-blue-100">
                {/* Map Embed */}
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
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-blue-100 text-sm font-medium text-blue-800">
                  Latitude: <span className="font-bold text-yellow-600">{property.latitude}</span>, 
                  Longitude: <span className="font-bold text-yellow-600">{property.longitude}</span>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-base text-gray-700 font-medium">
                  The property is located in the <strong>{property.locality}</strong> area of <strong>{property.city}</strong>. This neighborhood is known for its excellent connectivity and premium real estate.
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