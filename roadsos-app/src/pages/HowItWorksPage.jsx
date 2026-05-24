
import { MapPin, Shield, Phone, AlertTriangle } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="px-8 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-5">
          <AlertTriangle size={18} />
          How RoadSoS Works (India)
        </div>

        <h2 className="text-4xl font-bold">Fast help in 3 steps</h2>
        <p className="text-gray-600 mt-3 text-lg">
          Designed for emergencies across India, even when network is limited.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="bg-red-50 text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <MapPin />
            </div>
            <h3 className="font-bold text-xl">1) Confirm your location</h3>
            <p className="text-gray-600 mt-2">
              We use your device location (or your selection) to help route
              responders.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="bg-red-50 text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Shield />
            </div>
            <h3 className="font-bold text-xl">2) Choose the emergency</h3>
            <p className="text-gray-600 mt-2">
              SOS alerts can trigger ambulance and police support.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="bg-red-50 text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Phone />
            </div>
            <h3 className="font-bold text-xl">3) Get notified instantly</h3>
            <p className="text-gray-600 mt-2">
              Direct call option for 112 and emergency escalation flows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

