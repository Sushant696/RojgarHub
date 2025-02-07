import UpdateJob from "@/components/employer/updateJob";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/job-management/update/$jobId")({
  component: UpdateJob,
});
