import { jobAction } from "@/api/job";
import UpdateJob from "@/components/employer/updateJob";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/job-management/update/$jobId")({
  loader: async ({ params: { jobId } }) => {
    const response = await jobAction.getJobById(jobId);
    console.log(response);
    return response.data;
  },

  component: UpdateJob,
});
