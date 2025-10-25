import React, { useState } from 'react';
import axiosInstance from '../../services/axios'; // Adjust path as needed

/**
 * @param {object} props
 * @param {function} props.onCreateAccount 
 * @param {string} props.countryCodePrefix - The default country code prefix (e.g., '+91').
 * @param {string} props.authToken - The JWT token received from login/OTP verification
 */

export default function DetailsForm({ 
  onCreateAccount = (details) => { console.log('Create Account clicked (inert):', details); },
  countryCodePrefix = '+91',
  authToken = '' // Receive token from parent
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('buyer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getCssVar = (varName, fallback) => `var(${varName}, ${fallback})`;

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    
    if (!name || phone.length < 6) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!authToken) {
      alert("Authentication token missing. Please login again.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/api/auth/register', {
        name: name,
        email: localStorage.getItem('userEmail') || '', // Get email from localStorage if stored during login
        phone: phone,
        role: role // Include role if your backend expects it
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.data.status === 'success') {
        // Registration successful
        onCreateAccount({
          success: true,
          user: response.data.user,
          message: response.data.message,
          name,
          phone,
          role
        });
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError('Authentication failed. Please login again.');
      } else if (error.response?.status === 400) {
        setError('Invalid data. Please check your information.');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
    <div className="pt-6 px-6 pb-8 sm:pt-8 sm:px-8 sm:pb-10">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateAccount} className="space-y-5">
            <p className="text-black-500 text-sm leading-relaxed">
                Please complete your account profile.
            </p>

            <div>
              <label className="block font-medium mb-2 text-sm text-gray-700" htmlFor="name-input">
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
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-sm text-gray-700" htmlFor="phone-input">
                Phone Number
              </label>
              
              <div className="flex gap-2">
                {/* Country Code Prefix Box */}
                <div 
                  className="flex-shrink-0 flex items-center border rounded-lg py-2.5 px-3" 
                  style={{ 
                    ...inputStyle,
                    minWidth: '70px',
                    backgroundColor: 'white'
                  }}
                >
                  <span className="font-medium text-sm">{countryCodePrefix}</span>
                </div>
                
                {/* Actual Phone Input */}
                <input
                  id="phone-input"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  className="flex-grow border rounded-lg py-2.5 px-3.5 focus:outline-none transition placeholder-gray-400 text-sm bg-white"
                  style={inputStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  maxLength={15}
                  disabled={loading}
                  required
                />
              </div>
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
                  onClick={() => !loading && setRole('buyer')}
                  className="relative z-10 flex-1 h-9 font-medium transition-all duration-300 rounded-full text-sm"
                  style={{
                    color: role === 'buyer' ? 'white' : '#6b7280',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  disabled={loading}
                >
                  Buyer
                </button>
                
                <button
                  type="button"
                  onClick={() => !loading && setRole('seller')}
                  className="relative z-10 flex-1 h-9 font-medium transition-all duration-300 rounded-full text-sm"
                  style={{
                    color: role === 'seller' ? 'white' : '#6b7280',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  disabled={loading}
                >
                  Seller
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-medium text-base py-3 rounded-lg transition-all duration-200 mt-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: loading 
                  ? '#ccc' 
                  : 'linear-gradient(135deg, #d2a63f 0%, #c09935 50%, #d2a63f 100%)',
                boxShadow: loading 
                  ? 'none' 
                  : '0 2px 8px rgba(210,166,63,0.25)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(210,166,63,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(210,166,63,0.25)';
                }
              }}
              onMouseDown={(e) => {
                if (!loading) {
                  e.target.style.transform = 'scale(0.98)';
                }
              }}
              onMouseUp={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
          </form>
    </div>
  );
}