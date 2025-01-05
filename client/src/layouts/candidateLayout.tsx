import { Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";
import useAuthStore from "../stores/authStore";

export const CandidateLayout = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="">
      <nav className=" p-4 flex justify-around w-full bg-gray-100">
        <button onClick={() => router.push("/candidate/dashboard")}>
          Dashboard
        </button>
        <button onClick={() => router.push("/candidate/savedJobs")}>
          My Applications
        </button>
        <button onClick={() => router.push("/employer")}>
          Employer access only
        </button>
        <button onClick={() => router.push("/saved-jobs")}>Saved Jobs</button>
        <button onClick={() => router.push("/settings")}>Settings</button>
      </nav>
      <h1 className="title-text">Welcome to dashboard' {user?.username}</h1>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
