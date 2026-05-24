import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Shield,
  Bot,
  PhoneCall,
  Ambulance,
  MapPinned,
  Menu,
  X,
} from "lucide-react";

import FirstAidWindow from "./FirstAidWindow";

export default function AppLayout({ onNavigateSOS }) {
  const location = useLocation();

  const [showInjuryAssistant, setShowInjuryAssistant] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-red-50 to-orange-50 font-sans flex flex-col">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-red-100 shadow-sm px-6 md:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-2xl text-white shadow-lg">
              <Shield size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Road<span className="text-red-500">SoS</span>
              </h1>

              <p className="text-xs text-gray-500 -mt-1">
                Smart Emergency Response
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition duration-200 hover:text-red-500 ${
                  location.pathname === link.path
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            {/* Emergency Call */}
            <a
              href="tel:112"
              className="hidden md:flex items-center gap-2 bg-white border border-red-200 text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-red-50 transition"
            >
              <PhoneCall size={18} />
              112
            </a>

            {/* SOS BUTTON */}
            <button
              onClick={onNavigateSOS}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 hover:shadow-xl transition duration-300 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg"
            >
              SOS
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="md:hidden mt-5 flex flex-col gap-4 bg-white rounded-2xl p-5 shadow-lg border border-red-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenu(false)}
                className={`font-medium ${
                  location.pathname === link.path
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <a
              href="tel:112"
              className="flex items-center gap-2 text-red-600 font-semibold mt-2"
            >
              <PhoneCall size={18} />
              Call Emergency 112
            </a>
          </div>
        )}
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ================= QUICK EMERGENCY PANEL ================= */}
      <div className="fixed bottom-24 right-6 z-40 hidden md:flex flex-col gap-4">
        <button className="w-14 h-14 rounded-2xl bg-blue-500 hover:scale-110 transition shadow-2xl text-white flex items-center justify-center">
          <Ambulance size={24} />
        </button>

        <button className="w-14 h-14 rounded-2xl bg-green-500 hover:scale-110 transition shadow-2xl text-white flex items-center justify-center">
          <MapPinned size={24} />
        </button>
      </div>

      {/* ================= AI INJURY ASSISTANT ================= */}
      <button
        type="button"
        onClick={() => setShowInjuryAssistant(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:scale-110 transition duration-300 text-white shadow-2xl flex items-center justify-center"
        aria-label="Open AI Injury Assistant"
      >
        <Bot size={26} />
      </button>

      <FirstAidWindow
        open={showInjuryAssistant}
        onClose={() => setShowInjuryAssistant(false)}
      />


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 text-white px-6 md:px-12 py-12 mt-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-red-500 p-3 rounded-2xl">
                <Shield size={24} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Road<span className="text-red-500">SoS</span>
                </h2>

                <p className="text-gray-400 text-sm">
                  Every Second Saves A Life
                </p>
              </div>
            </div>

            <p className="text-gray-400 mt-5 leading-relaxed">
              RoadSoS is an emergency-focused safety platform designed to help
              people during road accidents and critical situations with instant
              SOS support, emergency contacts, GPS tracking, and nearby medical
              assistance.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link
                to="/"
                className="hover:text-red-400 transition duration-200"
              >
                Home
              </Link>

              <Link
                to="/services"
                className="hover:text-red-400 transition duration-200"
              >
                Emergency Services
              </Link>

              <Link
                to="/how-it-works"
                className="hover:text-red-400 transition duration-200"
              >
                How It Works
              </Link>

              <Link
                to="/about"
                className="hover:text-red-400 transition duration-200"
              >
                About RoadSoS
              </Link>
            </div>
          </div>

          {/* EMERGENCY INFO */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Emergency Contacts
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">National Emergency</p>
                <h4 className="text-2xl font-bold text-red-500">112</h4>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">Ambulance</p>
                <h4 className="text-2xl font-bold text-green-400">108</h4>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 RoadSoS India. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              to="/about"
              className="hover:text-red-400 transition duration-200"
            >
              Privacy Policy
            </Link>

            <Link
              to="/about"
              className="hover:text-red-400 transition duration-200"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/about"
              className="hover:text-red-400 transition duration-200"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
