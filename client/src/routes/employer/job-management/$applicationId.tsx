import { createFileRoute } from "@tanstack/react-router";

import { jobAction } from "@/api/job";
import ApplicationDetails from "@/pages/employer/jobDetails";

export const Route = createFileRoute("/employer/job-management/$applicationId")(
  {
    component: ApplicationDetails,
    loader: async ({ params: { applicationId } }) => {
      const response = await jobAction.getJobById(applicationId);
      console.log(response);
      return response.data;
    },
  },
);
