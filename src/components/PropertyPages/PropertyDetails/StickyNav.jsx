import React from 'react';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'description', label: 'What makes it unique' },
  { id: 'features', label: 'Features' },
  { id: 'amenities', label: 'Amenities' },
];

const StickyNav = ({ activeSection, setActiveSection }) => {
  const handleClick = (itemId) => {
    // *** RETAIN ONLY STATE UPDATE FOR VERTICAL/COLLAPSIBLE VIEW ***
    setActiveSection(itemId);
  };

  return (
    // Updated container for vertical sidebar style
    <div className="overflow-hidden bg-transparent">
      {/* Forced to vertical navigation bar style for clean, premium look */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            // Clean, vertical sidebar styling with premium color accents
            className={`relative flex items-center w-full px-4 py-3 text-left font-semibold transition-all duration-300 rounded-lg 
              ${
                activeSection === item.id
                  ? 'text-white bg-[var(--location-blue-800)] shadow-lg' // Highlighted active background
                  : 'text-[var(--location-gray-600)] hover:text-[var(--location-blue-800)] hover:bg-[var(--location-blue-50)]'
              }`}
          >
            {/* Optional: Add a subtle gold accent on active */}
            {activeSection === item.id && (
                <span className="absolute left-0 h-full w-1 rounded-l-lg bg-[var(--gold-base)]"></span>
            )}
            <span className="ml-2">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default StickyNav;