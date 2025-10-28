import React from "react";
import Video from "./Video/video";
import FilterComponent from "../UIComponents/FilterComponent";
import FilterSearchPage from "./FilterSearchPage/filterSearchPage";
import LocationSection from "./LocationCards/LocationCard";
import Footer from "../Footer/Footer";
import PropertyListingBanner from "./SellPropertyBanner/PropertyListingBanner";
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Background SVG Container */}

      {/* Content Container */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-45 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-200 to-orange-200 opacity-25 blur-3xl animate-pulse"></div>
        <div className="absolute top-45 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-700 to-pink-200 opacity-25 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 opacity-20 blur-3xl"></div>
      </div> */}
      <div className="relative z-10">
        {/* Video Section */}
        <div className="relative z-20   bg-gradient-to-br from-gray-50  from-gray-50 ">
          <Video />
           <div className="mx-[150px] mb-20  -mt-20 z-30 relative rounded-2xl ring-5 ring-inset ring-gray-200 bg-white">
          <FilterSearchPage />
        </div>
        </div>
        
        {/* Filter Section
        <div className="mx-[150px] mb-20 -mt-55 z-30 relative rounded-2xl ring-5 ring-inset ring-gray-200 bg-white">
          <FilterSearchPage />
        </div> */}

        <LocationSection />
        <PropertyListingBanner/>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
