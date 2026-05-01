import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini kamu bisa tambahkan logika integrasi ke backend (API)
    console.log('Data Register:', formData);
    
    // Simulasi setelah register berhasil, arahkan ke /home atau /login
    navigate('/home'); 
  };

  return (
    <div className="bg-[#fbffe2] min-h-screen font-body flex flex-col relative selection:bg-primary-container">
      {/* Top Navigation / Back Button */}
      <header className="absolute top-0 left-0 w-full z-50 flex items-center px-6 h-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 hover:bg-white backdrop-blur-md text-[#2e7300] shadow-sm transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md w-full mx-auto">
        {/* Header Text */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-block bg-[#2e7300] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 shadow-md">
            New Account 🚀
          </div>
          <h1 className="font-headline font-extrabold text-4xl text-[#1a4300] tracking-tight">
            Get Started
          </h1>
          <p className="text-[#2e7300]/80 font-medium text-sm px-4">
            Join over 2 million developers learning the language of the web.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#1a4300] ml-1">Username</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-[#2e7300] transition-colors">
                person
              </span>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="js_master"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-black/5 outline-none focus:border-[#2e7300] focus:ring-4 focus:ring-[#2e7300]/10 transition-all font-medium text-black placeholder:text-black/30 shadow-sm"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#1a4300] ml-1">Email</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-[#2e7300] transition-colors">
                mail
              </span>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="hello@example.com"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-black/5 outline-none focus:border-[#2e7300] focus:ring-4 focus:ring-[#2e7300]/10 transition-all font-medium text-black placeholder:text-black/30 shadow-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#1a4300] ml-1">Password</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-[#2e7300] transition-colors">
                lock
              </span>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-black/5 outline-none focus:border-[#2e7300] focus:ring-4 focus:ring-[#2e7300]/10 transition-all font-medium text-black placeholder:text-black/30 shadow-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full mt-6 py-4 bg-[#2e7300] rounded-2xl font-bold text-white text-base uppercase tracking-wider border-b-4 border-[#1a4300] active:translate-y-[4px] active:border-b-0 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            Create Account
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-8 text-center">
          <p className="text-black/60 font-medium text-sm">
            I already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-[#2e7300] font-bold hover:underline transition-all"
            >
              Log In
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}