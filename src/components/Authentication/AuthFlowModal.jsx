import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
// Import the refactored content-only components
import RegisterForm from './RegisterForm.jsx'; 
import OtpForm from './OtpForm.jsx';           
import DetailsForm from './DetailsFormContent.jsx';   

const colorTheme = {
  '--primary-color': '#d2a63f',
  '--secondary-color': 'rgb(138, 136, 136)',
  '--tertiary-color': 'black',
};

// Define the steps
const STEPS = {
  REGISTER: 'register',
  OTP: 'otp',
  DETAILS: 'details',
};

export default function AuthFlowModal({
  isOpen = true,
  onClose = () => { console.log('Modal Close clicked'); },
  title = 'Login / Register',
  countryCodePrefix = '+91'
}) {
  const [step, setStep] = useState(STEPS.REGISTER);
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  // --- Flow Handlers ---

  // Step 1 -> Step 2
  const handleContinue = (phone) => {
    setPhoneNumber(phone);
    setStep(STEPS.OTP);
  };

  // Step 2 -> Step 3
  const handleVerifyOtp = (otp) => {
    console.log('OTP Verified:', otp);
    setStep(STEPS.DETAILS);
  };

  // Step 3 -> Finish
  const handleCreateAccount = (details) => {
    console.log('Account Created with details:', details);
    onClose(); // Close the modal after successful registration
  };

  const handleBack = () => {
    if (step === STEPS.OTP) setStep(STEPS.REGISTER);
    if (step === STEPS.DETAILS) setStep(STEPS.OTP);
  };

  const getModalTitle = () => {
    switch (step) {
      case STEPS.OTP:
        return 'Verify Phone Number';
      case STEPS.DETAILS:
        return 'Complete Your Profile';
      case STEPS.REGISTER:
      default:
        return title;
    }
  };
  
  const showBackButton = step !== STEPS.REGISTER;

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 font-sans">
      
      {/* Modal Container */}
      <div 
        className="bg-white rounded-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
        style={{ boxShadow: '0 15px 60px rgba(0,0,0,0.4)', borderRadius: '16px' }}
      >
        
        {/* Header */}
        <div 
          className="p-4 flex justify-between items-center" 
          style={{ backgroundColor: 'white' }}
        >
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-700 p-1 mr-2 rounded-full transition"
                aria-label="Go Back"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold" style={{ color: colorTheme['--tertiary-color'] }}>{getModalTitle()}</h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full transition"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conditional Content Rendering */}
        {step === STEPS.REGISTER && (
          <RegisterForm
            countryCodePrefix={countryCodePrefix}
            onContinue={handleContinue}
          />
        )}

        {step === STEPS.OTP && (
          <OtpForm
            phoneNumber={`${countryCodePrefix} ${phoneNumber}`}
            onVerify={handleVerifyOtp} 
          />
        )}

        {step === STEPS.DETAILS && (
          <DetailsForm
            onCreateAccount={handleCreateAccount} 
          />
        )}
      </div>
    </div>
  );
}