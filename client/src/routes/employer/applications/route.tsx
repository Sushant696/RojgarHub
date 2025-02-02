import Applications from "@/pages/employer/applicaitons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/applications")({
  component: Applications,
});
