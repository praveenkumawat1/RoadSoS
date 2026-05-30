import { Phone, Navigation, Shield, Zap } from "lucide-react";

const police = [
  {
    name: "24x7 Police Helpdesk",
    distance: "2.8 km",
    status: "24/7 Active",
    phone: "112",
  },
  {
    name: "Women Safety Cell",
    distance: "3.9 km",
    status: "Special Helpline",
    phone: "1091",
  },
  {
    name: "Local Police Station",
    distance: "6.2 km",
    status: "Emergency Desk",
    phone: "100",
  },
];

export default function PolicePage() {
  return (
    <div className="px-6 md:px-12 py-12 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Police Support
            </h2>
            <p className="text-slate-500 mt-4 text-lg font-medium">
              Law enforcement and safety assistance near you.
            </p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
            <Zap size={18} fill="currentColor" />
            Active Patrols
          </button>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {police.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/5 rounded-full -mr-8 -mt-8 pointer-events-none" />

              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-slate-900">
                <Shield size={28} />
              </div>

              <h4 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-red-600 transition-colors">
                {p.name}
              </h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                Police Department
              </p>

              <div className="flex items-center gap-2 mb-6 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="font-bold text-slate-700">{p.status}</span>
                <span className="text-slate-300 mx-1">•</span>
                <span className="font-medium text-slate-500">
                  {p.distance} away
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${p.phone}`}
                  className="bg-slate-900 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                >
                  <Phone size={16} fill="currentColor" />
                  Call Now
                </a>
                <button className="bg-white border border-slate-200 text-slate-900 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                  <Navigation size={16} />
                  Station Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
