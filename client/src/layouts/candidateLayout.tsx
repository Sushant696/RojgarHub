import { Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";
import useAuthStore from "../stores/authStore";
import { useLogout } from "../hooks/auth";

export const CandidateLayout = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <div className="flex">
      <nav className="w-64 bg-gray-100">
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        <button onClick={() => router.push("/post-job")}>Post Job</button>
        <button onClick={() => router.push("/applications")}>
          Applications{" "}
        </button>
        <button onClick={() => router.push("/settings")}>Settings</button>
      </nav>
      <button
        onClick={() => {
          logout.mutate();
        }}
      >
        logout
      </button>

      <h1 className="title-text">
        Welcome to
        {user?.role} dashboard'{" "}
      </h1>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
