import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import TopAppBar from '../components/TopAppBar';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [leaderboard, setLeaderboard] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicsProgress, setTopicsProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHomeData = async () => {
      try {
        const [leaderboardRes, topicsRes, progressRes] = await Promise.all([
          api.get('/leaderboard'),
          api.get('/topics'),
          api.get('/progress/topics')
        ]);

        setLeaderboard(leaderboardRes.data.data);
        setTopics(topicsRes.data.data);
        setTopicsProgress(progressRes.data.data);
      } catch (error) {
        console.error('Failed to fetch home data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [user]);

  if (!user || loading) {
    return <div className="pt-24 text-center">Loading dashboard...</div>;
  }

  // Calculate Rank and XP Gap
  const myEntry = leaderboard.find(u => u.id === user.id);
  const globalRank = myEntry ? myEntry.rank : null;
  const userAbove = globalRank && globalRank > 1 ? leaderboard[globalRank - 2] : null;
  
  const xpGap = userAbove ? userAbove.total_xp - user.total_xp : 0;
  const xpGapProgress = userAbove && userAbove.total_xp > 0
    ? Math.min(100, Math.round((user.total_xp / userAbove.total_xp) * 100))
    : 100;

  // Map topics with real progress from backend
  const coursesWithProgress = topics.map(topic => {
    const prog = topicsProgress.find(p => p.topic_id === topic.id);
    return {
      ...topic,
      progress: prog ? prog.progress_pct : 0,
      last_accessed_at: prog ? prog.last_accessed_at : null,
      colorTheme: 'primary',
      icon: 'terminal'
    };
  });

  // Continue Learning: pick the most recently accessed incomplete topic, fallback to first incomplete topic
  const inProgressTopics = coursesWithProgress.filter(t => t.progress < 100);
  const continueTopic = inProgressTopics.length > 0
    ? inProgressTopics.reduce((latest, t) => {
        if (!latest.last_accessed_at) return t;
        if (!t.last_accessed_at) return latest;
        return new Date(t.last_accessed_at) > new Date(latest.last_accessed_at) ? t : latest;
      }, inProgressTopics[0])
    : null;

  // Recent Topics: sort by last_accessed_at descending, fallback to original order
  const recentTopics = [...coursesWithProgress].sort((a, b) => {
    if (!a.last_accessed_at && !b.last_accessed_at) return 0;
    if (!a.last_accessed_at) return 1;
    if (!b.last_accessed_at) return -1;
    return new Date(b.last_accessed_at) - new Date(a.last_accessed_at);
  }).slice(0, 4);

  return (

    <div className="bg-background font-body text-on-background min-h-screen pb-32">
      <TopAppBar />

      <main className="pt-24 px-6 space-y-8">

        <section className="relative group">
          <div className="absolute -inset-1 bg-primary-dim rounded-lg transform translate-y-2 opacity-20"></div>
          <div className="relative bg-surface-container rounded-lg p-6 overflow-hidden flex flex-col md:flex-row items-center gap-6 border-b-4 border-outline-variant/30">
            {continueTopic ? (
              <>
                <div className="flex-1 space-y-4 z-10">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block px-3 py-1 bg-${continueTopic.colorTheme}/10 text-${continueTopic.colorTheme} text-xs font-bold rounded-full uppercase tracking-widest font-headline`}>
                      Unit: {continueTopic.title}
                    </span>
                    <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-bold rounded-full uppercase tracking-widest font-headline flex items-center gap-1">
                      {continueTopic.progress > 0 ? (
                        <><span className="material-symbols-outlined text-[14px]">trending_up</span> {continueTopic.progress}% Complete</>
                      ) : (
                        <><span className="material-symbols-outlined text-[14px]">pending</span> Pending</>
                      )}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold text-primary uppercase tracking-wider">{continueTopic.title}</p>
                    <p className="text-sm text-on-surface-variant mb-2">{continueTopic.description || `Overview of ${continueTopic.title}`}</p>
                    <h3 className="text-3xl font-black font-headline leading-tight">
                      Learn {continueTopic.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => navigate(`/topic/${continueTopic.slug}`)}
                    className="relative mt-4 group"
                  >
                    <div className="absolute inset-0 bg-primary-dim rounded-xl translate-y-1"></div>
                    <div className="relative bg-primary text-white font-black font-headline px-10 py-4 rounded-xl active:translate-y-1 transition-transform flex items-center gap-2">
                      START LEARNING
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                  </button>
                </div>

                <div className={`relative w-40 h-40 bg-${continueTopic.colorTheme}-container rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                  <span className={`material-symbols-outlined text-6xl text-${continueTopic.colorTheme}`} style={{ fontVariationSettings: "'FILL' 1" }}>{continueTopic.icon}</span>
                  <div className="absolute -top-4 -right-2 bg-secondary text-white p-3 rounded-2xl shadow-lg -rotate-12">
                    <span className="material-symbols-outlined">auto_awesome</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 text-center flex flex-col items-center justify-center space-y-4 py-8 z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[#e8f5e9] text-[#1b5e20] rounded-full mb-2 border-4 border-[#4caf50]/30 shadow-sm">
                  <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                </div>
                <h3 className="text-4xl font-black font-headline leading-tight">🎉 Already Mastered JSLearn!</h3>
                <p className="text-lg text-on-surface-variant leading-relaxed max-w-md mx-auto">
                  You've completed all available learning content.
                </p>
                <p className="text-sm font-bold text-tertiary uppercase tracking-widest">Coming soon for next topic.</p>
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* XP vs Next Competitor Card */}
          <div className="md:col-span-2 bg-surface-container-low p-6 rounded-lg flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-headline font-extrabold text-lg">Leaderboard Progress</h4>
                {userAbove ? (
                  <p className="text-sm text-on-surface-variant mt-1">
                    You need <strong className="text-primary">{xpGap.toLocaleString()} XP</strong> to overtake <strong>@{userAbove.username}</strong>
                  </p>
                ) : (
                  <p className="text-sm text-on-surface-variant mt-1">🏆 You're at the top of the leaderboard!</p>
                )}
              </div>
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold font-headline">
                <span>Your XP</span>
                <span>{user.total_xp.toLocaleString()} {userAbove ? `/ ${userAbove.total_xp.toLocaleString()}` : ''} XP</span>
              </div>
              <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${xpGapProgress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Global Rank Card */}
          <div className="bg-surface-container-highest p-6 rounded-lg flex flex-col items-center justify-center text-center gap-2 border-b-4 border-on-surface-variant/10">
            <span className="material-symbols-outlined text-tertiary text-3xl">workspace_premium</span>
            <p className="text-xs font-bold font-headline uppercase text-on-surface-variant tracking-widest">Global Rank</p>
            <p className="text-3xl font-black font-headline">#{globalRank ?? '—'}</p>
          </div>
        </section>


        <section className="space-y-4">
          <h4 className="font-headline font-extrabold text-lg flex items-center gap-2 px-2">
            Course Topics
            <span className="h-px flex-1 bg-surface-container-high"></span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentTopics.map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/topic/${course.slug}`)}
                className="cursor-pointer bg-surface-container-highest p-4 rounded-lg flex flex-col items-center gap-3 text-center border-b-4 border-on-surface-variant/10 hover:bg-surface-variant transition-colors group"
              >
                <div className={`w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined text-2xl text-primary`} style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                </div>
                <span className="text-sm font-bold font-headline">{course.title}</span>
              </div>
            ))}
          </div>
        </section>

      </main>

      <div className="fixed bottom-28 right-6 md:hidden">
        <button className="w-16 h-16 bg-primary text-white rounded-full shadow-lg flex items-center justify-center border-b-4 border-primary-dim active:translate-y-1 active:border-b-0 transition-all">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
        </button>
      </div>

    </div>
  );
}