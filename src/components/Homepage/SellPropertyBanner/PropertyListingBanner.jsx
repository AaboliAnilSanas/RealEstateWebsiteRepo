import React from 'react';

const PropertyListingBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-orange-50 to-amber-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Section */}
          <div className="text-center lg:text-left space-y-8">
            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Sell or rent faster at the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                right price!
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
              Your perfect buyer is waiting, list your property now
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-orange-600 hover:to-amber-600">
                <span className="relative z-10">Post Property, It's FREE</span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm group-hover:scale-105"></div>
                
                {/* Button shine effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}>
                </div>
              </button>

              {/* Secondary CTA */}
              {/* <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                Learn More
              </button> */}
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Zero Commission</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Instant Visibility</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Verified Buyers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative group">
              {/* Main Image */}
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" 
                  alt="Modern Property" 
                  className="w-full h-80 lg:h-96 object-cover"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">₹2.8Cr</div>
                  <div className="text-xs text-gray-600">Starting Price</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold">500+</div>
                    <div className="text-gray-600">Properties</div>
                  </div>
                </div>
              </div>

              {/* Background Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-orange-200 to-amber-200 rounded-3xl rotate-12 opacity-60 group-hover:rotate-45 transition-transform duration-700"></div>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-xs text-gray-600">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">2K+</div>
                  <div className="text-xs text-gray-600">Cities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default PropertyListingBanner;