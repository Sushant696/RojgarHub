import { useMutation, useQuery } from "@tanstack/react-query";

import showNotification from "../utils/toastify";
import { jobAction } from "@/api/job";

export const usePostJob = () => {
  return useMutation({
    mutationKey: ["postJob"],
    mutationFn: jobAction.postJob,
    onSuccess(response) {
      console.log(response, "useJobPost");
      showNotification("success", response.data.message);
    },
    onError: (error: any) => {
      showNotification("error", error.message);
    },
  });
};

export const useUpdateJob = () => {
  return useMutation({
    mutationKey: ["updateJob"],
    mutationFn: jobAction.updateJob,
    onSuccess(response) {
      console.log(response, "useUpdateJob");
      showNotification("success", response.data.message);
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
    queryKey: ["jobById", jobId],
    queryFn: () => jobAction.getJobById(jobId),
    enabled: !!jobId,
  });
};
