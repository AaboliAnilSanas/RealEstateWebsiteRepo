import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, Award, Eye } from 'lucide-react';

const PropertyHeaderAndGallery = ({ property }) => {
  const [mainImage, setMainImage] = useState(property?.mainImage || '');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);

  useEffect(() => {
    setMainImage(property?.mainImage || '');
    setIsImageLoaded(false);
  }, [property]);

  const location = `${property.houseNo ? `${property.houseNo}, ` : ''}${property.subLocality ? `${property.subLocality}, ` : ''}${property.locality}, ${property.city}`;

  const handleThumbnailClick = (img) => {
    if (img === mainImage) return;
    setImageTransition(true);
    setTimeout(() => {
      setMainImage(img);
      setIsImageLoaded(false);
      setImageTransition(false);
    }, 300);
  };

  return (
    <div className="flex flex-col space-y-4">
      <style>{`
        @keyframes elegant-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-3px) scale(1.02); }
        }
        @keyframes gold-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes image-reveal {
          from { opacity: 0; transform: scale(1.05); filter: blur(10px); }
          to { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes price-glow-blue {
          0%, 100% { text-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
          50% { text-shadow: 0 0 30px rgba(37, 99, 235, 0.5), 0 0 40px rgba(59, 130, 246, 0.3); }
        }
        .elegant-fade-in { animation: elegant-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .subtle-float { animation: subtle-float 4s ease-in-out infinite; }
        .gold-shimmer {
          background: linear-gradient(90deg, rgba(206, 181, 37, 0) 0%, rgba(222, 212, 134, 0.3) 50%, rgba(243, 229, 152, 0) 100%);
          background-size: 200% 100%;
          animation: gold-shimmer 3s ease-in-out infinite;
        }
        .image-reveal { animation: image-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .price-glow-blue { animation: price-glow-blue 3s ease-in-out infinite; }
        .premium-shadow {
          box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1),
                      0 0 0 1px rgba(37, 99, 235, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        .gallery-shadow {
          box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.3),
                      0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        .thumbnail-shadow {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1),
                      0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        .thumbnail-active {
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3),
                      0 0 0 2px #2563EB,
                      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
        }
        .image-transition {
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: 0.5;
          transform: scale(0.98);
        }

        .header-bg {
          background: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.8) 25%, rgba(250,250,250,0.95) 100%),
                      url('https://www.transparenttextures.com/patterns/symphony.png');
          background-size: cover;
          background-blend-mode: overlay;
        }
      `}</style>

      {/* Header Section */}
      <header className="relative overflow-hidden rounded-xl header-bg px-6 py-4 premium-shadow elegant-fade-in backdrop-blur-xl border border-white/60 flex-shrink-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-0.5 gold-shimmer"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-lg subtle-float uppercase tracking-wider">
                <Award className="h-3 w-3" />
                {property.transactionType}
              </span>
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-slate-700 to-slate-600 px-3 py-1 text-xs font-semibold text-white shadow-md uppercase tracking-wider">
                {property.propertyCategory}
              </span>
            </div>

            <h1 className="mb-1 text-2xl font-bold text-slate-800 tracking-tight">
              {property.apartmentSociety}: <span className="font-light text-slate-600">{property.propertyType}</span>
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span className="font-medium">{location}</span>
            </div>
          </div>

          {/* Price Section - Blue Theme */}
          <div className="flex items-center gap-2 ml-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent price-glow-blue">
              {property.price}
            </span>
          </div>
        </div>
      </header>

      {/* Gallery Section (unchanged) */}
      <section
        id="property-gallery"
        className="overflow-hidden rounded-2xl bg-white gallery-shadow elegant-fade-in flex flex-1 h-[60vh] max-h-[600px]"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="flex flex-1 gap-4 p-4 overflow-hidden">
          <div className="w-64 flex-shrink-0 overflow-y-auto">
            <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-3 h-full">
              <div className="grid grid-cols-2 gap-2">
                {property.photos.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(img)}
                    className={`group relative overflow-hidden rounded-lg transition-all duration-300 focus:outline-none ${
                      mainImage === img
                        ? 'thumbnail-active scale-105'
                        : 'thumbnail-shadow hover:scale-105 hover:shadow-xl'
                    }`}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className={`h-full w-full object-cover transition-all duration-500 ${
                          mainImage === img ? 'opacity-100' : 'opacity-75 group-hover:opacity-100'
                        }`}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          mainImage === img
                            ? 'bg-gradient-to-br from-blue-400/20 to-transparent opacity-100'
                            : 'bg-gradient-to-br from-slate-800/20 to-transparent opacity-0 group-hover:opacity-100'
                        }`}
                      ></div>
                      {mainImage === img && (
                        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-lg"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="flex-1 relative overflow-hidden rounded-xl bg-slate-900">
            <img
              src={mainImage}
              alt="Main Property View"
              className={`h-full w-full object-cover transition-all duration-700 ${
                isImageLoaded && !imageTransition ? 'image-reveal' : ''
              } ${imageTransition ? 'image-transition' : ''}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none"></div>

            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-4 py-2 shadow-2xl border border-white/40">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
                  {property.availabilityStatus}
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1.5 shadow-lg border border-white/10">
                <Eye className="h-3.5 w-3.5 text-white/90" />
                <span className="text-xs font-medium text-white/90">
                  {property.photos.findIndex(img => img === mainImage) + 1} / {property.photos.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyHeaderAndGallery;
