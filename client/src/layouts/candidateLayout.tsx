import { Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";
import useAuthStore from "../stores/authStore";
import { useLogout } from "../hooks/auth";

export const CandidateLayout = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 min-h-screen bg-white shadow-lg p-6 space-y-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Candidate Portal
            </h2>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => router.push("/candidate/dashboard")}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Dashboard
            </button>

            <button
              onClick={() => router.push("/candidate/viewJobs")}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              View Job
            </button>

            <button
              onClick={() => router.push("/candidate/application")}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Applications
            </button>

            <button
              onClick={() => router.push("/candidate/settings")}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Settings
            </button>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={() => logout.mutate()}
              className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome to {user?.role} dashboard
            </h1>
          </div>

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CandidateLayout;
