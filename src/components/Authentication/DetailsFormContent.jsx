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
      
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15), rgba(210,166,63,0.15))' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(210,166,63,0.15), rgba(59,130,246,0.15))' }} />

      <div className="relative z-10 p-6 sm:p-8">

        {/* Fixed Gradient Heading ✅ */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1.5"
            style={{
              background: 'linear-gradient(135deg, var(--primary-color-light), var(--secondary-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Complete Your Profile
          </h2>
          <p className="text-gray-600 text-xs">
            Please provide your details to create your account
          </p>
        </div>

        <div className="space-y-5">

          {/* Name input */}
          <div className="relative">
            <label 
              htmlFor="name-input" 
              className={`absolute left-10 transition-all duration-200 pointer-events-none z-10 ${
                nameFocused || name 
                  ? '-top-2 left-3 text-xs bg-white px-1.5 font-medium' 
                  : 'top-3 text-sm text-gray-400'
              }`}
            >Full Name</label>

            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${nameFocused ? '' : 'text-gray-400'}`} />
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                className="w-full pl-10 pr-3 py-3 text-sm bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 border-gray-200 hover:border-gray-300"
                disabled={loading}
              />
            </div>
          </div>

          {/* Phone input */}
          <div className="relative">
            <label 
              htmlFor="phone-input" 
              className={`absolute transition-all duration-200 pointer-events-none z-10 ${
                phoneFocused || phone 
                  ? '-top-2 left-3 text-xs bg-white px-1.5 font-medium' 
                  : 'left-[78px] top-3 text-sm text-gray-400'
              }`}
            >Phone Number</label>

            <div className="relative flex gap-2">
              <div className="flex items-center justify-center gap-1.5 w-[60px] py-3 bg-white border-2 rounded-xl border-gray-200">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-semibold text-xs text-gray-700">{countryCodePrefix}</span>
              </div>

              <input
                id="phone-input"
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/[^0-9]/g, '')); setError(''); }}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
                className="flex-1 px-4 py-3 text-sm border-2 border-gray-200 rounded-xl"
                maxLength={15}
                disabled={loading}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4" />
              <label className="text-xs font-semibold text-gray-700">Select Your Role</label>
            </div>

            <div className="relative w-full h-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-1.5 flex items-center border-2 border-gray-200 shadow-inner">

              {/* ✅ FIXED highlight sliding alignment here */}
              <div 
                className="absolute h-9 rounded-xl transition-all duration-300 ease-in-out"
                style={{
                  width: 'calc(50% - 6px)',
                  left: role === 'buyer' ? '6px' : 'calc(50% + 6px)', // ✅ FIXED
                  background: 'linear-gradient(135deg, var(--primary-color-light), var(--location-blue-600), var(--secondary-color))',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                }}
              />

              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`relative z-10 flex-1 h-9 text-sm font-semibold flex items-center justify-center gap-1.5 ${role === 'buyer' ? 'text-white' : 'text-gray-600'}`}
              >
                <Home className="w-4 h-4" /> Buyer
              </button>

              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`relative z-10 flex-1 h-9 text-sm font-semibold flex items-center justify-center gap-1.5 ${role === 'seller' ? 'text-white' : 'text-gray-600'}`}
              >
                <Briefcase className="w-4 h-4" /> Seller
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          {/* Submit */}
          <button
            onClick={handleCreateAccount}
            disabled={loading}
            className="group w-full text-white font-semibold py-3 text-sm rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 mt-2"
            style={{
              background: 'linear-gradient(135deg, var(--primary-color-light), var(--location-blue-600), var(--secondary-color))'
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(to right, var(--primary-color-light), var(--secondary-color))' }} />
    </div>
  );
}
