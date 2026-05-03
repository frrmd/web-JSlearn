import React from 'react';

export default function TopAppBar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fbffe2]/80 dark:bg-slate-900/80 backdrop-blur-xl tonal-transition border-b border-surface-variant/20">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <h1 className="font-['Plus_Jakarta_Sans'] font-black text-2xl italic tracking-tight text-[#2e7300] dark:text-[#58CC02]">JSlearn</h1>
        </div>
      </div>
    </header>
  );
}
