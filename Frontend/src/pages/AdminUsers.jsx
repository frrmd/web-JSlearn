import React, { useState } from 'react';
import { allUsers } from '../data/mockUser';
import { useNavigate } from 'react-router-dom';

export default function AdminUsers() {
  const navigate = useNavigate();

  // React state initialized from the single data source
  const [users, setUsers] = useState(() => [...allUsers]);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', email: '', role: 'Student', xp: 0, status: 'active' });
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // --- CRUD Functions ---

  const handleOpenCreate = () => {
    setFormData({ id: null, name: '', email: '', role: 'Student', xp: 0, status: 'active' });
    setIsEditing(false);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setFormData({ ...user });
    setIsEditing(true);
    setIsFormModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update in state
      const updated = users.map(u => (u.id === formData.id ? { ...formData } : u));
      setUsers(updated);
      // Sync back to allUsers source
      const idx = allUsers.findIndex(u => u.id === formData.id);
      if (idx !== -1) Object.assign(allUsers[idx], formData);
    } else {
      // Create new user
      const newUser = { ...formData, id: Date.now(), username: formData.name.toLowerCase().replace(/\s+/g, '_'), avatarUrl: '' };
      setUsers([...users, newUser]);
      allUsers.push(newUser);
    }
    setIsFormModalOpen(false);
  };

  const handleConfirmDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    // Sync: remove from allUsers source
    const idx = allUsers.findIndex(u => u.id === userToDelete.id);
    if (idx !== -1) allUsers.splice(idx, 1);
    setIsDeleteModalOpen(false);
  };

  // Status badge styles
  const statusBadge = (status) => {
    if (status === 'active') return 'bg-[#84fb42]/20 text-[#1a4700]';
    return 'bg-[#f95630]/10 text-[#be2d06]';
  };

  const roleBadge = (role) => {
    if (role === 'Admin') return 'bg-[#a3d8ff]/30 text-[#006b99]';
    return 'bg-[#e4f6a9] text-[#245c00]';
  };

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
            onClick={handleOpenCreate}
            className="bg-[#2e7300] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
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
                  <td className="p-4 border-b border-[#b2bf85]/10 text-center font-bold font-headline">{(user.xp || 0).toLocaleString()}</td>
                  <td className="p-4 border-b border-[#b2bf85]/10 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusBadge(user.status)}`}>
                      {user.status || 'active'}
                    </span>
                  </td>
                  <td className="p-4 border-b border-[#b2bf85]/10">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleOpenEdit(user)}
                        className="p-2 text-[#006b99] bg-[#a3d8ff]/30 rounded-lg hover:bg-[#a3d8ff] transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button 
                        onClick={() => handleConfirmDelete(user)}
                        className="p-2 text-[#be2d06] bg-[#f95630]/10 rounded-lg hover:bg-[#f95630]/30 transition-colors"
                        title="Hapus"
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

        {/* Create/Update Modal */}
        {isFormModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-black mb-4">
                {isEditing ? 'Edit User' : 'Tambah User Baru'}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2e7300]"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2e7300]"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                    <select
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2e7300] bg-white"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Student">Student</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                    <select
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2e7300] bg-white"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">XP</label>
                  <input 
                    type="number"
                    min="0"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2e7300]"
                    value={formData.xp}
                    onChange={(e) => setFormData({...formData, xp: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setIsFormModalOpen(false)}
                    className="px-5 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-[#2e7300] text-white font-bold rounded-lg hover:bg-[#1a4700]"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl text-center">
              <div className="w-16 h-16 bg-[#f95630]/20 text-[#be2d06] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <h2 className="text-xl font-black mb-2">Hapus User?</h2>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus <b>{userToDelete?.name}</b>? Data yang dihapus tidak bisa dikembalikan.
              </p>
              <div className="flex justify-center gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-5 py-2 font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg w-full"
                >
                  Batal
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-5 py-2 bg-[#be2d06] text-white font-bold rounded-lg hover:bg-[#b92902] w-full"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}