
import { MapPin, Phone, Navigation } from "lucide-react";

const ambulances = [
  { name: "Rapid Ambulance", distance: "1.2 km", status: "Available" },
  { name: "Emergency 108 Partner", distance: "2.0 km", status: "On the way" },
  { name: "Cardiac Ambulance Service", distance: "4.6 km", status: "ICU Transport" },
];

export default function AmbulancePage() {
  return (
    <div className="px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">Ambulance Services in India (Demo)</h3>
            <button className="bg-gray-900 text-white px-5 py-2 rounded-xl">
              Sync Now
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {ambulances.map((a, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-red-500" size={18} />
                      <h4 className="font-bold text-lg">{a.name}</h4>
                    </div>
                    <p className="text-gray-500 mt-1">
                      {a.distance}  {a.status}
                    </p>
                    <div className="mt-3 inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                      Ambulance (India)
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="bg-green-500 text-white p-3 rounded-xl">
                      <Phone size={18} />
                    </button>
                    <button className="bg-blue-500 text-white p-3 rounded-xl">
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

