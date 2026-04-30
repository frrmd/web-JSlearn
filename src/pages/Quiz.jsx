import React from 'react';
import { Link } from 'react-router-dom';

export default function Quiz() {
  return (
    <div className="bg-background font-body text-on-surface">
      {/* SideNavBar Shell */}
      <aside className="fixed left-0 top-0 h-full flex flex-col p-6 bg-[#fbffe2] dark:bg-slate-950 w-64 border-r-4 border-[#2e7300]/10 dark:border-white/5 z-50">
        <div className="text-2xl font-black text-[#2e7300] dark:text-[#58CC02] mb-8 font-headline">JSlearn</div>
        <nav className="flex-1 flex flex-col gap-2">
          {/* Menu Items */}
          <Link className="flex items-center gap-4 text-slate-500 dark:text-slate-400 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all hover:scale-105 active:scale-95 font-headline font-bold text-base" to="/">
            <span className="material-symbols-outlined" data-icon="home">home</span>
            <span>Home</span>
          </Link>
          <Link className="flex items-center gap-4 bg-[#2e7300]/10 text-[#2e7300] dark:text-[#58CC02] rounded-2xl p-4 border-b-4 border-[#2e7300] transition-all hover:scale-105 active:scale-95 font-headline font-bold text-base" to="/path">
            <span className="material-symbols-outlined" data-icon="map" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
            <span>Path</span>
          </Link>
          <Link className="flex items-center gap-4 text-slate-500 dark:text-slate-400 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all hover:scale-105 active:scale-95 font-headline font-bold text-base" to="/leaderboard">
            <span className="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
            <span>Leaderboard</span>
          </Link>
          <Link className="flex items-center gap-4 text-slate-500 dark:text-slate-400 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all hover:scale-105 active:scale-95 font-headline font-bold text-base" to="/profile">
            <span className="material-symbols-outlined" data-icon="person">person</span>
            <span>Profile</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t-2 border-surface-variant/30">
          <div className="flex items-center gap-3 mb-4">
            <img alt="User avatar" className="w-12 h-12 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr9V2Oz7ZFaG9XvY5qZcM10L4qlsrDAUIzWMmTqewICQ-OqviCCnaS5j_VYSvpmMt290pZihp8CW1QHJq9P-M05qPEXATXb221TJrHL_oAQPZZzpCfW-WyKj2OMK-4ih8cNVnforVUJKVUtqEnDpJ875jseC15SC9Eyer72apJMQTO2qTo1awwSilq1Sks_yzNv4Fv_tm2qKlc0MWcPS1I6aC4tibAs729HBPTybfhaIBNvnym8KvO8UypTVYzyh_Z7ua5WUyyVA" />
            <div>
              <div className="font-headline font-bold text-on-surface">JS Master</div>
              <div className="text-xs text-on-surface-variant">Level 14</div>
            </div>
          </div>
          <button className="w-full bg-primary text-on-primary font-headline font-extrabold py-3 rounded-xl border-b-4 border-primary-dim hover:translate-y-[2px] hover:border-b-2 transition-all">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* TopAppBar Shell */}
      <header className="fixed top-0 right-0 left-64 h-20 flex justify-between items-center px-8 z-40 bg-[#fbffe2]/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-2xl" data-icon="school">school</span>
          <span className="font-headline font-extrabold text-xl text-primary">JS Learner</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border-b-2 border-outline-variant/30">
            <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <span className="font-headline font-bold text-on-surface">12</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border-b-2 border-outline-variant/30">
            <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="font-headline font-bold text-on-surface">450</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border-b-2 border-outline-variant/30">
            <span className="material-symbols-outlined text-error-container" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="font-headline font-bold text-on-surface">5</span>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="ml-64 pt-24 min-h-screen p-8 flex flex-col items-center">
        {/* Progress Header */}
        <div className="w-full max-w-3xl mb-12">
          <div className="flex justify-between items-center mb-4">
            <Link to="/path" className="p-2 hover:bg-surface-container rounded-full transition-colors inline-flex">
              <span className="material-symbols-outlined text-on-surface-variant">close</span>
            </Link>
            <div className="flex-1 mx-6 h-4 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary w-2/3 rounded-full border-r-4 border-primary-dim/30"></div>
            </div>
            <div className="font-headline font-bold text-on-surface-variant">6 / 10</div>
          </div>
        </div>

        {/* Question Section */}
        <section className="w-full max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-surface-container rounded-lg p-8 mb-8 border-b-4 border-surface-container-highest">
            <h1 className="font-headline text-3xl font-extrabold text-on-surface leading-tight text-center">
              What is the output of <br/>
              <span className="bg-inverse-surface text-inverse-primary px-3 py-1 rounded-md font-mono text-2xl mt-4 inline-block">console.log(typeof [])?</span>
            </h1>
          </div>

          {/* Answer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="group relative flex items-center gap-6 p-6 bg-surface-container-lowest border-2 border-outline-variant/20 rounded-lg text-left transition-all hover:border-primary hover:bg-surface-container hover:scale-[1.02] active:scale-[0.98] chunky-shadow">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container font-headline font-black text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">1</div>
              <span className="font-headline font-bold text-xl text-on-surface">"Object"</span>
            </button>
            <button className="group relative flex items-center gap-6 p-6 bg-surface-container-low border-4 border-primary rounded-lg text-left transition-all hover:scale-[1.02] active:scale-[0.98] active-chunky-shadow">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary font-headline font-black text-on-primary">2</div>
              <span className="font-headline font-bold text-xl text-on-surface">"Array"</span>
            </button>
            <button className="group relative flex items-center gap-6 p-6 bg-surface-container-lowest border-2 border-outline-variant/20 rounded-lg text-left transition-all hover:border-primary hover:bg-surface-container hover:scale-[1.02] active:scale-[0.98] chunky-shadow">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container font-headline font-black text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">3</div>
              <span className="font-headline font-bold text-xl text-on-surface">"String"</span>
            </button>
            <button className="group relative flex items-center gap-6 p-6 bg-surface-container-lowest border-2 border-outline-variant/20 rounded-lg text-left transition-all hover:border-primary hover:bg-surface-container hover:scale-[1.02] active:scale-[0.98] chunky-shadow">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container font-headline font-black text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">4</div>
              <span className="font-headline font-bold text-xl text-on-surface">"Undefined"</span>
            </button>
          </div>
        </section>

        {/* Tip Card */}
        <section className="w-full max-w-3xl">
          <div className="bg-secondary-container rounded-lg p-1 overflow-hidden secondary-chunky-shadow">
            <div className="bg-surface-container-lowest p-8 flex flex-col md:flex-row gap-8 items-center rounded-[calc(1rem-4px)]">
              <div className="flex-shrink-0 w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-headline font-extrabold text-secondary text-2xl mb-2">Did you know?</h3>
                <p className="text-on-surface-variant font-medium leading-relaxed">
                  In JavaScript, arrays are technically a specialized type of <strong className="text-secondary">Object</strong>. To specifically check if something is an array, you should use <code className="bg-surface-container px-2 py-0.5 rounded">Array.isArray()</code> instead of the <code className="bg-surface-container px-2 py-0.5 rounded">typeof</code> operator!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <footer className="w-full max-w-3xl mt-12 flex justify-between items-center mb-10">
          <button className="px-8 py-4 font-headline font-extrabold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined" data-icon="skip_next">skip_next</span>
            Skip Question
          </button>
          <button className="px-12 py-5 bg-primary text-on-primary font-headline font-black text-xl rounded-lg border-b-4 border-primary-dim hover:translate-y-1 hover:border-b-0 transition-all shadow-xl shadow-primary/20">
            CHECK ANSWER
          </button>
        </footer>
      </main>

      {/* Side Decoration */}
      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed top-40 -right-10 w-40 h-40 bg-tertiary/5 rounded-full blur-2xl -z-10"></div>
    </div>
  );
}