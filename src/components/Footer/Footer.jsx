import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

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

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-50 text-gray-800 text-sm mt-auto">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mx-auto max-w-sm mb-6">
          <strong
            className="block text-center text-base font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 bg-clip-text text-transparent"
          >
            Get Latest Property Updates
          </strong>

          <div className="mt-3">
            <div className="relative">
              <input
                className="w-full rounded-full bg-white border-2 border-amber-200 px-3 py-1.5 pr-24 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-500"
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={handleSubscribe}
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 px-3 py-1 text-xs font-medium text-white transition hover:opacity-90"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="text-center sm:text-left">
            <h3
              className="text-sm font-bold mb-1 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 bg-clip-text text-transparent"
            >
              Suniel Kapoor
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              A trusted name in Goa's real estate market, offering expert services in residential, commercial, and investment properties.
            </p>

            <div className="mt-3 flex justify-center sm:justify-start gap-2">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  className="text-amber-600 hover:text-amber-700 transition"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <strong
              className="text-xs font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 bg-clip-text text-transparent"
            >
              Quick Links
            </strong>

            <ul className="mt-2 space-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    className="text-xs text-gray-700 transition hover:text-amber-600"
                    href={link.href}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="text-center sm:text-left">
            <strong
              className="text-xs font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 bg-clip-text text-transparent"
            >
              Locations
            </strong>

            <ul className="mt-2 space-y-1">
              {locations.map((location) => (
                <li key={location}>
                  <a
                    className="text-xs text-gray-700 transition hover:text-amber-600"
                    href="#"
                  >
                    {location}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <strong
              className="text-xs font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 bg-clip-text text-transparent"
            >
              Contact
            </strong>

            <ul className="mt-2 space-y-1.5">
              <li className="flex items-center justify-center sm:justify-start gap-2 text-gray-700 text-xs">
                <Phone className="w-3 h-3 text-amber-600" />
                <span>+91 123 456 7890</span>
              </li>

              <li className="flex items-center justify-center sm:justify-start gap-2 text-gray-700 text-xs">
                <Mail className="w-3 h-3 text-amber-600" />
                <span>info@property.com</span>
              </li>

              <li className="flex items-start justify-center sm:justify-start gap-2 text-gray-700 text-xs">
                <MapPin className="w-3 h-3 mt-0.5 text-amber-600" />
                <span>Mumbai, Maharashtra</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <p className="text-center text-[10px] text-gray-500">
            © 2024 Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;