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
              ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)]' 
              : 'bg-white text-gray-700 border-gray-300 hover:border-[var(--primary-color)]'
          } ${chip === "+" ? 'border-dashed border-2' : ''}`}
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
            className="w-32 px-3 py-2 border border-[var(--primary-color)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color-light)] text-sm"
            autoFocus
          />
          <button
            type="button"
            onClick={handleAddCustomValue}
            className="px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm"
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