import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Property Listing', href: '#' },
    { name: 'Locations', href: '#' },
    { name: 'Blog', href: '#' }
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

  return (
    <footer className="bg-gradient-to-b from-stone-50 to-amber-50/30 text-gray-800 text-sm mt-auto">
      {/* Subtle Top Accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="mx-auto max-w-screen-2xl  py-8 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* About Section */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 bg-clip-text text-transparent">
              Suniel Kapoor
            </h3>
            
            <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-md">
              A trusted name in Goa's real estate market, offering expert services in residential, commercial, and investment properties.
            </p>

            <div className="flex gap-3 mb-6">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border-2 border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:scale-105 transition-all shadow-sm"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="space-y-3">
              {[
                { Icon: Phone, text: '+91 123 456 7890' },
                { Icon: Mail, text: 'info@property.com' },
                { Icon: MapPin, text: 'Mumbai, Maharashtra' }
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100">
                    <Icon className="w-4 h-4 text-amber-600" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links & Locations */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <strong className="text-sm font-bold text-gray-800 mb-4 block">
                Quick Links
              </strong>

              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      className="text-sm text-gray-600 hover:text-amber-600 hover:translate-x-1 inline-block transition-all"
                      href={link.href}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong className="text-sm font-bold text-gray-800 mb-4 block">
                Locations
              </strong>

              <ul className="space-y-2">
                {locations.map((location) => (
                  <li key={location}>
                    <a
                      className="text-sm text-gray-600 hover:text-amber-600 hover:translate-x-1 inline-block transition-all"
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
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow">
              <h4 className="text-sm font-bold text-gray-800 mb-2">Ready to Find Your Dream Property?</h4>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Let us help you discover the perfect space that matches your vision and lifestyle.
              </p>
              
              <a
                href="#"
                className="group inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:shadow-md transition-all"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-amber-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-500">
              © 2024 Company. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-amber-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;