import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: 'max(884px, 100dvh)' }} className="bg-background font-body text-on-background selection:bg-primary-container selection:text-on-primary-container flex flex-col relative overflow-hidden">


      <div className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-surface-container-highest rounded-full blur-3xl"></div>
        <div className="absolute bottom-[5%] right-[2%] w-96 h-96 bg-primary-container rounded-full blur-3xl opacity-20"></div>
        <span className="material-symbols-outlined absolute top-20 right-[15%] text-outline-variant/20 text-8xl" data-icon="data_object">data_object</span>
        <span className="material-symbols-outlined absolute bottom-40 left-[10%] text-outline-variant/20 text-9xl transform rotate-45" data-icon="code">code</span>
        <span className="material-symbols-outlined absolute top-1/2 left-[45%] text-secondary/5 text-[15rem]" data-icon="javascript">javascript</span>
      </div>


      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 lg:py-24 z-10">

        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


          <div className="flex flex-col items-center lg:items-end space-y-8 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-container rounded-full blur-3xl opacity-40"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-tertiary-container rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-surface-container-highest rounded-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 border-b-8 border-outline-variant/30">
                <img alt="Playful JavaScript Character" className="w-48 h-48 lg:w-64 lg:h-64 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoHgUf3p8D0_eAvzNS9jkz0wGMQ8NpPdvfXxc-zkKwEQKPEvtY3waRCxnFjS0-e_efQvtipek5IJM_LZy3y4WlGJUNo7bxJumsm-ebfxaw6_R7JVgrK7BpDlEnN0KS-yHI6QPt-qekV-rx8otf--Jf65pf9XJ-GRF9EDdMTADrJDIBBO6_kiOeSUJ0BtPlTK0MZbN59jAWLi_eKOTeRvp_6rmE6sJvvA5KJrQ24Ql5FGbfH6lOOOJ8FOCKksZeM4j48u9gpIJBMw" />
              </div>
              <div className="absolute -top-4 -right-4 bg-tertiary text-on-tertiary px-4 py-2 rounded-full font-headline font-bold text-sm shadow-xl transform -rotate-12">
                NEW! 🚀
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-end text-right">
              <h2 className="font-headline font-extrabold text-4xl text-on-surface leading-tight tracking-tight">
                JS<span className="text-primary italic">LEARN</span>
              </h2>
              <p className="text-on-surface-variant max-w-xs mt-2 font-medium">
                Gamified paths to help you write cleaner code, faster.
              </p>
            </div>
          </div>

          {/* Interaction Side (Right) */}
          <div className="flex flex-col space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="font-headline font-black text-4xl lg:text-6xl text-on-background tracking-tighter leading-none">
                Learn JavaScript <br />
                <span className="text-primary">for Free, Forever.</span>
              </h1>
              <p className="text-lg text-on-surface-variant font-medium">
                Join over 2 million developers learning the language of the web.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4 max-w-sm mx-auto lg:mx-0">
              <button
                onClick={() => navigate('/register')}
                className="bg-primary text-on-primary font-headline font-extrabold text-xl py-4 px-8 rounded-lg landing-chunky-shadow shadow-primary-dim uppercase tracking-wider transition-all duration-100 flex items-center justify-center gap-3 active:translate-y-1 active:shadow-none"
              >
                Get Started
                <span className="material-symbols-outlined" data-icon="rocket_launch">rocket_launch</span>
              </button>

              {/* Secondary Button: Login */}
              <button
                onClick={() => navigate('/login')}
                className="bg-surface-container-lowest text-primary font-headline font-bold text-lg py-4 px-8 rounded-lg landing-chunky-shadow shadow-outline-variant/20 border-2 border-outline-variant/10 transition-all duration-100 active:translate-y-1 active:shadow-none"
              >
                I already have an account
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Legal Links */}
      <footer className="w-full py-8 px-6 text-center z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
          <a className="text-on-surface-variant hover:text-primary font-headline font-bold text-xs uppercase tracking-widest transition-colors" href="#">Terms of Service</a>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-outline-variant"></div>
          <a className="text-on-surface-variant hover:text-primary font-headline font-bold text-xs uppercase tracking-widest transition-colors" href="#">Privacy Policy</a>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-outline-variant"></div>
          <span className="text-outline font-headline font-bold text-xs uppercase tracking-widest">© 2026 JSLEARN</span>
        </div>
      </footer>
    </div>
  );
}