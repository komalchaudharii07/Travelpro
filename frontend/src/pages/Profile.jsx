import { Link } from "react-router-dom";
import { Bookmark, ArrowLeft } from "lucide-react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen bg-[#fafbf8] px-5 py-24 md:px-12">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-emerald-700">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 className="text-2xl font-semibold text-[#17221d]">Explorer Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back, {user.username || "Explorer"}!</p>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Bookmark size={16} className="text-emerald-600" /> Saved Itineraries
          </h2>
          <p className="mt-2 text-sm text-gray-400">You haven't saved any itineraries yet. Explore Meghalaya and save your favorite spots!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;