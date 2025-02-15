import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicationActions } from "@/api/application";
import { ApplicationStatus } from "@/types/job";

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      candidateId,
      status,
      jobId,
    }: {
      applicationId: string;
      candidateId: string;
      status: ApplicationStatus;
      jobId: string;
    }) =>
      applicationActions.applicationStatus(
        applicationId,
        candidateId,
        status,
        jobId,
      ),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobById", variables.jobId],
        refetchType: "active",
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
};

