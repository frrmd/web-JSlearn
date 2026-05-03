import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProMastery() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter Ninja",
      price: "Rp 0",
      desc: "Cocok untuk yang baru mau coba-coba.",
      features: ["Akses 5 Materi Dasar", "Komunitas Discord", "Limit 5 Hearts/Hari"],
      color: "bg-surface-container",
      button: "Current Plan",
      isPro: false
    },
    {
      name: "Pro Mastery",
      price: "Rp 49.000",
      period: "/ bulan",
      desc: "Paling populer untuk calon senior dev.",
      features: ["Semua Materi & Pro Project", "AI Mentor 24/7", "Unlimited Hearts", "Sertifikat Digital"],
      color: "bg-primary-container",
      button: "Upgrade Now",
      isPro: true
    },
    {
      name: "Elite Team",
      price: "Rp 199.000",
      period: "/ bulan",
      desc: "Untuk tim kecil atau kelas belajar.",
      features: ["Akses 5 Akun", "Admin Dashboard", "Prioritas Support", "Custom Learning Path"],
      color: "bg-tertiary-container",
      button: "Contact Sales",
      isPro: false
    }
  ];

  return (
    <div className="bg-background min-h-screen pb-32 font-body text-on-background">
      {/* Header */}
      <header className="p-6 text-center space-y-2">
        <h1 className="text-4xl font-black font-headline text-primary">JSLearn Pro</h1>
        <p className="text-on-surface-variant font-bold">Investasi terbaik untuk karir coding-mu.</p>
      </header>

      {/* Pricing Cards */}
      <main className="px-6 grid gap-6 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div key={index} className={`${plan.color} rounded-3xl p-8 border-b-8 border-black/10 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden`}>
            {plan.isPro && <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-widest">Best Value</div>}
            
            <div className="space-y-4 text-center md:text-left flex-1">
              <div>
                <h3 className="text-2xl font-black font-headline text-on-surface">{plan.name}</h3>
                <p className="text-sm font-medium text-on-surface-variant">{plan.desc}</p>
              </div>
              <div className="flex items-baseline justify-center md:justify-start gap-1">
                <span className="text-4xl font-black text-on-surface">{plan.price}</span>
                <span className="text-sm font-bold text-on-surface-variant">{plan.period}</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-bold">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <button className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all active:translate-y-1 ${plan.isPro ? 'bg-primary text-white shadow-[0_6px_0_0_#1a4700]' : 'bg-surface-container-highest text-on-surface-variant'}`}>
              {plan.button}
            </button>
          </div>
        ))}
      </main>

      <button onClick={() => navigate(-1)} className="fixed top-6 left-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-primary active:translate-y-1 transition-all">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
    </div>
  );
}