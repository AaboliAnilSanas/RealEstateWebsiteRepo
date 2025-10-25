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
      <div className="relative h-64">
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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
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
        
        .animate-pulse-border {
          animation: pulseBorder 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          className="text-center mb-16"
          style={{
            animation: 'fadeInUp 0.8s ease-out forwards',
            opacity: 0
          }}
        >
          <h2 className="text-5xl font-light mb-6 tracking-tight" style={{ color: 'var(--tertiary-color)' }}>
            Explore Prime Locations
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: 'var(--primary-color)' }}
          ></div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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