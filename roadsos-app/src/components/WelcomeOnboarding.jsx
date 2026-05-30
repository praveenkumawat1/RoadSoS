import { useState, useEffect } from "react";
import { Shield, Globe, Zap, ChevronRight } from "lucide-react";
import { SessionManager } from "../utils/session";

export default function WelcomeOnboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check both localStorage and Cookie for a robust session check
    const hasVisited =
      localStorage.getItem("roadsos_v1_visited") ||
      SessionManager.getCookie("roadsos_onboarded");
    if (!hasVisited) {
      setIsOpen(true);
    }
  }, []);

  const steps = [
    {
      title: "Welcome to RoadSoS",
      desc: "India's first offline-capable emergency response network. Designed for critical situations where every second counts.",
      icon: <Shield size={40} className="text-red-500" />,
      color: "red",
    },
    {
      title: "Works 100% Offline",
      desc: "No internet? No problem. Our pre-packaged database and satellite GPS routing work in the most remote areas.",
      icon: <Globe size={40} className="text-blue-500" />,
      color: "blue",
    },
    {
      title: "One-Tap SOS",
      desc: "Broadcast your location to 112 and nearest trauma centers instantly. We handle the logistics while you focus on safety.",
      icon: <Zap size={40} className="text-yellow-500" />,
      color: "yellow",
    },
  ];

  const handleClose = () => {
    localStorage.setItem("roadsos_v1_visited", "true");
    // Set a persistent cookie as well
    SessionManager.setPersistentCookie("roadsos_onboarded", "true");
    // Initialize a mock session token
    SessionManager.setSession(
      "roadsos_live_session_" + Math.random().toString(36).substr(2, 9),
    );
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-100 flex flex-col">
        {/* TOP PROGRESS */}
        <div className="flex">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 transition-all duration-500 ${
                idx <= currentStep ? "bg-red-500" : "bg-slate-100"
              }`}
            />
          ))}
        </div>

        <div className="p-10 md:p-14 text-center">
          <div className="w-24 h-24 mx-auto rounded-[2.5rem] bg-slate-50 flex items-center justify-center mb-10 border border-slate-100 shadow-sm animate-float">
            {steps[currentStep].icon}
          </div>

          <h2 className="text-3xl md:text-4xl font-[900] text-slate-900 mb-6 tracking-tight">
            {steps[currentStep].title}
          </h2>

          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12">
            {steps[currentStep].desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleNext}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-200"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
              <ChevronRight size={20} />
            </button>
            <button
              onClick={handleSkip}
              className="px-10 py-5 rounded-[1.5rem] font-bold text-slate-400 hover:text-slate-900 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>

        <div className="px-14 pb-10 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
            Official Emergency Support Protocol
          </p>
        </div>
      </div>
    </div>
  );
}
