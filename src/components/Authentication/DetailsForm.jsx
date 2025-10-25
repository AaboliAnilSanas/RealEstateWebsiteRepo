import React, { useState } from 'react';
import { X } from 'lucide-react'; 

/**
 * @param {object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal. Defaults to true to show the form.
 * @param {function} props.onClose - Function called when the user closes the modal (inert).
 * @param {function} props.onCreateAccount - Function called on button click (inert).
 */

export default function DetailsForm({ 
  isOpen = true, 
  onClose = () => { console.log('Close clicked (inert)'); }, 
  onCreateAccount = (details) => { console.log('Create Account clicked (inert):', details); }, 
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('buyer');

  if (!isOpen) return null;

  const getCssVar = (varName, fallback) => `var(${varName}, ${fallback})`;

  const handleCreateAccount = (e) => {
    e.preventDefault();
    onCreateAccount({ name, email, role });
  };

  const handleClose = () => {
    onClose(); 
  };

  const inputStyle = {
    borderColor: getCssVar('--secondary-color', 'rgb(138, 136, 136)'),
    color: getCssVar('--tertiary-color', 'black'),
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = getCssVar('--primary-color', '#d2a63f');
    e.target.style.boxShadow = `0 0 0 2px ${getCssVar('--primary-color-light', '#d2a63fb5')}`;
  };
  const inputBlur = (e) => {
    e.target.style.borderColor = getCssVar('--secondary-color', 'rgb(138, 136, 136)');
    e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.05)';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 font-sans"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)'
      }}
    >
      
      <div 
        className="rounded-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
        style={{ 
          boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)',
          borderRadius: '16px',
          background: '#ffffff'
        }}
      >
        
        <div 
          className="p-6 flex justify-between items-center relative" 
          style={{ 
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Your Details</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="pt-6 px-6 pb-8 sm:pt-8 sm:px-8 sm:pb-10">
          
          <div className="space-y-5">
            <p className="text-black-500 text-sm leading-relaxed">
              Please complete your account profile.
            </p>

            <div>
              <label 
                className="block font-medium mb-2 text-sm text-gray-700"
                htmlFor="name-input"
              >
                Full Name
              </label>
              <input
                id="name-input"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg py-2.5 px-3.5 focus:outline-none transition placeholder-gray-400 text-sm bg-white"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
                required
              />
            </div>

            <div>
              <label 
                className="block font-medium mb-2 text-sm text-gray-700"
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
                className="w-full border rounded-lg py-2.5 px-3.5 focus:outline-none transition placeholder-gray-400 text-sm bg-white"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
                required
              />
            </div>

            <div>
              <p className="block font-medium mb-3 text-sm text-gray-700">
                Are you a Buyer or a Seller?
              </p>
              <div className="relative w-full h-11 bg-gray-50 rounded-full p-1 flex items-center border border-gray-200">
                <div 
                  className="absolute h-9 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: 'calc(50% - 4px)',
                    left: role === 'buyer' ? '4px' : 'calc(50% + 0px)',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #555000ff 100%)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}
                />
                
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className="relative z-10 flex-1 h-9 font-medium transition-all duration-300 rounded-full text-sm"
                  style={{
                    color: role === 'buyer' ? 'white' : '#6b7280'
                  }}
                >
                  Buyer
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole('seller')}
                  className="relative z-10 flex-1 h-9 font-medium transition-all duration-300 rounded-full text-sm"
                  style={{
                    color: role === 'seller' ? 'white' : '#6b7280'
                  }}
                >
                  Seller
                </button>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleCreateAccount}
              className="w-full text-white font-medium text-base py-3 rounded-lg transition-all duration-200 mt-2 relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #d2a63f 0%, #c09935 50%, #d2a63f 100%)',
                boxShadow: '0 2px 8px rgba(210,166,63,0.25)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(210,166,63,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(210,166,63,0.25)';
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translateY(-1px)';
              }}
            >
              Create Account
            </button>
            
          </div>

        </div>
      </div>
    </div>
  );
}