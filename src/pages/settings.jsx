import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-32 selection:bg-primary-container">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 h-16 bg-[#fbffe2]/80 backdrop-blur-xl border-b-4 border-[#e1e5ca]">
        <div className="flex items-center gap-4 w-full">
          {/* Tombol Back untuk kembali ke Profile */}
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-highest text-[#2e7300] transition-all active:translate-y-[2px]"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#2e7300]">Settings</h1>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-10">
        
        {/* Account Section */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-xl text-primary flex items-center gap-2 px-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            Account
          </h2>
          <div className="bg-surface-container rounded-lg p-6 space-y-4 relative overflow-hidden">
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl pressable border-b-4 border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">badge</span>
                  <span className="font-bold text-on-surface-variant">Change Username</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl pressable border-b-4 border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">description</span>
                  <span className="font-bold text-on-surface-variant">Edit About</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl pressable border-b-4 border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  <span className="font-bold text-on-surface-variant">Change Email</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl pressable border-b-4 border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">lock</span>
                  <span className="font-bold text-on-surface-variant">Password</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-xl text-primary flex items-center gap-2 px-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings_suggest</span>
            Preferences
          </h2>
          <div className="bg-surface-container rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">volume_up</span>
                </div>
                <span className="font-bold text-on-surface">Sound Effects</span>
              </div>
              <div className="w-14 h-8 bg-primary rounded-full p-1 cursor-pointer relative">
                <div className="w-6 h-6 bg-white rounded-full shadow-sm absolute right-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">vibration</span>
                </div>
                <span className="font-bold text-on-surface">Haptic Feedback</span>
              </div>
              <div className="w-14 h-8 bg-primary rounded-full p-1 cursor-pointer relative">
                <div className="w-6 h-6 bg-white rounded-full shadow-sm absolute right-1"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-xl text-primary flex items-center gap-2 px-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            App Info
          </h2>
          <div className="bg-surface-container rounded-lg p-2 space-y-1 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-high rounded-xl transition-colors group">
              <span className="font-bold text-on-surface-variant">Terms of Service</span>
              <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-high rounded-xl transition-colors group">
              <span className="font-bold text-on-surface-variant">Privacy Policy</span>
              <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
            </button>
          </div>
        </section>

        {/* Sign Out Button */}
        <div className="px-6 pt-6 pb-12">
          <button 
            onClick={() => navigate('/')} 
            className="w-full py-5 bg-error rounded-2xl font-display font-black text-white text-lg uppercase tracking-wider border-b-8 border-on-error-container active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
          <p className="text-center mt-6 text-on-surface-variant/60 font-bold text-sm">JS Mastery Version 4.2.0</p>
        </div>
      </main>
      
      {/* Catatan: Bottom Nav tidak dimasukkan ke sini karena sudah ada secara global di App.tsx */}
    </div>
  );
}