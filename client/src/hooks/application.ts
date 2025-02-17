import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { applicationActions } from "@/api/application";
import { ApplicationStatus } from "@/types/job";

interface InterviewSchedulerProps {
  applicationId: string;
  interviewObj: { scheduledAt: string; time: string; location: string };
}

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
      queryClient.invalidateQueries({ queryKey: ["interviewSchedule"] });
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

export const useInterviewScheduler = () => {
  return useMutation({
    mutationKey: ["interviewSchedule"],
    mutationFn: ({ applicationId, interviewObj }: InterviewSchedulerProps) =>
      applicationActions.scheduleInterview({ applicationId, interviewObj }),
    retry: false,
  });
};

export const useUpdateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationActions.updateInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error: any) => {
      console.error(
        "Error updating interview:",
        error.response?.data || error.message,
      );
    },
  });
};

export const useDeleteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationActions.deleteInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error: any) => {
      console.error(
        "Error deleting interview:",
        error.response?.data || error.message,
      );
    },
  });
};
