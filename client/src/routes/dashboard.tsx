import { createFileRoute, redirect } from "@tanstack/react-router";
import Dashboard from "../pages/dashboard";
import { authService } from "../utils/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    if (!authService.checkAuth()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: "/dashboard",
        },
      });
    }
  },
  component: Dashboard,
});
