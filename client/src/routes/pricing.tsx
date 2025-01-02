import { createFileRoute, redirect } from "@tanstack/react-router";
import Pricing from "../pages/pricing";
import useAuthStore from "../stores/authStore";
import showNotification from "../utils/toastify";

const isAuthenticated = useAuthStore.getState().isAuthenticated;

export const Route = createFileRoute("/pricing")({
  beforeLoad: () => {
    if (!isAuthenticated) {
      showNotification("error", "Please login to continue");
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Pricing,
});
