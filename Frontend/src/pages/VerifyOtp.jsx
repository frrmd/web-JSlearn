import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtpAndRegister } = useAuth();

  // Get registration data from state
  const registrationData = location.state;

  // Redirect back if no data
  useEffect(() => {
    if (!registrationData || !registrationData.email) {
      navigate('/register', { replace: true });
    }
  }, [registrationData, navigate]);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Timer and Resend State
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)
  const [resendCooldown, setResendCooldown] = useState(60); // 60 seconds

  const inputRefs = useRef([]);

  useEffect(() => {
    // Timer for OTP expiration
    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    // Timer for resend cooldown
    const cooldownTimer = resendCooldown > 0 && setInterval(() => setResendCooldown(prev => prev - 1), 1000);
    return () => clearInterval(cooldownTimer);
  }, [resendCooldown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (index, value) => {
    if (value && !/^[0-9]+$/.test(value)) return;

    const digit = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1].focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus on the next empty input or the last one
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex].focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setErrorMessage('Please enter the full 6-digit code.');
      return;
    }

    if (!registrationData) return;

    setIsLoading(true);

    const result = await verifyOtpAndRegister(
      registrationData.email,
      otpString,
      registrationData.name,
      registrationData.password,
      registrationData.confirmPassword
    );

    if (result.success) {
      navigate('/home');
    } else {
      setErrorMessage(result.message);
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await api.post('/otp/send', {
        email: registrationData.email,
        type: 'registration',
        name: registrationData.name,
        password: registrationData.password,
        password_confirmation: registrationData.confirmPassword
      });

      if (response.data.success) {
        setResendCooldown(60); // Reset cooldown to 60s
        setTimeLeft(300); // Reset expiry timer to 5m
        setOtp(['', '', '', '', '', '']); // Clear inputs
        inputRefs.current[0].focus(); // Focus first input
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // If no data, render nothing while redirecting
  if (!registrationData || !registrationData.email) return null;

  return (
    <div className="bg-[#fbffe2] min-h-screen flex flex-col justify-center items-center px-6 text-[#313c0f] font-body relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#e4f6a9] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#84fb42]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-[#b2bf85]/30 text-[#2e7300] active:translate-y-1 transition-all z-10"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      {/* Card Form */}
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-[#313c0f]/5 border-2 border-[#b2bf85]/20 z-10 text-center">
        <div className="w-20 h-20 bg-[#f0fce0] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#2e7300]/10">
          <span className="material-symbols-outlined text-[#2e7300] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
        </div>

        <h1 className="text-3xl font-black font-headline text-[#313c0f] mb-2">Verify Email</h1>
        <p className="text-[#5d6938] font-medium mb-8">
          We've sent a 6-digit code to<br />
          <strong className="text-[#2e7300]">{registrationData.email}</strong>
        </p>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold rounded text-sm text-left">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleVerify}>
          {/* OTP Inputs */}
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-black rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-[#2e7300]/20 bg-[#fbffe2]/30 text-[#2e7300] outline-none transition-all"
                maxLength={1}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.join('').length !== 6}
            className="w-full bg-[#2e7300] text-white font-headline font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#1a4700] active:shadow-[0_0px_0_0_#1a4700] active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? 'Verifying...' : 'VERIFY & CONTINUE'}
            {!isLoading && <span className="material-symbols-outlined">check_circle</span>}
          </button>
        </form>

        {/* Resend & Timer */}
        <div className="flex flex-col items-center gap-2">
          {timeLeft > 0 ? (
            <p className="text-sm font-bold text-[#5d6938]">
              Code expires in: <span className="text-red-500">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="text-sm font-bold text-red-500">
              Code has expired.
            </p>
          )}

          <div className="text-sm font-bold mt-2">
            <span className="text-[#5d6938]">Didn't receive the code? </span>
            {resendCooldown > 0 ? (
              <span className="text-[#b2bf85]">Resend in {resendCooldown}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="text-[#2e7300] hover:underline cursor-pointer disabled:opacity-50"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
