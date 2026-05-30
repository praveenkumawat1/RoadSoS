import {
  Shield,
  Ambulance,
  MapPinned,
  Siren,
  PhoneCall,
  HeartHandshake,
} from "lucide-react";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const featuresRef = useRef(null);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="px-6 md:px-12 py-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <div className="relative rounded-[40px] overflow-hidden bg-slate-900 text-white p-8 md:p-20 mb-20">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl mb-8 font-bold text-xs uppercase tracking-[0.2em]">
              <Shield size={16} className="text-red-500" />
              Our Mission
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
              Orchestrating <br />
              Rescue In <span className="text-red-500 text-glow">Chaos.</span>
            </h1>

            <p className="text-slate-400 text-xl font-medium leading-relaxed mb-10">
              RoadSoS was born out of a simple observation: India's emergency
              response is fast, but the information flow is fragmented. We treat
              every second as a data point, building the bridge between victims
              and responders with millisecond precision.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleExploreClick}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/5"
              >
                Our Ecosystem
              </button>
              <button
                onClick={() => navigate("/sos")}
                className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-colors"
              >
                Active SOS Protocol
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          <StatCard
            number="112+"
            label="Unified Gateway"
            sub="Built to interface with ERSS-112 protocols seamlessly."
          />
          <StatCard
            number="256-bit"
            label="Secure Link"
            sub="Emergency medical data is encrypted end-to-end."
          />
          <StatCard
            number="10km"
            label="Scan Radius"
            sub="Deep harvesting of emergency units for maximum coverage."
          />
        </div>

        {/* CONTENT */}
        <div
          ref={featuresRef}
          className="grid lg:grid-cols-2 gap-20 items-center mb-32"
        >
          <div>
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">
              Core Philosophy
            </h3>
            <h2 className="text-4xl md:text-6xl font-[950] text-slate-900 tracking-[0.02em] leading-[0.9] mb-8">
              Engineered <br />
              For Stress.
            </h2>
            <div className="space-y-6">
              <p className="text-slate-500 text-xl leading-relaxed font-medium">
                When disaster strikes, biology takes over. Logic fades, and
                adrenaline rises. RoadSoS is built on the principle of
                "Cognitive Load Reduction."
              </p>
              <p className="text-slate-500 text-xl leading-relaxed font-medium">
                Our interface removes choice paralysis. No forms to fill, no
                search bars to type in—just a single-tap activation that
                triggers a multi-channel broadcast to all verified police and
                medical units within your perimeter.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <ValueBox
              icon={<Shield className="text-red-500" />}
              title="Verified Data"
              desc="We cross-reference every responder node with official government registries."
            />
            <ValueBox
              icon={<PhoneCall className="text-blue-500" />}
              title="Voice Fallback"
              desc="Automatic IVR calls ensure help is notified even if no one reads the SMS."
            />
            <ValueBox
              icon={<MapPinned className="text-green-500" />}
              title="Live Ops"
              desc="Real-time tracking of coordinate delivery and responder receipt status."
            />
            <ValueBox
              icon={<Siren className="text-yellow-500" />}
              title="Panic Mode"
              desc="Optimized for one-handed operation during mobility or injury."
            />
          </div>
        </div>

        {/* OUR STORY / TEAM CONCEPT */}
        <section className="bg-white rounded-[3rem] p-12 md:p-24 border border-slate-100 shadow-sm mb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 tracking-tight">
              The Future of Indian <br />
              <span className="text-red-600 underline underline-offset-8">
                Public Safety.
              </span>
            </h2>
            <p className="text-slate-500 text-2xl font-medium leading-relaxed mb-12">
              We aren't just an app; we are a protocol. Our goal is to set the
              gold standard for how emergency services communicate with citizens
              in the digital age. By integrating AI-driven dispatch cues and
              deep-integration withTwilio and Overpass, we're making sure help
              is never more than a ripple away.
            </p>
            <div className="flex border-t border-slate-100 pt-12 items-center justify-center gap-16 flex-wrap opacity-50 grayscale">
              <span className="font-black text-2xl tracking-tighter">
                TWILIO GOLD
              </span>
              <span className="font-black text-2xl tracking-tighter">
                REACT ARCH
              </span>
              <span className="font-black text-2xl tracking-tighter">
                OSM CORE
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ number, label, sub }) {
  return (
    <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
      <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
        {number}
      </div>
      <div className="text-sm font-black text-red-600 uppercase tracking-widest mb-4">
        {label}
      </div>
      <p className="text-slate-400 font-medium leading-relaxed text-sm">
        {sub}
      </p>
    </div>
  );
}

function ValueBox({ icon, title, desc }) {
  return (
    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-lg transition-all">
      <div className="mb-6">{icon}</div>
      <h4 className="font-black text-xl text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-400 font-medium text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
