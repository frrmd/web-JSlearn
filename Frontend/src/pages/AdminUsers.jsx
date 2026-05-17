import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import AdminTopbar from '../components/AdminTopbar';

export default function AdminUsers() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null = add mode
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Form state
  const emptyForm = { name: '', username: '', email: '', password: '', role: 'student', avatar_url: '' };
  const [formData, setFormData] = useState(emptyForm);

  // Fetch users
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

  useEffect(() => { fetchUsers(); }, []);

  // Open modal for Add
  const openAddModal = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setFormErrors({});
    setShowModal(true);
  };

  // Open modal for Edit
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      password: '',
      role: user.role || 'student',
      avatar_url: user.avatar_url || '',
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData(emptyForm);
    setFormErrors({});
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Client-side validation
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Nama wajib diisi';
    if (!formData.username.trim()) errors.username = 'Username wajib diisi';
    if (!formData.email.trim()) errors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Format email tidak valid';
    if (!editingUser && !formData.password) errors.password = 'Password wajib diisi';
    if (formData.password && formData.password.length < 6) errors.password = 'Password minimal 6 karakter';
    if (!formData.role) errors.role = 'Role wajib dipilih';
    return errors;
  };

  // Submit Add / Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);
    setFormErrors({});

    try {
      // Build payload — only send password if filled
      const payload = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        role: formData.role,
      };
      if (formData.avatar_url.trim()) payload.avatar_url = formData.avatar_url;
      if (formData.password) payload.password = formData.password;

      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, payload);
      } else {
        // For new user, password is required (already validated)
        await api.post('/users', payload);
      }

      closeModal();
      await fetchUsers();
    } catch (error) {
      if (error.response?.status === 422 && error.response.data?.errors) {
        // Laravel validation errors
        const serverErrors = {};
        for (const [key, messages] of Object.entries(error.response.data.errors)) {
          serverErrors[key] = messages[0];
        }
        setFormErrors(serverErrors);
      } else {
        setFormErrors({ _general: error.response?.data?.message || 'Terjadi kesalahan. Coba lagi.' });
      }
    } finally {
      setSaving(false);
    }
  };

  // Delete user
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/users/${deleteTarget.id}`);
      setDeleteTarget(null);
      await fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menghapus user.');
    } finally {
      setDeleting(false);
    }
  };

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
    return (
      <>
        <AdminTopbar />
        <div className="pt-20 p-8 bg-[#fbffe2] min-h-screen text-center text-[#313c0f]">Loading users...</div>
      </>
    );
  }

  return (
    <>
      <AdminTopbar />
      <div className="pt-20 p-8 bg-[#fbffe2] min-h-screen text-[#313c0f]">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#b2bf85]/30 text-[#2e7300] active:translate-y-[2px] transition-all hover:bg-[#e4f6a9]/50"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div>
                <h1 className="text-3xl font-black font-headline">Manajemen Users</h1>
                <p className="text-[#5d6938]">Kelola data murid JS Learner di sini.</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="bg-[#2e7300] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              <span className="material-symbols-outlined">add</span>
              Tambah User
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#b2bf85]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
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
                      <td className="p-4 border-b border-[#b2bf85]/10 font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'}
                            alt="avatar"
                            className="w-8 h-8 rounded-full border border-gray-200"
                          />
                          <div>
                            <p className="font-bold text-[#313c0f]">{user.name}</p>
                            <p className="text-xs text-[#5d6938]">@{user.username}</p>
                          </div>
                        </div>
                      </td>
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
                            onClick={() => openEditModal(user)}
                            className="p-2 text-[#006b99] bg-[#a3d8ff]/20 rounded-lg hover:bg-[#a3d8ff]/40 active:translate-y-[1px] transition-all"
                            title="Edit user"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(user)}
                            disabled={currentUser?.id === user.id}
                            className={`p-2 rounded-lg active:translate-y-[1px] transition-all ${
                              currentUser?.id === user.id
                                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                : 'text-[#be2d06] bg-[#f95630]/10 hover:bg-[#f95630]/20'
                            }`}
                            title={currentUser?.id === user.id ? 'Tidak bisa menghapus akun sendiri' : 'Hapus user'}
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
      </div>

      {/* ============= ADD / EDIT MODAL ============= */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />

          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-[#b2bf85]/30 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[fadeInUp_0.2s_ease-out]">
            <div className="p-6 border-b border-[#b2bf85]/20 bg-[#e4f6a9]/30 rounded-t-2xl">
              <h2 className="text-xl font-bold font-headline text-[#2e7300] flex items-center gap-2">
                <span className="material-symbols-outlined">{editingUser ? 'edit' : 'person_add'}</span>
                {editingUser ? 'Edit User' : 'Tambah User Baru'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* General error */}
              {formErrors._general && (
                <div className="p-3 rounded-xl bg-[#f95630]/10 text-[#be2d06] text-sm font-medium">
                  {formErrors._general}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-[#313c0f] mb-1">Nama <span className="text-[#be2d06]">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fbffe2]/50 text-[#313c0f] font-medium focus:outline-none focus:border-[#2e7300] transition-colors ${formErrors.name ? 'border-[#f95630]' : 'border-[#b2bf85]/30'}`}
                  placeholder="Masukkan nama lengkap"
                />
                {formErrors.name && <p className="text-xs text-[#be2d06] mt-1">{formErrors.name}</p>}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-bold text-[#313c0f] mb-1">Username <span className="text-[#be2d06]">*</span></label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fbffe2]/50 text-[#313c0f] font-medium focus:outline-none focus:border-[#2e7300] transition-colors ${formErrors.username ? 'border-[#f95630]' : 'border-[#b2bf85]/30'}`}
                  placeholder="Masukkan username"
                />
                {formErrors.username && <p className="text-xs text-[#be2d06] mt-1">{formErrors.username}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-[#313c0f] mb-1">Email <span className="text-[#be2d06]">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fbffe2]/50 text-[#313c0f] font-medium focus:outline-none focus:border-[#2e7300] transition-colors ${formErrors.email ? 'border-[#f95630]' : 'border-[#b2bf85]/30'}`}
                  placeholder="email@contoh.com"
                />
                {formErrors.email && <p className="text-xs text-[#be2d06] mt-1">{formErrors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-[#313c0f] mb-1">
                  Password {!editingUser && <span className="text-[#be2d06]">*</span>}
                  {editingUser && <span className="text-[#5d6938] font-normal text-xs ml-1">(kosongkan jika tidak diubah)</span>}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fbffe2]/50 text-[#313c0f] font-medium focus:outline-none focus:border-[#2e7300] transition-colors ${formErrors.password ? 'border-[#f95630]' : 'border-[#b2bf85]/30'}`}
                  placeholder={editingUser ? '••••••' : 'Minimal 6 karakter'}
                />
                {formErrors.password && <p className="text-xs text-[#be2d06] mt-1">{formErrors.password}</p>}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-bold text-[#313c0f] mb-1">Role <span className="text-[#be2d06]">*</span></label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fbffe2]/50 text-[#313c0f] font-medium focus:outline-none focus:border-[#2e7300] transition-colors ${formErrors.role ? 'border-[#f95630]' : 'border-[#b2bf85]/30'}`}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
                {formErrors.role && <p className="text-xs text-[#be2d06] mt-1">{formErrors.role}</p>}
              </div>

              {/* Avatar URL (optional) */}
              <div>
                <label className="block text-sm font-bold text-[#313c0f] mb-1">Avatar URL <span className="text-[#5d6938] font-normal text-xs">(opsional)</span></label>
                <input
                  type="text"
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#b2bf85]/30 bg-[#fbffe2]/50 text-[#313c0f] font-medium focus:outline-none focus:border-[#2e7300] transition-colors"
                  placeholder="https://..."
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#b2bf85]/20">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl font-bold text-[#5d6938] bg-[#e4f6a9]/50 hover:bg-[#e4f6a9] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#2e7300] hover:opacity-90 active:scale-95 transition-all shadow-[0_3px_0_0_#1e4d00] disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">{editingUser ? 'save' : 'add'}</span>
                      {editingUser ? 'Simpan Perubahan' : 'Tambah User'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============= DELETE CONFIRMATION MODAL ============= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !deleting && setDeleteTarget(null)} />

          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-[#b2bf85]/30 w-full max-w-sm animate-[fadeInUp_0.2s_ease-out]">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#f95630]/15 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl text-[#be2d06]">warning</span>
              </div>
              <h3 className="text-lg font-bold font-headline text-[#313c0f] mb-2">Hapus User?</h3>
              <p className="text-sm text-[#5d6938] mb-1">
                Kamu akan menghapus akun:
              </p>
              <p className="font-bold text-[#313c0f] mb-1">{deleteTarget.name}</p>
              <p className="text-xs text-gray-500 mb-6">{deleteTarget.email}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-xl font-bold text-[#5d6938] bg-[#e4f6a9]/50 hover:bg-[#e4f6a9] transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-[#be2d06] hover:bg-[#a52805] active:scale-95 transition-all shadow-[0_3px_0_0_#7a1d04] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Hapus
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}