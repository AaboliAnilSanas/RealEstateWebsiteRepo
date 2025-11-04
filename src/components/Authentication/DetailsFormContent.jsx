import React, { useState } from 'react';
import { User, Phone, Users, ArrowRight, Home, Briefcase } from 'lucide-react';

export default function DetailsForm({ 
  onCreateAccount = (details) => { console.log('Create Account clicked:', details); },
  countryCodePrefix = '+91',
  authToken = ''
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('buyer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    
    if (!name || phone.length < 6) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!authToken) {
      setError("Authentication token missing. Please login again.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onCreateAccount({
        success: true,
        user: { name, phone, role },
        message: 'Account created successfully!',
        name,
        phone,
        role
      });
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please try again.');
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
      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1.5"
              style={{ 
                background: 'linear-gradient(135deg, var(--primary-color-light), var((--secondary-color), var(--secondary-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            Complete Your Profile
          </h2>
          <p className="text-gray-600 text-xs">
            Please provide your details to create your account
          </p>
        </div>

        <div className="space-y-5">
          {/* Name Input with Floating Label */}
          <div className="relative">
            <label 
              htmlFor="name-input" 
              className={`absolute left-10 transition-all duration-200 pointer-events-none z-10 ${
                nameFocused || name 
                  ? '-top-2 left-3 text-xs bg-white px-1.5 font-medium' 
                  : 'top-3 text-sm text-gray-400'
              }`}
              style={nameFocused || name ? { color: 'var(--primary-color-light)' } : {}}
            >
              Full Name
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                nameFocused ? '' : 'text-gray-400'
              }`}
              style={nameFocused ? { color: 'var(--primary-color-light)' } : {}} />
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                className={`w-full pl-10 pr-3 py-3 text-sm bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  error && !name
                    ? 'border-red-400 focus:border-red-500' 
                    : nameFocused 
                    ? 'shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={nameFocused && !error ? {
                  borderColor: 'var(--primary-color-light)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
                } : {}}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Phone Input with Floating Label */}
          <div className="relative">
            <label 
              htmlFor="phone-input" 
              className={`absolute transition-all duration-200 pointer-events-none z-10 ${
                phoneFocused || phone 
                  ? '-top-2 left-3 text-xs bg-white px-1.5 font-medium' 
                  : 'left-[72px] top-3 text-sm text-gray-400'
              }`}
              style={phoneFocused || phone ? { color: 'var(--primary-color-light)' } : {}}
            >
              Phone Number
            </label>
            <div className="relative flex gap-2">
              {/* Country Code Prefix */}
              <div className={`flex-shrink-0 flex items-center justify-center gap-1.5 w-[60px] py-3 bg-white border-2 rounded-xl transition-all duration-200 ${
                phoneFocused 
                  ? 'shadow-lg' 
                  : 'border-gray-200'
              }`}
              style={phoneFocused ? {
                borderColor: 'var(--primary-color-light)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
              } : {}}>
                <Phone className={`w-3.5 h-3.5 transition-colors duration-200 ${
                  phoneFocused ? '' : 'text-gray-400'
                }`}
                style={phoneFocused ? { color: 'var(--primary-color-light)' } : {}} />
                <span className="font-semibold text-xs text-gray-700">{countryCodePrefix}</span>
              </div>
              
              {/* Phone Number Input */}
              <input
                id="phone-input"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/[^0-9]/g, ''));
                  setError('');
                }}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
                placeholder=""
                className={`flex-1 px-4 py-3 text-sm bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  error && phone.length < 6
                    ? 'border-red-400 focus:border-red-500' 
                    : phoneFocused 
                    ? 'shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={phoneFocused && !(error && phone.length < 6) ? {
                  borderColor: 'var(--primary-color-light)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                  minWidth: 0,
                  width: '100%'
                } : {
                  minWidth: 0,
                  width: '100%'
                }}
                maxLength={15}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4" strokeWidth={2.5} style={{ color: 'var(--primary-color-light)' }} />
              <label className="text-xs font-semibold text-gray-700">
                Select Your Role
              </label>
            </div>
            <div className="relative w-full h-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-1.5 flex items-center border-2 border-gray-200 shadow-inner">
              <div 
                className="absolute h-9 rounded-xl transition-all duration-300 ease-in-out"
                style={{
                  width: 'calc(50% - 6px)',
                  left: role === 'buyer' ? '6px' : 'calc(50% + 0px)',
                  background: 'linear-gradient(135deg, var(--primary-color-light), var(--location-blue-600), var(--secondary-color))',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              />
              
              <button
                type="button"
                onClick={() => !loading && setRole('buyer')}
                className="relative z-10 flex-1 h-9 font-semibold transition-all duration-300 rounded-xl text-sm flex items-center justify-center gap-1.5"
                style={{
                  color: role === 'buyer' ? 'white' : '#6b7280',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                disabled={loading}
              >
                <Home className={`w-4 h-4 transition-transform duration-300 ${role === 'buyer' ? 'scale-110' : 'scale-100'}`} strokeWidth={2.5} />
                Buyer
              </button>
              
              <button
                type="button"
                onClick={() => !loading && setRole('seller')}
                className="relative z-10 flex-1 h-9 font-semibold transition-all duration-300 rounded-xl text-sm flex items-center justify-center gap-1.5"
                style={{
                  color: role === 'seller' ? 'white' : '#6b7280',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                disabled={loading}
              >
                <Briefcase className={`w-4 h-4 transition-transform duration-300 ${role === 'seller' ? 'scale-110' : 'scale-100'}`} strokeWidth={2.5} />
                Seller
              </button>
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
            onClick={handleCreateAccount}
            disabled={loading}
            className="group relative w-full text-white font-semibold py-3 text-sm rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg hover:shadow-xl disabled:shadow-none mt-2"
            style={{
              background: 'linear-gradient(135deg, var(--primary-color-light), var(--location-blue-600), var(--secondary-color))',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)'
            }}
          >
            {/* Shimmer Effect */}
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
            
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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