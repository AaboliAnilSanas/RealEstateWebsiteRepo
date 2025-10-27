import React from 'react';
import Video from './Video/video';
import FilterComponent from '../UIComponents/FilterComponent';
import FilterSearchPage from './FilterSearchPage/filterSearchPage';
import LocationSection from './LocationCards/LocationCard';
import Footer from '../Footer/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative ">    
      
      {/* Video on top of SVG */}
      <div className=" relative z-20  "> {/* Added relative and z-20 */}
        <Video />
      </div>
      
      {/* Filter Section */}
      <div className="mx-[150px] mb-20 -mt-20 z-30 relative rounded-2xl ring-5 ring-inset ring-gray-200 bg-white">
        <FilterSearchPage/>
      </div>
           <LocationSection/>
           <Footer/>
    </div>
  );
};

export default HomePage;