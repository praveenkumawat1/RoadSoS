import {
  MapPin,
  Shield,
  Phone,
  AlertTriangle,
  Zap,
  WifiOff,
  Cpu,
  HeartPulse,
  Globe,
  Lock,
} from "lucide-react";

function StepItem({ num, title, desc, icon, status }) {
  return (
    <div className="relative flex flex-col md:flex-row gap-12 items-start group">
      <div className="relative z-10 w-24 h-24 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all group-hover:scale-110 group-hover:rotate-3">
        <div className="absolute -top-3 -left-3 bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black">
          {num}
        </div>
        <div className="text-slate-900 group-hover:text-red-600 transition-colors">
          {icon}
        </div>
      </div>

      <div className="pt-2">
        <div className="inline-block px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          {status}
        </div>
        <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
          {title}
        </h3>
        <p className="text-slate-500 text-xl font-medium leading-normal max-w-xl">
          {desc}
        </p>
      </div>
    </div>
  );
}

function FeatureRow({ icon, title, text }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function AlertChannelCard({ icon, title, desc, tech, image }) {
  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group overflow-hidden">
      <div className="h-48 overflow-hidden relative">
        <img
          src={image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <div className="absolute bottom-4 left-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          {icon}
        </div>
      </div>
      <div className="p-10 pt-6">
        <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
          {desc}
        </p>
        <div className="inline-block px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
          {tech}
        </div>
      </div>
    </div>
  );
}

function TechCard({ title, desc, icon }) {
  return (
    <div className="bg-slate-50/50 p-12 rounded-[4rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-slate-900">
        {icon}
      </div>
      <h4 className="text-2xl font-black text-slate-900 mb-4">{title}</h4>
      <p className="text-slate-500 text-lg font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-32 bg-white flex flex-col items-center">
      <div className="w-full">
        <header className="text-left mb-24 max-w-5xl relative">
          <div className="absolute -top-24 -right-12 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full" />
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-2xl mb-10 font-black text-xs uppercase tracking-[0.3em] border border-red-100 shadow-sm relative z-10">
            Technical Architecture
          </div>
          <div className="flex flex-col lg:flex-row gap-12 items-end">
            <div className="flex-1">
              <h2 className="text-6xl md:text-[100px] font-[950] text-slate-900 tracking-[-0.06em] leading-[0.85] mb-10">
                Intelligent <br />
                Response <span className="text-red-600">Nodes.</span>
              </h2>
              <p className="text-slate-500 text-2xl md:text-3xl font-medium leading-tight tracking-tight opacity-80">
                RoadSoS leverages a decentralized "Orbital Response" system
                designed specifically for the extreme conditions of real-world
                emergencies.
              </p>
            </div>
            <div className="hidden lg:block w-72 h-72 rounded-[3rem] overflow-hidden rotate-6 shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=500"
                className="w-full h-full object-cover"
                alt="Emergency Support"
              />
            </div>
          </div>
        </header>

        {/* ORBITAL SYSTEM DETAIL SECTION */}
        <section className="mb-48">
          <div className="bg-slate-950 rounded-[4rem] p-8 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-full opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-red-500/20 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-red-500/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full ring-offset-2" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                  The Orbital <br />
                  <span className="text-red-500">Radar Hub.</span>
                </h3>
                <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                  At the heart of RoadSoS is a real-time scanning engine that
                  visualizes your SOS signals as ripples in a digital pond. It
                  doesn't just "find" help—it maps the entire infrastructure
                  around you.
                </p>

                <div className="space-y-8">
                  <FeatureRow
                    icon={<Cpu className="text-red-500" />}
                    title="Real-Time Node Mapping"
                    text="Every nearby Police Station, Hospital, and EMS unit is mapped as an 'Orbital Node' on your radar HUD."
                  />
                  <FeatureRow
                    icon={<Zap className="text-yellow-500" />}
                    title="Instant Data Extraction"
                    text="We fetch verified contact numbers and operational status directly from the Overpass API."
                  />
                  <FeatureRow
                    icon={<Shield className="text-blue-500" />}
                    title="Active Perimeter Scan"
                    text="Your radar expands up to 10km to ensure no rescue unit is left behind in the broadcast."
                  />
                </div>
              </div>

              {/* UI PREVIEW (Visual Screenshot Simulation) */}
              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/20 blur-[120px] rounded-full group-hover:bg-red-500/30 transition-all" />
                <div className="relative bg-slate-900 border border-white/10 rounded-[3rem] p-6 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700 overflow-hidden">
                  {/* Background Map Simulation Image */}
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale brightness-50"
                    alt="Network background"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Live Radar View
                      </div>
                    </div>
                    <div className="aspect-square rounded-full border-2 border-dashed border-red-500/30 flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent">
                      <div className="absolute w-1 h-[45%] bg-gradient-to-t from-red-500/50 to-transparent top-1/2 left-1/2 -translate-x-1/2 origin-top animate-spin-slow" />
                      <div className="w-16 h-16 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                      {/* Node simulation */}
                      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                      <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                    </div>
                    <div className="mt-8 text-center">
                      <div className="text-white font-black text-2xl">
                        Scanning Area...
                      </div>
                      <div className="text-slate-500 text-[10px] font-bold uppercase mt-2 tracking-widest bg-white/5 inline-block px-3 py-1 rounded-full">
                        3 Police Units Found
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE THREE CHANNELS SECTION */}
        <section className="mb-48">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-[950] text-slate-900 mb-6 tracking-tight">
              Triple Vector <span className="text-red-500">Alerts.</span>
            </h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
              Our transmission logic ensures that your SOS message reaches the
              responder even if you have no internet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AlertChannelCard
              icon={<Globe size={40} className="text-blue-500" />}
              title="Cloud Broadcast"
              desc="When online, our Node.js backend broadcasts your precision location to Twilio's global relay network."
              tech="WebSocket / REST API"
              image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=500"
            />
            <AlertChannelCard
              icon={<Phone size={40} className="text-green-500" />}
              title="Voice Protocol"
              desc="If text is ignored, our system triggers an automated VOIP call using Twilio Voice to ensure human attention."
              tech="TwiML / IVR Engine"
              image="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=500"
            />
            <AlertChannelCard
              icon={<WifiOff size={40} className="text-red-500" />}
              title="Satellite SMS"
              desc="In dead zones, we encode your coordinates into a highly compressed SOS text that works on zero data."
              tech="GPRS Failover"
              image="https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=500"
            />
          </div>
        </section>

        {/* STEP-BY-STEP DETAILED WORKFLOW */}
        <div className="grid lg:grid-cols-2 gap-24 items-start mb-48">
          <div className="relative space-y-16">
            <div className="absolute left-[47px] top-10 bottom-10 w-px bg-slate-100 hidden md:block" />

            <StepItem
              num="01"
              title="Precision Localization"
              desc="Using a combination of W3C Geolocation and IP-based triangulation, we lock onto your position within 5 seconds. We also fetch your human-readable address to help responders find you faster."
              icon={<MapPin size={32} />}
              status="Pre-computed"
            />
            <StepItem
              num="02"
              title="Station Harvesting"
              desc="The Overpass API queries the OpenStreetMap database in real-time. It filters for 'amenity=police', 'amenity=hospital', and 'emergency=rescue' within your specific radius."
              icon={<Shield size={32} />}
              status="Instant"
            />
            <StepItem
              num="03"
              title="Managed Broadcast"
              desc="You choose your targets. Whether it's just the nearest police staiton or a blanket SOS to everyone. Our backend manages the SMS delivery reports via Twilio's messaging service."
              icon={<WifiOff size={32} />}
              status="Fail-Safe"
            />
          </div>

          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <h3 className="text-4xl md:text-6xl font-black mb-10 leading-none tracking-tighter">
              Post-SOS <br />
              Action Plan.
            </h3>
            <div className="space-y-10">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <HeartPulse className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-2">
                    Automated First Aid
                  </h4>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    While help is on the way, the system provides offline-ready
                    recovery guides (CPR, Bleeding Control, Heatstroke) tailored
                    to your situation.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Zap className="text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-2">
                    Live Status Dashboard
                  </h4>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Monitor which stations have received your message. A
                    real-time 'Broadcast Log' keeps you updated on the delivery
                    status of every SMS and call.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TECHNOLOGY STACK */}
        <section className="mb-48">
          <div className="text-center mb-24">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
              Under The Hood
            </h3>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
              Modern Infrastructure.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <TechCard
              title="Spatial Clustering"
              desc="Our DSA-based clustering algorithm groups nearby facilities to prevent UI clutter and prioritize the fastest responder."
              icon={<Cpu size={28} />}
            />
            <TechCard
              title="NavIC Integration"
              desc="Full support for ISRO's Indian Regional Navigation Satellite System for sub-meter positioning accuracy."
              icon={<Globe size={28} />}
            />
            <TechCard
              title="Zero-Trust Privacy"
              desc="We use strict SameSite cookies and 256-bit encryption. Your SOS data exists only for the duration of the emergency."
              icon={<Lock size={28} />}
            />
          </div>
        </section>

        {/* FULL WIDTH DEPLOYMENT IMAGE */}
        <section className="w-full mb-48">
          <div className="relative rounded-[4rem] overflow-hidden h-[600px] group">
            <img
              src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=2000"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
              alt="Rescue Operations"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-12 md:p-24">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl mb-6 font-bold text-xs uppercase tracking-widest">
                  <AlertTriangle size={16} />
                  Active Deployment
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                  Reliability in every <br />
                  <span className="text-red-500">Kilometer.</span>
                </h2>
                <p className="text-slate-300 text-xl font-medium leading-relaxed">
                  Whether you're on a remote highway or in the heart of a city,
                  RoadSoS is built to withstand network outages, high-latency
                  environments, and emergency pressure.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
