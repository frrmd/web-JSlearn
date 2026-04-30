import React from 'react';

export default function Leaderboard() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen pb-32">
      
     
      <header className="fixed top-0 w-full z-50 bg-[#fbffe2]/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            
            <h1 className="text-2xl font-black text-[#2e7300] dark:text-[#58CC02] italic font-['Plus_Jakarta_Sans'] tracking-tight">JSlearn</h1>
          </div>
          <div className="text-[#2e7300] dark:text-[#58CC02] font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight">
            5 🔥 120 XP 3 ❤️
          </div>
        </div>
        <div className="h-4 tonal-transition"></div>
      </header>

      <main className="pt-24 pb-32 px-4 max-w-2xl mx-auto min-h-screen">
       
        <div className="mb-10 text-center">
          <h2 className="font-headline text-4xl font-extrabold text-on-background tracking-tight mb-6">Leaderboard</h2>
          <div className="inline-flex p-1.5 bg-surface-container rounded-2xl shadow-inner">
            <button className="px-8 py-2.5 rounded-xl font-headline font-bold text-sm bg-surface-container-lowest text-primary shadow-[0_2px_0_0_#2e730020]">
              Weekly
            </button>
            <button className="px-8 py-2.5 rounded-xl font-headline font-bold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">
              All Time
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-3 gap-4 items-end mb-12 relative px-2">
          
          
          <div className="flex flex-col items-center">
            <div className="relative mb-3 group">
              <div className="absolute -top-4 -right-2 bg-[#C0C0C0] text-white rounded-full w-8 h-8 flex items-center justify-center font-black border-4 border-background z-10">2</div>
              <img className="w-20 h-20 rounded-3xl object-cover border-4 border-surface-container shadow-xl rotate-[-3deg] group-hover:rotate-0 transition-transform" alt="User avatar male casual" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrOROSnZRGjJ2LbuCDvqvkq7wvB4SkZvexWKhxAeaBoHfZWVHLu-nTYSltChGBHhn2WJMlUOmrJr9uo78o0E1cDNWtBaIzmRuCYAI4Ws_pz00HTOlL2FhvCjOUA6eX5rfhBk9IOwr0GwQrEBCrso70Y1JLLr4g6N7YpLDh71u_-SIaPBuM58WXeq1g_AcIfU7rtirc58_mcNFP8a-LaUFXdFRM0RWFQf6EWgsTwtQRmR_2yUhz-HPO_jPSKWrAV8HbP_9zZ6rQ5Q" />
            </div>
            <p className="font-headline font-bold text-on-surface text-sm">Alex R.</p>
            <p className="text-secondary font-bold text-xs uppercase tracking-tighter">8,420 XP</p>
            <div className="h-16 w-full bg-surface-container rounded-t-2xl mt-4 flex items-end justify-center pb-2">
              <span className="material-symbols-outlined text-outline-variant opacity-30">workspace_premium</span>
            </div>
          </div>

        
          <div className="flex flex-col items-center">
            <div className="relative mb-3 group scale-110">
              <div className="absolute -top-6 -right-2 bg-[#FFD700] text-on-primary-container rounded-full w-10 h-10 flex items-center justify-center font-black border-4 border-background z-10 shadow-lg">1</div>
              <img className="w-24 h-24 rounded-[2.5rem] object-cover border-4 border-primary shadow-2xl transition-transform" alt="User avatar female professional" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1nonJmtHQsag1nrl5cM5PwE8nQ4pbQgTAou-Sdf13ePeKZsqxjwBpe_WJ4zI9OB7TTDAJ4g5gNtxfXfU31GQPmvZaANSp3EacQjuHTAsAuazTqLPVhn8rHR8FZ6qJfPoXhwXfKzQ9JOatJVjGgD-1FM5wtczjIUMkVG1InJ0eWJhwrx_2wIrtEfJ74hnkht9KZE78JfdGW1vACL3SvRkR3tE_X3HRFJyvg4XOAJhob_nXT8uDRgajJ4bSx57II99CrgoYgnEOcw" />
            </div>
            <p className="font-headline font-extrabold text-primary text-base">Sarah Chen</p>
            <p className="text-primary-dim font-black text-sm uppercase tracking-tighter">12,150 XP</p>
            <div className="h-24 w-full bg-primary-container/30 rounded-t-3xl mt-4 flex items-end justify-center pb-4 border-b-4 border-primary">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
          </div>

        
          <div className="flex flex-col items-center">
            <div className="relative mb-3 group">
              <div className="absolute -top-4 -right-2 bg-[#CD7F32] text-white rounded-full w-8 h-8 flex items-center justify-center font-black border-4 border-background z-10">3</div>
              <img className="w-20 h-20 rounded-3xl object-cover border-4 border-surface-container shadow-xl rotate-[3deg] group-hover:rotate-0 transition-transform" alt="User avatar male smiley" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3PRyIp5rHku8KviUXEDXb2xldeMQdzG4W3GADQLfa8yx0e3sNtk0sq8rf2JDRRCE2mx_0BEoo_Lx_dkvibIim3uSVMDSiVBRkcpgBgDZxIeG35EEHFgLaR8gCQYozAjGydmJ4FQPANOpwr3ChMshIP1iWnKREvCGHy3d0ObpE3l247l7uRIPkOzKvWQN1XYBhtmIMOmG5M6MRvcwBZMk-E7QeQRcm8PEFmbCv_On9nz3kvT_mFrPEP7kgMCdxXvYjYGEcgVqgJg" />
            </div>
            <p className="font-headline font-bold text-on-surface text-sm">Jordan K.</p>
            <p className="text-tertiary font-bold text-xs uppercase tracking-tighter">7,900 XP</p>
            <div className="h-12 w-full bg-surface-container rounded-t-2xl mt-4 flex items-end justify-center pb-1">
              <span className="material-symbols-outlined text-outline-variant opacity-30">workspace_premium</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
    
          <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border-b-4 border-surface-container group hover:translate-y-[-2px] transition-transform">
            <span className="font-headline font-black text-on-surface-variant w-8">4</span>
            <img className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 transition-transform" alt="User avatar male round" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDckAF-s07l2eAfvlTwOuxU6FvkyooSj254Oeu7pbRKL7AGuFSp4_63mQrs12gFpfGH9szFpo28mhGXzXBHbxPXditX1d_4q9iobv3VyHgH2f29tE3P_m1iDcNlAAghdd-_7DF03fGLmoH7QBva1BkQOe0fADmDiGNjPrNb58t5LrmGO69er2P3ijEdjiA43QvcVjf8wLc8tNtOH3i77vXQNhMlwfSwCzg_rkYyBAQbcr_JxDu07BWHA96gBG_WdiPYQJ1DAf3XAA" />
            <div className="flex-grow">
              <h4 className="font-headline font-bold text-on-surface">Harun</h4>
              <p className="text-xs text-on-surface-variant font-medium">Fullstack Dev</p>
            </div>
            <div className="text-right">
              <span className="block font-headline font-black text-primary">5,420</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">XP</span>
            </div>
          </div>

          {/* Rank 5 */}
          <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border-b-4 border-surface-container group">
            <span className="font-headline font-black text-on-surface-variant w-8">5</span>
            <img className="w-12 h-12 rounded-xl object-cover" alt="User avatar female curly" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMFWQq66H683vNrTg_806NaMcnYJ7468xJcgjT0qDPEBgcO7ZWoQkHoMDttT1aZvj3cI4qrSRj_icFncGIP6q8f6XUB9Yy2M6CftgKhxgN14aJVMBDZ-Lzjc1OUoeFk5iR0Ium9sOfqrsYenvI7hDN3JLHW7nJINziqVm4zACLkDTLec3lLR3XtJnjMSxNcwjywFmY6Xb2dl-cIlL0OsmzPVBpMb-5M6UzF1_kuOPktAsVzxhOU0EfQndpjurZ718SSEBC3lB-Gg" />
            <div className="flex-grow">
              <h4 className="font-headline font-bold text-on-surface">Riley Smith</h4>
              <p className="text-xs text-on-surface-variant font-medium">CSS Wizard</p>
            </div>
            <div className="text-right">
              <span className="block font-headline font-black text-primary">4,890</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">XP</span>
            </div>
          </div>

          {/* Rank 6 */}
          <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border-b-4 border-surface-container group">
            <span className="font-headline font-black text-on-surface-variant w-8">6</span>
            <img className="w-12 h-12 rounded-xl object-cover" alt="User avatar male beard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0dqUu8WVdf1uy7wcBC6EHSgexZYytZulUmrgGU8Z_5HtGuzNwei_ebCOPovpM2XRQwckcXvOah_YdNebPyFUrKxhOyhjtb9t1NoLgfiKM0cfHuzcWCmknL3Z5UbL7aeoVYImtoOC_5gaIUp4hP4EgoDthWwkRG7TtMQDBfnLyj0Ao243TE1SlSricmVlISvE8BYGuOwicgvNG1cp_ZzqpPveY-IL965Y5nU69cTZ1Md5vB-NmIX3SUWXiyWjZaE1TvuBllmiL4g" />
            <div className="flex-grow">
              <h4 className="font-headline font-bold text-on-surface">Dave G.</h4>
              <p className="text-xs text-on-surface-variant font-medium">Logic Master</p>
            </div>
            <div className="text-right">
              <span className="block font-headline font-black text-primary">4,200</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">XP</span>
            </div>
          </div>

          {/* Spacer for floating bar */}
          <div className="h-20"></div>
        </div>

        {/* Sticky User Rank */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl z-40">
          <div className="bg-secondary text-on-secondary p-5 rounded-2xl shadow-xl flex items-center justify-between border-b-4 border-on-secondary-container/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center font-headline font-black text-sm">42</div>
              <div>
                <h4 className="font-headline font-bold text-sm">YOU (JS Learner)</h4>
                <p className="text-xs opacity-80">You're in the top 15% this week!</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-headline font-black text-lg">1,250 XP</span>
            </div>
          </div>
        </div>

      </main>

      {/* BottomNavBar */}
      
    </div>
  );
}