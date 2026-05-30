import { Link } from "react-router-dom";
import {
  Shield,
  AlertTriangle,
  PhoneCall,
  Zap,
  Lock,
  Globe,
  Building2,
  Siren,
} from "lucide-react";
import WelcomeOnboarding from "../components/WelcomeOnboarding";

export default function HomePage({ onGoSOS }) {
  return (
    <div className="flex flex-col animate-in fade-in duration-700">
      <WelcomeOnboarding />

      {/* LIVE STATUS TICKER (NEW) */}
      <div className="bg-slate-900 text-white py-2 overflow-hidden border-b border-slate-800">
        <div className="w-full px-6 flex items-center gap-6 whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Service Status: Live
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            🚨 Heavy traffic reported on NH-48 near Bangalore
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            🏥 24/7 Trauma Centers active in Karnataka
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            📡 Satellite Link 12-B operational in North India
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative px-6 md:px-12 lg:px-24 py-20 lg:py-40 overflow-hidden bg-white min-h-[90vh] flex items-center">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-red-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60" />

        <div className="relative w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="flex flex-col items-start text-left max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-5 py-3 rounded-2xl mb-8 font-black text-xs uppercase tracking-widest border border-red-100 shadow-sm">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              Offline Emergency Network India
            </div>

            <h2 className="text-6xl md:text-[110px] lg:text-[130px] font-[950] leading-[0.85] text-slate-900 tracking-[-0.05em] mb-10">
              Seconds <br />
              <span className="text-red-600">Matter.</span>
            </h2>

            <p className="text-slate-500 text-xl md:text-3xl leading-snug max-w-2xl font-medium mb-14 tracking-tight">
              India's state-of-the-art offline response protocol. Instant
              medical, police, and logistics aid without internet.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
              <button
                onClick={onGoSOS}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 hover:scale-[1.05] active:scale-95 transition-all text-white px-14 py-6 rounded-[2.5rem] font-black text-2xl shadow-[0_30px_60px_-10px_rgba(220,38,38,0.4)] flex items-center justify-center gap-4"
              >
                Launch SOS
                <div className="bg-white/20 p-2 rounded-full">
                  <Zap size={26} fill="currentColor" />
                </div>
              </button>

              <Link
                to="/how-it-works"
                className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 px-12 py-6 rounded-[2.5rem] font-black text-xl transition-all text-center shadow-xl"
              >
                Explore System
              </Link>
            </div>

            <div className="flex flex-wrap gap-12 mt-20 pt-8 border-t border-slate-100 w-full">
              <div>
                <p className="text-4xl font-black text-slate-900 leading-none mb-2">
                  100%
                </p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Offline Ready
                </p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-100" />
              <div>
                <p className="text-4xl font-black text-slate-900 leading-none mb-2">
                  0.5s
                </p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Response Lag
                </p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-100" />
              <div>
                <p className="text-4xl font-black text-slate-900 leading-none mb-2">
                  PAN
                </p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  India Defense
                </p>
              </div>
            </div>
          </div>

          {/* ENHANCED HERO IMAGE (MODERN APP UI) */}
          <div className="relative group lg:mt-0 w-full lg:scale-110 xl:scale-125 origin-center">
            <div className="absolute inset-0 bg-red-500/15 rounded-[4rem] blur-[120px] opacity-80" />

            <div className="relative bg-[#0F172A] rounded-[4rem] shadow-[0_50px_120px_rgba(0,0,0,0.4)] overflow-hidden border-[16px] border-[#1E293B] aspect-[4/3] w-full max-w-2xl mx-auto transform -rotate-2 hover:rotate-0 transition-all duration-700">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0F172A]/90 to-transparent z-10 p-8 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <div className="bg-red-600/20 backdrop-blur-xl px-5 py-2 rounded-2xl border border-red-500/30 flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                    Active Radar Sync
                  </span>
                </div>
              </div>

              {/* High Quality Map Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1500&auto=format&fit=crop"
                  alt="Modern Emergency Hub"
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating UI Elements */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-2 border-red-500/20 rounded-full animate-ping" />
                <div className="absolute w-48 h-48 border border-white/10 rounded-full animate-pulse" />
              </div>

              <div className="absolute inset-x-8 bottom-8 space-y-4 z-20">
                <div className="bg-white/95 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-white/50 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 flex items-center gap-6">
                  <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-red-200 shrink-0">
                    <Siren size={32} className="animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-[950] text-slate-900 text-xl tracking-tight">
                        Police HQ Dispatch
                      </p>
                      <span className="text-green-600 text-[10px] font-black bg-green-50 px-2 py-1 rounded-md">
                        CONNECTED
                      </span>
                    </div>
                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                      Response Unit: Charlie-9 • ETA 4 MIN
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 flex items-center gap-5 translate-x-12 group-hover:translate-x-0 transition-transform duration-1000 delay-100">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                    <Building2 size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">
                      Central trauma active
                    </p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-500 w-3/4 h-full animate-[progress_3s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-slate-50 py-32 px-6 md:px-12 lg:px-24">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <h3 className="text-sm font-black text-red-500 uppercase tracking-[0.3em] mb-6">
                Engineered for India
              </h3>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-[-0.05em] leading-[0.9]">
                Safety Doesn't <br />
                Wait For 5G.
              </h2>
            </div>
            <p className="text-slate-500 text-xl md:text-2xl font-medium leading-normal max-w-2xl opacity-80">
              RoadSoS is India's premier offline-first emergency architecture.
              We bridge the gap between panic and professional help in under 30
              seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Globe size={32} />}
              title="Hyper-Local Offline Data"
              desc="Pre-optimized emergency data packets for every district in India. Access 25,000+ verified trauma centers without data."
            />
            <FeatureCard
              icon={<PhoneCall size={32} />}
              title="One-Tap Protocols"
              desc="Standardized communication protocols for Police, Ambulance, and Fire services. No room for error during panic."
            />
            <FeatureCard
              icon={<Lock size={32} />}
              title="Privacy First"
              desc="Your data stays on your device. Only during an active SOS is your position securely broadcasted to help."
            />
          </div>
        </div>
      </section>

      {/* TRUSTED BY / STATS SECTION (NEW) */}
      <section className="bg-white py-24 px-6 border-y border-slate-100">
        <div className="w-full text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">
            Integrating with the Ecosystem
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale contrast-200">
            <span className="text-2xl font-black">NHS India</span>
            <span className="text-2xl font-black">NHAI</span>
            <span className="text-2xl font-black">AIIMS</span>
            <span className="text-2xl font-black">Red Cross</span>
            <span className="text-2xl font-black">ISRO Link</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION (NEW) */}
      <section className="bg-slate-900 py-32 px-6 text-center overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-red-600/10 rounded-full blur-[150px] -mt-[500px]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">
            Be Prepared. <br />
            Download Documentation.
          </h2>
          <p className="text-slate-400 text-xl md:text-2xl mb-12 font-medium">
            Get our offline manual and responder directory to keep in your
            vehicle at all times.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-slate-900 px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-all">
              Download PDF
            </button>
            <button className="bg-transparent border-2 border-white/20 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/5 transition-all">
              Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 hover:border-red-200 hover:shadow-[0_40px_80px_-20px_rgba(220,38,38,0.15)] transition-all duration-700 group cursor-default">
      <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-10 text-slate-900 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-sm">
        {icon}
      </div>
      <h4 className="text-3xl font-[900] text-slate-900 mb-6 tracking-tight">
        {title}
      </h4>
      <p className="text-slate-500 text-xl leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}
