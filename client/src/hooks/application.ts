import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      queryClient.invalidateQueries({ queryKey: ["employerApplication"] });
      queryClient.invalidateQueries({ queryKey: ["applicationById"] });
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

export const useGetApplicationById = (applicationId: string) => {
  return useQuery({
    queryKey: ["applicationById"],
    queryFn: () => applicationActions.getApplicationById(applicationId),
    retry: false,
  });
};
