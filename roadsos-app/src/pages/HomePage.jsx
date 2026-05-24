
import { Shield, AlertTriangle } from "lucide-react";

export default function HomePage({ onGoSOS }) {
  return (
    <div className="min-h-[60vh]">

      {/* HERO SECTION */}
      <section className="grid lg:grid-cols-2 gap-10 px-8 py-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-5">
            <Shield size={18} />
            Offline Emergency Assistance (India)
          </div>

          <h2 className="text-5xl font-bold leading-tight text-gray-900">
            Emergency Help,
            <br />
            Even Without Internet
          </h2>

          <p className="text-gray-600 mt-6 text-lg">
            Find nearby trauma centers, ambulances, police and rescue services
            instantly 	 anytime, anywhere (India).
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={onGoSOS}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Open RoadSoS
            </button>

            <a
              href="/how-it-works"
              className="border border-gray-300 px-6 py-3 rounded-xl font-semibold inline-flex items-center justify-center"
            >
              Learn More
            </a>
          </div>

          <div className="flex gap-8 mt-10 text-gray-600">
            <div>7a1 Offline First</div>
            <div>4cd Nearby Help</div>
            <div>4e1 Trusted Data</div>
          </div>
        </div>

        {/* MAP CARD */}
        <div className="bg-white rounded-3xl shadow-lg p-5">
          <div className="h-[420px] rounded-2xl bg-gray-200 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
              alt="map"
              className="w-full h-full object-cover"
            />

            <div className="absolute top-5 left-5 bg-white px-4 py-3 rounded-xl shadow-md">
              <p className="text-sm text-gray-500">Your Location</p>
              <p className="font-semibold">India  State/City 	</p>
            </div>

            <div className="absolute bottom-5 right-5 bg-red-500 text-white p-4 rounded-full shadow-xl animate-pulse">
              <AlertTriangle />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

