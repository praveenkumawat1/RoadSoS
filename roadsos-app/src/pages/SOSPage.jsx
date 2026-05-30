import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Ambulance,
  Phone,
  Shield,
  X,
  MapPin,
  Activity,
  Wifi,
  LocateFixed,
  Zap,
  Loader2,
  MessageSquare,
  Wrench,
  Building2,
  CheckCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import FirstAidWindow from "../components/FirstAidWindow";
import { useAutoLocation } from "../utils/useAutoLocation";
import { NearbyUtility } from "../utils/nearby";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

// Initialize Socket.IO
const socket = io(API_BASE || window.location.origin, {
  autoConnect: false,
  reconnectionAttempts: 5,
});

export default function SOSPage() {
  const navigate = useNavigate();

  const [showFirstAid, setShowFirstAid] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [modalView, setModalView] = useState("directory"); // 'directory' or 'config' or 'results'
  const [broadcastTarget, setBroadcastTarget] = useState("All"); // 'All', 'Police', 'Hospital', etc.
  const [contactedUnits, setContactedUnits] = useState([]);
  const [broadcastMode, setBroadcastMode] = useState("sms"); // 'sms' or 'call'
  const [sosMessage, setSosMessage] = useState(
    "EMERGENCY! I need immediate assistance at my live location.",
  );
  const [isSending, setIsSending] = useState(false);

  const { coords, address, loading: isLocating } = useAutoLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [nearbyServices, setNearbyServices] = useState([]);
  const [scanLoading, setScanLoading] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [visibleCount, setVisibleCount] = useState(0);

  const openBroadcast = (target = "All") => {
    setBroadcastTarget(target);
    setContactedUnits([]);
    setModalView(target === "All" ? "config" : "directory");
    setShowBroadcastModal(true);
  };

  const handleBroadcast = async () => {
    setIsSending(true);

    // Filter services based on target
    const targetServices =
      broadcastTarget === "All"
        ? nearbyServices
        : nearbyServices.filter((s) => s.type === broadcastTarget);

    // Extract phone numbers
    const contacts = targetServices
      .map((s) => s.phone)
      .filter((p) => p && p !== "Unavailable");

    if (contacts.length === 0) {
      alert(`No active ${broadcastTarget} units found in vicinity.`);
      setIsSending(false);
      return;
    }

    const endpoint =
      broadcastMode === "sms" ? "/api/broadcast-sos" : "/api/broadcast-call";

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: sosMessage,
          contacts,
          location: address || `${coords.lat}, ${coords.lng}`,
          senderName: "RoadSOS User",
        }),
      });

      if (response.ok) {
        setContactedUnits(
          targetServices.filter((s) => s.phone !== "Unavailable"),
        );
        setModalView("results");
      } else {
        alert("Operation failed. Ensure Twilio keys are configured in .env");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Could not connect to emergency server.");
    } finally {
      setIsSending(false);
    }
  };

  // Animation logic to show nodes one by one
  useEffect(() => {
    if (!scanLoading && nearbyServices.length > 0) {
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev < nearbyServices.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 350);
      return () => {
        clearInterval(interval);
        setVisibleCount(0); // Clean up on unmount or re-run
      };
    }
  }, [scanLoading, nearbyServices]);

  // Simulated Biometric Stream
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => setIsOnline(true));
    socket.on("connect_error", () => setIsOnline(false));

    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  // Fetch nearby services
  useEffect(() => {
    const scanArea = async () => {
      if (coords.lat && coords.lng) {
        setScanLoading(true);
        // Simulate scanning delay to show animation
        const timer = setTimeout(async () => {
          const services = await NearbyUtility.fetchNearby(
            coords.lat,
            coords.lng,
            3000,
          );
          setNearbyServices(services);
          setScanLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
      }
    };
    scanArea();
  }, [coords.lat, coords.lng]);

  return (
    <div className="relative h-screen w-full bg-[#0a0f18] overflow-hidden font-sans select-none flex flex-col sm:flex-row items-center justify-between py-10 px-6 sm:py-6">
      {/* Top Header - Mobile Only or Overlay */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[60] sm:static sm:w-auto sm:flex-col sm:h-full sm:justify-start sm:pt-4 sm:gap-6">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white active:scale-95 transition-all hover:bg-white/10"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center sm:hidden">
          <h2 className="text-white text-[10px] font-black uppercase tracking-[0.3em] opacity-80">
            Emergency System
          </h2>
          <div className="flex items-center gap-2">
            <div
              className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"} animate-pulse`}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl text-white sm:flex-col sm:p-4">
          <Activity size={24} className="text-red-500 animate-pulse" />
          <div className="text-right sm:text-center">
            <p className="text-[8px] font-black text-white/40 uppercase leading-none mb-1">
              Pulse
            </p>
            <p className="text-xs font-black text-red-500 tabular-nums leading-none">
              {heartRate}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Action Buttons (Left Side) - Polished Glassmorph */}
      <div className="hidden sm:flex flex-col gap-4 z-50 ml-4">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-4 backdrop-blur-[50px] shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col gap-6 items-center border-t-white/20">
          <button className="group flex flex-col items-center gap-2 transition-all">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-blue-600/20 group-hover:text-blue-400 group-hover:border-blue-500/50 transition-all duration-500 shadow-inner">
              <Phone size={22} />
            </div>
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors">
              Family
            </span>
          </button>

          <button
            onClick={() => openBroadcast("Police")}
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-orange-600/20 group-hover:text-orange-400 group-hover:border-orange-500/50 transition-all duration-500 shadow-inner">
              <Shield size={22} />
            </div>
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-orange-400 transition-colors">
              Police
            </span>
          </button>

          {/* SOS Primary Button - More Pop */}
          <button
            onClick={() => openBroadcast("All")}
            className="relative group active:scale-95 transition-all my-2"
          >
            <div className="absolute -inset-6 bg-red-600/30 rounded-full blur-3xl animate-pulse group-hover:bg-red-600/50" />
            <div className="relative w-22 h-22 bg-gradient-to-br from-red-500 to-red-700 rounded-[2rem] flex items-center justify-center text-white shadow-[0_10px_40px_rgba(220,38,38,0.5)] border-4 border-white/30 group-hover:border-white/50 transition-all">
              <Zap
                size={40}
                fill="white"
                className="group-hover:scale-110 transition-transform"
              />
            </div>
          </button>

          <button
            onClick={() => openBroadcast("Hospital")}
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-red-500/20 group-hover:text-red-400 group-hover:border-red-500/50 transition-all duration-500 shadow-inner">
              <Ambulance size={22} />
            </div>
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-red-400 transition-colors">
              Medical
            </span>
          </button>

          <button
            onClick={() => openBroadcast("Vehicle Rescue")}
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-emerald-600/20 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all duration-500 shadow-inner">
              <Wrench size={22} />
            </div>
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors">
              Rescue
            </span>
          </button>
        </div>
      </div>

      {/* Central Location HUD */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center sm:scale-110">
        {/* Animated Rings - Multiple Layers */}
        <div className="absolute w-[600px] h-[600px] border border-white/[0.02] rounded-full" />
        <div className="absolute w-[560px] h-[560px] border border-white/[0.05] rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[460px] h-[460px] border border-white/10 rounded-full" />
        <div className="absolute w-[370px] h-[370px] border border-white/5 rounded-full border-dashed animate-[spin_40s_linear_infinite]" />

        {/* Orbital Scanning Line */}
        {scanLoading && (
          <div className="absolute w-[600px] h-[600px] border-2 border-blue-500/20 rounded-full animate-[spin_3s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6]" />
          </div>
        )}

        {/* Multi-Layer Orbital Services */}
        {!scanLoading &&
          nearbyServices.length > 0 &&
          nearbyServices.slice(0, 18).map((service, idx) => {
            if (idx >= visibleCount) return null;

            // Distribute across two layers: 8 on inner, remaining on outer (up to 10)
            const isOuter = idx >= 8;
            const radius = isOuter ? 280 : 185;
            const itemsInThisLayer = isOuter
              ? Math.min(nearbyServices.length - 8, 10)
              : Math.min(nearbyServices.length, 8);
            const idxInLayer = isOuter ? idx - 8 : idx;

            // Add a small rotation offset to the outer layer so they don't line up exactly with inner
            const angle =
              (idxInLayer / itemsInThisLayer) * 360 + (isOuter ? 22.5 : 0);

            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

            return (
              <div
                key={idx}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className="absolute z-20 flex flex-col items-center animate-in fade-in zoom-in duration-500"
              >
                {/* Node Icon */}
                <button
                  onClick={() =>
                    window.open(`tel:${service.phone || "911"}`, "_self")
                  }
                  className={`p-4 rounded-full border-2 backdrop-blur-3xl shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 active:scale-90 relative z-20 group/btn ${
                    service.type === "Hospital"
                      ? "bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/40 hover:border-blue-500 hover:shadow-[0_0_30px_#3b82f644]"
                      : service.type === "Police"
                        ? "bg-orange-600/20 border-orange-500/30 text-orange-400 hover:bg-orange-600/40 hover:border-orange-500 hover:shadow-[0_0_30px_#f9731644]"
                        : "bg-red-600/20 border-red-500/30 text-red-500 hover:bg-red-600/40 hover:border-red-500 hover:shadow-[0_0_30px_#ef444444]"
                  }`}
                >
                  <div className="absolute inset-0 rounded-full animate-pulse opacity-20 bg-current" />
                  {service.type === "Hospital" ? (
                    <Building2 size={22} className="relative z-10" />
                  ) : service.type === "Police" ? (
                    <Shield size={22} className="relative z-10" />
                  ) : (
                    <Ambulance size={22} className="relative z-10" />
                  )}

                  {/* Metadata Label - Always Visible but compact */}
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                    <span className="text-[10px] font-black text-white/90 uppercase tracking-tight whitespace-nowrap bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/5">
                      {service.name.split(" ")[0]}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-black text-emerald-400 tabular-nums">
                        {service.distance}KM
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}

        {/* Main Center Signal - The Core */}
        <div className="relative z-30 w-52 h-52 bg-gradient-to-tr from-red-600 to-red-500 rounded-full shadow-[0_0_120px_rgba(220,38,38,0.6)] flex items-center justify-center border-[10px] border-white/10 group active:scale-95 transition-all outline outline-offset-8 outline-red-500/10">
          <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse opacity-20" />

          {/* Energy Core */}
          <div className="absolute inset-[15%] border-2 border-white/20 rounded-full animate-[ping_4s_linear_infinite] opacity-30" />
          <div className="absolute inset-[5%] border-2 border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />

          <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-all duration-500">
            <MapPin
              size={68}
              className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
              fill="currentColor"
            />
            <span className="text-[10px] font-black text-white/80 tracking-[0.2em] uppercase mt-1">
              Active
            </span>
          </div>

          {/* Compass Rings */}
          <div className="absolute -inset-10 border border-dashed border-white/5 rounded-full animate-[spin_30s_linear_infinite] opacity-50" />
          <div className="absolute -inset-4 border-2 border-white/10 rounded-full animate-[spin_15s_linear_infinite]" />

          {/* Pulsing Outer Aura */}
          <div className="absolute -inset-14 bg-red-600/10 rounded-full animate-ping opacity-10" />
        </div>

        {/* Dashboard Readout Overlay - High Precision Data */}
        <div className="absolute -bottom-40 w-full flex flex-col items-center">
          <div className="bg-[#0f172a]/90 backdrop-blur-[100px] px-8 py-5 rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-w-[95vw] group hover:border-blue-500/50 transition-all duration-700 relative overflow-hidden">
            {/* Top scanning line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[scan_2s_linear_infinite]" />

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
                  <LocateFixed
                    size={22}
                    className="text-blue-400 animate-pulse"
                  />
                </div>
                <span className="text-[7px] font-black text-blue-500/50 uppercase mt-2">
                  Signal
                </span>
              </div>

              <div className="h-10 w-[1px] bg-white/10" />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em]">
                    Satellite Link Secured
                  </p>
                </div>
                <p className="text-white font-black text-sm tracking-tight truncate max-w-[320px] drop-shadow-sm">
                  {isLocating
                    ? "RE-CALIBRATING ORBITAL POSITION..."
                    : address || "DOWNTOWN NODE - SECTOR 7"}
                </p>
              </div>

              <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

              <div className="hidden sm:flex flex-col items-end opacity-60">
                <p className="text-[8px] font-black text-white/40 uppercase">
                  Latency
                </p>
                <p className="text-[12px] font-black text-blue-400 tabular-nums">
                  24MS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Only Action Tray (Bottom) */}
      <div className="sm:hidden w-full max-w-sm z-50 mt-12 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-2 backdrop-blur-3xl shadow-2xl">
          <div className="flex justify-between items-center px-1">
            {/* Simplified Mobile Icons */}
            <button
              onClick={() => openBroadcast("Family")}
              className="p-4 rounded-2xl bg-white/5 text-white/40 hover:text-white"
            >
              <Phone size={20} />
            </button>
            <button
              onClick={() => openBroadcast("Police")}
              className="p-4 rounded-2xl bg-white/5 text-white/40 hover:text-orange-400"
            >
              <Shield size={20} />
            </button>
            <button
              onClick={() => openBroadcast("All")}
              className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center text-white shadow-lg border-2 border-white/20 active:scale-90 transition-transform"
            >
              <Zap size={28} fill="white" />
            </button>
            <button
              onClick={() => openBroadcast("Hospital")}
              className="p-4 rounded-2xl bg-white/5 text-white/40 hover:text-blue-400"
            >
              <Ambulance size={20} />
            </button>
            <button
              onClick={() => openBroadcast("Vehicle Rescue")}
              className="p-4 rounded-2xl bg-white/5 text-white/40 hover:text-emerald-400"
            >
              <Wrench size={20} />
            </button>
          </div>
        </div>
      </div>

      {showFirstAid && (
        <FirstAidWindow onClose={() => setShowFirstAid(false)} />
      )}

      {/* Real Emergency Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => !isSending && setShowBroadcastModal(false)}
          />
          <div className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 shadow-[0_50px_100px_rgba(0,0,0,0.8)] animate-in zoom-in duration-300 overflow-hidden">
            {/* Background Glow */}
            <div
              className={`absolute -top-24 -right-24 w-48 h-48 blur-[100px] opacity-20 ${broadcastTarget === "Police" ? "bg-orange-500" : broadcastTarget === "Hospital" ? "bg-blue-500" : "bg-red-500"}`}
            />

            {modalView === "results" ? (
              <div className="flex flex-col items-center text-center animate-in slide-in-from-right-4 duration-500">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/30">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
                  Broadcast Success
                </h3>
                <p className="text-white/40 text-xs font-medium mb-6">
                  Successfully contacted{" "}
                  <span className="text-white font-bold">
                    {contactedUnits.length}
                  </span>{" "}
                  {broadcastTarget === "All" ? "Emergency" : broadcastTarget}{" "}
                  units.
                </p>

                {/* Contact List */}
                <div className="w-full max-h-[300px] overflow-y-auto no-scrollbar space-y-3 mb-8 px-2">
                  {contactedUnits.map((unit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div
                          className={`p-2 rounded-xl bg-opacity-20 ${unit.type === "Police" ? "bg-orange-500 text-orange-400" : unit.type === "Hospital" ? "bg-blue-500 text-blue-400" : "bg-red-500 text-red-500"}`}
                        >
                          {unit.type === "Police" ? (
                            <Shield size={16} />
                          ) : unit.type === "Hospital" ? (
                            <Building2 size={16} />
                          ) : (
                            <Ambulance size={16} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-black text-white uppercase truncate max-w-[180px]">
                            {unit.name}
                          </p>
                          <p className="text-[9px] text-white/40 font-bold tabular-nums">
                            {unit.phone}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`tel:${unit.phone}`, "_self");
                        }}
                        className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        <Phone size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowBroadcastModal(false)}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase text-xs rounded-2xl transition-all"
                >
                  Dismiss Console
                </button>
              </div>
            ) : modalView === "directory" ? (
              <div className="flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${
                    broadcastTarget === "Police"
                      ? "bg-orange-600/20 text-orange-500 border-orange-500/30"
                      : broadcastTarget === "Hospital"
                        ? "bg-blue-600/20 text-blue-500 border-blue-500/30"
                        : "bg-red-600/20 text-red-500 border-red-500/30"
                  }`}
                >
                  {broadcastTarget === "Police" ? (
                    <Shield size={32} />
                  ) : broadcastTarget === "Hospital" ? (
                    <Building2 size={32} />
                  ) : (
                    <Ambulance size={32} />
                  )}
                </div>

                <h3 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Nearby {broadcastTarget} Units
                </h3>
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6">
                  Scanning Local sector for active personnel
                </p>

                <div className="w-full max-h-[350px] overflow-y-auto no-scrollbar space-y-3 mb-8 px-2">
                  {nearbyServices
                    .filter(
                      (s) =>
                        broadcastTarget === "All" || s.type === broadcastTarget,
                    )
                    .map((unit, idx) => (
                      <div
                        key={idx}
                        className="relative group p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all border-l-4 border-l-emerald-500/50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="text-xs font-black text-white uppercase truncate">
                              {unit.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 rounded-md">
                                <MapPin size={8} className="text-emerald-500" />
                                <span className="text-[8px] font-black text-emerald-500 uppercase">
                                  {unit.distance} KM
                                </span>
                              </div>
                              <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter truncate max-w-[120px]">
                                {unit.address}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              window.open(`tel:${unit.phone}`, "_self")
                            }
                            className="p-3 bg-emerald-500/20 text-emerald-500 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-900/20"
                          >
                            <Phone size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 pt-2 border-t border-white/5 mt-2">
                          <div className="flex-1">
                            <p className="text-[8px] font-black text-white/20 uppercase mb-0.5">
                              Verified ID / Contact
                            </p>
                            <p className="text-[10px] font-bold text-white/60">
                              {unit.phone === "Unavailable"
                                ? "LINE ENCRYPTED"
                                : unit.phone}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                            <div className="w-1 h-1 rounded-full bg-emerald-500/20" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <button
                    onClick={() => setShowBroadcastModal(false)}
                    className="py-4 bg-white/5 hover:bg-white/10 text-white/40 font-black uppercase text-[10px] rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setModalView("config")}
                    className={`py-4 text-white font-black uppercase text-[10px] rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                      broadcastTarget === "Police"
                        ? "bg-orange-600 hover:bg-orange-500"
                        : broadcastTarget === "Hospital"
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "bg-red-600 hover:bg-red-500"
                    }`}
                  >
                    <Zap size={14} fill="white" />
                    Mass Alert All
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 border animate-pulse ${
                    broadcastTarget === "Police"
                      ? "bg-orange-600/20 text-orange-500 border-orange-500/30"
                      : broadcastTarget === "Hospital"
                        ? "bg-blue-600/20 text-blue-500 border-blue-500/30"
                        : "bg-red-600/20 text-red-500 border-red-500/30"
                  }`}
                >
                  {broadcastTarget === "Police" ? (
                    <Shield size={40} />
                  ) : broadcastTarget === "Hospital" ? (
                    <Building2 size={40} />
                  ) : (
                    <AlertTriangle size={40} />
                  )}
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
                  {broadcastTarget === "All" ? "Emergency" : broadcastTarget}{" "}
                  Broadcast
                </h3>
                <p className="text-white/40 text-xs font-medium leading-relaxed mb-6">
                  Targeting{" "}
                  <span className="text-white font-bold">
                    {broadcastTarget === "All"
                      ? nearbyServices.length
                      : nearbyServices.filter((s) => s.type === broadcastTarget)
                          .length}
                  </span>{" "}
                  nearby {broadcastTarget.toLowerCase()} response units.
                </p>

                {/* Toggle Options: SMS or Call */}
                <div className="flex bg-white/5 p-1 rounded-2xl w-full mb-8 border border-white/5">
                  <button
                    onClick={() => setBroadcastMode("sms")}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                      broadcastMode === "sms"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <MessageSquare size={14} />
                    Radio SMS
                  </button>
                  <button
                    onClick={() => setBroadcastMode("call")}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                      broadcastMode === "call"
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <Phone size={14} />
                    Voice Call
                  </button>
                </div>

                <div className="w-full space-y-4 mb-8">
                  {broadcastMode === "sms" && (
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 animate-in slide-in-from-bottom-2">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-2">
                        Message Payload
                      </span>
                      <textarea
                        value={sosMessage}
                        onChange={(e) => setSosMessage(e.target.value)}
                        className="w-full bg-transparent text-white font-bold text-sm resize-none focus:outline-none"
                        rows="3"
                      />
                    </div>
                  )}

                  {broadcastMode === "call" && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 animate-in slide-in-from-bottom-2 text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Wifi
                          size={16}
                          className="text-emerald-500 animate-pulse"
                        />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                          Audio Relay Active
                        </span>
                      </div>
                      <p className="text-white/70 text-[11px] leading-relaxed italic">
                        "Emergency from RoadSOS. {broadcastTarget} assistance
                        required at {address || "current location"}.
                        Repeating..."
                      </p>
                    </div>
                  )}

                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3 text-left">
                    <MapPin size={18} className="text-emerald-500" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block">
                        Vector Lock
                      </span>
                      <p className="text-xs text-white/60 font-medium truncate">
                        {address || "Acquiring Coordinates..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <button
                    disabled={isSending}
                    onClick={() =>
                      broadcastTarget === "All"
                        ? setShowBroadcastModal(false)
                        : setModalView("directory")
                    }
                    className="py-4 bg-white/5 hover:bg-white/10 text-white/60 font-black uppercase text-xs rounded-2xl transition-all"
                  >
                    {broadcastTarget === "All" ? "Abort" : "Back"}
                  </button>
                  <button
                    disabled={isSending || isLocating}
                    onClick={handleBroadcast}
                    className={`py-4 text-white font-black uppercase text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                      broadcastMode === "sms"
                        ? "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20"
                        : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20"
                    }`}
                  >
                    {isSending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Linking...
                      </>
                    ) : (
                      <>
                        <Zap size={16} fill="white" />
                        Init {broadcastMode === "sms" ? "SMS" : "Call"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global CSS for scanning animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
}
