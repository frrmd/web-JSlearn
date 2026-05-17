import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import TopAppBar from '../components/TopAppBar';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [globalRank, setGlobalRank] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [topicsProgress, setTopicsProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfileData = async () => {
      try {
        const [leaderboardRes, achievementsRes, topicsRes, progressRes] = await Promise.all([
          api.get('/leaderboard'),
          api.get('/achievements'),
          api.get('/topics'),
          api.get('/progress/topics')
        ]);

        // Rank
        const leaderboard = leaderboardRes.data.data;
        const myRank = leaderboard.find(u => u.id === user.id)?.rank;
        setGlobalRank(myRank);

        // Achievements
        setAchievements(achievementsRes.data.data.filter(a => a.is_unlocked));

        // Topics with real progress from backend
        const progressData = progressRes.data.data;
        const coursesProgress = topicsRes.data.data.map(topic => {
          const prog = progressData.find(p => p.topic_id === topic.id);
          return {
            ...topic,
            progressPct: prog ? prog.progress_pct : 0
          };
        });
        setTopicsProgress(coursesProgress);

      } catch (error) {
        console.error('Failed to fetch profile data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  if (!user || loading) {
    return <div className="pt-24 text-center">Loading profile...</div>;
  }

  const recentAchievements = achievements.slice(-3).reverse();

  return (
    <div className="bg-background font-body text-on-background min-h-screen pb-32" data-mode="connect">

      <TopAppBar />

      <main className="pt-24 px-6 max-w-4xl mx-auto space-y-10">

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 bg-surface-container rounded-lg p-8 flex flex-col md:flex-row items-center gap-8 chunky-card relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-container rounded-full opacity-30"></div>
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-primary overflow-hidden bg-surface-container-lowest">
                <img alt="User Avatar" className="w-full h-full object-cover" src={user.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'} />
              </div>
              <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-4 border-surface-container">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-headline font-black text-4xl text-on-surface mb-1">@{user.username}</h2>
              {user.bio && <p className="text-on-surface-variant font-medium text-base mb-1">{user.bio}</p>}
              <p className="text-on-surface-variant/60 text-sm mb-6">{user.name}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button
                  onClick={() => navigate('/settings')}
                  className="bg-surface-container-highest text-on-surface-variant px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:brightness-95 transition-all"
                >
                  <span className="material-symbols-outlined align-middle mr-1">settings</span>
                  Settings
                </button>
              </div>
            </div>
          </div>


          <div className="md:col-span-1 bg-tertiary-container rounded-lg p-8 chunky-card flex flex-col justify-between text-on-tertiary-container">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/30 p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <div>
                  <p className="font-headline font-black text-3xl">{user.total_xp.toLocaleString()}</p>
                  <p className="font-medium opacity-80">Total XP</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/30 p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <div>
                  <p className="font-headline font-black text-3xl">#{globalRank ?? '—'}</p>
                  <p className="font-medium opacity-80">Global Rank</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/30 p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                </div>
                <div>
                  <p className="font-headline font-black text-3xl">{achievements.length}</p>
                  <p className="font-medium opacity-80">Achievements</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-headline font-black text-2xl text-on-background">Latest Achievements</h3>
          </div>

          {recentAchievements.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {recentAchievements.map((ach) => (
                <div key={ach.id} className="bg-surface-container-lowest p-6 rounded-lg text-center space-y-4 chunky-card border-2 border-primary/5 relative">
                  <div className={`w-20 h-20 mx-auto bg-primary-container rounded-full flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-4xl text-primary`} style={{ fontVariationSettings: "'FILL' 1" }}>{ach.icon_url || 'emoji_events'}</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg">{ach.title}</h4>
                    <p className="text-sm text-on-surface-variant">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-8 rounded-lg text-center chunky-card border-2 border-primary/5">
              <div className="w-16 h-16 mx-auto bg-surface-variant rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              </div>
              <h4 className="font-headline font-bold text-lg mb-2">No Achievements Yet</h4>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto">Keep learning and complete lessons to start unlocking your achievements!</p>
            </div>
          )}
        </section>


        <section className="bg-surface-container rounded-lg p-8 chunky-card">
          <h3 className="font-headline font-black text-2xl text-on-background mb-6">Learning Topics</h3>
          <div className="space-y-6">
            {topicsProgress.slice(0, 3).map(topic => (
              <div key={topic.id} className="space-y-2">
                <div className="flex justify-between items-center font-headline font-bold">
                  <span>{topic.title}</span>
                  <div className="flex items-center gap-3">
                    {topic.progressPct === 100 && (
                      <span className="bg-[#e8f5e9] text-[#1b5e20] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest border border-[#4caf50]/30">Completed</span>
                    )}
                    {topic.progressPct > 0 && topic.progressPct < 100 && (
                      <span className="bg-surface-variant text-on-surface-variant text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest">In Progress</span>
                    )}
                    <span>{topic.progressPct}%</span>
                  </div>
                </div>
                <div className="h-4 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className={`h-full bg-primary rounded-full transition-all duration-500`} style={{ width: `${topic.progressPct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Admin specific actions */}
        {user.role === 'admin' && (
          <div className="mt-8 max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/admin/users')}
              className="w-full bg-white p-4 rounded-xl border-2 border-[#2e7300]/20 flex items-center justify-between hover:border-[#2e7300] hover:bg-[#f3ffca] transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#2e7300] text-white rounded-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">admin_panel_settings</span>
                </div>
                <div className="text-left text-[#313c0f]">
                  <p className="font-bold">User Management</p>
                  <p className="text-xs text-gray-500">Admin access to manage users</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#2e7300]">chevron_right</span>
            </button>
          </div>
        )}

      </main>
    </div>
  );
}