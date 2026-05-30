import { MapPin, Phone, Navigation, Building2, Zap } from "lucide-react";
import { useAutoLocation } from "../utils/useAutoLocation";

const hospitals = [
  {
    name: "City Trauma Center",
    distance: "2.3 km",
    status: "Open 24/7",
    phone: "011-2345678",
  },
  {
    name: "Life Care Hospital",
    distance: "3.1 km",
    status: "ICU Available",
    phone: "011-8765432",
  },
  {
    name: "Government District Hospital",
    distance: "5.4 km",
    status: "Emergency Dept. 24/7",
    phone: "102",
  },
];

export default function HospitalsPage() {
  const { address, loading } = useAutoLocation();

  return (
    <div className="px-6 md:px-12 lg:px-24 py-20 bg-[#fafafa] min-h-screen">
      <div className="w-full">
        <header className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl mb-6 font-black text-[10px] uppercase tracking-widest border border-red-100">
              <Zap size={14} fill="currentColor" /> Live Trauma Feed
            </div>
            <h2 className="text-5xl md:text-7xl font-[950] text-slate-900 tracking-[-0.05em] leading-[0.9]">
              Verified Trauma <br />
              <span className="text-red-600">Centers.</span>
            </h2>
            <p className="text-slate-500 mt-8 text-xl md:text-2xl font-medium leading-relaxed">
              Every facility listed is equipped with level-1 trauma gear and
              24/7 neuro-surgical staff.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 px-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Your Location
                </p>
                <p
                  className={`font-bold text-slate-900 border-none outline-none ${loading ? "animate-pulse" : ""}`}
                >
                  {loading
                    ? "Locating..."
                    : address.split(",").slice(0, 2).join(",")}
                </p>
              </div>
            </div>
            <button className="bg-slate-900 text-white px-10 py-4 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
              Refresh Feed
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {hospitals.map((h, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-[3rem] p-10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -mr-8 -mt-8 pointer-events-none" />

              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-600">
                <Building2 size={28} />
              </div>

              <h4 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-red-600 transition-colors">
                {h.name}
              </h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                Medical Facility
              </p>

              <div className="flex items-center gap-2 mb-6 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-bold text-slate-700">{h.status}</span>
                <span className="text-slate-300 mx-1">•</span>
                <span className="font-medium text-slate-500">
                  {h.distance} away
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${h.phone}`}
                  className="bg-slate-900 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                >
                  <Phone size={16} fill="currentColor" />
                  Contact
                </a>
                <button className="bg-white border border-slate-200 text-slate-900 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                  <Navigation size={16} />
                  Route
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
