import { MapPin, Phone, Navigation, Ambulance, Zap } from "lucide-react";
import { useAutoLocation } from "../utils/useAutoLocation";

const ambulances = [
  {
    name: "Rapid Ambulance",
    distance: "1.2 km",
    status: "Available",
    phone: "108",
  },
  {
    name: "Emergency 108 Partner",
    distance: "2.0 km",
    status: "On the way",
    phone: "108",
  },
  {
    name: "Cardiac Ambulance Service",
    distance: "4.6 km",
    status: "ICU Transport",
    phone: "102",
  },
];

export default function AmbulancePage() {
  const { address, loading } = useAutoLocation();

  return (
    <div className="px-6 md:px-12 lg:px-24 py-20 bg-[#fafafa] min-h-screen">
      <div className="w-full">
        <header className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl mb-6 font-black text-[10px] uppercase tracking-widest border border-blue-100">
              <Ambulance size={14} fill="currentColor" /> Fleet Radar Active
            </div>
            <h2 className="text-5xl md:text-7xl font-[950] text-slate-900 tracking-[-0.05em] leading-[0.9]">
              Nearest Medical <br />
              <span className="text-blue-600">Transport.</span>
            </h2>
            <p className="text-slate-500 mt-8 text-xl md:text-2xl font-medium leading-relaxed">
              Locate ALS/BLS ambulances within a 5km radius. Integrated with 108
              and private fleets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 px-6 text-left">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Your Location
                </p>
                <p
                  className={`font-bold text-slate-900 ${loading ? "animate-pulse text-slate-300" : ""}`}
                >
                  {loading
                    ? "Locating..."
                    : address.split(",").slice(0, 2).join(",") ||
                      "Unknown Address"}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 px-6 text-left">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Network Speed
                </p>
                <p className="font-bold text-slate-900">0.2ms Lag</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
              Sync Radar
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ambulances.map((a, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-[3rem] p-10 hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.15)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-8 -mt-8 pointer-events-none" />

              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Ambulance size={28} />
              </div>

              <h4 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {a.name}
              </h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                Responder Unit
              </p>

              <div className="flex items-center gap-2 mb-6 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-bold text-slate-700">{a.status}</span>
                <span className="text-slate-300 mx-1">•</span>
                <span className="font-medium text-slate-500">
                  {a.distance} away
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${a.phone}`}
                  className="bg-slate-900 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                >
                  <Phone size={16} fill="currentColor" />
                  Call
                </a>
                <button className="bg-white border border-slate-200 text-slate-900 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                  <Navigation size={16} />
                  Navigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
