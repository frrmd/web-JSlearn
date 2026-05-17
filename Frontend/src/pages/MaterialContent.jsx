import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function MaterialContent() {
  const { topicId, materialId } = useParams(); // topicId is slug here
  const navigate = useNavigate();

  const [material, setMaterial] = useState(null);
  const [topic, setTopic] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const [materialRes, progressRes] = await Promise.all([
          api.get(`/topics/${topicId}/materials/${materialId}`),
          api.get(`/progress/topic/${topicId}`)
        ]);

        // In a real app we might fetch the topic separately, or just use the slug.
        // The material endpoint returns the material object. Let's set it.
        setMaterial(materialRes.data.data);
        
        // We set topic as just a placeholder for the breadcrumb/title
        setTopic({ title: topicId, slug: topicId });

        // Check if material is completed
        const completedIds = progressRes.data.data.completed_material_ids || [];
        setIsCompleted(completedIds.includes(parseInt(materialId)));
      } catch (error) {
        console.error('Failed to fetch material', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMaterial();
  }, [topicId, materialId]);

  const { fetchUser } = useAuth();

  const handleMarkComplete = async () => {
    try {
      if (!isCompleted) {
        await api.post('/progress/material', { material_id: materialId });
        await fetchUser(); // Sync XP
      }
      navigate(`/topic/${topicId}`);
    } catch (error) {
      console.error('Failed to mark material as complete', error);
      navigate(`/topic/${topicId}`);
    }
  };

  if (loading || !material) {
    return <div className="pt-28 text-center font-body text-on-surface">Loading material...</div>;
  }

  return (
    <div className="bg-background font-body text-on-surface min-h-screen pb-32">
      <Sidebar />

      <main className="pt-28 px-6 max-w-4xl mx-auto md:ml-64 md:px-12 space-y-10">
        <button
          onClick={() => navigate(`/topic/${topicId}`)}
          className="flex items-center gap-2 text-on-surface-variant font-bold font-headline hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Topic
        </button>

        <article className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border-2 border-outline-variant/20 shadow-sm">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black font-headline text-on-surface leading-tight mb-4 flex items-center gap-4 flex-wrap">
              {material.title}
              {isCompleted && (
                <span className="bg-[#e8f5e9] text-[#1b5e20] text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 border border-[#4caf50]/30">
                  <span className="material-symbols-outlined text-base">check_circle</span> Completed
                </span>
              )}
            </h1>
            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 5 min read</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">school</span> Beginner</span>
            </div>
          </header>

          <div 
            className="material-content max-w-none"
            dangerouslySetInnerHTML={{ __html: material.content }}
          />
        </article>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleMarkComplete}
            className="bg-primary text-on-primary px-8 py-5 rounded-2xl font-headline font-black text-xl border-b-4 border-primary-dim hover:translate-y-1 hover:border-b-0 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95"
          >
            {isCompleted ? 'Continue' : 'Mark as Complete'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
