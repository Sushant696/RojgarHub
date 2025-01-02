import { Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";
import useAuthStore from "../stores/authStore";

export const EmployerLayout = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex">
      <h1 className="title-text">Welcome to dashboard' {user?.username}</h1>
      <nav className="w-64 bg-gray-100">
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        <button onClick={() => router.push("/post-job")}>Post Job</button>
        <button onClick={() => router.push("/applications")}>
          Applications{" "}
        </button>
        <button onClick={() => router.push("/settings")}>Settings</button>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
