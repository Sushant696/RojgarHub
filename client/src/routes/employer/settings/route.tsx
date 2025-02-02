import Settings from "@/pages/employer/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/settings")({
  component: Settings,
});
