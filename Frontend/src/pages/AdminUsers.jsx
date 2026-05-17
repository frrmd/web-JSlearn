import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Status badge 
  const statusBadge = (status) => {
    if (status === 'active') return 'bg-[#84fb42]/20 text-[#1a4700]';
    return 'bg-[#f95630]/10 text-[#be2d06]';
  };

  const roleBadge = (role) => {
    if (role === 'admin') return 'bg-[#a3d8ff]/30 text-[#006b99]';
    return 'bg-[#e4f6a9] text-[#245c00]';
  };

  if (loading) {
    return <div className="p-8 bg-[#fbffe2] min-h-screen text-center text-[#313c0f]">Loading users...</div>;
  }

  return (
    <div className="p-8 bg-[#fbffe2] min-h-screen text-[#313c0f]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#b2bf85]/30 text-[#2e7300] active:translate-y-[2px] transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-3xl font-black font-headline">Manajemen Users</h1>
              <p className="text-[#5d6938]">Kelola data murid JS Learner di sini.</p>
            </div>
          </div>
          <button
            className="bg-[#2e7300]/50 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 cursor-not-allowed"
            title="Tambah User belum tersedia"
          >
            <span className="material-symbols-outlined">add</span>
            Tambah User
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#b2bf85]/30 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e4f6a9] text-[#245c00]">
                <th className="p-4 font-bold border-b border-[#b2bf85]/30">Nama</th>
                <th className="p-4 font-bold border-b border-[#b2bf85]/30">Email</th>
                <th className="p-4 font-bold border-b border-[#b2bf85]/30">Role</th>
                <th className="p-4 font-bold border-b border-[#b2bf85]/30 text-center">XP</th>
                <th className="p-4 font-bold border-b border-[#b2bf85]/30 text-center">Status</th>
                <th className="p-4 font-bold border-b border-[#b2bf85]/30 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#f3ffca]/50 transition-colors">
                  <td className="p-4 border-b border-[#b2bf85]/10 font-medium">{user.name}</td>
                  <td className="p-4 border-b border-[#b2bf85]/10 text-gray-600">{user.email}</td>
                  <td className="p-4 border-b border-[#b2bf85]/10">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${roleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 border-b border-[#b2bf85]/10 text-center font-bold font-headline">{(user.total_xp || 0).toLocaleString()}</td>
                  <td className="p-4 border-b border-[#b2bf85]/10 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusBadge('active')}`}>
                      active
                    </span>
                  </td>
                  <td className="p-4 border-b border-[#b2bf85]/10">
                    <div className="flex justify-center gap-2">
                      <button
                        className="p-2 text-[#006b99]/50 bg-[#a3d8ff]/10 rounded-lg cursor-not-allowed"
                        title="Edit belum tersedia"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button
                        className="p-2 text-[#be2d06]/50 bg-[#f95630]/5 rounded-lg cursor-not-allowed"
                        title="Hapus belum tersedia"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">Belum ada data user.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}