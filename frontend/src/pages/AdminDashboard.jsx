import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#fafbf8] px-5 py-24 md:px-12">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-emerald-700">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Shield size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#17221d]">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage destinations, tours, and platform users.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-400">Admin management modules will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;