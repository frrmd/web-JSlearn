import React from 'react';
import { Link } from 'react-router-dom';
import { mockUser } from '../data/mockUser';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col p-6 bg-[#fbffe2] dark:bg-slate-950 w-64 border-r-4 border-[#2e7300]/10 dark:border-white/5 z-50 hidden md:flex">
      <div className="text-2xl font-black text-[#2e7300] dark:text-[#58CC02] mb-8 font-headline italic">JSlearn</div>
      <nav className="flex-1 flex flex-col gap-2">
        {/*home*/}
        <Link className="flex items-center gap-4 text-slate-500 dark:text-slate-400 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all hover:scale-105 active:scale-95 font-headline font-bold text-base" to="/home">
          <span className="material-symbols-outlined" data-icon="home">home</span>
          <span>Home</span>
        </Link>
        {/*path*/}
        <Link className="flex items-center gap-4 text-slate-500 dark:text-slate-400 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all hover:scale-105 active:scale-95 font-headline font-bold text-base" to="/path">
          <span className="material-symbols-outlined" data-icon="map">map</span>
          <span>Path</span>
        </Link>
        {/*leaderboard*/}
        <Link className="flex items-center gap-4 text-slate-500 dark:text-slate-400 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all hover:scale-105 active:scale-95 font-headline font-bold text-base" to="/leaderboard">
          <span className="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
          <span>Leaderboard</span>
        </Link>
        {/*profile*/}
        <Link className="flex items-center gap-4 text-slate-500 dark:text-slate-400 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all hover:scale-105 active:scale-95 font-headline font-bold text-base" to="/profile">
          <span className="material-symbols-outlined" data-icon="person">person</span>
          <span>Profile</span>
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t-2 border-surface-variant/30">
        <div className="flex items-center gap-3 mb-4">
          <img alt="User avatar" className="w-12 h-12 rounded-full border-2 border-primary" src={mockUser.avatarUrl || mockUser.avatarUrlSecondary} />
          <div>
            <div className="font-headline font-bold text-on-surface">{mockUser.username}</div>
            <div className="text-xs text-on-surface-variant">{mockUser.totalXp.toLocaleString()} XP</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
