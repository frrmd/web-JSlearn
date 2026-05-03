import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pathData } from "../components/PathData";// Import data di atas

export default function PathDetail() {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const data = pathData[pathId];

  if (!data) return <div className="p-10 text-center">Materi tidak ditemukan!</div>;

  return (
    <div className="bg-[#fbffe2] min-h-screen pb-32 font-body text-[#313c0f]">
      {/* Header Visual */}
      <div className={`${data.color} p-10 text-white rounded-b-[3rem] shadow-lg`}>
        <button onClick={() => navigate(-1)} className="mb-4 bg-white/20 p-2 rounded-xl">
           <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-4xl font-black font-headline">{data.title}</h1>
        <p className="font-bold opacity-90">{data.description}</p>
      </div>

      {/* Daftar Materi Singkat */}
      <div className="p-6 space-y-4 max-w-2xl mx-auto mt-4">
        {data.lessons.map((lesson, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border-2 border-[#b2bf85]/20 shadow-sm">
            <h3 className="text-xl font-black text-[#2e7300] mb-1">{lesson.top}</h3>
            <p className="text-[#5d6938] font-medium">{lesson.detail}</p>
          </div>
        ))}
      </div>

      {/* Tombol ke Quiz sesuai kategori */}
      <div className="fixed bottom-24 left-0 w-full px-6">
        <button 
          onClick={() => navigate(`/quiz/${pathId}`)} 
          className="w-full max-w-2xl mx-auto block bg-[#2e7300] text-white font-headline font-bold text-xl py-5 rounded-2xl shadow-[0_6px_0_0_#1a4700] active:translate-y-1 active:shadow-none transition-all text-center"
        >
          START {data.title.toUpperCase()} QUIZ
        </button>
      </div>
    </div>
  );
}