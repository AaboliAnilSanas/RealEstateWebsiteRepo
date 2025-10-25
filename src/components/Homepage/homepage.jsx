import React from 'react';
import Video from './Video/video';
import FilterComponent from '../UIComponents/FilterComponent';
import FilterSearchPage from './FilterSearchPage/filterSearchPage';
import LocationSection from './LocationCards/LocationCard';
import Footer from '../Footer/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* SVG Background */}
     {/* <svg 
        className="absolute -right-40 -top-130 z-10 scale-x-300 rotate-20"
        width="1500"
        height="1040"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5E2B6D" />
            <stop offset="50%" stopColor="#A87CA0" />
            <stop offset="100%" stopColor="#E6E6FA" />
          </linearGradient>
        </defs>
        <polygon
          points="50,15 85,30 85,70 50,85 15,70 15,30"
          fill={'url(#hexagonGradient)'}
          strokeWidth="2"
        />
      </svg> */}
      
      {/* Video on top of SVG */}
      <div className=" relative z-20 w-[96%] mt-2  pl-15"> {/* Added relative and z-20 */}
        <Video />
      </div>
      
      {/* Filter Section */}
      <div className="mx-[250px] shadow-xl/20 -mt-20 z-30 relative">
        <FilterSearchPage/>
        {/* <FilterComponent/> */}
      </div>
           <LocationSection/>
           <Footer/>
    </div>
  );
};

export default HomePage;