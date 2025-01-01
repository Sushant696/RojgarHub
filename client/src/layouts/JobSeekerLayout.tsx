import { Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";

export const JobSeekerLayout = () => {
  const router = useRouter();

  return (
    <div className="flex">
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

// verify the user and get the user object when he log ins then save that in the cookies or something  where i will have access over and then according to that send the user to specific routes and manage the roles from there need to make state persistence
