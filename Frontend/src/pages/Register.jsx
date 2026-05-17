import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  // Form local state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form submission handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Input validation
    if (!name.trim()) {
      setErrorMessage('Nama tidak boleh kosong.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Masukkan email yang valid.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password harus minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak cocok.');
      return;
    }

    setIsLoading(true);

    // Real API Request
    const result = await register(name, email, password, confirmPassword);

    if (result.success) {
      // Typically we auto-login after register in the API, so we go home
      navigate('/home');
    } else {
      setErrorMessage(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-[#fbffe2] min-h-screen flex flex-col justify-center items-center px-6 text-[#313c0f] font-body relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#e4f6a9] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#84fb42]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back Button */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-[#b2bf85]/30 text-[#2e7300] active:translate-y-1 transition-all z-10"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      {/* Card Form Register */}
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-[#313c0f]/5 border-2 border-[#b2bf85]/20 z-10">
        <div className="text-center mb-8">
          <span className="inline-block bg-[#2e7300] text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            New Account ✏️
          </span>
          <h1 className="text-3xl font-black font-headline text-[#313c0f]">Get Started</h1>
          <p className="text-[#5d6938] mt-2 font-medium">Join over 2 million developers learning the language of the web.</p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold rounded text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold mb-2 text-[#313c0f]">Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">person</span>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium" 
                placeholder="Your full name" 
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-2 text-[#313c0f]">Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">mail</span>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium" 
                placeholder="hello@example.com" 
              />
            </div>
          </div>
          
          {/* Password */}
          <div>
            <label className="block text-sm font-bold mb-2 text-[#313c0f]">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">lock</span>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-bold mb-2 text-[#313c0f]">Confirm Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">lock</span>
              <input 
                type="password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium" 
                placeholder="••••••••" 
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2e7300] text-white font-headline font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#1a4700] active:shadow-[0_0px_0_0_#1a4700] active:translate-y-1 transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'CREATE ACCOUNT'}
            {!isLoading && <span className="material-symbols-outlined">rocket_launch</span>}
          </button>
        </form>

        <div className="mt-8 text-center border-t-2 border-[#b2bf85]/20 pt-6">
          <p className="text-sm text-[#5d6938] font-bold">
            I already have an account? <span onClick={() => navigate('/login')} className="text-[#2e7300] cursor-pointer hover:underline">Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
}
