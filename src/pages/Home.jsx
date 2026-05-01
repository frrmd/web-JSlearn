import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate(); 

  return (
    <div className="bg-background font-body text-on-background min-h-screen pb-32">
      
      <header className="fixed top-0 w-full z-50 bg-[#fbffe2]/80 dark:bg-slate-900/80 backdrop-blur-xl tonal-transition">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-on-surface">JSlearn</h1>
          </div>
        </div>
      </header>

      <main className="pt-24 px-6 space-y-8">
        
        {/* Hero Card */}
        <section className="relative group">
          <div className="absolute -inset-1 bg-primary-dim rounded-lg transform translate-y-2 opacity-20"></div>
          <div className="relative bg-surface-container rounded-lg p-6 overflow-hidden flex flex-col md:flex-row items-center gap-6 border-b-4 border-outline-variant/30">
            <div className="flex-1 space-y-4 z-10">
              <span className="inline-block px-3 py-1 bg-tertiary/10 text-tertiary text-xs font-bold rounded-full uppercase tracking-widest font-headline">Unit 4: Array Methods</span>
              <h3 className="text-3xl font-black font-headline leading-tight">Mastering the .map() Function</h3>
              <p className="text-on-surface-variant leading-relaxed">Transform data like a pro. Learn why immutable patterns are the future of JS.</p>
              
              <button 
                onClick={() => navigate('/quiz')} 
                className="relative mt-4 group"
              >
                <div className="absolute inset-0 bg-primary-dim rounded-xl translate-y-1"></div>
                <div className="relative bg-primary text-white font-black font-headline px-10 py-4 rounded-xl active:translate-y-1 transition-transform flex items-center gap-2">
                  CONTINUE LEARNING
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </button>
            </div>

            <div className="relative w-40 h-40 bg-primary-container rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <span className="material-symbols-outlined text-6xl text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              <div className="absolute -top-4 -right-2 bg-secondary text-white p-3 rounded-2xl shadow-lg -rotate-12">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Box Leaderboard XP (Desain sama seperti Daily Goal awal) */}
          <div className="bg-surface-container-low p-6 rounded-lg flex flex-col justify-between space-y-6">
            <div className="flex justify-between items-start">
              <h4 className="font-headline font-extrabold text-lg">Leaderboard Score</h4>
              <span className="material-symbols-outlined text-secondary">military_tech</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold font-headline">
                <span>Total XP</span>
                <span>1240 / 1500 XP</span>
              </div>
              <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <p className="text-sm font-medium text-on-surface-variant">260 XP lagi untuk naik ke peringkat berikutnya!</p>
          </div>

          {/* Box Rank (Disesuaikan memenuhi ruang karena Time dihapus) */}
          <div className="bg-tertiary/10 p-6 rounded-lg flex flex-col items-center justify-center text-center gap-2 border-b-4 border-tertiary/20">
            <span className="material-symbols-outlined text-tertiary text-4xl">workspace_premium</span>
            <p className="text-sm font-bold font-headline uppercase text-tertiary">Global Rank</p>
            <p className="text-4xl font-black font-headline">#12</p>
          </div>
          
        </section>

        {/* Course Topics */}
        <section className="space-y-4">
          <h4 className="font-headline font-extrabold text-lg flex items-center gap-2 px-2">
            Course Topics
            <span className="h-px flex-1 bg-surface-container-high"></span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Topic Card 1 */}
            <div className="bg-surface-container-highest p-4 rounded-lg flex flex-col items-center gap-3 text-center border-b-4 border-on-surface-variant/10 hover:bg-surface-variant transition-colors group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>variables</span>
              </div>
              <span className="text-sm font-bold font-headline">Variables</span>
            </div>
            {/* Topic Card 2 */}
            <div className="bg-surface-container-highest p-4 rounded-lg flex flex-col items-center gap-3 text-center border-b-4 border-on-surface-variant/10 hover:bg-surface-variant transition-colors group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>functions</span>
              </div>
              <span className="text-sm font-bold font-headline">Functions</span>
            </div>
            {/* Topic Card 3 */}
            <div className="bg-surface-container-highest p-4 rounded-lg flex flex-col items-center gap-3 text-center border-b-4 border-on-surface-variant/10 hover:bg-surface-variant transition-colors group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-tertiary shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>data_array</span>
              </div>
              <span className="text-sm font-bold font-headline">Arrays</span>
            </div>
            {/* Topic Card 4 */}
            <div className="bg-surface-container-highest p-4 rounded-lg flex flex-col items-center gap-3 text-center border-b-4 border-on-surface-variant/10 hover:bg-surface-variant transition-colors group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-error shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>cyclone</span>
              </div>
              <span className="text-sm font-bold font-headline">Loops</span>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 right-6 md:hidden">
        <button className="w-16 h-16 bg-primary text-white rounded-full shadow-lg flex items-center justify-center border-b-4 border-primary-dim active:translate-y-1 active:border-b-0 transition-all">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
        </button>
      </div>

    </div>
  );
}