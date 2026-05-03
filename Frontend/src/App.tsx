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
import ProMastery from './pages/ProMastery';
import PathDetail from './pages/PathDetail';
import Register from './pages/Register'; // Sesuaikan jika nama filenya Register.jsx atau GetStarted.jsx


function AppContent() {
  const location = useLocation();
  

  // BottomNav tidak akan muncul di Landing Page ('/'), Quiz ('/quiz'), dan Login ('/login')
          const hideBottomNav = location.pathname === '/' || location.pathname === '/quiz' || location.pathname === '/login' || location.pathname === '/pro-mastery';
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />  
        <Route path="/login" element={<Login />} />        
        <Route path="/home" element={<Home />} />       
        <Route path="/path" element={<Path />} />
        <Route path="/pro-mastery" element={<ProMastery />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/quiz" element={<Quiz />} /> 
        <Route path="/admin/users" element={<AdminUsers />} /> 
        <Route path="/path/:pathId" element={<PathDetail />} />
        <Route path="/quiz/:quizType" element={<Quiz />} />
        <Route path="/register" element={<Register />} />
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