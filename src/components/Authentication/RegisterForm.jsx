import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import axiosInstance from '../../services/axios'; // <-- ADDED IMPORT

export default function ModernRegisterForm({ 
  onContinue = () => {}
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ** API CALL: Send OTP (Replaces dummy promise) **
      await axiosInstance.post('auth/send-otp', {
        email: email
      });
      // If successful, proceed to OTP step
      onContinue(email);
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to send OTP. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
           style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), rgba(210, 166, 63, 0.15))' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
           style={{ background: 'radial-gradient(circle, rgba(210, 166, 63, 0.15), rgba(59, 130, 246, 0.15))' }} />
      
      {/* Content */}
      <div className="relative z-10 p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2"
              style={{ 
                background: 'linear-gradient(135deg, var(--primary-color-light), var(--location-blue-600), var(--secondary-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            Get Started
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your email to receive a verification code
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Input with Modern Design */}
          <div className="relative">
            <label 
              htmlFor="email-input" 
              className={`absolute left-12 transition-all duration-200 pointer-events-none z-10 ${
                isFocused || email 
                  ? '-top-2.5 left-4 text-xs bg-white px-2 font-medium' 
                  : 'top-4 text-gray-400'
              }`}
              style={isFocused || email ? { color: 'var(--primary-color-light)' } : {}}
            >
              {isFocused || email ? 'Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                isFocused ? '' : 'text-gray-400'
              }`}
              style={isFocused ? { color: 'var(--primary-color-light)' } : {}} />
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  error 
                    ? 'border-red-400 focus:border-red-500' 
                    : isFocused 
                    ? 'shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={isFocused && !error ? {
                  borderColor: 'var(--primary-color-light)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
                } : {}}
                disabled={loading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleContinue}
            disabled={loading}
            className="group relative w-full text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg hover:shadow-xl disabled:shadow-none"
            style={{
              background: 'linear-gradient(135deg, var(--primary-color-light), var(--location-blue-600), var(--secondary-color))',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
            }}
          >
            {/* Shimmer Effect */}
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
            
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending Code...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1"
           style={{ background: 'linear-gradient(to right, var(--primary-color-light), var(--secondary-color), var(--primary-color-light))' }} />
    </div>
  );
}