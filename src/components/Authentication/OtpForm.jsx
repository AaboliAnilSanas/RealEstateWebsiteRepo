import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react'; 
import '../index.css'; // Ensure Tailwind CSS is imported


// Helper function to read a CSS variable (or use a fallback from the theme)
const getCssVar = (varName, fallback) => `var(${varName}, ${fallback})`;

/**
 * @param {object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal. Defaults to true to show the form.
 */

export default function OtpFormPopup({ isOpen = true }) {
    const [otp, setOtp] = useState(['', '', '', '']); 
    const inputRefs = useRef([]);

    // Focus the first input on load/open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [isOpen]);

    const handleInputChange = (e, index) => {
        const value = e.target.value.slice(-1);
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp); 

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        } 
    };

    if (!isOpen) return null;

    const inputFocus = (e) => {
        e.target.style.borderColor = getCssVar('--primary-color', '#d2a63f');
        e.target.style.boxShadow = `0 0 0 2px ${getCssVar('--primary-color-light', '#d2a63fb5')}`;
    };
    const inputBlur = (e) => {
        e.target.style.borderColor = getCssVar('--secondary-color', 'rgb(138, 136, 136)');
        e.target.style.boxShadow = 'none';
    };


    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 font-sans"
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white w-full max-w-sm p-6 rounded-xl shadow-2xl transition-transform duration-300 scale-100 opacity-100"
                style={{ boxShadow: '0 15px 60px rgba(0,0,0,0.4)' }}
            >
                {/* Header (Back Arrow and Title) */}
                <div className="flex items-center mb-6">
                    <button 
                        className="p-2 mr-4 rounded-full transition-colors duration-200 text-gray-500 hover:text-gray-700"
                        aria-label="Go back or close"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    
                    <h2 
                        className="text-2xl font-bold"
                        style={{ color: getCssVar('--tertiary-color', 'black') }}
                    >
                        Enter Verification Code
                    </h2>
                </div>

                {/* OTP Input Form */}
                <form 
                    onSubmit={(e) => e.preventDefault()} // Prevent actual submission
                    className="space-y-8"
                >
                    <p className="text-black-600 text-sm mb-4">
                        A 4-digit code has been sent to your phone number.
                    </p>
                    
                    {/* OTP Input Boxes */}
                    <div className="flex justify-between gap-3 md:gap-4">
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
                                className="w-1/4 h-14 text-center text-3xl font-extrabold border-b-4 focus:outline-none transition-all duration-200 text-black rounded-lg"
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
                            className="w-full font-bold text-lg py-3 rounded-lg text-white transition duration-200 ease-in-out active:scale-[0.98] shadow-md hover:scale-[1.02]"
                            style={{ 
                                 background: 'linear-gradient(135deg, #fbbf24 0%, #555000ff 100%)',
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
        </div>
    );
};