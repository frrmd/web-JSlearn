import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Local state
  const [errorMessage, setErrorMessage] = useState('');

  // Handler logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Real API call
    const result = await login(email, password);

    if (result.success) {
      // Redirect based on user role
      if (result.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } else {
      setErrorMessage(result.message);
    }
  };

  // Render

  return (
    <div className="bg-[#fbffe2] min-h-screen flex flex-col justify-center items-center px-6 text-[#313c0f] font-body relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#e4f6a9] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#84fb42]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back navigation button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-[#b2bf85]/30 text-[#2e7300] active:translate-y-1 transition-all z-10"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      {/* Login form card */}
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-[#313c0f]/5 border-2 border-[#b2bf85]/20 z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2e7300] rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          </div>
          <h1 className="text-3xl font-black font-headline text-[#2e7300]">Welcome Back!</h1>
          <p className="text-[#5d6938] mt-2 font-medium">Ready to continue your coding journey?</p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-2 text-[#313c0f]">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium"
              placeholder="ninja@jsmastery.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-[#313c0f]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center text-sm font-bold">
            <label className="flex items-center gap-2 cursor-pointer text-[#5d6938]">
              <input type="checkbox" className="rounded text-[#2e7300] focus:ring-[#2e7300] w-4 h-4 border-[#b2bf85]" />
              Remember me
            </label>
            <span onClick={() => navigate('/forgot-password')} className="text-[#2e7300] hover:underline cursor-pointer">Forgot Password?</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2e7300] text-white font-headline font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#1a4700] active:shadow-[0_0px_0_0_#1a4700] active:translate-y-1 transition-all mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center border-t-2 border-[#b2bf85]/20 pt-6">
          <p className="text-sm text-[#5d6938] font-bold">
            Don't have an account? <span onClick={() => navigate('/register')} className="text-[#2e7300] cursor-pointer hover:underline">Get Started</span>
          </p>
        </div>
      </div>
    </div>
  );
}