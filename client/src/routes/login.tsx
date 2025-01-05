import { createFileRoute, redirect } from "@tanstack/react-router";

import useAuthStore from "../stores/authStore";
import SlidingForms from "../components/SlidingForms";

const user = useAuthStore.getState().user;
const isAuthenticated = useAuthStore.getState().isAuthenticated;

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (isAuthenticated && user) {
      throw redirect({
        to: user?.role == "employer" ? "/employer" : "/candidate",
        search: { returnTo: window.location.pathname },
      });
    }
  },
  component: SlidingForms,
});
