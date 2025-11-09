import React from 'react';
import SplitText from './SplitText'; // Ensure this path is correct

const VideoHero = () => {
  const videoSource = "/real-estate-hero.mp4";

  const handleAnimationComplete = () => {
    console.log('Title animation completed!');
  };

  return (
    // IMPROVED: Adjusted height for mobile (h-[350px]) and desktop (md:h-[550px])
    <div className="relative h-[350px] md:h-[550px] flex items-center justify-center overflow-hidden">
      
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        // Ensures the video covers the container while preserving aspect ratio
        className="absolute z-0 w-full h-full object-cover" 
        src={videoSource} 
      >
        Your browser does not support the video tag.
      </video>

      <div className="absolute z-10 w-full h-full bg-indigo-900 opacity-30"></div>

      {/* Content Un-commented and active */}
      {/* <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        <SplitText
          text="Welcome To Luxury Real Estate"
          // IMPROVED: Reduced text size on mobile (text-3xl)
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg text-white"
          delay={150}
          duration={2.6}
          ease="power3.out"
          splitType="lines"
          from={{ opacity: 0, y: 50 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          tag="h1"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        
        <button 
          className="py-3 px-8 text-lg font-medium text-white 
          bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-500 hover:to-rose-600
          rounded-md shadow-2xl transition duration-300 transform hover:scale-105
          mt-6 cursor-pointer"
        >
          Explore
        </button>
      </div> */}
    </div>
  );
};

export default VideoHero;