import { createFileRoute } from "@tanstack/react-router";
import ApplicationDetails from "@/pages/employer/jobDetails";

export const Route = createFileRoute("/employer/job-management/$jobId")({
  component: ApplicationDetails,
});
