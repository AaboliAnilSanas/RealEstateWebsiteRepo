import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react'; 
import '../../index.css'; // Ensure Tailwind CSS is imported

// Helper function to read a CSS variable (or use a fallback from the theme)
const getCssVar = (varName, fallback) => `var(${varName}, ${fallback})`;

/**
 * @param {object} props
 * @param {string} props.phoneNumber - The phone number to display (e.g., "+91 9876543210").
 * @param {function} props.onVerify - Function called on OTP verification to move to the next step.
 * @param {function} props.onBack - Function called to go back to the previous step (RegisterForm).
 */

export default function OtpForm({ phoneNumber = '+91 XXXX XXXX', onVerify = () => {}, onBack = () => {} }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']); 
    const inputRefs = useRef([]);

    // Focus the first input on load/open
    useEffect(() => {
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, []);

    const handleInputChange = (e, index) => {
        const value = e.target.value.slice(-1);
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp); 

        // Focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        } 
        
        // Auto-verify if all digits are entered
        if (newOtp.every(digit => digit.length === 1)) {
            onVerify(newOtp.join(''));
        }
    };

    const inputFocus = (e) => {
        e.target.style.borderColor = getCssVar('--primary-color', '#d2a63f');
        e.target.style.boxShadow = `0 0 0 2px ${getCssVar('--primary-color-light', '#d2a63fb5')}`;
    };
    const inputBlur = (e) => {
        e.target.style.borderColor = getCssVar('--secondary-color', 'rgb(138, 136, 136)');
        e.target.style.boxShadow = 'none';
    };

    const isOtpComplete = otp.every(digit => digit.length === 1);
    
    const handleVerify = (e) => {
        e.preventDefault();
        if (isOtpComplete) {
            onVerify(otp.join(''));
        }
    };

    // The component now renders only the inner content, relying on the parent (AuthFlowModal) for the overlay and header.
    return (
        <div className="pt-3 px-6 pb-6 sm:pt-4 sm:px-8 sm:pb-8"> 
            {/* Header is simplified to show context and allow back navigation */}
            <div className="flex items-center mb-6">
                {/* Removed the dedicated back button here as AuthFlowModal handles the header back logic */}
                <h2 
                    className="text-xl font-bold"
                    style={{ color: getCssVar('--tertiary-color', 'black') }}
                >
                    Enter Verification Code
                </h2>
            </div>

            {/* OTP Input Form */}
            <form 
                onSubmit={handleVerify} 
                className="space-y-8"
            >
                
                {/* OTP Input Boxes */}
                <div className="flex justify-between gap-2 md:gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => {
                                // Handle backspace navigation for better UX
                                if (e.key === 'Backspace' && (!e.target.value || !digit) && index > 0) {
                                    inputRefs.current[index - 1].focus();
                                }
                            }}
                            className="w-1/6 h-14 text-center text-3xl font-extrabold border-b-4 focus:outline-none transition-all duration-200 text-black rounded-lg"
                            style={{
                                backgroundColor: 'rgb(245, 245, 245)', // Light gray background
                                color: getCssVar('--tertiary-color', 'black'),
                                borderColor: getCssVar('--secondary-color', 'rgb(138, 136, 136)'),
                            }}
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            inputMode="numeric"
                            pattern="[0-9]"
                            required
                        />
                    ))}
                </div>
                
                {/* Verify Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!isOtpComplete}
                        className="w-full font-bold text-lg py-3 rounded-lg text-white transition duration-200 ease-in-out active:scale-[0.98] shadow-md"
                        style={{ 
                            background: isOtpComplete 
                                ? 'linear-gradient(135deg, #fbbf24 0%, #d2a63f 100%)'
                                : '#ccc',
                            cursor: isOtpComplete ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Verify OTP
                    </button>
                </div>

                {/* Resend Link Placeholder */}
                <p className="text-sm pt-4 text-center" 
                    style={{ color: getCssVar('--secondary-color', 'rgb(138, 136, 136)') }}
                >
                    Didn't receive code? <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold hover:underline" style={{ color: getCssVar('--primary-color', '#d2a63f') }}>Resend OTP</a>
                </p>
            </form>
        </div>
    );
};