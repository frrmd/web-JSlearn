import React, { useState, useMemo } from 'react';
import { allUsers } from '../data/mockUser';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users] = useState(() => [...allUsers]);

  // Kalkulasi Statistik
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const totalAdmins = users.filter(u => u.role === 'Admin').length;
    const activeStudents = users.filter(u => u.role === 'Student' && u.status === 'active').length;
    const totalXP = users.reduce((sum, u) => sum + (u.xp || 0), 0);

    return { totalUsers, totalAdmins, activeStudents, totalXP };
  }, [users]);

  // Kalkulasi Top 5 Students
  const topStudents = useMemo(() => {
    return [...users]
      .filter(u => u.role === 'Student')
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 5);
  }, [users]);

  return (
    <div className="p-8 bg-[#fbffe2] min-h-screen text-[#313c0f] pb-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black font-headline">Dashboard Admin</h1>
            <p className="text-[#5d6938]">Ringkasan aktivitas dan data JS Learner.</p>
          </div>
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-[#2e7300] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            <span className="material-symbols-outlined">manage_accounts</span>
            Manajemen User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Pengguna" value={stats.totalUsers} icon="group" color="bg-[#e4f6a9]" textColor="text-[#245c00]" />
          <StatCard title="Siswa Aktif" value={stats.activeStudents} icon="school" color="bg-[#84fb42]/30" textColor="text-[#1a4700]" />
          <StatCard title="Total Admin" value={stats.totalAdmins} icon="admin_panel_settings" color="bg-[#a3d8ff]/40" textColor="text-[#006b99]" />
          <StatCard title="Total XP Platform" value={stats.totalXP.toLocaleString()} icon="local_fire_department" color="bg-[#f95630]/20" textColor="text-[#be2d06]" />
        </div>

        {/* Top 5 Leaderboard Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#b2bf85]/30 overflow-hidden">
          <div className="p-6 border-b border-[#b2bf85]/30 bg-[#e4f6a9]/30 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#2e7300] flex items-center gap-2">
              <span className="material-symbols-outlined">military_tech</span>
              Top 5 Siswa Berprestasi
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-sm">
                  <th className="p-4 font-semibold border-b border-[#b2bf85]/20">Peringkat</th>
                  <th className="p-4 font-semibold border-b border-[#b2bf85]/20">Nama</th>
                  <th className="p-4 font-semibold border-b border-[#b2bf85]/20">Email</th>
                  <th className="p-4 font-semibold border-b border-[#b2bf85]/20 text-right">XP</th>
                </tr>
              </thead>
              <tbody>
                {topStudents.map((user, index) => (
                  <tr key={user.id} className="hover:bg-[#f3ffca]/30 transition-colors">
                    <td className="p-4 border-b border-[#b2bf85]/10 font-bold text-center w-16">
                      #{index + 1}
                    </td>
                    <td className="p-4 border-b border-[#b2bf85]/10 font-medium">
                      <div className="flex items-center gap-3">
                        <img src={user.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full border border-gray-200" />
                        {user.name}
                      </div>
                    </td>
                    <td className="p-4 border-b border-[#b2bf85]/10 text-gray-500 text-sm">{user.email}</td>
                    <td className="p-4 border-b border-[#b2bf85]/10 text-right font-bold text-[#2e7300] font-headline">
                      {user.xp.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, textColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#b2bf85]/30 flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} ${textColor}`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-black font-headline text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
