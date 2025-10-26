import React from 'react';

const LocationCard = ({ image, location, index }) => {
  const cardStyle = {
    animation: `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`,
    opacity: 0
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl group cursor-pointer"
      style={cardStyle}
    >
      <div className="relative h-56 sm:h-60 lg:h-64">
        <img 
          src={image} 
          alt={location}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/70"></div>
        
        {/* Shimmer effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 1s ease-in-out'
          }}
        ></div>
        
        {/* Accent line */}
        <div 
          className="absolute bottom-16 left-6 h-0.5 transition-all duration-500"
          style={{ 
            backgroundColor: 'var(--primary-color)',
            width: '0',
          }}
        ></div>
        
        {/* Location Name */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 
            className="text-white font-semibold text-xl uppercase transition-all duration-500"
            style={{
              letterSpacing: '0.1em',
              transform: 'translateX(0)'
            }}
          >
            {location}
          </h3>
        </div>
        
        {/* Hover overlay effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-500"></div>
        
        {/* Corner accent */}
        <div 
          className="absolute top-4 right-4 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ 
            borderColor: 'var(--primary-color)',
            width: '2rem',
            height: '2rem'
          }}
        ></div>
      </div>

      <style jsx>{`
        .group:hover h3 {
          transform: translateX(0.5rem);
          letter-spacing: 0.15em;
        }
        
        .group:hover .absolute.bottom-16 {
          width: 3rem !important;
        }
        
        .group:hover .absolute.top-4 {
          width: 3rem !important;
          height: 3rem !important;
        }
      `}</style>
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

  return (
    // REMOVED overflow-hidden and fixed the rounded corners
    <div className="mx-4 mt-10 rounded-[16px] mb-6 relative pb-6 px-4 sm:px-6 lg:px-8 flex items-center bg-white/10 backdrop-blur-sm border border-white/20">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseBorder {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(210, 166, 63, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(210, 166, 63, 0);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
          100% {
            background-position: 0% center;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }
        
        @keyframes floatReverse {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-30px, 30px) rotate(-5deg);
          }
          66% {
            transform: translate(20px, -20px) rotate(5deg);
          }
        }
        
        .animate-pulse-border {
          animation: pulseBorder 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Animated Background Gradients - Moved outside the rounded container */}
      <div className="absolute inset-0 mt-10 overflow-hidden pointer-events-none rounded-[16px]">
        {/* Top Left Gradient Orb */}
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #d2a63f 0%, #f3b524 50%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }}
        ></div>
        
        {/* Top Right Gradient Orb */}
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #A87CA0 0%, #5E2B6D 50%, transparent 70%)',
            animation: 'floatReverse 25s ease-in-out infinite'
          }}
        ></div>
        
        {/* Middle Left Accent */}
        <div 
          className="absolute top-1/3 -left-32 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #5E2B6D 0%, #E6E6FA 50%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite 5s'
          }}
        ></div>
        
        {/* Bottom Right Gradient Orb */}
        <div 
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #f3b524 0%, #d2a63f 50%, transparent 70%)',
            animation: 'floatReverse 22s ease-in-out infinite 3s'
          }}
        ></div>
        
        {/* Center Bottom Accent */}
        <div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #A87CA0 0%, transparent 70%)',
            animation: 'float 28s ease-in-out infinite 7s'
          }}
        ></div>
      </div>
      
      <div className="relative z-10 w-full mt-10">
        {/* Section Header */}
        <div 
          className="text-center mb-8"
          style={{
            animation: 'fadeInUp 0.8s ease-out forwards',
            opacity: 0
          }}
        >
          {/* Decorative element above title */}
          <div className="flex items-center mt-5  justify-center gap-3 mb-4">
            <div 
              className="w-12 h-0.5"
              style={{ 
                background: 'linear-gradient(to right, transparent, #d2a63f, transparent)'
              }}
            ></div>
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#d2a63f' }}
            ></div>
            <div 
              className="w-12 h-0.5"
              style={{ 
                background: 'linear-gradient(to right, transparent, #d2a63f, transparent)'
              }}
            ></div>
          </div>
          
          <h2 
            className="text-4xl lg:text-5xl font-light mb-4 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Explore Prime Locations
          </h2>
          
          {/* Decorative line below title */}
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ 
              background: 'linear-gradient(to right, #5E2B6D, #d2a63f, #A87CA0)',
              boxShadow: '0 4px 15px rgba(210, 166, 63, 0.3)'
            }}
          ></div>
          
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {locations.map((loc, index) => (
            <LocationCard
              key={loc.id}
              image={loc.image}
              location={loc.location}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSection;