import React, { useState, useEffect, useRef } from 'react';

const LocationCard = ({ image, location }) => {
  return (
    <div className="flex flex-col items-center text-center group cursor-pointer relative">
      {/* Square Card Container with Rounded Image - Updated hover effect */}
      <div className="relative mb-4 rounded-2xl overflow-hidden border-4 border-white shadow-2xl group-hover:shadow-2xl transition-all duration-300 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 group-hover:-translate-y-4 group-hover:border-b-8 group-hover:border-b-[#FDBA74]">
        <img 
          src={image} 
          alt={location}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
               background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
               backgroundSize: '200% 200%',
               animation: 'shimmer 1.5s ease-in-out'
             }}>
        </div>

        {/* Background Glow Effect - Comes from bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-100 bg-gradient-to-t from-black/20 to-black/20 transition-all duration-500 ease-out rounded-2xl"></div>

        {/* Arrow Icon - Comes from top on hover */}
        <div className="absolute top-35 right-35 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-y-40 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-lg">
          <svg className="w-5 h-5 text-gray-800 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        {/* Location Name Inside Card - Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl transition-all duration-300 group-hover:text-white group-hover:scale-105">
            {location}
          </h3>
        </div>
      </div>
    </div>
  );
};

const LocationSection = () => {
  const locations = [
    {
      id: 1,
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80",
    },
    {
      id: 2,
      location: "Pune",
      image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800&q=80",
    },
    {
      id: 3,
      location: "Alibaug",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
    {
      id: 4,
      location: "Lonavala",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
    },
    {
      id: 5,
      location: "Goa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    },
    {
      id: 6,
      location: "Nashik",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    },
    {
      id: 7,
      location: "Thane",
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
    },
    {
      id: 8,
      location: "Navi Mumbai",
      image: "https://images.unsplash.com/photo-1573873244472-b4dbb4d29e2e?w=800&q=80",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle responsive cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 768) {
        setCardsToShow(2);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.ceil(locations.length / cardsToShow) - 1;

  const nextSlide = () => {
    setCurrentIndex(current => current >= maxIndex ? 0 : current + 1);
  };

  // Auto-rotate carousel with pause on hover
  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only set interval if not hovering
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000); // Change slide every 4 seconds
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, maxIndex, isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const getVisibleLocations = () => {
    const start = currentIndex * cardsToShow;
    return locations.slice(start, start + cardsToShow);
  };

  return (
    <div className="relative pt-60 pb-40 px-4  -mt-55 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
        
        .carousel-item {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>

      {/* Top-left PNG Image */}
      {/* <div className="absolute top-0 left-0 z-10 ">
        <img 
          src="/svgLinePng.png" 
          alt="Zaceler Data Protector" 
          className="h-[200px] w-[1000px] opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div> */}

      {/* Bottom-right PNG Image */}
      {/* <div className="absolute bottom-0 right-0 z-10 -rotate-180">
        <img 
          src="/svgLinePng.png" 
          alt="Zaceler Data Protector" 
          className="h-[200px] w-[1000px] opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div> */}

      {/* Custom Cursor Glow Effect */}
      <div 
        className="fixed pointer-events-none z-50 transition-all duration-100 ease-out opacity-20"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0.3) 30%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Enhanced Background Gradients */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-200 to-orange-200 opacity-25 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 opacity-25 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 opacity-20 blur-3xl"></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto ">
        {/* Section Header - Centered without arrows */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore Prime Locations
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto shadow-lg"></div>
          <p className="text-gray-600 text-lg lg:text-xl mt-6 max-w-2xl mx-auto">
            Discover amazing destinations with our premium locations
          </p>
        </div>

        {/* Carousel Container - Centered with square cards */}
        <div 
          className="flex justify-center items-center gap-6 lg:gap-6 xl:gap-18 transition-all duration-700 ease-in-out"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {getVisibleLocations().map((location, index) => (
            <div 
              key={location.id}
              className="carousel-item flex-shrink-0"
              style={{ 
                opacity: 0,
                animationDelay: `${index * 0.15}s`
              }}
            >
              <LocationCard
                image={location.image}
                location={location.location}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Dots Indicator */}
        <div className="flex justify-center items-center space-x-4 mt-20">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-500 ease-out ${
                index === currentIndex 
                  ? 'w-10 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg transform scale-110' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSection;