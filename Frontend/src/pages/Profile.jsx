import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() { 
    const navigate = useNavigate();
  return (
    <div className="bg-background font-body text-on-background min-h-screen pb-32" data-mode="connect">
     
      <header className="fixed top-0 w-full z-50 bg-[#fbffe2]/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
           
            <h1 className="font-headline font-black text-[#2e7300] text-2xl italic tracking-tight">JSlearn</h1>
          </div>
          
        </div>
      </header>

      <main className="pt-24 px-6 max-w-4xl mx-auto space-y-10">
        
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-2 bg-surface-container rounded-lg p-8 flex flex-col md:flex-row items-center gap-8 chunky-card relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-container rounded-full opacity-30"></div>
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-primary overflow-hidden bg-surface-container-lowest">
                <img alt="User Avatar" className="w-full h-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaA9-ssuQo5Agw6kpzH1yk0APh4FyhOgP0SQ&s" />
              </div>
              <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-4 border-surface-container">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-headline font-black text-4xl text-on-surface mb-2">Farras M</h2>
              <p className="text-on-surface-variant font-medium text-lg mb-6">Mastering the Web, one line at a time.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button className="chunky-button-primary bg-primary text-white px-6 py-3 rounded-full font-headline font-bold transition-transform active:translate-y-1">
                  Follow Ninja
                </button>
                <button 
  onClick={() => navigate('/settings')} 
  className="bg-surface-container-highest text-on-surface-variant px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:brightness-95 transition-all"
>
  <span className="material-symbols-outlined align-middle mr-1">settings</span>
  Settings
</button>
              </div>
            </div>
          </div>

          
          <div className="md:col-span-1 bg-tertiary-container rounded-lg p-8 chunky-card flex flex-col justify-between text-on-tertiary-container">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/30 p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                </div>
                <div>
                  <p className="font-headline font-black text-3xl">5 Days</p>
                  <p className="font-medium opacity-80">Current Streak</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/30 p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <div>
                  <p className="font-headline font-black text-3xl">1,250</p>
                  <p className="font-medium opacity-80">Total XP</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/30 p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                </div>
                <div>
                  <p className="font-headline font-black text-3xl">3</p>
                  <p className="font-medium opacity-80">Badges Earned</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-headline font-black text-2xl text-on-background">Achievements</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            
           
            <div className="bg-surface-container-lowest p-6 rounded-lg text-center space-y-4 chunky-card border-2 border-primary/5">
              <div className="w-20 h-20 mx-auto bg-primary-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg">First Lesson</h4>
                <p className="text-sm text-on-surface-variant">Completed your first JS module!</p>
              </div>
            </div>

            
            <div className="bg-surface-container-lowest p-6 rounded-lg text-center space-y-4 chunky-card border-2 border-primary/5 relative">
              <div className="w-20 h-20 mx-auto bg-tertiary-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg">7-Day Streak</h4>
                <p className="text-sm text-on-surface-variant">Consistency is king. Keep going!</p>
              </div>
              <div className="absolute top-2 right-2 bg-error text-white text-[10px] px-2 py-1 rounded-full font-bold">LOCKED</div>
            </div>

            
            <div className="bg-surface-container-lowest p-6 rounded-lg text-center space-y-4 chunky-card border-2 border-primary/5">
              <div className="w-20 h-20 mx-auto bg-secondary-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg">JS Wizard</h4>
                <p className="text-sm text-on-surface-variant">Used map, filter, and reduce together.</p>
              </div>
            </div>

          </div>
        </section>

     
        <section className="bg-surface-container rounded-lg p-8 chunky-card">
          <h3 className="font-headline font-black text-2xl text-on-background mb-6">Learning Progress</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between font-headline font-bold">
                <span>Variables & Constants</span>
                <span>80%</span>
              </div>
              <div className="h-4 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between font-headline font-bold">
                <span>Functions & Scopes</span>
                <span>45%</span>
              </div>
              <div className="h-4 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between font-headline font-bold">
                <span>DOM Manipulation</span>
                <span>12%</span>
              </div>
              <div className="h-4 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </section>

                  {/* TOMBOL KHUSUS ADMIN */}
<div className="mt-8 max-w-4xl mx-auto">
  <button 
    onClick={() => navigate('/admin/users')}
    className="w-full bg-white p-4 rounded-xl border-2 border-[#2e7300]/20 flex items-center justify-between hover:border-[#2e7300] hover:bg-[#f3ffca] transition-all group shadow-sm"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-[#2e7300] text-white rounded-lg group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined">admin_panel_settings</span>
      </div>
      <div className="text-left text-[#313c0f]">
        <p className="font-bold">Manajemen Users (CRUD)</p>
        <p className="text-xs text-gray-500">Akses khusus Admin untuk mengelola murid</p>
      </div>
    </div>
    <span className="material-symbols-outlined text-[#2e7300]">chevron_right</span>
  </button>
</div>

      </main>
    </div>
  );
}