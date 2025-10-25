import React, { useState } from 'react';

const colorTheme = {
  '--primary-color': '#d2a63f', 
  '--primary-color-light': '#d2a63fb5', 
  '--secondary-color': 'rgb(138, 136, 136)', 
  '--tertiary-color': 'black', 
};

/**
 * * @param {object} props
 * @param {function} props.onContinue - Function called on button click to move to OTP step.
 */

export default function RegisterForm({ 
  onContinue
}) {
  const [email, setEmail] = useState(''); 

  const handleContinue = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) { 
      onContinue(email);
    } else {
      alert("Please enter a valid email address.");
    }
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
    // Only return the form content div
    <div className="pt-3 px-6 pb-6 sm:pt-4 sm:px-8 sm:pb-8">
      <div className="space-y-6">
        <p className="text-black-600 text-base">
          Please enter your Email Address
        </p>

        {/* Email Input Field */}
        <div>
          <label 
            className="block font-normal mb-2 text-sm text-gray-500" 
            htmlFor="email-input"
          >
            Email Address
          </label>
          
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg py-3 px-4 focus:outline-none transition placeholder-gray-400 text-base"
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />
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
  );
}