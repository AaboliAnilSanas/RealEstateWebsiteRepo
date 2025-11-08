import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'Buy Property', to: '/properties' },
    { name: 'Post Property', to: '/sell' },
    { name: 'Contact', to: '/contact' }
  ];

  const locations = [
    'Alibag',
    'Bandra West',
    'Bandra East',
    'Juhu',
    'Karjat',
    'Lonavala',
    'Andheri West'
  ];

  const handleHomeClick = () => {
    // Forces a smooth scroll to the very top of the viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[var(--location-blue-50)] to-white text-[var(--location-blue-800)] text-sm mt-auto">
      {/* Subtle Top Accent - Now using gold */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--gold-base)] to-transparent"></div>

      <div className="mx-auto max-w-screen-2xl py-6 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        
        {/* 🔄 KEY CHANGE: Layout switched from lg:grid-cols-12 to md:grid-cols-12 */}
        {/* The gap is also set to md:gap-8, slightly smaller than the original lg:gap-10 for tablet screens */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-10">
          
          {/* About Section */}
          {/* 🔄 KEY CHANGE: md:col-span-5 to allocate the same width */}
          <div className="md:col-span-5">
            <h3 className="text-lg md:text-xl font-bold mb-3 bg-gradient-to-r from-[var(--location-blue-600)] via-[var(--gold-base)] to-[var(--location-blue-700)] bg-clip-text text-transparent">
              Suniel Kapoor
            </h3>
            
            <p className="text-xs sm:text-sm text-[var(--location-gray-600)] leading-relaxed mb-4 sm:mb-5 max-w-md">
              A trusted name in Goa's real estate market, offering expert services in residential, commercial, and investment properties.
            </p>

            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white border-2 border-[var(--gold-light)] text-[var(--gold-base)] hover:bg-[var(--gold-light)] hover:border-[var(--gold-base)] hover:scale-105 transition-all shadow-sm"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>

            <div className="space-y-2 sm:space-y-3">
              {[
                { Icon: Phone, text: '+91 123 456 7890' },
                { Icon: Mail, text: 'info@property.com' },
                { Icon: MapPin, text: 'Mumbai, Maharashtra' }
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 text-[var(--location-blue-800)] text-xs sm:text-sm">
                  <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[var(--gold-light)]">
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--gold-base)]" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links & Locations */}
          {/* 🔄 KEY CHANGE: md:col-span-4 to allocate the same width */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 sm:gap-8">
            <div>
              <strong className="text-xs sm:text-sm font-bold text-[var(--location-blue-800)] mb-3 sm:mb-4 block">
                Quick Links
              </strong>

              <ul className="space-y-1 sm:space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      className="text-xs sm:text-sm text-[var(--location-gray-600)] hover:text-[var(--gold-base)] hover:translate-x-1 inline-block transition-all"
                      to={link.to}
                      onClick={link.name === 'Home' ? handleHomeClick : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong className="text-xs sm:text-sm font-bold text-[var(--location-blue-800)] mb-3 sm:mb-4 block">
                Locations
              </strong>

              <ul className="space-y-1 sm:space-y-2">
                {locations.map((location) => (
                  <li key={location}>
                    <a
                      className="text-xs sm:text-sm text-[var(--location-gray-600)] hover:text-[var(--gold-base)] hover:translate-x-1 inline-block transition-all"
                      href="#"
                    >
                      {location}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Card */}
          {/* 🔄 KEY CHANGE: md:col-span-3 to allocate the same width */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-[var(--gold-light)] hover:shadow-xl transition-shadow">
              <h4 className="text-xs sm:text-sm font-bold text-[var(--location-blue-800)] mb-2">Ready to Find Your Dream Property?</h4>
              <p className="text-[10px] sm:text-xs text-[var(--location-gray-600)] mb-3 sm:mb-4 leading-relaxed">
                Let us help you discover the perfect space that matches your vision and lifestyle.
              </p>
              
              <a
                href="/properties"
                className="group inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[var(--gold-base)] to-[var(--gold-dark)] text-white text-xs sm:text-sm font-medium py-2 px-4 sm:py-2.5 rounded-lg hover:shadow-md transition-all"
              >
                Get Started
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 sm:mt-8 sm:pt-6 border-t border-[var(--gold-light)]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[10px] sm:text-xs text-[var(--location-gray-600)]">
              © 2024 Company. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs text-[var(--location-gray-600)]">
              <a href="#" className="hover:text-[var(--gold-base)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--gold-base)] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;