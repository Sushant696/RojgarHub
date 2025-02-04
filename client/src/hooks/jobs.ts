import { useMutation, useQuery } from "@tanstack/react-query";

import showNotification from "../utils/toastify";
import DisplayErrorToast from "../utils/displayErrorMessage";
import { jobAction } from "@/api/job";

export const usePostJob = () => {
  return useMutation({
    mutationKey: ["postJob"],
    mutationFn: jobAction.postJob,
    onSuccess(response) {
      showNotification("success", response.data.message);
    },
    onError: (error: any) => {
      DisplayErrorToast(error);
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
