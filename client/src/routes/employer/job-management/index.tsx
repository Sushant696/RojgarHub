import Applications from "@/pages/employer/jobs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/job-management/")({
  component: Applications,
});
