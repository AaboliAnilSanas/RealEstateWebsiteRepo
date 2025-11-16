// src/components/Authentication/AuthFlowModal.jsx
import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
// Import the refactored content-only components
import RegisterForm from './RegisterForm.jsx'; 
import OtpForm from './OtpForm.jsx';           
import DetailsForm from './DetailsFormContent.jsx';   
import Toast from '../UIComponents/Toast'; 

// ... (other components and setup remain the same)

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
  
  const [isModalContentVisible, setIsModalContentVisible] = useState(true); 
  
  const [toast, setToast] = useState({ message: '', header: '', type: '', key: 0, duration: 0 }); 
  
  const showToast = (message, header, type = 'success') => { 
    setToast({ message, header, type, duration: 0, key: toast.key + 1 });
  };

  const triggerSuccessFlow = (toastHeader, toastMessage) => {
      // 1. Hide modal content immediately (visually closes the form/backdrop)
      setIsModalContentVisible(false);

      // 2. Show the toast.
      showToast(toastMessage, toastHeader, "success"); 
  };
  
  const handleToastClose = () => {
    if (!isModalContentVisible) {
        onClose();
    }
    setToast({ message: '', header: '', type: '', key: toast.key, duration: 0 });
  };


  if (!isOpen) return null; 

  // --- Flow Handlers ---

  const handleContinue = (emailOrPhone) => {
    if (emailOrPhone.includes('@')) {
      setEmail(emailOrPhone);
      setUserEmail(emailOrPhone);
      localStorage.setItem('userEmail', emailOrPhone);
    } else {
      setPhoneNumber(emailOrPhone);
    }
    setStep(STEPS.OTP);
  };

  const handleVerifyOtp = (result) => {
    if (result.success && result.token) {
      
      if (result.status === "login_successful") {
        console.log("Login successful");
        localStorage.setItem("authToken", result.token);
        
        // MODIFIED: Use the full name or fallback to a blank space if null
        // The message structure itself handles the 'Welcome back' part.
        const userName = result.user?.fullName ? `, ${result.user.fullName}` : ''; 
        if (result.user?.fullName) { 
            localStorage.setItem('userName', result.user.fullName); 
        }

        // CALL NEW FLOW HANDLER
        triggerSuccessFlow(
          "Login Successful!", 
          `Welcome back${userName}! You can now start exploring properties.` 
        );
        return;      
      }

      if (result.status === "proceed_to_registration") {
        setAuthToken(result.token);
        setStep(STEPS.DETAILS);
      }
    }
  };

  const handleCreateAccount = (result) => {
    if (result.success) {
      console.log('Account Created successfully:', result);
      
      if (result.user) {
        localStorage.setItem('userData', JSON.stringify(result.user));
      }
      
      // MODIFIED: Use the full name or fallback to a blank space if null
      const userName = result.name ? `, ${result.name}` : '';
      if (result.name) {
          localStorage.setItem('userName', result.name); 
      }
      
      // CALL NEW FLOW HANDLER
      triggerSuccessFlow(
        "Account Created!",
        `Welcome${userName}! Your account has been created successfully.` 
      );
    } else {
      console.log('Account creation failed:', result);
    }
  };

  const handleBack = () => {
    if (step === STEPS.OTP) setStep(STEPS.REGISTER);
    if (step === STEPS.DETAILS) setStep(STEPS.OTP);
  };
  
  const handleCloseClick = () => {
    if (!isModalContentVisible) return; 
    onClose();
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
  
  const showBackButton = step !== STEPS.REGISTER && isModalContentVisible;

  return (
    <>
      {/* RENDER TOAST COMPONENT: Now includes the header prop */}
      <Toast 
        key={toast.key}
        header={toast.header}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={handleToastClose} 
      />
      
      {/* Modal Overlay - Conditionally rendered to visually close the modal on success flow */}
      {isModalContentVisible && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50 font-sans"
          style={{
            backdropFilter: "blur(1px)",       
            WebkitBackdropFilter: "blur(1px)", 
            backgroundColor: "rgba(0, 0, 0, 0.45)", 
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
                <h2 className="text-xl font-bold" style={{ color: 'black' }}>{getModalTitle()}</h2>
              </div>

              <button
                onClick={handleCloseClick}
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
      )}
    </>
  );
}