import React from 'react';

export default function Path() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#fbffe2]/80 dark:bg-slate-900/80 backdrop-blur-xl tonal-transition bg-gradient-to-b from-[#fbffe2] to-transparent">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            
            <h1 className="text-2xl font-black text-[#2e7300] dark:text-[#58CC02] italic font-headline tracking-tight">JSlearn</h1>
          </div>
          <div className="flex items-center gap-4 bg-surface-container rounded-full px-4 py-2">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#2e7300]">5 🔥 120 XP 3 ❤️</span>
          </div>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Hero Selection Intro */}
        <section className="mb-10 mt-4">
          <h2 className="font-headline text-3xl font-extrabold text-on-background tracking-tight mb-2">Choose your path</h2>
          <p className="text-on-surface-variant max-w-md">Master JavaScript through focused interactive challenges. Each path unlocks new techniques.</p>
        </section>

        {/* Bento Grid of Learning Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category Card: JS Basics */}
          <div className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-primary-dim hover:bg-surface-container-high transition-colors cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="bg-primary-container p-4 rounded-2xl shadow-[0_4px_0_0_#245c00]">
                <span className="material-symbols-outlined text-on-primary-container text-4xl" data-icon="javascript">javascript</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-primary">85%</span>
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Complete</p>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">JS Basics</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[85%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Category Card: Loops & Arrays */}
          <div className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-secondary-dim hover:bg-surface-container-high transition-colors cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="bg-secondary-container p-4 rounded-2xl shadow-[0_4px_0_0_#004c6e]">
                <span className="material-symbols-outlined text-on-secondary-container text-4xl" data-icon="rebase_edit">rebase_edit</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-secondary">42%</span>
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Complete</p>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">Loops & Arrays</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[42%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Category Card: DOM Manipulation */}
          <div className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-tertiary-dim hover:bg-surface-container-high transition-colors cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="bg-tertiary-container p-4 rounded-2xl shadow-[0_4px_0_0_#5b018b]">
                <span className="material-symbols-outlined text-on-tertiary-container text-4xl" data-icon="web">web</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-tertiary">12%</span>
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Complete</p>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">DOM Manipulation</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full w-[12%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Locked Category Card: Async & Fetch */}
          <div className="relative bg-surface-dim opacity-70 rounded-lg p-6 flex flex-col justify-between h-64 grayscale cursor-not-allowed">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white/40 backdrop-blur-md p-4 rounded-full border-2 border-on-surface-variant/20">
                <span className="material-symbols-outlined text-on-surface text-4xl filled-icon" data-icon="lock" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="bg-outline-variant/30 p-4 rounded-2xl">
                <span className="material-symbols-outlined text-on-surface-variant text-4xl" data-icon="cloud_sync">cloud_sync</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-on-surface-variant">0%</span>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">Async & Fetch</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full"></div>
            </div>
          </div>

          {/* Locked Category Card: React Hooks */}
          <div className="relative bg-surface-dim opacity-70 rounded-lg p-6 flex flex-col justify-between h-64 grayscale cursor-not-allowed">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white/40 backdrop-blur-md p-4 rounded-full border-2 border-on-surface-variant/20">
                <span className="material-symbols-outlined text-on-surface text-4xl filled-icon" data-icon="lock" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="bg-outline-variant/30 p-4 rounded-2xl">
                <span className="material-symbols-outlined text-on-surface-variant text-4xl" data-icon="token">token</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-on-surface-variant">0%</span>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">React Hooks</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full"></div>
            </div>
          </div>

          {/* Locked Category Card: Node.js Express */}
          <div className="relative bg-surface-dim opacity-70 rounded-lg p-6 flex flex-col justify-between h-64 grayscale cursor-not-allowed">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white/40 backdrop-blur-md p-4 rounded-full border-2 border-on-surface-variant/20">
                <span className="material-symbols-outlined text-on-surface text-4xl filled-icon" data-icon="lock" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="bg-outline-variant/30 p-4 rounded-2xl">
                <span className="material-symbols-outlined text-on-surface-variant text-4xl" data-icon="storage">storage</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-on-surface-variant">0%</span>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">Node.js Express</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Asymmetric Promotional Card */}
        <section className="mt-12 bg-tertiary text-on-tertiary rounded-lg p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="relative z-10 flex-1">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-black uppercase mb-4 tracking-tighter">Pro Feature</span>
            <h3 className="font-headline text-4xl font-black leading-tight mb-4">Master Algorithms & Data Structures</h3>
            <p className="text-on-tertiary/80 text-lg mb-6">Unlock our premium intensive bootcamp and prepare for top-tier technical interviews.</p>
            <button className="bg-surface text-tertiary font-headline font-black px-8 py-4 rounded-2xl shadow-[0_6px_0_0_#d797ff] chunky-button">
              Upgrade to Mastery Pro
            </button>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <div className="w-48 h-48 bg-tertiary-fixed rounded-full flex items-center justify-center rotate-12">
              <span className="material-symbols-outlined text-on-tertiary-fixed text-8xl filled-icon" data-icon="military_tech" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            </div>
          </div>
          {/* Decorative circle */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full"></div>
        </section>
      </main>
    </div>
  );
}