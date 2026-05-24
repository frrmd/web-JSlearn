import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form Data
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Timer state
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    const cooldownTimer = resendCooldown > 0 && setInterval(() => setResendCooldown(prev => prev - 1), 1000);
    return () => clearInterval(cooldownTimer);
  }, [resendCooldown]);

  // Handle OTP Inputs
  const handleOtpChange = (index, value) => {
    if (value && !/^[0-9]+$/.test(value)) return;
    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pastedData) return;
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) newOtp[i] = pastedData[i];
    setOtp(newOtp);
    const focusIndex = Math.min(pastedData.length, 5);
    if (inputRefs.current[focusIndex]) inputRefs.current[focusIndex].focus();
  };

  // Step 1: Request OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/otp/send', {
        email,
        type: 'password_reset'
      });
      if (response.data.success) {
        setStep(2);
        setResendCooldown(60);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to send reset code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Validate OTP by calling the verify-reset-code endpoint
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setErrorMessage('Please enter the full 6-digit code.');
      return;
    }

    setIsLoading(true);
    try {
      // Panggil endpoint khusus untuk verifikasi OTP
      const response = await api.post('/otp/verify-reset-code', {
        email,
        otp: otpString
      });

      if (response.data.success) {
        // Jika OTP valid
        setStep(3);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to verify OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  //Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/otp/reset-password', {
        email,
        otp: otp.join(''),
        password,
        password_confirmation: confirmPassword
      });

      if (response.data.success) {
        setSuccessMessage('Password successfully reset! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#fbffe2] min-h-screen flex flex-col justify-center items-center px-6 text-[#313c0f] font-body relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#e4f6a9] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#84fb42]/20 rounded-full blur-3xl pointer-events-none"></div>

      {step === 1 && (
        <button onClick={() => navigate('/login')} className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-[#b2bf85]/30 text-[#2e7300] active:translate-y-1 transition-all z-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      )}
      {step > 1 && (
        <button onClick={() => setStep(step - 1)} className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-[#b2bf85]/30 text-[#2e7300] active:translate-y-1 transition-all z-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      )}

      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-[#313c0f]/5 border-2 border-[#b2bf85]/20 z-10">

        {/* Header content changes based on step */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2e7300] rounded-2xl flex items-center justify-center mx-auto mb-4 transform -rotate-3">
            <span className="material-symbols-outlined text-white text-3xl">
              {step === 1 ? 'key' : step === 2 ? 'mark_email_read' : 'lock_reset'}
            </span>
          </div>
          <h1 className="text-3xl font-black font-headline text-[#2e7300]">
            {step === 1 ? 'Forgot Password?' : step === 2 ? 'Enter Code' : 'New Password'}
          </h1>
          <p className="text-[#5d6938] mt-2 font-medium">
            {step === 1 ? "Enter your email and we'll send you a reset code." :
              step === 2 ? `We sent a code to ${email}` :
                "Create a new strong password."}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold rounded text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-3 bg-green-100 border-l-4 border-[#2e7300] text-[#2e7300] font-bold rounded text-sm">
            {successMessage}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-[#313c0f]">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">mail</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium"
                  placeholder="ninja@jsmastery.com"
                />
              </div>
            </div>
            <button
              type="submit" disabled={isLoading}
              className="w-full bg-[#2e7300] text-white font-headline font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#1a4700] active:shadow-[0_0px_0_0_#1a4700] active:translate-y-1 transition-all mt-4 disabled:opacity-70"
            >
              {isLoading ? 'Sending...' : 'SEND RESET CODE'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-[#313c0f]">6-Digit Code</label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className="w-12 h-14 text-center text-2xl font-black rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-[#2e7300]/20 bg-[#fbffe2]/30 text-[#2e7300] outline-none transition-all"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit" disabled={isLoading || otp.join('').length !== 6}
              className="w-full bg-[#2e7300] text-white font-headline font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#1a4700] active:shadow-[0_0px_0_0_#1a4700] active:translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'CONTINUE'}
            </button>

            <div className="text-center text-sm font-bold">
              <span className="text-[#5d6938]">Didn't receive the code? </span>
              {resendCooldown > 0 ? (
                <span className="text-[#b2bf85]">Resend in {resendCooldown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleSendOtp(e)}
                  disabled={isLoading}
                  className="text-[#2e7300] hover:underline cursor-pointer disabled:opacity-50"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-[#313c0f]">New Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">lock</span>
                <input
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-[#313c0f]">Confirm New Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">lock</span>
                <input
                  type="password" required
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit" disabled={isLoading}
              className="w-full bg-[#2e7300] text-white font-headline font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#1a4700] active:shadow-[0_0px_0_0_#1a4700] active:translate-y-1 transition-all mt-2 disabled:opacity-70"
            >
              {isLoading ? 'Resetting...' : 'RESET PASSWORD'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
