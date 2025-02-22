import Notifications from "@/pages/candidate/Notifications";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/candidate/notifications/")({
  component: Notifications,
});
