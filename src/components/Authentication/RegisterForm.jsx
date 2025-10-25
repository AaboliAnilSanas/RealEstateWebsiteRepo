import React, { useState } from 'react';
import { X } from 'lucide-react';

// Define the color scheme using CSS variables for consistency
const colorTheme = {
  '--primary-color': '#d2a63f', // Golden/Yellow (Accent)
  '--primary-color-light': '#d2a63fb5', // Lighter Golden/Yellow
  '--secondary-color': 'rgb(138, 136, 136)', // Gray (Borders)
  '--tertiary-color': 'black', // Black (Text)
};

/**

 * * @param {object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function called when the user closes the modal (inert).
 * @param {function} props.onContinue - Function called on button click (inert).
 * @param {string} props.title - The title displayed in the modal header.
 * @param {string} props.countryCodePrefix - The default country code prefix (e.g., '+91').
 */

export default function RegisterForm({ 
  isOpen = true, // Default to true so it shows on load
  onClose = () => { console.log('Close clicked (inert)'); }, 
  onContinue = () => { console.log('Continue clicked (inert)'); }, 
  title = 'Login / Register',
  countryCodePrefix = '+91'
}) {
  // Keeping phone state for form appearance
  const [phone, setPhone] = useState(''); 

  if (!isOpen) return null;

  const handleContinue = () => {
    onContinue(phone);
  };

  const handleClose = () => {
    onClose(); 
  };

  // Common input styles for reusability
  const inputStyle = {
    borderColor: colorTheme['--secondary-color'],
    color: colorTheme['--tertiary-color'],
  };

  // Enhanced focus/blur handlers to use the primary color as the focus ring
  const inputFocus = (e) => {
    e.target.style.borderColor = colorTheme['--primary-color'];
    e.target.style.boxShadow = `0 0 0 2px ${colorTheme['--primary-color-light']}`;
  };
  const inputBlur = (e) => {
    e.target.style.borderColor = colorTheme['--secondary-color'];
    e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.05)';
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 font-sans">
      
      {/* Modal Container - Deeper Shadow */}
      <div 
        className="bg-white rounded-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
        style={{ boxShadow: '0 15px 60px rgba(0,0,0,0.4)', borderRadius: '16px' }}
      >
        
        {/* Header */}
        <div 
          className="p-4 flex justify-between items-center" 
          style={{ backgroundColor: 'white' }}
        >
          <h2 className="text-xl font-bold" style={{ color: colorTheme['--tertiary-color'] }}>{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Reduced top padding */}
        <div className="pt-3 px-6 pb-6 sm:pt-4 sm:px-8 sm:pb-8">
          
          <div className="space-y-6">
            <p className="text-black-600 text-base">
              Please enter your Phone Number
            </p>

            {/* Phone Input Field with Country Code Prefix */}
            <div>
              <label 
                className="block font-normal mb-2 text-sm text-gray-500" 
                htmlFor="phone-input"
              >
                Phone Number
              </label>
              
              <div className="flex gap-2">
                {/* Country Code Prefix Box (Uses countryCodePrefix prop) */}
                <div 
                  className="flex-shrink-0 flex items-center border rounded-lg py-3 px-3" 
                  style={{ 
                    ...inputStyle,
                    minWidth: '80px',
                    backgroundColor: 'white',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' 
                  }}
                >
                  <span className="font-medium">{countryCodePrefix}</span>
                </div>
                
                {/* Actual Phone Input */}
                <input
                  id="phone-input"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} // only allow digits
                  className="flex-grow border rounded-lg py-3 px-4 focus:outline-none transition placeholder-gray-400 text-base"
                  style={inputStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  maxLength={15}
                />
              </div>
            </div>

            {/* Continue Button - Primary Golden Color Only */}
            <button
  onClick={handleContinue}
  className="w-full text-white font-bold text-lg py-3 rounded-lg transition duration-200 ease-in-out mt-4 active:scale-[0.98] shadow-md hover:scale-[1.02]"
  style={{ 
    background: 'linear-gradient(135deg, #fbbf24 0%, #555000ff 100%)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';
  }}
>
  Continue
</button>
          </div>

        </div>
      </div>
    </div>
  );
}
