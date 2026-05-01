import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Path() {
  const navigate = useNavigate();
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#fbffe2]/80 dark:bg-slate-900/80 backdrop-blur-xl tonal-transition bg-gradient-to-b from-[#fbffe2] to-transparent">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#2e7300] dark:text-[#58CC02] italic font-headline tracking-tight">JSlearn</h1>
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
          <div 
            onClick={() => navigate('/path/js-basics')} 
            className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-primary-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95"
          >
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
          <div 
            onClick={() => navigate('/path/loops-arrays')} 
            className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-secondary-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95"
          >
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
          <div 
            onClick={() => navigate('/path/dom-manipulation')} 
            className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-tertiary-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95"
          >
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

          {/* UNLOCKED Category Card: Async & Fetch */}
          <div 
            onClick={() => navigate('/path/async-fetch')}
            className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-orange-400 hover:bg-surface-container-high transition-all cursor-pointer active:scale-95"
          >
            <div className="flex justify-between items-start">
              <div className="bg-orange-100 p-4 rounded-2xl shadow-[0_4px_0_0_#c2410c]">
                <span className="material-symbols-outlined text-orange-600 text-4xl" data-icon="cloud_sync">cloud_sync</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-orange-500">0%</span>
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Complete</p>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">Async & Fetch</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[0%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* UNLOCKED Category Card: React Hooks */}
          <div 
            onClick={() => navigate('/path/react-hooks')}
            className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-cyan-400 hover:bg-surface-container-high transition-all cursor-pointer active:scale-95"
          >
            <div className="flex justify-between items-start">
              <div className="bg-cyan-100 p-4 rounded-2xl shadow-[0_4px_0_0_#0e7490]">
                <span className="material-symbols-outlined text-cyan-600 text-4xl" data-icon="token">token</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-cyan-500">0%</span>
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Complete</p>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">React Hooks</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[0%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* UNLOCKED Category Card: Node.js Express */}
          <div 
            onClick={() => navigate('/path/nodejs-express')}
            className="group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-emerald-400 hover:bg-surface-container-high transition-all cursor-pointer active:scale-95"
          >
            <div className="flex justify-between items-start">
              <div className="bg-emerald-100 p-4 rounded-2xl shadow-[0_4px_0_0_#047857]">
                <span className="material-symbols-outlined text-emerald-600 text-4xl" data-icon="storage">storage</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-emerald-500">0%</span>
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Complete</p>
              </div>
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">Node.js Express</h3>
              <div className="w-full bg-outline-variant/30 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[0%] rounded-full"></div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}