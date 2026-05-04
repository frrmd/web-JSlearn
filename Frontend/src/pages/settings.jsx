import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser, allUsers } from '../data/mockUser';

export default function Settings() {
  const navigate = useNavigate();

  // Account form local state
  const [username, setUsername] = useState(mockUser.username);
  const [about, setAbout] = useState(mockUser.bio);
  const [email] = useState(mockUser.email);
  const [password, setPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSaveAccount = () => {
    // Update mock user data
    const currentUser = allUsers.find(u => u.isCurrentUser);
    if (currentUser) {
      currentUser.username = username;
    }
    console.log('Account updated (mock):', { username, about, password: password ? '***' : '(unchanged)' });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-32 selection:bg-primary-container">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 h-16 bg-[#fbffe2]/80 backdrop-blur-xl border-b-4 border-[#e1e5ca]">
        <div className="flex items-center gap-4 w-full">
          {/* Back navigation button */}
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
          <div className="bg-surface-container rounded-lg p-6 space-y-5 relative overflow-hidden">

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#313c0f]">Username</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">badge</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium"
                  placeholder="Your username"
                />
              </div>
            </div>

            {/* About */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#313c0f]">About</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-4 text-[#b2bf85]">description</span>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={3}
                  className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium resize-none"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            {/* Email (readonly) */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#313c0f]">
                Email
                <span className="ml-2 text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full font-bold">Read Only</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">mail</span>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/20 bg-surface-container-highest/50 font-medium text-on-surface-variant cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#313c0f]">New Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b2bf85]">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-12 rounded-xl border-2 border-[#b2bf85]/40 focus:border-[#2e7300] focus:ring-0 outline-none transition-colors bg-[#fbffe2]/30 font-medium"
                  placeholder="Leave blank to keep current"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveAccount}
                className="bg-[#2e7300] text-white font-headline font-bold px-8 py-3 rounded-xl shadow-[0_4px_0_0_#1a4700] active:shadow-[0_0px_0_0_#1a4700] active:translate-y-1 transition-all flex items-center gap-2"
              >
                {saved ? (
                  <>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Saved!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">save</span>
                    Save Changes
                  </>
                )}
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
            About
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
        <div className="pt-6 pb-12">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-error text-on-error font-headline font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#8b0000] active:shadow-[0_0px_0_0_#8b0000] active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">logout</span>
            SIGN OUT
          </button>
          <p className="text-center mt-6 text-on-surface-variant/60 font-bold text-sm">JS Mastery Version 4.2.0</p>
        </div>
      </main>

      {/* Bottom navigation is handled globally */}
    </div>
  );
}