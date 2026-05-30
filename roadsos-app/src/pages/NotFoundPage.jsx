import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import hero from "../assets/hero.png";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="mx-auto">
          <img
            src={hero}
            alt="Lost map illustration"
            className="w-64 mx-auto mb-6"
          />
          <div className="w-28 h-28 bg-red-50 rounded-4xl flex items-center justify-center mx-auto mb-6 text-red-600">
            <AlertCircle size={40} />
          </div>
        </div>

        <div className="text-left lg:text-left">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed mb-6">
            The page you're looking for doesn't exist or has been moved. Safety
            first — here are some helpful places to get back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link
              to="/home"
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Safety
            </Link>

            <Link
              to="/survival-kit"
              className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-semibold flex items-center justify-center hover:shadow-sm transition"
            >
              Open Survival Kit
            </Link>
          </div>

          <div className="text-sm text-slate-500 mb-4">
            Or try searching for keywords like <strong>hospital</strong>,{" "}
            <strong>ambulance</strong>, or <strong>CPR</strong> from the main
            menu.
          </div>

          <Link to="/contact" className="text-sm text-red-600 font-medium">
            Contact support — report a broken link
          </Link>
        </div>
      </div>
    </div>
  );
}
