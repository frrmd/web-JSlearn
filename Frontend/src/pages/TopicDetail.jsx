import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function TopicDetail() {
  const { topicId } = useParams(); // actually slug
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [progress, setProgress] = useState({ completed_material_ids: [], quiz_progress: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const [topicRes, progressRes] = await Promise.all([
          api.get(`/topics/${topicId}`),
          api.get(`/progress/topic/${topicId}`)
        ]);

        setTopic(topicRes.data.data);
        setProgress(progressRes.data.data);
      } catch (error) {
        console.error('Failed to fetch topic detail', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopicData();
  }, [topicId]);

  if (loading || !topic) {
    return <div className="pt-24 text-center font-body text-on-background">Loading topic details...</div>;
  }

  // Fallbacks for UI styling since these might not be in DB yet
  const colorTheme = 'primary';
  const icon = 'terminal';

  return (
    <div className="bg-background font-body text-on-surface min-h-screen pb-32">
      <Sidebar />

      {/* 
        [REFACTOR LAYOUT] 
        Wrapper khusus untuk margin sidebar. 
        Main content dibungkus di dalamnya agar mx-auto berfungsi sempurna rata tengah.
      */}
      <div className="md:ml-64">
        <main className="pt-12 px-6 max-w-5xl mx-auto md:px-12 space-y-10">
          <header className="mb-8 bg-surface-container-lowest p-8 rounded-3xl border-2 border-outline-variant/20 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 bg-${colorTheme}-container rounded-[2rem] flex items-center justify-center shadow-inner`}>
                <span className={`material-symbols-outlined text-5xl text-${colorTheme}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              </div>
              <div>
                <p className="text-on-surface-variant font-bold text-sm uppercase tracking-widest font-headline mb-1">Topic details</p>
                <h1 className="text-4xl font-black font-headline text-on-surface">{topic.title}</h1>
              </div>
            </div>
          </header>

          <section>
            <h2 className="text-2xl font-black font-headline mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">book</span>
              Learning Material
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.materials?.map((material) => {
                const isCompleted = progress.completed_material_ids?.includes(material.id);

                return (
                  <div
                    key={material.id}
                    onClick={() => navigate(`/topic/${topicId}/material/${material.id}`)}
                    className="cursor-pointer bg-surface-container-lowest p-6 rounded-2xl border-2 border-outline-variant/20 hover:border-primary transition-all group flex flex-col justify-between shadow-sm hover:shadow-md active:scale-[0.99]"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary/20 transition-colors shrink-0">
                        <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors pr-2">{material.title}</h3>
                          {isCompleted ? (
                            <span className="bg-[#e8f5e9] text-[#1b5e20] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 border border-[#4caf50]/30 shrink-0">
                              <span className="material-symbols-outlined text-[12px]">check_circle</span> Completed
                            </span>
                          ) : (
                            <span className="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shrink-0">
                              Start
                            </span>
                          )}
                        </div>
                        <p className="text-on-surface-variant mt-1 font-medium text-sm line-clamp-2">{material.description || 'Learn ' + material.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4 mt-auto">
                      <div className="flex gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-1 rounded-md">Theory</span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-headline mb-4 mt-12 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">quiz</span>
              Quizzes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.quizzes?.map((quiz, index) => {
                const quizProg = progress.quiz_progress?.[quiz.id];
                const isCompleted = quizProg && quizProg.best_score >= 60;

                return (
                  <div
                    key={quiz.id}
                    onClick={() => navigate(`/topic/${topicId}/quiz/${quiz.id}`)}
                    className="cursor-pointer bg-surface-container-lowest rounded-2xl p-6 border-b-4 border-primary-dim hover:bg-surface-container transition-transform hover:-translate-y-1 flex justify-between items-center group shadow-sm"
                  >
                    <div className="flex items-center gap-5">
                      <div className="bg-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black font-headline text-2xl shadow-inner">{index + 1}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{quiz.title}</h3>
                          {isCompleted ? (
                            <span className="bg-[#e8f5e9] text-[#1b5e20] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 border border-[#4caf50]/30">
                              <span className="material-symbols-outlined text-[12px]">check_circle</span>
                              Best: {quizProg.best_score}%
                            </span>
                          ) : (
                            <span className="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                              Start
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-on-surface-variant">{quiz.description || `Test your knowledge on ${topic.title}`}</p>
                      </div>
                    </div>
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-primary group-hover:text-white">play_arrow</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
