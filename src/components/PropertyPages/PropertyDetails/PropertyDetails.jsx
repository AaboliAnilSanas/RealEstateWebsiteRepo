import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home } from 'lucide-react';

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
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 pb-20">
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
      </div>
    </div>
  );
};

export default PropertyDetails;