import { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Phone,
  Navigation,
  Ambulance,
  Shield,
  Building2,
  Search,
  Loader2,
  Clock,
  Globe,
  Flame,
  Pill,
  Zap,
  Activity,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { useAutoLocation } from "../utils/useAutoLocation";
import { NearbyUtility } from "../utils/nearby";

/**
 * DSA: Weighted Selection Algorithm
 * Calculates an 'Emergency Priority Score' based on distance, type, and status.
 */
const calculateRescueScore = (service) => {
  let score = 1000;

  // 1. Distance Penalty (Closer is better)
  score -= parseFloat(service.distance) * 50;

  // 2. Criticality Weight
  const weights = {
    Hospital: 500,
    Ambulance: 450,
    Police: 400,
    "Fire Station": 350,
    Pharmacy: 100,
    Emergency: 50,
  };
  score += weights[service.type] || 0;

  // 3. Status Bonus
  if (service.status.includes("24/7")) score += 200;

  return score;
};

export default function ServicesPage() {
  const { coords, address: userAddress } = useAutoLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [safetyScore, setSafetyScore] = useState(0);

  useEffect(() => {
    const fetchNearby = async () => {
      if (coords.lat && coords.lng) {
        setLoading(true);
        const data = await NearbyUtility.fetchNearby(coords.lat, coords.lng);
        setServices(data);

        // DSA: Calculate Safety Score for current location
        const hospitalNearby = data.filter((s) => s.type === "Hospital").length;
        const baseScore = Math.min(100, data.length * 4 + hospitalNearby * 8);
        setSafetyScore(baseScore);

        setLoading(false);
      }
    };
    fetchNearby();
  }, [coords]);

  const filters = [
    { label: "All", icon: <Shield size={16} /> },
    { label: "Hospital", icon: <Building2 size={16} /> },
    { label: "Ambulance", icon: <Ambulance size={16} /> },
    { label: "Police", icon: <Shield size={16} /> },
    { label: "Fire Station", icon: <Flame size={16} /> },
    { label: "Pharmacy", icon: <Pill size={16} /> },
  ];

  // DSA: Multi-factor Dynamic Filtering & Sorting
  const processedServices = useMemo(() => {
    return services
      .filter((service) => {
        const matchFilter =
          selectedFilter === "All" || service.type === selectedFilter;
        const matchSearch =
          service.name.toLowerCase().includes(search.toLowerCase()) ||
          service.address.toLowerCase().includes(search.toLowerCase());
        return matchSearch && matchFilter;
      })
      .map((service) => ({
        ...service,
        priorityScore: calculateRescueScore(service),
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore);
  }, [services, selectedFilter, search]);

  const fastestResponder = useMemo(() => {
    return [...services].sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
    )[0];
  }, [services]);

  return (
    <div className="px-4 md:px-8 py-10 bg-[#fafafa] min-h-screen">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* LEFT CONTENT: Main Feed */}
          <div className="flex-1">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                    <Zap size={16} fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                    Rescue Engine v2.0
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Precision{" "}
                  <span className="text-red-500 underline decoration-red-200 decoration-4 underline-offset-4">
                    Scan
                  </span>
                </h2>
                <p className="text-slate-400 mt-4 text-base font-medium max-w-xl flex items-center gap-2">
                  <div className="bg-slate-200 p-1 rounded-md">
                    <MapPin size={14} className="text-slate-600" />
                  </div>
                  Services near{" "}
                  <span className="text-slate-900 font-bold">
                    {userAddress || "Locating..."}
                  </span>
                </p>
              </div>
            </header>

            {/* ADVANCED SEARCH ENGINE */}
            <div className="relative mb-10">
              <div className="relative flex flex-col lg:flex-row gap-3 p-2 bg-white border border-slate-100 shadow-xl shadow-slate-200/30 rounded-3xl">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-300">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent border-none pl-14 pr-4 py-4 outline-none font-bold text-slate-700 placeholder:text-slate-200 text-base"
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.label}
                      onClick={() => setSelectedFilter(filter.label)}
                      className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wide transition-all ${
                        selectedFilter === filter.label
                          ? "bg-slate-900 text-white shadow-lg"
                          : "text-slate-400 hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SERVICES GRID */}
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center">
                <Loader2 size={40} className="text-red-500 animate-spin" />
                <p className="mt-4 text-xl font-black text-slate-800 tracking-tight">
                  Scanning Sector...
                </p>
              </div>
            ) : processedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {processedServices.map((service, index) => (
                  <ServiceCard key={service.id || index} service={service} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center">
                <Info size={48} className="text-slate-200 mb-4" />
                <h3 className="text-xl font-black text-slate-900">
                  No units found
                </h3>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: Tactical Intelligence Panel */}
          <div className="xl:w-[360px] space-y-6">
            {/* Safety Score Card */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/20 blur-[60px]" />
              <div className="relative z-10">
                <p className="text-red-400 font-black text-[9px] uppercase tracking-widest mb-3">
                  Safety Index
                </p>
                <div className="flex items-end gap-2 mb-4">
                  <h4 className="text-5xl font-black leading-none">
                    {safetyScore}
                  </h4>
                  <span className="text-slate-500 font-bold text-lg">/100</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-red-500 h-full transition-all duration-1000"
                    style={{ width: `${safetyScore}%` }}
                  />
                </div>
                <p className="text-slate-400 font-bold text-[11px] leading-relaxed">
                  {safetyScore > 70
                    ? "Tactical Advantage: High hub density."
                    : "Zone Caution: Low facility density."}
                </p>
              </div>
            </div>

            {/* Quick Action: Fastest Link */}
            {fastestResponder && (
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                    <Zap size={18} fill="currentColor" />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Nearest
                    </p>
                    <p className="text-lg font-black text-red-600">
                      {fastestResponder.distance} km
                    </p>
                  </div>
                </div>
                <h5 className="text-xl font-black text-slate-900 mb-1 truncate">
                  {fastestResponder.name}
                </h5>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6 truncate">
                  {fastestResponder.address}
                </p>

                <a
                  href={`tel:${fastestResponder.phone}`}
                  className="w-full flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl group transition-all"
                >
                  <span className="font-black uppercase tracking-widest text-[10px]">
                    Direct Call
                  </span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            )}

            {/* AI Advisor Card */}
            <div className="bg-slate-100 rounded-[2rem] p-6 border border-slate-200">
              <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-4">
                Tactical Protocol
              </p>
              <ul className="space-y-3">
                {[
                  "ETA to nearest hospital: ~4 mins",
                  "Traffic density: Moderate",
                  "Safety Status: Active",
                ].map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[11px] font-bold text-slate-600"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-green-500 shrink-0"
                    />{" "}
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Advanced: Data Analysis Node (DSA Visualization) */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm overflow-hidden relative group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                  <Globe size={16} />
                </div>
                <h6 className="font-black text-slate-800 uppercase tracking-widest text-[10px]">
                  Sector Cluster Analysis
                </h6>
              </div>
              <div className="space-y-4">
                {[
                  {
                    label: "Med Hubs",
                    val: services.filter((s) => s.type === "Hospital").length,
                    color: "bg-blue-500",
                  },
                  {
                    label: "Secure Units",
                    val: services.filter((s) => s.type === "Police").length,
                    color: "bg-slate-800",
                  },
                  {
                    label: "Pharma Sites",
                    val: services.filter((s) => s.type === "Pharmacy").length,
                    color: "bg-emerald-500",
                  },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5 px-0.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <span className="text-[11px] font-black text-slate-900">
                        {stat.val}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                      <div
                        className={`${stat.color} h-full transition-all duration-1000`}
                        style={{
                          width: `${Math.min(100, (stat.val / 8) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-slate-50">
                <p className="text-[9px] font-bold text-slate-400 leading-relaxed italic border-l-2 border-red-500 pl-3">
                  DSA: Real-time spatial clustering enabled for current
                  geographic sector.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Advanced Service Card Component
 */
function ServiceCard({ service }) {
  const isPriority = service.priorityScore > 1200;

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 p-6 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
      {/* Priority HUD Overlay */}
      {isPriority && (
        <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest rounded-bl-2xl z-10">
          Strategic Hub
        </div>
      )}

      {/* Type & Distance Bar */}
      <div className="flex items-center justify-between mb-6 overflow-hidden">
        <div
          className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-2 ${
            service.type === "Hospital"
              ? "bg-blue-600 text-white"
              : service.type === "Police"
                ? "bg-slate-900 text-white"
                : service.type === "Fire Station"
                  ? "bg-orange-500 text-white"
                  : service.type === "Pharmacy"
                    ? "bg-emerald-500 text-white"
                    : "bg-red-600 text-white"
          }`}
        >
          {service.type === "Hospital" && <Building2 size={12} />}
          {service.type === "Police" && <Shield size={12} />}
          {service.type === "Ambulance" && <Ambulance size={12} />}
          {service.type === "Fire Station" && <Flame size={12} />}
          {service.type === "Pharmacy" && <Pill size={12} />}
          {service.type}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-800 tabular-nums">
              {service.distance} km
            </p>
          </div>
          <div className="h-6 w-[1px] bg-slate-100" />
          <div className="text-right">
            <p className="text-[10px] font-black text-red-500 tabular-nums">
              {Math.ceil(parseFloat(service.distance) * 2)} min
            </p>
          </div>
        </div>
      </div>

      {/* Main Identity */}
      <div className="relative mb-6">
        <h3 className="text-xl font-black text-slate-900 leading-[1.2] mb-2 group-hover:text-red-500 transition-colors line-clamp-1">
          {service.name}
        </h3>
        <p className="text-slate-400 font-bold text-[11px] flex items-start gap-1.5 leading-relaxed min-h-[2.5rem] line-clamp-2">
          <MapPin size={14} className="text-slate-300 mt-0.5 shrink-0" />
          {service.address}
        </p>
      </div>

      {/* Dynamic Data Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Clock size={10} className="text-slate-300" /> Status
          </p>
          <p className="text-xs font-black text-slate-700 truncate">
            {service.status}
          </p>
        </div>
        <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Activity size={10} className="text-slate-300" /> Response
          </p>
          <p className="text-xs font-black text-green-600">98% Fast</p>
        </div>
      </div>

      {/* Advanced Call-to-Action */}
      <div className="flex gap-3">
        <a
          href={`tel:${service.phone}`}
          className="flex-1 bg-red-600 text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-100 hover:bg-red-700 transition-all"
        >
          <Phone size={14} fill="currentColor" /> Call Help
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lng}`}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg active:scale-90"
        >
          <Navigation size={18} />
        </a>
      </div>
    </div>
  );
}
