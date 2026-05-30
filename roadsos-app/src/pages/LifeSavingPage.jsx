import {
  Search,
  Clock,
  Activity,
  PhoneCall,
  Share2,
  DownloadCloud,
  CheckSquare,
  Star,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import { categories, kitItems } from "../data/lifesaving";
export default function LifeSavingPage() {
  console.log("LifeSavingPage rendered");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [filterFav, setFilterFav] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lifesaving:favorites");
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lifesaving:favorites", JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  function callEmergency() {
    window.location.href = "tel:112";
  }

  async function shareLocation() {
    try {
      await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 8000,
        }),
      );
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject),
      );
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      if (navigator.share) {
        await navigator.share({
          title: "My location (RoadSoS)",
          text: "My current location — please send help",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Location copied to clipboard. Share it with responders.");
      }
    } catch (err) {
      alert(
        "Unable to fetch location. Make sure location is enabled on your device.",
      );
    }
  }

  function downloadChecklist() {
    const content =
      "RoadSoS - First Aid Kit Checklist\n\n" +
      kitItems.map((i, idx) => `${idx + 1}. ${i}`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roadsoS_first_aid_checklist.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-2xl mb-8 font-black text-xs uppercase tracking-widest border border-red-100 italic">
            <Activity size={16} />
            Life-Saving Protocols
          </div>
          <h1 className="text-5xl md:text-8xl font-[950] text-slate-900 tracking-tighter mb-8 leading-none">
            Every Second <span className="text-red-600">Counts.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-500 text-xl md:text-2xl font-medium leading-relaxed mb-12">
            While professional help is en route, your immediate actions
            determine the outcome. Follow these world-standard first-aid
            blueprints carefully.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search
                className="text-slate-400 group-focus-within:text-red-500 transition-colors"
                size={20}
              />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search for an emergency (e.g. CPR, Snake Bite, Burn)..."
              className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 pl-16 pr-8 text-lg font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 transition-all shadow-sm"
            />
            <div className="absolute right-4 top-3 flex items-center gap-2">
              <button
                onClick={() => {
                  setFilterFav(!filterFav);
                }}
                title="Show favorites"
                className={`p-2 rounded-full ${filterFav ? "bg-red-600 text-white" : "bg-white border border-slate-100"}`}
              >
                <Star />
              </button>
              <button
                onClick={() => {
                  // download all protocols as JSON
                  const blob = new Blob([JSON.stringify(categories, null, 2)], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "roadsos_protocols.json";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                }}
                title="Download all protocols"
                className="p-2 rounded-full bg-white border border-slate-100"
              >
                <Download />
              </button>
            </div>
          </div>
        </header>

        {/* QUICK ACTION GRID */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32">
          {categories
            .filter((cat) => {
              if (filterFav && !favorites.includes(cat.id)) return false;
              if (!searchQuery) return true;
              const q = searchQuery.toLowerCase();
              return (
                cat.title.toLowerCase().includes(q) ||
                (cat.short || "").toLowerCase().includes(q) ||
                (cat.long || "").toLowerCase().includes(q) ||
                (cat.steps || []).join(" ").toLowerCase().includes(q)
              );
            })
            .map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="w-full h-12 rounded-xl mb-4 bg-slate-50 flex items-center justify-between text-sm text-slate-500 px-4">
                    <div>{cat.title}</div>
                    <button
                      onClick={() => {
                        setFavorites((prev) => {
                          if (prev.includes(cat.id))
                            return prev.filter((p) => p !== cat.id);
                          return [...prev, cat.id];
                        });
                      }}
                      className={`p-2 rounded-full ${favorites.includes(cat.id) ? "bg-red-600 text-white" : "bg-white"}`}
                      title="Toggle favorite"
                    >
                      <Star size={14} />
                    </button>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{cat.long}</p>

                  {cat.steps && cat.steps.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Procedure</h4>
                      <ol className="list-decimal list-inside text-slate-700 space-y-2">
                        {cat.steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {cat.equipment && cat.equipment.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Equipment</h4>
                      <ul className="list-disc list-inside text-slate-700">
                        {cat.equipment.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -ml-20 -mb-20" />

          <h2 className="text-4xl md:text-6xl font-black mb-10 leading-none tracking-tighter">
            Stay Calm. <br />
            <span className="text-red-500">Follow the Protocol.</span>
          </h2>
          <p className="text-slate-300 text-xl font-medium mb-12 max-w-2xl mx-auto">
            RoadSoS automatically updates your location data for emergency
            dispatchers. Focus on the victim. Focus on the steps.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl">
              <Clock className="text-red-500" />
              <span className="font-bold">Dispatch ETA: ~8 Mins</span>
            </div>
            <button
              onClick={callEmergency}
              className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition-colors"
            >
              <PhoneCall />
              Call 112
            </button>
            <button
              onClick={shareLocation}
              className="flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-colors"
            >
              <Share2 />
              Share Location
            </button>
            <button
              onClick={downloadChecklist}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold hover:bg-white/10 transition-colors"
            >
              <DownloadCloud />
              Download Checklist
            </button>
            <button
              onClick={() => {
                // Print all protocols in a new window
                const w = window.open("", "_blank");
                const html = `<!doctype html><html><head><title>RoadSoS Protocols</title><meta charset="utf-8"><style>body{font-family:system-ui,Arial;padding:20px;color:#111}h1{color:#b91c1c}</style></head><body><h1>RoadSoS — Protocols</h1>${categories
                  .map(
                    (c) =>
                      `<section><h2>${c.title}</h2><p>${c.long}</p><h3>Procedure</h3><ol>${(c.steps || []).map((s) => `<li>${s}</li>`).join("")}</ol><h3>Equipment</h3><ul>${(c.equipment || []).map((e) => `<li>${e}</li>`).join("")}</ul></section><hr/>`,
                  )
                  .join("")}</body></html>`;
                w.document.write(html);
                w.document.close();
                w.focus();
                w.print();
              }}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold hover:bg-white/10 transition-colors"
            >
              <Download />
              Print All
            </button>
          </div>
        </section>

        {/* FIRST AID KIT CHECKLIST */}
        <section className="my-20">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center">
                <CheckSquare className="text-red-600" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">
                  First Aid Kit Checklist
                </h3>
                <p className="text-slate-500 mb-6">
                  Recommended items to keep in a compact first-aid kit for
                  emergencies.
                </p>

                <ul className="grid grid-cols-2 gap-3 text-slate-700">
                  {kitItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
