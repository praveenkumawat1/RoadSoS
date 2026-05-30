import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Shield,
  Bot,
  PhoneCall,
  Ambulance,
  MapPinned,
  Menu,
  X,
  User,
  MapPin,
  ChevronDown,
  Navigation,
  Globe,
  LocateFixed,
  Share2,
  ExternalLink,
} from "lucide-react";

import FirstAidWindow from "./FirstAidWindow";
import { SessionManager } from "../utils/session";
import { useAutoLocation } from "../utils/useAutoLocation";

export default function AppLayout({ onNavigateSOS }) {
  const location = useLocation();
  const { address, locationData, coords, loading } = useAutoLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [firstAidOpen, setFirstAidOpen] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [toast, setToast] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Check for active session cookie
    const token = SessionManager.getSession();
    if (token) {
      setSessionActive(true);
    }
  }, [location]);

  useEffect(() => {
    function onOfflineReady() {
      setToast({ key: "offline", message: "App cached — works offline." });
      setTimeout(() => setToast(null), 4500);
    }

    function onUpdateAvailable() {
      setUpdateAvailable(true);
      setToast({ key: "update", message: "Update available — tap to apply." });
    }

    window.addEventListener("app-offline-ready", onOfflineReady);
    window.addEventListener("app-update-available", onUpdateAvailable);

    // network status
    function onOnline() {
      setToast({ key: "online", message: "Back online" });
      setTimeout(() => setToast(null), 3000);
    }
    function onOffline() {
      setToast({ key: "offline-status", message: "You are offline" });
    }
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("app-offline-ready", onOfflineReady);
      window.removeEventListener("app-update-available", onUpdateAvailable);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Services", path: "/services" },
    { name: "Survival Kit", path: "/survival-kit" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col selection:bg-red-100 selection:text-red-600">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 md:px-10 py-4">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="bg-red-500 p-2.5 rounded-2xl text-white shadow-lg shadow-red-200 group-hover:scale-105 transition-transform">
              <Shield size={22} fill="currentColor" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Road<span className="text-red-500">SoS</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">
                Emergency Response
              </span>
            </div>
          </Link>

          {/* LOCATION SELECTOR (Uber style) */}
          <div
            onClick={() => setShowLocationPopup(true)}
            className="hidden lg:flex items-center gap-2 group cursor-pointer max-w-xs transition-all hover:bg-slate-50 p-2 rounded-2xl"
          >
            <div className="bg-slate-100 p-2 rounded-xl text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
              <MapPin size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                Detected Location
              </span>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xs font-bold text-slate-700 truncate max-w-[150px] ${loading ? "animate-pulse" : ""}`}
                >
                  {loading
                    ? "Locating..."
                    : `${locationData.city || ""}${locationData.state ? ", " + locationData.state : ""}`}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* STATUS INDICATOR (REMOVED) */}

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Emergency Call */}
            <a
              href="tel:112"
              className="hidden lg:flex items-center gap-2 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-50 transition-colors"
            >
              <PhoneCall size={18} />
              112
            </a>

            {/* SOS BUTTON */}
            <button
              onClick={onNavigateSOS}
              className="bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white px-6 py-2.5 rounded-full font-black shadow-[0_8px_20px_-4px_rgba(220,38,38,0.4)] flex items-center gap-2 group"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-ping group-hover:scale-125 transition-transform" />
              SOS
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="md:hidden absolute top-20 left-6 right-6 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenu(false)}
                className={`px-4 py-3 rounded-2xl text-base font-semibold ${
                  location.pathname === link.path
                    ? "bg-red-50 text-red-600"
                    : "text-slate-600 active:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-2 border-slate-100" />
            <a
              href="tel:112"
              className="flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-2xl font-bold"
            >
              <PhoneCall size={20} />
              Call Emergency 112
            </a>
          </div>
        )}
      </nav>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* FIRST AID FLOATING BUTTON */}
      <button
        onClick={() => setFirstAidOpen(true)}
        className="fixed bottom-8 right-8 z-[60] bg-slate-900 text-white p-4 pr-6 rounded-[2rem] flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all group border border-white/10"
        title="First Aid Assistant"
      >
        <div className="bg-red-500 p-2 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-red-500/20">
          <Bot size={24} />
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Assistant
          </span>
          <span className="text-sm font-black">Get First Aid</span>
        </div>
        <div className="bg-white/10 w-2 h-2 rounded-full border border-white/20 animate-pulse ml-2" />
      </button>

      {/* FIRST AID WINDOW */}
      <FirstAidWindow
        open={firstAidOpen}
        onClose={() => setFirstAidOpen(false)}
      />

      {/* TOAST */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-[120] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="font-bold">{toast.message}</div>
            {updateAvailable && (
              <button
                onClick={() => {
                  // call the update function exposed on window
                  if (window.__updateSW) {
                    window.__updateSW(true).then(() => {
                      window.location.reload();
                    });
                  } else {
                    window.location.reload();
                  }
                }}
                className="ml-4 bg-red-600 px-3 py-1 rounded text-sm font-bold"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      )}

      {/* LOCATION POPUP MODAL */}
      {showLocationPopup && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-end md:justify-center p-0 md:p-6 bg-slate-900/40 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg md:rounded-[2.5rem] rounded-t-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden border-t md:border border-white/20 flex flex-col animate-in zoom-in-95 slide-in-from-bottom-20 duration-500 max-h-[92vh]">
            {/* Header: Compact & Professional */}
            <div className="px-6 py-5 flex items-center justify-between bg-white border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2.5 bg-red-500 text-white rounded-xl shadow-lg shadow-red-200">
                    <MapPin size={20} />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none">
                    GPS Details
                  </h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Satellite Verified
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLocationPopup(false)}
                className="p-2 bg-slate-50 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 group"
              >
                <X
                  size={18}
                  className="group-hover:rotate-90 transition-transform"
                />
              </button>
            </div>

            {/* Content Area: Scrollable for small screens */}
            <div className="overflow-y-auto flex-1 thin-scrollbar">
              {/* Map Preview: Responsive Height */}
              <div className="relative h-44 md:h-52 bg-slate-200">
                <a
                  href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 group overflow-hidden"
                >
                  <iframe
                    title="Location Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                    className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  ></iframe>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl flex items-center gap-2 group-hover:bg-white/20 transition-all">
                      <Navigation size={14} className="text-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        Tap for Maps
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Address Container */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 group">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Globe size={10} /> Region
                    </p>
                    <p className="font-bold text-slate-800 text-base truncate">
                      {locationData.city || "Fetching..."}
                    </p>
                    <p className="text-[10px] font-semibold text-slate-400 truncate">
                      {locationData.state || "Connect..."}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 group">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <LocateFixed size={10} /> Zip Code
                    </p>
                    <p className="font-bold text-slate-800 text-base">
                      {locationData.pincode || "..."}
                    </p>
                    <p className="text-[10px] font-semibold text-green-600 uppercase">
                      Live Area A-1
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100/50 relative group">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                    Detailed Address
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <MapPin size={16} className="text-red-500" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 leading-snug">
                      {loading ? (
                        <span className="flex items-center gap-2 italic text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
                          Syncing coordinates...
                        </span>
                      ) : (
                        address
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 bg-slate-50/50 flex gap-3">
              <button
                onClick={() => {
                  const shareText = `Emergency SOS! Location: ${address}. Maps: https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
                  if (navigator.share) {
                    navigator.share({ title: "My Location", text: shareText });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    alert("Copied to clipboard!");
                  }
                }}
                className="w-14 h-14 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center shrink-0 active:scale-90"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={() => setShowLocationPopup(false)}
                className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                Close Radar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/home" className="flex items-center gap-3 mb-6">
              <div className="bg-red-500 p-2 rounded-xl text-white">
                <Shield size={20} fill="currentColor" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Road<span className="text-red-500">SoS</span>
              </h1>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              India's first offline-capable emergency response network. Saving
              lives through technology, one tap at a time.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li>
                <Link
                  to="/hospitals"
                  className="hover:text-red-500 transition-colors"
                >
                  Find Hospitals
                </Link>
              </li>
              <li>
                <Link
                  to="/ambulance"
                  className="hover:text-red-500 transition-colors"
                >
                  Call Ambulance
                </Link>
              </li>
              <li>
                <Link
                  to="/police"
                  className="hover:text-red-500 transition-colors"
                >
                  Contact Police
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-red-500 transition-colors"
                >
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li>
                <Link
                  to="/about"
                  className="hover:text-red-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-red-500 transition-colors"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <button className="hover:text-red-500 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-red-500 transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-slate-500 text-sm mb-4">
              Get safety tips and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-slate-100 border-none rounded-xl px-4 py-2 text-sm w-full focus:ring-2 focus:ring-red-500/20 outline-none"
              />
              <button className="bg-slate-900 text-white p-2 rounded-xl hover:bg-slate-800 transition-colors">
                <Shield size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">
          <p>© 2026 ROADSOS INDIA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <button className="hover:text-slate-900 transition-colors">
              Twitter
            </button>
            <button className="hover:text-slate-900 transition-colors">
              Instagram
            </button>
            <button className="hover:text-slate-900 transition-colors">
              GitHub
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
