import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import showNotification from "../utils/toastify";
import { jobAction } from "@/api/job";
import { toast } from "react-toastify";

export const usePostJob = () => {
  return useMutation({
    mutationKey: ["postJob"],
    mutationFn: jobAction.postJob,
    onSuccess(response) {
      showNotification(
        "success",
        response?.message || "Job Added Successfully",
      );
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
    onSuccess: (response) => {
      toast.success(response.data.message);
      showNotification("success", "Job updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
    onError: (error: any) => {
      showNotification("error", error.message);
    },
  });
};

export const useGetJobByIdPublic = (jobId: string) => {
  return useQuery({
    queryKey: ["job"],
    queryFn: () => jobAction.getJobByIdPublic(jobId),
    enabled: !!jobId,
  });
};

export const useGetJobById = (jobId: string) => {
  return useQuery({
    queryKey: ["job"],
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
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
  });
};

export const useJobStatusToggle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobAction.toogleJobStatus(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
      queryClient.invalidateQueries({ queryKey: ["employerApplication"] });
      queryClient.invalidateQueries({ queryKey: ["job"] });
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

export const useGetAllJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: jobAction.getAllJobs,
  });
};

export const useJobsSearch = (
  searchParams: {
    keywords?: string;
    industry?: string;
    location?: string;
  } | null,
) => {
  return useQuery({
    queryKey: ["jobs", "search", searchParams],
    queryFn: () => jobAction.getSearchedJob(searchParams || {}),
    enabled: !!searchParams,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
