import { createFileRoute, redirect } from "@tanstack/react-router";
import SlidingForms from "../components/SlidingForms";
import useAuthStore from "../stores/authStore";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    const { user, isAuthenticated, isLoading } = useAuthStore.getState();

    if (isLoading) return;

    if (isAuthenticated && user) {
      throw redirect({
        to: user?.role == "EMPLOYER" ? "/employer" : "/candidate",
      });
    }
  },
  component: SlidingForms,
});
