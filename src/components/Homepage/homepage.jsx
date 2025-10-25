import React from 'react';
import Video from './Video/video';
// import Navbar from './Navbar/navbar';
import FilterComponent from '../UIComponents/FilterComponent';
import FilterSearchPage from './FilterSearchPage/filterSearchPage';
import LocationSection from './LocationCards/LocationCard';
import Footer from '../Footer/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar/> */}
      <Video />
      <div className="mx-[150px] shadow-xl/20 -mt-35 z-10 ">
      <FilterSearchPage/>
          {/* <FilterComponent/> */}
      </div>
           <LocationSection/>
           <Footer/>
    </div>
  );
};

export default HomePage;