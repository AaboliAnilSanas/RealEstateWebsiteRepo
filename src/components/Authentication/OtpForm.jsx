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
    
    // 1. New states for cooldown and success message
    const [cooldownSeconds, setCooldownSeconds] = useState(0); 
    const [successMessage, setSuccessMessage] = useState(''); 
    
    // 2. New state to control if the countdown timer should be *displayed*
    const [showCountdownTimer, setShowCountdownTimer] = useState(false); 
    
    const inputRefs = useRef([]);
    
    const isOtpComplete = otp.every(digit => digit.length === 1);

    useEffect(() => {
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, []);

    // 3. Timer useEffect for countdown logic
    useEffect(() => {
        let timer;
        if (cooldownSeconds > 0) {
            timer = setInterval(() => {
                setCooldownSeconds(prev => prev - 1);
            }, 1000);
        } else if (cooldownSeconds === 0) {
            // When timer hits zero, reset display/error states
            if (error && error.includes('seconds before resending')) {
                setError('');
            }
            if (successMessage) {
                 setTimeout(() => setSuccessMessage(''), 1000); 
            }
            // Crucially, turn off the countdown display
            setShowCountdownTimer(false); 
        }
        return () => clearInterval(timer);
    }, [cooldownSeconds, error, successMessage]);


    const handleVerify = async () => {
        if (!isOtpComplete || loading) return; 
        
        setLoading(true);
        setError('');
        const otpCode = otp.join('');

        try {
            const response = await axiosInstance.post('auth/verify-otp', {
                email: email,
                otp: otpCode
            });
            
            const data = response.data;
            
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }
            
            onVerify({
                success: true, 
                token: data.token,
                status: data.status, 
                message: data.message
            });
            
        } catch (error) {
            console.error('OTP verification failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Invalid or expired OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(-1);
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
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
                 setTimeout(handleVerify, 100);
            }
        }
    };

    const handleManualVerify = handleVerify;

    // 4. Modified handleResendOtp to implement visibility logic
    const handleResendOtp = async () => {
        // Prevent resending if button is disabled
        if (cooldownSeconds > 0) return;
        
        try {
            setResending(true);
            setError('');
            setSuccessMessage(''); 
            
            const response = await axiosInstance.post('auth/resend-otp', {
                email: email
            });
            
            const message = response.data.message || 'A new OTP has been sent to you.';
            
            setOtp(['', '', '', '', '', '']);
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
            
            // --- SUCCESS PATH ---
            setSuccessMessage(message);
            setCooldownSeconds(60); // Keep button disabled for 60s
            setShowCountdownTimer(false); // **DO NOT show the timer on success**

        } catch (error) {
            // Error handling (Check for CooldownException)
            const errorMessage = error.response?.data?.message || 'Failed to resend OTP.';
            
            const cooldownMatch = errorMessage.match(/Please wait (\d+) more seconds before resending./);
            
            if (cooldownMatch) {
                const seconds = parseInt(cooldownMatch[1], 10);
                // --- COOLDOWN ERROR PATH ---
                setError(errorMessage); 
                setCooldownSeconds(seconds); 
                setShowCountdownTimer(true); // **Show the timer on cooldown error**
            } else {
                setError(errorMessage);
                setShowCountdownTimer(false);
            }
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
            {/* Decorative Elements (omitted for brevity) */}
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

                    {/* Error/Success Message */}
                    {(successMessage || error) && (
                        <div className={`flex items-start gap-2 p-4 rounded-xl border ${error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${error ? 'bg-red-500' : 'bg-green-500'}`}>
                                <span className="text-white text-xs font-bold">{error ? '!' : '✓'}</span>
                            </div>
                            <p className={`text-sm font-medium ${error ? 'text-red-700' : 'text-green-700'}`}>
                                {successMessage || error}
                            </p>
                        </div>
                    )}
                    
                    {/* Verify Button (omitted for brevity) */}
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

                    {/* Resend OTP Section */}
                    <div className="text-center pt-1">
                        <p className="text-sm text-gray-600 mb-2">
                            Didn't receive the code?
                        </p>
                        
                        {/* Cooldown Timer Display - Visible ONLY on cooldown error (when setShowCountdownTimer(true) is set) */}
                        {showCountdownTimer && cooldownSeconds > 0 && (
                             <p className="font-semibold text-sm mb-2" style={{ color: 'var(--primary-color-light)' }}>
                                Please wait for: <span className="text-red-600 font-bold">{cooldownSeconds} seconds</span>
                            </p>
                        )}
                        
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            // Button disabled when resending or cooldown is active
                            disabled={resending || cooldownSeconds > 0} 
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