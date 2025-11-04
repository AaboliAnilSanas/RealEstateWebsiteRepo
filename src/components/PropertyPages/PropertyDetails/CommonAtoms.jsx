import React, { useState } from 'react';
import { BedDouble, Bath, Maximize2, Layers, Heart, Share2 } from 'lucide-react';

// --- ATOM 1: SpecItem - SIMPLIFIED HOVER EFFECT FOR CLEANER PREMIUM LOOK ---
export const SpecItem = ({ icon: Icon, label, value }) => (
  // Changed border and simplified hover effect
  <div className="spec-item group relative overflow-hidden rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-[var(--location-blue-100)]">
    {/* Subtle hover background highlight for a cleaner, rich aesthetic */}
    <div className="absolute inset-0 bg-[var(--gold-50)]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    <div className="relative z-10 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--location-blue-600)] to-[var(--location-blue-800)] shadow-lg transition-transform duration-300 group-hover:shadow-xl">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--location-gray-600)]">{label}</p>
        <p className="text-xl font-bold text-[var(--location-blue-800)]">{value}</p>
      </div>
    </div>
  </div>
);

// --- ATOM 3: FloatingActions ---
export const FloatingActions = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <button
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-300 hover:scale-110"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart className={`h-5 w-5 transition-all duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[var(--location-gray-600)] group-hover:text-[var(--gold-base)]'}`} />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--gold-base)] to-[var(--location-blue-600)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"></div>
      </button>
      <button className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-300 hover:scale-110">
        <Share2 className="h-5 w-5 text-[var(--location-gray-600)] transition-colors group-hover:text-[var(--location-blue-600)]" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--gold-base)] to-[var(--location-blue-600)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"></div>
      </button>
    </div>
  );
};

// Exporting required icons for PropertyBodySections
export const PropertyIcons = { BedDouble, Bath, Maximize2, Layers };