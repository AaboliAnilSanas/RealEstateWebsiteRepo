import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react'; 
import axiosInstance from '../../services/axios';
import '../../index.css';

const getCssVar = (varName, fallback) => `var(${varName}, ${fallback})`;

export default function OtpForm({ 
    phoneNumber = '', 
    email = '',
    onVerify = () => {}, 
    onBack = () => {} 
}) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, []);

    const handleInputChange = (e, index) => {
        const value = e.target.value.slice(-1);
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
        
        // Auto-verify if all digits are entered
        if (newOtp.every(digit => digit.length === 1)) {
            handleVerifyOtp(newOtp.join(''));
        }
    };

    const handleVerifyOtp = async (otpCode) => {
        if (!otpCode || otpCode.length !== 6) return;

        setLoading(true);
        setError('');

        try {
            const payload = email ? { email, otp: otpCode } : { phoneNumber, otp: otpCode };
            
            const response = await axiosInstance.post('/auth/verify-otp', payload);

            if (response.data.status === 'success') {
                // Store token if provided
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                }
                
                onVerify({
                    success: true,
                    token: response.data.token,
                    user: response.data.user,
                    message: response.data.message
                });
            } else {
                setError(response.data.message || 'OTP verification failed');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.status === 400) {
                setError('Invalid OTP. Please try again.');
            } else if (error.response?.status === 404) {
                setError('OTP expired or not found. Please request a new one.');
            } else {
                setError('Network error. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleManualVerify = (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length === 6) {
            handleVerifyOtp(otpCode);
        }
    };

    const handleVerifyOtp = async (otpCode) => {
    if (!otpCode || otpCode.length !== 6) return;

    setLoading(true);
    setError('');

    try {
        // Send only email in the payload
        const payload = { 
            email: email,  // Always send email
            otp: otpCode 
        };
        
        console.log('Sending payload:', payload); // Debug log
        
        const response = await axiosInstance.post('/auth/verify-otp', payload);

        if (response.data.status === 'success') {
            // Store token if provided
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            
            onVerify({
                success: true,
                token: response.data.token,
                user: response.data.user,
                message: response.data.message
            });
        } else {
            setError(response.data.message || 'OTP verification failed');
        }
    } catch (error) {
        console.error('OTP verification error:', error);
        
        if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else if (error.response?.status === 400) {
            setError('Invalid OTP. Please try again.');
        } else if (error.response?.status === 404) {
            setError('OTP expired or not found. Please request a new one.');
        } else {
            setError('Network error. Please check your connection.');
        }
    } finally {
        setLoading(false);
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

    return (
        <div className="pt-3 px-6 pb-6 sm:pt-4 sm:px-8 sm:pb-8">
            <div className="flex items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: getCssVar('--tertiary-color', 'black') }}>
                    Enter Verification Code
                </h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Code sent to {email || phoneNumber}
            </p>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleManualVerify} className="space-y-8">
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
                                if (e.key === 'Backspace' && (!e.target.value || !digit) && index > 0) {
                                    inputRefs.current[index - 1].focus();
                                }
                            }}
                            className="w-1/6 h-14 text-center text-3xl font-extrabold border-b-4 focus:outline-none transition-all duration-200 text-black rounded-lg"
                            style={{
                                backgroundColor: 'rgb(245, 245, 245)',
                                color: getCssVar('--tertiary-color', 'black'),
                                borderColor: getCssVar('--secondary-color', 'rgb(138, 136, 136)'),
                            }}
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            inputMode="numeric"
                            pattern="[0-9]"
                            disabled={loading}
                            required
                        />
                    ))}
                </div>
                
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!isOtpComplete || loading}
                        className="w-full font-bold text-lg py-3 rounded-lg text-white transition duration-200 ease-in-out active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ 
                            background: isOtpComplete && !loading
                                ? 'linear-gradient(135deg, #fbbf24 0%, #d2a63f 100%)'
                                : '#ccc',
                        }}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </div>

                <p className="text-sm pt-4 text-center" 
                    style={{ color: getCssVar('--secondary-color', 'rgb(138, 136, 136)') }}
                >
                    Didn't receive code? {' '}
                    <button 
                        type="button"
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: getCssVar('--primary-color', '#d2a63f') }}
                    >
                        {loading ? 'Sending...' : 'Resend OTP'}
                    </button>
                </p>
            </form>
        </div>
    );
}