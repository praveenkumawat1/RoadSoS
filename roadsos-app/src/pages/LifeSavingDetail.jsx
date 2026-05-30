import { useParams, Link } from "react-router-dom";
import { categories } from "../data/lifesaving";
import { useState } from "react";

const translations = {
  hi: {
    translateLabel: "अनुवाद",
    back: "वापस",
  },
  en: {
    translateLabel: "Translate",
    back: "Back",
  },
};

export default function LifeSavingDetail() {
  const { id } = useParams();
  const cat = categories.find((c) => c.id === id);
  const [lang, setLang] = useState("en");

  if (!cat) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Protocol not found</h2>
          <Link to="/survival-kit" className="text-red-600 mt-4 inline-block">
            Back to Survival Kit
          </Link>
        </div>
      </div>
    );
  }

  const text = {
    title: cat.title,
    description: cat.long,
    equipment: cat.equipment || [],
    steps: cat.steps || [],
  };

  // Demo translation mapping (Hindi placeholders). Replace with real translations when available.
  const translated = {
    title: lang === "hi" ? `हिन्दी: ${text.title}` : text.title,
    description:
      lang === "hi" ? `हिन्दी: ${text.description}` : text.description,
    equipment:
      lang === "hi"
        ? text.equipment.map((e) => `हिन्दी: ${e}`)
        : text.equipment,
    steps: lang === "hi" ? text.steps.map((s) => `हिन्दी: ${s}`) : text.steps,
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex items-start gap-6">
          <img
            src={cat.image}
            alt={cat.title}
            className="w-48 h-48 object-cover rounded-xl"
          />
          <div>
            <h1 className="text-3xl font-black mb-3">{translated.title}</h1>
            <p className="text-slate-600 mb-6">{translated.description}</p>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Procedure</h3>
              <ol className="list-decimal list-inside text-slate-700 space-y-2">
                {translated.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>

            {translated.equipment?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">Equipment / Items</h3>
                <ul className="list-disc list-inside text-slate-700">
                  {translated.equipment.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => window.print()}
                className="bg-red-600 text-white px-4 py-2 rounded font-bold"
              >
                Print / Save PDF
              </button>
              <a
                href={`data:text/plain,${encodeURIComponent(
                  `${text.title}\n\n${text.description}\n\nSteps:\n${text.steps
                    .map((s, i) => `${i + 1}. ${s}`)
                    .join("\n")}`,
                )}`}
                download={`${cat.id}_protocol.txt`}
                className="bg-white border px-4 py-2 rounded font-semibold"
              >
                Download Text
              </a>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-500">
                {translations[lang]?.translateLabel || "Translate"}:
              </label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              </select>

              <Link
                to="/survival-kit"
                className="ml-auto text-red-600 font-semibold"
              >
                {translations[lang]?.back || "Back"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
