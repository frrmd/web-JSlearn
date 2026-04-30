import React, { useState } from 'react';

export default function AdminUsers() {
  // 1. STATE UNTUK DATA USERS (Dummy Data agar tabel tidak kosong)
  const [users, setUsers] = useState([
    { id: 1, name: 'Farras', email: 'farras1@gmail.com', role: 'Student' },
    { id: 2, name: 'harun', email: 'harun@gmail.com', role: 'Student' },
  ]);

  // 2. STATE UNTUK MODAL CREATE & UPDATE
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', email: '', role: 'Student' });
  const [isEditing, setIsEditing] = useState(false);

  // 3. STATE UNTUK MODAL DELETE CONFIRM
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // --- FUNGSI-FUNGSI CRUD ---

  // Buka modal untuk Create
  const handleOpenCreate = () => {
    setFormData({ id: null, name: '', email: '', role: 'Student' });
    setIsEditing(false);
    setIsFormModalOpen(true);
  };

  // Buka modal untuk Update
  const handleOpenEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    setIsFormModalOpen(true);
  };

  // Simpan data (Create atau Update)
  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update data
      setUsers(users.map(u => (u.id === formData.id ? formData : u)));
    } else {
      // Create data baru
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setIsFormModalOpen(false);
  };

  // Buka modal Delete
  const handleConfirmDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Eksekusi Delete
  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-8 bg-[#fbffe2] min-h-screen text-[#313c0f]">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER & TOMBOL CREATE */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black font-headline">Manajemen Users</h1>
            <p className="text-[#5d6938]">Kelola data murid JS Learner di sini.</p>
          </div>
          <button 
            onClick={handleOpenCreate}
            className="bg-[#2e7300] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Tambah User
          </button>
        </div>

        {/* 1. TABLE LIST (READ) */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#b2bf85]/30 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e4f6a9] text-[#245c00]">
                <th className="p-4 font-bold border-b border-[#b2bf85]/30">Nama</th>
                <th className="p-4 font-bold border-b border-[#b2bf85]/30">Email</th>
                <th className="p-4 font-bold border-b border-[#b2bf85]/30">Role</th>
                <th className="p-4 font-bold border-b border-[#b2bf85]/30 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#f3ffca]/50 transition-colors">
                  <td className="p-4 border-b border-[#b2bf85]/10 font-medium">{user.name}</td>
                  <td className="p-4 border-b border-[#b2bf85]/10 text-gray-600">{user.email}</td>
                  <td className="p-4 border-b border-[#b2bf85]/10">
                    <span className="bg-[#84fb42]/20 text-[#1a4700] px-3 py-1 rounded-full text-sm font-bold">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 border-b border-[#b2bf85]/10 flex justify-center gap-2">
                    {/* Tombol Update */}
                    <button 
                      onClick={() => handleOpenEdit(user)}
                      className="p-2 text-[#006b99] bg-[#a3d8ff]/30 rounded-lg hover:bg-[#a3d8ff] transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    {/* Tombol Delete */}
                    <button 
                      onClick={() => handleConfirmDelete(user)}
                      className="p-2 text-[#be2d06] bg-[#f95630]/10 rounded-lg hover:bg-[#f95630]/30 transition-colors"
                      title="Hapus"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">Belum ada data user.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 2. MODAL POP-UP CREATE & UPDATE */}
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

        {/* 3. MODAL POP-UP DELETE CONFIRM */}
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