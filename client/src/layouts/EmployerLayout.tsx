import { Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";

export const EmployerLayout = () => {
  const router = useRouter();

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
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
