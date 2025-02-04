import DashboardEmployer from "@/pages/employer/home/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/dashboard")({
  component: DashboardEmployer,
});
