import { createFileRoute } from "@tanstack/react-router";

import { jobAction } from "@/api/job";
import ApplicationDetails from "@/pages/employer/applicationDetails";

export const Route = createFileRoute("/employer/applications/$applicationId")({
  component: ApplicationDetails,
  loader: async ({ params: { applicationId } }) => {
    const response = await jobAction.getJobById(applicationId);
    console.log(response);
    return response.data;
  },
});
