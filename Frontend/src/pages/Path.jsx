import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TopAppBar from '../components/TopAppBar';

export default function Path() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [topicsProgress, setTopicsProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const [topicsRes, progressRes] = await Promise.all([
          api.get('/topics'),
          api.get('/progress/topics')
        ]);
        setTopics(topicsRes.data.data);
        setTopicsProgress(progressRes.data.data);
      } catch (error) {
        console.error('Failed to fetch topics', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  if (loading) {
    return <div className="pt-24 text-center font-body text-on-background">Loading paths...</div>;
  }

  // Map topics with real progress from backend
  const coursesWithProgress = topics.map(topic => {
    const prog = topicsProgress.find(p => p.topic_id === topic.id);
    return {
      ...topic,
      progress: prog ? prog.progress_pct : 0,
      colorTheme: 'primary',
      icon: 'terminal',
      isLocked: false
    };
  });

  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-32">
      <TopAppBar />

      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Hero Selection Intro */}
        <section className="mb-10 mt-4">
          <h2 className="font-headline text-3xl font-extrabold text-on-background tracking-tight mb-2">Choose your path</h2>
          <p className="text-on-surface-variant max-w-md">Master JavaScript through focused interactive challenges. Each path unlocks new techniques.</p>
        </section>

        {/* Bento Grid of Learning Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesWithProgress.map(course => (
            course.isLocked ? (
              <div key={course.id} className="relative bg-surface-dim opacity-70 rounded-lg p-6 flex flex-col justify-between h-64 grayscale cursor-not-allowed">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-white/40 backdrop-blur-md px-6 py-3 rounded-full border-2 border-on-surface-variant/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface text-2xl filled-icon" data-icon="lock" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <span className="font-headline font-bold text-on-surface uppercase tracking-widest">Locked</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="bg-outline-variant/30 p-4 rounded-2xl">
                    <span className="material-symbols-outlined text-on-surface-variant text-4xl" data-icon={course.icon}>{course.icon}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-2xl mb-2">{course.title}</h3>
                  <p className="text-sm font-bold text-on-surface-variant">Complete previous topics to unlock</p>
                </div>
              </div>
            ) : (
              <div 
                key={course.id} 
                onClick={() => navigate('/topic/' + course.slug)}
                className={`group relative bg-surface-container rounded-lg p-6 flex flex-col justify-between h-64 border-b-4 border-${course.colorTheme}-dim hover:bg-surface-container-high transition-transform hover:-translate-y-1 cursor-pointer shadow-sm hover:shadow-md`}
              >
                <div className="flex justify-between items-start">
                  <div className={`bg-${course.colorTheme}-container p-4 rounded-2xl`}>
                    <span className={`material-symbols-outlined text-on-${course.colorTheme}-container text-4xl`} data-icon={course.icon}>{course.icon}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-headline font-black text-2xl text-${course.colorTheme}`}>{course.progress}%</span>
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Complete</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-2xl mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <div className="w-full bg-outline-variant/30 h-3 rounded-full overflow-hidden">
                    <div className={`bg-${course.colorTheme} h-full rounded-full`} style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

      </main>
    </div>
  );
}