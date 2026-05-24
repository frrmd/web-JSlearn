import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { LayoutProvider } from './contexts/LayoutContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Path from './pages/Path';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import BottomNav from './components/BottomNav';
import Quiz from './pages/Quiz';
import AdminUsers from './pages/AdminUsers';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import TopicDetail from './pages/TopicDetail';
import MaterialContent from './pages/MaterialContent';
import AdminDashboard from './pages/AdminDashboard';
import VerifyOtp from './pages/VerifyOtp';
import ForgotPassword from './pages/ForgotPassword';

// Protected Route Component
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#fbffe2]">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/home'} replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  // BottomNav tidak akan muncul di Landing Page ('/'), Quiz ('/quiz'), Topic ('/topic'), Login ('/login'), dan rute admin
  const hideBottomNav = location.pathname === '/' || 
                        location.pathname.includes('/quiz') || 
                        location.pathname.includes('/topic') || 
                        location.pathname === '/login' || 
                        location.pathname === '/register' || 
                        location.pathname === '/verify-otp' || 
                        location.pathname === '/forgot-password' || 
                        location.pathname === '/settings' || 
                        location.pathname.startsWith('/admin');

  // Automatic redirect for logged in users on landing/login/register
  if (user && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/home'} replace />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Student Routes */}
        <Route path="/home" element={<ProtectedRoute role="student"><Home /></ProtectedRoute>} />
        <Route path="/path" element={<ProtectedRoute role="student"><Path /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute role="student"><Leaderboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute role="student"><Quiz /></ProtectedRoute>} />
        <Route path="/topic/:topicId/quiz/:quizId" element={<ProtectedRoute role="student"><Quiz /></ProtectedRoute>} />
        <Route path="/topic/:topicId" element={<ProtectedRoute role="student"><TopicDetail /></ProtectedRoute>} />
        <Route path="/topic/:topicId/material/:materialId" element={<ProtectedRoute role="student"><MaterialContent /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideBottomNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <AppContent />
      </LayoutProvider>
    </BrowserRouter>
  );
}