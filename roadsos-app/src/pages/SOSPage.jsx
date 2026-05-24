import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Ambulance,
  Phone,
  Shield,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import FirstAidWindow from "../components/FirstAidWindow";

export default function SOSPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState("confirm");
  const [showFirstAid, setShowFirstAid] = useState(false);
  

  const emergencyNumber = "112";

  const title = useMemo(() => {
    switch (step) {
      case "ambulance":
        return "AMBULANCE ALERT";

      case "police":
        return "POLICE ALERT";

      case "done":
        return "SOS ACTIVATED";

      default:
        return "SOS ALERT";
    }
  }, [step]);

  return (
    <div className="px-8 py-10">
      <div className="max-w-6xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            <span className="inline-flex items-center gap-2 font-semibold">
              <Shield size={16} />
              RoadSoS (India)
            </span>
          </div>

          <div className="flex items-center gap-3">

            {/* CHAT BUTTON */}
            <button
              type="button"
              onClick={() => setShowFirstAid(true)}
              className="text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl font-semibold"
            >
            Injury Assistant
            </button>

            {/* HOME BUTTON */}
            <button
              type="button"
              onClick={() => navigate("/home", { replace: true })}
              className="text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl font-semibold"
            >
              Skip to Home
            </button>
          </div>
        </div>

        {/* MAIN SOS CARD */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-10 text-white text-center">

          <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6 animate-pulse">
            <AlertTriangle size={60} />
          </div>

          <h2 className="text-4xl font-bold">
            {title}
          </h2>

          {/* STEP 1 */}
          {step === "confirm" && (
            <>
              <p className="mt-3 text-red-100 text-lg">
                Location and emergency details will be shared with nearby responders.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-5 mt-8">

                <button
                  onClick={() => setStep("ambulance")}
                  className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  CALL EMERGENCY ({emergencyNumber})
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="border border-white px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  CANCEL
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === "ambulance" && (
            <>
              <p className="mt-3 text-red-100 text-lg">
                Triggering ambulance support. Proceed to police escalation.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-5 mt-8">

                <button
                  onClick={() => setStep("police")}
                  className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg inline-flex items-center gap-3"
                >
                  <Ambulance />
                  Continue
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="border border-white px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  <X className="inline" size={18} />
                  Exit
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-5 text-sm text-red-100">
                <span className="inline-flex items-center gap-2">
                  <span className="font-bold">1</span>
                  Ambulance
                </span>

                <span className="opacity-70">
                  2 Police
                </span>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === "police" && (
            <>
              <p className="mt-3 text-red-100 text-lg">
                Triggering police support. Finalize SOS.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-5 mt-8">

                <button
                  onClick={() => setStep("done")}
                  className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg inline-flex items-center gap-3"
                >
                  <Phone />
                  Confirm SOS
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="border border-white px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-5 text-sm text-red-100">
                <span className="opacity-70">
                  1 Ambulance
                </span>

                <span className="inline-flex items-center gap-2">
                  <span className="font-bold">2</span>
                  Police
                </span>
              </div>
            </>
          )}

          {/* STEP 4 */}
          {step === "done" && (
            <>
              <p className="mt-3 text-red-100 text-lg">
                SOS escalation initiated. You can go to Home or view services.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-5 mt-8">

                <button
                  onClick={() => navigate("/")}
                  className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  Back to Home
                </button>

                <button
                  onClick={() => navigate("/services")}
                  className="border border-white px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  View Services
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CHATBOT */}
      <FirstAidWindow
        open={showFirstAid}
        onClose={() => setShowFirstAid(false)}
      />
    </div>
  );
}