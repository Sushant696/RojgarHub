import Setting from "@/components/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/candidate/settings")({
  component: Setting,
});
