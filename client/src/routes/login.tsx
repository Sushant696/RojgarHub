import { createFileRoute, redirect } from "@tanstack/react-router";

import useAuthStore from "../stores/authStore";
import SlidingForms from "../components/SlidingForms";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const { user, isAuthenticated, isLoading } = useAuthStore.getState();

    if (isLoading) return;

    if (isAuthenticated && user) {
      throw redirect({
        to: user?.role == "EMPLOYER" ? "/employer/dashboard" : "/candidate",
      });
    }
  },
  component: SlidingForms,
});
