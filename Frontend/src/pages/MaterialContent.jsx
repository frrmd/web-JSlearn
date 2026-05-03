import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { mockCourses } from '../data/mockCourses';
import { markMaterialCompleted, userProgress } from '../data/userProgress';
import { addRecentTopic, mockUser } from '../data/mockUser';

export default function MaterialContent() {
  const { topicId, materialId } = useParams();
  const navigate = useNavigate();

  const course = mockCourses.find(c => c.id === topicId) || mockCourses[0];
  const material = course.materials?.find(m => m.id === materialId) || course.materials?.[0] || { title: 'Material', description: '', readTime: '5 min' };

  const isCompleted = userProgress[topicId]?.materials[materialId]?.completed;

  useEffect(() => {
    addRecentTopic(course.id);
  }, [course.id]);

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
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {material.readTime} read</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">school</span> Beginner</span>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-headings:font-bold prose-p:text-on-surface-variant prose-a:text-primary">
            <p className="text-xl leading-relaxed mb-6 font-medium text-on-surface">
              Welcome to {course.title}. {material.description} This section covers the foundational concepts you need to know before attempting the quizzes.
            </p>

            <h2 className="text-2xl font-black mt-10 mb-4 text-on-surface">Why is this important?</h2>
            <p className="mb-6 leading-relaxed">
              In JavaScript, mastering <strong>{course.title.toLowerCase()}</strong> is critical for building dynamic and robust applications. It forms the basis of logic flow, data management, and interaction.
            </p>

            <div className="bg-secondary-container p-6 rounded-2xl my-8 border-l-4 border-secondary shadow-sm">
              <h3 className="font-headline font-bold text-secondary flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined">tips_and_updates</span> Key Concept
              </h3>
              <p className="text-on-secondary-container m-0">
                Always remember that JavaScript is parsed from top to bottom. The way you define your {course.title.toLowerCase()} will determine how the rest of your program executes.
              </p>
            </div>

            <h2 className="text-2xl font-black mt-10 mb-4 text-on-surface">Syntax Overview</h2>
            <p className="mb-6 leading-relaxed">
              The syntax in JavaScript is highly flexible but comes with specific rules. Take a look at this basic structure:
            </p>

            <div className="bg-surface-container-highest p-6 rounded-xl font-mono text-sm mb-8 text-on-surface overflow-x-auto border border-outline-variant/30">
              <code>
                <span className="text-tertiary">const</span> <span className="text-primary">example</span> = <span className="text-secondary">"This is mock content"</span>;<br />
                <span className="text-primary">console</span>.<span className="text-secondary">log</span>(example);
              </code>
            </div>

            <p className="leading-relaxed">
              Make sure you understand these basics. When you are ready, proceed to the quiz to test your knowledge!
            </p>
          </div>
        </article>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => {
              markMaterialCompleted(topicId, materialId, mockUser.id);
              navigate(`/topic/${topicId}`);
            }}
            className="bg-primary text-on-primary px-8 py-5 rounded-2xl font-headline font-black text-xl border-b-4 border-primary-dim hover:translate-y-1 hover:border-b-0 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95"
          >
            {isCompleted ? 'Continue' : 'Mark as Continue'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
