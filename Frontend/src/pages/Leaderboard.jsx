import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import TopAppBar from '../components/TopAppBar';

export default function Leaderboard() {
  const { user } = useAuth();
  // Tab state
  const [activeTab, setActiveTab] = useState('all');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('/leaderboard');
        setLeaderboard(response.data.data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="pt-24 text-center">Loading leaderboard...</div>;
  }

  // Display data based on active tab (currently API only has all-time, so we'll mock weekly by slicing if needed, but for now we'll just show all)
  const displayLeaderboard = activeTab === 'weekly' ? leaderboard.slice(0, 5) : leaderboard;

  // Top 3 users
  const topUsers = displayLeaderboard.slice(0, 3);
  // Remaining users
  const remainingUsers = displayLeaderboard.slice(3);

  // Current user entry
  const currentUserEntry = user ? leaderboard.find(u => u.id === user.id) : null;

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen pb-32">
      
      <TopAppBar />

      <main className="pt-24 pb-32 px-4 max-w-2xl mx-auto min-h-screen">
       
        <div className="mb-10 text-center">
          <h2 className="font-headline text-4xl font-extrabold text-on-background tracking-tight mb-6">Leaderboard</h2>
        </div>

       
        <div className="grid grid-cols-3 gap-4 items-end mb-12 relative px-2">
          {/* Rank 2 */}
          {topUsers[1] && (
            <div className="flex flex-col items-center">
              <div className="relative mb-3 group">
                <div className="absolute -top-4 -right-2 bg-[#C0C0C0] text-white rounded-full w-8 h-8 flex items-center justify-center font-black border-4 border-background z-10">2</div>
                <img className="w-20 h-20 rounded-3xl object-cover border-4 border-surface-container shadow-xl rotate-[-3deg] group-hover:rotate-0 transition-transform bg-surface-variant" alt="User avatar" src={topUsers[1].avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'} onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'; }} />
              </div>
              <p className="font-headline font-bold text-on-surface text-sm">@{topUsers[1].username}</p>
              <p className="text-secondary font-bold text-xs uppercase tracking-tighter">{topUsers[1].total_xp.toLocaleString()} XP</p>
              <div className="h-16 w-full bg-surface-container rounded-t-2xl mt-4 flex items-end justify-center pb-2">
                <span className="material-symbols-outlined text-outline-variant opacity-30">workspace_premium</span>
              </div>
            </div>
          )}

          {/* Rank 1 */}
          {topUsers[0] && (
            <div className="flex flex-col items-center">
              <div className="relative mb-3 group scale-110">
                <div className="absolute -top-6 -right-2 bg-[#FFD700] text-on-primary-container rounded-full w-10 h-10 flex items-center justify-center font-black border-4 border-background z-10 shadow-lg">1</div>
                <img className="w-24 h-24 rounded-[2.5rem] object-cover border-4 border-primary shadow-2xl transition-transform bg-surface-variant" alt="User avatar" src={topUsers[0].avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'} onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'; }} />
              </div>
              <p className="font-headline font-extrabold text-primary text-base">@{topUsers[0].username}</p>
              <p className="text-primary-dim font-black text-sm uppercase tracking-tighter">{topUsers[0].total_xp.toLocaleString()} XP</p>
              <div className="h-24 w-full bg-primary-container/30 rounded-t-3xl mt-4 flex items-end justify-center pb-4 border-b-4 border-primary">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {topUsers[2] && (
            <div className="flex flex-col items-center">
              <div className="relative mb-3 group">
                <div className="absolute -top-4 -right-2 bg-[#CD7F32] text-white rounded-full w-8 h-8 flex items-center justify-center font-black border-4 border-background z-10">3</div>
                <img className="w-20 h-20 rounded-3xl object-cover border-4 border-surface-container shadow-xl rotate-[3deg] group-hover:rotate-0 transition-transform bg-surface-variant" alt="User avatar" src={topUsers[2].avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'} onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'; }} />
              </div>
              <p className="font-headline font-bold text-on-surface text-sm">@{topUsers[2].username}</p>
              <p className="text-tertiary font-bold text-xs uppercase tracking-tighter">{topUsers[2].total_xp.toLocaleString()} XP</p>
              <div className="h-12 w-full bg-surface-container rounded-t-2xl mt-4 flex items-end justify-center pb-1">
                <span className="material-symbols-outlined text-outline-variant opacity-30">workspace_premium</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {remainingUsers.map(u => (
            <div key={u.id} className={`flex items-center gap-4 p-4 rounded-2xl border-b-4 group hover:translate-y-[-2px] transition-transform ${user && user.id === u.id ? 'bg-primary-container/30 border-primary/20' : 'bg-surface-container-lowest border-surface-container'}`}>
              <span className="font-headline font-black text-on-surface-variant w-8">{u.rank}</span>
              <img className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 transition-transform bg-surface-variant" alt="User avatar" src={u.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`} onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`; }} />
              <div className="flex-grow">
                <h4 className="font-headline font-bold text-on-surface">
                  @{u.username}
                  {user && user.id === u.id && <span className="ml-2 text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">You</span>}
                </h4>
              </div>
              <div className="text-right">
                <span className="block font-headline font-black text-primary">{u.total_xp.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">XP</span>
              </div>
            </div>
          ))}

          {/* Spacer for floating bar */}
          <div className="h-20"></div>
        </div>

        {/* Sticky User Rank */}
        {currentUserEntry && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl z-40">
            <div className="bg-secondary text-on-secondary p-5 rounded-2xl shadow-xl flex items-center justify-between border-b-4 border-on-secondary-container/30">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center font-headline font-black text-sm">{currentUserEntry.rank}</div>
                <div>
                  <h4 className="font-headline font-bold text-sm">YOU ({currentUserEntry.username})</h4>
                  <p className="text-xs opacity-80">Rank #{currentUserEntry.rank} of {leaderboard.length} learners</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-headline font-black text-lg">{currentUserEntry.total_xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* BottomNavBar */}
      
    </div>
  );
}