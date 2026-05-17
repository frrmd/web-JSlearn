import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily'
];

export default function Settings() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  // Account form local state
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saved, setSaved] = useState(false);

  // Avatar Modal State
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState('');
  const [uploadPreview, setUploadPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setAbout(user.bio || '');
      setEmail(user.email || '');
      setAvatarUrl(user.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback');
      setSelectedAvatarUrl(user.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback');
    }
  }, [user]);

  const handleSaveAccount = async () => {
    try {
      const payload = {
        username,
        avatar_url: avatarUrl,
        bio: about,
      };

      if (password) {
        payload.password = password;
        payload.password_confirmation = password;
      }

      const response = await api.put('/profile', payload);
      setUser(response.data.data);
      
      setSaved(true);
      setPassword('');
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Failed to update profile', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadPreview(imageUrl);
      setSelectedAvatarUrl(imageUrl);
    }
  };

  const handleCloseModal = () => {
    setIsAvatarModalOpen(false);
    // Reset selection to current avatar if cancelled
    setSelectedAvatarUrl(avatarUrl);
    setUploadPreview(null);
  };

  const handleSaveAvatar = () => {
    setAvatarUrl(selectedAvatarUrl);
    setIsAvatarModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return <div className="pt-24 text-center">Loading settings...</div>;

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
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#e1e5ca] bg-[#fbffe2] shadow-sm transition-transform group-hover:scale-105 group-active:scale-95">
              <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <button
              className="absolute bottom-1 right-1 w-8 h-8 bg-[#2e7300] text-white rounded-full flex items-center justify-center shadow-md border-2 border-white transition-transform active:scale-95 group-hover:bg-[#1a4700]"
              title="Change Avatar"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
          </div>
        </div>

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
            onClick={handleLogout}
            className="w-full bg-error text-on-error font-headline font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#8b0000] active:shadow-[0_0px_0_0_#8b0000] active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">logout</span>
            SIGN OUT
          </button>
          <p className="text-center mt-6 text-on-surface-variant/60 font-bold text-sm">JS Mastery Version 4.2.0</p>
        </div>
      </main>

      {/* Avatar Selection Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1c18]/40 backdrop-blur-sm transition-opacity">
          <div className="bg-surface-container rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#e1e5ca] flex items-center justify-between bg-[#fbffe2]">
              <h3 className="font-headline font-bold text-xl text-primary">Change Avatar</h3>
              <button onClick={handleCloseModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-error hover:bg-error-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {/* Upload Slot */}
                <label className={`aspect-square rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  uploadPreview || selectedAvatarUrl === uploadPreview
                    ? 'border-primary bg-primary-container/20' 
                    : 'border-[#b2bf85] hover:border-primary bg-surface-container-highest/50 hover:bg-surface-container-highest'
                } ${selectedAvatarUrl === uploadPreview && uploadPreview ? 'border-[#2e7300] scale-110 shadow-lg border-solid' : ''}`}>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  {uploadPreview ? (
                    <img src={uploadPreview} alt="Upload Preview" className="w-full h-full object-cover rounded-full" onClick={(e) => { e.preventDefault(); setSelectedAvatarUrl(uploadPreview); }} />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[#b2bf85] text-2xl mb-1">add_photo_alternate</span>
                      <span className="text-[10px] font-bold text-[#b2bf85] uppercase tracking-wider">Upload</span>
                    </>
                  )}
                </label>

                {/* Preset Avatars */}
                {AVATAR_OPTIONS.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAvatarUrl(url)}
                    className={`aspect-square rounded-full overflow-hidden border-4 transition-all ${
                      selectedAvatarUrl === url ? 'border-[#2e7300] scale-110 shadow-lg' : 'border-transparent hover:border-[#e1e5ca] hover:scale-105'
                    }`}
                  >
                    <img src={url} alt={`Avatar option ${idx + 1}`} className="w-full h-full object-cover bg-[#fbffe2]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-[#e1e5ca] bg-surface-container-highest/30 flex gap-3 justify-end items-center">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAvatar}
                className="bg-[#2e7300] text-white font-headline font-bold px-6 py-2.5 rounded-xl shadow-[0_3px_0_0_#1a4700] active:shadow-[0_0px_0_0_#1a4700] active:translate-y-1 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">check</span>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation is handled globally */}
    </div>
  );
}