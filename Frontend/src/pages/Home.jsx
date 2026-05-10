import { useNavigate } from 'react-router-dom';
import { mockUser, getLeaderboard, getCurrentUserRank } from '../data/mockUser';
import { mockCourses } from '../data/mockCourses';
import { calculateProgress } from '../data/userProgress';
import TopAppBar from '../components/TopAppBar';

export default function Home() {
  const navigate = useNavigate();

  // Fetch rank and leaderboard data
  const leaderboard = getLeaderboard();
  const globalRank = getCurrentUserRank();
  const userAbove = globalRank > 1 ? leaderboard[globalRank - 2] : null;
  const xpGap = userAbove ? userAbove.xp - mockUser.totalXp : 0;
  const xpGapProgress = userAbove
    ? Math.min(100, Math.round((mockUser.totalXp / userAbove.xp) * 100))
    : 100;

  // Map courses with current progress
  const coursesWithProgress = mockCourses.map(course => ({
    ...course,
    progress: calculateProgress(course.id)
  }));

  // Determine the next topic to continue
  const continueTopic = coursesWithProgress
    .filter(t => t.progress < 100)
    .sort((a, b) => b.progress - a.progress)[0];

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
                    <span className={`inline-block px-3 py-1 bg-${continueTopic.colorTheme || 'tertiary'}/10 text-${continueTopic.colorTheme || 'tertiary'} text-xs font-bold rounded-full uppercase tracking-widest font-headline`}>
                      {continueTopic.currentUnit || `Unit: ${continueTopic.title}`}
                    </span>
                    <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-bold rounded-full uppercase tracking-widest font-headline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">pending</span> In Progress
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold text-primary uppercase tracking-wider">{continueTopic.title}</p>
                    <p className="text-sm text-on-surface-variant mb-2">{continueTopic.materials?.[0]?.description || `Overview of ${continueTopic.title}`}</p>
                    <h3 className="text-3xl font-black font-headline leading-tight">
                      {continueTopic.currentLesson || `Learn ${continueTopic.title}`}
                    </h3>
                  </div>

                  <button
                    onClick={() => navigate(`/topic/${continueTopic.id}`)}
                    className="relative mt-4 group"
                  >
                    <div className="absolute inset-0 bg-primary-dim rounded-xl translate-y-1"></div>
                    <div className="relative bg-primary text-white font-black font-headline px-10 py-4 rounded-xl active:translate-y-1 transition-transform flex items-center gap-2">
                      CONTINUE LEARNING
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                  </button>
                </div>

                <div className={`relative w-40 h-40 bg-${continueTopic.colorTheme || 'primary'}-container rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                  <span className={`material-symbols-outlined text-6xl text-${continueTopic.colorTheme || 'primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{continueTopic.icon || 'terminal'}</span>
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
                <h3 className="text-4xl font-black font-headline leading-tight">🎉 All Topics Mastered</h3>
                <p className="text-lg text-on-surface-variant leading-relaxed max-w-md mx-auto">
                  You've completed all available learning content.
                </p>
                <p className="text-sm font-bold text-tertiary uppercase tracking-widest">More topics coming soon.</p>
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
                    You need <strong className="text-primary">{xpGap.toLocaleString()} XP</strong> to overtake <strong>{userAbove.name}</strong>
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
                <span>{mockUser.totalXp.toLocaleString()} {userAbove ? `/ ${userAbove.xp.toLocaleString()}` : ''} XP</span>
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
            {mockUser.recentTopics.map(topicId => {
              const course = mockCourses.find(c => c.id === topicId);
              if (!course) return null;

              return (
                <div
                  key={course.id}
                  onClick={() => navigate(`/topic/${course.id}`)}
                  className="cursor-pointer bg-surface-container-highest p-4 rounded-lg flex flex-col items-center gap-3 text-center border-b-4 border-on-surface-variant/10 hover:bg-surface-variant transition-colors group"
                >
                  <div className={`w-12 h-12 bg-${course.colorTheme}-container rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined text-2xl text-${course.colorTheme}`} style={{ fontVariationSettings: "'FILL' 1" }}>{course.icon}</span>
                  </div>
                  <span className="text-sm font-bold font-headline">{course.title}</span>
                </div>
              );
            })}
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