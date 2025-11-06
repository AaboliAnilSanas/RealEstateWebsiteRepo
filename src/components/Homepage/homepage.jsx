import React from "react";
import Video from "./Video/video";
import FilterComponent from "../UIComponents/FilterComponent";
import FilterSearchPage from "./FilterSearchPage/filterSearchPage";
import LocationSection from "./LocationCards/LocationCard";
import Footer from "../Footer/Footer";
import PropertyListingBanner from "./SellPropertyBanner/PropertyListingBanner";

const HomePage = () => {
  return (
    // ✅ Removed overflow-hidden so the page stays visible when popup opens
    <div className="min-h-screen flex flex-col relative overflow-visible">

      <div className="relative z-10">
        {/* Video Section */}
        <div className="relative z-20">
          <Video />

          {/* Search Filter Card */}
          <div className="mx-[150px] mb-20 -mt-20 z-30 relative rounded-2xl ring-5 ring-inset ring-gray-200 bg-white">
            <FilterSearchPage />
          </div>
        </div>

        {/* Location Cards */}
        <LocationSection />

        {/* Sell Property Banner */}
        <PropertyListingBanner />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
