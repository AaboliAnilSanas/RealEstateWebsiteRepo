import React, { useState } from "react";
import { Mail, Send, User, Phone, Briefcase, Home, Key, CheckCircle2 } from "lucide-react";

// Premium Toggle Button
const ThemedToggleButton = ({ icon: Icon, label, value, current, onChange, colorType }) => {
  const isActive = current === value;
  
  const getActiveStyle = () => {
    if (colorType === 'blue') {
      return {
        background: 'linear-gradient(135deg, var(--primary-color), var(--primary-color-light))',
        color: 'white',
        boxShadow: '0 4px 12px rgba(45, 89, 208, 0.3)'
      };
    }
    return {
      background: 'linear-gradient(135deg, var(--gold-600), var(--gold-400))',
      color: 'white',
      boxShadow: '0 4px 12px rgba(210, 166, 63, 0.3)'
    };
  };

  const activeStyle = getActiveStyle();
  const inactiveStyle = { 
    backgroundColor: "white", 
    color: colorType === 'blue' ? 'var(--primary-color)' : 'var(--gold-600)',
    border: '2px solid #e5e7eb'
  };

  return (
    <button
      type="button"
      onClick={() => onChange(label, value)}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
        isActive ? "scale-[1.02]" : "hover:bg-gray-50 hover:border-gray-300"
      }`}
      style={isActive ? activeStyle : inactiveStyle}
    >
      <Icon 
        className="w-4 h-4" 
        style={{ color: isActive ? "white" : (colorType === 'blue' ? 'var(--primary-color)' : 'var(--gold-600)') }} 
      />
      <span className="hidden sm:inline">{value}</span>
    </button>
  );
};

// Premium Input Field with floating label
const InputField = ({ label, name, value, onChange, type = "text", required = false, icon: Icon }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative">
      <label 
        className={`absolute transition-all duration-200 pointer-events-none font-medium z-10 ${
          isFocused || hasValue 
            ? '-top-2 left-3 text-xs bg-white px-1.5' 
            : 'left-10 top-1/2 -translate-y-1/2 text-sm'
        }`}
        style={{ 
          color: isFocused || hasValue ? 'var(--primary-color-light)' : '#9ca3af'
        }}
      >
        {label}
      </label>
      
      <div 
        className={`flex items-center border-2 rounded-xl transition-all duration-200 bg-white ${
          isFocused ? 'shadow-md' : 'shadow-sm'
        }`}
        style={{ 
          borderColor: isFocused ? 'var(--primary-color-light)' : '#e5e7eb'
        }}
      >
        <div 
          className="flex items-center justify-center px-3 transition-colors duration-200"
          style={{ 
            color: isFocused ? 'var(--primary-color-light)' : 'var(--gold-500)'
          }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className="w-full pr-3 py-2.5 text-sm rounded-r-xl focus:outline-none bg-transparent"
          style={{ color: '#1f2937' }}
        />
      </div>
    </div>
  );
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    userType: "Owner",
    intent: "Buy",
  });
  const [submitted, setSubmitted] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleToggleChange = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div 
      className="w-full max-w-md mx-auto rounded-2xl shadow-2xl p-6 font-inter relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #fafafa 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div 
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--primary-color)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--gold-500)' }}
      />

      {!submitted ? (
        <div className="relative z-10">
          <div className="text-center mb-4">
            <h2 
              className="text-2xl font-bold mb-1"
              style={{ 
                background: 'linear-gradient(135deg, var(--primary-color), var(--primary-color-light), var(--gold-500))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Get In Touch
            </h2>
            <p className="text-sm" style={{ color: 'var(--tertiary-color)' }}>
              Let's discuss your property needs
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Owner/Agent Toggle */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--primary-color)" }}>
                I am:
              </label>
              <div className="flex gap-2">
                <ThemedToggleButton
                  icon={Home}
                  label="userType"
                  value="Owner"
                  current={formData.userType}
                  onChange={handleToggleChange}
                  colorType="blue"
                />
                <ThemedToggleButton
                  icon={Briefcase}
                  label="userType"
                  value="Agent"
                  current={formData.userType}
                  onChange={handleToggleChange}
                  colorType="blue"
                />
              </div>
            </div>

            {/* Buy/Lease Toggle */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--primary-color)" }}>
                I'm interested in:
              </label>
              <div className="flex gap-2">
                <ThemedToggleButton
                  icon={Briefcase}
                  label="intent"
                  value="Buy"
                  current={formData.intent}
                  onChange={handleToggleChange}
                  colorType="gold"
                />
                <ThemedToggleButton
                  icon={Key}
                  label="intent"
                  value="Lease"
                  current={formData.intent}
                  onChange={handleToggleChange}
                  colorType="gold"
                />
              </div>
            </div>

            <InputField 
              label="Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              icon={User} 
              required 
            />
            <InputField 
              label="Email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              type="email" 
              icon={Mail} 
              required 
            />
            <InputField 
              label="Phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              type="tel" 
              icon={Phone} 
              required 
            />

            {/* Message Field */}
            <div className="relative">
              <label 
                className={`absolute transition-all duration-200 pointer-events-none font-medium z-10 ${
                  messageFocused || formData.message 
                    ? '-top-2 left-3 text-xs bg-white px-1.5' 
                    : 'left-4 top-3 text-sm'
                }`}
                style={{ 
                  color: messageFocused || formData.message ? 'var(--primary-color-light)' : '#9ca3af'
                }}
              >
                Message
              </label>
              
              <div 
                className={`relative border-2 rounded-xl transition-all duration-200 bg-white ${
                  messageFocused ? 'shadow-md' : 'shadow-sm'
                }`}
                style={{ 
                  borderColor: messageFocused ? 'var(--primary-color-light)' : '#e5e7eb'
                }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setMessageFocused(true)}
                  onBlur={() => setMessageFocused(false)}
                  rows="2"
                  className="w-full px-4 py-2.5 text-sm rounded-xl focus:outline-none resize-none bg-transparent"
                  style={{ color: '#1f2937' }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-2.5 rounded-xl font-bold text-white text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] mt-3 relative overflow-hidden group"
              style={{ 
                background: 'linear-gradient(135deg, var(--primary-color), var(--primary-color-light))',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
                   style={{ transform: 'translateX(-100%)', animation: 'shimmer 2s infinite' }} />
              <Send className="w-4 h-4" />
              <span>Send Inquiry</span>
            </button>
          </div>

          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      ) : (
        <div className="text-center py-12 relative z-10">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ 
              background: 'linear-gradient(135deg, var(--primary-color-light), var(--gold-400))'
            }}
          >
            <CheckCircle2 className="w-8 h-8 text-white animate-bounce" strokeWidth={2.5} />
          </div>
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ 
              background: 'linear-gradient(135deg, var(--primary-color), var(--gold-600))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Thank You!
          </h3>
          <p className="text-sm mb-2" style={{ color: 'var(--tertiary-color)' }}>
            Your message has been sent successfully
          </p>
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            We'll get back to you within 24 hours
          </p>
        </div>
      )}
    </div>
  );
}