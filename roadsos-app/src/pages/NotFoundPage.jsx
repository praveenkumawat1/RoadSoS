
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="px-8 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold">Page not found</h2>
        <p className="text-gray-600 mt-3">RoadSoS supports known pages only.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold inline-block"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

