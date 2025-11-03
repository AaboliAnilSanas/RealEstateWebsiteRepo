import React, { useState } from "react";

const Chips = ({ ChipLabel, value, onChange, isRequired }) => {
  const [showInput, setShowInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [customChips, setCustomChips] = useState([]);

  // Check if this field should have the "+" functionality
  const hasPlusFunctionality = ChipLabel.includes("+");

  // Filter out "+" from the displayed chips if it exists
  const baseChips = ChipLabel.filter(chip => chip !== "+");

  const handleChipClick = (chip) => {
    if (chip === "+") {
      setShowInput(true);
    } else {
      onChange(chip);
    }
  };

  const handleAddCustomValue = () => {
    if (customValue.trim() !== "") {
      const newCustomValue = customValue.trim();
      
      // Add to custom chips array
      setCustomChips(prev => [...prev, newCustomValue]);
      
      // Set this as the selected value
      onChange(newCustomValue);
      
      setCustomValue("");
      setShowInput(false);
    }
  };

  const handleCancelCustom = () => {
    setCustomValue("");
    setShowInput(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCustomValue();
    } else if (e.key === "Escape") {
      handleCancelCustom();
    }
  };

  // Combine base chips and custom chips, add "+" only if this field has the functionality
  const displayChips = [
    ...baseChips,
    ...customChips,
    ...(hasPlusFunctionality ? ["+"] : [])
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayChips.map((chip, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleChipClick(chip)}
          className={`px-4 py-2 rounded-full border transition-all ${
            value === chip 
              ? 'bg-[#d2a63f] text-white border-[#d2a63f] shadow-md' 
              : chip === "+" 
                ? 'bg-white text-[#d2a63f] border-[#d2a63f] border-dashed border-2 hover:bg-[#fef9c3]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#d2a63f] hover:text-[#d2a63f]'
          }`}
        >
          {chip}
        </button>
      ))}
      
      {showInput && (
        <div className="flex items-center gap-2 transition-all duration-300">
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter value..."
            className="w-32 px-3 py-2 border border-[#d2a63f] rounded-full focus:outline-none focus:ring-2 focus:ring-[#fef9c3] text-sm"
            autoFocus
          />
          <button
            type="button"
            onClick={handleAddCustomValue}
            className="px-3 py-2 bg-[#d2a63f] text-white rounded-full hover:bg-[#b8860b] transition-colors text-sm shadow-sm"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancelCustom}
            className="px-3 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Chips;