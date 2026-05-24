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

  // Scroll to Core Features section
  const handleExploreClick = () => {
    featuresRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Open SOS Page
  const handleEmergencyClick = () => {
    navigate("/sos");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 px-6 py-12">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-[32px] shadow-2xl border border-red-100 overflow-hidden">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 md:px-14 py-14">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Shield size={18} />
            RoadSoS India
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Every Second <br /> Can Save A Life
          </h1>

          <p className="mt-6 text-lg md:text-xl text-red-100 max-w-3xl leading-relaxed">
            RoadSoS is an intelligent road emergency and safety platform
            designed for India. The app helps people during accidents and
            emergencies by providing instant SOS alerts, emergency contacts,
            nearby hospitals, ambulance access, and real-time location sharing.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            {/* Explore Features Button */}
            <button
              onClick={handleExploreClick}
              className="bg-white text-red-600 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
            >
              Explore Features
            </button>

            {/* Emergency Help Button */}
            <button
              onClick={handleEmergencyClick}
              className="border border-white text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-red-600 transition duration-300"
            >
              Emergency Help
            </button>
          </div>
        </div>

        {/* About Content */}
        <div className="px-8 md:px-14 py-12">
          
          {/* Mission */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              India witnesses thousands of road accidents every year where
              delayed emergency response becomes one of the major reasons for
              fatalities. RoadSoS was created to reduce panic and save lives by
              offering a fast, simple, and accessible emergency response system
              directly from a mobile device.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-red-50 rounded-3xl p-8 border border-red-100">
              <h3 className="text-4xl font-bold text-red-600">112</h3>
              <p className="mt-2 text-gray-700 font-medium">
                India Emergency Helpline Integration
              </p>
            </div>

            <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100">
              <h3 className="text-4xl font-bold text-orange-500">24/7</h3>
              <p className="mt-2 text-gray-700 font-medium">
                Emergency Accessibility Anytime
              </p>
            </div>

            <div className="bg-green-50 rounded-3xl p-8 border border-green-100">
              <h3 className="text-4xl font-bold text-green-600">GPS</h3>
              <p className="mt-2 text-gray-700 font-medium">
                Real-Time Location Tracking
              </p>
            </div>
          </div>

          {/* Features */}
          <div ref={featuresRef}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Core Features
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              {/* Feature 1 */}
              <div className="bg-white border border-red-100 rounded-3xl p-7 shadow-sm hover:shadow-xl transition duration-300">
                <div className="bg-red-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  <Siren className="text-red-600" size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Instant SOS Alerts
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Quickly trigger emergency SOS alerts during accidents or
                  danger situations.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border border-orange-100 rounded-3xl p-7 shadow-sm hover:shadow-xl transition duration-300">
                <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  <MapPinned className="text-orange-500" size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Live GPS Tracking
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Share your exact real-time location instantly.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-blue-100 rounded-3xl p-7 shadow-sm hover:shadow-xl transition duration-300">
                <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  <Ambulance className="text-blue-600" size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Nearby Emergency Services
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Find nearby hospitals and emergency support quickly.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white border border-green-100 rounded-3xl p-7 shadow-sm hover:shadow-xl transition duration-300">
                <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  <PhoneCall className="text-green-600" size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  One-Tap Emergency Calling
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Instantly contact emergency services with one tap.
                </p>
              </div>

            </div>
          </div>

          {/* Why RoadSoS */}
          <div className="mt-20 bg-gradient-to-r from-red-50 to-orange-50 rounded-[32px] p-10 border border-red-100">
            <div className="flex items-start gap-5">
              <div className="bg-white shadow-md rounded-2xl p-4">
                <HeartHandshake className="text-red-600" size={32} />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why RoadSoS Matters
                </h2>

                <p className="text-gray-700 text-lg leading-relaxed">
                  RoadSoS simplifies emergency response using GPS and
                  real-time assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-900">
              RoadSoS — Smart Emergency Response For Safer Roads
            </h3>

            <p className="text-gray-500 mt-3">
              Built with care, technology, and a mission to protect lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}