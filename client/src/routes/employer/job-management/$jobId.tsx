import JobDetails from "@/pages/employer/jobDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/job-management/$jobId")({
  component: JobDetails,
});
