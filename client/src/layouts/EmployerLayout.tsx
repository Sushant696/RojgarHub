import { Link, Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";
import useAuthStore from "../stores/authStore";

export const EmployerLayout = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex">
      <nav className="w-64 bg-gray-100">
        <Link href="/employer/postJob">Hello</Link>
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        <button onClick={() => router.push("/post-job")}>Post Job</button>
        <button onClick={() => router.push("/applications")}>
          Applications{" "}
        </button>
        <button onClick={() => router.push("/settings")}>Settings</button>
      </nav>
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>

      <h1 className="title-text">Welcome to dashboard' {user?.username}</h1>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
