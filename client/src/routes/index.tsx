import { createFileRoute, redirect } from "@tanstack/react-router";
import Home from "../pages/home";
import useAuthStore from "../stores/authStore";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const user = useAuthStore.getState().user;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (isAuthenticated && user) {
      throw redirect({
        to: user?.role === "EMPLOYER" ? "/employer" : "/candidate",
      });
    }
  },
  component: Home,
});
