import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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


function AppContent() {
  const location = useLocation();


  // BottomNav tidak akan muncul di Landing Page ('/'), Quiz ('/quiz'), Topic ('/topic'), dan Login ('/login')
  const hideBottomNav = location.pathname === '/' || location.pathname.includes('/quiz') || location.pathname.includes('/topic') || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/settings';

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/path" element={<Path />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/topic/:topicId/quiz/:quizId" element={<Quiz />} />
        <Route path="/topic/:topicId" element={<TopicDetail />} />
        <Route path="/topic/:topicId/material/:materialId" element={<MaterialContent />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>

      {!hideBottomNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}