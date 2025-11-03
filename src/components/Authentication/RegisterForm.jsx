import React, { useState } from 'react';
import axiosInstance from '../../services/axios'; // Adjust path as needed

export default function RegisterForm({ 
  onContinue = () => {}
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getCssVar = (varName, fallback) => `var(${varName}, ${fallback})`;

  const handleContinue = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/auth/send-otp', {
        email: email
      });
      console.log('.....',response);
      if (response.status === 200) {
        // Store email for later use in OTP verification
        localStorage.setItem('userEmail', email);
        
        // Call the parent callback to proceed to OTP step
        onContinue(email);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 400) {
        setError('Invalid email address.');
      } else if (error.response?.status === 429) {
        setError('Too many attempts. Please try again later.');
      } else {
        setError('Network error. Please check your connection.');
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
      <form onSubmit={handleContinue} className="space-y-6">
        {/* Removed the email/phone toggle */}
        
        <div>
          <label className="block font-medium mb-2 text-sm text-gray-700" htmlFor="email-input">
            Email Address
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(''); // Clear error when user types
            }}
            className="w-full border rounded-lg py-2.5 px-3.5 focus:outline-none transition placeholder-gray-400 text-sm bg-white"
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
            disabled={loading}
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

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
          {loading ? 'Sending OTP...' : 'Continue'}
        </button>

        {/* Optional: Info message */}
        <p className="text-xs text-gray-500 text-center">
          We'll send a verification code to your email address
        </p>
      </form>
    </div>
  );
}