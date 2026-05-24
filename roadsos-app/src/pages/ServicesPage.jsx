import { useState } from "react";
import {
  MapPin,
  Phone,
  Navigation,
  Ambulance,
  Shield,
  Building2,
} from "lucide-react";

const services = [
  {
    name: "City Trauma Center",
    distance: "2.3 km",
    status: "Open 24/7",
    type: "Hospital",
  },
  {
    name: "Life Care Hospital",
    distance: "3.1 km",
    status: "ICU Available",
    type: "Hospital",
  },
  {
    name: "Rapid Ambulance",
    distance: "1.2 km",
    status: "Available",
    type: "Ambulance",
  },
  {
    name: "24x7 Police Helpdesk",
    distance: "2.8 km",
    status: "24/7 Active",
    type: "Police",
  },
];

export default function ServicesPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = [
    {
      label: "All",
      icon: <Shield size={18} />,
    },
    {
      label: "Hospital",
      icon: <Building2 size={18} />,
    },
    {
      label: "Ambulance",
      icon: <Ambulance size={18} />,
    },
    {
      label: "Police",
      icon: <Shield size={18} />,
    },
  ];

  const filteredServices = services.filter((service) => {
    const matchFilter =
      selectedFilter === "All" ||
      service.type === selectedFilter;

    const matchSearch =
      service.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="px-8 pb-12 pt-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-[32px] shadow-lg p-6 border border-gray-100">

          {/* SEARCH + FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">

            {/* SEARCH */}
            <div className="flex items-center bg-gray-100 rounded-2xl px-5 py-4 w-full lg:w-[450px]">
              <input
                type="text"
                placeholder="Search hospitals, ambulance, police..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-gray-700"
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() =>
                    setSelectedFilter(filter.label)
                  }
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition duration-300 ${
                    selectedFilter === filter.label
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Nearby Emergency Services
              </h2>

              <p className="text-gray-500 mt-1">
                Real-time emergency support around you
              </p>
            </div>

            <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl transition">
              Sync Now
            </button>
          </div>

          {/* SERVICE CARDS */}
          <div className="grid lg:grid-cols-2 gap-5">

            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition duration-300 bg-white"
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin
                          className="text-red-500"
                          size={18}
                        />

                        <h4 className="font-bold text-xl text-gray-900">
                          {service.name}
                        </h4>
                      </div>

                      <p className="text-gray-500 mt-2">
                        {service.distance} • {service.status}
                      </p>

                      <div className="mt-4 inline-block bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                        {service.type} (India)
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3">

                      <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-2xl transition">
                        <Phone size={18} />
                      </button>

                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-2xl transition">
                        <Navigation size={18} />
                      </button>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20">
                <h3 className="text-2xl font-bold text-gray-700">
                  No Services Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try another filter or search keyword
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}