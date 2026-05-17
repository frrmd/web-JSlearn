import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminTopbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { label: 'Users', path: '/admin/users', icon: 'group' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-[#2e7300]/10">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">

        {/* Left — Brand + Nav */}
        <div className="flex items-center gap-6">
          <h1 className="font-headline font-black text-2xl italic tracking-tight text-[#2e7300] select-none">
            JSlearn
          </h1>
          <span className="hidden sm:block w-px h-8 bg-[#2e7300]/15" />
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all
                    ${isActive
                      ? 'bg-[#2e7300] text-white shadow-[0_3px_0_0_#1e4d00]'
                      : 'text-[#5d6938] hover:bg-[#e4f6a9]/60'
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right — Admin info + Logout */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-3">
              <img
                src={user.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'}
                alt="avatar"
                className="w-9 h-9 rounded-full border-2 border-[#2e7300]/20"
              />
              <div className="text-right">
                <p className="text-sm font-bold text-[#313c0f] leading-tight">@{user.username}</p>
                <p className="text-[11px] font-semibold text-[#5d6938] uppercase tracking-wider">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[#f95630]/10 text-[#be2d06] hover:bg-[#f95630]/20 active:translate-y-[1px] transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="hidden sm:inline">{loggingOut ? 'Keluar...' : 'Logout'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
