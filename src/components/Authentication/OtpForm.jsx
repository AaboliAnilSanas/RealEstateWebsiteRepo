import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import axiosInstance from '../../services/axios'; // <-- ADDED IMPORT

export default function ModernOtpForm({ 
    phoneNumber = '', 
    email = '',
    onVerify = () => {}, 
    onBack = () => {} 
}) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [resending, setResending] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    
    const isOtpComplete = otp.every(digit => digit.length === 1);

    useEffect(() => {
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, []);

    // ** ADDED API CALL FUNCTION: Verify OTP **
    const handleVerify = async () => {
        if (!isOtpComplete || loading) return; // Prevent double submission
        
        setLoading(true);
        setError('');
        const otpCode = otp.join('');

        try {
            const response = await axiosInstance.post('auth/verify-otp', {
                email: email,
                otp: otpCode
            });
            
            const data = response.data;
            
            // Store token in localStorage for subsequent API calls (like registration)
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }
            
            // Pass the crucial status and token back to AuthFlowModal
            onVerify({
                success: true, // Always true if API call succeeds and we get a token/message
                token: data.token,
                status: data.status, // "login_successful" or "proceed_to_registration"
                message: data.message
            });
            
        } catch (error) {
            console.error('OTP verification failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Invalid or expired OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    // ** END API CALL FUNCTION **

    const handleInputChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(-1);
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
        
        if (newOtp.every(digit => digit.length === 1)) {
            // ** MODIFIED: Call API function when OTP is complete **
            setTimeout(handleVerify, 100); 
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newOtp = [...otp];
            
            if (newOtp[index]) {
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
        const newOtp = [...otp];
        
        pastedData.split('').forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char;
            }
        });
        
        setOtp(newOtp);
        
        const nextEmptyIndex = newOtp.findIndex(digit => !digit);
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        } else {
            inputRefs.current[5]?.focus();
            if (newOtp.every(digit => digit)) {
                // ** MODIFIED: Call API function when OTP is complete after paste **
                 setTimeout(handleVerify, 100);
            }
        }
    };

    // ** MODIFIED: Use the actual handleVerify function for manual click **
    const handleManualVerify = handleVerify;

    const handleResendOtp = async () => {
        try {
            setResending(true);
            setError('');
            
            // ** API CALL: Resend OTP (Replaces dummy promise) **
            await axiosInstance.post('auth/send-otp', {
                email: email
            });
            // ** END API CALL **
            
            setOtp(['', '', '', '', '', '']);
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        } catch (error) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setResending(false);
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
                    <h2 className="text-2xl font-bold mb-2"
                        style={{ 
                            background: 'linear-gradient(135deg, var(--primary-color-light), var(--location-blue-600), var(--secondary-color))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                        Verification Code
                    </h2>
                    <p className="text-gray-600 text-sm">
                        We've sent a code to
                    </p>
                    <p className="font-semibold text-sm mt-1" style={{ color: 'var(--primary-color-light)' }}>
                        {email || phoneNumber}
                    </p>
                </div>

                <div className="space-y-5">
                    {/* OTP Input */}
                    <div className="flex justify-center gap-2 sm:gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl transition-all duration-200 focus:outline-none text-gray-900 ${
                                    digit 
                                        ? 'border-2 shadow-lg' 
                                        : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                                } ${
                                    error 
                                        ? 'border-red-400 shake' 
                                        : ''
                                } focus:shadow-lg focus:scale-105`}
                                style={digit ? {
                                    background: 'linear-gradient(135deg, var(--gold-50), var(--location-blue-50))',
                                    borderColor: 'var(--primary-color-light)',
                                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
                                } : {}}
                                required
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                            <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        type="button"
                        onClick={handleManualVerify}
                        disabled={!isOtpComplete || loading}
                        className="group relative w-full text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg hover:shadow-xl disabled:shadow-none"
                        style={{
                            background: 'linear-gradient(135deg, var(--primary-color-light), var(--location-blue-600), var(--secondary-color))',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)'
                        }}
                    >
                        {/* Shimmer Effect */}
                        {!loading && isOtpComplete && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        )}
                        
                        <span className="relative flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify Code'
                            )}
                        </span>
                    </button>

                    {/* Resend OTP */}
                    <div className="text-center pt-1">
                        <p className="text-sm text-gray-600 mb-2">
                            Didn't receive the code?
                        </p>
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={resending}
                            className="inline-flex items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
                            style={{ color: 'var(--primary-color-light)' }}
                        >
                            <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                            {resending ? 'Sending...' : 'Resend Code'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1" 
                 style={{ background: 'linear-gradient(to right, var(--primary-color-light), var(--secondary-color), var(--primary-color-light))' }} />
        </div>
    );
}