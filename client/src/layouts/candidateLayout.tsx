import { Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";
import useAuthStore from "../stores/authStore";

export const CandidateLayout = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex mt-10">
      <h1 className="title-text">Welcome to dashboard' {user?.username}</h1>
      <nav className="w-64 bg-gray-100">
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        <button onClick={() => router.push("/job-applications")}>
          My Applications
        </button>
        <button onClick={() => router.push("/saved-jobs")}>Saved Jobs</button>
        <button onClick={() => router.push("/settings")}>Settings</button>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
