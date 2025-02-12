import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import showNotification from "../utils/toastify";
import { jobAction } from "@/api/job";
import { toast } from "react-toastify";

export const usePostJob = () => {
  return useMutation({
    mutationKey: ["postJob"],
    mutationFn: jobAction.postJob,
    onSuccess(response) {
      showNotification("success", response.data.message);
    },
    onError: (error: any) => {
      showNotification("error", error.message);
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateJob"],
    mutationFn: jobAction.updateJob,
    onSuccess: (response, { id }) => {
      toast.success(response.data.message);
      showNotification("success", "Job updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["jobById", id] });
    },
    onError: (error: any) => {
      showNotification("error", error.message);
    },
  });
};

export const useGetAllJobs = () => {
  return useQuery({
    queryKey: ["getAllJobs"],
    queryFn: jobAction.getAllJobs,
  });
};

export const useGetJobById = (jobId: string) => {
  return useQuery({
    queryKey: ["jobById"],
    queryFn: () => jobAction.getJobById(jobId),
    enabled: !!jobId,
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobAction.deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobById"] });
    },
  });
};

export const useJobStatusToggle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobAction.toogleJobStatus(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobById"] });
    },
  });
};

export const useGetJobCandidates = () => {
  return useQuery({
    queryKey: ["employerCandidates"],
    queryFn: jobAction.getJobCandidates,
    retry: false,
  });
};

export const useGetJobApplications = () => {
  return useQuery({
    queryKey: ["employerCandidates"],
    queryFn: jobAction.getJobApplication,
    retry: false,
  });
};
