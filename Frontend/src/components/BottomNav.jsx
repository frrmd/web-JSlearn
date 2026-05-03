import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();


  const isActive = (path) => location.pathname === path;


  const activeStyle = "flex-1 flex flex-col items-center justify-center bg-[#2e7300] text-white rounded-2xl py-2 shadow-[0_4px_0_0_#1e4d00]";
  const inactiveStyle = "flex-1 flex flex-col items-center justify-center text-[#2e7300]/60 dark:text-[#58CC02]/60 py-2 hover:bg-[#2e7300]/5 rounded-xl";

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-[2.5rem] border-t-4 border-[#2e7300]/10 bg-[#fbffe2]/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center w-full px-2 pb-6 pt-3">

        {/* Home */}
        <Link to="/home" className={isActive('/') ? activeStyle : inactiveStyle}>
          <span className="material-symbols-outlined" style={isActive('/') ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
          <span className="text-[10px] font-extrabold mt-1">Home</span>
        </Link>

        {/* Path */}
        <Link to="/path" className={isActive('/path') ? activeStyle : inactiveStyle}>
          <span className="material-symbols-outlined" style={isActive('/path') ? { fontVariationSettings: "'FILL' 1" } : {}}>terminal</span>
          <span className="text-[10px] font-extrabold mt-1">Path</span>
        </Link>

        {/* Leaderboard */}
        <Link to="/leaderboard" className={isActive('/leaderboard') ? activeStyle : inactiveStyle}>
          <span className="material-symbols-outlined" style={isActive('/leaderboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>leaderboard</span>
          <span className="text-[10px] font-extrabold mt-1">Rank</span>
        </Link>

        {/* Profile */}
        <Link to="/profile" className={isActive('/profile') ? activeStyle : inactiveStyle}>
          <span className="material-symbols-outlined" style={isActive('/profile') ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
          <span className="text-[10px] font-extrabold mt-1">User</span>
        </Link>

      </div>
    </nav>
  );
}