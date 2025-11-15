// src/components/Authentication/AuthFlowModal.jsx
import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
// Import the refactored content-only components
import RegisterForm from './RegisterForm.jsx'; 
import OtpForm from './OtpForm.jsx';           
import DetailsForm from './DetailsFormContent.jsx';   
import Toast from '../UIComponents/Toast'; // <-- ADDED IMPORT

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
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [userEmail, setUserEmail] = useState('');
  // ADDED: Internal state for forcing closure on user's request
  const [isClosedInternally, setIsClosedInternally] = useState(false);
  
  // <-- ADDED TOAST STATE -->
  const [toast, setToast] = useState({ message: '', type: '', key: 0 }); 
  
  const showToast = (message, type = 'success') => {
    setToast({ message, type, key: toast.key + 1 });
  };
  // <-- END TOAST STATE -->

  if (!isOpen || isClosedInternally) return null; // MODIFIED: Check local state

  // --- Flow Handlers ---

  // Step 1 -> Step 2
  const handleContinue = (emailOrPhone) => {
    // Check if it's email or phone
    if (emailOrPhone.includes('@')) {
      setEmail(emailOrPhone);
      setUserEmail(emailOrPhone);
      localStorage.setItem('userEmail', emailOrPhone);
    } else {
      setPhoneNumber(emailOrPhone);
    }
    setStep(STEPS.OTP);
  };

  // Step 2 -> Step 3
  const handleVerifyOtp = (result) => {
  if (result.success && result.token) {
    
    // CASE 1: User already exists → login directly
    if (result.status === "login_successful") {
      console.log("Login successful");
      console.log("User:", result.user?.fullName); // if backend returns user

      localStorage.setItem("authToken", result.token);

      // We still need to close the modal after login
      onClose();   // CLOSE MODAL
      return;      // ✔ STOP – DO NOT GO TO REGISTER
    }

    // CASE 2: New user → must complete registration
    if (result.status === "proceed_to_registration") {
      setAuthToken(result.token);
      setStep(STEPS.DETAILS);
    }
  }
};

  
  // Step 3 -> Finish
  const handleCreateAccount = (result) => {
    if (result.success) {
      console.log('Account Created successfully:', result);
      // Store user data if needed
      if (result.user) {
        localStorage.setItem('userData', JSON.stringify(result.user));
      }
      
      // [MODIFICATION 1] Show success toast
      showToast("Account created successfully. Please close this toast manually.", "success"); 
      
      // [MODIFICATION 2] Immediately close the modal so only the toast is visible.
      // The toast is a sibling element and will remain mounted.
      onClose(); 
      
      // Optional: Redirect to dashboard or show success message
      // window.location.href = '/dashboard';
    } else {
      console.log('Account creation failed:', result);
    }
  };

  const handleBack = () => {
    if (step === STEPS.OTP) setStep(STEPS.REGISTER);
    if (step === STEPS.DETAILS) setStep(STEPS.OTP);
  };

  const getModalTitle = () => {
    switch (step) {
      case STEPS.OTP:
        return 'Verify Code';
      case STEPS.DETAILS:
        return 'Complete Your Profile';
      case STEPS.REGISTER:
      default:
        return title;
    }
  };
  
  const showBackButton = step !== STEPS.REGISTER;

  return (
    <>
      {/* RENDER TOAST COMPONENT (it sits outside the modal container, ensuring visibility when modal closes) */}
      <Toast 
        key={toast.key}
        message={toast.message}
        type={toast.type}
        // Duration is ignored by Toast.jsx since dismissal is manual
        onClose={() => setToast({ message: '', type: '', key: toast.key })}
      />
      
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 z-50 font-sans"
        style={{
          backdropFilter: "blur(1px)",        // ✅ Blur
          WebkitBackdropFilter: "blur(1px)",  // ✅ Safari support
          backgroundColor: "rgba(0, 0, 0, 0.45)", // ✅ Soft fade on top of blur
        }}
      >
        
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
              onClick={() => {
                onClose();
                setIsClosedInternally(true); // ADDED: Force modal to close internally
              }}
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
              phoneNumber={phoneNumber ? `${countryCodePrefix} ${phoneNumber}` : ''}
              email={email}
              onVerify={handleVerifyOtp}
              onBack={handleBack}
            />
          )}

          {step === STEPS.DETAILS && (
            <DetailsForm 
              onCreateAccount={handleCreateAccount}
              countryCodePrefix={countryCodePrefix}
              authToken={authToken}
            />
          )}
        </div>
      </div>
    </>
  );
}