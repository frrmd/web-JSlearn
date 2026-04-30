import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing'; 
import Home from './pages/Home';
import Path from './pages/Path'; 
import Profile from './pages/Profile'; 
import Leaderboard from './pages/Leaderboard';
import BottomNav from './components/BottomNav';
import Quiz from './pages/Quiz';
import AdminUsers from './pages/AdminUsers'; 


function AppContent() {
  const location = useLocation();
  

  const hideBottomNav = location.pathname === '/' || location.pathname === '/quiz';

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />          {/* Default Route sekarang Landing */}
        <Route path="/home" element={<Home />} />         {/* Home digeser ke /home */}
        <Route path="/path" element={<Path />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} /> 
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