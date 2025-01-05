import { createFileRoute, redirect } from "@tanstack/react-router";
import Home from "../pages/home";
import useAuthStore from "../stores/authStore";
import showNotification from "../utils/toastify";

const user = useAuthStore.getState().user;
const isAuthenticated = useAuthStore.getState().isAuthenticated;

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (isAuthenticated && user) {
      showNotification("success", "welcome back " + user?.username);
      throw redirect({
        to: user?.role == "employer" ? "/employer" : "/candidate",
      });
    }
  },
  component: Home,
});
