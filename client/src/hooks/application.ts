import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { applicationActions } from "@/api/application";
import { ApplicationStatus } from "@/types/job";

interface InterviewSchedulerProps {
  applicationId: string;
  interviewObj: { scheduledAt: string; time: string; location: string };
}

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      candidateId,
      jobId,
      applicationData,
    }: {
      candidateId: string;
      jobId: string;
      applicationData: any;
    }) =>
      applicationActions.createApplication(candidateId, jobId, applicationData),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ["employerApplication"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
      queryClient.invalidateQueries({
        queryKey: ["job", variables.jobId],
        refetchType: "active",
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
};

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
      queryClient.invalidateQueries({ queryKey: ["application"] });
      queryClient.invalidateQueries({ queryKey: ["interviewSchedule"] });
      queryClient.invalidateQueries({
        queryKey: ["job", variables.jobId],
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
    queryKey: ["application"],
    queryFn: () => applicationActions.getApplicationById(applicationId),
    retry: false,
  });
};

export const useInterviewScheduler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["interviews"],
    mutationFn: ({ applicationId, interviewObj }: InterviewSchedulerProps) =>
      applicationActions.scheduleInterview({ applicationId, interviewObj }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
    onError: (error: any) => {
      console.error(
        "Error updating interview:",
        error.response?.data || error.message,
      );
    },
  });
};

export const useUpdateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationActions.updateInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
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
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
    onError: (error: any) => {
      console.error(
        "Error deleting interview:",
        error.response?.data || error.message,
      );
    },
  });
};
