import React, { useState } from "react";
import { Mail, Send, User, Phone, Briefcase, Home, Key } from "lucide-react";

// Reusable Toggle Button
const ThemedToggleButton = ({ icon: Icon, label, value, current, onChange, colorVar, iconColorVar }) => {
  const isActive = current === value;
  const activeStyle = { backgroundColor: `var(${colorVar})`, color: "white" };
  const inactiveStyle = { backgroundColor: "#f3f4f6", color: `var(${iconColorVar})` };

  return (
    <button
      type="button"
      onClick={() => onChange(label, value)}
      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm ${
        isActive ? "shadow-md scale-[1.02]" : "hover:bg-gray-200"
      }`}
      style={isActive ? activeStyle : inactiveStyle}
    >
      <Icon className="w-5 h-5" style={{ color: isActive ? "white" : `var(${iconColorVar})` }} />
      <span className="hidden sm:inline">{value}</span>
    </button>
  );
};

// Input Field with icon
const InputField = ({ label, name, value, onChange, type = "text", placeholder, required = false, icon: Icon }) => (
  <div className="relative">
    <label className="block text-sm font-medium mb-1" style={{ color: "var(--primary-color)" }}>
      {label}
    </label>
    <div className="flex items-center border rounded-xl" style={{ borderColor: "var(--secondary-color)" }}>
      <Icon className="w-5 h-5 ml-3" style={{ color: "var(--tertiary-color)" }} />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 text-base rounded-r-xl focus:ring-2 focus:ring-[var(--primary-color-light)] focus:border-transparent outline-none placeholder:text-gray-400"
      />
    </div>
  </div>
);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleToggleChange = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div className="w-[100%] h-full bg-white rounded-xl shadow-2xl  p-6 font-inter">
      {!submitted ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "var(--primary-color)" }}>
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Owner/Agent Toggle */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--primary-color)" }}>
                I am:
              </label>
              <div className="flex gap-2">
                <ThemedToggleButton
                  icon={Home}
                  label="userType"
                  value="Owner"
                  current={formData.userType}
                  onChange={handleToggleChange}
                  colorVar="--primary-color"
                  iconColorVar="--tertiary-color"
                />
                <ThemedToggleButton
                  icon={Briefcase}
                  label="userType"
                  value="Agent"
                  current={formData.userType}
                  onChange={handleToggleChange}
                  colorVar="--primary-color"
                  iconColorVar="--tertiary-color"
                />
              </div>
            </div>

            {/* Buy/Lease Toggle */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--primary-color)" }}>
                I'm interested in:
              </label>
              <div className="flex gap-2">
                <ThemedToggleButton
                  icon={Briefcase}
                  label="intent"
                  value="Buy"
                  current={formData.intent}
                  onChange={handleToggleChange}
                  colorVar="--tertiary-color"
                  iconColorVar="--primary-color"
                />
                <ThemedToggleButton
                  icon={Key}
                  label="intent"
                  value="Lease"
                  current={formData.intent}
                  onChange={handleToggleChange}
                  colorVar="--tertiary-color"
                  iconColorVar="--primary-color"
                />
              </div>
            </div>

            <InputField label="Name" name="name" value={formData.name} onChange={handleChange} icon={User} required placeholder="Your name" />
            <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" icon={Mail} required placeholder="you@email.com" />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" icon={Phone} required placeholder="+1 555-123-4567" />

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--primary-color)" }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-[var(--primary-color-light)] outline-none placeholder:text-gray-400 resize-none"
                placeholder="Your inquiry details..."
                style={{ borderColor: "var(--secondary-color)" }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-white text-base transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              style={{ backgroundColor: "var(--primary-color)", boxShadow: "0 4px 6px -1px var(--tertiary-color)" }}
            >
              <Send className="w-5 h-5" />
              Send Inquiry
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-12">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "var(--tertiary-color)", opacity: 0.2 }}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--tertiary-color)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold" style={{ color: "var(--primary-color)" }}>
            Message Sent!
          </h3>
          <p className="text-gray-600">We'll get back to you soon.</p>
        </div>
      )}
    </div>
  );
}
